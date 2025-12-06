<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::withCount(['posts', 'followers', 'following'])
            ->findOrFail($id);

        return response()->json($user);
    }

    public function profile(Request $request)
    {
        $user = $request->user()->load([
            'posts' => fn($q) => $q->latest()->take(5),
            'orders' => fn($q) => $q->latest()->take(5),
        ]);

        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'avatar' => 'nullable|string',
        ]);

        $user->update($validated);

        return response()->json($user);
    }

    public function follow($id)
    {
        $userToFollow = User::findOrFail($id);
        $currentUser = request()->user();

        if ($currentUser->id === $userToFollow->id) {
            return response()->json(['error' => 'Cannot follow yourself'], 400);
        }

        $isFollowing = $currentUser->following()->where('following_id', $userToFollow->id)->exists();

        if ($isFollowing) {
            $currentUser->following()->detach($userToFollow->id);
            $message = 'Unfollowed successfully';
        } else {
            $currentUser->following()->attach($userToFollow->id);
            $message = 'Followed successfully';
        }

        return response()->json(['message' => $message]);
    }

    public function followers($id)
    {
        $user = User::findOrFail($id);
        $followers = $user->followers()->paginate(20);

        return response()->json($followers);
    }

    public function following($id)
    {
        $user = User::findOrFail($id);
        $following = $user->following()->paginate(20);

        return response()->json($following);
    }
}
