"use client";

import { motion } from "framer-motion";
import { Sprout, Filter, Microscope, ShieldCheck, Package, Truck } from "lucide-react";

export const QualitySection = () => {
  const steps = [
    {
      step: "01",
      title: "Farm Sourcing",
      subtitle: "Sustainable Origin",
      description: "Direct procurement from organic herbal farmers, wild forest reserves, and tribal harvesters.",
      icon: Sprout
    },
    {
      step: "02",
      title: "Cleaning",
      subtitle: "Triple Hand Sifting",
      description: "Thorough sifting to eliminate dust, sand, weeds, degraded leaves, and foreign physical matter.",
      icon: Filter
    },
    {
      step: "03",
      title: "Sorting",
      subtitle: "Optical & Hand Grading",
      description: "Sortex machine color sorting and manual grading for uniform size and color density.",
      icon: ShieldCheck
    },
    {
      step: "04",
      title: "Quality Check",
      subtitle: "Lab Analysis & COA",
      description: "Testing active phytochemical markers, moisture content (< 8-10%), and heavy metal parameters.",
      icon: Microscope
    },
    {
      step: "05",
      title: "Packaging",
      subtitle: "Airtight Export Sacks",
      description: "Multi-layer vacuum sealing, poly-lined HDPE woven bags, and fiber drum options.",
      icon: Package
    },
    {
      step: "06",
      title: "Dispatch",
      subtitle: "Fast Freight Logistics",
      description: "Prompt B2B bulk dispatch with GST invoice and Mandi clearances within 48-72 hours.",
      icon: Truck
    }
  ];

  return (
    <section id="quality" className="py-28 bg-[#172925] text-[#D0D9D8] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#769489] bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/[0.1]"
          >
            <Microscope className="w-4 h-4 text-[#769489]" />
            <span>Sourcing to Delivery Pipeline</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#D0D9D8]"
          >
            6-Stage Quality <span className="gold-gradient-text">Procurement Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#98B4A1] leading-relaxed"
          >
            Every batch of raw herbs arriving at our central warehouse undergoes rigorous testing to guarantee authentic therapeutic efficacy.
          </motion.p>
        </div>

        {/* 6-Step Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="rounded-2xl bg-[#213833] p-6 border border-white/[0.1] hover:border-[#769489]/50 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-center items-center group"
              >
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-xl bg-[#172925] border border-white/[0.1] text-[#769489] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#769489] text-[#172925] text-[11px] font-extrabold flex items-center justify-center">
                    {st.step}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#98B4A1] block mb-1">
                    {st.subtitle}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#D0D9D8] group-hover:text-[#769489] transition-colors mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#98B4A1] leading-relaxed font-normal">
                    {st.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] w-full text-[11px] font-semibold text-[#769489] flex items-center justify-center space-x-1">
                  <span>Stage {st.step}</span>
                  <span>✓</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
