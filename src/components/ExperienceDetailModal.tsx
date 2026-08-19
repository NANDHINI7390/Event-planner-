import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExperienceDetailModal: React.FC = () => {
  const { selectedExperienceForDetail, setSelectedExperienceForDetail, setIsEnquiryDrawerOpen } = useApp();

  if (!selectedExperienceForDetail) return null;
  const exp = selectedExperienceForDetail;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#FAF8F5] text-[#0C1929] rounded-3xl border border-stone-300 shadow-2xl max-w-3xl w-full overflow-hidden my-8"
      >
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <button
            onClick={() => setSelectedExperienceForDetail(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-black transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span 
              className="text-xs uppercase tracking-[0.25em] font-semibold block mb-1"
              style={{ color: exp.accent }}
            >
              Curated Experience Brochure
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">
              {exp.title}
            </h3>
            <p className="font-serif italic text-stone-300 text-sm mt-1">
              &ldquo;{exp.tagline}&rdquo;
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold mb-2">
              Experience Atmosphere &amp; Vibe
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed font-light">
              {exp.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-1">Recommended Spaces</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {exp.spacesRecommended.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-stone-100 text-xs text-stone-800 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-1">Indicative Investment</span>
              <span className="font-serif text-2xl text-[#0C1929] font-bold block">
                Starts {exp.startingPrice}
              </span>
              <span className="text-xs text-stone-500">{exp.capacity}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold mb-3">
              Signature Choreographed Moments
            </h4>
            <div className="space-y-2">
              {exp.keyMoments.map((moment, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-800">
                  <span 
                    className="w-2 h-2 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: exp.accent }}
                  />
                  <span>{moment}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
            <button
              onClick={() => setSelectedExperienceForDetail(null)}
              className="px-6 py-2.5 rounded-full border border-stone-300 text-xs uppercase tracking-wider font-semibold text-stone-700"
            >
              Close
            </button>
            <button
              onClick={() => {
                setSelectedExperienceForDetail(null);
                setIsEnquiryDrawerOpen(true);
              }}
              className="px-6 py-2.5 rounded-full bg-[#0C1929] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-[#14283F] transition-colors shadow-xs"
            >
              <span>Plan This Celebration</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
