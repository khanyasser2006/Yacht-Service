import React from 'react';
import { 
  Wind, 
  Compass, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Anchor
} from 'lucide-react';
import HeroSequence from '../components/HeroSequence';
import ServicesShowcase from '../components/ServicesShowcase';
import SkyRidingFeature from '../components/SkyRidingFeature';
import InteractiveItineraryBuilder from '../components/InteractiveItineraryBuilder';
import FleetAndTelemetry from '../components/FleetAndTelemetry';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function HomePage({ onAnimationComplete, onNavigate, onOpenBooking, onSelectExperience }) {
  const destinationPortals = [
    {
      id: 'rides',
      number: '01',
      title: 'High-Speed Rides & Toys',
      tagline: 'Underwater Jets & 800-Ft Flight',
      description: 'Experience pure adrenaline with our 25-knot carbon eFoils, Seabob dolphin jet scooters, supercharged wave runners, air diving flyboard, and winch-assisted dry parachute takeoff.',
      metrics: 'Up to 55+ Knots • 800 FT Flight Altitude',
      icon: Wind,
      theme: 'bg-indigo-900/50 text-frost-100 border-indigo-800/60',
      actionText: 'Explore Rides Page',
    },
    {
      id: 'divers',
      number: '02',
      title: 'Master Divers & Reefs',
      tagline: 'Guided Coral Safaris & Night Dives',
      description: 'Dive directly from the yacht’s hydraulic swim platform with PADI Master Instructors and our resident marine biologist into vibrant marine sanctuaries.',
      metrics: 'PADI 5-Star • Silent Nitrox Compressor',
      icon: Compass,
      theme: 'bg-frost-50 text-indigo-950 border-frost-300',
      actionText: 'Explore Divers Page',
    },
    {
      id: 'reviews',
      number: '03',
      title: 'Guest Stories & Ratings',
      tagline: 'Authentic Feedback & 4.98 Stars',
      description: 'Over 180 verified charter guests share their memories of soaring above the turquoise waters, swimming with sea turtles, and relaxing in ultimate luxury.',
      metrics: '4.98 / 5.0 Rating • 100% Safety Record',
      icon: MessageSquare,
      theme: 'bg-indigo-900/50 text-frost-100 border-indigo-800/60',
      actionText: 'Explore Reviews Page',
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-950 text-frost-100">
      <SEOHead 
        title="AURA NAUTICA — Ultra-Luxury Superyacht Charters, Sky Riding & Marine Toys"
        description="Experience ultra-luxury superyacht charters in Monaco, French Riviera, and the Bahamas with AURA NAUTICA. 800-foot parachute sky riding, Seabob underwater jets, carbon eFoils, and private dive safaris."
        canonical="https://auranautica.com/"
        keywords="luxury yacht charter monaco, superyacht parasailing, parachute yacht sky riding, seabob rental french riviera, luxury marine toys, private diving master safari"
      />
      
      {/* Section 1: Flagship 600-Frame Optical Flow Video Hero with Dynamic Title Placements */}
      <HeroSequence onAnimationComplete={onAnimationComplete} />

      {/* Section 2: All Yacht Services & Sea Rides Showcase (Frost White #F7F7FF) */}
      <ServicesShowcase 
        onSelectExperience={onSelectExperience}
        onBookNow={(exp) => onOpenBooking(exp)}
      />

      {/* Section 3: Dedicated 800ft Parachute Sky Riding Feature (Dual-Tone Split) */}
      <SkyRidingFeature 
        onOpenBooking={(data) => onOpenBooking(data)}
      />

      {/* Section 4: Interactive Bespoke Itinerary & Thrill Configurator (Deep Indigo #271E79) */}
      <InteractiveItineraryBuilder 
        onOpenBooking={(data) => onOpenBooking(data)}
      />

      {/* Section 5: Fleet Architecture & Interactive Yacht Blueprint Cutaway (Frost White #F7F7FF) */}
      <FleetAndTelemetry 
        onOpenBooking={() => onOpenBooking({ title: 'AURA 130 Mega-Expedition VIP Tour' })}
      />

      {/* Section 6: Dedicated Pages Gateway Portals (Frost White Section) */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 border-t border-frost-300 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-frost-300 gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-950/20 bg-indigo-950/5 text-indigo-900 text-xs font-mono tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
                <Anchor className="w-3.5 h-3.5 text-indigo-800" />
                <span>The Superyacht Fleet</span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-950 leading-[1.1]">
                DISCOVER OUR DEDICATED DESTINATIONS
              </h2>
              
              <p className="mt-3 sm:mt-4 text-indigo-900/80 text-sm sm:text-base leading-relaxed font-sans">
                Each service aboard AURA NAUTICA has its own dedicated world. Explore full catalogs, telemetry specs, dive team profiles, and verified guest reviews below.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="shine-sweep group flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
              >
                <span>Book Full Charter</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 3 Dedicated Page Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-12 sm:mb-20">
            {destinationPortals.map((portal) => {
              const IconComponent = portal.icon;
              const isDarkCard = portal.id === 'rides' || portal.id === 'reviews';

              return (
                <div 
                  key={portal.id}
                  className={`rounded-2xl p-5 sm:p-8 lg:p-10 border transition-all duration-300 hover-luxury-lift flex flex-col justify-between group ${
                    isDarkCard
                      ? 'bg-indigo-950 text-frost-100 border-indigo-800/80 hover:border-indigo-600'
                      : 'bg-frost-50 text-indigo-950 border-frost-300 hover:border-indigo-950/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                      <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                        isDarkCard 
                          ? 'bg-indigo-800/50 text-indigo-200 border border-indigo-700/40' 
                          : 'bg-indigo-950/10 text-indigo-950'
                      }`}>
                        {portal.number} // {portal.tagline}
                      </span>
                      <IconComponent className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                        isDarkCard ? 'text-indigo-400' : 'text-indigo-800'
                      }`} />
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                      {portal.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-sans ${
                      isDarkCard ? 'text-frost-300' : 'text-indigo-900/80'
                    }`}>
                      {portal.description}
                    </p>

                    <div className={`text-xs font-mono mb-6 sm:mb-8 py-2.5 px-3.5 sm:px-4 rounded-xl border ${
                      isDarkCard 
                        ? 'bg-indigo-900/60 border-indigo-800/80 text-frost-300' 
                        : 'bg-frost-200/80 border-frost-300 text-indigo-900'
                    }`}>
                      {portal.metrics}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate(portal.id)}
                    className={`shine-sweep w-full py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99] min-h-[44px] ${
                      isDarkCard
                        ? 'bg-frost-100 text-indigo-950 hover:bg-frost-50'
                        : 'bg-indigo-950 text-frost-50 hover:bg-indigo-900'
                    }`}
                  >
                    <span>{portal.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Overview Bar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-frost-200/80 border border-frost-300 flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-xs text-indigo-950 font-mono tracking-wider">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-800 shrink-0" />
              <span>100% DRY-DECK WINCH WINNING SAFETY</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-800 shrink-0" />
              <span>MEDITERRANEAN & CARIBBEAN PORTS</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-800 shrink-0" />
              <span>4.98 RATING VERIFIED SATISFACTION</span>
            </div>
          </div>

        </div>

      </section>

      {/* Section 7: Frequently Asked Questions (Google Rich Snippets) */}
      <FAQSection onOpenBooking={() => onOpenBooking()} />

      {/* Luxury Footer */}
      <Footer onOpenBooking={() => onOpenBooking()} />

    </div>
  );
}
