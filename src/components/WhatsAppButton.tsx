"use client";

import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919958833536?text=Hello%20Shiva%20Jadibuti%20Store%2C%20I%20want%20to%20inquire%20about%20bulk%20herbal%20supplies."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 text-white shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white/30"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
      <MessageSquare className="w-7 h-7 relative z-10 fill-white" />
    </motion.a>
  );
};
