export interface RetailVariant {
  id: string;
  size: string; // e.g. "100 g", "250 g", "500 g", "1 Kg"
  price: number; // Selling Price in INR
  mrp: number; // Maximum Retail Price (strikethrough)
  stock: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  botanicalName: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  bulkAvailability: string;
  moq?: string;
  cutForm?: string;
  moistureLevel?: string;
  originRegion?: string;
  moistureContent: string;
  form: string;
  image: string;
  featured?: boolean;
  uses: string[];

  // Retail B2C Fields
  retailEnabled?: boolean;
  retailPrice?: number;
  retailVariants?: RetailVariant[];
  retailStock?: number;
  retailRating?: number;
  retailReviewsCount?: number;

  // Wholesale B2B Fields
  wholesaleEnabled?: boolean;
  wholesaleMoq?: string;
  wholesaleUnit?: string;
}

/**
 * Generate standard, market-accurate Ayurvedic retail packaging variants
 */
export function generateRetailVariants(basePrice100g: number): RetailVariant[] {
  const p100 = basePrice100g;
  const p250 = Math.round(basePrice100g * 2.3);
  const p500 = Math.round(basePrice100g * 4.2);
  const p1kg = Math.round(basePrice100g * 7.8);

  return [
    {
      id: "100g",
      size: "100 g",
      price: p100,
      mrp: Math.round(p100 * 1.3),
      stock: 65,
      inStock: true,
    },
    {
      id: "250g",
      size: "250 g",
      price: p250,
      mrp: Math.round(p250 * 1.3),
      stock: 45,
      inStock: true,
    },
    {
      id: "500g",
      size: "500 g",
      price: p500,
      mrp: Math.round(p500 * 1.3),
      stock: 30,
      inStock: true,
    },
    {
      id: "1kg",
      size: "1 Kg",
      price: p1kg,
      mrp: Math.round(p1kg * 1.3),
      stock: 20,
      inStock: true,
    },
  ];
}

/**
 * Helper to get retail variants for any product with realistic fallback
 */
export function getProductRetailVariants(p: { id: string; name: string; category?: string; retailVariants?: RetailVariant[]; retailPrice?: number }): RetailVariant[] {
  if (p.retailVariants && p.retailVariants.length > 0) {
    return p.retailVariants;
  }

  const id = p.id.toLowerCase();
  const name = p.name.toLowerCase();

  // Super-premium items
  if (id.includes("musli") || name.includes("musli")) {
    return generateRetailVariants(399);
  }
  if (id.includes("saffron") || name.includes("kesar")) {
    return [
      { id: "1g", size: "1 g", price: 349, mrp: 450, stock: 100, inStock: true },
      { id: "5g", size: "5 g", price: 1599, mrp: 2100, stock: 50, inStock: true },
      { id: "10g", size: "10 g", price: 2999, mrp: 3999, stock: 30, inStock: true },
    ];
  }
  if (id.includes("shilajit") || name.includes("shilajit")) {
    return [
      { id: "20g", size: "20 g Pure Resin", price: 799, mrp: 1099, stock: 80, inStock: true },
      { id: "50g", size: "50 g Pure Resin", price: 1799, mrp: 2499, stock: 45, inStock: true },
      { id: "100g", size: "100 g Pure Resin", price: 3299, mrp: 4499, stock: 25, inStock: true },
    ];
  }
  if (id.includes("cardamom") || id.includes("clove") || id.includes("black-pepper")) {
    return generateRetailVariants(249);
  }
  if (id.includes("ashwagandha") || id.includes("shatavari") || id.includes("mulethi") || id.includes("brahmi") || id.includes("moringa") || id.includes("cinnamon")) {
    return generateRetailVariants(189);
  }
  if (id.includes("rose") || id.includes("hibiscus") || id.includes("kalonji") || id.includes("isabgol") || id.includes("arjun")) {
    return generateRetailVariants(169);
  }

  // Standard herbs & powders
  return generateRetailVariants(129);
}

/**
 * Helper to get starting retail price
 */
export function getProductStartingRetailPrice(p: { id: string; name: string; retailPrice?: number; retailVariants?: RetailVariant[] }): number {
  if (p.retailPrice) return p.retailPrice;
  const variants = getProductRetailVariants(p);
  return variants[0]?.price || 129;
}

