import type { Metadata } from "next";
import { RawSpicesClientContent } from "./RawSpicesClientContent";

export const metadata: Metadata = {
  title: "Wholesale Spices Supplier | Khade Masale Supplier India | Shiva Jadibuti Store",
  description: "Pan-India B2B wholesale supplier and trader of premium quality whole spices (Khade Masale), dry herbs, and raw spice materials for spice manufacturers, food processing industries, restaurants, exporters, and retailers.",
  keywords: [
    "Wholesale Spices Supplier",
    "Khade Masale Supplier",
    "Whole Spices Wholesale",
    "Bulk Spice Supplier India",
    "Natural Spices",
    "Premium Whole Spices",
    "Raw Spice Materials",
    "Spice Trader",
    "Black Pepper Wholesale",
    "Cardamom Bulk Supplier",
    "Cumin Seeds Wholesale",
    "Cinnamon Cloves Trader"
  ],
  openGraph: {
    title: "Wholesale Raw Spices (Khade Masale) Supplier | Shiva Jadibuti Store",
    description: "High-quality whole spices in bulk quantities with guaranteed freshness, purity, and competitive wholesale pricing.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RawSpicesPage() {
  return <RawSpicesClientContent />;
}
