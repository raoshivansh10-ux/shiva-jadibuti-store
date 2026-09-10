import { PRODUCTS, Product, RetailVariant, getProductRetailVariants, getProductStartingRetailPrice } from "@/data/products";
import { RAW_SPICES, SpiceProduct } from "@/data/rawSpices";
import { HEALTH_CONDITIONS } from "@/data/healthConditions";

export interface UnifiedProduct {
  id: string;
  name: string;
  hindiName?: string;
  botanicalName: string;
  category: string;
  form: string;
  shortDescription: string;
  fullDescription: string;
  bulkAvailability: string;
  moq: string;
  origin?: string;
  uses: string[];
  activeCompounds?: string;
  image: string;
  sourceType: "herbal" | "spice";
  priceEstimate?: string;
  retailVariants?: RetailVariant[];
  startingRetailPrice?: number;
}

// Convert all PRODUCTS into UnifiedProduct format
const herbalIds = new Set(PRODUCTS.map((p) => p.id));

const normalizedHerbalProducts: UnifiedProduct[] = PRODUCTS.map((p) => {
  const relatedHealth = HEALTH_CONDITIONS.find(
    (h) => h.solutionHerbName.toLowerCase().includes(p.name.toLowerCase()) ||
           p.name.toLowerCase().includes(h.solutionHerbName.toLowerCase())
  );

  const variants = getProductRetailVariants(p);
  const startPrice = getProductStartingRetailPrice(p);

  return {
    id: p.id,
    name: p.name,
    hindiName: p.hindiName,
    botanicalName: p.botanicalName,
    category: p.category,
    form: p.form || p.cutForm || "Whole Sun-Dried / Powder",
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    bulkAvailability: p.bulkAvailability,
    moq: p.moq || p.bulkAvailability.split("-")[0]?.trim() || "100 Kg",
    origin: p.originRegion || "India",
    uses: p.uses || [],
    activeCompounds: relatedHealth ? relatedHealth.activeCompounds : undefined,
    image: p.image,
    sourceType: "herbal",
    retailVariants: variants,
    startingRetailPrice: startPrice,
  };
});

// Convert all RAW_SPICES into UnifiedProduct format with distinct IDs
const normalizedSpiceProducts: UnifiedProduct[] = RAW_SPICES.map((s) => {
  const variants = getProductRetailVariants(s);
  const startPrice = getProductStartingRetailPrice(s);

  return {
    id: herbalIds.has(s.id) ? `spice-${s.id}` : s.id,
    name: s.name,
    hindiName: s.hindiName,
    botanicalName: s.scientificName,
    category: s.category,
    form: s.grade || "Whole / Graded",
    shortDescription: s.shortDescription,
    fullDescription: s.fullDescription,
    bulkAvailability: s.bulkSupply,
    moq: s.bulkSupply.split("-")[0]?.trim() || "100 Kg",
    origin: s.origin,
    uses: s.uses || [],
    image: s.image,
    sourceType: "spice",
    retailVariants: variants,
    startingRetailPrice: startPrice,
  };
});

// Master unified catalog for AI knowledge (guaranteed unique IDs)
const combinedMap = new Map<string, UnifiedProduct>();
[...normalizedHerbalProducts, ...normalizedSpiceProducts].forEach((item) => {
  if (!combinedMap.has(item.id)) {
    combinedMap.set(item.id, item);
  }
});

export const UNIFIED_CATALOG: UnifiedProduct[] = Array.from(combinedMap.values());

/**
 * Generate a compact, structured text prompt of the full product catalog
 * for passing to OpenAI LLM context.
 */
export function getCatalogPromptContext(): string {
  return UNIFIED_CATALOG.map((p, idx) => {
    const retailPrices = p.retailVariants
      ? p.retailVariants.map((v) => `${v.size}: ₹${v.price}`).join(", ")
      : `From ₹${p.startingRetailPrice || 149} / 100g`;

    return `Product #${idx + 1}:
- ID: ${p.id}
- Name: ${p.name} ${p.hindiName ? `(${p.hindiName})` : ""}
- Botanical/Scientific: ${p.botanicalName}
- Category: ${p.category}
- Form/Grade: ${p.form}
- Retail Pack Pricing: ${retailPrices}
- Wholesale MOQ / Bulk Supply: ${p.bulkAvailability} (Min: ${p.moq})
- Short Description: ${p.shortDescription}
- Sourcing Region: ${p.origin || "India"}
- Applications & Uses: ${p.uses.join(", ")}
${p.activeCompounds ? `- Key Active Compounds: ${p.activeCompounds}` : ""}`.trim();
  }).join("\n\n");
}

