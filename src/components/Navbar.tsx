"use client";

import { PillNav } from "@/components/PillNav/PillNav";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const Navbar = ({ onOpenQuoteModal }: NavbarProps) => {
  const navItems = [
    { label: "Products", href: "/#products" },
    { label: "Raw Spices", href: "/raw-spices" },
    { label: "Categories", href: "/#categories" },
    { label: "Health Cures", href: "/#health-solutions" },
    { label: "Why Us", href: "/#why-us" },
    { label: "Process", href: "/#process" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" }
  ];

  return (
    <PillNav
      items={navItems}
      baseColor="#172925"
      pillColor="#213833"
      pillTextColor="#D0D9D8"
      hoveredPillTextColor="#172925"
      onOpenQuoteModal={onOpenQuoteModal}
    />
  );
};
