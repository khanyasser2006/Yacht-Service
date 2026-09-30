import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSiteData } from '../data/initialData';

const SiteDataContext = createContext(null);
const STORAGE_KEY = 'aura_nautica_site_content_v1';
const BOOKINGS_STORAGE_KEY = 'aura_nautica_bookings_v1';

const initialBookings = [
  {
    id: 'res-101',
    code: 'AN-948271',
    name: 'Lord Sterling Vance',
    email: 'vip@auranautica.com',
    phone: '+1 (555) 942-2872',
    port: 'Monaco / French Riviera (Port Hercule)',
    date: '2026-08-15',
    guests: 8,
    preferredExperience: '800-Foot Parachute Sky Riding & Superyacht Charter',
    status: 'Confirmed',
    estimate: 14500,
    specialRequests: 'Dom Pérignon 2012 chilled upon arrival, helicopter transfer from Nice.',
    createdAt: '2026-08-01T10:30:00Z',
  },
  {
    id: 'res-102',
    code: 'AN-639104',
    name: 'Elena Rostova',
    email: 'elena.rostova@luxuryholdings.mc',
    phone: '+377 98 98 00 11',
    port: 'Amalfi Coast / Capri (Italy)',
    date: '2026-09-02',
    guests: 12,
    preferredExperience: 'Submersible Seabob Fleet & Underwater Scooter Exploration',
    status: 'Pending',
    estimate: 22800,
    specialRequests: 'Tandem dive master required for novice guests.',
    createdAt: '2026-08-25T14:15:00Z',
  }
];

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with initial data to ensure all keys exist
        return {
          ...initialSiteData,
          ...parsed,
          heroStages: parsed.heroStages || initialSiteData.heroStages,
          heroTelemetry: parsed.heroTelemetry || initialSiteData.heroTelemetry,
          experiences: parsed.experiences || initialSiteData.experiences,
          packages: parsed.packages || initialSiteData.packages,
          rides: parsed.rides || initialSiteData.rides,
          crewMembers: parsed.crewMembers || initialSiteData.crewMembers,
          divePrograms: parsed.divePrograms || initialSiteData.divePrograms,
          reviews: parsed.reviews || initialSiteData.reviews,
          routes: parsed.routes || initialSiteData.routes,
          fleetDecks: parsed.fleetDecks || initialSiteData.fleetDecks,
        };
      }
    } catch (err) {
      console.warn('Could not parse stored site data, using initial data:', err);
    }
    return initialSiteData;
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (err) {
      console.warn('Could not parse stored bookings:', err);
    }
    return initialBookings;
  });

  // Sync siteData to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch (err) {
      console.error('Failed to persist site data to localStorage:', err);
    }
  }, [siteData]);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch (err) {
      console.error('Failed to persist bookings to localStorage:', err);
    }
  }, [bookings]);

  // Cross-tab real-time multi-window synchronization (Flaw 3)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSiteData((prev) => ({ ...prev, ...parsed }));
        } catch (err) {
          console.error('Storage sync error for site data:', err);
        }
      }
      if (e.key === BOOKINGS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setBookings(parsed);
        } catch (err) {
          console.error('Storage sync error for bookings:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // --- CRUD ACTIONS ---

  // 1. HERO & TELEMETRY
  const updateHeroStage = (index, updatedFields) => {
    setSiteData((prev) => {
      const updatedStages = [...prev.heroStages];
      if (updatedStages[index]) {
        updatedStages[index] = { ...updatedStages[index], ...updatedFields };
      }
      return { ...prev, heroStages: updatedStages };
    });
  };

  const updateHeroTelemetry = (updatedTelemetry) => {
    setSiteData((prev) => ({
      ...prev,
      heroTelemetry: { ...prev.heroTelemetry, ...updatedTelemetry },
    }));
  };

  // 2. EXPERIENCES
  const createExperience = (newExp) => {
    setSiteData((prev) => {
      const id = newExp.id || `exp-${Date.now()}`;
      const number = String(prev.experiences.length + 1).padStart(2, '0');
      return {
        ...prev,
        experiences: [...prev.experiences, { ...newExp, id, number }],
      };
    });
  };

  const updateExperience = (id, updatedExp) => {
    setSiteData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === id ? { ...item, ...updatedExp } : item
      ),
    }));
  };

  const deleteExperience = (id) => {
    setSiteData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  // 3. PACKAGES
  const createPackage = (newPkg) => {
    setSiteData((prev) => {
      const id = newPkg.id || `pkg-${Date.now()}`;
      return {
        ...prev,
        packages: [...prev.packages, { ...newPkg, id }],
      };
    });
  };

  const updatePackage = (id, updatedPkg) => {
    setSiteData((prev) => ({
      ...prev,
      packages: prev.packages.map((item) =>
        item.id === id ? { ...item, ...updatedPkg } : item
      ),
    }));
  };

  const deletePackage = (id) => {
    setSiteData((prev) => ({
      ...prev,
      packages: prev.packages.filter((item) => item.id !== id),
    }));
  };

  // 4. RIDES
  const createRide = (newRide) => {
    setSiteData((prev) => {
      const id = newRide.id || `ride-${Date.now()}`;
      return {
        ...prev,
        rides: [...prev.rides, { ...newRide, id }],
      };
    });
  };

  const updateRide = (id, updatedRide) => {
    setSiteData((prev) => ({
      ...prev,
      rides: prev.rides.map((item) =>
        item.id === id ? { ...item, ...updatedRide } : item
      ),
    }));
  };

  const deleteRide = (id) => {
    setSiteData((prev) => ({
      ...prev,
      rides: prev.rides.filter((item) => item.id !== id),
    }));
  };

  // 5. DIVERS & CREW
  const createDiver = (newDiver) => {
    setSiteData((prev) => {
      const id = newDiver.id || `diver-${Date.now()}`;
      return {
        ...prev,
        crewMembers: [...prev.crewMembers, { ...newDiver, id }],
      };
    });
  };

  const updateDiver = (id, updatedDiver) => {
    setSiteData((prev) => ({
      ...prev,
      crewMembers: prev.crewMembers.map((item) =>
        item.id === id ? { ...item, ...updatedDiver } : item
      ),
    }));
  };

  const deleteDiver = (id) => {
    setSiteData((prev) => ({
      ...prev,
      crewMembers: prev.crewMembers.filter((item) => item.id !== id),
    }));
  };

  // 6. DIVE PROGRAMS
  const createDiveProgram = (newProgram) => {
    setSiteData((prev) => {
      const id = newProgram.id || `prog-${Date.now()}`;
      return {
        ...prev,
        divePrograms: [...prev.divePrograms, { ...newProgram, id }],
      };
    });
  };

  const updateDiveProgram = (id, updatedProgram) => {
    setSiteData((prev) => ({
      ...prev,
      divePrograms: prev.divePrograms.map((item) =>
        item.id === id ? { ...item, ...updatedProgram } : item
      ),
    }));
  };

  const deleteDiveProgram = (id) => {
    setSiteData((prev) => ({
      ...prev,
      divePrograms: prev.divePrograms.filter((item) => item.id !== id),
    }));
  };

  // 7. REVIEWS
  const createReview = (newReview) => {
    setSiteData((prev) => {
      const id = newReview.id || Date.now();
      return {
        ...prev,
        reviews: [{ ...newReview, id }, ...prev.reviews],
      };
    });
  };

  const updateReview = (id, updatedReview) => {
    setSiteData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((item) =>
        item.id === id ? { ...item, ...updatedReview } : item
      ),
    }));
  };

  const deleteReview = (id) => {
    setSiteData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((item) => item.id !== id),
    }));
  };

  // 8. ROUTES
  const createRoute = (newRoute) => {
    setSiteData((prev) => {
      const id = newRoute.id || `route-${Date.now()}`;
      return {
        ...prev,
        routes: [...prev.routes, { ...newRoute, id }],
      };
    });
  };

  const updateRoute = (id, updatedRoute) => {
    setSiteData((prev) => ({
      ...prev,
      routes: prev.routes.map((item) =>
        item.id === id ? { ...item, ...updatedRoute } : item
      ),
    }));
  };

  const deleteRoute = (id) => {
    setSiteData((prev) => ({
      ...prev,
      routes: prev.routes.filter((item) => item.id !== id),
    }));
  };

  // 9. FLEET DECKS
  const updateFleetDeck = (id, updatedDeck) => {
    setSiteData((prev) => ({
      ...prev,
      fleetDecks: prev.fleetDecks.map((item) =>
        item.id === id ? { ...item, ...updatedDeck } : item
      ),
    }));
  };

  // 10. BOOKING MANIFEST & INQUIRIES (Flaw 2)
  const addBooking = (newBooking) => {
    const bookingItem = {
      id: newBooking.id || `res-${Date.now()}`,
      code: newBooking.code || `AN-${Math.floor(100000 + Math.random() * 900000)}`,
      name: newBooking.name || 'Anonymous Guest',
      email: newBooking.email || '',
      phone: newBooking.phone || '',
      port: newBooking.port || 'Monaco / French Riviera (Port Hercule)',
      date: newBooking.date || new Date().toISOString().split('T')[0],
      guests: newBooking.guests || 8,
      preferredExperience: newBooking.preferredExperience || 'Parachute Yacht Sky Riding',
      status: 'Pending',
      estimate: newBooking.estimate || 14500,
      specialRequests: newBooking.specialRequests || '',
      itineraryDossier: newBooking.itineraryDossier || null,
      createdAt: new Date().toISOString(),
      ...newBooking,
    };

    setBookings((prev) => {
      const next = [bookingItem, ...prev];
      try {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to persist bookings:', err);
      }
      return next;
    });

    return bookingItem;
  };

  const updateBookingStatus = (id, status) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, status } : b));
      try {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to update booking status:', err);
      }
      return next;
    });
  };

  const deleteBooking = (id) => {
    setBookings((prev) => {
      const next = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to delete booking:', err);
      }
      return next;
    });
  };

  // Add review helper that immediately persists to storage and state (Flaw 1)
  const addReview = (newReview) => {
    const reviewItem = {
      id: newReview.id || `rev-${Date.now()}`,
      name: newReview.name || 'Verified Client',
      location: newReview.location || 'Mediterranean Charter',
      date: newReview.date || newReview.voyageDate || 'Current Season 2026',
      route: newReview.route || 'French Riviera & Monaco',
      category: 'public',
      experience: newReview.experience || newReview.rideType || '800-Foot Parachute Sky Riding',
      rating: parseInt(newReview.rating) || 5,
      headline: newReview.headline || 'Exceptional Marine Voyage',
      quote: newReview.quote || newReview.comments || '',
      verified: true,
      tag: 'Verified Public Charter',
    };

    setSiteData((prev) => {
      const nextReviews = [reviewItem, ...(prev.reviews || [])];
      const nextData = { ...prev, reviews: nextReviews };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      } catch (err) {
        console.error('Failed to persist new review:', err);
      }
      return nextData;
    });

    return reviewItem;
  };

  // 11. FACTORY RESET & IMPORT/EXPORT
  const resetToFactoryDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setSiteData(initialSiteData);
    setBookings(initialBookings);
  };

  const exportDataJSON = () => {
    return JSON.stringify({ siteData, bookings }, null, 2);
  };

  const saveAllSiteData = (newData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (err) {
      console.error('Failed to persist site data to localStorage:', err);
    }
    setSiteData(newData);
    return { success: true };
  };

  const importDataJSON = (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.siteData) {
        setSiteData({ ...initialSiteData, ...parsed.siteData });
        if (parsed.bookings) setBookings(parsed.bookings);
      } else {
        setSiteData({ ...initialSiteData, ...parsed });
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    siteData,
    bookings,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    addReview,
    updateHeroStage,
    updateHeroTelemetry,
    createExperience,
    updateExperience,
    deleteExperience,
    createPackage,
    updatePackage,
    deletePackage,
    createRide,
    updateRide,
    deleteRide,
    createDiver,
    updateDiver,
    deleteDiver,
    createDiveProgram,
    updateDiveProgram,
    deleteDiveProgram,
    createReview,
    updateReview,
    deleteReview,
    createRoute,
    updateRoute,
    deleteRoute,
    updateFleetDeck,
    resetToFactoryDefaults,
    saveAllSiteData,
    exportDataJSON,
    importDataJSON,
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
