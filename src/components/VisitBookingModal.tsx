import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Check, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { EVENT_EXPERIENCES, VENUE_SPACES } from '../data/venueData';
import { EventCategory } from '../types';

export const VisitBookingModal: React.FC = () => {
  const {
    isVisitModalOpen,
    setIsVisitModalOpen,
    selectedDateForVisit,
    setSelectedDateForVisit,
    addLead
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [visitDate, setVisitDate] = useState<string>(selectedDateForVisit || '2026-11-21');
  const [timeSlot, setTimeSlot] = useState<string>('Golden Hour Tour (16:30 - 18:00)');
  const [eventType, setEventType] = useState<EventCategory>('wedding');
  const [guestCount, setGuestCount] = useState<number>(450);
  const [clientName, setClientName] = useState<string>('');
  const [partnerName, setPartnerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(['The Banyan Grand Lawn', 'The Glasshouse Conservatory']);
  const [bookingConfirmedId, setBookingConfirmedId] = useState<string | null>(null);

  const timeSlots = [
    { id: 'morning', label: 'Morning Light Walk (09:30 - 11:00)', desc: 'Experience morning birdcalls and natural canopy sunlight' },
    { id: 'golden_hour', label: 'Golden Hour Tour (16:30 - 18:00)', desc: 'Witness coastal sunset, reflecting pools, and tree illumination transition' },
    { id: 'twilight', label: 'Twilight & Starlight (18:30 - 20:00)', desc: 'Explore active fairy light canopies, brass chandeliers & evening acoustics' }
  ];

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit & Create Lead
      const newLeadId = addLead({
        clientName: clientName || 'Prospective Guest',
        partnerName: partnerName || undefined,
        email: email || 'guest@example.com',
        phone: phone || '+91 98400 00000',
        eventType,
        eventDate: visitDate,
        guestCount,
        budgetRange: '₹20 - 35 Lakhs',
        status: 'visit_scheduled',
        assignedStaff: 'Vikram Sundaram (Senior Venue Director)',
        preferredSpaces: selectedSpaces,
        packageInterest: 'signature',
        source: 'Website',
        visitDate: visitDate,
        visitSlot: timeSlot
      });

      setBookingConfirmedId(newLeadId);
      setStep(5);

      // Trigger Luxury Gold Confetti
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#E6CA85', '#0C1929', '#FAF8F5']
      });
    }
  };

  const handleClose = () => {
    setIsVisitModalOpen(false);
    setSelectedDateForVisit(null);
    setStep(1);
    setBookingConfirmedId(null);
  };

  if (!isVisitModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#FAF8F5] text-[#0C1929] rounded-3xl border border-[#C5A059]/40 shadow-2xl max-w-2xl w-full overflow-hidden my-8"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0C1929] text-white p-6 sm:p-8 flex items-center justify-between border-b border-[#C5A059]/30">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E6CA85] font-bold block mb-1">
              Private Sanctuary Hospitality
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Schedule a Private Venue Walk-Through
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-stone-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Rail (Only if not confirmed) */}
        {step < 5 && (
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-[#0C1929]">Step {step} of 4</span>
              <span className="uppercase tracking-wider">
                {step === 1 && 'Date & Timing'}
                {step === 2 && 'Celebration Vision'}
                {step === 3 && 'Spaces of Interest'}
                {step === 4 && 'Your Details'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0C1929] transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body Steps */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Date & Time Slot */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-2">
                  Preferred Walk-Through Date
                </label>
                <input
                  type="date"
                  value={visitDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-stone-300 text-stone-900 font-serif text-lg focus:border-[#0C1929] focus:outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-3">
                  Select Atmospheric Time Slot
                </label>
                <div className="space-y-3">
                  {timeSlots.map((slot) => {
                    const isSelected = timeSlot === slot.label;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setTimeSlot(slot.label)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                          isSelected
                            ? 'border-[#0C1929] bg-[#0C1929] text-white shadow-md'
                            : 'border-stone-200 bg-white hover:border-stone-400 text-stone-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock className={`w-4 h-4 ${isSelected ? 'text-[#E6CA85]' : 'text-stone-500'}`} />
                            <span className="font-semibold text-sm">{slot.label}</span>
                          </div>
                          <p className={`text-xs mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                            {slot.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-[#C5A059] text-[#0C1929] flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Event Type & Guest Count */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-2">
                  Type of Celebration
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventCategory)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-stone-300 text-stone-900 text-sm focus:border-[#0C1929] focus:outline-none shadow-xs font-semibold"
                >
                  {EVENT_EXPERIENCES.map((e) => (
                    <option key={e.id} value={e.id}>{e.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-stone-700 font-semibold mb-2">
                  <span className="uppercase tracking-wider">Anticipated Guest Count</span>
                  <span className="text-[#9A7732] text-base font-bold">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1400"
                  step="50"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-stone-300 rounded-lg accent-[#0C1929] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-500 mt-1 font-mono">
                  <span>50 (Intimate)</span>
                  <span>600 (Grand)</span>
                  <span>1400+ (Sanctuary)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Spaces of Interest */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-2">
                Which Sanctuary Spaces Would You Like to Tour?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VENUE_SPACES.map((space) => {
                  const isChecked = selectedSpaces.includes(space.name);
                  return (
                    <button
                      key={space.id}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setSelectedSpaces(selectedSpaces.filter(s => s !== space.name));
                        } else {
                          setSelectedSpaces([...selectedSpaces, space.name]);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#0C1929] bg-[#0C1929] text-white shadow-sm'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <span className="font-serif text-sm font-semibold block">{space.name}</span>
                        <span className={`text-[10px] ${isChecked ? 'text-stone-300' : 'text-stone-500'}`}>
                          {space.capacityFloating} Guests Float
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isChecked ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1929]' : 'border-stone-300'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Client Contact Details */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Siddharth Rao"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-[#0C1929] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Partner / Family Member Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Krishnan"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-[#0C1929] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-[#0C1929] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98400 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-[#0C1929] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9A7732] flex-shrink-0" />
                <span>Your private contact information is held with strict confidentiality.</span>
              </div>
            </div>
          )}

          {/* STEP 5: Luxury Celebration Confirmation Screen */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-4"
            >
              {/* Royal Navy Crest Stamp */}
              <div className="w-20 h-20 rounded-full bg-[#0C1929] text-[#E6CA85] border-2 border-[#C5A059] mx-auto flex items-center justify-center shadow-2xl">
                <Sparkles className="w-9 h-9 animate-pulse" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9A7732] font-bold block mb-1">
                  Appointment Confirmed
                </span>
                <h4 className="font-serif text-3xl text-[#0C1929] font-bold">
                  We Look Forward to Welcoming You
                </h4>
                <p className="text-stone-700 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  Your private walk-through has been scheduled with Vikram Sundaram (Senior Venue Director). A calendar invite and navigation pass have been registered.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-6 rounded-2xl bg-[#0C1929] text-white text-left border border-[#C5A059]/40 shadow-xl max-w-md mx-auto space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-serif text-lg text-[#E6CA85]">The Arboretum Sanctuary Pass</span>
                  <span className="text-[10px] font-mono text-stone-400">PASS-2026-WLK</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Guest Name</span>
                    <span className="font-semibold text-stone-100">{clientName || 'Valued Guest'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Event Type</span>
                    <span className="font-semibold text-[#E6CA85] uppercase">{eventType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Date</span>
                    <span className="font-semibold text-stone-100">{visitDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Time Slot</span>
                    <span className="font-semibold text-stone-100">{timeSlot.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-[#0C1929] text-white hover:bg-[#14283F] text-xs uppercase tracking-widest font-semibold transition-colors shadow-xs"
                >
                  Done &amp; Return to Sanctuary
                </button>
              </div>
            </motion.div>
          )}

          {/* Navigation Controls */}
          {step < 5 && (
            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:border-stone-400 transition-colors"
                >
                  Back
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-3 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-xs font-bold uppercase tracking-widest transition-colors shadow-xs flex items-center gap-2"
              >
                <span>{step === 4 ? 'Confirm & Reserve Walk-Through' : 'Continue'}</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
