<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssetType;
use App\Models\UserAsset;
use App\Models\AssetTransaction;
use App\Models\PayChargeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PayChargeController extends Controller
{
    /**
     * Create a pay charge request
     */
    public function createChargeRequest(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'note' => 'nullable|string',
            'payment_proof' => 'nullable|array',
        ]);

        $user = $request->user();

        // Get Pay asset type
        $payAssetType = AssetType::where('code', 'pay')->firstOrFail();

        // Check settings
        $settings = $payAssetType->settings ?? [];
        $minAmount = $settings['min_charge_amount'] ?? 1000;
        $maxAmount = $settings['max_charge_amount'] ?? 1000000;

        if ($validated['amount'] < $minAmount) {
            return response()->json([
                'error' => "Minimum charge amount is {$minAmount}"
            ], 400);
        }

        if ($validated['amount'] > $maxAmount) {
            return response()->json([
                'error' => "Maximum charge amount is {$maxAmount}"
            ], 400);
        }

        $chargeRequest = PayChargeRequest::create([
            'user_id' => $user->id,
            'request_number' => 'PAY-' . strtoupper(Str::random(10)),
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'status' => 'pending',
            'note' => $validated['note'] ?? null,
            'payment_proof' => $validated['payment_proof'] ?? null,
        ]);

        return response()->json([
            'message' => 'Charge request created successfully',
            'charge_request' => $chargeRequest,
        ], 201);
    }

    /**
     * Get user's charge requests
     */
    public function getChargeRequests(Request $request)
    {
        $user = $request->user();

        $status = $request->get('status');

        $query = PayChargeRequest::where('user_id', $user->id);

        if ($status) {
            $query->where('status', $status);
        }

        $requests = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json($requests);
    }

    /**
     * Get specific charge request
     */
    public function getChargeRequest($id)
    {
        $chargeRequest = PayChargeRequest::where('user_id', request()->user()->id)
            ->with('approver', 'assetTransaction')
            ->findOrFail($id);

        return response()->json($chargeRequest);
    }

    /**
     * Cancel charge request (only if pending)
     */
    public function cancelChargeRequest($id)
    {
        $chargeRequest = PayChargeRequest::where('user_id', request()->user()->id)
            ->findOrFail($id);

        if (!$chargeRequest->isPending()) {
            return response()->json(['error' => 'Only pending requests can be cancelled'], 400);
        }

        $chargeRequest->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Charge request cancelled successfully',
            'charge_request' => $chargeRequest,
        ]);
    }

    /**
     * Approve charge request (Admin only)
     */
    public function approveChargeRequest(Request $request, $id)
    {
        $validated = $request->validate([
            'admin_note' => 'nullable|string',
        ]);

        $chargeRequest = PayChargeRequest::findOrFail($id);

        if (!$chargeRequest->isPending()) {
            return response()->json(['error' => 'Request is not in pending status'], 400);
        }

        // Get Pay asset type
        $payAssetType = AssetType::where('code', 'pay')->firstOrFail();

        // Get or create user asset
        $userAsset = UserAsset::firstOrCreate(
            [
                'user_id' => $chargeRequest->user_id,
                'asset_type_id' => $payAssetType->id,
            ],
            [
                'balance' => 0,
                'pending_balance' => 0,
                'is_active' => true,
            ]
        );

        // Create transaction
        $balanceBefore = $userAsset->balance;
        $userAsset->increment('balance', $chargeRequest->amount);
        $userAsset->update(['last_transaction_at' => now()]);
        $userAsset->refresh();

        $transaction = AssetTransaction::create([
            'user_id' => $chargeRequest->user_id,
            'asset_type_id' => $payAssetType->id,
            'user_asset_id' => $userAsset->id,
            'amount' => $chargeRequest->amount,
            'type' => 'credit',
            'transaction_type' => 'charge',
            'source' => 'pay_charge_request',
            'sourceable_id' => $chargeRequest->id,
            'sourceable_type' => PayChargeRequest::class,
            'description' => "Pay charge approved: {$chargeRequest->request_number}",
            'balance_before' => $balanceBefore,
            'balance_after' => $userAsset->balance,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // Update charge request
        $chargeRequest->update([
            'status' => 'approved',
            'admin_note' => $validated['admin_note'] ?? null,
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
            'asset_transaction_id' => $transaction->id,
        ]);

        return response()->json([
            'message' => 'Charge request approved successfully',
            'charge_request' => $chargeRequest->fresh(),
            'transaction' => $transaction,
        ]);
    }

    /**
     * Reject charge request (Admin only)
     */
    public function rejectChargeRequest(Request $request, $id)
    {
        $validated = $request->validate([
            'admin_note' => 'required|string',
        ]);

        $chargeRequest = PayChargeRequest::findOrFail($id);

        if (!$chargeRequest->isPending()) {
            return response()->json(['error' => 'Request is not in pending status'], 400);
        }

        $chargeRequest->update([
            'status' => 'rejected',
            'admin_note' => $validated['admin_note'],
            'rejected_at' => now(),
        ]);

        return response()->json([
            'message' => 'Charge request rejected',
            'charge_request' => $chargeRequest,
        ]);
    }

    /**
     * Get all pending charge requests (Admin only)
     */
    public function getPendingChargeRequests(Request $request)
    {
        $requests = PayChargeRequest::pending()
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->paginate($request->get('per_page', 20));

        return response()->json($requests);
    }

    /**
     * Get charge request statistics (Admin only)
     */
    public function getChargeStatistics()
    {
        $stats = [
            'pending_count' => PayChargeRequest::pending()->count(),
            'pending_amount' => PayChargeRequest::pending()->sum('amount'),
            'approved_today' => PayChargeRequest::approved()
                ->whereDate('approved_at', today())
                ->count(),
            'approved_amount_today' => PayChargeRequest::approved()
                ->whereDate('approved_at', today())
                ->sum('amount'),
            'total_approved' => PayChargeRequest::approved()->count(),
            'total_approved_amount' => PayChargeRequest::approved()->sum('amount'),
        ];

        return response()->json($stats);
    }
}
