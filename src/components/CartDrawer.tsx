"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  Send,
  MessageSquare,
  ArrowRight,
  Tag,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface CartDrawerProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const CartDrawer = ({ onOpenQuoteModal }: CartDrawerProps) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    updateUnit,
    clearCart,
    totalItems,
    subtotal,
    discount,
    deliveryCharge,
    grandTotal,
    appliedCoupon,
    couponMessage,
    applyCoupon,
    removeCoupon,
    hasRetailItems,
    hasWholesaleItems,
    isBulkOrderDetected
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let text = "Hello Shiva Jadibuti Store, I would like to place an order / inquiry:\n\n";
    cart.forEach((item, idx) => {
      if (item.itemType === "retail") {
        text += `${idx + 1}. *${item.name}* (${item.size || ""}) — ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}\n`;
      } else {
        text += `${idx + 1}. *${item.name}* (Wholesale) — ${item.quantity} ${item.unit}\n`;
      }
    });

    if (hasRetailItems) {
      text += `\n*Subtotal:* ₹${subtotal}\n`;
      if (discount > 0) text += `*Discount (${appliedCoupon}):* -₹${discount}\n`;
      text += `*Delivery:* ${deliveryCharge === 0 ? "FREE" : "₹" + deliveryCharge}\n`;
      text += `*Estimated Total:* ₹${grandTotal}\n`;
    }

    text += "\nPlease confirm availability and delivery schedule.";
    window.open(`https://wa.me/919958833536?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCheckoutQuote = () => {
    if (cart.length === 0) return;
    const multiProductName = cart
      .map((i) => (i.itemType === "retail" ? `${i.name} (${i.size} × ${i.quantity})` : `${i.name} (${i.quantity} ${i.unit})`))
      .join(", ");
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

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-6">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-screen max-w-md bg-[#213833] border-l border-white/[0.15] shadow-2xl text-[#D0D9D8] flex flex-col justify-between"
          >
            {/* Header */}
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
                  <h2 className="text-base font-serif font-bold text-[#D0D9D8]">Your Shopping Cart</h2>
                  <p className="text-[11px] text-[#98B4A1]">
                    {hasRetailItems && hasWholesaleItems
                      ? "Retail & Wholesale Items"
                      : hasWholesaleItems
                      ? "Wholesale Quote List"
                      : "Retail Order (Home & Personal)"}
                  </p>
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

            {/* Bulk Order Detection Alert Banner */}
            {isBulkOrderDetected && (
              <div className="mx-5 mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  <span className="font-bold block">Bulk Order Detected:</span>
                  <span>Items with wholesale quantities (25+ Kg) are eligible for direct factory rates.</span>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#172925] text-[#98B4A1] flex items-center justify-center mx-auto border border-white/10">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-serif text-[#D0D9D8]">Your Cart is Empty</h3>
                  <p className="text-xs text-[#98B4A1] max-w-xs mx-auto font-light leading-relaxed">
                    Explore our retail packs (100g, 250g, 500g, 1Kg) or add wholesale quantities for bulk orders.
                  </p>
                  <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#D0D9D8] transition-colors text-center"
                    >
                      Shop Retail Packs
                    </Link>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2 rounded-xl bg-[#172925] text-[#98B4A1] hover:text-[#D0D9D8] border border-white/10 text-xs font-mono"
                    >
                      Explore Wholesale
                    </button>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#172925] border border-white/[0.1] flex items-start space-x-3 shadow-sm hover:border-[#769489]/50 transition-all group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl border border-white/10 shrink-0 bg-[#213833]"
                    />

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0">
                          <h4 className="text-xs font-serif font-bold text-[#D0D9D8] truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center space-x-1.5 text-[10px] font-mono">
                            {item.itemType === "retail" ? (
                              <span className="text-[#769489] font-semibold">{item.size} Pack</span>
                            ) : (
                              <span className="text-amber-400 font-semibold uppercase">Wholesale Bulk</span>
                            )}
                            {item.hindiName && (
                              <span className="text-[#98B4A1]">({item.hindiName})</span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#98B4A1] hover:text-rose-400 p-1 transition-colors shrink-0 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Pricing & Stepper */}
                      <div className="flex items-center justify-between pt-1">
                        {/* Quantity Counter */}
                        {item.itemType === "retail" ? (
                          <div className="flex items-center bg-[#213833] rounded-lg border border-white/10 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-[#D0D9D8] hover:bg-white/10 cursor-pointer text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-[#D0D9D8]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-[#D0D9D8] hover:bg-white/10 cursor-pointer text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                              className="w-14 px-2 py-0.5 rounded-lg bg-[#213833] border border-white/10 text-xs font-bold text-[#D0D9D8] text-center"
                            />
                            <select
                              value={item.unit}
                              onChange={(e) => updateUnit(item.id, e.target.value)}
                              className="px-2 py-0.5 rounded-lg bg-[#213833] border border-white/10 text-[10px] text-[#D0D9D8] cursor-pointer"
                            >
                              <option value="Kg">Kg</option>
                              <option value="Quintal">Quintal</option>
                              <option value="Metric Ton">MT</option>
                            </select>
                          </div>
                        )}

                        {/* Line Total */}
                        {item.itemType === "retail" ? (
                          <div className="text-right">
                            <span className="text-xs font-bold text-[#769489]">
                              ₹{item.price * item.quantity}
                            </span>
                            {item.mrp && (
                              <span className="text-[10px] text-[#98B4A1] line-through block">
                                ₹{item.mrp * item.quantity}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Quote Req.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTAs */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-white/[0.1] bg-[#172925] space-y-3.5">
                {/* Coupon Input for Retail Orders */}
                {hasRetailItems && (
                  <div className="space-y-1.5">
                    {appliedCoupon ? (
                      <div className="p-2.5 rounded-xl bg-[#769489]/15 border border-[#769489]/30 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5 text-emerald-400 font-mono">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Code <strong>{appliedCoupon}</strong> (-₹{discount})</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex space-x-1.5">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Coupon (e.g. HERBAL10)"
                            className="w-full pl-8 pr-2 py-2 rounded-xl bg-[#213833] border border-white/10 text-xs text-[#D0D9D8] uppercase focus:border-[#769489] focus:outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3.5 py-2 rounded-xl bg-[#213833] hover:bg-[#769489] text-[#D0D9D8] hover:text-[#172925] text-xs font-bold transition-colors cursor-pointer border border-white/10"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {couponMessage && !appliedCoupon && (
                      <span className="text-[10px] text-amber-400 block px-1">{couponMessage}</span>
                    )}
                  </div>
                )}

                {/* Subtotal Calculation Breakdown */}
                {hasRetailItems && (
                  <div className="space-y-1 text-xs font-mono text-[#98B4A1] border-y border-white/5 py-2.5">
                    <div className="flex justify-between">
                      <span>Retail Subtotal:</span>
                      <strong className="text-[#D0D9D8]">₹{subtotal}</strong>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount:</span>
                        <strong>-₹{discount}</strong>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="flex items-center space-x-1">
                        <Truck className="w-3 h-3 text-[#769489]" />
                        <span>Delivery:</span>
                      </span>
                      <strong className={deliveryCharge === 0 ? "text-emerald-400" : "text-[#D0D9D8]"}>
                        {deliveryCharge === 0 ? "FREE (Above ₹999)" : `₹${deliveryCharge}`}
                      </strong>
                    </div>

                    <div className="flex justify-between text-sm text-[#D0D9D8] pt-1 font-bold font-sans">
                      <span>Total Amount:</span>
                      <span className="text-[#769489] text-base">₹{grandTotal}</span>
                    </div>
                  </div>
                )}

                {/* Main Action Buttons */}
                <div className="grid grid-cols-1 gap-2">
                  {/* Retail Checkout Button */}
                  {hasRetailItems && !isBulkOrderDetected && (
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95 text-center"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  {/* Wholesale Quote Buttons if bulk detected or requested */}
                  {(isBulkOrderDetected || hasWholesaleItems) && (
                    <button
                      onClick={handleCheckoutQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Request Wholesale Factory Quote</span>
                    </button>
                  )}

                  {/* WhatsApp Direct Order / Quote */}
                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#213833] hover:bg-[#769489]/20 text-[#D0D9D8] border border-white/10 font-semibold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#769489]" />
                    <span>Order / Inquire via WhatsApp</span>
                  </button>

                  <button
                    onClick={clearCart}
                    className="text-[11px] font-mono text-[#98B4A1] hover:text-rose-400 text-center py-1 transition-colors cursor-pointer"
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
