import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Coffee, Feather } from 'lucide-react';
import { Product } from '../types';
import celestialImg from '../assets/images/product_celestial_planner_1793611900209.jpg';
import sageImg from '../assets/images/product_botanical_dotgrid_1793611899518.jpg';
import terracottaImg from '../assets/images/product_terracotta_sketchbook_1793611900588.jpg';
import cornellImg from '../assets/images/product_cornell_study_notes_1793611900633.jpg';

interface InspireItem {
  id: string;
  title: string;
  creator: string;
  location: string;
  notebookUsed: string;
  productId: string;
  image: string;
  description: string;
  tag: string;
}

const INSIRE_ITEMS: InspireItem[] = [
  {
    id: 'insp-1',
    title: 'Minimalist Weekly Time-Blocking & Habit Spreads',
    creator: 'Elena V.',
    location: 'Melbourne CBD',
    notebookUsed: 'Midnight Celestial Weekly Planner (130gsm)',
    productId: 'celestial-undated-weekly-planner',
    image: celestialImg,
    description: 'Structure busy corporate days with high-contrast copper headings and time blocks from 7am to 8pm. Zero ink shadow on flip.',
    tag: 'Work & Planning'
  },
  {
    id: 'insp-2',
    title: 'Botanical Leaf Study & Golden Hour Calligraphy',
    creator: 'Sarah K.',
    location: 'Paddington, Sydney',
    notebookUsed: 'Sage Botanical Hardcover (130gsm)',
    productId: 'sage-botanical-bullet-journal',
    image: sageImg,
    description: 'Combining Sakura Micron 0.3mm fine liners with green Mildliner washes. 180° lay-flat spine stays flat without clamps.',
    tag: 'Bullet Journal'
  },
  {
    id: 'insp-3',
    title: 'Terracotta Earth Pigments & Raw Watercolor Wash',
    creator: 'Marcus L.',
    location: 'Brisbane South Bank',
    notebookUsed: 'Terracotta Square Art Sketchbook (190gsm)',
    productId: 'terracotta-mixed-media-sketchbook',
    image: terracottaImg,
    description: 'Testing wet-on-wet watercolor washes. The heavy 190gsm cotton sheet holds moisture without buckling.',
    tag: 'Mixed Media Art'
  },
  {
    id: 'insp-4',
    title: 'University Lecture Cornell Revision System',
    creator: 'Nam T.',
    location: 'Adelaide (Flinders Uni)',
    notebookUsed: 'Lilac Mist Cornell Academic Notebook (100gsm)',
    productId: 'cornell-academic-study-notebook',
    image: cornellImg,
    description: 'Synthesizing MBA Business Analytics lecture notes into cue margins, lecture summaries, and key formula blocks.',
    tag: 'Study & Uni'
  }
];

interface InspireGalleryProps {
  onSelectProductById: (productId: string) => void;
}

export const InspireGallery: React.FC<InspireGalleryProps> = ({ onSelectProductById }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const tags = ['All', 'Bullet Journal', 'Work & Planning', 'Mixed Media Art', 'Study & Uni'];

  const filtered = selectedTag === 'All'
    ? INSIRE_ITEMS
    : INSIRE_ITEMS.filter((item) => item.tag === selectedTag);

  return (
    <section id="inspire" className="py-12 sm:py-16 bg-[#fbfaf7] border-b border-[#e8e2d4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#796853]">
              <span>Pillar 1: Inspire</span>
              <span aria-hidden="true">·</span>
              <span>The Journaling Lookbook</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl text-[#1e251e] mt-1">
              Spreads crafted by Australian students & creatives
            </h2>
            <p className="text-xs sm:text-sm text-[#5d655c] mt-1 max-w-xl">
              Real layouts created in Paper Land notebooks—from Flinders lecture halls to design studios in Melbourne.
            </p>
          </div>

          {/* Tag filter buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#ede8dc] rounded-lg">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-white text-[#202720] shadow-xs'
                    : 'text-[#646e63] hover:text-[#202720]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-[#e5dfd3] overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#eee7db]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-medium bg-black/60 text-white px-2 py-0.5 rounded-sm backdrop-blur-xs">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="text-[11px] text-[#786b59]">
                    By {item.creator} · {item.location}
                  </div>
                  <h3 className="font-serif-title text-sm font-semibold text-[#1e251e] line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#5e665d] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f0ebd9]">
                  <button
                    onClick={() => onSelectProductById(item.productId)}
                    className="w-full text-left flex items-center justify-between text-xs font-medium text-[#2d372d] hover:text-[#111] transition-colors cursor-pointer group-hover:underline underline-offset-2"
                  >
                    <span className="truncate pr-2">{item.notebookUsed}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
