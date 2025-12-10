import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const categories = [
    { id: 1, name: '전자기기', slug: 'electronics', products: 156, image: '/assets/img/product/prodcut-1.jpg', status: '활성' },
    { id: 2, name: '액세서리', slug: 'accessories', products: 89, image: '/assets/img/product/prodcut-3.jpg', status: '활성' },
    { id: 3, name: '웨어러블', slug: 'wearables', products: 45, image: '/assets/img/product/prodcut-5.jpg', status: '활성' },
    { id: 4, name: '게임', slug: 'gaming', products: 67, image: '/assets/img/product/prodcut-8.jpg', status: '활성' },
    { id: 5, name: '홈 & 리빙', slug: 'home-living', products: 0, image: '/assets/img/product/prodcut-10.jpg', status: '비활성' },
];

export default function Category() {
    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">카테고리</h3>
                        <p className="text-gray-500">상품 카테고리를 관리하세요</p>
                    </div>
                    <button className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                        + 카테고리 추가
                    </button>
                </div>

                {/* Add Category Form */}
                <div className="bg-white rounded-md shadow-sm p-6 mb-6">
                    <h4 className="text-lg font-semibold mb-4">새 카테고리 추가</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리명</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                placeholder="카테고리명을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">상위 카테고리</label>
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500">
                                <option>없음 (최상위)</option>
                                <option>전자기기</option>
                                <option>액세서리</option>
                                <option>웨어러블</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                                카테고리 추가
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-md shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                    <input type="checkbox" className="rounded" />
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">카테고리</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">슬러그</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">상품 수</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">상태</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-10 h-10 rounded-md object-cover"
                                            />
                                            <span className="font-medium text-gray-800">{category.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{category.slug}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{category.products}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            category.status === '활성' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/harri-admin/category/${category.id}`}
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
