"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPICE_GALLERY_ITEMS, SpiceGalleryItem } from "@/data/spiceGallery";
import { Maximize2, X, Sparkles } from "lucide-react";

export const SpiceGallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<SpiceGalleryItem | null>(null);

  const categories = [
    "All",
    "Whole Spices",
    "Spice Warehouses",
    "Packaging",
    "Sorting Process",
    "Drying Process",
    "Bulk Storage"
  ];

  const filteredItems = activeCategory === "All"
    ? SPICE_GALLERY_ITEMS
    : SPICE_GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="spice-gallery" className="py-24 bg-[#172925] text-[#D0D9D8] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#769489] bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/[0.1]"
          >
            <Sparkles className="w-4 h-4 text-[#769489]" />
            <span>Infrastructure & Processing Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#D0D9D8]"
          >
            Spice Processing <span className="gold-gradient-text">& Facility Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#98B4A1]"
          >
            Take a visual tour of our spice warehouses, machine sorting lines, solar drying beds, and bulk packaging operations.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#769489] text-[#172925] font-bold shadow-lg scale-105"
                  : "bg-[#213833] text-[#D0D9D8] hover:bg-[#769489]/30 border border-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative h-64 rounded-2xl overflow-hidden isolate transform-gpu cursor-pointer shadow-lg border border-white/10 bg-[#213833]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:brightness-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#172925]/95 via-[#172925]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 right-3 p-2 rounded-full bg-[#172925]/80 text-[#D0D9D8] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-[#D0D9D8]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#769489] block mb-1">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold font-serif leading-snug group-hover:text-[#769489] transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#172925] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-[#D0D9D8] hover:bg-black/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="w-full max-h-[70vh] object-cover"
              />

              <div className="p-6 bg-[#172925] text-[#D0D9D8] space-y-2">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#213833] text-[#769489] border border-white/10">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-xl font-bold font-serif text-[#D0D9D8]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-[#98B4A1] leading-relaxed">
                  {activeLightboxItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
