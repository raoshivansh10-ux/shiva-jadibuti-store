"use client";

import { useState, useMemo } from "react";
import { PRODUCTS, Product, getProductRetailVariants, getProductStartingRetailPrice } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { AskShivaFloatingButton, AskShivaChat } from "@/components/AskShiva";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Search,
  Filter,
  ShoppingBag,
  Heart,
  Info,
  Sparkles,
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Tag,
  ArrowUpDown,
  Layers,
  Star
} from "lucide-react";
import Link from "next/link";

export default function ShopPage() {
  const { addRetailItem, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState<string | undefined>(undefined);
  const [askShivaOpen, setAskShivaOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductMode, setSelectedProductMode] = useState<"retail" | "wholesale">("retail");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">("featured");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = [
    "All",
    "Herbal Powders",
    "Roots & Barks",
    "Spices",
    "Seeds",
    "Flowers",
    "Herbal Leaves",
    "Dry Fruits & Pods",
    "Medicinal Herbs"
  ];

  const handleOpenQuoteModal = (productName?: string) => {
    setQuoteInitialProduct(productName);
    setQuoteModalOpen(true);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
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
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleOpenDetail = (product: Product, mode: "retail" | "wholesale" = "retail") => {
    setSelectedProduct(product);
    setSelectedProductMode(mode);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      let matchesCat = selectedCategory === "All";
      if (!matchesCat) {
        const cat = p.category.toLowerCase();
        if (selectedCategory === "Herbal Powders") {
          matchesCat = cat.includes("powder");
        } else if (selectedCategory === "Roots & Barks") {
          matchesCat = cat.includes("root") || cat.includes("bark");
        } else if (selectedCategory === "Spices") {
          matchesCat = cat.includes("spice");
        } else if (selectedCategory === "Seeds") {
          matchesCat = cat.includes("seed") || cat.includes("natural ingredients");
        } else if (selectedCategory === "Flowers") {
          matchesCat = cat.includes("flower");
        } else if (selectedCategory === "Herbal Leaves") {
          matchesCat = cat.includes("leave") || cat.includes("leaf");
        } else if (selectedCategory === "Dry Fruits & Pods") {
          matchesCat = cat.includes("fruit");
        } else {
          matchesCat = cat.includes(selectedCategory.toLowerCase());
        }
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.hindiName ? p.hindiName.toLowerCase().includes(q) : false) ||
        p.botanicalName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.uses && p.uses.some((u) => u.toLowerCase().includes(q)));

      return matchesCat && matchesQuery;
    }).sort((a, b) => {
      const priceA = getProductStartingRetailPrice(a);
      const priceB = getProductStartingRetailPrice(b);
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // featured
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen relative flex flex-col bg-[#172925] text-[#D0D9D8] selection:bg-[#769489] selection:text-[#172925]">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#769489] text-[#172925] font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-fade-up">
          <CheckCircle2 className="w-4 h-4 text-[#172925]" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Retail Store Hero Banner */}
      <section className="pt-32 pb-14 sm:pt-36 sm:pb-16 bg-gradient-to-b from-[#13221f] via-[#172925] to-[#172925] border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#769489]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#769489] bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/10">
              <Package className="w-3.5 h-3.5 text-[#769489]" />
              <span>Direct Farm-Sourced Retail Packs (100g to 1Kg)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#D0D9D8]">
              Shiva Jadibuti <span className="gold-gradient-text">Retail Store</span>
            </h1>

            <p className="text-sm sm:text-base text-[#98B4A1] font-light leading-relaxed">
              Order laboratory-verified authentic raw Ayurvedic herbs, micro-milled powders, and whole spices in consumer-friendly pack sizes for home wellness and personal use.
            </p>

            {/* Value Trust Points */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#98B4A1]">
              <span className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-[#769489]" />
                <span>Free Shipping Above ₹999</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#769489]" />
                <span>100% Pure Chemical-Free</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#769489]" />
                <span>Pan-India Delivery in 3-5 Days</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Retail Catalog Section */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar: Search, Category Chips & Sorting */}
          <div className="bg-[#213833] rounded-3xl p-6 border border-white/10 space-y-5 shadow-xl">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search retail herbs e.g. 'Ashwagandha 500g', 'Haldi', 'Amla'..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-[#98B4A1] shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Sort:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3.5 py-3 rounded-2xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-t border-white/5 pt-4">
              <span className="text-xs font-mono text-[#98B4A1] flex items-center mr-2 shrink-0">
                <Filter className="w-3.5 h-3.5 mr-1" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#769489] text-[#172925] font-bold shadow-md"
                      : "bg-[#172925] text-[#98B4A1] hover:text-[#D0D9D8] border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Count & Wholesale Callout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#98B4A1]">
            <span>
              Showing <strong className="text-[#769489] text-sm font-sans">{filteredProducts.length}</strong> Retail Products
            </span>

            <div className="flex items-center space-x-2 bg-[#213833] px-3.5 py-1.5 rounded-full border border-white/5">
              <span>Looking for 25+ Kg bulk supply?</span>
              <button
                onClick={() => handleOpenQuoteModal()}
                className="text-[#769489] font-bold hover:underline cursor-pointer flex items-center space-x-1"
              >
                <span>Get B2B Quote</span>
                <Layers className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>

          {/* Retail Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const variants = getProductRetailVariants(product);
              const startingPrice = getProductStartingRetailPrice(product);
              const defaultVariant = variants[0];
              const inCart = cart.some((i) => i.productId === product.id);
              const isFav = isInWishlist(product.id || product.name);

              return (
                <div
                  key={product.id}
                  onClick={() => handleOpenDetail(product, "retail")}
                  className="bg-[#213833] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#769489]/50 transition-all duration-300 flex flex-col justify-between shadow-lg cursor-pointer"
                >
                  {/* Image & Wishlist Header */}
                  <div className="p-3 pb-0">
                    <div className="relative h-48 rounded-2xl overflow-hidden bg-[#172925]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#213833] via-transparent to-transparent opacity-70" />

                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#769489] uppercase tracking-widest bg-[#172925]/90 border border-white/10">
                        {product.category}
                      </span>

                      <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            isFav
                              ? "bg-rose-500 text-white"
                              : "bg-black/50 text-[#D0D9D8] hover:bg-rose-500 hover:text-white"
                          }`}
                          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-white" : ""}`} />
                        </button>
                      </div>

                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* Info Details */}
                  <div className="p-5 space-y-3">
                    <div>
                      {product.hindiName && (
                        <span className="text-[11px] font-mono text-[#769489] block">
                          {product.hindiName}
                        </span>
                      )}
                      <h3 className="text-base font-serif font-bold text-[#D0D9D8] group-hover:text-[#769489] transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-[11px] italic text-[#98B4A1] font-light truncate">
                        {product.botanicalName}
                      </p>
                    </div>

                    {/* Available Sizes Chips Preview */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {variants.slice(0, 3).map((v) => (
                        <span
                          key={v.id}
                          className="px-2 py-0.5 rounded-md bg-[#172925] border border-white/5 text-[10px] font-mono text-[#98B4A1]"
                        >
                          {v.size}
                        </span>
                      ))}
                      {variants.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-[#172925] border border-white/5 text-[10px] font-mono text-[#769489]">
                          +1
                        </span>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-[#98B4A1] font-mono block">From</span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-xl font-bold font-serif text-[#769489]">
                            ₹{startingPrice}
                          </span>
                          {defaultVariant?.mrp && (
                            <span className="text-xs text-[#98B4A1] line-through">
                              ₹{defaultVariant.mrp}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-[#98B4A1]">
                        100g — 1Kg
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(product, "retail");
                      }}
                      className="py-2.5 rounded-xl bg-[#172925] hover:bg-white/10 text-[#D0D9D8] border border-white/10 text-xs font-mono flex items-center justify-center space-x-1 transition-all cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Sizes</span>
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer ${
                        inCart
                          ? "bg-[#769489] text-[#172925]"
                          : "bg-[#769489] hover:bg-[#D0D9D8] text-[#172925]"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>+ Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenQuoteModal={handleOpenQuoteModal}
        initialMode={selectedProductMode}
      />

      {/* Request Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteInitialProduct}
      />

      {/* Sliding Cart Drawer */}
      <CartDrawer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Sliding Wishlist Drawer */}
      <WishlistDrawer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Auth Modal */}
      <AuthModal />

      {/* Ask Shiva AI Assistant */}
      <AskShivaFloatingButton onClick={() => setAskShivaOpen(true)} />
      <AskShivaChat
        isOpen={askShivaOpen}
        onClose={() => setAskShivaOpen(false)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Floating Actions */}
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
}
