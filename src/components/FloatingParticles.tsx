"use client";

import { motion } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";

export const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Particle 1: Floating Green Leaf Top Left */}
      <motion.div
        animate={{
          y: [0, -35, 0],
          x: [0, 15, 0],
          rotate: [0, 20, -10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/6 left-8 text-emerald-400/25"
      >
        <Leaf className="w-16 h-16" />
      </motion.div>

      {/* Particle 2: Floating Golden Leaf Bottom Right */}
      <motion.div
        animate={{
          y: [0, 45, 0],
          x: [0, -20, 0],
          rotate: [0, -25, 15, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 text-gold-400/25"
      >
        <Leaf className="w-20 h-20" />
      </motion.div>

      {/* Particle 3: Small Floating Leaf Center Right */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 30, 0],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-1/4 text-emerald-500/20"
      >
        <Leaf className="w-10 h-10" />
      </motion.div>

      {/* Particle 4: Gold Sparkle Top Right */}
      <motion.div
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-1/3 text-gold-400/40"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      {/* Particle 5: Gold Sparkle Bottom Left */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-1/4 text-gold-400/35"
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>
    </div>
  );
};
