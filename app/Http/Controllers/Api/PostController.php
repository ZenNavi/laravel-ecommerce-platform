<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user', 'category')
            ->where('status', 'published');

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $posts = $query->orderBy('is_pinned', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($posts);
    }

    public function show($id)
    {
        $post = Post::with('user', 'category', 'comments.user')->findOrFail($id);
        $post->increment('views_count');

        return response()->json($post);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:posts',
            'content' => 'required|string',
            'images' => 'nullable|array',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $validated['user_id'] = $request->user()->id;

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:posts,slug,' . $id,
            'content' => 'sometimes|string',
            'images' => 'nullable|array',
            'status' => 'nullable|in:draft,published,archived',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== request()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function like($id)
    {
        $post = Post::findOrFail($id);
        $user = request()->user();

        $like = $post->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
            $post->decrement('likes_count');
            $message = 'Post unliked';
        } else {
            $post->likes()->create(['user_id' => $user->id]);
            $post->increment('likes_count');
            $message = 'Post liked';
        }

        return response()->json(['message' => $message, 'likes_count' => $post->likes_count]);
    }
}
