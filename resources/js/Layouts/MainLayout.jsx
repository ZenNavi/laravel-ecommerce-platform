import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    CartIcon,
    HeartIcon,
    UserIcon,
    SearchIcon,
    MenuIcon,
    CloseIcon
} from '@/Components/Icons';

export default function MainLayout({ children, auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top Bar */}
            <div className="bg-[#010F1C] text-white py-2.5 hidden lg:block">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-6">
                            <span className="text-white/70">스토어에 오신 것을 환영합니다!</span>
                            <span className="text-white/70">₩50,000 이상 주문시 무료 배송</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="tel:1588-0000" className="text-white/70 hover:text-white transition-colors">
                                1588-0000
                            </a>
                            <a href="mailto:support@store.com" className="text-white/70 hover:text-white transition-colors">
                                support@store.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white border-b border-[#EAEAEF] sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold text-[#010F1C] tracking-tight">
                                HARRI
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <Link
                                href="/"
                                className="text-[15px] font-medium text-[#010F1C] hover:text-[#F50963] transition-colors"
                            >
                                홈
                            </Link>
                            <Link
                                href="/products"
                                className="text-[15px] font-medium text-[#010F1C] hover:text-[#F50963] transition-colors"
                            >
                                쇼핑
                            </Link>
                            <Link
                                href="/community"
                                className="text-[15px] font-medium text-[#010F1C] hover:text-[#F50963] transition-colors"
                            >
                                커뮤니티
                            </Link>
                            <Link
                                href="/about"
                                className="text-[15px] font-medium text-[#010F1C] hover:text-[#F50963] transition-colors"
                            >
                                소개
                            </Link>
                            <Link
                                href="/contact"
                                className="text-[15px] font-medium text-[#010F1C] hover:text-[#F50963] transition-colors"
                            >
                                문의
                            </Link>
                        </nav>

                        {/* Header Actions */}
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 hover:text-[#F50963] transition-colors"
                            >
                                <SearchIcon className="w-5 h-5" />
                            </button>

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="p-2 hover:text-[#F50963] transition-colors relative hidden sm:block"
                            >
                                <HeartIcon className="w-5 h-5" />
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="p-2 hover:text-[#F50963] transition-colors relative"
                            >
                                <CartIcon className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F50963] text-white text-xs flex items-center justify-center rounded-full">
                                    0
                                </span>
                            </Link>

                            {/* User */}
                            {auth?.user ? (
                                <div className="hidden sm:flex items-center gap-3">
                                    <Link
                                        href="/wallet"
                                        className="text-sm text-[#55585B] hover:text-[#F50963] transition-colors"
                                    >
                                        지갑
                                    </Link>
                                    <span className="text-[#EAEAEF]">|</span>
                                    <span className="text-sm text-[#010F1C] font-medium">{auth.user.name}</span>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="text-sm text-[#55585B] hover:text-[#F50963] transition-colors"
                                    >
                                        로그아웃
                                    </Link>
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-3">
                                    <Link
                                        href="/login"
                                        className="p-2 hover:text-[#F50963] transition-colors"
                                    >
                                        <UserIcon className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-[#F50963] text-white text-sm px-5 py-2.5 font-medium hover:bg-[#010F1C] transition-colors"
                                    >
                                        회원가입
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 lg:hidden hover:text-[#F50963] transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <CloseIcon className="w-6 h-6" />
                                ) : (
                                    <MenuIcon className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                {searchOpen && (
                    <div className="border-t border-[#EAEAEF] py-4">
                        <div className="container mx-auto px-4">
                            <form className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="상품 검색..."
                                    className="flex-1 h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="h-12 px-6 bg-[#F50963] text-white font-medium hover:bg-[#010F1C] transition-colors"
                                >
                                    검색
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-[#EAEAEF]">
                        <div className="container mx-auto px-4 py-4">
                            <nav className="flex flex-col gap-4">
                                <Link
                                    href="/"
                                    className="text-base font-medium text-[#010F1C] hover:text-[#F50963] transition-colors py-2"
                                >
                                    홈
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-base font-medium text-[#010F1C] hover:text-[#F50963] transition-colors py-2"
                                >
                                    쇼핑
                                </Link>
                                <Link
                                    href="/community"
                                    className="text-base font-medium text-[#010F1C] hover:text-[#F50963] transition-colors py-2"
                                >
                                    커뮤니티
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-base font-medium text-[#010F1C] hover:text-[#F50963] transition-colors py-2"
                                >
                                    소개
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-base font-medium text-[#010F1C] hover:text-[#F50963] transition-colors py-2"
                                >
                                    문의
                                </Link>
                                <div className="border-t border-[#EAEAEF] pt-4 mt-2">
                                    {auth?.user ? (
                                        <>
                                            <Link
                                                href="/wallet"
                                                className="block text-base text-[#55585B] hover:text-[#F50963] py-2"
                                            >
                                                지갑
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="block text-base text-[#55585B] hover:text-[#F50963] py-2 w-full text-left"
                                            >
                                                로그아웃 ({auth.user.name})
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="block text-base text-[#55585B] hover:text-[#F50963] py-2"
                                            >
                                                로그인
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="block text-base text-[#F50963] font-medium py-2"
                                            >
                                                회원가입
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            {/* Page Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-[#010F1C] text-white">
                {/* Main Footer */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* About */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">HARRI</h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                멋진 상품을 발견하고, 리워드를 적립하고, 쇼핑 커뮤니티와 함께하세요.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#F50963] transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#F50963] transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-[#F50963] transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-base font-semibold mb-6">바로가기</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/products" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        쇼핑
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/community" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        커뮤니티
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/rewards" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        리워드
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        회사 소개
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        문의하기
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h4 className="text-base font-semibold mb-6">고객 서비스</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/faq" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        자주 묻는 질문
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/shipping" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        배송 안내
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/returns" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        교환/환불 안내
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        개인정보처리방침
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-sm text-white/60 hover:text-[#F50963] transition-colors">
                                        이용약관
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-base font-semibold mb-6">뉴스레터</h4>
                            <p className="text-sm text-white/60 mb-4">
                                특별 할인과 새로운 소식을 받아보세요.
                            </p>
                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="이메일 주소"
                                    className="h-12 px-4 bg-white/10 border border-white/10 text-white placeholder-white/40 focus:border-[#F50963] outline-none transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="h-12 bg-[#F50963] text-white font-medium hover:bg-white hover:text-[#010F1C] transition-colors"
                                >
                                    구독하기
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-white/60">
                                &copy; 2024 HARRI. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <img src="/images/payment/visa.png" alt="Visa" className="h-6 opacity-60" onError={(e) => e.target.style.display = 'none'} />
                                <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-6 opacity-60" onError={(e) => e.target.style.display = 'none'} />
                                <img src="/images/payment/paypal.png" alt="PayPal" className="h-6 opacity-60" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
