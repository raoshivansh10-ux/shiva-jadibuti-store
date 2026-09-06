"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, ShieldCheck, Sprout, Layers, Truck } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

interface HeroSectionProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

export const HeroSection = ({ onOpenQuoteModal }: HeroSectionProps) => {
  const [activeCard, setActiveCard] = useState(0);

  const carouselCards = [
    {
      icon: ShieldCheck,
      circleBg: "bg-[#769489]",
      text: "ASTA & FSSAI certified 99.5%+ pure raw materials"
    },
    {
      icon: Sprout,
      circleBg: "bg-[#98B4A1]",
      text: "Direct farm procurement from Kerala, MP & Himalayas"
    },
    {
      icon: Layers,
      circleBg: "bg-[#769489]",
      text: "Multi-ton bulk capacity ready for immediate dispatch"
    },
    {
      icon: Truck,
      circleBg: "bg-[#98B4A1]",
      text: "Pan-India 48-72 hour express B2B freight logistics"
    }
  ];

  // Auto-rotating 4-card carousel every 3500ms
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % carouselCards.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [carouselCards.length]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-[#172925] text-[#D0D9D8] pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-10 selection:bg-[#769489] selection:text-[#172925]"
    >
      {/* Full Cinematic Desktop & Mobile Background Image - Perfectly Framed */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/images/bg image.png"
          alt="Shiva Jadibuti Store Himalayan Botanical Glass Terrarium"
          className="w-full h-full object-cover object-[80%_center] sm:object-right md:object-[85%_center] lg:object-[90%_center] xl:object-right opacity-90 lg:opacity-100"
        />
        {/* Cinematic Directional Vignette Overlays for flawless text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#172925] via-[#172925]/85 to-transparent sm:via-[#172925]/60 lg:from-[#172925]/90 lg:via-[#172925]/45 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172925] via-transparent to-[#172925]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#172925]/50 via-transparent to-[#172925]" />
      </div>

      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#213833]/40 rounded-full blur-[140px] pointer-events-none opacity-50" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-10 flex-1 flex flex-col justify-center py-6">
        <div className="max-w-3xl xl:max-w-4xl space-y-8 lg:space-y-10 relative z-20">
          
          {/* Brand Logo Sub-Badge */}
          <div className="inline-flex items-center space-x-3.5 px-4 py-2 rounded-full bg-[#213833]/90 backdrop-blur-md border border-white/[0.12] text-xs font-mono text-[#769489] uppercase tracking-widest animate-fade-in shadow-md">
            <img src="/images/logo.png" alt="Shiva Jadibuti Store Logo" className="w-8 h-8 object-contain p-0.5 rounded-full border border-white/20 bg-white shrink-0 shadow-sm" />
            <span>India&apos;s Trusted Wholesale Herbal Supplier</span>
          </div>

          {/* Headline with Word-by-Word Reveal Animation */}
          <h1 className="font-dm-sans font-normal tracking-[-0.05em] text-[40px] leading-[44px] sm:text-[68px] sm:leading-[68px] md:text-[84px] md:leading-[82px] lg:text-[96px] lg:leading-[92px] xl:text-[108px] xl:leading-[100px] flex flex-col space-y-1">
            {/* Line 1 */}
            <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4">
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "0.3s" }} className="text-[#D0D9D8]">The</span>
              </span>
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "0.4s" }} className="text-[#D0D9D8]">Purity</span>
              </span>
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "0.5s" }} className="text-[#D0D9D8]/40">of</span>
              </span>
            </div>

            {/* Line 2 */}
            <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4">
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "0.6s" }} className="text-[#D0D9D8]/40">Himalayan</span>
              </span>
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "0.7s" }} className="text-[#D0D9D8]/40">Herbs</span>
              </span>
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "0.8s" }} className="text-[#D0D9D8]">in</span>
              </span>
            </div>

            {/* Line 3 */}
            <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4">
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "0.9s" }} className="text-[#D0D9D8]">Every</span>
              </span>
              <span className="overflow-hidden inline-block animate-word-reveal">
                <span style={{ animationDelay: "1.0s" }} className="text-[#769489] font-medium">Batch</span>
              </span>
            </div>
          </h1>

          {/* CTA & Description Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-8 animate-fade-up delay-600">
            <button
              onClick={() => onOpenQuoteModal?.("Raw Botanical Wholesale Batch")}
              className="w-full sm:w-[220px] lg:w-[250px] h-14 lg:h-[62px] bg-[#213833]/90 hover:bg-[#769489] text-[#D0D9D8] hover:text-[#172925] border border-white/15 hover:border-[#769489] rounded-full font-inter font-medium text-sm lg:text-base tracking-[-0.02em] flex items-center justify-center space-x-2 transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <span>Explore Products</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <p className="text-[#98B4A1] max-w-[340px] font-inter font-light text-xs sm:text-sm lg:text-base leading-relaxed tracking-[-0.02em]">
              Direct B2B wholesale supply of laboratory-tested raw herbs, roots, barks, leaves, and spices in metric tons.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom 3-Panel Grid with BorderGlow */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] gap-6">
          
          {/* Panel 1: Dark Obsidian Stone Card */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="158 14% 52%"
            backgroundColor="#213833"
            borderRadius={20}
            glowRadius={30}
            glowIntensity={1.1}
            colors={['#769489', '#98B4A1', '#213833']}
            className="min-h-[180px]"
          >
            <div className="p-6 sm:p-8 h-full relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-2 max-w-[320px] relative z-10">
                <h3 className="font-dm-sans font-normal text-xl sm:text-2xl lg:text-[26px] leading-snug tracking-[-0.04em] text-[#D0D9D8]">
                  Start your customized B2B wholesale order or sample batch
                </h3>
              </div>
              <div className="relative z-10 pt-4">
                <button
                  onClick={() => onOpenQuoteModal?.("Sample Batch Request")}
                  className="underline font-inter font-normal text-sm lg:text-base tracking-[-0.02em] text-[#769489] hover:text-[#D0D9D8] transition-colors cursor-pointer"
                >
                  Request CoA & Sample
                </button>
              </div>
              <img
                src="/images/category_barks.png"
                alt="Herbal bark motif"
                className="absolute right-0 bottom-0 h-full w-1/2 object-cover opacity-20 mix-blend-luminosity pointer-events-none"
              />
            </div>
          </BorderGlow>

          {/* Panel 2: Deep Pine Green Card (Auto-rotating 4-card carousel) */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="158 14% 52%"
            backgroundColor="#172925"
            borderRadius={20}
            glowRadius={30}
            glowIntensity={1.1}
            colors={['#98B4A1', '#769489', '#172925']}
            className="min-h-[180px]"
          >
            <div className="p-6 sm:p-8 h-full relative flex flex-col justify-between overflow-hidden">
              <div className="relative flex-1">
                {carouselCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-700 ease-out flex items-center space-x-3 ${
                      activeCard === idx
                        ? "opacity-100 translate-y-0 relative z-10"
                        : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${card.circleBg} text-[#D0D9D8] flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <card.icon className="w-5 h-5 text-[#172925]" />
                    </div>
                    <p className="font-inter font-light text-xs sm:text-sm lg:text-base text-[#D0D9D8]/90 leading-tight tracking-[-0.02em]">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-4 w-full">
                {carouselCards.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveCard(idx)}
                    className={`h-0.5 flex-1 rounded-full cursor-pointer transition-all duration-300 ${
                      activeCard === idx ? "bg-[#769489]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </BorderGlow>

          {/* Panel 3: Ultra Dark Obsidian Card */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="158 14% 52%"
            backgroundColor="#213833"
            borderRadius={20}
            glowRadius={30}
            glowIntensity={1.1}
            colors={['#769489', '#98B4A1', '#D0D9D8']}
            className="min-h-[180px]"
          >
            <div className="p-6 sm:p-8 h-full flex items-center justify-between gap-4">
              <img
                src="/images/saffron_minimal.png"
                alt="Kashmiri Saffron Jar"
                className="w-[100px] h-[75px] sm:w-[130px] sm:h-[95px] object-cover rounded-xl border border-white/10 shadow-lg flex-shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-dm-sans font-medium text-2xl sm:text-3xl tracking-[-0.04em] text-[#769489]">
                  +30 Years
                </h4>
                <p className="text-[#98B4A1] font-inter font-light text-xs sm:text-sm leading-tight">
                  Supplying India&apos;s leading pharmaceutical & spice brands
                </p>
              </div>
            </div>
          </BorderGlow>

        </div>
      </div>

    </section>
  );
};
