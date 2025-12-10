import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';
import { ArrowRightIcon, ShippingIcon, RefundIcon, SupportIcon, PaymentIcon } from '@/Components/Icons';

// Sample products data
const featuredProducts = [
    { id: 1, name: '프리미엄 울 코트', price: 189000, original_price: 259000, image: '/images/products/coat.jpg', discount: 27, is_new: true },
    { id: 2, name: '캐시미어 스웨터', price: 129000, original_price: null, image: '/images/products/sweater.jpg', is_sale: false },
    { id: 3, name: '슬림핏 데님 팬츠', price: 89000, original_price: 119000, image: '/images/products/jeans.jpg', discount: 25 },
    { id: 4, name: '클래식 체크 셔츠', price: 69000, original_price: null, image: '/images/products/shirt.jpg', is_new: true },
];

const categories = [
    { id: 1, name: '여성', image: '/images/categories/women.jpg', count: 245 },
    { id: 2, name: '남성', image: '/images/categories/men.jpg', count: 189 },
    { id: 3, name: '액세서리', image: '/images/categories/accessories.jpg', count: 98 },
    { id: 4, name: '신발', image: '/images/categories/shoes.jpg', count: 156 },
];

const services = [
    { icon: ShippingIcon, title: '무료 배송', description: '₩50,000 이상 주문시' },
    { icon: RefundIcon, title: '간편 환불', description: '30일 이내 무료 반품' },
    { icon: SupportIcon, title: '24/7 지원', description: '언제든 문의하세요' },
    { icon: PaymentIcon, title: '안전 결제', description: '100% 보안 결제' },
];

function ProductCard({ product }) {
    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    return (
        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 mb-4">
                <Link href={`/harri/product/${product.id}`}>
                    <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">상품 이미지</span>
                    </div>
                </Link>
                {product.is_new && (
                    <span className="absolute top-3 left-3 bg-[#F50963] text-white text-xs px-2 py-1">NEW</span>
                )}
                {product.discount > 0 && (
                    <span className="absolute top-3 right-3 bg-[#010F1C] text-white text-xs px-2 py-1">-{product.discount}%</span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Link
                        href={`/harri/product/${product.id}`}
                        className="block w-full bg-[#010F1C] text-white text-center py-3 text-sm font-medium hover:bg-[#F50963] transition-colors"
                    >
                        상세보기
                    </Link>
                </div>
            </div>
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
    );
}

export default function Home() {
    return (
        <HarriLayout>
            {/* Hero Banner */}
            <section className="relative bg-[#F6F6F6]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px] py-16">
                        <div className="order-2 lg:order-1">
                            <span className="inline-block text-[#F50963] text-sm font-medium mb-4 tracking-wider">
                                2024 NEW COLLECTION
                            </span>
                            <h1 className="text-4xl lg:text-6xl font-bold text-[#010F1C] mb-6 leading-tight">
                                세련된 스타일의<br />
                                새로운 시작
                            </h1>
                            <p className="text-[#55585B] text-lg mb-8 leading-relaxed">
                                최신 트렌드와 클래식한 디자인이 만나<br />
                                당신만의 스타일을 완성합니다.
                            </p>
                            <Link
                                href="/harri/shop"
                                className="inline-flex items-center gap-3 bg-[#010F1C] text-white px-8 py-4 font-medium hover:bg-[#F50963] transition-colors"
                            >
                                쇼핑하기
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="aspect-square bg-gray-300 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">히어로 이미지</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16 border-b border-[#EAEAEF]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-[#F50963]">
                                    <service.icon className="w-12 h-12" />
                                </div>
                                <h3 className="font-semibold text-[#010F1C] mb-2">{service.title}</h3>
                                <p className="text-sm text-[#55585B]">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-[#F50963] text-sm font-medium tracking-wider">CATEGORIES</span>
                            <h2 className="text-3xl font-bold text-[#010F1C] mt-2">카테고리</h2>
                        </div>
                        <Link
                            href="/harri/shop"
                            className="flex items-center gap-2 text-[#010F1C] font-medium hover:text-[#F50963] transition-colors"
                        >
                            전체보기
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/harri/shop?category=${category.id}`}
                                className="group relative overflow-hidden"
                            >
                                <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">{category.name}</span>
                                </div>
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                                    <p className="text-sm">{category.count}개 상품</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-[#F6F6F6]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <span className="text-[#F50963] text-sm font-medium tracking-wider">FEATURED</span>
                        <h2 className="text-3xl font-bold text-[#010F1C] mt-2">인기 상품</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link
                            href="/harri/shop"
                            className="inline-flex items-center gap-2 border-2 border-[#010F1C] text-[#010F1C] px-8 py-3 font-medium hover:bg-[#010F1C] hover:text-white transition-colors"
                        >
                            더 보기
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section className="py-20 bg-[#010F1C]">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-[#F50963] text-sm font-medium tracking-wider">LIMITED OFFER</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
                        첫 구매 고객 20% 할인
                    </h2>
                    <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                        지금 회원가입하고 첫 구매시 특별 할인을 받아보세요.<br />
                        신규 회원 전용 프로모션은 기간 한정입니다.
                    </p>
                    <Link
                        href="/harri/register"
                        className="inline-flex items-center gap-3 bg-[#F50963] text-white px-8 py-4 font-medium hover:bg-white hover:text-[#010F1C] transition-colors"
                    >
                        지금 가입하기
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#010F1C] mb-4">뉴스레터 구독</h2>
                        <p className="text-[#55585B] mb-8">
                            새로운 상품 소식과 특별 할인 정보를 가장 먼저 받아보세요.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="이메일 주소를 입력하세요"
                                className="flex-1 h-14 px-6 border border-[#EAEAEF] focus:border-[#F50963] outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="h-14 px-8 bg-[#F50963] text-white font-medium hover:bg-[#010F1C] transition-colors"
                            >
                                구독하기
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </HarriLayout>
    );
}
