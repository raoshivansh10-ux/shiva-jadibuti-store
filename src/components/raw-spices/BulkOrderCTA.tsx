"use client";

import { MessageSquare, Phone, Send, ShieldCheck, Truck } from "lucide-react";

interface BulkOrderCTAProps {
  onOpenQuoteModal: () => void;
}

export const BulkOrderCTA = ({ onOpenQuoteModal }: BulkOrderCTAProps) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello Shiva Jadibuti Store, I am inquiring about Wholesale Raw Spices / Khade Masale bulk quantities and distributor pricing."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-[#213833] text-[#D0D9D8] relative border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center space-y-6">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#172925] text-[#769489] text-xs font-mono tracking-widest uppercase border border-white/[0.1]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>B2B Commercial Procurement</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#D0D9D8]">
          Need Wholesale Quantities?
        </h2>

        <p className="text-sm text-[#98B4A1] font-light max-w-xl mx-auto leading-relaxed">
          Contact Shiva Jadibuti Store for bulk orders, distributor pricing, and customized industrial packaging.
        </p>

        {/* Buttons Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          {/* WhatsApp Now */}
          <button
            onClick={openWhatsApp}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#172925] hover:bg-[#769489] text-[#D0D9D8] hover:text-[#172925] border border-white/10 font-normal text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#769489]" />
            <span>WhatsApp Now</span>
          </button>

          {/* Call Now */}
          <a
            href="tel:+919876543210"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#172925] hover:bg-[#769489] text-[#D0D9D8] hover:text-[#172925] border border-white/10 font-normal text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all"
          >
            <Phone className="w-4 h-4 text-[#769489]" />
            <span>Call (+91 98765 43210)</span>
          </a>

          {/* Request Quote */}
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center space-x-2 transition-transform active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Get Quote</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-[#98B4A1] font-light">
          <span className="flex items-center">
            <Truck className="w-3.5 h-3.5 mr-1.5 text-[#769489]" /> Pan-India Express Logistics
          </span>
          <span>•</span>
          <span>GST Invoice & Mandi Clearances</span>
          <span>•</span>
          <span>Customized Industrial Packaging</span>
        </div>

      </div>
    </section>
  );
};
