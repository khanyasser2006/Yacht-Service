import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function FAQSection({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: 'What is Parachute Yacht Sky Riding and how high does the flight ascend?',
      answer: 'Parachute Yacht Sky Riding is AURA NAUTICA’s exclusive naval parasailing experience. Guests are securely tethered to an aero-rated titanium harness and launched directly from our 1,800HP superyacht hydraulic winch platform. You ascend smoothly between 600 to 800 feet into the troposphere, enjoying 360-degree silent panoramic vistas of the French Riviera or Bahamian archipelagos. You can choose a 100% dry-deck takeoff and recovery, or request a gentle water touch-and-go skimming maneuver.',
      tag: 'Aerial Propulsion',
    },
    {
      question: 'Which Mediterranean and Caribbean ports are available for charter embarkation?',
      answer: 'Our flagship charter routes primarily operate out of Port Hercule in Monaco, Saint-Tropez, Cannes, and the Amalfi Coast (Capri/Positano) during the Mediterranean summer season (May–October). During the winter season (November–April), our fleet repositions to the Caribbean and Bahamas, offering bespoke itineraries across Nassau, the Exumas Cays, and St. Barth.',
      tag: 'Cruising Ports',
    },
    {
      question: 'Do guests require a boat license or scuba certification to use the water toys and dive?',
      answer: 'No prior certifications are needed. All high-speed water toys—including Seabob F5 SR underwater jets, Fliteboard eFoils, and Yamaha FX WaveRunners—are accompanied by one-on-one safety briefings and guided by licensed marine instructors. For scuba diving, our resident PADI 5-Star Master Instructors offer both Introductory Discovery Dives for beginners and deep open-water reef expeditions for certified divers.',
      tag: 'Licenses & Safety',
    },
    {
      question: 'What is included in a Full Charter Day Pass versus an Individual Experience?',
      answer: 'A Full Charter reservation grants private, exclusive access to the 42-meter superyacht, complete with a private chef, bespoke lunch and cocktail service, full access to all 4 deck levels, unlimited high-speed water toys, guided diving sessions, and dedicated aerial sky riding windows. Individual or shared experience passes allow booking specific adventures (such as an 800-FT Sky Riding flight or a 2-hour Seabob excursion) during scheduled operational windows.',
      tag: 'Charter Inclusions',
    },
    {
      question: 'How far in advance should we reserve, and what is the cancellation policy?',
      answer: 'Due to exclusive berth allocations and custom provisioning, we recommend reserving your voyage at least 2 to 4 weeks in advance for peak summer dates in Monaco and St. Tropez. Bookings can be modified or rescheduled up to 72 hours prior to embarkation without penalty in the event of unfavorable marine weather conditions.',
      tag: 'Reservations',
    },
  ];

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      aria-label="Frequently Asked Questions" 
      className="relative py-20 sm:py-28 lg:py-36 bg-indigo-950 text-frost-100 overflow-hidden border-t border-indigo-900/60"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-800/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge text-[11px] font-mono uppercase tracking-widest text-frost-200">
            <HelpCircle className="w-3.5 h-3.5 text-frost-100" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-frost-50 leading-[1.1]">
            CHARTER INTEL & QUESTIONS
          </h2>

          <p className="text-frost-300 text-xs sm:text-sm lg:text-base font-light leading-relaxed">
            Everything you need to know about our superyacht fleet, aerial sky riding protocols, water toy operations, and Mediterranean embarkation ports.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-indigo-900/45 border-frost-100/30 shadow-xl'
                    : 'bg-indigo-900/25 border-frost-100/10 hover:border-frost-100/20 hover:bg-indigo-900/35'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-7 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-frost-400 font-semibold">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-frost-50 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full border border-frost-100/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-frost-100 text-indigo-950 border-frost-100' : 'text-frost-200 bg-indigo-950/40'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-frost-300 font-light leading-relaxed border-t border-frost-100/10 pt-4 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Prompt */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-indigo-900/40 border border-frost-100/15 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-frost-400 font-bold block">
              24/7 Naval Concierge & Custom Itineraries
            </span>
            <h4 className="font-display text-lg sm:text-xl font-bold text-frost-50">
              Need a bespoke voyage plan or tailored provisions?
            </h4>
            <p className="text-xs text-frost-300 max-w-lg">
              Our maritime specialists are standing by in Monaco to coordinate your custom port embarkation and flight schedules.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking && onOpenBooking()}
            className="shine-sweep flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-frost-100 text-indigo-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg hover:bg-frost-50 cursor-pointer shrink-0 min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-950" />
            <span>Book A Voyage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
