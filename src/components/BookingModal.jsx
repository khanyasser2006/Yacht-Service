import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Anchor,
  Compass,
  Calendar,
  Users
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function BookingModal({ isOpen, onClose, initialData, currentUser }) {
  const { addBooking } = useSiteData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    port: 'Monaco / French Riviera (Port Hercule)',
    date: '',
    guests: 8,
    preferredExperience: 'Parachute Yacht Sky Riding',
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  // Synchronize incoming initialData and VIP client credentials whenever modal opens (Flaws 4 & 5)
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser?.name || prev.name || '',
        email: currentUser?.email || prev.email || '',
        phone: currentUser?.phone || prev.phone || '',
        guests: initialData?.guests || prev.guests || 8,
        preferredExperience: initialData?.title || initialData?.route || prev.preferredExperience || 'Parachute Yacht Sky Riding',
        port: initialData?.port || prev.port || 'Monaco / French Riviera (Port Hercule)',
        specialRequests: prev.specialRequests || '',
      }));
      setIsSubmitted(false);
    }
  }, [isOpen, initialData, currentUser]);

  if (!isOpen) return null;

  const ports = [
    'Monaco / French Riviera (Port Hercule)',
    'Nassau / Exumas (Bahamas)',
    'Miami / Biscayne Bay (Florida)',
    'Amalfi Coast / Capri (Italy)',
    'St. Barth / Gustavia (Caribbean)',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = 'AN-' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(code);

    // Persist reservation dossier to SiteDataContext & localStorage (Flaw 2)
    addBooking({
      code,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      port: formData.port,
      date: formData.date,
      guests: parseInt(formData.guests) || 8,
      preferredExperience: formData.preferredExperience,
      specialRequests: formData.specialRequests,
      estimate: initialData?.estimate || 14500,
      itineraryDossier: initialData?.route ? {
        route: initialData.route,
        duration: initialData.duration,
        activities: initialData.activities,
        addons: initialData.addons,
        estimate: initialData.estimate,
      } : null,
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-indigo-950/85 backdrop-blur-2xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Body (Bottom-sheet on mobile, centered dialog on desktop) */}
      <div className="relative w-full max-w-2xl glass-panel rounded-t-3xl sm:rounded-3xl border border-frost-100/20 p-5 sm:p-10 text-frost-100 shadow-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-250">
        
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

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge text-[10px] font-mono uppercase tracking-widest text-frost-200">
                <Sparkles className="w-3 h-3 text-frost-100" />
                <span>Quick Booking Request</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-frost-50">
                BOOK YOUR YACHT TRIP
              </h2>
              <p className="text-frost-300 text-xs sm:text-sm font-normal">
                Fill out the form below. Our team will contact you within 15 minutes to confirm dates, answer any questions, and lock in your reservation.
              </p>
            </div>

            {/* VIP Member Recognition Banner */}
            {currentUser && (
              <div className="mb-4 sm:mb-6 p-3.5 rounded-2xl bg-indigo-900/60 border border-frost-100/20 flex items-center justify-between gap-3 text-xs font-mono text-frost-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>VIP Sanctuary: <strong className="text-frost-50">{currentUser.name}</strong></span>
                </div>
                <span className="text-[10px] uppercase text-indigo-300 tracking-wider">
                  Details Auto-Filled
                </span>
              </div>
            )}

            {/* Custom Itinerary Dossier Banner (Flaw 5) */}
            {initialData?.route && (
              <div className="mb-6 p-4 rounded-2xl bg-indigo-900/70 border border-frost-100/25 space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase tracking-widest text-indigo-300 font-bold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Configured Itinerary Dossier</span>
                  </span>
                  {initialData.estimate && (
                    <span className="font-display font-bold text-frost-50 text-base">
                      ${initialData.estimate.toLocaleString()} <span className="text-[10px] font-mono text-indigo-300">USD</span>
                    </span>
                  )}
                </div>
                <div className="text-frost-50 font-semibold text-sm">
                  {initialData.route} • <span className="text-frost-300 font-normal">{initialData.duration || 'Full Day Expedition'}</span>
                </div>
                {Array.isArray(initialData.activities) && initialData.activities.length > 0 && (
                  <div className="text-[11px] font-mono text-frost-300">
                    Selected Thrills: {initialData.activities.join(' • ')}
                  </div>
                )}
              </div>
            )}

            {/* Reservation Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-frost-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-indigo-900/50 border border-frost-100/15 text-frost-50 placeholder:text-frost-400/40 text-base sm:text-sm focus:outline-none focus:border-frost-100 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-frost-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-indigo-900/50 border border-frost-100/15 text-frost-50 placeholder:text-frost-400/40 text-base sm:text-sm focus:outline-none focus:border-frost-100 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-frost-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 555 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-indigo-900/50 border border-frost-100/15 text-frost-50 placeholder:text-frost-400/40 text-base sm:text-sm focus:outline-none focus:border-frost-100 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-frost-300 mb-1.5">
                    Departure Port *
                  </label>
                  <select
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-indigo-900/80 border border-frost-100/15 text-frost-50 text-base sm:text-sm focus:outline-none focus:border-frost-100 transition-colors cursor-pointer"
                  >
                    {ports.map((p, idx) => (
                      <option key={idx} value={p} className="bg-indigo-950 text-frost-100">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-frost-300 mb-1.5">
                    Trip Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-indigo-900/50 border border-frost-100/15 text-frost-50 text-xs sm:text-sm focus:outline-none focus:border-frost-100 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-frost-300 mb-1.5">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-indigo-900/50 border border-frost-100/15 text-frost-50 text-xs sm:text-sm focus:outline-none focus:border-frost-100 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-frost-300 mb-1.5">
                  Special Requests or Notes (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Tandem parachute flights, special food requests, birthdays or celebrations..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-indigo-900/50 border border-frost-100/15 text-frost-50 placeholder:text-frost-400/40 text-base sm:text-sm focus:outline-none focus:border-frost-100 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="shine-sweep w-full py-4 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 hover:shadow-glow-sm transition-all duration-300 flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>Submit Booking Request</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-frost-400 text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Fast response within 15 minutes • No payment required now</span>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-indigo-900/80 border border-frost-100/40 flex items-center justify-center mx-auto shadow-glow-sm">
              <Anchor className="w-8 h-8 text-frost-100" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-300">
                Request Received
              </span>
              <h2 className="font-display text-3xl font-bold text-frost-50">
                WE'LL BE IN TOUCH SHORTLY
              </h2>
              <p className="text-frost-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-frost-100 font-semibold">{formData.name}</span>! We have received your trip request for <span className="text-frost-100">{formData.port}</span>. Our captain will call or message you shortly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-900/50 border border-frost-100/20 max-w-sm mx-auto space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-frost-400">
                Booking Reference Code
              </span>
              <div className="font-mono text-xl font-bold tracking-widest text-frost-50">
                {reservationCode}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 transition-all duration-200"
            >
              Back to Website
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
