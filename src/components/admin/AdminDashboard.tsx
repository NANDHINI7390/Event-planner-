import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Plus, 
  ChevronRight,
  FileText,
  AlertCircle,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Receipt,
  Circle,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FollowUp } from '../../types';

export const AdminDashboard: React.FC<{ onNewLeadClick: () => void }> = ({ onNewLeadClick }) => {
  const { 
    leads, 
    quotations, 
    bookings, 
    followUps,
    completeFollowUp,
    rescheduleFollowUp,
    openCommunicationModal,
    setAdminTab, 
    setSelectedLeadForQuotation,
    userRole,
    setUserRole,
    resetToDemoData
  } = useApp();

  const [followUpTab, setFollowUpTab] = useState<'today' | 'overdue' | 'upcoming'>('today');

  const todayStr = '2026-08-19'; // Demo context today

  const todayFollowUps = followUps.filter(f => f.status === 'pending' && f.dueDate === todayStr);
  const overdueFollowUps = followUps.filter(f => f.status === 'pending' && f.dueDate < todayStr);
  const upcomingFollowUps = followUps.filter(f => f.status === 'pending' && f.dueDate > todayStr);

  const activeFollowUpList = followUpTab === 'today' 
    ? todayFollowUps 
    : followUpTab === 'overdue' 
    ? overdueFollowUps 
    : upcomingFollowUps;

  // Key Metrics
  const newEnquiriesCount = leads.filter(l => l.status === 'new' || l.status === 'contacted').length;
  const visitsScheduledCount = leads.filter(l => l.status === 'visit_scheduled').length;
  const quotesSentCount = quotations.filter(q => q.status === 'sent').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  const totalBookedRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalAdvancesCollected = bookings.reduce((sum, b) => sum + b.depositPaid, 0);
  const totalPipelineValue = leads.reduce((sum, l) => sum + (l.quotationAmount || 2500000), 0);

  const handleWhatsAppFollowUp = (item: FollowUp) => {
    openCommunicationModal({
      recipientName: item.clientName,
      recipientPhone: item.phone,
      recipientEmail: '',
      leadId: item.leadId,
      defaultTemplate: 'visit_confirm',
      customMessage: `Namaste ${item.clientName},\n\nFollowing up from The Arboretum @ ECR Celebrations Directorate regarding your celebration inquiry.\n\n${item.notes}\n\nPlease let us know if you would like to schedule a private golden hour walkthrough this week.\n\nWarm regards,\n${item.assignedStaff} | The Arboretum @ ECR`
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#0C1929] p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
              Estate Directorate · Central Command
            </span>
            <div className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] font-mono text-stone-300">
              <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
              <span>Role: <strong className="text-white uppercase">{userRole}</strong></span>
            </div>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
            Sanctuary Operations &amp; Commercial Pipeline
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light mt-1 max-w-2xl">
            {leads.length} active celebration leads in pipeline · {todayFollowUps.length} follow-ups due today · ₹{(totalAdvancesCollected / 100000).toFixed(2)}L in verified advance deposits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNewLeadClick}
            className="px-5 py-2.5 rounded-2xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inbound Lead</span>
          </button>

          <button
            onClick={() => setAdminTab('quotes')}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 border border-white/10"
          >
            <FileText className="w-4 h-4 text-[#C5A059]" />
            <span>Quote Builder</span>
          </button>

          <button
            onClick={resetToDemoData}
            title="Reset to clean baseline demo data"
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 text-stone-400 hover:text-white transition-colors border border-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-700 font-bold">Active Enquiries</span>
            <div className="w-9 h-9 rounded-2xl bg-[#0C1929] text-[#C5A059] flex items-center justify-center shadow-xs">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl text-[#0C1929] font-bold block">
              {newEnquiriesCount}
            </span>
            <span className="text-[11px] text-stone-700 mt-1 block">
              {leads.filter(l => l.status === 'new').length} newly captured inquiries
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-700 font-bold">Today's Reminders</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-[#0C1929] font-bold block">
                {todayFollowUps.length}
              </span>
              {overdueFollowUps.length > 0 && (
                <span className="text-xs font-bold text-rose-600">
                  (+{overdueFollowUps.length} overdue)
                </span>
              )}
            </div>
            <span className="text-[11px] text-stone-700 mt-1 block">
              Direct call &amp; WhatsApp actions
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-700 font-bold">Advance Collected</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center shadow-xs">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl text-emerald-800 font-bold block">
              ₹{(totalAdvancesCollected / 100000).toFixed(2)} L
            </span>
            <span className="text-[11px] text-stone-700 mt-1 block">
              40% statutory reservation deposits
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#0C1929] text-white p-5 rounded-3xl border border-[#C5A059]/40 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#C5A059] font-bold">Locked Bookings</span>
            <div className="w-9 h-9 rounded-2xl bg-white/10 text-[#C5A059] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl text-white font-bold block">
              ₹{(totalBookedRevenue / 100000).toFixed(2)} L
            </span>
            <span className="text-[11px] text-stone-300 mt-1 block">
              {confirmedCount} confirmed celebrations
            </span>
          </div>
        </div>

      </div>

      {/* Follow-Up & Daily Reminders Center */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#BA6B53]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#BA6B53]">
                Daily Client Engagement &amp; Follow-Up Schedule
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0C1929]">
              Directorate Follow-Up Console
            </h3>
          </div>

          {/* Follow-up Tabs */}
          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button
              onClick={() => setFollowUpTab('today')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                followUpTab === 'today'
                  ? 'bg-[#0C1929] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#0C1929]'
              }`}
            >
              Today ({todayFollowUps.length})
            </button>
            <button
              onClick={() => setFollowUpTab('overdue')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                followUpTab === 'overdue'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-rose-700'
              }`}
            >
              Overdue ({overdueFollowUps.length})
            </button>
            <button
              onClick={() => setFollowUpTab('upcoming')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                followUpTab === 'upcoming'
                  ? 'bg-[#0C1929] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#0C1929]'
              }`}
            >
              Upcoming ({upcomingFollowUps.length})
            </button>
          </div>
        </div>

        {/* Follow-up list */}
        {activeFollowUpList.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-stone-200 text-stone-700 text-xs">
            No follow-ups currently pending in this category. All client communications are up to date!
          </div>
        ) : (
          <div className="space-y-3">
            {activeFollowUpList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-stone-100 border border-stone-200 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#0C1929]">{item.clientName}</span>
                    <span className="font-mono text-xs text-stone-700 font-semibold">{item.phone}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-200 text-stone-800">
                      Due: {item.dueTime || '11:00 AM'}
                    </span>
                    {item.dueDate < todayStr && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-200">
                        Overdue ({item.dueDate})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-800 font-medium">
                    {item.notes}
                  </p>
                  <span className="text-[11px] text-stone-700 font-semibold block">
                    Assigned Lead: {item.assignedStaff}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end lg:self-center">
                  <button
                    onClick={() => handleWhatsAppFollowUp(item)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => completeFollowUp(item.id, 'Client contacted via phone, walk-through confirmed.')}
                    className="px-3.5 py-2 rounded-xl bg-[#0C1929] hover:bg-stone-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Mark Done</span>
                  </button>
                  <button
                    onClick={() => rescheduleFollowUp(item.id, '2026-08-20', '15:00')}
                    className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-white text-stone-700 text-xs font-semibold transition-colors"
                  >
                    +1 Day
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main 2-Column Split: Pipeline Snapshot & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Quick Pipeline Activity & Leads */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-xl text-[#0C1929] font-bold">
                  Recent High-Priority Enquiries
                </h3>
                <span className="text-xs text-stone-700">Immediate action queue</span>
              </div>

              <button
                onClick={() => setAdminTab('pipeline')}
                className="text-xs font-bold text-[#9A7732] hover:text-[#0C1929] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View All In Kanban</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 4).map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-stone-100 border border-stone-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0C1929]">{lead.clientName}</span>
                      {lead.partnerName && (
                        <span className="text-xs text-stone-700 font-serif italic">&amp; {lead.partnerName}</span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0C1929] text-white">
                        {lead.eventType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-700">
                      <span>📅 {lead.eventDate}</span>
                      <span>👥 {lead.guestCount} pax</span>
                      <span className="text-stone-400">·</span>
                      <span className="font-mono text-[11px] text-stone-700">{lead.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setSelectedLeadForQuotation(lead);
                        setAdminTab('quotes');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#0C1929] text-white hover:bg-stone-900 text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
                    >
                      Build Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Upcoming Booked Events Calendar Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-xl text-[#0C1929] font-bold">
                  Confirmed Event Ledger
                </h3>
                <span className="text-xs text-stone-700">Upcoming estate bookings</span>
              </div>

              <button
                onClick={() => setAdminTab('bookings')}
                className="text-xs font-bold text-[#9A7732] hover:text-[#0C1929] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Ledger &amp; Payments</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-mono font-bold block">
                        {booking.bookingRef}
                      </span>
                      <h4 className="font-serif text-base text-white font-bold">
                        {booking.eventTitle}
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-900/60 text-emerald-300 border border-emerald-500/40">
                      {booking.paymentStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-300 border-t border-white/10 pt-2">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-bold">Date</span>
                      <span className="font-semibold">{booking.eventDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-bold">Contract Total</span>
                      <span className="font-semibold text-[#C5A059]">₹{(booking.totalAmount / 100000).toFixed(2)}L</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-300 pt-1 flex items-center justify-between">
                    <span>Paid: ₹{(booking.depositPaid / 100000).toFixed(2)}L</span>
                    <span className="text-stone-400">Bal: ₹{(booking.balanceDue / 100000).toFixed(2)}L</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
