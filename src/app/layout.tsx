import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Shiva Jadibuti Store | Wholesale Natural Herbs & Raw Material Supplier India",
  description: "Wholesale supplier and trader of natural herbs, medicinal plants, dried roots, seeds, barks, powders, and raw ingredients for Ayurvedic & Homeopathic medicine manufacturers in India.",
  keywords: [
    "Shiva Jadibuti Store",
    "Wholesale Natural Herbs",
    "Ayurvedic Raw Material Supplier",
    "Homeopathic Raw Ingredients",
    "Ashwagandha Roots Wholesale",
    "Giloy Stem Wholesale",
    "Neem Tulsi Leaves Bulk",
    "Medicinal Herbs Trader India",
    "Bulk Dried Herbs Supply"
  ],
  authors: [{ name: "Shiva Jadibuti Store" }],
  openGraph: {
    title: "Shiva Jadibuti Store | Wholesale Natural Herbs & Raw Material Supplier",
    description: "Pan-India wholesale supplier of authentic medicinal herbs, roots, leaves & raw botanical ingredients.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
