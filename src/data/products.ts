import { Product } from '../types';
import heroImg from '../assets/images/hero_aesthetic_stationery_1793611898673.jpg';
import sageImg from '../assets/images/product_botanical_dotgrid_1793611899518.jpg';
import celestialImg from '../assets/images/product_celestial_planner_1793611900209.jpg';
import terracottaImg from '../assets/images/product_terracotta_sketchbook_1793611900588.jpg';
import cornellImg from '../assets/images/product_cornell_study_notes_1793611900633.jpg';

export const HERO_IMAGE = heroImg;

export const PRODUCTS: Product[] = [
  {
    id: 'sage-botanical-bullet-journal',
    name: 'Sage Botanical Hardcover Bullet Journal',
    tagline: '130gsm bleed-proof bamboo paper with debossed gold foil illustration',
    price: 18.50,
    originalPrice: 24.00,
    category: 'bullet-journal',
    gsm: 130,
    paperType: 'FSC-Certified Cream Bamboo Blend',
    binding: '180° Flat Smyth-Sewn Hardcover',
    pageCount: 160,
    dimensions: 'A5 (148 × 210 mm)',
    image: sageImg,
    secondaryImage: heroImg,
    description: 'Designed in Melbourne and crafted with care, the Sage Botanical journal combines ultra-thick 130gsm bamboo paper that completely resists ghosting from fountain pens, Mildliners, and gel pens. Complete with two satin ribbon markers and an expandable back pocket.',
    features: [
      '130gsm ultra-thick bleed-proof cream paper',
      'True 180° lay-flat binding for effortless two-page spreads',
      '5mm subtle dot grid with margin index guides',
      'Expandable back envelope pocket for tickets & stickers',
      'Dual woven satin bookmarks & elastic band closure'
    ],
    layouts: ['dot-grid', 'ruled'],
    variants: [
      { id: 'v-sage', name: 'Sage Linen', colorName: 'Sage Green', colorHex: '#849884', inStock: true },
      { id: 'v-sand', name: 'Oatmeal Natural', colorName: 'Warm Sand', colorHex: '#c7bca9', inStock: true },
      { id: 'v-terracotta', name: 'Dusk Clay', colorName: 'Terracotta', colorHex: '#b56d56', inStock: true }
    ],
    rating: 4.9,
    reviewCount: 128,
    isBestSeller: true,
    isStudentPick: true
  },
  {
    id: 'celestial-undated-weekly-planner',
    name: 'Midnight Celestial Weekly Planner',
    tagline: 'Undated productivity planner in midnight bookcloth with copper constellations',
    price: 19.00,
    originalPrice: 26.00,
    category: 'planner',
    gsm: 130,
    paperType: 'Heavyweight Bleed-Resistant Vellum',
    binding: 'Gold Foil Stamped Bookcloth Hardcover',
    pageCount: 192,
    dimensions: 'A5 (148 × 210 mm)',
    image: celestialImg,
    secondaryImage: heroImg,
    description: 'Structure your university semesters or work projects on your own schedule. Undated 52-week layout with daily goal blocks, habit trackers, and monthly review spreads wrapped in rich navy buckram bookcloth.',
    features: [
      '52 undated weekly spreads (start any month of the year)',
      '12 monthly habit & wellness tracking grids',
      'Project milestone matrix & assignment due-date logs',
      'Lay-flat spine engineered for tight coffee-shop desks',
      'Pocket for AusPost receipts and loose cards'
    ],
    layouts: ['weekly-undated', 'dot-grid'],
    variants: [
      { id: 'v-indigo', name: 'Midnight Indigo', colorName: 'Deep Navy', colorHex: '#253552', inStock: true },
      { id: 'v-moss', name: 'Forest Velvet', colorName: 'Deep Olive', colorHex: '#3b4e3e', inStock: true },
      { id: 'v-charcoal', name: 'Carbon Black', colorName: 'Matte Charcoal', colorHex: '#262626', inStock: true }
    ],
    rating: 4.8,
    reviewCount: 94,
    isBestSeller: true
  },
  {
    id: 'terracotta-mixed-media-sketchbook',
    name: 'Terracotta Square Art Sketchbook (190gsm)',
    tagline: 'Heavyweight 190gsm cold-pressed cotton paper for watercolor & gouache',
    price: 17.50,
    originalPrice: 22.00,
    category: 'sketchbook',
    gsm: 190,
    paperType: '190gsm Heavy Cotton-Blend Cold Pressed',
    binding: 'Flexible Thread-Bound Raw Cloth',
    pageCount: 120,
    dimensions: 'Square (180 × 180 mm)',
    image: terracottaImg,
    secondaryImage: heroImg,
    description: 'Specially milled for Australian art and architecture students who demand genuine mixed-media versatility without paying $30+. Takes watercolor washes, acrylic gouache, and heavy fountain pen inks without buckling or feathering.',
    features: [
      'Substantial 190gsm weight handles wet watercolor without warping',
      'Charming modern square format (180 × 180 mm)',
      'Tactile raw terracotta woven linen cloth cover',
      'Acid-free archival pages keep art vibrant for decades',
      'Elastic retention band keeps brushes and swatches secure'
    ],
    layouts: ['blank-art'],
    variants: [
      { id: 'v-terra', name: 'Rustic Terracotta', colorName: 'Earthy Rust', colorHex: '#ba583c', inStock: true },
      { id: 'v-raw', name: 'Raw Canvas', colorName: 'Ecru', colorHex: '#d8cfbe', inStock: true }
    ],
    rating: 5.0,
    reviewCount: 82,
    isBestSeller: false,
    isStudentPick: true
  },
  {
    id: 'cornell-academic-study-notebook',
    name: 'Lilac Mist Cornell Academic Notebook',
    tagline: 'Pre-formatted Cornell notes system for high-distinction university study',
    price: 15.00,
    originalPrice: 19.50,
    category: 'study-notebook',
    gsm: 100,
    paperType: 'Smooth Micro-Porous Wood-Free Paper',
    binding: 'Twin-Wire Lay-Flat Coil with Soft-Touch Cover',
    pageCount: 160,
    dimensions: 'B5 (176 × 250 mm)',
    image: cornellImg,
    secondaryImage: heroImg,
    description: 'Designed specifically for Australian university students (Flinders, USYD, Monash, UQ) studying business, science, and law. Pre-printed with the scientifically validated Cornell note-taking cue column and summary footer.',
    features: [
      'Cornell layout: Cue margin (left), Lecture notes (grid center), Summary (footer)',
      'Smooth 100gsm paper tuned for Zebra Sarasa & Muji 0.5mm gel pens',
      'Perforated micro-tear sheets for effortless binder filing',
      'Pastel lavender durable waterproof cover',
      'Includes semester exam revision planner page'
    ],
    layouts: ['cornell', 'ruled'],
    variants: [
      { id: 'v-lilac', name: 'Lavender Mist', colorName: 'Soft Lilac', colorHex: '#c2b0cb', inStock: true },
      { id: 'v-matcha', name: 'Matcha Milk', colorName: 'Pale Mint', colorHex: '#b4cfb0', inStock: true },
      { id: 'v-fog', name: 'Morning Fog', colorName: 'Cool Grey', colorHex: '#b8c0c2', inStock: true }
    ],
    rating: 4.9,
    reviewCount: 147,
    isBestSeller: true,
    isStudentPick: true
  },
  {
    id: 'minimal-oatmeal-bullet-journal',
    name: 'Oatmeal Minimalist 130gsm Dot Grid',
    tagline: 'Pure Japanese-style minimalist aesthetic with unbleached cream pages',
    price: 16.50,
    originalPrice: 22.00,
    category: 'bullet-journal',
    gsm: 130,
    paperType: 'Acid-Free Bamboo Fiber Cream',
    binding: 'Exposed Thread Smyth Binding with Lay-Flat 180°',
    pageCount: 176,
    dimensions: 'A5 (148 × 210 mm)',
    image: sageImg,
    secondaryImage: heroImg,
    description: 'For minimalists who crave a calm, distraction-free space to think. Unprinted raw linen cover with warm off-white pages, numbered leaves, and a 3-page index ready for your personal bullet journaling key.',
    features: [
      'Numbered pages (1 to 176) with pre-printed 3-page table of contents',
      'Key legend and color code reference spread',
      '130gsm feather-resistant paper tested with Pilot Vanishing Point fountain pen',
      'Recycled unbleached cardboard protective slipcase',
      'Ethically made with vegan non-toxic plant adhesives'
    ],
    layouts: ['dot-grid'],
    variants: [
      { id: 'v-oat', name: 'Warm Oatmeal', colorName: 'Raw Linen', colorHex: '#c8bfae', inStock: true },
      { id: 'v-stone', name: 'Washed Stone', colorName: 'Slate Sand', colorHex: '#9e9992', inStock: true }
    ],
    rating: 4.8,
    reviewCount: 63
  },
  {
    id: 'deep-moss-daily-planner',
    name: 'Deep Moss Work & Routine Desk Planner',
    tagline: 'Structured daily productivity companion for junior professionals & grads',
    price: 18.00,
    originalPrice: 25.00,
    category: 'planner',
    gsm: 130,
    paperType: 'Smooth Heavyweight Cream Paper',
    binding: 'Foil Embossed Bookcloth Hardcover',
    pageCount: 180,
    dimensions: 'A5 (148 × 210 mm)',
    image: celestialImg,
    secondaryImage: heroImg,
    description: 'Transform work overwhelm into clear daily rhythm. Designed for junior corporate, tech, and healthcare workers balancing busy calendars, priority tasks, meetings, and hydration goals.',
    features: [
      'Top 3 Daily Non-Negotiable priorities block',
      'Time-blocking schedule grid from 7am to 8pm',
      'Meeting action item checklist & follow-up log',
      'End-of-day gratitude & win prompt',
      'Includes 10 blank project brainstorming dot-grid pages'
    ],
    layouts: ['weekly-undated', 'ruled'],
    variants: [
      { id: 'v-moss', name: 'Forest Moss', colorName: 'Deep Moss', colorHex: '#354839', inStock: true },
      { id: 'v-clay', name: 'Warm Rust', colorName: 'Terracotta', colorHex: '#a85b46', inStock: true }
    ],
    rating: 4.9,
    reviewCount: 47,
    isStudentPick: false
  }
];

