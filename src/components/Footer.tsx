import React from 'react';
import { 
  Smartphone, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Heart,
  Navigation
} from 'lucide-react';
import { STORE_INFO } from '../data/shopData';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-850 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-850">
          {/* Col 1: Store Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-neutral-100 tracking-tight">
                  CELLPHONE REPAIR
                </span>
                <p className="text-xs text-neutral-400">Repair &amp; Accessories • Rialto, CA</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Your trusted express mobile phone repair and certified device center at 869 E Foothill Blvd, Rialto, CA. 20–45 minute screen and battery replacements backed by our 30-day warranty.
            </p>

            <div className="pt-1">
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>View Google Maps Listing</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Device Catalog &amp; Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Repair Services &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quote')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Instant Repair Price Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Sell / Trade-In Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Location, Map &amp; Driving Directions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Verified Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Repairs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Popular Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>iPhone 15/14/13/12 Screen Fix (~20 mins)</li>
              <li>Battery Health 100% Replacement (~20 mins)</li>
              <li>Laser Back Glass Removal (~45 mins)</li>
              <li>Charging Port Cleaning &amp; Module Repair</li>
              <li>Camera Lens &amp; Face ID Sensor Diagnostics</li>
              <li>Water &amp; Liquid Damage Ultrasonic Revival</li>
              <li>Unlocked Samsung Galaxy &amp; Google Pixel Fixes</li>
            </ul>
          </div>

          {/* Col 4: Store Info & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Store Contact &amp; Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phoneClean}`} className="text-neutral-200 font-bold hover:text-amber-400">
                  {STORE_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 10:00 AM – 7:30 PM</p>
                  <p>Sunday: 11:00 AM – 6:00 PM</p>
                </div>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Day Parts &amp; Labor Warranty</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {STORE_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>{STORE_INFO.address}</span>
            <span>•</span>
            <span>Walk-ins Welcome</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
