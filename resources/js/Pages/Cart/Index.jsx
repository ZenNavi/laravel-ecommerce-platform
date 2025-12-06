import { Head, Link, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function CartIndex({ auth, cart, assetTypes = [] }) {
    const { post, processing } = useForm();

    const updateQuantity = (itemId, quantity) => {
        router.put(`/cart/items/${itemId}`, { quantity });
    };

    const removeItem = (itemId) => {
        router.delete(`/cart/items/${itemId}`);
    };

    const checkout = () => {
        post('/checkout');
    };

    const total = cart?.items?.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    ) || 0;

    return (
        <MainLayout auth={auth}>
            <Head title="Cart" />

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cart?.items?.length > 0 ? (
                    <>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Total
                                        </th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cart.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.product.image || '/images/placeholder.png'}
                                                        alt={item.product.name}
                                                        className="w-12 h-12 rounded object-cover"
                                                    />
                                                    <div className="ml-4">
                                                        <Link
                                                            href={`/products/${item.product.id}`}
                                                            className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                ${item.product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center border rounded-md w-24">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-2 py-1">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Cart Summary */}
                        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between text-lg font-semibold text-gray-900">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={checkout}
                                disabled={processing}
                                className="mt-4 w-full bg-indigo-600 text-white py-3 px-8 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Your cart is empty.</p>
                        <Link
                            href="/products"
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
