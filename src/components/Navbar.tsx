import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, LayoutDashboard, Menu, X, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    isSoundPlaying,
    toggleSound,
    soundVolume,
    setSoundVolume,
    setIsVisitModalOpen,
    setIsEnquiryDrawerOpen,
    leads,
    setCursorText,
    setCursorVariant
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Unread/new leads count
  const newLeadsCount = leads.filter(l => l.status === 'new' || l.status === 'visit_scheduled').length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#story' },
    { name: 'Spaces', href: '#spaces' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Packages', href: '#packages' },
    { name: 'Availability', href: '#availability' },
    { name: 'Journey', href: '#journey' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/92 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-xs'
          : 'bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-stone-200/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Crest */}
        <a
          href="#"
          id="brand-logo"
          className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none"
          onMouseEnter={() => {
            setCursorText('Home');
            setCursorVariant('explore');
          }}
          onMouseLeave={() => {
            setCursorText('');
            setCursorVariant('default');
          }}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#C5A059]/80 flex items-center justify-center bg-[#0C1929] shadow-xs group-hover:bg-[#14283F] transition-colors flex-shrink-0">
            <span className="font-serif text-[#E6CA85] text-base sm:text-lg font-light tracking-tighter">A</span>
          </div>
          <div>
            <span className="block font-serif text-base sm:text-lg lg:text-xl tracking-[0.2em] text-[#0C1929] uppercase font-bold group-hover:text-[#9A7732] transition-colors leading-tight">
              The Arboretum
            </span>
            <span className="block text-[8px] sm:text-[9px] tracking-[0.25em] text-[#9A7732] uppercase font-medium">
              East Coast Road · Pondicherry
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[12px] xl:text-[13px] tracking-[0.14em] uppercase text-stone-700 hover:text-[#0C1929] font-semibold transition-colors relative py-1"
              onMouseEnter={() => {
                setCursorText('Go to');
                setCursorVariant('pointer');
              }}
              onMouseLeave={() => {
                setCursorText('');
                setCursorVariant('default');
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls & Backstage CRM Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Sound Toggle (Desktop & Tablet) */}
          <div className="relative hidden sm:block">
            <button
              id="ambient-sound-toggle"
              onClick={toggleSound}
              onMouseEnter={() => setShowVolumeSlider(true)}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                isSoundPlaying
                  ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#0C1929] font-semibold'
                  : 'border-stone-300 hover:border-stone-400 text-stone-600 bg-white/80'
              }`}
              title={isSoundPlaying ? 'Mute Coastal Sanctuary Ambience' : 'Play Ambient Coastal Soundscape'}
            >
              {isSoundPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#9A7732]" />
                  <span className="hidden md:inline text-[10px] tracking-widest text-[#0C1929] font-bold">Ambience</span>
                  <span className="hidden sm:flex items-center gap-0.5 h-2.5">
                    <span className="w-0.5 bg-[#9A7732] h-2 animate-pulse" />
                    <span className="w-0.5 bg-[#9A7732] h-3 animate-pulse delay-75" />
                    <span className="w-0.5 bg-[#9A7732] h-1.5 animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden md:inline text-[10px] tracking-widest text-stone-600">Sound: Off</span>
                </>
              )}
            </button>

            {/* Volume dropdown on hover if playing */}
            {isSoundPlaying && showVolumeSlider && (
              <div 
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="absolute right-0 top-full mt-2 p-2.5 bg-white border border-stone-200 rounded-xl shadow-xl flex items-center gap-2 z-50 w-36"
              >
                <span className="text-[10px] text-stone-600 uppercase font-semibold">Vol</span>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg accent-[#C5A059] cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Backstage CRM Switcher Button */}
          <button
            id="backstage-crm-toggle"
            onClick={() => setViewMode(viewMode === 'public' ? 'admin' : 'public')}
            className="group relative px-2.5 sm:px-3 py-1.5 rounded-full border border-[#C5A059]/50 hover:border-[#C5A059] bg-[#0C1929] hover:bg-[#14283F] text-[#FAF8F5] text-xs font-medium tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all shadow-xs"
            onMouseEnter={() => {
              setCursorText('Backstage CRM');
              setCursorVariant('pointer');
            }}
            onMouseLeave={() => {
              setCursorText('');
              setCursorVariant('default');
            }}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#E6CA85] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-[10px] sm:text-[11px] tracking-widest uppercase text-[#FAF8F5] font-semibold">
              Backstage CRM
            </span>
            {newLeadsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#BA6B53] text-[9px] text-white flex items-center justify-center font-bold">
                {newLeadsCount}
              </span>
            )}
          </button>

          {/* Book Venue Visit CTA (Desktop) */}
          <button
            id="book-visit-btn-nav"
            onClick={() => setIsVisitModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C5A059] bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-[11px] font-bold tracking-widest uppercase transition-all shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>

          {/* Quick Enquiry CTA */}
          <button
            id="quick-enquiry-nav"
            onClick={() => setIsEnquiryDrawerOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#0C1929]/30 hover:border-[#0C1929] bg-white/80 hover:bg-white text-[#0C1929] text-[11px] font-semibold tracking-widest uppercase transition-colors shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-[#9A7732]" />
            <span>Enquire</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0C1929] hover:text-[#9A7732] focus:outline-none rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Light Luxury Theme) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <nav className="flex flex-col space-y-3 pb-4 border-b border-stone-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-[#0C1929] font-semibold hover:text-[#9A7732] py-1.5 min-h-[44px] flex items-center"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Sound Switch */}
          <div className="flex items-center justify-between py-2 border-b border-stone-200">
            <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold">Sanctuary Ambience</span>
            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold uppercase flex items-center gap-1.5 ${
                isSoundPlaying ? 'bg-[#C5A059] text-[#0C1929] border-[#C5A059]' : 'bg-white text-stone-700 border-stone-300'
              }`}
            >
              {isSoundPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isSoundPlaying ? 'Playing' : 'Muted'}</span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                setIsVisitModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] py-3 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              Book Venue Walk-Through
            </button>
            <button
              onClick={() => {
                setIsEnquiryDrawerOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] py-3 rounded-full border border-[#0C1929] bg-white text-[#0C1929] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#9A7732]" />
              Request Bespoke Quotation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
