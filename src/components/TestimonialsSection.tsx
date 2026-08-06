"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/data/testimonials";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-28 bg-[#172925] text-[#D0D9D8] relative border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#769489] bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/[0.1]"
          >
            <Quote className="w-4 h-4 text-[#769489]" />
            <span>Buyer Feedback</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#D0D9D8]"
          >
            Trusted by <span className="gold-gradient-text">Pharmaceutical & Export Leaders</span>
          </motion.h2>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative bg-[#213833] rounded-3xl p-8 sm:p-12 border border-white/[0.1] shadow-xl max-w-4xl mx-auto">
          <Quote className="w-16 h-16 text-[#98B4A1]/20 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Rating */}
              <div className="flex space-x-1 text-[#769489]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#769489]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg md:text-xl font-serif text-[#D0D9D8] leading-relaxed italic">
                "{current.quote}"
              </p>

              {/* Client Info */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {current.image && (
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#769489]/40 shadow"
                    />
                  )}
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#D0D9D8]">
                      {current.name}
                    </h3>
                    <p className="text-xs text-[#98B4A1] font-medium">
                      {current.role} — <span className="text-[#98B4A1]">{current.company}</span>
                    </p>
                    <span className="text-[11px] text-[#98B4A1]/80 block">
                      📍 {current.location}
                    </span>
                  </div>
                </div>

                {/* Slider Nav Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={prevTestimonial}
                    aria-label="Previous Testimonial"
                    className="p-2.5 rounded-xl bg-[#172925] border border-white/[0.1] text-[#D0D9D8] hover:text-[#769489] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    aria-label="Next Testimonial"
                    className="p-2.5 rounded-xl bg-[#172925] border border-white/[0.1] text-[#D0D9D8] hover:text-[#769489] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === i ? "w-8 bg-[#769489]" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
