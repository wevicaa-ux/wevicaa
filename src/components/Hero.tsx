import React from 'react';
import { 
  Wrench, 
  Smartphone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { STORE_INFO } from '../data/shopData';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-b border-neutral-800">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
              <MapPin className="w-3.5 h-3.5" />
              <span>259 B Canal St, Chinatown, NYC • Walk-ins Welcomed</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-100 leading-[1.1]">
              Express iPhone Repair &amp; Certified Devices on <span className="text-amber-400">Canal Street</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              New York’s go-to mobile shop for cracked screens, laser back glass, fast battery replacement, and unlocked smartphones. Fast 20–45 minute turnaround, genuine quality parts, and an honest 30-day warranty.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>20-Min Screen Replacement</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Parts Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlocked Phones &amp; MagSafe</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Appointment Needed</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean Ultrasonic Cleaning</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Best Price Guarantee</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-repair-quote-btn"
                onClick={() => onNavigate('quote')}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm sm:text-base transition-all flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
              >
                <Wrench className="w-4 h-4" />
                <span>Calculate Repair Price</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-catalog-btn"
                onClick={() => onNavigate('catalog')}
                className="px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-100 font-semibold text-sm sm:text-base border border-neutral-700 transition-all flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>View Devices in Stock</span>
              </button>

              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-sm border border-neutral-700/80 transition-all flex items-center gap-2"
                title="View on Google Maps"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Map &amp; Directions</span>
              </a>
            </div>

            {/* Ratings & reviews quick bar */}
            <div className="pt-4 border-t border-neutral-800 flex items-center gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-neutral-200 font-semibold">4.8 / 5.0 Rating</span>
              <span className="text-neutral-600">•</span>
              <span>10,000+ Screen &amp; Battery Repairs in NYC</span>
            </div>
          </div>

          {/* Right card spotlight */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-neutral-800/90 border border-neutral-700/80 p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-700">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Direct Walk-In Service
                  </span>
                  <h3 className="text-xl font-bold text-neutral-100">Kimi Mobile Repair Center</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              {/* Fast turnaround breakdown */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/80 border border-neutral-750">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-200">iPhone OLED Screen</h4>
                      <p className="text-xs text-neutral-400">Genuine touch, True Tone saved</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400 block">From $59</span>
                    <span className="text-[10px] text-neutral-400">~20 mins</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/80 border border-neutral-750">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-200">New Battery Health 100%</h4>
                      <p className="text-xs text-neutral-400">Fresh zero-cycle cell replacement</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400 block">From $39</span>
                    <span className="text-[10px] text-neutral-400">~20 mins</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/80 border border-neutral-750">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-200">Laser Back Glass</h4>
                      <p className="text-xs text-neutral-400">Non-invasive laser extraction</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400 block">From $65</span>
                    <span className="text-[10px] text-neutral-400">~45 mins</span>
                  </div>
                </div>
              </div>

              {/* Action box inside card */}
              <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-300">Need Immediate Help?</p>
                  <p className="text-[11px] text-neutral-300">Bring your device directly to 259 B Canal St</p>
                </div>
                <a
                  href={`tel:${STORE_INFO.phoneClean}`}
                  className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
