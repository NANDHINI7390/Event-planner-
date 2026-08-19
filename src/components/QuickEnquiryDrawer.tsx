import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { EVENT_EXPERIENCES } from '../data/venueData';
import { EventCategory } from '../types';

export const QuickEnquiryDrawer: React.FC = () => {
  const { isEnquiryDrawerOpen, setIsEnquiryDrawerOpen, addLead } = useApp();

  const [clientName, setClientName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState<EventCategory>('wedding');
  const [eventDate, setEventDate] = useState('2026-11-28');
  const [guestCount, setGuestCount] = useState(500);
  const [packageInterest, setPackageInterest] = useState<'essential' | 'signature' | 'grand'>('signature');
  const [budgetRange, setBudgetRange] = useState('₹25 - 35 Lakhs');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      clientName: clientName || 'Prospective Host',
      partnerName: partnerName || undefined,
      email: email || 'contact@client.com',
      phone: phone || '+91 98400 11223',
      eventType,
      eventDate,
      guestCount,
      budgetRange,
      status: 'new',
      assignedStaff: 'Pooja Iyer (Client Relations Lead)',
      preferredSpaces: ['The Banyan Grand Lawn', 'The Glasshouse Conservatory'],
      packageInterest,
      source: 'Website',
      quotationAmount: guestCount * (packageInterest === 'grand' ? 4500 : packageInterest === 'signature' ? 3200 : 2200) + 550000
    });

    setIsSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#C5A059', '#0C1929', '#FAF8F5']
    });
  };

  const handleClose = () => {
    setIsEnquiryDrawerOpen(false);
    setIsSubmitted(false);
  };

  if (!isEnquiryDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={handleClose} 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-lg bg-[#FAF8F5] text-[#0C1929] shadow-2xl flex flex-col justify-between border-l border-stone-200"
        >
          {/* Drawer Header */}
          <div className="p-6 bg-[#0C1929] text-white flex items-center justify-between border-b border-[#C5A059]/30">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E6CA85] font-bold block mb-1">
                Direct Digital Concierge
              </span>
              <h3 className="font-serif text-2xl text-white">
                Plan Your Celebration
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Krishnan"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-[#0C1929] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Partner or Co-host Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Siddharth Rao"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-[#0C1929] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:border-[#0C1929] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98400 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:border-[#0C1929] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                      Celebration Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as EventCategory)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:border-[#0C1929] focus:outline-none font-semibold text-[#0C1929]"
                    >
                      {EVENT_EXPERIENCES.map((e) => (
                        <option key={e.id} value={e.id}>{e.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                      Desired Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:border-[#0C1929] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-stone-700 font-semibold mb-1">
                    <span className="uppercase tracking-wider">Anticipated Guest Count</span>
                    <span className="text-[#9A7732] font-bold">{guestCount} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1400"
                    step="50"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-stone-300 rounded-lg accent-[#0C1929]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Package Interest
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['essential', 'signature', 'grand'] as const).map((pkg) => (
                      <button
                        key={pkg}
                        type="button"
                        onClick={() => setPackageInterest(pkg)}
                        className={`py-2 rounded-xl text-xs uppercase tracking-wider font-semibold border transition-all ${
                          packageInterest === pkg
                            ? 'bg-[#0C1929] text-white border-[#C5A059]'
                            : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                    Specific Curation Desires &amp; Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your mandap style, preferred cuisine or wedding planner..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:border-[#0C1929] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#0C1929]" />
                  <span>Submit Private Enquiry</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0C1929] text-[#E6CA85] border-2 border-[#C5A059] mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-[#0C1929] font-bold">
                  Enquiry Received with Reverence
                </h4>
                <p className="text-stone-700 text-xs leading-relaxed max-w-sm mx-auto">
                  Our client relations lead Pooja Iyer will prepare a personalized quotation and reach out within 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#0C1929] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Return to Exploration
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-600 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9A7732]" />
            <span>The Arboretum @ ECR · Direct Hospitality Protocol</span>
          </div>

        </motion.div>
      </div>
    </div>
  );
};
