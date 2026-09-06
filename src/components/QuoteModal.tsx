"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { RAW_SPICES } from "@/data/rawSpices";
import { X, Send, CheckCircle2, MessageSquare, ChevronDown, ChevronUp, AlertCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const QuoteModal = ({ isOpen, onClose, initialProduct }: QuoteModalProps) => {
  const [productName, setProductName] = useState(initialProduct || "Ashwagandha Root");
  const [quantity, setQuantity] = useState("500");
  const [unit, setUnit] = useState("Kg");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Optional collapsible extra fields
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [cutForm, setCutForm] = useState("Whole Sun-Dried");
  const [notes, setNotes] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialProduct) {
      setProductName(initialProduct);
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate required fields
    if (!productName.trim() || !quantity.trim() || !name.trim() || !phone.trim()) {
      setErrorMessage("Please fill out all required fields marked with *.");
      return;
    }

    setLoading(true);

    // Prepare formatted email payload
    const specificationsText = `Cut Form: ${cutForm}${notes.trim() ? ` | Special Notes: ${notes.trim()}` : ""}`;
    const emailBody = `NEW WHOLESALE QUOTE REQUEST

Product: ${productName}
Quantity: ${quantity} ${unit}

Customer Details:
Name: ${name}
Phone/WhatsApp: ${phone}
Company: ${company.trim() || "Not provided"}
City: ${city.trim() || "Not provided"}
Specifications: ${specificationsText}

Submitted from:
Shiva Jadibuti Store Website`;

    const templateParams = {
      product: productName,
      quantity: quantity,
      unit: unit,
      name: name,
      phone: phone,
      company: company.trim() || "Not provided",
      city: city.trim() || "Not provided",
      specifications: specificationsText,
      subject: `New Wholesale Quote Request — ${productName}`,
      message: emailBody,
    };

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      let emailSent = false;

      // 1. Send via EmailJS if configured
      if (serviceId && templateId && publicKey && serviceId !== "your_service_id_here") {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        emailSent = true;
      }

      // 2. Dispatch to server-side backup route
      const res = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          company: company.trim() || "N/A",
          city: city.trim() || "N/A",
          product: productName,
          quantity: `${quantity} ${unit}`,
          message: specificationsText,
          formType: "Modal Wholesale Quote Request",
        }),
      });

      if (!emailSent && !res.ok) {
        throw new Error("Failed to dispatch quote request");
      }

      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#769489", "#98B4A1", "#D0D9D8"],
      });
    } catch (err) {
      console.error("EmailJS / Quote dispatch error:", err);
      setErrorMessage("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Shiva Jadibuti Store,\nI would like to request a bulk price quote:\n• Product: ${productName}\n• Quantity: ${quantity} ${unit}\n• Name: ${name || 'Buyer'}\n• Phone: ${phone || 'N/A'}${company ? `\n• Company: ${company}` : ''}${city ? `\n• City: ${city}` : ''}`
    );
    window.open(`https://wa.me/919958833536?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-[#213833] border border-white/[0.15] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl my-6 text-[#D0D9D8]"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              setSubmitted(false);
              setErrorMessage("");
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#172925] text-[#D0D9D8] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            /* Success Screen matching exact user requirements */
            <div className="text-center py-6 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220 }}
                className="w-14 h-14 bg-[#769489]/20 rounded-full flex items-center justify-center mx-auto text-[#769489]"
              >
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>

              <h3 className="text-2xl font-serif font-bold text-[#D0D9D8]">
                Quote request sent successfully! We’ll contact you shortly.
              </h3>

              <div className="bg-[#172925] border border-white/[0.08] rounded-2xl p-4 max-w-sm mx-auto text-left space-y-1 text-xs text-[#D0D9D8]">
                <p>• <strong>Product:</strong> {productName}</p>
                <p>• <strong>Quantity:</strong> {quantity} {unit}</p>
                <p>• <strong>Contact:</strong> {name} ({phone})</p>
              </div>

              <p className="text-xs sm:text-sm text-[#98B4A1] max-w-sm mx-auto leading-relaxed font-light">
                Our wholesale sales desk has received your request and will contact you via phone or WhatsApp with factory pricing.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={openWhatsApp}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Connect on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setErrorMessage("");
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#172925] border border-white/10 text-[#D0D9D8] font-semibold text-xs cursor-pointer hover:bg-white/5"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Streamlined Simple Form */
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#769489] block mb-1">
                  B2B Quick Quote
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#D0D9D8]">
                  Get Wholesale Rates
                </h3>
                <p className="text-xs text-[#98B4A1] mt-1 font-light">
                  Get instant pricing for raw herbs & spices in bulk.
                </p>
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Target Product */}
                <div>
                  <label className="block text-xs font-semibold text-[#D0D9D8] mb-1.5">
                    Select Product *
                  </label>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none font-medium cursor-pointer"
                    required
                  >
                    <optgroup label="🌶 Wholesale Raw Spices (Khade Masale)">
                      {RAW_SPICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.hindiName})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🌿 Herbal Raw Materials">
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.hindiName})
                        </option>
                      ))}
                    </optgroup>
                    <option value="Custom Bulk Request">Custom Bulk Herbal Request</option>
                  </select>
                </div>

                {/* 2. Quantity & Unit */}
                <div>
                  <label className="block text-xs font-semibold text-[#D0D9D8] mb-1.5">
                    Required Quantity *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full px-3.5 py-3 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none font-medium"
                      required
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-36 px-3 py-3 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] font-medium cursor-pointer"
                    >
                      <option value="Kg">Kg</option>
                      <option value="Quintal">Quintal (100 Kg)</option>
                      <option value="Metric Ton">Metric Ton</option>
                    </select>
                  </div>
                </div>

                {/* 3. Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3.5 py-3 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D0D9D8] mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 Mobile Number"
                      className="w-full px-3.5 py-3 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8] focus:border-[#769489] focus:outline-none font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Optional Collapsible Extra Specifications */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowMoreFields(!showMoreFields)}
                    className="text-xs text-[#769489] hover:text-[#D0D9D8] font-medium flex items-center space-x-1 transition-colors py-1 cursor-pointer"
                  >
                    <span>{showMoreFields ? "Hide extra details" : "+ Add company / city / cut specs (Optional)"}</span>
                    {showMoreFields ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <AnimatePresence>
                    {showMoreFields && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-2"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company / Brand Name"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8]"
                          />
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Delivery City"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8]"
                          />
                        </div>

                        <select
                          value={cutForm}
                          onChange={(e) => setCutForm(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8]"
                        >
                          <option value="Whole Sun-Dried">Cut Form: Whole Sun-Dried</option>
                          <option value="Shredded / Cut Chips">Cut Form: Shredded / Chips</option>
                          <option value="Tea Bag Cut (TBC)">Cut Form: Tea Bag Cut (TBC)</option>
                          <option value="Fine Powder (80-120 Mesh)">Cut Form: Fine Powder</option>
                        </select>

                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Special requirements (e.g. CoA, organic, target delivery timeline)..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#172925] border border-white/[0.12] text-xs text-[#D0D9D8]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Quote Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#172925] hover:bg-[#769489] text-[#98B4A1] hover:text-[#172925] border border-white/10 font-semibold text-xs flex items-center justify-center space-x-2 whitespace-nowrap transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#769489]" />
                    <span>WhatsApp Direct</span>
                  </button>
                </div>

              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
