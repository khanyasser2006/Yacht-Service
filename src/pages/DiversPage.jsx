import React from 'react';
import { 
  Compass, 
  ChevronRight, 
  Anchor, 
  ShieldCheck, 
  Heart, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Divers from '../components/Divers';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function DiversPage({ onNavigate, onOpenBooking }) {
  const reefPledges = [
    {
      title: 'Zero-Touch Coral Ethics',
      desc: 'Our dive masters practice and teach strict zero-touch buoyancy control to ensure fragile living coral gardens remain unharmed and preserved for generations.',
    },
    {
      title: 'Reef-Safe Sunscreens Only',
      desc: 'We provide complimentary mineral-based, non-nano zinc sunscreen on board that is 100% certified non-toxic to coral polyps and marine life.',
    },
    {
      title: 'Resident Marine Biologist',
      desc: 'Every expedition is accompanied by a qualified marine scientist who enriches your dive with fascinating insights into sea turtle behaviors and reef health.',
    },
    {
      title: 'Ocean Clean-Up Initiative',
      desc: 'During every safari, our crew actively removes abandoned fishing lines and ocean debris from the dive sites, logging findings with ocean conservation registries.',
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-950 text-frost-100">
      <SEOHead 
        title="PADI Master Divers & Marine Coral Safaris | AURA NAUTICA"
        description="Private yacht diving safaris and PADI 5-star instruction from our hydraulic swim platform with marine biologists. Explore pristine reefs in Monaco and the Bahamas."
        canonical="https://auranautica.com/#/divers"
        keywords="superyacht diving, padi master diver monaco, private yacht scuba safari, marine biologist guided dive, silent nitrox compressor yacht, reef discovery dive"
      />
      
      {/* Dedicated Page Hero Banner (Deep Indigo Section) */}
      <section className="relative px-6 sm:px-12 pt-32 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient atmosphere */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-frost-400 mb-6">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-frost-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Anchor className="w-3.5 h-3.5 text-indigo-400" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-frost-50 font-bold">Divers</span>
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-600/30 bg-indigo-900/40 text-indigo-200 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>PADI 5-Star Guided Expeditions</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.05]">
            MASTER DIVERS & REEF EXPEDITIONS
          </h1>

          <p className="mt-5 text-frost-300 text-base sm:text-lg leading-relaxed font-sans">
            Step directly from our yacht’s submerged hydraulic swim platform into some of the world’s most pristine coral reefs. Guided by veteran PADI Master Instructors and our resident marine biologist, scuba diving on AURA NAUTICA is safe, personalized, and unforgettable.
          </p>
        </div>
      </section>

      {/* Main Divers Component (Frost White Section) */}
      <Divers onOpenBooking={onOpenBooking} />

      {/* Marine Conservation & Reef Stewardship (Deep Indigo Section) */}
      <section className="py-24 md:py-32 bg-indigo-950 text-frost-100 border-t border-indigo-900/60 relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-800/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono tracking-widest uppercase text-indigo-300 font-bold block mb-2">
              Ocean Conservation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-frost-50">
              OUR REEF PROTECTION PLEDGE
            </h2>
            <p className="mt-3 text-sm text-frost-300 font-sans">
              We are committed to leaving every dive site cleaner and healthier than we found it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reefPledges.map((pledge, idx) => (
              <div 
                key={idx}
                className="bg-indigo-900/35 border border-indigo-800/60 rounded-2xl p-6 backdrop-blur-md hover:border-indigo-600/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center mb-5 text-indigo-200 font-mono font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-frost-50 mb-2">
                    {pledge.title}
                  </h3>
                  <p className="text-frost-300 text-xs leading-relaxed font-sans">
                    {pledge.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-indigo-900/60 flex items-center gap-1.5 text-[11px] font-mono font-bold text-frost-200 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Certified Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenBooking={() => onOpenBooking({ title: 'Guided Dive Expedition' })} />

    </div>
  );
}
