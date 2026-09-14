import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  Smartphone, 
  Check, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  Sparkles,
  ArrowRight,
  Ticket
} from 'lucide-react';
import { MODEL_PRICING_DATABASE, STORE_INFO } from '../data/shopData';
import { ModelPricing, RepairBooking } from '../types';

interface RepairEstimatorProps {
  preselectedServiceId?: string | null;
  onBookingConfirmed: (booking: Omit<RepairBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => void;
}

export const RepairEstimator: React.FC<RepairEstimatorProps> = ({
  preselectedServiceId,
  onBookingConfirmed,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<'Apple' | 'Samsung' | 'Google' | 'iPad'>('Apple');
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 14 Pro');
  const [selectedIssues, setSelectedIssues] = useState<string[]>(['screen']);
  
  // Form fields for express booking
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('Today (Walk-in)');
  const [preferredTime, setPreferredTime] = useState('As soon as possible');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingCode, setConfirmedBookingCode] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  // Preselection effect
  useEffect(() => {
    if (preselectedServiceId) {
      if (preselectedServiceId === 'screen-repair') setSelectedIssues(['screen']);
      else if (preselectedServiceId === 'battery-replacement') setSelectedIssues(['battery']);
      else if (preselectedServiceId === 'back-glass-repair') setSelectedIssues(['backGlass']);
      else if (preselectedServiceId === 'charging-port') setSelectedIssues(['port']);
      else if (preselectedServiceId === 'camera-repair') setSelectedIssues(['camera']);
    }
  }, [preselectedServiceId]);

  // Filter available models for selected brand
  const availableModels = useMemo(() => {
    return MODEL_PRICING_DATABASE.filter((m) => m.brand === selectedBrand);
  }, [selectedBrand]);

  // Ensure selected model is valid when brand changes
  useEffect(() => {
    if (availableModels.length > 0 && !availableModels.some((m) => m.model === selectedModel)) {
      setSelectedModel(availableModels[0].model);
    }
  }, [selectedBrand, availableModels, selectedModel]);

  // Current model pricing
  const currentPricing = useMemo(() => {
    return MODEL_PRICING_DATABASE.find((m) => m.model === selectedModel) || availableModels[0];
  }, [selectedModel, availableModels]);

  const toggleIssue = (issueKey: string) => {
    setSelectedIssues((prev) => {
      if (prev.includes(issueKey)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((i) => i !== issueKey);
      } else {
        return [...prev, issueKey];
      }
    });
  };

  // Calculate pricing breakdown
  const calculation = useMemo(() => {
    if (!currentPricing) return { total: 0, items: [], timeEst: '20 - 30 mins' };

    let total = 0;
    const items: { label: string; price: number; time: string }[] = [];

    if (selectedIssues.includes('screen') && currentPricing.screenPrice) {
      total += currentPricing.screenPrice;
      items.push({ label: 'Screen & OLED Display', price: currentPricing.screenPrice, time: '20 mins' });
    }
    if (selectedIssues.includes('battery') && currentPricing.batteryPrice) {
      total += currentPricing.batteryPrice;
      items.push({ label: 'Battery Health 100% Replacement', price: currentPricing.batteryPrice, time: '20 mins' });
    }
    if (selectedIssues.includes('backGlass') && currentPricing.backGlassPrice) {
      total += currentPricing.backGlassPrice;
      items.push({ label: 'Laser Back Glass Replacement', price: currentPricing.backGlassPrice, time: '45 mins' });
    }
    if (selectedIssues.includes('port') && currentPricing.chargingPortPrice) {
      total += currentPricing.chargingPortPrice;
      items.push({ label: 'Charging Port & Cleaning', price: currentPricing.chargingPortPrice, time: '20 mins' });
    }
    if (selectedIssues.includes('camera') && currentPricing.cameraPrice) {
      total += currentPricing.cameraPrice;
      items.push({ label: 'Camera Lens / Module Repair', price: currentPricing.cameraPrice, time: '30 mins' });
    }

    // Determine estimated turnaround
    let timeEst = '20 - 30 mins';
    if (selectedIssues.includes('backGlass') || items.length > 2) {
      timeEst = '40 - 50 mins';
    }

    return { total, items, timeEst };
  }, [currentPricing, selectedIssues]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('Please enter your name and contact phone number.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const bookingCode = `KIMI-${Math.floor(100000 + Math.random() * 900000)}`;

    const bookingData = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deviceBrand: selectedBrand,
      deviceModel: selectedModel,
      services: calculation.items.map((i) => i.label),
      estimatedTotal: calculation.total,
      preferredDate,
      preferredTime,
      notes: notes.trim() || undefined,
    };

    onBookingConfirmed(bookingData);
    setConfirmedBookingCode(bookingCode);
    setIsSubmitting(false);
  };

  return (
    <section id="quote" className="py-16 bg-neutral-900 border-b border-neutral-800 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Cost Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
            Instant Repair Price Quote &amp; Booking
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Select your phone model and issue for immediate transparent pricing. Reserve your parts online for priority walk-in service on Canal Street.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Device & Issue Selectors */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-6 shadow-xl">
            {/* Step 1: Select Brand */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                1. Select Brand
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Apple', 'Samsung', 'Google', 'iPad'] as const).map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedBrand === brand
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border-neutral-750'
                    }`}
                  >
                    {brand === 'Apple' ? 'Apple iPhone' : brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Model */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                2. Select Specific Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-750 rounded-xl text-sm font-semibold text-neutral-100 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {availableModels.map((m) => (
                  <option key={m.model} value={m.model}>
                    {m.model}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Select Issues */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  3. Select Issue(s) to Fix
                </label>
                <span className="text-[11px] text-neutral-500">You can select multiple</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentPricing?.screenPrice !== undefined && (
                  <button
                    type="button"
                    onClick={() => toggleIssue('screen')}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                      selectedIssues.includes('screen')
                        ? 'bg-amber-500/15 border-amber-400 text-neutral-100 shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${selectedIssues.includes('screen') ? 'text-amber-400' : 'text-neutral-500'}`} />
                        <span>Screen / OLED Replacement</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">Cracked glass, black spots, glitch</p>
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 shrink-0">
                      ${currentPricing.screenPrice}
                    </span>
                  </button>
                )}

                {currentPricing?.batteryPrice !== undefined && (
                  <button
                    type="button"
                    onClick={() => toggleIssue('battery')}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                      selectedIssues.includes('battery')
                        ? 'bg-amber-500/15 border-amber-400 text-neutral-100 shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${selectedIssues.includes('battery') ? 'text-amber-400' : 'text-neutral-500'}`} />
                        <span>Battery Replacement (100%)</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">Drains fast, sudden shutoffs</p>
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 shrink-0">
                      ${currentPricing.batteryPrice}
                    </span>
                  </button>
                )}

                {currentPricing?.backGlassPrice !== undefined && (
                  <button
                    type="button"
                    onClick={() => toggleIssue('backGlass')}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                      selectedIssues.includes('backGlass')
                        ? 'bg-amber-500/15 border-amber-400 text-neutral-100 shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${selectedIssues.includes('backGlass') ? 'text-amber-400' : 'text-neutral-500'}`} />
                        <span>Laser Back Glass Repair</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">Laser beam rear housing fix</p>
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 shrink-0">
                      ${currentPricing.backGlassPrice}
                    </span>
                  </button>
                )}

                {currentPricing?.chargingPortPrice !== undefined && (
                  <button
                    type="button"
                    onClick={() => toggleIssue('port')}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                      selectedIssues.includes('port')
                        ? 'bg-amber-500/15 border-amber-400 text-neutral-100 shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${selectedIssues.includes('port') ? 'text-amber-400' : 'text-neutral-500'}`} />
                        <span>Charging Port &amp; Lint Clean</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">Loose plug, moisture warning</p>
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 shrink-0">
                      ${currentPricing.chargingPortPrice}
                    </span>
                  </button>
                )}

                {currentPricing?.cameraPrice !== undefined && (
                  <button
                    type="button"
                    onClick={() => toggleIssue('camera')}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                      selectedIssues.includes('camera')
                        ? 'bg-amber-500/15 border-amber-400 text-neutral-100 shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${selectedIssues.includes('camera') ? 'text-amber-400' : 'text-neutral-500'}`} />
                        <span>Camera Lens / Module</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">Cracked glass, blurry or black</p>
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 shrink-0">
                      ${currentPricing.cameraPrice}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Quote Summary & Priority Booking Form */}
          <div className="lg:col-span-5 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-6 shadow-xl">
            {!confirmedBookingCode ? (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="border-b border-neutral-800 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Estimated Repair Total
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {selectedModel}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-amber-400">
                      ${calculation.total}
                    </span>
                    <span className="text-xs text-neutral-400">Includes parts &amp; labor</span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Est. Time: <strong className="text-neutral-100">{calculation.timeEst}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>30-Day Guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown list */}
                <div className="space-y-1.5 text-xs text-neutral-300 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                  <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1">Selected Services:</p>
                  {calculation.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-neutral-800/60 last:border-0">
                      <span>{item.label}</span>
                      <span className="font-bold text-neutral-200">${item.price}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-emerald-400 pt-1">
                    <span>Tempered Glass Screen Protector</span>
                    <span className="font-bold">FREE with Screen Fix</span>
                  </div>
                </div>

                {formError && (
                  <div className="flex items-center gap-2 p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Express Booking Inputs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Express Walk-In Fast Pass (Zero Deposit)
                  </h4>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Jordan Miller"
                      className="w-full px-3 py-2 text-sm bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Cell Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(917) 000-0000"
                      className="w-full px-3 py-2 text-sm bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">When to Walk In</label>
                      <select
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                      >
                        <option value="Today (Walk-in)">Today (Walk-in)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="This Weekend">This Weekend</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Preferred Time</label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
                      >
                        <option value="Morning (10AM - 1PM)">10:00 AM - 1:00 PM</option>
                        <option value="Afternoon (1PM - 4PM)">1:00 PM - 4:00 PM</option>
                        <option value="Evening (4PM - 7:30PM)">4:00 PM - 7:30 PM</option>
                        <option value="As soon as possible">As soon as possible</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/25 active:scale-98"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Get Fast-Pass Walk-In Voucher</span>
                </button>

                <p className="text-[11px] text-neutral-500 text-center">
                  No payment required online. Pay in-store after your device is fully tested and verified working.
                </p>
              </form>
            ) : (
              /* Booking Voucher Card */
              <div className="bg-neutral-900 rounded-xl p-6 border-2 border-dashed border-amber-500/50 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    Repair Fast Pass Confirmed
                  </span>
                  <h3 className="text-xl font-extrabold text-neutral-100 mt-1">
                    Ready for Walk-in!
                  </h3>
                  <div className="mt-2 inline-block px-4 py-1.5 bg-neutral-950 rounded-lg border border-amber-500/40 text-sm font-mono font-bold text-amber-300">
                    VOUCHER #{confirmedBookingCode}
                  </div>
                </div>

                <div className="p-3 bg-neutral-950 rounded-lg text-left text-xs space-y-2 border border-neutral-800">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Customer:</span>
                    <span className="font-semibold text-neutral-200">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Device:</span>
                    <span className="font-semibold text-neutral-200">{selectedModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Quote:</span>
                    <span className="font-bold text-amber-400">${calculation.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Expected Time:</span>
                    <span className="text-neutral-200">{calculation.timeEst}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-300">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{STORE_INFO.address} (Show voucher on phone at counter)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={STORE_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Get Directions to 259 B Canal St</span>
                  </a>

                  <button
                    onClick={() => setConfirmedBookingCode(null)}
                    className="text-xs text-neutral-400 hover:text-white py-1"
                  >
                    Calculate Another Device
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
