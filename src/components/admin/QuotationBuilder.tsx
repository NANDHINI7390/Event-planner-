import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Printer, 
  Send, 
  Plus, 
  Trash2,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Quotation, QuotationItem } from '../../types';

export const QuotationBuilder: React.FC = () => {
  const { 
    leads, 
    selectedLeadForQuotation, 
    addQuotation, 
    updateLeadStatus,
    acceptQuotationAndConfirmBooking,
    openCommunicationModal,
    setAdminTab
  } = useApp();

  // Selected Lead or custom client
  const [selectedLeadId, setSelectedLeadId] = useState<string>(
    selectedLeadForQuotation?.id || (leads[0]?.id || '')
  );

  const activeLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  // Quotation Config State
  const [clientName, setClientName] = useState(activeLead?.clientName || 'Dr. Siddharth Rao & Ananya Krishnan');
  const [clientEmail, setClientEmail] = useState(activeLead?.email || 'siddharth.ananya@example.com');
  const [clientPhone, setClientPhone] = useState(activeLead?.phone || '+91 98401 23456');
  const [eventDate, setEventDate] = useState(activeLead?.eventDate || '2026-11-20');
  const [guestCount, setGuestCount] = useState(activeLead?.guestCount || 450);
  const [packageTier, setPackageTier] = useState<'essential' | 'signature' | 'grand'>(
    (activeLead?.packageInterest as any) || 'signature'
  );

  // Line items state
  const [items, setItems] = useState<QuotationItem[]>([
    { name: 'Exclusive Venue Access: The Banyan Grand Lawn & Glasshouse', category: 'venue', unitPrice: 550000, quantity: 1, total: 550000 },
    { name: 'Royal Heritage Banqueting (Grand Multi-Course Banquet & Live Counters)', category: 'catering', unitPrice: 3200, quantity: 450, total: 1440000 },
    { name: 'Botanical Scenography, Fresh Floral Mandap & Ambient Tree Fairy Lights', category: 'decor', unitPrice: 380000, quantity: 1, total: 380000 },
    { name: 'Intelligent Concert Lighting, L-Acoustics Sound & Rigging', category: 'production', unitPrice: 150000, quantity: 1, total: 150000 },
    { name: 'Bridal Villa Suite & Groom Pavilion Full Day Day-Use Hospitality', category: 'hospitality', unitPrice: 65000, quantity: 1, total: 65000 },
    { name: 'Valet Logistics, Security Marshals & Silent DG Power Backup', category: 'custom', unitPrice: 75000, quantity: 1, total: 75000 },
  ]);

  const [discountAmount, setDiscountAmount] = useState<number>(50000);
  const taxRate = 0.18; // 18% GST

  // Recalculate based on active lead changes
  useEffect(() => {
    if (activeLead) {
      setClientName(activeLead.partnerName ? `${activeLead.clientName} & ${activeLead.partnerName}` : activeLead.clientName);
      setClientEmail(activeLead.email);
      setClientPhone(activeLead.phone);
      setEventDate(activeLead.eventDate);
      setGuestCount(activeLead.guestCount);
      if (activeLead.packageInterest && activeLead.packageInterest !== 'bespoke') {
        setPackageTier(activeLead.packageInterest);
      }
    }
  }, [activeLead]);

  // Recalculate Catering Line when guest count or tier changes
  const handlePackageChange = (tier: 'essential' | 'signature' | 'grand') => {
    setPackageTier(tier);
    const rate = tier === 'grand' ? 4500 : tier === 'signature' ? 3200 : 2200;
    const baseVenue = tier === 'grand' ? 750000 : tier === 'signature' ? 550000 : 400000;

    setItems(prev => prev.map(item => {
      if (item.category === 'catering') {
        return { ...item, unitPrice: rate, quantity: guestCount, total: rate * guestCount };
      }
      if (item.category === 'venue') {
        return { ...item, unitPrice: baseVenue, total: baseVenue };
      }
      return item;
    }));
  };

  const handleGuestCountChange = (count: number) => {
    setGuestCount(count);
    const rate = packageTier === 'grand' ? 4500 : packageTier === 'signature' ? 3200 : 2200;
    setItems(prev => prev.map(item => {
      if (item.category === 'catering') {
        return { ...item, quantity: count, total: rate * count };
      }
      return item;
    }));
  };

  // Custom Item Addition
  const handleAddItem = () => {
    const newItem: QuotationItem = {
      name: 'Custom Service / Production Add-on',
      category: 'custom',
      unitPrice: 50000,
      quantity: 1,
      total: 50000
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index: number, field: keyof QuotationItem, val: any) => {
    setItems(items.map((item, idx) => {
      if (idx === index) {
        const updated = { ...item, [field]: val };
        if (field === 'unitPrice' || field === 'quantity') {
          updated.total = updated.unitPrice * updated.quantity;
        }
        return updated;
      }
      return item;
    }));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * taxRate);
  const grandTotal = taxableAmount + taxAmount;

  // Actions
  const handleSendQuote = () => {
    const newQuote: Quotation = {
      id: `quote-${Date.now()}`,
      quotationNumber: `ARB-Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      leadId: activeLead?.id || 'lead-custom',
      clientName,
      email: clientEmail,
      phone: clientPhone,
      eventType: activeLead?.eventType || 'wedding',
      eventDate,
      spaces: ['The Banyan Grand Lawn', 'The Glasshouse Conservatory'],
      packageTier,
      guestCount,
      items,
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount: grandTotal,
      advanceDeposit: Math.round(grandTotal * 0.4),
      status: 'sent',
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      preparedBy: 'Vikram Sundaram (Senior Venue Director)',
      specialTerms: 'Includes dedicated senior banquet marshal and tasting session for 6 guests.'
    };

    addQuotation(newQuote);
    if (activeLead) {
      updateLeadStatus(activeLead.id, 'quotation_sent');
    }

    openCommunicationModal({
      recipientName: clientName,
      recipientPhone: clientPhone,
      recipientEmail: clientEmail,
      leadId: activeLead?.id,
      defaultTemplate: 'quote_ready',
      customMessage: `Namaste ${clientName},\n\nYour bespoke celebration proposal for The Arboretum @ ECR is now ready.\n\n📜 Quotation Ref: ${newQuote.quotationNumber}\n📅 Date: ${eventDate}\n👥 Scale: ${guestCount} Guests · ${packageTier.toUpperCase()} Collection\n💰 Total Outlay: ₹${(grandTotal / 100000).toFixed(2)} Lakhs (incl. 18% GST)\n💳 40% Advance Required: ₹${(Math.round(grandTotal * 0.4) / 100000).toFixed(2)} Lakhs\n\nPlease let us know if you would like to proceed with the auspicious reservation.\n\nWarm regards,\nVikram Sundaram | Senior Venue Director`
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#0C1929', '#FAF8F5']
    });
  };

  const handleConvertToBooking = () => {
    const newQuote: Quotation = {
      id: `quote-${Date.now()}`,
      quotationNumber: `ARB-Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      leadId: activeLead?.id || 'lead-custom',
      clientName,
      email: clientEmail,
      phone: clientPhone,
      eventType: activeLead?.eventType || 'wedding',
      eventDate,
      spaces: ['The Banyan Grand Lawn', 'The Glasshouse Conservatory'],
      packageTier,
      guestCount,
      items,
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount: grandTotal,
      advanceDeposit: Math.round(grandTotal * 0.4),
      status: 'accepted',
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      preparedBy: 'Vikram Sundaram (Senior Venue Director)',
      specialTerms: 'Includes dedicated senior banquet marshal and tasting session for 6 guests.'
    };

    addQuotation(newQuote);
    acceptQuotationAndConfirmBooking(newQuote.id);
    setAdminTab('bookings');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7732] font-bold block mb-1">
            Artisanal Quotation Engine
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#0C1929] font-bold">
            Bespoke Event Proposal Builder
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-light">
            Live auto-calculating luxury document preview formatted with venue letterhead.
          </p>
        </div>

        {/* Lead Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            Target Lead:
          </label>
          <select
            value={selectedLeadId}
            onChange={(e) => setSelectedLeadId(e.target.value)}
            className="px-4 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-[#0C1929] focus:border-[#0C1929] focus:outline-none"
          >
            {leads.map(l => (
              <option key={l.id} value={l.id}>
                {l.clientName} ({l.eventType} · {l.eventDate})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 2-Column Split: Form Inputs & Elegant Letterhead Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 5 Cols: Configurator Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tier & Guest Count Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
            <h4 className="font-serif text-lg text-[#0C1929] font-bold border-b border-stone-100 pb-3">
              1. Package Tier &amp; Scale
            </h4>

            {/* Package selector pills */}
            <div className="grid grid-cols-3 gap-2">
              {(['essential', 'signature', 'grand'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => handlePackageChange(tier)}
                  className={`py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    packageTier === tier
                      ? 'bg-[#0C1929] text-[#E6CA85] border-[#C5A059] shadow-md'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span className="block">{tier}</span>
                  <span className="text-[10px] opacity-75 lowercase font-mono">
                    ₹{tier === 'grand' ? '4500' : tier === 'signature' ? '3200' : '2200'}/p
                  </span>
                </button>
              ))}
            </div>

            {/* Guest Count Slider */}
            <div>
              <div className="flex justify-between text-xs text-stone-700 font-semibold mb-2">
                <span className="uppercase tracking-wider">Guest Count</span>
                <span className="text-[#9A7732] font-bold text-sm">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="25"
                value={guestCount}
                onChange={(e) => handleGuestCountChange(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-stone-200 rounded-lg accent-[#0C1929] cursor-pointer"
              />
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 font-bold mb-1">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-serif focus:border-[#0C1929] focus:outline-none"
              />
            </div>
          </div>

          {/* Line Items Editor */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h4 className="font-serif text-lg text-[#0C1929] font-bold">
                2. Itemized Ledger Lines
              </h4>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-[#9A7732] font-bold hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                      className="w-full font-medium bg-transparent border-b border-transparent hover:border-stone-300 focus:border-[#0C1929] focus:outline-none text-[#0C1929]"
                    />
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[9px] text-stone-500 block uppercase">Unit Price</span>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 rounded-lg bg-white border border-stone-300 font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-500 block uppercase">Qty</span>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 rounded-lg bg-white border border-stone-300 font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-500 block uppercase">Line Total</span>
                      <span className="font-semibold text-stone-800 font-mono block pt-1">
                        ₹{(item.total / 100000).toFixed(2)}L
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Adjustment */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-stone-700 font-semibold">
                Courtesy Gold Privilege Discount (₹):
              </label>
              <input
                type="number"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                className="w-32 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-right"
              />
            </div>
          </div>

        </div>

        {/* Right 7 Cols: Signature Luxury Letterhead Preview */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Printable Letterhead Document Box */}
          <div className="bg-[#FAF8F5] text-[#0C1929] p-8 sm:p-10 rounded-3xl border border-stone-300 shadow-2xl space-y-8 relative overflow-hidden print:p-0 print:border-none print:shadow-none">
            
            {/* Top Letterhead Header */}
            <div className="flex items-start justify-between border-b-2 border-[#0C1929] pb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-[#0C1929] text-[#E6CA85] flex items-center justify-center font-serif font-bold text-xs">
                    A
                  </div>
                  <span className="font-serif text-2xl tracking-[0.2em] uppercase font-bold text-[#0C1929]">
                    The Arboretum
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#9A7732] font-mono block font-semibold">
                  East Coast Road · Pondicherry Sanctuary
                </span>
                <span className="text-[10px] text-stone-500 block mt-1">
                  GSTIN: 33AAACT1423B1Z8 · celebrations@thearboretum-ecr.com
                </span>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-[#0C1929] text-[#E6CA85] text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
                  Official Proposal
                </span>
                <span className="text-xs font-mono text-stone-500 block">
                  REF: ARB-Q-2026-8841
                </span>
                <span className="text-xs text-stone-500 block">
                  Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Recipient Details & Event Overview */}
            <div className="grid grid-cols-2 gap-6 text-xs border-b border-stone-200 pb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#9A7732] font-bold block mb-1">
                  Prepared Exclusively For:
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0C1929]">
                  {clientName}
                </h4>
                <p className="text-stone-700 font-light mt-0.5">{clientEmail}</p>
                <p className="text-stone-700 font-light">{clientPhone}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-[#9A7732] font-bold block mb-1">
                  Event Parameters:
                </span>
                <span className="font-serif text-base font-semibold text-[#0C1929] block">
                  {eventDate} (Prime Auspicious Slot)
                </span>
                <span className="text-stone-700 block">{guestCount} Valued Guests</span>
                <span className="text-stone-700 uppercase tracking-wider font-semibold text-[10px]">
                  Collection: {packageTier.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-300 text-stone-700 uppercase tracking-wider text-[10px]">
                    <th className="pb-2 font-bold">Experience Element</th>
                    <th className="pb-2 font-bold text-center">Category</th>
                    <th className="pb-2 font-bold text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {items.map((item, idx) => (
                    <tr key={idx} className="py-2.5">
                      <td className="py-2.5 font-medium text-stone-900">
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-stone-500 font-mono block">
                            (₹{item.unitPrice.toLocaleString()} × {item.quantity} pax)
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-center text-stone-500 text-[10px] uppercase">
                        {item.category}
                      </td>
                      <td className="py-2.5 text-right font-mono font-semibold text-stone-900">
                        ₹{item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations Summary Ledger */}
            <div className="pt-4 border-t-2 border-[#0C1929] flex justify-end">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-stone-700">
                  <span>Subtotal Outlay:</span>
                  <span className="font-mono">₹{subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Privilege Courtesy:</span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-700">
                  <span>GST (18% Statutory):</span>
                  <span className="font-mono">₹{taxAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between font-serif text-lg font-bold text-[#0C1929] pt-2 border-t border-stone-300">
                  <span>Grand Investment:</span>
                  <span className="font-sans font-bold text-[#0C1929]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer Terms & Sign-off */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-600">
              <div className="space-y-1">
                <span className="font-bold block text-stone-800">Terms &amp; Reservation Guarantee</span>
                <span>• 40% Advance secures auspicious date on estate registry.</span>
                <span className="block">• Proposal valid for 14 calendar days.</span>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-sm text-[#0C1929] font-bold">Vikram Sundaram</div>
                <span className="text-[9px] uppercase tracking-wider block">Senior Venue Director</span>
              </div>
            </div>

          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-full border border-stone-300 hover:border-stone-500 text-stone-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print / PDF</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSendQuote}
                className="px-5 py-2.5 rounded-full bg-[#0C1929] hover:bg-[#14283F] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#E6CA85]" />
                <span>Send to Client</span>
              </button>

              <button
                onClick={handleConvertToBooking}
                className="px-5 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0C1929] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Accept &amp; Book Event</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
