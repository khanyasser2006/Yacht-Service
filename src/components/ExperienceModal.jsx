import React from 'react';
import { X, ShieldCheck, Zap, Gauge, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ExperienceModal({ experience, onClose, onBookNow }) {
  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-indigo-950/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card (Bottom-sheet on mobile, centered dialog on desktop) */}
      <div className="relative w-full max-w-3xl glass-panel rounded-t-3xl sm:rounded-3xl border border-frost-100/20 p-5 sm:p-10 text-frost-100 shadow-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-250">
        
        {/* Mobile Pull/Grab Handle Indicator */}
        <div className="w-12 h-1 rounded-full bg-frost-100/25 mx-auto mb-4 block sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-indigo-900/60 border border-frost-100/20 text-frost-300 hover:text-frost-50 hover:bg-indigo-800 transition-all duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Content */}
        <div className="space-y-3 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge text-[11px] font-mono uppercase tracking-widest text-frost-200">
            {experience.category}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-frost-50">
            {experience.title}
          </h2>
          <p className="text-frost-300 text-sm sm:text-base leading-relaxed">
            {experience.fullDescription || experience.desc}
          </p>
        </div>

        {/* Key Technical Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-6 sm:my-8">
          {experience.specs.map((spec, i) => (
            <div key={i} className="bg-indigo-900/40 rounded-2xl p-3 sm:p-4 border border-frost-100/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase text-frost-400 tracking-wider">
                {spec.label}
              </span>
              <span className="text-base sm:text-lg font-mono font-semibold text-frost-50 mt-1">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Included Amenities & Safety Gear */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-frost-300">
            What's Included
          </h3>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {experience.inclusions.map((inc, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-frost-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Certification Note */}
        <div className="p-4 rounded-2xl bg-indigo-900/30 border border-frost-100/10 flex items-start gap-3.5 mb-8">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-frost-300 leading-relaxed">
            <span className="font-semibold text-frost-100">Safety First: </span>
            All rides are run by certified captains and water sports instructors. Life vests, safety briefings, and support boats are always on standby.
          </div>
        </div>

        {/* Modal Action CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-frost-100/10">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-frost-400">Price</span>
            <span className="font-mono text-xl font-bold text-frost-50">{experience.pricing}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow(experience);
            }}
            className="shine-sweep flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 hover:shadow-glow-sm transition-all duration-300 cursor-pointer"
          >
            <span>Book This Experience</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
