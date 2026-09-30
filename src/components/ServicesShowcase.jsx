import React, { useState } from 'react';
import { 
  Wind, 
  Waves, 
  Zap, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  ArrowUpRight, 
  Eye
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const iconMap = {
  Wind,
  Waves,
  Zap,
  Sparkles,
  Compass,
  ShieldCheck,
};

export default function ServicesShowcase({ onSelectExperience, onBookNow }) {
  const { siteData } = useSiteData();
  const experiences = siteData?.experiences || [];
  const [activeExperienceId, setActiveExperienceId] = useState('parachute-sky-ride');

  const featured = experiences.find(e => e.id === activeExperienceId) || experiences[0] || {};
  const FeaturedIcon = featured.icon || iconMap[featured.iconName] || Wind;

  return (
    <section 
      id="experiences" 
      className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 overflow-hidden border-t border-frost-300"
    >
      {/* Subtle Topographic Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#271E79_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold text-indigo-800 tracking-[0.25em]">
              CATALOGUE
            </span>
            <div className="w-8 h-[1px] bg-indigo-900/30" />
            <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-[0.25em]">
              SUPERYACHT EXPERIENCES
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-indigo-950 leading-tight">
            SIGNATURE SEA RIDES & AERIAL THRILLS
          </h2>

          <p className="text-indigo-900/70 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            From eight-hundred-foot aero-tether sky riding behind our flagship yacht to whisper-silent hydrofoil levitation and deep sub-aquatic jet propulsion.
          </p>
        </div>

        {/* Asymmetrical Editorial Exhibition Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Spotlight Master Card (7 cols) */}
          <div className="lg:col-span-7 bg-indigo-950 text-frost-100 rounded-3xl p-5 sm:p-8 lg:p-12 border border-indigo-900/60 shadow-2xl flex flex-col justify-between space-y-6 sm:space-y-8 relative overflow-hidden">
            
            {/* Ambient Watermark Monogram */}
            <div className="absolute -bottom-10 -right-10 text-[180px] font-display font-bold text-frost-100/[0.03] select-none pointer-events-none">
              {featured.number}
            </div>

            <div key={featured.id} className="relative z-10 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between border-b border-frost-100/15 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-indigo-300">
                    {featured.number}
                  </span>
                  <span className="text-[10px] opacity-40">•</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-frost-300">
                    {featured.category}
                  </span>
                </div>
                
                <div className="w-10 h-10 rounded-2xl bg-indigo-900/80 border border-frost-100/20 flex items-center justify-center">
                  <FeaturedIcon className="w-5 h-5 text-frost-100" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-frost-50 mb-2 leading-tight">
                  {featured.title}
                </h3>
                <p className="text-xs font-mono text-indigo-300 uppercase tracking-[0.18em] mb-4">
                  {featured.tagline}
                </p>
                <p className="text-frost-300 text-sm sm:text-base font-light leading-relaxed">
                  {featured.fullDescription}
                </p>
              </div>

              {/* Technical Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                {(featured.specs || []).map((spec, i) => (
                  <div key={i} className="bg-indigo-900/50 p-2.5 sm:p-3.5 rounded-2xl border border-frost-100/10">
                    <span className="block text-[9px] font-mono uppercase text-frost-400 tracking-widest">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-frost-50 mt-0.5 block truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 pt-5 sm:pt-6 border-t border-frost-100/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-frost-400">
                  Rate / Allocation
                </span>
                <span className="font-mono text-sm sm:text-base font-semibold text-frost-100">
                  {featured.pricing}
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onSelectExperience(featured)}
                  className="flex-1 sm:flex-initial justify-center px-4 sm:px-5 py-3 rounded-full bg-indigo-900/80 hover:bg-indigo-900 text-frost-200 hover:text-frost-50 text-xs font-mono tracking-wider uppercase transition-all duration-200 border border-frost-100/15 flex items-center gap-2 cursor-pointer hover:border-frost-100/40 min-h-[44px]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Dossier</span>
                </button>

                <button
                  onClick={() => onBookNow(featured)}
                  className="shine-sweep flex-1 sm:flex-initial justify-center px-5 sm:px-6 py-3 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                >
                  <span>Reserve</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Selector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {experiences.map((exp) => {
              const isSelected = activeExperienceId === exp.id;
              const Icon = exp.icon || iconMap[exp.iconName] || Wind;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveExperienceId(exp.id)}
                  className={`p-3.5 sm:p-5 rounded-2xl border cursor-pointer hover-luxury-lift flex items-center justify-between gap-3 sm:gap-4 ${
                    isSelected
                      ? 'bg-indigo-950 text-frost-100 border-indigo-800 shadow-lg scale-[1.01]'
                      : 'bg-frost-50 text-indigo-950 border-frost-300 hover:bg-frost-200/80 hover:border-indigo-900/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-indigo-300' : 'text-indigo-800'
                    }`}>
                      {exp.number}
                    </span>

                    <div className={`p-2.5 rounded-xl ${
                      isSelected ? 'bg-indigo-900 text-frost-100' : 'bg-indigo-900/10 text-indigo-800'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <h4 className={`font-display text-sm font-bold leading-tight ${
                        isSelected ? 'text-frost-50' : 'text-indigo-950'
                      }`}>
                        {exp.title}
                      </h4>
                      <span className={`text-[11px] font-mono block mt-0.5 ${
                        isSelected ? 'text-frost-400' : 'text-indigo-700/80'
                      }`}>
                        {exp.altitude}
                      </span>
                    </div>
                  </div>

                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? 'bg-frost-100 scale-125' : 'bg-indigo-900/20'
                  }`} />
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
