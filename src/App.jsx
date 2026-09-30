import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExperiencesPage from './pages/ExperiencesPage';
import RidesPage from './pages/RidesPage';
import DiversPage from './pages/DiversPage';
import ReviewsPage from './pages/ReviewsPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import ExperienceModal from './components/ExperienceModal';
import BookingModal from './components/BookingModal';
import { SiteDataProvider } from './context/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  // Synchronize authenticated VIP client session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_nautica_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('aura_nautica_session', JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('aura_nautica_session');
    } catch (err) {
      console.error(err);
    }
  };

  // Derive initial page from current window.location.hash
  const getPageFromHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    if (['experiences', 'rides', 'divers', 'reviews', 'auth', 'login', 'admin'].includes(hash)) {
      return hash === 'login' ? 'auth' : hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  // Sync state with browser URL hash changes (back/forward button support)
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setCurrentPage(newPage);
      if (newPage === 'home') {
        setIsNavbarVisible(false);
      }
      setBookingModalOpen(false);
      setSelectedExperience(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Lenis Smooth Scrolling paired with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (pageKey) => {
    window.location.hash = pageKey === 'home' ? '#/' : `#/${pageKey}`;
    setCurrentPage(pageKey);
    if (pageKey === 'home') {
      setIsNavbarVisible(false);
    }
    setBookingModalOpen(false);
    setSelectedExperience(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (initialData = null) => {
    setBookingInitialData(initialData);
    setBookingModalOpen(true);
  };

  const handleSelectExperience = (exp) => {
    setSelectedExperience(exp);
  };

  return (
    <SiteDataProvider>
      <div className="relative min-h-screen bg-indigo-950 text-frost-100 selection:bg-indigo-600 selection:text-frost-50">
      
      {/* Luxury Navigation Bar */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        isVisible={isNavbarVisible}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
      />

      {/* Render Active Dedicated Page */}
      <main>
        {currentPage === 'home' && (
          <HomePage 
            onAnimationComplete={setIsNavbarVisible}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onSelectExperience={handleSelectExperience}
          />
        )}

        {currentPage !== 'home' && (
          <div key={currentPage} className="animate-page-enter">
            {currentPage === 'experiences' && (
              <ExperiencesPage 
                onNavigate={handleNavigate}
                onSelectExperience={handleSelectExperience}
                onBookNow={(exp) => handleOpenBooking(exp)}
              />
            )}

            {currentPage === 'rides' && (
              <RidesPage 
                onNavigate={handleNavigate}
                onOpenBooking={(data) => handleOpenBooking(data)}
              />
            )}

            {currentPage === 'divers' && (
              <DiversPage 
                onNavigate={handleNavigate}
                onOpenBooking={(data) => handleOpenBooking(data)}
              />
            )}

            {currentPage === 'reviews' && (
              <ReviewsPage 
                onNavigate={handleNavigate}
                onOpenBooking={(data) => handleOpenBooking(data)}
              />
            )}

            {currentPage === 'auth' && (
              <AuthPage 
                currentUser={currentUser}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {currentPage === 'admin' && (
              <AdminPage 
                onNavigate={handleNavigate}
              />
            )}
          </div>
        )}
      </main>

      {/* Deep Dive Experience Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onBookNow={(exp) => handleOpenBooking(exp)}
      />

      {/* Interactive Reservation Drawer / Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={bookingInitialData}
        currentUser={currentUser}
      />

    </div>
    </SiteDataProvider>
  );
}
