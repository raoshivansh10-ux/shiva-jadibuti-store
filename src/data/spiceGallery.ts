export interface SpiceGalleryItem {
  id: string;
  title: string;
  category: "Whole Spices" | "Spice Warehouses" | "Packaging" | "Sorting Process" | "Drying Process" | "Bulk Storage";
  image: string;
  description: string;
}

export const SPICE_GALLERY_ITEMS: SpiceGalleryItem[] = [
  {
    id: "sg1",
    title: "High-Altitude Malabar Cardamom & Pepper Farms",
    category: "Whole Spices",
    image: "/images/process_farm.png",
    description: "Traditional spice gardens cultivating high-essential-oil cardamom and black pepper."
  },
  {
    id: "sg2",
    title: "Hygienic Solar Drying Beds for Whole Spices",
    category: "Drying Process",
    image: "/images/process_sorting.png",
    description: "Enclosed solar dryers ensuring optimal moisture removal while preserving natural aromatic oils."
  },
  {
    id: "sg3",
    title: "Sortex Optical Machine Sorting Line",
    category: "Sorting Process",
    image: "/images/process_testing.png",
    description: "State-of-the-art optical color sorters removing discolored seeds, husks, and micro-impurities."
  },
  {
    id: "sg4",
    title: "Temperature-Controlled Central Spice Warehouse",
    category: "Spice Warehouses",
    image: "/images/category_barks.png",
    description: "Modern B2B warehouse facility storing multi-ton inventory under humidity-controlled conditions."
  },
  {
    id: "sg5",
    title: "Multi-Layer Vacuum & Poly-Lined Export Bags",
    category: "Packaging",
    image: "/images/shilajit_minimal.png",
    description: "Heavy-duty 25kg / 50kg moisture-proof packaging prepared for long-distance domestic & export shipping."
  },
  {
    id: "sg6",
    title: "Bulk Storage Sacks of Cumin & Coriander",
    category: "Bulk Storage",
    image: "/images/musli_minimal.png",
    description: "Palletized bulk storage ready for fast dispatch to food processors and spice manufacturers."
  },
  {
    id: "sg7",
    title: "Hand-Sorted Tellicherry Black Pepper Berries",
    category: "Sorting Process",
    image: "/images/ashwagandha_minimal.png",
    description: "Meticulous hand-grading of extra bold Tellicherry pepper corns."
  },
  {
    id: "sg8",
    title: "Solar Dehydrated Red Chilli & Turmeric Storage",
    category: "Drying Process",
    image: "/images/saffron_minimal.png",
    description: "Uniformly sun-dried red chillies and polished golden turmeric fingers."
  }
];
