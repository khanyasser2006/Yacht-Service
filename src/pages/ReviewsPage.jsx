import React, { useState } from 'react';
import { 
  MessageSquare, 
  ChevronRight, 
  Anchor, 
  ShieldCheck, 
  Star, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { useSiteData } from '../context/SiteDataContext';

export default function ReviewsPage({ onNavigate, onOpenBooking }) {
  const { addReview } = useSiteData();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    voyageDate: '',
    rideType: 'Parachute Sky Riding',
    rating: '5',
    comments: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.comments.trim()) {
      addReview({
        name: formData.name.trim(),
        voyageDate: formData.voyageDate.trim() || 'Summer 2026',
        rideType: formData.rideType,
        rating: parseInt(formData.rating) || 5,
        comments: formData.comments.trim(),
        headline: `${formData.rideType} Experience`,
        location: 'Monaco & French Riviera',
        route: 'French Riviera Passage',
      });
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-frost-100">
      <SEOHead 
        title="Client Testimonials & Superyacht Charter Reviews | AURA NAUTICA"
        description="Read authentic guest reviews and 4.98-star ratings from verified yacht charter guests. Experiences in Monaco, Cannes, Saint-Tropez, and the Bahamas."
        canonical="https://auranautica.com/#/reviews"
        keywords="yacht charter reviews, superyacht customer testimonials, aura nautica ratings, monaco luxury yacht reviews, verified charter guests"
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
          <span className="text-frost-50 font-bold">Reviews</span>
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-600/30 bg-indigo-900/40 text-indigo-200 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Verified Voyage Testimonials</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.05]">
            GUEST STORIES & VERIFIED RATINGS
          </h1>

          <p className="mt-5 text-frost-300 text-base sm:text-lg leading-relaxed font-sans">
            Read real feedback from guests who celebrated birthdays, anniversaries, and family getaways aboard AURA NAUTICA. With an average rating of 4.98 out of 5 stars, discover why our guests return season after season.
          </p>
        </div>
      </section>

      {/* Main Reviews Component (Frost White Section with Paired Dual Cards) */}
      <Reviews onOpenBooking={onOpenBooking} />

      {/* Review Submission Section (Deep Indigo Section) */}
      <section className="py-24 md:py-32 bg-indigo-950 text-frost-100 border-t border-indigo-900/60 relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-800/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="bg-indigo-900/35 border border-indigo-800/60 rounded-2xl p-8 sm:p-12 backdrop-blur-xl">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono tracking-widest uppercase text-indigo-300 font-bold block mb-2">
              Share Your Story
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-frost-50">
              HAVE YOU SAILED WITH US?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-frost-300 font-sans">
              We would love to hear about your experience. Your review helps future guests plan their dream sea adventure.
            </p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-frost-400 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Keller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-indigo-950/70 border border-indigo-800 text-frost-100 placeholder:text-frost-500 text-xs focus:outline-none focus:border-frost-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-frost-400 mb-2">
                    Voyage Month & Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={formData.voyageDate}
                    onChange={(e) => setFormData({ ...formData, voyageDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-indigo-950/70 border border-indigo-800 text-frost-100 placeholder:text-frost-500 text-xs focus:outline-none focus:border-frost-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-frost-400 mb-2">
                    Primary Experience
                  </label>
                  <select
                    value={formData.rideType}
                    onChange={(e) => setFormData({ ...formData, rideType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-indigo-950/70 border border-indigo-800 text-frost-100 text-xs focus:outline-none focus:border-frost-100"
                  >
                    <option value="Parachute Sky Riding">800-Foot Parachute Sky Riding</option>
                    <option value="Seabob Underwater Jet">Seabob Underwater Jet</option>
                    <option value="Lift3 Carbon eFoil">Lift3 Carbon eFoil</option>
                    <option value="Guided Scuba Safari">Guided Scuba Safari</option>
                    <option value="Full Day VIP Charter">Full Day VIP Charter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-frost-400 mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2 pt-2">
                    {[5, 4, 3, 2, 1].map((num) => (
                      <label key={num} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={num}
                          checked={formData.rating === String(num)}
                          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          className="accent-indigo-500"
                        />
                        <span className="text-xs font-mono text-frost-200">{num}★</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-frost-400 mb-2">
                  Your Review & Highlights
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your flight, the crew, the sea conditions, and your favorite memory..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-indigo-950/70 border border-indigo-800 text-frost-100 placeholder:text-frost-500 text-xs focus:outline-none focus:border-frost-100"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-frost-100 text-indigo-950 hover:bg-frost-50 text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Verified Review</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 rounded-xl bg-indigo-950/90 border border-indigo-700/60 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-frost-100 mx-auto" />
              <h3 className="font-display text-xl font-bold text-frost-50">
                Thank You For Sharing Your Story!
              </h3>
              <p className="text-xs text-frost-300 max-w-md mx-auto font-sans">
                Your verified testimonial has been added to our guest registry and is now live across the platform!
              </p>
            </div>
          )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenBooking={() => onOpenBooking({ title: 'Private Yacht Charter' })} />

    </div>
  );
}
