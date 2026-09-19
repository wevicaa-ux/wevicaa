import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Wrench, 
  Smartphone, 
  Menu, 
  X, 
  BookmarkCheck, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { STORE_INFO } from '../data/shopData';
import { DeviceReservation, RepairBooking } from '../types';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenReservations: () => void;
  reservationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  onOpenReservations,
  reservationsCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(true);

  // Calculate live store opening status in California Time (Pacific Time)
  useEffect(() => {
    const checkStoreStatus = () => {
      try {
        const now = new Date();
        const ptTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        const day = ptTime.getDay(); // 0 = Sunday, 1 = Monday, ...
        const hour = ptTime.getHours();
        const minute = ptTime.getMinutes();
        const currentTimeInMinutes = hour * 60 + minute;

        if (day === 0) {
          // Sunday: 11:00 AM (660m) - 6:00 PM (1080m)
          setIsStoreOpen(currentTimeInMinutes >= 660 && currentTimeInMinutes <= 1080);
        } else {
          // Monday - Saturday: 10:00 AM (600m) - 7:30 PM (1170m)
          setIsStoreOpen(currentTimeInMinutes >= 600 && currentTimeInMinutes <= 1170);
        }
      } catch (e) {
        setIsStoreOpen(true);
      }
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'catalog', label: 'Device Catalog' },
    { id: 'services', label: 'Repair Services' },
    { id: 'quote', label: 'Instant Price Quote' },
    { id: 'trade-in', label: 'Trade-In / Sell' },
    { id: 'location', label: 'Location & Hours' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800">
      {/* Top utility bar */}
      <div className="bg-neutral-950 px-4 py-1.5 text-xs text-neutral-300 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href={STORE_INFO.mapsUrl}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              title="Open Google Maps location"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{STORE_INFO.address}</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
            <span className="hidden md:inline text-neutral-700">|</span>
            <div className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Mon-Sat: 10AM-7:30PM • Sun: 11AM-6PM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="font-semibold text-neutral-200">
                {isStoreOpen ? 'Open Now for Walk-ins' : 'Closed • Reopens 10 AM'}
              </span>
            </div>
            <a
              href={`tel:${STORE_INFO.phoneClean}`}
              className="flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 ml-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand logo */}
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-neutral-900 rounded-[10px] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-neutral-100 tracking-tight leading-none group-hover:text-amber-400 transition-colors">
                  CELLPHONE REPAIR
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded font-medium">
                  Rialto, CA
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium leading-tight mt-0.5">
                Repairs &amp; Accessories • Foothill Blvd
              </p>
            </div>
          </button>

          {/* Desktop navigation links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id 
                    ? 'text-amber-400 bg-neutral-800' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active reservations/bookings quick view */}
            <button
              id="view-reservations-btn"
              onClick={onOpenReservations}
              className="relative p-2 rounded-lg text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="View my repair bookings or device holds"
            >
              <BookmarkCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">My Holds</span>
              {reservationsCount > 0 && (
                <span className="ml-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] flex items-center justify-center">
                  {reservationsCount}
                </span>
              )}
            </button>

            {/* Quick Quote / Walk-in Button */}
            <button
              id="nav-quick-quote-btn"
              onClick={() => onNavigate('quote')}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all flex items-center gap-1.5 shadow-sm shadow-amber-500/30 active:scale-95"
            >
              <Wrench className="w-4 h-4" />
              <span>Get Repair Quote</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-700"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-900/98 px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-amber-500/10 text-amber-400 font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 mt-3 border-t border-neutral-800 flex flex-col gap-2">
            <a
              href={`tel:${STORE_INFO.phoneClean}`}
              className="w-full py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-100 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Shop: {STORE_INFO.phone}</span>
            </a>
            <a
              href={STORE_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Directions: 869 E Foothill Blvd</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