/**
 * Common English, Hindi, and Hinglish stop words that should not trigger false positives.
 */
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "of", "with",
  "by", "from", "up", "about", "into", "over", "after", "is", "are", "was",
  "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "can", "could", "will", "would", "shall", "should", "may", "might", "must",
  "you", "your", "yours", "i", "me", "my", "mine", "we", "us", "our", "ours",
  "they", "them", "their", "theirs", "he", "him", "his", "she", "her", "hers",
  "it", "its", "what", "which", "who", "whom", "this", "that", "these", "those",
  "am", "want", "need", "looking", "find", "show", "give", "tell", "please",
  "some", "something", "product", "products", "item", "items", "good", "best",
  // Hinglish / Hindi auxiliary stopwords
  "mujhe", "chahiye", "dikhao", "dikhaye", "kya", "hai", "wala", "wali", "wale",
  "batao", "bataiye", "kuch", "aur", "bhi", "ka", "ki", "ke", "liye", "mein", "me",
  "daal", "do", "karo", "karna", "hume", "humko", "aapke", "paas", "hai", "kya",
  "ye", "yeh", "wo", "woh", "unka", "inka", "iski", "iska", "iske", "isko",
  "chahiye", "chahta", "chahti", "hoon", "hain", "kardo", "daaldo", "lelo"
]);

/**
 * Comprehensive Indian Vernacular / Spelling Variant Dictionary.
 * Maps common transliterations, typos, and vernacular names directly to Catalog Product IDs.
 */
