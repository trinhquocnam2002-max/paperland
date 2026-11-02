import React, { useState } from 'react';
import { Truck, ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenPaperLab: () => void;
  onOpenAboutProject: () => void;
  onOpenMiniGame: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPaperLab,
  onOpenAboutProject,
  onOpenMiniGame,
  onNavigate
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1f261f] text-[#d6d0c4] border-t border-[#313c31]">
      {/* Upper Footer: Value Props */}
      <div className="border-b border-[#2d372d] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#9ab09a] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white text-sm">Australia Post Dispatch</div>
              <p className="text-[#a4aba2] mt-1 leading-relaxed">
                Regular ($7.95 AUD) or Express ($12.95 AUD) with live SMS and tracking updates from Sydney & Melbourne hubs. Free on orders over $50 AUD.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#9ab09a] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white text-sm">30-Day Zero-Bleed Guarantee</div>
              <p className="text-[#a4aba2] mt-1 leading-relaxed">
                If your favourite fountain pens or brush markers bleed through our 130gsm pages, return your journal for a prompt full refund.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#9ab09a] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white text-sm">15% Student Discount</div>
              <p className="text-[#a4aba2] mt-1 leading-relaxed">
                Available to all Australian university, TAFE, and high school students. Instant verification with code <span className="text-white font-mono font-bold">STUDENT15</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-serif-title text-2xl font-bold text-white tracking-tight">
              Paper Land
            </span>
            <p className="text-xs text-[#9fa79d] leading-relaxed max-w-sm">
              Artisan notebooks, bullet journals, undated planners, and sketchbooks for Australian students and creators. Filling the $15–$19 AUD sweet spot with 130gsm bleed-proof paper.
            </p>
            <div className="pt-2 text-[11px] text-[#7d867c]">
              Flinders University MBA Innovation Concept · Adelaide & Melbourne
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-2.5 text-xs">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Collection
            </div>
            <ul className="space-y-1.5 text-[#aeb6ac]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  All Notebooks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  130gsm Bullet Journals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Undated Weekly Planners
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  190gsm Art Sketchbooks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Cornell Study Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Guides & Tools */}
          <div className="md:col-span-3 space-y-2.5 text-xs">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              The Paper Lab
            </div>
            <ul className="space-y-1.5 text-[#aeb6ac]">
              <li>
                <button onClick={onOpenPaperLab} className="hover:text-white transition-colors cursor-pointer">
                  Paper GSM Guide (100 vs 130 vs 190)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bleed-lab')} className="hover:text-white transition-colors cursor-pointer">
                  Pen Bleed Simulator
                </button>
              </li>
              <li>
                <button onClick={onOpenMiniGame} className="hover:text-white transition-colors cursor-pointer text-[#d8c7a6]">
                  Daily Stationery Quiz (Unlock 15%)
                </button>
              </li>
              <li>
                <button onClick={onOpenAboutProject} className="hover:text-white transition-colors cursor-pointer">
                  Flinders MBA Planning Report
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping-faq')} className="hover:text-white transition-colors cursor-pointer">
                  Australia Post Shipping Times
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Studio Journal & New Drops
            </div>
            <p className="text-[#a1aba0] text-[11px] leading-relaxed">
              Get first access to limited-run seasonal covers and Australian study tips.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@uni.edu.au"
                    className="w-full py-2 pl-3 pr-8 bg-[#2b352b] border border-[#3e4c3e] rounded text-xs text-white placeholder-[#7d867c] focus:outline-none focus:ring-1 focus:ring-[#9ab09a]"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#c6baa8] hover:text-white cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-1.5 p-2 bg-[#2a382a] border border-[#3f573f] text-emerald-300 rounded text-[11px]">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Welcome! Use code STUDENT15 at checkout.</span>
              </div>
            )}

            <div className="pt-2 text-[10px] text-[#717b70]">
              Secure payments: Afterpay · Klarna · Visa · Mastercard · Apple Pay
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-[#2d372d] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7a8378]">
          <div>
            © 2026 Paper Land Australia. All prices in AUD including GST.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Returns & Delivery</span>
            <span>Australia Post Tracked</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
