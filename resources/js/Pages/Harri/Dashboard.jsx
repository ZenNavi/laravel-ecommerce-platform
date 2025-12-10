import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

const recentOrders = [
    { id: 'ORD-2024-001', date: '2024-01-15', status: '배송완료', total: 189000 },
    { id: 'ORD-2024-002', date: '2024-01-10', status: '배송중', total: 258000 },
    { id: 'ORD-2024-003', date: '2024-01-05', status: '주문확인', total: 89000 },
];

const menuItems = [
    { id: 'orders', name: '주문 내역', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'wishlist', name: '위시리스트', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'address', name: '배송 주소', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'profile', name: '프로필 수정', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'password', name: '비밀번호 변경', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    const user = {
        name: '홍길동',
        email: 'hong@example.com',
        joinDate: '2024-01-01',
    };

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">내 계정</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        {/* User Info */}
                        <div className="bg-[#F6F6F6] p-6 mb-6">
                            <div className="w-20 h-20 bg-[#F50963]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-[#F50963]">{user.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-center font-semibold text-[#010F1C] mb-1">{user.name}</h2>
                            <p className="text-center text-sm text-[#55585B]">{user.email}</p>
                        </div>

                        {/* Menu */}
                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === 'overview' ? 'bg-[#F50963] text-white' : 'text-[#55585B] hover:bg-gray-100'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                대시보드
                            </button>
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                        activeTab === item.id ? 'bg-[#F50963] text-white' : 'text-[#55585B] hover:bg-gray-100'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                    </svg>
                                    {item.name}
                                </button>
                            ))}
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#F50963] hover:bg-[#F50963]/5 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                로그아웃
                            </button>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="flex-1">
                        {activeTab === 'overview' && (
                            <>
                                <h1 className="text-2xl font-bold text-[#010F1C] mb-6">안녕하세요, {user.name}님!</h1>

                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-[#F6F6F6] p-5">
                                        <p className="text-2xl font-bold text-[#010F1C]">5</p>
                                        <p className="text-sm text-[#55585B]">총 주문</p>
                                    </div>
                                    <div className="bg-[#F6F6F6] p-5">
                                        <p className="text-2xl font-bold text-[#010F1C]">2</p>
                                        <p className="text-sm text-[#55585B]">배송중</p>
                                    </div>
                                    <div className="bg-[#F6F6F6] p-5">
                                        <p className="text-2xl font-bold text-[#010F1C]">8</p>
                                        <p className="text-sm text-[#55585B]">위시리스트</p>
                                    </div>
                                    <div className="bg-[#F6F6F6] p-5">
                                        <p className="text-2xl font-bold text-[#F50963]">15,000P</p>
                                        <p className="text-sm text-[#55585B]">적립 포인트</p>
                                    </div>
                                </div>

                                {/* Recent Orders */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-[#010F1C]">최근 주문</h2>
                                        <Link href="/harri/order" className="text-sm text-[#F50963] hover:underline">
                                            전체 보기 →
                                        </Link>
                                    </div>
                                    <div className="border border-[#EAEAEF] overflow-hidden">
                                        <table className="w-full">
                                            <thead className="bg-[#F6F6F6]">
                                                <tr>
                                                    <th className="text-left text-sm font-medium text-[#55585B] px-4 py-3">주문번호</th>
                                                    <th className="text-left text-sm font-medium text-[#55585B] px-4 py-3">날짜</th>
                                                    <th className="text-left text-sm font-medium text-[#55585B] px-4 py-3">상태</th>
                                                    <th className="text-right text-sm font-medium text-[#55585B] px-4 py-3">금액</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentOrders.map((order) => (
                                                    <tr key={order.id} className="border-t border-[#EAEAEF]">
                                                        <td className="px-4 py-3">
                                                            <Link href={`/harri/order/${order.id}`} className="text-sm text-[#F50963] hover:underline">
                                                                {order.id}
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-[#55585B]">{order.date}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`text-xs px-2 py-1 ${
                                                                order.status === '배송완료' ? 'bg-[#2CAE76]/10 text-[#2CAE76]' :
                                                                order.status === '배송중' ? 'bg-[#F50963]/10 text-[#F50963]' :
                                                                'bg-gray-100 text-[#55585B]'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-medium text-right">₩{formatPrice(order.total)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Account Info */}
                                <div>
                                    <h2 className="text-lg font-semibold text-[#010F1C] mb-4">계정 정보</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-[#EAEAEF] p-5">
                                            <h3 className="font-medium text-[#010F1C] mb-2">프로필</h3>
                                            <p className="text-sm text-[#55585B]">{user.name}</p>
                                            <p className="text-sm text-[#55585B]">{user.email}</p>
                                            <button
                                                onClick={() => setActiveTab('profile')}
                                                className="text-sm text-[#F50963] mt-3 hover:underline"
                                            >
                                                수정하기
                                            </button>
                                        </div>
                                        <div className="border border-[#EAEAEF] p-5">
                                            <h3 className="font-medium text-[#010F1C] mb-2">기본 배송지</h3>
                                            <p className="text-sm text-[#55585B]">서울특별시 강남구</p>
                                            <p className="text-sm text-[#55585B]">테헤란로 123</p>
                                            <button
                                                onClick={() => setActiveTab('address')}
                                                className="text-sm text-[#F50963] mt-3 hover:underline"
                                            >
                                                수정하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <h1 className="text-2xl font-bold text-[#010F1C] mb-6">주문 내역</h1>
                                <p className="text-[#55585B]">주문 내역 페이지로 이동합니다.</p>
                                <Link href="/harri/order" className="inline-block mt-4 text-[#F50963] hover:underline">
                                    주문 내역 보기 →
                                </Link>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div>
                                <h1 className="text-2xl font-bold text-[#010F1C] mb-6">위시리스트</h1>
                                <p className="text-[#55585B]">위시리스트 페이지로 이동합니다.</p>
                                <Link href="/harri/wishlist" className="inline-block mt-4 text-[#F50963] hover:underline">
                                    위시리스트 보기 →
                                </Link>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div>
                                <h1 className="text-2xl font-bold text-[#010F1C] mb-6">프로필 수정</h1>
                                <form className="max-w-lg space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#010F1C] mb-2">이름</label>
                                        <input type="text" defaultValue={user.name} className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#010F1C] mb-2">이메일</label>
                                        <input type="email" defaultValue={user.email} className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#010F1C] mb-2">전화번호</label>
                                        <input type="tel" placeholder="010-0000-0000" className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none" />
                                    </div>
                                    <button type="submit" className="h-12 px-8 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors">
                                        저장하기
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'address' && (
                            <div>
                                <h1 className="text-2xl font-bold text-[#010F1C] mb-6">배송 주소</h1>
                                <form className="max-w-lg space-y-4">
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="우편번호" className="w-32 h-12 px-4 border border-[#EAEAEF]" readOnly />
                                        <button type="button" className="h-12 px-6 bg-[#010F1C] text-white font-medium hover:bg-[#F50963] transition-colors">
                                            주소 검색
                                        </button>
                                    </div>
                                    <input type="text" placeholder="주소" className="w-full h-12 px-4 border border-[#EAEAEF]" readOnly />
                                    <input type="text" placeholder="상세 주소" className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none" />
                                    <button type="submit" className="h-12 px-8 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors">
                                        저장하기
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'password' && (
                            <div>
                                <h1 className="text-2xl font-bold text-[#010F1C] mb-6">비밀번호 변경</h1>
                                <form className="max-w-lg space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#010F1C] mb-2">현재 비밀번호</label>
                                        <input type="password" className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#010F1C] mb-2">새 비밀번호</label>
                                        <input type="password" className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#010F1C] mb-2">새 비밀번호 확인</label>
                                        <input type="password" className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none" />
                                    </div>
                                    <button type="submit" className="h-12 px-8 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors">
                                        비밀번호 변경
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HarriLayout>
    );
}
