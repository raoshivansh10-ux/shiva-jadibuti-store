"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, getProductRetailVariants, RetailVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  X,
  ShoppingBag,
  Send,
  Heart,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Package,
  Layers,
  ArrowRight,
  Plus,
  Minus,
  AlertCircle
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenQuoteModal: (productName?: string) => void;
  initialMode?: "retail" | "wholesale";
}

export const ProductDetailModal = ({
  product,
  onClose,
  onOpenQuoteModal,
  initialMode = "retail"
}: ProductDetailModalProps) => {
  if (!product) return null;

  const { addRetailItem, addWholesaleItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState<"retail" | "wholesale">(initialMode);
  const variants = getProductRetailVariants(product);
  const [selectedVariant, setSelectedVariant] = useState<RetailVariant>(variants[0] || {
    id: "100g",
    size: "100 g",
    price: 149,
    mrp: 199,
    stock: 50,
    inStock: true
  });
  const [quantity, setQuantity] = useState(1);
  const [wholesaleQty, setWholesaleQty] = useState(100);
  const [wholesaleUnit, setWholesaleUnit] = useState("Kg");
  const [addedToast, setAddedToast] = useState(false);

  const isFav = isInWishlist(product.id || product.name);

  const handleAddRetailToCart = () => {
    addRetailItem(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleAddWholesaleToCart = () => {
    addWholesaleItem(product, wholesaleQty, wholesaleUnit);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleRequestQuote = () => {
    onClose();
    onOpenQuoteModal(`${product.name} (${wholesaleQty} ${wholesaleUnit})`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-[#213833] border border-white/[0.15] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl my-6 text-[#D0D9D8]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#172925] text-[#D0D9D8] hover:bg-white/10 hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Toast Notice */}
          {addedToast && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 bg-[#769489] text-[#172925] font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center space-x-1.5 animate-fade-down">
              <Check className="w-3.5 h-3.5" />
              <span>Added to Cart!</span>
            </div>
          )}

          {/* Product Header & Visual */}
          <div className="flex flex-col sm:flex-row gap-6 items-start pb-6 border-b border-white/10">
            <div className="relative w-full sm:w-52 h-52 shrink-0 rounded-2xl overflow-hidden bg-[#172925] border border-white/10 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#769489] uppercase tracking-widest bg-[#172925]/90 border border-white/10">
                {product.category}
              </span>
            </div>

            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#769489] block">
                  {product.hindiName}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-full border border-white/10 transition-colors cursor-pointer ${
                    isFav ? "bg-rose-500 text-white" : "bg-[#172925] text-[#D0D9D8] hover:text-rose-400"
                  }`}
                  title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#D0D9D8]">
                {product.name}
              </h2>
              <p className="text-xs italic text-[#98B4A1] font-light">
                Botanical: {product.botanicalName}
              </p>

              <p className="text-xs text-[#98B4A1] font-light leading-relaxed pt-1">
                {product.shortDescription || product.fullDescription}
              </p>
            </div>
          </div>

          {/* DUAL MODE SELECTOR: [ Retail Pack ] vs [ Wholesale / Bulk ] */}
          <div className="my-6">
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#172925] border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("retail")}
                className={`py-3 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  activeTab === "retail"
                    ? "bg-[#769489] text-[#172925] font-bold shadow-md"
                    : "text-[#98B4A1] hover:text-[#D0D9D8]"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Retail / Home (Grams & 1Kg)</span>
              </button>

              <button
                onClick={() => setActiveTab("wholesale")}
                className={`py-3 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  activeTab === "wholesale"
                    ? "bg-[#769489] text-[#172925] font-bold shadow-md"
                    : "text-[#98B4A1] hover:text-[#D0D9D8]"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Wholesale / Bulk (B2B Supply)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: RETAIL SHOPPING TAB */}
          {activeTab === "retail" ? (
            <div className="space-y-6 animate-fade-in">
              {/* Variant Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#98B4A1] mb-2.5">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#769489]/20 border-[#769489] text-[#D0D9D8] ring-1 ring-[#769489]"
                            : "bg-[#172925] border-white/10 text-[#98B4A1] hover:border-white/20"
                        }`}
                      >
                        <span className="block text-xs font-bold text-[#D0D9D8]">{variant.size}</span>
                        <div className="flex items-baseline space-x-1.5 mt-1">
                          <span className="text-sm font-extrabold text-[#769489]">₹{variant.price}</span>
                          {variant.mrp && (
                            <span className="text-[10px] text-[#98B4A1] line-through">₹{variant.mrp}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Quantity Bar */}
              <div className="p-4 rounded-2xl bg-[#172925] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#98B4A1] block">Retail Price:</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-serif font-bold text-[#769489]">
                      ₹{selectedVariant.price * quantity}
                    </span>
                    {selectedVariant.mrp && (
                      <span className="text-xs text-[#98B4A1] line-through">
                        ₹{selectedVariant.mrp * quantity}
                      </span>
                    )}
                    <span className="text-[10px] text-emerald-400 font-mono">
                      (Save {Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)}%)
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-[#98B4A1] font-mono">Qty:</span>
                  <div className="flex items-center bg-[#213833] rounded-xl border border-white/10 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#D0D9D8] hover:bg-white/10 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-[#D0D9D8]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#D0D9D8] hover:bg-white/10 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#98B4A1]">
                <div className="p-2.5 rounded-xl bg-[#172925] border border-white/5 flex flex-col items-center justify-center space-y-1">
                  <ShieldCheck className="w-4 h-4 text-[#769489]" />
                  <span>100% Pure Raw Herb</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#172925] border border-white/5 flex flex-col items-center justify-center space-y-1">
                  <Truck className="w-4 h-4 text-[#769489]" />
                  <span>Pan-India Delivery</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#172925] border border-white/5 flex flex-col items-center justify-center space-y-1">
                  <Sparkles className="w-4 h-4 text-[#769489]" />
                  <span>Lab Grade Verified</span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddRetailToCart}
                className="w-full py-4 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity} {selectedVariant.size} to Cart — ₹{selectedVariant.price * quantity}</span>
              </button>
            </div>
          ) : (
            /* TAB 2: WHOLESALE / B2B SUPPLY TAB */
            <div className="space-y-6 animate-fade-in">
              {/* Bulk Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-[#98B4A1]">
                <div className="p-3.5 rounded-xl bg-[#172925] border border-white/10">
                  <span className="text-[10px] uppercase text-[#769489] block mb-1">Minimum Order</span>
                  <strong className="text-sm font-sans text-[#D0D9D8]">{product.moq || "25 Kg"}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#172925] border border-white/10">
                  <span className="text-[10px] uppercase text-[#769489] block mb-1">Bulk Supply</span>
                  <strong className="text-xs font-sans text-[#D0D9D8]">{product.bulkAvailability}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#172925] border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-[#769489] block mb-1">Moisture Level</span>
                  <strong className="text-sm font-sans text-[#D0D9D8]">{product.moistureContent}</strong>
                </div>
              </div>

              {/* Wholesale Quantity Input */}
              <div className="p-4 rounded-2xl bg-[#172925] border border-white/10 space-y-3">
                <label className="block text-xs font-mono uppercase text-[#769489]">
                  Required Bulk Quantity:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={wholesaleQty}
                    onChange={(e) => setWholesaleQty(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#213833] border border-white/10 text-xs font-bold text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                    placeholder="e.g. 500"
                  />
                  <select
                    value={wholesaleUnit}
                    onChange={(e) => setWholesaleUnit(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-[#213833] border border-white/10 text-xs font-bold text-[#D0D9D8] focus:outline-none cursor-pointer"
                  >
                    <option value="Kg">Kg</option>
                    <option value="Quintal">Quintal</option>
                    <option value="Metric Ton">Metric Ton</option>
                  </select>
                </div>
                <p className="text-[11px] text-[#98B4A1] font-light">
                  Commercial factory rates, CoA certificates, and dispatch logistics provided upon quote submission.
                </p>
              </div>

              {/* Wholesale Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddWholesaleToCart}
                  className="py-3.5 rounded-xl bg-[#172925] hover:bg-white/10 border border-white/10 text-[#D0D9D8] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#769489]" />
                  <span>Add to Quote List</span>
                </button>

                <button
                  onClick={handleRequestQuote}
                  className="py-3.5 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Factory Quote</span>
                </button>
              </div>
            </div>
          )}

          {/* Full Specifications / Uses Footer */}
          {product.uses && product.uses.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#769489] block">
                Primary Applications & Sourcing Use:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.uses.map((use, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-[#172925] border border-white/5 text-[11px] text-[#98B4A1]"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
