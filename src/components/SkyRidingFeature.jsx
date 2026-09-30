import React, { useState } from 'react';
import { 
  Wind, 
  ArrowUpRight, 
  ShieldCheck, 
  Gauge, 
  Sparkles, 
  Activity, 
  ArrowRight,
  Radio,
  Compass
} from 'lucide-react';

export default function SkyRidingFeature({ onOpenBooking }) {
  const [altitudeStep, setAltitudeStep] = useState(3); // Default to 800 FT

  const altitudeTiers = [
    {
      altitude: '0 FT',
      phaseLabel: 'STAGE I: AFT DECK LOCK',
      subhead: 'Pre-Flight Hydraulic Line Tensioning',
      desc: 'Step into the titanium aero-harness on the yacht’s aft platform. The automated constant-tension hydraulic winch locks the 12-strand Dyneema line with zero vibration.',
      telemetry: {
        tension: '1,420 LBS',
        towSpeed: '12.0 KTS',
        horizonCurvature: '0.0° Flat',
        commsLink: 'Bridge Direct VHF',
        descentWindow: 'Instantaneous'
      }
    },
    {
      altitude: '250 FT',
      phaseLabel: 'STAGE II: INITIAL ASCENT',
      subhead: 'Smooth Vertical Winch Deployment',
      desc: 'Line feeds automatically at four meters per second. The entire superyacht length, twin wake curls, and turquoise coral reef formations open below in utter silence.',
      telemetry: {
        tension: '2,850 LBS',
        towSpeed: '18.5 KTS',
        horizonCurvature: '14.2° Arc',
        commsLink: '4K Encrypted Video',
        descentWindow: '18 Seconds'
      }
    },
    {
      altitude: '500 FT',
      phaseLabel: 'STAGE III: TROPOSPHERE FLIGHT',
      subhead: 'Sub-Sonic Aerial Towing Equilibrium',
      desc: 'Levitate in clean offshore laminar airstreams. Whisper-quiet flight with uninterrupted 360-degree panorama, zero sea spray, and live bidirectional comms with the bridge captain.',
      telemetry: {
        tension: '3,600 LBS',
        towSpeed: '22.0 KTS',
        horizonCurvature: '28.5° Curvature',
        commsLink: 'Dual-Band Intercom',
        descentWindow: '35 Seconds'
      }
    },
    {
      altitude: '800 FT',
      phaseLabel: 'STAGE IV: 800-FT STRATOSPHERIC APEX',
      subhead: 'Maximum Certified Altitude Flight',
      desc: 'Eight hundred feet above open blue water. Experience complete serenity, endless ocean curvature, and the majestic sight of your superyacht carving the sea beneath you.',
      telemetry: {
        tension: '4,150 LBS',
        towSpeed: '24.0 KTS',
        horizonCurvature: '45.0° Curvature',
        commsLink: 'Satellite Intercom',
        descentWindow: '55 Seconds'
      }
    },
  ];

  const current = altitudeTiers[altitudeStep];

  return (
    <section 
      id="sky-riding" 
      className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 overflow-hidden border-t border-frost-300"
    >
      {/* Subtle Topographic Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#271E79_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold text-indigo-800 tracking-[0.25em]">
              FEATURE THRILL
            </span>
            <div className="w-8 h-[1px] bg-indigo-900/30" />
            <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-[0.25em]">
              AERO-TETHER HYDRAULIC FLIGHT
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-indigo-950 leading-tight">
            800-FOOT PARACHUTE SKY RIDING
          </h2>

          <p className="text-indigo-900/70 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            Engineered exclusively for AURA NAUTICA: dry-deck takeoff and recovery from our 130ft superyacht stern winch platform with zero water submersion required.
          </p>
        </div>

        {/* Interactive Aero Cockpit Container */}
        <div className="bg-indigo-950 text-frost-100 rounded-3xl p-5 sm:p-8 lg:p-12 border border-indigo-900/60 shadow-2xl space-y-8 sm:space-y-10">
          
          {/* Top Bar: Altitude Level Step Selector */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono">
              <span className="text-frost-300 uppercase tracking-widest text-[11px] sm:text-xs">
                Select Altitude Stage:
              </span>
              <span className="text-indigo-300 font-bold tracking-wider text-[11px] sm:text-xs truncate">
                {current.altitude} • {current.phaseLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {altitudeTiers.map((tier, idx) => (
                <button
                  key={idx}
                  onClick={() => setAltitudeStep(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    altitudeStep === idx
                      ? 'bg-frost-100 text-indigo-950 border-frost-100 shadow-md font-bold'
                      : 'bg-indigo-900/40 text-frost-300 border-frost-100/10 hover:border-frost-100/30 hover:bg-indigo-900/70'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider opacity-70">
                    Stage 0{idx + 1}
                  </span>
                  <span className="font-display text-lg sm:text-2xl font-bold mt-1.5 sm:mt-2">
                    {tier.altitude}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Central Stage Visualizer */}
          <div key={altitudeStep} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center pt-4 border-t border-frost-100/15 animate-in fade-in duration-300">
            
            {/* Left: Narrative Description (7 cols) */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-300 block">
                {current.subhead}
              </span>
              <h3 className="font-display text-xl sm:text-3xl font-bold text-frost-50 leading-tight">
                {current.phaseLabel}
              </h3>
              <p className="text-frost-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                {current.desc}
              </p>

              <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4 text-xs font-mono text-frost-400">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Dual redundant hydraulic lock & USCG aero safety compliant</span>
              </div>
            </div>

            {/* Right: Real-Time Telemetry Cockpit (5 cols) */}
            <div className="lg:col-span-5 bg-indigo-900/60 p-4 sm:p-7 rounded-2xl border border-frost-100/15 space-y-3">
              <div className="flex items-center justify-between border-b border-frost-100/10 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-frost-300">
                  Telemetry Cockpit
                </span>
                <span className="text-[10px] font-mono text-indigo-300 font-bold">
                  LIVE STREAM LINKED
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-frost-100/5">
                  <span className="text-frost-400">Line Tension Load</span>
                  <span className="text-frost-50 font-semibold">{current.telemetry.tension}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-frost-100/5">
                  <span className="text-frost-400">Vessel Tow Speed</span>
                  <span className="text-frost-50 font-semibold">{current.telemetry.towSpeed}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-frost-100/5">
                  <span className="text-frost-400">Curvature Metric</span>
                  <span className="text-frost-50 font-semibold">{current.telemetry.horizonCurvature}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-frost-100/5">
                  <span className="text-frost-400">Comms Encryption</span>
                  <span className="text-frost-50 font-semibold">{current.telemetry.commsLink}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-frost-400">Recovery Window</span>
                  <span className="text-frost-50 font-semibold">{current.telemetry.descentWindow}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking({ title: `Parachute Sky Riding (${current.altitude})` })}
                className="shine-sweep w-full mt-3 py-3.5 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Reserve Flight Stage</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
