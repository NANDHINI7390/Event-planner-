import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ViewMode, 
  AdminTab, 
  UserRole,
  Lead, 
  Quotation, 
  Booking, 
  AvailabilitySlot, 
  VenueSpace, 
  EventExperience, 
  LeadStatus,
  FollowUp,
  PaymentRecord,
  EventOperations,
  OperationalStatus,
  CommunicationLog,
  PaymentMethod
} from '../types';
import { 
  INITIAL_LEADS, 
  INITIAL_QUOTATIONS, 
  INITIAL_BOOKINGS, 
  INITIAL_AVAILABILITY, 
  INITIAL_FOLLOW_UPS,
  VENUE_SPACES, 
  EVENT_EXPERIENCES,
  CALENDAR_STATUS_DAYS
} from '../data/venueData';
import { ambientSound } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Navigation & Role
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  
  // Leads & Pipeline
  leads: Lead[];
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'notes'>) => string;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  addLeadNote: (leadId: string, content: string, type?: Lead['notes'][0]['type']) => void;
  deleteLead: (leadId: string) => void;
  
  // Follow-up & Reminders
  followUps: FollowUp[];
  addFollowUp: (followUpData: Omit<FollowUp, 'id' | 'createdAt' | 'status'>) => string;
  completeFollowUp: (followUpId: string, resultNotes?: string) => void;
  rescheduleFollowUp: (followUpId: string, newDate: string, newTime?: string) => void;
  
  // Quotations
  quotations: Quotation[];
  addQuotation: (quotation: Quotation) => void;
  createQuotation: (quoteData: Omit<Quotation, 'id' | 'quotationNumber' | 'createdAt'>) => string;
  updateQuotation: (quotation: Quotation) => void;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;
  acceptQuotationAndConfirmBooking: (quotationId: string) => string;
  
  // Bookings & Operations
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'advanceRequired' | 'operationalStatus' | 'paymentHistory'> & { id?: string }) => string;
  createBookingFromQuote: (quoteId: string) => string;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  recordPayment: (
    bookingId: string, 
    paymentData: { 
      amount: number; 
      paymentMethod: PaymentMethod; 
      referenceNumber: string; 
      notes: string; 
      paymentType?: PaymentRecord['paymentType'];
    }
  ) => void;
  markBookingFinanciallyClosed: (bookingId: string, notes?: string) => void;
  updateEventOperations: (bookingId: string, operations: EventOperations) => void;
  updateOperationalStatus: (bookingId: string, status: OperationalStatus) => void;
  
  // Communications
  communications: CommunicationLog[];
  sendCommunication: (
    leadOrBookingId: string,
    channel: 'whatsapp' | 'email',
    templateType: CommunicationLog['templateType'],
    recipient: string,
    recipientName: string,
    message: string
  ) => void;

  // Availability & Calendar
  availability: Record<string, AvailabilitySlot>;
  checkDateAvailability: (dateStr: string) => { status: 'available' | 'enquiry' | 'booked'; eventTitle?: string };
  getCalendarDayStatus: (dateStr: string) => { status: 'available' | 'enquired' | 'booked'; rateMultiplier: number; note?: string };
  setCustomDateAvailability: (dateStr: string, slot: AvailabilitySlot) => void;
  
  // Modals & UI Selection
  isVisitModalOpen: boolean;
  setIsVisitModalOpen: (open: boolean) => void;
  selectedDateForVisit: string | null;
  setSelectedDateForVisit: (date: string | null) => void;
  
  isEnquiryDrawerOpen: boolean;
  setIsEnquiryDrawerOpen: (open: boolean) => void;
  
  selectedSpaceForDetail: VenueSpace | null;
  setSelectedSpaceForDetail: (space: VenueSpace | null) => void;
  
  selectedExperienceForDetail: EventExperience | null;
  setSelectedExperienceForDetail: (exp: EventExperience | null) => void;

  selectedLeadForQuotation: Lead | null;
  setSelectedLeadForQuotation: (lead: Lead | null) => void;

  isCommunicationModalOpen: boolean;
  setIsCommunicationModalOpen: (open: boolean) => void;
  activeCommunicationTarget: {
    recipientName: string;
    recipientPhone: string;
    recipientEmail: string;
    leadId?: string;
    bookingId?: string;
    defaultTemplate?: CommunicationLog['templateType'];
    customMessage?: string;
  } | null;
  openCommunicationModal: (target: {
    recipientName: string;
    recipientPhone: string;
    recipientEmail: string;
    leadId?: string;
    bookingId?: string;
    defaultTemplate?: CommunicationLog['templateType'];
    customMessage?: string;
  }) => void;

  // Demo helper
  resetToDemoData: () => void;
  
  // Ambient Sound
  isSoundPlaying: boolean;
  toggleSound: () => void;
  soundVolume: number;
  setSoundVolume: (vol: number) => void;

  // Custom Cursor
  cursorText: string;
  setCursorText: (text: string) => void;
  cursorVariant: 'default' | 'pointer' | 'text' | 'explore' | 'quote' | 'view';
  setCursorVariant: (variant: 'default' | 'pointer' | 'text' | 'explore' | 'quote' | 'view') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('public');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('arboretum_user_role');
    return (saved as UserRole) || 'admin';
  });
  
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('arboretum_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    const saved = localStorage.getItem('arboretum_followups');
    return saved ? JSON.parse(saved) : INITIAL_FOLLOW_UPS;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem('arboretum_quotations');
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('arboretum_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [availability, setAvailability] = useState<Record<string, AvailabilitySlot>>(() => {
    const saved = localStorage.getItem('arboretum_availability');
    return saved ? JSON.parse(saved) : INITIAL_AVAILABILITY;
  });

  const [communications, setCommunications] = useState<CommunicationLog[]>(() => {
    const saved = localStorage.getItem('arboretum_comms');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal States
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [selectedDateForVisit, setSelectedDateForVisit] = useState<string | null>(null);
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] = useState(false);
  const [selectedSpaceForDetail, setSelectedSpaceForDetail] = useState<VenueSpace | null>(null);
  const [selectedExperienceForDetail, setSelectedExperienceForDetail] = useState<EventExperience | null>(null);
  const [selectedLeadForQuotation, setSelectedLeadForQuotation] = useState<Lead | null>(null);

  // Communication Modal State
  const [isCommunicationModalOpen, setIsCommunicationModalOpen] = useState(false);
  const [activeCommunicationTarget, setActiveCommunicationTarget] = useState<AppContextType['activeCommunicationTarget']>(null);

  // Sound States
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [soundVolume, setSoundVolumeState] = useState(0.25);

  // Cursor States
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pointer' | 'text' | 'explore' | 'quote' | 'view'>('default');

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('arboretum_user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('arboretum_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('arboretum_followups', JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem('arboretum_quotations', JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem('arboretum_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('arboretum_availability', JSON.stringify(availability));
  }, [availability]);

  useEffect(() => {
    localStorage.setItem('arboretum_comms', JSON.stringify(communications));
  }, [communications]);

  const resetToDemoData = () => {
    localStorage.removeItem('arboretum_leads');
    localStorage.removeItem('arboretum_followups');
    localStorage.removeItem('arboretum_quotations');
    localStorage.removeItem('arboretum_bookings');
    localStorage.removeItem('arboretum_availability');
    localStorage.removeItem('arboretum_comms');
    localStorage.removeItem('arboretum_user_role');

    setLeads(INITIAL_LEADS);
    setFollowUps(INITIAL_FOLLOW_UPS);
    setQuotations(INITIAL_QUOTATIONS);
    setBookings(INITIAL_BOOKINGS);
    setAvailability(INITIAL_AVAILABILITY);
    setCommunications([]);
    setUserRole('admin');

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0C1929', '#C5A059', '#FAF8F5']
    });
  };

  const toggleSound = () => {
    const newState = ambientSound.toggle();
    setIsSoundPlaying(newState);
  };

  const setSoundVolume = (vol: number) => {
    setSoundVolumeState(vol);
    ambientSound.setVolume(vol);
  };

  // Lead Lifecycle Actions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'notes'>): string => {
    const newId = `lead-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Auto-create initial follow-up for tomorrow morning
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const initialFollowUp: FollowUp = {
      id: `fu-${Date.now()}`,
      leadId: newId,
      clientName: leadData.clientName,
      phone: leadData.phone,
      dueDate: leadData.visitDate || tomorrow,
      dueTime: leadData.visitSlot ? '16:30' : '11:00',
      notes: leadData.visitDate 
        ? `Conduct Golden Hour walk-through for ${leadData.clientName} (${leadData.eventType.toUpperCase()}).`
        : `Initial discovery call for ${leadData.eventType.toUpperCase()} enquiry on ${leadData.eventDate}.`,
      status: 'pending',
      assignedStaff: leadData.assignedStaff || 'Vikram Sundaram',
      createdAt: today
    };

    const newLead: Lead = {
      ...leadData,
      id: newId,
      createdAt: today,
      assignedStaff: leadData.assignedStaff || 'Vikram Sundaram',
      nextFollowUpDate: initialFollowUp.dueDate,
      nextFollowUpTime: initialFollowUp.dueTime,
      nextFollowUpNotes: initialFollowUp.notes,
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'Digital Concierge',
          timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          content: `New inbound inquiry captured for ${leadData.eventType.toUpperCase()} on ${leadData.eventDate}. Scale: ${leadData.guestCount} guests. Assigned to ${leadData.assignedStaff || 'Vikram Sundaram'}.`,
          type: 'note'
        }
      ],
      internalNotes: [
        `[${today} - System] Lead registered via Sanctuary Portal. Automatic follow-up scheduled for ${initialFollowUp.dueDate} at ${initialFollowUp.dueTime}.`
      ]
    };

    setLeads(prev => [newLead, ...prev]);
    setFollowUps(prev => [initialFollowUp, ...prev]);

    // Update availability map if date provided
    if (leadData.eventDate && (!availability[leadData.eventDate] || availability[leadData.eventDate].status === 'available')) {
      setAvailability(prev => ({
        ...prev,
        [leadData.eventDate]: {
          date: leadData.eventDate,
          status: 'enquiry',
          eventTitle: `${leadData.clientName} (${leadData.eventType})`,
          guestCount: leadData.guestCount
        }
      }));
    }

    return newId;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id !== leadId) return l;
      return {
        ...l,
        status,
        notes: [
          ...l.notes,
          {
            id: `n-${Date.now()}`,
            author: 'Venue Management',
            timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            content: `Pipeline status moved to ${status.replace('_', ' ').toUpperCase()}.`,
            type: 'note'
          }
        ]
      };
    }));
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, ...updates } : l));
  };

  const addLeadNote = (leadId: string, content: string, type: Lead['notes'][0]['type'] = 'note') => {
    setLeads(prev => prev.map(l => {
      if (l.id !== leadId) return l;
      return {
        ...l,
        notes: [
          ...l.notes,
          {
            id: `note-${Date.now()}`,
            author: userRole === 'admin' ? 'Vikram Sundaram (Director)' : 'Pooja Iyer (Manager)',
            timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            content,
            type
          }
        ]
      };
    }));
  };

  const deleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    setFollowUps(prev => prev.filter(f => f.leadId !== leadId));
  };

  // Follow-Up System
  const addFollowUp = (data: Omit<FollowUp, 'id' | 'createdAt' | 'status'>): string => {
    const id = `fu-${Date.now()}`;
    const newFollowUp: FollowUp = {
      ...data,
      id,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFollowUps(prev => [newFollowUp, ...prev]);

    // Also update lead's next follow-up pointer
    if (data.leadId) {
      updateLead(data.leadId, {
        nextFollowUpDate: data.dueDate,
        nextFollowUpTime: data.dueTime,
        nextFollowUpNotes: data.notes
      });
    }

    return id;
  };

  const completeFollowUp = (followUpId: string, resultNotes?: string) => {
    setFollowUps(prev => prev.map(f => {
      if (f.id !== followUpId) return f;
      return {
        ...f,
        status: 'completed',
        completedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        resultNotes: resultNotes || 'Follow-up successfully completed.'
      };
    }));

    // Find the lead and log completion
    const target = followUps.find(f => f.id === followUpId);
    if (target?.leadId) {
      addLeadNote(
        target.leadId,
        `Completed Follow-Up: "${target.notes}". Result: ${resultNotes || 'Done'}.`,
        'call'
      );
    }
  };

  const rescheduleFollowUp = (followUpId: string, newDate: string, newTime: string = '11:00') => {
    setFollowUps(prev => prev.map(f => {
      if (f.id !== followUpId) return f;
      return {
        ...f,
        dueDate: newDate,
        dueTime: newTime,
        status: 'pending'
      };
    }));

    const target = followUps.find(f => f.id === followUpId);
    if (target?.leadId) {
      updateLead(target.leadId, {
        nextFollowUpDate: newDate,
        nextFollowUpTime: newTime
      });
    }
  };

  // Quotation Management
  const addQuotation = (newQuotation: Quotation) => {
    setQuotations(prev => [newQuotation, ...prev]);
    if (newQuotation.leadId) {
      updateLeadStatus(newQuotation.leadId, 'quotation_sent');
      updateLead(newQuotation.leadId, { quotationAmount: newQuotation.totalAmount });
    }
  };

  const createQuotation = (quoteData: Omit<Quotation, 'id' | 'quotationNumber' | 'createdAt'>): string => {
    const id = `quote-${Date.now()}`;
    const year = new Date().getFullYear();
    const count = quotations.length + 89;
    const quotationNumber = `ARB/QT/${year}/${count.toString().padStart(3, '0')}`;

    const newQuotation: Quotation = {
      ...quoteData,
      id,
      quotationNumber,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setQuotations(prev => [newQuotation, ...prev]);

    if (quoteData.leadId) {
      updateLeadStatus(quoteData.leadId, 'quotation_sent');
      updateLead(quoteData.leadId, { quotationAmount: quoteData.totalAmount });
    }

    return id;
  };

  const updateQuotation = (updated: Quotation) => {
    setQuotations(prev => prev.map(q => q.id === updated.id ? updated : q));
  };

  const updateQuotationStatus = (id: string, status: Quotation['status']) => {
    setQuotations(prev => prev.map(q => {
      if (q.id !== id) return q;
      const updated = { ...q, status };
      if (status === 'accepted') {
        acceptQuotationAndConfirmBooking(id);
      }
      return updated;
    }));
  };

  // End-to-End Booking Creation & Operations Setup
  const acceptQuotationAndConfirmBooking = (quoteId: string): string => {
    const quote = quotations.find(q => q.id === quoteId);
    if (!quote) return '';

    const newBookingId = `book-${Date.now()}`;
    const bookingRef = `ARB-${new Date().getFullYear()}-BK${Math.floor(500 + Math.random() * 400)}`;
    const advanceRequired = Math.round(quote.totalAmount * 0.4); // 40%
    const initialAdvancePaid = quote.advanceDeposit || advanceRequired;
    const balanceRemaining = Math.max(0, quote.totalAmount - initialAdvancePaid);
    const paymentStatus = balanceRemaining === 0 ? 'fully_paid' : 'advance_paid';

    // Initial Payment Record
    const initialPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      bookingId: newBookingId,
      bookingRef,
      amount: initialAdvancePaid,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'NEFT / RTGS',
      referenceNumber: `NEFT-${Math.floor(100000000 + Math.random() * 900000000)}`,
      notes: 'Initial 40% statutory reservation deposit received upon proposal acceptance.',
      recordedBy: 'Vikram Sundaram (Senior Director)',
      paymentType: 'advance_40'
    };

    // Default Event Operations Setup
    const defaultOperations: EventOperations = {
      bookingId: newBookingId,
      eventTitle: `${quote.clientName}'s ${quote.eventType.toUpperCase()} Celebration`,
      eventDate: quote.eventDate,
      operationalStatus: 'planning',
      staffAssignments: {
        eventManager: 'Vikram Sundaram (Director of Celebrations)',
        decorTeam: 'Botanical Scenography ECR',
        cateringTeam: 'Royal Heritage Banqueting',
        soundLightingTeam: 'L-Acoustics Concert Audio & Intelligent Illumination',
        guestRelations: 'Arboretum VIP Hospitality Team'
      },
      specialRequirements: [
        'Dedicated senior banquet captain on-site 4 hours prior',
        'Bridal villa pre-stocked with hospitality hamper and private butler',
        '100% silent dual DG power backup verified for evening canopy lighting'
      ],
      timeline: [
        { id: `t-${Date.now()}-1`, time: '08:00 AM', activity: 'Estate Vendor Access & Staging Setup', owner: 'Operations Lead', completed: false },
        { id: `t-${Date.now()}-2`, time: '02:00 PM', activity: 'Sound & Architectural Lighting Calibration', owner: 'Production Team', completed: false },
        { id: `t-${Date.now()}-3`, time: '04:30 PM', activity: 'Bridal Suite Hospitality & Final Walk-Through', owner: 'Event Manager', completed: false },
        { id: `t-${Date.now()}-4`, time: '06:00 PM', activity: 'Guest Arrivals & Live Banqueting Commencement', owner: 'Guest Relations', completed: false }
      ],
      checklists: [
        { id: `c-${Date.now()}-1`, item: 'Auspicious date locked on estate registry & public calendar', team: 'manager', done: true },
        { id: `c-${Date.now()}-2`, item: '40% advance deposit verified with bank accounts', team: 'manager', done: true },
        { id: `c-${Date.now()}-3`, item: 'Floral moodboard approval scheduled with couple', team: 'decor', done: false },
        { id: `c-${Date.now()}-4`, item: 'Chef menu tasting session finalized for 6 family members', team: 'catering', done: false },
        { id: `c-${Date.now()}-5`, item: 'Valet and security marshal count allocated', team: 'hospitality', done: false }
      ],
      internalNotes: [
        `Converted from official proposal ${quote.quotationNumber}. Client preferred ${quote.packageTier.toUpperCase()} tier.`
      ]
    };

    const newBooking: Booking = {
      id: newBookingId,
      bookingRef,
      leadId: quote.leadId,
      quotationId: quote.id,
      clientName: quote.clientName,
      partnerName: quote.partnerName,
      email: quote.email,
      phone: quote.phone,
      eventType: quote.eventType,
      eventTitle: `${quote.clientName}'s ${quote.eventType.toUpperCase()} Celebration`,
      eventDate: quote.eventDate,
      timingSlot: 'Full Day (07:00 - 23:30)',
      assignedSpaces: quote.spaces,
      guestCount: quote.guestCount,
      packageTier: quote.packageTier.toUpperCase(),
      totalAmount: quote.totalAmount,
      advanceRequired,
      depositPaid: initialAdvancePaid,
      balanceDue: balanceRemaining,
      paymentStatus,
      operationalStatus: 'planning',
      status: 'confirmed',
      banquetManager: 'Vikram Sundaram (Director of Celebrations)',
      paymentHistory: [initialPayment],
      operations: defaultOperations,
      timelineNotes: [
        `${new Date().toISOString().split('T')[0]}: Official proposal ${quote.quotationNumber} accepted. 40% Advance (₹${(initialAdvancePaid / 100000).toFixed(2)}L) recorded.`,
        `${new Date().toISOString().split('T')[0]}: Date ${quote.eventDate} marked BOOKED on public calendar.`
      ]
    };

    setBookings(prev => [newBooking, ...prev]);

    // Mark Date as BOOKED in availability calendar
    setAvailability(prev => ({
      ...prev,
      [quote.eventDate]: {
        date: quote.eventDate,
        status: 'booked',
        eventTitle: `${quote.clientName} (${quote.eventType})`,
        guestCount: quote.guestCount
      }
    }));

    // Update Quotation Status to Accepted
    setQuotations(prev => prev.map(q => q.id === quoteId ? { ...q, status: 'accepted' } : q));

    // Update Lead Status to Confirmed
    if (quote.leadId) {
      updateLeadStatus(quote.leadId, 'confirmed');
      addLeadNote(quote.leadId, `Proposal ${quote.quotationNumber} accepted. Booking created (Ref: ${bookingRef}). Date ${quote.eventDate} marked BOOKED.`, 'payment');
    }

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#0C1929', '#C5A059', '#E6CA85']
    });

    return newBookingId;
  };

  const createBookingFromQuote = (quoteId: string) => {
    return acceptQuotationAndConfirmBooking(quoteId);
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'advanceRequired' | 'operationalStatus' | 'paymentHistory'> & { id?: string }): string => {
    const id = bookingData.id || `book-${Date.now()}`;
    const advanceRequired = Math.round(bookingData.totalAmount * 0.4);
    const depositPaid = bookingData.depositPaid || advanceRequired;
    const balanceDue = Math.max(0, bookingData.totalAmount - depositPaid);
    const paymentStatus = balanceDue === 0 ? 'fully_paid' : 'advance_paid';

    const newBooking: Booking = {
      ...bookingData,
      id,
      advanceRequired,
      depositPaid,
      balanceDue,
      paymentStatus,
      operationalStatus: 'planning',
      paymentHistory: [
        {
          id: `pay-${Date.now()}`,
          bookingId: id,
          bookingRef: bookingData.bookingRef,
          amount: depositPaid,
          date: new Date().toISOString().split('T')[0],
          paymentMethod: 'NEFT / RTGS',
          referenceNumber: `NEFT-${Math.floor(100000000 + Math.random() * 900000000)}`,
          notes: 'Advance deposit recorded.',
          recordedBy: 'Vikram Sundaram',
          paymentType: 'advance_40'
        }
      ]
    };

    setBookings(prev => [newBooking, ...prev]);

    setAvailability(prev => ({
      ...prev,
      [bookingData.eventDate]: {
        date: bookingData.eventDate,
        status: 'booked',
        eventTitle: bookingData.eventTitle,
        guestCount: bookingData.guestCount
      }
    }));

    if (bookingData.leadId) {
      updateLeadStatus(bookingData.leadId, 'confirmed');
    }

    return id;
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  // Payment Recording
  const recordPayment = (
    bookingId: string, 
    paymentData: { 
      amount: number; 
      paymentMethod: PaymentMethod; 
      referenceNumber: string; 
      notes: string; 
      paymentType?: PaymentRecord['paymentType'];
    }
  ) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;

      const newDeposit = b.depositPaid + paymentData.amount;
      const newBalance = Math.max(0, b.totalAmount - newDeposit);
      
      let newPaymentStatus: Booking['paymentStatus'] = 'advance_pending';
      if (newBalance === 0) {
        newPaymentStatus = 'fully_paid';
      } else if (newDeposit >= b.advanceRequired) {
        newPaymentStatus = newDeposit > b.advanceRequired ? 'partially_paid' : 'advance_paid';
      }

      const newRecord: PaymentRecord = {
        id: `pay-${Date.now()}`,
        bookingId: b.id,
        bookingRef: b.bookingRef,
        amount: paymentData.amount,
        date: new Date().toISOString().split('T')[0],
        paymentMethod: paymentData.paymentMethod,
        referenceNumber: paymentData.referenceNumber,
        notes: paymentData.notes,
        recordedBy: userRole === 'admin' ? 'Vikram Sundaram (Director)' : 'Pooja Iyer (Manager)',
        paymentType: paymentData.paymentType || (newBalance === 0 ? 'final_settlement' : 'milestone_installment')
      };

      const newTimelineNote = `${new Date().toISOString().split('T')[0]}: Payment of ₹${(paymentData.amount / 100000).toFixed(2)}L received via ${paymentData.paymentMethod} (Ref: ${paymentData.referenceNumber}). Balance remaining: ₹${(newBalance / 100000).toFixed(2)}L.`;

      return {
        ...b,
        depositPaid: newDeposit,
        balanceDue: newBalance,
        paymentStatus: newPaymentStatus,
        paymentHistory: [newRecord, ...(b.paymentHistory || [])],
        timelineNotes: [newTimelineNote, ...(b.timelineNotes || [])]
      };
    }));

    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#C5A059', '#0C1929', '#FAF8F5']
    });
  };

  const markBookingFinanciallyClosed = (bookingId: string, notes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;

      const closingPaymentAmount = b.balanceDue;
      const closingRecord: PaymentRecord = closingPaymentAmount > 0 ? {
        id: `pay-${Date.now()}`,
        bookingId: b.id,
        bookingRef: b.bookingRef,
        amount: closingPaymentAmount,
        date: today,
        paymentMethod: 'NEFT / RTGS',
        referenceNumber: `CLR-FINAL-${Math.floor(100000 + Math.random() * 900000)}`,
        notes: notes || 'Final balance clearance & account closure.',
        recordedBy: userRole === 'admin' ? 'Vikram Sundaram (Owner/Director)' : 'Pooja Iyer (Banquet Manager)',
        paymentType: 'final_settlement'
      } : {
        id: `pay-${Date.now()}`,
        bookingId: b.id,
        bookingRef: b.bookingRef,
        amount: 0,
        date: today,
        paymentMethod: 'NEFT / RTGS',
        referenceNumber: `CERT-${b.bookingRef}`,
        notes: 'Final accounts audited. Zero balance confirmed.',
        recordedBy: userRole === 'admin' ? 'Vikram Sundaram (Owner/Director)' : 'Pooja Iyer (Banquet Manager)',
        paymentType: 'final_settlement'
      };

      const updatedHistory = closingPaymentAmount > 0 ? [closingRecord, ...(b.paymentHistory || [])] : (b.paymentHistory || []);

      return {
        ...b,
        depositPaid: b.totalAmount,
        balanceDue: 0,
        paymentStatus: 'fully_paid',
        status: 'completed',
        isFinanciallyClosed: true,
        financiallyClosedAt: today,
        closedBy: userRole === 'admin' ? 'Vikram Sundaram (Owner/Director)' : 'Pooja Iyer (Banquet Manager)',
        paymentHistory: updatedHistory,
        timelineNotes: [
          `${today}: Event FINANCIALLY CLOSED & 100% SETTLED by ${userRole === 'admin' ? 'Vikram Sundaram' : 'Pooja Iyer'}. Final tax clearance receipt sealed.`,
          ...(b.timelineNotes || [])
        ]
      };
    }));

    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#10B981', '#C5A059', '#0C1929']
    });
  };

  // Event Operations
  const updateEventOperations = (bookingId: string, operations: EventOperations) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      return {
        ...b,
        operations,
        operationalStatus: operations.operationalStatus
      };
    }));
  };

  const updateOperationalStatus = (bookingId: string, status: OperationalStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      
      const updatedOperations: EventOperations = b.operations ? {
        ...b.operations,
        operationalStatus: status
      } : {
        bookingId: b.id,
        eventTitle: b.eventTitle,
        eventDate: b.eventDate,
        operationalStatus: status,
        staffAssignments: {
          eventManager: b.banquetManager,
          decorTeam: 'Botanical Scenography ECR',
          cateringTeam: 'Royal Heritage Banqueting',
          soundLightingTeam: 'L-Acoustics Concert Audio',
          guestRelations: 'Arboretum VIP Hospitality Team'
        },
        specialRequirements: [],
        timeline: [],
        checklists: [],
        internalNotes: []
      };

      const updatedBooking: Booking = {
        ...b,
        operationalStatus: status,
        operations: updatedOperations,
        status: status === 'completed' ? 'completed' : b.status,
        timelineNotes: [
          `${new Date().toISOString().split('T')[0]}: Operational status updated to ${status.replace('_', ' ').toUpperCase()}.`,
          ...(b.timelineNotes || [])
        ]
      };

      // If event completed, update corresponding lead
      if (status === 'completed' && b.leadId) {
        updateLeadStatus(b.leadId, 'completed');
      }

      return updatedBooking;
    }));

    if (status === 'completed') {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#C5A059', '#0C1929', '#10B981']
      });
    }
  };

  // Communications Dispatch & Simulator
  const sendCommunication = (
    leadOrBookingId: string,
    channel: 'whatsapp' | 'email',
    templateType: CommunicationLog['templateType'],
    recipient: string,
    recipientName: string,
    message: string
  ) => {
    const newLog: CommunicationLog = {
      id: `comm-${Date.now()}`,
      channel,
      templateType,
      recipient,
      recipientName,
      message,
      timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      referenceId: leadOrBookingId
    };

    setCommunications(prev => [newLog, ...prev]);

    // Also append to lead communications and notes if matches a lead
    const lead = leads.find(l => l.id === leadOrBookingId || l.phone === recipient || l.email === recipient);
    if (lead) {
      updateLead(lead.id, {
        communications: [newLog, ...(lead.communications || [])]
      });
      addLeadNote(
        lead.id,
        `Dispatched ${channel.toUpperCase()} message: "${message.substring(0, 100)}..."`,
        channel === 'whatsapp' ? 'whatsapp' : 'email'
      );
    }

    // Append to booking timeline if matches a booking
    const booking = bookings.find(b => b.id === leadOrBookingId || b.phone === recipient || b.email === recipient);
    if (booking) {
      updateBooking(booking.id, {
        timelineNotes: [
          `${new Date().toISOString().split('T')[0]}: Dispatched ${channel.toUpperCase()} update to ${recipientName} (${recipient}).`,
          ...(booking.timelineNotes || [])
        ]
      });
    }
  };

  const openCommunicationModal = (target: AppContextType['activeCommunicationTarget']) => {
    setActiveCommunicationTarget(target);
    setIsCommunicationModalOpen(true);
  };

  // Merged Availability Intelligence
  const checkDateAvailability = (dateStr: string) => {
    // Check confirmed bookings first
    const isBookedInLedger = bookings.some(b => b.eventDate === dateStr && b.status !== 'cancelled');
    if (isBookedInLedger) {
      const bookedEvent = bookings.find(b => b.eventDate === dateStr);
      return { status: 'booked', eventTitle: bookedEvent?.eventTitle };
    }

    if (availability[dateStr]) {
      return {
        status: availability[dateStr].status,
        eventTitle: availability[dateStr].eventTitle
      };
    }
    return { status: 'available' };
  };

  const getCalendarDayStatus = (dateStr: string) => {
    const isBookedInLedger = bookings.some(b => b.eventDate === dateStr && b.status !== 'cancelled');
    if (isBookedInLedger) {
      const bookedEvent = bookings.find(b => b.eventDate === dateStr);
      return { 
        status: 'booked' as const, 
        rateMultiplier: 1.2, 
        note: `Reserved: ${bookedEvent?.eventTitle || 'Estate Celebration'}` 
      };
    }

    if (availability[dateStr]?.status === 'booked') {
      return {
        status: 'booked' as const,
        rateMultiplier: 1.2,
        note: availability[dateStr].eventTitle || 'Reserved Estate Celebration'
      };
    }

    if (availability[dateStr]?.status === 'enquiry' || CALENDAR_STATUS_DAYS[dateStr]?.status === 'enquired') {
      return {
        status: 'enquired' as const,
        rateMultiplier: CALENDAR_STATUS_DAYS[dateStr]?.rateMultiplier || 1.15,
        note: CALENDAR_STATUS_DAYS[dateStr]?.note || 'Tentative Hold — Inquiry Active'
      };
    }

    return CALENDAR_STATUS_DAYS[dateStr] || {
      status: 'available' as const,
      rateMultiplier: 1.0,
      note: 'Standard auspicious season opening'
    };
  };

  const setCustomDateAvailability = (dateStr: string, slot: AvailabilitySlot) => {
    setAvailability(prev => ({
      ...prev,
      [dateStr]: slot
    }));
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
        userRole,
        setUserRole,
        leads,
        addLead,
        updateLeadStatus,
        updateLead,
        addLeadNote,
        deleteLead,
        followUps,
        addFollowUp,
        completeFollowUp,
        rescheduleFollowUp,
        quotations,
        addQuotation,
        createQuotation,
        updateQuotation,
        updateQuotationStatus,
        acceptQuotationAndConfirmBooking,
        bookings,
        addBooking,
        createBookingFromQuote,
        updateBooking,
        updateBookingStatus,
        recordPayment,
        markBookingFinanciallyClosed,
        updateEventOperations,
        updateOperationalStatus,
        communications,
        sendCommunication,
        availability,
        checkDateAvailability,
        getCalendarDayStatus,
        setCustomDateAvailability,
        isVisitModalOpen,
        setIsVisitModalOpen,
        selectedDateForVisit,
        setSelectedDateForVisit,
        isEnquiryDrawerOpen,
        setIsEnquiryDrawerOpen,
        selectedSpaceForDetail,
        setSelectedSpaceForDetail,
        selectedExperienceForDetail,
        setSelectedExperienceForDetail,
        selectedLeadForQuotation,
        setSelectedLeadForQuotation,
        isCommunicationModalOpen,
        setIsCommunicationModalOpen,
        activeCommunicationTarget,
        openCommunicationModal,
        resetToDemoData,
        isSoundPlaying,
        toggleSound,
        soundVolume,
        setSoundVolume,
        cursorText,
        setCursorText,
        cursorVariant,
        setCursorVariant
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
