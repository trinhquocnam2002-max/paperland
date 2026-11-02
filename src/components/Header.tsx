import React from 'react';
import { ShoppingBag, Heart, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenPaperLab: () => void;
  onOpenAboutProject: () => void;
  onOpenMiniGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigate,
  onOpenPaperLab,
  onOpenAboutProject,
  onOpenMiniGame
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbfaf7]/95 backdrop-blur-md border-b border-[#e8e4dc]">
      {/* Slim Top Bar: Free AusPost Shipping Announcement & Afterpay notice */}
      <div className="bg-[#242b24] text-[#ece8e1] px-4 py-1.5 text-xs font-normal">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Free Australia Post tracked shipping over $50 AUD</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="hidden sm:inline">Pay in 4 with Afterpay or Klarna</span>
          </div>
          <button
            onClick={onOpenMiniGame}
            className="flex items-center gap-1.5 text-[#d8c7a6] hover:text-white transition-colors cursor-pointer text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="underline underline-offset-2">Play Daily Word Quiz: Unlock 15% Off</span>
          </button>
        </div>
      </div>

      {/* Main Navigation - Strict 3-zone contract */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="font-serif-title text-2xl font-semibold tracking-tight text-[#222723] hover:text-[#3b4c3e] transition-colors whitespace-nowrap shrink-0"
        >
          Paper Land
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4f564e]">
          <button
            onClick={() => onNavigate('shop')}
            className="hover:text-[#1e231e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Collection
          </button>
          <button
            onClick={onOpenPaperLab}
            className="hover:text-[#1e231e] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>The Paper Lab (GSM)</span>
          </button>
          <button
            onClick={() => onNavigate('inspire')}
            className="hover:text-[#1e231e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Inspire Spreads
          </button>
          <button
            onClick={onOpenAboutProject}
            className="hover:text-[#1e231e] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 text-[#6b583f]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>MBA Research (Flinders)</span>
          </button>
          <button
            onClick={() => onNavigate('shipping-faq')}
            className="hover:text-[#1e231e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            AusPost Delivery
          </button>
        </nav>

        {/* Zone 3: Primary Action & Bag Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#4f564e] hover:text-[#1e231e] transition-colors cursor-pointer"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#8b6553] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 bg-[#283228] hover:bg-[#1a211a] text-[#f8f6f0] text-sm font-medium rounded-md transition-colors cursor-pointer shadow-xs whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-[#3e4d3e] text-[#f1efe9] text-xs font-semibold px-1.5 py-0.5 rounded">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