export const PRODUCTS: Product[] = [
  // -------------------------------------------------------------
  // EXISTING CORE CATALOG (PRESERVED EXACTLY)
  // -------------------------------------------------------------
  {
    id: "ashwagandha-root",
    name: "Ashwagandha Root",
    hindiName: "अश्वगंधा",
    botanicalName: "Withania Somnifera",
    category: "Roots",
    shortDescription: "Premium grade organic Ashwagandha roots rich in Withanolides, ideal for Ayurvedic stress-relief formulations.",
    fullDescription: "Directly sourced from trusted cultivation belts of Madhya Pradesh & Rajasthan. Thoroughly sun-dried, sorted, and cleaned. High roots density with standard Withanolide concentration perfect for extract manufacturing and powder formulation.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moistureContent: "< 8%",
    form: "Whole Dried Roots / Shredded / Powder",
    image: "/images/ashwagandha_minimal.png",
    featured: true,
    uses: ["Immunity boosters", "Stress management tablets", "Vajikarana Rasayana", "General stamina tonics"]
  },
  {
    id: "giloy-stem",
    name: "Giloy Stem (Amrita)",
    hindiName: "गिलोय / गुड़ूची",
    botanicalName: "Tinospora Cordifolia",
    category: "Medicinal Herbs",
    shortDescription: "Pure mature Neem-tree climbing Giloy stems packed with immune-modulating alkaloids and bitter glucoside.",
    fullDescription: "High-grade Neem Giloy (climbing on Neem trees for maximal therapeutic efficacy). Machine cut into clean finger-length pieces, dried to precise moisture levels to eliminate mold risk during bulk transport.",
    bulkAvailability: "1000 Kg - 50 Metric Tons",
    moistureContent: "< 10%",
    form: "Cut Stem Sticks / Coarse Powder",
    image: "/images/giloy_minimal.png",
    featured: true,
    uses: ["Antipyretic syrups", "Immune modulators", "Dengue & platelet care", "Jwaradhara formulations"]
  },
  {
    id: "neem-leaves",
    name: "Neem Leaves",
    hindiName: "नीम पत्ता",
    botanicalName: "Azadirachta Indica",
    category: "Leaves",
    shortDescription: "Shade-dried whole green Neem leaves harvested from chemical-free old-growth trees.",
    fullDescription: "Vibrant green shade-dried Neem leaves retaining essential volatile oils, Nimbin, and Azadirachtin. Free from sand, dust, and yellow degraded leaves. Ideal for cosmetics, blood purifiers, and skin ointments.",
    bulkAvailability: "300 Kg - 10 Metric Tons",
    moistureContent: "< 7%",
    form: "Whole Dried Leaves / Micro Powder",
    image: "/images/neem_minimal.png",
    featured: true,
    uses: ["Skin care products", "Blood purifiers", "Herbal soaps & shampoos", "Antifungal ointments"]
  },
  {
    id: "tulsi-leaves",
    name: "Tulsi Leaves (Holy Basil)",
    hindiName: "तुलसी पत्ती",
    botanicalName: "Ocimum Sanctum",
    category: "Leaves",
    shortDescription: "Aromatic Rama & Shyama Tulsi leaves dried carefully to preserve essential Eugenol content.",
    fullDescription: "Aromatic organic holy basil leaves sourced from certified herbal farms. Organoleptically tested for rich camphoraceous aroma and deep emerald tone. Essential raw ingredient for herbal teas and cough syrups.",
    bulkAvailability: "200 Kg - 15 Metric Tons",
    moistureContent: "< 8%",
    form: "Clean Flakes / TBC (Tea Bag Cut) / Fine Powder",
    image: "/images/tulsi_minimal.png",
    featured: true,
    uses: ["Herbal infusions & teas", "Kasa (cough) syrups", "Respiratory tonics", "Antioxidant supplements"]
  },
  {
    id: "mulethi-root",
    name: "Mulethi / Yashtimadhu (Licorice)",
    hindiName: "मुलेठी / जेठीमध",
    botanicalName: "Glycyrrhiza Glabra",
    category: "Roots",
    shortDescription: "Sweet, high-glycyrrhizin unpeeled licorice roots ideal for throat soothing and digestive formulations.",
    fullDescription: "Selected thick cylindrical Mulethi roots with sweet flavor and high Glycyrrhizic acid content (> 4%). Sourced from pristine harvesting grounds, cleaned of adhering soil, and sorted by grade.",
    bulkAvailability: "500 Kg - 30 Metric Tons",
    moistureContent: "< 9%",
    form: "Whole Sticks / Cut Roots / Extract Grade Powder",
    image: "/images/mulethi_minimal.png",
    featured: true,
    uses: ["Throat lozenges", "Hyperacidity formulas", "Expectorants", "Cosmetics & skin brightening"]
  },
  {
    id: "amla-dry",
    name: "Amla Dry (Indian Gooseberry)",
    hindiName: "सूखा आंवला",
    botanicalName: "Phyllanthus Emblica",
    category: "Fruits",
    shortDescription: "Deseeded high Vitamin C wild green dry Amla pieces for Triphala and Chyawanprash production.",
    fullDescription: "Wild harvested & deseeded whole black/dark brown dry Amla. Rich source of heat-stable natural Vitamin C, gallic acid, and tannins. Thoroughly washed in clean water before drying.",
    bulkAvailability: "1000 Kg - 100 Metric Tons",
    moistureContent: "< 10%",
    form: "Deseeded Seedless Ribs / Whole Dried / Powder",
    image: "/images/amla_minimal.png",
    featured: true,
    uses: ["Chyawanprash raw material", "Triphala Churna", "Hair oils & conditioning powders", "Antioxidant extracts"]
  },
  {
    id: "harad-fruit",
    name: "Harad / Haritaki",
    hindiName: "हरड़ / हरिताकी",
    botanicalName: "Terminalia Chebula",
    category: "Fruits",
    shortDescription: "Grade-A large Badi Harad fruits packed with natural chebulic acid for digestive health.",
    fullDescription: "Thick-walled mature yellow-brown Harad fruits known in Ayurveda as the 'King of Medicines'. Sourced from dense Himalayan foothills. Thoroughly dried with minimal kernel loose ratio.",
    bulkAvailability: "1000 Kg - 50 Metric Tons",
    moistureContent: "< 8%",
    form: "Whole Fruit / Deseeded Rind / Coarse Powder",
    image: "/images/harad_baheda_minimal.png",
    featured: true,
    uses: ["Triphala Churna", "Laxative formulations", "Anorectal health remedies", "Rejuvenating rasayanas"]
  },
  {
    id: "baheda-fruit",
    name: "Baheda / Bibhitaki",
    hindiName: "बहेड़ा",
    botanicalName: "Terminalia Bellirica",
    category: "Fruits",
    shortDescription: "Clean, deseeded Baheda fruit rinds essential for traditional Triphala and asthma remedies.",
    fullDescription: "Uniformly dried Baheda fruit shells free from seed core. Rich in gallic acid, ellagic acid, and tannins. Carefully inspected for moisture content to ensure extended shelf-life.",
    bulkAvailability: "800 Kg - 40 Metric Tons",
    moistureContent: "< 9%",
    form: "Whole Dried / Deseeded Shells / Fine Powder",
    image: "/images/harad_baheda_minimal.png",
    featured: true,
    uses: ["Triphala ingredient", "Kapha pacifying medicines", "Eye drop preparations", "Vocal cord tonics"]
  },
  {
    id: "shatavari-root",
    name: "Shatavari Root",
    hindiName: "शतावरी",
    botanicalName: "Asparagus Racemosus",
    category: "Roots",
    shortDescription: "Pristine white peeled & unpeeled Shatavari roots rich in Steroidal Saponins for female wellness.",
    fullDescription: "Top grade fleshy Shatavari tuberous roots. Carefully processed, deskinned or left whole based on client requirements. High saponin assay percentage guaranteed for bulk extract manufacturers.",
    bulkAvailability: "400 Kg - 20 Metric Tons",
    moistureContent: "< 8%",
    form: "Whole Tubers / Cut Strips / Fine Extract Grade",
    image: "/images/shatavari_minimal.png",
    featured: true,
    uses: ["Galactagogue formulations", "Female hormonal balance", "Strength & vitality tonics", "Stomach ulcer healing"]
  },
  {
    id: "safed-musli",
    name: "Safed Musli",
    hindiName: "सफेद मूसली",
    botanicalName: "Chlorophytum Borivilianum",
    category: "Roots",
    shortDescription: "Premium grade ivory white cultivated Safed Musli finger roots with high mucilage and saponin.",
    fullDescription: "Highest purity grade A export-quality Safed Musli fingers. Bright white tone, crisp texture, zero adulteration. Widely sought after by premier Ayurvedic nutracuetical brands.",
    bulkAvailability: "100 Kg - 5 Metric Tons",
    moistureContent: "< 6%",
    form: "Dry Whole Finger Roots / Powder",
    image: "/images/musli_minimal.png",
    featured: true,
    uses: ["Male stamina tonics", "Nutritional supplements", "Aphrodisiac Rasayana", "Sports nutrition blends"]
  },
  {
    id: "brahmi-herb",
    name: "Brahmi / Gotu Kola",
    hindiName: "ब्राह्मी / मंडूकपर्णी",
    botanicalName: "Bacopa Monnieri",
    category: "Medicinal Herbs",
    shortDescription: "Whole dried Bacopa herb containing high standard Bacosides A & B for brain and memory boosters.",
    fullDescription: "Clean, farm-cultivated whole Bacopa Monnieri plant with roots & leaves intact. Sourced from wetland cultivation fields. Tested for high active Bacoside percentage.",
    bulkAvailability: "300 Kg - 15 Metric Tons",
    moistureContent: "< 7%",
    form: "Whole Dried Plant / Cut Flakes / Powder",
    image: "/images/brahmi_minimal.png",
    featured: true,
    uses: ["Memory enhancers (Medhya Rasayana)", "Nootropic supplements", "Anti-anxiety syrups", "Hair growth oils"]
  },
  {
    id: "senna-leaves",
    name: "Senna Leaves & Pods",
    hindiName: "सेना पत्ती (सनाय)",
    botanicalName: "Cassia Angustifolia",
    category: "Leaves",
    shortDescription: "Prime green Tinnevelly Senna leaves and pods rich in Sennosides A & B for laxatives.",
    fullDescription: "Directly sourced from Tuticorin / Rajasthan Senna belts. Prime green color, clean grading without stems or sand. Highly demanded by European & domestic pharmaceutical exporters.",
    bulkAvailability: "1000 Kg - 80 Metric Tons",
    moistureContent: "< 9%",
    form: "Prime Green Leaves / Whole Pods / Powder",
    image: "/images/senna_minimal.png",
    featured: true,
    uses: ["Pharma laxatives", "Detox teas", "Constipation relief tablets", "Herbal extract raw material"]
  },
  {
    id: "kalmegh-herb",
    name: "Kalmegh (King of Bitters)",
    hindiName: "कालमेघ / भूनिम्ब",
    botanicalName: "Andrographis Paniculata",
    category: "Medicinal Herbs",
    shortDescription: "Potent dry Kalmegh whole herb packed with Andrographolide for liver health and viral defense.",
    fullDescription: "Harvested at peak flowering stage when active bitter Andrographolides reach maximum potency. Dried under hygienic conditions, sifted clean of soil and weeds.",
    bulkAvailability: "500 Kg - 20 Metric Tons",
    moistureContent: "< 8%",
    form: "Whole Dried Plant / Shredded / Powder",
    image: "/images/kalmegh_minimal.png",
    featured: true,
    uses: ["Liver protectant syrups", "Antiviral & anti-infective formulations", "Febrifuge remedies", "Bitter tonic extract"]
  },
  {
    id: "moringa-powder",
    name: "Moringa Leaf & Seeds",
    hindiName: "सहजन / मोरिंगा",
    botanicalName: "Moringa Oleifera",
    category: "Herbs Powder",
    shortDescription: "Nutrient-dense bright green Moringa leaf powder & oil-grade seed kernels.",
    fullDescription: "Cold-processed shade-dried Moringa leaves milled into ultra-fine 80-mesh powder. Retains deep chlorophyll green shade, zero heat degradation during milling.",
    bulkAvailability: "500 Kg - 30 Metric Tons",
    moistureContent: "< 6%",
    form: "Fine Micro Powder / Whole Dried Leaves / Seeds",
    image: "/images/moringa_minimal.png",
    featured: true,
    uses: ["Superfood nutritional powder", "Multivitamin capsules", "Cosmetics & moringa oil extraction", "Diabetes care"]
  },
  {
    id: "arjun-bark",
    name: "Arjun Bark (Arjuna)",
    hindiName: "अर्जुन छाल",
    botanicalName: "Terminalia Arjuna",
    category: "Bark",
    shortDescription: "Thick natural Arjun tree bark rich in Coenzyme Q10 and Arjunic tannins for heart health.",
    fullDescription: "Sustainably debarked from mature Arjun trees without damaging the tree trunk. Thick inner bark slices, rich pinkish-red interior, shade dried for optimal cardiac glycosides retention.",
    bulkAvailability: "1000 Kg - 40 Metric Tons",
    moistureContent: "< 9%",
    form: "Coarse Bark Slices / Shredded Chips / Micro Powder",
    image: "/images/arjun_minimal.png",
    featured: true,
    uses: ["Hridya (cardiac care) formulations", "Blood pressure management", "Cholesterol care syrups", "Astringent decoctions"]
  },

  // -------------------------------------------------------------
  // EXPANDED WHOLESALE CATALOG ADDITIONS
  // -------------------------------------------------------------
  {
    id: "ashoka-bark",
    name: "Ashoka Bark",
    hindiName: "अशोक छाल (Ashok Chhal)",
    botanicalName: "Saraca asoca",
    category: "Bark",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Genuine mature Saraca asoca tree bark sustainably harvested, cleaned, and sun-dried. Free from dirt and extraneous matter, ideal for classical Ayurvedic asava-arishta and uterine wellness formulations.",
    bulkAvailability: "500 Kg - 20 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 9%",
    form: "Whole Dried Bark Slices / Coarse Cut / Powder",
    image: "/images/category_barks.png",
    uses: ["Ayurvedic Asava & Arishta", "Botanical extract manufacturing", "Classical Kashayam preparations", "Female wellness tonics"]
  },
  {
    id: "giloy-powder",
    name: "Giloy Powder (Guduchi Churna)",
    hindiName: "गिलोय चूर्ण (Giloy Churna)",
    botanicalName: "Tinospora cordifolia",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Pure micro-pulverized mature Neem-tree climbing Giloy stem powder with standard bitter glucoside content. Free from carriers, maltodextrin, or anti-caking additives.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 7%",
    form: "Ultra-fine 80-100 Mesh Micro Powder",
    image: "/images/giloy_minimal.png",
    uses: ["Immunity formulations", "Herbal tablets & capsules", "Ayurvedic kwath blends", "Nutraceutical premixes"]
  },
  {
    id: "neem-powder",
    name: "Neem Leaf Powder",
    hindiName: "नीम पत्ता चूर्ण (Neem Churna)",
    botanicalName: "Azadirachta indica",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Shade-dried green Neem leaves milled into fine green powder retaining natural Azadirachtin and bitter terpenoids. Ideal for cosmetics, botanical soaps, and herbal purifying blends.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 6%",
    form: "Fine 80-100 Mesh Green Powder",
    image: "/images/neem_minimal.png",
    uses: ["Herbal cosmetics & face packs", "Skin care formulations", "Natural blood purifier blends", "Ayurvedic soaps & shampoos"]
  },
  {
    id: "amla-powder",
    name: "Amla Powder (Indian Gooseberry)",
    hindiName: "सूखा आंवला चूर्ण (Amla Churna)",
    botanicalName: "Phyllanthus emblica",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Premium deseeded wild Amla fruits pulverized under low-temperature milling to preserve heat-stable natural Vitamin C, gallic acid, and tannins. Ideal for Triphala and hair care blends.",
    bulkAvailability: "500 Kg - 30 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 8%",
    form: "Pure Deseeded Dried Fruit Powder (80 Mesh)",
    image: "/images/amla_minimal.png",
    uses: ["Triphala Churna manufacturing", "Chyawanprash raw material", "Hair oil & henna blends", "Natural antioxidant extracts"]
  },
  {
    id: "brahmi-powder",
    name: "Brahmi Powder (Gotu Kola)",
    hindiName: "ब्राह्मी चूर्ण (Brahmi Churna)",
    botanicalName: "Bacopa monnieri",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Clean farm-cultivated whole Bacopa Monnieri plant shade-dried and milled into fine powder with high active Bacosides. Suitable for nootropic formulations and memory tonics.",
    bulkAvailability: "300 Kg - 15 Metric Tons",
    moq: "300 Kg",
    moistureContent: "< 7%",
    form: "Fine 80 Mesh Herb Powder",
    image: "/images/brahmi_minimal.png",
    uses: ["Nootropic capsules", "Medhya Rasayana tonics", "Herbal hair care formulations", "Ayurvedic syrups"]
  },
  {
    id: "tulsi-powder",
    name: "Tulsi Leaf Powder (Holy Basil)",
    hindiName: "तुलसी पत्ता चूर्ण (Tulsi Churna)",
    botanicalName: "Ocimum tenuiflorum",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Aromatic Krishna and Rama Tulsi leaves shade-dried and pulverized under controlled temperature to preserve volatile Eugenol essential oil and rich emerald tone.",
    bulkAvailability: "300 Kg - 15 Metric Tons",
    moq: "300 Kg",
    moistureContent: "< 7%",
    form: "Fine Aromatic Leaf Powder (80 Mesh)",
    image: "/images/tulsi_minimal.png",
    uses: ["Herbal tea premixes", "Kasa (cough) syrups", "Immunity blends", "Nutraceutical wellness teas"]
  },
  {
    id: "mulethi-powder",
    name: "Mulethi Powder (Licorice / Yashtimadhu)",
    hindiName: "मुलेठी चूर्ण (Mulethi Churna)",
    botanicalName: "Glycyrrhiza glabra",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "High-glycyrrhizin unpeeled Mulethi roots pulverized into ultra-fine powder. Naturally sweet flavor profile, free from heavy fibers, ideal for throat and hyperacidity remedies.",
    bulkAvailability: "500 Kg - 30 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 8%",
    form: "Fine Cream-Yellow Extract Grade Powder",
    image: "/images/mulethi_minimal.png",
    uses: ["Throat lozenges & syrups", "Hyperacidity powders", "Ayurvedic cosmetic masks", "Herbal expectorants"]
  },
  {
    id: "turmeric-finger",
    name: "Turmeric Whole Fingers (Haldi Ganth)",
    hindiName: "हल्दी गांठ (Sabut Haldi)",
    botanicalName: "Curcuma longa",
    category: "Spices",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Salem and Nizamabad grade double-polished whole turmeric finger rhizomes with high natural Curcumin content (> 3%). Thoroughly cleaned, cured, and hygienic sun-dried.",
    bulkAvailability: "1000 Kg - 50 Metric Tons",
    moq: "1000 Kg",
    moistureContent: "< 9%",
    form: "Double Polished Whole Dried Fingers / Bulbs",
    image: "/images/saffron_minimal.png",
    uses: ["Curcumin extraction", "Commercial spice grinding", "Ayurvedic medicines", "HORECA bulk supply"]
  },
  {
    id: "turmeric-powder",
    name: "Turmeric Powder (Haldi Churna)",
    hindiName: "हल्दी पाउडर (Haldi Powder)",
    botanicalName: "Curcuma longa",
    category: "Spices / Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "High-curcumin pure golden yellow turmeric powder milled from cleaned Salem turmeric fingers. 100% pure with zero artificial color, starch, or adulteration.",
    bulkAvailability: "1000 Kg - 50 Metric Tons",
    moq: "1000 Kg",
    moistureContent: "< 8%",
    form: "Pure Micro-Milled Golden Powder",
    image: "/images/saffron_minimal.png",
    uses: ["Ayurvedic formulations", "Food & spice blends", "Curcumin supplements", "Herbal skincare"]
  },
  {
    id: "black-pepper-whole",
    name: "Black Pepper (Tellicherry Garbled)",
    hindiName: "काली मिर्च (Kali Mirch)",
    botanicalName: "Piper nigrum",
    category: "Spices",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Premium Tellicherry Garbled Extra Bold black pepper berries harvested from Kerala spice belts. High piperine (> 5%), intense aroma, zero foreign matter.",
    bulkAvailability: "1000 Kg - 50 Metric Tons",
    moq: "1000 Kg",
    moistureContent: "< 10%",
    form: "Whole Dried Garbled Extra Bold Berries",
    image: "/images/category_barks.png",
    uses: ["Piperine extract manufacturing", "Trikatu Churna raw material", "Spice masalas", "Pharmaceutical formulations"]
  },
  {
    id: "cumin-seeds",
    name: "Cumin Seeds (Jeera Machine Cleaned)",
    hindiName: "जीरा (Sabut Jeera)",
    botanicalName: "Cuminum cyminum",
    category: "Spices / Seeds",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Unjha Gujarat grade whole cumin seeds sorted to 99% purity. Intense volatile cumin oil content, uniform brown color, and fresh aroma for food processing and Ayurveda.",
    bulkAvailability: "1000 Kg - 40 Metric Tons",
    moq: "1000 Kg",
    moistureContent: "< 8%",
    form: "99% Pure Machine Cleaned Whole Seeds",
    image: "/images/saffron_minimal.png",
    uses: ["Ayurvedic digestive churna", "Oleoresin extraction", "Commercial spice blends", "HORECA wholesale"]
  },
  {
    id: "coriander-seeds",
    name: "Coriander Seeds (Dhaniya Whole)",
    hindiName: "साबुत धनिया (Sabut Dhaniya)",
    botanicalName: "Coriandrum sativum",
    category: "Spices / Seeds",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "High-linalool whole coriander seeds sourced from Rajasthan and MP. Machine-cleaned, uniform size, free from infestation or split dust.",
    bulkAvailability: "1000 Kg - 50 Metric Tons",
    moq: "1000 Kg",
    moistureContent: "< 8%",
    form: "Whole Dried Green / Golden Oval Seeds",
    image: "/images/category_herbs.png",
    uses: ["Kashayam formulations", "Curry powder production", "Herbal infusions", "Essential oil extraction"]
  },
  {
    id: "fennel-seeds",
    name: "Fennel Seeds (Variyali / Saunf)",
    hindiName: "सौंफ (Saunf / Moti Saunf)",
    botanicalName: "Foeniculum vulgare",
    category: "Seeds / Spices",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Sweet fragrant bold green Lucknowi and Gujarat fennel seeds. High essential oil (anethole) density, clean grading, sweet refreshing flavor.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 8%",
    form: "Bold Green Whole Seeds",
    image: "/images/category_herbs.png",
    uses: ["Digestive mukhwas", "Ayurvedic syrups", "Confectionery flavoring", "Herbal infusions"]
  },
  {
    id: "fenugreek-seeds",
    name: "Fenugreek Seeds (Methi Dana)",
    hindiName: "मेथी दाना (Sabut Methi)",
    botanicalName: "Trigonella foenum-graecum",
    category: "Seeds / Spices",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Premium machine-cleaned Rajasthani Fenugreek seeds rich in natural mucilage, 4-hydroxyisoleucine, and saponins. Free from stones and sand.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 7%",
    form: "Machine Cleaned Yellow-Brown Seeds",
    image: "/images/saffron_minimal.png",
    uses: ["Metabolic wellness extracts", "Herbal hair care", "Spice masalas", "Pickle manufacturing"]
  },
  {
    id: "isabgol-husk",
    name: "Isabgol Husk (Psyllium Husk 99% Purity)",
    hindiName: "इसबगोल की भूसी (Isabgol)",
    botanicalName: "Plantago ovata",
    category: "Seeds / Natural Ingredients",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Pure Sidhpur Grade-A white Isabgol husk with high swell volume (> 45 ml/g). Thoroughly sifted and graded for pharma dietary fiber formulations.",
    bulkAvailability: "500 Kg - 20 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 10%",
    form: "Grade-A White Flakes / Milled Husk Powder",
    image: "/images/musli_minimal.png",
    uses: ["Pharma dietary fiber syrups", "Laxative granules", "Nutraceutical wellness", "Gluten-free baking raw material"]
  },
  {
    id: "moringa-leaf-powder",
    name: "Moringa Leaf Powder (Organic Grade)",
    hindiName: "मोरिंगा पत्ती पाउडर (Sahjan Powder)",
    botanicalName: "Moringa oleifera",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Shade-dried drumstick tree leaves milled at low temperature. Retains vibrant green chlorophyll color, high plant protein, vitamins, and polyphenols.",
    bulkAvailability: "500 Kg - 30 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 6%",
    form: "80 Mesh Emerald Green Powder",
    image: "/images/moringa_minimal.png",
    uses: ["Superfood powder blends", "Multivitamin capsules", "Herbal smoothie mixes", "Nutraceutical tablets"]
  },
  {
    id: "moringa-seeds",
    name: "Moringa Seeds (PKM-1 / Wild)",
    hindiName: "सहजन के बीज (Moringa Seeds)",
    botanicalName: "Moringa oleifera",
    category: "Seeds",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Clean, mature dried Moringa Oleifera seeds suitable for high-yield cold-pressed Ben oil extraction and botanical cultivation.",
    bulkAvailability: "500 Kg - 20 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 7%",
    form: "Winged Whole Dry Seeds / De-shelled Kernels",
    image: "/images/moringa_minimal.png",
    uses: ["Moringa seed oil (Ben oil) extraction", "Water purification research", "Cosmetic lipids", "Agricultural seed supply"]
  },
  {
    id: "rose-petals",
    name: "Dried Rose Petals (Desi Gulab Patti)",
    hindiName: "सूखी गुलाब पत्ती (Gulab Patti)",
    botanicalName: "Rosa damascena",
    category: "Flowers",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Fragrant, shade-dried crimson pink Indian Damask rose petals. Retains natural delicate floral aroma, free from chemical spray or stems.",
    bulkAvailability: "200 Kg - 10 Metric Tons",
    moq: "200 Kg",
    moistureContent: "< 8%",
    form: "Shade Dried Whole Crimson Petals / Cut Flakes",
    image: "/images/musli_minimal.png",
    uses: ["Gulkand preparation", "Herbal tea blends", "Ayurvedic cosmetics & ubtans", "Aromatherapy formulations"]
  },
  {
    id: "hibiscus-flowers",
    name: "Hibiscus Whole Dried Flowers",
    hindiName: "सूखा गुड़हल फूल (Gudhal Phool)",
    botanicalName: "Hibiscus rosa-sinensis",
    category: "Flowers",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Deep ruby red shade-dried whole Hibiscus flowers rich in natural anthocyanins, fruit acids, and bioflavonoids. Cleanly sorted without dirt.",
    bulkAvailability: "300 Kg - 15 Metric Tons",
    moq: "300 Kg",
    moistureContent: "< 8%",
    form: "Whole Dried Crimson Flowers / Calyces",
    image: "/images/musli_minimal.png",
    uses: ["Herbal tart teas & infusions", "Hair oil & conditioning shampoo", "Natural botanical red coloring", "Ayurvedic heart tonics"]
  },
  {
    id: "hibiscus-powder",
    name: "Hibiscus Flower Powder",
    hindiName: "गुड़हल फूल चूर्ण (Gudhal Churna)",
    botanicalName: "Hibiscus rosa-sinensis",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Micro-pulverized whole dried Hibiscus flower petals. Rich natural crimson pigment, ideal for organic hair dyes, face masks, and herbal blends.",
    bulkAvailability: "300 Kg - 15 Metric Tons",
    moq: "300 Kg",
    moistureContent: "< 7%",
    form: "Fine Ruby-Red Botanical Powder",
    image: "/images/musli_minimal.png",
    uses: ["Herbal hair packs & natural dyes", "Exfoliating botanical masks", "Tart beverage premixes", "Antioxidant nutraceuticals"]
  },
  {
    id: "cinnamon-bark",
    name: "Cinnamon Sticks (Dalchini Rolls)",
    hindiName: "दालचीनी (Dalchini)",
    botanicalName: "Cinnamomum verum",
    category: "Spices / Bark",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Aromatic Ceylon and domestic true cinnamon rolled bark quills. Low coumarin, high cinnamaldehyde essential oil, and sweet woody aroma.",
    bulkAvailability: "500 Kg - 20 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 9%",
    form: "Whole Quills / Rolled Bark Sticks / Chips",
    image: "/images/category_barks.png",
    uses: ["Essential oil extraction", "Ayurvedic herbal teas", "Spice seasonings", "Metabolic health formulations"]
  },
  {
    id: "cardamom-bold",
    name: "Green Cardamom (Hari Elaichi Bold)",
    hindiName: "हरी इलायची (Hari Elaichi)",
    botanicalName: "Elettaria cardamomum",
    category: "Spices / Seeds",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "High-altitude shade plantation green cardamom pods sourced from Bodinayakanur and Idukki. Intense cineole aroma and dark aromatic seed core.",
    bulkAvailability: "200 Kg - 10 Metric Tons",
    moq: "200 Kg",
    moistureContent: "< 9%",
    form: "8mm+ Extra Bold Green Kiln-Cured Pods",
    image: "/images/category_herbs.png",
    uses: ["Flavoring confectionery & tea", "Ayurvedic digestive medicines", "Luxury spice masalas", "Aroma extractions"]
  },
  {
    id: "cloves-whole",
    name: "Whole Cloves (Laung Head & Stem)",
    hindiName: "लौंग (Laung)",
    botanicalName: "Syzygium aromaticum",
    category: "Spices / Flower Buds",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Handpicked Zanzibar and Madagascar grade cloves with intact round heads and reddish-brown stems. Rich in eugenol oil (> 15%).",
    bulkAvailability: "300 Kg - 15 Metric Tons",
    moq: "300 Kg",
    moistureContent: "< 10%",
    form: "Fully Dried Flower Buds with Intact Crown Head",
    image: "/images/category_barks.png",
    uses: ["Clove oil / eugenol extraction", "Dental care formulations", "Garam masala blends", "Respiratory tonics"]
  },
  {
    id: "kalonji-seeds",
    name: "Black Cumin / Nigella Seeds (Kalonji)",
    hindiName: "कलौंजी (Kalonji)",
    botanicalName: "Nigella sativa",
    category: "Seeds / Spices",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Pure jet-black triangular Nigella sativa seeds rich in Thymoquinone and unsaturated fatty acids. Uniformly cleaned and free from dust.",
    bulkAvailability: "500 Kg - 20 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 7%",
    form: "99% Machine Cleaned Jet Black Matte Seeds",
    image: "/images/saffron_minimal.png",
    uses: ["Kalonji seed oil extraction", "Bakery and pickle toppings", "Ayurvedic immunity formulations", "Nutraceutical capsules"]
  },
  {
    id: "flax-seeds",
    name: "Flax Seeds (Alsi / Linseed)",
    hindiName: "अलसी (Alsi)",
    botanicalName: "Linum usitatissimum",
    category: "Seeds",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "High-purity golden brown Flax seeds packed with Alpha-Linolenic Acid (Omega-3), lignans, and soluble dietary fiber.",
    bulkAvailability: "500 Kg - 20 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 7%",
    form: "Clean Shiny Brown Seeds",
    image: "/images/saffron_minimal.png",
    uses: ["Flaxseed oil cold pressing", "Dietary fiber supplements", "Sports nutrition blends", "Animal feed premixes"]
  },
  {
    id: "sesame-seeds",
    name: "Natural White Sesame Seeds (Safed Til)",
    hindiName: "सफेद तिल (Safed Til)",
    botanicalName: "Sesamum indicum",
    category: "Seeds",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Premium Sortex cleaned Indian natural white sesame seeds. High oil content (> 48%), sweet nutty taste, zero dark specks or pesticide residue.",
    bulkAvailability: "1000 Kg - 50 Metric Tons",
    moq: "1000 Kg",
    moistureContent: "< 6%",
    form: "99.95% Purity Sortex Cleaned White Seeds",
    image: "/images/musli_minimal.png",
    uses: ["Ayurvedic taila (medicated oil) base", "Tahini and sesame oil production", "Traditional sweets & confectionery", "Bakery toppings"]
  },
  {
    id: "haritaki-powder",
    name: "Haritaki Powder (Harad Churna)",
    hindiName: "हरड़ चूर्ण / हरिताकी (Harad Churna)",
    botanicalName: "Terminalia chebula",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Deseeded Badi Harad fruit shells pulverized into fine powder with high Chebulic acid and bio-tannins. Essential for Triphala and digestive formulations.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 8%",
    form: "Fine 80-100 Mesh Deseeded Fruit Powder",
    image: "/images/harad_baheda_minimal.png",
    uses: ["Triphala Churna manufacturing", "Laxative and detox powders", "Classical Ayurvedic formulations", "Extract manufacturing"]
  },
  {
    id: "bibhitaki-powder",
    name: "Bibhitaki Powder (Baheda Churna)",
    hindiName: "बहेड़ा चूर्ण / बिभीतकी (Baheda Churna)",
    botanicalName: "Terminalia bellirica",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Clean deseeded Baheda fruit rinds milled into fine powder rich in gallic and ellagic acids. Core component of Triphala and respiratory rasayanas.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 8%",
    form: "Fine 80-100 Mesh Deseeded Shell Powder",
    image: "/images/harad_baheda_minimal.png",
    uses: ["Triphala Churna constituent", "Kapha balancing medicines", "Hair care conditioning powders", "Astringent decoctions"]
  },
  {
    id: "arjun-bark-powder",
    name: "Arjun Bark Powder (Arjuna Chhal Churna)",
    hindiName: "अर्जुन छाल चूर्ण (Arjun Chhal Churna)",
    botanicalName: "Terminalia arjuna",
    category: "Herbs Powder",
    shortDescription: "Dried botanical material suitable for wholesale sourcing and further processing.",
    fullDescription: "Mature Terminalia Arjuna inner bark pulverized into fine reddish-pink powder with standardized CoQ10, arjunic tannins, and cardiac flavonoids.",
    bulkAvailability: "500 Kg - 25 Metric Tons",
    moq: "500 Kg",
    moistureContent: "< 8%",
    form: "Ultra-Fine 80 Mesh Reddish-Pink Bark Powder",
    image: "/images/arjun_minimal.png",
    uses: ["Hridya cardiac formulations", "Ayurvedic kashayam and kwath", "Nutraceutical heart health capsules", "Botanical extract manufacturing"]
  }
];
