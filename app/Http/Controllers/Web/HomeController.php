<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Post;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::where('is_active', true)
            ->latest()
            ->take(8)
            ->get();

        $recentPosts = Post::with('user')
            ->withCount(['likes', 'comments'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'recentPosts' => $recentPosts,
        ]);
    }
}
