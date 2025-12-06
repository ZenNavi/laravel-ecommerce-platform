<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function balance(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'balance' => $user->wallet_balance,
            'reward_points' => $user->reward_points,
        ]);
    }

    public function transactions(Request $request)
    {
        $transactions = WalletTransaction::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($transactions);
    }

    public function addFunds(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:credit_card,paypal,stripe',
        ]);

        // In a real application, you would process payment with gateway here
        // For now, we'll just add the funds directly

        $user = $request->user();
        $balanceBefore = $user->wallet_balance;
        $user->increment('wallet_balance', $validated['amount']);
        $user->refresh();

        $transaction = WalletTransaction::create([
            'user_id' => $user->id,
            'amount' => $validated['amount'],
            'type' => 'credit',
            'source' => 'deposit',
            'sourceable_id' => $user->id,
            'sourceable_type' => get_class($user),
            'description' => 'Wallet top-up via ' . $validated['payment_method'],
            'balance_before' => $balanceBefore,
            'balance_after' => $user->wallet_balance,
        ]);

        return response()->json([
            'message' => 'Funds added successfully',
            'transaction' => $transaction,
            'new_balance' => $user->wallet_balance,
        ], 201);
    }
}
