<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reward;
use App\Models\RewardRedemption;
use App\Models\RewardPointsTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RewardController extends Controller
{
    public function index()
    {
        $rewards = Reward::where('is_active', true)
            ->where(function($q) {
                $q->whereNull('valid_until')
                  ->orWhere('valid_until', '>=', now());
            })
            ->get();

        return response()->json($rewards);
    }

    public function show($id)
    {
        $reward = Reward::where('is_active', true)->findOrFail($id);

        return response()->json($reward);
    }

    public function redeem(Request $request, $id)
    {
        $reward = Reward::where('is_active', true)->findOrFail($id);
        $user = $request->user();

        // Check if user has enough points
        if ($user->reward_points < $reward->points_required) {
            return response()->json(['error' => 'Insufficient points'], 400);
        }

        // Check quantity limits
        if ($reward->quantity !== null && $reward->redeemed_count >= $reward->quantity) {
            return response()->json(['error' => 'Reward out of stock'], 400);
        }

        // Check validity dates
        if ($reward->valid_from && $reward->valid_from > now()) {
            return response()->json(['error' => 'Reward not yet available'], 400);
        }

        if ($reward->valid_until && $reward->valid_until < now()) {
            return response()->json(['error' => 'Reward expired'], 400);
        }

        // Create redemption
        $redemption = RewardRedemption::create([
            'user_id' => $user->id,
            'reward_id' => $reward->id,
            'points_spent' => $reward->points_required,
            'redemption_code' => 'RED-' . strtoupper(Str::random(10)),
            'status' => 'completed',
        ]);

        // Deduct points
        $user->decrement('reward_points', $reward->points_required);

        // Record transaction
        RewardPointsTransaction::create([
            'user_id' => $user->id,
            'points' => -$reward->points_required,
            'type' => 'spent',
            'source' => 'reward_redemption',
            'sourceable_id' => $redemption->id,
            'sourceable_type' => RewardRedemption::class,
            'description' => 'Redeemed: ' . $reward->name,
        ]);

        // Increment redemption count
        $reward->increment('redeemed_count');

        return response()->json($redemption->load('reward'), 201);
    }

    public function myRedemptions(Request $request)
    {
        $redemptions = RewardRedemption::where('user_id', $request->user()->id)
            ->with('reward')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($redemptions);
    }

    public function pointsHistory(Request $request)
    {
        $transactions = RewardPointsTransaction::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($transactions);
    }
}
