import React, { useState } from 'react';
import { 
  Wind, 
  Zap, 
  Waves, 
  ArrowRight, 
  ShieldCheck, 
  Gauge, 
  Sparkles, 
  Eye, 
  Check, 
  ChevronRight,
  Anchor
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Rides({ onOpenBooking }) {
  const { siteData } = useSiteData();
  const ridesData = siteData?.rides || [];
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRide, setSelectedRide] = useState(0);

  const categories = [
    { id: 'all', label: 'All Rides (7)' },
    { id: 'flight', label: 'Air Diving & Flight' },
    { id: 'speed', label: 'Underwater & Speed' },
    { id: 'board', label: 'Board & Tow' },
    { id: 'family', label: 'Family Thrills' },
  ];

  const filteredRides = activeCategory === 'all' 
    ? ridesData 
    : ridesData.filter(r => r.category === activeCategory);

  const currentRide = ridesData[selectedRide] || ridesData[0] || {};

  return (
    <section id="rides" className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 overflow-hidden border-t border-frost-300">
      
      {/* Subtle ocean pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#271E79_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-frost-300 gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-950/20 bg-indigo-950/5 text-indigo-900 text-xs font-mono tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
              <Wind className="w-3.5 h-3.5 text-indigo-800" />
              <span>Wind, Air & Water Thrills</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-950 leading-[1.1]">
              ALL HIGH-SPEED SEA RIDES & TOYS
            </h2>
            
            <p className="mt-3 sm:mt-4 text-indigo-900/80 text-sm sm:text-base leading-relaxed font-sans">
              From soaring 800 feet into the clouds behind the superyacht to high-flyboard air diving and cruising coral tunnels on underwater jet scooters. Choose your adrenaline level.
            </p>
          </div>

          {/* Quick Action */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenBooking({ title: currentRide.name })}
              className="group flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
            >
              <span>Book A Ride Session</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-indigo-950 text-frost-50 shadow-md'
                  : 'bg-frost-200 text-indigo-900/80 hover:text-indigo-950 hover:bg-frost-300 border border-frost-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Layout: Active Ride Spotlight + Interactive Rides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 sm:mb-16">
          
          {/* Spotlight Detailed Inspector (Left 7 Cols - Deep Indigo Card) */}
          <div key={currentRide.id} className="lg:col-span-7 bg-indigo-950 text-frost-100 border border-indigo-900/60 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
            
            {/* Cinematic High-Res Action Photo */}
            <div className="relative w-full h-56 sm:h-80 rounded-xl overflow-hidden mb-6 border border-indigo-700/50 group">
              <img 
                src={currentRide.image} 
                alt={`${currentRide.name} - ${currentRide.tagline} | AURA NAUTICA Luxury Superyacht Water Toys`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md border border-indigo-700/40 text-[10px] font-mono text-indigo-200 uppercase tracking-wider">
                {currentRide.categoryLabel}
              </div>

              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md border border-indigo-700/40 text-[10px] font-mono text-frost-100 uppercase tracking-wider font-bold">
                {currentRide.tag}
              </div>
              
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-frost-200">
                <span className="line-clamp-1">{currentRide.tagline}</span>
                <span className="font-bold text-frost-50 shrink-0 ml-2">{currentRide.speed}</span>
              </div>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-frost-50 mb-3 leading-tight">
              {currentRide.name}
            </h3>

            <p className="text-frost-300 text-sm sm:text-base leading-relaxed mb-6">
              {currentRide.description}
            </p>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-indigo-900/60 border border-indigo-800/80 mb-6">
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-frost-500 mb-1">
                  Speed
                </span>
                <span className="font-display text-base sm:text-lg font-bold text-frost-100">
                  {currentRide.speed}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-frost-500 mb-1">
                  Height / Depth
                </span>
                <span className="font-display text-base sm:text-lg font-bold text-frost-100">
                  {currentRide.altitude}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-frost-500 mb-1">
                  Experience
                </span>
                <span className="font-sans text-xs font-semibold text-frost-200">
                  {currentRide.skillLevel}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-frost-500 mb-1">
                  Capacity
                </span>
                <span className="font-sans text-xs font-semibold text-frost-200">
                  {currentRide.capacity}
                </span>
              </div>
            </div>

            {/* Key Ride Highlights */}
            <div className="space-y-2.5 mb-6">
              <h4 className="text-xs font-mono tracking-widest uppercase text-indigo-300">
                What Makes This Ride Special
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(currentRide.highlights || []).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-frost-300">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Gear Note & CTA */}
            <div className="pt-5 border-t border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-frost-400">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{currentRide.safetyGear}</span>
              </div>

              <button
                onClick={() => onOpenBooking({ title: currentRide.name })}
                className="shine-sweep w-full sm:w-auto px-6 py-2.5 rounded-full bg-frost-100 text-indigo-950 hover:bg-frost-50 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Reserve This Ride</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Ride Selector List with Photo Thumbnails (Right 5 Cols - Frost White Cards) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="block text-xs font-mono tracking-widest uppercase text-indigo-800 font-bold mb-2">
              Select A Ride To Inspect
            </span>

            {filteredRides.map((ride) => {
              const originalIndex = ridesData.findIndex(r => r.id === ride.id);
              const isSelected = selectedRide === originalIndex;

              return (
                <button
                  key={ride.id}
                  onClick={() => setSelectedRide(originalIndex)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 hover-luxury-lift flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950 text-frost-100 border-indigo-800 shadow-lg scale-[1.01]'
                      : 'bg-frost-50 text-indigo-950 border-frost-300 hover:bg-frost-200/80 hover:border-indigo-950/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Visual Image Thumbnail */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-frost-300 relative">
                      <img 
                        src={ride.image} 
                        alt={`${ride.name} high-speed yacht water toy`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover" 
                      />
                      <div className={`absolute inset-0 ${isSelected ? 'bg-indigo-950/20' : 'bg-transparent'}`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase ${
                          isSelected ? 'text-indigo-300' : 'text-indigo-800'
                        }`}>
                          0{originalIndex + 1}
                        </span>
                        <h4 className={`text-sm font-semibold tracking-wide transition-colors ${
                          isSelected ? 'text-frost-50' : 'text-indigo-950'
                        }`}>
                          {ride.name}
                        </h4>
                      </div>
                      <p className={`text-xs line-clamp-1 mt-0.5 font-sans ${
                        isSelected ? 'text-frost-300' : 'text-indigo-900/70'
                      }`}>
                        {ride.tagline}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${
                    isSelected 
                      ? 'text-frost-100 translate-x-1' 
                      : 'text-indigo-600 group-hover:translate-x-0.5'
                  }`} />
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom Safety & Assurance Strip */}
        <div className="p-4 sm:p-6 rounded-2xl bg-frost-50 border border-frost-300 flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-xs text-indigo-900 font-mono tracking-wider shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>100% DRY-DECK WINCH LAUNCH</span>
          </div>
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>USCG LICENSED MASTER CAPTAINS</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>ALL IMPACT GEAR & COACHING INCLUDED</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>4K GOPRO FOOTAGE PROVIDED</span>
          </div>
        </div>

      </div>
    </section>
  );
}
