<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
        $cart->load('items.product');

        return response()->json([
            'cart' => $cart,
            'total' => $cart->total,
        ]);
    }

    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if ($product->stock_quantity < $validated['quantity']) {
            return response()->json(['error' => 'Insufficient stock'], 400);
        }

        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'price' => $product->current_price,
            ]);
        }

        $cart->load('items.product');

        return response()->json([
            'message' => 'Item added to cart',
            'cart' => $cart,
        ]);
    }

    public function updateItem(Request $request, $itemId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::findOrFail($itemId);
        $cart = $cartItem->cart;

        if ($cart->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($cartItem->product->stock_quantity < $validated['quantity']) {
            return response()->json(['error' => 'Insufficient stock'], 400);
        }

        $cartItem->update(['quantity' => $validated['quantity']]);
        $cart->load('items.product');

        return response()->json([
            'message' => 'Cart item updated',
            'cart' => $cart,
        ]);
    }

    public function removeItem($itemId)
    {
        $cartItem = CartItem::findOrFail($itemId);
        $cart = $cartItem->cart;

        if ($cart->user_id !== request()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $cartItem->delete();
        $cart->load('items.product');

        return response()->json([
            'message' => 'Item removed from cart',
            'cart' => $cart,
        ]);
    }

    public function clear(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->first();

        if ($cart) {
            $cart->items()->delete();
        }

        return response()->json(['message' => 'Cart cleared']);
    }
}
