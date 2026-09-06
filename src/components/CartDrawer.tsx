"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, X, Trash2, Plus, Minus, Send, MessageSquare } from "lucide-react";

interface CartDrawerProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const CartDrawer = ({ onOpenQuoteModal }: CartDrawerProps) => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, updateUnit, clearCart, totalItems } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    
    let text = "Hello Shiva Jadibuti Store, I would like to request a bulk wholesale price quote:\n\n";
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}* — ${item.quantity} ${item.unit}\n`;
    });
    text += "\nPlease share your direct wholesale rates and dispatch availability.";

    window.open(`https://wa.me/919958833536?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCheckoutQuote = () => {
    if (cart.length === 0) return;
    const multiProductName = cart.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(", ");
    setIsCartOpen(false);
    onOpenQuoteModal(multiProductName);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-screen max-w-md bg-[#213833] border-l border-white/[0.15] shadow-2xl text-[#D0D9D8] flex flex-col justify-between"
          >
            {/* Simple Drawer Header */}
            <div className="p-5 border-b border-white/[0.12] flex items-center justify-between bg-[#172925]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-[#213833] text-[#769489] border border-white/10 relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#769489] text-[#172925] text-[9px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-base font-serif font-bold text-[#D0D9D8]">Your Quote Cart</h2>
                  <p className="text-[11px] text-[#98B4A1]">Review items & request pricing</p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-[#98B4A1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#172925] text-[#98B4A1] flex items-center justify-center mx-auto border border-white/10">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-serif text-[#D0D9D8]">Your Cart is Empty</h3>
                  <p className="text-xs text-[#98B4A1] max-w-xs mx-auto font-light leading-relaxed">
                    Click <strong>"+ Add Cart"</strong> on any product to build your wholesale order list.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#D0D9D8] transition-colors cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#172925] border border-white/[0.1] flex items-center space-x-3 shadow-sm hover:border-[#769489]/50 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl border border-white/10 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 pr-2">
                          <h4 className="text-xs font-serif font-bold text-[#D0D9D8] truncate">{item.name}</h4>
                          {item.hindiName && (
                            <span className="text-[10px] font-mono text-[#769489] block">{item.hindiName}</span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#98B4A1] hover:text-red-400 p-1 transition-colors flex-shrink-0 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Sleek Minimal Quantity & Unit selector */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-[#213833] rounded-lg border border-white/10 px-1 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 50 > 0 ? item.quantity - 50 : 10)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#D0D9D8] hover:bg-white/10 transition-colors text-xs font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-12 text-center text-xs font-bold bg-transparent text-[#D0D9D8] focus:outline-none appearance-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 50)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#D0D9D8] hover:bg-white/10 transition-colors text-xs font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <select
                          value={item.unit}
                          onChange={(e) => updateUnit(item.id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-[#213833] border border-white/10 text-xs text-[#D0D9D8] focus:outline-none font-medium cursor-pointer"
                        >
                          <option value="Kg">Kg</option>
                          <option value="Quintal">Quintal</option>
                          <option value="Metric Ton">Metric Ton</option>
                        </select>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Simple Footer Actions */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-white/[0.1] bg-[#172925] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#98B4A1]">
                  <span>Total Items:</span>
                  <span className="text-[#D0D9D8] font-bold text-xs">{cart.length} Products</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={handleCheckoutQuote}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Wholesale Quote</span>
                  </button>

                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-[#213833] hover:bg-[#769489] text-[#D0D9D8] hover:text-[#172925] border border-white/10 font-semibold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#769489]" />
                    <span>WhatsApp Quote</span>
                  </button>

                  <button
                    onClick={clearCart}
                    className="text-[11px] font-mono text-[#98B4A1] hover:text-red-400 text-center py-0.5 transition-colors cursor-pointer"
                  >
                    Clear Cart
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
