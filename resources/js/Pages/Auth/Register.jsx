import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        referral_code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
            <Head title="회원가입" />

            <div className="max-w-sm w-full">
                <div className="text-center mb-10">
                    <Link href="/" className="text-xl font-semibold text-gray-900">
                        스토어
                    </Link>
                    <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                        계정 만들기
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        지금 가입하고 쇼핑을 시작하세요
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            이름
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 text-sm transition-colors"
                            placeholder="이름을 입력하세요"
                            required
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

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

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                            비밀번호 확인
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 text-sm transition-colors"
                            placeholder="비밀번호를 다시 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="referral_code" className="block text-sm font-medium text-gray-700 mb-2">
                            추천인 코드
                            <span className="text-gray-400 font-normal ml-1">(선택)</span>
                        </label>
                        <input
                            id="referral_code"
                            type="text"
                            value={data.referral_code}
                            onChange={(e) => setData('referral_code', e.target.value)}
                            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 text-sm transition-colors"
                            placeholder="추천인 코드를 입력하세요"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {processing ? '가입 중...' : '회원가입'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    이미 계정이 있으신가요?{' '}
                    <Link href="/login" className="text-gray-900 hover:underline">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    );
}
