import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { EVENT_EXPERIENCES } from '../data/venueData';
import { useApp } from '../context/AppContext';

export const EventExperiences: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('wedding');
  const { setSelectedExperienceForDetail, setIsEnquiryDrawerOpen } = useApp();

  const activeExp = EVENT_EXPERIENCES.find(e => e.id === selectedId) || EVENT_EXPERIENCES[0];

  return (
    <section id="experiences" className="py-20 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#9A7732]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold">
              Celebrations of Every Magnitude
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C1929] tracking-tight">
            Curated Event Experiences
          </h2>
          <p className="mt-3 sm:mt-4 text-stone-700 text-sm sm:text-base font-light leading-relaxed">
            Every union, milestone, and gathering has its own cadence. We tailor our botanical architecture and hospitality choreography to your vision.
          </p>
        </div>

        {/* Distinctive Event Type Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {EVENT_EXPERIENCES.map((exp) => {
            const isSelected = exp.id === selectedId;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#0C1929] text-white shadow-md border border-[#0C1929]'
                    : 'bg-white border border-stone-300 text-stone-700 hover:border-stone-400 hover:text-[#0C1929]'
                }`}
              >
                {exp.title}
              </button>
            );
          })}
        </div>

        {/* Cinematic Experience Hero Showcase (Light Editorial Style) */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white text-[#0C1929] border border-stone-200 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]"
            >
              {/* Media Half with Natural Daylight Framing */}
              <div className="lg:col-span-7 relative h-72 sm:h-80 lg:h-full overflow-hidden">
                <img
                  src={activeExp.image}
                  alt={activeExp.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.02]"
                />
                
                {/* Visual Vibe Stamp */}
                <div 
                  className="absolute bottom-5 left-5 px-4 py-2 rounded-xl backdrop-blur-md bg-white/90 border border-stone-200 text-xs tracking-widest uppercase font-serif text-[#0C1929] shadow-md font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-[#9A7732]" />
                  {activeExp.vibe}
                </div>
              </div>

              {/* Editorial Info Half (Light Luxury) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5 bg-[#FAF8F5]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9A7732]"
                    >
                      {activeExp.capacity}
                    </span>
                    <span className="text-xs text-stone-600 font-mono font-semibold">Starts {activeExp.startingPrice}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0C1929] leading-tight font-medium">
                    {activeExp.title}
                  </h3>

                  <p className="mt-1.5 text-stone-800 font-serif italic text-sm sm:text-base">
                    &ldquo;{activeExp.tagline}&rdquo;
                  </p>

                  <p className="mt-3 text-stone-700 text-xs sm:text-sm font-light leading-relaxed">
                    {activeExp.description}
                  </p>
                </div>

                {/* Key Signature Moments */}
                <div className="space-y-2 pt-3 border-t border-stone-200">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold block">
                    Signature Moments
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {activeExp.keyMoments.map((moment, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-800">
                        <span 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#9A7732]"
                        />
                        <span>{moment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Spaces list */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold block mb-1.5">
                    Recommended Venue Spaces
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.spacesRecommended.map((spaceName, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white text-xs text-stone-700 border border-stone-200 shadow-2xs font-medium"
                      >
                        {spaceName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={() => setIsEnquiryDrawerOpen(true)}
                    className="px-6 py-3 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] font-bold text-xs tracking-widest uppercase transition-all shadow-xs flex items-center gap-2"
                  >
                    <span>Plan This Celebration</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedExperienceForDetail(activeExp)}
                    className="text-xs uppercase tracking-widest text-[#0C1929] hover:text-[#9A7732] font-semibold underline underline-offset-4"
                  >
                    View Brochure
                  </button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
