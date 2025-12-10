import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
            <Head title="로그인" />

            <div className="max-w-sm w-full">
                <div className="text-center mb-10">
                    <Link href="/" className="text-xl font-semibold text-gray-900">
                        스토어
                    </Link>
                    <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                        다시 오셨군요
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        계정에 로그인하여 계속하세요
                    </p>
                </div>

                {status && (
                    <div className="mb-6 text-sm text-green-600 text-center">{status}</div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            이메일
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 text-sm transition-colors"
                            placeholder="example@email.com"
                            required
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 text-sm transition-colors"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-0"
                            />
                            <span className="ml-2 text-sm text-gray-500">로그인 유지</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            비밀번호 찾기
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {processing ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    계정이 없으신가요?{' '}
                    <Link href="/register" className="text-gray-900 hover:underline">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
}
