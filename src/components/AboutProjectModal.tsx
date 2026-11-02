import React from 'react';
import { X, GraduationCap, BarChart3, Target, BookMarked, CheckCircle2 } from 'lucide-react';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutProjectModal: React.FC<AboutProjectModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#fcfbf8] rounded-xl shadow-2xl border border-[#ded8cb] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e9e3d6] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-[#6c5943]" />
            <div>
              <h2 className="font-serif-title text-lg font-bold text-[#1f261f]">
                Flinders University MBA · Digital Marketing Project
              </h2>
              <div className="text-[11px] text-[#717b70]">
                BUSN9155 Digital Marketing & Analytics · Student ID: 2348348 (Nam Quoc Trinh)
              </div>
            </div>
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
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 text-xs text-[#4f564d] leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 bg-[#f6f2e8] rounded-lg border border-[#ded8cb] space-y-2">
            <div className="font-semibold text-xs text-[#2b352b] uppercase tracking-wider">
              Project Concept & Market Opportunity
            </div>
            <p className="text-[#3c443b]">
              <strong>Paper Land</strong> is a creative stationery brand concept developed for the Australian market. Australian retail is polarized between cheap supermarket notebooks (Kmart, Typo &lt;$5) with thin paper that bleeds through, and high-end boutique journals (Paper Republic, Leuchtturm1917) priced at $25–$33+ AUD. Paper Land captures the identified <strong>$15–$19 AUD sweet-spot</strong> with 130–190gsm artist-designed paper.
            </p>
          </div>

          {/* Persona & Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-[#e2dcce] space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-[#202720]">
                <Target className="w-4 h-4 text-[#735e47]" />
                <span>Target Persona: The Aesthetic Journaler</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#555e54]">
                <li>• <strong>Demographics:</strong> 18–24 years old, Uni student / Junior professional</li>
                <li>• <strong>Geography:</strong> Sydney, Melbourne, Brisbane, Adelaide (Flinders)</li>
                <li>• <strong>Income:</strong> est. $2,000–$4,300/month after tax (ABS median)</li>
                <li>• <strong>Willingness to Pay:</strong> $15–$20 AUD per notebook</li>
                <li>• <strong>Behavior:</strong> 37.1% Gen Z use Buy Now Pay Later (Afterpay/Klarna)</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border border-[#e2dcce] space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-[#202720]">
                <BarChart3 className="w-4 h-4 text-[#735e47]" />
                <span>Three Strategic Content Pillars</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#555e54]">
                <li>• <strong>Pillar 1: Inspire</strong> – High-aesthetic product photography and study spreads.</li>
                <li>• <strong>Pillar 2: Educate</strong> – Interactive GSM guide & pen bleed simulator.</li>
                <li>• <strong>Pillar 3: Participate</strong> – Gamified trivia quizzes & discount unlocks to build loyalty.</li>
              </ul>
            </div>
          </div>

          {/* Search Strategy & Keywords */}
          <div className="p-4 bg-white rounded-lg border border-[#e2dcce] space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-[#202720]">
              <BookMarked className="w-4 h-4 text-[#735e47]" />
              <span>Target SEO Keywords (Australian Intent)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 bg-[#f8f6f0] rounded border border-[#ece6d9]">
                <div className="font-semibold text-[#252c25]">Navigational</div>
                <div>• Paper Land notebooks</div>
                <div>• Paper Land planner</div>
                <div>• Paper Land Australia</div>
              </div>
              <div className="p-2 bg-[#f8f6f0] rounded border border-[#ece6d9]">
                <div className="font-semibold text-[#252c25]">Transactional</div>
                <div>• bullet journal Australia</div>
                <div>• dot grid notebook A5</div>
                <div>• aesthetic weekly planner</div>
              </div>
              <div className="p-2 bg-[#f8f6f0] rounded border border-[#ece6d9]">
                <div className="font-semibold text-[#252c25]">Commercial (Student)</div>
                <div>• cute notebooks for uni students</div>
                <div>• cheap aesthetic stationery AU</div>
                <div>• work planner for grads</div>
              </div>
            </div>
          </div>

          {/* Academic Verification Note */}
          <div className="flex items-start gap-2.5 p-3.5 bg-[#f0ebd9] rounded-lg border border-[#ded4c0] text-[11px] text-[#544a3e]">
            <CheckCircle2 className="w-4 h-4 text-[#354835] shrink-0 mt-0.5" />
            <div>
              <strong>Academic Rigor Note:</strong> Developed for Flinders University College of Business, Government and Law (MBA Business Analytics). Market research references ABS median earnings, IBISWorld stationery industry statistics (+8.9% growth), and Canstar pricing audits.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
