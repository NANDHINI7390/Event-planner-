/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { DynamicHero } from './components/DynamicHero';
import { ScrollStorytelling } from './components/ScrollStorytelling';
import { SpacesLookbook } from './components/SpacesLookbook';
import { EventExperiences } from './components/EventExperiences';
import { PackagesSection } from './components/PackagesSection';
import { AvailabilityCalendar } from './components/AvailabilityCalendar';
import { IllustratedJourney } from './components/IllustratedJourney';
import { EditorialGallery } from './components/EditorialGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

// Admin Components
import { AdminNavbar } from './components/admin/AdminNavbar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LeadKanban } from './components/admin/LeadKanban';
import { QuotationBuilder } from './components/admin/QuotationBuilder';
import { BookingManager } from './components/admin/BookingManager';
import { EventOperationsView } from './components/admin/EventOperationsView';
import { AnalyticsView } from './components/admin/AnalyticsView';
import { AdminLeadModal } from './components/admin/AdminLeadModal';
import { NewLeadModal } from './components/admin/NewLeadModal';
import { CommunicationModal } from './components/admin/CommunicationModal';

// Modals
import { VisitBookingModal } from './components/VisitBookingModal';
import { QuickEnquiryDrawer } from './components/QuickEnquiryDrawer';
import { SpaceDetailModal } from './components/SpaceDetailModal';
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { Lead } from './types';

const ArboretumAppContent: React.FC = () => {
  const { viewMode, adminTab } = useApp();

  // Admin Modals state
  const [selectedAdminLead, setSelectedAdminLead] = useState<Lead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#12231A] selection:bg-[#C5A059]/30 selection:text-[#12231A] relative font-sans">
      {/* Subtle Custom Cursor */}
      <CustomCursor />

      {/* PUBLIC CUSTOMER-FACING CINEMATIC EXPERIENCE */}
      {viewMode === 'public' ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <DynamicHero />
            <ScrollStorytelling />
            <SpacesLookbook />
            <EventExperiences />
            <PackagesSection />
            <AvailabilityCalendar />
            <IllustratedJourney />
            <EditorialGallery />
            <TestimonialsSection />
          </main>
          <Footer />
        </div>
      ) : (
        /* BACKSTAGE CRM & OPERATIONS PORTAL */
        <div className="flex flex-col min-h-screen bg-[#F5F2EB]">
          <AdminNavbar onNewLeadClick={() => setIsNewLeadModalOpen(true)} />
          <main className="flex-1">
            {adminTab === 'dashboard' && (
              <AdminDashboard onNewLeadClick={() => setIsNewLeadModalOpen(true)} />
            )}
            {adminTab === 'pipeline' && (
              <LeadKanban
                onNewLeadClick={() => setIsNewLeadModalOpen(true)}
                onLeadClick={(lead) => setSelectedAdminLead(lead)}
              />
            )}
            {adminTab === 'quotes' && <QuotationBuilder />}
            {adminTab === 'bookings' && <BookingManager />}
            {adminTab === 'operations' && <EventOperationsView />}
            {adminTab === 'analytics' && <AnalyticsView />}
          </main>
        </div>
      )}

      {/* Global Interactive Overlays & Modals */}
      <VisitBookingModal />
      <QuickEnquiryDrawer />
      <SpaceDetailModal />
      <ExperienceDetailModal />
      <CommunicationModal />

      {/* Admin Specific Modals */}
      {selectedAdminLead && (
        <AdminLeadModal
          lead={selectedAdminLead}
          onClose={() => setSelectedAdminLead(null)}
        />
      )}

      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ArboretumAppContent />
    </AppProvider>
  );
}
