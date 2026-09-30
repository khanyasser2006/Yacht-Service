import React, { useState } from 'react';
import { 
  ChevronRight,
  Anchor
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function FleetAndTelemetry({ onOpenBooking }) {
  const { siteData } = useSiteData();
  const deckLevels = siteData?.fleetDecks || [];
  const [activeDeck, setActiveDeck] = useState('main');

  const currentDeck = deckLevels.find(d => d.id === activeDeck) || deckLevels[0] || {};

  return (
    <section 
      id="fleet" 
      className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 border-t border-frost-300 overflow-hidden"
    >
      {/* Subtle Topographic Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#271E79_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold text-indigo-800 tracking-[0.25em]">
              ARCHITECTURE
            </span>
            <div className="w-8 h-[1px] bg-indigo-900/30" />
            <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-[0.25em]">
              FLAGSHIP VESSEL BLUEPRINT
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-indigo-950 leading-tight">
            AURA 130 MEGA-EXPEDITION
          </h2>

          <p className="text-indigo-900/70 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            Custom carbon-composite trideck superyacht engineered with twin 5,200 BHP MTU marine propulsion, 98% roll stabilization, and an integrated high-altitude sky riding launchpad.
          </p>
        </div>

        {/* Architectural Deck Blueprint Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12">
          
          {/* Left Column: Deck Selector Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5 sm:space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-800/80 block mb-2">
              Select Deck Elevation:
            </span>

            {deckLevels.map((deck) => {
              const isSelected = activeDeck === deck.id;
              return (
                <button
                  type="button"
                  key={deck.id}
                  onClick={() => setActiveDeck(deck.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-3.5 sm:p-5 rounded-2xl border cursor-pointer hover-luxury-lift flex items-center justify-between gap-3 sm:gap-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-700 ${
                    isSelected
                      ? 'bg-indigo-950 text-frost-100 border-indigo-800 shadow-xl scale-[1.01]'
                      : 'bg-frost-50 text-indigo-950 border-frost-300 hover:bg-frost-200/80 hover:border-indigo-900/30'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${
                      isSelected ? 'text-indigo-300' : 'text-indigo-700'
                    }`}>
                      {deck.level}
                    </span>
                    <h4 className={`font-display text-sm font-bold mt-0.5 leading-snug ${
                      isSelected ? 'text-frost-50' : 'text-indigo-950'
                    }`}>
                      {deck.name}
                    </h4>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    isSelected ? 'text-frost-100 translate-x-1' : 'text-indigo-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Deck Architectural Details (8 cols) */}
          <div key={currentDeck.id} className="lg:col-span-8 bg-indigo-950 text-frost-100 rounded-3xl p-5 sm:p-8 lg:p-10 border border-indigo-900/60 shadow-2xl flex flex-col justify-between space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between border-b border-frost-100/15 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">
                    {currentDeck.level} • {currentDeck.dimensions}
                  </span>
                  <h3 className="font-display text-xl sm:text-3xl font-bold text-frost-50 mt-1">
                    {currentDeck.name}
                  </h3>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-indigo-900 border border-frost-100/15 text-[10px] font-mono text-frost-300">
                  {currentDeck.blueprintArea}
                </div>
              </div>

              {/* Architectural Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {(currentDeck.features || []).map((feat, idx) => (
                  <div key={idx} className="bg-indigo-900/40 p-3.5 sm:p-4 rounded-2xl border border-frost-100/10 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span className="text-xs sm:text-sm text-frost-200 font-light leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Naval Architecture Telemetry Strip */}
            <div className="pt-5 sm:pt-6 border-t border-frost-100/15 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-xs font-mono">
              <div>
                <span className="block text-frost-400 text-[9px] uppercase">Propulsion System</span>
                <span className="text-frost-50 font-bold mt-0.5 block truncate">5,200 BHP MTU</span>
              </div>
              <div>
                <span className="block text-frost-400 text-[9px] uppercase">Service Cruising</span>
                <span className="text-frost-50 font-bold mt-0.5 block truncate">24 KTS Transit</span>
              </div>
              <div>
                <span className="block text-frost-400 text-[9px] uppercase">Roll Attenuation</span>
                <span className="text-frost-50 font-bold mt-0.5 block truncate">98% Zero-Speed</span>
              </div>
              <div>
                <span className="block text-frost-400 text-[9px] uppercase">Hull Classification</span>
                <span className="text-frost-50 font-bold mt-0.5 block truncate">RINA Unrestricted</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
