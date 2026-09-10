"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SpiceHeroSection } from "@/components/raw-spices/SpiceHeroSection";
import { SpiceProductsSection } from "@/components/raw-spices/SpiceProductsSection";
import { WhyBuyFromUsSection } from "@/components/raw-spices/WhyBuyFromUsSection";
import { IndustriesServedSection } from "@/components/raw-spices/IndustriesServedSection";
import { SpiceGallerySection } from "@/components/raw-spices/SpiceGallerySection";
import { BulkOrderCTA } from "@/components/raw-spices/BulkOrderCTA";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { AuthModal } from "@/components/AuthModal";
import { AskShivaFloatingButton, AskShivaChat } from "@/components/AskShiva";

export const RawSpicesClientContent = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState<string | undefined>(undefined);
  const [askShivaOpen, setAskShivaOpen] = useState(false);

  const handleOpenQuoteModal = (productName?: string) => {
    setQuoteInitialProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#172925] text-[#D0D9D8] selection:bg-[#769489] selection:text-[#172925]">
      {/* Sticky Navigation Header */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Spice Hero Section with Background Video */}
      <SpiceHeroSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Spice Products Catalog Section */}
      <SpiceProductsSection onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Why Buy From Us Value Pillars */}
      <WhyBuyFromUsSection />

      {/* Industries We Serve */}
      <IndustriesServedSection />

      {/* Infrastructure & Spice Gallery */}
      <SpiceGallerySection />

      {/* Bulk Order CTA */}
      <BulkOrderCTA onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Footer */}
      <Footer />

      {/* Request Quote Modal */}
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

      {/* Floating Action Buttons */}
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
};
