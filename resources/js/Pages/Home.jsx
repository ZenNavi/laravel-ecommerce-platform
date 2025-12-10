import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import {
    ArrowRightIcon,
    ShippingIcon,
    RefundIcon,
    SupportIcon,
    PaymentIcon,
    RewardIcon,
    CommunityIcon
} from '@/Components/Icons';

// Feature Item Component
function FeatureItem({ icon, title, subtitle }) {
    return (
        <div className="flex items-start gap-4 mb-10">
            <div className="features__icon text-[#F50963]">
                {icon}
            </div>
            <div className="features__content">
                <h3 className="text-base font-medium text-[#010F1C] mb-1">{title}</h3>
                <p className="text-sm text-[#55585B] leading-relaxed">{subtitle}</p>
            </div>
        </div>
    );
}

// Category Item Component
function CategoryItem({ name, image, count, href }) {
    return (
        <Link
            href={href}
            className="group block text-center p-6 bg-[#F5F6F8] hover:bg-[#F50963] transition-colors duration-300"
        >
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                )}
            </div>
            <h3 className="text-sm font-medium text-[#010F1C] group-hover:text-white transition-colors">
                {name}
            </h3>
            {count !== undefined && (
                <p className="text-xs text-[#55585B] group-hover:text-white/80 transition-colors mt-1">
                    {count}개 상품
                </p>
            )}
        </Link>
    );
}

export default function Home({ auth, featuredProducts = [], categories = [], recentPosts = [] }) {
    const handleAddToCart = (product) => {
        // TODO: Implement cart functionality
        console.log('Add to cart:', product);
    };

    const handleAddToWishlist = (product) => {
        // TODO: Implement wishlist functionality
        console.log('Add to wishlist:', product);
    };

    const handleQuickView = (product) => {
        // TODO: Implement quick view modal
        console.log('Quick view:', product);
    };

    return (
        <MainLayout auth={auth}>
            <Head title="Home" />

            {/* Hero Banner Section */}
            <section className="slider__area bg-[#F5F6F8]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
                        <div className="lg:w-1/2">
                            <div className="slider__content">
                                <span className="block text-lg lg:text-xl text-[#55585B] mb-4 leading-relaxed">
                                    당신을 위한<br />베스트 컬렉션
                                </span>
                                <h1 className="text-4xl lg:text-6xl font-bold text-[#010F1C] mb-8 leading-tight">
                                    나만의 스타일을<br />찾아보세요.
                                </h1>
                                <div className="slider__btn">
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center gap-2 bg-transparent border-2 border-[#010F1C]/10 text-[#010F1C] px-8 py-4 font-medium hover:bg-[#010F1C] hover:border-[#010F1C] hover:text-white transition-all duration-300"
                                    >
                                        쇼핑하기
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative mt-8 lg:mt-0">
                            <div className="slider__thumb text-center relative">
                                <span className="absolute w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] bg-[#F50963]/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                                <img
                                    src="/images/slider-hero.png"
                                    alt="Hero"
                                    className="relative z-10 max-w-full h-auto mx-auto"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            {categories.length > 0 && (
                <section className="product__category py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {categories.map((category) => (
                                <CategoryItem
                                    key={category.id}
                                    name={category.name}
                                    image={category.image}
                                    count={category.products_count}
                                    href={`/products?category=${category.id}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Popular Products Section */}
            <section className="product__popular-area pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                        <div className="section__title mb-6 md:mb-0">
                            <h2 className="text-2xl lg:text-3xl font-semibold text-[#010F1C]">
                                인기 상품
                            </h2>
                        </div>
                        <div className="product__tab">
                            <Link
                                href="/products"
                                className="text-sm text-[#55585B] hover:text-[#F50963] transition-colors"
                            >
                                전체 상품 보기
                            </Link>
                        </div>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                    onAddToWishlist={handleAddToWishlist}
                                    onQuickView={handleQuickView}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-[#A3A3AA]">등록된 상품이 없습니다.</p>
                            <Link
                                href="/products"
                                className="inline-block mt-4 text-[#F50963] hover:underline"
                            >
                                전체 상품 보기
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Offer Banner Section */}
            <section className="offer__area py-16 bg-[#010F1C]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="lg:w-1/2 mb-8 lg:mb-0">
                            <span className="text-[#F50963] text-sm font-medium uppercase tracking-wider mb-4 block">
                                특별 할인
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                                이번 주만<br />최대 40% 할인
                            </h2>
                            <p className="text-white/70 mb-8 max-w-md">
                                매주 진행되는 특별 할인을 놓치지 마세요. 지금 쇼핑하고 좋아하는 상품을 저렴하게 구매하세요.
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-[#F50963] text-white px-8 py-4 font-medium hover:bg-[#6364DB] transition-colors duration-300"
                            >
                                쇼핑하기
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="lg:w-1/2 text-center">
                            <img
                                src="/images/offer-product.png"
                                alt="Special Offer"
                                className="max-w-full h-auto mx-auto"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features__area py-20 border-t border-[#EAEAEF]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureItem
                            icon={<ShippingIcon className="w-12 h-12" />}
                            title="무료 배송"
                            subtitle="₩50,000 이상 주문시 무료 배송"
                        />
                        <FeatureItem
                            icon={<RefundIcon className="w-12 h-12" />}
                            title="간편한 반품"
                            subtitle="30일 이내 교환/환불 가능"
                        />
                        <FeatureItem
                            icon={<SupportIcon className="w-12 h-12" />}
                            title="24시간 지원"
                            subtitle="연중무휴 고객 서비스"
                        />
                        <FeatureItem
                            icon={<PaymentIcon className="w-12 h-12" />}
                            title="안전한 결제"
                            subtitle="다양한 결제 수단 지원"
                        />
                    </div>
                </div>
            </section>

            {/* Community CTA Section */}
            <section className="cta__area py-20 bg-[#F5F6F8]">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl lg:text-3xl font-semibold text-[#010F1C] mb-4">
                            커뮤니티에 참여하세요
                        </h2>
                        <p className="text-[#55585B] mb-8">
                            다른 쇼퍼들과 소통하고, 리뷰를 공유하고, 새로운 상품을 함께 발견하세요. 활동할 때마다 리워드를 적립하세요!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/community"
                                className="inline-flex items-center justify-center gap-2 bg-[#F50963] text-white px-8 py-4 font-medium hover:bg-[#6364DB] transition-colors duration-300"
                            >
                                <CommunityIcon className="w-5 h-5" />
                                커뮤니티 참여
                            </Link>
                            <Link
                                href="/rewards"
                                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#010F1C] text-[#010F1C] px-8 py-4 font-medium hover:bg-[#010F1C] hover:text-white transition-colors duration-300"
                            >
                                <RewardIcon className="w-5 h-5" />
                                리워드 보기
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
