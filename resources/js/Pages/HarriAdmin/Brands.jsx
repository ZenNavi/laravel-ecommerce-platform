import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const brands = [
    { id: 1, name: 'Apple', slug: 'apple', products: 45, logo: '/assets/img/product/prodcut-1.jpg', status: '활성' },
    { id: 2, name: 'Samsung', slug: 'samsung', products: 38, logo: '/assets/img/product/prodcut-6.jpg', status: '활성' },
    { id: 3, name: 'Sony', slug: 'sony', products: 22, logo: '/assets/img/product/prodcut-7.jpg', status: '활성' },
    { id: 4, name: 'Nintendo', slug: 'nintendo', products: 15, logo: '/assets/img/product/prodcut-8.jpg', status: '활성' },
    { id: 5, name: 'LG', slug: 'lg', products: 0, logo: '/assets/img/product/prodcut-9.jpg', status: '비활성' },
];

export default function Brands() {
    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">브랜드</h3>
                        <p className="text-gray-500">상품 브랜드를 관리하세요</p>
                    </div>
                    <button className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                        + 브랜드 추가
                    </button>
                </div>

                {/* Add Brand Form */}
                <div className="bg-white rounded-md shadow-sm p-6 mb-6">
                    <h4 className="text-lg font-semibold mb-4">새 브랜드 추가</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">브랜드명</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                placeholder="브랜드명을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">로고</label>
                            <input
                                type="file"
                                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500">
                                <option>활성</option>
                                <option>비활성</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                                브랜드 추가
                            </button>
                        </div>
                    </div>
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {brands.map((brand) => (
                        <div key={brand.id} className="bg-white rounded-md shadow-sm p-6 text-center">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h4 className="font-medium text-gray-800 mb-1">{brand.name}</h4>
                            <p className="text-sm text-gray-500 mb-3">{brand.products}개 상품</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                brand.status === '활성' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {brand.status}
                            </span>
                            <div className="flex justify-center gap-2 mt-4">
                                <Link
                                    href={`/harri-admin/brands/${brand.id}`}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </Link>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