export const HERB_SYNONYMS_MAP: Record<string, string[]> = {
  "ashwagandha-root": [
    "ashwagandha", "ashwaganda", "asgandh", "asgand", "aswagandha", "ashvagandha",
    "ashwagndha", "ashwaghandha", "nagori", "withania", "somnifera", "अश्वगंधा"
  ],
  "giloy-stem": [
    "giloy", "guduchi", "gurjo", "amrita", "amrutha", "gilo", "tinospora", "cordifolia",
    "neem giloy", "गिलोय", "गुडूची", "गुड़ूची"
  ],
  "neem-leaves": [
    "neem", "nimba", "neem patta", "neem patti", "neem leaves", "azadirachta", "indica",
    "kadva neem", "नीम", "नीम पत्ता"
  ],
  "tulsi-leaves": [
    "tulsi", "tulasi", "holy basil", "shyama tulsi", "rama tulsi", "krishna tulsi",
    "tulsi patti", "tulsi leaves", "ocimum", "sanctum", "तुलसी", "तुलसी पत्ती"
  ],
  "mulethi-root": [
    "mulethi", "yashtimadhu", "jethimadh", "jethimadhu", "licorice", "liquorice",
    "mulathi", "mithi lakdi", "glycyrrhiza", "glabra", "मुलेठी", "जेठीमध", "यष्टिमधु"
  ],
  "amla-dry": [
    "amla", "aonla", "awla", "sukha amla", "dry amla", "amalki", "amalaki",
    "indian gooseberry", "phyllanthus", "emblica", "आंवला", "सूखा आंवला"
  ],
  "harad-fruit": [
    "harad", "haritaki", "badi harad", "harde", "harar", "kadukkai", "terminalia",
    "chebula", "हरड़", "हरिताकी"
  ],
  "baheda-fruit": [
    "baheda", "bibhitaki", "bahera", "bahedha", "behada", "terminalia", "bellirica",
    "बहेड़ा", "बिभीतकी"
  ],
  "shatavari-root": [
    "shatavari", "satavar", "shatawari", "satawari", "shatamull", "asparagus",
    "racemosus", "asparagus racemosus", "शतावरी", "सतावर"
  ],
  "safed-musli": [
    "safed musli", "musli", "safed moosli", "white musli", "chlorophytum", "borivilianum",
    "moosli", "musali", "सफेद मूसली", "मूसली"
  ],
  "brahmi-herb": [
    "brahmi", "mandukaparni", "gotu kola", "bacopa", "monnieri", "brahmi buti",
    "जल ब्राह्मी", "ब्राह्मी", "मंडूकपर्णी"
  ],
  "senna-leaves": [
    "senna", "sanay", "senna patti", "sanay patti", "sonamukhi", "cassia", "angustifolia",
    "सनाय", "सेना पत्ती"
  ],
  "kalmegh-herb": [
    "kalmegh", "bhunimba", "chirata", "kirayat", "andrographis", "paniculata",
    "king of bitters", "कालमेgh", "कालमेघ", "भूनिम्ब"
  ],
  "moringa-powder": [
    "moringa", "sahjan", "sehjan", "drumstick", "moringa powder", "sahjan powder",
    "moringa oleifera", "सहजन", "मोरिंगा", "सहजन पत्ता"
  ],
  "arjun-bark": [
    "arjun", "arjuna", "arjun chhal", "arjun chal", "arjun bark", "terminalia", "arjuna",
    "अर्जुन", "अर्जुन छाल"
  ],
  "black-pepper": [
    "black pepper", "kali mirch", "gol mirch", "kurumulaku", "piper nigrum",
    "tellicherry", "काली मिर्च"
  ],
  "white-pepper": [
    "white pepper", "safed mirch", "dakhni mirch", "सफेद मिर्च"
  ],
  "green-cardamom": [
    "green cardamom", "cardamom", "elaichi", "hari elaichi", "chhoti elaichi",
    "elettaria", "cardamomum", "इलायची", "हरी इलायची"
  ],
  "kashmiri-saffron": [
    "saffron", "kesar", "kashmiri kesar", "kashmiri saffron", "zafran", "keshar",
    "crocus", "sativus", "mongra", "केसर", "कश्मीरी केसर"
  ],
  "shilajit-resin": [
    "shilajit", "silajit", "shilajeet", "pure shilajit", "asphaltum", "salajit",
    "शिलाजीत", "शुद्ध शिलाजीत"
  ],
  "ashoka-bark": [
    "ashoka bark", "ashok bark", "ashoka", "ashok", "ashok chhal", "saraca asoca",
    "saraca", "asoca", "saraca indica", "asoka chhal", "अशोक छाल", "अशोक"
  ],
  "giloy-powder": [
    "giloy powder", "giloy churna", "guduchi churna", "guduchi powder", "tinospora powder",
    "गिलोय चूर्ण", "गिलोय पाउडर", "गुडूची चूर्ण"
  ],
  "neem-powder": [
    "neem powder", "neem leaf powder", "neem churna", "neem patti churna", "azadirachta powder",
    "नीम चूर्ण", "नीम पाउडर", "नीम पत्ता चूर्ण"
  ],
  "amla-powder": [
    "amla powder", "amla churna", "aonla powder", "sukha amla powder", "phyllanthus powder",
    "dry amla powder", "आंवला चूर्ण", "आंवला पाउडर"
  ],
  "brahmi-powder": [
    "brahmi powder", "brahmi churna", "bacopa powder", "bacopa monnieri powder",
    "ब्राह्मी चूर्ण", "ब्राह्मी पाउडर"
  ],
  "tulsi-powder": [
    "tulsi powder", "tulsi churna", "tulsi leaf powder", "holy basil powder", "ocimum powder",
    "तुलसी चूर्ण", "तुलसी पाउडर", "तुलसी पत्ता चूर्ण"
  ],
  "mulethi-powder": [
    "mulethi powder", "mulethi churna", "yashtimadhu churna", "licorice powder", "glycyrrhiza powder",
    "मुलेठी चूर्ण", "मुलेठी पाउडर", "यष्टिमधु चूर्ण"
  ],
  "turmeric-finger": [
    "turmeric", "haldi", "sabut haldi", "haldi ganth", "salem haldi", "turmeric fingers",
    "curcuma longa", "curcuma", "curcumin", "हल्दी", "हल्दी गांठ", "साबुत हल्दी"
  ],
  "turmeric-powder": [
    "turmeric powder", "haldi powder", "haldi churna", "pisi haldi", "curcuma longa powder",
    "हल्दी पाउडर", "हल्दी चूर्ण"
  ],
  "black-pepper-whole": [
    "black pepper", "black pepper whole", "kali mirch", "sabut kali mirch", "tellicherry pepper",
    "piper nigrum", "काली मिर्च", "साबुत काली मिर्च"
  ],
  "cumin-seeds": [
    "cumin", "cumin seeds", "jeera", "sabut jeera", "safed jeera", "zeera", "jira",
    "cuminum cyminum", "cuminum", "unjha jeera", "जीरा", "साबुत जीरा"
  ],
  "coriander-seeds": [
    "coriander", "coriander seeds", "dhaniya", "sabut dhaniya", "sukha dhaniya",
    "coriandrum sativum", "coriandrum", "dhania", "धनिया", "साबुत धनिया"
  ],
  "fennel-seeds": [
    "fennel", "fennel seeds", "saunf", "moti saunf", "variyali", "foeniculum vulgare",
    "foeniculum", "sonf", "सौंफ", "मोटी सौंफ", "वरियाली"
  ],
  "fenugreek-seeds": [
    "fenugreek", "fenugreek seeds", "methi", "methi dana", "sabut methi",
    "trigonella foenum-graecum", "trigonella", "मेथी", "मेथी दाना", "साबुत मेथी"
  ],
  "isabgol-husk": [
    "isabgol", "isabgol husk", "psyllium", "psyllium husk", "plantago ovata",
    "isabgol bhusi", "sat isabgol", "इसबगोल", "इसबगोल भूसी", "इसबगोल की भूसी"
  ],
  "moringa-leaf-powder": [
    "moringa leaf powder", "moringa leaf", "moringa leaves", "moringa powder",
    "sahjan powder", "sahjan patti powder", "moringa oleifera powder",
    "मोरिंगा पाउडर", "सहजन पाउडर", "सहजन पत्ता चूर्ण"
  ],
  "moringa-seeds": [
    "moringa seeds", "sahjan ke beej", "sahjan beej", "moringa seed", "drumstick seeds",
    "सहजन के बीज", "मोरिंगा बीज"
  ],
  "rose-petals": [
    "rose petals", "dried rose petals", "gulab patti", "desi gulab", "gulab phool",
    "rosa damascena", "rosa", "damask rose", "गुलाब पत्ती", "सूखी गुलाब पत्ती"
  ],
  "hibiscus-flowers": [
    "hibiscus", "hibiscus flowers", "gudhal", "gudhal phool", "gudhal ke phool",
    "hibiscus rosa-sinensis", "javakusum", "गुड़हल", "गुड़हल फूल", "गुड़हल के फूल"
  ],
  "hibiscus-powder": [
    "hibiscus powder", "gudhal powder", "gudhal churna", "hibiscus flower powder",
    "गुड़हल पाउडर", "गुड़हल चूर्ण"
  ],
  "cinnamon-bark": [
    "cinnamon", "dalchini", "dalcheeni", "cinnamon sticks", "cinnamon quills",
    "cinnamomum verum", "cinnamomum", "ceylon cinnamon", "दालचीनी"
  ],
  "cardamom-bold": [
    "cardamom", "green cardamom", "elaichi", "hari elaichi", "chhoti elaichi",
    "elettaria cardamomum", "idukki cardamom", "इलायची", "हरी इलायची"
  ],
  "cloves-whole": [
    "cloves", "clove", "laung", "lavang", "syzygium aromaticum", "syzygium",
    "lal laung", "लौंग", "लवंग"
  ],
  "kalonji-seeds": [
    "kalonji", "black cumin", "nigella", "nigella sativa", "kalonji seeds",
    "mangarail", "mangrail", "कलौंजी", "मंगरैल"
  ],
  "flax-seeds": [
    "flax", "flax seeds", "alsi", "alsi ke beej", "linseed", "linum usitatissimum",
    "linum", "अलसी", "अलसी के बीज"
  ],
  "sesame-seeds": [
    "sesame", "sesame seeds", "til", "safed til", "white sesame", "sesamum indicum",
    "sesamum", "til ke beej", "तिल", "सफेद तिल"
  ],
  "haritaki-powder": [
    "haritaki powder", "harad powder", "harad churna", "terminalia chebula powder",
    "harde churna", "badi harad powder", "हरड़ चूर्ण", "हरिताकी चूर्ण"
  ],
  "bibhitaki-powder": [
    "bibhitaki powder", "baheda powder", "baheda churna", "terminalia bellirica powder",
    "bahera churna", "बहेड़ा चूर्ण", "बिभीतकी चूर्ण"
  ],
  "arjun-bark-powder": [
    "arjun bark powder", "arjun powder", "arjuna powder", "arjun chhal churna",
    "arjuna chhal powder", "terminalia arjuna powder", "अर्जुन छाल चूर्ण", "अर्जुन पाउडर"
  ]
};

