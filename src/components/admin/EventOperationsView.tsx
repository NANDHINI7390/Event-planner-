import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ChefHat, 
  Flower2, 
  Volume2, 
  HeartHandshake, 
  CheckSquare, 
  Square,
  MessageSquare,
  FileText,
  AlertCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking, OperationalStatus, EventOperations, OperationalChecklistItem, OperationalTimelineItem } from '../../types';

export const EventOperationsView: React.FC = () => {
  const { 
    bookings, 
    updateEventOperations, 
    updateOperationalStatus, 
    openCommunicationModal,
    userRole 
  } = useApp();

  // Active selected booking for operations
  const [selectedBookingId, setSelectedBookingId] = useState<string>(() => {
    return bookings[0]?.id || '';
  });

  const [newTimelineTime, setNewTimelineTime] = useState('');
  const [newTimelineActivity, setNewTimelineActivity] = useState('');
  const [newTimelineOwner, setNewTimelineOwner] = useState('Event Manager');

  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [newChecklistTeam, setNewChecklistTeam] = useState<OperationalChecklistItem['team']>('manager');

  const activeBooking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  if (!activeBooking) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 shadow-sm">
        <p className="text-stone-700 font-medium">No confirmed bookings currently in the operations pipeline.</p>
      </div>
    );
  }

  // Ensure operations object exists
  const operations: EventOperations = activeBooking.operations || {
    bookingId: activeBooking.id,
    eventTitle: activeBooking.eventTitle,
    eventDate: activeBooking.eventDate,
    operationalStatus: activeBooking.operationalStatus || 'planning',
    staffAssignments: {
      eventManager: activeBooking.banquetManager || 'Vikram Sundaram (Senior Director)',
      decorTeam: 'DreamWeavers Haute Florals',
      cateringTeam: 'Royal Heritage Banqueting',
      soundLightingTeam: 'L-Acoustics Concert Audio & Intelligent Illumination',
      guestRelations: 'Arboretum VIP Hospitality Team'
    },
    specialRequirements: [
      'Dual silent DG power backup on standby',
      'VIP private villa preparation and welcome drinks'
    ],
    timeline: [
      { id: 't-1', time: '08:00 AM', activity: 'Vendor Load-in & Power Checks', owner: 'Operations Lead', completed: true },
      { id: 't-2', time: '02:00 PM', activity: 'Floral & Canopy Illumination Check', owner: 'Decor Team', completed: false },
      { id: 't-3', time: '05:30 PM', activity: 'Guest Reception & Live Banqueting', owner: 'Guest Relations', completed: false }
    ],
    checklists: [
      { id: 'c-1', item: 'Auspicious date locked on estate registry', team: 'manager', done: true },
      { id: 'c-2', item: '40% advance deposit verified', team: 'manager', done: true },
      { id: 'c-3', item: 'Chef tasting session confirmed', team: 'catering', done: false }
    ],
    internalNotes: []
  };

  const handleStaffChange = (roleKey: keyof EventOperations['staffAssignments'], value: string) => {
    const updated: EventOperations = {
      ...operations,
      staffAssignments: {
        ...operations.staffAssignments,
        [roleKey]: value
      }
    };
    updateEventOperations(activeBooking.id, updated);
  };

  const handleStatusChange = (newStatus: OperationalStatus) => {
    updateOperationalStatus(activeBooking.id, newStatus);
  };

  const toggleTimelineItem = (timelineId: string) => {
    const updatedTimeline = operations.timeline.map(t => 
      t.id === timelineId ? { ...t, completed: !t.completed } : t
    );
    updateEventOperations(activeBooking.id, {
      ...operations,
      timeline: updatedTimeline
    });
  };

  const handleAddTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimelineTime || !newTimelineActivity) return;

    const newItem: OperationalTimelineItem = {
      id: `t-${Date.now()}`,
      time: newTimelineTime,
      activity: newTimelineActivity,
      owner: newTimelineOwner,
      completed: false
    };

    updateEventOperations(activeBooking.id, {
      ...operations,
      timeline: [...operations.timeline, newItem]
    });

    setNewTimelineTime('');
    setNewTimelineActivity('');
  };

  const toggleChecklistItem = (checklistId: string) => {
    const updatedChecklists = operations.checklists.map(c => 
      c.id === checklistId ? { ...c, done: !c.done } : c
    );
    updateEventOperations(activeBooking.id, {
      ...operations,
      checklists: updatedChecklists
    });
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistItem) return;

    const newItem: OperationalChecklistItem = {
      id: `c-${Date.now()}`,
      item: newChecklistItem,
      team: newChecklistTeam,
      done: false
    };

    updateEventOperations(activeBooking.id, {
      ...operations,
      checklists: [...operations.checklists, newItem]
    });

    setNewChecklistItem('');
  };

  const handleTransmitBriefing = () => {
    const briefText = `Namaste ${activeBooking.clientName},\n\nOfficial Event Run-Sheet & Staff Roster for your upcoming celebration (${activeBooking.bookingRef}) at The Arboretum @ ECR.\n\n📅 Date: ${activeBooking.eventDate}\n🌿 Spaces: ${(activeBooking.assignedSpaces || activeBooking.spaces || []).join(', ')}\n\n👥 Assigned Department Leads:\n• Event Director: ${operations.staffAssignments.eventManager}\n• Floral Scenography: ${operations.staffAssignments.decorTeam}\n• Executive Catering: ${operations.staffAssignments.cateringTeam}\n• Concert Audio & Illumination: ${operations.staffAssignments.soundLightingTeam}\n• VIP Guest Hospitality: ${operations.staffAssignments.guestRelations}\n\nOur full operational grid is active and in preparation for your grand day.\n\nWarm regards,\nThe Arboretum Event Directorate`;

    openCommunicationModal({
      recipientName: activeBooking.clientName,
      recipientPhone: activeBooking.phone,
      recipientEmail: activeBooking.email,
      bookingId: activeBooking.id,
      defaultTemplate: 'booking_confirm',
      customMessage: briefText
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Event Selector & Status Banner */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#9A7732]">
                Active Event Execution Grid
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C1929]">
              Staff Assignment &amp; Live Operations
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Assign departmental teams, orchestrate day-of-event timelines, and verify operational readiness.
            </p>
          </div>

          {/* Booking Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {bookings.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBookingId(b.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  b.id === activeBooking.id
                    ? 'bg-[#0C1929] text-white border-[#0C1929] shadow-md'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>{b.clientName.split(' ')[0]} ({b.eventDate.substring(5)})</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Event Card Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-700 block mb-1">Celebration &amp; Couple</span>
            <h3 className="font-serif text-base font-bold text-[#0C1929]">{activeBooking.clientName}</h3>
            <span className="text-xs text-stone-700">{activeBooking.eventTitle}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-stone-700 block mb-1">Date &amp; Reserved Spaces</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0C1929]">
              <Calendar className="w-3.5 h-3.5 text-[#9A7732]" />
              <span>{activeBooking.eventDate}</span>
            </div>
            <span className="text-[11px] text-stone-700 block truncate mt-0.5">
              {(activeBooking.assignedSpaces || activeBooking.spaces || []).join(', ')}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-stone-700 block mb-1">Scale &amp; Commercial</span>
            <span className="text-xs font-bold text-[#0C1929] block">
              {activeBooking.guestCount} Guests · {activeBooking.packageTier}
            </span>
            <span className="text-[11px] text-emerald-800 font-semibold">
              ₹{(activeBooking.depositPaid / 100000).toFixed(2)}L / ₹{(activeBooking.totalAmount / 100000).toFixed(2)}L Received
            </span>
          </div>

          {/* Operational Status Switcher */}
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-700 block mb-1">Operational Stage</span>
            <div className="flex items-center gap-1.5">
              {(['planning', 'in_preparation', 'ready', 'completed'] as OperationalStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all ${
                    operations.operationalStatus === st
                      ? st === 'completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : st === 'ready'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : st === 'in_preparation'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-[#0C1929] text-white shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Staff Assignments & Run-Sheet Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Staff Assignments & Department Rosters */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#0C1929] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0C1929]">
                Department Staff Assignments
              </h3>
            </div>
            <button
              onClick={handleTransmitBriefing}
              className="text-xs font-bold text-[#9A7732] hover:text-[#0C1929] flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Share Brief</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Event Manager */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#0C1929] mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9A7732]" />
                <span>Senior Event Director / Banquet Lead</span>
              </label>
              <select
                value={operations.staffAssignments.eventManager}
                onChange={(e) => handleStaffChange('eventManager', e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              >
                <option value="Vikram Sundaram (Director of Celebrations)">Vikram Sundaram (Director of Celebrations)</option>
                <option value="Pooja Iyer (Client Relations Lead)">Pooja Iyer (Client Relations Lead)</option>
                <option value="Ramesh K. (Executive Banquet Head)">Ramesh K. (Executive Banquet Head)</option>
                <option value="Ananya Nair (Senior Operations Lead)">Ananya Nair (Senior Operations Lead)</option>
              </select>
            </div>

            {/* Decor Team */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#0C1929] mb-1.5">
                <Flower2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Floral &amp; Scenography Team</span>
              </label>
              <select
                value={operations.staffAssignments.decorTeam}
                onChange={(e) => handleStaffChange('decorTeam', e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              >
                <option value="DreamWeavers Haute Florals (12,000 Dutch Orchids)">DreamWeavers Haute Florals (12,000 Dutch Orchids)</option>
                <option value="Botanical Scenography ECR (Organic Garden Look)">Botanical Scenography ECR (Organic Garden Look)</option>
                <option value="Vedic Mandap Sculptors (Granite &amp; Brass Temple)">Vedic Mandap Sculptors (Granite &amp; Brass Temple)</option>
                <option value="Minimalist European Glasshouse Decor">Minimalist European Glasshouse Decor</option>
              </select>
            </div>

            {/* Catering Team */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#0C1929] mb-1.5">
                <ChefHat className="w-3.5 h-3.5 text-amber-600" />
                <span>Executive Catering &amp; Banqueting Team</span>
              </label>
              <select
                value={operations.staffAssignments.cateringTeam}
                onChange={(e) => handleStaffChange('cateringTeam', e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              >
                <option value="Royal Heritage Banqueting (Chef Natarajan Chettinad)">Royal Heritage Banqueting (Chef Natarajan Chettinad)</option>
                <option value="Coastal Flavours Collective (Live Seafood &amp; Grills)">Coastal Flavours Collective (Live Seafood &amp; Grills)</option>
                <option value="Artisanal French-Indian Fusion Seated Dining">Artisanal French-Indian Fusion Seated Dining</option>
                <option value="Pure Vegetarian Satvik Master Chefs">Pure Vegetarian Satvik Master Chefs</option>
              </select>
            </div>

            {/* Sound & Lighting */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#0C1929] mb-1.5">
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Acoustic Audio &amp; Architectural Illumination</span>
              </label>
              <select
                value={operations.staffAssignments.soundLightingTeam}
                onChange={(e) => handleStaffChange('soundLightingTeam', e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              >
                <option value="L-Acoustics Concert Audio &amp; Intelligent Illumination">L-Acoustics Concert Audio &amp; Intelligent Illumination</option>
                <option value="d&amp;b audiotechnik Acoustic Touring Team">d&amp;b audiotechnik Acoustic Touring Team</option>
                <option value="Warm Starlight 4,000 Fairy Canopy Illumination">Warm Starlight 4,000 Fairy Canopy Illumination</option>
                <option value="Laser Mapping &amp; LED Projection Team">Laser Mapping &amp; LED Projection Team</option>
              </select>
            </div>

            {/* Guest Relations & Valet */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#0C1929] mb-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>VIP Concierge &amp; Valet Logistics</span>
              </label>
              <select
                value={operations.staffAssignments.guestRelations}
                onChange={(e) => handleStaffChange('guestRelations', e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              >
                <option value="Arboretum VIP Hospitality Team (12 Hostesses + 4 Buggies)">Arboretum VIP Hospitality Team (12 Hostesses + 4 Buggies)</option>
                <option value="Executive Valet Service (16 Uniformed Drivers)">Executive Valet Service (16 Uniformed Drivers)</option>
                <option value="Destination Airport Concierge &amp; Luggage Squad">Destination Airport Concierge &amp; Luggage Squad</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Operational Checklist & Event Day Timeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Readiness Checklist */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#0C1929] flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0C1929]">
                  Operational Readiness Checklists
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-stone-600">
                {operations.checklists.filter(c => c.done).length}/{operations.checklists.length} Cleared
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {operations.checklists.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl border text-left transition-all ${
                    item.done
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${item.done ? 'line-through opacity-80' : ''}`}>
                      {item.item}
                    </p>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-600">
                      Team: {item.team}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Add Checklist Form */}
            <form onSubmit={handleAddChecklist} className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                placeholder="Add departmental checklist requirement..."
                className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              />
              <select
                value={newChecklistTeam}
                onChange={(e) => setNewChecklistTeam(e.target.value as any)}
                className="px-2.5 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              >
                <option value="manager">Manager</option>
                <option value="decor">Decor</option>
                <option value="catering">Catering</option>
                <option value="production">Production</option>
                <option value="hospitality">Hospitality</option>
              </select>
              <button
                type="submit"
                disabled={!newChecklistItem}
                className="p-2 rounded-xl bg-[#0C1929] text-white hover:bg-stone-900 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Event Day Timeline Run-Sheet */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#0C1929] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0C1929]">
                  Event Run-Sheet Timeline
                </h3>
              </div>
              <span className="text-xs font-bold text-stone-600">Minute-by-Minute Orchestration</span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {operations.timeline.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => toggleTimelineItem(item.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                    item.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-[#FAF8F5] border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#9A7732] bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                      {item.time}
                    </span>
                    <div>
                      <p className={`text-xs font-semibold ${item.completed ? 'line-through opacity-80' : ''}`}>
                        {item.activity}
                      </p>
                      <span className="text-[10px] text-stone-700 font-medium">
                        Owner: {item.owner}
                      </span>
                    </div>
                  </div>
                  <div>
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Timeline Item */}
            <form onSubmit={handleAddTimeline} className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-12 gap-2">
              <input
                type="text"
                required
                value={newTimelineTime}
                onChange={(e) => setNewTimelineTime(e.target.value)}
                placeholder="Time (e.g. 06:30 PM)"
                className="sm:col-span-3 px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              />
              <input
                type="text"
                required
                value={newTimelineActivity}
                onChange={(e) => setNewTimelineActivity(e.target.value)}
                placeholder="Activity / Milestone description..."
                className="sm:col-span-5 px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              />
              <input
                type="text"
                value={newTimelineOwner}
                onChange={(e) => setNewTimelineOwner(e.target.value)}
                placeholder="Owner / Lead"
                className="sm:col-span-3 px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
              />
              <button
                type="submit"
                className="sm:col-span-1 p-2 rounded-xl bg-[#0C1929] text-white hover:bg-stone-900 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
