import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { EDITORIAL_GALLERY } from '../data/venueData';
import { useApp } from '../context/AppContext';

export const EditorialGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const { setCursorText, setCursorVariant } = useApp();

  const categories = ['All', 'Ceremony', 'Architecture', 'Florals', 'Receptions', 'Human Moments', 'Culinary'];

  const filteredItems = activeFilter === 'All'
    ? EDITORIAL_GALLERY
    : EDITORIAL_GALLERY.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-[#FAF8F5] text-[#0C1929] relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#9A7732]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold">
                Captured Reveries &amp; Light
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C1929] tracking-tight">
              Editorial Gallery &amp; Moments
            </h2>
            <p className="mt-2 sm:mt-3 text-stone-700 text-sm sm:text-base max-w-xl font-light">
              Real celebrations caught in golden hour light, heartfelt laughter mid-ceremony, and the quiet poetry of botanical architecture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-[#0C1929] text-white shadow-xs'
                    : 'bg-white border border-stone-300 text-stone-700 hover:border-[#0C1929] hover:text-[#0C1929]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Magazine Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
          {filteredItems.map((item, idx) => {
            // Asymmetrical layout mapping
            let colSpan = 'md:col-span-6 lg:col-span-4';
            let heightClass = 'h-72 sm:h-96';

            if (idx === 0) {
              colSpan = 'md:col-span-12 lg:col-span-8';
              heightClass = 'h-80 sm:h-[480px]';
            } else if (idx === 1) {
              colSpan = 'md:col-span-6 lg:col-span-4';
              heightClass = 'h-80 sm:h-[480px]';
            } else if (idx === 3) {
              colSpan = 'md:col-span-12 lg:col-span-7';
              heightClass = 'h-72 sm:h-96';
            } else if (idx === 4) {
              colSpan = 'md:col-span-6 lg:col-span-5';
              heightClass = 'h-72 sm:h-96';
            }

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveImageIndex(idx)}
                onMouseEnter={() => {
                  setCursorText('Enlarge');
                  setCursorVariant('view');
                }}
                onMouseLeave={() => {
                  setCursorText('');
                  setCursorVariant('default');
                }}
                className={`${colSpan} relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group cursor-pointer bg-stone-900`}
              >
                <div className={`w-full ${heightClass} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.94] group-hover:brightness-100"
                  />
                </div>

                {/* Gradient and Editorial Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity p-4 sm:p-6 lg:p-8 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#E6CA85] font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg sm:text-2xl text-white font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-stone-300 text-xs mt-1 font-light max-w-md line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                {/* Floating Enlarge Indicator */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-8"
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => setActiveImageIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-40"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => setActiveImageIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-40"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Lightbox Content */}
            <div className="max-w-5xl max-h-[90vh] flex flex-col items-center px-8 sm:px-12">
              <img
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 sm:mt-6 text-center text-white max-w-xl">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#E6CA85] block mb-1 font-semibold">
                  {filteredItems[activeImageIndex].category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white">
                  {filteredItems[activeImageIndex].title}
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-1 font-light">
                  {filteredItems[activeImageIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
