"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Sparkles, Leaf, Sun, ShieldCheck } from "lucide-react";

export const TerrariumCapsule = () => {
  // Interactive 3D mouse tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-4 cursor-pointer perspective-1000"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute w-96 h-96 bg-emerald-500/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute w-80 h-80 bg-gold-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main 3D Suspended Glass Jar Terrarium Container */}
      <motion.div
        style={{ rotateX, rotateY }}
        animate={{ y: [-12, 12, -12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-80 sm:w-96 md:w-[420px] h-[520px] rounded-[55px] bg-gradient-to-b from-[#153828]/90 via-[#0b2419]/95 to-[#071910] p-3.5 border border-emerald-400/40 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden group transition-shadow hover:shadow-gold-500/30 flex flex-col items-center justify-between"
      >
        {/* Outer Specular Glass Refraction & Light Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-30" />
        <div className="absolute -top-24 -left-20 w-56 h-56 bg-white/25 rounded-full blur-2xl pointer-events-none z-30" />

        {/* Inner Botanical Terrarium Body Container */}
        <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-forest-950 flex flex-col justify-between p-6 z-10 border border-emerald-500/30">
          
          {/* Main High-Definition Glass Jar Image */}
          <img
            src="/images/herbal-jar-terrarium.png"
            alt="Glass Jar Medicinal Forest Terrarium with Golden Capsules"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 filter contrast-110 brightness-105"
          />

          {/* Vignette Overlays for Crisp Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07140E] via-[#07140E]/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07140E]/60 via-transparent to-transparent z-10" />

          {/* Top Badge Inside Jar Container */}
          <div className="relative z-20 space-y-1 text-left">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#07140E]/85 border border-gold-400/50 text-gold-400 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md shadow-lg">
              <Sun className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
              <span>Nature's Purity</span>
            </span>
          </div>

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-24 right-6 z-20 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 text-forest-950 font-extrabold text-[10px] uppercase tracking-wider shadow-lg flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 fill-forest-950" />
            <span>Phyto Extract</span>
          </motion.div>

          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-28 left-6 z-20 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg flex items-center space-x-1"
          >
            <Leaf className="w-3.5 h-3.5 text-white" />
            <span>Active Bio-Assay</span>
          </motion.div>

          {/* Bottom Typography Inside Container */}
          <div className="relative z-20 text-left space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gold-400" />
              Standardized Botanical Extracts
            </span>
            <h3 className="text-xl font-bold font-serif gold-gradient-text leading-snug">
              From Forest to Pharmacy
            </h3>
            <p className="text-[11px] text-beige-200/90 font-light leading-relaxed">
              Ashwagandha, Tulsi, Neem, Giloy & Golden Capsules cultivated in pristine reserves.
            </p>
          </div>

        </div>
      </motion.div>

      {/* Floating Ground Shadow */}
      <motion.div
        animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-8 w-72 h-8 bg-black/90 rounded-full blur-xl pointer-events-none"
      />
    </div>
  );
};
