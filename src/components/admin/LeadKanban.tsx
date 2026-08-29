import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  FileText, 
  User, 
  MessageSquare, 
  Sparkles, 
  Download,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus, EventCategory } from '../../types';

const STAGES: { id: LeadStatus; label: string; color: string; badgeBg: string }[] = [
  { id: 'new', label: 'New Enquiries', color: 'border-amber-400', badgeBg: 'bg-amber-100 text-amber-900' },
  { id: 'contacted', label: 'Contacted', color: 'border-blue-400', badgeBg: 'bg-blue-100 text-blue-900' },
  { id: 'visit_scheduled', label: 'Site Visit', color: 'border-purple-400', badgeBg: 'bg-purple-100 text-purple-900' },
  { id: 'quotation_sent', label: 'Quotation Sent', color: 'border-indigo-400', badgeBg: 'bg-indigo-100 text-indigo-900' },
  { id: 'negotiation', label: 'Tasting & Review', color: 'border-orange-400', badgeBg: 'bg-orange-100 text-orange-900' },
  { id: 'confirmed', label: 'Confirmed Booking', color: 'border-emerald-500', badgeBg: 'bg-emerald-100 text-emerald-900' },
  { id: 'completed', label: 'Completed', color: 'border-stone-400', badgeBg: 'bg-stone-100 text-stone-900' },
  { id: 'lost', label: 'Archived / Lost', color: 'border-red-400', badgeBg: 'bg-red-100 text-red-900' }
];

