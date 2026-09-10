"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UnifiedProduct } from "@/utils/aiCatalog";
import { X, ShoppingBag, Send, Heart, Check, Sparkles, MapPin, Scale, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductDetailModalProps {
  product: UnifiedProduct | null;
  onClose: () => void;
  onOpenQuoteModal: (productName?: string) => void;
  onAddToCartToast?: (productName: string) => void;
}

export const AskShivaProductDetailModal = ({
  product,
  onClose,
  onOpenQuoteModal,
  onAddToCartToast,
}: ProductDetailModalProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id || product.name);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        hindiName: product.hindiName,
        category: product.category,
        image: product.image,
        moq: product.moq,
      },
      100,
      "Kg"
    );
    if (onAddToCartToast) {
      onAddToCartToast(product.name);
    }
  };

  const handleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      hindiName: product.hindiName,
      category: product.category,
      image: product.image,
      moq: product.moq,
      botanicalName: product.botanicalName,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-[#213833] border border-white/[0.15] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-6 text-[#D0D9D8]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#172925] text-[#D0D9D8] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            {/* Top Header & Image */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-full sm:w-48 h-48 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-[#172925]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#172925]/90 border border-white/10 text-[10px] font-mono text-[#769489] uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block">
                    {product.sourceType === "spice" ? "Wholesale Spice" : "Herbal Botanical"}
                  </span>
                  <button
                    onClick={handleWishlist}
                    className={`p-2 rounded-full border border-white/10 transition-colors cursor-pointer ${
                      inWishlist
                        ? "bg-rose-500 text-white"
                        : "bg-[#172925] text-[#D0D9D8] hover:text-rose-400"
                    }`}
                    title={inWishlist ? "Saved in Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
                  </button>
                </div>

                <h3 className="text-2xl font-serif text-[#D0D9D8] font-bold">
                  {product.name} {product.hindiName ? `(${product.hindiName})` : ""}
                </h3>

                <p className="text-xs italic text-[#98B4A1] font-light">
                  Botanical / Scientific: {product.botanicalName}
                </p>

                <p className="text-xs text-[#98B4A1] font-light leading-relaxed pt-2">
                  {product.fullDescription || product.shortDescription}
                </p>
              </div>
            </div>

            {/* Detailed Specs Grid */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-[#98B4A1]">
              <div className="bg-[#172925] p-3 rounded-xl border border-white/5">
                <span className="text-[#769489] uppercase flex items-center space-x-1 mb-1">
                  <Package className="w-3.5 h-3.5" />
                  <span>Cut Form / Grade</span>
                </span>
                <p className="text-[#D0D9D8] font-medium">{product.form}</p>
              </div>

              <div className="bg-[#172925] p-3 rounded-xl border border-white/5">
                <span className="text-[#769489] uppercase flex items-center space-x-1 mb-1">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Bulk Supply</span>
                </span>
                <p className="text-[#D0D9D8] font-medium">{product.bulkAvailability}</p>
              </div>

              <div className="bg-[#172925] p-3 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[#769489] uppercase flex items-center space-x-1 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sourcing Origin</span>
                </span>
                <p className="text-[#D0D9D8] font-medium">{product.origin || "India"}</p>
              </div>
            </div>

            {/* Active Compounds (if available) */}
            {product.activeCompounds && (
              <div className="bg-[#172925] p-3.5 rounded-xl border border-white/10 text-xs">
                <span className="text-[#769489] font-mono uppercase block mb-1 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#769489]" />
                  <span>Standardized Active Assay</span>
                </span>
                <p className="text-[#D0D9D8] font-light leading-relaxed">
                  {product.activeCompounds}
                </p>
              </div>
            )}

            {/* Applications & Uses */}
            {product.uses && product.uses.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block">
                  Commercial Applications
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.uses.map((use, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] flex items-center space-x-1.5"
                    >
                      <Check className="w-3 h-3 text-[#769489]" />
                      <span>{use}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap justify-end gap-3">
              <button
                onClick={handleAddToCart}
                className="px-5 py-3 rounded-full bg-[#172925] border border-white/10 text-xs font-mono text-[#D0D9D8] hover:bg-white/10 flex items-center space-x-2 cursor-pointer transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#769489]" />
                <span>+ Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  const targetName = product.name;
                  onClose();
                  onOpenQuoteModal(targetName);
                }}
                className="px-6 py-3 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Get Wholesale Quote</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
