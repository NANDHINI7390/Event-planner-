import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SpaceDetailModal: React.FC = () => {
  const { selectedSpaceForDetail, setSelectedSpaceForDetail, setIsEnquiryDrawerOpen } = useApp();

  if (!selectedSpaceForDetail) return null;
  const space = selectedSpaceForDetail;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#FAF8F5] text-[#0C1929] rounded-3xl border border-stone-300 shadow-2xl max-w-4xl w-full overflow-hidden my-8"
      >
        {/* Cover Photo with Gallery Grid */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-900">
          <img
            src={space.coverImage}
            alt={space.name}
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <button
            onClick={() => setSelectedSpaceForDetail(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-black transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E6CA85] font-semibold block mb-1">
              Sanctuary Space Profile
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">
              {space.name}
            </h3>
            <p className="font-serif italic text-stone-300 text-sm sm:text-base mt-1">
              &ldquo;{space.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Description and Features */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold mb-2">
                  Architectural Narrative
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed font-light">
                  {space.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold mb-3">
                  Key Technical &amp; Design Specifications
                </h4>
                <div className="space-y-2.5">
                  {space.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <span className="w-5 h-5 rounded-full bg-[#0C1929] text-[#E6CA85] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Photo Lookbook Strip */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold mb-3">
                  Visual Lookbook Perspectives
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {space.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="h-24 sm:h-28 rounded-xl overflow-hidden border border-stone-300">
                      <img
                        src={imgUrl}
                        alt={`Perspective ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Key Metrics Card & Action */}
            <div className="bg-[#0C1929] text-white p-6 rounded-2xl border border-[#C5A059]/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#E6CA85] font-semibold block border-b border-white/10 pb-2">
                  Space Specifications
                </span>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Dimensions</span>
                  <span className="font-serif text-lg text-white">{space.dimensions}</span>
                  <span className="text-xs text-stone-400 block">({space.areaSqFt.toLocaleString()} sq.ft. total)</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Capacity</span>
                  <span className="font-serif text-lg text-white">{space.capacitySitting} Seated</span>
                  <span className="text-xs text-stone-400 block">{space.capacityFloating} Floating Guests</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Ideal For</span>
                  <span className="text-xs text-[#E6CA85]">{space.bestFor}</span>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Venue Tariff</span>
                  <span className="font-serif text-xl text-white font-bold">
                    ₹{(space.eveningRate / 100000).toFixed(2)} Lakhs
                  </span>
                  <span className="text-[11px] text-stone-400 block">Evening Slot / Full day ₹{(space.fullDayRate / 100000).toFixed(1)}L</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedSpaceForDetail(null);
                    setIsEnquiryDrawerOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Enquire For This Space</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};
