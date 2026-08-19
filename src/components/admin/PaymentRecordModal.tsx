import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CreditCard, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Receipt,
  FileText,
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking, PaymentMethod, PaymentRecord } from '../../types';

interface PaymentRecordModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentRecordModal: React.FC<PaymentRecordModalProps> = ({
  booking,
  isOpen,
  onClose
}) => {
  const { recordPayment, openCommunicationModal, userRole } = useApp();

  const [amount, setAmount] = useState<number>(() => {
    if (booking.depositPaid < booking.advanceRequired) {
      return booking.advanceRequired - booking.depositPaid;
    }
    return booking.balanceDue > 0 ? booking.balanceDue : 0;
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('NEFT / RTGS');
  const [referenceNumber, setReferenceNumber] = useState<string>(`REF-${Math.floor(10000000 + Math.random() * 90000000)}`);
  const [notes, setNotes] = useState<string>('Milestone installment received and reconciled with estate treasury account.');
  const [paymentType, setPaymentType] = useState<PaymentRecord['paymentType']>(
    booking.depositPaid === 0 ? 'advance_40' : booking.balanceDue - amount === 0 ? 'final_settlement' : 'milestone_installment'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    recordPayment(booking.id, {
      amount,
      paymentMethod,
      referenceNumber,
      notes,
      paymentType
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  const handleSendWhatsAppReceipt = () => {
    openCommunicationModal({
      recipientName: booking.clientName,
      recipientPhone: booking.phone,
      recipientEmail: booking.email,
      bookingId: booking.id,
      defaultTemplate: 'payment_reminder',
      customMessage: `Namaste ${booking.clientName},\n\nOfficial Payment Confirmation from The Arboretum @ ECR.\n\nWe have received and recorded your deposit of ₹${(amount / 100000).toFixed(2)} Lakhs via ${paymentMethod} (Ref: ${referenceNumber}).\n\n🏛️ Booking Reference: ${booking.bookingRef}\n💰 Total Outlay: ₹${(booking.totalAmount / 100000).toFixed(2)} Lakhs\n✅ Total Received to Date: ₹${((booking.depositPaid + amount) / 100000).toFixed(2)} Lakhs\n⏳ Balance Remaining: ₹${(Math.max(0, booking.balanceDue - amount) / 100000).toFixed(2)} Lakhs\n\nThank you for choosing The Arboretum for your milestone celebration.\n\nWarm regards,\nFinance Directorate | The Arboretum @ ECR`
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0C1929] text-[#C5A059] flex items-center justify-center shadow-md">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0C1929]">
                  Record Financial Payment
                </h3>
                <p className="text-xs text-stone-700">
                  {booking.bookingRef} · <span className="font-semibold text-[#0C1929]">{booking.clientName}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-600 hover:text-[#0C1929] hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
            {/* Financial Ledger Snapshot */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-700 block mb-0.5">Total Outlay</span>
                <span className="text-sm sm:text-base font-serif font-bold text-[#0C1929]">
                  ₹{(booking.totalAmount / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="border-x border-stone-200 px-2">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-0.5">Paid So Far</span>
                <span className="text-sm sm:text-base font-serif font-bold text-emerald-700">
                  ₹{(booking.depositPaid / 100000).toFixed(2)}L
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 block mb-0.5">Balance Due</span>
                <span className="text-sm sm:text-base font-serif font-bold text-amber-900">
                  ₹{(booking.balanceDue / 100000).toFixed(2)}L
                </span>
              </div>
            </div>

            {/* Quick Fill Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Quick Milestone Presets
              </label>
              <div className="flex flex-wrap gap-2">
                {booking.depositPaid < booking.advanceRequired && (
                  <button
                    type="button"
                    onClick={() => {
                      setAmount(booking.advanceRequired - booking.depositPaid);
                      setPaymentType('advance_40');
                    }}
                    className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:border-[#0C1929] text-xs font-bold text-[#0C1929] transition-all"
                  >
                    40% Advance: ₹{((booking.advanceRequired - booking.depositPaid) / 100000).toFixed(2)}L
                  </button>
                )}
                {booking.balanceDue > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setAmount(booking.balanceDue);
                      setPaymentType('final_settlement');
                    }}
                    className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:border-[#0C1929] text-xs font-bold text-[#0C1929] transition-all"
                  >
                    Full Balance: ₹{(booking.balanceDue / 100000).toFixed(2)}L
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setAmount(500000);
                    setPaymentType('milestone_installment');
                  }}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:border-[#0C1929] text-xs font-bold text-[#0C1929] transition-all"
                >
                  ₹5.00 Lakhs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAmount(250000);
                    setPaymentType('milestone_installment');
                  }}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:border-[#0C1929] text-xs font-bold text-[#0C1929] transition-all"
                >
                  ₹2.50 Lakhs
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Payment Amount Received (₹ INR) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 font-serif font-bold text-stone-600">₹</span>
                <input
                  type="number"
                  required
                  min={1}
                  max={booking.balanceDue > 0 ? booking.balanceDue : booking.totalAmount}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 text-base font-bold font-mono bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
                />
              </div>
              <span className="text-[11px] text-stone-600 mt-1 block">
                Amount in words: <span className="font-semibold text-stone-800">₹{(amount / 100000).toFixed(2)} Lakhs</span>
              </span>
            </div>

            {/* Payment Method & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Payment Method *
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
                >
                  <option value="NEFT / RTGS">NEFT / RTGS Bank Transfer</option>
                  <option value="UPI">UPI / Instant Transfer</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Bank Wire">Bank Wire / International SWIFT</option>
                  <option value="Cheque">Pay Order / Cheque</option>
                  <option value="Cash">Cash Deposit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Payment Milestone Category
                </label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
                >
                  <option value="advance_40">40% Statutory Advance</option>
                  <option value="milestone_installment">Milestone Stage Installment</option>
                  <option value="final_settlement">Final 100% Settlement</option>
                </select>
              </div>
            </div>

            {/* Reference Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Bank UTR / Transaction Reference Number *
              </label>
              <input
                type="text"
                required
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g. UTR / NEFT / Cheque No."
                className="w-full px-3.5 py-2.5 text-xs font-mono font-semibold bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              />
            </div>

            {/* Reconciliation Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Treasury &amp; Ledger Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-stone-800"
              />
            </div>

            {/* Success Toast */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-emerald-950 text-xs sm:text-sm font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Payment Successfully Recorded!</p>
                  <p className="text-emerald-900 font-light text-xs">
                    Ledger balance updated and tax entry logged.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSendWhatsAppReceipt}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Transmit Receipt via WhatsApp</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={amount <= 0 || !referenceNumber}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#0C1929] hover:bg-stone-900 text-white font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4 text-[#C5A059]" />
                  <span>Confirm &amp; Record Payment</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
