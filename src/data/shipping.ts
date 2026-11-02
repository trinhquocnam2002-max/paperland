import { ShippingMethod } from '../types';

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'auspost-standard',
    name: 'Australia Post Regular Parcel',
    carrier: 'Australia Post',
    cost: 7.95,
    estimatedDays: '3–5 Business Days',
    freeThreshold: 50.00,
    description: 'Tracked delivery to all Australian residential and commercial addresses.'
  },
  {
    id: 'auspost-express',
    name: 'Australia Post Express Post',
    carrier: 'Australia Post',
    cost: 12.95,
    estimatedDays: '1–2 Business Days',
    description: 'Guaranteed priority next-business-day delivery within the AusPost Express network.'
  },
  {
    id: 'auspost-locker',
    name: 'AusPost 24/7 Parcel Locker & Collect',
    carrier: 'Australia Post',
    cost: 7.95,
    estimatedDays: '2–4 Business Days',
    freeThreshold: 50.00,
    description: 'Pick up 24/7 at your nearest Australia Post Community Parcel Locker.'
  }
];

export interface PostcodeLookupResult {
  postcode: string;
  suburb: string;
  state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
  zone: 'Metro East' | 'Metro South' | 'Metro West' | 'Regional' | 'Remote';
  standardEstimate: string;
  expressEstimate: string;
}

export const POSTCODE_DIRECTORY: Record<string, PostcodeLookupResult> = {
  '2000': { postcode: '2000', suburb: 'Sydney CBD', state: 'NSW', zone: 'Metro East', standardEstimate: '2–3 business days', expressEstimate: 'Next business day' },
  '2010': { postcode: '2010', suburb: 'Surry Hills', state: 'NSW', zone: 'Metro East', standardEstimate: '2–3 business days', expressEstimate: 'Next business day' },
  '3000': { postcode: '3000', suburb: 'Melbourne CBD', state: 'VIC', zone: 'Metro South', standardEstimate: '2–3 business days', expressEstimate: 'Next business day' },
  '3052': { postcode: '3052', suburb: 'Parkville (Uni of Melbourne)', state: 'VIC', zone: 'Metro South', standardEstimate: '2–3 business days', expressEstimate: 'Next business day' },
  '4000': { postcode: '4000', suburb: 'Brisbane City', state: 'QLD', zone: 'Metro East', standardEstimate: '3–4 business days', expressEstimate: 'Next business day' },
  '5000': { postcode: '5000', suburb: 'Adelaide CBD', state: 'SA', zone: 'Metro South', standardEstimate: '2–3 business days', expressEstimate: 'Next business day' },
  '5042': { postcode: '5042', suburb: 'Bedford Park (Flinders University)', state: 'SA', zone: 'Metro South', standardEstimate: '2–3 business days', expressEstimate: 'Next business day' },
  '6000': { postcode: '6000', suburb: 'Perth CBD', state: 'WA', zone: 'Metro West', standardEstimate: '4–6 business days', expressEstimate: '1–2 business days' },
  '7000': { postcode: '7000', suburb: 'Hobart', state: 'TAS', zone: 'Regional', standardEstimate: '3–5 business days', expressEstimate: '1–2 business days' },
  '2600': { postcode: '2600', suburb: 'Canberra', state: 'ACT', zone: 'Metro East', standardEstimate: '2–3 business days', expressEstimate: 'Next business day' },
  '0800': { postcode: '0800', suburb: 'Darwin', state: 'NT', zone: 'Remote', standardEstimate: '5–8 business days', expressEstimate: '2–3 business days' },
  '2350': { postcode: '2350', suburb: 'Armidale Regional', state: 'NSW', zone: 'Regional', standardEstimate: '4–6 business days', expressEstimate: '2 business days' }
};

export function lookupPostcodeEstimate(postcode: string): PostcodeLookupResult {
  const clean = postcode.trim();
  if (POSTCODE_DIRECTORY[clean]) {
    return POSTCODE_DIRECTORY[clean];
  }

  // Fallback heuristics based on Australia Post prefix ranges
  const firstDigit = clean.charAt(0);
  let state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT' = 'NSW';
  let zone: PostcodeLookupResult['zone'] = 'Metro East';
  let standard = '3–5 business days';
  let express = '1–2 business days';

  if (firstDigit === '2') {
    state = clean.startsWith('26') || clean.startsWith('29') ? 'ACT' : 'NSW';
  } else if (firstDigit === '3') {
    state = 'VIC';
  } else if (firstDigit === '4') {
    state = 'QLD';
    standard = '3–5 business days';
  } else if (firstDigit === '5') {
    state = 'SA';
    standard = '3–4 business days';
  } else if (firstDigit === '6') {
    state = 'WA';
    zone = 'Metro West';
    standard = '4–6 business days';
    express = '1–2 business days';
  } else if (firstDigit === '7') {
    state = 'TAS';
    standard = '3–5 business days';
  } else if (firstDigit === '0') {
    state = 'NT';
    zone = 'Remote';
    standard = '5–8 business days';
    express = '2–3 business days';
  }

  return {
    postcode: clean || '2000',
    suburb: `Metro / Regional ${state}`,
    state,
    zone,
    standardEstimate: standard,
    expressEstimate: express
  };
}