/**
 * Detect customer's query language style.
 */
export function detectLanguage(text: string): "english" | "hindi" | "hinglish" {
  if (!text) return "english";

  // Check for Devanagari script
  if (/[\u0900-\u097F]/.test(text)) {
    return "hindi";
  }

  // Check for common Hinglish markers
  const hinglishWords = [
    "chahiye", "dikhao", "dikhaye", "kya", "hai", "wala", "wali", "wale",
    "batao", "bataiye", "kuch", "aur", "bhi", "kitna", "kitne", "ka", "ki", "ke",
    "liye", "mein", "me", "daal", "karo", "pehla", "dusra", "teesra", "chautha",
    "bhav", "rate", "pachan", "pet", "bhejo", "mujhe", "humko", "ye", "yeh",
    "iska", "iski", "iske", "isko", "apna", "hota", "hoti", "hote", "bhi", "ho"
  ];

  const lower = text.toLowerCase();
  const hasHinglish = hinglishWords.some((w) => new RegExp(`\\b${w}\\b`, "i").test(lower));
  if (hasHinglish) {
    return "hinglish";
  }

  return "english";
}

/**
 * Detect customer intent from query.
 */
export type UserIntent =
  | "ADD_TO_CART"
  | "REQUEST_WHOLESALE_QUOTE"
  | "CHECK_PRICE"
  | "CHECK_MOQ"
  | "CHECK_AVAILABILITY"
  | "SHOW_MORE"
  | "VIEW_PRODUCT"
  | "SEARCH_PRODUCT"
  | "GENERAL_PRODUCT_DISCOVERY";

