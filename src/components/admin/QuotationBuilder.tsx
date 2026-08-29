import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Send, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Building,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Quotation, QuotationItem, EventCategory } from '../../types';
import { PACKAGES } from '../../data/venueData';

type SelectedTier = 'essential' | 'signature' | 'grand';

export const QuotationBuilder: React.FC = () => {
  const { leads, quotations, addQuotation, updateLeadStatus, updateQuotation, confirmBookingFromQuote } = useApp();

  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<SelectedTier>('signature');
  const [guestCount, setGuestCount] = useState<number>(450);
  const [discountPercent, setDiscountPercent] = useState<number>(5);
  const [notes, setNotes] = useState<string>('Includes dedicated bridal concierge, valet parking management for 120 cars, and unmetered 250kVA silent backup generator.');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [activeQuotation, setActiveQuotation] = useState<Quotation | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Line items state
  const [items, setItems] = useState<QuotationItem[]>([
    {
      category: 'venue',
      name: 'The Banyan Grand Lawn & Glasshouse Buyout',
      description: 'Exclusive 24-hour estate access, bridal suites & amphitheater',
      unitPrice: 1200000,
      quantity: 1,
      total: 1200000
    },
    {
      category: 'catering',
      name: 'Haute Coastal & Royal Indian Banqueting (Signature Tier)',
      description: '4 live interactive counters, 12 starters, royal main course & desserts',
      unitPrice: 3200,
      quantity: 450,
      total: 1440000
    },
    {
      category: 'decor',
      name: 'Bespoke Botanical Scenography & Fairy Lit Canopies',
      description: 'Imported floral mandap, entrance archway, ambient mood lighting',
      unitPrice: 450000,
      quantity: 1,
      total: 450000
    },
    {
      category: 'production',
      name: 'Concert Grade Acoustic & Intelligent Moving-Head Lighting',
      description: 'Digital audio console, wireless microphones, architectural spot washes',
      unitPrice: 180000,
      quantity: 1,
      total: 180000
    }
  ]);

  // Sync with selected lead
  useEffect(() => {
    if (leads.length > 0 && !selectedLeadId) {
      setSelectedLeadId(leads[0].id);
    }
  }, [leads, selectedLeadId]);

  const currentLead = leads.find(l => l.id === selectedLeadId);

  useEffect(() => {
    if (currentLead) {
      setGuestCount(currentLead.guestCount || 450);
      if (currentLead.packageInterest && (currentLead.packageInterest === 'essential' || currentLead.packageInterest === 'signature' || currentLead.packageInterest === 'grand')) {
        setSelectedTier(currentLead.packageInterest);
      }
    }
  }, [currentLead]);

  // Recalculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + gstAmount;

  // Handle tier change
  const handleTierChange = (tier: SelectedTier) => {
    setSelectedTier(tier);
    const tierConfig = PACKAGES.find(p => p.id === tier);
    const rate = tierConfig ? tierConfig.pricePerPlate : 3200;
    const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);

    setItems(prev => prev.map(item => {
      if (item.category === 'catering') {
        const newTotal = rate * guestCount;
        return {
          ...item,
          name: `Haute Coastal & Royal Indian Banqueting (${tierName} Tier)`,
          unitPrice: rate,
          quantity: guestCount,
          total: newTotal
        };
      }
      return item;
    }));
  };

  // Handle guest count change
  const handleGuestCountChange = (count: number) => {
    setGuestCount(count);
    const tierConfig = PACKAGES.find(p => p.id === selectedTier);
    const rate = tierConfig ? tierConfig.pricePerPlate : 3200;

    setItems(prev => prev.map(item => {
      if (item.category === 'catering') {
        return {
          ...item,
          quantity: count,
          total: rate * count
        };
      }
      return item;
    }));
  };

  // Add line item
  const handleAddItem = () => {
    const newItem: QuotationItem = {
      category: 'custom',
      name: 'Custom Service / Additional Decor Enhancement',
      description: 'Bespoke client specification',
      unitPrice: 50000,
      quantity: 1,
      total: 50000
    };
    setItems([...items, newItem]);
  };

  // Remove line item
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  // Update item field
  const handleUpdateItem = (index: number, field: keyof QuotationItem, value: any) => {
    setItems(items.map((item, idx) => {
      if (idx === index) {
        const updated = { ...item, [field]: value };
        if (field === 'unitPrice' || field === 'quantity') {
          updated.total = (Number(updated.unitPrice) || 0) * (Number(updated.quantity) || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  // Save Quotation
  const handleSaveQuotation = () => {
    if (!currentLead) return;

    const newQuote: Quotation = {
      id: `Q-${Date.now().toString().slice(-4)}`,
      quotationNumber: `ARB-QT-2026-${Date.now().toString().slice(-4)}`,
      leadId: currentLead.id,
      clientName: currentLead.clientName,
      partnerName: currentLead.partnerName,
      email: currentLead.email,
      phone: currentLead.phone,
      eventType: currentLead.eventType,
      eventDate: currentLead.eventDate,
      spaces: currentLead.preferredSpaces || ['The Banyan Grand Lawn', 'The Emerald Glasshouse'],
      packageTier: selectedTier,
      guestCount: guestCount,
      items: items,
      subtotal: subtotal,
      discountAmount: discountAmount,
      taxAmount: gstAmount,
      totalAmount: grandTotal,
      advanceDeposit: Math.round(grandTotal * 0.4),
      status: 'sent',
      createdAt: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      preparedBy: 'Vikram Sundaram (Senior Director)',
      specialTerms: notes
    };

    addQuotation(newQuote);
    setActiveQuotation(newQuote);
    updateLeadStatus(currentLead.id, 'quotation_sent');
    setIsGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7732] font-bold">
              Artisanal Quotation Engine
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-3xl text-[#0C1929] font-bold">
            Bespoke Event Proposal Builder
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-light mt-0.5">
            Auto-calculating luxury document preview formatted with venue letterhead &amp; GST compliance.
          </p>
        </div>

        {/* Lead Selector Pill */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#FAF8F5] p-2 sm:p-3 rounded-2xl border border-stone-200">
          <label className="text-[11px] font-mono text-stone-500 uppercase tracking-wider pl-1">
            Target Lead:
          </label>
          <select
            value={selectedLeadId}
            onChange={(e) => setSelectedLeadId(e.target.value)}
            className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0C1929] focus:outline-hidden cursor-pointer shadow-xs truncate max-w-full sm:max-w-xs"
          >
            {leads.map(lead => (
              <option key={lead.id} value={lead.id}>
                {lead.clientName} ({lead.eventType} · {lead.eventDate})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column: Line Items & Builder Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Package Tier & Scale */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg sm:text-xl text-[#0C1929] font-bold border-b border-stone-100 pb-3 flex items-center justify-between">
              <span>1. Package Tier &amp; Scale</span>
              <span className="text-xs font-mono font-normal text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                Step 1 of 3
              </span>
            </h3>

            {/* 3 Tier Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(['essential', 'signature', 'grand'] as SelectedTier[]).map((tier) => {
                const isSelected = selectedTier === tier;
                const price = tier === 'essential' ? 2200 : tier === 'signature' ? 3200 : 4500;
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => handleTierChange(tier)}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#0C1929] text-[#FAF8F5] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold block truncate">
                      {tier}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-mono mt-0.5 block ${isSelected ? 'text-[#E6CA85]' : 'text-stone-500'}`}>
                      ₹{price}/p
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Guest Count Slider */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                <span className="text-stone-700 uppercase tracking-wider font-bold">Guest Count</span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#0C1929]">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="25"
                value={guestCount}
                onChange={(e) => handleGuestCountChange(Number(e.target.value))}
                className="w-full accent-[#0C1929] cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                <span>100 Intimate</span>
                <span>500 Grand</span>
                <span>1,500+ Mega Gala</span>
              </div>
            </div>
          </div>

          {/* Step 2: Line Itemized Inclusions */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-[#0C1929] font-bold">
                  2. Line-Item Customization
                </h3>
                <p className="text-stone-500 text-xs">Edit unit rates, quantities, or add custom event elements</p>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0C1929] hover:bg-stone-900 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Items Stack */}
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={`item-${idx}`}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200 space-y-2 hover:border-[#C5A059]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                      className="font-medium text-xs sm:text-sm text-[#0C1929] bg-transparent border-b border-transparent hover:border-stone-300 focus:border-[#C5A059] focus:outline-hidden w-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                    placeholder="Short description..."
                    className="text-[11px] text-stone-500 bg-transparent border-b border-transparent hover:border-stone-300 focus:border-[#C5A059] focus:outline-hidden w-full"
                  />

                  {/* Quantity x Unit Rate = Total */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200 text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-stone-500 font-mono">Qty:</span>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(idx, 'quantity', Number(e.target.value))}
                          className="w-16 sm:w-20 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-mono font-semibold"
                        />
                      </div>
                      <span className="text-stone-400">×</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-stone-500 font-mono">Rate:</span>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateItem(idx, 'unitPrice', Number(e.target.value))}
                          className="w-20 sm:w-24 bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-mono font-semibold"
                        />
                      </div>
                    </div>

                    <div className="font-mono font-bold text-xs sm:text-sm text-[#0C1929]">
                      ₹{item.total.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discount & Special Terms */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-700 font-bold uppercase tracking-wider">
                  Special Privilege Discount:
                </span>
                <select
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="bg-white border border-stone-300 rounded-xl px-3 py-1 text-xs font-bold text-emerald-800"
                >
                  <option value={0}>0% (Standard Tariff)</option>
                  <option value={5}>5% (ECR Resident / Weekday)</option>
                  <option value={10}>10% (Directorate Special)</option>
                  <option value={15}>15% (Full Advance Settlement)</option>
                </select>
              </div>

              <span className="text-xs font-mono text-emerald-700 font-semibold text-right">
                - ₹{discountAmount.toLocaleString('en-IN')} Saved
              </span>
            </div>

          </div>

          {/* Step 3: Terms & Executive Notes */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="font-serif text-lg sm:text-xl text-[#0C1929] font-bold">
              3. Special Directorate Inclusions &amp; Notes
            </h3>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-3 text-xs text-stone-800 focus:outline-hidden focus:border-[#C5A059]"
            />
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleSaveQuotation}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-[#0C1929] hover:bg-stone-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <FileText className="w-4 h-4 text-[#C5A059]" />
              <span>Generate Official Quotation</span>
            </button>

            {isGenerated && (
              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl border border-[#0C1929] hover:bg-stone-100 text-[#0C1929] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Printer className="w-4 h-4 text-[#9A7732]" />
                <span>Print / PDF</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Live Luxury Document Letterhead Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] border border-[#C5A059]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-5 text-[#0C1929] relative overflow-hidden">
            
            {/* Watermark Crest */}
            <div className="absolute right-[-20px] top-[-20px] text-stone-200/40 font-serif text-9xl font-bold select-none pointer-events-none">
              A
            </div>

            {/* Letterhead Top */}
            <div className="border-b border-[#0C1929]/15 pb-4 flex justify-between items-start">
              <div>
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider uppercase block text-[#0C1929]">
                  THE ARBORETUM @ ECR
                </span>
                <span className="text-[9px] text-stone-600 block uppercase tracking-widest font-mono">
                  Luxury Wedding &amp; Events Sanctuary · Pondicherry
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono uppercase bg-[#0C1929] text-[#E6CA85] px-2 py-0.5 rounded font-bold">
                  CONFIDENTIAL
                </span>
              </div>
            </div>

            {/* Proposal Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-stone-600 block uppercase font-mono">Client Details:</span>
                <strong className="block text-xs font-bold">{currentLead?.clientName || 'Valued Patron'}</strong>
                <span className="text-[11px] text-stone-600 block">{currentLead?.phone}</span>
                <span className="text-[11px] text-stone-600 block truncate">{currentLead?.email}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-600 block uppercase font-mono">Celebration:</span>
                <strong className="block text-xs font-bold">{currentLead?.eventType || 'Grand Wedding'}</strong>
                <span className="text-[11px] text-stone-600 block">{currentLead?.eventDate || 'Auspicious Date'}</span>
                <span className="text-[11px] text-[#9A7732] font-semibold block">{guestCount} Guests · {selectedTier}</span>
              </div>
            </div>

            {/* Line Items Mini Table */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 font-mono block">
                Schedule of Investment:
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={`summary-${idx}`} className="flex justify-between text-xs py-1 border-b border-stone-100">
                    <span className="truncate max-w-[180px] sm:max-w-[220px] text-stone-800">{item.name}</span>
                    <span className="font-mono font-semibold">₹{item.total.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Calculations */}
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal Tariff:</span>
                <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Rebate ({discountPercent}%):</span>
                  <span className="font-mono">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>GST (18% Statutory):</span>
                <span className="font-mono">+ ₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-center">
                <span className="font-bold uppercase tracking-wider text-xs sm:text-sm text-[#0C1929]">
                  Total Contract Value:
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#0C1929]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-1.5 flex justify-between text-[11px] text-[#9A7732] font-semibold">
                <span>Reservation Advance (40%):</span>
                <span className="font-mono">₹{Math.round(grandTotal * 0.4).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Terms Summary */}
            <div className="text-[10px] text-stone-600 leading-relaxed border-t border-stone-200 pt-3">
              <p>
                * Valid for 14 calendar days. Date exclusivity is confirmed upon receipt of the 40% reservation advance. Balance 60% due 15 days prior to celebration.
              </p>
            </div>

            {/* Convert to Booking 1-Click Button */}
            <button
              type="button"
              onClick={() => {
                if (!activeQuotation && currentLead) {
                  handleSaveQuotation();
                }
                setShowConfirmModal(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Accept &amp; Convert to Confirmed Booking</span>
            </button>

          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && currentLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-serif text-xl sm:text-2xl text-[#0C1929] font-bold">
                Confirm Sanctuary Booking
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm">
                Lock date <strong>{currentLead.eventDate}</strong> for <strong>{currentLead.clientName}</strong>.
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Contract Value:</span>
                <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Statutory 40% Advance:</span>
                <strong>₹{Math.round(grandTotal * 0.4).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const quoteToUse: Quotation = activeQuotation || {
                    id: `Q-${Date.now().toString().slice(-4)}`,
                    quotationNumber: `ARB-QT-2026-${Date.now().toString().slice(-4)}`,
                    leadId: currentLead.id,
                    clientName: currentLead.clientName,
                    partnerName: currentLead.partnerName,
                    email: currentLead.email,
                    phone: currentLead.phone,
                    eventType: currentLead.eventType,
                    eventDate: currentLead.eventDate,
                    spaces: currentLead.preferredSpaces || ['The Banyan Grand Lawn', 'The Emerald Glasshouse'],
                    packageTier: selectedTier,
                    guestCount: guestCount,
                    items: items,
                    subtotal: subtotal,
                    discountAmount: discountAmount,
                    taxAmount: gstAmount,
                    totalAmount: grandTotal,
                    advanceDeposit: Math.round(grandTotal * 0.4),
                    status: 'accepted',
                    createdAt: new Date().toISOString().split('T')[0],
                    validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
                    preparedBy: 'Vikram Sundaram (Senior Director)',
                    specialTerms: notes
                  };

                  confirmBookingFromQuote(quoteToUse);
                  setShowConfirmModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider"
              >
                Confirm &amp; Lock Date
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
