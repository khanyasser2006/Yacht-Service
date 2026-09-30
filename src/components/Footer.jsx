import React, { useState } from 'react';
import { 
  Anchor, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Compass, 
  ShieldCheck, 
  ArrowUp,
  Waves,
  X,
  FileText,
  Lock
} from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState('terms');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const openLegal = (tab = 'terms') => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-indigo-950 text-frost-100 border-t border-frost-100/10 pt-16 sm:pt-20 pb-12 overflow-hidden">
      
      {/* Subtle Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-800/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Top Section: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-frost-100/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-frost-100/30 bg-indigo-900/60 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-frost-100" />
              </div>
              <span className="font-display tracking-[0.25em] text-lg sm:text-xl font-bold text-frost-50">
                AURA NAUTICA
              </span>
            </div>

            <p className="text-frost-300 text-xs sm:text-sm font-light leading-relaxed max-w-md">
              A luxury yacht charter dedicated to exciting sea adventures. We offer 800-foot parachute sky riding, electric surfboards, underwater jets, and full-service private charters.
            </p>

            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-frost-400">
              <span>Vessels Available Now</span>
              <span>•</span>
              <span>Mediterranean & Caribbean</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-frost-300 block">
              Water Experiences
            </span>
            <ul className="space-y-2.5 text-xs text-frost-400">
              <li><a href="#/experiences" className="hover:text-frost-100 transition-colors">Sea Experiences</a></li>
              <li><a href="#/rides" className="hover:text-frost-100 transition-colors">High-Speed Rides & Toys</a></li>
              <li><a href="#/divers" className="hover:text-frost-100 transition-colors">Master Divers & Reefs</a></li>
              <li><a href="#/reviews" className="hover:text-frost-100 transition-colors">Guest Stories & Ratings</a></li>
              <li><a href="#/auth" className="hover:text-frost-100 transition-colors">Officer & Client Sanctuary</a></li>
            </ul>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-frost-300 block">
              Stay in Touch
            </span>
            <p className="text-xs text-frost-400 font-light leading-relaxed">
              Join our email list to receive new cruise dates, seasonal deals, and secret island destinations.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-indigo-900/50 border border-frost-100/15 text-frost-50 placeholder:text-frost-400/40 text-base sm:text-xs focus:outline-none focus:border-frost-100 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-5 py-3 rounded-full bg-frost-100 text-indigo-950 hover:bg-frost-50 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-2xl bg-indigo-900/60 border border-frost-100/20 text-xs text-frost-100 font-mono">
                ✓ Thank you! You are now subscribed.
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Coordinates, Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-frost-400/70">
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>© {new Date().getFullYear()} AURA NAUTICA SERVICES LTD.</span>
            <span className="hidden md:inline">25.07° N, 77.33° W</span>
            <button 
              type="button"
              onClick={() => openLegal('terms')}
              className="text-frost-400 hover:text-frost-100 transition-colors cursor-pointer"
            >
              Charter Terms
            </button>
            <button 
              type="button"
              onClick={() => openLegal('safety')}
              className="text-frost-400 hover:text-frost-100 transition-colors cursor-pointer"
            >
              Safety Protocol
            </button>
            <button 
              type="button"
              onClick={() => openLegal('privacy')}
              className="text-frost-400 hover:text-frost-100 transition-colors cursor-pointer"
            >
              Privacy Discretion
            </button>
            <a 
              href="#/auth" 
              className="text-frost-400 hover:text-frost-100 transition-colors uppercase tracking-widest text-[10px]"
            >
              Officer Portal
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-frost-300 hover:text-frost-50 transition-colors group cursor-pointer"
          >
            <span className="tracking-wider uppercase text-[10px]">Ascend to Top</span>
            <div className="w-6 h-6 rounded-full border border-frost-100/20 flex items-center justify-center group-hover:border-frost-100 group-hover:bg-indigo-900/60 transition-all">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>

        </div>

      </div>

      {/* Maritime Legal & Safety Policy Modal */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-indigo-950/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-frost-50 text-indigo-950 rounded-3xl p-6 sm:p-10 border border-frost-300 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-frost-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-indigo-800" />
                <h3 className="font-display text-lg sm:text-xl font-bold text-indigo-950">
                  MARITIME CHARTER POLICIES & SAFETY
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLegalModalOpen(false)}
                className="w-9 h-9 rounded-full border border-frost-300 flex items-center justify-center hover:bg-frost-200 transition-colors cursor-pointer"
                aria-label="Close legal modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-frost-300 pb-3 flex-wrap">
              {[
                { id: 'terms', label: 'Charter Terms' },
                { id: 'safety', label: 'Safety Protocol' },
                { id: 'privacy', label: 'Privacy Discretion' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveLegalTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeLegalTab === tab.id
                      ? 'bg-indigo-950 text-frost-50 font-bold shadow-sm'
                      : 'bg-frost-200 text-indigo-950 hover:bg-frost-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="text-xs font-sans text-indigo-900 leading-relaxed space-y-4">
              {activeLegalTab === 'terms' && (
                <div className="space-y-3">
                  <h4 className="font-display text-sm font-bold text-indigo-950">MYBA Superyacht Charter Terms</h4>
                  <p>
                    All reservations arranged via AURA NAUTICA adhere to Mediterranean Yacht Brokers Association (MYBA) guidelines and Western Mediterranean Terms (WMT). Fuel bunkering, gourmet provisions, and harbor docking fees are calculated and settled via Advance Provisioning Allowance (APA).
                  </p>
                  <p>
                    Cancellations made 30 days prior to embarkation are eligible for full itinerary rescheduling or transfer of charter credits to alternate seasons in Monaco or the Caribbean.
                  </p>
                </div>
              )}

              {activeLegalTab === 'safety' && (
                <div className="space-y-3">
                  <h4 className="font-display text-sm font-bold text-indigo-950">High-Speed Ocean Sports & Parachute Riding Safety</h4>
                  <p>
                    All parachute ascents (up to 800 feet) utilize redundant aerospace-grade Kevlar towlines and hydraulically synchronized stern winches operated by certified Master Flight Rigger captains.
                  </p>
                  <p>
                    Submersible Seabob and underwater jet scooters operate under electronic geofence depth restrictors (maximum 12 meters). All deep reef diving is led by licensed PADI Master Instructors with Starlink emergency transponders aboard every tender.
                  </p>
                </div>
              )}

              {activeLegalTab === 'privacy' && (
                <div className="space-y-3">
                  <h4 className="font-display text-sm font-bold text-indigo-950">Client Discretion & Confidentiality</h4>
                  <p>
                    AURA NAUTICA enforces strict Non-Disclosure Agreements (NDA) across all bridge officers, stewards, private chefs, and tender drivers.
                  </p>
                  <p>
                    Vessel passenger manifests and guest identities remain strictly confidential and are never sold, publicized, or broadcast on public AIS tracking channels beyond mandatory harbor authority safety regulations.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-frost-300 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-indigo-950 text-frost-50 font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer hover:bg-indigo-900 transition-all"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
