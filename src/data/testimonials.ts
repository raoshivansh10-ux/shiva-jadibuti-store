export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Rajesh Sharma",
    role: "Head of Procurement & Quality",
    company: "Vedic Botanicals Pharma Pvt. Ltd.",
    location: "Haridwar, Uttarakhand",
    quote: "Shiva Jadibuti Store has been our trusted raw material supplier for over 6 years. Their Ashwagandha and Giloy roots consistently exceed our lab purity standards with optimal active withanolide levels. Dispatch is always punctual.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "2",
    name: "Ananya Deshmukh",
    role: "Senior Purchase Manager",
    company: "PureHerbs Homeopathic Laboratories",
    location: "Nagpur, Maharashtra",
    quote: "Finding high grade, clean, and properly sun-dried mother tincture raw materials used to be a major challenge until we partnered with Shiva Jadibuti. Their batch consistency and transparent pricing are unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "3",
    name: "Vikramjit Singh",
    role: "Director",
    company: "Himalayan Herbal Exporters",
    location: "Amritsar, Punjab",
    quote: "We export raw herbs to European & Middle Eastern markets. Shiva Jadibuti Store handles our bulk 10-ton orders with exceptional moisture control, vacuum packaging, and complete compliance documentation.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "4",
    name: "Suresh Menon",
    role: "Factory Operations Lead",
    company: "Keraleeya Ayurveda Pharmacy",
    location: "Thrissur, Kerala",
    quote: "Their clean deseeded Amla, Harad, and Shatavari tubres have streamlined our Kwath and Churna manufacturing lines significantly. Zero dust and zero foreign debris in bulk deliveries.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  }
];
