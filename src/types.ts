export type ViewMode = 'public' | 'admin';

export type AdminTab = 'dashboard' | 'pipeline' | 'quotes' | 'bookings' | 'operations' | 'analytics';

export type UserRole = 'admin' | 'manager' | 'staff';

export type EventCategory = 
  | 'wedding' 
  | 'engagement' 
  | 'reception' 
  | 'birthday' 
  | 'corporate' 
  | 'private_celebration' 
  | 'pre_wedding';

export interface VenueSpace {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capacitySitting: number;
  capacityFloating: number;
  areaSqFt: number;
  bestFor: string;
  features: string[];
  coverImage: string;
  gallery: string[];
  dayRate: number;
  eveningRate: number;
  fullDayRate: number;
  dimensions: string;
}

export interface EventExperience {
  id: EventCategory;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  capacity: string;
  vibe: string;
  spacesRecommended: string[];
  startingPrice: string;
  keyMoments: string[];
}

export interface PackageTier {
  id: 'essential' | 'signature' | 'grand';
  name: string;
  subtitle: string;
  guestCapacity: string;
  pricePerPlate: number;
  baseVenueFee: number;
  estimatedTotal: string;
  isPopular?: boolean;
  waxSealColor: string;
  features: {
    duration: string;
    catering: string;
    decoration: string;
    seating: string;
    parking: string;
    bridalSuite: string;
    soundLighting: string;
    extraServices: string[];
  };
}

export type LeadStatus = 
  | 'new' 
  | 'contacted' 
  | 'visit_scheduled' 
  | 'quotation_sent' 
  | 'negotiation' 
  | 'confirmed' 
  | 'completed' 
  | 'lost';

export type FollowUpStatus = 'pending' | 'completed' | 'rescheduled' | 'cancelled';

export interface FollowUp {
  id: string;
  leadId: string;
  clientName: string;
  phone: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:MM
  notes: string;
  status: FollowUpStatus;
  assignedStaff: string;
  createdAt: string;
  completedAt?: string;
  resultNotes?: string;
}

export interface CommunicationLog {
  id: string;
  channel: 'whatsapp' | 'email' | 'call' | 'sms';
  templateType: 'enquiry_ack' | 'visit_confirm' | 'quote_ready' | 'booking_confirm' | 'payment_reminder' | 'custom';
  recipient: string;
  recipientName: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  referenceId?: string;
}

export interface LeadNote {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  type: 'note' | 'call' | 'visit' | 'email' | 'whatsapp' | 'payment';
}

export interface Lead {
  id: string;
  clientName: string;
  partnerName?: string;
  email: string;
  phone: string;
  eventType: EventCategory;
  eventDate: string;
  alternateDate?: string;
  guestCount: number;
  budgetRange: string;
  status: LeadStatus;
  assignedStaff: string;
  preferredSpaces: string[];
  packageInterest: 'essential' | 'signature' | 'grand' | 'bespoke';
  source: 'Instagram' | 'Luxury Planner' | 'ECR Walk-in' | 'Word of Mouth' | 'Website';
  createdAt: string;
  notes: LeadNote[];
  internalNotes?: string[];
  quotationAmount?: number;
  visitDate?: string;
  visitSlot?: string;
  nextFollowUpDate?: string;
  nextFollowUpTime?: string;
  nextFollowUpNotes?: string;
  followUps?: FollowUp[];
  communications?: CommunicationLog[];
}

export interface QuotationItem {
  name: string;
  category: 'venue' | 'catering' | 'decor' | 'production' | 'hospitality' | 'custom';
  description?: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  leadId: string;
  clientName: string;
  partnerName?: string;
  email: string;
  phone: string;
  eventType: EventCategory;
  eventDate: string;
  spaces: string[];
  packageTier: 'essential' | 'signature' | 'grand' | 'bespoke';
  guestCount: number;
  items: QuotationItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  advanceDeposit: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  validUntil: string;
  createdAt: string;
  preparedBy: string;
  specialTerms?: string;
}

export type PaymentMethod = 'NEFT / RTGS' | 'UPI' | 'Credit / Debit Card' | 'Cheque' | 'Bank Wire' | 'Cash';

export interface PaymentRecord {
  id: string;
  bookingId: string;
  bookingRef: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  referenceNumber: string;
  notes: string;
  recordedBy: string;
  paymentType: 'advance_40' | 'milestone_installment' | 'final_settlement';
}

export type OperationalStatus = 'planning' | 'in_preparation' | 'ready' | 'completed';

export interface StaffAssignments {
  eventManager: string;
  decorTeam: string;
  cateringTeam: string;
  soundLightingTeam: string;
  guestRelations: string;
}

export interface OperationalTimelineItem {
  id: string;
  time: string;
  activity: string;
  owner: string;
  completed: boolean;
}

export interface OperationalChecklistItem {
  id: string;
  item: string;
  team: 'manager' | 'decor' | 'catering' | 'production' | 'hospitality';
  done: boolean;
}

export interface EventOperations {
  bookingId: string;
  eventTitle: string;
  eventDate: string;
  operationalStatus: OperationalStatus;
  staffAssignments: StaffAssignments;
  specialRequirements: string[];
  timeline: OperationalTimelineItem[];
  checklists: OperationalChecklistItem[];
  internalNotes: string[];
}

export type BookingPaymentStatus = 'advance_pending' | 'advance_paid' | 'partially_paid' | 'fully_paid';

export interface Booking {
  id: string;
  bookingRef: string;
  leadId?: string;
  quotationId?: string;
  clientName: string;
  partnerName?: string;
  email: string;
  phone: string;
  eventType: EventCategory;
  eventTitle: string;
  eventDate: string;
  timingSlot?: 'Morning (07:00 - 14:00)' | 'Evening (16:00 - 23:30)' | 'Full Day (07:00 - 23:30)';
  assignedSpaces: string[];
  spaces?: string[];
  guestCount: number;
  packageTier: string;
  totalAmount: number;
  advanceRequired: number; // 40% statutory advance
  depositPaid: number;
  balanceDue: number;
  paymentStatus: BookingPaymentStatus;
  status: 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  banquetManager: string;
  paymentHistory: PaymentRecord[];
  operationalStatus: OperationalStatus;
  operations?: EventOperations;
  isFinanciallyClosed?: boolean;
  financiallyClosedAt?: string;
  closedBy?: string;
  timelineNotes: string[];
  notes?: string;
}

export interface Testimonial {
  id: string;
  couple: string;
  eventDate: string;
  celebrationType: string;
  quote: string;
  location: string;
  image: string;
  highlight: string;
}

export interface AvailabilitySlot {
  date: string; // YYYY-MM-DD
  status: 'available' | 'enquiry' | 'booked';
  eventTitle?: string;
  guestCount?: number;
}
