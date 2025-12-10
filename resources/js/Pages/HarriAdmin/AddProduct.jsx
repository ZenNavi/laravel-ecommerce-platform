import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AddProduct() {
    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">상품 추가</h3>
                        <p className="text-gray-500">새 상품을 등록하세요</p>
                    </div>
                    <Link
                        href="/harri-admin/product-list"
                        className="border border-gray-200 bg-white px-5 py-2.5 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        목록으로 돌아가기
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">기본 정보</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">상품명</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="상품명을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">상품 설명</label>
                                    <textarea
                                        rows={5}
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="상품 설명을 입력하세요"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                            placeholder="SKU를 입력하세요"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">바코드</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                            placeholder="바코드를 입력하세요"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">가격 정보</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">정상가</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="₩0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">할인가</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="₩0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Inventory */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">재고 관리</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">수량</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">재고 부족 알림</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        placeholder="10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">상품 이미지</h4>
                            <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
                                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-500 mb-2">이미지를 드래그하여 업로드</p>
                                <p className="text-gray-400 text-sm mb-4">또는</p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                                    파일 찾기
                                </button>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">카테고리</h4>
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500">
                                <option>카테고리 선택</option>
                                <option>전자기기</option>
                                <option>액세서리</option>
                                <option>웨어러블</option>
                                <option>게임</option>
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">브랜드</h4>
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500">
                                <option>브랜드 선택</option>
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Sony</option>
                                <option>Nintendo</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">상태</h4>
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500">
                                <option>판매중</option>
                                <option>임시저장</option>
                                <option>비활성</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                                상품 저장
                            </button>
                            <button className="flex-1 border border-gray-200 bg-white px-5 py-2.5 rounded-md hover:bg-gray-50 transition-colors">
                                임시 저장
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
