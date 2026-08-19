import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  Share2,
  Calendar,
  CreditCard,
  Building2,
  Sparkles
} from 'lucide-react';
import { Booking, PaymentRecord } from '../../types';
import { useApp } from '../../context/AppContext';

export const ReceiptModal: React.FC<{
  booking: Booking;
  paymentRecord?: PaymentRecord | null;
  isFinalSettlement?: boolean;
  onClose: () => void;
}> = ({ booking, paymentRecord, isFinalSettlement = false, onClose }) => {
  const { openCommunicationModal } = useApp();

  const receiptNumber = paymentRecord 
    ? `REC-${paymentRecord.id.replace('pay-', '').slice(-6).toUpperCase()}`
    : `FIN-CLR-${booking.bookingRef}`;

  const receiptDate = paymentRecord?.date || new Date().toISOString().split('T')[0];
  const amountPaid = paymentRecord ? paymentRecord.amount : booking.totalAmount;
  const paymentMethod = paymentRecord ? paymentRecord.paymentMethod : 'Consolidated Ledger Clearances';
  const transactionRef = paymentRecord ? paymentRecord.referenceNumber : `CLR-${booking.bookingRef}`;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsAppReceipt = () => {
    const msg = isFinalSettlement
      ? `Namaste ${booking.clientName},\n\nThis is the official confirmation that your celebration (${booking.eventTitle} on ${booking.eventDate}) at The Arboretum @ ECR is now 100% FINANCIALLY CLOSED & SETTLED.\n\n📜 Clearance Ref: ${receiptNumber}\n🏛 Booking Ref: ${booking.bookingRef}\n💰 Total Contract Value: ₹${(booking.totalAmount / 100000).toFixed(2)} Lakhs (Fully Settled)\n💳 Balance Due: ₹0.00 (NIL)\n\nThank you for choosing The Arboretum @ ECR. Our directorate looks forward to orchestrating an unforgettable celebration.\n\nWarm regards,\nVikram Sundaram | Senior Venue Director`
      : `Namaste ${booking.clientName},\n\nWe have received your payment for ${booking.eventTitle}.\n\n📜 Receipt Ref: ${receiptNumber}\n💰 Amount Received: ₹${(amountPaid / 100000).toFixed(2)} Lakhs\n💳 Method: ${paymentMethod} (Ref: ${transactionRef})\n📊 Outstanding Balance: ₹${(booking.balanceDue / 100000).toFixed(2)} Lakhs\n\nWarm regards,\nThe Arboretum @ ECR Celebrations Directorate`;

    openCommunicationModal({
      recipientName: booking.clientName,
      recipientPhone: booking.phone,
      recipientEmail: booking.email,
      bookingId: booking.id,
      defaultTemplate: 'payment_reminder',
      customMessage: msg
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white text-[#0C1929] rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden my-6 print:shadow-none print:border-none print:rounded-none print:max-w-full"
      >
        {/* Header Bar */}
        <div className="bg-[#0C1929] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#C5A059]/30 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-[#C5A059] flex items-center justify-center font-serif text-[#C5A059] font-bold text-lg">
              A
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                {isFinalSettlement ? 'Final Settlement & Clearance Certificate' : 'Official Tax Receipt'}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-bold">
                {receiptNumber}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#FAF8F5] text-[#0C1929] print:bg-white print:p-8">
          
          {/* Top Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-stone-200">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A7732] font-bold block">
                East Coast Road · Chennai Sanctuary
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#0C1929] tracking-wide">
                THE ARBORETUM @ ECR
              </h2>
              <p className="text-xs text-stone-600 font-light mt-0.5">
                Luxury Botanical Estate &amp; Banqueting Directorate<br />
                Muttukadu, East Coast Road, Chennai, Tamil Nadu 603112<br />
                <span className="font-mono text-[11px]">GSTIN: 33AAACT9821L1Z4 · ARN: AA330826019284</span>
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isFinalSettlement 
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                  : 'bg-blue-100 text-blue-900 border border-blue-300'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                <span>{isFinalSettlement ? '100% Financially Closed' : 'Verified Receipt'}</span>
              </span>
              <div className="font-mono text-xs text-stone-700">
                <span>Date: </span>
                <strong className="text-[#0C1929]">{receiptDate}</strong>
              </div>
              <div className="font-mono text-xs text-stone-700">
                <span>Booking Ref: </span>
                <strong className="text-[#0C1929]">{booking.bookingRef}</strong>
              </div>
            </div>
          </div>

          {/* Client & Event Details Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-stone-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Issued In Favor Of:
              </span>
              <h4 className="font-bold text-sm text-[#0C1929]">
                {booking.clientName}
                {booking.partnerName && <span className="font-serif italic text-stone-600 font-normal"> &amp; {booking.partnerName}</span>}
              </h4>
              <p className="text-stone-700 font-mono text-[11px] mt-0.5">
                Phone: {booking.phone}<br />
                Email: {booking.email}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-stone-600 block mb-1">
                Celebration Details:
              </span>
              <span className="font-bold text-[#0C1929] block">
                {booking.eventTitle}
              </span>
              <p className="text-stone-700 text-[11px] mt-0.5">
                Date: <strong>{booking.eventDate}</strong> ({booking.timingSlot || 'Full Day'})<br />
                Scale: {booking.guestCount} Guests · {booking.packageTier} Collection
              </p>
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden text-xs">
            <div className="p-3 bg-stone-100 font-bold uppercase tracking-wider text-[10px] text-stone-700 grid grid-cols-12">
              <span className="col-span-8">Description / Transaction Item</span>
              <span className="col-span-4 text-right">Amount (INR)</span>
            </div>

            <div className="p-4 space-y-3 divide-y divide-stone-100">
              <div className="grid grid-cols-12 pt-1 font-medium">
                <div className="col-span-8">
                  <span className="font-bold text-[#0C1929] block">
                    {paymentRecord ? paymentRecord.notes : 'Consolidated Celebration Contract Outlay'}
                  </span>
                  <span className="text-[11px] text-stone-600 block">
                    Payment Type: {paymentRecord?.paymentType?.replace('_', ' ').toUpperCase() || 'FULL CLEARANCE'}
                  </span>
                </div>
                <div className="col-span-4 text-right font-mono font-bold text-sm text-[#0C1929]">
                  ₹{amountPaid.toLocaleString()}
                </div>
              </div>

              <div className="pt-3 grid grid-cols-12 text-[11px] text-stone-600">
                <div className="col-span-8">
                  Payment Instrument: <strong className="text-stone-900">{paymentMethod}</strong><br />
                  UTR / Reference: <span className="font-mono text-stone-900">{transactionRef}</span>
                </div>
                <div className="col-span-4 text-right font-mono">
                  Statutory 18% GST Included
                </div>
              </div>
            </div>

            {/* Ledger Totals Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-700">
                <span>Total Contract Value (incl. GST):</span>
                <span className="font-mono font-bold">₹{booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Total Advance &amp; Payments Received:</span>
                <span className="font-mono font-bold text-emerald-800">
                  ₹{(isFinalSettlement ? booking.totalAmount : booking.depositPaid).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-serif text-sm font-bold text-[#0C1929] pt-2 border-t border-stone-200">
                <span>Remaining Balance Due:</span>
                <span className="font-sans font-bold">
                  ₹{(isFinalSettlement ? 0 : booking.balanceDue).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Legal / Estate Seal & Sign-Off Section */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1 text-stone-600 text-[11px] max-w-sm">
              <span className="font-bold text-stone-800 block">Sanctuary Audit &amp; Guarantee</span>
              <p>
                This document serves as an official computer-generated tax receipt from The Arboretum @ ECR. 
                {isFinalSettlement && ' All contractual financial obligations for this celebration are fully settled and certified complete.'}
              </p>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="w-32 h-10 border border-stone-300 rounded-lg mx-auto sm:ml-auto flex items-center justify-center bg-stone-50 text-[10px] text-stone-500 uppercase font-mono tracking-widest">
                [ ESTATE SEAL ]
              </div>
              <div className="font-serif italic text-sm text-[#0C1929] font-bold">
                Vikram Sundaram
              </div>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                Senior Director of Celebrations
              </span>
            </div>
          </div>

        </div>

        {/* Action Footer in Modal */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            onClick={handleSendWhatsAppReceipt}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Receipt via WhatsApp</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#0C1929] hover:bg-stone-900 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              Close
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
