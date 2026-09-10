"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { AuthModal } from "@/components/AuthModal";
import { QuoteModal } from "@/components/QuoteModal";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Tag,
  AlertCircle,
  Lock,
  Sparkles,
  MapPin,
  Phone,
  User,
  Mail
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discount,
    deliveryCharge,
    grandTotal,
    appliedCoupon,
    couponMessage,
    applyCoupon,
    removeCoupon,
    clearCart,
    hasRetailItems
  } = useCart();
  const { user, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { createOrder } = useOrders();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Delhi NCR");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [couponInput, setCouponInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Pre-fill with logged-in user profile if available
  useEffect(() => {
    if (user) {
      if (!fullName && user.name) setFullName(user.name);
      if (!email && user.email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
    }
  }, [user]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cart.length === 0 || !hasRetailItems) {
      setErrorMessage("Your cart has no retail items to checkout.");
      return;
    }

    if (!fullName.trim() || !phone.trim() || !addressLine.trim() || !city.trim() || !pincode.trim()) {
      setErrorMessage("Please complete all required shipping address fields.");
      return;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate gateway processing delay
      await new Promise((r) => setTimeout(r, 1200));

      const newOrder = createOrder({
        clerkUserId: user?.id,
        customerName: fullName,
        phone,
        email: email || user?.email,
        items: cart.filter((i) => i.itemType === "retail"),
        subtotal,
        discount,
        couponCode: appliedCoupon || undefined,
        deliveryCharge,
        total: grandTotal,
        shippingAddress: {
          fullName,
          phone,
          email,
          addressLine,
          city,
          state,
          pincode,
          landmark
        },
        paymentMethod,
        paymentStatus: paymentMethod === "online" ? "Paid" : "Pending"
      });

      // Confetti effect
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Clear retail items in cart
      clearCart();

      // Redirect to Order Success & Tracking page
      router.push(`/orders?id=${newOrder.orderId}`);
    } catch (err) {
      console.error("Order creation error:", err);
      setErrorMessage("Failed to process order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#172925] text-[#D0D9D8] selection:bg-[#769489] selection:text-[#172925]">
      {/* Navbar */}
      <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      {/* Header Banner */}
      <section className="pt-32 pb-8 sm:pt-36 sm:pb-10 bg-gradient-to-b from-[#13221f] to-[#172925] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-[#769489] mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Retail Checkout</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#D0D9D8]">
                Secure Retail Checkout
              </h1>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#98B4A1] hover:text-[#D0D9D8] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Retail Shop</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Checkout Area */}
      <section className="py-10 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cart.length === 0 || !hasRetailItems ? (
            <div className="text-center py-20 bg-[#213833] rounded-3xl border border-white/10 max-w-xl mx-auto p-8 space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-[#172925] text-[#98B4A1] flex items-center justify-center mx-auto border border-white/10">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#D0D9D8]">Your Cart is Empty</h2>
              <p className="text-xs text-[#98B4A1] font-light leading-relaxed">
                You do not have any retail items in your shopping cart to checkout.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#D0D9D8] transition-colors"
                >
                  Browse Retail Shop
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Shipping & Payment (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Account / Customer Info Banner */}
                <div className="bg-[#213833] rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#769489] text-[#172925] font-bold text-xs flex items-center justify-center">
                        1
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#D0D9D8]">Customer Information</h3>
                    </div>

                    {!user && (
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("login");
                          setIsAuthModalOpen(true);
                        }}
                        className="text-xs text-[#769489] font-mono hover:underline cursor-pointer"
                      >
                        Sign In for Faster Checkout
                      </button>
                    )}
                  </div>

                  {user ? (
                    <div className="p-3.5 rounded-2xl bg-[#172925] border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <User className="w-4 h-4 text-[#769489]" />
                        <div>
                          <strong className="text-[#D0D9D8] block">{user.name}</strong>
                          <span className="text-[11px] text-[#98B4A1]">{user.email}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Logged In
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Rajesh Sharma"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                          Email Address (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="rajesh@gmail.com"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Delivery Address */}
                <div className="bg-[#213833] rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#769489] text-[#172925] font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#D0D9D8]">Delivery Address</h3>
                  </div>

                  <div className="space-y-3.5">
                    {user && !fullName && (
                      <div>
                        <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                          Recipient Name *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                          required
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                          Mobile / WhatsApp Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                          PIN Code (Postal Code) *
                        </label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                          <input
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="110006"
                            maxLength={6}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                        Flat / House No. / Building & Street Address *
                      </label>
                      <input
                        type="text"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        placeholder="House No., Street Name, Area / Colony"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                          City / Town *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Delhi, Mumbai, Bengaluru"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                          State *
                        </label>
                        <select
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] focus:outline-none cursor-pointer"
                        >
                          <option value="Delhi NCR">Delhi NCR</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Other">Other State</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D0D9D8] mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Temple, Opposite Market, etc."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method Selection */}
                <div className="bg-[#213833] rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#769489] text-[#172925] font-bold text-xs flex items-center justify-center">
                      3
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#D0D9D8]">Select Payment Method</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Online Gateway Option */}
                    <div
                      onClick={() => setPaymentMethod("online")}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        paymentMethod === "online"
                          ? "bg-[#769489]/20 border-[#769489] ring-1 ring-[#769489]"
                          : "bg-[#172925] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs font-bold text-[#D0D9D8]">
                          <CreditCard className="w-4 h-4 text-[#769489]" />
                          <span>Online UPI / Cards / NetBanking</span>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="accent-[#769489]"
                        />
                      </div>
                      <p className="text-[11px] text-[#98B4A1] font-light leading-relaxed">
                        Instant zero-fee payment via Google Pay, PhonePe, Paytm, Debit/Credit Card, or NetBanking.
                      </p>
                      <div className="pt-1 flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Payment Gateway Configured & Sandbox Ready</span>
                      </div>
                    </div>

                    {/* Cash on Delivery Option */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        paymentMethod === "cod"
                          ? "bg-[#769489]/20 border-[#769489] ring-1 ring-[#769489]"
                          : "bg-[#172925] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs font-bold text-[#D0D9D8]">
                          <Banknote className="w-4 h-4 text-[#769489]" />
                          <span>Cash on Delivery (COD)</span>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="accent-[#769489]"
                        />
                      </div>
                      <p className="text-[11px] text-[#98B4A1] font-light leading-relaxed">
                        Pay cash upon delivery at your doorstep via verified express courier.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Review (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#213833] rounded-3xl p-6 border border-white/10 space-y-5 shadow-xl sticky top-28">
                  <h3 className="text-base font-serif font-bold text-[#D0D9D8] border-b border-white/10 pb-3">
                    Order Summary ({cart.length} items)
                  </h3>

                  {/* Cart Line Items */}
                  <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                    {cart
                      .filter((i) => i.itemType === "retail")
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs bg-[#172925] p-3 rounded-2xl border border-white/5"
                        >
                          <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                            <div className="truncate">
                              <h4 className="font-bold text-[#D0D9D8] truncate">{item.name}</h4>
                              <span className="text-[10px] font-mono text-[#769489]">
                                {item.size} × {item.quantity}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <strong className="text-[#769489] block">
                              ₹{item.price * item.quantity}
                            </strong>
                            {item.mrp && (
                              <span className="text-[10px] text-[#98B4A1] line-through">
                                ₹{item.mrp * item.quantity}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Coupon Code Box */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {appliedCoupon ? (
                      <div className="p-2.5 rounded-xl bg-[#769489]/15 border border-[#769489]/30 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5 text-emerald-400 font-mono">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Code <strong>{appliedCoupon}</strong> (-₹{discount})</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-1.5">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Promo Code (HERBAL10)"
                            className="w-full pl-8 pr-2 py-2 rounded-xl bg-[#172925] border border-white/10 text-xs text-[#D0D9D8] uppercase focus:border-[#769489] focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-3.5 py-2 rounded-xl bg-[#172925] hover:bg-[#769489] text-[#D0D9D8] hover:text-[#172925] text-xs font-bold transition-colors cursor-pointer border border-white/10"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {couponMessage && !appliedCoupon && (
                      <span className="text-[10px] text-amber-400 block px-1">{couponMessage}</span>
                    )}
                  </div>

                  {/* Totals Breakdown */}
                  <div className="space-y-2 text-xs font-mono text-[#98B4A1] pt-2 border-t border-white/10">
                    <div className="flex justify-between">
                      <span>Retail Subtotal:</span>
                      <strong className="text-[#D0D9D8]">₹{subtotal}</strong>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Coupon Savings:</span>
                        <strong>-₹{discount}</strong>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span>Express Delivery:</span>
                      <strong className={deliveryCharge === 0 ? "text-emerald-400" : "text-[#D0D9D8]"}>
                        {deliveryCharge === 0 ? "FREE (Above ₹999)" : `₹${deliveryCharge}`}
                      </strong>
                    </div>

                    <div className="flex justify-between text-base text-[#D0D9D8] pt-2 border-t border-white/10 font-bold font-sans">
                      <span>Grand Total:</span>
                      <span className="text-xl text-[#769489]">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Place Order CTA */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-[#172925] border-t-transparent rounded-full animate-spin" />
                        <span>Processing Order...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order — ₹{grandTotal}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-[#98B4A1] font-light text-center space-y-1 pt-1">
                    <p>✓ 100% Secure Checkout</p>
                    <p>✓ Dispatch within 24 hours from Khari Baoli, Delhi</p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Request Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal />

      {/* Cart Drawer */}
      <CartDrawer onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      {/* Wishlist Drawer */}
      <WishlistDrawer onOpenQuoteModal={() => setQuoteModalOpen(true)} />
    </main>
  );
}
