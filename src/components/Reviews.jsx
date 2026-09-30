import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Quote, 
  MapPin, 
  Calendar,
  ThumbsUp,
  Users
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function Reviews({ onOpenBooking }) {
  const { siteData } = useSiteData();
  const reviewsData = siteData?.reviews || [];
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Guest Stories (8)' },
    { id: 'public', label: 'Public & Day Passes' },
    { id: 'sky-riding', label: 'Sky Riding Flights' },
    { id: 'water-toys', label: 'Seabob, eFoils & Air Diving' },
    { id: 'family', label: 'Family & Groups' },
  ];

  const filteredReviews = activeCategory === 'all' 
    ? reviewsData 
    : reviewsData.filter(r => r.category === activeCategory);

  return (
    <section id="reviews" className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 overflow-hidden border-t border-frost-300">
      
      {/* Subtle ocean pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#271E79_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-frost-300 gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-950/20 bg-indigo-950/5 text-indigo-900 text-xs font-mono tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-800" />
              <span>Verified Public Feedback & Stories</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-950 leading-[1.1]">
              WHAT OUR GUESTS SAY ABOUT THEIR VOYAGE
            </h2>
            
            <p className="mt-3 sm:mt-4 text-indigo-900/80 text-sm sm:text-base leading-relaxed font-sans">
              From everyday vacationers booking shared passes to private charter parties. Real public feedback from guests who flew, dived, and experienced pure fun with us.
            </p>
          </div>

          {/* Quick Action */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenBooking({ title: 'Public or Private Yacht Experience' })}
              className="group flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
            >
              <span>Book Your Own Voyage</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Live Ratings Highlights Banner (Frost White Card with Deep Indigo Text) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-8 rounded-2xl bg-frost-50 border border-frost-300 shadow-sm mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-indigo-900 text-indigo-900" />
              ))}
            </div>
            <span className="block font-display text-xl sm:text-3xl font-bold text-indigo-950">
              4.98 / 5.0
            </span>
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-indigo-900/70">
              184 Verified Reviews
            </span>
          </div>

          <div>
            <span className="block font-display text-xl sm:text-3xl font-bold text-indigo-950 mb-1">
              100%
            </span>
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-indigo-900/70">
              Flawless Safety Record
            </span>
            <p className="text-[10px] sm:text-[11px] text-indigo-900/60 mt-1 font-sans">
              Zero incidents across all rides
            </p>
          </div>

          <div>
            <span className="block font-display text-xl sm:text-3xl font-bold text-indigo-950 mb-1">
              98%
            </span>
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-indigo-900/70">
              Public Rebook Rate
            </span>
            <p className="text-[10px] sm:text-[11px] text-indigo-900/60 mt-1 font-sans">
              Repeat voyages or referrals
            </p>
          </div>

          <div>
            <span className="block font-display text-xl sm:text-3xl font-bold text-indigo-950 mb-1">
              500+
            </span>
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-indigo-900/70">
              Dry-Deck Sky Flights
            </span>
            <p className="text-[10px] sm:text-[11px] text-indigo-900/60 mt-1 font-sans">
              Zero water landings required
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-indigo-950 text-frost-50 shadow-md'
                  : 'bg-frost-200 text-indigo-900/80 hover:text-indigo-950 hover:bg-frost-300 border border-frost-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid: Paired Dual-Contrast Cards */}
        <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-12 sm:mb-16 animate-in fade-in duration-300">
          {filteredReviews.map((review, idx) => {
            const isDarkCard = idx % 2 === 0;

            return (
              <div 
                key={review.id}
                className={`rounded-2xl p-5 sm:p-8 border flex flex-col justify-between transition-all duration-300 hover-luxury-lift group ${
                  isDarkCard
                    ? 'bg-indigo-950 text-frost-100 border-indigo-800/80 hover:border-indigo-600'
                    : 'bg-frost-50 text-indigo-950 border-frost-300 hover:border-indigo-950/30'
                }`}
              >
                <div>
                  {/* Review Header: Stars & Experience Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            isDarkCard ? 'fill-frost-100 text-frost-100' : 'fill-indigo-900 text-indigo-900'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border ${
                      isDarkCard
                        ? 'bg-indigo-900/80 text-indigo-200 border-indigo-700/50'
                        : 'bg-indigo-950/5 text-indigo-950 border-indigo-950/15 font-bold'
                    }`}>
                      {review.tag}
                    </span>
                  </div>

                  {/* Pull Headline */}
                  <h3 className={`font-display text-base sm:text-lg font-bold mb-3 leading-snug ${
                    isDarkCard ? 'text-frost-50' : 'text-indigo-950'
                  }`}>
                    {review.headline}
                  </h3>

                  {/* Full Quote */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-sans ${
                    isDarkCard ? 'text-frost-300' : 'text-indigo-900/80'
                  }`}>
                    {review.quote}
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className={`pt-4 border-t ${
                  isDarkCard ? 'border-indigo-900/60' : 'border-frost-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`font-semibold text-sm ${
                      isDarkCard ? 'text-frost-100' : 'text-indigo-950'
                    }`}>
                      {review.name}
                    </span>
                    <div className={`flex items-center gap-1 text-[11px] font-mono ${
                      isDarkCard ? 'text-indigo-400' : 'text-indigo-800'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Guest</span>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between text-xs font-sans ${
                    isDarkCard ? 'text-frost-400' : 'text-indigo-900/70'
                  }`}>
                    <span>{review.location}</span>
                    <span className="font-mono text-[11px]">{review.date}</span>
                  </div>

                  <div className={`mt-2 text-[11px] font-mono ${
                    isDarkCard ? 'text-indigo-300/80' : 'text-indigo-800'
                  }`}>
                    Voyage: {review.route}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Security Strip */}
        <div className="p-4 sm:p-6 rounded-2xl bg-frost-50 border border-frost-300 flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-xs text-indigo-900 font-mono tracking-wider shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>100% VERIFIED PUBLIC FEEDBACK</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>HONEST UNFILTERED EXPERIENCES</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>USCG COMPLIANT EQUIPMENT</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-indigo-800 shrink-0" />
            <span>TOP RATED BY THE PUBLIC</span>
          </div>
        </div>

      </div>
    </section>
  );
}
