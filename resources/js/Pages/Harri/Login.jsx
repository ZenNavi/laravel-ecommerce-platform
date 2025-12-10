import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login
    };

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">로그인</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-2">로그인</h1>
                        <p className="text-[#55585B]">계정에 로그인하세요</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#010F1C] mb-2">이메일</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="이메일 주소를 입력하세요"
                                className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#010F1C] mb-2">비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="비밀번호를 입력하세요"
                                className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm text-[#55585B]">로그인 상태 유지</span>
                            </label>
                            <Link href="/harri/forgot" className="text-sm text-[#F50963] hover:underline">
                                비밀번호 찾기
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-14 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors"
                        >
                            로그인
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-[#EAEAEF]"></div>
                        <span className="text-sm text-[#55585B]">또는</span>
                        <div className="flex-1 h-px bg-[#EAEAEF]"></div>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3">
                        <button className="w-full h-12 border border-[#EAEAEF] flex items-center justify-center gap-3 hover:border-[#010F1C] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-sm font-medium text-[#010F1C]">Google로 로그인</span>
                        </button>
                        <button className="w-full h-12 bg-[#FEE500] flex items-center justify-center gap-3 hover:bg-[#FDD800] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3C1E1E">
                                <path d="M12 3C6.48 3 2 6.48 2 12c0 4.42 3.47 7.95 8 7.95h.5v-2.44c-2.48-.13-4.5-2.15-4.5-4.51 0-2.49 2.01-4.5 4.5-4.5S15 10.51 15 13c0 .35-.04.69-.11 1.02l2.1.6c.2-.53.51-1.04.51-1.62 0-3.04-2.46-5.5-5.5-5.5-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5c.47 0 .93-.06 1.37-.17v2.12c-.45.08-.91.15-1.37.15C6.48 21 2 17.52 2 12 2 6.48 6.48 3 12 3z"/>
                            </svg>
                            <span className="text-sm font-medium text-[#3C1E1E]">카카오로 로그인</span>
                        </button>
                        <button className="w-full h-12 bg-[#03C75A] flex items-center justify-center gap-3 hover:bg-[#02b350] transition-colors">
                            <span className="text-white font-bold">N</span>
                            <span className="text-sm font-medium text-white">네이버로 로그인</span>
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center mt-8 text-sm text-[#55585B]">
                        아직 회원이 아니신가요?{' '}
                        <Link href="/harri/register" className="text-[#F50963] font-medium hover:underline">
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </HarriLayout>
    );
}
