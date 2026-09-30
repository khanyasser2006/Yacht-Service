import React, { useState } from 'react';
import { 
  Compass, 
  Users, 
  Wind, 
  Zap, 
  Waves, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Sliders, 
  Utensils, 
  Camera, 
  ShieldCheck, 
  Navigation, 
  MapPin 
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function InteractiveItineraryBuilder({ onOpenBooking }) {
  const { siteData } = useSiteData();
  const routes = siteData?.routes || [];
  const [duration, setDuration] = useState('full-day');
  const [guests, setGuests] = useState(8);
  const [selectedRoute, setSelectedRoute] = useState('riviera');
  const [selectedActivities, setSelectedActivities] = useState([
    'sky-riding',
    'seabob-jet',
    'beach-club'
  ]);
  const [selectedAddons, setSelectedAddons] = useState([
    'michelin-chef',
    'drone-cinema'
  ]);

  const durationOptions = [
    { id: 'sunset-thrill', label: 'Sunset & Dusk Session (5 Hours)', hours: 'Golden Hour Troposphere Flight', basePrice: 4200, nmi: '25 NM' },
    { id: 'full-day', label: 'Full Day Grand Expedition (8 Hours)', hours: 'Comprehensive High-Sea Charter', basePrice: 7800, nmi: '48 NM' },
    { id: 'weekend-safari', label: 'Multi-Day Island Voyage (48 Hours)', hours: 'Overnight Starlight Anchorage', basePrice: 22500, nmi: '160 NM' },
  ];

  const activityOptions = [
    { id: 'sky-riding', label: '800ft Parachute Sky Riding', pricePerGuest: 250, icon: Wind, badge: 'Aero-Tether' },
    { id: 'seabob-jet', label: 'Seabob F5 SR Underwater Jets', pricePerGuest: 180, icon: Zap, badge: 'Sub-Aquatic' },
    { id: 'efoil-glider', label: 'Lift3 eFoil Hydrofoil Gliders', pricePerGuest: 200, icon: Waves, badge: 'Hydro-Levitation' },
    { id: 'jet-ski', label: 'Sea-Doo RXT-X 300 & Wakefoil', pricePerGuest: 160, icon: Compass, badge: 'High Velocity' },
    { id: 'beach-club', label: 'Floating 550 SQ FT Sea Pool Club', pricePerGuest: 0, icon: Sparkles, badge: 'Charter Included' },
  ];

  const addonOptions = [
    { id: 'michelin-chef', label: 'Private Michelin-Trained Chef (Caviar & Seafood Raw Bar)', price: 1400, icon: Utensils },
    { id: 'drone-cinema', label: 'Cinematic Drone & 4K Documentary Crew (RAW 60fps Deliverables)', price: 950, icon: Camera },
    { id: 'dive-coach', label: 'Private PADI Master Instructor (Guided Cave & Wreck Safari)', price: 650, icon: ShieldCheck },
  ];

  const toggleActivity = (id) => {
    setSelectedActivities((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const activeDuration = durationOptions.find(d => d.id === duration) || durationOptions[1];
  const activeRouteObj = routes.find(r => r.id === selectedRoute) || routes[0] || {};
  const activitiesTotal = selectedActivities.reduce((sum, actId) => {
    const act = activityOptions.find(a => a.id === actId);
    return sum + (act ? act.pricePerGuest * guests : 0);
  }, 0);
  const addonsTotal = selectedAddons.reduce((sum, addId) => {
    const add = addonOptions.find(a => a.id === addId);
    return sum + (add ? add.price : 0);
  }, 0);
  const totalEstimate = activeDuration.basePrice + activitiesTotal + addonsTotal;

  return (
    <section 
      id="itinerary" 
      className="relative py-20 sm:py-28 lg:py-36 bg-indigo-950 text-frost-100 border-t border-frost-100/15 overflow-hidden"
    >
      {/* Background Decor Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[150px] pointer-events-none animate-ambient-breathe" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none animate-ambient-breathe" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Header Grid with Route Simulator on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-10 sm:mb-16">
          
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs font-semibold text-frost-300 tracking-[0.25em]">
                CONFIGURATOR
              </span>
              <div className="w-8 h-[1px] bg-frost-100/30" />
              <span className="font-mono text-[10px] text-frost-400 uppercase tracking-[0.25em]">
                BESPOKE CHARTER DOSSIER
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-frost-50 leading-tight">
              CURATE YOUR BESPOKE SEA EXPEDITION
            </h2>

            <p className="text-frost-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Select your voyage timeframe, water sport thrills, guest accommodations, and onboard luxury amenities to compute your real-time itinerary estimate.
            </p>
          </div>

          {/* Right: Route Waypoint Selector Pill Box */}
          <div className="lg:col-span-5 bg-indigo-900/60 p-4 sm:p-6 rounded-3xl border border-frost-100/20 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-frost-300 border-b border-frost-100/10 pb-2">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-indigo-400" />
                Select Archipelago Route
              </span>
              <span className="text-frost-100 font-bold">{activeRouteObj.distance}</span>
            </div>

            <div className="space-y-2">
              {routes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoute(r.id)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all text-xs font-mono cursor-pointer ${
                    selectedRoute === r.id
                      ? 'bg-frost-100 text-indigo-950 font-bold border-frost-100 shadow-md'
                      : 'bg-indigo-950/60 text-frost-300 border-frost-100/10 hover:border-frost-100/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${selectedRoute === r.id ? 'text-indigo-950' : 'text-indigo-400'}`} />
                    <span>{r.name}</span>
                  </div>
                  <span className="text-[10px] opacity-75">{r.distance}</span>
                </button>
              ))}
            </div>

            <p className="text-[10px] font-mono text-frost-400 pt-1">
              Waypoints: <span className="text-frost-200">{activeRouteObj.legs}</span>
            </p>
          </div>

        </div>

        {/* 2-Column Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Step 1: Voyage Duration */}
            <div className="bg-indigo-900/40 p-5 sm:p-8 rounded-3xl border border-frost-100/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-frost-300">
                  Step 1 • Voyage Duration
                </span>
                <span className="text-[11px] font-mono text-frost-400">
                  Range: {activeDuration.nmi}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDuration(opt.id)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                      duration === opt.id
                        ? 'border-frost-100 bg-indigo-900/90 text-frost-50 shadow-glow-sm scale-[1.02]'
                        : 'border-frost-100/10 bg-indigo-950/50 text-frost-300 hover:border-frost-100/30'
                    }`}
                  >
                    <div>
                      <span className="block font-semibold text-sm text-frost-100">{opt.label}</span>
                      <span className="text-xs font-mono text-frost-400">{opt.hours}</span>
                    </div>
                    <span className="mt-3 font-mono text-xs font-semibold text-indigo-300">
                      From ${opt.basePrice.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guest Count Slider */}
            <div className="bg-indigo-900/40 p-5 sm:p-8 rounded-3xl border border-frost-100/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-frost-300">
                  Step 2 • Guest Accommodations
                </span>
                <div className="flex items-center gap-2 text-frost-100 font-mono text-sm bg-indigo-900/80 px-3.5 py-1 rounded-full border border-frost-100/20">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{guests} Guests</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="24"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full h-2 bg-indigo-900 rounded-lg appearance-none cursor-pointer accent-frost-100"
              />
              <div className="flex justify-between text-[10px] font-mono text-frost-400">
                <span>1 Guest (Intimate)</span>
                <span>12 Guests (Standard Crew)</span>
                <span>24 Guests (Max Capacity)</span>
              </div>
            </div>

            {/* Step 3: Signature Water Sport & Sky Thrills */}
            <div className="bg-indigo-900/40 p-5 sm:p-8 rounded-3xl border border-frost-100/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-frost-300">
                  Step 3 • Select Water Thrills & Sky Riding
                </span>
                <span className="text-[11px] font-mono text-frost-400">
                  {selectedActivities.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activityOptions.map((act) => {
                  const Icon = act.icon;
                  const isSelected = selectedActivities.includes(act.id);
                  return (
                    <button
                      key={act.id}
                      onClick={() => toggleActivity(act.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-frost-100/60 bg-indigo-900/90 text-frost-50 shadow-glow-sm'
                          : 'border-frost-100/10 bg-indigo-950/50 text-frost-300 hover:border-frost-100/25'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-frost-100 text-indigo-950' : 'bg-indigo-900/60 text-frost-300'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block font-semibold text-xs text-frost-100">{act.label}</span>
                          <span className="text-[10px] font-mono text-indigo-300">
                            {act.pricePerGuest > 0 ? `+$${act.pricePerGuest} / Guest` : 'Complimentary'}
                          </span>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-frost-100 border-frost-100 text-indigo-950' : 'border-frost-100/20'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Bespoke Onboard Luxuries */}
            <div className="bg-indigo-900/40 p-5 sm:p-8 rounded-3xl border border-frost-100/15 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-frost-300 block">
                Step 4 • Onboard Luxury Amenities
              </span>

              <div className="space-y-2.5">
                {addonOptions.map((add) => {
                  const Icon = add.icon;
                  const isSelected = selectedAddons.includes(add.id);
                  return (
                    <button
                      key={add.id}
                      onClick={() => toggleAddon(add.id)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-frost-100/60 bg-indigo-900/80 text-frost-50'
                          : 'border-frost-100/10 bg-indigo-950/50 text-frost-300 hover:border-frost-100/25'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-medium text-frost-100">{add.label}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-frost-300">+${add.price}</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          isSelected ? 'bg-frost-100 border-frost-100 text-indigo-950' : 'border-frost-100/20'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Price Estimate Receipt (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-indigo-900/50 backdrop-blur-xl p-5 sm:p-8 rounded-3xl border border-frost-100/20 shadow-frost-card relative overflow-hidden">
              
              <div className="relative z-10 space-y-6">
                <div className="border-b border-frost-100/10 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-frost-400">
                    Real-Time Allocation
                  </span>
                  <h3 className="font-display text-2xl font-bold text-frost-50 mt-1">
                    CHARTER DOSSIER
                  </h3>
                </div>

                {/* Breakdown List */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center text-frost-300">
                    <span>Vessel Charter Base</span>
                    <span className="font-mono font-medium text-frost-100">${activeDuration.basePrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-frost-300">
                    <span>Passage Passage</span>
                    <span className="font-mono text-frost-100">{activeRouteObj.name}</span>
                  </div>

                  <div className="flex justify-between items-center text-frost-300">
                    <span>Guest Manifest ({guests} Guests)</span>
                    <span className="font-mono text-frost-400">Included</span>
                  </div>

                  <div className="flex justify-between items-center text-frost-300">
                    <span>Water Thrills ({selectedActivities.length} Selected)</span>
                    <span className="font-mono font-medium text-frost-100">${activitiesTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-frost-300">
                    <span>Luxury Amenities ({selectedAddons.length} Selected)</span>
                    <span className="font-mono font-medium text-frost-100">${addonsTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-frost-400/80 text-[11px] pt-2">
                    <span>Bunker Marine Fuel & Crew</span>
                    <span className="font-mono">Complimentary</span>
                  </div>
                </div>

                {/* Total Estimate Block */}
                <div className="pt-6 border-t border-frost-100/15 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-frost-400 block">
                      Estimated Rate
                    </span>
                    <span className="text-[11px] text-frost-400 font-light">All taxes, harbor fees & crew included</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-3xl font-bold text-frost-50 text-glow">
                      ${totalEstimate.toLocaleString()}
                    </span>
                    <span className="block text-[10px] font-mono text-indigo-300">USD</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onOpenBooking({
                    duration: activeDuration.label,
                    route: activeRouteObj.name,
                    guests,
                    activities: selectedActivities,
                    addons: selectedAddons,
                    estimate: totalEstimate,
                  })}
                  className="shine-sweep w-full py-4 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 hover:shadow-glow-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Request Reservation Dossier</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-frost-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Verified Concierge Confirmation within 15 Minutes</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
