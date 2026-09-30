import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Anchor, 
  Sparkles, 
  KeyRound, 
  LogOut, 
  Compass, 
  Award,
  ChevronRight,
  Phone
} from 'lucide-react';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

export default function AuthPage({ currentUser, onLogin, onLogout, onNavigate, onOpenBooking }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRemember, setLoginRemember] = useState(true);
  
  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRegion, setRegRegion] = useState('French Riviera');
  const [regTier, setRegTier] = useState('Private Charter Guest');
  const [regTerms, setRegTerms] = useState(true);

  // Status & Error Notification State
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    const email = (loginEmail || '').trim().toLowerCase();
    const password = (loginPassword || '').trim();

    if (!email || !password) {
      setErrorMessage('Please enter both your member email and access key.');
      return;
    }

    // 1. Check admin / staff officer credentials
    const isAdminEmail = email === 'admin@auranautica.com' || email === 'captain@auranautica.com' || email === 'admin';
    const isAdminPassword = password === 'adminkey2026' || password === 'yacht2026' || password === 'admin' || password === 'admin123';

    if (isAdminEmail) {
      if (isAdminPassword) {
        const adminUser = {
          name: 'Captain Alexander Hawke',
          email: 'admin@auranautica.com',
          phone: '+33 4 93 00 88 00',
          role: 'admin',
          tier: 'Fleet Command & Chief Officer',
          region: 'Monaco & Global Fleet',
          memberSince: '2022',
          vipCode: 'COMMAND-001-ADMIN'
        };
        onLogin(adminUser);
        setStatusMessage('Fleet Officer Authenticated. Redirecting to Fleet Command CMS Console...');
        setTimeout(() => {
          if (onNavigate) onNavigate('admin');
        }, 800);
        return;
      } else {
        setErrorMessage('Invalid officer access key for admin@auranautica.com. Access key is: adminkey2026');
        return;
      }
    }

    // 2. Check VIP Demo credentials
    const isVipEmail = email === 'vip@auranautica.com' || email === 'vip';
    const isVipPassword = password === 'yacht2026' || password === 'vip';

    if (isVipEmail) {
      if (isVipPassword) {
        const demoUser = {
          name: 'Lord Sterling Vance',
          email: 'vip@auranautica.com',
          phone: '+1 (555) 942-2872',
          role: 'vip',
          tier: 'Platinum Charter Member',
          region: 'French Riviera & Monaco',
          memberSince: '2024',
          vipCode: 'AURA-8829-VIP'
        };
        onLogin(demoUser);
        setStatusMessage('Welcome back, Lord Sterling Vance. Accessing sanctuary telemetry...');
        return;
      } else {
        setErrorMessage('Invalid VIP access key for vip@auranautica.com. Access key is: yacht2026');
        return;
      }
    }

    // 3. Check stored users in localStorage
    let storedUsers = [];
    try {
      const raw = localStorage.getItem('aura_nautica_users');
      if (raw) storedUsers = JSON.parse(raw);
    } catch (err) {
      storedUsers = [];
    }

    const foundUser = storedUsers.find(
      (u) => (u.email || '').trim().toLowerCase() === email && u.password === password
    );

    if (foundUser) {
      onLogin(foundUser);
      setStatusMessage(`Welcome back, ${foundUser.name}. Authentication verified.`);
    } else {
      // Check if email exists with wrong password, or doesn't exist at all
      const emailExists = storedUsers.some((u) => (u.email || '').trim().toLowerCase() === email);
      if (emailExists) {
        setErrorMessage('Invalid access key for this member email. Please verify credentials.');
      } else {
        setErrorMessage('No VIP membership found under this email. Would you like to register below?');
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    if (!regName.trim()) {
      setErrorMessage('Please provide your full legal name for the charter manifest.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Access key must be at least 6 characters in length.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Access keys do not match. Please re-enter your password.');
      return;
    }
    if (!regTerms) {
      setErrorMessage('Please agree to maritime safety discretion terms.');
      return;
    }

    let storedUsers = [];
    try {
      const raw = localStorage.getItem('aura_nautica_users');
      if (raw) storedUsers = JSON.parse(raw);
    } catch (err) {
      storedUsers = [];
    }

    const emailExists = storedUsers.some((u) => u.email.toLowerCase() === regEmail.trim().toLowerCase());
    if (emailExists || regEmail.toLowerCase() === 'vip@auranautica.com') {
      setErrorMessage('This email is already registered in our sanctuary registry. Please sign in.');
      setAuthMode('login');
      setLoginEmail(regEmail.trim());
      return;
    }

    const newUser = {
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || '+1 (Private Concierge)',
      password: regPassword,
      region: regRegion,
      tier: regTier,
      memberSince: new Date().getFullYear().toString(),
      vipCode: `AURA-${Math.floor(1000 + Math.random() * 9000)}-VIP`
    };

    storedUsers.push(newUser);
    try {
      localStorage.setItem('aura_nautica_users', JSON.stringify(storedUsers));
    } catch (err) {
      console.error(err);
    }

    // Auto-login newly registered VIP client
    onLogin(newUser);
    setStatusMessage(`Membership registration successful! Welcome aboard, ${newUser.name}.`);
  };

  const privileges = [
    {
      number: '01',
      title: 'Priority Berth & Tender Dispatch',
      desc: 'Guaranteed high-speed tender pickups and VIP harbor clearance in Monaco, Saint-Tropez, and Nassau.',
    },
    {
      number: '02',
      title: 'Dedicated Master Concierge Officer',
      desc: 'Direct encrypted line to Commander James Harrington for bespoke voyage tailoring and private chef bookings.',
    },
    {
      number: '03',
      title: 'Complimentary 800-FT Sky Pass',
      desc: 'One certified aft-deck aero-tether parasailing flight session included with every yacht charter.',
    },
    {
      number: '04',
      title: '100% Discretion & Encryption',
      desc: 'All passenger manifests and guest dossiers are guarded under strict non-disclosure maritime protocols.',
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-950 text-frost-100 selection:bg-indigo-600 selection:text-frost-50">
      <SEOHead 
        title="VIP Sanctuary Member Portal & Voyage Dossier | AURA NAUTICA"
        description="Private portal access for AURA NAUTICA charter clients. Access your custom voyage itineraries, verified flight telemetry, and private reservations."
        canonical="https://auranautica.com/#/auth"
        keywords="yacht charter login, vip client sanctuary, aura nautica members, superyacht concierge login"
      />
      
      {/* SECTION 1: Deep Indigo Hero Header */}
      <section className="relative pt-28 pb-14 sm:pt-44 sm:pb-28 bg-indigo-950 text-frost-100 overflow-hidden border-b border-indigo-900/60">
        {/* Cinematic Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-700/25 rounded-full blur-[140px] pointer-events-none animate-ambient-breathe" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none animate-ambient-breathe" />

        <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
          
          {/* Breadcrumbs & Roman Numeral Category */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xs font-semibold text-frost-300 tracking-[0.25em]">
              I
            </span>
            <div className="w-6 h-[1px] bg-frost-100/30" />
            <span className="font-mono text-[10px] text-frost-300 uppercase tracking-[0.25em]">
              VIP CLIENT SANCTUARY
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-frost-50 leading-[1.05] text-glow mb-4 sm:mb-6 max-w-4xl">
            EXCLUSIVE MARITIME SANCTUARY
          </h1>

          <p className="text-frost-100/90 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Access your private voyage dossiers, bespoke charter reservations, and verified telemetry for the AURA NAUTICA superyacht fleet.
          </p>

          {/* Quick Demo Credentials Tip */}
          {!currentUser && (
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-indigo-900/60 border border-frost-100/15 text-xs font-mono text-frost-300">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>
                  VIP Member: <strong className="text-frost-100">vip@auranautica.com</strong> / Key: <strong className="text-frost-100">yacht2026</strong>
                </span>
              </div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-indigo-900/60 border border-indigo-500/30 text-xs font-mono text-frost-300">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>
                  Fleet Officer (Admin): <strong className="text-frost-100">admin@auranautica.com</strong> / Key: <strong className="text-frost-100">adminkey2026</strong>
                </span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 2: Frost White Main Showcase (Dual-Card Paired Architecture) */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-frost-100 text-indigo-950 overflow-hidden border-t border-frost-300">
        
        {/* Subtle Topographic Ambient Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#271E79_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

        <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">

          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs font-semibold text-indigo-800 tracking-[0.25em]">
                AUTHENTICATION
              </span>
              <div className="w-8 h-[1px] bg-indigo-900/30" />
              <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-[0.25em]">
                ENCRYPTED ACCESS PORTAL
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-indigo-950 leading-tight">
              {currentUser ? 'CLIENT DOSSIER & FLEET PRIVILEGES' : 'SIGN IN OR REGISTER MEMBERSHIP'}
            </h2>

            <p className="text-indigo-900/70 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              {currentUser 
                ? 'Your verified VIP charter profile is active. Review your dedicated concierge access and personalized fleet privileges below.'
                : 'Registered members receive priority slip assignment, private tender dispatch, and instant reservation confirmation with zero wait time.'
              }
            </p>
          </div>

          {/* Dual Paired Layout (7 cols Left Console + 5 cols Right Dossier) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* LEFT COLUMN: The Authentication or VIP Dashboard Console (7 cols) */}
            <div className="lg:col-span-7 bg-indigo-950 text-frost-100 rounded-3xl p-5 sm:p-8 lg:p-12 border border-indigo-900/60 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              
              {/* Background Watermark Monogram */}
              <div className="absolute -bottom-10 -right-10 text-[180px] font-display font-bold text-frost-100/[0.03] select-none pointer-events-none">
                VIP
              </div>

              <div className="relative z-10 space-y-6">
                
                {/* STATE A: User IS LOGGED IN -> Show VIP Dashboard */}
                {currentUser ? (
                  <div className="space-y-6">
                    
                    {/* Header Bar */}
                    <div className="flex items-center justify-between border-b border-frost-100/15 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-indigo-900/90 border border-frost-100/20 flex items-center justify-center text-frost-100">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-lg font-bold text-frost-50">
                              {currentUser.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-indigo-900/60 text-indigo-200 border border-frost-100/20">
                              VERIFIED VIP
                            </span>
                          </div>
                          <span className="text-xs font-mono text-indigo-300">
                            {currentUser.vipCode}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-frost-300 hover:text-frost-50 text-xs font-mono tracking-wider uppercase border border-frost-100/10 transition-all cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                    {/* Member Telemetry Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-indigo-900/50 p-4 rounded-2xl border border-frost-100/10">
                        <span className="block text-[9px] font-mono uppercase text-frost-400 tracking-widest">
                          Membership Tier
                        </span>
                        <span className="text-sm font-mono font-bold text-frost-50 mt-1 block">
                          {currentUser.tier || 'Platinum Charter'}
                        </span>
                      </div>
                      <div className="bg-indigo-900/50 p-4 rounded-2xl border border-frost-100/10">
                        <span className="block text-[9px] font-mono uppercase text-frost-400 tracking-widest">
                          Primary Region
                        </span>
                        <span className="text-sm font-mono font-bold text-frost-50 mt-1 block">
                          {currentUser.region || 'French Riviera'}
                        </span>
                      </div>
                      <div className="bg-indigo-900/50 p-4 rounded-2xl border border-frost-100/10 col-span-2 sm:col-span-1">
                        <span className="block text-[9px] font-mono uppercase text-frost-400 tracking-widest">
                          Member Since
                        </span>
                        <span className="text-sm font-mono font-bold text-frost-50 mt-1 block">
                          {currentUser.memberSince || '2026'}
                        </span>
                      </div>
                    </div>

                    {/* Concierge Dossier Card */}
                    <div className="p-6 rounded-2xl bg-indigo-900/40 border border-frost-100/15 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-frost-300 border-b border-frost-100/10 pb-2">
                        <span className="flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-indigo-400" />
                          <span>Assigned Vessel Officer</span>
                        </span>
                        <span className="text-frost-300 font-bold">ONLINE VIA STARLINK</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display text-base font-bold text-frost-100">
                          Commander James Harrington
                        </h4>
                        <p className="text-xs font-light text-frost-300 leading-relaxed font-sans">
                          Available 24/7 for custom regattas, Michelin chef preferences, and direct tender pickups in Cannes, Monaco, and Nassau.
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-4 text-xs font-mono text-indigo-300">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Direct Bridge: +33 4 93 00 88 12</span>
                        </span>
                      </div>
                    </div>

                    {/* Fleet Command CMS Exclusive Access Tile */}
                    {currentUser?.role === 'admin' && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-indigo-900/60 border border-frost-100/30 space-y-3.5 shadow-xl animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-widest text-indigo-300 font-bold flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-indigo-400" />
                            <span>Fleet Command Console</span>
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-800 text-frost-100 border border-frost-100/20">
                            FULL ADMIN ACCESS
                          </span>
                        </div>
                        <p className="text-xs text-frost-300 font-sans">
                          Direct administrative control of live vessel telemetry, dynamic catalog packages, guest reviews, and customer charter manifests.
                        </p>
                        <button
                          onClick={() => onNavigate('admin')}
                          className="shine-sweep w-full py-3.5 rounded-full bg-frost-100 text-indigo-950 font-bold text-xs tracking-widest uppercase hover:bg-frost-50 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-indigo-950" />
                          <span>Enter Fleet Command CMS</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Quick Booking Triggers */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => onOpenBooking({ title: 'VIP Exclusive Charter Expedition' })}
                        className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 shine-sweep hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Dispatch Charter Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onNavigate('experiences')}
                        className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-indigo-900/80 hover:bg-indigo-900 text-frost-100 font-semibold text-xs tracking-widest uppercase border border-frost-100/15 hover-luxury-lift transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Browse Experiences</span>
                      </button>
                    </div>

                  </div>
                ) : (
                  /* STATE B: User is NOT logged in -> Show Tabs & Forms */
                  <div className="space-y-6">
                    
                    {/* Top Mode Selector Tabs */}
                    <div className="flex items-center justify-between border-b border-frost-100/15 pb-4">
                      <div className="inline-flex p-1 rounded-full bg-indigo-900/70 border border-frost-100/15">
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('login');
                            setErrorMessage(null);
                            setStatusMessage(null);
                          }}
                          className={`px-6 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                            authMode === 'login'
                              ? 'bg-frost-100 text-indigo-950 font-bold shadow-md'
                              : 'text-frost-300 hover:text-frost-100'
                          }`}
                        >
                          Sign In
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('register');
                            setErrorMessage(null);
                            setStatusMessage(null);
                          }}
                          className={`px-6 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                            authMode === 'register'
                              ? 'bg-frost-100 text-indigo-950 font-bold shadow-md'
                              : 'text-frost-300 hover:text-frost-100'
                          }`}
                        >
                          Register
                        </button>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-widest text-frost-400 hidden sm:inline-block">
                        256-Bit SSL Enclave
                      </span>
                    </div>

                    {/* Status / Error Banner */}
                    {statusMessage && (
                      <div className="p-3.5 rounded-2xl bg-indigo-900/90 border border-frost-100/30 text-frost-100 text-xs font-mono flex items-center gap-2.5 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{statusMessage}</span>
                      </div>
                    )}

                    {errorMessage && (
                      <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs font-mono flex items-center justify-between gap-2.5 animate-in fade-in">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                        {authMode === 'login' && errorMessage.includes('register') && (
                          <button
                            type="button"
                            onClick={() => setAuthMode('register')}
                            className="text-[11px] font-bold underline text-frost-50 hover:text-frost-200 cursor-pointer"
                          >
                            Register Now
                          </button>
                        )}
                      </div>
                    )}

                    {/* FORM 1: LOGIN MODE */}
                    {authMode === 'login' && (
                      <form key={authMode} onSubmit={handleLoginSubmit} className="space-y-4 animate-in fade-in duration-300">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                            Member Email / Client ID
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-frost-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              placeholder="client@luxurydomain.com"
                              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono placeholder:text-frost-400/50 focus:outline-none focus:border-frost-100/60 focus:bg-indigo-900/80 transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                              Access Key / Password
                            </label>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setLoginEmail('vip@auranautica.com');
                                  setLoginPassword('yacht2026');
                                }}
                                className="text-[10px] font-mono text-indigo-300 hover:text-frost-100 underline cursor-pointer"
                              >
                                VIP Demo
                              </button>
                              <span className="text-frost-500 text-[10px]">•</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setLoginEmail('admin@auranautica.com');
                                  setLoginPassword('adminkey2026');
                                }}
                                className="text-[10px] font-mono text-indigo-200 hover:text-frost-50 underline cursor-pointer font-bold"
                              >
                                Staff Admin Demo
                              </button>
                            </div>
                          </div>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-frost-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="••••••••••••"
                              className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono placeholder:text-frost-400/50 focus:outline-none focus:border-frost-100/60 focus:bg-indigo-900/80 transition-all"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label="Toggle password visibility"
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-frost-400 hover:text-frost-100 cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-xs font-mono text-frost-400">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={loginRemember}
                              onChange={(e) => setLoginRemember(e.target.checked)}
                              className="rounded border-frost-100/20 bg-indigo-900 accent-frost-100"
                            />
                            <span>Remember this device</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              setStatusMessage('Password reset link sent to registered email.');
                            }}
                            className="hover:text-frost-100 underline cursor-pointer"
                          >
                            Forgot key?
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-4 py-4 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 shine-sweep hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                        >
                          <span>Sign In to Client Sanctuary</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>

                        <div className="pt-3 text-center">
                          <span className="text-xs font-mono text-frost-400">
                            Not a registered VIP client?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMode('register');
                                setErrorMessage(null);
                              }}
                              className="text-frost-100 font-bold underline hover:text-frost-200 cursor-pointer"
                            >
                              Apply for Membership →
                            </button>
                          </span>
                        </div>
                      </form>
                    )}

                    {/* FORM 2: REGISTER MODE */}
                    {authMode === 'register' && (
                      <form key={authMode} onSubmit={handleRegisterSubmit} className="space-y-4 animate-in fade-in duration-300">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                              Full Legal Name
                            </label>
                            <div className="relative">
                              <User className="w-4 h-4 text-frost-400 absolute left-4 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                placeholder="Lady Victoria Sterling"
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono placeholder:text-frost-400/50 focus:outline-none focus:border-frost-100/60 transition-all"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-frost-400 absolute left-4 top-1/2 -translate-y-1/2" />
                              <input
                                type="email"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                placeholder="victoria@sovereign.ch"
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono placeholder:text-frost-400/50 focus:outline-none focus:border-frost-100/60 transition-all"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                              Preferred Charter Route
                            </label>
                            <select
                              value={regRegion}
                              onChange={(e) => setRegRegion(e.target.value)}
                              className="w-full px-4 py-3 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono focus:outline-none focus:border-frost-100/60 transition-all cursor-pointer"
                            >
                              <option value="French Riviera">French Riviera Passage (Monaco)</option>
                              <option value="Exuma Cays">Exuma Cays & Blue Lagoon</option>
                              <option value="Amalfi Coast">Amalfi & Faraglioni Cliffs</option>
                              <option value="Caribbean Archipelago">Caribbean Island Hopping</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                              Charter Profile
                            </label>
                            <select
                              value={regTier}
                              onChange={(e) => setRegTier(e.target.value)}
                              className="w-full px-4 py-3 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono focus:outline-none focus:border-frost-100/60 transition-all cursor-pointer"
                            >
                              <option value="Private Charter Guest">Private Charter Client</option>
                              <option value="Yacht Syndicate Owner">Yacht Syndicate Owner</option>
                              <option value="Family Office Representative">Family Office Representative</option>
                              <option value="VIP Corporate Executive">VIP Corporate Executive</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                              Create Access Key
                            </label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-frost-400 absolute left-4 top-1/2 -translate-y-1/2" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                placeholder="Min 6 characters"
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono placeholder:text-frost-400/50 focus:outline-none focus:border-frost-100/60 transition-all"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-frost-300 block">
                              Confirm Access Key
                            </label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-frost-400 absolute left-4 top-1/2 -translate-y-1/2" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={regConfirmPassword}
                                onChange={(e) => setRegConfirmPassword(e.target.value)}
                                placeholder="Repeat access key"
                                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-indigo-900/60 border border-frost-100/15 text-frost-100 text-base sm:text-xs font-mono placeholder:text-frost-400/50 focus:outline-none focus:border-frost-100/60 transition-all"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-1 text-xs font-mono text-frost-400">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={regTerms}
                              onChange={(e) => setRegTerms(e.target.checked)}
                              className="mt-0.5 rounded border-frost-100/20 bg-indigo-900 accent-frost-100"
                              required
                            />
                            <span>
                              I agree to maritime safety discretion and vessel non-disclosure protocols.
                            </span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-2 py-4 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 shine-sweep hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                        >
                          <span>Create VIP Account & Enter</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>

                        <div className="pt-2 text-center">
                          <span className="text-xs font-mono text-frost-400">
                            Already registered with AURA NAUTICA?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setAuthMode('login');
                                setErrorMessage(null);
                              }}
                              className="text-frost-100 font-bold underline hover:text-frost-200 cursor-pointer"
                            >
                              Sign In to Your Account →
                            </button>
                          </span>
                        </div>

                      </form>
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* RIGHT COLUMN: Exclusive Charter Privileges Dossier Card (5 cols) */}
            <div className="lg:col-span-5 bg-frost-50 text-indigo-950 rounded-3xl p-5 sm:p-8 lg:p-10 border border-frost-300 shadow-lg flex flex-col justify-between space-y-6 sm:space-y-8">
              
              <div className="space-y-5 sm:space-y-6">
                
                {/* Card Header */}
                <div className="border-b border-frost-300 pb-4">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-indigo-950/10 text-indigo-950">
                      CHARTER PRIVILEGES
                    </span>
                    <Anchor className="w-5 h-5 text-indigo-800" />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-indigo-950 leading-snug">
                    MEMBERSHIP BENEFITS
                  </h3>
                  <p className="text-xs font-light text-indigo-900/70 font-sans mt-1">
                    Every authenticated member enjoys uninterrupted maritime luxury and prioritized vessel dispatch.
                  </p>
                </div>

                {/* 4 Privileges List */}
                <div className="space-y-3 sm:space-y-4">
                  {privileges.map((p) => (
                    <div key={p.number} className="p-3.5 sm:p-4 rounded-2xl bg-frost-200/70 border border-frost-300/80 space-y-1 hover-luxury-lift transition-all">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-800">
                          {p.number} //
                        </span>
                        <h4 className="font-display text-sm font-bold text-indigo-950">
                          {p.title}
                        </h4>
                      </div>
                      <p className="text-xs font-light text-indigo-900/80 leading-relaxed font-sans pl-7">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-frost-300 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-mono uppercase text-indigo-800 font-bold">
                    Direct Assistance
                  </span>
                  <span className="text-xs font-mono text-indigo-950 font-semibold truncate block">
                    concierge@auranautica.com
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 text-frost-50 text-[10px] font-mono shrink-0">
                  <Sparkles className="w-3 h-3" />
                  <span>24/7 Monitored</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SECTION 3: Deep Indigo Security & Discretion Strip */}
      <section className="py-10 sm:py-14 bg-indigo-950 text-frost-100 border-t border-indigo-900/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-12">
          <div className="p-4 sm:p-6 rounded-2xl bg-indigo-900/40 border border-frost-100/15 flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-xs text-frost-300 font-mono tracking-wider">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>256-BIT ENCRYPTED TELEMETRY LINK</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>USCG CERTIFIED SUPERYACHT OFFICERS</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>STRICT PASSENGER MANIFEST PRIVACY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <Footer onOpenBooking={onOpenBooking} />

    </div>
  );
}
