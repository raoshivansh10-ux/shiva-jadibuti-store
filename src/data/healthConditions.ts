export interface HealthCondition {
  id: string;
  category: string;
  conditionTitle: string;
  conditionDescription: string;
  symptoms: string[];
  conditionImage: string;
  solutionHerbName: string;
  solutionHindiName: string;
  solutionHerbImage: string;
  activeCompounds: string;
  mechanismOfAction: string;
  moq: string;
}

export const HEALTH_CONDITIONS: HealthCondition[] = [
  {
    id: "stress-anxiety",
    category: "Mental & Nervous System",
    conditionTitle: "Chronic Stress, Anxiety & Memory Burnout",
    conditionDescription: "Elevated cortisol levels, nervous exhaustion, insomnia, and cognitive burnout brought on by severe modern oxidative stress.",
    symptoms: ["Insomnia & Restless Sleep", "Brain Fog & Lack of Focus", "High Serum Cortisol", "Adrenal Fatigue"],
    conditionImage: "/images/condition_stress.png",
    solutionHerbName: "Ashwagandha Root & Brahmi",
    solutionHindiName: "अश्वगंधा एवं ब्राह्मी",
    solutionHerbImage: "/images/ashwagandha_minimal.png",
    activeCompounds: "Withanolides (> 5%) & Bacosides A/B",
    mechanismOfAction: "Acts as a potent adaptogen that suppresses adrenal cortisol output, repairs synaptic dendrites, and boosts GABAergic neurotransmission for deep mental calm.",
    moq: "100 Kg to Metric Tons"
  },
  {
    id: "immunity-fever",
    category: "Immunity & Infectious Care",
    conditionTitle: "Low Immunity, Recurrent Fevers & Viral Defenses",
    conditionDescription: "Compromised lymphatic defense leading to frequent seasonal viral infections, low WBC count, dengue-induced platelet loss, and chronic fevers.",
    symptoms: ["Low Blood Platelet Count", "Recurrent Seasonal Fevers", "Slow Infection Recovery", "Lymphatic Sluggishness"],
    conditionImage: "/images/condition_immunity.png",
    solutionHerbName: "Giloy Stem (Amrita) & Tulsi",
    solutionHindiName: "गिलोय (गुडूची) एवं तुलसी",
    solutionHerbImage: "/images/giloy_minimal.png",
    activeCompounds: "Cordifolioside A, Alkaloids & Eugenol",
    mechanismOfAction: "Stimulates macrophage phagocytosis, boosts blood platelet proliferation, and exhibits natural antipyretic properties to clear deep-seated fever toxins (Ama).",
    moq: "500 Kg to 50 Metric Tons"
  },
  {
    id: "liver-digestion",
    category: "Hepatic & Gastrointestinal",
    conditionTitle: "Fatty Liver, Toxic Accumulation & Acid Reflux",
    conditionDescription: "Elevated liver enzymes (SGOT/SGPT), sluggish bile flow, fatty hepatocyte degeneration, and chronic indigestion from dietary toxins.",
    symptoms: ["Elevated Liver Enzymes", "Sluggish Bile Secretion", "Loss of Appetite & Bloating", "Hyperacidity"],
    conditionImage: "/images/condition_liver.png",
    solutionHerbName: "Kalmegh (King of Bitters) & Amla",
    solutionHindiName: "कालमेघ एवं सूखा आंवला",
    solutionHerbImage: "/images/kalmegh_minimal.png",
    activeCompounds: "Andrographolides & Bio-Tannins",
    mechanismOfAction: "Provides hepatoprotective shielding, promotes rapid liver tissue cell regeneration, and stimulates optimal bile secretion for complete toxin clearance.",
    moq: "300 Kg to 20 Metric Tons"
  },
  {
    id: "cardiovascular",
    category: "Cardiovascular Health",
    conditionTitle: "Hypertension, High Cholesterol & Vascular Stiffness",
    conditionDescription: "Elevated arterial blood pressure, arterial lipid plaque deposition, poor cardiac muscle tone, and vascular oxidative damage.",
    symptoms: ["High Blood Pressure", "Elevated LDL & Triglycerides", "Weak Cardiac Muscle Response", "Arterial Stiffness"],
    conditionImage: "/images/process_testing.png",
    solutionHerbName: "Arjun Bark (Terminalia Arjuna)",
    solutionHindiName: "अर्जुन छाल",
    solutionHerbImage: "/images/arjun_minimal.png",
    activeCompounds: "Coenzyme Q10, Arjunic Acid & Oligomeric Proanthocyanidins",
    mechanismOfAction: "Strengthens heart cardiac muscle contraction, dilates coronary blood vessels, and actively inhibits lipid peroxidation in arterial endothelial walls.",
    moq: "500 Kg to 40 Metric Tons"
  },
  {
    id: "respiratory",
    category: "Respiratory & Pulmonary",
    conditionTitle: "Bronchial Congestion, Asthma & Sore Throat",
    conditionDescription: "Heavy phlegm accumulation in bronchial tubes, persistent dry/wet cough, seasonal bronchial allergies, and sore vocal cord inflammation.",
    symptoms: ["Chronic Mucous Build-up", "Bronchial Spasms & Wheezing", "Sore Throat & Hoarseness", "Seasonal Allergies"],
    conditionImage: "/images/process_sorting.png",
    solutionHerbName: "Mulethi (Licorice) & Senna",
    solutionHindiName: "मुलेठी (यष्टिमधु) एवं सनाय",
    solutionHerbImage: "/images/mulethi_minimal.png",
    activeCompounds: "Glycyrrhizic Acid, Liquiritin & Sennosides",
    mechanismOfAction: "Demulcent effect coats and calms raw bronchial lining, loosens stubborn phlegm, and inhibits respiratory pathogen adherence.",
    moq: "200 Kg to 30 Metric Tons"
  },
  {
    id: "skin-blood",
    category: "Dermatology & Blood Purity",
    conditionTitle: "Acne Vulgaris, Eczema & Toxic Blood Impurities",
    conditionDescription: "Pitta imbalance resulting in accumulated blood impurities, chronic acne, skin rashes, psoriasis flare-ups, and systemic inflammation.",
    symptoms: ["Persistent Acne & Pimples", "Eczema & Skin Irritation", "Impure Blood Toxins", "Dermatological Redness"],
    conditionImage: "/images/neem_minimal.png",
    solutionHerbName: "Neem Leaves & Safed Musli",
    solutionHindiName: "नीम पत्ता एवं सफेद मूसली",
    solutionHerbImage: "/images/neem_minimal.png",
    activeCompounds: "Azadirachtin, Nimbin & Bio-Saponins",
    mechanismOfAction: "Acts as a powerful internal blood purifier (Raktashodhak), destroys skin bacteria, and accelerates skin cellular healing and collagen synthesis.",
    moq: "300 Kg to 15 Metric Tons"
  }
];
