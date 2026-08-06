"use client";

import { generateProductCataloguePDF } from "@/utils/pdfGenerator";

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

export const Footer = () => {
  return (
    <footer className="py-20 bg-[#172925] border-t border-white/[0.08] text-xs text-[#98B4A1] font-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.png"
                alt="Shiva Jadibuti Store Logo"
                className="w-12 h-12 object-cover rounded-full border border-white/20 shadow-md bg-white"
              />
              <div>
                <span className="text-base font-serif text-[#D0D9D8] uppercase tracking-[0.15em] block font-bold">
                  SHIVA JADIBUTI STORE
                </span>
                <span className="text-[10px] font-mono text-[#769489] tracking-wider uppercase block">
                  NATURAL HERBS • PURE QUALITY
                </span>
              </div>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-[#D0D9D8]/80 pt-1">
              Pan-India wholesale supplier and trader of natural herbs, medicinal roots, barks, leaves, and raw spices for global pharmaceutical, nutraceutical, and cosmetic formulation.
            </p>
            <p className="text-[11px] font-mono text-[#769489] pt-1">
              Established 1994 • Central Wholesale Grain Market, Delhi
            </p>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0D9D8] block">
              Navigation
            </span>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-[#769489] transition-colors">Raw Botanicals</a></li>
              <li><a href="/raw-spices" className="hover:text-[#769489] transition-colors">Raw Spices Division</a></li>
              <li><a href="#categories" className="hover:text-[#769489] transition-colors">Classifications</a></li>
              <li><a href="#why-us" className="hover:text-[#769489] transition-colors">Why Choose Us</a></li>
              <li><a href="#process" className="hover:text-[#769489] transition-colors">Sourcing Protocol</a></li>
            </ul>
          </div>

          {/* Wholesale Resources */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0D9D8] block">
              Resources
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => generateProductCataloguePDF()}
                  className="text-[#769489] hover:underline"
                >
                  Download PDF Catalog
                </button>
              </li>
              <li><a href="#contact" className="hover:text-[#D0D9D8] transition-colors">Request Sample Batch</a></li>
              <li><a href="#contact" className="hover:text-[#D0D9D8] transition-colors">Bulk Freight Logistics</a></li>
              <li><a href="#contact" className="hover:text-[#D0D9D8] transition-colors">CoA & Quality Specs</a></li>
            </ul>
          </div>

          {/* Connect & Social Channels */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0D9D8] block">
              Connect With Us
            </span>
            <p className="text-xs text-[#98B4A1] leading-relaxed">
              Reach our wholesale desk directly via WhatsApp, Gmail, Instagram, or Facebook.
            </p>

            {/* Social Buttons Row */}
            <div className="flex items-center space-x-3 pt-1">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Shiva%20Jadibuti%20Store%2C%20I%20am%20inquiring%20about%20wholesale%20herbs%20and%20raw%20materials."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#213833] hover:bg-[#25D366] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                title="Direct WhatsApp Contact"
              >
                <WhatsAppIcon />
              </a>

              {/* Gmail */}
              <a
                href="mailto:shivajadibutistore@gmail.com?subject=Wholesale%20Inquiry%20-%20Shiva%20Jadibuti%20Store"
                className="p-3 rounded-full bg-[#213833] hover:bg-[#EA4335] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                title="Send Gmail Email"
              >
                <GmailIcon />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/shivajadibutistore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#213833] hover:bg-[#E4405F] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                title="Instagram Page"
              >
                <InstagramIcon />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/shivajadibutistore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#213833] hover:bg-[#1877F2] text-[#D0D9D8] hover:text-white border border-white/[0.1] transition-all duration-300 flex items-center justify-center"
                title="Facebook Page"
              >
                <FacebookIcon />
              </a>
            </div>

            <a
              href="mailto:shivajadibutistore@gmail.com"
              className="text-[11px] font-mono text-[#769489] hover:underline block pt-1"
            >
              shivajadibutistore@gmail.com
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#98B4A1] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Shiva Jadibuti Store. All rights reserved.</p>
          <p className="font-mono tracking-widest uppercase text-[#769489]">
            Forest Mist Botanical Edition
          </p>
        </div>

      </div>
    </footer>
  );
};
