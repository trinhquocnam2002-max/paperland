import React from 'react';
import { Heart, Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenProduct,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist
}) => {
  const afterpayInstallment = (product.price / 4).toFixed(2);

  return (
    <div
      onClick={() => onOpenProduct(product)}
      className="group relative bg-[#fdfcf9] border border-[#e5dfd3] rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#cfc6b4] cursor-pointer"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f2ece2]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button (Interactive Affordance) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-[#5a6259] hover:bg-white hover:text-black'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Text Tag (Single quiet tag, NO pill badge sandwich) */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-medium bg-black/60 backdrop-blur-sm text-[#f1ede6] px-2.5 py-1 rounded-sm">
            {product.gsm}gsm · {product.dimensions}
          </span>
        </div>
      </div>

      {/* Card Details & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category & Paper Type (Unboxed text with typographic separator) */}
          <div className="flex items-center gap-1.5 text-xs text-[#7d7162]">
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span>{product.binding.split(' ')[0]} Binding</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif-title text-base sm:text-lg font-medium text-[#1e231e] group-hover:text-[#384838] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#5d655c] line-clamp-2 leading-relaxed font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Price & Afterpay Section */}
        <div className="pt-2 border-t border-[#eee9de] space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold font-mono tabular-nums text-[#1e231e]">
                ${product.price.toFixed(2)} AUD
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-[#908779] font-mono tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs text-[#636c62]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-semibold text-[#252b25]">{product.rating}</span>
              <span className="text-[11px] text-[#868f85]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Afterpay breakdown */}
          <div className="text-[11px] text-[#6e776d] flex items-center justify-between">
            <span>or 4x <strong className="font-mono text-[#252c25]">${afterpayInstallment}</strong> with Afterpay</span>
            {product.isStudentPick && (
              <span className="text-[10px] text-[#785f40] font-medium">Student Pick</span>
            )}
          </div>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          className="w-full mt-2 py-2 px-3 bg-white hover:bg-[#283228] hover:text-white text-[#283228] border border-[#cfc7b6] hover:border-[#283228] text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Quick Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
