<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
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

/*
|--------------------------------------------------------------------------
| Harri Frontend Routes
|--------------------------------------------------------------------------
*/
Route::prefix('harri')->name('harri.')->group(function () {
    // Home
    Route::get('/', fn() => Inertia::render('Harri/Home'))->name('home');

    // Shop
    Route::get('/shop', fn() => Inertia::render('Harri/Shop'))->name('shop');
    Route::get('/product/{id}', fn($id) => Inertia::render('Harri/ProductDetails', ['productId' => $id]))->name('product');
    Route::get('/search', fn() => Inertia::render('Harri/Search'))->name('search');

    // Cart & Checkout
    Route::get('/cart', fn() => Inertia::render('Harri/Cart'))->name('cart');
    Route::get('/checkout', fn() => Inertia::render('Harri/Checkout'))->name('checkout');
    Route::get('/wishlist', fn() => Inertia::render('Harri/Wishlist'))->name('wishlist');

    // Auth
    Route::get('/login', fn() => Inertia::render('Harri/Login'))->name('login');
    Route::get('/register', fn() => Inertia::render('Harri/Register'))->name('register');
    Route::get('/forgot', fn() => Inertia::render('Harri/Forgot'))->name('forgot');

    // User
    Route::get('/dashboard', fn() => Inertia::render('Harri/Dashboard'))->name('dashboard');
    Route::get('/order', fn() => Inertia::render('Harri/Order'))->name('order');

    // Info Pages
    Route::get('/about', fn() => Inertia::render('Harri/About'))->name('about');
    Route::get('/contact', fn() => Inertia::render('Harri/Contact'))->name('contact');
    Route::get('/faq', fn() => Inertia::render('Harri/Faq'))->name('faq');
    Route::get('/terms', fn() => Inertia::render('Harri/Terms'))->name('terms');
    Route::get('/policy', fn() => Inertia::render('Harri/Policy'))->name('policy');
});

/*
|--------------------------------------------------------------------------
| Harri Admin Routes
|--------------------------------------------------------------------------
*/
Route::prefix('harri-admin')->name('harri-admin.')->group(function () {
    // Auth (public)
    Route::get('/login', fn() => Inertia::render('HarriAdmin/Login'))->name('login');
    Route::get('/register', fn() => Inertia::render('HarriAdmin/Register'))->name('register');
    Route::get('/forgot-password', fn() => Inertia::render('HarriAdmin/ForgotPassword'))->name('forgot-password');

    // Dashboard
    Route::get('/', fn() => Inertia::render('HarriAdmin/Dashboard'))->name('home');
    Route::get('/dashboard', fn() => Inertia::render('HarriAdmin/Dashboard'))->name('dashboard');

    // Products
    Route::get('/product-list', fn() => Inertia::render('HarriAdmin/ProductList'))->name('product-list');
    Route::get('/product-grid', fn() => Inertia::render('HarriAdmin/ProductGrid'))->name('product-grid');
    Route::get('/add-product', fn() => Inertia::render('HarriAdmin/AddProduct'))->name('add-product');
    Route::get('/edit-product/{id}', fn($id) => Inertia::render('HarriAdmin/EditProduct', ['productId' => $id]))->name('edit-product');

    // Category
    Route::get('/category', fn() => Inertia::render('HarriAdmin/Category'))->name('category');
    Route::get('/category/{id}', fn($id) => Inertia::render('HarriAdmin/CategoryEdit', ['categoryId' => $id]))->name('category-edit');

    // Orders
    Route::get('/orders', fn() => Inertia::render('HarriAdmin/Orders'))->name('orders');
    Route::get('/orders/{id}', fn($id) => Inertia::render('HarriAdmin/OrderEdit', ['orderId' => $id]))->name('order-edit');
    Route::get('/order-details/{id}', fn($id) => Inertia::render('HarriAdmin/OrderDetails', ['orderId' => $id]))->name('order-details');

    // Brands
    Route::get('/brands', fn() => Inertia::render('HarriAdmin/Brands'))->name('brands');
    Route::get('/brands/{id}', fn($id) => Inertia::render('HarriAdmin/BrandEdit', ['brandId' => $id]))->name('brand-edit');

    // Coupons
    Route::get('/coupon', fn() => Inertia::render('HarriAdmin/Coupon'))->name('coupon');
    Route::get('/coupon/{id}', fn($id) => Inertia::render('HarriAdmin/CouponEdit', ['couponId' => $id]))->name('coupon-edit');

    // Profile
    Route::get('/profile', fn() => Inertia::render('HarriAdmin/Profile'))->name('profile');

    // Staff
    Route::get('/our-staff', fn() => Inertia::render('HarriAdmin/OurStaff'))->name('our-staff');
    Route::get('/our-staff/{id}', fn($id) => Inertia::render('HarriAdmin/StaffEdit', ['staffId' => $id]))->name('staff-edit');
});

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
