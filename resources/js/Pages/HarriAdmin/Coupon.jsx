import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const coupons = [
    { id: 1, code: 'WELCOME10', type: '퍼센트', value: '10%', minOrder: '₩50,000', uses: 156, limit: 500, expiry: '2024-03-31', status: '활성' },
    { id: 2, code: 'SAVE5000', type: '정액', value: '₩5,000', minOrder: '₩30,000', uses: 89, limit: 200, expiry: '2024-02-28', status: '활성' },
    { id: 3, code: 'FREESHIP', type: '무료배송', value: '-', minOrder: '₩100,000', uses: 234, limit: 1000, expiry: '2024-12-31', status: '활성' },
    { id: 4, code: 'SUMMER20', type: '퍼센트', value: '20%', minOrder: '₩100,000', uses: 500, limit: 500, expiry: '2023-08-31', status: '만료됨' },
    { id: 5, code: 'VIP30', type: '퍼센트', value: '30%', minOrder: '₩200,000', uses: 0, limit: 100, expiry: '2024-06-30', status: '비활성' },
];

export default function Coupon() {
    const getStatusColor = (status) => {
        switch (status) {
            case '활성':
                return 'bg-green-100 text-green-600';
            case '만료됨':
                return 'bg-red-100 text-red-600';
            case '비활성':
                return 'bg-gray-100 text-gray-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">쿠폰</h3>
                        <p className="text-gray-500">할인 쿠폰을 관리하세요</p>
                    </div>
                    <button className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                        + 쿠폰 추가
                    </button>
                </div>

                {/* Add Coupon Form */}
                <div className="bg-white rounded-md shadow-sm p-6 mb-6">
                    <h4 className="text-lg font-semibold mb-4">새 쿠폰 추가</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">쿠폰 코드</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                placeholder="예: SAVE10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">할인 유형</label>
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500">
                                <option>퍼센트</option>
                                <option>정액</option>
                                <option>무료배송</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">할인값</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                placeholder="예: 10 또는 5000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">만료일</label>
                            <input
                                type="date"
                                className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">최소 주문금액</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                placeholder="₩0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">사용 제한</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                placeholder="예: 100"
                            />
                        </div>
                        <div className="lg:col-span-2 flex items-end">
                            <button className="bg-blue-600 text-white px-8 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                                쿠폰 추가
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coupons Table */}
                <div className="bg-white rounded-md shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">코드</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">유형</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">할인값</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">최소 주문</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">사용</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">만료일</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">상태</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">{coupon.code}</code>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{coupon.type}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{coupon.value}</td>
                                    <td className="px-6 py-4 text-gray-600">{coupon.minOrder}</td>
                                    <td className="px-6 py-4 text-gray-600">{coupon.uses}/{coupon.limit}</td>
                                    <td className="px-6 py-4 text-gray-600">{coupon.expiry}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                                            {coupon.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/harri-admin/coupon/${coupon.id}`}
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
