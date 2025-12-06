<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\RewardPointsTransaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReferralController extends Controller
{
    public function getReferralCode(Request $request)
    {
        $user = $request->user();

        if (!$user->referral_code) {
            $user->referral_code = strtoupper(Str::random(8));
            $user->save();
        }

        return response()->json([
            'referral_code' => $user->referral_code,
            'referral_url' => url('/register?ref=' . $user->referral_code),
        ]);
    }

    public function myReferrals(Request $request)
    {
        $referrals = Referral::where('referrer_id', $request->user()->id)
            ->with('referred')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $stats = [
            'total_referrals' => Referral::where('referrer_id', $request->user()->id)->count(),
            'completed_referrals' => Referral::where('referrer_id', $request->user()->id)
                ->where('status', 'completed')
                ->count(),
            'total_points_earned' => Referral::where('referrer_id', $request->user()->id)
                ->where('status', 'completed')
                ->sum('points_awarded'),
        ];

        return response()->json([
            'referrals' => $referrals,
            'stats' => $stats,
        ]);
    }

    public function completeReferral(Request $request)
    {
        $validated = $request->validate([
            'referral_code' => 'required|string|exists:users,referral_code',
        ]);

        $referrer = User::where('referral_code', $validated['referral_code'])->first();
        $referred = $request->user();

        if ($referrer->id === $referred->id) {
            return response()->json(['error' => 'Cannot refer yourself'], 400);
        }

        // Check if already referred
        $existingReferral = Referral::where('referred_id', $referred->id)->first();
        if ($existingReferral) {
            return response()->json(['error' => 'Already referred by someone'], 400);
        }

        $bonusPoints = config('rewards.referral_bonus_points', 100);

        // Create referral
        $referral = Referral::create([
            'referrer_id' => $referrer->id,
            'referred_id' => $referred->id,
            'points_awarded' => $bonusPoints,
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // Award points to referrer
        $referrer->increment('reward_points', $bonusPoints);

        // Record transaction
        RewardPointsTransaction::create([
            'user_id' => $referrer->id,
            'points' => $bonusPoints,
            'type' => 'earned',
            'source' => 'referral',
            'sourceable_id' => $referral->id,
            'sourceable_type' => Referral::class,
            'description' => 'Referral bonus for inviting ' . $referred->name,
        ]);

        // Update referred user
        $referred->update(['referred_by' => $referrer->id]);

        return response()->json([
            'message' => 'Referral completed successfully',
            'referral' => $referral,
        ], 201);
    }
}
