import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function EditProduct({ productId }) {
    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">상품 수정</h3>
                        <p className="text-gray-500">상품 #{productId} 정보 수정</p>
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
                                        defaultValue="iPhone 15 Pro Max"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">상품 설명</label>
                                    <textarea
                                        rows={5}
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        defaultValue="Apple iPhone 15 Pro Max는 티타늄 디자인, A17 Pro 칩, 그리고 고급 카메라 시스템을 탑재했습니다."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                            defaultValue="APL-IP15PM"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">바코드</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                            defaultValue="194253401234"
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
                                        defaultValue="1899000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">할인가</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        defaultValue="1799000"
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
                                        defaultValue="45"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">재고 부족 알림</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500"
                                        defaultValue="10"
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
                            <img
                                src="/assets/img/product/prodcut-1.jpg"
                                alt="Product"
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                                이미지 변경
                            </button>
                        </div>

                        {/* Category */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h4 className="text-lg font-semibold mb-4">카테고리</h4>
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500" defaultValue="전자기기">
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
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500" defaultValue="Apple">
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
                            <select className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500" defaultValue="판매중">
                                <option>판매중</option>
                                <option>임시저장</option>
                                <option>비활성</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                                상품 수정
                            </button>
                            <button className="flex-1 border border-red-200 text-red-600 bg-white px-5 py-2.5 rounded-md hover:bg-red-50 transition-colors">
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
