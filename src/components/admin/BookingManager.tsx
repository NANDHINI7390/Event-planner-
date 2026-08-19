import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  CreditCard,
  FileCheck,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  Receipt,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Tag,
  Printer,
  Award,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking, PaymentRecord } from '../../types';
import { PaymentRecordModal } from './PaymentRecordModal';
import { ReceiptModal } from './ReceiptModal';

export const BookingManager: React.FC = () => {
  const { 
    bookings, 
    updateBooking, 
    markBookingFinanciallyClosed,
    setAdminTab, 
    openCommunicationModal, 
    userRole 
  } = useApp();

  const [selectedBookingId, setSelectedBookingId] = useState<string>(bookings[0]?.id || '');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  
  // Receipt Modal State
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);
  const [activeReceiptPayment, setActiveReceiptPayment] = useState<PaymentRecord | null>(null);
  const [isFinalClearanceMode, setIsFinalClearanceMode] = useState<boolean>(false);

  const [statusFilter, setStatusFilter] = useState<'all' | 'advance_paid' | 'partially_paid' | 'fully_paid' | 'financially_closed'>('all');

  const filteredBookings = bookings.filter(b => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'financially_closed') return b.isFinanciallyClosed;
    return b.paymentStatus === statusFilter;
  });

  const activeBooking = bookings.find(b => b.id === selectedBookingId) || filteredBookings[0] || bookings[0];

  const handleWhatsAppUpdate = (booking: Booking) => {
    openCommunicationModal({
      recipientName: booking.clientName,
      recipientPhone: booking.phone,
      recipientEmail: booking.email,
      bookingId: booking.id,
      defaultTemplate: 'booking_confirm',
      customMessage: `Namaste ${booking.clientName},\n\nCelebration update from The Arboretum @ ECR.\n\n🏛️ Booking Reference: ${booking.bookingRef}\n📅 Event Date: ${booking.eventDate}\n🌿 Spaces: ${(booking.assignedSpaces || booking.spaces || []).join(', ')}\n\n💳 Financial Ledger Status: ${booking.isFinanciallyClosed ? 'FINANCIALLY CLOSED · 100% SETTLED' : booking.paymentStatus.replace('_', ' ').toUpperCase()}\n• Total Outlay: ₹${(booking.totalAmount / 100000).toFixed(2)} Lakhs\n• Received to Date: ₹${(booking.depositPaid / 100000).toFixed(2)} Lakhs\n• Balance Due: ₹${(booking.balanceDue / 100000).toFixed(2)} Lakhs\n\nOur Executive Directorate is available should you need to coordinate any event enhancements.\n\nWarm regards,\nVikram Sundaram | Senior Venue Director`
    });
  };

  const handleViewReceipt = (payment: PaymentRecord) => {
    setActiveReceiptPayment(payment);
    setIsFinalClearanceMode(false);
    setIsReceiptModalOpen(true);
  };

  const handleViewFinalClearance = (booking: Booking) => {
    setActiveReceiptPayment(null);
    setIsFinalClearanceMode(true);
    setIsReceiptModalOpen(true);
  };

  const handleMarkFinanciallyClosed = (booking: Booking) => {
    markBookingFinanciallyClosed(booking.id, `Audited & certified 100% financially closed by ${userRole === 'admin' ? 'Vikram Sundaram (Director)' : 'Pooja Iyer (Manager)'}.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7732] font-bold">
              Estate Execution &amp; Treasury Ledger
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1929]">
            Booking Ledger &amp; Financial Accounting
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-light mt-1">
            End-to-end accounting flow: 40% Advance → Milestone Clearances → Final Payment → Official Tax Receipts → Financial Account Closure.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4 py-2 rounded-2xl bg-[#0C1929] text-white text-xs font-mono font-bold shadow-xs">
            {bookings.length} Registered Celebrations
          </span>
          <button
            onClick={() => setAdminTab('operations')}
            className="px-4 py-2 rounded-2xl border border-stone-300 hover:border-[#0C1929] text-xs font-bold text-[#0C1929] bg-[#FAF8F5] transition-colors flex items-center gap-1.5"
          >
            <span>Live Operations Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Celebrations' },
          { id: 'advance_paid', label: '40% Advance Paid' },
          { id: 'partially_paid', label: 'Partially Paid' },
          { id: 'fully_paid', label: '100% Fully Settled' },
          { id: 'financially_closed', label: 'Financially Closed' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              statusFilter === tab.id
                ? 'bg-[#0C1929] text-[#E6CA85] border-[#C5A059] shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Split: Left Bookings List & Right Active Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 5 Cols: Bookings Master List */}
        <div className="lg:col-span-5 space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 text-stone-600 text-xs">
              No bookings found matching current filter.
            </div>
          ) : (
            filteredBookings.map((b) => {
              const isSelected = b.id === activeBooking?.id;
              const percentPaid = Math.round((b.depositPaid / b.totalAmount) * 100);

              let badgeText = b.paymentStatus.replace('_', ' ');
              let badgeStyle = 'bg-amber-50 text-amber-950 border-amber-200';
              
              if (b.isFinanciallyClosed) {
                badgeText = 'Financially Closed';
                badgeStyle = 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold';
              } else if (b.paymentStatus === 'fully_paid') {
                badgeText = '100% Fully Paid';
                badgeStyle = 'bg-emerald-50 text-emerald-950 border-emerald-200';
              } else if (b.paymentStatus === 'advance_paid') {
                badgeText = '40% Advance Paid';
                badgeStyle = 'bg-blue-50 text-blue-950 border-blue-200';
              }

              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBookingId(b.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0C1929] text-white border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-xl'
                      : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] uppercase tracking-widest font-mono font-bold block ${
                          isSelected ? 'text-[#E6CA85]' : 'text-[#9A7732]'
                        }`}>
                          {b.bookingRef}
                        </span>
                        {b.isFinanciallyClosed && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Financially Closed" />
                        )}
                      </div>
                      <h4 className="font-serif text-lg font-bold mt-0.5 leading-snug">
                        {b.eventTitle}
                      </h4>
                      <p className={`text-xs ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                        {b.clientName}
                      </p>
                    </div>
                    
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                      isSelected ? 'bg-white/10 text-[#E6CA85] border-white/20' : badgeStyle
                    }`}>
                      {badgeText}
                    </span>
                  </div>

                  {/* Date & Financial Highlights */}
                  <div className={`grid grid-cols-2 gap-3 text-xs mt-3.5 pt-3.5 border-t ${
                    isSelected ? 'border-white/10' : 'border-stone-100'
                  }`}>
                    <div>
                      <span className={`text-[10px] block uppercase font-bold ${isSelected ? 'text-stone-400' : 'text-stone-600'}`}>
                        Event Date
                      </span>
                      <span className="font-semibold">{b.eventDate}</span>
                    </div>
                    <div>
                      <span className={`text-[10px] block uppercase font-bold ${isSelected ? 'text-stone-400' : 'text-stone-600'}`}>
                        Paid / Total
                      </span>
                      <span className={`font-serif font-bold ${isSelected ? 'text-[#E6CA85]' : 'text-[#0C1929]'}`}>
                        ₹{(b.depositPaid / 100000).toFixed(2)}L / ₹{(b.totalAmount / 100000).toFixed(2)}L
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className={isSelected ? 'text-stone-400' : 'text-stone-600'}>Ledger Clearance</span>
                      <span className="font-bold">{percentPaid}%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isSelected ? 'bg-white/10' : 'bg-stone-100'}`}>
                      <div
                        className="h-full bg-[#C5A059]"
                        style={{ width: `${percentPaid}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right 7 Cols: Detailed Event Dossier */}
        {activeBooking && (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#9A7732] font-bold font-mono">
                    {activeBooking.bookingRef}
                  </span>
                  {activeBooking.isFinanciallyClosed ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Financially Closed · 100% Settled</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-950 border border-blue-200">
                      {activeBooking.operationalStatus || 'Planning'}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0C1929]">
                  {activeBooking.eventTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 mt-2">
                  <span className="flex items-center gap-1 font-semibold text-[#0C1929]">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    {activeBooking.clientName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-500" />
                    {activeBooking.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-stone-500" />
                    {activeBooking.email}
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 self-start">
                <button
                  onClick={() => handleWhatsAppUpdate(activeBooking)}
                  className="p-2.5 rounded-2xl border border-stone-300 hover:border-[#0C1929] text-[#0C1929] hover:bg-stone-50 transition-colors"
                  title="Send WhatsApp Update"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                </button>

                {activeBooking.isFinanciallyClosed ? (
                  <button
                    onClick={() => handleViewFinalClearance(activeBooking)}
                    className="px-4 py-2.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5 text-[#E6CA85]" />
                    <span>Clearance Certificate</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-[#0C1929] hover:bg-stone-900 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>
                      {activeBooking.balanceDue === 0 ? 'Record Add-on' : 'Collect Payment'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-700 font-bold">
                  Commercial Ledger &amp; Advance Compliance
                </span>
                <span className="text-xs font-mono font-bold text-[#9A7732]">
                  40% Advance Req: ₹{(activeBooking.advanceRequired / 100000).toFixed(2)}L
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-600 text-[10px] uppercase font-bold block mb-0.5">Total Outlay</span>
                  <span className="font-serif text-lg font-bold text-[#0C1929]">
                    ₹{(activeBooking.totalAmount / 100000).toFixed(2)}L
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-emerald-800 text-[10px] uppercase font-bold block mb-0.5">Received to Date</span>
                  <span className="font-serif text-lg font-bold text-emerald-700">
                    ₹{(activeBooking.depositPaid / 100000).toFixed(2)}L
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-amber-800 text-[10px] uppercase font-bold block mb-0.5">Remaining Balance</span>
                  <span className="font-serif text-lg font-bold text-amber-900">
                    ₹{(activeBooking.balanceDue / 100000).toFixed(2)}L
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C5A059]"
                  style={{ width: `${(activeBooking.depositPaid / activeBooking.totalAmount) * 100}%` }}
                />
              </div>

              {/* Final Closure Status Callout / Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-200 text-xs">
                {activeBooking.isFinanciallyClosed ? (
                  <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Financially Closed on {activeBooking.financiallyClosedAt || activeBooking.eventDate} by {activeBooking.closedBy || 'Director'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-stone-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Balance clearance required to seal financial closure.</span>
                  </div>
                )}

                {!activeBooking.isFinanciallyClosed && (
                  <button
                    onClick={() => handleMarkFinanciallyClosed(activeBooking)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-2xs"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Mark Event Financially Closed</span>
                  </button>
                )}
              </div>
            </div>

            {/* Itemized Payment History & Receipts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-700 font-bold">
                  Itemized Treasury Transactions &amp; Receipts ({activeBooking.paymentHistory?.length || 0})
                </span>
                {activeBooking.isFinanciallyClosed && (
                  <button
                    onClick={() => handleViewFinalClearance(activeBooking)}
                    className="text-xs font-bold text-[#9A7732] hover:underline flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Final Clearance Statement</span>
                  </button>
                )}
              </div>

              {activeBooking.paymentHistory && activeBooking.paymentHistory.length > 0 ? (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {activeBooking.paymentHistory.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="p-3.5 rounded-2xl bg-white border border-stone-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-[#0C1929] transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#0C1929]">
                            ₹{(p.amount / 100000).toFixed(2)} Lakhs
                          </span>
                          <span className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[10px] text-stone-700">
                            {p.paymentMethod}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] uppercase font-bold bg-amber-50 text-amber-900 border border-amber-200">
                            {p.paymentType?.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Ref: <span className="font-mono font-medium text-stone-800">{p.referenceNumber}</span> · {p.notes}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="text-right hidden sm:block">
                          <span className="font-mono text-[11px] text-stone-600 block">{p.date}</span>
                          <span className="text-[10px] text-stone-500">By {p.recordedBy?.split(' ')[0]}</span>
                        </div>

                        <button
                          onClick={() => handleViewReceipt(p)}
                          className="px-3 py-1.5 rounded-xl border border-stone-300 hover:border-[#0C1929] bg-stone-50 hover:bg-white text-[#0C1929] text-[11px] font-bold flex items-center gap-1 transition-all"
                        >
                          <Receipt className="w-3.5 h-3.5 text-[#9A7732]" />
                          <span>View Receipt</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center text-xs text-stone-600">
                  Initial deposit recorded upon contract execution.
                </div>
              )}
            </div>

            {/* Reserved Spaces */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-stone-700 font-bold block">
                Reserved Estate Spaces &amp; Banqueting
              </span>
              <div className="flex flex-wrap gap-2">
                {(activeBooking.assignedSpaces || activeBooking.spaces || []).map((space, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 rounded-2xl bg-[#0C1929] text-white text-xs font-medium border border-stone-300 flex items-center gap-2 shadow-2xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{space}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Operations Link & Banquet Director */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-600 font-bold block">
                  Assigned Senior Banquet Director
                </span>
                <span className="font-bold text-[#0C1929] text-sm">
                  {activeBooking.banquetManager}
                </span>
              </div>
              
              <button
                onClick={() => setAdminTab('operations')}
                className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#0C1929] text-xs font-bold text-[#0C1929] flex items-center gap-1.5 transition-all self-start sm:self-auto"
              >
                <span>View Full Operational Grid</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9A7732]" />
              </button>
            </div>

            {/* Coordination Log & Milestones */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-stone-700 font-bold block">
                Coordination Log &amp; Timeline Notes
              </span>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {(activeBooking.timelineNotes || []).map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7732] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Payment Recording Modal */}
      {isPaymentModalOpen && activeBooking && (
        <PaymentRecordModal
          booking={activeBooking}
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}

      {/* Official Tax / Final Clearance Receipt Modal */}
      {isReceiptModalOpen && activeBooking && (
        <ReceiptModal
          booking={activeBooking}
          paymentRecord={activeReceiptPayment}
          isFinalSettlement={isFinalClearanceMode}
          onClose={() => setIsReceiptModalOpen(false)}
        />
      )}

    </div>
  );
};
