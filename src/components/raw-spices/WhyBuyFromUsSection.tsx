"use client";

import { ShieldCheck, Sprout, Layers, Globe, PackageCheck, Tag, Zap, Building2 } from "lucide-react";

export const WhyBuyFromUsSection = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      description: "Rigorous laboratory testing for purity, volatile oil content, zero mold, and moisture control."
    },
    {
      icon: Sprout,
      title: "Farm Fresh",
      description: "Direct procurement from certified spice cultivation belts across Kerala, Rajasthan, Gujarat, and Sikkim."
    },
    {
      icon: Layers,
      title: "Bulk Supply",
      description: "Multi-ton inventory capacity ready for instant dispatch to industrial factories and commercial buyers."
    },
    {
      icon: Globe,
      title: "Export Quality",
      description: "Sortex cleaned 99.5%+ pure spices meeting strict international ASTA, ESA, and FSSAI standards."
    },
    {
      icon: PackageCheck,
      title: "Hygienic Packaging",
      description: "Vacuum-sealed, poly-lined, and multi-wall jute packaging protecting aroma and preventing moisture ingress."
    },
    {
      icon: Tag,
      title: "Competitive Pricing",
      description: "Direct mandi-linked wholesale pricing eliminating middleman commissions for maximum buyer margin."
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Pan-India logistics network delivering bulk consignments within 48 to 72 hours."
    },
    {
      icon: Building2,
      title: "Trusted Wholesale Supplier",
      description: "Decades of trusted commercial trade relationships with leading spice processors, exporters, and brands."
    }
  ];

  return (
    <section className="py-28 md:py-36 bg-[#172925]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header */}
        <div className="max-w-xl mb-20 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
            Our Wholesale Commitment
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#D0D9D8]">
            Why Buy From Us
          </h2>
          <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
            Combining traditional spice trade expertise with modern quality control and reliable logistics.
          </p>
        </div>

        {/* 8 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-[#213833] border border-white/10 rounded-2xl p-8 space-y-4 group hover:border-[#769489]/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#172925] border border-white/[0.1] text-[#769489] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-serif text-[#D0D9D8] group-hover:text-[#769489] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#98B4A1] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