export function detectUserIntent(query: string): UserIntent {
  const q = query.toLowerCase();

  if (
    q.includes("cart me") ||
    q.includes("cart mein") ||
    q.includes("add to cart") ||
    q.includes("add cart") ||
    q.includes("cart daal") ||
    q.includes("cart dalo") ||
    q.includes("isko add karo") ||
    q.includes("cart me add")
  ) {
    return "ADD_TO_CART";
  }

  if (
    q.includes("quote") ||
    q.includes("quotation") ||
    q.includes("wholesale quote") ||
    q.includes("sample chahiye") ||
    q.includes("sample order") ||
    q.includes("bulk quote")
  ) {
    return "REQUEST_WHOLESALE_QUOTE";
  }

  if (
    q.includes("rate") ||
    q.includes("bhav") ||
    q.includes("price") ||
    q.includes("keemat") ||
    q.includes("kitne ka hai") ||
    q.includes("cost")
  ) {
    return "CHECK_PRICE";
  }

  if (
    q.includes("moq") ||
    q.includes("minimum order") ||
    q.includes("min order") ||
    q.includes("kitna kilo kam se kam")
  ) {
    return "CHECK_MOQ";
  }

  if (
    q.includes("stock") ||
    q.includes("available hai") ||
    q.includes("availability") ||
    q.includes("mil jayega") ||
    q.includes("hai kya")
  ) {
    return "CHECK_AVAILABILITY";
  }

  if (
    q.includes("aur option") ||
    q.includes("aur dikhao") ||
    q.includes("more options") ||
    q.includes("aur products") ||
    q.includes("dusra option")
  ) {
    return "SHOW_MORE";
  }

  if (
    q.includes("dikhao") ||
    q.includes("dikhaye") ||
    q.includes("view") ||
    q.includes("specs") ||
    q.includes("details")
  ) {
    return "VIEW_PRODUCT";
  }

  return "SEARCH_PRODUCT";
}

/**
 * Resolve pronouns or ordinal references (e.g. "pehla wala", "dusra wala", "iska rate", "ye product")
 * against the previous products displayed in the chat.
 */
