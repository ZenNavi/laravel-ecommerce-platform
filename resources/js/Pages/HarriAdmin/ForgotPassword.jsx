import { Link } from '@inertiajs/react';

export default function ForgotPassword() {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/harri-admin">
                            <img
                                src="/assets/img/logo/logo.svg"
                                alt="Logo"
                                className="h-10 mx-auto mb-4"
                            />
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-800">비밀번호 찾기</h2>
                        <p className="text-gray-500">비밀번호 재설정을 위해 이메일을 입력하세요</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                            <input
                                type="email"
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
                                placeholder="이메일을 입력하세요"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                        >
                            재설정 링크 전송
                        </button>
                    </form>

                    {/* Info */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-700">
                            비밀번호 재설정 링크가 포함된 이메일을 전송해 드립니다. 받은 편지함과 스팸 폴더를 확인해 주세요.
                        </p>
                    </div>

                    {/* Back to Login */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        비밀번호가 기억나셨나요?{' '}
                        <Link href="/harri-admin/login" className="text-blue-600 hover:underline">
                            로그인으로 돌아가기
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
