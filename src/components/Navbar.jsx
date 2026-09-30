import React, { useState, useEffect } from 'react';
import { Anchor, Menu, X, ArrowUpRight, User, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenBooking, isVisible, currentPage = 'home', onNavigate, currentUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const navLinks = [
    { label: 'Home', page: 'home', href: '#/' },
    { label: 'Experiences', page: 'experiences', href: '#/experiences' },
    { label: 'Rides', page: 'rides', href: '#/rides' },
    { label: 'Divers', page: 'divers', href: '#/divers' },
    { label: 'Reviews', page: 'reviews', href: '#/reviews' },
  ];

  // On subpages, navbar is always visible.
  // On the home page, the navbar ONLY appears after scrolling below the hero scroll-triggered animation!
  const shouldShow = currentPage !== 'home' || isVisible;

  // Dynamic dual-palette contrast:
  // - Reviews page is Frost White background
  // - Home page when scrolled below hero is over the Frost White Showcase
  // - Subpages with dark heroes (experiences, rides, divers, auth, admin) use Frost White text
  const isLightSection = currentPage === 'reviews' || (currentPage === 'home' && isVisible);
  const isDarkPage = !isLightSection;

  const handleLinkClick = (e, pageKey) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageKey);
    } else {
      window.location.hash = `#/${pageKey === 'home' ? '' : pageKey}`;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shouldShow 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      } ${
        isScrolled
          ? isDarkPage
            ? 'bg-indigo-950/90 backdrop-blur-md border-b border-frost-100/10 shadow-lg py-3'
            : 'bg-frost-100/95 backdrop-blur-md border-b border-frost-300/80 shadow-md py-3'
          : 'py-4'
      }`}
    >
      {/* Upper Vignette: Oxford Blue gradient across top rim (fades out when scrolled) */}
      <div className={`absolute top-0 inset-x-0 h-32 pointer-events-none -z-10 transition-opacity duration-300 ${
        isScrolled ? 'opacity-0' : 'opacity-100'
      } ${
        isDarkPage 
          ? 'bg-gradient-to-b from-indigo-950/80 via-indigo-950/40 to-transparent' 
          : 'bg-gradient-to-b from-indigo-950/35 via-indigo-900/15 to-transparent'
      }`} />
      <div className={`absolute top-0 inset-x-0 h-[1.5px] pointer-events-none ${
        isDarkPage
          ? 'bg-gradient-to-r from-transparent via-frost-100/20 to-transparent'
          : 'bg-gradient-to-r from-transparent via-indigo-800/30 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between relative z-10">
        
        {/* Brand Monogram */}
        <a 
          href="#/" 
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
        >
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
            isDarkPage
              ? 'border-frost-100/30 bg-indigo-900/60 group-hover:border-frost-100/70'
              : 'border-indigo-950/25 bg-indigo-900/10 group-hover:border-indigo-950/60 group-hover:shadow-sm'
          }`}>
            <Anchor className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-12 ${
              isDarkPage ? 'text-frost-100' : 'text-indigo-950'
            }`} />
          </div>
          <div className="flex flex-col">
            <span className={`font-display tracking-[0.2em] sm:tracking-[0.25em] text-sm sm:text-base font-extrabold leading-tight ${
              isDarkPage ? 'text-frost-50' : 'text-indigo-950'
            }`}>
              AURA NAUTICA
            </span>
            <span className={`text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-mono font-semibold ${
              isDarkPage ? 'text-frost-300' : 'text-indigo-800'
            }`}>
              Superyacht Thrills & Charters
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.page)}
                className={`transition-colors duration-200 relative group py-1 text-[12px] tracking-[0.18em] uppercase font-mono font-bold cursor-pointer ${
                  isDarkPage
                    ? isActive 
                    ? 'text-frost-50 font-extrabold' 
                    : 'text-frost-300 hover:text-frost-100'
                  : isActive 
                    ? 'text-indigo-950 font-extrabold' 
                    : 'text-indigo-950/80 hover:text-indigo-950'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                  isDarkPage ? 'bg-frost-100' : 'bg-indigo-950'
                } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Login / VIP Status & Primary Booking */}
        <div className="hidden sm:flex items-center gap-3">
          {/* VIP Authentication Trigger */}
          <button
            onClick={(e) => handleLinkClick(e, 'auth')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
              currentPage === 'auth'
                ? isDarkPage
                  ? 'bg-frost-100 text-indigo-950 font-bold border-frost-100 shadow-md'
                  : 'bg-indigo-950 text-frost-50 font-bold border-indigo-950 shadow-md'
                : isDarkPage
                  ? 'border-frost-100/25 bg-indigo-900/40 text-frost-200 hover:border-frost-100/60 hover:text-frost-50'
                  : 'border-indigo-950/20 bg-indigo-950/5 text-indigo-950 hover:border-indigo-950/50 hover:bg-indigo-950/10'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenBooking}
            className={`shine-sweep group flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              isDarkPage
                ? 'bg-frost-100 text-indigo-950 hover:bg-frost-50'
                : 'bg-indigo-950 text-frost-50 hover:bg-indigo-900'
            }`}
          >
            <span>Book Experience</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Mobile Booking Trigger */}
          <button
            onClick={onOpenBooking}
            className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              isDarkPage
                ? 'bg-frost-100 text-indigo-950 shadow-sm'
                : 'bg-indigo-950 text-frost-50 shadow-sm'
            }`}
          >
            Book
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={`p-2.5 rounded-xl border min-w-[44px] min-h-[44px] flex items-center justify-center transition-all cursor-pointer ${
              isDarkPage
                ? 'border-frost-100/20 bg-indigo-900/60 text-frost-100 hover:bg-indigo-900'
                : 'border-indigo-950/20 bg-indigo-950/10 text-indigo-950 hover:bg-indigo-950/15'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-3 mt-2 p-5 rounded-3xl bg-indigo-950/95 text-frost-100 backdrop-blur-2xl border border-frost-100/20 space-y-4 animate-in fade-in slide-in-from-top-3 duration-250 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, link.page);
                  }}
                  className={`min-h-[46px] px-4 py-3 rounded-2xl text-xs tracking-wider uppercase font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-frost-100 text-indigo-950 shadow-md font-extrabold' 
                      : 'text-frost-200 hover:text-frost-50 hover:bg-indigo-900/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-950" />}
                </a>
              );
            })}

            <div className="pt-2 border-t border-frost-100/10">
              <a
                href="#/auth"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, 'auth');
                }}
                className={`min-h-[44px] w-full px-4 py-2.5 rounded-2xl text-[11px] tracking-wider uppercase font-mono font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  currentPage === 'auth'
                    ? 'bg-frost-100 text-indigo-950 border-frost-100 font-bold'
                    : 'border-frost-100/15 bg-indigo-900/40 text-frost-200 hover:bg-indigo-900/70'
                }`}
              >
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentUser ? `${currentUser.name} (VIP Sanctuary)` : 'Sign In / Member Portal'}</span>
              </a>
            </div>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="shine-sweep w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-frost-100 text-indigo-950 font-bold text-xs tracking-widest uppercase shadow-lg hover:bg-frost-50 transition-all cursor-pointer"
          >
            <span>Reserve Voyage</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
