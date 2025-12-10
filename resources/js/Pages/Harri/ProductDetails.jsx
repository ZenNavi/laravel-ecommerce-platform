import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';
import { HeartIcon, CartIcon, StarIcon, MinusIcon, PlusIcon, ShippingIcon, RefundIcon } from '@/Components/Icons';

const product = {
    id: 1,
    name: '프리미엄 울 코트',
    price: 189000,
    original_price: 259000,
    discount: 27,
    description: '고급 울 소재로 제작된 클래식한 디자인의 코트입니다. 따뜻하면서도 세련된 스타일을 연출할 수 있습니다.',
    details: [
        '소재: 울 80%, 폴리에스터 20%',
        '세탁: 드라이클리닝 권장',
        '원산지: 대한민국',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
        { id: 'black', name: '블랙', hex: '#000000' },
        { id: 'beige', name: '베이지', hex: '#D4B896' },
        { id: 'navy', name: '네이비', hex: '#1B3A5F' },
    ],
    rating: 4.5,
    reviews: 128,
    sku: 'WC-001-BK',
    stock: 15,
};

const relatedProducts = [
    { id: 2, name: '캐시미어 스웨터', price: 129000 },
    { id: 3, name: '슬림핏 데님 팬츠', price: 89000, original_price: 119000 },
    { id: 4, name: '클래식 체크 셔츠', price: 69000 },
    { id: 5, name: '레더 크로스백', price: 159000 },
];