export function resolveReferencedProduct(
  query: string,
  previousProducts: UnifiedProduct[] = []
): UnifiedProduct | null {
  if (!previousProducts || previousProducts.length === 0) return null;

  const q = query.toLowerCase();

  // 1st item: "pehla", "first", "1st", "number one", "upar wala"
  if (
    q.includes("pehla") ||
    q.includes("pehla wala") ||
    q.includes("first") ||
    q.includes("1st") ||
    q.includes("1 wala") ||
    q.includes("upar wala")
  ) {
    return previousProducts[0] || null;
  }

  // 2nd item: "dusra", "doosra", "second", "2nd", "number two"
  if (
    q.includes("dusra") ||
    q.includes("doosra") ||
    q.includes("second") ||
    q.includes("2nd") ||
    q.includes("2 wala")
  ) {
    return previousProducts[1] || previousProducts[0] || null;
  }

  // 3rd item: "teesra", "tisra", "third", "3rd", "number three"
  if (
    q.includes("teesra") ||
    q.includes("tisra") ||
    q.includes("third") ||
    q.includes("3rd") ||
    q.includes("3 wala")
  ) {
    return previousProducts[2] || previousProducts[0] || null;
  }

  // 4th item: "chautha", "chotha", "fourth", "4th", "number four"
  if (
    q.includes("chautha") ||
    q.includes("chotha") ||
    q.includes("fourth") ||
    q.includes("4th") ||
    q.includes("4 wala")
  ) {
    return previousProducts[3] || previousProducts[0] || null;
  }

  // Generic pronouns: "ye", "ye wala", "iska", "iski", "isko", "this one", "same wala", "it"
  if (
    q.includes("ye wala") ||
    q.includes("yeh wala") ||
    q.includes("iska") ||
    q.includes("iski") ||
    q.includes("iske") ||
    q.includes("isko") ||
    q.includes("this one") ||
    q.includes("same wala") ||
    q.includes("ye") ||
    q.includes("yeh")
  ) {
    return previousProducts[0] || null;
  }

  // If user gives an action intent ("cart me daal do", "add to cart", "rate batao", "quote chahiye")
  // without mentioning a new specific herb name from catalog
  const isDirectAction =
    q.includes("cart") ||
    q.includes("add") ||
    q.includes("rate") ||
    q.includes("bhav") ||
    q.includes("price") ||
    q.includes("keemat") ||
    q.includes("quote") ||
    q.includes("quotation") ||
    q.includes("available hai") ||
    q.includes("stock kitna");

  if (isDirectAction) {
    // Check if any specific herb is named in the query
    let mentionsOtherHerb = false;
    for (const synonyms of Object.values(HERB_SYNONYMS_MAP)) {
      for (const syn of synonyms) {
        if (syn.length >= 4 && q.includes(syn)) {
          mentionsOtherHerb = true;
          break;
        }
      }
      if (mentionsOtherHerb) break;
    }

    if (!mentionsOtherHerb && previousProducts.length > 0) {
      return previousProducts[0];
    }
  }

  return null;
}

/**
 * Local search function to find matching products from catalog
 * based on query keywords, Indian vernacular names, categories, tags, symptoms, or requirements.
 */
