import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sparkles, AlertCircle, Clock, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';
import { AUSPICIOUS_DATES_2026, CALENDAR_STATUS_DAYS, SEASONS_INFO, VENUE_SPACES } from '../data/venueData';
import { useApp } from '../context/AppContext';

export const AvailabilityCalendar: React.FC = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = Nov 2026, 1 = Dec 2026, etc.
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-21');
  const [estimatedGuests, setEstimatedGuests] = useState<number>(350);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('lawn');

  const { setIsVisitModalOpen, setIsEnquiryDrawerOpen, setCursorText, setCursorVariant, getCalendarDayStatus } = useApp();

  const months = [
    { name: 'November 2026', year: 2026, month: 10, daysInMonth: 30, startDayOfWeek: 0 },
    { name: 'December 2026', year: 2026, month: 11, daysInMonth: 31, startDayOfWeek: 2 },
    { name: 'January 2027', year: 2027, month: 0, daysInMonth: 31, startDayOfWeek: 5 },
    { name: 'February 2027', year: 2027, month: 1, daysInMonth: 28, startDayOfWeek: 1 },
    { name: 'March 2027', year: 2027, month: 2, daysInMonth: 31, startDayOfWeek: 1 },
  ];

  const currentMonth = months[currentMonthIndex];

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1));
  };

  // Selected date metadata (live synchronized)
  const activeDayStatus = getCalendarDayStatus(selectedDate);

  const isAuspicious = AUSPICIOUS_DATES_2026.includes(selectedDate);
  const selectedSpace = VENUE_SPACES.find(s => s.id === selectedSpaceId) || VENUE_SPACES[0];

  // Dynamic estimate calculation
  const calculatedVenueBase = (selectedSpace.fullDayRate || 450000) * activeDayStatus.rateMultiplier;
  const estimatedCatering = estimatedGuests * 2800; // avg luxury plate
  const calculatedEstimatedTotal = calculatedVenueBase + estimatedCatering;

  return (
    <section id="availability" className="py-20 sm:py-24 bg-[#FAF8F5] text-[#0C1929] relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-[#9A7732]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold">
                Transparent Date Intelligence &amp; Live Rates
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0C1929] tracking-tight">
              Auspicious Dates &amp; Calendar Matrix
            </h2>
            <p className="mt-2 sm:mt-3 text-stone-700 text-sm sm:text-base max-w-xl font-light">
              Review certified muhurtham windows, check open weekend dates, and preview instant investment estimates.
            </p>
          </div>

          {/* Quick Legend Chips */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-950 font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-950 font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Tentative Hold</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600 font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              <span>Reserved</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Month Calendar */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xl">
            
            {/* Month Header Switcher */}
            <div className="flex items-center justify-between pb-6 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0C1929] font-bold">
                  {currentMonth.name}
                </h3>
                <span className="text-xs text-[#9A7732] font-semibold uppercase tracking-wider">
                  Peak Coastal Wedding Season
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  disabled={currentMonthIndex === 0}
                  className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#0C1929] disabled:opacity-30 disabled:hover:border-stone-300 flex items-center justify-center text-[#0C1929] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  disabled={currentMonthIndex === months.length - 1}
                  className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#0C1929] disabled:opacity-30 disabled:hover:border-stone-300 flex items-center justify-center text-[#0C1929] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Empty lead padding days */}
              {Array.from({ length: currentMonth.startDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-xl bg-stone-50/40" />
              ))}

              {/* Day cells */}
              {Array.from({ length: currentMonth.daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const formattedDate = `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                
                const statusInfo = getCalendarDayStatus(formattedDate);
                const isSelected = selectedDate === formattedDate;
                const isMuhurtham = AUSPICIOUS_DATES_2026.includes(formattedDate);

                let cellStyle = 'bg-blue-50/70 text-blue-950 border-blue-200 hover:border-[#9A7732]';
                if (statusInfo.status === 'enquired') {
                  cellStyle = 'bg-amber-50 text-amber-950 border-amber-200 hover:border-[#9A7732]';
                } else if (statusInfo.status === 'booked') {
                  cellStyle = 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed opacity-60';
                }

                return (
                  <button
                    key={formattedDate}
                    onClick={() => {
                      if (statusInfo.status !== 'booked') {
                        setSelectedDate(formattedDate);
                      }
                    }}
                    disabled={statusInfo.status === 'booked'}
                    className={`relative h-14 sm:h-16 rounded-2xl border p-1.5 sm:p-2 flex flex-col justify-between items-start transition-all ${cellStyle} ${
                      isSelected ? 'ring-3 ring-[#0C1929] shadow-md scale-105 z-10 font-bold' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs sm:text-sm font-serif font-bold">
                        {dayNum}
                      </span>
                      {isMuhurtham && (
                        <span className="w-2 h-2 rounded-full bg-[#BA6B53]" title="Auspicious Muhurtham Date" />
                      )}
                    </div>

                    <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px]">
                      {statusInfo.status === 'available' && <span className="text-blue-900 font-semibold uppercase">Open</span>}
                      {statusInfo.status === 'enquired' && <span className="text-amber-800 font-semibold uppercase">Hold</span>}
                      {statusInfo.status === 'booked' && <span className="text-stone-400 font-medium">Locked</span>}
                      {statusInfo.rateMultiplier > 1.0 && (
                        <span className="font-mono text-[#9A7732] font-bold">+{Math.round((statusInfo.rateMultiplier - 1) * 100)}%</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Guidance */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BA6B53]" />
                <span className="font-semibold text-stone-800">Red dot indicates priest-verified auspicious wedding date</span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">Live Sync: Today</span>
            </div>

          </div>

          {/* Right Column: Date Intelligence & Dynamic Budget Calculator */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Inspector Card (Light Luxury) */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold block">
                    Selected Celebration Date
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#0C1929] font-bold mt-1">
                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                  </h4>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  activeDayStatus.status === 'available'
                    ? 'bg-blue-50 text-blue-950 border border-blue-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}>
                  {activeDayStatus.status === 'available' ? 'Available' : 'Tentative Hold'}
                </div>
              </div>

              {/* Status Note & Astrological Tag */}
              <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#0C1929]">
                  <Sparkles className="w-4 h-4 text-[#9A7732]" />
                  <span>{isAuspicious ? 'Verified Muhurtham Window' : 'Scenic Weekend Date'}</span>
                </div>
                <p className="text-stone-700 leading-relaxed font-light">
                  {activeDayStatus.note}
                </p>
              </div>

              {/* Live Calculator Form Controls */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1.5">
                    Target Venue Setting
                  </label>
                  <select
                    value={selectedSpaceId}
                    onChange={(e) => setSelectedSpaceId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-sm font-semibold text-[#0C1929] focus:outline-none focus:border-[#9A7732]"
                  >
                    {VENUE_SPACES.map(sp => (
                      <option key={sp.id} value={sp.id}>
                        {sp.name} ({sp.capacitySitting} pax) — ₹{((sp.fullDayRate || 400000) / 100000).toFixed(1)}L Base
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="uppercase tracking-wider text-stone-700 font-bold">Estimated Guest Count</span>
                    <span className="font-serif font-bold text-base text-[#0C1929]">{estimatedGuests} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="50"
                    value={estimatedGuests}
                    onChange={(e) => setEstimatedGuests(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg accent-[#0C1929] cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Instant Investment Preview Box */}
              <div className="p-5 rounded-2xl bg-[#0C1929] text-white border border-[#C5A059]/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#E6CA85]">
                  <span className="uppercase tracking-wider font-semibold">Estimated Total Outlay</span>
                  <span className="font-mono">Incl. Venue &amp; Royal Dining</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-white">
                    ₹{(calculatedEstimatedTotal / 100000).toFixed(2)} Lakhs
                  </span>
                  <span className="text-xs text-stone-300 uppercase tracking-wider font-medium">approx.</span>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Base Venue Rental ({selectedSpace.name})</span>
                    <span>₹{(calculatedVenueBase / 100000).toFixed(2)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Haute Banqueting ({estimatedGuests} plates @ ₹2,800)</span>
                    <span>₹{(estimatedCatering / 100000).toFixed(2)}L</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => setIsEnquiryDrawerOpen(true)}
                  className="w-full py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] font-bold text-xs uppercase tracking-widest transition-all shadow-xs"
                >
                  Hold This Date &amp; Request Quote
                </button>

                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-3 rounded-full border border-stone-300 hover:border-[#0C1929] bg-white text-[#0C1929] text-xs uppercase tracking-widest font-semibold transition-colors shadow-2xs"
                >
                  Book Walk-Through for This Weekend
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
