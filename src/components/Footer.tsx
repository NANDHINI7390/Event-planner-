import React from 'react';
import { MapPin, Phone, Mail, Instagram, ArrowUp, Calendar, Sparkles, LayoutDashboard } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setViewMode, setIsVisitModalOpen, setIsEnquiryDrawerOpen } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] text-[#12231A] relative overflow-hidden border-t border-stone-200">
      
      {/* Grand Final Sanctuary Invitation (Light Luxury Grand Banner) */}
      <div className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
          <div className="w-12 h-12 rounded-full border border-[#9A7732] mx-auto flex items-center justify-center bg-white shadow-xs">
            <span className="font-serif text-[#9A7732] text-xl font-bold">A</span>
          </div>

          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#9A7732] font-bold block">
            Begin Your Next Chapter
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#12231A] leading-tight tracking-tight uppercase font-medium">
            Let Us Frame Your Most Sacred Celebration.
          </h2>

          <p className="text-stone-700 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Come walk beneath the illuminated 150-year-old banyan canopies and experience the coastal serenity in person.
          </p>

          <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsVisitModalOpen(true)}
              className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#12231A] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Walk-Through</span>
            </button>

            <button
              onClick={() => setIsEnquiryDrawerOpen(true)}
              className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full border border-[#12231A]/30 hover:border-[#12231A] bg-white hover:bg-stone-50 text-[#12231A] font-semibold text-xs sm:text-sm uppercase tracking-widest transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#9A7732]" />
              <span>Request Bespoke Quotation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Location (Deep Forest Green Luxury Anchor) */}
      <div className="bg-[#12231A] text-[#FAF8F5] border-t border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 text-xs text-stone-300">
          
          {/* Col 1: Brand story */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <span className="font-serif text-2xl tracking-[0.18em] text-[#FAF8F5] uppercase block font-bold">
              The Arboretum
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#E6CA85] uppercase block font-mono font-semibold">
              East Coast Road · Pondicherry
            </span>
            <p className="text-stone-300 font-light leading-relaxed max-w-sm">
              A 5.2-acre architectural sanctuary dedicated to high-artistry weddings, generational milestones, and cultural galas amidst living botanical canopies.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] text-stone-300 hover:text-[#12231A] border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Sanctuary Spaces */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#E6CA85] font-bold block">
              Sanctuary Settings
            </span>
            <ul className="space-y-2 text-stone-300 font-light">
              <li><a href="#spaces" className="hover:text-[#E6CA85] transition-colors">The Banyan Grand Lawn (1,400 pax)</a></li>
              <li><a href="#spaces" className="hover:text-[#E6CA85] transition-colors">The Glasshouse Conservatory (400 pax)</a></li>
              <li><a href="#spaces" className="hover:text-[#E6CA85] transition-colors">The Frangipani Amphitheatre (500 pax)</a></li>
              <li><a href="#spaces" className="hover:text-[#E6CA85] transition-colors">The Coastal Orchard Pavilion (700 pax)</a></li>
              <li><a href="#spaces" className="hover:text-[#E6CA85] transition-colors">The Verandah Luxury Bridal Villa</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Direct Desk */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#E6CA85] font-bold block">
              Private Hospitality Desk
            </span>
            <div className="space-y-2.5 text-stone-300 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>Survey No. 142/3, East Coast Road, Near Auroville Buffer Zone, Tamil Nadu 605104</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>+91 98401 88900 / +91 413 290 8800</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>celebrations@thearboretum-ecr.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Backstage Portal Quick Switch */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#E6CA85] font-bold block">
              Estate Backstage
            </span>
            <button
              onClick={() => setViewMode('admin')}
              className="w-full py-2.5 rounded-xl border border-[#C5A059]/40 bg-white/10 hover:bg-[#C5A059] text-[#FAF8F5] hover:text-[#12231A] text-[11px] font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch CRM &amp; Quotes</span>
            </button>
            <span className="text-[10px] text-stone-400 block leading-tight">
              Director &amp; banquet staff operations portal.
            </span>
          </div>

        </div>

        {/* Copyright Sub-bar */}
        <div className="border-t border-white/10 mt-12 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <span>© {new Date().getFullYear()} THE ARBORETUM @ ECR. All rights reserved. Crafted for extraordinary celebrations.</span>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
};
