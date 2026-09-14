import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  ExternalLink, 
  Navigation, 
  Train, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Copy, 
  Check 
} from 'lucide-react';
import { STORE_INFO, FAQS_DATA } from '../data/shopData';

export const StoreLocationContact: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(STORE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) return;

    setIsSent(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="location" className="py-16 bg-neutral-900 border-b border-neutral-800 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Chinatown / Lower Manhattan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
            Store Location &amp; Contact Information
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Visit us at 259 B Canal St in the heart of Manhattan. Steps from Canal St subway station, open 7 days a week.
          </p>
        </div>

        {/* Contact & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Store Details & Fast Reach */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Address & Phone Card */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-5 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Physical Store Address
                  </span>
                  <h3 className="text-xl font-bold text-neutral-100 mt-1">
                    {STORE_INFO.name}
                  </h3>
                  <p className="text-sm text-neutral-300 font-medium mt-1">
                    {STORE_INFO.address}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {STORE_INFO.crossStreets} • {STORE_INFO.neighborhood}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Direct Maps CTA */}
              <div className="pt-2">
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps / Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Subway Access */}
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <Train className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300">
                  <p className="font-bold text-neutral-200">Subway Directions</p>
                  <p className="text-neutral-400 mt-0.5">
                    Take the <strong className="text-amber-400">N, Q, R, W, J, Z, or 6</strong> train directly to Canal Street station. Our shop is located right at 259 B Canal St.
                  </p>
                </div>
              </div>

              {/* Phone and Call Buttons */}
              <div className="pt-2 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Direct Store Phone:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyPhone}
                      className="p-1 rounded text-neutral-400 hover:text-white"
                      title="Copy phone number"
                    >
                      {copiedPhone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={`tel:${STORE_INFO.phoneClean}`}
                      className="text-base font-extrabold text-amber-400 hover:underline"
                    >
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${STORE_INFO.phoneClean}`}
                    className="py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-750 text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Store</span>
                  </a>
                  <a
                    href={`sms:${STORE_INFO.phoneClean}`}
                    className="py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-750 text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Text Message</span>
                  </a>
                </div>
              </div>

              {/* Store Hours Table */}
              <div className="pt-2 border-t border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Business Hours</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  {STORE_INFO.hours.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 px-2.5 rounded bg-neutral-900/60 border border-neutral-800/80"
                    >
                      <span className="text-neutral-300 font-medium">{h.days}</span>
                      <span className="font-bold text-neutral-100">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Visual Embed + Quick Message Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Map Container */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-neutral-200">Interactive Store Map</span>
                </div>
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-neutral-800">
                <iframe
                  title="Kimi iPhone Repair & Accessories Map"
                  src="https://maps.google.com/maps?q=259+B+Canal+St,+New+York,+NY+10013&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[0.95] brightness-[0.9]"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute bottom-3 left-3 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-750 text-[11px] text-neutral-200 flex items-center gap-2 shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>259 B Canal St • Walk-ins Welcomed Now</span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-100">Send an Inquiry or Question</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Have a question about phone availability or a specific motherboard issue? We respond quickly.
                  </p>
                </div>
              </div>

              {!isSent ? (
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Samuel"
                        className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Phone or Email *</label>
                      <input
                        type="text"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Phone or email"
                        className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">How can we help? *</label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="e.g. Do you have iPhone 15 Pro in Natural Titanium in stock today? Or can you fix water damage?"
                      className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-750 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Kimi Store</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-neutral-100">Message Received!</h4>
                  <p className="text-xs text-neutral-300">
                    Thank you {contactName}. Our team at 259 B Canal St will follow up shortly. For urgent repairs, feel free to call directly at {STORE_INFO.phone}.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setContactMessage('');
                    }}
                    className="text-xs text-amber-400 hover:underline pt-1 block mx-auto"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-neutral-100">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Everything you need to know before visiting our Canal Street repair shop.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-sm text-neutral-200">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 border-t border-neutral-850 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
