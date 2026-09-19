import React from 'react';
import { 
  X, 
  BookmarkCheck, 
  Ticket, 
  Phone, 
  MapPin, 
  Trash2, 
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { DeviceReservation, RepairBooking } from '../types';
import { STORE_INFO } from '../data/shopData';

interface ActiveReservationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deviceReservations: DeviceReservation[];
  repairBookings: RepairBooking[];
  onRemoveDeviceReservation: (id: string) => void;
  onRemoveRepairBooking: (id: string) => void;
}

export const ActiveReservationsDrawer: React.FC<ActiveReservationsDrawerProps> = ({
  isOpen,
  onClose,
  deviceReservations,
  repairBookings,
  onRemoveDeviceReservation,
  onRemoveRepairBooking,
}) => {
  if (!isOpen) return null;

  const totalItems = deviceReservations.length + repairBookings.length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/70 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-neutral-900 h-full border-l border-neutral-800 shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-neutral-100">My Holds &amp; Repair Vouchers</h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            id="close-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {totalItems === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Ticket className="w-12 h-12 text-neutral-600 mx-auto" />
              <h4 className="font-bold text-neutral-200">No active holds or bookings</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                When you reserve a device from our catalog or get a repair fast-pass, your pickup vouchers will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Device Holds */}
              {deviceReservations.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Device In-Store Holds ({deviceReservations.length})
                  </span>
                  {deviceReservations.map((res) => (
                    <div
                      key={res.id}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-3 relative group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-1">
                            HOLD #{res.reservationCode}
                          </div>
                          <h4 className="font-bold text-sm text-neutral-100">{res.deviceName}</h4>
                          <p className="text-xs text-amber-400 font-extrabold mt-0.5">${res.price}</p>
                        </div>
                        <button
                          onClick={() => onRemoveDeviceReservation(res.id)}
                          className="p-1 rounded text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Remove hold"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-neutral-400 space-y-1 bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                        <p>Customer: <strong className="text-neutral-200">{res.customerName}</strong></p>
                        <p>Phone: <strong className="text-neutral-200">{res.customerPhone}</strong></p>
                        <p>Pickup Window: <strong className="text-neutral-200">{res.pickupDate}</strong></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Repair Bookings */}
              {repairBookings.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Repair Fast-Pass Vouchers ({repairBookings.length})
                  </span>
                  {repairBookings.map((bk) => (
                    <div
                      key={bk.id}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-3 relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-1">
                            VOUCHER #{bk.bookingCode}
                          </div>
                          <h4 className="font-bold text-sm text-neutral-100">{bk.deviceModel}</h4>
                          <p className="text-xs text-emerald-400 font-extrabold mt-0.5">
                            Est. Quote: ${bk.estimatedTotal}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveRepairBooking(bk.id)}
                          className="p-1 rounded text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Remove booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-neutral-400 space-y-1 bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                        <p>Services: <span className="text-neutral-200">{bk.services.join(', ')}</span></p>
                        <p>Walk-in Time: <strong className="text-neutral-200">{bk.preferredDate} ({bk.preferredTime})</strong></p>
                        <p>Contact: <strong className="text-neutral-200">{bk.customerName} • {bk.customerPhone}</strong></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Shop Direct Info */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 space-y-3">
          <div className="text-xs text-neutral-300 space-y-1.5">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{STORE_INFO.address} (Rialto, CA)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Questions? Call <a href={`tel:${STORE_INFO.phoneClean}`} className="text-amber-400 font-bold hover:underline">{STORE_INFO.phone}</a></span>
            </div>
          </div>

          <a
            href={STORE_INFO.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open Store in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
