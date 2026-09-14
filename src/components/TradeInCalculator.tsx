import React, { useState } from 'react';
import { 
  CircleDollarSign, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldAlert, 
  PhoneCall,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { STORE_INFO } from '../data/shopData';

export const TradeInCalculator: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState('iPhone 14 Pro Max (128GB)');
  const [condition, setCondition] = useState<'flawless' | 'good' | 'fair' | 'cracked'>('good');
  const [carrierStatus, setCarrierStatus] = useState<'unlocked' | 'locked'>('unlocked');
  const [claimed, setClaimed] = useState(false);

  const deviceBaseValues: Record<string, number> = {
    'iPhone 15 Pro Max (256GB)': 680,
    'iPhone 15 Pro (128GB)': 540,
    'iPhone 15 (128GB)': 420,
    'iPhone 14 Pro Max (128GB)': 460,
    'iPhone 14 Pro (128GB)': 390,
    'iPhone 14 (128GB)': 310,
    'iPhone 13 Pro (128GB)': 300,
    'iPhone 13 (128GB)': 240,
    'iPhone 12 (64GB)': 150,
    'Samsung Galaxy S24 Ultra': 550,
    'Samsung Galaxy S23 Ultra': 380,
    'Samsung Galaxy S22': 210,
    'Google Pixel 8 Pro': 320,
    'iPad 10th Gen': 200,
  };

  const calculateEstimate = () => {
    const base = deviceBaseValues[selectedDevice] || 350;
    let multiplier = 1.0;
    if (condition === 'flawless') multiplier = 1.15;
    else if (condition === 'good') multiplier = 1.0;
    else if (condition === 'fair') multiplier = 0.78;
    else if (condition === 'cracked') multiplier = 0.55;

    if (carrierStatus === 'locked') {
      multiplier *= 0.88;
    }

    return Math.round(base * multiplier);
  };

  const estimatedValue = calculateEstimate();

  return (
    <section id="trade-in" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 rounded-3xl border border-neutral-800 p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy & Selectors */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <CircleDollarSign className="w-3.5 h-3.5" />
                  <span>Instant Cash at the Counter</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
                  Sell or Trade Your Old Phone for Top Dollar
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base mt-2">
                  Upgrading? Don’t let your old device sit in a drawer. We pay top cash or instant trade-in credit toward any phone or repair at our Canal Street shop.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Select Your Device
                  </label>
                  <select
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-750 rounded-xl text-sm font-semibold text-neutral-100 focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    {Object.keys(deviceBaseValues).map((dev) => (
                      <option key={dev} value={dev}>
                        {dev}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Physical Condition
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'flawless', label: 'Flawless', desc: 'No scratches, like new' },
                      { id: 'good', label: 'Good', desc: 'Light signs of normal use' },
                      { id: 'fair', label: 'Fair', desc: 'Noticeable scratches/scuffs' },
                      { id: 'cracked', label: 'Cracked', desc: 'Damaged glass or back' },
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setCondition(cond.id as any)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          condition === cond.id
                            ? 'bg-emerald-500/15 border-emerald-400 text-neutral-100'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <span className="block text-xs font-bold text-neutral-200">{cond.label}</span>
                        <span className="text-[10px] text-neutral-500 mt-0.5 block leading-tight">{cond.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Carrier Lock Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCarrierStatus('unlocked')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        carrierStatus === 'unlocked'
                          ? 'bg-emerald-500/15 border-emerald-400 text-neutral-100'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Factory Unlocked (Works on Any Carrier)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarrierStatus('locked')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        carrierStatus === 'locked'
                          ? 'bg-emerald-500/15 border-emerald-400 text-neutral-100'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Carrier Locked (T-Mobile, AT&amp;T, Verizon)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-neutral-950 rounded-2xl border border-neutral-750 p-6 sm:p-8 space-y-5 text-center shadow-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Instant Trade-In Value
              </span>

              <div className="py-2">
                <div className="text-5xl font-black text-emerald-400 tracking-tight">
                  ${estimatedValue}
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Immediate Cash or Store Credit at Counter
                </p>
              </div>

              <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-neutral-300 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Device:</span>
                  <span className="font-semibold text-neutral-200">{selectedDevice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Condition:</span>
                  <span className="capitalize font-semibold text-neutral-200">{condition}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Carrier:</span>
                  <span className="capitalize font-semibold text-neutral-200">{carrierStatus}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {!claimed ? (
                  <button
                    onClick={() => setClaimed(true)}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-98"
                  >
                    <CircleDollarSign className="w-4 h-4" />
                    <span>Lock In Cash Offer &amp; Walk In</span>
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs space-y-1">
                    <p className="font-bold">Offer Locked! Bring device to 259 B Canal St</p>
                    <p className="text-[11px] text-neutral-300">
                      Show this screen to the technician for immediate fast-track payout after physical inspection.
                    </p>
                  </div>
                )}

                <a
                  href={`tel:${STORE_INFO.phoneClean}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call to Verify Model: {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
