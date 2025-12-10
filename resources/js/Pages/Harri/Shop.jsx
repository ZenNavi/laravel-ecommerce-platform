import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';
import { HeartIcon, EyeIcon, CartIcon, ArrowRightIcon } from '@/Components/Icons';

const products = [
    { id: 1, name: '프리미엄 울 코트', price: 189000, original_price: 259000, discount: 27, is_new: true, category: 'women' },
    { id: 2, name: '캐시미어 스웨터', price: 129000, category: 'women' },
    { id: 3, name: '슬림핏 데님 팬츠', price: 89000, original_price: 119000, discount: 25, category: 'men' },
    { id: 4, name: '클래식 체크 셔츠', price: 69000, is_new: true, category: 'men' },
    { id: 5, name: '레더 크로스백', price: 159000, category: 'accessories' },
    { id: 6, name: '빈티지 선글라스', price: 89000, is_sale: true, category: 'accessories' },
    { id: 7, name: '컴포트 스니커즈', price: 139000, original_price: 169000, discount: 18, category: 'shoes' },
    { id: 8, name: '클래식 로퍼', price: 179000, category: 'shoes' },
    { id: 9, name: '오버핏 후드', price: 79000, is_new: true, category: 'men' },
    { id: 10, name: '플리츠 스커트', price: 89000, category: 'women' },
    { id: 11, name: '니트 카디건', price: 99000, category: 'women' },
    { id: 12, name: '슬랙스 팬츠', price: 79000, category: 'men' },
];

const categories = [
    { id: 'all', name: '전체' },
    { id: 'women', name: '여성' },
    { id: 'men', name: '남성' },
    { id: 'accessories', name: '액세서리' },
    { id: 'shoes', name: '신발' },
];

const sortOptions = [
    { id: 'newest', name: '최신순' },
    { id: 'price_low', name: '가격 낮은순' },
    { id: 'price_high', name: '가격 높은순' },
    { id: 'popular', name: '인기순' },
];

function ProductCard({ product }) {
    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    return (
        <div className="group bg-white">
            <div className="relative overflow-hidden">
                <Link href={`/harri/product/${product.id}`}>
                    <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">상품 이미지</span>
                    </div>
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.is_new && (
                        <span className="bg-[#F50963] text-white text-xs px-2 py-1">NEW</span>
                    )}
                    {product.is_sale && (
                        <span className="bg-[#2CAE76] text-white text-xs px-2 py-1">SALE</span>
                    )}
                    {product.discount > 0 && (
                        <span className="bg-[#010F1C] text-white text-xs px-2 py-1">-{product.discount}%</span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button className="w-9 h-9 bg-white shadow flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hover:bg-[#F50963] hover:text-white">
                        <HeartIcon className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 bg-white shadow flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 delay-75 hover:bg-[#F50963] hover:text-white">
                        <EyeIcon className="w-4 h-4" />
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

            <div className="pt-4 pb-2">
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
    );
}

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSort, setSelectedSort] = useState('newest');
    const [priceRange, setPriceRange] = useState([0, 500000]);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">쇼핑</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        {/* Categories */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-[#010F1C] mb-4">카테고리</h3>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left py-2 px-3 text-sm transition-colors ${
                                                selectedCategory === category.id
                                                    ? 'bg-[#F50963] text-white'
                                                    : 'text-[#55585B] hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-[#010F1C] mb-4">가격대</h3>
                            <div className="space-y-2">
                                <button className="block w-full text-left py-2 px-3 text-sm text-[#55585B] hover:bg-gray-100">
                                    ₩50,000 미만
                                </button>
                                <button className="block w-full text-left py-2 px-3 text-sm text-[#55585B] hover:bg-gray-100">
                                    ₩50,000 - ₩100,000
                                </button>
                                <button className="block w-full text-left py-2 px-3 text-sm text-[#55585B] hover:bg-gray-100">
                                    ₩100,000 - ₩200,000
                                </button>
                                <button className="block w-full text-left py-2 px-3 text-sm text-[#55585B] hover:bg-gray-100">
                                    ₩200,000 이상
                                </button>
                            </div>
                        </div>

                        {/* Promo Banner */}
                        <div className="bg-[#010F1C] p-6 text-center">
                            <span className="text-[#F50963] text-sm font-medium">SPECIAL</span>
                            <h4 className="text-white text-xl font-bold mt-2 mb-3">시즌 세일</h4>
                            <p className="text-white/60 text-sm mb-4">최대 50% 할인</p>
                            <Link
                                href="/harri/shop?sale=true"
                                className="inline-block bg-[#F50963] text-white text-sm px-5 py-2 hover:bg-white hover:text-[#010F1C] transition-colors"
                            >
                                보러가기
                            </Link>
                        </div>
                    </aside>

                    {/* Products */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-[#EAEAEF]">
                            <p className="text-sm text-[#55585B]">
                                총 <span className="text-[#010F1C] font-medium">{filteredProducts.length}</span>개 상품
                            </p>
                            <div className="flex items-center gap-4">
                                <select
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                    className="h-10 px-4 border border-[#EAEAEF] text-sm focus:border-[#F50963] outline-none"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-10 gap-2">
                            <button className="w-10 h-10 flex items-center justify-center border border-[#EAEAEF] hover:border-[#F50963] hover:text-[#F50963] transition-colors">
                                &lt;
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center bg-[#F50963] text-white">
                                1
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center border border-[#EAEAEF] hover:border-[#F50963] hover:text-[#F50963] transition-colors">
                                2
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center border border-[#EAEAEF] hover:border-[#F50963] hover:text-[#F50963] transition-colors">
                                3
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center border border-[#EAEAEF] hover:border-[#F50963] hover:text-[#F50963] transition-colors">
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </HarriLayout>
    );
}
