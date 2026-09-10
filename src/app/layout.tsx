import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
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
  title: "Shiva Jadibuti Store | Wholesale & Retail Natural Herbs & Raw Material Supplier India",
  description: "Retail and wholesale supplier of authentic natural herbs, medicinal plants, dried roots, seeds, barks, powders, and raw ingredients in India.",
  keywords: [
    "Shiva Jadibuti Store",
    "Shop Retail Herbs",
    "Wholesale Natural Herbs",
    "Ayurvedic Raw Material Supplier",
    "Homeopathic Raw Ingredients",
    "Ashwagandha Roots",
    "Herbal Powders",
    "Bulk Dried Herbs Supply"
  ],
  authors: [{ name: "Shiva Jadibuti Store" }],
  openGraph: {
    title: "Shiva Jadibuti Store | Wholesale & Retail Natural Herbs & Spices",
    description: "Pan-India supplier of authentic medicinal herbs, retail packs & bulk botanical raw materials.",
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
              <OrderProvider>
                {children}
              </OrderProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
