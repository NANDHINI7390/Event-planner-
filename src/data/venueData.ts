import { 
  VenueSpace, 
  EventExperience, 
  PackageTier, 
  Lead, 
  Quotation, 
  Booking, 
  Testimonial, 
  AvailabilitySlot,
  FollowUp,
  EventOperations,
  PaymentRecord
} from '../types';

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: 'banyan-lawn',
    name: 'The Banyan Grand Lawn',
    tagline: 'Under the century-old canopy where starlight meets botanical majesty',
    description: 'An expansive 42,000 sq.ft. manicured emerald expanse framed by illuminated 150-year-old banyan aerial roots. Designed for grand open-air celebrations, royal mandaps, and starlit banquets.',
    capacitySitting: 900,
    capacityFloating: 1400,
    areaSqFt: 42000,
    bestFor: 'Grand Weddings, Royal Receptions & Sangeet Nights',
    features: [
      'Direct driveway access for royal baraat & vintage cars',
      'Architectural tree canopy illumination with dimmable amber hues',
      'Integrated acoustic zoning for live orchestral sound without echo',
      'Custom stone stages for mandap or 20-piece musical ensembles'
    ],
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ],
    dayRate: 275000,
    eveningRate: 350000,
    fullDayRate: 500000,
    dimensions: '210 ft × 200 ft'
  },
  {
    id: 'glasshouse',
    name: 'The Glasshouse Conservatory',
    tagline: 'European botanical romance bathed in coastal daylight and chandeliers',
    description: 'A 24-foot vaulted climate-controlled glass architecture enveloped by tropical foliage, Italian marble floors, and hanging botanical installations. Seamlessly combines indoor comfort with immersive nature.',
    capacitySitting: 280,
    capacityFloating: 400,
    areaSqFt: 8500,
    bestFor: 'Intimate Vows, Ring Ceremonies & Cocktail Galas',
    features: [
      '360° floor-to-ceiling double-glazed acoustic glass walls',
      '30-ton silent ducted HVAC keeping constant 21°C coastal comfort',
      'Handcrafted brass chandeliers with programmable amber dimming',
      'Adjoining reflection terrace overlooking the frangipani lily pond'
    ],
    coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80'
    ],
    dayRate: 220000,
    eveningRate: 290000,
    fullDayRate: 420000,
    dimensions: '100 ft × 85 ft'
  },
  {
    id: 'water-amphitheatre',
    name: 'The Frangipani Water Amphitheatre',
    tagline: 'Sunken stone tiered sanctuary embraced by lotus ponds and sea breeze',
    description: 'Carved natural granite step amphitheatre hovering over reflective water lily ponds. As the sun sets over the ECR horizon, floating oil lamps and temple bells turn ceremonies into pure poetry.',
    capacitySitting: 350,
    capacityFloating: 500,
    areaSqFt: 14000,
    bestFor: 'Vedic Ceremonies, Muhurtham & Sunset Pheras',
    features: [
      'Floating central mandap island surrounded by water channels',
      'Natural acoustic amphitheatre seating tiered with sandstone cushions',
      'Integrated misting nozzles for warm afternoon ceremonies',
      'Direct ceremonial bridal walk pathway flanked by frangipani trees'
    ],
    coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80'
    ],
    dayRate: 200000,
    eveningRate: 260000,
    fullDayRate: 380000,
    dimensions: '125 ft × 110 ft'
  },
  {
    id: 'orchard-pavilion',
    name: 'The Coastal Orchard Pavilion',
    tagline: 'Open-air teakwood dining colonnade bordered by coastal coconut palms',
    description: 'An expansive open-pillared dining colonnade handcrafted from reclaimed Burma teak. Designed for multi-course celebratory feasts, live coastal grills, and traditional banana-leaf banquets.',
    capacitySitting: 600,
    capacityFloating: 900,
    areaSqFt: 22000,
    bestFor: 'Grand Traditional Banquets, Live Grills & Sangeet Dinners',
    features: [
      'Commercial live cooking stations and tandoori hearths with copper hoods',
      'Direct service tunnels connecting to 3,000 sq.ft master commercial kitchen',
      'Overhead ceiling fans with fine aerosol misting for open-air climate control',
      'Hand-cut granite floors with water drainage channels for traditional dining'
    ],
    coverImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80'
    ],
    dayRate: 180000,
    eveningRate: 240000,
    fullDayRate: 340000,
    dimensions: '180 ft × 120 ft'
  },
  {
    id: 'bridal-verandah',
    name: 'The Verandah Suite & Groom’s Den',
    tagline: 'Private colonial villa chambers with plunge pool & personal butler service',
    description: 'Two separate 1,800 sq.ft private preparation sanctuaries featuring bespoke makeup vanity mirrors, antique brass tubs, private plunge pools, and dedicated butler pantries for the wedding couple and immediate family.',
    capacitySitting: 40,
    capacityFloating: 60,
    areaSqFt: 3600,
    bestFor: 'Bridal Prep, Pre-Ceremony Portraits & VIP Family Hospitality',
    features: [
      'High-CRI 98+ professional bridal vanity mirrors and multiple salon chairs',
      'Private temperature-controlled splash plunge pool in secluded courtyard',
      'En-suite master dressing chambers with secured electronic jewelry safes',
      'Dedicated 24-hour private chef & butler hospitality pantry'
    ],
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    dayRate: 90000,
    eveningRate: 110000,
    fullDayRate: 150000,
    dimensions: '60 ft × 60 ft (Dual Villa)'
  }
];

