import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles, Feather } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onOpenBleedLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onOpenBleedLab }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#e8e4dc] bg-[#f8f6f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Value Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#7a6b57]">
              <span>Melbourne & Sydney Studio</span>
              <span aria-hidden="true">·</span>
              <span>130gsm Bleed-Proof Paper</span>
              <span aria-hidden="true">·</span>
              <span>$15 – $19 AUD Sweet Spot</span>
            </div>

            <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-5xl tracking-tight text-[#1e231e] leading-[1.15]" style={{ textWrap: 'balance' }}>
              Stationery crafted for mindful thinkers, students & creators.
            </h1>

            <p className="text-base sm:text-lg text-[#525b52] leading-relaxed max-w-xl font-normal">
              Australian stationery shouldn’t force you to choose between flimsy $4 supermarket paper that bleeds through and $33 luxury imports. Paper Land delivers 130–190gsm artisan notebooks, bullet journals, and weekly planners at an honest price.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onShopClick}
                className="px-6 py-3.5 bg-[#283228] hover:bg-[#1a211a] text-[#fbfaf7] font-medium text-sm rounded-md transition-all shadow-sm hover:translate-y-[-1px] flex items-center gap-2 cursor-pointer"
              >
                <span>Explore 2026 Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBleedLab}
                className="px-5 py-3.5 bg-white hover:bg-[#f2efe9] text-[#2e372e] font-medium text-sm rounded-md border border-[#dcd7cb] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Feather className="w-4 h-4 text-[#8a7258]" />
                <span>Test Pen Bleed Simulator</span>
              </button>
            </div>

            {/* Micro Trust Strip - Key Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e5e0d4] text-xs text-[#5f675e]">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#445544] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#252c25]">AusPost Delivery</div>
                  <div className="text-[11px] text-[#788177]">Free over $50 AUD</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#445544] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#252c25]">Afterpay & Klarna</div>
                  <div className="text-[11px] text-[#788177]">4 x $4.25 AUD</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#445544] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#252c25]">No Ghosting</div>
                  <div className="text-[11px] text-[#788177]">130gsm thick leaves</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#ded9cd] shadow-md aspect-16/10 bg-[#eae5db]">
              <img
                src={HERO_IMAGE}
                alt="Paper Land 130gsm hardcover bullet journal with brass fountain pen and eucalyptus leaves"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
                <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                  <span>Adelaide & Melbourne Design Lab · Smyth-Sewn 180° Binding</span>
                </div>
                <div className="hidden sm:block bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                  <span className="font-mono tabular-nums">From $15.00 AUD</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
