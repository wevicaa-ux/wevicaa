import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Smartphone, 
  ShieldCheck, 
  Battery, 
  Tag, 
  Check, 
  ArrowUpDown,
  Sparkles,
  BookmarkCheck,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { DEVICE_CATALOG } from '../data/shopData';
import { DeviceItem, DeviceReservation } from '../types';
import { DeviceDetailModal } from './DeviceDetailModal';

interface DeviceCatalogProps {
  onReserveDevice: (reservation: Omit<DeviceReservation, 'id' | 'reservationCode' | 'createdAt' | 'status'>) => void;
}

export const DeviceCatalog: React.FC<DeviceCatalogProps> = ({ onReserveDevice }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeModalDevice, setActiveModalDevice] = useState<DeviceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'smartphones', label: 'iPhones & Phones' },
    { id: 'tablets', label: 'iPads & Tablets' },
    { id: 'wearables', label: 'Apple Watch' },
    { id: 'accessories', label: 'Accessories & Protection' },
  ];

  const conditions = [
    { id: 'all', label: 'All Conditions' },
    { id: 'Brand New', label: 'Brand New' },
    { id: 'Refurbished Grade A+', label: 'Grade A+ Refurbished' },
    { id: 'Open Box', label: 'Open Box' },
  ];

  const filteredDevices = useMemo(() => {
    return DEVICE_CATALOG.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.storage && item.storage.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.color.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition;

      return matchesSearch && matchesCategory && matchesCondition;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: featured/popular first
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedCondition, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Available In-Store &amp; Ready for Pickup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
              Device Catalog &amp; Accessories
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-1 max-w-2xl">
              100% Unlocked smartphones, certified grade A+ refurbished iPhones, iPads, and genuine accessories in stock at 869 E Foothill Blvd, Rialto.
            </p>
          </div>

          <div className="text-xs text-neutral-400 bg-neutral-800/80 px-4 py-2.5 rounded-xl border border-neutral-750 self-start md:self-auto">
            <span className="text-amber-400 font-bold">{filteredDevices.length}</span> devices ready for in-store pickup
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 mb-8 space-y-4 shadow-lg">
          {/* Search bar & Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search iPhones, Galaxy, storage, accessories..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-750 rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <ArrowUpDown className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="pl-9 pr-8 py-2.5 bg-neutral-900 border border-neutral-750 rounded-xl text-sm text-neutral-200 focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-neutral-950 shadow-sm shadow-amber-500/30'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="h-4 w-px bg-neutral-800 mx-2 shrink-0 hidden sm:block" />

            {/* Condition Filters */}
            <div className="hidden sm:flex items-center gap-1.5">
              {conditions.map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondition(cond.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCondition === cond.id
                      ? 'bg-neutral-750 text-amber-300 border border-amber-500/40'
                      : 'bg-neutral-900/60 hover:bg-neutral-900 text-neutral-400 border border-neutral-800/80'
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Device Grid */}
        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="group relative bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-black/40"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-52 bg-neutral-900 overflow-hidden p-3 flex items-center justify-center">
                    <img
                      src={device.image}
                      alt={device.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1 items-start">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 text-neutral-200">
                        {device.condition}
                      </span>
                      {device.popular && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-neutral-950 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                        Unlocked
                      </span>
                    </div>
                  </div>

                  {/* Device info */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                          {device.name}
                        </h3>
                        <p className="text-xs text-neutral-400">
                          {device.storage ? `${device.storage} • ` : ''}{device.color}
                        </p>
                      </div>
                    </div>

                    {/* Price and original price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-2xl font-extrabold text-amber-400">
                        ${device.price}
                      </span>
                      {device.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through">
                          ${device.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Quick specs */}
                    <div className="pt-2 border-t border-neutral-850 space-y-1.5 text-[11px] text-neutral-300">
                      {device.batteryHealth && (
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <Battery className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{device.batteryHealth}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{device.warranty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card actions bottom */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalDevice(device)}
                    className="py-2 px-3 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-750 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => setActiveModalDevice(device)}
                    className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    <span>Hold in Store</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-950 rounded-2xl border border-neutral-800 p-8">
            <Smartphone className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-200">No devices found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
              We update in-store inventory daily. Call our shop at (917) 790-9209 to ask if we have your specific model in stock.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedCondition('all');
              }}
              className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Device Modal */}
      {activeModalDevice && (
        <DeviceDetailModal
          device={activeModalDevice}
          onClose={() => setActiveModalDevice(null)}
          onReserve={(reservation) => {
            onReserveDevice(reservation);
          }}
        />
      )}
    </section>
  );
};
