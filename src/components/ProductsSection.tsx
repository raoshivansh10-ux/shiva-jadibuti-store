"use client";

import { useState } from "react";
import { PRODUCTS, Product } from "@/data/products";
import { Send, Info, Check, Search, Filter, ShoppingBag, CheckCircle2, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductsSectionProps {
  onOpenQuoteModal: (productName?: string) => void;
  selectedCategoryFilter?: string;
  onSelectCategoryFilter?: (cat: string) => void;
}

export const ProductsSection = ({ onOpenQuoteModal, selectedCategoryFilter, onSelectCategoryFilter }: ProductsSectionProps) => {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState(selectedCategoryFilter || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = ["All", "Medicinal Roots", "Herbal Leaves", "Barks & Woods", "Resins & Gums", "Medicinal Fruits", "Botanical Extracts"];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(cat);
    }
  };

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      hindiName: product.hindiName,
      category: product.category,
      image: product.image,
      moq: product.moq
    }, 100, "Kg");

    setAddedToast(`Added "${product.name}" to Quote Cart`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isFav = isInWishlist(product.id || product.name);
    toggleWishlist({
      id: product.id,
      name: product.name,
      hindiName: product.hindiName,
      category: product.category,
      image: product.image,
      moq: product.moq,
      botanicalName: product.botanicalName
    });

    setAddedToast(isFav ? `Removed "${product.name}" from Wishlist` : `Saved "${product.name}" to Wishlist ♥`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const catToUse = selectedCategoryFilter || activeCategory;
    const matchesCategory = catToUse === "All" || p.category === catToUse;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.botanicalName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-28 md:py-36 bg-[#172925] border-t border-white/[0.08] relative">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#769489] text-[#172925] font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-fade-up">
          <CheckCircle2 className="w-4 h-4 text-[#172925]" />
          <span>{addedToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
            Complete Product Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8]">
            Wholesale Raw Botanical Materials
          </h2>
          <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
            Organoleptically verified and lab-tested raw herbs supplied in commercial quantities (100 kg to Metric Tons).
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#213833] rounded-3xl p-6 mb-12 border border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herb by English, Hindi, or Botanical name..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
              />
            </div>

            <span className="text-xs font-mono text-[#98B4A1]">
              Showing <strong className="text-[#769489] font-sans text-sm">{filteredProducts.length}</strong> Products
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/[0.08]">
            <span className="text-xs font-mono text-[#98B4A1] flex items-center mr-2 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  (selectedCategoryFilter || activeCategory) === cat
                    ? "bg-[#769489] text-[#172925] font-bold"
                    : "bg-[#172925] text-[#98B4A1] hover:text-[#D0D9D8] border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const inCart = cart.some(i => i.id === product.id || i.name === product.name);
            const isFav = isInWishlist(product.id || product.name);

            return (
              <div
                key={product.id}
                className="bg-[#213833] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#769489]/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Product Image Banner */}
                <div className="p-3 pb-0">
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-[#172925]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#213833] via-transparent to-transparent opacity-80" />

                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono text-[#769489] uppercase tracking-widest bg-[#172925]/90 border border-white/10">
                      {product.category}
                    </span>

                    {/* Action Triggers */}
                    <div className="absolute top-3 right-3 flex items-center space-x-2">
                      {/* Heart Wishlist Trigger */}
                      <button
                        onClick={(e) => handleToggleWishlist(product, e)}
                        className={`p-2 rounded-full transition-colors cursor-pointer ${
                          isFav ? "bg-rose-500 text-white" : "bg-black/40 text-[#D0D9D8] hover:bg-rose-500 hover:text-white"
                        }`}
                        title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                      </button>

                      {/* Info Detail Trigger */}
                      <button
                        onClick={() => setSelectedProductDetail(product)}
                        className="p-2 rounded-full bg-black/40 hover:bg-[#769489] hover:text-[#172925] text-[#D0D9D8] transition-colors cursor-pointer"
                        title="View Full Specifications"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#769489] block mb-0.5">{product.hindiName}</span>
                    <h3 className="text-xl font-serif text-[#D0D9D8] group-hover:text-[#769489] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs italic text-[#98B4A1] font-light mt-0.5">{product.botanicalName}</p>
                  </div>

                  <p className="text-xs text-[#98B4A1] font-light line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#98B4A1]">
                    <span>Bulk Supply:</span>
                    <span className="text-[#769489] font-bold">{product.moq}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`py-3 rounded-full border border-white/10 text-xs font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                      inCart ? "bg-[#769489] text-[#172925] font-bold" : "bg-[#172925] text-[#D0D9D8] hover:bg-white/10"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{inCart ? "In Cart ✓" : "+ Add Cart"}</span>
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(product.name)}
                    className="py-3 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Buy Product</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Product Spec Detail Modal */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#213833] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative text-[#D0D9D8] shadow-2xl">
            <button
              onClick={() => setSelectedProductDetail(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#172925] text-[#D0D9D8] hover:bg-white/10 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={selectedProductDetail.image}
                  alt={selectedProductDetail.name}
                  className="w-full sm:w-48 h-48 object-cover rounded-2xl border border-white/10"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block">
                      {selectedProductDetail.category}
                    </span>
                    <button
                      onClick={(e) => handleToggleWishlist(selectedProductDetail, e)}
                      className={`p-2 rounded-full border border-white/10 transition-colors cursor-pointer ${
                        isInWishlist(selectedProductDetail.id || selectedProductDetail.name)
                          ? "bg-rose-500 text-white"
                          : "bg-[#172925] text-[#D0D9D8] hover:text-rose-400"
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(selectedProductDetail.id || selectedProductDetail.name) ? "fill-white" : ""}`} />
                    </button>
                  </div>

                  <h3 className="text-2xl font-serif text-[#D0D9D8]">
                    {selectedProductDetail.name} ({selectedProductDetail.hindiName})
                  </h3>
                  <p className="text-xs italic text-[#98B4A1] font-light">
                    Botanical: {selectedProductDetail.botanicalName}
                  </p>
                  <p className="text-xs text-[#98B4A1] font-light leading-relaxed pt-2">
                    {selectedProductDetail.fullDescription}
                  </p>
                </div>
              </div>

              {/* Detailed Specs */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono text-[#98B4A1]">
                <div>
                  <span className="text-[#769489] uppercase block mb-1">Standard Cut Form</span>
                  <p className="text-[#D0D9D8]">{selectedProductDetail.cutForm}</p>
                </div>
                <div>
                  <span className="text-[#769489] uppercase block mb-1">Moisture Level</span>
                  <p className="text-[#D0D9D8]">{selectedProductDetail.moistureLevel}</p>
                </div>
                <div>
                  <span className="text-[#769489] uppercase block mb-1">Sourcing Belts</span>
                  <p className="text-[#D0D9D8]">{selectedProductDetail.originRegion}</p>
                </div>
                <div>
                  <span className="text-[#769489] uppercase block mb-1">Min Wholesale Order</span>
                  <p className="text-[#D0D9D8] font-bold">{selectedProductDetail.moq}</p>
                </div>
              </div>

              {/* Uses */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block">Primary Applications</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProductDetail.uses.map((u, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] flex items-center space-x-1">
                      <Check className="w-3 h-3 text-[#769489]" />
                      <span>{u}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-wrap justify-end gap-3">
                <button
                  onClick={(e) => handleToggleWishlist(selectedProductDetail, e)}
                  className="px-5 py-3 rounded-full bg-[#172925] border border-white/10 text-xs font-mono text-[#D0D9D8] hover:text-rose-400 flex items-center space-x-2 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(selectedProductDetail.id || selectedProductDetail.name) ? "fill-rose-400 text-rose-400" : ""}`} />
                  <span>{isInWishlist(selectedProductDetail.id || selectedProductDetail.name) ? "In Wishlist ♥" : "Add Wishlist"}</span>
                </button>

                <button
                  onClick={() => handleAddToCart(selectedProductDetail)}
                  className="px-5 py-3 rounded-full bg-[#172925] border border-white/10 text-xs font-mono text-[#D0D9D8] hover:bg-white/10 flex items-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#769489]" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={() => {
                    const name = selectedProductDetail.name;
                    setSelectedProductDetail(null);
                    onOpenQuoteModal(name);
                  }}
                  className="px-6 py-3 rounded-full bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Buy Product / Quote</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
