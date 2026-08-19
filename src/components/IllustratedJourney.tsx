import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Eye, Calendar, Send, Footprints, FileText, MessageSquareQuote, CheckCircle, Sparkles } from 'lucide-react';

interface JourneyStep {
  step: number;
  title: string;
  shortDesc: string;
  detail: string;
  icon: React.ReactNode;
  timeline: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: 1,
    title: 'Discover the Venue',
    shortDesc: 'Cinematic visual portfolio & botanical stories',
    detail: 'Immerse yourself in our photo and video lookbooks capturing daylight moods, banyan canopy starlight, and European conservatory architecture.',
    icon: <Compass className="w-5 h-5" />,
    timeline: 'Day 1'
  },
  {
    step: 2,
    title: 'Explore Spaces',
    shortDesc: 'Match guest capacity to architectural settings',
    detail: 'Select your ideal combinations: Lawn, Glasshouse, Water Amphitheatre, Orchard Pavilion, or a full estate buyout.',
    icon: <Eye className="w-5 h-5" />,
    timeline: 'Day 1'
  },
  {
    step: 3,
    title: 'Check Availability',
    shortDesc: 'Live date matrix & auspicious windows',
    detail: 'Verify open calendar dates and hold options across seasons with instant investment approximations.',
    icon: <Calendar className="w-5 h-5" />,
    timeline: 'Day 2'
  },
  {
    step: 4,
    title: 'Submit Enquiry',
    shortDesc: 'Digital concierge registers your vision',
    detail: 'Share guest counts, ceremony traditions, catering desires, and special timing preferences through our private portal.',
    icon: <Send className="w-5 h-5" />,
    timeline: 'Day 2'
  },
  {
    step: 5,
    title: 'Venue Visit',
    shortDesc: 'Private golden hour walk-through',
    detail: 'Accompanied by our Senior Venue Director, experience the acoustic zoning, bride villa, kitchen layout, and lighting in person.',
    icon: <Footprints className="w-5 h-5" />,
    timeline: 'Days 3–7'
  },
  {
    step: 6,
    title: 'Receive Quotation',
    shortDesc: 'Artisanal itemized transparent proposal',
    detail: 'Receive a bespoke, line-by-line letterhead document detailing menu courses, florals, staging, sound, and licensing.',
    icon: <FileText className="w-5 h-5" />,
    timeline: 'Within 24 Hours'
  },
  {
    step: 7,
    title: 'Bespoke Refinement',
    shortDesc: 'Chef tastings & floral tailoring',
    detail: 'Collaborate with our culinary masters and scenographers to fine-tune menu tastings, sound schedules, and decor elements.',
    icon: <MessageSquareQuote className="w-5 h-5" />,
    timeline: 'Week 2'
  },
  {
    step: 8,
    title: 'Booking & Lock',
    shortDesc: 'Contract signature & date reservation',
    detail: 'Formalize agreement with clear milestone schedules and dedicated banquet manager assignment.',
    icon: <CheckCircle className="w-5 h-5" />,
    timeline: 'Confirmed'
  },
  {
    step: 9,
    title: 'Celebrate',
    shortDesc: 'Flawless day-of choreography',
    detail: 'Relax with your family in our private luxury villas while our 20+ hospitality marshals execute your once-in-a-lifetime reverie.',
    icon: <Sparkles className="w-5 h-5" />,
    timeline: 'The Big Day'
  }
];

export const IllustratedJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(5);

  const selectedStep = JOURNEY_STEPS[activeStep - 1];

  return (
    <section id="journey" className="py-20 sm:py-24 bg-[#FAF8F5] text-[#0C1929] relative overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#9A7732]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold">
              From First Thought to Final Toast
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C1929] tracking-tight">
            The Event Journey Flow
          </h2>
          <p className="mt-2 sm:mt-3 text-stone-700 text-sm sm:text-base font-light">
            A seamless, transparent nine-step progression designed so you and your family enjoy every moment of anticipation without stress.
          </p>
        </div>

        {/* Horizontal Illustrated Process Rail */}
        <div className="relative mb-12">
          {/* Subtle connecting gold guide line */}
          <div className="hidden lg:block absolute top-7 left-8 right-8 h-[2px] bg-gradient-to-r from-[#9A7732]/20 via-[#9A7732] to-[#9A7732]/20 z-0" />

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 relative z-10">
            {JOURNEY_STEPS.map((item) => {
              const isCurrent = item.step === activeStep;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`flex flex-col items-center text-center group focus:outline-none transition-all duration-300 ${
                    isCurrent ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-sm ${
                      isCurrent
                        ? 'bg-[#0C1929] text-[#E6CA85] border-[#C5A059] shadow-[#0C1929]/20 scale-110 ring-4 ring-[#C5A059]/30'
                        : 'bg-white text-stone-700 border-stone-300 group-hover:border-[#9A7732]'
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span className="mt-2 text-[10px] font-mono text-stone-500 font-bold tracking-wider uppercase">
                    0{item.step}
                  </span>

                  <span className={`text-xs font-serif font-medium mt-0.5 leading-snug line-clamp-1 ${
                    isCurrent ? 'text-[#0C1929] font-bold' : 'text-stone-700'
                  }`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Step Spotlight Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-xl max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStep.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0C1929] text-[#E6CA85] border border-[#C5A059] flex items-center justify-center flex-shrink-0 shadow-lg">
                  {selectedStep.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold">
                      Step 0{selectedStep.step} · {selectedStep.timeline}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0C1929] font-bold">
                    {selectedStep.title}
                  </h3>
                  <p className="text-stone-700 text-sm mt-2 leading-relaxed max-w-xl font-light">
                    {selectedStep.detail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                <button
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="px-4 py-2 rounded-full border border-stone-300 hover:border-[#0C1929] bg-white text-[#0C1929] text-xs uppercase tracking-wider font-semibold disabled:opacity-30 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(9, activeStep + 1))}
                  disabled={activeStep === 9}
                  className="px-5 py-2 rounded-full bg-[#0C1929] text-white hover:bg-[#14283F] text-xs uppercase tracking-wider font-semibold disabled:opacity-30 transition-colors shadow-xs"
                >
                  Next Step →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
