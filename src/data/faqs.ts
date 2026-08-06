export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "Do you supply bulk wholesale quantities across India?",
    answer: "Yes, Shiva Jadibuti Store specializes exclusively in bulk wholesale supply. We cater to orders ranging from 50 Kg minimum order quantities up to full 20-ton container loads across all states and Union Territories in India."
  },
  {
    question: "Which industries do you primary supply to?",
    answer: "We supply to licensed Ayurvedic medicine manufacturers, Homeopathic pharma companies, nutraceutical extractors, herbal tea blenders, cosmetic & personal care manufacturers, government procurement bodies, and international export houses."
  },
  {
    question: "Can I request custom quantities, cut sizes, or powder mesh sizes?",
    answer: "Absolutely! We offer custom processing services including whole root/stem cuts, tea-bag cut (TBC), coarse shreds, and micro-fine powders (60 to 120 mesh) tailored to your factory machinery specifications."
  },
  {
    question: "How do you ensure the purity and quality of your herbal raw materials?",
    answer: "All our herbs undergo a rigorous 5-stage quality process: direct origin sourcing, triple hand-sorting to eliminate foreign matter, solar & moisture-controlled drying, lab analysis for active marker compounds, and heavy metal/microbial compliance testing."
  },
  {
    question: "How can I request a price quote or place a wholesale order?",
    answer: "You can click on the 'Request a Quote' button on any product card, fill out our quick online quote request form, or connect directly with our wholesale sales desk via WhatsApp at +91 98765 43210 or email us at info@shivajadibutistore.com."
  },
  {
    question: "Do you provide Certificate of Analysis (COA) with bulk shipments?",
    answer: "Yes. Every bulk batch dispatched from our central warehouse is accompanied by a batch-specific Certificate of Analysis (COA) detailing moisture percentage, ash content, extractive value, and purity parameters."
  },
  {
    question: "What packaging options do you offer for transit safety?",
    answer: "We provide heavy-duty multi-layer HDPE bags, moisture-proof vacuum sealed bags, inner poly-lined gunny bags, and fiber drums for powders, ensuring complete protection against humidity, dust, and pest infestation during transit."
  }
];
