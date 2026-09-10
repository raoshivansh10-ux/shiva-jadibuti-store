"use client";

import { useState } from "react";
import { PRODUCTS, Product, getProductStartingRetailPrice, getProductRetailVariants } from "@/data/products";
import { Send, Info, Check, Search, Filter, ShoppingBag, CheckCircle2, Heart, Package, Layers, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductDetailModal } from "@/components/ProductDetailModal";

interface ProductsSectionProps {
  onOpenQuoteModal: (productName?: string) => void;
  selectedCategoryFilter?: string;
  onSelectCategoryFilter?: (cat: string) => void;
}

export const ProductsSection = ({ onOpenQuoteModal, selectedCategoryFilter, onSelectCategoryFilter }: ProductsSectionProps) => {
  const { addRetailItem, addWholesaleItem, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState(selectedCategoryFilter || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCatalogMode, setActiveCatalogMode] = useState<"retail" | "wholesale">("retail");
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [detailModalMode, setDetailModalMode] = useState<"retail" | "wholesale">("retail");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = [
    "All",
    "Herbal Powders",
    "Roots",
    "Leaves",
    "Bark",
    "Seeds",
    "Spices",
    "Flowers",
    "Fruits",
    "Medicinal Herbs"
  ];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(cat);
    }
  };

  const handleQuickAdd = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeCatalogMode === "retail") {
      const variants = getProductRetailVariants(product);
      const defaultVariant = variants[0] || {
        id: "100g",
        size: "100 g",
        price: 149,
        mrp: 199,
        stock: 50,
        inStock: true
      };
      addRetailItem(product, defaultVariant, 1);
      setAddedToast(`Added "${product.name} (${defaultVariant.size})" to Cart!`);
    } else {
      addWholesaleItem(product, 100, "Kg");
      setAddedToast(`Added "${product.name} (100 Kg)" to Quote List!`);
    }

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

  const openProductDetail = (product: Product, mode: "retail" | "wholesale" = activeCatalogMode) => {
    setDetailModalMode(mode);
    setSelectedProductDetail(product);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const catToUse = selectedCategoryFilter || activeCategory;
    let matchesCategory = catToUse === "All";
    if (!matchesCategory) {
      const pCat = p.category.toLowerCase();
      if (catToUse === "Herbal Powders" || catToUse === "Herbs Powder") {
        matchesCategory = pCat.includes("powder");
      } else if (catToUse === "Roots") {
        matchesCategory = pCat.includes("root");
      } else if (catToUse === "Leaves") {
        matchesCategory = pCat.includes("leave") || pCat.includes("leaf");
      } else if (catToUse === "Bark") {
        matchesCategory = pCat.includes("bark");
      } else if (catToUse === "Seeds") {
        matchesCategory = pCat.includes("seed") || pCat.includes("natural ingredients");
      } else if (catToUse === "Spices") {
        matchesCategory = pCat.includes("spice");
      } else if (catToUse === "Flowers") {
        matchesCategory = pCat.includes("flower");
      } else if (catToUse === "Fruits") {
        matchesCategory = pCat.includes("fruit");
      } else {
        matchesCategory = pCat.includes(catToUse.toLowerCase());
      }
    }

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      (p.hindiName ? p.hindiName.toLowerCase().includes(q) : false) ||
      p.botanicalName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.form.toLowerCase().includes(q) ||
      (p.uses && p.uses.some((u) => u.toLowerCase().includes(q)));

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
        
        {/* Header with Mode Selection */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
              Pure Ayurvedic Botanicals & Bulk Raw Materials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8]">
              {activeCatalogMode === "retail" ? "Retail Shop & Home Packs" : "Wholesale Raw Botanicals"}
            </h2>
            <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
              {activeCatalogMode === "retail"
                ? "Organically sourced, lab-verified authentic herbal powders, roots & whole spices packed in convenient 100g to 1Kg pouches for personal & family use."
                : "Commercial supply & export grade botanicals supplied in commercial bulk quantities (100 Kg to 50 Metric Tons) for pharma, nutraceutical & ayurvedic manufacturing."}
            </p>
          </div>

          {/* DUAL MODE TOGGLE BUTTONS */}
          <div className="bg-[#213833] p-1.5 rounded-2xl border border-white/10 flex items-center shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setActiveCatalogMode("retail")}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                activeCatalogMode === "retail"
                  ? "bg-[#769489] text-[#172925] shadow-lg"
                  : "text-[#98B4A1] hover:text-[#D0D9D8]"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Retail Packs (100g - 1Kg)</span>
            </button>

            <button
              onClick={() => setActiveCatalogMode("wholesale")}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                activeCatalogMode === "wholesale"
                  ? "bg-[#769489] text-[#172925] shadow-lg"
                  : "text-[#98B4A1] hover:text-[#D0D9D8]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Wholesale Bulk (B2B)</span>
            </button>
          </div>
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

            <div className="flex items-center space-x-4">
              <span className="text-xs font-mono text-[#98B4A1]">
                Showing <strong className="text-[#769489] font-sans text-sm">{filteredProducts.length}</strong> Products
              </span>
              {activeCatalogMode === "retail" && (
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3 mr-1" /> Free Delivery above ₹999
                </span>
              )}
            </div>
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
            const startingPrice = getProductStartingRetailPrice(product);

            return (
              <div
                key={product.id}
                onClick={() => openProductDetail(product)}
                className="bg-[#213833] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#769489]/50 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductDetail(product);
                        }}
                        className="p-2 rounded-full bg-black/40 hover:bg-[#769489] hover:text-[#172925] text-[#D0D9D8] transition-colors cursor-pointer"
                        title="View Full Specifications & Pack Sizes"
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
                    {product.shortDescription || product.fullDescription}
                  </p>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#98B4A1]">
                    {activeCatalogMode === "retail" ? (
                      <>
                        <span>Retail Packs from:</span>
                        <span className="text-[#769489] font-bold text-sm">₹{startingPrice} <span className="text-[10px] font-normal text-[#98B4A1]">/ 100g</span></span>
                      </>
                    ) : (
                      <>
                        <span>Wholesale MOQ:</span>
                        <span className="text-[#769489] font-bold">{product.moq || "25 Kg"}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`py-3 rounded-full border border-white/10 text-xs font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                      inCart ? "bg-[#769489] text-[#172925] font-bold" : "bg-[#172925] text-[#D0D9D8] hover:bg-white/10"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{inCart ? "In Cart ✓" : "+ Add Cart"}</span>
                  </button>

                  <button
                    onClick={() => openProductDetail(product, activeCatalogMode)}
                    className="py-3 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{activeCatalogMode === "retail" ? "Select Pack" : "Buy / Quote"}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* DUAL PRODUCT DETAIL MODAL (RETAIL PACKS + WHOLESALE B2B) */}
      <ProductDetailModal
        product={selectedProductDetail}
        initialMode={detailModalMode}
        onClose={() => setSelectedProductDetail(null)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

    </section>
  );
};
