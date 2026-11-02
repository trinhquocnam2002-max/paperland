import React from 'react';
import { X, Heart, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#fcfbf9] rounded-xl shadow-2xl border border-[#ded8cb] overflow-hidden my-auto max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e9e3d6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif-title text-lg font-semibold text-[#1e251e]">
              Saved Wishlist ({wishlistedProducts.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f1ede3] text-[#60695f] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Heart className="w-8 h-8 text-[#a9b0a7] mx-auto stroke-1" />
              <p className="font-serif-title text-base text-[#252c25]">Your wishlist is currently empty</p>
              <p className="text-xs text-[#6e766c]">
                Click the heart icon on any notebook or planner to save it for later.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-white rounded-lg border border-[#e5dfd3] flex items-center gap-3 justify-between"
              >
                <div
                  onClick={() => {
                    onClose();
                    onOpenProduct(product);
                  }}
                  className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover bg-[#f0ebd9] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif-title text-xs font-semibold text-[#1f261f] truncate">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-[#717b70] mt-0.5">
                      {product.gsm}gsm · <span className="font-mono font-bold">${product.price.toFixed(2)} AUD</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    className="py-1.5 px-2.5 bg-[#283228] hover:bg-[#1a211a] text-white text-xs font-medium rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Add to Cart"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-1.5 text-[#9fa79d] hover:text-rose-600 transition-colors cursor-pointer"
                    aria-label="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
