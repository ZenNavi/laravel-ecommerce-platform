import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function ProductsIndex({ auth, products, categories = [] }) {
    return (
        <MainLayout auth={auth}>
            <Head title="상품" />

            <div className="max-w-6xl mx-auto py-12 px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-semibold text-gray-900">상품</h1>
                    <p className="mt-2 text-gray-500">엄선된 상품 컬렉션을 둘러보세요.</p>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                    <div className="mb-10">
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/products"
                                className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium"
                            >
                                전체
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.slug}`}
                                    className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {products?.data?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.data.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="group"
                                >
                                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                                        <img
                                            src={product.image || '/images/placeholder.png'}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-400 line-clamp-1">
                                                {product.description}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            ₩{Number(product.price).toLocaleString()}
                                        </span>
                                    </div>
                                    {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                                        <p className="mt-2 text-xs text-amber-600">
                                            {product.stock_quantity}개 남음
                                        </p>
                                    )}
                                    {product.stock_quantity === 0 && (
                                        <p className="mt-2 text-xs text-gray-400">품절</p>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="mt-16 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    {products.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                            } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400">등록된 상품이 없습니다.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
