import AdminLayout from '@/Layouts/AdminLayout';

export default function Profile() {
    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                {/* Profile Header */}
                <div className="bg-white rounded-md shadow-sm mb-6 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
                    <div className="px-6 pb-6">
                        <div className="flex flex-wrap items-end gap-4 -mt-16">
                            <img
                                src="/assets/img/users/user-10.jpg"
                                alt="Profile"
                                className="w-32 h-32 rounded-md object-cover border-4 border-white shadow-lg"
                            />
                            <div className="pb-2">
                                <h3 className="text-2xl font-semibold text-gray-800">관리자</h3>
                                <p className="text-gray-500">최고 관리자</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                        {/* Personal Info */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">개인 정보</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">성</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        defaultValue="관리"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        defaultValue="자"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        defaultValue="admin@harri.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                                    <input
                                        type="tel"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        defaultValue="+82 10-1234-5678"
                                    />
                                </div>
                            </div>
                            <button className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                                프로필 수정
                            </button>
                        </div>

                        {/* Change Password */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">비밀번호 변경</h4>
                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
                                    <input
                                        type="password"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="현재 비밀번호 입력"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
                                    <input
                                        type="password"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="새 비밀번호 입력"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                                    <input
                                        type="password"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="새 비밀번호 다시 입력"
                                    />
                                </div>
                            </div>
                            <button className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                                비밀번호 변경
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Photo */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">프로필 사진</h4>
                            <div className="text-center">
                                <img
                                    src="/assets/img/users/user-10.jpg"
                                    alt="Profile"
                                    className="w-32 h-32 rounded-md object-cover mx-auto mb-4"
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                                    사진 변경
                                </button>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">계정 정보</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">역할</span>
                                    <span className="font-medium">최고 관리자</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">상태</span>
                                    <span className="text-green-600 font-medium">활성</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">가입일</span>
                                    <span>2024년 1월 1일</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">마지막 로그인</span>
                                    <span>오늘, 오전 10:30</span>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-md shadow-sm p-6 border border-red-200">
                            <h4 className="text-lg font-semibold mb-4 text-red-600">위험 구역</h4>
                            <p className="text-sm text-gray-500 mb-4">
                                계정을 삭제하면 복구할 수 없습니다. 신중하게 결정해 주세요.
                            </p>
                            <button className="w-full border border-red-200 text-red-600 px-5 py-2.5 rounded-md hover:bg-red-50 transition-colors">
                                계정 삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
