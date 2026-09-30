import React, { useState } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Award, 
  Waves, 
  Heart, 
  Check, 
  Eye, 
  Anchor
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Divers({ onOpenBooking }) {
  const { siteData } = useSiteData();
  const crewMembers = siteData?.crewMembers || [];
  const divePrograms = siteData?.divePrograms || [];
  const [activeTab, setActiveTab] = useState('crew'); // Default to showing experienced divers

  const tabs = [
    { id: 'crew', label: 'Meet the Dive Team' },
    { id: 'programs', label: 'Dive Programs & Safaris' },
    { id: 'center', label: 'The Onboard Dive Center' },
    { id: 'marine-life', label: 'Marine Life Guide' },
  ];

  const diveCenterFeatures = [
    {
      title: 'Hydraulic Swim Platform',
      desc: 'The yacht’s rear teak platform lowers smoothly into the water, allowing you to walk right into the sea without climbing bulky ladders or jumping from heights.',
    },
    {
      title: 'Silent Bauer Nitrox Compressor',
      desc: 'Our state-of-the-art compressor blenders produce clean, odorless, medical-grade breathing air and enriched Nitrox on demand with zero engine noise.',
    },
    {
      title: 'Scubapro Carbon Pro Gear',
      desc: 'Brand new, meticulously serviced Scubapro titanium regulators, ergonomic buoyancy compensators, and ultra-flexible wetsuits in every size.',
    },
    {
      title: 'Warm Deck Showers & Towels',
      desc: 'Step out of the sea into instant heated freshwater showers and warm plush cotton bathrobes served by the yacht crew.',
    },
  ];

  const marineLifeGuide = [
    { name: 'Green Sea Turtles', encounter: '95% Chance', depth: '15 - 40 FT', tag: 'Gentle & Curious' },
    { name: 'Spotted Eagle Rays', encounter: '85% Chance', depth: '20 - 70 FT', tag: 'Graceful Gliders' },
    { name: 'Manta Rays', encounter: '70% Chance', depth: '30 - 80 FT', tag: 'Giant Wingspans' },
    { name: 'Bottlenose Dolphins', encounter: '80% Chance', depth: 'Surface to 50 FT', tag: 'Playful & Friendly' },
    { name: 'Reef Blacktip Sharks', encounter: '75% Chance', depth: '40 - 90 FT', tag: 'Completely Harmless' },
    { name: 'Vibrant Coral Gardens', encounter: '100% Guaranteed', depth: '10 - 60 FT', tag: 'Living Rainbows' },
  ];

  return (
    <section id="divers" className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 overflow-hidden border-t border-frost-300">
      
      {/* Subtle ambient frost highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-frost-300/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-frost-300 gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-950/20 bg-indigo-950/5 text-indigo-900 text-xs font-mono tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-indigo-800" />
              <span>Underwater Expeditions</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-950 leading-[1.1]">
              MEET OUR MASTER DIVERS & REEF GUIDES
            </h2>
            
            <p className="mt-3 sm:mt-4 text-indigo-900/80 text-sm sm:text-base leading-relaxed font-sans">
              Explore pristine coral gardens, secret marine caves, and open-ocean reefs with certified master dive guides and marine biologists right from our yacht’s hydraulic swim platform.
            </p>
          </div>

          {/* Quick Action */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenBooking({ title: 'Private Guided Dive Expedition' })}
              className="group flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
            >
              <span>Plan A Guided Dive</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-950 text-frost-50 shadow-md'
                  : 'bg-frost-200 text-indigo-900/80 hover:text-indigo-950 hover:bg-frost-300 border border-frost-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Experienced Divers Profile Cards */}
        {activeTab === 'crew' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-in fade-in duration-300">
            {crewMembers.map((member, idx) => {
              const isDarkCard = idx % 2 === 0;

              return (
                <div 
                  key={idx}
                  className={`rounded-2xl p-5 sm:p-8 border transition-all duration-300 hover-luxury-lift flex flex-col sm:flex-row gap-5 sm:gap-6 items-start ${
                    isDarkCard
                      ? 'bg-indigo-950 text-frost-100 border-indigo-800/80 shadow-xl hover:border-indigo-600'
                      : 'bg-frost-50 text-indigo-950 border-frost-300 shadow-sm hover:border-indigo-950/40'
                  }`}
                >
                  {/* High-Resolution Portrait of Experienced Diver */}
                  <div className={`w-full sm:w-52 h-72 sm:h-full rounded-xl overflow-hidden shrink-0 border shadow-sm relative group ${
                    isDarkCard ? 'border-indigo-700/50' : 'border-frost-300'
                  }`}>
                    <img 
                      src={member.image} 
                      alt={`${member.name}, ${member.role} - ${member.credentials} | AURA NAUTICA Yacht Dive Team`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-indigo-950/85 backdrop-blur-md text-[9px] font-mono font-bold text-frost-100 text-center uppercase tracking-wider">
                      Experienced Master Diver
                    </div>
                  </div>

                  {/* Bio & Credentials */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className={`text-xs font-mono tracking-widest uppercase font-bold block mb-1 ${
                        isDarkCard ? 'text-indigo-300' : 'text-indigo-800'
                      }`}>
                        {member.role}
                      </span>
                      <h3 className={`font-display text-2xl font-bold ${
                        isDarkCard ? 'text-frost-50' : 'text-indigo-950'
                      }`}>
                        {member.name}
                      </h3>
                      <p className={`text-xs font-sans font-semibold mt-1 ${
                        isDarkCard ? 'text-frost-300' : 'text-indigo-900/70'
                      }`}>
                        {member.credentials}
                      </p>

                      <p className={`text-xs sm:text-sm leading-relaxed mt-4 mb-5 font-sans ${
                        isDarkCard ? 'text-frost-300' : 'text-indigo-900/80'
                      }`}>
                        {member.bio}
                      </p>
                    </div>

                    <div>
                      <div className={`grid grid-cols-2 gap-3 p-3 rounded-xl border mb-4 text-xs font-mono ${
                        isDarkCard
                          ? 'bg-indigo-900/60 border-indigo-800/80 text-frost-100'
                          : 'bg-frost-200/80 border-frost-300 text-indigo-950'
                      }`}>
                        <div>
                          <span className={`block uppercase text-[9px] ${
                            isDarkCard ? 'text-frost-400' : 'text-indigo-900/60'
                          }`}>
                            Logged Dives
                          </span>
                          <span className="font-bold text-sm">{member.dives}</span>
                        </div>
                        <div>
                          <span className={`block uppercase text-[9px] ${
                            isDarkCard ? 'text-frost-400' : 'text-indigo-900/60'
                          }`}>
                            Experience
                          </span>
                          <span className="font-bold text-sm">{member.experience}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {(member.specialties || []).map((spec, sIdx) => (
                          <span 
                            key={sIdx} 
                            className={`px-2.5 py-1 rounded-full text-[11px] font-sans border ${
                              isDarkCard
                                ? 'bg-indigo-900/80 text-frost-200 border-indigo-700/40'
                                : 'bg-indigo-950/5 text-indigo-950 border-indigo-950/10'
                            }`}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Dive Programs & Safaris with Cinematic Reef Action Image */}
        {activeTab === 'programs' && (
          <div className="animate-in fade-in duration-300">
            {/* Wide Underwater Reef Exploration Photo */}
            <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden mb-6 sm:mb-10 border border-frost-300 shadow-sm group">
              <img 
                src="/assets/images/diver_reef_action_1788888203328.jpg" 
                alt="PADI Master Guided Coral Reef Wall Safari with Sea Turtles | AURA NAUTICA Luxury Yacht Charter" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-frost-100 text-xs font-mono">
                <span className="font-bold tracking-wider text-[11px] sm:text-xs">LIVE ACTION: 100-FT REEF WALL</span>
                <span className="hidden sm:inline">GUIDED BY OUR PADI MASTER CREW</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-12 sm:mb-16">
              {divePrograms.map((prog, idx) => (
                <div 
                  key={idx}
                  className="bg-frost-50 border border-frost-300/80 rounded-2xl p-5 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover-luxury-lift hover:border-indigo-950/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-indigo-950/10 text-indigo-950 font-bold">
                        {prog.badge}
                      </span>
                      <span className="text-xs font-mono text-indigo-800 font-semibold">
                        {prog.depth}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-indigo-950 mb-3">
                      {prog.title}
                    </h3>

                    <p className="text-indigo-900/80 text-sm leading-relaxed mb-6">
                      {prog.description}
                    </p>

                    <div className="space-y-2.5 mb-6 pt-4 border-t border-frost-200">
                      {(prog.features || []).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-indigo-900/90 font-sans">
                          <Check className="w-4 h-4 text-indigo-800 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-frost-200 flex items-center justify-between text-xs font-mono text-indigo-800">
                    <span>{prog.instructorRatio}</span>
                    <button
                      onClick={() => onOpenBooking({ title: prog.title })}
                      className="flex items-center gap-1 font-bold text-indigo-950 hover:text-indigo-700 uppercase tracking-wider cursor-pointer"
                    >
                      <span>Book Safari</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: The Onboard Dive Center */}
        {activeTab === 'center' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-in fade-in duration-300">
            {diveCenterFeatures.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-frost-50 border border-frost-300/80 rounded-2xl p-6 shadow-sm hover:border-indigo-950/30 transition-all duration-300 hover-luxury-lift flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-indigo-950/5 border border-indigo-950/15 flex items-center justify-center mb-5 text-indigo-950 font-mono font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h4 className="font-display text-lg font-bold text-indigo-950 mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-indigo-900/80 text-xs leading-relaxed font-sans">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-frost-200 flex items-center gap-1.5 text-[11px] font-mono font-bold text-indigo-950 uppercase">
                  <Check className="w-3.5 h-3.5 text-indigo-800" />
                  <span>Onboard Standard</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Marine Life Encounter Guide */}
        {activeTab === 'marine-life' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-in fade-in duration-300">
            {marineLifeGuide.map((animal, idx) => (
              <div 
                key={idx}
                className="bg-frost-50 border border-frost-300/80 rounded-2xl p-6 shadow-sm hover:border-indigo-950/30 transition-all duration-300 hover-luxury-lift flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-indigo-800 font-bold block mb-1">
                    {animal.tag}
                  </span>
                  <h4 className="font-display text-base font-bold text-indigo-950 mb-1">
                    {animal.name}
                  </h4>
                  <span className="text-xs text-indigo-900/70 font-sans">
                    Typical Depth: {animal.depth}
                  </span>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-frost-50">
                    {animal.encounter}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Assurance Strip */}
        <div className="p-4 sm:p-6 rounded-2xl bg-frost-200/80 border border-frost-300 flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-xs text-indigo-950 font-mono tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>PADI 5-STAR RESORT PARTNER</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>1-ON-1 INSTRUCTOR ASSISTANCE</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>NITROX & PRO GEAR INCLUDED</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>4K UNDERWATER PHOTOS INCLUDED</span>
          </div>
        </div>

      </div>
    </section>
  );
}
