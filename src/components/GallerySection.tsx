"use client";

import { useState } from "react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { Maximize2, X } from "lucide-react";

export const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    "All",
    "Farms",
    "Processing",
    "Warehouse",
    "Raw Herbs",
    "Packaging"
  ];

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-28 md:py-36 bg-[#172925] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
            Visual Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8]">
            Infrastructure & Material Showcase
          </h2>
          <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
            Take a visual tour of our central warehousing facilities, optical sorting lines, and bulk packaging operations.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#769489] text-[#172925] font-bold shadow-lg"
                  : "bg-[#213833] text-[#98B4A1] hover:text-[#D0D9D8] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden isolate transform-gpu cursor-pointer bg-[#213833] border border-white/10 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-300 opacity-95 group-hover:opacity-100 group-hover:brightness-110"
              />
              
              {/* Maximize Icon on Hover */}
              <div className="absolute top-4 right-4 p-3 rounded-full bg-[#172925]/80 text-[#D0D9D8] opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#213833] border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/60 text-[#D0D9D8] hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title}
              className="w-full max-h-[75vh] object-contain bg-[#172925]"
            />

            <div className="p-8 bg-[#213833] text-[#D0D9D8] space-y-2">
              <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block">
                {activeLightboxItem.category}
              </span>
              <h3 className="text-2xl font-serif text-[#D0D9D8]">
                {activeLightboxItem.title}
              </h3>
              <p className="text-xs text-[#98B4A1] font-light leading-relaxed">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
