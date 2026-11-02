import React, { useState } from 'react';
import { RotateCw, CheckCircle2, AlertTriangle, XCircle, Info, Sparkles } from 'lucide-react';
import { PaperGsm } from '../types';

interface PenTool {
  id: string;
  name: string;
  brandExample: string;
  inkType: string;
  colorHex: string;
  strokeWidth: number;
  flowRate: 'low' | 'medium' | 'high' | 'solvent';
}

const PENS: PenTool[] = [
  { id: 'gel-pen', name: '0.5mm Gel Pen', brandExample: 'Muji / Zebra Sarasa Clip', inkType: 'Pigment Gel', colorHex: '#1d2228', strokeWidth: 2, flowRate: 'medium' },
  { id: 'fountain-pen', name: 'Fountain Pen (Fine/Med)', brandExample: 'Lamy Safari / Pilot Kakuno', inkType: 'Wet Dye Ink', colorHex: '#183860', strokeWidth: 3, flowRate: 'high' },
  { id: 'mildliner', name: 'Pastel Highlighter', brandExample: 'Zebra Mildliner Mild Gray/Pink', inkType: 'Water-based Pigment', colorHex: '#de9b9b', strokeWidth: 14, flowRate: 'medium' },
  { id: 'brush-pen', name: 'Dual Brush Calligraphy Pen', brandExample: 'Tombow ABT Brush Pen', inkType: 'Water-soluble Dye', colorHex: '#526955', strokeWidth: 8, flowRate: 'high' },
  { id: 'alcohol-marker', name: 'Alcohol Art Marker', brandExample: 'Copic Sketch / Ohuhu', inkType: 'Heavy Alcohol Solvent', colorHex: '#bf573f', strokeWidth: 10, flowRate: 'solvent' }
];

interface BleedSimulatorProps {
  initialGsm?: PaperGsm;
  onSelectProductWithGsm?: (gsm: PaperGsm) => void;
}

