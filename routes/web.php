<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\ProductController;
use App\Http\Controllers\Web\CommunityController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Products
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

// Community
Route::get('/community', [CommunityController::class, 'index'])->name('community.index');
Route::get('/posts/{id}', [CommunityController::class, 'show'])->name('posts.show');

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => \Inertia\Inertia::render('Auth/Login'))->name('login');
    Route::get('/register', fn() => \Inertia\Inertia::render('Auth/Register'))->name('register');
});

// Protected routes
Route::middleware('auth')->group(function () {
    // Community - Create Post
    Route::post('/posts', [CommunityController::class, 'store'])->name('posts.store');

    // Cart
    Route::get('/cart', fn() => \Inertia\Inertia::render('Cart/Index', [
        'cart' => auth()->user()->cart?->load('items.product'),
    ]))->name('cart.index');

    // Wallet
    Route::get('/wallet', fn() => \Inertia\Inertia::render('Wallet/Index', [
        'assets' => auth()->user()->assets()->with('assetType')->get(),
        'transactions' => auth()->user()->assetTransactions()->latest()->take(20)->get(),
    ]))->name('wallet.index');

    // Orders
    Route::get('/orders', fn() => \Inertia\Inertia::render('Orders/Index', [
        'orders' => auth()->user()->orders()->with('items.product')->latest()->paginate(10),
    ]))->name('orders.index');

    // Logout
    Route::post('/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});
