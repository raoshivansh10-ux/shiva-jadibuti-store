"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RAW_SPICES, SpiceProduct } from "@/data/rawSpices";
import { Search, Filter, Send, Info, Check, MapPin, Award, Layers, X, Sparkles, ShoppingBag, CheckCircle2, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface SpiceProductsSectionProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const SpiceProductsSection = ({ onOpenQuoteModal }: SpiceProductsSectionProps) => {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProductDetail, setActiveProductDetail] = useState<SpiceProduct | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = ["All", "Whole Spices", "Dry Herbs", "Seeds & Raw Materials"];

  const handleAddToCart = (spice: SpiceProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart({
      id: spice.id,
      name: spice.name,
      hindiName: spice.hindiName,
      category: spice.category,
      image: spice.image
    }, 100, "Kg");

    setAddedToast(`Added "${spice.name}" to Cart!`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleToggleWishlist = (spice: SpiceProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isFav = isInWishlist(spice.id || spice.name);
    toggleWishlist({
      id: spice.id,
      name: spice.name,
      hindiName: spice.hindiName,
      category: spice.category,
      image: spice.image
    });

    setAddedToast(isFav ? `Removed "${spice.name}" from Wishlist` : `Saved "${spice.name}" to Wishlist ♥`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const filteredProducts = useMemo(() => {
    return RAW_SPICES.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.hindiName.toLowerCase().includes(query) ||
        p.scientificName.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="spice-products" className="py-28 bg-[#172925] text-[#D0D9D8] relative border-t border-white/[0.08]">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#769489] text-[#172925] font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-fade-up">
          <CheckCircle2 className="w-4 h-4 text-[#172925]" />
          <span>{addedToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#769489] bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/[0.1]"
          >
            <Sparkles className="w-4 h-4 text-[#769489]" />
            <span>Whole Spices & Spice Raw Materials</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#D0D9D8]"
          >
            Wholesale Raw Spices <span className="gold-gradient-text">(Khade Masale)</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#98B4A1] leading-relaxed"
          >
            Direct farm-sourced, lab-tested whole spices, dry herbs, and raw spice materials supplied in bulk metric tons for spice manufacturers, food industries, and exporters.
          </motion.p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#213833] rounded-2xl p-4 sm:p-6 mb-12 shadow-lg border border-white/[0.1] space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#98B4A1]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spice (e.g. Black Pepper, Cardamom)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] placeholder-[#98B4A1]/60 focus:outline-none focus:border-[#769489]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#769489] font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Product Counter */}
            <div className="text-xs font-semibold text-[#98B4A1]">
              Showing <span className="text-[#769489] font-bold text-sm">{filteredProducts.length}</span> of {RAW_SPICES.length} Wholesale Spices
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/[0.08]">
            <span className="text-xs font-semibold text-[#98B4A1] flex items-center mr-2 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1" /> Category:
            </span>
            {categories.map((cat) => {
              let label = cat;
              if (cat === "Whole Spices") label = "🌶 Whole Spices";
              if (cat === "Dry Herbs") label = "🌿 Dry Herbs";
              if (cat === "Seeds & Raw Materials") label = "🌱 Seeds & Raw Materials";

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#769489] text-[#172925] font-bold shadow-md"
                      : "bg-[#172925] text-[#98B4A1] hover:text-[#D0D9D8] border border-white/[0.08]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#213833] rounded-2xl p-8 border border-white/[0.1]">
            <p className="text-lg font-bold text-[#D0D9D8]">
              No spices found matching "{searchQuery}"
            </p>
            <p className="text-xs text-[#98B4A1] mt-2">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-5 py-2.5 bg-[#769489] text-[#172925] text-xs font-bold rounded-xl shadow-md cursor-pointer"
            >
              Reset Search & Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((spice, idx) => {
              const inCart = cart.some(i => i.id === spice.id || i.name === spice.name);
              const isFav = isInWishlist(spice.id || spice.name);

              return (
                <motion.div
                  key={spice.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                  className="group rounded-2xl overflow-hidden bg-[#213833] border border-white/[0.1] hover:border-[#769489]/50 shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="p-3 pb-0">
                    <div className="relative h-60 rounded-xl overflow-hidden bg-[#172925] flex items-center justify-center">
                      <img
                        src={spice.image}
                        alt={spice.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#213833] via-transparent to-transparent opacity-80" />
                      
                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-[#172925]/90 text-[#769489] border border-white/[0.08]">
                        {spice.category}
                      </span>

                      {/* Triggers Bar */}
                      <div className="absolute top-3 right-3 flex items-center space-x-2">
                        {/* Wishlist Heart Button */}
                        <button
                          onClick={(e) => handleToggleWishlist(spice, e)}
                          className={`p-2 rounded-full transition-colors cursor-pointer ${
                            isFav ? "bg-rose-500 text-white" : "bg-black/40 text-[#D0D9D8] hover:bg-rose-500 hover:text-white"
                          }`}
                          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                        </button>

                        {/* Quick Specs Trigger */}
                        <button
                          onClick={() => setActiveProductDetail(spice)}
                          className="p-2 rounded-full bg-black/40 hover:bg-[#769489] hover:text-[#172925] text-[#D0D9D8] transition-colors cursor-pointer"
                          title="View Detailed Specifications"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-xs font-medium text-[#769489] block mb-0.5">
                        {spice.hindiName}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#D0D9D8] group-hover:text-[#769489] transition-colors leading-snug">
                        {spice.name}
                      </h3>
                      <p className="text-xs italic text-[#98B4A1] font-sans mt-0.5">
                        {spice.scientificName}
                      </p>
                    </div>

                    <p className="text-xs text-[#98B4A1] line-clamp-2 leading-relaxed font-normal">
                      {spice.shortDescription}
                    </p>

                    {/* Specifications Pills */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.08] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#98B4A1] font-medium flex items-center">
                          <Award className="w-3.5 h-3.5 mr-1 text-[#769489]" /> Grade:
                        </span>
                        <span className="font-semibold text-[#D0D9D8] truncate max-w-[170px]" title={spice.grade}>
                          {spice.grade}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#98B4A1] font-medium flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-[#98B4A1]" /> Origin:
                        </span>
                        <span className="font-semibold text-[#D0D9D8]">
                          {spice.origin}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#98B4A1] font-medium flex items-center">
                          <Layers className="w-3.5 h-3.5 mr-1 text-[#98B4A1]" /> Bulk Supply:
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#172925] border border-white/[0.1] text-[#769489] font-bold text-[11px]">
                          {spice.bulkSupply}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                    <button
                      onClick={(e) => handleAddToCart(spice, e)}
                      className={`w-full py-2.5 px-3 rounded-xl border border-white/[0.1] text-xs font-semibold flex items-center justify-center space-x-1 transition-colors cursor-pointer ${
                        inCart ? "bg-[#769489] text-[#172925] font-bold" : "bg-[#172925] text-[#D0D9D8] hover:bg-white/[0.08]"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#769489]" />
                      <span>{inCart ? "In Cart ✓" : "+ Add Cart"}</span>
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal(spice.name)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Buy Spice</span>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Spec Detail Modal */}
      <AnimatePresence>
        {activeProductDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#213833] border border-white/[0.12] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl text-[#D0D9D8]"
            >
              <button
                onClick={() => setActiveProductDetail(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#172925] text-[#D0D9D8] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={activeProductDetail.image}
                  alt={activeProductDetail.name}
                  className="w-full sm:w-52 h-52 object-cover rounded-xl border border-white/[0.1] shadow-md"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 text-xs font-semibold rounded-md bg-[#172925] text-[#769489] border border-white/[0.1]">
                      {activeProductDetail.category}
                    </span>
                    <button
                      onClick={(e) => handleToggleWishlist(activeProductDetail, e)}
                      className={`p-2 rounded-full border border-white/10 transition-colors cursor-pointer ${
                        isInWishlist(activeProductDetail.id || activeProductDetail.name)
                          ? "bg-rose-500 text-white"
                          : "bg-[#172925] text-[#D0D9D8] hover:text-rose-400"
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(activeProductDetail.id || activeProductDetail.name) ? "fill-white" : ""}`} />
                    </button>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#D0D9D8]">
                    {activeProductDetail.name} ({activeProductDetail.hindiName})
                  </h3>
                  <p className="text-sm italic text-[#98B4A1]">
                    {activeProductDetail.scientificName}
                  </p>
                  <p className="text-xs text-[#98B4A1] pt-2 leading-relaxed font-normal">
                    {activeProductDetail.fullDescription}
                  </p>
                </div>
              </div>

              {/* Specs Details */}
              <div className="mt-6 pt-4 border-t border-white/[0.1] grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-[#D0D9D8] block">Quality Grade:</span>
                  <span className="text-[#98B4A1] font-medium">{activeProductDetail.grade}</span>
                </div>
                <div>
                  <span className="font-bold text-[#D0D9D8] block">Sourcing Origin:</span>
                  <span className="text-[#98B4A1] font-medium">{activeProductDetail.origin}</span>
                </div>
                <div>
                  <span className="font-bold text-[#D0D9D8] block">Available Packaging:</span>
                  <span className="text-[#98B4A1] font-medium">{activeProductDetail.packaging}</span>
                </div>
                <div>
                  <span className="font-bold text-[#D0D9D8] block">Bulk Capacity:</span>
                  <span className="text-[#769489] font-bold">{activeProductDetail.bulkSupply}</span>
                </div>
              </div>

              {/* Industrial Uses */}
              <div className="mt-4 pt-4 border-t border-white/[0.1]">
                <h4 className="text-xs font-bold text-[#D0D9D8] mb-2">Key Industrial Applications:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProductDetail.uses.map((u, i) => (
                    <span key={i} className="flex items-center space-x-1 px-3 py-1 rounded-md bg-[#172925] border border-white/[0.1] text-[11px] text-[#98B4A1]">
                      <Check className="w-3 h-3 text-[#769489]" />
                      <span>{u}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  onClick={(e) => handleToggleWishlist(activeProductDetail, e)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-xl text-[#D0D9D8] bg-[#172925] border border-white/[0.1] hover:text-rose-400 flex items-center space-x-1.5 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(activeProductDetail.id || activeProductDetail.name) ? "fill-rose-400 text-rose-400" : ""}`} />
                  <span>{isInWishlist(activeProductDetail.id || activeProductDetail.name) ? "In Wishlist ♥" : "Add Wishlist"}</span>
                </button>

                <button
                  onClick={() => handleAddToCart(activeProductDetail)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-xl text-[#D0D9D8] bg-[#172925] border border-white/[0.1] flex items-center space-x-1.5 cursor-pointer hover:bg-white/10"
                >
                  <ShoppingBag className="w-4 h-4 text-[#769489]" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={() => {
                    const name = activeProductDetail.name;
                    setActiveProductDetail(null);
                    onOpenQuoteModal(name);
                  }}
                  className="px-6 py-2.5 text-xs font-bold rounded-xl text-[#172925] bg-[#769489] hover:bg-[#D0D9D8] shadow-md flex items-center space-x-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Buy Spice / Quote</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
