import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BleedSimulator } from './components/BleedSimulator';
import { MiniGame } from './components/MiniGame';
import { GsmGuideModal } from './components/GsmGuideModal';
import { AboutProjectModal } from './components/AboutProjectModal';
import { InspireGallery } from './components/InspireGallery';
import { ShippingFaq } from './components/ShippingFaq';
import { Footer } from './components/Footer';
import { WishlistModal } from './components/WishlistModal';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ProductVariant, PageLayout, PaperGsm } from './types';
import { Search, SlidersHorizontal, ArrowDownAZ, Sparkles, Feather } from 'lucide-react';

export default function App() {
  // Cart state with localStorage safe check
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('paperland_cart');
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage safe check
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('paperland_wishlist');
        return saved ? JSON.parse(saved) : ['sage-botanical-bullet-journal'];
      }
      return ['sage-botanical-bullet-journal'];
    } catch {
      return ['sage-botanical-bullet-journal'];
    }
  });

  // Discount code state
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('STUDENT15');

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGsm, setSelectedGsm] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modal states
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isGsmGuideOpen, setIsGsmGuideOpen] = useState<boolean>(false);
  const [isAboutProjectOpen, setIsAboutProjectOpen] = useState<boolean>(false);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('paperland_cart', JSON.stringify(cartItems));
      }
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('paperland_wishlist', JSON.stringify(wishlistIds));
      }
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }, [wishlistIds]);

  // Wishlist actions
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const wishlistedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  // Cart actions
  const handleAddToCart = (
    product: Product,
    variant?: ProductVariant,
    layout?: PageLayout,
    quantity = 1
  ) => {
    const chosenVariant = variant || product.variants[0];
    const chosenLayout = layout || product.layouts[0];

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant.id === chosenVariant.id &&
          item.selectedLayout === chosenLayout
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          selectedVariant: chosenVariant,
          selectedLayout: chosenLayout,
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyDiscountCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'STUDENT15' || clean === 'FLINDERS15' || clean === 'GENZ15') {
      setAppliedDiscountCode('STUDENT15');
      return true;
    }
    return false;
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // GSM filter
      if (selectedGsm !== 'all' && p.gsm.toString() !== selectedGsm) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchTagline = p.tagline.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchLayout = p.layouts.some((l) => l.toLowerCase().includes(query));
        if (!matchName && !matchTagline && !matchDesc && !matchLayout) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedGsm, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf7] text-[#252c25]">
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={scrollToSection}
        onOpenPaperLab={() => setIsGsmGuideOpen(true)}
        onOpenAboutProject={() => setIsAboutProjectOpen(true)}
        onOpenMiniGame={() => setIsMiniGameOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div id="home">
          <Hero
            onShopClick={() => scrollToSection('shop')}
            onOpenBleedLab={() => scrollToSection('bleed-lab')}
          />
        </div>

        {/* Featured Collection / Shop Section */}
        <section id="shop" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e9e4d8] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7d6b55]">
                <span>Artisan Australian Stationery</span>
                <span aria-hidden="true">·</span>
                <span>$15 – $19 AUD</span>
              </div>
              <h2 className="font-serif-title text-3xl sm:text-4xl text-[#1e251e] mt-1 font-medium">
                The 2026 Paper Land Collection
              </h2>
              <p className="text-xs sm:text-sm text-[#5f685f] mt-1 max-w-xl">
                Every notebook features 180° lay-flat Smyth-sewn binding and bleed-proof bamboo or cotton paper.
              </p>
            </div>

            {/* Student Discount Tag */}
            <div className="flex items-center gap-2 bg-[#f4eee2] border border-[#e1d8c7] px-3.5 py-2 rounded-lg text-xs text-[#5c4a33]">
              <Sparkles className="w-4 h-4 text-[#8a7258] shrink-0" />
              <span>Use voucher <strong>STUDENT15</strong> for 15% off orders</span>
            </div>
          </div>

          {/* Interactive Filters & Search Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#f8f6f0] p-3.5 rounded-lg border border-[#e8e2d4]">
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'bullet-journal', label: 'Bullet Journals (130gsm)' },
                { id: 'planner', label: 'Weekly Planners' },
                { id: 'sketchbook', label: 'Art Sketchbooks (190gsm)' },
                { id: 'study-notebook', label: 'Cornell Study Notes' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-[#283228] text-white shadow-xs'
                      : 'bg-white text-[#555d54] hover:text-[#202720] border border-[#e0d9cb]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1 md:w-52">
                <Search className="w-3.5 h-3.5 text-[#887f71] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search layouts or pens..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720] focus:ring-1 focus:ring-[#283228]"
                />
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#303830] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg border border-[#e8e2d4] space-y-2">
              <p className="font-serif-title text-lg text-[#202720]">No notebooks match your filters</p>
              <p className="text-xs text-[#6e766c]">Try clearing your search keyword or switching categories.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedGsm('all');
                  setSearchQuery('');
                }}
                className="mt-2 text-xs text-[#334433] underline underline-offset-2 font-medium cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenProduct={setActiveProduct}
                  onQuickAdd={(p) => handleAddToCart(p)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </section>

        {/* Section: Pen & Bleed Lab Simulator */}
        <section id="bleed-lab" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
          <BleedSimulator
            initialGsm={130}
            onSelectProductWithGsm={(gsm) => {
              setSelectedGsm(gsm.toString());
              scrollToSection('shop');
            }}
          />
        </section>

        {/* Section: Inspire Lookbook Spreads */}
        <InspireGallery
          onSelectProductById={(id) => {
            const found = PRODUCTS.find((p) => p.id === id);
            if (found) {
              setActiveProduct(found);
            }
          }}
        />

        {/* Section: Australia Post Shipping & FAQ */}
        <ShippingFaq />
      </main>

      {/* Footer */}
      <Footer
        onOpenPaperLab={() => setIsGsmGuideOpen(true)}
        onOpenAboutProject={() => setIsAboutProjectOpen(true)}
        onOpenMiniGame={() => setIsMiniGameOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Modals & Drawers */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={(p, variant, layout, qty) => {
          handleAddToCart(p, variant, layout, qty);
          setActiveProduct(null);
        }}
        isWishlisted={activeProduct ? wishlistIds.includes(activeProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenBleedLab={() => scrollToSection('bleed-lab')}
        onSelectRelatedProduct={(rel) => setActiveProduct(rel)}
        allProducts={PRODUCTS}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedDiscountCode={appliedDiscountCode}
        onApplyDiscountCode={handleApplyDiscountCode}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscountCode={appliedDiscountCode}
        onClearCart={() => setCartItems([])}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setIsWishlistOpen(false);
        }}
        onOpenProduct={(p) => {
          setActiveProduct(p);
          setIsWishlistOpen(false);
        }}
      />

      <GsmGuideModal
        isOpen={isGsmGuideOpen}
        onClose={() => setIsGsmGuideOpen(false)}
        onOpenBleedSimulator={() => {
          setIsGsmGuideOpen(false);
          scrollToSection('bleed-lab');
        }}
      />

      <AboutProjectModal
        isOpen={isAboutProjectOpen}
        onClose={() => setIsAboutProjectOpen(false)}
      />

      <MiniGame
        isOpen={isMiniGameOpen}
        onClose={() => setIsMiniGameOpen(false)}
        onUnlockDiscount={(code) => {
          setAppliedDiscountCode(code);
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
