import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Battery, 
  Smartphone, 
  PhoneCall, 
  MapPin, 
  Clock, 
  AlertCircle,
  BookmarkCheck,
  Tag
} from 'lucide-react';
import { DeviceItem, DeviceReservation } from '../types';
import { STORE_INFO } from '../data/shopData';

interface DeviceDetailModalProps {
  device: DeviceItem | null;
  onClose: () => void;
  onReserve: (reservation: Omit<DeviceReservation, 'id' | 'reservationCode' | 'createdAt' | 'status'>) => void;
}

export const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({
  device,
  onClose,
  onReserve,
}) => {
  if (!device) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupDate, setPickupDate] = useState('Today (Within 2 Hours)');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setError('Please provide your name and phone number for the hold.');
      return;
    }

    onReserve({
      deviceId: device.id,
      deviceName: `${device.name} ${device.storage ? `(${device.storage})` : ''}`,
      price: device.price,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      pickupDate,
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-750 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {device.brand}
            </span>
            <span className="text-xs text-neutral-400">In Stock at 869 E Foothill Blvd</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            id="close-device-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Top Product Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-5 bg-neutral-950 rounded-xl p-4 border border-neutral-800 flex items-center justify-center relative overflow-hidden group">
              <img
                src={device.image}
                alt={device.name}
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-700 text-neutral-200">
                {device.condition}
              </span>
            </div>

            <div className="sm:col-span-7 space-y-3">
              <div>
                <h3 className="text-2xl font-bold text-neutral-100">{device.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-neutral-400">
                  {device.storage && <span className="font-semibold text-neutral-200">{device.storage}</span>}
                  <span>•</span>
                  <span>Color: {device.color}</span>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-extrabold text-amber-400">
                  ${device.price}
                </span>
                {device.originalPrice && (
                  <span className="text-base text-neutral-500 line-through">
                    ${device.originalPrice}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Tax Free Cash Special
                </span>
              </div>

              {/* Key metadata pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {device.batteryHealth && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-200">
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                    {device.batteryHealth}
                  </span>
                )}
                <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  {device.warranty}
                </span>
              </div>
            </div>
          </div>

          {/* Specifications list */}
          <div className="space-y-2 border-t border-neutral-800 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Verified Specifications &amp; Inclusions
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
              {device.specs.map((spec, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-neutral-800/60 p-2 rounded-lg border border-neutral-750">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* In-Store Pickup Hold Form */}
          <div className="border-t border-neutral-800 pt-5">
            {!submitted ? (
              <form onSubmit={handleSubmitReservation} className="space-y-4 bg-neutral-950/60 p-5 rounded-xl border border-neutral-750">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100">Reserve &amp; Hold at Store</h4>
                    <p className="text-xs text-neutral-400">
                      Zero deposit required. We will hold this device under your name at 869 E Foothill Blvd.
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(917) 000-0000"
                      className="w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Email (For Digital Receipt)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="alex@example.com (Optional)"
                      className="w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Estimated Pickup Time
                    </label>
                    <select
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Today (Within 2 Hours)">Today (Within 2 Hours)</option>
                      <option value="Today Afternoon">Today Afternoon</option>
                      <option value="Tomorrow Morning">Tomorrow Morning</option>
                      <option value="Tomorrow Afternoon">Tomorrow Afternoon</option>
                      <option value="This Weekend">This Weekend</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 active:scale-98"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Confirm Free In-Store Hold</span>
                  </button>

                  <a
                    href={`tel:${STORE_INFO.phoneClean}`}
                    className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-400" />
                    <span>Call To Reserve</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-neutral-100">Hold Confirmed for {customerName}!</h4>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  We have placed <span className="font-semibold text-amber-400">{device.name}</span> on hold for you at our shop.
                </p>
                <div className="p-3 bg-neutral-900 rounded-lg text-xs text-neutral-300 text-left space-y-1.5 border border-neutral-750 max-w-sm mx-auto">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{STORE_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Pickup Window: {pickupDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Questions? Call {STORE_INFO.phone}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold"
                >
                  Done &amp; Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
