import React, { useState } from 'react';
import { Eye, Plus, LayoutDashboard, GitBranch, FileText, Calendar, BarChart3, Users, Sparkles, ShieldCheck, Menu, X } from 'lucide-react';
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { id: 'pipeline', label: 'Pipeline', icon: <GitBranch className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: leads.filter(l => l.status !== 'completed' && l.status !== 'lost').length },
    { id: 'quotes', label: 'Quotation Builder', icon: <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: quotations.length },
    { id: 'bookings', label: 'Bookings & Ledger', icon: <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, badge: bookings.length },
    { id: 'operations', label: 'Operations', icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />, badge: bookings.length },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> }
  ];

  return (
    <header className="bg-[#07101C] border-b border-[#C5A059]/25 text-[#FAF8F5] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Control Strip */}
        <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-white/10 gap-2">
          
          {/* Brand & CRM Mode indicator */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-[#0C1929] border border-[#C5A059] flex items-center justify-center font-serif text-[#C5A059] font-bold text-sm sm:text-base shadow-md">
              A
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xs sm:text-base tracking-wider uppercase text-white font-bold truncate">
                  The Arboretum
                </span>
                <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono tracking-wider bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/40 uppercase font-bold">
                  CRM
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block font-mono truncate hidden xs:block">
                Directorate Command Center
              </span>
            </div>
          </div>

          {/* Right Action Controls (Desktop + Tablet) */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            
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
              className="px-3 py-1.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#07101C] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>

            {/* Return to Customer Guest View */}
            <button
              onClick={() => setViewMode('public')}
              className="px-3 py-1.5 rounded-full border border-white/20 hover:border-[#C5A059] text-stone-200 hover:text-white bg-white/5 text-xs font-medium tracking-wider flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden md:inline">Customer View</span>
              <span className="md:hidden">Guest</span>
            </button>

          </div>

          {/* Mobile Fast Action Buttons */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onNewLeadClick}
              className="p-2 rounded-xl bg-[#C5A059] text-[#07101C] font-bold shadow-xs active:scale-95"
              title="Add New Lead"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('public')}
              className="px-2.5 py-1.5 rounded-xl border border-white/20 text-stone-200 bg-white/5 text-[11px] font-medium flex items-center gap-1 active:scale-95"
              title="Switch to Public Site View"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Site</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu for Role & Secondary controls */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-3 px-1 border-b border-white/10 bg-[#0C1929]/95 rounded-b-2xl mb-2 space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs text-stone-300">Active Role:</span>
              </div>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-[#0C1929] border border-[#C5A059]/40 text-white text-xs font-semibold px-2 py-1 rounded-lg uppercase tracking-wider focus:outline-hidden"
              >
                <option value="admin">Owner / Admin</option>
                <option value="manager">Banquet Manager</option>
                <option value="staff">Operations Staff</option>
              </select>
            </div>
          </div>
        )}

        {/* Tab Navigation Strip (Optimized with responsive padding & scroll) */}
        <nav className="flex items-center space-x-1 sm:space-x-2 py-1.5 sm:py-2 overflow-x-auto scrollbar-none -mx-1 px-1">
          {tabs.map((tab) => {
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setAdminTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0C1929] text-[#E6CA85] border border-[#C5A059]/50 shadow-inner'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] sm:text-[10px] font-bold ${
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
