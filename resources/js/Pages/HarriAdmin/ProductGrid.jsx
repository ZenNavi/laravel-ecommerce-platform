import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const products = [
    { id: 1, name: 'iPhone 15 Pro Max', sku: 'APL-IP15PM', price: '₩1,899,000', stock: 45, category: '전자기기', status: '판매중', image: '/assets/img/product/prodcut-1.jpg' },
    { id: 2, name: 'MacBook Air M3', sku: 'APL-MBA-M3', price: '₩1,599,000', stock: 28, category: '전자기기', status: '판매중', image: '/assets/img/product/prodcut-2.jpg' },
    { id: 3, name: 'AirPods Pro 2', sku: 'APL-APP2', price: '₩359,000', stock: 120, category: '액세서리', status: '판매중', image: '/assets/img/product/prodcut-3.jpg' },
    { id: 4, name: 'iPad Pro 12.9"', sku: 'APL-IPDP12', price: '₩1,499,000', stock: 15, category: '전자기기', status: '재고부족', image: '/assets/img/product/prodcut-4.jpg' },
    { id: 5, name: 'Apple Watch Ultra 2', sku: 'APL-AWU2', price: '₩1,149,000', stock: 0, category: '웨어러블', status: '품절', image: '/assets/img/product/prodcut-5.jpg' },
    { id: 6, name: 'Samsung Galaxy S24', sku: 'SAM-GS24', price: '₩1,199,000', stock: 67, category: '전자기기', status: '판매중', image: '/assets/img/product/prodcut-6.jpg' },
    { id: 7, name: 'Sony WH-1000XM5', sku: 'SNY-WH5', price: '₩429,000', stock: 34, category: '액세서리', status: '판매중', image: '/assets/img/product/prodcut-7.jpg' },
    { id: 8, name: 'Nintendo Switch OLED', sku: 'NTD-SWOLED', price: '₩419,000', stock: 22, category: '게임', status: '판매중', image: '/assets/img/product/prodcut-8.jpg' },
];

export default function ProductGrid() {
    const getStatusColor = (status) => {
        switch (status) {
            case '판매중':
                return 'bg-green-100 text-green-600';
            case '재고부족':
                return 'bg-yellow-100 text-yellow-600';
            case '품절':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">상품 그리드</h3>
                        <p className="text-gray-500">상품을 관리하세요</p>
                    </div>
                    <Link
                        href="/harri-admin/add-product"
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        + 상품 추가
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-md shadow-sm mb-6">
                    <div className="p-4 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="상품 검색..."
                                className="border border-gray-200 rounded-md px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
                            />
                            <select className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                                <option>전체 카테고리</option>
                                <option>전자기기</option>
                                <option>액세서리</option>
                                <option>웨어러블</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/harri-admin/product-list"
                                className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                            >
                                목록
                            </Link>
                            <Link
                                href="/harri-admin/product-grid"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                            >
                                그리드
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-md shadow-sm overflow-hidden group">
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                    {product.status}
                                </span>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Link
                                        href={`/harri-admin/edit-product/${product.id}`}
                                        className="p-2 bg-white text-blue-600 rounded-md hover:bg-blue-50"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </Link>
                                    <button className="p-2 bg-white text-red-600 rounded-md hover:bg-red-50">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-gray-400 mb-1">{product.sku}</p>
                                <h4 className="font-medium text-gray-800 mb-2 truncate">{product.name}</h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-blue-600">{product.price}</span>
                                    <span className="text-sm text-gray-500">재고: {product.stock}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">{product.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-white" disabled>
                        이전
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">1</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-white bg-white">2</button>
                    <button className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-white bg-white">
                        다음
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
