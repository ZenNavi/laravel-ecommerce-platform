<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($postId)
    {
        $comments = Comment::where('post_id', $postId)
            ->whereNull('parent_id')
            ->with('user', 'replies.user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($comments);
    }

    public function store(Request $request, $postId)
    {
        $post = Post::findOrFail($postId);

        $validated = $request->validate([
            'content' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'post_id' => $postId,
            'parent_id' => $validated['parent_id'] ?? null,
            'content' => $validated['content'],
        ]);

        $post->increment('comments_count');

        $comment->load('user');

        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update($validated);

        return response()->json($comment);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== request()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post = $comment->post;
        $comment->delete();
        $post->decrement('comments_count');

        return response()->json(['message' => 'Comment deleted successfully']);
    }

    public function like($id)
    {
        $comment = Comment::findOrFail($id);
        $user = request()->user();

        $like = $comment->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
            $comment->decrement('likes_count');
            $message = 'Comment unliked';
        } else {
            $comment->likes()->create(['user_id' => $user->id]);
            $comment->increment('likes_count');
            $message = 'Comment liked';
        }

        return response()->json(['message' => $message, 'likes_count' => $comment->likes_count]);
    }
}
