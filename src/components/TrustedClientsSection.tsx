"use client";

export const TrustedClientsSection = () => {
  const clients = [
    "Ayurvedic Pharma Labs",
    "Himalayan Extracts Co.",
    "Global Botanical Wellness",
    "Natural Essence Formulations",
    "Vedic Herbal Exports",
  ];

  return (
    <section className="py-20 bg-[#172925] border-t border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase flex-shrink-0">
            Trusted By Wholesale Buyers & Labs
          </span>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 md:gap-12">
            {clients.map((client) => (
              <span
                key={client}
                className="text-xs font-sans font-light tracking-widest text-[#98B4A1]/90 hover:text-[#D0D9D8] transition-colors uppercase"
              >
                {client}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
