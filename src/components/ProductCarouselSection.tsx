"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, Sparkles, PackageCheck, ShoppingBag, CheckCircle2, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCarouselProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const ProductCarouselSection = ({ onOpenQuoteModal }: ProductCarouselProps) => {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const flagshipProducts = [
    {
      id: "flagship-1",
      name: "Ashwagandha Root",
      hindiName: "अश्वगंधा",
      botanicalName: "Withania Somnifera",
      category: "Medicinal Roots",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      spec: "Withanolides > 2.5%",
      bulk: "500 Kg - 25 Tons"
    },
    {
      id: "flagship-2",
      name: "Tellicherry Black Pepper",
      hindiName: "काली मिर्च",
      botanicalName: "Piper nigrum",
      category: "Whole Spices",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      spec: "TGSEB Garbled 5% Piperine",
      bulk: "500 Kg - 50 Tons"
    },
    {
      id: "flagship-3",
      name: "Green Cardamom",
      hindiName: "हरी इलायची",
      botanicalName: "Elettaria cardamomum",
      category: "Whole Spices",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      spec: "8mm+ AGEB Extra Bold",
      bulk: "100 Kg - 15 Tons"
    },
    {
      id: "flagship-4",
      name: "Giloy Stem Stick",
      hindiName: "गिलोय / गुड़ूची",
      botanicalName: "Tinospora Cordifolia",
      category: "Medicinal Herbs",
      image: "https://images.unsplash.com/photo-1546852199-2d7e41706922?auto=format&fit=crop&w=800&q=80",
      spec: "Neem Climbing Mature Stem",
      bulk: "1000 Kg - 50 Tons"
    },
    {
      id: "flagship-5",
      name: "Rama & Shyama Tulsi Leaves",
      hindiName: "तुलसी पत्ती",
      botanicalName: "Ocimum Sanctum",
      category: "Herbal Leaves",
      image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80",
      spec: "Shade Dried Eugenol Rich",
      bulk: "200 Kg - 15 Tons"
    },
    {
      id: "flagship-6",
      name: "Cinnamomum Verum Quills",
      hindiName: "दालचीनी",
      botanicalName: "Cinnamomum verum",
      category: "Whole Spices",
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
      spec: "Ceylon C5 Special Quills",
      bulk: "300 Kg - 30 Tons"
    }
  ];

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("product-carousel-container");
    if (container) {
      const scrollAmount = direction === "left" ? -380 : 380;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (prod: any) => {
    addToCart({
      id: prod.id,
      name: prod.name,
      hindiName: prod.hindiName,
      category: prod.category,
      image: prod.image
    }, 100, "Kg");

    setAddedToast(`Added "${prod.name}" to Cart!`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleToggleWishlist = (prod: any) => {
    const isFav = isInWishlist(prod.id || prod.name);
    toggleWishlist({
      id: prod.id,
      name: prod.name,
      hindiName: prod.hindiName,
      category: prod.category,
      image: prod.image
    });

    setAddedToast(isFav ? `Removed "${prod.name}" from Wishlist` : `Saved "${prod.name}" to Wishlist ♥`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <section className="py-28 bg-[#172925] text-[#D0D9D8] relative overflow-hidden border-t border-white/[0.08]">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#769489] text-[#172925] font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-fade-up">
          <CheckCircle2 className="w-4 h-4 text-[#172925]" />
          <span>{addedToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#769489] bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/[0.1]">
              <Sparkles className="w-4 h-4 text-[#769489]" />
              <span>Flagship Showcase</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#D0D9D8]">
              Luxury <span className="gold-gradient-text">Wholesale Product Carousel</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#98B4A1] max-w-xl leading-relaxed">
              Swipe or scroll to explore our highest-demanded B2B botanical raw materials.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex space-x-3">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Scroll Left"
              className="p-3 rounded-xl bg-[#213833] border border-white/[0.1] text-[#D0D9D8] hover:border-[#769489]/50 hover:text-[#769489] transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Scroll Right"
              className="p-3 rounded-xl bg-[#213833] border border-white/[0.1] text-[#D0D9D8] hover:border-[#769489]/50 hover:text-[#769489] transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Container */}
        <div
          id="product-carousel-container"
          className="flex space-x-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory"
        >
          {flagshipProducts.map((prod, idx) => {
            const inCart = cart.some(i => i.id === prod.id || i.name === prod.name);
            const isFav = isInWishlist(prod.id || prod.name);

            return (
              <motion.div
                key={prod.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex-shrink-0 w-80 sm:w-96 rounded-2xl overflow-hidden bg-[#213833] border border-white/[0.1] hover:border-[#769489]/50 transition-all duration-300 snap-start group flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="p-3 pb-0">
                  <div className="relative h-60 rounded-xl overflow-hidden bg-[#172925] flex items-center justify-center">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#213833] via-transparent to-transparent opacity-80" />

                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-[#172925]/90 text-[#769489] border border-white/[0.08]">
                      {prod.category}
                    </span>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => handleToggleWishlist(prod)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors cursor-pointer ${
                        isFav ? "bg-rose-500 text-white" : "bg-black/40 text-[#D0D9D8] hover:bg-rose-500 hover:text-white"
                      }`}
                      title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-xs font-medium text-[#769489] block mb-0.5">
                      {prod.hindiName}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#D0D9D8] group-hover:text-[#769489] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs italic text-[#98B4A1] font-sans">
                      {prod.botanicalName}
                    </p>
                  </div>

                  {/* Specs Tags */}
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-md bg-[#172925] border border-white/[0.08] text-[#98B4A1] font-semibold">
                      {prod.spec}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#172925] border border-white/[0.08] text-[#769489] font-semibold flex items-center">
                      <PackageCheck className="w-3.5 h-3.5 mr-1 text-[#769489]" /> {prod.bulk}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className={`py-3 rounded-xl border border-white/[0.1] text-xs font-semibold flex items-center justify-center space-x-1 transition-colors cursor-pointer ${
                        inCart ? "bg-[#769489] text-[#172925] font-bold" : "bg-[#172925] text-[#D0D9D8] hover:bg-white/10"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#769489]" />
                      <span>{inCart ? "In Cart ✓" : "Add Cart"}</span>
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal(prod.name)}
                      className="py-3 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-1 active:scale-95 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Buy Product</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
