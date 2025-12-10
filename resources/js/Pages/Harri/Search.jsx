import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';
import { SearchIcon, HeartIcon, CartIcon } from '@/Components/Icons';

const searchResults = [
    { id: 1, name: '프리미엄 울 코트', price: 189000, original_price: 259000, category: '여성' },
    { id: 2, name: '캐시미어 스웨터', price: 129000, category: '여성' },
    { id: 3, name: '슬림핏 데님 팬츠', price: 89000, original_price: 119000, category: '남성' },
    { id: 4, name: '클래식 체크 셔츠', price: 69000, category: '남성' },
];

const popularSearches = ['코트', '스웨터', '데님', '셔츠', '원피스', '니트', '자켓'];

export default function Search() {
    const [query, setQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setHasSearched(true);
        }
    };

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">검색</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                {/* Search Form */}
                <div className="max-w-2xl mx-auto mb-12">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="검색어를 입력하세요..."
                            className="w-full h-16 pl-6 pr-14 text-lg border-2 border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                        />
                        <button
                            type="submit"
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#55585B] hover:text-[#F50963] transition-colors"
                        >
                            <SearchIcon className="w-6 h-6" />
                        </button>
                    </form>

                    {/* Popular Searches */}
                    <div className="mt-6">
                        <p className="text-sm text-[#55585B] mb-3">인기 검색어</p>
                        <div className="flex flex-wrap gap-2">
                            {popularSearches.map((term) => (
                                <button
                                    key={term}
                                    onClick={() => {
                                        setQuery(term);
                                        setHasSearched(true);
                                    }}
                                    className="px-4 py-2 text-sm border border-[#EAEAEF] text-[#55585B] hover:border-[#F50963] hover:text-[#F50963] transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search Results */}
                {hasSearched && (
                    <>
                        <div className="border-t border-[#EAEAEF] pt-8">
                            <p className="text-[#55585B] mb-6">
                                <span className="text-[#010F1C] font-medium">"{query}"</span>에 대한 검색 결과
                                <span className="text-[#F50963] font-medium ml-1">{searchResults.length}개</span>
                            </p>

                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {searchResults.map((product) => (
                                        <div key={product.id} className="group">
                                            <div className="relative overflow-hidden bg-gray-100 mb-4">
                                                <Link href={`/harri/product/${product.id}`}>
                                                    <div className="aspect-[3/4] flex items-center justify-center">
                                                        <span className="text-gray-400 text-sm">상품 이미지</span>
                                                    </div>
                                                </Link>

                                                {/* Action Buttons */}
                                                <div className="absolute top-3 right-3 flex flex-col gap-2">
                                                    <button className="w-9 h-9 bg-white shadow flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hover:bg-[#F50963] hover:text-white">
                                                        <HeartIcon className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Add to Cart */}
                                                <div className="absolute bottom-0 left-0 right-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                    <button className="w-full bg-[#010F1C] text-white py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#F50963] transition-colors">
                                                        <CartIcon className="w-4 h-4" />
                                                        장바구니 담기
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <span className="text-xs text-[#F50963] mb-1 block">{product.category}</span>
                                                <h3 className="text-sm font-medium mb-2">
                                                    <Link href={`/harri/product/${product.id}`} className="hover:text-[#F50963] transition-colors">
                                                        {product.name}
                                                    </Link>
                                                </h3>
                                                <div className="text-sm">
                                                    {product.original_price ? (
                                                        <>
                                                            <span className="text-gray-400 line-through mr-2">₩{formatPrice(product.original_price)}</span>
                                                            <span className="text-[#F50963] font-medium">₩{formatPrice(product.price)}</span>
                                                        </>
                                                    ) : (
                                                        <span className="font-medium">₩{formatPrice(product.price)}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                        <SearchIcon className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#010F1C] mb-2">검색 결과가 없습니다</h2>
                                    <p className="text-[#55585B] mb-4">다른 검색어로 시도해보세요.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Initial State */}
                {!hasSearched && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-6 bg-[#F50963]/10 rounded-full flex items-center justify-center">
                            <SearchIcon className="w-12 h-12 text-[#F50963]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#010F1C] mb-2">무엇을 찾으시나요?</h2>
                        <p className="text-[#55585B]">상품명, 카테고리, 브랜드 등으로 검색해보세요.</p>
                    </div>
                )}
            </div>
        </HarriLayout>
    );
}
