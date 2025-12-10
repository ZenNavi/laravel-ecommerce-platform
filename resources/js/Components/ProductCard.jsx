import { Link } from '@inertiajs/react';
import { HeartIcon, EyeIcon, CartIcon, LinkIcon } from './Icons';

export default function ProductCard({ product, onAddToCart, onAddToWishlist, onQuickView }) {
    const { id, name, price, original_price, image, discount, is_new, is_sale } = product;

    const formatPrice = (price) => {
        return Number(price).toLocaleString('ko-KR');
    };

    return (
        <div className="product__item group relative bg-white overflow-hidden">
            {/* Product Image */}
            <div className="product__thumb relative overflow-hidden">
                <Link href={`/products/${id}`}>
                    <img
                        src={image || '/images/placeholder.png'}
                        alt={name}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute left-0 top-5 z-10 flex flex-col gap-1">
                    {is_new && (
                        <span className="inline-block text-xs text-white bg-[#F50963] px-2.5 py-1">
                            NEW
                        </span>
                    )}
                    {is_sale && (
                        <span className="inline-block text-xs text-white bg-[#2CAE76] px-2.5 py-1">
                            SALE
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="inline-block text-xs text-white bg-[#03041C] px-2.5 py-1">
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="product__action absolute top-10 right-2.5 z-10">
                    <button
                        onClick={() => onAddToWishlist?.(product)}
                        className="flex items-center justify-center w-[38px] h-[38px] bg-white shadow-md mb-1.5
                                   translate-x-full opacity-0 invisible transition-all duration-300 delay-0
                                   group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible
                                   hover:bg-[#F50963] hover:text-white"
                    >
                        <HeartIcon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onQuickView?.(product)}
                        className="flex items-center justify-center w-[38px] h-[38px] bg-white shadow-md mb-1.5
                                   translate-x-full opacity-0 invisible transition-all duration-300 delay-100
                                   group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible
                                   hover:bg-[#F50963] hover:text-white"
                    >
                        <EyeIcon className="w-4 h-4" />
                    </button>
                    <Link
                        href={`/products/${id}`}
                        className="flex items-center justify-center w-[38px] h-[38px] bg-white shadow-md
                                   translate-x-full opacity-0 invisible transition-all duration-300 delay-150
                                   group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible
                                   hover:bg-[#F50963] hover:text-white"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </Link>
                </div>

                {/* Add to Cart Button */}
                <div className="product__add absolute bottom-0 left-0 right-0 -mb-14 opacity-0 invisible transition-all duration-300 group-hover:mb-0 group-hover:opacity-100 group-hover:visible">
                    <button
                        onClick={() => onAddToCart?.(product)}
                        className="flex items-center justify-center w-full bg-[#03041C] text-white py-2.5 px-6 text-[15px] font-semibold gap-2 hover:bg-[#F50963] transition-colors"
                    >
                        <CartIcon className="w-4 h-4" />
                        <span>장바구니 담기</span>
                    </button>
                </div>
            </div>

            {/* Product Content */}
            <div className="product__content pt-3.5">
                <h3 className="product__title text-sm font-normal mb-2">
                    <Link
                        href={`/products/${id}`}
                        className="text-[#010F1C] hover:text-[#F50963] transition-colors"
                    >
                        {name}
                    </Link>
                </h3>
                <div className="product__price text-[15px] font-medium text-[#55585B]">
                    {discount > 0 || original_price ? (
                        <>
                            <span className="text-sm line-through text-[#A3A3AA] mr-2">
                                ₩{formatPrice(original_price || price)}
                            </span>
                            <span className="text-[#F50963]">
                                ₩{formatPrice(price)}
                            </span>
                        </>
                    ) : (
                        <span>₩{formatPrice(price)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
