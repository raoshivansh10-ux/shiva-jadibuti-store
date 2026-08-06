"use client";

export const ProcessSection = () => {
  const stages = [
    {
      number: "01",
      title: "Wild & Cultivated Origin Sourcing",
      description: "Procurement directly from certified tribal harvesters, Himalayan wild reserves, and organic herb farms."
    },
    {
      number: "02",
      title: "Triple Hand-Sifting & Foreign Dust Removal",
      description: "Thorough physical sifting to remove sand, weeds, degraded leaves, and foreign matter before processing."
    },
    {
      number: "03",
      title: "Sortex Optical & Moisture Grading",
      description: "Precision machine color sorting and moisture verification keeping water activity below 8-10%."
    },
    {
      number: "04",
      title: "Laboratory Phytochemical & CoA Verification",
      description: "Gas chromatography & TLC testing for active markers (e.g. Withanolides, Curcumin, Eugenol) and heavy metal compliance."
    },
    {
      number: "05",
      title: "Airtight Poly-Lined B2B Dispatch",
      description: "Multi-layer vacuum sealing, poly-lined HDPE woven bags, and fiber drums ensuring zero volatile oil degradation during freight."
    }
  ];

  return (
    <section id="process" className="py-28 md:py-36 bg-[#172925] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
            <span className="text-xs font-mono tracking-[0.25em] text-[#98B4A1] uppercase block">
              Standard Operating Procedure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#D0D9D8] leading-tight">
              5-Stage Quality Assurance Sourcing Protocol
            </h2>
            <p className="text-sm text-[#98B4A1] font-light leading-relaxed">
              Every metric ton entering our central warehouse follows strict quality parameters to guarantee therapeutic batch consistency.
            </p>
          </div>

          {/* Right Column: 5 Stage Vertical Timeline */}
          <div className="lg:col-span-7 space-y-8 relative">
            <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-white/10 hidden sm:block" />

            {stages.map((st) => (
              <div
                key={st.number}
                className="relative sm:pl-16 bg-[#213833] border border-white/10 rounded-2xl p-8 space-y-3 group hover:border-[#769489]/50 transition-all duration-300 shadow-md"
              >
                <div className="sm:absolute sm:left-3 sm:top-8 w-7 h-7 rounded-full bg-[#172925] border border-[#769489] text-[#769489] font-mono text-xs flex items-center justify-center font-bold mb-3 sm:mb-0">
                  {st.number}
                </div>

                <h3 className="text-xl font-serif font-normal text-[#D0D9D8] group-hover:text-[#769489] transition-colors">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#98B4A1] font-light leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
