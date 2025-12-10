import AdminLayout from '@/Layouts/AdminLayout';
import { Received, Sales, MonthSales, TotalOrders } from '@/Components/Admin/Icons';

// Card Item Component
function CardItem({ title, amount, icon: Icon, bgColor }) {
    return (
        <div className="bg-white p-6 flex justify-between rounded-md shadow-sm">
            <div>
                <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
                    {amount}
                </h4>
                <p className="text-sm text-gray-500 leading-4">{title}</p>
            </div>
            <div>
                <span className={`text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 ${bgColor}`}>
                    <Icon />
                </span>
            </div>
        </div>
    );
}

// Recent Orders Component
function RecentOrders() {
    const orders = [
        { id: '#1001', customer: '김철수', product: 'iPhone 15 Pro', amount: '₩1,599,000', status: '배송완료', date: '2024-01-15' },
        { id: '#1002', customer: '이영희', product: 'MacBook Air M3', amount: '₩1,899,000', status: '처리중', date: '2024-01-14' },
        { id: '#1003', customer: '박민수', product: 'AirPods Pro', amount: '₩359,000', status: '대기중', date: '2024-01-14' },
        { id: '#1004', customer: '최지은', product: 'iPad Pro 12.9', amount: '₩1,499,000', status: '배송완료', date: '2024-01-13' },
        { id: '#1005', customer: '정현우', product: 'Apple Watch Ultra', amount: '₩1,149,000', status: '배송중', date: '2024-01-12' },
    ];

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
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-md shadow-sm">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold">최근 주문</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">주문번호</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">고객명</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">상품</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">금액</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">상태</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">날짜</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-blue-600">{order.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{order.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Sales Report Component
function SalesReport() {
    return (
        <div className="bg-white rounded-md shadow-sm mb-6">
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">매출 리포트</h3>
                    <select className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                        <option>최근 7일</option>
                        <option>최근 30일</option>
                        <option>최근 3개월</option>
                        <option>최근 1년</option>
                    </select>
                </div>
            </div>
            <div className="p-6">
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p>매출 차트가 이 곳에 표시됩니다</p>
                        <p className="text-sm mt-1">Chart.js 또는 Recharts 라이브러리와 연동하세요</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-end flex-wrap mb-7">
                    <div>
                        <h3 className="mb-0 text-4xl font-semibold text-gray-800">대시보드</h3>
                        <p className="text-gray-500 m-0">관리자 대시보드에 오신 것을 환영합니다</p>
                    </div>
                </div>

                {/* Card Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                    <CardItem
                        title="오늘 주문"
                        amount="₩2,450,000"
                        icon={Received}
                        bgColor="bg-green-500"
                    />
                    <CardItem
                        title="어제 주문"
                        amount="₩1,890,000"
                        icon={Sales}
                        bgColor="bg-purple-500"
                    />
                    <CardItem
                        title="이번 달 주문"
                        amount="₩48,500,000"
                        icon={MonthSales}
                        bgColor="bg-cyan-500"
                    />
                    <CardItem
                        title="전체 주문"
                        amount="₩256,780,000"
                        icon={TotalOrders}
                        bgColor="bg-amber-500"
                    />
                </div>

                {/* Sales Report */}
                <SalesReport />

                {/* Recent Orders */}
                <RecentOrders />
            </div>
        </AdminLayout>
    );
}
