"use client";

import Dock, { DockItemData } from "./Dock/Dock";
import { generateProductCataloguePDF } from "@/utils/pdfGenerator";
import { Home, Sparkles, Send, Download, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

interface GlobalDockProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const GlobalDock = ({ onOpenQuoteModal }: GlobalDockProps) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const { user, setIsAuthModalOpen } = useAuth();

  const dockItems: DockItemData[] = [
    {
      icon: <Home className="w-[18px] h-[18px]" />,
      label: "Home Catalog",
      href: "/#products"
    },
    {
      icon: <Sparkles className="w-[18px] h-[18px] text-[#769489]" />,
      label: "Raw Spices",
      href: "/raw-spices"
    },
    {
      icon: <User className="w-[18px] h-[18px] text-[#769489]" />,
      label: user ? `Account: ${user.name}` : "Sign In / Register",
      onClick: () => setIsAuthModalOpen(true)
    },
    {
      icon: (
        <div className="relative">
          <Heart className={`w-[18px] h-[18px] ${totalWishlistItems > 0 ? "fill-rose-400 text-rose-400" : "text-rose-400"}`} />
          {totalWishlistItems > 0 && (
            <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-extrabold flex items-center justify-center">
              {totalWishlistItems}
            </span>
          )}
        </div>
      ),
      label: `Wishlist (${totalWishlistItems})`,
      onClick: () => setIsWishlistOpen(true)
    },
    {
      icon: (
        <div className="relative">
          <ShoppingBag className="w-[18px] h-[18px] text-[#769489]" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-[#769489] text-[#172925] text-[8px] font-extrabold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      ),
      label: `Quote Cart (${totalItems})`,
      onClick: () => setIsCartOpen(true)
    },
    {
      icon: <WhatsAppIcon />,
      label: "WhatsApp",
      href: "https://wa.me/919876543210?text=Hello%20Shiva%20Jadibuti%20Store%2C%20I%20am%20inquiring%20about%20wholesale%20botanicals."
    },
    {
      icon: <Download className="w-[18px] h-[18px]" />,
      label: "PDF Catalog",
      onClick: () => generateProductCataloguePDF()
    },
    {
      icon: <Send className="w-[18px] h-[18px] text-[#769489]" />,
      label: "Get Quote",
      onClick: () => onOpenQuoteModal()
    }
  ];

  return (
    <Dock
      items={dockItems}
      panelHeight={60}
      baseItemSize={44}
      magnification={66}
      distance={160}
    />
  );
};
