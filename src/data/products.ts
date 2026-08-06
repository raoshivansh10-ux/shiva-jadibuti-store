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
}

export const PRODUCTS: Product[] = [
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
  }
];