export default function ProductDetails({ productId }) {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('black');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    const handleQuantity = (action) => {
        if (action === 'increase' && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
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
                        <Link href="/harri/shop" className="text-[#55585B] hover:text-[#F50963]">쇼핑</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                {/* Product Main */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                    {/* Images */}
                    <div>
                        <div className="aspect-square bg-gray-100 flex items-center justify-center mb-4">
                            <span className="text-gray-400">상품 이미지</span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <button key={i} className="aspect-square bg-gray-100 border-2 border-transparent hover:border-[#F50963] transition-colors">
                                    <span className="text-gray-400 text-xs">썸네일 {i}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            <span className="bg-[#F50963] text-white text-xs px-2 py-1">NEW</span>
                            <span className="bg-[#010F1C] text-white text-xs px-2 py-1">-{product.discount}%</span>
                        </div>

                        <h1 className="text-2xl lg:text-3xl font-bold text-[#010F1C] mb-4">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1 text-[#FF9800]">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <StarIcon key={i} className="w-4 h-4" filled={i <= Math.floor(product.rating)} />
                                ))}
                            </div>
                            <span className="text-sm text-[#55585B]">({product.reviews} 리뷰)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-[#F50963]">₩{formatPrice(product.price)}</span>
                            {product.original_price && (
                                <span className="text-lg text-gray-400 line-through">₩{formatPrice(product.original_price)}</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[#55585B] leading-relaxed mb-6">{product.description}</p>

                        {/* Color */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-[#010F1C] mb-3">색상</h4>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={`w-10 h-10 rounded-full border-2 transition-colors ${
                                            selectedColor === color.id ? 'border-[#F50963]' : 'border-gray-200'
                                        }`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-[#010F1C] mb-3">사이즈</h4>
                            <div className="flex gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 border text-sm font-medium transition-colors ${
                                            selectedSize === size
                                                ? 'bg-[#010F1C] text-white border-[#010F1C]'
                                                : 'border-[#EAEAEF] text-[#010F1C] hover:border-[#F50963]'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-[#010F1C] mb-3">수량</h4>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantity('decrease')}
                                    className="w-12 h-12 border border-[#EAEAEF] flex items-center justify-center hover:bg-gray-100"
                                >
                                    <MinusIcon className="w-4 h-4" />
                                </button>
                                <span className="w-16 h-12 border-t border-b border-[#EAEAEF] flex items-center justify-center text-lg font-medium">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantity('increase')}
                                    className="w-12 h-12 border border-[#EAEAEF] flex items-center justify-center hover:bg-gray-100"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                                <span className="ml-4 text-sm text-[#55585B]">{product.stock}개 남음</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <button className="flex-1 h-14 bg-[#010F1C] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#F50963] transition-colors">
                                <CartIcon className="w-5 h-5" />
                                장바구니 담기
                            </button>
                            <button className="w-14 h-14 border border-[#EAEAEF] flex items-center justify-center hover:border-[#F50963] hover:text-[#F50963] transition-colors">
                                <HeartIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Buy Now */}
                        <button className="w-full h-14 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors mb-8">
                            바로 구매하기
                        </button>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#EAEAEF]">
                            <div className="flex items-center gap-3">
                                <ShippingIcon className="w-10 h-10 text-[#55585B]" />
                                <div>
                                    <p className="text-sm font-medium text-[#010F1C]">무료 배송</p>
                                    <p className="text-xs text-[#55585B]">₩50,000 이상</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RefundIcon className="w-10 h-10 text-[#55585B]" />
                                <div>
                                    <p className="text-sm font-medium text-[#010F1C]">간편 환불</p>
                                    <p className="text-xs text-[#55585B]">30일 이내</p>
                                </div>
                            </div>
                        </div>

                        {/* SKU */}
                        <p className="mt-6 text-sm text-[#55585B]">SKU: {product.sku}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-[#EAEAEF] mb-16">
                    <div className="flex gap-8 border-b border-[#EAEAEF]">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'description'
                                    ? 'border-[#F50963] text-[#F50963]'
                                    : 'border-transparent text-[#55585B] hover:text-[#010F1C]'
                            }`}
                        >
                            상세 정보
                        </button>
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'details'
                                    ? 'border-[#F50963] text-[#F50963]'
                                    : 'border-transparent text-[#55585B] hover:text-[#010F1C]'
                            }`}
                        >
                            제품 상세
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'reviews'
                                    ? 'border-[#F50963] text-[#F50963]'
                                    : 'border-transparent text-[#55585B] hover:text-[#010F1C]'
                            }`}
                        >
                            리뷰 ({product.reviews})
                        </button>
                    </div>
                    <div className="py-8">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <p className="text-[#55585B] leading-relaxed">{product.description}</p>
                                <p className="text-[#55585B] leading-relaxed mt-4">
                                    이 코트는 고급 울 소재를 사용하여 따뜻함과 스타일을 동시에 제공합니다.
                                    클래식한 디자인으로 어떤 옷에도 잘 어울리며, 다양한 상황에서 착용할 수 있습니다.
                                </p>
                            </div>
                        )}
                        {activeTab === 'details' && (
                            <ul className="space-y-2">
                                {product.details.map((detail, index) => (
                                    <li key={index} className="text-[#55585B] flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#F50963] rounded-full"></span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'reviews' && (
                            <p className="text-[#55585B]">리뷰 내용이 여기에 표시됩니다.</p>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="text-2xl font-bold text-[#010F1C] mb-8">관련 상품</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((item) => (
                            <Link key={item.id} href={`/harri/product/${item.id}`} className="group">
                                <div className="aspect-[3/4] bg-gray-100 mb-4 flex items-center justify-center group-hover:opacity-80 transition-opacity">
                                    <span className="text-gray-400 text-sm">상품 이미지</span>
                                </div>
                                <h3 className="text-sm font-medium group-hover:text-[#F50963] transition-colors">{item.name}</h3>
                                <div className="text-sm mt-1">
                                    {item.original_price ? (
                                        <>
                                            <span className="text-gray-400 line-through mr-2">₩{formatPrice(item.original_price)}</span>
                                            <span className="text-[#F50963] font-medium">₩{formatPrice(item.price)}</span>
                                        </>
                                    ) : (
                                        <span className="font-medium">₩{formatPrice(item.price)}</span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </HarriLayout>
    );
}
