<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Refund;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RefundController extends Controller
{
    public function requestRefund(Request $request)
    {
        $validated = $request->validate([
            'payment_id' => 'required|exists:payments,id',
            'reason' => 'required|string',
        ]);

        $payment = Payment::where('user_id', $request->user()->id)
            ->findOrFail($validated['payment_id']);

        if ($payment->status !== 'completed') {
            return response()->json(['error' => 'Only completed payments can be refunded'], 400);
        }

        // Check if refund already exists
        $existingRefund = Refund::where('payment_id', $payment->id)
            ->whereIn('status', ['pending', 'processing', 'completed'])
            ->first();

        if ($existingRefund) {
            return response()->json(['error' => 'Refund already requested for this payment'], 400);
        }

        $refund = Refund::create([
            'payment_id' => $payment->id,
            'order_id' => $payment->order_id,
            'user_id' => $request->user()->id,
            'refund_transaction_id' => 'REF-' . strtoupper(Str::random(12)),
            'amount' => $payment->amount,
            'reason' => $validated['reason'],
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Refund requested successfully',
            'refund' => $refund->load('payment', 'order'),
        ], 201);
    }

    public function processRefund(Request $request, $id)
    {
        // This would typically be an admin-only endpoint
        $refund = Refund::findOrFail($id);

        if ($refund->status !== 'pending') {
            return response()->json(['error' => 'Refund is not in pending status'], 400);
        }

        $validated = $request->validate([
            'status' => 'required|in:completed,failed',
            'admin_notes' => 'nullable|string',
        ]);

        $refund->update([
            'status' => $validated['status'],
            'admin_notes' => $validated['admin_notes'] ?? null,
            'processed_at' => now(),
        ]);

        if ($validated['status'] === 'completed') {
            $payment = $refund->payment;
            $order = $refund->order;
            $user = $refund->user;

            // Update payment and order status
            $payment->update(['status' => 'refunded']);
            $order->update(['status' => 'refunded']);

            // Refund to wallet
            $balanceBefore = $user->wallet_balance;
            $user->increment('wallet_balance', $refund->amount);
            $user->refresh();

            WalletTransaction::create([
                'user_id' => $user->id,
                'amount' => $refund->amount,
                'type' => 'credit',
                'source' => 'refund',
                'sourceable_id' => $refund->id,
                'sourceable_type' => Refund::class,
                'description' => 'Refund for order ' . $order->order_number,
                'balance_before' => $balanceBefore,
                'balance_after' => $user->wallet_balance,
            ]);

            // Restore product stock
            foreach ($order->items as $item) {
                $item->product->increment('stock_quantity', $item->quantity);
                $item->product->decrement('sales_count', $item->quantity);
            }
        }

        return response()->json([
            'message' => 'Refund processed successfully',
            'refund' => $refund->load('payment', 'order'),
        ]);
    }

    public function index(Request $request)
    {
        $refunds = Refund::where('user_id', $request->user()->id)
            ->with('payment', 'order')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($refunds);
    }

    public function show($id)
    {
        $refund = Refund::where('user_id', request()->user()->id)
            ->with('payment', 'order')
            ->findOrFail($id);

        return response()->json($refund);
    }
}
