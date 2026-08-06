"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HEALTH_CONDITIONS, HealthCondition } from "@/data/healthConditions";
import { Sparkles, ShieldAlert, CheckCircle, ArrowRight, Dna, Activity, Send, Filter } from "lucide-react";

interface HealthSolutionsSectionProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const HealthSolutionsSection = ({ onOpenQuoteModal }: HealthSolutionsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCondition, setSelectedCondition] = useState<HealthCondition | null>(null);

  const categories = [
    "All",
    "Mental & Nervous System",
    "Immunity & Infectious Care",
    "Hepatic & Gastrointestinal",
    "Cardiovascular Health",
    "Respiratory & Pulmonary",
    "Dermatology & Blood Purity"
  ];

  const filteredConditions = activeCategory === "All"
    ? HEALTH_CONDITIONS
    : HEALTH_CONDITIONS.filter((item) => item.category === activeCategory);

  return (
    <section id="health-solutions" className="py-28 md:py-36 bg-[#172925] border-t border-white/[0.08] relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#769489]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#769489]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-[#769489] uppercase bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#769489]" />
            <span>Therapeutic Solution Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8] leading-tight">
            Targeted Diseases & <span className="text-[#769489]">Ayurvedic Botanical Remedies</span>
          </h2>

          <p className="text-sm sm:text-base text-[#98B4A1] font-light leading-relaxed">
            Explore how our lab-tested wholesale raw botanical materials naturally resolve specific physiological ailments, chronic disorders, and cellular oxidative damage.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-12">
          <span className="text-xs font-mono text-[#98B4A1] flex items-center mr-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 mr-1" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#769489] text-[#172925] font-bold shadow-lg scale-105"
                  : "bg-[#213833] text-[#98B4A1] hover:text-[#D0D9D8] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Disease vs Solution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredConditions.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#213833] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#769489]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              
              {/* Top Banner: Disease/Condition Visual vs Herb Solution Visual Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-b border-white/10 bg-[#172925]/60 relative">
                
                {/* Left: Disease / Ailment Side */}
                <div className="relative h-56 sm:h-64 overflow-hidden border-r-0 sm:border-r border-b sm:border-b-0 border-white/10">
                  <img
                    src={item.conditionImage}
                    alt={item.conditionTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172925] via-[#172925]/40 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono text-rose-300 uppercase tracking-widest bg-rose-950/80 border border-rose-500/30 flex items-center space-x-1">
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                    <span>Ailment & Pathology</span>
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-xs text-[#D0D9D8]">
                    <span className="text-[10px] font-mono text-[#98B4A1] block">{item.category}</span>
                    <h4 className="font-serif font-bold text-sm text-[#D0D9D8] line-clamp-1">
                      {item.conditionTitle}
                    </h4>
                  </div>
                </div>

                {/* Right: Botanical Remedy Solution Side */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={item.solutionHerbImage}
                    alt={item.solutionHerbName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#213833] via-[#213833]/30 to-transparent" />

                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono text-[#172925] font-bold uppercase tracking-widest bg-[#769489] flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-[#172925]" />
                    <span>Natural Remedy</span>
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-xs text-[#D0D9D8]">
                    <span className="text-[10px] font-mono text-[#769489] block">{item.solutionHindiName}</span>
                    <h4 className="font-serif font-bold text-sm text-[#D0D9D8] line-clamp-1">
                      {item.solutionHerbName}
                    </h4>
                  </div>
                </div>

                {/* Center Badge Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#769489] text-[#172925] shadow-2xl border-2 border-[#172925]">
                  <ArrowRight className="w-4 h-4" />
                </div>

              </div>

              {/* Card Body: Details & Action */}
              <div className="p-6 space-y-5">
                
                {/* Disease Description & Symptoms */}
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-[#D0D9D8] group-hover:text-[#769489] transition-colors">
                    {item.conditionTitle}
                  </h3>
                  <p className="text-xs text-[#98B4A1] font-light leading-relaxed">
                    {item.conditionDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.symptoms.map((symp, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-rose-950/30 text-rose-300 border border-rose-500/20"
                      >
                        • {symp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botanical Solution Details */}
                <div className="p-4 rounded-2xl bg-[#172925] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#769489] font-bold uppercase tracking-wider flex items-center space-x-1">
                      <Dna className="w-3.5 h-3.5 text-[#769489]" />
                      <span>{item.solutionHerbName}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#98B4A1] bg-[#213833] px-2 py-0.5 rounded border border-white/10">
                      MOQ: {item.moq}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#98B4A1] uppercase block">Active Phytocompounds:</span>
                    <p className="text-xs font-mono text-[#D0D9D8] font-bold">{item.activeCompounds}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#98B4A1] uppercase block">Mechanism of Cure:</span>
                    <p className="text-xs text-[#98B4A1] font-light leading-relaxed">
                      {item.mechanismOfAction}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedCondition(item)}
                    className="text-xs font-mono text-[#98B4A1] hover:text-[#D0D9D8] underline underline-offset-4 cursor-pointer"
                  >
                    View Mechanism
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(item.solutionHerbName)}
                    className="py-2.5 px-5 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire Bulk Solution</span>
                  </button>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Mechanism Detail Modal */}
      <AnimatePresence>
        {selectedCondition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedCondition(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#213833] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative text-[#D0D9D8] shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedCondition(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#172925] text-[#D0D9D8] hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block">
                  {selectedCondition.category}
                </span>
                <h3 className="text-2xl font-serif text-[#D0D9D8]">
                  {selectedCondition.conditionTitle}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-40 relative border border-white/10">
                  <img src={selectedCondition.conditionImage} alt="Condition" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/80 text-rose-300">
                    Ailment Visual
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden h-40 relative border border-white/10">
                  <img src={selectedCondition.solutionHerbImage} alt="Herb" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-[#769489] text-[#172925] font-bold">
                    Raw Herb Cure
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-mono text-[#769489] uppercase block mb-1">Botanical Remedy Solution</h4>
                  <p className="text-lg font-serif text-[#D0D9D8]">{selectedCondition.solutionHerbName} ({selectedCondition.solutionHindiName})</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-[#98B4A1] uppercase block mb-1">Active Bio-Phytocompounds</h4>
                  <p className="text-sm font-mono text-[#769489] font-bold">{selectedCondition.activeCompounds}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-[#98B4A1] uppercase block mb-1">Biological Action & Therapeutic Cure</h4>
                  <p className="text-xs text-[#D0D9D8] font-light leading-relaxed">
                    {selectedCondition.mechanismOfAction}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-[#98B4A1] uppercase block mb-1">Commercial Bulk Supply MOQ</h4>
                  <p className="text-xs font-mono text-[#769489] font-bold">{selectedCondition.moq}</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  onClick={() => setSelectedCondition(null)}
                  className="px-5 py-2.5 rounded-full bg-[#172925] border border-white/10 text-xs font-mono text-[#D0D9D8] hover:bg-white/10 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = selectedCondition.solutionHerbName;
                    setSelectedCondition(null);
                    onOpenQuoteModal(name);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Wholesale Quote</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
