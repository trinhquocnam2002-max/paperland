import React, { useState } from 'react';
import { Truck, MapPin, ChevronDown, ChevronUp, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { POSTCODE_DIRECTORY, lookupPostcodeEstimate } from '../data/shipping';

export const ShippingFaq: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [testPostcode, setTestPostcode] = useState('2000');
  const [result, setResult] = useState(lookupPostcodeEstimate('2000'));

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(lookupPostcodeEstimate(testPostcode));
  };

  const faqs = [
    {
      q: 'How fast does Australia Post deliver?',
      a: 'Orders placed before 2:00 PM AEST on business days dispatch same-day from our Melbourne and Sydney distribution centers. Australia Post Regular takes 2–4 business days to metro hubs (Sydney, Melbourne, Brisbane, Adelaide) and 4–6 days to regional WA/NT/TAS. Australia Post Express guarantees next-business-day delivery within the AusPost Express network.'
    },
    {
      q: 'Is shipping really free over $50 AUD?',
      a: 'Yes! Any order containing $50 AUD or more qualifies automatically for Free Australia Post Tracked Regular Shipping. You will also receive an SMS and email notification with your tracking link.'
    },
    {
      q: 'Can I pay in 4 installments with Afterpay or Klarna?',
      a: 'Absolutely. Paper Land natively supports Afterpay and Klarna for Australian shoppers. A $18.50 AUD notebook can be split into 4 fortnightly payments of just $4.62 AUD with zero interest and instant checkout approval.'
    },
    {
      q: 'What is the 30-Day Zero-Bleed Guarantee?',
      a: 'We understand the frustration of buying a journal only to find your favourite pens bleed through the back. If any of our 130gsm or 190gsm paper bleeds through when using standard gel pens, fountain pens, or water-based brush markers, contact us within 30 days for a free replacement or 100% refund.'
    },
    {
      q: 'How does the 15% Student Discount work?',
      a: 'Students across all Australian universities (Flinders, University of Melbourne, USYD, Monash, UNSW, UQ, etc.) can enter code "STUDENT15" at checkout or play our daily Stationery Trivia game to unlock 15% off their entire cart.'
    }
  ];

  return (
    <section id="shipping-faq" className="py-12 sm:py-16 bg-[#f7f5ee] border-b border-[#e5dfd2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Live Postcode Calculator */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#ded8cb] shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#79664f]">
                <Truck className="w-4 h-4" />
                <span>Australia Post Transit Estimator</span>
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#1e251e] mt-1">
                Check delivery times to your postcode
              </h3>
              <p className="text-xs text-[#5d655c] mt-1">
                Enter your Australian postcode (e.g. 5042 Flinders, 2000 Sydney, 3000 Melbourne) to view real transit windows.
              </p>
            </div>

            <form onSubmit={handleLookup} className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-[#8a7f6f] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={testPostcode}
                  onChange={(e) => setTestPostcode(e.target.value)}
                  placeholder="Postcode (e.g. 5042)"
                  maxLength={4}
                  className="w-full pl-9 pr-3 py-2 bg-[#faf8f4] border border-[#cfc6b5] rounded text-xs text-[#202720] focus:ring-1 focus:ring-[#283228]"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-[#283228] hover:bg-[#1a211a] text-white text-xs font-medium rounded transition-colors cursor-pointer"
              >
                Estimate
              </button>
            </form>

            {/* Results box */}
            <div className="p-4 bg-[#f8f6f0] rounded-lg border border-[#e2dccf] space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#e9e3d5]">
                <span className="font-semibold text-[#202820]">{result.suburb}</span>
                <span className="text-[11px] text-[#716450] font-mono">{result.state} {result.postcode}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#5b635a]">AusPost Regular ($7.95 AUD):</span>
                  <span className="font-semibold text-[#222922]">{result.standardEstimate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5b635a]">AusPost Express ($12.95 AUD):</span>
                  <span className="font-semibold text-[#222922]">{result.expressEstimate}</span>
                </div>
                <div className="text-[11px] text-emerald-800 font-medium pt-1 border-t border-[#e9e3d5]">
                  • Free standard delivery on orders over $50 AUD
                </div>
              </div>
            </div>

            {/* Quick cities helper chips */}
            <div className="text-xs space-y-1.5">
              <span className="text-[11px] text-[#7d857c]">Quick select popular student postcodes:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Adelaide / Flinders (5042)', code: '5042' },
                  { name: 'Sydney CBD (2000)', code: '2000' },
                  { name: 'Melbourne (3000)', code: '3000' },
                  { name: 'Brisbane (4000)', code: '4000' },
                  { name: 'Perth (6000)', code: '6000' }
                ].map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setTestPostcode(c.code);
                      setResult(lookupPostcodeEstimate(c.code));
                    }}
                    className="text-[10px] py-1 px-2 bg-[#f0ecdf] hover:bg-[#e4decb] text-[#2c332c] rounded transition-colors cursor-pointer"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#79664f]">
                Australian Customer Care
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-[#1e251e] mt-1">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-[#ded8cb] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-[#202720] hover:text-[#384838] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#7b857a] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#7b857a] shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#525a51] leading-relaxed border-t border-[#f2ede3]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
