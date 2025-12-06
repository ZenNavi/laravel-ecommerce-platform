import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

export default function ProductShow({ auth, product }) {
    const [quantity, setQuantity] = useState(1);
    const { post, processing } = useForm();

    const addToCart = () => {
        post(`/cart/add/${product.id}`, {
            data: { quantity },
        });
    };

    return (
        <MainLayout auth={auth}>
            <Head title={product.name} />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <nav className="mb-8">
                    <Link href="/products" className="text-indigo-600 hover:text-indigo-800">
                        &larr; Back to Products
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-gray-200 rounded-lg overflow-hidden">
                        <img
                            src={product.image || '/images/placeholder.png'}
                            alt={product.name}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                        {product.category && (
                            <p className="mt-2 text-sm text-gray-500">
                                Category: {product.category.name}
                            </p>
                        )}

                        <p className="mt-4 text-3xl font-bold text-indigo-600">
                            ${product.price}
                        </p>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Description</h3>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-6">
                            {product.stock_quantity > 0 ? (
                                <p className="text-green-600">
                                    In Stock ({product.stock_quantity} available)
                                </p>
                            ) : (
                                <p className="text-red-600">Out of Stock</p>
                            )}
                        </div>

                        {/* Add to Cart */}
                        {product.stock_quantity > 0 && auth?.user && (
                            <div className="mt-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={addToCart}
                                        disabled={processing}
                                        className="flex-1 bg-indigo-600 text-white py-3 px-8 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Adding...' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {!auth?.user && (
                            <div className="mt-8">
                                <Link
                                    href="/login"
                                    className="block text-center bg-indigo-600 text-white py-3 px-8 rounded-md font-medium hover:bg-indigo-700"
                                >
                                    Login to Purchase
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
