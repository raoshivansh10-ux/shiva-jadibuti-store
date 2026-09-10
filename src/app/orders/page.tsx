"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useOrders, RetailOrder, OrderStatus } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { AskShivaFloatingButton, AskShivaChat } from "@/components/AskShiva";
import {
  CheckCircle2,
  Package,
  Truck,
  Clock,
  MapPin,
  Phone,
  FileText,
  Download,
  MessageSquare,
  ArrowRight,
  Search,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { jsPDF } from "jspdf";

const STATUS_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: "Order Placed", label: "Order Placed", desc: "Received & verified" },
  { status: "Confirmed", label: "Confirmed", desc: "Order approved for packing" },
  { status: "Processing", label: "Processing", desc: "Selected from herb inventory" },
  { status: "Packed", label: "Packed", desc: "Sealed in hygienic pouch" },
  { status: "Shipped", label: "Shipped", desc: "Dispatched with courier" },
  { status: "Out for Delivery", label: "Out for Delivery", desc: "With local delivery agent" },
  { status: "Delivered", label: "Delivered", desc: "Handed over to recipient" }
];

function OrdersContent() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get("id");
  const { orders, getOrderById } = useOrders();
  const { user } = useAuth();

  const [activeOrder, setActiveOrder] = useState<RetailOrder | null>(null);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [askShivaOpen, setAskShivaOpen] = useState(false);

  useEffect(() => {
    if (targetId) {
      const found = getOrderById(targetId);
      if (found) {
        setActiveOrder(found);
      } else if (orders.length > 0) {
        setActiveOrder(orders[0]);
      }
    } else if (orders.length > 0 && !activeOrder) {
      setActiveOrder(orders[0]);
    }
  }, [targetId, orders]);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    const found = getOrderById(searchOrderId.trim());
    if (found) {
      setActiveOrder(found);
    } else {
      alert("Order not found with ID: " + searchOrderId);
    }
  };

  const downloadInvoicePDF = (order: RetailOrder) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header Green Banner
    doc.setFillColor(19, 34, 31);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("SHIVA JADIBUTI STORE", 14, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(208, 217, 216);
    doc.text("Retail Invoice & Order Summary | Khari Baoli, Delhi - 110006", 14, 25);
    doc.text("Phone: +91 99588 33536 | Web: www.shivajadibutistore.com", 14, 31);

    // Invoice Title
    let y = 52;
    doc.setTextColor(19, 34, 31);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`INVOICE: ${order.orderId}`, 14, y);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`, pageWidth - 14, y, { align: "right" });

    y += 10;
    doc.setTextColor(30, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.text("Customer & Delivery Details:", 14, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(`Recipient: ${order.customerName}`, 14, y);
    doc.text(`Phone: ${order.phone}`, 14, y + 5);
    doc.text(`Address: ${order.shippingAddress.addressLine}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`, 14, y + 10);

    y += 22;
    // Table Header
    doc.setFillColor(33, 56, 51);
    doc.rect(14, y, pageWidth - 28, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Item / Description", 18, y + 5.5);
    doc.text("Pack Size", 95, y + 5.5);
    doc.text("Qty", 130, y + 5.5);
    doc.text("Amount", pageWidth - 20, y + 5.5, { align: "right" });

    y += 8;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "normal");

    order.items.forEach((item, idx) => {
      if (idx % 2 === 0) {
        doc.setFillColor(245, 247, 246);
        doc.rect(14, y, pageWidth - 28, 8, "F");
      }
      doc.text(item.name, 18, y + 5.5);
      doc.text(item.size || "Standard", 95, y + 5.5);
      doc.text(`${item.quantity}`, 130, y + 5.5);
      doc.text(`INR ${item.price * item.quantity}`, pageWidth - 20, y + 5.5, { align: "right" });
      y += 8;
    });

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: INR ${order.subtotal}`, pageWidth - 20, y, { align: "right" });
    if (order.discount > 0) {
      y += 6;
      doc.text(`Discount (${order.couponCode || "Coupon"}): -INR ${order.discount}`, pageWidth - 20, y, { align: "right" });
    }
    y += 6;
    doc.text(`Delivery Charge: INR ${order.deliveryCharge}`, pageWidth - 20, y, { align: "right" });
    y += 7;
    doc.setFontSize(11);
    doc.setTextColor(13, 43, 29);
    doc.text(`Grand Total: INR ${order.total}`, pageWidth - 20, y, { align: "right" });

    y += 15;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Payment Method: ${order.paymentMethod.toUpperCase()} | Status: ${order.paymentStatus}`, 14, y);
    doc.text(`Courier Tracking: ${order.trackingNumber}`, 14, y + 5);

    doc.save(`Invoice_${order.orderId}.pdf`);
  };

  const getStatusIndex = (currentStatus: OrderStatus): number => {
    return STATUS_STEPS.findIndex((s) => s.status === currentStatus);
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#172925] text-[#D0D9D8] selection:bg-[#769489] selection:text-[#172925]">
      {/* Navbar */}
      <Navbar onOpenQuoteModal={() => setQuoteModalOpen(true)} />

      {/* Header Banner */}
      <section className="pt-32 pb-10 sm:pt-36 sm:pb-12 bg-gradient-to-b from-[#13221f] to-[#172925] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-[#769489] mb-1">
                <Package className="w-3.5 h-3.5" />
                <span>Live Order Management & History</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#D0D9D8]">
                My Orders & Tracking
              </h1>
            </div>

            {/* Quick Search Bar by Order ID */}
            <form onSubmit={handleSearchOrder} className="flex space-x-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98B4A1]" />
                <input
                  type="text"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  placeholder="Enter Order ID (SJS-...)"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#213833] border border-white/10 text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-wider hover:bg-[#D0D9D8] transition-colors cursor-pointer"
              >
                Track
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Orders Content Area */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-[#213833] rounded-3xl border border-white/10 max-w-xl mx-auto p-8 space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-[#172925] text-[#98B4A1] flex items-center justify-center mx-auto border border-white/10">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#D0D9D8]">No Orders Found</h2>
              <p className="text-xs text-[#98B4A1] font-light leading-relaxed">
                You haven't placed any retail orders yet. Browse our selection of raw Ayurvedic herbs and retail packs.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#769489] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#D0D9D8] transition-colors"
                >
                  Shop Retail Packs
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Order History List (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-[#98B4A1] px-1">
                  Order History ({orders.length})
                </h3>

                <div className="space-y-3">
                  {orders.map((order) => {
                    const isSelected = activeOrder?.orderId === order.orderId;
                    return (
                      <div
                        key={order.orderId}
                        onClick={() => setActiveOrder(order)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                          isSelected
                            ? "bg-[#213833] border-[#769489] ring-1 ring-[#769489] shadow-lg"
                            : "bg-[#172925] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <strong className="font-mono text-[#D0D9D8]">{order.orderId}</strong>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            {order.orderStatus}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-[#98B4A1]">
                          <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                          <strong className="text-[#769489] text-sm">₹{order.total}</strong>
                        </div>

                        <div className="text-[11px] text-[#98B4A1] truncate">
                          {order.items.map((i) => `${i.name} (${i.size || i.quantity})`).join(", ")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Order Details & Tracking (8 cols) */}
              {activeOrder && (
                <div className="lg:col-span-8 space-y-6">
                  {/* Order Overview Header Card */}
                  <div className="bg-[#213833] rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono uppercase text-[#769489]">Order Summary</span>
                          <span className="text-xs text-[#98B4A1]">|</span>
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            {activeOrder.orderStatus}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#D0D9D8] mt-1">
                          {activeOrder.orderId}
                        </h2>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => downloadInvoicePDF(activeOrder)}
                          className="px-3.5 py-2 rounded-xl bg-[#172925] hover:bg-white/10 text-[#D0D9D8] border border-white/10 text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#769489]" />
                          <span>PDF Invoice</span>
                        </button>

                        <a
                          href={`https://wa.me/919958833536?text=${encodeURIComponent(`Hello Shiva Jadibuti Store, I am inquiring about my Order: ${activeOrder.orderId}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-[#769489] text-[#172925] hover:bg-[#D0D9D8] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-md"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Help</span>
                        </a>
                      </div>
                    </div>

                    {/* LIVE TRACKING PROGRESSION TIMELINE */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-[#98B4A1]">
                        <span className="flex items-center space-x-1.5">
                          <Truck className="w-4 h-4 text-[#769489]" />
                          <span>Tracking: <strong>{activeOrder.trackingNumber}</strong></span>
                        </span>
                        <span>Est. Delivery: <strong className="text-[#D0D9D8]">{activeOrder.estimatedDelivery}</strong></span>
                      </div>

                      {/* Progression Step Bar */}
                      <div className="p-4 rounded-2xl bg-[#172925] border border-white/5 space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                          {STATUS_STEPS.map((step, idx) => {
                            const activeIdx = getStatusIndex(activeOrder.orderStatus);
                            const isCompleted = idx <= activeIdx;
                            const isCurrent = idx === activeIdx;

                            return (
                              <div key={step.status} className="space-y-1.5 text-center">
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                                    isCurrent
                                      ? "bg-[#769489] text-[#172925] ring-4 ring-[#769489]/20 scale-110"
                                      : isCompleted
                                      ? "bg-emerald-600 text-white"
                                      : "bg-[#213833] text-[#98B4A1] border border-white/10"
                                  }`}
                                >
                                  {isCompleted ? "✓" : idx + 1}
                                </div>
                                <span
                                  className={`block text-[11px] font-bold leading-tight ${
                                    isCurrent
                                      ? "text-[#769489]"
                                      : isCompleted
                                      ? "text-[#D0D9D8]"
                                      : "text-[#98B4A1]/60"
                                  }`}
                                >
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address & Payment Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#98B4A1]">
                      <div className="p-4 rounded-2xl bg-[#172925] border border-white/5 space-y-1.5">
                        <span className="text-[#769489] uppercase tracking-wider font-bold block flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Delivery Address</span>
                        </span>
                        <strong className="text-[#D0D9D8] font-sans text-sm block">
                          {activeOrder.shippingAddress.fullName}
                        </strong>
                        <p className="font-light">{activeOrder.shippingAddress.addressLine}</p>
                        <p className="font-light">
                          {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.pincode}
                        </p>
                        <p className="font-light">Phone: {activeOrder.phone}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#172925] border border-white/5 space-y-1.5">
                        <span className="text-[#769489] uppercase tracking-wider font-bold block flex items-center space-x-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Payment Information</span>
                        </span>
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between">
                            <span>Method:</span>
                            <strong className="text-[#D0D9D8] uppercase">{activeOrder.paymentMethod}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <strong className="text-emerald-400">{activeOrder.paymentStatus}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Courier Partner:</span>
                            <strong className="text-[#D0D9D8]">Delhivery Express</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Table */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#769489] block">
                        Purchased Botanical Items:
                      </span>
                      <div className="space-y-2">
                        {activeOrder.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-[#172925] border border-white/5 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center space-x-3 min-w-0 pr-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                              />
                              <div className="truncate">
                                <h4 className="font-bold text-[#D0D9D8] truncate">{item.name}</h4>
                                <span className="text-[10px] font-mono text-[#769489]">
                                  Pack: {item.size || item.unit} | Qty: {item.quantity}
                                </span>
                              </div>
                            </div>

                            <strong className="text-[#769489] text-sm shrink-0">
                              ₹{item.price * item.quantity}
                            </strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="p-4 rounded-2xl bg-[#172925] border border-white/5 space-y-2 text-xs font-mono text-[#98B4A1]">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <strong className="text-[#D0D9D8]">₹{activeOrder.subtotal}</strong>
                      </div>
                      {activeOrder.discount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Coupon Discount ({activeOrder.couponCode || "Discount"}):</span>
                          <strong>-₹{activeOrder.discount}</strong>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Express Delivery:</span>
                        <strong className={activeOrder.deliveryCharge === 0 ? "text-emerald-400" : "text-[#D0D9D8]"}>
                          {activeOrder.deliveryCharge === 0 ? "FREE" : `₹${activeOrder.deliveryCharge}`}
                        </strong>
                      </div>
                      <div className="flex justify-between text-base text-[#D0D9D8] pt-2 border-t border-white/10 font-bold font-sans">
                        <span>Paid Total:</span>
                        <span className="text-xl text-[#769489]">₹{activeOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
      <CartDrawer onOpenQuoteModal={() => setQuoteModalOpen(true)} />
      <WishlistDrawer onOpenQuoteModal={() => setQuoteModalOpen(true)} />
      <AuthModal />
      <AskShivaFloatingButton onClick={() => setAskShivaOpen(true)} />
      <AskShivaChat
        isOpen={askShivaOpen}
        onClose={() => setAskShivaOpen(false)}
        onOpenQuoteModal={() => setQuoteModalOpen(true)}
      />
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#172925] flex items-center justify-center text-[#98B4A1]">Loading orders...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
