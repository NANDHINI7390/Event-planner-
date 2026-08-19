import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Sparkles, ChevronDown, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeroScene {
  id: number;
  image: string;
  tagline: string;
  headline: string;
  subtext: string;
  vibe: string;
  accent: string;
}

const HERO_SCENES: HeroScene[] = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90',
    tagline: 'A Botanical Sanctuary on East Coast Road',
    headline: 'WHERE BEAUTIFUL MOMENTS BEGIN.',
    subtext: '5.2 secluded coastal acres of ancient banyan canopies, reflecting water lily sanctuaries, and European glasshouse architecture.',
    vibe: 'Banyan Canopy · Pondicherry Horizon',
    accent: '#9A7732'
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=90',
    tagline: 'Sunken Amphitheatre & Sacred Vows',
    headline: 'YOUR STORY. YOUR CELEBRATION.',
    subtext: 'Ceremonies framed by natural stone tiers, drifting temple bells, and the gentle rhythm of the Bay of Bengal breeze.',
    vibe: 'Sacred Muhurtham · Dawn Pheras',
    accent: '#BA6B53'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=90',
    tagline: 'Under Starlit Emerald Canopies',
    headline: 'MEMORIES DESERVE A BEAUTIFUL SETTING.',
    subtext: 'Black-tie champagne receptions, live orchestral acoustics, and Michelin-inspired banqueting beneath thousands of golden lights.',
    vibe: 'Starlight Gala · Glasshouse Grandeur',
    accent: '#9A7732'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=90',
    tagline: 'Bespoke Curations & Timeless Craft',
    headline: 'LET’S PLAN SOMETHING UNFORGETTABLE.',
    subtext: 'A dedicated team of hospitality directors and master floral artisans transforming every intention into an effortless reverie.',
    vibe: 'Joyous Unions · Generational Memories',
    accent: '#9A7732'
  }
];

