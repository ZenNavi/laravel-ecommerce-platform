import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

const orders = [
    {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        status: '배송완료',
        items: [
            { name: '프리미엄 울 코트', size: 'M', color: '블랙', price: 189000, quantity: 1 },
        ],
        total: 189000,
    },
    {
        id: 'ORD-2024-002',
        date: '2024-01-10',
        status: '배송중',
        items: [
            { name: '캐시미어 스웨터', size: 'L', color: '베이지', price: 129000, quantity: 2 },
        ],
        total: 258000,
    },
    {
        id: 'ORD-2024-003',
        date: '2024-01-05',
        status: '주문확인',
        items: [
            { name: '슬림핏 데님 팬츠', size: '32', color: '인디고', price: 89000, quantity: 1 },
        ],
        total: 89000,
    },
];

export default function Order() {
    const [filter, setFilter] = useState('all');
    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(o => o.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case '배송완료': return 'bg-[#2CAE76]/10 text-[#2CAE76]';
            case '배송중': return 'bg-[#F50963]/10 text-[#F50963]';
            case '주문확인': return 'bg-gray-100 text-[#55585B]';
            case '취소': return 'bg-red-100 text-red-500';
            default: return 'bg-gray-100 text-[#55585B]';
        }
    };

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <Link href="/harri/dashboard" className="text-[#55585B] hover:text-[#F50963]">내 계정</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">주문 내역</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-8">주문 내역</h1>

                {/* Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {['all', '주문확인', '배송중', '배송완료', '취소'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                filter === status
                                    ? 'bg-[#F50963] text-white'
                                    : 'bg-[#F6F6F6] text-[#55585B] hover:bg-[#EAEAEF]'
                            }`}
                        >
                            {status === 'all' ? '전체' : status}
                        </button>
                    ))}
                </div>

                {filteredOrders.length > 0 ? (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="border border-[#EAEAEF]">
                                {/* Order Header */}
                                <div className="bg-[#F6F6F6] px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div>
                                            <span className="text-sm text-[#55585B]">주문번호</span>
                                            <p className="font-medium text-[#010F1C]">{order.id}</p>
                                        </div>
                                        <div className="hidden md:block w-px h-10 bg-[#EAEAEF]"></div>
                                        <div>
                                            <span className="text-sm text-[#55585B]">주문일자</span>
                                            <p className="font-medium text-[#010F1C]">{order.date}</p>
                                        </div>
                                        <div className="hidden md:block w-px h-10 bg-[#EAEAEF]"></div>
                                        <div>
                                            <span className="text-sm text-[#55585B]">상태</span>
                                            <p>
                                                <span className={`inline-block px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-[#55585B]">총 결제금액</span>
                                        <p className="text-lg font-bold text-[#F50963]">₩{formatPrice(order.total)}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                                <span className="text-gray-400 text-xs">이미지</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-[#010F1C]">{item.name}</h3>
                                                <p className="text-sm text-[#55585B]">{item.size} / {item.color}</p>
                                                <p className="text-sm text-[#55585B]">수량: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-[#010F1C]">₩{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Actions */}
                                <div className="border-t border-[#EAEAEF] px-6 py-4 flex flex-wrap gap-3">
                                    <Link
                                        href={`/harri/order/${order.id}`}
                                        className="px-4 py-2 text-sm font-medium border border-[#010F1C] text-[#010F1C] hover:bg-[#010F1C] hover:text-white transition-colors"
                                    >
                                        상세보기
                                    </Link>
                                    {order.status === '배송완료' && (
                                        <button className="px-4 py-2 text-sm font-medium border border-[#EAEAEF] text-[#55585B] hover:border-[#F50963] hover:text-[#F50963] transition-colors">
                                            리뷰 작성
                                        </button>
                                    )}
                                    {order.status === '배송중' && (
                                        <button className="px-4 py-2 text-sm font-medium border border-[#EAEAEF] text-[#55585B] hover:border-[#F50963] hover:text-[#F50963] transition-colors">
                                            배송 추적
                                        </button>
                                    )}
                                    {(order.status === '주문확인' || order.status === '배송준비중') && (
                                        <button className="px-4 py-2 text-sm font-medium border border-red-300 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">
                                            주문 취소
                                        </button>
                                    )}
                                    <button className="px-4 py-2 text-sm font-medium bg-[#F50963] text-white hover:bg-[#d90858] transition-colors">
                                        재주문
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-[#EAEAEF]">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#010F1C] mb-2">주문 내역이 없습니다</h2>
                        <p className="text-[#55585B] mb-8">첫 주문을 시작해보세요!</p>
                        <Link
                            href="/harri/shop"
                            className="inline-block bg-[#F50963] text-white px-8 py-4 font-medium hover:bg-[#d90858] transition-colors"
                        >
                            쇼핑하러 가기
                        </Link>
                    </div>
                )}
            </div>
        </HarriLayout>
    );
}
