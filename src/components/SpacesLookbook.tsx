import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Users, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';
import { VENUE_SPACES } from '../data/venueData';
import { useApp } from '../context/AppContext';

export const SpacesLookbook: React.FC = () => {
  const { setSelectedSpaceForDetail, setIsEnquiryDrawerOpen, setCursorText, setCursorVariant } = useApp();
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const itemWidth = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
    setActiveSpaceIndex(index);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const itemWidth = scrollContainerRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeSpaceIndex && newIndex >= 0 && newIndex < VENUE_SPACES.length) {
      setActiveSpaceIndex(newIndex);
    }
  };

  return (
    <section id="spaces" className="py-20 sm:py-24 bg-[#F5F2EB] text-[#0C1929] relative overflow-hidden border-t border-stone-200">
      
      {/* Editorial Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300/80 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-[#9A7732]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#9A7732] font-bold">
                Curated Architecture &amp; Canopies
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C1929] tracking-tight">
              The Venue Spaces
            </h2>
            <p className="mt-2 text-stone-700 text-sm sm:text-base max-w-xl font-light">
              Five distinct settings crafted with botanical reverence, world-class acoustic zoning, and European conservatory craft.
            </p>
          </div>

          {/* Lookbook Navigation Arrows & Pagination */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <span className="font-serif text-sm tracking-widest text-stone-600 uppercase">
              <span className="text-[#0C1929] font-bold text-lg">{String(activeSpaceIndex + 1).padStart(2, '0')}</span> / {String(VENUE_SPACES.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                id="space-prev-btn"
                onClick={() => handleScrollTo(Math.max(0, activeSpaceIndex - 1))}
                disabled={activeSpaceIndex === 0}
                className="w-11 h-11 rounded-full border border-stone-300 hover:border-[#0C1929] disabled:opacity-30 disabled:hover:border-stone-300 flex items-center justify-center transition-colors bg-white text-[#0C1929] shadow-2xs"
                aria-label="Previous space"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                id="space-next-btn"
                onClick={() => handleScrollTo(Math.min(VENUE_SPACES.length - 1, activeSpaceIndex + 1))}
                disabled={activeSpaceIndex === VENUE_SPACES.length - 1}
                className="w-11 h-11 rounded-full border border-stone-300 hover:border-[#0C1929] disabled:opacity-30 disabled:hover:border-stone-300 flex items-center justify-center transition-colors bg-white text-[#0C1929] shadow-2xs"
                aria-label="Next space"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Space Tab Switcher Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mt-4">
          {VENUE_SPACES.map((space, idx) => (
            <button
              key={space.id}
              onClick={() => handleScrollTo(idx)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                activeSpaceIndex === idx
                  ? 'bg-[#0C1929] text-white shadow-xs'
                  : 'bg-white/80 text-stone-700 hover:text-[#0C1929] border border-stone-200'
              }`}
            >
              {space.name}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Editorial Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-8 scrollbar-none"
        >
          {VENUE_SPACES.map((space, idx) => (
            <div
              key={space.id}
              className="w-full flex-shrink-0 snap-center rounded-3xl bg-white border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300"
            >
              {/* Photo Showcase Column */}
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden group">
                <img
                  src={space.coverImage}
                  alt={space.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Capacity & Area Floating Chips */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    <Users className="w-3.5 h-3.5 text-[#E6CA85]" />
                    <span>Up to {space.capacityFloating} Guests</span>
                  </div>

                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    <Ruler className="w-3.5 h-3.5 text-[#E6CA85]" />
                    <span>{space.areaSqFt.toLocaleString()} sq.ft.</span>
                  </div>
                </div>

                {/* Inspect Button overlay */}
                <button
                  onClick={() => setSelectedSpaceForDetail(space)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#0C1929] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  title="View Full Architectural Specs & Gallery"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Text & Specs Column (Light Luxury Theme) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#9A7732] font-semibold uppercase tracking-widest mb-2">
                    <span>Setting {String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-mono">{space.dimensions}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0C1929] font-bold tracking-tight">
                    {space.name}
                  </h3>

                  <p className="font-serif italic text-sm text-stone-600 mt-1 mb-4">
                    {space.tagline}
                  </p>

                  <p className="text-stone-700 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {space.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-4 border-t border-stone-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-900 block">
                      Architectural Highlights
                    </span>
                    {space.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7732] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investment & Actions */}
                <div className="pt-6 border-t border-stone-200 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500 block font-semibold">
                        Starting Full Day Access
                      </span>
                      <span className="font-serif text-2xl text-[#0C1929] font-bold">
                        ₹{(space.fullDayRate / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                    <span className="text-xs text-stone-500 font-mono">Ideal: {space.bestFor.split(',')[0]}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedSpaceForDetail(space)}
                      className="w-full py-3 rounded-full border border-stone-300 hover:border-[#0C1929] bg-white text-[#0C1929] text-xs uppercase tracking-wider font-semibold transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#9A7732]" />
                      <span>View Gallery</span>
                    </button>

                    <button
                      onClick={() => setIsEnquiryDrawerOpen(true)}
                      className="w-full py-3 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-xs uppercase tracking-wider font-bold transition-all shadow-xs"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
