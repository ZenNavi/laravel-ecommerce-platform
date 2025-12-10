import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

const orderItems = [
    { id: 1, name: '프리미엄 울 코트', price: 189000, size: 'M', color: '블랙', quantity: 1 },
    { id: 2, name: '캐시미어 스웨터', price: 129000, size: 'L', color: '베이지', quantity: 2 },
];

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        address: '',
        addressDetail: '',
        postcode: '',
        memo: '',
    });

    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
                        <Link href="/harri/cart" className="text-[#55585B] hover:text-[#F50963]">장바구니</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">결제</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-8">결제하기</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        {/* Contact Info */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-[#010F1C] mb-4">연락처 정보</h2>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="이메일 주소"
                                    className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="이름"
                                        className="h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="전화번호"
                                        className="h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-[#010F1C] mb-4">배송 주소</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleChange}
                                        placeholder="우편번호"
                                        className="w-40 h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none"
                                        readOnly
                                    />
                                    <button className="h-12 px-6 bg-[#010F1C] text-white font-medium hover:bg-[#F50963] transition-colors">
                                        주소 검색
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="주소"
                                    className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    name="addressDetail"
                                    value={formData.addressDetail}
                                    onChange={handleChange}
                                    placeholder="상세 주소"
                                    className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none"
                                />
                                <textarea
                                    name="memo"
                                    value={formData.memo}
                                    onChange={handleChange}
                                    placeholder="배송 메모 (선택사항)"
                                    className="w-full h-24 px-4 py-3 border border-[#EAEAEF] focus:border-[#F50963] outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-[#010F1C] mb-4">결제 방법</h2>
                            <div className="space-y-3">
                                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[#F50963] bg-[#F50963]/5' : 'border-[#EAEAEF]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <span className="font-medium">신용카드 / 체크카드</span>
                                </label>
                                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-[#F50963] bg-[#F50963]/5' : 'border-[#EAEAEF]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <span className="font-medium">무통장 입금</span>
                                </label>
                                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'kakao' ? 'border-[#F50963] bg-[#F50963]/5' : 'border-[#EAEAEF]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="kakao"
                                        checked={paymentMethod === 'kakao'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <span className="font-medium">카카오페이</span>
                                </label>
                                <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'naver' ? 'border-[#F50963] bg-[#F50963]/5' : 'border-[#EAEAEF]'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="naver"
                                        checked={paymentMethod === 'naver'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <span className="font-medium">네이버페이</span>
                                </label>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="mb-8">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" className="mt-1" />
                                <span className="text-sm text-[#55585B]">
                                    <Link href="/harri/terms" className="text-[#F50963] hover:underline">이용약관</Link> 및
                                    <Link href="/harri/policy" className="text-[#F50963] hover:underline"> 개인정보처리방침</Link>에 동의합니다.
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-[#F6F6F6] p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-[#010F1C] mb-6">주문 내역</h2>

                            {/* Items */}
                            <div className="space-y-4 pb-6 border-b border-[#EAEAEF]">
                                {orderItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                            <span className="text-gray-400 text-xs">이미지</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-[#010F1C]">{item.name}</p>
                                            <p className="text-xs text-[#55585B]">{item.size} / {item.color}</p>
                                            <p className="text-xs text-[#55585B]">수량: {item.quantity}</p>
                                        </div>
                                        <span className="text-sm font-medium">₩{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-4 py-6 border-b border-[#EAEAEF]">
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
                            </div>

                            <div className="flex justify-between py-6">
                                <span className="font-semibold text-[#010F1C]">총 결제금액</span>
                                <span className="text-xl font-bold text-[#F50963]">₩{formatPrice(total)}</span>
                            </div>

                            <button className="w-full h-14 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors">
                                ₩{formatPrice(total)} 결제하기
                            </button>

                            <p className="text-xs text-center text-[#55585B] mt-4">
                                결제 진행 시 주문 내용에 동의하는 것으로 간주됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HarriLayout>
    );
}