export function searchCatalogProducts(
  query: string,
  limit: number = 4,
  previousProducts: UnifiedProduct[] = []
): UnifiedProduct[] {
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase().trim();

  // 1. Check if the query is referring to an item from the previous response
  const referencedProduct = resolveReferencedProduct(q, previousProducts);
  if (referencedProduct) {
    // If user asked "pehla wala chahiye" or "iska rate kya hai", return referenced item
    return [referencedProduct];
  }

  // 2. Check Synonyms Map directly for vernacular/Hindi names
  const directMatchIds = new Set<string>();
  for (const [prodId, synonyms] of Object.entries(HERB_SYNONYMS_MAP)) {
    for (const syn of synonyms) {
      const synRegex = new RegExp(`\\b${syn}\\b`, "i");
      if (synRegex.test(q) || (syn.length >= 4 && q.includes(syn))) {
        directMatchIds.add(prodId);
      }
    }
  }

  const queryTokens = q
    .split(/[^a-z0-9\u0900-\u097F]+/)
    .filter((t) => t.length >= 3 && !STOP_WORDS.has(t));

  // Score products based on relevance
  const scored = UNIFIED_CATALOG.map((product) => {
    let score = 0;

    // High score for direct synonym match
    if (directMatchIds.has(product.id)) {
      score += 150;
    }

    const nameLower = product.name.toLowerCase();
    const hindiLower = (product.hindiName || "").toLowerCase();
    const botLower = product.botanicalName.toLowerCase();
    const catLower = product.category.toLowerCase();
    const descLower = (product.shortDescription + " " + product.fullDescription).toLowerCase();
    const usesLower = product.uses.join(" ").toLowerCase();
    const formLower = product.form.toLowerCase();

    // Exact matches
    if (nameLower === q) score += 120;
    if (nameLower.includes(q)) score += 60;
    if (hindiLower.includes(q)) score += 50;
    if (botLower.includes(q)) score += 50;

    // Token matching
    queryTokens.forEach((token) => {
      const tokenRegex = new RegExp(`\\b${token}`, "i");
      if (tokenRegex.test(nameLower)) score += 35;
      if (hindiLower.includes(token)) score += 30;
      if (tokenRegex.test(botLower)) score += 30;
      if (catLower.includes(token)) score += 20;
      if (usesLower.includes(token)) score += 18;
      if (descLower.includes(token)) score += 10;
      if (formLower.includes(token)) score += 12;
    });

    // Special Intent Mapping in English & Hindi/Hinglish
    // Digestion / Pet / Pachan
    if (
      (q.includes("digest") || q.includes("stomach") || q.includes("gut") || q.includes("acidity") || q.includes("constipat") || q.includes("laxative") ||
       q.includes("pet") || q.includes("pachan") || q.includes("hazma") || q.includes("gas") || q.includes("kabz")) &&
      (product.id === "harad-fruit" || product.id === "baheda-fruit" || product.id === "amla-dry" || product.id === "mulethi-root" || product.id === "senna-leaves" || product.id === "kalmegh-herb" || product.id === "isabgol-husk" || product.id === "fennel-seeds" || product.id === "haritaki-powder" || product.id === "bibhitaki-powder")
    ) {
      score += 45;
    }

    // Stress / Sleep / Dimag / Neend / Chinta / Memory
    if (
      (q.includes("stress") || q.includes("anxiety") || q.includes("sleep") || q.includes("calm") || q.includes("memory") || q.includes("focus") || q.includes("brain") || q.includes("burnout") ||
       q.includes("dimag") || q.includes("neend") || q.includes("chinta") || q.includes("yadash") || q.includes("manasik")) &&
      (product.id === "ashwagandha-root" || product.id === "brahmi-herb" || product.id === "shatavari-root" || product.id === "brahmi-powder")
    ) {
      score += 45;
    }

    // Immunity / Fever / Bukhar / Khansi / Sardi / Respiratory
    if (
      (q.includes("immunit") || q.includes("fever") || q.includes("infection") || q.includes("platelet") || q.includes("cough") || q.includes("cold") || q.includes("respiratory") || q.includes("throat") || q.includes("asthma") || q.includes("wheezing") || q.includes("bronchial") ||
       q.includes("bukhar") || q.includes("khansi") || q.includes("jukham") || q.includes("sardi") || q.includes("gala") || q.includes("rog pratirodhak")) &&
      (product.id === "giloy-stem" || product.id === "tulsi-leaves" || product.id === "neem-leaves" || product.id === "amla-dry" || product.id === "mulethi-root" || product.id === "senna-leaves" || product.id === "giloy-powder" || product.id === "tulsi-powder" || product.id === "mulethi-powder" || product.id === "neem-powder" || product.id === "amla-powder" || product.id === "cloves-whole" || product.id === "black-pepper-whole")
    ) {
      score += 45;
    }

    // Powder / Churna / Pisawa
    if (
      (q.includes("powder") || q.includes("churna") || q.includes("churan") || q.includes("micro") || q.includes("pisawa") || q.includes("pisa")) &&
      (product.category.toLowerCase().includes("powder") || product.form.toLowerCase().includes("powder") || product.name.toLowerCase().includes("powder"))
    ) {
      score += 55;
    }

    // Seeds / Beej / Dana
    if (
      (q.includes("seed") || q.includes("seeds") || q.includes("beej") || q.includes("dana")) &&
      (product.category.toLowerCase().includes("seed") || product.name.toLowerCase().includes("seed") || product.name.toLowerCase().includes("dana"))
    ) {
      score += 50;
    }

    // Flowers / Phool / Patti
    if (
      (q.includes("flower") || q.includes("flowers") || q.includes("phool") || q.includes("petal") || q.includes("petals") || q.includes("patti")) &&
      (product.category.toLowerCase().includes("flower") || product.name.toLowerCase().includes("petal") || product.name.toLowerCase().includes("flower") || product.name.toLowerCase().includes("patti"))
    ) {
      score += 45;
    }

    // Turmeric / Haldi
    if (
      (q.includes("turmeric") || q.includes("haldi") || q.includes("curcumin")) &&
      (product.id === "turmeric-finger" || product.id === "turmeric-powder" || nameLower.includes("turmeric") || usesLower.includes("turmeric"))
    ) {
      score += 65;
    }

    // Heart / Dil / BP / Cholesterol / Hridya
    if (
      (q.includes("heart") || q.includes("cardio") || q.includes("blood pressure") || q.includes("cholesterol") || q.includes("dil") || q.includes("hridya")) &&
      (product.id === "arjun-bark" || product.id === "arjun-bark-powder" || product.id === "flax-seeds")
    ) {
      score += 45;
    }

    // Skin / Hair / Chehra / Twacha / Pimples / Bal / Kesh
    if (
      (q.includes("skin") || q.includes("acne") || q.includes("blood purifier") || q.includes("eczema") || q.includes("glow") ||
       q.includes("twacha") || q.includes("chehra") || q.includes("khoon saaf") || q.includes("muhase") || q.includes("hair") || q.includes("bal") || q.includes("kesh")) &&
      (product.id === "neem-leaves" || product.id === "neem-powder" || product.id === "amla-powder" || product.id === "hibiscus-flowers" || product.id === "hibiscus-powder" || product.id === "rose-petals" || product.id === "safed-musli" || product.id === "kashmiri-saffron")
    ) {
      score += 45;
    }

    // Stamina / Vitality / Taqat / Purush / Women wellness
    if (
      (q.includes("stamina") || q.includes("vitality") || q.includes("vigor") || q.includes("taqat") || q.includes("kamzori") || q.includes("purush") || q.includes("female") || q.includes("mahila")) &&
      (product.id === "safed-musli" || product.id === "ashwagandha-root" || product.id === "shilajit-resin" || product.id === "shatavari-root" || product.id === "ashoka-bark")
    ) {
      score += 45;
    }

    // Raw Herb / Jadi Buti / Patti / Jad / Chhal
    if (
      (q.includes("raw herb") || q.includes("leaves") || q.includes("roots") || q.includes("bark") || q.includes("jadi buti") || q.includes("jadibuti") || q.includes("patti") || q.includes("chhal")) &&
      (product.sourceType === "herbal")
    ) {
      score += 20;
    }

    // Spices / Khada Masala
    if (
      (q.includes("spice") || q.includes("pepper") || q.includes("cardamom") || q.includes("saffron") || q.includes("shilajit") || q.includes("masala") || q.includes("khada masala")) &&
      (product.sourceType === "spice" || catLower.includes("spice"))
    ) {
      score += 35;
    }

    return { product, score };
  });

  const sorted = scored
    .filter((s) => s.score >= 15)
    .sort((a, b) => b.score - a.score);

  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  const uniqueProducts: UnifiedProduct[] = [];

  for (const s of sorted) {
    const normName = s.product.name.toLowerCase().trim();
    if (!seenIds.has(s.product.id) && !seenNames.has(normName)) {
      seenIds.add(s.product.id);
      seenNames.add(normName);
      uniqueProducts.push(s.product);
    }
    if (uniqueProducts.length >= limit) break;
  }

  return uniqueProducts;
}

/**
 * Find exact product by ID or name
 */
export function getCatalogProductById(id: string): UnifiedProduct | undefined {
  return UNIFIED_CATALOG.find((p) => p.id === id || p.name.toLowerCase() === id.toLowerCase());
}
