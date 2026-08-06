"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sprout } from "lucide-react";

export const LeafLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07150e] text-white"
        >
          {/* Animated Glow Halo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0.3, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl"
          />

          {/* Plant & Leaf Growing Container */}
          <div className="relative flex items-center justify-center mb-6">
            {/* Sprout Base */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="text-emerald-500"
            >
              <Sprout className="w-16 h-16" />
            </motion.div>

            {/* Left Growing Leaf */}
            <motion.div
              initial={{ scale: 0, rotate: -45, x: -10, y: 10 }}
              animate={{ scale: 1.2, rotate: -25, x: -26, y: -16 }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              className="absolute text-gold-400"
            >
              <Leaf className="w-10 h-10 fill-gold-400/20" />
            </motion.div>

            {/* Right Growing Leaf */}
            <motion.div
              initial={{ scale: 0, rotate: 45, x: 10, y: 10 }}
              animate={{ scale: 1.2, rotate: 25, x: 26, y: -16 }}
              transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
              className="absolute text-emerald-400"
            >
              <Leaf className="w-10 h-10 fill-emerald-400/20" />
            </motion.div>

            {/* Central Blooming Leaf Accent */}
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: -32 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "backOut" }}
              className="absolute text-gold-500"
            >
              <Leaf className="w-8 h-8 fill-gold-500" />
            </motion.div>
          </div>

          {/* Brand Name Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center px-4"
          >
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider font-serif gold-gradient-text uppercase">
              Shiva Jadibuti Store
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="text-xs md:text-sm text-emerald-300/80 mt-1 font-sans tracking-widest uppercase"
            >
              Purity & Natural Authenticity
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-1 bg-forest-900 rounded-full mt-8 overflow-hidden relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 via-gold-400 to-emerald-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
