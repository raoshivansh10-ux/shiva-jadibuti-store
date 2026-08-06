"use client";

import { Factory, Utensils, Hotel, ShoppingBag, Globe, Leaf, FlaskConical, Store } from "lucide-react";

export const IndustriesServedSection = () => {
  const industries = [
    {
      name: "Spice Manufacturers",
      description: "Bulk raw spices for grinding, masala blending, and packaged spice brands.",
      icon: Factory,
      tag: "Bulk Tonnage"
    },
    {
      name: "Food Processing Companies",
      description: "Consistent quality spice raw materials for ready-to-eat foods, sauces, and snacks.",
      icon: Utensils,
      tag: "FSSAI Grade"
    },
    {
      name: "Restaurants & Catering",
      description: "Premium aromatic whole spices for high-volume commercial kitchens and HORECA.",
      icon: Utensils,
      tag: "HORECA Pack"
    },
    {
      name: "Hotels & Hospitality",
      description: "Top-tier whole spices for luxury hotel dining, banquets, and resort kitchens.",
      icon: Hotel,
      tag: "Gourmet Grade"
    },
    {
      name: "Retail Chains & Supermarkets",
      description: "Clean, sorted raw spices customized for private label consumer packaging.",
      icon: ShoppingBag,
      tag: "Private Label"
    },
    {
      name: "Grocery Distributors",
      description: "Reliable wholesale stock for regional spice mandis, traders, and wholesalers.",
      icon: Store,
      tag: "Wholesale Mandi"
    },
    {
      name: "Spice Exporters",
      description: "ASTA standard Sortex cleaned spices packed in export-compliant container loads.",
      icon: Globe,
      tag: "ASTA Standards"
    },
    {
      name: "Ayurvedic Manufacturers",
      description: "Pharma-grade spices like Black Pepper, Cloves, Ginger & Amla for classical formulations.",
      icon: Leaf,
      tag: "Pharma Grade"
    },
    {
      name: "Homeopathic Manufacturers",
      description: "Botanically identified whole spices and seed raw materials for homeopathic mother tinctures.",
      icon: FlaskConical,
      tag: "High Purity"
    }
  ];

  return (
    <section className="py-28 md:py-36 bg-[#213833] border-t border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header */}
        <div className="max-w-xl mb-20 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
            Target Sectors
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#D0D9D8]">
            Industries We Serve
          </h2>
          <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
            Supplying raw spices tailored to specific industrial grade specifications and metric-ton capacity.
          </p>
        </div>

        {/* 3-Column Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;

            return (
              <div
                key={ind.name}
                className="bg-[#172925] border border-white/10 rounded-2xl p-8 space-y-4 group hover:border-[#769489]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#213833] border border-white/[0.1] text-[#769489] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#769489] px-3 py-1 rounded-full bg-[#213833] border border-white/[0.1] tracking-widest uppercase">
                    {ind.tag}
                  </span>
                </div>

                <h3 className="text-lg font-serif text-[#D0D9D8] group-hover:text-[#769489] transition-colors">
                  {ind.name}
                </h3>

                <p className="text-xs text-[#98B4A1] font-light leading-relaxed">
                  {ind.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
