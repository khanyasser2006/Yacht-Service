import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Waves, 
  Check, 
  ChevronRight,
  Anchor
} from 'lucide-react';
import ServicesShowcase from '../components/ServicesShowcase';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { useSiteData } from '../context/SiteDataContext';

export default function ExperiencesPage({ onNavigate, onSelectExperience, onBookNow }) {
  const { siteData } = useSiteData();
  const packages = siteData?.packages || [];

  return (
    <div className="min-h-screen bg-indigo-950 text-frost-100">
      <SEOHead 
        title="Curated Superyacht Charter Packages & Sea Expeditions | AURA NAUTICA"
        description="Discover all-inclusive luxury superyacht day charters, VIP sunset flights, and marine expedition packages in Monaco and the French Riviera with AURA NAUTICA."
        canonical="https://auranautica.com/#/experiences"
        keywords="superyacht charter packages, luxury yacht rental monaco, private yacht day pass, vip sunset yacht flight, seabob dive package"
      />
      
      {/* Dedicated Page Hero Banner (Deep Indigo Section) */}
      <section className="relative px-5 sm:px-12 pt-28 pb-12 sm:pt-36 sm:pb-24 max-w-7xl mx-auto overflow-hidden">
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
          <span className="text-frost-50 font-bold">Experiences</span>
        </div>

        <div className="max-w-3xl relative z-10">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.05]">
            YACHT EXPERIENCES & WATER THRILLS
          </h1>

          <p className="mt-4 sm:mt-5 text-frost-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans">
            Every moment on AURA NAUTICA is tailored for effortless fun. From soaring high above the waves in total silence to diving along vibrant coral reefs, browse our complete collection of sea adventures below.
          </p>
        </div>
      </section>

      {/* Main Experiences Showcase Component (Frost White Section) */}
      <ServicesShowcase 
        onSelectExperience={onSelectExperience}
        onBookNow={onBookNow}
      />

      {/* Experience Packages Section (Deep Indigo Section) */}
      <section className="py-16 sm:py-24 md:py-32 bg-indigo-950 text-frost-100 border-t border-indigo-900/60 relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-800/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
          <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono tracking-widest uppercase text-indigo-300 font-bold block mb-2">
              All-Inclusive Passes
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-frost-50">
              CURATED EXPERIENCE PACKAGES
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-frost-300 font-sans">
              Combine multiple rides, private chef hospitality, and tender transfers in one seamless private booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {packages.map((pkg, idx) => (
              <div 
                key={idx}
                className="bg-indigo-900/35 border border-indigo-800/60 rounded-2xl p-5 sm:p-8 backdrop-blur-md hover:border-indigo-600/60 transition-all duration-300 hover-luxury-lift flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-indigo-800/60 text-indigo-200 border border-indigo-700/40 font-bold">
                      {pkg.tag}
                    </span>
                    <span className="font-display text-xl font-bold text-frost-50">
                      {pkg.price}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-frost-50 mb-2">
                    {pkg.title}
                  </h3>

                  <span className="block text-xs font-mono text-indigo-300 font-semibold mb-4">
                    {pkg.duration}
                  </span>

                  <p className="text-xs sm:text-sm text-frost-300 leading-relaxed mb-6 font-sans">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 mb-8 pt-4 border-t border-indigo-900/60">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-frost-200 font-sans">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onBookNow({ title: pkg.title, price: pkg.price })}
                  className="shine-sweep w-full py-3.5 rounded-full bg-frost-100 text-indigo-950 hover:bg-frost-50 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection onOpenBooking={() => onBookNow({ title: 'Custom Yacht Experience' })} />

      {/* Footer */}
      <Footer onOpenBooking={() => onBookNow({ title: 'Custom Yacht Experience' })} />

    </div>
  );
}
