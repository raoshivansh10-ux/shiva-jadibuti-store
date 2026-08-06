"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/data/faqs";
import { HelpCircle, ChevronDown } from "lucide-react";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-28 bg-[#232A1A] text-[#FFEFC5] relative border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#C98271] bg-[#3A452C] px-3.5 py-1.5 rounded-full border border-white/[0.08]"
          >
            <HelpCircle className="w-4 h-4 text-[#C98271]" />
            <span>Frequently Asked Questions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-bold text-[#FFEFC5]"
          >
            Wholesale Procurement <span className="gold-gradient-text">FAQ</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#C2CCA8] leading-relaxed"
          >
            Find answers regarding minimum order quantities, pan-India delivery, quality lab reports, and payment terms.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#3A452C] rounded-2xl overflow-hidden border border-white/[0.08] shadow-md hover:border-[#C98271]/40 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-base font-serif font-bold text-[#FFEFC5]">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-full bg-[#232A1A] text-[#C98271] transform transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#C98271] text-[#232A1A]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#C2CCA8] leading-relaxed border-t border-white/[0.06] pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
