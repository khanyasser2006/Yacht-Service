import React, { useState } from 'react';
import { 
  Wind, 
  ChevronRight, 
  Anchor, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Rides from '../components/Rides';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function RidesPage({ onNavigate, onOpenBooking }) {
  const [openFaq, setOpenFaq] = useState(null);

  const rideFaqs = [
    {
      q: 'Do I need any previous experience to try parachute sky riding?',
      a: 'No experience is needed. You are securely seated in a comfortable harness on the yacht’s wide rear deck. The hydraulic winch gently lifts you up and reels you back down right onto the dry deck. You never even have to touch the water unless you request a gentle foot dip.',
    },
    {
      q: 'Can two or three people fly on the parachute together?',
      a: 'Yes! We offer tandem (two guests) and triple (three guests) flight harnesses so couples, friends, or parents with children can soar 800 feet into the air side-by-side.',
    },
    {
      q: 'How hard is it to learn the Lift3 eFoil electric surfboard?',
      a: 'Most guests stand up and start gliding within 20 to 30 minutes. Our certified instructors provide step-by-step radio coaching through your helmet Bluetooth headset, ensuring a smooth and confident flight above the water.',
    },
    {
      q: 'Are all safety vests and helmets provided on board?',
      a: 'Yes. We carry brand-new USCG-approved impact flotation vests, hydrodynamic helmets with 2-way marine intercoms, and clear panoramic dive masks in every size from kids to adults.',
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-950 text-frost-100">
      <SEOHead 
        title="High-Speed Yacht Toys, Sky Riding & Seabob Fleet | AURA NAUTICA"
        description="Experience 800-foot parachute yacht sky riding, 22 km/h Seabob F5 SR underwater jets, carbon eFoils, and air diving flyboards on the French Riviera with AURA NAUTICA."
        canonical="https://auranautica.com/#/rides"
        keywords="parachute yacht sky riding, seabob f5 sr rental monaco, efoil surfing french riviera, air diving flyboard, superyacht waverunner, high speed marine toys"
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
          <span className="text-frost-50 font-bold">Rides</span>
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-600/30 bg-indigo-900/40 text-indigo-200 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Wind className="w-3.5 h-3.5 text-indigo-400" />
            <span>High-Speed Marine Toys & Flight</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.05]">
            HIGH-SPEED SEA RIDES & WATER TOYS
          </h1>

          <p className="mt-5 text-frost-300 text-base sm:text-lg leading-relaxed font-sans">
            Take command of the open sea with our high-tech fleet of water toys. Whether flying 800 feet into the blue horizon or carving beneath the waves on electric jet scooters, every ride is managed with precision safety by our professional crew.
          </p>
        </div>
      </section>

      {/* Main Rides Component (Frost White Section with Paired Dual Cards) */}
      <Rides onOpenBooking={onOpenBooking} />

      {/* Rides FAQ Section (Deep Indigo Section) */}
      <section className="py-24 md:py-32 bg-indigo-950 text-frost-100 border-t border-indigo-900/60 relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-800/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="text-center mb-14">
            <span className="text-xs font-mono tracking-widest uppercase text-indigo-300 block mb-2 font-bold">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-frost-50">
              COMMON QUESTIONS ABOUT OUR RIDES
            </h2>
          </div>

          <div className="space-y-4">
            {rideFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-indigo-900/35 border border-indigo-800/60 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-indigo-900/50 transition-colors"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-frost-100">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-frost-300 text-sm leading-relaxed border-t border-indigo-900/50 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenBooking={() => onOpenBooking({ title: 'Full Water Toys Pass' })} />

    </div>
  );
}
