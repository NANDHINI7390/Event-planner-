import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/venueData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-[#F5F2EB] text-[#12231A] relative overflow-hidden border-t border-stone-200">
      
      {/* Background Soft Ambient Graphic */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
          <span className="w-2 h-2 rounded-full bg-[#9A7732]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold">
            Real Love Stories &amp; Vows
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#12231A] tracking-tight mb-10 sm:mb-12">
          Words from Our Couples &amp; Families
        </h2>

        {/* Handwritten Style Quote Banner on Light Card */}
        <div className="min-h-[280px] flex flex-col items-center justify-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              <Quote className="w-10 h-10 text-[#C5A059] mx-auto opacity-75" />

              <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#12231A] leading-snug font-light tracking-wide">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              <div className="pt-4 flex flex-col items-center">
                <span className="font-serif text-xl sm:text-2xl text-[#12231A] font-bold tracking-wider">
                  {activeTestimonial.couple}
                </span>
                <span className="text-xs text-stone-600 uppercase tracking-widest mt-1 font-semibold">
                  {activeTestimonial.celebrationType} · {activeTestimonial.eventDate}
                </span>
                <span className="text-[11px] text-[#9A7732] font-mono font-bold mt-1">
                  {activeTestimonial.location} · {activeTestimonial.highlight}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-stone-300 hover:border-[#12231A] bg-white text-stone-700 hover:text-[#12231A] flex items-center justify-center transition-colors shadow-2xs"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-6 h-1.5 bg-[#12231A]' : 'w-1.5 h-1.5 bg-stone-300'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-stone-300 hover:border-[#12231A] bg-white text-stone-700 hover:text-[#12231A] flex items-center justify-center transition-colors shadow-2xs"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
