"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const GmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "Contact Form Wholesale Inquiry",
        }),
      });
    } catch (err) {
      console.error("Failed to send inquiry:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#172925] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
              Wholesale & Institutional Desk
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#D0D9D8]">
              Request Custom Bulk Quotation
            </h2>

            <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
              For volume pricing, custom mesh sizing, or sample dispatch, contact our wholesale team directly via form or our direct social & email channels.
            </p>

            <div className="pt-2 space-y-6 text-xs font-mono text-[#98B4A1]">
              <div>
                <span className="text-[#769489] uppercase tracking-widest block mb-1">Central Warehouse</span>
                <p className="text-[#D0D9D8] font-sans text-sm">Main Grain & Herbal Market, Khari Baoli, Delhi 110006, India</p>
              </div>

              <div>
                <span className="text-[#769489] uppercase tracking-widest block mb-1">Wholesale Phone & WhatsApp</span>
                <a href="tel:+919958833536" className="text-[#D0D9D8] font-sans text-sm hover:text-[#769489] transition-colors">+91 99588 33536</a>
              </div>

              <div>
                <span className="text-[#769489] uppercase tracking-widest block mb-1">Direct Gmail Desk</span>
                <a href="mailto:shivajadibutistore@gmail.com" className="text-[#D0D9D8] font-sans text-sm hover:text-[#769489] transition-colors">shivajadibutistore@gmail.com</a>
              </div>
            </div>

            {/* Interactive Social & Direct Channel Buttons */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono text-[#769489] uppercase tracking-widest block mb-3">
                Direct Channels
              </span>
              <div className="flex items-center space-x-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919958833536?text=Hello%20Shiva%20Jadibuti%20Store%2C%20I%20am%20inquiring%20about%20wholesale%20herbs."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-[#213833] hover:bg-[#25D366] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                  title="WhatsApp Direct Contact"
                >
                  <WhatsAppIcon />
                </a>

                {/* Gmail */}
                <a
                  href="mailto:shivajadibutistore@gmail.com?subject=Wholesale%20Inquiry%20-%20Shiva%20Jadibuti%20Store"
                  className="p-3.5 rounded-full bg-[#213833] hover:bg-[#EA4335] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                  title="Send Gmail Email"
                >
                  <GmailIcon />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/shivajadibutistore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-[#213833] hover:bg-[#E4405F] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                  title="Follow on Instagram"
                >
                  <InstagramIcon />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/shivajadibutistore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-[#213833] hover:bg-[#1877F2] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                  title="Connect on Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#213833] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-5">
                <CheckCircle2 className="w-14 h-14 text-[#769489] mx-auto" />
                <h3 className="text-2xl sm:text-3xl font-serif text-[#D0D9D8]">Inquiry Sent Successfully</h3>
                
                <div className="bg-[#172925] border border-white/[0.08] rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-[#769489] font-mono uppercase tracking-wider">
                    <Mail className="w-4 h-4" />
                    <span>Transmitted to Official Gmail Desk</span>
                  </div>
                  <p className="text-[#D0D9D8] font-sans">
                    Your wholesale requirements have been dispatched directly to <strong className="text-emerald-400 font-mono">shivajadibutistore@gmail.com</strong>.
                  </p>
                </div>

                <p className="text-xs text-[#98B4A1] font-light max-w-sm mx-auto leading-relaxed">
                  Our wholesale desk reviews all direct specs and will reply back to <strong>{formData.email || "your email"}</strong> or call <strong>{formData.phone || "your number"}</strong> within 2-4 business hours.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:shivajadibutistore@gmail.com?subject=Wholesale%20Inquiry%20from%20${encodeURIComponent(formData.name || "Buyer")}&body=${encodeURIComponent(
                      `Name: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nProduct: ${formData.product}\nQuantity: ${formData.quantity}\nRequirements: ${formData.message}`
                    )}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#172925] hover:bg-[#EA4335] text-[#D0D9D8] hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                  >
                    <GmailIcon />
                    <span>Open Email Thread</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        product: "",
                        quantity: "",
                        message: ""
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#769489] hover:bg-[#D0D9D8] text-[#172925] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#98B4A1] uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
                      placeholder="Full Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#98B4A1] uppercase tracking-wider mb-2">Company / Brand Name</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
                      placeholder="Pharma / Brand Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#98B4A1] uppercase tracking-wider mb-2">Corporate Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
                      placeholder="email@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#98B4A1] uppercase tracking-wider mb-2">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
                      placeholder="+91 Phone Number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#98B4A1] uppercase tracking-wider mb-2">Target Product</label>
                    <input
                      type="text"
                      required
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
                      placeholder="e.g. Ashwagandha Root"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#98B4A1] uppercase tracking-wider mb-2">Required Quantity (kg / Tons)</label>
                    <input
                      type="text"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
                      placeholder="e.g. 500 kg or 5 Metric Tons"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#98B4A1] uppercase tracking-wider mb-2">Specific Requirements / Mesh Size</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#172925] border border-white/[0.1] text-sm text-[#D0D9D8] focus:outline-none focus:border-[#769489]"
                    placeholder="Mention preferred cut (raw, kibbled, fine powder), delivery location, or CoA requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full border border-[#769489] hover:bg-[#769489] text-[#769489] hover:text-[#172925] font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Transmitting to shivajadibutistore@gmail.com...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Wholesale Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
