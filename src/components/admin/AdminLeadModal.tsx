import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  User, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  FileText, 
  Check, 
  Trash2, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Send,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus, EventCategory } from '../../types';

export const AdminLeadModal: React.FC<{
  lead: Lead | null;
  onClose: () => void;
}> = ({ lead, onClose }) => {
  const { 
    updateLeadStatus, 
    updateLead, 
    deleteLead, 
    setSelectedLeadForQuotation, 
    setAdminTab,
    openCommunicationModal,
    addFollowUp,
    followUps,
    completeFollowUp,
    quotations,
    acceptQuotationAndConfirmBooking
  } = useApp();

  if (!lead) return null;

  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [assignedStaff, setAssignedStaff] = useState<string>(lead.assignedStaff || 'Vikram Sundaram (Senior Venue Director)');
  const [guestCount, setGuestCount] = useState<number>(lead.guestCount);
  const [eventDate, setEventDate] = useState<string>(lead.eventDate);
  const [newNoteText, setNewNoteText] = useState<string>('');

  // Follow-up sub-form
  const [isAddingFollowUp, setIsAddingFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('2026-08-20');
  const [followUpTime, setFollowUpTime] = useState('11:30');
  const [followUpNotes, setFollowUpNotes] = useState('Follow up regarding menu customization and golden hour walk-through.');

  const relatedFollowUps = followUps.filter(f => f.leadId === lead.id);
  const relatedQuote = quotations.find(q => q.leadId === lead.id);

  const handleSave = () => {
    updateLead(lead.id, {
      status,
      assignedStaff,
      guestCount,
      eventDate
    });
    onClose();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const updatedNotes = [
      ...(lead.internalNotes || []),
      `[${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${assignedStaff.split(' ')[0]}] ${newNoteText.trim()}`
    ];

    updateLead(lead.id, { internalNotes: updatedNotes });
    setNewNoteText('');
  };

  const handleCreateFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    addFollowUp({
      leadId: lead.id,
      clientName: lead.clientName,
      phone: lead.phone,
      dueDate: followUpDate,
      dueTime: followUpTime,
      assignedStaff: assignedStaff.split(' ')[0],
      notes: followUpNotes
    });
    setIsAddingFollowUp(false);
  };

  const handleConvertToQuotation = () => {
    setSelectedLeadForQuotation(lead);
    onClose();
    setAdminTab('quotes');
  };

  const handleAcceptAndConfirm = () => {
    if (relatedQuote) {
      acceptQuotationAndConfirmBooking(relatedQuote.id);
      onClose();
      setAdminTab('bookings');
    }
  };

  const handleOpenWhatsApp = () => {
    openCommunicationModal({
      recipientName: lead.clientName,
      recipientPhone: lead.phone,
      recipientEmail: lead.email,
      leadId: lead.id,
      defaultTemplate: 'visit_confirm'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white text-[#0C1929] rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-[#0C1929] text-white p-6 flex items-center justify-between border-b border-[#C5A059]/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                VIP Lead Dossier
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 text-white border border-white/20">
                {lead.status.replace('_', ' ')}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#FAF8F5] font-bold">
              {lead.clientName}
              {lead.partnerName && (
                <span className="font-serif italic text-stone-300 text-lg font-normal"> &amp; {lead.partnerName}</span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenWhatsApp}
              className="p-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
              title="Transmit WhatsApp Message"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs">
            <div>
              <span className="text-stone-700 text-[10px] uppercase font-bold block mb-0.5">Phone</span>
              <span className="font-mono font-semibold text-[#0C1929]">{lead.phone}</span>
            </div>
            <div>
              <span className="text-stone-700 text-[10px] uppercase font-bold block mb-0.5">Email</span>
              <span className="font-mono truncate block text-[#0C1929]">{lead.email}</span>
            </div>
            <div>
              <span className="text-stone-700 text-[10px] uppercase font-bold block mb-0.5">Source</span>
              <span className="font-semibold text-[#0C1929]">{lead.source}</span>
            </div>
            <div>
              <span className="text-stone-700 text-[10px] uppercase font-bold block mb-0.5">Budget</span>
              <span className="font-semibold text-emerald-800">{lead.budgetRange}</span>
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                Pipeline Stage *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-semibold text-[#0C1929] focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden"
              >
                <option value="new">New Enquiries</option>
                <option value="contacted">Contacted</option>
                <option value="visit_scheduled">Venue Walk-Through Scheduled</option>
                <option value="quotation_sent">Quotation Sent</option>
                <option value="negotiation">Negotiation / Tasting</option>
                <option value="confirmed">Confirmed Booking</option>
                <option value="completed">Completed Celebration</option>
                <option value="lost">Lost / Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                Assigned Staff Director *
              </label>
              <select
                value={assignedStaff}
                onChange={(e) => setAssignedStaff(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-semibold text-[#0C1929] focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden"
              >
                <option value="Vikram Sundaram (Senior Venue Director)">Vikram Sundaram (Director)</option>
                <option value="Pooja Iyer (Client Relations Lead)">Pooja Iyer (Client Relations)</option>
                <option value="Ramesh K. (Banquet Operations Lead)">Ramesh K. (Banquet Lead)</option>
                <option value="Ananya Nair (Senior Operations Lead)">Ananya Nair (Operations Lead)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                Celebration Date *
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-serif font-bold text-[#0C1929] focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                Estimated Guest Count
              </label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-mono font-bold text-[#0C1929] focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Quotation & Booking Bridge Banner (if quote exists) */}
          {relatedQuote && (
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#9A7732]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bespoke Proposal Active ({relatedQuote.quotationNumber})</span>
                </div>
                <span className="font-serif text-lg font-bold text-[#0C1929]">
                  ₹{(relatedQuote.totalAmount / 100000).toFixed(2)} Lakhs
                </span>
                <span className="text-[11px] text-stone-700 block">
                  Status: {relatedQuote.status.toUpperCase()} · 40% Advance: ₹{(relatedQuote.totalAmount * 0.4 / 100000).toFixed(2)}L
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAndConfirm}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept &amp; Confirm Booking</span>
                </button>
              </div>
            </div>
          )}

          {/* Follow-up / Reminder Scheduler */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-700 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#9A7732]" />
                <span>Scheduled Follow-ups &amp; Tasks</span>
              </span>
              <button
                type="button"
                onClick={() => setIsAddingFollowUp(!isAddingFollowUp)}
                className="text-xs font-bold text-[#9A7732] hover:text-[#0C1929] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingFollowUp ? 'Cancel' : 'Schedule Reminder'}</span>
              </button>
            </div>

            {/* Sub-form */}
            {isAddingFollowUp && (
              <form onSubmit={handleCreateFollowUp} className="p-3 bg-white rounded-xl border border-stone-300 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-700">Due Date</label>
                    <input
                      type="date"
                      required
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-700">Due Time</label>
                    <input
                      type="time"
                      value={followUpTime}
                      onChange={(e) => setFollowUpTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-700">Follow-Up Action / Agenda</label>
                  <input
                    type="text"
                    required
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0C1929] text-white rounded-lg text-xs font-bold hover:bg-stone-900 transition-colors"
                >
                  Save Scheduled Reminder
                </button>
              </form>
            )}

            {/* List of related follow-ups */}
            {relatedFollowUps.length > 0 ? (
              <div className="space-y-2">
                {relatedFollowUps.map(f => (
                  <div key={f.id} className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${f.status === 'completed' ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                        {f.notes}
                      </p>
                      <span className="text-[10px] text-stone-700">
                        Due: {f.dueDate} at {f.dueTime} · Lead: {f.assignedStaff}
                      </span>
                    </div>
                    {f.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => completeFollowUp(f.id)}
                        className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-[10px] font-bold text-stone-800"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-stone-700 italic">No pending follow-ups scheduled for this client.</div>
            )}
          </div>

          {/* Internal Notes Thread */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-stone-700 font-bold block">
              Internal Director Notes &amp; Call Logs
            </span>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {lead.internalNotes && lead.internalNotes.length > 0 ? (
                lead.internalNotes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800">
                    {note}
                  </div>
                ))
              ) : (
                <div className="text-xs text-stone-400 italic">No notes logged yet.</div>
              )}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Log a client conversation or requirement note..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0C1929] text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
              >
                Log
              </button>
            </form>
          </div>

          {/* Action Toolbar */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                deleteLead(lead.id);
                onClose();
              }}
              className="text-xs text-red-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Archive Lead</span>
            </button>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleConvertToQuotation}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0C1929] text-white hover:bg-stone-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Quote Builder</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                Save Updates
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
