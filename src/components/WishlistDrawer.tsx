"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, X, Trash2, ShoppingBag, Send, ArrowRight } from "lucide-react";

interface WishlistDrawerProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const WishlistDrawer = ({ onOpenQuoteModal }: WishlistDrawerProps) => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      hindiName: item.hindiName,
      category: item.category,
      image: item.image,
      moq: item.moq
    }, 100, "Kg");
    removeFromWishlist(item.id);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        hindiName: item.hindiName,
        category: item.category,
        image: item.image,
        moq: item.moq
      }, 100, "Kg");
    });
    clearWishlist();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#213833] border-l border-white/[0.12] shadow-2xl text-[#D0D9D8] flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/[0.1] flex items-center justify-between bg-[#172925]">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#213833] text-rose-400 border border-white/10 relative">
                  <Heart className="w-5 h-5 fill-rose-400" />
                  {totalWishlistItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {totalWishlistItems}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#D0D9D8]">Favorites & Wishlist</h2>
                  <p className="text-xs text-[#98B4A1] font-light">Saved herbs for quick reordering</p>
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full text-[#98B4A1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items Scroll Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#172925] text-rose-400 flex items-center justify-center mx-auto border border-white/10">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-serif text-[#D0D9D8]">Your Wishlist is Empty</h3>
                  <p className="text-xs text-[#98B4A1] max-w-xs mx-auto font-light leading-relaxed">
                    Click the <strong>Heart icon</strong> on any product card to save your favorite herbs for future orders.
                  </p>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#D0D9D8] transition-colors cursor-pointer"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#172925] border border-white/[0.1] flex items-center space-x-4 shadow-sm hover:border-[#769489]/40 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-white/10 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-serif font-bold text-[#D0D9D8] truncate">{item.name}</h4>
                          {item.hindiName && (
                            <span className="text-[11px] font-mono text-[#769489] block">{item.hindiName}</span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-[#98B4A1] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Action buttons per item */}
                      <div className="pt-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-[11px] flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsWishlistOpen(false);
                            onOpenQuoteModal(item.name);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#213833] hover:bg-white/10 text-[#D0D9D8] border border-white/10 text-[11px] flex items-center space-x-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3 text-[#769489]" />
                          <span>Buy Now</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Wishlist Drawer Footer */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-white/[0.1] bg-[#172925] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#98B4A1]">
                  <span>Favorited Items:</span>
                  <span className="text-[#D0D9D8] font-bold text-sm">{wishlist.length} Items</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  <button
                    onClick={handleMoveAllToCart}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Move All Items to Cart</span>
                  </button>

                  <button
                    onClick={clearWishlist}
                    className="text-[11px] font-mono text-[#98B4A1] hover:text-rose-400 text-center py-1 transition-colors cursor-pointer"
                  >
                    Clear Wishlist
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
