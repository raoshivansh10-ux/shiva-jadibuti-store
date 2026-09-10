"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquareHeart } from "lucide-react";

interface AskShivaFloatingButtonProps {
  onClick: () => void;
}

export const AskShivaFloatingButton = ({ onClick }: AskShivaFloatingButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 25, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-6 z-40 flex items-center space-x-3.5 px-4 sm:px-5 py-3 rounded-full bg-[#213833]/95 hover:bg-[#213833] border border-[#769489]/40 hover:border-[#769489] text-[#D0D9D8] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md cursor-pointer group text-left transition-all max-w-[calc(100vw-3rem)] sm:max-w-none"
      aria-label="Ask Shiva AI - Find products based on your requirements"
    >
      {/* Animated glowing logo bubble */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full bg-white border border-[#769489]/50 p-0.5 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-[#769489] transition-colors">
          <img
            src="/images/logo.png"
            alt="Shiva Jadibuti"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#213833] animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#213833]" />
      </div>

      {/* Button Copy */}
      <div className="flex flex-col pr-1 sm:pr-2">
        <div className="flex items-center space-x-1.5">
          <span className="text-xs sm:text-sm font-serif font-bold text-[#D0D9D8] tracking-wide group-hover:text-white flex items-center space-x-1">
            <span>Ask Shiva AI</span>
            <Sparkles className="w-3 h-3 text-[#769489] shrink-0" />
          </span>
          <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#769489]/20 text-[#769489] border border-[#769489]/30">
            NEW
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-[#98B4A1] font-light tracking-tight line-clamp-1 group-hover:text-[#D0D9D8] transition-colors">
          Find products based on your requirements
        </span>
      </div>
    </motion.button>
  );
};
