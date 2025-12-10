import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

export default function Forgot() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

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
                        <span className="text-[#010F1C] font-medium">비밀번호 찾기</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    {!submitted ? (
                        <>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-[#F50963]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[#F50963]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-2">비밀번호 찾기</h1>
                                <p className="text-[#55585B]">
                                    가입하신 이메일 주소를 입력하시면<br />
                                    비밀번호 재설정 링크를 보내드립니다.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#010F1C] mb-2">이메일</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="가입하신 이메일 주소를 입력하세요"
                                        className="w-full h-12 px-4 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-14 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors"
                                >
                                    재설정 링크 보내기
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#2CAE76]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#2CAE76]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-2">이메일을 확인하세요</h1>
                            <p className="text-[#55585B] mb-6">
                                <span className="text-[#010F1C] font-medium">{email}</span>으로<br />
                                비밀번호 재설정 링크를 보내드렸습니다.
                            </p>
                            <p className="text-sm text-[#55585B] mb-8">
                                이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-[#F50963] font-medium hover:underline"
                            >
                                다시 보내기
                            </button>
                        </div>
                    )}

                    <p className="text-center mt-8 text-sm text-[#55585B]">
                        <Link href="/harri/login" className="text-[#F50963] font-medium hover:underline">
                            ← 로그인으로 돌아가기
                        </Link>
                    </p>
                </div>
            </div>
        </HarriLayout>
    );
}
