import React from 'react';
import { 
  Wrench, 
  Smartphone, 
  BatteryCharging, 
  Sparkles, 
  Zap, 
  Camera, 
  Droplets, 
  Volume2, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { REPAIR_SERVICES, STORE_INFO } from '../data/shopData';
import { RepairService } from '../types';

interface RepairServicesProps {
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const RepairServices: React.FC<RepairServicesProps> = ({
  onSelectServiceForQuote,
}) => {
  // Map icon names to Lucide components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-amber-400" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-6 h-6 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-sky-400" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-cyan-400" />;
      case 'Volume2':
        return <Volume2 className="w-6 h-6 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-400" />;
      default:
        return <Wrench className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Certified Technicians in Rialto, CA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
            Professional Mobile Repair Services
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            All repairs are performed on-site at 869 E Foothill Blvd. Backed by our 30-Day Hassle-Free Warranty, walk-ins welcome.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {REPAIR_SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-700 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-black/50 group"
            >
              {service.popular && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-neutral-950">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Icon and Title */}
                <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {renderIcon(service.iconName)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price and turnaround badges */}
                <div className="flex items-center justify-between py-2 border-y border-neutral-800/80 text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{service.estimatedTime}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 block">Starting at</span>
                    <span className="text-base font-extrabold text-amber-400">
                      ${service.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-neutral-300">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-neutral-800">
                <button
                  onClick={() => onSelectServiceForQuote(service.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-neutral-700 hover:border-amber-400"
                >
                  <span>Select for Instant Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Repair Policy Banner */}
        <div className="mt-12 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-850 rounded-2xl border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-neutral-100">
                Our 30-Day Express Repair Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5 max-w-xl">
                Every screen, battery, and camera replacement comes with an unconditional 30-day parts &amp; labor warranty. If anything glitches, we fix it free of charge.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${STORE_INFO.phoneClean}`}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
            >
              Direct Line: {STORE_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
