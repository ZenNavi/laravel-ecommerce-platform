import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const orders = [
    { id: '#ORD-1001', customer: '김철수', email: 'chulsoo@example.com', total: '₩1,899,000', items: 2, status: '배송완료', payment: '결제완료', date: '2024-01-15' },
    { id: '#ORD-1002', customer: '이영희', email: 'younghee@example.com', total: '₩3,098,000', items: 3, status: '처리중', payment: '결제완료', date: '2024-01-14' },
    { id: '#ORD-1003', customer: '박민수', email: 'minsoo@example.com', total: '₩359,000', items: 1, status: '대기중', payment: '대기중', date: '2024-01-14' },
    { id: '#ORD-1004', customer: '최지은', email: 'jieun@example.com', total: '₩1,499,000', items: 1, status: '배송중', payment: '결제완료', date: '2024-01-13' },
    { id: '#ORD-1005', customer: '정현우', email: 'hyunwoo@example.com', total: '₩2,298,000', items: 4, status: '취소됨', payment: '환불완료', date: '2024-01-12' },
];

export default function Orders() {
    const getStatusColor = (status) => {
        switch (status) {
            case '배송완료':
                return 'bg-green-100 text-green-600';
            case '처리중':
                return 'bg-blue-100 text-blue-600';
            case '대기중':
                return 'bg-yellow-100 text-yellow-600';
            case '배송중':
                return 'bg-purple-100 text-purple-600';
            case '취소됨':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getPaymentColor = (payment) => {
        switch (payment) {
            case '결제완료':
                return 'text-green-600';
            case '대기중':
                return 'text-yellow-600';
            case '환불완료':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">주문 관리</h3>
                        <p className="text-gray-500">고객 주문을 관리하세요</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="border border-gray-200 bg-white px-5 py-2.5 rounded-md hover:bg-gray-50 transition-colors">
                            내보내기
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-md shadow-sm mb-6">
                    <div className="p-4 flex flex-wrap gap-4 items-center">
                        <input
                            type="text"
                            placeholder="주문 검색..."
                            className="border border-gray-200 rounded-md px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <select className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                            <option>전체 상태</option>
                            <option>대기중</option>
                            <option>처리중</option>
                            <option>배송중</option>
                            <option>배송완료</option>
                            <option>취소됨</option>
                        </select>
                        <select className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                            <option>전체 결제</option>
                            <option>결제완료</option>
                            <option>대기중</option>
                            <option>환불완료</option>
                        </select>
                        <input
                            type="date"
                            className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-md shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                    <input type="checkbox" className="rounded" />
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">주문번호</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">고객</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">총액</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">수량</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">상태</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">결제</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">날짜</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/harri-admin/order-details/${order.id.replace('#ORD-', '')}`} className="font-medium text-blue-600 hover:underline">
                                            {order.id}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-800">{order.customer}</p>
                                            <p className="text-sm text-gray-500">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{order.total}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.items}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 font-medium ${getPaymentColor(order.payment)}`}>
                                        {order.payment}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/harri-admin/order-details/${order.id.replace('#ORD-', '')}`}
                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                                title="View Details"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                            <Link
                                                href={`/harri-admin/orders/${order.id.replace('#ORD-', '')}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                                title="Edit"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">총 5개 중 1-5 표시</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm hover:bg-gray-50" disabled>
                                이전
                            </button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm hover:bg-gray-50" disabled>
                                다음
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
