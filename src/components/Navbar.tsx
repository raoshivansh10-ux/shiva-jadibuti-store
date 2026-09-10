"use client";

import { PillNav } from "@/components/PillNav/PillNav";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const Navbar = ({ onOpenQuoteModal }: NavbarProps) => {
  const navItems = [
    { label: "Shop Retail", href: "/shop" },
    { label: "Products", href: "/#products" },
    { label: "Spices", href: "/raw-spices" },
    { label: "Categories", href: "/#categories" },
    { label: "Health", href: "/#health-solutions" },
    { label: "Orders", href: "/orders" },
    { label: "Why Us", href: "/#why-us" },
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
