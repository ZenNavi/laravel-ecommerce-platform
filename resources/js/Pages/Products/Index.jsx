import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function ProductsIndex({ auth, products, categories = [] }) {
    return (
        <MainLayout auth={auth}>
            <Head title="Products" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/products"
                                className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium"
                            >
                                All
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.slug}`}
                                    className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.data.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                                            <img
                                                src={product.image || '/images/placeholder.png'}
                                                alt={product.name}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                                                {product.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    ${product.price}
                                                </span>
                                                {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                                                    <span className="text-xs text-orange-600">
                                                        Only {product.stock_quantity} left
                                                    </span>
                                                )}
                                                {product.stock_quantity === 0 && (
                                                    <span className="text-xs text-red-600">Out of stock</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex space-x-2">
                                    {products.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No products available yet.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
