"use client";

import { motion } from "framer-motion";
import { MapPin, Truck, ShieldCheck, Clock, Globe } from "lucide-react";

export const IndiaCoverageMap = () => {
  const hubLocations = [
    { city: "Haridwar / Delhi NCR", role: "Central Processing & Warehouse Hub", status: "Active Primary Hub" },
    { city: "Unjha / Ahmedabad", role: "Cumin, Fennel & Mustard Sourcing Hub", status: "Regional Depot" },
    { city: "Ramganj Mandi / Jaipur", role: "Coriander & Kasuri Methi Sourcing", status: "Regional Depot" },
    { city: "Idukki / Kochi", role: "Cardamom, Pepper & Spice Origins", status: "Regional Depot" },
    { city: "Mumbai / Navi Mumbai", role: "Port Container & Export Clearing", status: "Export Dispatch Hub" },
    { city: "Kolkata / Siliguri", role: "Eastern India & Black Cardamom Hub", status: "Regional Depot" },
    { city: "Hyderabad / Guntur", role: "Dry Chilli & Turmeric Sourcing", status: "Regional Depot" }
  ];

  return (
    <section className="py-28 bg-[#232A1A] text-[#FFEFC5] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#C98271] bg-[#3A452C] px-3.5 py-1.5 rounded-full border border-white/[0.08]"
          >
            <Globe className="w-4 h-4 text-[#C98271]" />
            <span>Pan-India Supply Network</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FFEFC5]"
          >
            Serving Customers <span className="gold-gradient-text">Across 50+ Cities in India</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#C2CCA8] leading-relaxed"
          >
            Our strategic warehouse nodes and transport tie-ups guarantee 48 to 72 hour B2B bulk deliveries nationwide.
          </motion.p>
        </div>

        {/* Map & Logistics Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Visual Map Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#3A452C] p-6 sm:p-8 rounded-2xl border border-white/[0.08] shadow-xl relative"
          >
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-[#232A1A] border border-white/[0.06] p-6 flex flex-col justify-between">
              
              {/* Map Graphic Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg viewBox="0 0 500 500" className="w-full h-full text-[#C2CCA8] fill-current">
                  <circle cx="250" cy="250" r="200" className="opacity-10" />
                  <circle cx="250" cy="250" r="140" className="opacity-20" />
                  <path d="M250,50 L270,180 L380,200 L290,270 L320,400 L250,330 L180,400 L210,270 L120,200 L230,180 Z" className="opacity-30" />
                </svg>
              </div>

              {/* Glowing Active Pins */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {hubLocations.slice(0, 6).map((hub, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#3A452C] border border-white/[0.08] shadow-md">
                    <div className="flex items-center space-x-1.5 text-[#C98271] mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#C98271]" />
                      <span className="text-[11px] font-bold text-[#FFEFC5]">{hub.city}</span>
                    </div>
                    <span className="text-[10px] text-[#C2CCA8] block font-medium">{hub.status}</span>
                  </div>
                ))}
              </div>

              <div className="relative z-10 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs text-[#C2CCA8]">
                <span className="flex items-center font-bold text-[#C98271]">
                  <Truck className="w-4 h-4 mr-1 text-[#C2CCA8]" /> All 28 Indian States Covered
                </span>
                <span className="text-[#C2CCA8] font-semibold">48-72 Hour Delivery Window</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Logistics Stats Cards */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-[#3A452C] border border-white/[0.08] shadow-md space-y-2"
            >
              <div className="flex items-center space-x-3 text-[#C98271]">
                <Clock className="w-5 h-5" />
                <h3 className="text-base font-serif font-bold text-[#FFEFC5]">48-72 Hour Express Dispatch</h3>
              </div>
              <p className="text-xs text-[#C2CCA8] leading-relaxed font-normal">
                Dedicated fleet partners ensuring door-to-door bulk transportation for pharmaceutical factories, labs, and mandis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-2xl bg-[#3A452C] border border-white/[0.08] shadow-md space-y-2"
            >
              <div className="flex items-center space-x-3 text-[#C2CCA8]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-base font-serif font-bold text-[#FFEFC5]">GST Invoice & Mandi Clearances</h3>
              </div>
              <p className="text-xs text-[#C2CCA8] leading-relaxed font-normal">
                100% legal B2B documentation including GST e-way bills, mandi tax passes, and batch Certificate of Analysis (COA).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-6 rounded-2xl bg-[#3A452C] border border-white/[0.08] shadow-md space-y-2"
            >
              <div className="flex items-center space-x-3 text-[#C98271]">
                <MapPin className="w-5 h-5" />
                <h3 className="text-base font-serif font-bold text-[#FFEFC5]">50+ Commercial City Hubs</h3>
              </div>
              <p className="text-xs text-[#C2CCA8] leading-relaxed font-normal">
                Supplying major herbal hubs like Haridwar, Nagpur, Thrissur, Mumbai, Amritsar, Ahmedabad, Guntur, and Kolkata.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
