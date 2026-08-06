"use client";

import { Building2 } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 md:py-36 bg-[#213833] border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Asymmetric Split Layout: Left Large Editorial Photo | Right Story & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Warehouse Photo & Heritage Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#172925]">
              <img
                src="/images/process_farm.png"
                alt="Shiva Jadibuti Central Wholesale Warehouse"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172925] via-transparent to-transparent opacity-80" />

              {/* Floating Heritage Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#172925]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#213833] text-[#769489] border border-white/10 flex items-center justify-center font-serif text-lg font-bold">
                    30+
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block">Herbal Legacy</span>
                    <span className="text-sm font-serif text-[#D0D9D8]">Established 1994 in Delhi</span>
                  </div>
                </div>
                <Building2 className="w-5 h-5 text-[#98B4A1]" />
              </div>
            </div>
          </div>

          {/* Right Column: Story & 3-Step Milestones Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block mb-3">
                Our Heritage & Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8] leading-tight">
                Three Decades of Uncompromising Botanical Integrity
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#D0D9D8]/80 font-light leading-relaxed">
              Founded in 1994 in Asia&apos;s largest commercial spice and herbal mandi (Khari Baoli, Delhi), Shiva Jadibuti Store has evolved from a traditional mandi trading firm into India&apos;s premier B2B wholesale supplier of laboratory-tested raw botanicals and medicinal spices.
            </p>

            {/* 3-Step Milestones Vertical Timeline */}
            <div className="pt-4 border-t border-white/[0.08] space-y-6">
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#172925] text-[#769489] border border-white/10 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold">
                  01
                </div>
                <div>
                  <h4 className="text-base font-serif text-[#D0D9D8]">1994 — Foundational Mandi Operations</h4>
                  <p className="text-xs text-[#98B4A1] font-light mt-1">Established direct farm-sourcing networks across Malabar, Madhya Pradesh, and Himalayan belts.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#172925] text-[#769489] border border-white/10 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold">
                  02
                </div>
                <div>
                  <h4 className="text-base font-serif text-[#D0D9D8]">2008 — Laboratory Protocol & Sortex Cleaning</h4>
                  <p className="text-xs text-[#98B4A1] font-light mt-1">Integrated optical color sorters, moisture testing, and active alkaloid CoA testing for pharma clients.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#172925] text-[#769489] border border-white/10 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold">
                  03
                </div>
                <div>
                  <h4 className="text-base font-serif text-[#D0D9D8]">2026 — Pan-India B2B Supply & Export Desk</h4>
                  <p className="text-xs text-[#98B4A1] font-light mt-1">Supplying 500+ pharmaceutical manufacturers, spice brands, and international extract processors.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