export const EVENT_EXPERIENCES: EventExperience[] = [
  {
    id: 'wedding',
    title: 'The Grand Heritage Muhurtham',
    tagline: 'Timeless Vedic rituals under century-old banyan canopies and sacred water reflections',
    description: 'A bespoke celebration where temple-inspired stone architecture meets whispering coastal palms. From dawn shehnai ragas to the sacred mangalasutra exchange over reflecting lotus ponds, every detail is orchestrated with regal grace.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    accent: '#C5A059',
    capacity: '300 – 1,400 Guests',
    vibe: 'Sacred · Regal · Botanical · Auspicious',
    spacesRecommended: ['The Banyan Grand Lawn', 'The Frangipani Water Amphitheatre', 'The Coastal Orchard Pavilion'],
    startingPrice: '₹18,00,000',
    keyMoments: [
      'Baraat royal procession via private tamarind grove driveway',
      'Sacred Vedic pheras on floating stone amphitheatre stage',
      'Grand banana leaf banquet by master Chettinad culinary team',
      'Evening reception illuminated with 4,000 canopy fairy lights'
    ]
  },
  {
    id: 'engagement',
    title: 'The Glasshouse Ring Ceremony',
    tagline: 'European conservatory elegance wrapped in coastal sunshine and chandelier warmth',
    description: 'An intimate yet high-fashion ceremony inside our climate-controlled 24-foot glass pavilion. Exchange rings surrounded by imported garden blooms, French brass chandeliers, and panoramic views of reflecting water lily gardens.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    accent: '#BA6B53',
    capacity: '100 – 400 Guests',
    vibe: 'Contemporary · Romantic · High-Fashion · Intimate',
    spacesRecommended: ['The Glasshouse Conservatory', 'The Verandah Suite & Groom’s Den'],
    startingPrice: '₹8,50,000',
    keyMoments: [
      'Daylight champagne toast under the vaulted glass atrium',
      'String quartet acoustic performance during ring exchange',
      'Curated 5-course artisanal French-Indian fusion seated lunch',
      'Sunset portraiture against the infinity water reflection terrace'
    ]
  },
  {
    id: 'pre_wedding',
    title: 'The Starlit Sangeet & Coastal Soirée',
    tagline: 'Electric music, glowing canopies, and immersive night-long cocktail celebrations',
    description: 'Turn the estate into a high-energy botanical amphitheatre. With d&b audiotechnik concert sound, intelligent tree-mapping lasers, live tandoori fire stations, and handcrafted cocktail bars under illuminated ancient trees.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    accent: '#D4AF37',
    capacity: '250 – 1,000 Guests',
    vibe: 'High-Energy · Celebratory · Sensorial · Luminous',
    spacesRecommended: ['The Banyan Grand Lawn', 'The Coastal Orchard Pavilion'],
    startingPrice: '₹14,00,000',
    keyMoments: [
      'Choreographed stage performances with concert lighting & LED wall',
      'Artisanal gin & single-malt bars with molecular mixologists',
      'Midnight coastal street food stalls & live stone-baked pizza ovens',
      'Silent headphone afterparty within the soundproof glasshouse'
    ]
  },
  {
    id: 'reception',
    title: 'The Royal Emerald Reception',
    tagline: 'Grand red-carpet arrival, royal multi-course banquets, and starlit formal galas',
    description: 'A formal evening affair welcoming friends and family from around the world. Featuring red carpet arrivals, live orchestral ensembles, bespoke multi-tier floral installations, and an unforgettable culinary showcase.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    accent: '#C5A059',
    capacity: '400 – 1,500 Guests',
    vibe: 'Prestigious · Grandeur · Architectural · Cinematic',
    spacesRecommended: ['The Banyan Grand Lawn', 'The Glasshouse Conservatory', 'The Coastal Orchard Pavilion'],
    startingPrice: '₹22,00,000',
    keyMoments: [
      'Grand red-carpet receiving line under illuminated floral archways',
      'Multi-cuisine global buffet featuring 120 curated delicacy stations',
      'Orchestral live fusion band performance on the acoustic lawn stage',
      'Dramatic eco-friendly fireworks or drone light show over the canopy'
    ]
  },
  {
    id: 'corporate',
    title: 'Executive Summits & Luxury Brand Galas',
    tagline: 'Distinguished leadership retreats and high-profile product unveilings on the coast',
    description: 'An inspiring sanctuary away from urban clutter. Host executive board offsites, luxury automobile showcases, or international brand milestones with seamless high-speed fiber connectivity, silent power, and tailored five-star hospitality.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    accent: '#0C1929',
    capacity: '80 – 500 Attendees',
    vibe: 'Executive · Sophisticated · Discerning · Seamless',
    spacesRecommended: ['The Glasshouse Conservatory', 'The Coastal Orchard Pavilion'],
    startingPrice: '₹6,50,000',
    keyMoments: [
      'High-definition keynote presentation in climate-controlled Glasshouse',
      'Open-air farm-to-table networking luncheon under the coconut grove',
      'Private sunset networking cocktails with acoustic jazz trio',
      'Dedicated concierge desk, VIP chauffeur holding areas & green rooms'
    ]
  },
  {
    id: 'private_celebration',
    title: 'Milestone Birthdays & Anniversary Galas',
    tagline: 'Intimate private gatherings celebrating golden milestones with closest loved ones',
    description: 'Celebrate 50th anniversaries, milestone 60th birthdays (Shashtiapthapoorthi), or private family reunions in an exclusive haven where every detail honors your legacy and shared journey.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    accent: '#8C6239',
    capacity: '50 – 300 Guests',
    vibe: 'Warm · Nostalgic · Bespoke · Graceful',
    spacesRecommended: ['The Glasshouse Conservatory', 'The Frangipani Water Amphitheatre'],
    startingPrice: '₹5,00,000',
    keyMoments: [
      'Traditional homam ceremonies at dawn in water amphitheatre',
      'Curated nostalgic photo galleries suspended between frangipani trees',
      'Private chef custom family heirloom recipes recreating ancestral feasts',
      'Starlit candlelit dinner with acoustic vintage violin performance'
    ]
  }
];

