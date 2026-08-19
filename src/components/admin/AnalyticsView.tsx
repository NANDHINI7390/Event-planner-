import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Users, 
  DollarSign, 
  Calendar, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PACKAGES } from '../../data/venueData';

export const AnalyticsView: React.FC = () => {
  const { leads, bookings, quotations } = useApp();

  const totalBookedRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalAdvancesCollected = bookings.reduce((sum, b) => sum + b.depositPaid, 0);
  const conversionRate = ((bookings.length / (leads.length || 1)) * 100).toFixed(1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7732] font-bold">
              Executive Intelligence &amp; Performance
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#0C1929] font-bold">
            Sanctuary Yield &amp; Commercial Analytics
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-light mt-1">
            Real-time analytics on enquiry volume, seasonal demand pacing, guest spend, and conversion velocity.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-[#0C1929] text-[#E6CA85] text-xs font-semibold font-mono shadow-xs">
            FY 2026–2027 Projections
          </span>
        </div>
      </div>

      {/* Primary 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-[#0C1929] text-white p-6 sm:p-7 rounded-3xl border border-[#C5A059]/40 shadow-xl space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#E6CA85] font-semibold block">
            Annual Contract Value Locked
          </span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-white block">
            ₹{(totalBookedRevenue / 100000).toFixed(2)} Lakhs
          </span>
          <span className="text-xs text-stone-300 block pt-1">
            ₹{(totalAdvancesCollected / 100000).toFixed(2)}L in verified advance deposits
          </span>
        </div>

        <div className="bg-white text-[#0C1929] p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs uppercase tracking-wider text-stone-600 font-bold block">
            Lead to Booking Conversion Rate
          </span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1929] block">
            {conversionRate}%
          </span>
          <span className="text-xs text-emerald-800 font-semibold block pt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Top tier in ECR / Pondicherry Luxury segment
          </span>
        </div>

        <div className="bg-white text-[#0C1929] p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs uppercase tracking-wider text-stone-600 font-bold block">
            Average Spend Per Celebration
          </span>
          <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1929] block">
            ₹32.5 Lakhs
          </span>
          <span className="text-xs text-stone-600 block pt-1">
            Driven by multi-space lawn &amp; glasshouse combinations
          </span>
        </div>
      </div>

      {/* Visual Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Event Type Share */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <h3 className="font-serif text-xl text-[#0C1929] font-bold border-b border-stone-100 pb-3">
            Celebration Category Distribution
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-800">Traditional &amp; Luxury Destination Weddings</span>
                <span className="text-[#9A7732] font-mono font-bold">65%</span>
              </div>
              <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0C1929] rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-800">Evening Receptions &amp; Sangeet Galas</span>
                <span className="text-[#9A7732] font-mono font-bold">22%</span>
              </div>
              <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#C5A059] rounded-full" style={{ width: '22%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-800">Corporate Retreats &amp; Brand Summits</span>
                <span className="text-[#9A7732] font-mono font-bold">8%</span>
              </div>
              <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-800">Intimate Engagements &amp; Anniversaries</span>
                <span className="text-[#9A7732] font-mono font-bold">5%</span>
              </div>
              <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300 rounded-full" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Package Popularity */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <h3 className="font-serif text-xl text-[#0C1929] font-bold border-b border-stone-100 pb-3">
            Package Tier Adoption
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
              <span className="text-xs uppercase text-stone-600 font-bold block">Essential</span>
              <span className="font-serif text-2xl font-bold text-[#0C1929] block">18%</span>
              <span className="text-[10px] text-stone-600 font-mono">₹2,200 / plate</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0C1929] text-white border border-[#C5A059] text-center space-y-1 shadow-md">
              <span className="text-xs uppercase text-[#E6CA85] font-bold block">Signature</span>
              <span className="font-serif text-2xl font-bold text-white block">58%</span>
              <span className="text-[10px] text-[#E6CA85]">Most Cherished</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
              <span className="text-xs uppercase text-stone-600 font-bold block">Grand</span>
              <span className="font-serif text-2xl font-bold text-[#0C1929] block">24%</span>
              <span className="text-[10px] text-stone-600 font-mono">₹4,500 / plate</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700 leading-relaxed">
            💡 <strong>Director Insight:</strong> 85% of couples booking the Signature package opt for the Banyan Grand Lawn + Glasshouse dual-space combination.
          </div>
        </div>

      </div>

    </div>
  );
};
