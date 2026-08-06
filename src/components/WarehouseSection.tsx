"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Thermometer, PackageCheck } from "lucide-react";

export const WarehouseSection = () => {
  const highlights = [
    {
      title: "Multi-Ton Storage Capacity",
      description: "Over 50,000 sq. ft. of dedicated B2B warehousing handling year-round bulk inventory buffer stock.",
      icon: Building2,
      color: "text-[#769489]"
    },
    {
      title: "Climate & Humidity Controlled",
      description: "Temperature-regulated storage zones preventing volatile oil loss, oxidation, and humidity mold risks.",
      icon: Thermometer,
      color: "text-[#98B4A1]"
    },
    {
      title: "In-House Quality Inspection",
      description: "Organoleptic verification, moisture testing, and batch Certificate of Analysis (COA) documentation.",
      icon: ShieldCheck,
      color: "text-[#769489]"
    },
    {
      title: "Custom B2B Export Packaging",
      description: "Multi-layer vacuum sealing, poly-lined HDPE sacks, jute bags, and fiber drum options.",
      icon: PackageCheck,
      color: "text-[#98B4A1]"
    }
  ];

  return (
    <section className="py-28 bg-[#172925] text-[#D0D9D8] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#769489] bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/[0.1]"
          >
            <Building2 className="w-4 h-4 text-[#769489]" />
            <span>Infrastructure & Capacity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#D0D9D8]"
          >
            Modern B2B Warehouse <span className="gold-gradient-text">& Storage Facility</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#98B4A1] leading-relaxed"
          >
            Our central warehouse in Haridwar / Delhi NCR ensures immediate bulk dispatch for pharmaceutical manufacturers and exporters.
          </motion.p>
        </div>

        {/* Feature Grid & Warehouse Image Banner Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Warehouse Visual Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-xl bg-[#213833] group">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                alt="Shiva Jadibuti B2B Central Herbal Warehouse Facility"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172925] via-[#172925]/30 to-transparent opacity-90" />

              <div className="absolute bottom-6 left-6 right-6 text-[#D0D9D8] space-y-1">
                <span className="px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#769489] text-[#172925]">
                  Pan-India Distribution Hub
                </span>
                <h3 className="text-xl font-serif font-bold gold-gradient-text">
                  50,000 Sq. Ft. Climate-Controlled Facility
                </h3>
                <p className="text-xs text-[#98B4A1]">
                  Haridwar / Delhi NCR Central Grain & Herbal Trading Zone
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Highlight Cards */}
          <div className="lg:col-span-6 space-y-4">
            {highlights.map((hl, idx) => {
              const Icon = hl.icon;

              return (
                <motion.div
                  key={hl.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-[#213833] border border-white/[0.1] hover:border-[#769489]/50 transition-all duration-300 group flex items-start space-x-4 shadow-md"
                >
                  <div className="p-3 rounded-xl bg-[#172925] border border-white/[0.1] flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className={`w-5 h-5 ${hl.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#D0D9D8] group-hover:text-[#769489] transition-colors">
                      {hl.title}
                    </h3>
                    <p className="text-xs text-[#98B4A1] mt-1 leading-relaxed font-normal">
                      {hl.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
