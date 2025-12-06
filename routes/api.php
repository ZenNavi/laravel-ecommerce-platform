<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RewardController;
use App\Http\Controllers\Api\ReferralController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\RefundController;
use App\Http\Controllers\Api\WalletController;
use App\Http\Controllers\Api\AssetController;
use App\Http\Controllers\Api\PayChargeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);

Route::get('/rewards', [RewardController::class, 'index']);
Route::get('/rewards/{id}', [RewardController::class, 'show']);

Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users/{id}/followers', [UserController::class, 'followers']);
Route::get('/users/{id}/following', [UserController::class, 'following']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {

    // User Profile
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'update']);
    Route::post('/users/{id}/follow', [UserController::class, 'follow']);

    // eCommerce - Products (Admin only - in real app, add admin middleware)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/items', [CartController::class, 'addItem']);
    Route::put('/cart/items/{id}', [CartController::class, 'updateItem']);
    Route::delete('/cart/items/{id}', [CartController::class, 'removeItem']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);

    // Community - Posts
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
    Route::post('/posts/{id}/like', [PostController::class, 'like']);

    // Comments
    Route::get('/posts/{postId}/comments', [CommentController::class, 'index']);
    Route::post('/posts/{postId}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
    Route::post('/comments/{id}/like', [CommentController::class, 'like']);

    // Rewards
    Route::post('/rewards/{id}/redeem', [RewardController::class, 'redeem']);
    Route::get('/rewards/redemptions', [RewardController::class, 'myRedemptions']);
    Route::get('/rewards/points/history', [RewardController::class, 'pointsHistory']);

    // Referrals
    Route::get('/referrals/code', [ReferralController::class, 'getReferralCode']);
    Route::get('/referrals', [ReferralController::class, 'myReferrals']);
    Route::post('/referrals/complete', [ReferralController::class, 'completeReferral']);

    // Payments
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::get('/payments/{id}', [PaymentController::class, 'show']);
    Route::post('/payments', [PaymentController::class, 'createPayment']);
    Route::post('/payments/{id}/confirm', [PaymentController::class, 'confirmPayment']);

    // Refunds
    Route::get('/refunds', [RefundController::class, 'index']);
    Route::get('/refunds/{id}', [RefundController::class, 'show']);
    Route::post('/refunds', [RefundController::class, 'requestRefund']);
    Route::post('/refunds/{id}/process', [RefundController::class, 'processRefund']); // Admin only

    // Wallet
    Route::get('/wallet/balance', [WalletController::class, 'balance']);
    Route::get('/wallet/transactions', [WalletController::class, 'transactions']);
    Route::post('/wallet/add-funds', [WalletController::class, 'addFunds']);

    // Asset Management
    Route::get('/assets/types', [AssetController::class, 'getAssetTypes']);
    Route::get('/assets', [AssetController::class, 'getUserAssets']);
    Route::get('/assets/{assetTypeCode}/balance', [AssetController::class, 'getAssetBalance']);
    Route::get('/assets/transactions', [AssetController::class, 'getTransactionHistory']);
    Route::get('/assets/{assetTypeCode}/transactions', [AssetController::class, 'getTransactionHistory']);
    Route::post('/assets/transfer', [AssetController::class, 'transfer']);

    // Pay Charge Requests
    Route::post('/pay/charge-requests', [PayChargeController::class, 'createChargeRequest']);
    Route::get('/pay/charge-requests', [PayChargeController::class, 'getChargeRequests']);
    Route::get('/pay/charge-requests/{id}', [PayChargeController::class, 'getChargeRequest']);
    Route::post('/pay/charge-requests/{id}/cancel', [PayChargeController::class, 'cancelChargeRequest']);

    // Pay Charge Requests (Admin)
    Route::post('/pay/charge-requests/{id}/approve', [PayChargeController::class, 'approveChargeRequest']);
    Route::post('/pay/charge-requests/{id}/reject', [PayChargeController::class, 'rejectChargeRequest']);
    Route::get('/pay/charge-requests/admin/pending', [PayChargeController::class, 'getPendingChargeRequests']);
    Route::get('/pay/charge-requests/admin/statistics', [PayChargeController::class, 'getChargeStatistics']);
});

// Health check
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});
