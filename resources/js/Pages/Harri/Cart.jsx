import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';
import { MinusIcon, PlusIcon, CloseIcon } from '@/Components/Icons';

const initialCartItems = [
    { id: 1, name: '프리미엄 울 코트', price: 189000, size: 'M', color: '블랙', quantity: 1 },
    { id: 2, name: '캐시미어 스웨터', price: 129000, size: 'L', color: '베이지', quantity: 2 },
    { id: 3, name: '슬림핏 데님 팬츠', price: 89000, size: '32', color: '인디고', quantity: 1 },
];

export default function Cart() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [couponCode, setCouponCode] = useState('');

    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 50000 ? 0 : 3000;
    const total = subtotal + shipping;

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">장바구니</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-8">장바구니</h1>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            {/* Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#EAEAEF] text-sm font-medium text-[#55585B]">
                                <div className="col-span-6">상품</div>
                                <div className="col-span-2 text-center">가격</div>
                                <div className="col-span-2 text-center">수량</div>
                                <div className="col-span-2 text-center">소계</div>
                            </div>

                            {/* Items */}
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-[#EAEAEF] items-center">
                                    {/* Product */}
                                    <div className="md:col-span-6 flex gap-4">
                                        <div className="w-24 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                            <span className="text-gray-400 text-xs">이미지</span>
                                        </div>
                                        <div className="flex-1">
                                            <Link href={`/harri/product/${item.id}`} className="font-medium text-[#010F1C] hover:text-[#F50963]">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-[#55585B] mt-1">
                                                {item.size} / {item.color}
                                            </p>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-sm text-[#F50963] mt-2 hover:underline md:hidden"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="md:col-span-2 text-center">
                                        <span className="md:hidden text-sm text-[#55585B]">가격: </span>
                                        <span className="text-[#010F1C]">₩{formatPrice(item.price)}</span>
                                    </div>

                                    {/* Quantity */}
                                    <div className="md:col-span-2 flex items-center justify-center">
                                        <div className="flex items-center border border-[#EAEAEF]">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <MinusIcon className="w-3 h-3" />
                                            </button>
                                            <span className="w-10 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <PlusIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                                        <span className="md:hidden text-sm text-[#55585B]">소계: </span>
                                        <div className="flex items-center gap-4">
                                            <span className="font-medium text-[#010F1C]">₩{formatPrice(item.price * item.quantity)}</span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="hidden md:flex w-6 h-6 items-center justify-center text-[#55585B] hover:text-[#F50963]"
                                            >
                                                <CloseIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Coupon */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="쿠폰 코드 입력"
                                    className="flex-1 h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none"
                                />
                                <button className="h-12 px-8 bg-[#010F1C] text-white font-medium hover:bg-[#F50963] transition-colors">
                                    적용
                                </button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:w-96">
                            <div className="bg-[#F6F6F6] p-6">
                                <h2 className="text-lg font-semibold text-[#010F1C] mb-6">주문 요약</h2>

                                <div className="space-y-4 pb-6 border-b border-[#EAEAEF]">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#55585B]">상품 금액</span>
                                        <span className="text-[#010F1C]">₩{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#55585B]">배송비</span>
                                        <span className="text-[#010F1C]">
                                            {shipping === 0 ? '무료' : `₩${formatPrice(shipping)}`}
                                        </span>
                                    </div>
                                    {shipping === 0 && (
                                        <p className="text-xs text-[#2CAE76]">무료 배송 적용됨</p>
                                    )}
                                    {shipping > 0 && (
                                        <p className="text-xs text-[#55585B]">
                                            ₩{formatPrice(50000 - subtotal)} 더 구매시 무료 배송
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between py-6 border-b border-[#EAEAEF]">
                                    <span className="font-semibold text-[#010F1C]">총 결제금액</span>
                                    <span className="text-xl font-bold text-[#F50963]">₩{formatPrice(total)}</span>
                                </div>

                                <Link
                                    href="/harri/checkout"
                                    className="block w-full h-14 bg-[#F50963] text-white font-medium text-center leading-[56px] mt-6 hover:bg-[#d90858] transition-colors"
                                >
                                    결제하기
                                </Link>

                                <Link
                                    href="/harri/shop"
                                    className="block w-full h-14 border border-[#010F1C] text-[#010F1C] font-medium text-center leading-[56px] mt-4 hover:bg-[#010F1C] hover:text-white transition-colors"
                                >
                                    쇼핑 계속하기
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 p-6 border border-[#EAEAEF]">
                                <div className="flex items-center gap-3 text-sm text-[#55585B]">
                                    <svg className="w-5 h-5 text-[#2CAE76]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>안전한 결제 시스템</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#55585B] mt-3">
                                    <svg className="w-5 h-5 text-[#2CAE76]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>30일 무료 반품</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#010F1C] mb-2">장바구니가 비어있습니다</h2>
                        <p className="text-[#55585B] mb-8">마음에 드는 상품을 담아보세요!</p>
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
