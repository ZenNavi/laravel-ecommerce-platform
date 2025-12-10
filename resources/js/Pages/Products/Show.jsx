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

            <div className="max-w-6xl mx-auto py-12 px-6 lg:px-8">
                <nav className="mb-10">
                    <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        상품 목록으로
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
                        <img
                            src={product.image || '/images/placeholder.png'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        {product.category && (
                            <p className="text-sm text-gray-400 mb-2">
                                {product.category.name}
                            </p>
                        )}

                        <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

                        <p className="mt-4 text-2xl font-medium text-gray-900">
                            ₩{Number(product.price).toLocaleString()}
                        </p>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">상품 설명</h3>
                            <p className="text-gray-500 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-6">
                            {product.stock_quantity > 0 ? (
                                <p className="text-sm text-gray-500">
                                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                    재고 있음 ({product.stock_quantity}개)
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                                    품절
                                </p>
                            )}
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-auto pt-8">
                            {product.stock_quantity > 0 && auth?.user && (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-200 rounded-full">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                            className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button
                                        onClick={addToCart}
                                        disabled={processing}
                                        className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                                    >
                                        {processing ? '담는 중...' : '장바구니 담기'}
                                    </button>
                                </div>
                            )}

                            {product.stock_quantity > 0 && !auth?.user && (
                                <Link
                                    href="/login"
                                    className="block text-center bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-colors"
                                >
                                    로그인하고 구매하기
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