export const PACKAGES: PackageTier[] = [
  {
    id: 'essential',
    name: 'The Essential Arboretum',
    subtitle: 'Refined botanical foundation for intimate gatherings and focused celebrations',
    guestCapacity: 'Up to 250 Guests',
    pricePerPlate: 2200,
    baseVenueFee: 400000,
    estimatedTotal: '₹9.5 – 12.5 Lakhs',
    waxSealColor: '#9A7732',
    features: {
      duration: '10 Hours Exclusive Estate Usage',
      catering: '4-Course Traditional South Indian or Pan-Asian Buffet (22 Items)',
      decoration: 'Floral entrance archway, basic stage draping, and warm pathway lighting',
      seating: '200 Chiavari chairs with cushions, 20 round banquet tables with linens',
      parking: 'Complimentary valet parking for 80 cars with 4 uniformed marshals',
      bridalSuite: 'Day-use access to The Verandah Suite for 8 hours',
      soundLighting: 'Standard PA speech system with 2 wireless mics & ambient canopy wash',
      extraServices: ['Dedicated banquet manager', '100% silent DG power backup', 'Standard security marshals']
    }
  },
  {
    id: 'signature',
    name: 'The Signature Canopy',
    subtitle: 'Our most sought-after royal experience for luxury weddings and grand receptions',
    guestCapacity: '300 to 700 Guests',
    pricePerPlate: 3200,
    baseVenueFee: 550000,
    estimatedTotal: '₹18.5 – 28.0 Lakhs',
    isPopular: true,
    waxSealColor: '#C5A059',
    features: {
      duration: '18 Hours Multi-Slot Estate Usage (Morning Vedic + Evening Reception)',
      catering: 'Grand 7-Course Live Banqueting with 6 Live Action Stations (42 Items)',
      decoration: 'Bespoke fresh floral mandap/stage, 4,000 canopy fairy lights & water candle flotilla',
      seating: '500 Handcrafted teakwood chairs, custom velvet lounge sofas & VIP pods',
      parking: 'Full valet logistics for 200+ vehicles with 8 valets & golf buggy shuttles',
      bridalSuite: '24-Hour overnight access to both Bridal Suite and Groom Den with private chef',
      soundLighting: 'L-Acoustics multi-zone concert audio & intelligent computer-controlled DMX lighting',
      extraServices: [
        'Senior venue director on-site',
        'Bridal dressing assistant',
        'Complimentary menu tasting session for 6 family members',
        'Green room hospitality hamper'
      ]
    }
  },
  {
    id: 'grand',
    name: 'The Grand Sanctuary Buyout',
    subtitle: 'Uncompromising presidential luxury with complete 48-hour exclusive estate dominion',
    guestCapacity: '600 to 1,500 Guests',
    pricePerPlate: 4500,
    baseVenueFee: 750000,
    estimatedTotal: '₹38.0 – 65.0 Lakhs',
    waxSealColor: '#0C1929',
    features: {
      duration: '48-Hour Complete Buyout of all 5.2 acres & all 5 architectural spaces',
      catering: 'Artisanal Presidential Menu curated by celebrity chefs (Unlimited live counters)',
      decoration: 'Master European floral scenography, hanging glasshouse chandeliers & drone light show',
      seating: 'Custom luxury upholstery, designer French cane furniture & royal elevated seating',
      parking: 'VIP chauffeured valet for 350+ cars, vintage car bridal entry & helicopter tarmac liaison',
      bridalSuite: 'Full weekend private villa buyout with 24/7 personal butler and spa therapist',
      soundLighting: 'Arena-grade d&b audiotechnik touring sound & concert-grade moving head lighting rigs',
      extraServices: [
        'Full executive event operations team of 15 senior captains',
        'Curated luxury firework or drone spectacle',
        'Pre-wedding drone and cinematic venue shoot access',
        'Custom luggage handling & destination guest check-in concierge'
      ]
    }
  }
];

