export interface Category {
  id: string;
  name: string;
  count: string;
  description: string;
  iconName: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "Medicinal Herbs",
    name: "Medicinal Herbs",
    count: "120+ Products",
    description: "Whole plants, aerial parts, and wild-harvested botanical herbs for pharmaceutical extraction.",
    iconName: "Sprout",
    image: "/images/category_herbs.png"
  },
  {
    id: "Roots",
    name: "Roots & Rhizomes",
    count: "85+ Products",
    description: "High-active dried roots including Ashwagandha, Shatavari, Safed Musli, and Mulethi.",
    iconName: "GitCommit",
    image: "/images/category_roots.png"
  },
  {
    id: "Bark",
    name: "Tree Bark",
    count: "40+ Products",
    description: "Sun-dried therapeutic tree barks like Arjun, Cinnamon, Ashok, and Neem bark slices.",
    iconName: "Trees",
    image: "/images/category_barks.png"
  },
  {
    id: "Seeds",
    name: "Herbal Seeds",
    count: "60+ Products",
    description: "Clean, germinable and oil-grade seeds including Methi, Kalonji, Isabgol, and Tukmaria.",
    iconName: "Dot",
    image: "/images/saffron_minimal.png"
  },
  {
    id: "Leaves",
    name: "Herbal Leaves",
    count: "75+ Products",
    description: "Shade-dried aromatic and therapeutic leaves like Neem, Tulsi, Senna, and Adhatoda.",
    iconName: "Leaf",
    image: "/images/tulsi_minimal.png"
  },
  {
    id: "Flowers",
    name: "Medicinal Flowers",
    count: "35+ Products",
    description: "Whole dried blossoms including Hibiscus, Chamomile, Palash, Rose petals, and Lotus.",
    iconName: "Flower2",
    image: "/images/musli_minimal.png"
  },
  {
    id: "Fruits",
    name: "Dry Fruits & Pods",
    count: "50+ Products",
    description: "Whole & deseeded raw fruits like Amla, Harad, Baheda, Gokhru, and Amaltas pods.",
    iconName: "Apple",
    image: "/images/ashwagandha_minimal.png"
  },
  {
    id: "Natural Gums",
    name: "Natural Gums & Resins",
    count: "30+ Products",
    description: "Pure natural exudates like Guggul, Gond Katira, Salai Guggul (Boswellia), and Asafoetida.",
    iconName: "Droplets",
    image: "/images/shilajit_minimal.png"
  },
  {
    id: "Herbs Powder",
    name: "Herbs Powder (Churna)",
    count: "150+ Products",
    description: "Micro-milled 80 to 120 mesh pure single-herb powders without carriers or fillers.",
    iconName: "Sparkles",
    image: "/images/moringa_minimal.png"
  },
  {
    id: "Spices",
    name: "Medicinal Spices",
    count: "45+ Products",
    description: "Pharma-grade spices like Ceylon Cinnamon, Black Pepper, Dry Ginger (Sonth), and Long Pepper.",
    iconName: "Flame",
    image: "/images/saffron_minimal.png"
  },
  {
    id: "Dry Herbs",
    name: "Dry Herbs & Shreds",
    count: "90+ Products",
    description: "Coarse cut and tea-bag cut (TBC) herbs customized for wellness teas & decoctions.",
    iconName: "Wind",
    image: "/images/giloy_minimal.png"
  },
  {
    id: "Herbal Extract Raw Material",
    name: "Herbal Extract Raw Material",
    count: "65+ Products",
    description: "High potency raw herbs specifically selected for standardized botanical extract manufacturing.",
    iconName: "FlaskConical",
    image: "/images/process_testing.png"
  }
];