export const LeadKanban: React.FC<{ 
  onSelectLead: (lead: Lead) => void;
  onNewLeadClick: () => void;
  onCommunicationClick: (lead: Lead) => void;
}> = ({ onSelectLead, onNewLeadClick, onCommunicationClick }) => {
  const { leads, updateLeadStatus } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');
  const [activeMobileStage, setActiveMobileStage] = useState<LeadStatus>('new');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.partnerName && lead.partnerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedEventType === 'all' || lead.eventType === selectedEventType;
    const matchesStaff = selectedStaff === 'all' || lead.assignedStaff === selectedStaff;

    return matchesSearch && matchesType && matchesStaff;
  });

  const getLeadsByStage = (stage: LeadStatus) => {
    return filteredLeads.filter(lead => lead.status === stage);
  };

  const handleNextStage = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    const currentIndex = STAGES.findIndex(s => s.id === lead.status);
    if (currentIndex < STAGES.length - 2) {
      const nextStage = STAGES[currentIndex + 1].id;
      updateLeadStatus(lead.id, nextStage);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Client Name', 'Partner Name', 'Phone', 'Email', 'Event Type', 'Event Date', 'Guest Count', 'Status', 'Estimated Budget', 'Assigned Staff', 'Created At'];
    const rows = filteredLeads.map(l => [
      `"${l.clientName || ''}"`,
      `"${l.partnerName || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.eventType || ''}"`,
      `"${l.eventDate || ''}"`,
      `"${l.guestCount || ''}"`,
      `"${l.status || ''}"`,
      `"₹${(l.quotationAmount || 2500000).toLocaleString('en-IN')}"`,
      `"${l.assignedStaff || ''}"`,
      `"${l.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arboretum_enquiries_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full p-3 sm:p-6 lg:p-8">
      
      {/* Control Strip */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, partner, phone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-[#C5A059] text-stone-800"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-stone-700 text-xs rounded-xl px-3 py-2 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Celebrations</option>
            <option value="wedding">Weddings</option>
            <option value="reception">Receptions</option>
            <option value="pre_wedding">Sangeet / Mehendi</option>
            <option value="corporate">Corporate Galas</option>
            <option value="private_celebration">Private Gatherings</option>
          </select>

          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-stone-700 text-xs rounded-xl px-3 py-2 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Directors</option>
            <option value="Vikram Sundaram">Vikram Sundaram</option>
            <option value="Ananya Nair">Ananya Nair</option>
            <option value="Rahul Menon">Rahul Menon</option>
          </select>

          <button
            onClick={handleExportCSV}
            title="Export enquiries to CSV"
            className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 border border-stone-300 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onNewLeadClick}
            className="px-3.5 py-2 rounded-xl bg-[#0C1929] hover:bg-stone-900 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Add Lead</span>
          </button>

        </div>
      </div>

      {/* Mobile Stage Selector Tabs (Shown on small screens) */}
      <div className="flex lg:hidden overflow-x-auto scrollbar-none gap-1.5 pb-2 -mx-1 px-1">
        {STAGES.map(stage => {
          const count = getLeadsByStage(stage.id).length;
          const isActive = activeMobileStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveMobileStage(stage.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#0C1929] text-[#E6CA85] shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200'
              }`}
            >
              <span>{stage.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-[#C5A059] text-[#0C1929] font-bold' : 'bg-stone-100 text-stone-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Single Stage View (lg:hidden) */}
      <div className="block lg:hidden">
        {STAGES.filter(s => s.id === activeMobileStage).map(stage => {
          const stageLeads = getLeadsByStage(stage.id);
          return (
            <div key={stage.id} className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="font-serif text-base font-bold text-[#0C1929]">{stage.label}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${stage.badgeBg}`}>
                  {stageLeads.length} Enquiries
                </span>
              </div>

              {stageLeads.length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400">
                  No enquiries currently in this stage.
                </div>
              ) : (
                <div className="space-y-3">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="bg-stone-50 hover:bg-stone-100 p-4 rounded-xl border border-stone-200 shadow-xs cursor-pointer space-y-2.5 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#0C1929]">
                            {lead.clientName} {lead.partnerName ? `& ${lead.partnerName}` : ''}
                          </h4>
                          <span className="text-[11px] text-stone-500 block">
                            {lead.eventType} · {lead.eventDate}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#9A7732]">
                          ₹{((lead.quotationAmount || 2500000) / 100000).toFixed(1)}L
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                        <span className="text-[11px] text-stone-600 font-medium">
                          👤 {lead.assignedStaff}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onCommunicationClick(lead);
                            }}
                            className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg"
                            title="WhatsApp / Message"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleNextStage(e, lead)}
                            className="px-2.5 py-1 bg-[#0C1929] text-white rounded-lg text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span>Next</span>
                            <ChevronRight className="w-3 h-3 text-[#C5A059]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Multi-Column Kanban Board (Hidden on mobile) */}
      <div className="hidden lg:grid grid-cols-4 xl:grid-cols-8 gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = getLeadsByStage(stage.id);

          return (
            <div
              key={stage.id}
              className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-3 flex flex-col min-w-[240px] xl:min-w-0"
            >
              
              {/* Column Header */}
              <div className={`border-t-4 ${stage.color} pt-2 pb-2.5 mb-2 flex items-center justify-between border-b border-stone-200/70`}>
                <div className="min-w-0">
                  <h3 className="font-serif text-xs font-bold text-[#0C1929] truncate">
                    {stage.label}
                  </h3>
                </div>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold shrink-0 ${stage.badgeBg}`}>
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-0.5">
                {stageLeads.length === 0 ? (
                  <div className="py-6 text-center text-[11px] text-stone-400 italic">
                    No active leads
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs hover:shadow-md hover:border-[#C5A059] transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-xs font-bold text-[#0C1929] group-hover:text-[#9A7732] transition-colors leading-snug">
                          {lead.clientName}
                          {lead.partnerName && (
                            <span className="block text-[10px] font-normal text-stone-500 truncate">
                              &amp; {lead.partnerName}
                            </span>
                          )}
                        </h4>
                      </div>

                      <div className="space-y-1 text-[10px] text-stone-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#9A7732] shrink-0" />
                          <span className="truncate">{lead.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-stone-400 shrink-0" />
                          <span>{lead.guestCount} Guests · {lead.eventType}</span>
                        </div>
                      </div>

                      {/* Value & Actions */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-[#0C1929]">
                          ₹{((lead.quotationAmount || 2500000) / 100000).toFixed(1)}L
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onCommunicationClick(lead);
                            }}
                            className="p-1 rounded-md hover:bg-emerald-50 text-emerald-700 transition-colors"
                            title="Quick WhatsApp Concierge"
                          >
                            <MessageSquare className="w-3 h-3" />
                          </button>
                          
                          {stage.id !== 'completed' && stage.id !== 'lost' && (
                            <button
                              type="button"
                              onClick={(e) => handleNextStage(e, lead)}
                              className="p-1 rounded-md hover:bg-stone-100 text-stone-600 transition-colors"
                              title="Advance to next stage"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
