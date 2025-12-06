<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssetType;
use App\Models\UserAsset;
use App\Models\AssetTransaction;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    /**
     * Get all available asset types
     */
    public function getAssetTypes()
    {
        $assetTypes = AssetType::active()
            ->orderBy('sort_order')
            ->get();

        return response()->json($assetTypes);
    }

    /**
     * Get user's all assets
     */
    public function getUserAssets(Request $request)
    {
        $user = $request->user();

        $assets = UserAsset::where('user_id', $user->id)
            ->with('assetType')
            ->get();

        // If user has no assets, initialize them
        if ($assets->isEmpty()) {
            $this->initializeUserAssets($user);
            $assets = UserAsset::where('user_id', $user->id)
                ->with('assetType')
                ->get();
        }

        return response()->json([
            'assets' => $assets,
            'total_balance' => $assets->sum('balance'),
        ]);
    }

    /**
     * Get specific asset balance
     */
    public function getAssetBalance(Request $request, $assetTypeCode)
    {
        $user = $request->user();

        $assetType = AssetType::where('code', $assetTypeCode)->firstOrFail();

        $userAsset = UserAsset::where('user_id', $user->id)
            ->where('asset_type_id', $assetType->id)
            ->with('assetType')
            ->first();

        if (!$userAsset) {
            // Create if doesn't exist
            $userAsset = UserAsset::create([
                'user_id' => $user->id,
                'asset_type_id' => $assetType->id,
                'balance' => 0,
                'pending_balance' => 0,
            ]);
            $userAsset->load('assetType');
        }

        return response()->json($userAsset);
    }

    /**
     * Get asset transaction history
     */
    public function getTransactionHistory(Request $request, $assetTypeCode = null)
    {
        $user = $request->user();

        $query = AssetTransaction::where('user_id', $user->id)
            ->with('assetType');

        if ($assetTypeCode) {
            $assetType = AssetType::where('code', $assetTypeCode)->firstOrFail();
            $query->where('asset_type_id', $assetType->id);
        }

        $transactions = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 20));

        return response()->json($transactions);
    }

    /**
     * Initialize user assets with all active asset types
     */
    private function initializeUserAssets($user)
    {
        $assetTypes = AssetType::active()->get();

        foreach ($assetTypes as $assetType) {
            UserAsset::firstOrCreate(
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
        }
    }

    /**
     * Transfer between assets (admin function or special cases)
     */
    public function transfer(Request $request)
    {
        $validated = $request->validate([
            'from_asset_type' => 'required|exists:asset_types,code',
            'to_asset_type' => 'required|exists:asset_types,code',
            'amount' => 'required|numeric|min:0.01',
            'note' => 'nullable|string',
        ]);

        $user = $request->user();

        $fromAssetType = AssetType::where('code', $validated['from_asset_type'])->first();
        $toAssetType = AssetType::where('code', $validated['to_asset_type'])->first();

        $fromAsset = UserAsset::where('user_id', $user->id)
            ->where('asset_type_id', $fromAssetType->id)
            ->firstOrFail();

        $toAsset = UserAsset::where('user_id', $user->id)
            ->where('asset_type_id', $toAssetType->id)
            ->firstOrFail();

        if (!$fromAsset->hasBalance($validated['amount'])) {
            return response()->json(['error' => 'Insufficient balance'], 400);
        }

        // Deduct from source
        $balanceBefore = $fromAsset->balance;
        $fromAsset->decrement('balance', $validated['amount']);
        $fromAsset->refresh();

        AssetTransaction::create([
            'user_id' => $user->id,
            'asset_type_id' => $fromAssetType->id,
            'user_asset_id' => $fromAsset->id,
            'amount' => $validated['amount'],
            'type' => 'debit',
            'transaction_type' => 'transfer',
            'source' => 'transfer_out',
            'sourceable_id' => $toAsset->id,
            'sourceable_type' => UserAsset::class,
            'description' => $validated['note'] ?? "Transfer to {$toAssetType->name}",
            'balance_before' => $balanceBefore,
            'balance_after' => $fromAsset->balance,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // Add to destination
        $balanceBefore = $toAsset->balance;
        $toAsset->increment('balance', $validated['amount']);
        $toAsset->refresh();

        AssetTransaction::create([
            'user_id' => $user->id,
            'asset_type_id' => $toAssetType->id,
            'user_asset_id' => $toAsset->id,
            'amount' => $validated['amount'],
            'type' => 'credit',
            'transaction_type' => 'transfer',
            'source' => 'transfer_in',
            'sourceable_id' => $fromAsset->id,
            'sourceable_type' => UserAsset::class,
            'description' => $validated['note'] ?? "Transfer from {$fromAssetType->name}",
            'balance_before' => $balanceBefore,
            'balance_after' => $toAsset->balance,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        return response()->json([
            'message' => 'Transfer completed successfully',
            'from_asset' => $fromAsset->fresh()->load('assetType'),
            'to_asset' => $toAsset->fresh()->load('assetType'),
        ]);
    }
}
