import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { PACKAGES } from '../data/venueData';
import { useApp } from '../context/AppContext';

export const PackagesSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'comparison'>('cards');
  const { setIsEnquiryDrawerOpen, setCursorText, setCursorVariant } = useApp();

  return (
    <section id="packages" className="py-20 sm:py-24 bg-[#F5F2EB] text-[#0C1929] relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-[#9A7732]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold">
                Curated All-Inclusive Collections
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C1929] tracking-tight">
              Celebration Packages
            </h2>
            <p className="mt-2 sm:mt-3 text-stone-700 text-sm sm:text-base max-w-xl font-light">
              Crafted as complete, seamless experiences covering exclusive estate venue access, haute cuisine, floral scenography, and guest hospitality.
            </p>
          </div>

          {/* View Mode Switcher (Invitation Cards vs Full Matrix) */}
          <div className="inline-flex p-1 rounded-full bg-white border border-stone-300 shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                viewMode === 'cards'
                  ? 'bg-[#0C1929] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#0C1929]'
              }`}
            >
              Invitation Cards
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                viewMode === 'comparison'
                  ? 'bg-[#0C1929] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#0C1929]'
              }`}
            >
              Detailed Matrix
            </button>
          </div>
        </div>

        {/* Invitation Cards View (Light Luxury Theme) */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {PACKAGES.map((pkg) => {
              return (
                <motion.div
                  key={pkg.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                    pkg.isPopular
                      ? 'bg-white text-[#0C1929] ring-2 ring-[#C5A059] shadow-2xl scale-[1.01]'
                      : 'bg-white text-[#0C1929] border border-stone-200'
                  }`}
                  onMouseEnter={() => {
                    setCursorText('Pick Package');
                    setCursorVariant('pointer');
                  }}
                  onMouseLeave={() => {
                    setCursorText('');
                    setCursorVariant('default');
                  }}
                >
                  {/* Wax Seal Stamp Accent */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-full shadow-md flex items-center justify-center border border-black/10 font-serif font-bold text-sm tracking-tighter"
                      style={{ backgroundColor: pkg.waxSealColor, color: '#FAF8F5' }}
                    >
                      <span>ARB</span>
                    </div>

                    {pkg.isPopular && (
                      <span className="px-3.5 py-1 rounded-full bg-[#C5A059] text-[#0C1929] text-[10px] font-bold tracking-widest uppercase shadow-2xs">
                        Most Cherished
                      </span>
                    )}
                  </div>

                  {/* Header Title & Pricing */}
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold block mb-1 text-[#9A7732]">
                      {pkg.guestCapacity}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide mb-1 text-[#0C1929]">
                      {pkg.name}
                    </h3>

                    <p className="font-serif italic text-sm mb-5 text-stone-700">
                      {pkg.subtitle}
                    </p>

                    <div className="pt-4 border-t border-stone-200 mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-serif font-bold text-[#0C1929]">
                          ₹{pkg.pricePerPlate.toLocaleString()}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold">
                          / guest plate
                        </span>
                      </div>
                      <span className="text-[11px] block mt-1 text-[#9A7732] font-semibold">
                        Est. total: {pkg.estimatedTotal} (Base venue ₹{(pkg.baseVenueFee / 100000).toFixed(1)}L)
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8 text-xs leading-relaxed text-stone-800">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#9A7732] flex-shrink-0 mt-0.5" />
                        <span><strong>Duration:</strong> {pkg.features.duration}</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#9A7732] flex-shrink-0 mt-0.5" />
                        <span><strong>Catering:</strong> {pkg.features.catering}</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#9A7732] flex-shrink-0 mt-0.5" />
                        <span><strong>Decor:</strong> {pkg.features.decoration}</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#9A7732] flex-shrink-0 mt-0.5" />
                        <span><strong>Bridal Villa:</strong> {pkg.features.bridalSuite}</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#9A7732] flex-shrink-0 mt-0.5" />
                        <span><strong>Valet &amp; Parking:</strong> {pkg.features.parking}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-6 border-t border-stone-200">
                    <button
                      id={`request-quote-${pkg.id}`}
                      onClick={() => setIsEnquiryDrawerOpen(true)}
                      className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-xs ${
                        pkg.isPopular
                          ? 'bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929]'
                          : 'bg-[#0C1929] hover:bg-[#14283F] text-white'
                      }`}
                    >
                      <span>Request This Package</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Comparison Detailed Matrix */
          <div className="bg-white rounded-3xl border border-stone-300 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#FAF8F5] text-[#0C1929] border-b border-stone-200">
                    <th className="p-6 font-serif text-lg font-medium w-1/4">Experience Features</th>
                    {PACKAGES.map((pkg) => (
                      <th key={pkg.id} className="p-6 w-1/4">
                        <span className="block font-serif text-xl text-[#0C1929] font-bold">{pkg.name}</span>
                        <span className="text-xs text-stone-600 block mt-1 font-sans font-semibold">{pkg.guestCapacity}</span>
                        <span className="text-base font-bold text-[#9A7732] block mt-2">₹{pkg.pricePerPlate} / plate</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr className="hover:bg-stone-50">
                    <td className="p-5 font-semibold text-stone-900 bg-stone-50/70">Access &amp; Duration</td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 text-stone-700 text-xs leading-relaxed">{p.features.duration}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-5 font-semibold text-stone-900 bg-stone-50/70">Culinary &amp; Banqueting</td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 text-stone-700 text-xs leading-relaxed">{p.features.catering}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-5 font-semibold text-stone-900 bg-stone-50/70">Botanical Scenography &amp; Decor</td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 text-stone-700 text-xs leading-relaxed">{p.features.decoration}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-5 font-semibold text-stone-900 bg-stone-50/70">Bridal &amp; Groom Villas</td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 text-stone-700 text-xs leading-relaxed">{p.features.bridalSuite}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-5 font-semibold text-stone-900 bg-stone-50/70">Sound &amp; Intelligent Lighting</td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 text-stone-700 text-xs leading-relaxed">{p.features.soundLighting}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-5 font-semibold text-stone-900 bg-stone-50/70">Valet &amp; Parking Logistics</td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 text-stone-700 text-xs leading-relaxed">{p.features.parking}</td>
                    ))}
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="p-5 font-semibold text-stone-900">Estimated Total Outlay</td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 font-serif font-bold text-base text-[#0C1929]">{p.estimatedTotal}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-5 bg-white"></td>
                    {PACKAGES.map(p => (
                      <td key={p.id} className="p-5 bg-white">
                        <button
                          onClick={() => setIsEnquiryDrawerOpen(true)}
                          className="w-full py-2.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
                        >
                          Select Package
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bespoke Quote Builder Prompt (Light Luxury Card) */}
        <div className="mt-12 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-white text-[#0C1929] border border-stone-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold block mb-1">
              Custom Configurations
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#0C1929]">
              Looking for a Multi-Day Buyout or Bespoke Curation?
            </h4>
            <p className="text-stone-700 text-xs sm:text-sm mt-1.5 max-w-xl font-light">
              Our venue directors can customize spaces, menu courses, and production riders to match your family’s precise traditions.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsEnquiryDrawerOpen(true)}
              className="px-6 py-3 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] font-bold text-xs uppercase tracking-widest transition-all shadow-xs"
            >
              Request Custom Estimate
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
