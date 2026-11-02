import React, { useState } from 'react';
import { X, Star, Heart, Check, Truck, ShieldCheck, Feather, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Product, ProductVariant, PageLayout, PaperGsm } from '../types';
import { lookupPostcodeEstimate } from '../data/shipping';
import { REVIEWS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, layout: PageLayout, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onOpenBleedLab: () => void;
  onSelectRelatedProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenBleedLab,
  onSelectRelatedProduct,
  allProducts
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedLayout, setSelectedLayout] = useState<PageLayout>(product.layouts[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [postcode, setPostcode] = useState<string>('5000'); // Default Adelaide
  const [postcodeResult, setPostcodeResult] = useState(lookupPostcodeEstimate('5000'));
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'reviews'>('specs');

  const afterpayInstallment = (product.price / 4).toFixed(2);

  const handlePostcodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setPostcodeResult(lookupPostcodeEstimate(postcode));
  };

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, selectedLayout, quantity);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#fcfbf8] rounded-xl shadow-2xl border border-[#ded8cb] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Close Bar */}
        <div className="sticky top-0 z-10 bg-[#fcfbf8]/95 backdrop-blur-sm border-b border-[#eae4d8] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#7d7162]">
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[#202720]">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#eee8dc] text-[#555d54] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Gallery & Paper Textures */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#ded8cb] bg-[#f4eee4]">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Tag */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 text-xs rounded-sm">
                  <span>{product.gsm}gsm Bleed-Proof</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-16 h-16 rounded border overflow-hidden transition-all cursor-pointer ${
                    activeImage === product.image ? 'border-[#283228] ring-2 ring-[#283228]/20' : 'border-[#dcd4c3] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>

                {product.secondaryImage && (
                  <button
                    onClick={() => setActiveImage(product.secondaryImage!)}
                    className={`w-16 h-16 rounded border overflow-hidden transition-all cursor-pointer ${
                      activeImage === product.secondaryImage ? 'border-[#283228] ring-2 ring-[#283228]/20' : 'border-[#dcd4c3] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                  </button>
                )}

                {/* Interactive Paper Lab Teaser Box */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenBleedLab();
                  }}
                  className="flex-1 p-2.5 bg-[#f0ebd9] hover:bg-[#e6dfcb] border border-[#d6ccb8] rounded text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-semibold text-[#323932] flex items-center gap-1">
                      <Feather className="w-3.5 h-3.5 text-[#735e47]" />
                      <span>Test Pen Bleed Lab</span>
                    </div>
                    <div className="text-[10px] text-[#6d756c]">
                      Compare fountain pens on {product.gsm}gsm
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#546054]" />
                </button>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#7a6f60]">
                    <span className="font-semibold">{product.binding}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.pageCount} Pages</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="font-bold text-[#232a23]">{product.rating}</span>
                    <span className="text-[#7c857b]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif-title text-2xl sm:text-3xl font-medium text-[#1c221c] mt-1.5">
                  {product.name}
                </h1>

                <p className="text-xs text-[#5e665d] mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & BNPL Callout */}
              <div className="p-3.5 bg-[#f5f1e8] rounded-md border border-[#e2dcce] space-y-1.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-bold font-mono tabular-nums text-[#1d241d]">
                    ${product.price.toFixed(2)} AUD
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-[#8b8274] font-mono tabular-nums">
                      ${product.originalPrice.toFixed(2)} AUD
                    </span>
                  )}
                  <span className="text-xs text-emerald-800 font-medium ml-auto">
                    In Stock in Australia
                  </span>
                </div>

                {/* Afterpay / Klarna breakdown */}
                <div className="text-xs text-[#4b544b] flex flex-wrap items-center gap-1.5">
                  <span>Or 4 payments of</span>
                  <strong className="font-mono text-[#1f261f]">${afterpayInstallment} AUD</strong>
                  <span>with Afterpay, Klarna or Zip.</span>
                </div>
              </div>

              {/* Option 1: Cover Color Swatches */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#303830] mb-2">
                  <span>Cover Palette: {selectedVariant.colorName}</span>
                  <span className="text-[11px] font-normal text-[#6f776e]">Linen & Bookcloth</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative p-1 rounded-full transition-all cursor-pointer ${
                        selectedVariant.id === variant.id ? 'ring-2 ring-[#283228] ring-offset-2' : 'hover:scale-105'
                      }`}
                      title={variant.name}
                    >
                      <span
                        className="w-7 h-7 rounded-full block border border-black/15 shadow-2xs"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Page Layout Ruling */}
              <div>
                <div className="text-xs font-semibold text-[#303830] mb-2">
                  Page Layout Format
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.layouts.map((layout) => (
                    <button
                      key={layout}
                      onClick={() => setSelectedLayout(layout)}
                      className={`px-3 py-2 rounded text-xs text-left transition-all border cursor-pointer ${
                        selectedLayout === layout
                          ? 'bg-[#283228] text-white border-[#283228]'
                          : 'bg-white text-[#384038] border-[#ded8cb] hover:border-[#b0a797]'
                      }`}
                    >
                      <div className="font-medium capitalize">{layout.replace('-', ' ')}</div>
                      <div className={`text-[10px] mt-0.5 ${selectedLayout === layout ? 'text-[#d8cfbe]' : 'text-[#7d847c]'}`}>
                        {layout === 'dot-grid' && '5mm spacing with edge guides'}
                        {layout === 'cornell' && 'Lecture cues & summary block'}
                        {layout === 'weekly-undated' && '52 weeks + habit tracker'}
                        {layout === 'blank-art' && 'Clean unruled for wet media'}
                        {layout === 'ruled' && '7mm university standard line'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Bag */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-[#cfc6b4] rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#4d554c] hover:bg-[#f5f1e8] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold font-mono text-[#242b24] min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#4d554c] hover:bg-[#f5f1e8] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-5 bg-[#283228] hover:bg-[#1a211a] text-white font-medium text-sm rounded shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Add to Bag · ${(product.price * quantity).toFixed(2)} AUD</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-[#cfc6b4] bg-white text-[#555d54] hover:bg-[#f6f2e9]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Fast Trust Details */}
              <div className="space-y-1.5 pt-2 text-xs text-[#5f685e]">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#354835]" />
                  <span>Ships same-day from Sydney/Melbourne if ordered before 2pm AEST</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#354835]" />
                  <span>30-Day Happiness Guarantee: If your pens bleed, full refund</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed In-Depth Information: Specs / AusPost Delivery / Customer Reviews */}
          <div className="border-t border-[#e6e0d3] pt-6 space-y-5">
            {/* Tab navigation */}
            <div className="flex items-center gap-2 border-b border-[#e6e0d3] pb-2 text-xs font-medium">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 px-3 transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#283228] text-[#283228] font-bold'
                    : 'text-[#6d756c] hover:text-[#252c25]'
                }`}
              >
                Paper Specs & Binding
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 px-3 transition-colors cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'border-b-2 border-[#283228] text-[#283228] font-bold'
                    : 'text-[#6d756c] hover:text-[#252c25]'
                }`}
              >
                Australia Post Delivery Calculator
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 px-3 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#283228] text-[#283228] font-bold'
                    : 'text-[#6d756c] hover:text-[#252c25]'
                }`}
              >
                Student & Customer Reviews ({REVIEWS.length})
              </button>
            </div>

            {/* Tab 1: Specs */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded border border-[#e5dfd3] space-y-2">
                  <h4 className="font-semibold text-[#252c25] uppercase tracking-wider text-[11px]">
                    Paper Engineering
                  </h4>
                  <ul className="space-y-1.5 text-[#555d54]">
                    <li>• Weight: {product.gsm}gsm heavyweight milled paper</li>
                    <li>• Composition: {product.paperType}</li>
                    <li>• Bleed tolerance: Zero strike-through with 0.5mm gel & fountain inks</li>
                    <li>• Finish: Satin-smooth micro-tooth prevents feathering</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded border border-[#e5dfd3] space-y-2">
                  <h4 className="font-semibold text-[#252c25] uppercase tracking-wider text-[11px]">
                    Craftsmanship & Binding
                  </h4>
                  <ul className="space-y-1.5 text-[#555d54]">
                    <li>• Spine: {product.binding}</li>
                    <li>• Dimensions: {product.dimensions}</li>
                    <li>• Extras: Expandable back gusset pocket & dual woven bookmarks</li>
                    <li>• Sustainability: Acid-free, FSC certified and soy-based printing</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Australia Post Delivery Calculator */}
            {activeTab === 'shipping' && (
              <div className="p-5 bg-white rounded border border-[#e5dfd3] space-y-4">
                <div>
                  <h4 className="font-serif-title text-base font-semibold text-[#222922]">
                    Estimate Delivery to Your Australian Suburb
                  </h4>
                  <p className="text-xs text-[#626a61] mt-0.5">
                    Real-time Australia Post delivery calculator across Sydney, Melbourne, Brisbane, Adelaide (Flinders), Perth and regional zones.
                  </p>
                </div>

                <form onSubmit={handlePostcodeCheck} className="flex items-center gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-[#8a7f70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="e.g. 5042 or 2000"
                      maxLength={4}
                      className="w-full pl-9 pr-3 py-2 bg-[#faf8f4] border border-[#cfc6b5] rounded text-xs text-[#202720] focus:outline-none focus:ring-1 focus:ring-[#283228]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#283228] hover:bg-[#1b221b] text-white text-xs font-medium rounded transition-colors cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {/* Estimate result */}
                <div className="p-3.5 bg-[#f6f3eb] rounded border border-[#ded7c8] text-xs space-y-2">
                  <div className="flex items-center justify-between font-semibold text-[#283228]">
                    <span>Destination: {postcodeResult.suburb} ({postcodeResult.state} {postcodeResult.postcode})</span>
                    <span className="text-[11px] text-[#716654]">{postcodeResult.zone}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-2.5 rounded border border-[#e5decb]">
                      <div className="font-medium text-[#252c25]">AusPost Regular ($7.95 AUD)</div>
                      <div className="text-[11px] text-[#636c62] mt-0.5">
                        Estimated arrival: <strong>{postcodeResult.standardEstimate}</strong>
                      </div>
                      <div className="text-[10px] text-emerald-800 mt-1 font-semibold">
                        Free on orders over $50 AUD
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded border border-[#e5decb]">
                      <div className="font-medium text-[#252c25]">AusPost Express ($12.95 AUD)</div>
                      <div className="text-[11px] text-[#636c62] mt-0.5">
                        Estimated arrival: <strong>{postcodeResult.expressEstimate}</strong>
                      </div>
                      <div className="text-[10px] text-[#7b6b55] mt-1">
                        Dispatched with tracking number via SMS/Email
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-3">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="p-4 bg-white rounded border border-[#e6e0d3] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#232b23]">{review.author}</span>
                        {review.verifiedStudent && (
                          <span className="bg-[#eff5ee] text-[#2c522d] text-[10px] px-1.5 py-0.5 rounded font-medium">
                            Verified Student Buyer
                          </span>
                        )}
                        <span className="text-[#848d83] text-[11px]">· {review.city}</span>
                      </div>
                      <span className="text-[#8e978d] text-[11px]">{review.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-500" />
                      ))}
                    </div>

                    <p className="text-[#4e564d] leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* You May Also Like */}
          <div className="border-t border-[#e6e0d3] pt-6 space-y-3">
            <h4 className="font-serif-title text-base font-semibold text-[#242b24]">
              You May Also Like
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelatedProduct(rel)}
                  className="p-3 bg-white rounded border border-[#ded8cb] hover:border-[#b8ad9b] transition-all cursor-pointer flex items-center gap-3"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-14 h-14 rounded object-cover shrink-0 bg-[#eee8dc]"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-xs text-[#202720] truncate">
                      {rel.name}
                    </div>
                    <div className="text-[11px] text-[#747d73]">
                      {rel.gsm}gsm · ${rel.price.toFixed(2)} AUD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