export const DynamicHero: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setIsVisitModalOpen, setIsEnquiryDrawerOpen, setCursorText, setCursorVariant } = useApp();

  // Auto transition every 6.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % HERO_SCENES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scene = HERO_SCENES[currentScene];

  return (
    <section
      id="hero-cinematic"
      className="relative w-full min-h-[700px] lg:h-screen lg:min-h-[720px] flex flex-col justify-end lg:justify-center overflow-hidden bg-[#FAF8F5] pt-20 sm:pt-24 lg:pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ken Burns Scenes with Soft Cross-Dissolve */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.10 }}
            exit={{ opacity: 0, scale: 1.14 }}
            transition={{
              opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 10, ease: 'linear' }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={scene.image}
              alt={scene.headline}
              className="w-full h-full object-cover object-top lg:object-center filter brightness-[0.96] contrast-[1.03] saturate-[1.05]"
            />
          </motion.div>
        </AnimatePresence>

        {/* LIGHT LUXURY SCRIM: Soft warm ivory gradient wash for pristine daytime text contrast */}
        {/* Desktop & Tablet Scrim */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/65 to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/40 to-transparent pointer-events-none" />
        
        {/* Mobile Scrim: Bottom-weighted warm ivory gradient so the photo subject is visible at the top */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF8F5]/50 to-[#FAF8F5] pointer-events-none" />
        <div className="lg:hidden absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/95 to-transparent pointer-events-none" />
      </div>

      {/* Floating Coordinates & Atmospheric Marker (Desktop) */}
      <div className="absolute top-24 left-6 sm:left-12 z-10 hidden lg:flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#0C1929]/80 font-mono bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-stone-200 shadow-xs">
        <span className="w-2 h-2 rounded-full border border-[#9A7732] flex items-center justify-center">
          <span className="w-1 h-1 bg-[#9A7732] rounded-full animate-ping" />
        </span>
        <span>12.0128° N, 79.8654° E · EAST COAST ROAD</span>
      </div>

      {/* Hero Content Container (Light Editorial Styling) */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 text-center flex flex-col items-center pb-16 lg:pb-0 pt-24 lg:pt-0">
        
        {/* Poetic Sub-eyebrow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${scene.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full border border-[#C5A059]/50 bg-white/90 backdrop-blur-md shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A7732]" />
            <span className="text-[10px] sm:text-xs tracking-[0.22em] text-[#9A7732] uppercase font-bold">
              {scene.tagline}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Spoken Headline with High Contrast Royal Midnight Navy Typography */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`head-${scene.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0C1929] tracking-[0.04em] uppercase font-medium leading-[1.1] max-w-4xl"
          >
            {scene.headline}
          </motion.h1>
        </AnimatePresence>

        {/* Editorial Description in Rich Charcoal */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${scene.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="mt-4 sm:mt-5 text-stone-700 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-2xl leading-relaxed"
          >
            {scene.subtext}
          </motion.p>
        </AnimatePresence>

        {/* Buttons: Primary Champagne-Gold + Secondary Light Outline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            id="hero-plan-btn"
            onClick={() => setIsEnquiryDrawerOpen(true)}
            onMouseEnter={() => {
              setCursorText('Plan Event');
              setCursorVariant('quote');
            }}
            onMouseLeave={() => {
              setCursorText('');
              setCursorVariant('default');
            }}
            className="group relative w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] font-bold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Light outline style with soft white fill */}
          <a
            href="#spaces"
            id="hero-explore-btn"
            onMouseEnter={() => {
              setCursorText('Spaces');
              setCursorVariant('explore');
            }}
            onMouseLeave={() => {
              setCursorText('');
              setCursorVariant('default');
            }}
            className="group w-full sm:w-auto min-h-[44px] px-7 py-3.5 rounded-full border border-[#0C1929]/30 hover:border-[#0C1929] bg-white/90 hover:bg-white text-[#0C1929] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xs"
          >
            <Compass className="w-4 h-4 text-[#9A7732]" />
            <span>Explore The Venue</span>
          </a>

          {/* Walkthrough CTA */}
          <button
            id="hero-book-visit-btn"
            onClick={() => setIsVisitModalOpen(true)}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2 text-[#0C1929] hover:text-[#9A7732] text-xs sm:text-sm font-medium tracking-[0.14em] uppercase transition-colors underline underline-offset-8 decoration-[#C5A059] hover:decoration-[#0C1929] flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#9A7732]" />
            <span>Schedule Walk-Through</span>
          </button>
        </motion.div>
      </div>

      {/* Signature Slim Progress Indicators (4 Marks) */}
      <div className="relative lg:absolute lg:bottom-8 left-0 right-0 z-20 max-w-7xl mx-auto px-6 pb-6 lg:pb-0 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Active Scene Mood Label */}
        <div className="hidden lg:flex items-center gap-2 text-xs tracking-widest uppercase text-stone-600 font-serif italic">
          <Sparkles className="w-3.5 h-3.5 text-[#9A7732]" />
          <span>{scene.vibe}</span>
        </div>

        {/* 4 Slim Progress Marks */}
        <div className="flex items-center gap-2 sm:gap-2.5 mx-auto lg:mx-0">
          {HERO_SCENES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentScene(idx)}
              className="group py-2 px-1 focus:outline-none min-h-[36px] flex items-center"
              aria-label={`Jump to Scene ${idx + 1}`}
            >
              <div className="relative w-10 sm:w-14 h-[3px] bg-stone-300 overflow-hidden rounded-full transition-colors group-hover:bg-stone-400">
                {currentScene === idx && (
                  <motion.div
                    key={`bar-${currentScene}`}
                    initial={{ width: '0%' }}
                    animate={{ width: isPaused ? '100%' : '100%' }}
                    transition={{ duration: isPaused ? 0.3 : 6.5, ease: 'linear' }}
                    className="h-full bg-[#0C1929]"
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Scroll cue */}
        <a
          href="#story"
          className="hidden lg:flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-stone-600 hover:text-[#0C1929] font-semibold transition-colors"
        >
          <span>Scroll to Discover</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#9A7732]" />
        </a>
      </div>
    </section>
  );
};
