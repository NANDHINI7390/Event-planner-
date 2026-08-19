import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { Sparkles, Trees, ShieldCheck, Heart, Wine, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StoryLayer {
  id: string;
  stepNumber: string;
  title: string;
  headline: string;
  body: string;
  quote: string;
  icon: React.ReactNode;
  accent: string;
  bgImage: string;
}

const STORY_LAYERS: StoryLayer[] = [
  {
    id: 'beginning',
    stepNumber: 'I',
    title: 'The Beginning',
    headline: 'Born from a Reverence for Ancient Coastal Earth',
    body: 'Before the first stone was carved or the glasshouse was conceived, The Arboretum was envisioned as an untouched botanical sanctuary. Spanning 5.2 secluded acres along the East Coast Road near Pondicherry, century-old banyan canopies and whispering frangipani groves were preserved as the spiritual heart of the estate.',
    quote: '“We did not build around nature — we invited nature to host our most sacred human vows.”',
    icon: <Trees className="w-5 h-5" />,
    accent: '#9A7732',
    bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 'setting',
    stepNumber: 'II',
    title: 'Your Perfect Setting',
    headline: 'Architecture that Bows to Living Nature',
    body: 'From the soaring 24-foot double-glazed Glasshouse Conservatory to the sunken granite Water Amphitheatre surrounded by lotus pools, every architectural line has been acoustically and visually calibrated so that daylight filters through foliage and ocean breezes circulate without disruption.',
    quote: '“A European botanical conservatory bathed in the warm, golden light of the Bay of Bengal.”',
    icon: <Sparkles className="w-5 h-5" />,
    accent: '#9A7732',
    bgImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 'details',
    stepNumber: 'III',
    title: 'Every Detail Matters',
    headline: 'Master Florals, Sacred Chants & Culinary Artistry',
    body: 'Luxury is found in the things you cannot fake: the scent of fresh Madurai jasmine and tuberose hanging in the canopy, handcrafted beaten brass banquet services, live charcoal cooking stations, and discrete hospitality concierges who anticipate your family’s wishes before they are spoken.',
    quote: '“Precision backstage so that onstage, everything feels like spontaneous magic.”',
    icon: <Heart className="w-5 h-5" />,
    accent: '#BA6B53',
    bgImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 'celebration',
    stepNumber: 'IV',
    title: 'The Celebration',
    headline: 'Where Memories Transcend Time',
    body: 'As dusk descends over the East Coast Road, over four thousand golden fairy lights illuminate the banyan roots, champagne flutes chime in the glasshouse, and the music of celebration fills the starry night. These are not merely events; they are the heirlooms of your life.',
    quote: '“Long after the flowers fade, the feeling of this evening remains indelible.”',
    icon: <Wine className="w-5 h-5" />,
    accent: '#9A7732',
    bgImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85'
  }
];

export const ScrollStorytelling: React.FC = () => {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setIsVisitModalOpen, setIsEnquiryDrawerOpen } = useApp();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        STORY_LAYERS.length - 1,
        Math.floor(v * STORY_LAYERS.length)
      );
      setActiveLayerIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeLayer = STORY_LAYERS[activeLayerIndex];

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative bg-[#FAF8F5] text-[#0C1929]"
      style={{ minHeight: '360vh' }}
    >
      {/* Pinned Fullscreen Stage with Light Luxury Theme */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Responsive Background Layer */}
        {STORY_LAYERS.map((layer, idx) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeLayerIndex === idx ? 1 : 0,
              scale: activeLayerIndex === idx ? 1.04 : 1.0,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={layer.bgImage}
              alt={layer.title}
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.03] transition-all duration-1000"
            />
          </motion.div>
        ))}

        {/* Light Warm Scrims for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-[#FAF8F5]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/80 pointer-events-none" />

        {/* Floating Narrative Content Container */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Narrative Pillar */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Step Marker */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-[#9A7732] bg-white flex items-center justify-center font-serif text-sm font-bold text-[#9A7732] shadow-xs">
                {activeLayer.stepNumber}
              </span>
              <div className="h-[1px] w-12 bg-[#9A7732]/60" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold">
                {activeLayer.title}
              </span>
            </div>

            {/* Dramatic Headline in Royal Midnight Navy */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#0C1929] leading-[1.15] tracking-tight font-medium">
              {activeLayer.headline}
            </h2>

            {/* Narrative Body in Rich Charcoal */}
            <p className="text-stone-700 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl">
              {activeLayer.body}
            </p>

            {/* Italicized Atmospheric Quote */}
            <div className="pt-2 border-l-2 border-[#9A7732] pl-4 italic text-[#0C1929] text-sm sm:text-base font-serif bg-white/40 py-2 rounded-r-xl">
              {activeLayer.quote}
            </div>

            {/* Quick action buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsVisitModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-xs uppercase tracking-[0.16em] font-bold shadow-xs transition-all flex items-center gap-2"
              >
                <span>Experience in Person</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsEnquiryDrawerOpen(true)}
                className="px-5 py-2.5 rounded-full border border-[#0C1929]/30 hover:border-[#0C1929] bg-white/80 hover:bg-white text-[#0C1929] text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-xs"
              >
                Request Quotation
              </button>
            </div>
          </div>

          {/* Right Floating Architectural Facts Card (Crisp Light Luxury) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="backdrop-blur-xl bg-white/90 border border-stone-200 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold">Sanctuary Specifications</span>
                <span className="text-[11px] text-stone-500 font-mono font-semibold">ECR · PONDICHERRY</span>
              </div>

              <div className="grid grid-cols-2 gap-5 text-left">
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200">
                  <span className="block text-2xl font-serif text-[#0C1929] font-bold">5.2 Acres</span>
                  <span className="text-[10px] tracking-wider uppercase text-stone-600 font-medium">Total Secluded Estate</span>
                </div>
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200">
                  <span className="block text-2xl font-serif text-[#0C1929] font-bold">150+ Years</span>
                  <span className="text-[10px] tracking-wider uppercase text-stone-600 font-medium">Sacred Banyan Canopy</span>
                </div>
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200">
                  <span className="block text-2xl font-serif text-[#0C1929] font-bold">1,400</span>
                  <span className="text-[10px] tracking-wider uppercase text-stone-600 font-medium">Floating Capacity</span>
                </div>
                <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200">
                  <span className="block text-2xl font-serif text-[#0C1929] font-bold">24 Feet</span>
                  <span className="text-[10px] tracking-wider uppercase text-stone-600 font-medium">Glasshouse Vault Height</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-700">
                <span className="flex items-center gap-1.5 text-[#0C1929] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#9A7732]" />
                  Full Generator &amp; Acoustic License
                </span>
                <span className="text-stone-500 font-mono text-[11px]">100% Eco-conscious</span>
              </div>
            </div>
          </div>

        </div>

        {/* Narrative Vertical Step Indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
          {STORY_LAYERS.map((layer, idx) => (
            <button
              key={layer.id}
              onClick={() => {
                if (containerRef.current) {
                  const targetScroll = containerRef.current.offsetTop + (containerRef.current.offsetHeight * (idx / STORY_LAYERS.length));
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
              }}
              className="group flex items-center gap-2 text-right focus:outline-none"
            >
              <span
                className={`text-[10px] uppercase tracking-widest font-semibold transition-opacity duration-300 ${
                  activeLayerIndex === idx ? 'opacity-100 text-[#9A7732]' : 'opacity-0 group-hover:opacity-60 text-stone-600'
                }`}
              >
                {layer.title}
              </span>
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  activeLayerIndex === idx
                    ? 'bg-[#0C1929] scale-125 ring-4 ring-[#9A7732]/30'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
