import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MessageSquare, 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  Phone,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunicationLog } from '../../types';
import confetti from 'canvas-confetti';

export const CommunicationModal: React.FC = () => {
  const { 
    isCommunicationModalOpen, 
    setIsCommunicationModalOpen, 
    activeCommunicationTarget,
    sendCommunication,
    userRole
  } = useApp();

  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [templateType, setTemplateType] = useState<CommunicationLog['templateType']>(
    activeCommunicationTarget?.defaultTemplate || 'visit_confirm'
  );
  const [recipient, setRecipient] = useState(activeCommunicationTarget?.recipientPhone || '');
  const [recipientName, setRecipientName] = useState(activeCommunicationTarget?.recipientName || '');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    if (activeCommunicationTarget) {
      setRecipientName(activeCommunicationTarget.recipientName || '');
      setRecipient(channel === 'whatsapp' ? activeCommunicationTarget.recipientPhone : activeCommunicationTarget.recipientEmail);
      if (activeCommunicationTarget.defaultTemplate) {
        setTemplateType(activeCommunicationTarget.defaultTemplate);
      }
    }
  }, [activeCommunicationTarget, channel]);

  // Generate dynamic message content based on template
  useEffect(() => {
    if (activeCommunicationTarget?.customMessage) {
      setMessage(activeCommunicationTarget.customMessage);
      return;
    }

    const name = recipientName || 'Esteemed Guest';

    switch (templateType) {
      case 'enquiry_ack':
        setMessage(
          `Namaste ${name},\n\nThank you for reaching out to The Arboretum @ ECR. We have received your celebration enquiry and our Celebrations Directorate has assigned a dedicated luxury consultant to your date.\n\nWe look forward to curating an extraordinary experience under our coastal botanical canopies.\n\nWarm regards,\nThe Arboretum Celebrations Team\nECR, Chennai`
        );
        break;

      case 'visit_confirm':
        setMessage(
          `Namaste ${name},\n\nYour private Sanctuary Walk-Through & Golden Hour Consultation at The Arboretum @ ECR is confirmed.\n\n📍 Venue: The Arboretum, 42/1B East Coast Road, Uthandi, Chennai\n⏰ Arrival: Sunset Golden Hour\n🌿 Assigned Host: Vikram Sundaram (Senior Venue Director)\n\nWe have reserved private villa parking for your arrival. Please present this Sanctuary Pass at the Grand Gate.\n\nWarm regards,\nThe Arboretum Directorate`
        );
        break;

      case 'quote_ready':
        setMessage(
          `Namaste ${name},\n\nYour bespoke celebration proposal for The Arboretum @ ECR is now ready for your review.\n\n📜 Quotation Reference: ARB/QT/2026/088\n✨ Exclusive Amenities: Banyan Grand Lawn & Climate-Controlled Glasshouse\n💳 Terms: 40% statutory advance locks the auspicious date permanently on the estate registry.\n\nPlease let us know when you would like to schedule a review call.\n\nWarm regards,\nPooja Iyer | Client Relations Lead`
        );
        break;

      case 'booking_confirm':
        setMessage(
          `Namaste ${name},\n\nCONGRATULATIONS! Your celebration at The Arboretum @ ECR is officially CONFIRMED and permanently locked in the estate master registry.\n\n🏛️ Booking Reference: ARB-2026-BK502\n📅 Date: Locked & Reserved\n👨‍💼 Assigned Banquet Manager: Vikram Sundaram\n\nOur full Event Operations and Executive Culinary team are now dedicated to crafting your unforgettable celebration.\n\nWith our highest compliments,\nThe Arboretum @ ECR`
        );
        break;

      case 'payment_reminder':
        setMessage(
          `Namaste ${name},\n\nOfficial Payment Confirmation from The Arboretum @ ECR.\n\nWe have successfully recorded your payment deposit. Your official GST tax receipt has been generated and appended to your estate booking file.\n\nThank you for your partnership in bringing this milestone celebration to life.\n\nWarm regards,\nFinance & Accounts | The Arboretum @ ECR`
        );
        break;

      default:
        setMessage(`Namaste ${name},\n\nGreetings from The Arboretum @ ECR. Please let us know if we can assist you with your upcoming celebration planning.`);
        break;
    }
  }, [templateType, recipientName, activeCommunicationTarget]);

  if (!isCommunicationModalOpen || !activeCommunicationTarget) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    sendCommunication(
      activeCommunicationTarget.leadId || activeCommunicationTarget.bookingId || 'direct',
      channel,
      templateType,
      recipient,
      recipientName,
      message
    );

    setSentSuccess(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0C1929', '#C5A059', '#10B981']
    });

    // If WhatsApp, also open WhatsApp Web / App link
    if (channel === 'whatsapp') {
      const cleanPhone = recipient.replace(/[^0-9]/g, '');
      const encodedText = encodeURIComponent(message);
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      setSentSuccess(false);
      setIsCommunicationModalOpen(false);
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0C1929] text-[#C5A059] flex items-center justify-center shadow-md">
                {channel === 'whatsapp' ? <MessageSquare className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0C1929]">
                  Disclose &amp; Transmit Communication
                </h3>
                <p className="text-xs text-stone-700">
                  Recipient: <span className="font-semibold text-[#0C1929]">{recipientName}</span> ({recipient})
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCommunicationModalOpen(false)}
              className="p-2 rounded-full text-stone-600 hover:text-[#0C1929] hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Channel Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setChannel('whatsapp');
                  setRecipient(activeCommunicationTarget.recipientPhone);
                }}
                className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  channel === 'whatsapp'
                    ? 'bg-[#0C1929] text-white shadow-xs'
                    : 'text-stone-700 hover:text-[#0C1929]'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                WhatsApp Direct Transmission
              </button>
              <button
                type="button"
                onClick={() => {
                  setChannel('email');
                  setRecipient(activeCommunicationTarget.recipientEmail || 'guest@example.com');
                }}
                className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  channel === 'email'
                    ? 'bg-[#0C1929] text-white shadow-xs'
                    : 'text-stone-700 hover:text-[#0C1929]'
                }`}
              >
                <Mail className="w-4 h-4 text-[#C5A059]" />
                Official Email Dispatch
              </button>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Executive Template Library
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'visit_confirm', label: 'Sanctuary Pass / Visit' },
                  { id: 'quote_ready', label: 'Proposal Ready (Quote)' },
                  { id: 'booking_confirm', label: 'Booking Confirmation' },
                  { id: 'enquiry_ack', label: 'Enquiry Acknowledgement' },
                  { id: 'payment_reminder', label: 'Payment Receipt / Milestone' },
                  { id: 'custom', label: 'Custom Luxury Note' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplateType(t.id as any)}
                    className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all ${
                      templateType === t.id
                        ? 'border-[#0C1929] bg-stone-900 text-white font-bold shadow-xs'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Target */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {channel === 'whatsapp' ? 'Recipient WhatsApp Phone' : 'Recipient Email Address'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden font-mono text-[#0C1929]"
                />
                <div className="absolute right-3 top-2.5 text-xs text-stone-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Contact
                </div>
              </div>
            </div>

            {/* Editable Message Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Message Content (Editable)
                </label>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-bold text-[#9A7732] hover:text-[#0C1929] flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Message'}
                </button>
              </div>
              <textarea
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 text-xs sm:text-sm bg-[#FAF8F5] border border-stone-300 rounded-2xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-stone-800 font-sans leading-relaxed resize-none"
              />
            </div>

            {/* Success Toast Banner */}
            {sentSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-emerald-950 text-xs sm:text-sm font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Transmission Successfully Dispatched &amp; Logged!</p>
                  <p className="text-emerald-900 font-light text-xs">
                    Message logged to CRM timeline. WhatsApp direct bridge initialized.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-stone-200 bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Dispatched under authority: {userRole.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsCommunicationModalOpen(false)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!recipient || !message}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#0C1929] hover:bg-stone-900 text-white font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {channel === 'whatsapp' ? (
                  <>
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Send via WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C5A059]" />
                    <span>Send Official Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
