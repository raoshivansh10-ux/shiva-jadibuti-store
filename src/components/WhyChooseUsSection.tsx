"use client";

import { ShieldCheck, Sprout, Layers, Globe, PackageCheck, Tag, Zap, Building2 } from "lucide-react";

export const WhyChooseUsSection = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Lab Certification & CoA",
      description: "Every consignment includes batch Certificate of Analysis testing moisture, ash value, and heavy metals."
    },
    {
      icon: Sprout,
      title: "Direct Farm Procurement",
      description: "Direct ties with organic herbal farmers and forest collectors across Malabar, MP, and North-East India."
    },
    {
      icon: Layers,
      title: "Multi-Ton Buffer Capacity",
      description: "50,000 sq. ft. central warehousing guaranteeing year-round bulk supply stability without price spikes."
    },
    {
      icon: Globe,
      title: "Export Grade Compliance",
      description: "Sortex cleaned 99.5%+ pure raw materials conforming to ASTA, ESA, and international pharmacopeias."
    },
    {
      icon: PackageCheck,
      title: "Hygienic Multi-Layer Packing",
      description: "Poly-lined HDPE woven sacks, vacuum sealed foil bags, and fiber drum options preserving volatile oils."
    },
    {
      icon: Tag,
      title: "Mandi Direct Pricing",
      description: "Eliminating middleman trader margins for competitive B2B factory pricing."
    },
    {
      icon: Zap,
      title: "48-72 Hour Freight Express",
      description: "Nationwide express logistics network delivering bulk metric tons to 50+ commercial cities."
    },
    {
      icon: Building2,
      title: "3 Decades Mandi Leadership",
      description: "Trusted wholesale supplier to India's top pharmaceutical, nutraceutical, and spice manufacturers since 1994."
    }
  ];

  return (
    <section id="why-us" className="py-28 md:py-36 bg-[#172925] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header */}
        <div className="max-w-xl mb-20 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
            The Shiva Jadibuti Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8]">
            Why Industry Leaders Partner With Us
          </h2>
          <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
            Combining traditional herbal trade heritage with modern laboratory verification and seamless bulk freight logistics.
          </p>
        </div>

        {/* 8 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-[#213833] border border-white/10 rounded-3xl p-8 space-y-4 group hover:border-[#769489]/50 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#172925] border border-white/10 text-[#769489] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
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
