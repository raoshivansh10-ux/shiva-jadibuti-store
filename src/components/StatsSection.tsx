"use client";

import { motion } from "framer-motion";
import { Leaf, TestTube, PackageCheck, Truck, Award, Users, MapPin, Sprout } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

export const StatsSection = () => {
  // Bottom 5 Statistics
  const statistics = [
    {
      value: "500+",
      label: "Medicinal Herbs",
      sub: "Botanical Inventory",
      icon: Leaf,
      color: "text-[#98B4A1]"
    },
    {
      value: "100+",
      label: "Whole Spices",
      sub: "Khade Masale Division",
      icon: Sprout,
      color: "text-[#769489]"
    },
    {
      value: "1500+",
      label: "Wholesale Clients",
      sub: "Pharma & Exporters",
      icon: Users,
      color: "text-[#98B4A1]"
    },
    {
      value: "10+",
      label: "Years Experience",
      sub: "Sourcing Heritage",
      icon: Award,
      color: "text-[#769489]"
    },
    {
      value: "50+",
      label: "Cities Served",
      sub: "Pan-India Logistics",
      icon: MapPin,
      color: "text-[#98B4A1]"
    }
  ];

  // 4 Premium Feature Cards Below Statistics
  const featureCards = [
    {
      title: "Sourced from Trusted Farmers",
      description: "Direct procurement from organic herbal farmers, wild forest reserves, and certified botanical belts.",
      icon: Sprout,
      color: "text-[#98B4A1]",
      badge: "🌱 Direct Farm Origin"
    },
    {
      title: "Laboratory Tested",
      description: "Rigorous organoleptic verification, moisture control, active phytochemical testing, and batch COA.",
      icon: TestTube,
      color: "text-[#769489]",
      badge: "🧪 ISO / GMP Lab Tested"
    },
    {
      title: "Hygienic Packaging",
      description: "Multi-layer poly-lined HDPE woven sacks, vacuum sealing, and moisture-proof jute bag options.",
      icon: PackageCheck,
      color: "text-[#98B4A1]",
      badge: "📦 Export Grade Packaging"
    },
    {
      title: "Fast Nationwide Delivery",
      description: "Tied up with leading logistics partners ensuring prompt bulk transport across all 28 Indian states.",
      icon: Truck,
      color: "text-[#769489]",
      badge: "🚚 48-72 Hour Freight"
    }
  ];

  return (
    <section className="bg-[#172925] border-t border-white/[0.08] text-[#D0D9D8] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 5 Bottom Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {statistics.map((st, idx) => {
            const Icon = st.icon;

            return (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-[#213833] border border-white/[0.1] hover:border-[#769489]/50 transition-all duration-300 group shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#172925] border border-white/[0.1] flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                  <Icon className={`w-5 h-5 ${st.color}`} />
                </div>
                <div className="text-3xl font-serif font-bold text-[#769489]">
                  {st.value}
                </div>
                <div className="text-xs font-semibold text-[#D0D9D8] mt-1">
                  {st.label}
                </div>
                <div className="text-[11px] text-[#98B4A1] mt-0.5 font-normal">
                  {st.sub}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4 Feature Cards Below Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="158 14% 52%"
                  backgroundColor="#213833"
                  borderRadius={16}
                  glowRadius={30}
                  glowIntensity={1.2}
                  coneSpread={25}
                  animated={true}
                  colors={['#769489', '#98B4A1', '#D0D9D8']}
                  className="h-full"
                >
                  <div className="p-6 h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-[#172925] border border-white/[0.1] group-hover:scale-105 transition-transform">
                          <Icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <span className="text-[10px] font-semibold text-[#D0D9D8] px-2.5 py-1 rounded-md bg-[#172925] border border-white/[0.1]">
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-serif font-bold text-[#D0D9D8] group-hover:text-[#769489] transition-colors mb-2">
                        {card.title}
                      </h3>

                      <p className="text-xs text-[#98B4A1] leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] font-medium text-[#769489] flex items-center justify-between">
                      <span>Guaranteed Quality</span>
                      <span>✓</span>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
