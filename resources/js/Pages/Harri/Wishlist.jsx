import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';
import { CartIcon, CloseIcon } from '@/Components/Icons';

const initialWishlistItems = [
    { id: 1, name: '프리미엄 울 코트', price: 189000, original_price: 259000, inStock: true },
    { id: 2, name: '캐시미어 스웨터', price: 129000, inStock: true },
    { id: 3, name: '슬림핏 데님 팬츠', price: 89000, original_price: 119000, inStock: false },
    { id: 4, name: '클래식 체크 셔츠', price: 69000, inStock: true },
];

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    const removeItem = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">위시리스트</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-8">위시리스트</h1>

                {wishlistItems.length > 0 ? (
                    <>
                        {/* Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#EAEAEF] text-sm font-medium text-[#55585B]">
                            <div className="col-span-6">상품</div>
                            <div className="col-span-2 text-center">가격</div>
                            <div className="col-span-2 text-center">재고 상태</div>
                            <div className="col-span-2 text-center">작업</div>
                        </div>

                        {/* Items */}
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-[#EAEAEF] items-center">
                                {/* Product */}
                                <div className="md:col-span-6 flex gap-4">
                                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">이미지</span>
                                    </div>
                                    <div className="flex-1">
                                        <Link href={`/harri/product/${item.id}`} className="font-medium text-[#010F1C] hover:text-[#F50963]">
                                            {item.name}
                                        </Link>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-sm text-[#F50963] mt-2 hover:underline flex items-center gap-1 md:hidden"
                                        >
                                            <CloseIcon className="w-3 h-3" />
                                            삭제
                                        </button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="md:col-span-2 text-center">
                                    <span className="md:hidden text-sm text-[#55585B]">가격: </span>
                                    <div>
                                        {item.original_price ? (
                                            <>
                                                <span className="text-gray-400 line-through text-sm mr-2">₩{formatPrice(item.original_price)}</span>
                                                <span className="text-[#F50963] font-medium">₩{formatPrice(item.price)}</span>
                                            </>
                                        ) : (
                                            <span className="text-[#010F1C] font-medium">₩{formatPrice(item.price)}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="md:col-span-2 text-center">
                                    <span className="md:hidden text-sm text-[#55585B]">재고: </span>
                                    {item.inStock ? (
                                        <span className="text-[#2CAE76] font-medium">재고 있음</span>
                                    ) : (
                                        <span className="text-[#F50963] font-medium">품절</span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="md:col-span-2 flex items-center justify-center gap-2">
                                    <button
                                        disabled={!item.inStock}
                                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                                            item.inStock
                                                ? 'bg-[#010F1C] text-white hover:bg-[#F50963]'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        <CartIcon className="w-4 h-4" />
                                        <span className="hidden sm:inline">담기</span>
                                    </button>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="hidden md:flex w-10 h-10 items-center justify-center border border-[#EAEAEF] text-[#55585B] hover:border-[#F50963] hover:text-[#F50963] transition-colors"
                                    >
                                        <CloseIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                            <Link
                                href="/harri/shop"
                                className="text-[#010F1C] font-medium hover:text-[#F50963] transition-colors"
                            >
                                ← 쇼핑 계속하기
                            </Link>
                            <button className="bg-[#F50963] text-white px-8 py-3 font-medium hover:bg-[#d90858] transition-colors">
                                전체 장바구니에 담기
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[#010F1C] mb-2">위시리스트가 비어있습니다</h2>
                        <p className="text-[#55585B] mb-8">마음에 드는 상품을 저장해보세요!</p>
                        <Link
                            href="/harri/shop"
                            className="inline-block bg-[#F50963] text-white px-8 py-4 font-medium hover:bg-[#d90858] transition-colors"
                        >
                            쇼핑하러 가기
                        </Link>
                    </div>
                )}
            </div>
        </HarriLayout>
    );
}
