"use client";

import { CATEGORIES } from "@/data/categories";
import { ChromaGrid } from "@/components/ChromaGrid/ChromaGrid";

export const CategoriesSection = () => {
  const categoryItems = CATEGORIES.slice(0, 6).map((cat, index) => ({
    image: cat.image,
    title: cat.name,
    subtitle: cat.description,
    handle: cat.count,
    borderColor: "#769489",
    gradient: index % 2 === 0
      ? "linear-gradient(145deg, #213833 0%, #172925 100%)"
      : "linear-gradient(145deg, #1e332f 0%, #142421 100%)",
    url: "#health-solutions"
  }));

  return (
    <section id="categories" className="py-28 md:py-36 bg-[#172925] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
            Core Botanical Classifications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8]">
            Curated Raw Material Streams
          </h2>
          <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
            Categorized for industrial extraction, pharmaceutical milling, and Ayurvedic classical formulations. Move your cursor across the grid to inspect raw streams.
          </p>
        </div>

        {/* React Bits Interactive ChromaGrid Component */}
        <div className="w-full relative min-h-[550px]">
          <ChromaGrid
            items={categoryItems}
            columns={3}
            radius={280}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>

      </div>
    </section>
  );
};
