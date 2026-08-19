import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Sparkles, User, Calendar, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { EventCategory } from '../../types';
import { EVENT_EXPERIENCES } from '../../data/venueData';

export const NewLeadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addLead } = useApp();

  const [clientName, setClientName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState<EventCategory>('wedding');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [guestCount, setGuestCount] = useState(400);
  const [budgetRange, setBudgetRange] = useState('₹25 - 35 Lakhs');
  const [source, setSource] = useState('Website');
  const [assignedStaff, setAssignedStaff] = useState('Vikram Sundaram (Senior Venue Director)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      clientName: clientName || 'New Host',
      partnerName: partnerName || undefined,
      email: email || 'client@example.com',
      phone: phone || '+91 98400 00000',
      eventType,
      eventDate,
      guestCount,
      budgetRange,
      status: 'new',
      assignedStaff,
      preferredSpaces: ['The Banyan Grand Lawn'],
      packageInterest: 'signature',
      source,
      quotationAmount: guestCount * 3200 + 550000
    });

    confetti({
      particleCount: 40,
      spread: 60,
      colors: ['#C5A059', '#12231A']
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white text-[#12231A] rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden my-8"
      >
        <div className="bg-[#12231A] text-white p-6 flex items-center justify-between border-b border-[#C5A059]/30">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
              Backstage Intake
            </span>
            <h3 className="font-serif text-2xl text-[#FAF8F5]">
              Register Inbound Enquiry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Client Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kavita Ramachandran"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Partner Name</label>
              <input
                type="text"
                placeholder="e.g. Rohit Nair"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Phone *</label>
              <input
                type="tel"
                required
                placeholder="+91 98400 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="client@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventCategory)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none"
              >
                {EVENT_EXPERIENCES.map((e) => (
                  <option key={e.id} value={e.id}>{e.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Target Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Guest Count</label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Lead Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none"
              >
                <option value="Website">Website</option>
                <option value="Walk-in">Walk-in Visit</option>
                <option value="Phone Call">Direct Phone Call</option>
                <option value="Wedding Planner Referral">Wedding Planner Referral</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-stone-600 font-semibold mb-1">Assigned Director</label>
            <select
              value={assignedStaff}
              onChange={(e) => setAssignedStaff(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:border-[#C5A059] focus:outline-none"
            >
              <option value="Vikram Sundaram (Senior Venue Director)">Vikram Sundaram</option>
              <option value="Pooja Iyer (Client Relations Lead)">Pooja Iyer</option>
              <option value="Ramesh K. (Banquet Operations Lead)">Ramesh K.</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-stone-300 font-semibold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#12231A] hover:bg-[#1E3A2B] text-white font-semibold uppercase tracking-wider shadow-md"
            >
              Create Lead
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
