import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Users, 
  DollarSign, 
  Calendar, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PACKAGES } from '../../data/venueData';

export const AnalyticsView: React.FC = () => {
  const { leads, bookings, quotations } = useApp();

  const totalBookedRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const conversionRate = ((bookings.length / (leads.length || 1)) * 100).toFixed(1);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
            Executive Intelligence
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#12231A]">
            Sanctuary Yield &amp; Conversion Analytics
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-light">
            Insights on inquiry volume, popular seasons, guest spend, and conversion velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#12231A] text-[#E6CA85] text-xs font-semibold">
            FY 2026–2027 Projections
          </span>
        </div>
      </div>

      {/* Primary 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#12231A] text-white p-6 rounded-3xl border border-[#C5A059]/40 shadow-lg space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#E6CA85] font-semibold block">
            Annual Contract Value
          </span>
          <span className="font-serif text-4xl font-bold text-[#FAF8F5] block">
            ₹{(totalBookedRevenue / 100000).toFixed(2)} Lakhs
          </span>
          <span className="text-xs text-stone-300 block pt-1">
            +34% over prior year milestone pacing
          </span>
        </div>

        <div className="bg-white text-[#12231A] p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
            Lead to Booking Conversion
          </span>
          <span className="font-serif text-4xl font-bold text-[#12231A] block">
            {conversionRate}%
          </span>
          <span className="text-xs text-emerald-700 font-medium block pt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Top tier in ECR / Pondicherry Luxury segment
          </span>
        </div>

        <div className="bg-white text-[#12231A] p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
            Average Spend Per Celebration
          </span>
          <span className="font-serif text-4xl font-bold text-[#12231A] block">
            ₹32.5 Lakhs
          </span>
          <span className="text-xs text-stone-500 block pt-1">
            Driven by multi-space lawn &amp; glasshouse buyouts
          </span>
        </div>
      </div>

      {/* Visual Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Event Type Share */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif text-xl text-[#12231A] font-semibold border-b border-stone-100 pb-3">
            Celebration Category Distribution
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Traditional &amp; Luxury Destination Weddings</span>
                <span className="text-[#C5A059]">65%</span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#12231A] rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Evening Receptions &amp; Sangeet Galas</span>
                <span className="text-[#C5A059]">22%</span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#C5A059]" style={{ width: '22%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Corporate Retreats &amp; Brand Summits</span>
                <span className="text-[#C5A059]">8%</span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400" style={{ width: '8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Intimate Engagements &amp; Anniversaries</span>
                <span className="text-[#C5A059]">5%</span>
              </div>
              <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Package Popularity */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif text-xl text-[#12231A] font-semibold border-b border-stone-100 pb-3">
            Package Tier Adoption
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
              <span className="text-xs uppercase text-stone-500 font-semibold block">Essential</span>
              <span className="font-serif text-2xl font-bold text-stone-900 block">18%</span>
              <span className="text-[10px] text-stone-500">₹2,200 / pl</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12231A] text-white border border-[#C5A059] text-center space-y-1 shadow-md">
              <span className="text-xs uppercase text-[#E6CA85] font-semibold block">Signature</span>
              <span className="font-serif text-2xl font-bold text-white block">58%</span>
              <span className="text-[10px] text-[#E6CA85]">Most Cherished</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
              <span className="text-xs uppercase text-stone-500 font-semibold block">Grand</span>
              <span className="font-serif text-2xl font-bold text-stone-900 block">24%</span>
              <span className="text-[10px] text-stone-500">₹4,500 / pl</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 leading-relaxed">
            💡 <strong>Director Insight:</strong> 85% of couples booking the Signature package opt for the Banyan Grand Lawn + Glasshouse dual-space combination.
          </div>
        </div>

      </div>

    </div>
  );
};
