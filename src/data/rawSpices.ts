export interface SpiceProduct {
  id: string;
  name: string;
  hindiName: string;
  scientificName: string;
  category: "Whole Spices" | "Dry Herbs" | "Seeds & Raw Materials";
  grade: string;
  origin: string;
  packaging: string;
  bulkSupply: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  uses: string[];
}

export const RAW_SPICES: SpiceProduct[] = [
  {
    id: "black-pepper",
    name: "Black Pepper (Tellicherry Garbled)",
    hindiName: "काली मिर्च (Kali Mirch)",
    scientificName: "Piper nigrum",
    category: "Whole Spices",
    grade: "Garbled TGSEB / Tellicherry Bold",
    origin: "Malabar Coast, Kerala, India",
    packaging: "25kg / 50kg Jute Bags & PP Bags",
    bulkSupply: "500 Kg - 50 Metric Tons",
    image: "/images/category_barks.png",
    shortDescription: "High-piperine garbled black pepper berries harvested from traditional Kerala spice gardens.",
    fullDescription: "Premium hand-picked Tellicherry & Malabar Garbled Extra Bold black pepper. Rich in piperine content (> 5%), intense pungent aroma, and zero dark mold or extraneous matter.",
    uses: ["Spice Blends & Masalas", "Pharma Extract Extraction", "Meat Processing", "Ayurvedic Trikatu Churna"]
  },
  {
    id: "white-pepper",
    name: "Safed Musli & White Pepper",
    hindiName: "सफेद मूसली व मिर्च (Safed Musli / Mirch)",
    scientificName: "Chlorophytum borivilianum / Piper nigrum",
    category: "Whole Spices",
    grade: "Grade A Double Washed Decorticated",
    origin: "Idukki, Kerala & MP, India",
    packaging: "25kg Multi-Layer Kraft Paper / PP Bags",
    bulkSupply: "250 Kg - 20 Metric Tons",
    image: "/images/musli_minimal.png",
    shortDescription: "Decorticated white pepper corns and premium peeled Safed Musli finger roots.",
    fullDescription: "Produced by soaking fully ripe red pepper berries in natural running spring water to strip the pericarp, followed by hygienic sun drying. Smooth ivory tone and clean taste.",
    uses: ["White Sauces & Soups", "Gourmet Seasonings", "Pharma Formulations", "HORECA Wholesale"]
  },
  {
    id: "green-cardamom",
    name: "Green Cardamom (Idukki AGEB)",
    hindiName: "हरी इलायची (Hari Elaichi)",
    scientificName: "Elettaria cardamomum",
    category: "Whole Spices",
    grade: "8mm+ Super Extra Bold Green (AGEB)",
    origin: "Western Ghats, Bodinayakanur & Idukki",
    packaging: "10kg Vacuum Bags / 25kg Master Cartons",
    bulkSupply: "100 Kg - 15 Metric Tons",
    image: "/images/category_herbs.png",
    shortDescription: "Vibrant emerald green pods bursting with rich essential cineole oils.",
    fullDescription: "Queen of Spices sourced directly from high-altitude shade plantations in Idukki. Naturally kiln-cured to preserve deep green pigmentation, intense aroma, and plump seed density.",
    uses: ["Sweets & Confectionery", "Tea & Beverage Blends", "Garam Masala", "Ayurvedic Digestives"]
  },
  {
    id: "kashmiri-saffron",
    name: "Kashmiri Saffron (Mongra)",
    hindiName: "केसर (Kesar)",
    scientificName: "Crocus sativus",
    category: "Seeds & Raw Materials",
    grade: "Grade A++ Premium Crimson Stigmas",
    origin: "Pampore, Kashmir, India",
    packaging: "10g / 100g / 1kg Glass Vials",
    bulkSupply: "1 Kg - 100 Kg",
    image: "/images/saffron_minimal.png",
    shortDescription: "Pure hand-harvested deep crimson saffron strands rich in safranal and crocin.",
    fullDescription: "Authentic Pampore Kashmiri Mongra saffron featuring deep red threads with zero style yellow waste. Lab tested for high coloring strength (> 230) and distinct aroma.",
    uses: ["Luxury Confectionery", "Pharma Formulations", "Royal Masala Extracts", "Ayurvedic Kumkumadi"]
  },
  {
    id: "ashwagandha-root",
    name: "Ashwagandha Roots (Nagori)",
    hindiName: "अश्वगंधा (Ashwagandha)",
    scientificName: "Withania somnifera",
    category: "Whole Spices",
    grade: "Nagori Thick Whole Roots (Withanolide > 2.5%)",
    origin: "Neemuch, Madhya Pradesh, India",
    packaging: "25kg / 50kg Jute Sacks",
    bulkSupply: "500 Kg - 50 Metric Tons",
    image: "/images/ashwagandha_minimal.png",
    shortDescription: "High-potency adaptogenic roots rich in Withanolides for stamina & stress formulation.",
    fullDescription: "Directly sourced from trusted cultivation belts of Neemuch & Mandsaur. Thoroughly sun-dried, sorted, and cleaned. High root density with standard Withanolide concentration.",
    uses: ["Immunity Boosters", "Stress Relief Tablets", "Rasayana Formulations", "General Tonics"]
  },
  {
    id: "shilajit-resin",
    name: "Himalayan Shilajit Resin",
    hindiName: "शिलाजीत (Pure Shilajit)",
    scientificName: "Asphaltum punjabianum",
    category: "Seeds & Raw Materials",
    grade: "Purified Suryatapi Black Gold Grade (Fulvic > 60%)",
    origin: "High Altitude Himalayas (16,000 ft)",
    packaging: "1kg / 5kg / 25kg Food Grade Drums",
    bulkSupply: "50 Kg - 5 Metric Tons",
    image: "/images/shilajit_minimal.png",
    shortDescription: "Purified Himalayan mineral pitch rich in fulvic acid and 84+ ionic trace minerals.",
    fullDescription: "Authentic raw Shilajit exudate purified using traditional Shodhana water filtration and gentle solar evaporation. Guarantees > 60% fulvic acid with zero heavy metal contamination.",
    uses: ["Vitality Capsules", "Nutraceutical Blends", "Ayurvedic Formulations", "Sports Supplements"]
  },
  {
    id: "tulsi-leaves",
    name: "Shyama Tulsi Leaves",
    hindiName: "तुलसी पत्ती (Tulsi Leaves)",
    scientificName: "Ocimum sanctum",
    category: "Dry Herbs",
    grade: "Shade Dried Emerald Cut (Eugenol > 1.5%)",
    origin: "Bundelkhand & UP, India",
    packaging: "10kg / 25kg Multi-layer Bags",
    bulkSupply: "200 Kg - 20 Metric Tons",
    image: "/images/tulsi_minimal.png",
    shortDescription: "Aromatic shade-dried Holy Basil leaves retaining natural volatile oils.",
    fullDescription: "Organically grown Krishna & Rama Tulsi leaves harvested at dawn. Low-temperature shade dried to preserve rich eugenol essential oil and deep green tone.",
    uses: ["Herbal Teas & Infusions", "Kasa Cough Syrups", "Respiratory Tonics", "Antioxidant Blends"]
  },
  {
    id: "giloy-stem",
    name: "Neem Giloy Stem (Amrita)",
    hindiName: "गिलोय (Giloy Stick)",
    scientificName: "Tinospora cordifolia",
    category: "Dry Herbs",
    grade: "Neem-Climbing Mature Cut Stem",
    origin: "Western Ghats & MP Forests",
    packaging: "25kg / 50kg Jute Sacks",
    bulkSupply: "500 Kg - 30 Metric Tons",
    image: "/images/giloy_minimal.png",
    shortDescription: "Mature Neem-tree climbing Giloy stems packed with bitter glucoside.",
    fullDescription: "High-grade Neem Giloy climbing naturally on wild Neem trees for maximal therapeutic efficacy. Machine cut into clean finger-length pieces, dried to precise moisture levels.",
    uses: ["Immune Modulators", "Antipyretic Syrups", "Dengue Care", "Jwaradhara Decoctions"]
  }
];