export const INITIAL_FOLLOW_UPS: FollowUp[] = [
  {
    id: 'fu-1',
    leadId: 'lead-101',
    clientName: 'Dr. Siddharth Rao',
    phone: '+91 98401 22891',
    dueDate: '2026-08-19', // Today
    dueTime: '15:00',
    notes: 'Confirm arrival time for Saturday golden hour walk-through with wedding planner.',
    status: 'pending',
    assignedStaff: 'Vikram Sundaram',
    createdAt: '2026-08-15'
  },
  {
    id: 'fu-2',
    leadId: 'lead-105',
    clientName: 'Kavitha Sundar',
    phone: '+91 97910 33490',
    dueDate: '2026-08-19', // Today
    dueTime: '16:30',
    notes: 'Call back regarding Sangeet space layout for Nov 14 and send Glasshouse 3D deck.',
    status: 'pending',
    assignedStaff: 'Pooja Iyer',
    createdAt: '2026-08-18'
  },
  {
    id: 'fu-3',
    leadId: 'lead-106',
    clientName: 'Rohit Chandrasekaran',
    phone: '+91 98840 55123',
    dueDate: '2026-08-18', // Overdue
    dueTime: '11:00',
    notes: 'Follow up on lookbook sent for Feb 2027 dawn muhurtham at water amphitheatre.',
    status: 'pending',
    assignedStaff: 'Vikram Sundaram',
    createdAt: '2026-08-16'
  },
  {
    id: 'fu-4',
    leadId: 'lead-102',
    clientName: 'Meera Nambiar',
    phone: '+44 7700 900341',
    dueDate: '2026-08-21', // Upcoming
    dueTime: '18:00',
    notes: 'UK Time Zone Zoom Call to review Grand Sanctuary quotation line items and live jazz options.',
    status: 'pending',
    assignedStaff: 'Pooja Iyer',
    createdAt: '2026-08-12'
  },
  {
    id: 'fu-5',
    leadId: 'lead-103',
    clientName: 'Rajesh Varadarajan',
    phone: '+91 94440 88219',
    dueDate: '2026-08-22', // Upcoming
    dueTime: '11:30',
    notes: 'Coordinate Chef Natarajan royal Chettinad menu tasting session for 6 family members.',
    status: 'pending',
    assignedStaff: 'Vikram Sundaram',
    createdAt: '2026-08-16'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    clientName: 'Dr. Siddharth Rao',
    partnerName: 'Ananya Krishnan',
    email: 'siddharth.rao@gmail.com',
    phone: '+91 98401 22891',
    eventType: 'wedding',
    eventDate: '2026-11-28',
    alternateDate: '2026-12-05',
    guestCount: 650,
    budgetRange: '₹25 - 35 Lakhs',
    status: 'visit_scheduled',
    assignedStaff: 'Vikram Sundaram',
    preferredSpaces: ['The Banyan Grand Lawn', 'The Frangipani Water Amphitheatre'],
    packageInterest: 'signature',
    source: 'Luxury Planner',
    createdAt: '2026-08-14',
    visitDate: '2026-08-22',
    visitSlot: 'Sunset Golden Hour (16:30 - 18:00)',
    nextFollowUpDate: '2026-08-19',
    nextFollowUpTime: '15:00',
    nextFollowUpNotes: 'Confirm arrival time for Saturday golden hour walk-through.',
    notes: [
      {
        id: 'n-1',
        author: 'Vikram Sundaram',
        timestamp: '2026-08-14 11:30 AM',
        content: 'Spoke with Dr. Siddharth. Looking for traditional Vedic morning muhurtham at water amphitheatre followed by evening reception on the banyan lawn. Strongly interested in organic floral decor.',
        type: 'call'
      },
      {
        id: 'n-2',
        author: 'Vikram Sundaram',
        timestamp: '2026-08-15 03:15 PM',
        content: 'Confirmed venue walk-through for Saturday Aug 22 during golden hour. Couple will be accompanied by parents and wedding planner (The Vow Atelier).',
        type: 'visit'
      }
    ],
    internalNotes: [
      '[Aug 14 - Vikram] Father is senior cardiologist in Chennai. Very particular about valet capacity and uninterrupted generator backup.',
      '[Aug 15 - Vikram] Reserved bridal suite tour for the mother of the bride.'
    ],
    communications: [
      {
        id: 'comm-1',
        channel: 'whatsapp',
        templateType: 'visit_confirm',
        recipient: '+91 98401 22891',
        recipientName: 'Dr. Siddharth Rao',
        message: 'Dear Dr. Siddharth, your private Golden Hour Sanctuary Tour at The Arboretum @ ECR is confirmed for Saturday, Aug 22 at 4:30 PM. Our Senior Director Vikram Sundaram will receive you at the Grand Gate.',
        timestamp: '2026-08-15 03:20 PM',
        status: 'read'
      }
    ]
  },
  {
    id: 'lead-102',
    clientName: 'Meera Nambiar',
    partnerName: 'Arjun Swaminathan',
    email: 'meera.nambiar@londonlaw.co.uk',
    phone: '+44 7700 900341',
    eventType: 'wedding',
    eventDate: '2026-12-18',
    guestCount: 400,
    budgetRange: '₹35 - 50 Lakhs',
    status: 'quotation_sent',
    assignedStaff: 'Pooja Iyer',
    preferredSpaces: ['The Glasshouse Conservatory', 'The Banyan Grand Lawn'],
    packageInterest: 'grand',
    source: 'Instagram',
    createdAt: '2026-08-10',
    quotationAmount: 4366000,
    nextFollowUpDate: '2026-08-21',
    nextFollowUpTime: '18:00',
    nextFollowUpNotes: 'UK Time Zone Zoom Call to review Grand Sanctuary proposal.',
    notes: [
      {
        id: 'n-3',
        author: 'Pooja Iyer',
        timestamp: '2026-08-11 06:00 PM',
        content: 'NRIs based in London. Want destination celebration on ECR. Sent customized Grand Sanctuary Quotation with European floral styling and live jazz band options.',
        type: 'email'
      }
    ],
    internalNotes: [
      '[Aug 11 - Pooja] Bride requested bespoke cocktail mixology with imported single malts.',
      '[Aug 12 - Pooja] Official Proposal ARB/QT/2026/088 sent via email and WhatsApp with 14-day date lock.'
    ],
    communications: [
      {
        id: 'comm-2',
        channel: 'whatsapp',
        templateType: 'quote_ready',
        recipient: '+44 7700 900341',
        recipientName: 'Meera Nambiar',
        message: 'Dear Meera, your bespoke proposal for The Grand Sanctuary Buyout on Dec 18, 2026 (Ref: ARB/QT/2026/088) is ready for review. Total outlay: ₹43.66 Lakhs with 40% reservation advance.',
        timestamp: '2026-08-12 04:10 PM',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'lead-103',
    clientName: 'Rajesh & Malini Varadarajan',
    partnerName: 'Karthik Varadarajan',
    email: 'rajesh.v@varadaindustries.com',
    phone: '+91 94440 88219',
    eventType: 'reception',
    eventDate: '2027-01-24',
    guestCount: 850,
    budgetRange: '₹30 - 45 Lakhs',
    status: 'negotiation',
    assignedStaff: 'Vikram Sundaram',
    preferredSpaces: ['The Banyan Grand Lawn', 'The Coastal Orchard Pavilion'],
    packageInterest: 'signature',
    source: 'Word of Mouth',
    createdAt: '2026-08-04',
    quotationAmount: 2950000,
    nextFollowUpDate: '2026-08-22',
    nextFollowUpTime: '11:30',
    nextFollowUpNotes: 'Coordinate Chef Natarajan royal Chettinad menu tasting session.',
    notes: [
      {
        id: 'n-4',
        author: 'Vikram Sundaram',
        timestamp: '2026-08-16 04:45 PM',
        content: 'Clients visited on Aug 12. Loved the canopy lighting. In discussion regarding adding 150 extra guests and custom Chettinad royal feast menu from Chef Natarajan.',
        type: 'note'
      }
    ],
    internalNotes: [
      '[Aug 16 - Vikram] Family approved base package of ₹29.5 Lakhs. Adding dessert live counter module.'
    ]
  },
  {
    id: 'lead-104',
    clientName: 'Titan Luxury Watches (Sanjay Chawla)',
    email: 'schawla@titan.co.in',
    phone: '+91 98200 45120',
    eventType: 'corporate',
    eventDate: '2026-10-15',
    guestCount: 220,
    budgetRange: '₹12 - 18 Lakhs',
    status: 'confirmed',
    assignedStaff: 'Pooja Iyer',
    preferredSpaces: ['The Glasshouse Conservatory'],
    packageInterest: 'signature',
    source: 'Website',
    createdAt: '2026-07-28',
    quotationAmount: 1450000,
    notes: [
      {
        id: 'n-5',
        author: 'Pooja Iyer',
        timestamp: '2026-08-01 02:00 PM',
        content: 'Contract signed and 40% initial deposit received. Product launch for luxury chronographs.',
        type: 'payment'
      }
    ],
    internalNotes: [
      '[Aug 01 - Pooja] Booking confirmed as ARB-2026-BK501. 4K LED projection wall in Glasshouse approved.'
    ]
  },
  {
    id: 'lead-105',
    clientName: 'Kavitha Sundar',
    partnerName: 'Prashanth Reddy',
    email: 'kavitha.sundar@gmail.com',
    phone: '+91 97910 33490',
    eventType: 'pre_wedding',
    eventDate: '2026-11-14',
    guestCount: 300,
    budgetRange: '₹8 - 12 Lakhs',
    status: 'new',
    assignedStaff: 'Pooja Iyer',
    preferredSpaces: ['The Glasshouse Conservatory', 'The Coastal Orchard Pavilion'],
    packageInterest: 'essential',
    source: 'Instagram',
    createdAt: '2026-08-18',
    nextFollowUpDate: '2026-08-19',
    nextFollowUpTime: '16:30',
    nextFollowUpNotes: 'Call back regarding Sangeet space layout for Nov 14.',
    notes: [
      {
        id: 'n-6',
        author: 'System',
        timestamp: '2026-08-18 10:15 AM',
        content: 'New enquiry submitted via Website Experience. Interested in Sangeet & Cocktail Soiree on Nov 14.',
        type: 'note'
      }
    ],
    internalNotes: [
      '[Aug 18 - Pooja] Bride prefers botanical acoustic vibe with gin bar.'
    ]
  },
  {
    id: 'lead-106',
    clientName: 'Rohit Chandrasekaran',
    partnerName: 'Divya Menaka',
    email: 'rohit.c@chandrasekaran.org',
    phone: '+91 98840 55123',
    eventType: 'wedding',
    eventDate: '2027-02-06',
    guestCount: 500,
    budgetRange: '₹20 - 30 Lakhs',
    status: 'contacted',
    assignedStaff: 'Vikram Sundaram',
    preferredSpaces: ['The Banyan Grand Lawn', 'The Frangipani Water Amphitheatre'],
    packageInterest: 'signature',
    source: 'ECR Walk-in',
    createdAt: '2026-08-16',
    nextFollowUpDate: '2026-08-18',
    nextFollowUpTime: '11:00',
    nextFollowUpNotes: 'Follow up on lookbook sent for Feb 2027 dawn muhurtham.',
    notes: [
      {
        id: 'n-7',
        author: 'Vikram Sundaram',
        timestamp: '2026-08-17 11:00 AM',
        content: 'Initial discovery call completed. Divya loves the water amphitheatre for dawn muhurtham. Sent venue lookbook and package brochure.',
        type: 'call'
      }
    ],
    internalNotes: [
      '[Aug 17 - Vikram] Overdue follow-up for Feb 6 auspicious window confirmation.'
    ]
  }
];

export const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 'quote-2026-088',
    quotationNumber: 'ARB/QT/2026/088',
    leadId: 'lead-102',
    clientName: 'Meera Nambiar & Arjun Swaminathan',
    partnerName: 'Arjun Swaminathan',
    email: 'meera.nambiar@londonlaw.co.uk',
    phone: '+44 7700 900341',
    eventType: 'wedding',
    eventDate: '2026-12-18',
    spaces: ['The Banyan Grand Lawn', 'The Glasshouse Conservatory', 'The Verandah Suite & Groom’s Den'],
    packageTier: 'grand',
    guestCount: 400,
    items: [
      {
        name: 'The Arboretum Estate Full Exclusive Buyout',
        category: 'venue',
        description: '24-hour exclusive access to all 5.2 botanical acres, Banyan Lawn & Glasshouse',
        unitPrice: 850000,
        quantity: 1,
        total: 850000
      },
      {
        name: 'Royal Heritage Gourmet Catering (Per Guest)',
        category: 'catering',
        description: 'Curated 7-course live banquet with artisanal coastal seafood, live grills & French desserts',
        unitPrice: 4200,
        quantity: 400,
        total: 1680000
      },
      {
        name: 'Bespoke Haute Botanical Decor & Canopy Illumination',
        category: 'decor',
        description: '12,000 Dutch orchids, brass bell mandap, starlight lawn canopy & glasshouse floral ceiling',
        unitPrice: 750000,
        quantity: 1,
        total: 750000
      },
      {
        name: 'd&b audiotechnik Concert Sound & Ambient Tree Wash',
        category: 'production',
        description: 'Multi-zone acoustic calibration, intelligent DMX warm pinspots & acoustic monitoring',
        unitPrice: 220000,
        quantity: 1,
        total: 220000
      },
      {
        name: 'Hospitality Concierge, Valet Team & Golf Buggy Shuttles',
        category: 'hospitality',
        description: '10 English/Tamil speaking hostesses, 12 valet drivers & 4 golf carts',
        unitPrice: 150000,
        quantity: 1,
        total: 150000
      },
      {
        name: 'Private Luxury Bridal Suite Plunge Pool & Groom Den',
        category: 'venue',
        description: 'Overnight luxury stay with all-day private chef service and champagne breakfast',
        unitPrice: 120000,
        quantity: 1,
        total: 120000
      },
      {
        name: 'Welcome Classical Sitar & Flute Ensemble during Sunset Pheras',
        category: 'custom',
        description: 'Master musicians from Kalakshetra foundation',
        unitPrice: 80000,
        quantity: 1,
        total: 80000
      }
    ],
    subtotal: 3850000,
    discountAmount: 150000,
    taxAmount: 666000,
    totalAmount: 4366000,
    advanceDeposit: 1746400, // 40%
    status: 'sent',
    validUntil: '2026-09-05',
    createdAt: '2026-08-12',
    preparedBy: 'Vikram Sundaram (Director of Celebrations)',
    specialTerms: 'Complimentary morning champagne breakfast in Bridal Villa included. Noise ordinance requires acoustic shift to Glasshouse by 23:30.'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    bookingId: 'book-501',
    bookingRef: 'ARB-2026-BK501',
    amount: 580000,
    date: '2026-08-01',
    paymentMethod: 'NEFT / RTGS',
    referenceNumber: 'HDFC884192044',
    notes: 'Initial 40% statutory reservation deposit received.',
    recordedBy: 'Pooja Iyer',
    paymentType: 'advance_40'
  },
  {
    id: 'pay-2',
    bookingId: 'book-502',
    bookingRef: 'ARB-2026-BK502',
    amount: 1680000,
    date: '2026-07-15',
    paymentMethod: 'NEFT / RTGS',
    referenceNumber: 'ICIC993214051',
    notes: 'Initial 40% reservation advance deposit.',
    recordedBy: 'Vikram Sundaram',
    paymentType: 'advance_40'
  },
  {
    id: 'pay-3',
    bookingId: 'book-502',
    bookingRef: 'ARB-2026-BK502',
    amount: 420000,
    date: '2026-08-10',
    paymentMethod: 'Credit / Debit Card',
    referenceNumber: 'CARD-AUTH-77312',
    notes: 'Stage 2 floral moodboard milestone deposit.',
    recordedBy: 'Vikram Sundaram',
    paymentType: 'milestone_installment'
  },
  {
    id: 'pay-4',
    bookingId: 'book-503',
    bookingRef: 'ARB-2026-BK503',
    amount: 1060000,
    date: '2026-06-20',
    paymentMethod: 'Bank Wire',
    referenceNumber: 'SBIN0049219',
    notes: '40% advance booking deposit.',
    recordedBy: 'Pooja Iyer',
    paymentType: 'advance_40'
  },
  {
    id: 'pay-5',
    bookingId: 'book-503',
    bookingRef: 'ARB-2026-BK503',
    amount: 1590000,
    date: '2026-08-08',
    paymentMethod: 'NEFT / RTGS',
    referenceNumber: 'KOTAK109244',
    notes: 'Final 60% balance settlement post tasting approval.',
    recordedBy: 'Pooja Iyer',
    paymentType: 'final_settlement'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-501',
    bookingRef: 'ARB-2026-BK501',
    leadId: 'lead-104',
    clientName: 'Titan Luxury Watches (Attn: Sanjay Chawla)',
    email: 'schawla@titan.co.in',
    phone: '+91 98200 45120',
    eventType: 'corporate',
    eventTitle: 'Titan Edge Luxury Timepiece Global Reveal',
    eventDate: '2026-10-15',
    timingSlot: 'Evening (16:00 - 23:30)',
    assignedSpaces: ['The Glasshouse Conservatory', 'The Coastal Orchard Pavilion'],
    guestCount: 220,
    packageTier: 'The Signature Canopy',
    totalAmount: 1450000,
    advanceRequired: 580000, // 40%
    depositPaid: 580000,
    balanceDue: 870000,
    paymentStatus: 'advance_paid',
    operationalStatus: 'in_preparation',
    status: 'confirmed',
    banquetManager: 'Ramesh K. (Banquet Head)',
    paymentHistory: [INITIAL_PAYMENTS[0]],
    timelineNotes: [
      '2026-08-01: 40% Advance (₹5.80L) received via NEFT.',
      '2026-08-10: Technical 4K LED projection wall rigging confirmed with Glasshouse engineering.'
    ],
    operations: {
      bookingId: 'book-501',
      eventTitle: 'Titan Edge Luxury Timepiece Global Reveal',
      eventDate: '2026-10-15',
      operationalStatus: 'in_preparation',
      staffAssignments: {
        eventManager: 'Pooja Iyer (Senior Director)',
        decorTeam: 'Botanical Scenography ECR',
        cateringTeam: 'Coastal Flavours Collective (Live Grills)',
        soundLightingTeam: 'L-Acoustics Concert Audio & Intelligent Illumination',
        guestRelations: 'Arboretum VIP Hospitality Team'
      },
      specialRequirements: [
        'Heavy 4K LED wall inside Glasshouse with silent cooling',
        'VIP chauffeur holding bay in north pavilion',
        'Strict high-security product preview green room in Bridal Suite'
      ],
      timeline: [
        { id: 't-1', time: '12:00 PM', activity: 'Glasshouse AV Rigging & Laser Calibration', owner: 'Production Team', completed: true },
        { id: 't-2', time: '03:30 PM', activity: 'Executive Stage Lighting & Mic Rehearsal', owner: 'Sound Lead', completed: true },
        { id: 't-3', time: '05:30 PM', activity: 'VIP Arrival & Red Carpet Champagne Welcome', owner: 'Guest Relations', completed: false },
        { id: 't-4', time: '07:00 PM', activity: 'Global Timepiece Unveiling & Keynote Presentation', owner: 'Titan Host', completed: false },
        { id: 't-5', time: '08:30 PM', activity: 'Gourmet Orchard Dining & Live Jazz Gala', owner: 'Catering Lead', completed: false }
      ],
      checklists: [
        { id: 'c-1', item: 'HVAC chilled to constant 20°C in Conservatory', team: 'manager', done: true },
        { id: 'c-2', item: '4K Projection LED Wall tested and color-calibrated', team: 'production', done: true },
        { id: 'c-3', item: 'Champagne Flutes & Wine Sommelier Station Setup', team: 'catering', done: false },
        { id: 'c-4', item: 'VIP Security Lanyards and Badge Printing Station', team: 'hospitality', done: true },
        { id: 'c-5', item: 'Dual Silent DG Generators running in warm standby', team: 'manager', done: true }
      ],
      internalNotes: [
        'Watch ambassadors arriving via private helicopter to ECR helipad at 17:00.'
      ]
    }
  },
  {
    id: 'book-502',
    bookingRef: 'ARB-2026-BK502',
    clientName: 'Adv. Harish & Priya Natarajan',
    partnerName: 'Priya Natarajan',
    email: 'harish.law@natarajan.com',
    phone: '+91 98410 77610',
    eventType: 'wedding',
    eventTitle: 'The Natarajan-Raghavan Sacred Wedding Celebration',
    eventDate: '2026-11-08',
    timingSlot: 'Full Day (07:00 - 23:30)',
    assignedSpaces: ['The Banyan Grand Lawn', 'The Frangipani Water Amphitheatre', 'The Coastal Orchard Pavilion', 'The Verandah Suite & Groom’s Den'],
    guestCount: 750,
    packageTier: 'The Grand Sanctuary Buyout',
    totalAmount: 4200000,
    advanceRequired: 1680000, // 40%
    depositPaid: 2100000,
    balanceDue: 2100000,
    paymentStatus: 'partially_paid',
    operationalStatus: 'ready',
    status: 'confirmed',
    banquetManager: 'Vikram Sundaram (Director of Celebrations)',
    paymentHistory: [INITIAL_PAYMENTS[1], INITIAL_PAYMENTS[2]],
    timelineNotes: [
      '2026-07-15: 40% Advance Deposit (₹16.80L) received via NEFT.',
      '2026-08-10: Stage 2 Floral milestone payment (₹4.20L) received.',
      '2026-08-14: Priest confirmed Muhurtham time as 07:15 AM sharp.'
    ],
    operations: {
      bookingId: 'book-502',
      eventTitle: 'The Natarajan-Raghavan Sacred Wedding Celebration',
      eventDate: '2026-11-08',
      operationalStatus: 'ready',
      staffAssignments: {
        eventManager: 'Vikram Sundaram (Senior Director)',
        decorTeam: 'DreamWeavers Haute Florals (12,000 Dutch Orchids)',
        cateringTeam: 'Royal Heritage Banqueting (Chef Natarajan)',
        soundLightingTeam: 'L-Acoustics Concert Audio & Architectural Canopy Wash',
        guestRelations: 'Senior Hostess Team (12 Hostesses + 4 Buggies)'
      },
      specialRequirements: [
        'Vedic fire pit (homam) on floating stone amphitheatre platform',
        'Traditional nadaswaram maestro ensemble from Madurai',
        '4-course traditional banana leaf breakfast followed by evening 7-course buffet'
      ],
      timeline: [
        { id: 't-6', time: '05:30 AM', activity: 'Temple Bell & Nadaswaram Mangala Isai at Water Amphitheatre', owner: 'Priest & Musicians', completed: true },
        { id: 't-7', time: '07:15 AM', activity: 'Sacred Muhurtham & Mangalasutra Kettu', owner: 'Event Manager', completed: true },
        { id: 't-8', time: '08:45 AM', activity: 'Traditional Banana Leaf Breakfast at Orchard Pavilion', owner: 'Catering Lead', completed: true },
        { id: 't-9', time: '05:30 PM', activity: 'Royal Red Carpet Evening Reception on Banyan Lawn', owner: 'Decor & Hospitality', completed: true },
        { id: 't-10', time: '07:30 PM', activity: 'Live Orchestral Concert & 4,000 Canopy Light Illumination', owner: 'Sound Lead', completed: false }
      ],
      checklists: [
        { id: 'c-6', item: 'Fresh temple lotus and tuberoses placed on floating pools', team: 'decor', done: true },
        { id: 'c-7', item: 'Banana leaf table setup and brass tumblers aligned', team: 'catering', done: true },
        { id: 'c-8', item: 'Bridal Suite vanity lighting checked with makeup artist', team: 'hospitality', done: true },
        { id: 'c-9', item: 'Canopy starlight controllers verified for 18:00 switch-on', team: 'production', done: true },
        { id: 'c-10', item: 'Emergency doctor on-site and first-aid medical bay active', team: 'manager', done: true }
      ],
      internalNotes: [
        'VIP Ministers arriving at 18:30 for reception blessings. Dedicated security corridor reserved.'
      ]
    }
  },
  {
    id: 'book-503',
    bookingRef: 'ARB-2026-BK503',
    clientName: 'Gautam & Roshni Singhania',
    partnerName: 'Roshni Singhania',
    email: 'gautam.singhania@apexcapital.in',
    phone: '+91 99400 12890',
    eventType: 'reception',
    eventTitle: 'Roshni & Gautam Emerald Reception Gala',
    eventDate: '2026-12-04',
    timingSlot: 'Evening (16:00 - 23:30)',
    assignedSpaces: ['The Banyan Grand Lawn', 'The Glasshouse Conservatory'],
    guestCount: 600,
    packageTier: 'The Signature Canopy',
    totalAmount: 2650000,
    advanceRequired: 1060000, // 40%
    depositPaid: 2650000,
    balanceDue: 0,
    paymentStatus: 'fully_paid',
    operationalStatus: 'ready',
    status: 'confirmed',
    banquetManager: 'Pooja Iyer (Client Relations Lead)',
    paymentHistory: [INITIAL_PAYMENTS[3], INITIAL_PAYMENTS[4]],
    timelineNotes: [
      '2026-06-20: 40% Advance Booking Deposit (₹10.60L) received.',
      '2026-08-08: Full remaining balance (₹15.90L) settled in full via NEFT post tasting approval.'
    ],
    operations: {
      bookingId: 'book-503',
      eventTitle: 'Roshni & Gautam Emerald Reception Gala',
      eventDate: '2026-12-04',
      operationalStatus: 'ready',
      staffAssignments: {
        eventManager: 'Pooja Iyer',
        decorTeam: 'Botanical Scenography ECR',
        cateringTeam: 'Royal Heritage Banqueting',
        soundLightingTeam: 'L-Acoustics Concert Audio',
        guestRelations: 'Arboretum VIP Hospitality Team'
      },
      specialRequirements: [
        'Full acoustic transition from Lawn to Glasshouse at 23:30 for afterparty'
      ],
      timeline: [
        { id: 't-11', time: '04:00 PM', activity: 'Final Floral Scenography & Sound Check', owner: 'Pooja Iyer', completed: true },
        { id: 't-12', time: '06:30 PM', activity: 'Cocktail Gala & Live String Quartet', owner: 'Guest Relations', completed: false }
      ],
      checklists: [
        { id: 'c-11', item: 'Full payment receipt and tax invoice dispatched', team: 'manager', done: true },
        { id: 'c-12', item: 'Tasting session menu items locked and sent to executive chef', team: 'catering', done: true }
      ],
      internalNotes: [
        '100% paid in full. No payment follow-up needed.'
      ]
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    couple: 'Ananya & Siddharth',
    eventDate: 'February 2026',
    celebrationType: '3-Day Destination Wedding',
    quote: 'Walking down the illuminated banyan tree aisle with our family felt like an absolute reverie. Our guests from New York and Chennai still talk about the glasshouse dining and the starlight canopy.',
    location: 'Chennai & San Francisco',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    highlight: '720 Guests · Full Estate Buyout'
  },
  {
    id: 't-2',
    couple: 'Preethi & Vikramaditya',
    eventDate: 'January 2026',
    celebrationType: 'Vedic Muhurtham & Sunset Pheras',
    quote: 'The water amphitheatre at dawn is spiritual in a way no hotel banquet hall could ever emulate. The temple bells, lotus ponds, and coastal breeze gave our sacred vows immense grace.',
    location: 'Bangalore & Pondicherry',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    highlight: '450 Guests · Water Amphitheatre'
  },
  {
    id: 't-3',
    couple: 'Zoya & Kabir',
    eventDate: 'December 2025',
    celebrationType: 'Black Tie Cocktail & Sangeet Soirée',
    quote: 'We wanted European conservatory romance mixed with lively coastal warmth. The Arboretum delivered a cinematic experience beyond our wildest dreams. Seamless management from start to finish.',
    location: 'Mumbai & London',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    highlight: '380 Guests · Glasshouse & Pavilion'
  }
];

export const EDITORIAL_GALLERY = [
  {
    id: 'g-1',
    title: 'Golden Hour Vows at the Water Sanctuary',
    category: 'Ceremony',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sun filtering through frangipani blossoms as vows are exchanged over reflecting lotus ponds.'
  },
  {
    id: 'g-2',
    title: 'The Glasshouse Under Starlight',
    category: 'Architecture',
    aspect: 'wide',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    caption: 'Warm amber brass chandeliers casting romantic glow through 24-foot glass facades.'
  },
  {
    id: 'g-3',
    title: 'Artisanal Botanical Scenography',
    category: 'Florals',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    caption: 'Local jasmine, tuberoses, and imported garden roses arranged by our floral masters.'
  },
  {
    id: 'g-4',
    title: 'The Starlit Banyan Canopy Banquet',
    category: 'Receptions',
    aspect: 'wide',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    caption: '42,000 sq.ft. of open-air celebration lit by over 4,000 handcrafted fairy lights.'
  },
  {
    id: 'g-5',
    title: 'Bridal Villa Preparation Moments',
    category: 'Human Moments',
    aspect: 'tall',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Serene moments of quiet anticipation in the private verandah suite courtyard.'
  },
  {
    id: 'g-6',
    title: 'Coastal Orchard Culinary Plating',
    category: 'Culinary',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    caption: 'Chef-crafted regional specialties served on hand-beaten brassware.'
  }
];

export const INITIAL_AVAILABILITY: Record<string, AvailabilitySlot> = {
  '2026-10-15': { date: '2026-10-15', status: 'booked', eventTitle: 'Titan Luxury Timepiece Reveal', guestCount: 220 },
  '2026-10-24': { date: '2026-10-24', status: 'enquiry', eventTitle: 'Mehta Sangeet Night', guestCount: 350 },
  '2026-11-08': { date: '2026-11-08', status: 'booked', eventTitle: 'Natarajan-Raghavan Sacred Wedding', guestCount: 750 },
  '2026-11-14': { date: '2026-11-14', status: 'enquiry', eventTitle: 'Kavitha & Prashanth Sangeet', guestCount: 300 },
  '2026-11-28': { date: '2026-11-28', status: 'enquiry', eventTitle: 'Rao-Krishnan Vedic Wedding', guestCount: 650 },
  '2026-12-04': { date: '2026-12-04', status: 'booked', eventTitle: 'Roshni & Gautam Emerald Reception', guestCount: 600 },
  '2026-12-18': { date: '2026-12-18', status: 'enquiry', eventTitle: 'Nambiar-Swaminathan Destination Wedding', guestCount: 400 },
  '2026-12-31': { date: '2026-12-31', status: 'booked', eventTitle: 'New Year Eve Botanical Gala', guestCount: 500 },
  '2027-01-14': { date: '2027-01-14', status: 'booked', eventTitle: 'Pongal Royal Heritage Celebration', guestCount: 400 },
  '2027-01-24': { date: '2027-01-24', status: 'enquiry', eventTitle: 'Varadarajan Reception', guestCount: 850 }
};

export const AUSPICIOUS_DATES_2026 = [
  '2026-10-24', '2026-10-28', '2026-11-08', '2026-11-14', '2026-11-21', '2026-11-28',
  '2026-12-04', '2026-12-10', '2026-12-18', '2026-12-24', '2027-01-14', '2027-01-24',
  '2027-02-06', '2027-02-14', '2027-02-21', '2027-03-05', '2027-03-12'
];

export const CALENDAR_STATUS_DAYS: Record<string, { status: 'available' | 'enquired' | 'booked'; rateMultiplier: number; minSpend?: number; note?: string }> = {
  '2026-10-15': { status: 'booked', rateMultiplier: 1.0, note: 'Titan Luxury Reveal Reserved' },
  '2026-10-24': { status: 'enquired', rateMultiplier: 1.15, note: 'Auspicious Muhurtham — Tentative Hold (Mehta Family)' },
  '2026-11-08': { status: 'booked', rateMultiplier: 1.25, note: 'Sacred Wedding Reserved (Natarajan-Raghavan)' },
  '2026-11-14': { status: 'enquired', rateMultiplier: 1.15, note: 'Sangeet Festivities — 2 Enquiries Pending' },
  '2026-11-21': { status: 'available', rateMultiplier: 1.2, note: 'Prime Weekend Auspicious Window' },
  '2026-11-28': { status: 'enquired', rateMultiplier: 1.25, note: 'Rao-Krishnan Vedic Wedding (Visit Scheduled)' },
  '2026-12-04': { status: 'booked', rateMultiplier: 1.2, note: 'Singhania Reception Reserved' },
  '2026-12-10': { status: 'available', rateMultiplier: 1.1, note: 'Auspicious Thursday Muhurtham' },
  '2026-12-18': { status: 'enquired', rateMultiplier: 1.25, note: 'Nambiar-Swaminathan Destination Wedding' },
  '2026-12-24': { status: 'available', rateMultiplier: 1.3, note: 'Festive Season Grand Celebration Opening' },
  '2026-12-31': { status: 'booked', rateMultiplier: 1.4, note: 'New Year Botanical Gala Reserved' },
  '2027-01-14': { status: 'booked', rateMultiplier: 1.3, note: 'Pongal Harvest Royal Celebration Reserved' },
  '2027-01-24': { status: 'enquired', rateMultiplier: 1.2, note: 'Varadarajan Reception Discussion' },
  '2027-02-06': { status: 'enquired', rateMultiplier: 1.15, note: 'Chandrasekaran Wedding Enquiry' },
  '2027-02-14': { status: 'available', rateMultiplier: 1.3, note: 'Valentine Weekend High Demand Opening' },
  '2027-02-21': { status: 'available', rateMultiplier: 1.2, note: 'Auspicious Spring Muhurtham' }
};

export const SEASONS_INFO = [
  { name: 'Coastal Winter', months: 'Nov – Feb', vibe: 'Crisp evening ocean breeze, open lawns & canopy dinners', multiplier: '1.2x Peak' },
  { name: 'Spring Blossom', months: 'Mar – May', vibe: 'Frangipani blooms, radiant conservatory daylight & glasshouse receptions', multiplier: '1.0x Regular' },
  { name: 'Monsoon Reverie', months: 'Jun – Aug', vibe: 'Petrichor, rain-glazed glasshouse romance & covered pavilions', multiplier: '0.85x Special' },
  { name: 'Autumn Grandeur', months: 'Sep – Oct', vibe: 'Clear starry nights, lush greenery & temperate ceremonies', multiplier: '1.1x Prime' }
];

export const ANALYTICS_DATA = {
  monthlyMetrics: [
    { month: 'Mar', enquiries: 24, visits: 18, quotations: 14, confirmed: 5, revenue: 68 },
    { month: 'Apr', enquiries: 28, visits: 22, quotations: 19, confirmed: 7, revenue: 94 },
    { month: 'May', enquiries: 35, visits: 26, quotations: 21, confirmed: 8, revenue: 112 },
    { month: 'Jun', enquiries: 31, visits: 23, quotations: 18, confirmed: 6, revenue: 86 },
    { month: 'Jul', enquiries: 42, visits: 34, quotations: 29, confirmed: 11, revenue: 165 },
    { month: 'Aug', enquiries: 48, visits: 38, quotations: 32, confirmed: 14, revenue: 210 }
  ],
  eventBreakdown: [
    { type: 'Weddings & Muhurtham', percentage: 48, count: 28, revenueLakhs: 420 },
    { type: 'Grand Receptions', percentage: 24, count: 14, revenueLakhs: 215 },
    { type: 'Sangeet & Pre-Wedding', percentage: 14, count: 8, revenueLakhs: 98 },
    { type: 'Corporate & Brand Galas', percentage: 9, count: 5, revenueLakhs: 65 },
    { type: 'Private Anniversaries', percentage: 5, count: 3, revenueLakhs: 32 }
  ],
  packageDistribution: [
    { name: 'The Signature Canopy', share: 52, avgTicket: '₹22.5 L' },
    { name: 'The Grand Sanctuary', share: 31, avgTicket: '₹42.0 L' },
    { name: 'The Essential Arboretum', share: 17, avgTicket: '₹10.5 L' }
  ],
  sources: [
    { source: 'Luxury Wedding Planners', share: 38 },
    { source: 'Instagram / Visual Media', share: 29 },
    { source: 'Direct Website Experience', share: 21 },
    { source: 'Word of Mouth & Guests', share: 12 }
  ]
};
