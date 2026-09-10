"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustedClientsSection } from "@/components/TrustedClientsSection";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { HealthSolutionsSection } from "@/components/HealthSolutionsSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { AuthModal } from "@/components/AuthModal";
import { AskShivaFloatingButton, AskShivaChat } from "@/components/AskShiva";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState<string | undefined>(undefined);
  const [askShivaOpen, setAskShivaOpen] = useState(false);

  // Ensure the page always starts strictly from the top on reload/load
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  const handleOpenQuoteModal = (productName?: string) => {
    setQuoteInitialProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#172925] text-[#D0D9D8] selection:bg-[#769489] selection:text-[#172925]">
      
      {/* 1. Floating Pill Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 2. Full-Screen Cinematic Hero (Movie Poster) */}
      <HeroSection onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 3. Trusted By Minimal Typography Ticker */}
      <TrustedClientsSection />

      {/* 4. Stats & Feature Highlights with Interactive BorderGlow Cards */}
      <StatsSection />

      {/* 5. About Us (Brand Story Split Layout + Timeline) */}
      <AboutSection />

      {/* 5. Core Categories (Large Full-Width Horizontal Banner Panels) */}
      <CategoriesSection />

      {/* 6. Quality Process (Vertical Journey Line: Farm -> Sorting -> Testing -> Packaging -> Dispatch) */}
      <ProcessSection />

      {/* 7. Targeted Ailments & Ayurvedic Botanical Remedies */}
      <HealthSolutionsSection onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 8. Target Industries We Supply (Full-Width Accordion Sector Rows) */}
      <WhyChooseUsSection />

      {/* 9. Contact & Wholesale Inquiry (Trust & Action Split) */}
      <ContactSection />

      {/* 11. Minimal Luxury Footer */}
      <Footer />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteInitialProduct}
      />

      {/* Sliding Quote Cart Drawer */}
      <CartDrawer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Sliding Wishlist Drawer */}
      <WishlistDrawer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Authentication Login & Signup Modal */}
      <AuthModal />

      {/* Ask Shiva AI Floating Button & Chat Assistant */}
      <AskShivaFloatingButton onClick={() => setAskShivaOpen(true)} />
      <AskShivaChat
        isOpen={askShivaOpen}
        onClose={() => setAskShivaOpen(false)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Floating Actions */}
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
}
