import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  appliedDiscountCode: string;
  onApplyDiscountCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscountCode,
  onApplyDiscountCode
}) => {
  const [discountInput, setDiscountInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_GOAL = 50.00;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_GOAL - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_GOAL) * 100);

  const discountPercent = appliedDiscountCode.toUpperCase() === 'STUDENT15' ? 0.15 : 0;
  const discountAmount = subtotal * discountPercent;
  const total = subtotal - discountAmount;
  const afterpayQuarter = (total / 4).toFixed(2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountInput.trim()) return;
    const success = onApplyDiscountCode(discountInput.trim());
    if (success) {
      setPromoMessage({ text: '15% Student Discount Applied!' });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "STUDENT15" for 15% off.', isError: true });
    }
    setDiscountInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#fcfbf9] h-full shadow-2xl border-l border-[#e5dfd3] flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#e9e3d6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2b352b]" />
            <h2 className="font-serif-title text-xl font-semibold text-[#1e251e]">Your Shopping Bag</h2>
            <span className="text-xs text-[#70786f] font-mono">({items.reduce((s, i) => s + i.quantity, 0)})</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f1ede3] text-[#60695f] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#f5f0e4] border-b border-[#e3dccf] text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[#3b443b]">
                <span>Add <strong>${remainingForFreeShipping.toFixed(2)} AUD</strong> for Free AusPost Delivery</span>
                <span className="font-mono">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#e0d8c8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3d4d3d] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>You've unlocked Free Australia Post Tracked Delivery!</span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#f0ebd9] flex items-center justify-center text-[#7e725d]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="font-serif-title text-lg text-[#202720]">Your bag is empty</p>
              <p className="text-xs text-[#6e766c] max-w-xs">
                Explore our 130gsm bleed-proof bullet journals and undated planners.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#283228] text-white text-xs font-medium rounded hover:bg-[#1a211a] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedVariant.id}-${item.selectedLayout}-${index}`}
                className="flex gap-3.5 p-3.5 bg-white rounded-lg border border-[#e8e2d4] shadow-2xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded object-cover bg-[#f4ede3] shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-title text-sm font-semibold text-[#1e251e] leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-[#9ea79c] hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#717a6f] flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block border border-black/10"
                        style={{ backgroundColor: item.selectedVariant.colorHex }}
                      />
                      <span>{item.selectedVariant.name}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{item.selectedLayout.replace('-', ' ')}</span>
                    </div>

                    <div className="text-[10px] text-[#8c948b]">
                      {item.product.gsm}gsm bamboo paper
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#d8d1c1] rounded bg-[#faf8f4] text-xs">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 text-[#545e54] hover:bg-[#eae3d5] transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-semibold text-[#242c24]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 text-[#545e54] hover:bg-[#eae3d5] transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold font-mono tabular-nums text-[#1d251d]">
                      ${(item.product.price * item.quantity).toFixed(2)} AUD
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#e8e2d4] bg-white space-y-3.5">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#887e6f] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  placeholder="Discount code (e.g. STUDENT15)"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f8f6f0] border border-[#d8d1c1] rounded text-[#222922] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#283228]"
                />
              </div>
              <button
                type="submit"
                className="py-1.5 px-3 bg-[#e8e2d4] hover:bg-[#ded7c7] text-[#2b332b] text-xs font-medium rounded transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div
                className={`text-[11px] p-1.5 rounded ${
                  promoMessage.isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'
                }`}
              >
                {promoMessage.text}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-[#f0ebd9]">
              <div className="flex justify-between text-[#636c61]">
                <span>Bag Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)} AUD</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Student Discount (15%)</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)} AUD</span>
                </div>
              )}

              <div className="flex justify-between text-[#636c61]">
                <span>Australian Shipping</span>
                <span className="text-[#848d82]">Calculated next step (AusPost)</span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-[#1f261f] pt-1 border-t border-[#f0ebd9]">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)} AUD</span>
              </div>

              <div className="text-[11px] text-[#717b70] text-center pt-1">
                Or 4x <strong className="font-mono text-[#252c25]">${afterpayQuarter} AUD</strong> with Afterpay / Klarna
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-5 bg-[#283228] hover:bg-[#1a211a] text-white font-medium text-sm rounded shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#788077]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#354835]" />
              <span>Includes 10% Australian GST · Tracked Australia Post Dispatch</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
