<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\RewardPointsTransaction;
use App\Models\WalletTransaction;
use App\Models\AssetType;
use App\Models\UserAsset;
use App\Models\AssetTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'asset_type_code' => 'required|exists:asset_types,code',
            'payment_details' => 'nullable|array',
        ]);

        $user = $request->user();
        $order = Order::where('user_id', $user->id)->findOrFail($validated['order_id']);

        if ($order->status !== 'pending') {
            return response()->json(['error' => 'Order is not pending payment'], 400);
        }

        // Check if payment already exists for this order
        $existingPayment = Payment::where('order_id', $order->id)
            ->whereIn('status', ['completed', 'processing'])
            ->first();

        if ($existingPayment) {
            return response()->json(['error' => 'Payment already processed for this order'], 400);
        }

        // Get asset type
        $assetType = AssetType::where('code', $validated['asset_type_code'])->firstOrFail();

        // Handle payment with asset types (cash, card, pay)
        if (in_array($assetType->code, ['cash', 'card', 'pay'])) {
            // Get or create user asset
            $userAsset = UserAsset::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'asset_type_id' => $assetType->id,
                ],
                [
                    'balance' => 0,
                    'pending_balance' => 0,
                    'is_active' => true,
                ]
            );

            // Check balance for pay type
            if ($assetType->code === 'pay') {
                if (!$userAsset->hasBalance($order->total)) {
                    return response()->json([
                        'error' => 'Insufficient Pay balance. Please charge your Pay account first.',
                        'current_balance' => $userAsset->balance,
                        'required_amount' => $order->total,
                    ], 400);
                }

                // Deduct from Pay asset
                $balanceBefore = $userAsset->balance;
                $userAsset->decrement('balance', $order->total);
                $userAsset->update(['last_transaction_at' => now()]);
                $userAsset->refresh();

                // Create asset transaction
                AssetTransaction::create([
                    'user_id' => $user->id,
                    'asset_type_id' => $assetType->id,
                    'user_asset_id' => $userAsset->id,
                    'amount' => $order->total,
                    'type' => 'debit',
                    'transaction_type' => 'purchase',
                    'source' => 'order_payment',
                    'sourceable_id' => $order->id,
                    'sourceable_type' => Order::class,
                    'description' => "Payment for order {$order->order_number}",
                    'balance_before' => $balanceBefore,
                    'balance_after' => $userAsset->balance,
                    'status' => 'completed',
                    'completed_at' => now(),
                ]);
            }

            // Create payment record
            $payment = Payment::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'payment_method' => $assetType->code,
                'transaction_id' => strtoupper($assetType->code) . '-' . strtoupper(Str::random(12)),
                'amount' => $order->total,
                'status' => 'completed',
                'paid_at' => now(),
                'payment_details' => array_merge(
                    $validated['payment_details'] ?? [],
                    ['asset_type_id' => $assetType->id]
                ),
            ]);

            // Update order status
            $order->update(['status' => 'processing']);

            // Award reward points
            if ($order->points_earned > 0) {
                $user->increment('reward_points', $order->points_earned);

                RewardPointsTransaction::create([
                    'user_id' => $user->id,
                    'points' => $order->points_earned,
                    'type' => 'earned',
                    'source' => 'purchase',
                    'sourceable_id' => $order->id,
                    'sourceable_type' => Order::class,
                    'description' => "Points earned from order {$order->order_number}",
                ]);
            }

            return response()->json([
                'message' => 'Payment completed successfully',
                'payment' => $payment->load('order'),
                'asset_balance' => $assetType->code === 'pay' ? $userAsset->balance : null,
            ], 201);
        }

        // For wallet payment (backward compatibility)
        if ($validated['asset_type_code'] === 'wallet') {
            if ($user->wallet_balance < $order->total) {
                return response()->json(['error' => 'Insufficient wallet balance'], 400);
            }

            $payment = Payment::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'payment_method' => 'wallet',
                'transaction_id' => 'WALLET-' . strtoupper(Str::random(12)),
                'amount' => $order->total,
                'status' => 'completed',
                'paid_at' => now(),
            ]);

            // Deduct from wallet
            $balanceBefore = $user->wallet_balance;
            $user->decrement('wallet_balance', $order->total);
            $user->refresh();

            WalletTransaction::create([
                'user_id' => $user->id,
                'amount' => $order->total,
                'type' => 'debit',
                'source' => 'order_payment',
                'sourceable_id' => $order->id,
                'sourceable_type' => Order::class,
                'description' => "Payment for order {$order->order_number}",
                'balance_before' => $balanceBefore,
                'balance_after' => $user->wallet_balance,
            ]);

            // Update order status
            $order->update(['status' => 'processing']);

            // Award reward points
            if ($order->points_earned > 0) {
                $user->increment('reward_points', $order->points_earned);

                RewardPointsTransaction::create([
                    'user_id' => $user->id,
                    'points' => $order->points_earned,
                    'type' => 'earned',
                    'source' => 'purchase',
                    'sourceable_id' => $order->id,
                    'sourceable_type' => Order::class,
                    'description' => "Points earned from order {$order->order_number}",
                ]);
            }

            return response()->json([
                'message' => 'Payment completed successfully',
                'payment' => $payment->load('order'),
            ], 201);
        }

        // For other payment methods that require gateway processing
        $payment = Payment::create([
            'order_id' => $order->id,
            'user_id' => $user->id,
            'payment_method' => $assetType->code,
            'transaction_id' => strtoupper($assetType->code) . '-' . strtoupper(Str::random(12)),
            'amount' => $order->total,
            'status' => 'processing',
            'payment_details' => $validated['payment_details'] ?? [],
        ]);

        return response()->json([
            'message' => 'Payment initiated',
            'payment' => $payment,
            'next_step' => 'Complete payment with gateway',
        ], 201);
    }

    public function confirmPayment(Request $request, $id)
    {
        $payment = Payment::where('user_id', $request->user()->id)->findOrFail($id);

        if ($payment->status === 'completed') {
            return response()->json(['error' => 'Payment already completed'], 400);
        }

        // In a real application, verify payment with the gateway here
        $payment->update([
            'status' => 'completed',
            'paid_at' => now(),
        ]);

        $order = $payment->order;
        $order->update(['status' => 'processing']);

        // Award reward points
        if ($order->points_earned > 0) {
            $user = $request->user();
            $user->increment('reward_points', $order->points_earned);

            RewardPointsTransaction::create([
                'user_id' => $user->id,
                'points' => $order->points_earned,
                'type' => 'earned',
                'source' => 'purchase',
                'sourceable_id' => $order->id,
                'sourceable_type' => Order::class,
                'description' => 'Points earned from order ' . $order->order_number,
            ]);
        }

        return response()->json([
            'message' => 'Payment confirmed successfully',
            'payment' => $payment->load('order'),
        ]);
    }

    public function index(Request $request)
    {
        $payments = Payment::where('user_id', $request->user()->id)
            ->with('order')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($payments);
    }

    public function show($id)
    {
        $payment = Payment::where('user_id', request()->user()->id)
            ->with('order', 'refunds')
            ->findOrFail($id);

        return response()->json($payment);
    }
}
