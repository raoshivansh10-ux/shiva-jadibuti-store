export interface GalleryItem {
  id: string;
  title: string;
  category: "Farms" | "Warehouse" | "Processing" | "Raw Herbs" | "Packaging";
  image: string;
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Organic Herbal Farm Sourcing",
    category: "Farms",
    image: "/images/g1_organic_farm.jpg",
    description: "Sustainably cultivated medicinal herbal plantations under organic supervision."
  },
  {
    id: "g2",
    title: "Sun-Drying & Moisture Control Unit",
    category: "Processing",
    image: "/images/g2_sun_drying.jpg",
    description: "Hygienic solar drying beds ensuring natural essential oil retention."
  },
  {
    id: "g3",
    title: "Central Bulk Raw Warehouse",
    category: "Warehouse",
    image: "/images/g3_warehouse.jpg",
    description: "Multi-ton temperature-regulated storage facility keeping herbs fresh year-round."
  },
  {
    id: "g4",
    title: "Premium Grade Ashwagandha Roots",
    category: "Raw Herbs",
    image: "/images/g4_ashwagandha.jpg",
    description: "Hand-sorted thick Ashwagandha roots packed with natural active compounds."
  },
  {
    id: "g5",
    title: "Air-Tight Export Packaging",
    category: "Packaging",
    image: "/images/g5_packaging.jpg",
    description: "Heavy duty moisture-proof poly-lined packaging ready for nationwide transit."
  },
  {
    id: "g6",
    title: "Micro-Fine Herb Grinding Mill",
    category: "Processing",
    image: "/images/g6_extract.jpg",
    description: "Precision stainless steel pulverizers milling pure 80-120 mesh powders."
  },
  {
    id: "g7",
    title: "Wild Harvested Neem & Tulsi Fields",
    category: "Farms",
    image: "/images/neem_tulsi_field.jpg",
    description: "Fresh green leaf harvesting from clean pesticide-free agroforestry reserves."
  },
  {
    id: "g8",
    title: "Deseeded Triphala Raw Inventory",
    category: "Raw Herbs",
    image: "/images/triphala_inventory.jpg",
    description: "Thoroughly washed and dried Amla, Harad, and Baheda fruit rinds."
  }
];
