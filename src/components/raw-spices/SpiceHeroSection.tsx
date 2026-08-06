"use client";

import { motion } from "framer-motion";
import { Send, ArrowDown, ShieldCheck, Flame, Award, Truck } from "lucide-react";

interface SpiceHeroSectionProps {
  onOpenQuoteModal: () => void;
}

export const SpiceHeroSection = ({ onOpenQuoteModal }: SpiceHeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#172925] text-[#D0D9D8] py-20">
      {/* Background Soft Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#98B4A1]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#769489]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* B2B Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#213833] border border-white/[0.1] text-[#769489] text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Flame className="w-4 h-4 text-[#769489]" />
          <span>Wholesale Spices & Khade Masale Division</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight tracking-tight max-w-5xl mx-auto text-[#D0D9D8]"
        >
          Premium Whole Spices &{" "}
          <span className="gold-gradient-text block sm:inline">Raw Spice Materials</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-[#98B4A1] max-w-3xl mx-auto leading-relaxed font-sans"
        >
          We supply high-quality whole spices in bulk quantities with guaranteed freshness, purity, and competitive wholesale pricing.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <a
            href="#spice-products"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>Explore Our Collection</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[#D0D9D8] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#769489]" />
            <span>Get Wholesale Pricing</span>
          </button>
        </motion.div>

        {/* Key Highlight Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-white/[0.08] text-xs font-medium text-[#98B4A1]"
        >
          <div className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-[#213833] border border-white/[0.1] text-[#D0D9D8]">
            <ShieldCheck className="w-4 h-4 text-[#98B4A1]" />
            <span>100% Pure & Unadulterated</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-[#213833] border border-white/[0.1] text-[#D0D9D8]">
            <Award className="w-4 h-4 text-[#769489]" />
            <span>Sortex Export Quality</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-[#213833] border border-white/[0.1] text-[#D0D9D8]">
            <Truck className="w-4 h-4 text-[#98B4A1]" />
            <span>Pan-India Bulk Supply</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3.5 rounded-xl bg-[#213833] border border-white/[0.1] text-[#D0D9D8]">
            <Flame className="w-4 h-4 text-[#769489]" />
            <span>Direct Mandi Pricing</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
