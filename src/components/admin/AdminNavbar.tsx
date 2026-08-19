import React from 'react';
import { Eye, Plus, LayoutDashboard, GitBranch, FileText, Calendar, BarChart3, Users, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminTab, UserRole } from '../../types';

export const AdminNavbar: React.FC<{ onNewLeadClick: () => void }> = ({ onNewLeadClick }) => {
  const {
    setViewMode,
    adminTab,
    setAdminTab,
    leads,
    quotations,
    bookings,
    userRole,
    setUserRole
  } = useApp();

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'pipeline', label: 'Lead Pipeline', icon: <GitBranch className="w-4 h-4" />, badge: leads.filter(l => l.status !== 'completed' && l.status !== 'lost').length },
    { id: 'quotes', label: 'Quotation Builder', icon: <FileText className="w-4 h-4" />, badge: quotations.length },
    { id: 'bookings', label: 'Bookings & Ledger', icon: <Calendar className="w-4 h-4" />, badge: bookings.length },
    { id: 'operations', label: 'Event Operations', icon: <Sparkles className="w-4 h-4 text-[#C5A059]" />, badge: bookings.length },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-[#07101C] border-b border-[#C5A059]/25 text-[#FAF8F5] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/10 gap-3">
          
          {/* Brand & CRM Mode indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0C1929] border border-[#C5A059] flex items-center justify-center font-serif text-[#C5A059] font-bold text-base shadow-md">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base tracking-wider uppercase text-white font-bold">
                  The Arboretum @ ECR
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/40 uppercase font-bold">
                  Executive CRM
                </span>
              </div>
              <span className="text-[10px] text-stone-400 block font-mono">
                Director &amp; Banquet Command Center · Live State Synchronization
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Role Switcher Pill */}
            <div className="flex items-center gap-1.5 bg-[#0C1929] border border-[#C5A059]/40 px-2.5 py-1 rounded-xl text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent text-white font-semibold text-[11px] uppercase tracking-wider focus:outline-hidden cursor-pointer"
              >
                <option value="admin" className="bg-[#0C1929] text-white">Owner / Admin</option>
                <option value="manager" className="bg-[#0C1929] text-white">Banquet Manager</option>
                <option value="staff" className="bg-[#0C1929] text-white">Operations Staff</option>
              </select>
            </div>

            {/* Quick Add Lead Button */}
            <button
              onClick={onNewLeadClick}
              className="px-3.5 py-1.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#07101C] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>

            {/* Return to Customer Guest View */}
            <button
              onClick={() => setViewMode('public')}
              className="px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#C5A059] text-stone-200 hover:text-white bg-white/5 text-xs font-medium tracking-wider flex items-center gap-2 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Customer View</span>
            </button>

            {/* Staff Profile Avatar */}
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/15">
              <div className="w-7 h-7 rounded-full bg-[#14283F] border border-[#C5A059]/40 flex items-center justify-center text-xs font-bold text-[#E6CA85]">
                VS
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs text-stone-200 block font-medium">Vikram Sundaram</span>
                <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Senior Director</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation Strip */}
        <nav className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0C1929] text-[#E6CA85] border border-[#C5A059]/50 shadow-inner'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-[#C5A059] text-[#0C1929]' : 'bg-stone-800 text-stone-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
