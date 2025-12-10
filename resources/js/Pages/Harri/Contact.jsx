import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

const contactInfo = [
    {
        title: '주소',
        content: '서울특별시 강남구 테헤란로 123\nHARRI 타워 10층',
        icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
        title: '전화',
        content: '1588-0000\n평일 09:00 - 18:00',
        icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    {
        title: '이메일',
        content: 'support@harri.com\ninfo@harri.com',
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">문의하기</span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="py-16 bg-[#F6F6F6]">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#010F1C] mb-4">문의하기</h1>
                    <p className="text-[#55585B] max-w-xl mx-auto">
                        궁금한 점이 있으신가요? 언제든지 문의해 주세요.<br />
                        영업일 기준 24시간 이내에 답변 드립니다.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-bold text-[#010F1C] mb-6">연락처 정보</h2>
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-12 h-12 bg-[#F50963]/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-[#F50963]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#010F1C] mb-1">{info.title}</h3>
                                        <p className="text-sm text-[#55585B] whitespace-pre-line">{info.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="mt-10">
                            <h3 className="font-medium text-[#010F1C] mb-4">SNS</h3>
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 bg-[#010F1C] text-white flex items-center justify-center hover:bg-[#F50963] transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-[#010F1C] text-white flex items-center justify-center hover:bg-[#F50963] transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-[#010F1C] text-white flex items-center justify-center hover:bg-[#F50963] transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        {!submitted ? (
                            <>
                                <h2 className="text-xl font-bold text-[#010F1C] mb-6">문의 양식</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[#010F1C] mb-2">이름 *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#010F1C] mb-2">이메일 *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[#010F1C] mb-2">전화번호</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#010F1C] mb-2">문의 유형 *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                                                required
                                            >
                                                <option value="">선택해주세요</option>
                                                <option value="order">주문 관련</option>
                                                <option value="shipping">배송 관련</option>
                                                <option value="return">교환/환불</option>
                                                <option value="product">상품 문의</option>
                                                <option value="other">기타</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#010F1C] mb-2">문의 내용 *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors resize-none"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="h-14 px-10 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors"
                                    >
                                        문의하기
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-16 bg-[#F6F6F6]">
                                <div className="w-16 h-16 bg-[#2CAE76]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[#2CAE76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-[#010F1C] mb-2">문의가 접수되었습니다</h2>
                                <p className="text-[#55585B] mb-6">
                                    빠른 시일 내에 답변 드리겠습니다.<br />
                                    감사합니다.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                                    }}
                                    className="text-[#F50963] font-medium hover:underline"
                                >
                                    새 문의 작성
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Map placeholder */}
            <div className="h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">지도 영역</span>
            </div>
        </HarriLayout>
    );
}
