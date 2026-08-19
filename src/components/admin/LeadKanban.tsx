import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  FileText,
  User,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus, EventCategory } from '../../types';

interface KanbanColumnConfig {
  id: LeadStatus;
  title: string;
  badgeColor: string;
  bgColor: string;
}

const KANBAN_COLUMNS: KanbanColumnConfig[] = [
  { id: 'new', title: 'New Enquiries', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300', bgColor: 'bg-amber-50/40' },
  { id: 'contacted', title: 'Contacted', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300', bgColor: 'bg-blue-50/40' },
  { id: 'visit_scheduled', title: 'Venue Walk-Through', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300', bgColor: 'bg-purple-50/40' },
  { id: 'quotation_sent', title: 'Quotation Sent', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300', bgColor: 'bg-indigo-50/40' },
  { id: 'negotiation', title: 'Negotiation / Tasting', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300', bgColor: 'bg-rose-50/40' },
  { id: 'confirmed', title: 'Confirmed Booking', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300', bgColor: 'bg-emerald-50/40' },
  { id: 'completed', title: 'Completed Celebrations', badgeColor: 'bg-stone-200 text-stone-900 border-stone-300', bgColor: 'bg-stone-50/40' },
  { id: 'lost', title: 'Archived / Lost', badgeColor: 'bg-red-100 text-red-900 border-red-300', bgColor: 'bg-red-50/40' }
];

export const LeadKanban: React.FC<{
  onNewLeadClick: () => void;
  onLeadClick: (lead: Lead) => void;
}> = ({ onNewLeadClick, onLeadClick }) => {
  const { 
    leads, 
    updateLeadStatus, 
    setSelectedLeadForQuotation, 
    setAdminTab,
    openCommunicationModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStaff, setFilterStaff] = useState<string>('all');

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.partnerName && l.partnerName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || l.eventType === filterType;
    const matchesStaff = filterStaff === 'all' || (l.assignedStaff && l.assignedStaff.includes(filterStaff));

    return matchesSearch && matchesType && matchesStaff;
  });

  const getLeadsByStatus = (status: LeadStatus) => {
    return filteredLeads.filter(l => l.status === status);
  };

  const handleQuickWhatsApp = (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    openCommunicationModal({
      recipientName: lead.clientName,
      recipientPhone: lead.phone,
      recipientEmail: lead.email,
      leadId: lead.id,
      defaultTemplate: 'visit_confirm'
    });
  };

  return (
    <div className="space-y-6 max-w-full">
      
      {/* Top Filter & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs">
        
        {/* Search Input */}
        <div className="flex-1 relative max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by client name, partner or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden text-[#0C1929]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs text-[#0C1929] font-medium focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden"
          >
            <option value="all">All Celebration Types</option>
            <option value="wedding">Weddings</option>
            <option value="reception">Receptions</option>
            <option value="sangeet">Sangeet / Mehendi</option>
            <option value="engagement">Engagements</option>
            <option value="corporate">Corporate Galas</option>
          </select>

          <select
            value={filterStaff}
            onChange={(e) => setFilterStaff(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs text-[#0C1929] font-medium focus:ring-2 focus:ring-[#0C1929] focus:outline-hidden"
          >
            <option value="all">All Assigned Directors</option>
            <option value="Vikram">Vikram Sundaram</option>
            <option value="Pooja">Pooja Iyer</option>
            <option value="Ramesh">Ramesh K.</option>
            <option value="Ananya">Ananya Nair</option>
          </select>

          <button
            onClick={onNewLeadClick}
            className="px-4 py-2 rounded-xl bg-[#0C1929] hover:bg-stone-900 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>New Lead</span>
          </button>
        </div>

      </div>

      {/* Horizontal Scrolling Kanban Stages Board */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1">
        {KANBAN_COLUMNS.map((col) => {
          const colLeads = getLeadsByStatus(col.id);

          return (
            <div
              key={col.id}
              className={`w-80 shrink-0 rounded-3xl border border-stone-200 ${col.bgColor} flex flex-col max-h-[calc(100vh-220px)] shadow-xs`}
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-stone-200 bg-white rounded-t-3xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${col.badgeColor}`}>
                    {colLeads.length}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#0C1929]">
                    {col.title}
                  </h4>
                </div>
              </div>

              {/* Lead Cards List */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {colLeads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    onClick={() => onLeadClick(lead)}
                    className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0C1929] shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3"
                  >
                    {/* Lead Card Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-bold text-sm text-[#0C1929] hover:text-[#9A7732] transition-colors">
                          {lead.clientName}
                        </h5>
                        {lead.partnerName && (
                          <span className="text-xs text-stone-700 font-serif italic block">
                            &amp; {lead.partnerName}
                          </span>
                        )}
                      </div>

                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-stone-100 text-stone-800">
                        {lead.eventType}
                      </span>
                    </div>

                    {/* Key Details */}
                    <div className="text-xs text-stone-700 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#9A7732]" />
                        <span className="font-medium">{lead.eventDate} ({lead.guestCount} pax)</span>
                      </div>

                      {lead.visitDate && (
                        <div className="flex items-center gap-2 text-purple-900 font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Tour: {lead.visitDate}</span>
                        </div>
                      )}

                      {lead.quotationAmount && (
                        <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                          <span>₹{(lead.quotationAmount / 100000).toFixed(2)} Lakhs Quote</span>
                        </div>
                      )}
                    </div>

                    {/* Assigned Staff & Actions footer */}
                    <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-700">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleQuickWhatsApp(lead, e)}
                          className="p-1 rounded-md text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <span className="truncate max-w-[100px] font-medium">
                          {lead.assignedStaff?.split(' ')[0] || 'Director'}
                        </span>
                      </div>

                      {/* Quick stage advance buttons */}
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        {col.id === 'new' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'contacted')}
                            className="px-2 py-0.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-[10px] font-bold"
                            title="Mark as Contacted"
                          >
                            Contact →
                          </button>
                        )}

                        {col.id === 'contacted' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'visit_scheduled')}
                            className="px-2 py-0.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 text-[10px] font-bold"
                            title="Schedule Walk-Through"
                          >
                            Visit →
                          </button>
                        )}

                        {(col.id === 'visit_scheduled' || col.id === 'contacted') && (
                          <button
                            onClick={() => {
                              setSelectedLeadForQuotation(lead);
                              setAdminTab('quotes');
                            }}
                            className="px-2 py-0.5 rounded-lg bg-[#0C1929] text-white hover:bg-stone-900 text-[10px] font-bold"
                            title="Open Quotation Builder"
                          >
                            Quote
                          </button>
                        )}

                        {col.id === 'quotation_sent' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'negotiation')}
                            className="px-2 py-0.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 text-[10px] font-bold"
                          >
                            Negotiate →
                          </button>
                        )}

                        {col.id === 'negotiation' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'confirmed')}
                            className="px-2 py-0.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[10px] font-bold"
                          >
                            Confirm ✓
                          </button>
                        )}
                      </div>
                    </div>

                  </motion.div>
                ))}

                {colLeads.length === 0 && (
                  <div className="py-8 text-center text-xs text-stone-700 font-light italic">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