export const REVIEWS = [
  {
    id: 'r1',
    author: 'Chloe M.',
    role: 'Flinders University BBA Student',
    city: 'Adelaide, SA',
    rating: 5,
    date: '3 days ago',
    comment: 'Finally a journal that doesn’t bleed when I use Tombow brush pens and Mildliners! Mass store notebooks from Kmart always ghosted through, and Paper Republic was $32 which was out of my student budget. $18.50 with Afterpay was so accessible.',
    verifiedStudent: true
  },
  {
    id: 'r2',
    author: 'Liam T.',
    role: 'Junior UX Designer',
    city: 'Surry Hills, Sydney',
    rating: 5,
    date: '1 week ago',
    comment: 'The 180° lay flat binding actually works! Most planners fight you when you write near the center spine, but the Smyth-sewn spine on the Midnight Celestial sits completely flat on my desk. AusPost express arrived in Sydney in under 24 hours.',
    verifiedStudent: false
  },
  {
    id: 'r3',
    author: 'Hannah W.',
    role: 'Medical Student, Monash',
    city: 'Melbourne, VIC',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Cornell layout notebook changed my revision game. The paper feels silky smooth and my 0.38mm gel pens do not scratch or smudge. Love the 15% student discount as well.',
    verifiedStudent: true
  },
  {
    id: 'r4',
    author: 'Archie D.',
    role: 'Fine Arts Student, QUT',
    city: 'Brisbane, QLD',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The 190gsm sketchbook handles light watercolor washes and ink washes like a dream. Absolutely insane value at under $20 AUD.',
    verifiedStudent: true
  }
];
