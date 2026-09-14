/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DeviceCatalog } from './components/DeviceCatalog';
import { RepairServices } from './components/RepairServices';
import { RepairEstimator } from './components/RepairEstimator';
import { TradeInCalculator } from './components/TradeInCalculator';
import { StoreLocationContact } from './components/StoreLocationContact';
import { ReviewsSection } from './components/ReviewsSection';
import { ActiveReservationsDrawer } from './components/ActiveReservationsDrawer';
import { Footer } from './components/Footer';
import { STORE_INFO } from './data/shopData';
import { DeviceReservation, RepairBooking } from './types';
import { Phone, MapPin, Wrench, Sparkles, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local storage persistence for device holds
  const [deviceReservations, setDeviceReservations] = useState<DeviceReservation[]>(() => {
    try {
      const saved = localStorage.getItem('kimi_device_holds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Local storage persistence for repair bookings
  const [repairBookings, setRepairBookings] = useState<RepairBooking[]>(() => {
    try {
      const saved = localStorage.getItem('kimi_repair_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kimi_device_holds', JSON.stringify(deviceReservations));
    } catch (e) {
      console.error(e);
    }
  }, [deviceReservations]);

  useEffect(() => {
    try {
      localStorage.setItem('kimi_repair_bookings', JSON.stringify(repairBookings));
    } catch (e) {
      console.error(e);
    }
  }, [repairBookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    handleNavigate('quote');
  };

  const handleReserveDevice = (reservationData: Omit<DeviceReservation, 'id' | 'reservationCode' | 'createdAt' | 'status'>) => {
    const newReservation: DeviceReservation = {
      ...reservationData,
      id: `res-${Date.now()}`,
      reservationCode: `HOLD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending_pickup',
    };
    setDeviceReservations((prev) => [newReservation, ...prev]);
    showToast(`Device reserved! Voucher #${newReservation.reservationCode} saved to your holds.`);
  };

  const handleBookingConfirmed = (bookingData: Omit<RepairBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => {
    const newBooking: RepairBooking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      bookingCode: `FAST-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    setRepairBookings((prev) => [newBooking, ...prev]);
    showToast(`Fast-pass confirmed! Voucher #${newBooking.bookingCode} ready for walk-in.`);
  };

  const handleRemoveDeviceReservation = (id: string) => {
    setDeviceReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRemoveRepairBooking = (id: string) => {
    setRepairBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950 pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-amber-500 text-neutral-950 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-semibold text-xs border border-amber-400 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-neutral-950/70 hover:text-neutral-950"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenReservations={() => setIsReservationsOpen(true)}
        reservationsCount={deviceReservations.length + repairBookings.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onNavigate={handleNavigate} />
        
        <DeviceCatalog onReserveDevice={handleReserveDevice} />
        
        <RepairServices onSelectServiceForQuote={handleSelectServiceForQuote} />
        
        <RepairEstimator
          preselectedServiceId={preselectedServiceId}
          onBookingConfirmed={handleBookingConfirmed}
        />
        
        <TradeInCalculator />
        
        <StoreLocationContact />
        
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Active Reservations & Vouchers Drawer */}
      <ActiveReservationsDrawer
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
        deviceReservations={deviceReservations}
        repairBookings={repairBookings}
        onRemoveDeviceReservation={handleRemoveDeviceReservation}
        onRemoveRepairBooking={handleRemoveRepairBooking}
      />

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${STORE_INFO.phoneClean}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-850 border border-neutral-700 text-neutral-100 flex items-center justify-center gap-2 text-xs font-bold active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call Shop</span>
        </a>

        <button
          onClick={() => handleNavigate('quote')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-all shadow-md shadow-amber-500/20"
        >
          <Wrench className="w-4 h-4" />
          <span>Get Quote</span>
        </button>

        <a
          href={STORE_INFO.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-850 border border-neutral-700 text-neutral-100 flex items-center justify-center gap-2 text-xs font-bold active:scale-95 transition-all"
        >
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Directions</span>
        </a>
      </div>
    </div>
  );
}