export const BleedSimulator: React.FC<BleedSimulatorProps> = ({
  initialGsm = 130,
  onSelectProductWithGsm
}) => {
  const [selectedGsm, setSelectedGsm] = useState<number>(initialGsm);
  const [selectedPen, setSelectedPen] = useState<PenTool>(PENS[1]); // Default Fountain pen
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [testText, setTestText] = useState<string>('Mindful weekly reflection & Flinders study notes.');

  // Calculate paper response based on weight & pen
  const getBleedAssessment = () => {
    if (selectedGsm === 80) {
      if (selectedPen.id === 'gel-pen') {
        return { status: 'warning', ghosting: 'Moderate Ghosting', bleed: 'Occasional pinpoint bleed', rating: '3/10', note: 'Back page becomes hard to read; ink visible on reverse.' };
      }
      return { status: 'fail', ghosting: 'Severe Ghosting (Shadowing)', bleed: 'Noticeable strike-through bleeding', rating: '1/10', note: 'Destroys reverse page. Ruled out for bullet journaling.' };
    }

    if (selectedGsm === 100) {
      if (selectedPen.id === 'alcohol-marker') {
        return { status: 'fail', ghosting: 'Strong shadow', bleed: 'Moderate strike-through', rating: '5/10', note: 'Solvent markers require 190gsm paper.' };
      }
      if (selectedPen.id === 'fountain-pen' || selectedPen.id === 'brush-pen') {
        return { status: 'warning', ghosting: 'Slight ghosting under direct lamp', bleed: 'Zero bleed-through', rating: '8/10', note: 'Usable for lecture notes; fine fountain nibs stay crisp.' };
      }
      return { status: 'pass', ghosting: 'Virtually None', bleed: 'Zero bleed', rating: '9.5/10', note: 'Ideal for student Cornell note-taking & daily gel pens.' };
    }

    if (selectedGsm === 130) {
      if (selectedPen.id === 'alcohol-marker') {
        return { status: 'warning', ghosting: 'Faint shadow', bleed: 'Light bleed on 3+ layers', rating: '7/10', note: '130gsm handles 2 light passes, but 190gsm is recommended for heavy blending.' };
      }
      return { status: 'pass', ghosting: 'None (Clean Opaque)', bleed: 'Zero bleed-through', rating: '10/10', note: 'Certified bleed-proof for wet fountain pens, brush pens, & highlighters.' };
    }

    // 190gsm
    return { status: 'pass', ghosting: 'Impermeable', bleed: 'Zero bleed under any medium', rating: '10/10', note: 'Cold-pressed cotton handles wet watercolor, gouache & alcohol ink.' };
  };

  const assessment = getBleedAssessment();

  // Opacity & blur simulation for the reverse page
  const getReverseOpacity = () => {
    if (selectedGsm === 80) return selectedPen.id === 'gel-pen' ? 0.65 : 0.88;
    if (selectedGsm === 100) return selectedPen.id === 'alcohol-marker' ? 0.6 : 0.22;
    if (selectedGsm === 130) return selectedPen.id === 'alcohol-marker' ? 0.35 : 0.04;
    return 0.0;
  };

  const getReverseBlur = () => {
    if (selectedGsm === 80) return 'blur-[0.5px]';
    if (selectedGsm === 100) return 'blur-[1.2px]';
    return 'blur-[2px]';
  };

  return (
    <div className="bg-[#f7f5ef] border border-[#e2dccf] rounded-lg p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#e5dfd2]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#796752]">
            <span>Interactive Pen & Paper Lab</span>
            <span aria-hidden="true">·</span>
            <span>Ghosting & Bleed Simulator</span>
          </div>
          <h2 className="font-serif-title text-2xl text-[#202720] mt-1">
            See how your favourite pens perform across paper weights
          </h2>
          <p className="text-sm text-[#5f665e] mt-1 max-w-2xl">
            Australian stationery buyers frequently complain about thin 70–80gsm supermarket paper. Toggle pen types and flip the page to inspect ink strike-through.
          </p>
        </div>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-white border border-[#cfc8b8] text-[#2c332c] text-xs font-medium rounded-md hover:bg-[#f3eee4] transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <RotateCw className="w-3.5 h-3.5 text-[#7c6954]" />
          <span>{isFlipped ? 'View Front Side' : 'Flip to Reverse Side'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Paper Weight Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#3b433b] mb-2 uppercase tracking-wide">
              1. Select Paper Thickness (GSM)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { gsm: 80, label: '80 gsm', note: 'Kmart/Typo' },
                { gsm: 100, label: '100 gsm', note: 'Cornell Study' },
                { gsm: 130, label: '130 gsm', note: 'Paper Land Pro' },
                { gsm: 190, label: '190 gsm', note: 'Art Sketchbook' }
              ].map((item) => (
                <button
                  key={item.gsm}
                  onClick={() => setSelectedGsm(item.gsm)}
                  className={`p-2.5 rounded-md text-left transition-all border cursor-pointer ${
                    selectedGsm === item.gsm
                      ? 'bg-[#293229] text-white border-[#293229] shadow-xs'
                      : 'bg-white text-[#384038] border-[#ddd7ca] hover:border-[#aaa18f]'
                  }`}
                >
                  <div className="font-semibold text-xs tabular-nums">{item.label}</div>
                  <div className={`text-[10px] truncate mt-0.5 ${selectedGsm === item.gsm ? 'text-[#e0dacb]' : 'text-[#7d847c]'}`}>
                    {item.note}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pen Medium Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#3b433b] mb-2 uppercase tracking-wide">
              2. Select Pen or Ink Medium
            </label>
            <div className="space-y-1.5">
              {PENS.map((pen) => (
                <button
                  key={pen.id}
                  onClick={() => setSelectedPen(pen)}
                  className={`w-full p-2.5 rounded-md flex items-center justify-between text-left text-xs transition-all border cursor-pointer ${
                    selectedPen.id === pen.id
                      ? 'bg-white border-[#313c31] ring-1 ring-[#313c31] shadow-xs'
                      : 'bg-white/60 border-[#e0dbcd] hover:bg-white text-[#4a524a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: pen.colorHex }}
                    />
                    <div>
                      <div className="font-medium text-[#202620]">{pen.name}</div>
                      <div className="text-[11px] text-[#717a70]">{pen.brandExample}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#867866] bg-[#f0eae0] px-1.5 py-0.5 rounded">
                    {pen.inkType}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Real Assessment Badge */}
          <div className="p-4 rounded-md border bg-white border-[#e0d9cb] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#323932]">Paper Performance</span>
              <span className="text-xs font-mono font-bold text-[#273227]">{assessment.rating}</span>
            </div>

            <div className="flex items-start gap-2.5">
              {assessment.status === 'pass' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              )}
              {assessment.status === 'warning' && (
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              )}
              {assessment.status === 'fail' && (
                <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="text-xs font-medium text-[#252b25]">
                  {assessment.ghosting} · {assessment.bleed}
                </div>
                <div className="text-[11px] text-[#697268] mt-0.5">
                  {assessment.note}
                </div>
              </div>
            </div>

            {selectedGsm >= 130 && onSelectProductWithGsm && (
              <button
                onClick={() => onSelectProductWithGsm(selectedGsm as PaperGsm)}
                className="w-full mt-2 py-1.5 px-3 bg-[#e9e3d5] hover:bg-[#ded6c4] text-[#2e372e] text-xs font-medium rounded transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#735e47]" />
                <span>View Paper Land {selectedGsm}gsm Notebooks</span>
              </button>
            )}
          </div>
        </div>

        {/* Visual Simulated Notebook Leaf Canvas */}
        <div className="lg:col-span-7">
          <div className="relative bg-[#fffdf9] border border-[#d6cfbe] rounded-lg shadow-sm min-h-[380px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Dot Grid / Subtle Paper Texture Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: 'radial-gradient(#93897b 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Top Sheet Tab */}
            <div className="relative flex items-center justify-between text-xs text-[#8c8273] border-b border-[#ece6d9] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-serif-title font-semibold text-[#323932]">
                  {isFlipped ? 'PAGE 02 (REVERSE)' : 'PAGE 01 (FRONT)'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedGsm}gsm Bleed-Resistant Sheet</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#9a8d7a]" />
                <span>Click flip button to inspect reverse</span>
              </div>
            </div>

            {/* Simulated Ink Stroke Render */}
            <div className="relative my-8 space-y-6">
              {!isFlipped ? (
                // FRONT VIEW: Crisp direct stroke
                <div className="space-y-4">
                  <div className="text-xs text-[#877c6e]">Front ink swatch & line test:</div>
                  <div className="p-4 bg-white/70 rounded border border-[#ece7dc] space-y-3">
                    {/* Highlighter swatch under stroke */}
                    <div className="relative">
                      {selectedPen.id === 'mildliner' && (
                        <div
                          className="h-6 rounded-xs opacity-70 mb-2"
                          style={{ backgroundColor: selectedPen.colorHex }}
                        />
                      )}

                      {/* Swatch line */}
                      <div
                        className="h-2.5 rounded-full transition-all"
                        style={{
                          backgroundColor: selectedPen.colorHex,
                          width: selectedPen.strokeWidth > 5 ? '85%' : '65%',
                          height: `${Math.max(selectedPen.strokeWidth, 3)}px`
                        }}
                      />
                    </div>

                    {/* Hand-lettered text simulation */}
                    <p
                      className="font-serif-title text-xl sm:text-2xl tracking-normal text-left"
                      style={{ color: selectedPen.colorHex }}
                    >
                      {testText}
                    </p>

                    <div className="flex items-center gap-2 pt-2 text-[11px] text-[#717b70]">
                      <span className="font-mono tabular-nums">{selectedPen.name}</span>
                      <span>· No feathering on bamboo fibers</span>
                    </div>
                  </div>
                </div>
              ) : (
                // REVERSE VIEW: Shows ghosting or pristine white depending on GSM!
                <div className="space-y-4">
                  <div className="text-xs text-[#877c6e]">
                    Reverse side inspection (Looking through the back):
                  </div>

                  <div className="p-4 bg-white/90 rounded border border-[#e8e2d4] min-h-[140px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {getReverseOpacity() > 0 ? (
                      <div
                        className={`transition-opacity duration-300 ${getReverseBlur()}`}
                        style={{ opacity: getReverseOpacity() }}
                      >
                        <p
                          className="font-serif-title text-xl sm:text-2xl tracking-normal transform scale-x-[-1]"
                          style={{ color: selectedPen.colorHex }}
                        >
                          {testText}
                        </p>
                        <div
                          className="h-2 rounded-full mx-auto mt-2"
                          style={{
                            backgroundColor: selectedPen.colorHex,
                            width: '60%'
                          }}
                        />
                      </div>
                    ) : (
                      <div className="py-6 space-y-1.5">
                        <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                        <div className="font-serif-title text-base font-semibold text-[#253025]">
                          Zero Ghosting Detected
                        </div>
                        <p className="text-xs text-[#636c62] max-w-sm">
                          The back of this {selectedGsm}gsm leaf is completely pristine and ready for your next spread.
                        </p>
                      </div>
                    )}

                    {getReverseOpacity() >= 0.5 && (
                      <div className="absolute bottom-2 left-2 right-2 bg-rose-50 border border-rose-200 text-rose-800 text-[11px] p-2 rounded">
                        Noticeable bleed and ink shadowing ruins the reverse page on standard 80gsm sheets.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Bar: Quick Live Sample Text Modifier */}
            <div className="relative pt-3 border-t border-[#ece6d9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#7d7465]">Try writing your own words:</span>
              <input
                type="text"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                maxLength={60}
                placeholder="Type sample notes..."
                className="w-full sm:w-64 px-3 py-1 bg-white border border-[#cfc8b8] rounded text-xs text-[#2c332c] focus:outline-none focus:ring-1 focus:ring-[#445544]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
