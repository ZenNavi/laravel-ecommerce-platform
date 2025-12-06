<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with('items.product', 'payments')
            ->where('user_id', request()->user()->id)
            ->findOrFail($id);

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_address' => 'required|string',
            'billing_address' => 'nullable|string',
            'notes' => 'nullable|string',
            'use_points' => 'nullable|integer|min:0',
        ]);

        $cart = Cart::where('user_id', $request->user()->id)->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        $subtotal = $cart->total;
        $tax = $subtotal * 0.1; // 10% tax
        $shippingCost = 10.00;
        $discount = 0;

        // Calculate points discount
        $pointsUsed = $validated['use_points'] ?? 0;
        if ($pointsUsed > 0) {
            $user = $request->user();
            if ($pointsUsed > $user->reward_points) {
                return response()->json(['error' => 'Insufficient points'], 400);
            }
            $discount = $pointsUsed * 0.01; // 1 point = $0.01
        }

        $total = $subtotal + $tax + $shippingCost - $discount;
        $pointsEarned = floor($total * 0.1); // 10% back in points

        $order = Order::create([
            'user_id' => $request->user()->id,
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping_cost' => $shippingCost,
            'discount' => $discount,
            'total' => $total,
            'points_earned' => $pointsEarned,
            'points_used' => $pointsUsed,
            'shipping_address' => $validated['shipping_address'],
            'billing_address' => $validated['billing_address'] ?? $validated['shipping_address'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'total' => $item->price * $item->quantity,
            ]);

            // Update product stock
            $item->product->decrement('stock_quantity', $item->quantity);
            $item->product->increment('sales_count', $item->quantity);
        }

        // Clear cart
        $cart->items()->delete();

        // Update user points
        if ($pointsUsed > 0) {
            $request->user()->decrement('reward_points', $pointsUsed);
        }

        $order->load('items.product');

        return response()->json($order, 201);
    }

    public function cancel($id)
    {
        $order = Order::where('user_id', request()->user()->id)->findOrFail($id);

        if (!in_array($order->status, ['pending', 'processing'])) {
            return response()->json(['error' => 'Cannot cancel order in current status'], 400);
        }

        $order->update(['status' => 'cancelled']);

        // Restore stock
        foreach ($order->items as $item) {
            $item->product->increment('stock_quantity', $item->quantity);
            $item->product->decrement('sales_count', $item->quantity);
        }

        return response()->json(['message' => 'Order cancelled successfully']);
    }
}
