import React from 'react';
import { X, CheckCircle, Feather, Trees, Sparkles, BookOpen } from 'lucide-react';

interface GsmGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBleedSimulator: () => void;
}

export const GsmGuideModal: React.FC<GsmGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenBleedSimulator
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#fcfbf8] rounded-xl shadow-2xl border border-[#ded8cb] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e9e3d6] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-[#735e47]" />
            <h2 className="font-serif-title text-xl font-bold text-[#1f261f]">
              The Paper Lab: Paper Weights & Craftsmanship
            </h2>
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
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1 text-xs text-[#525a51] leading-relaxed">
          {/* Introduction */}
          <div>
            <div className="text-[11px] font-semibold text-[#7c6953] uppercase tracking-wider mb-1">
              Pillar 2: Educate · Paper Engineering
            </div>
            <h3 className="font-serif-title text-2xl text-[#212821] font-medium leading-tight">
              Understanding GSM: Why 130gsm is the Australian Journaling Sweet Spot
            </h3>
            <p className="mt-2 text-[#5a6259] text-sm">
              GSM stands for <em>Grams per Square Metre</em>. In Australia, cheap chain stationery (Kmart, Typo, OfficeWorks value pads) uses 70 to 80gsm wood pulp paper. When wet fountain pen inks or pigment highlighters touch thin paper, capillary action pulls ink into the fibers, causing ghosting and strike-through bleed.
            </p>
          </div>

          {/* GSM Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 100 gsm */}
            <div className="p-4 bg-white rounded-lg border border-[#e2dcce] space-y-2">
              <div className="font-serif-title text-lg font-bold text-[#202720]">100 GSM</div>
              <div className="text-[11px] font-semibold text-[#756551]">Light Academic & Cornell</div>
              <p className="text-[11px] text-[#636c62]">
                Crisp and featherweight. Optimized for ballpoints and 0.5mm gel pens (Muji, Zebra Sarasa). Allows 160+ pages in a slim silhouette without excessive bulk.
              </p>
              <div className="pt-2 border-t border-[#eee9de] text-[10px] text-[#717b70]">
                Featured in: Cornell Academic Notebook ($15 AUD)
              </div>
            </div>

            {/* 130 gsm */}
            <div className="p-4 bg-[#f4efe4] rounded-lg border border-[#2a342a] space-y-2 relative">
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#2a342a] text-white px-2 py-0.5 rounded">
                Signature
              </span>
              <div className="font-serif-title text-lg font-bold text-[#202720]">130 GSM</div>
              <div className="text-[11px] font-semibold text-[#4f644f]">Bleed-Proof Bamboo Blend</div>
              <p className="text-[11px] text-[#555e54]">
                The Goldilocks weight. Opaque enough to completely withstand wet fountain pens, Tombow calligraphy brush pens, and Zebra Mildliners with zero bleed on the back.
              </p>
              <div className="pt-2 border-t border-[#dfd7c7] text-[10px] text-[#5a6359] font-medium">
                Featured in: Sage Botanical & Celestial Planner ($18.50 AUD)
              </div>
            </div>

            {/* 190 gsm */}
            <div className="p-4 bg-white rounded-lg border border-[#e2dcce] space-y-2">
              <div className="font-serif-title text-lg font-bold text-[#202720]">190 GSM</div>
              <div className="text-[11px] font-semibold text-[#756551]">Heavy Mixed Media & Art</div>
              <p className="text-[11px] text-[#636c62]">
                Substantial cold-pressed cotton blend. Handles watercolor washes, wet gouache, acrylic markers, and heavy alcohol ink layering without sheet warping.
              </p>
              <div className="pt-2 border-t border-[#eee9de] text-[10px] text-[#717b70]">
                Featured in: Terracotta Art Sketchbook ($17.50 AUD)
              </div>
            </div>
          </div>

          {/* Lay-Flat 180° Binding */}
          <div className="p-5 bg-white rounded-lg border border-[#ded8cb] space-y-3">
            <h4 className="font-serif-title text-base font-semibold text-[#1e251e]">
              True 180° Smyth-Sewn Lay-Flat Spine
            </h4>
            <p className="text-xs text-[#596158]">
              Standard notebooks use glue-only "perfect binding", which creates an arched spine that fights your palm when writing near the inner gutter. Paper Land notebooks are sewn in signatures with flexible cotton thread, allowing them to open completely flat on any student desk or cafe table.
            </p>
          </div>

          {/* Sustainability & Ethics */}
          <div className="p-5 bg-[#f5f1e8] rounded-lg border border-[#ded8cb] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#2b352b]">
              <Trees className="w-4 h-4 text-[#374937]" />
              <span>Ethical Materials & Australian Carbon-Neutral Delivery</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-[#586057]">
              <li>• 100% FSC-Certified paper sourced from sustainably managed plantations</li>
              <li>• Non-toxic soy and vegetable-based inks for all rulings</li>
              <li>• Vegan bookcloth covers and animal-friendly binding adhesives</li>
              <li>• Shipped via Australia Post carbon-neutral delivery parcels</li>
            </ul>
          </div>

          {/* CTA to Bleed Simulator */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenBleedSimulator();
              }}
              className="py-3 px-6 bg-[#283228] hover:bg-[#1a211a] text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
            >
              Launch Live Pen Bleed Simulator
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
