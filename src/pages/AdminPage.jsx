import React, { useState, useEffect, useMemo } from 'react';
import { 
  Anchor, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Check, 
  X, 
  ExternalLink, 
  Search, 
  Sliders, 
  Wind, 
  Zap, 
  Waves, 
  Compass, 
  Eye, 
  Star, 
  MapPin, 
  Users, 
  Layers, 
  Download, 
  Calendar,
  Award,
  ChevronRight,
  Gauge,
  ArrowRight,
  UploadCloud,
  Camera
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ImageDropzone from '../components/ImageDropzone';

// Luxury Interactive Card Image Dropzone Target
function CardImageDropTarget({
  currentImage,
  alt,
  tag,
  onImageFileDrop,
  className = "relative h-44 rounded-2xl overflow-hidden border border-frost-300 bg-indigo-950 group"
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = React.useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onImageFileDrop(files[0]);
    }
  };

  return (
    <div
      onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); }}
      onDrop={handleDrop}
      className={`${className} ${isDragOver ? 'ring-2 ring-indigo-600 border-indigo-600 shadow-glow-sm' : ''}`}
    >
      {currentImage ? (
        <img 
          src={currentImage} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-frost-300 gap-1 bg-indigo-950">
          <UploadCloud className="w-6 h-6 text-indigo-400" />
          <span className="text-[10px] font-mono">No Image</span>
        </div>
      )}

      {tag && (
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md text-frost-50 text-[10px] font-mono font-bold tracking-widest uppercase pointer-events-none z-10">
          {tag}
        </span>
      )}

      {/* Luxury Drag-and-Drop / Change Photo Overlay */}
      <div className={`absolute inset-0 bg-indigo-950/80 backdrop-blur-xs transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3 text-center z-20 ${
        isDragOver ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-3.5 py-1.5 rounded-full bg-frost-50 text-indigo-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md hover:bg-frost-100 flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
        >
          <Camera className="w-3.5 h-3.5 text-indigo-800" />
          <span>{isDragOver ? 'Drop Image Here' : 'Change Photo'}</span>
        </button>
        <span className="text-[9px] font-mono text-frost-200 tracking-wider uppercase pointer-events-none">
          Drag & drop file directly
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onImageFileDrop(e.target.files[0]);
          }
        }}
        className="hidden"
        aria-label={`Change photo for ${alt}`}
      />
    </div>
  );
}

export default function AdminPage({ onNavigate }) {
  const {
    siteData,
    bookings = [],
    updateBookingStatus,
    deleteBooking,
    saveAllSiteData,
    resetToFactoryDefaults,
    exportDataJSON,
  } = useSiteData();

  // Access Verification Gate: Restricted to authenticated staff/admins
  const [authorized, setAuthorized] = useState(() => {
    try {
      const session = localStorage.getItem('aura_nautica_session');
      if (session) {
        const user = JSON.parse(session);
        return user.role === 'admin' || user.email === 'admin@auranautica.com';
      }
    } catch (e) {
      return false;
    }
    return false;
  });

  const [workingData, setWorkingData] = useState(siteData);

  // Sync workingData whenever siteData updates externally
  useEffect(() => {
    setWorkingData(siteData);
  }, [siteData]);

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(workingData) !== JSON.stringify(siteData);
  }, [workingData, siteData]);

  const [activeTab, setActiveTab] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Notification Toast state
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Modal Form State (Create / Edit)
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    mode: 'create', // 'create' | 'edit'
    entityType: '', // 'experience' | 'package' | 'ride' | 'diver' | 'diveProgram' | 'review' | 'route' | 'deck'
    formData: {},
  });

  // Confirmation Modals
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    entityType: '',
    id: null,
    title: '',
  });

  // Hero stages inline edit
  const handleHeroStageChange = (idx, fields) => {
    setWorkingData((prev) => {
      const stages = [...prev.heroStages];
      stages[idx] = { ...stages[idx], ...fields };
      return { ...prev, heroStages: stages };
    });
  };

  // Telemetry inline edit state
  const handleTelemetryChange = (key, val) => {
    setWorkingData((prev) => ({
      ...prev,
      heroTelemetry: { ...prev.heroTelemetry, [key]: val },
    }));
  };

  // Global Save: commits all pending single or multiple modifications live across the website
  const handleSaveAll = () => {
    saveAllSiteData(workingData);
    showToast('ALL MODIFICATIONS SAVED & LIVE ACROSS ENTIRE WEBSITE!', 'success');
  };

  // Discard all pending draft modifications
  const handleDiscardAll = () => {
    setWorkingData(siteData);
    showToast('Unsaved draft modifications discarded.', 'info');
  };

  // Export site configuration
  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-nautica-config-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Configuration exported as JSON.');
  };

  // Handle Reset to Defaults
  const handleConfirmReset = () => {
    resetToFactoryDefaults();
    setConfirmResetOpen(false);
    showToast('Factory catalog data restored successfully.');
  };

  // Quick image file drop / upload directly on catalog cards
  const handleQuickImageDrop = (entityType, id, file) => {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please drop a valid image file (PNG, JPG, WEBP, GIF).', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        try {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

          setWorkingData((prev) => {
            const next = { ...prev };
            if (entityType === 'ride') {
              next.rides = (next.rides || []).map((r) => r.id === id ? { ...r, image: dataUrl } : r);
            } else if (entityType === 'diver') {
              next.crewMembers = (next.crewMembers || []).map((c) => (c.id === id || c.name === id) ? { ...c, image: dataUrl } : c);
            }
            return next;
          });
          showToast(`Updated image for ${entityType === 'ride' ? 'ride' : 'diver'}. Remember to click "SAVE ALL MODIFICATIONS LIVE".`, 'success');
        } catch (err) {
          showToast('Failed to optimize image file.', 'error');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Open Modal for Create
  const handleOpenCreate = (entityType) => {
    let defaultData = {};
    if (entityType === 'experience') {
      defaultData = {
        title: '',
        tagline: '',
        category: 'Aerial Propulsion',
        altitude: '600 FT Flight',
        desc: '',
        fullDescription: '',
        pricing: '$750 per session',
        iconName: 'Wind',
      };
    } else if (entityType === 'package') {
      defaultData = {
        title: '',
        duration: '6 Hours Coastal Charter',
        tag: 'Featured Experience',
        price: '$4,500',
        description: '',
        features: ['Full yacht captain and crew service', 'Water toys and safety gear included'],
      };
    } else if (entityType === 'ride') {
      defaultData = {
        name: '',
        category: 'flight',
        categoryLabel: 'Air Diving & Flight',
        tag: 'New Fleet Addition',
        tagline: '',
        image: '/assets/images/ride_sky_riding_1788888024545.jpg',
        speed: '25 Knots',
        altitude: '30 Feet',
        skillLevel: 'Beginner Friendly',
        capacity: '1 to 2 Guests',
        duration: '30 Minutes',
        description: '',
        highlights: ['Full certified instructor coaching included', '4K video footage package'],
        safetyGear: 'USCG impact vest, watersports helmet, marine radio',
      };
    } else if (entityType === 'diver') {
      defaultData = {
        name: '',
        role: 'Senior Marine Dive Instructor',
        credentials: 'PADI Master Scuba Diver Trainer',
        image: '/assets/images/diver_liam_1788888153501.jpg',
        dives: '1,500+ Logged Dives',
        experience: '8 Years Oceanic Experience',
        bio: '',
        specialties: ['Reef Ecology', 'Open Water Safety'],
      };
    } else if (entityType === 'diveProgram') {
      defaultData = {
        title: '',
        badge: 'All Skill Levels',
        depth: '40 Feet (12m)',
        duration: 'Half-Day Voyage',
        instructorRatio: '1 Guide per 2 Guests',
        description: '',
        features: ['Dedicated master dive instructor', 'Premium Scubapro gear fitted on deck'],
      };
    } else if (entityType === 'review') {
      defaultData = {
        name: '',
        location: '',
        date: 'Current Season 2026',
        route: 'French Riviera Passage',
        category: 'public',
        experience: '800-Ft Parachute Sky Ride',
        rating: 5,
        headline: '',
        quote: '',
        verified: true,
        tag: 'Verified Public Charter',
      };
    } else if (entityType === 'route') {
      defaultData = {
        name: '',
        legs: '',
        distance: '45 NM',
      };
    }

    setModalConfig({
      isOpen: true,
      mode: 'create',
      entityType,
      formData: defaultData,
    });
  };

  // Open Modal for Edit
  const handleOpenEdit = (entityType, item) => {
    setModalConfig({
      isOpen: true,
      mode: 'edit',
      entityType,
      formData: { ...item },
    });
  };

  // Save Modal Form (stages to workingData; optionally publishes live immediately)
  const handleSaveModal = (e, andPublishLive = false) => {
    if (e) e.preventDefault();
    const { mode, entityType, formData } = modalConfig;

    setWorkingData((prev) => {
      const next = { ...prev };
      if (entityType === 'experience') {
        if (mode === 'create') {
          const id = formData.id || `exp-${Date.now()}`;
          const number = String((next.experiences || []).length + 1).padStart(2, '0');
          next.experiences = [...(next.experiences || []), { ...formData, id, number }];
        } else {
          next.experiences = (next.experiences || []).map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          );
        }
      } else if (entityType === 'package') {
        if (mode === 'create') {
          const id = formData.id || `pkg-${Date.now()}`;
          next.packages = [...(next.packages || []), { ...formData, id }];
        } else {
          next.packages = (next.packages || []).map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          );
        }
      } else if (entityType === 'ride') {
        if (mode === 'create') {
          const id = formData.id || `ride-${Date.now()}`;
          next.rides = [...(next.rides || []), { ...formData, id }];
        } else {
          next.rides = (next.rides || []).map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          );
        }
      } else if (entityType === 'diver') {
        if (mode === 'create') {
          const id = formData.id || `diver-${Date.now()}`;
          next.crewMembers = [...(next.crewMembers || []), { ...formData, id }];
        } else {
          next.crewMembers = (next.crewMembers || []).map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          );
        }
      } else if (entityType === 'diveProgram') {
        if (mode === 'create') {
          const id = formData.id || `prog-${Date.now()}`;
          next.divePrograms = [...(next.divePrograms || []), { ...formData, id }];
        } else {
          next.divePrograms = (next.divePrograms || []).map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          );
        }
      } else if (entityType === 'review') {
        if (mode === 'create') {
          const id = formData.id || `rev-${Date.now()}`;
          next.reviews = [{ ...formData, id }, ...(next.reviews || [])];
        } else {
          next.reviews = (next.reviews || []).map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          );
        }
      } else if (entityType === 'route') {
        if (mode === 'create') {
          const id = formData.id || `route-${Date.now()}`;
          next.routes = [...(next.routes || []), { ...formData, id }];
        } else {
          next.routes = (next.routes || []).map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          );
        }
      } else if (entityType === 'deck') {
        next.fleetDecks = (next.fleetDecks || []).map((item) =>
          item.id === formData.id ? { ...item, ...formData } : item
        );
      }

      if (andPublishLive) {
        saveAllSiteData(next);
      }
      return next;
    });

    setModalConfig({ isOpen: false, mode: 'create', entityType: '', formData: {} });

    if (andPublishLive) {
      showToast(`${entityType.toUpperCase()} saved and published live to website!`, 'success');
    } else {
      showToast(`${entityType.toUpperCase()} staged. Click "SAVE CHANGES LIVE" to publish across website.`, 'info');
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = (andPublishLive = false) => {
    const { entityType, id } = deleteConfirmation;

    setWorkingData((prev) => {
      const next = { ...prev };
      if (entityType === 'experience') next.experiences = (next.experiences || []).filter(item => item.id !== id);
      else if (entityType === 'package') next.packages = (next.packages || []).filter(item => item.id !== id);
      else if (entityType === 'ride') next.rides = (next.rides || []).filter(item => item.id !== id);
      else if (entityType === 'diver') next.crewMembers = (next.crewMembers || []).filter(item => item.id !== id);
      else if (entityType === 'diveProgram') next.divePrograms = (next.divePrograms || []).filter(item => item.id !== id);
      else if (entityType === 'review') next.reviews = (next.reviews || []).filter(item => item.id !== id);
      else if (entityType === 'route') next.routes = (next.routes || []).filter(item => item.id !== id);

      if (andPublishLive) {
        saveAllSiteData(next);
      }
      return next;
    });

    setDeleteConfirmation({ isOpen: false, entityType: '', id: null, title: '' });

    if (andPublishLive) {
      showToast(`${entityType.toUpperCase()} removed & changes published live!`, 'success');
    } else {
      showToast(`${entityType.toUpperCase()} staged for removal. Click "SAVE CHANGES LIVE" to commit.`, 'info');
    }
  };

  // Stats for the telemetry bar based on workingData
  const stats = useMemo(() => [
    { label: 'Experiences', count: (workingData.experiences || []).length },
    { label: 'Packages', count: (workingData.packages || []).length },
    { label: 'Rides & Toys', count: (workingData.rides || []).length },
    { label: 'Dive Masters', count: (workingData.crewMembers || []).length },
    { label: 'Guest Reviews', count: (workingData.reviews || []).length },
    { label: 'Charter Inquiries', count: (bookings || []).length },
  ], [workingData, bookings]);

  // Security Gate: Redirect or prompt login if not authorized
  if (!authorized) {
    return (
      <div className="min-h-screen bg-indigo-950 text-frost-100 flex items-center justify-center p-6 selection:bg-indigo-600 selection:text-frost-50">
        <SEOHead 
          title="Fleet Command Restricted Access | AURA NAUTICA"
          canonical="https://auranautica.com/#/admin"
          noIndex={true}
        />
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-indigo-900/60 border border-frost-100/20 text-center space-y-6 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-indigo-950 border border-frost-100/30 flex items-center justify-center mx-auto text-indigo-300 shadow-glow-sm">
            <ShieldCheck className="w-8 h-8 text-frost-100" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-300 font-bold block">
              Restricted Officer Portal
            </span>
            <h1 className="font-display text-2xl font-bold text-frost-50">
              FLEET COMMAND ACCESS RESTRICTED
            </h1>
            <p className="text-xs text-frost-300 font-light leading-relaxed">
              The Fleet Command CMS Console is reserved for verified captains and authorized officers. Access must be initiated via the Officer Access Portal.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => onNavigate('auth')}
              className="shine-sweep w-full py-3.5 rounded-full bg-frost-100 text-indigo-950 font-semibold text-xs tracking-widest uppercase hover:bg-frost-50 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Authenticate via Officer Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
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
                try {
                  localStorage.setItem('aura_nautica_session', JSON.stringify(adminUser));
                } catch (e) {
                  console.error(e);
                }
                setAuthorized(true);
              }}
              className="w-full py-2 rounded-full text-xs font-mono text-indigo-300 hover:text-frost-100 underline cursor-pointer"
            >
              Quick Officer Bypass (Demo Admin)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-950 text-frost-100 selection:bg-indigo-600 selection:text-frost-50">
      <SEOHead 
        title="Maritime Architecture & Content Administration | AURA NAUTICA"
        description="Internal administrative command console for AURA NAUTICA live catalog management."
        canonical="https://auranautica.com/#/admin"
        noIndex={true}
      />
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-frost-50 text-indigo-950 shadow-2xl border border-frost-300 font-mono text-xs font-bold tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-950 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: DEEP INDIGO COMMAND HEADER (Hero Spacing & Hierarchy) */}
      {/* ========================================================================= */}
      <section className="relative px-5 sm:px-12 pt-28 pb-14 sm:pt-36 sm:pb-28 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-800/20 rounded-full blur-[130px] pointer-events-none" />

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-frost-400 mb-6 relative z-10 flex-wrap">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-frost-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Anchor className="w-3.5 h-3.5 text-indigo-400" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-frost-50 font-bold">Fleet Command</span>
          <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-frost-400">Live Website CRUD</span>
        </div>

        {/* Roman Index & Editorial Title */}
        <div className="max-w-4xl relative z-10 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-600/30 bg-indigo-900/50 text-indigo-200 text-xs font-mono tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>I // FLEET COMMAND & SYSTEM ADMIN</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.08] text-glow mb-3 sm:mb-5">
            MARITIME ARCHITECTURE & CONTENT ADMIN
          </h1>

          <p className="text-frost-200 text-xs sm:text-sm lg:text-base font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Universal control console for AURA NAUTICA. Any modifications made across hero narratives, sea experiences, high-speed water toys, dive crews, reviews, and deck architectures immediately persist and update the live website.
          </p>
        </div>

        {/* Live System Telemetry Bar & Quick Action Controls */}
        <div className="relative z-10 p-5 sm:p-8 rounded-3xl bg-indigo-900/50 border border-indigo-800/60 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-indigo-800/40">
            
            {/* Status Indicator */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-frost-300 font-bold block">
                {hasUnsavedChanges ? 'MODIFICATIONS STAGED (UNSAVED)' : 'LIVE ENGINE SYNCHRONIZED'}
              </span>
              <span className="text-[11px] text-frost-400 font-mono block">
                {hasUnsavedChanges 
                  ? 'Pending edits ready. Click "Save Changes Live" to update entire website.' 
                  : 'State synchronized across all live website pages'}
              </span>
            </div>

            {/* Global Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
              {/* PRIMARY SAVE BUTTON */}
              <button
                onClick={handleSaveAll}
                disabled={!hasUnsavedChanges}
                className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-mono text-xs tracking-wider uppercase font-bold transition-all shadow-xl cursor-pointer ${
                  hasUnsavedChanges
                    ? 'bg-frost-50 text-indigo-950 hover:bg-frost-200 border-2 border-frost-50 shadow-indigo-600/50 ring-2 ring-indigo-400 sm:scale-105'
                    : 'bg-indigo-900/40 text-frost-400 border border-frost-100/15 cursor-not-allowed opacity-60'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>{hasUnsavedChanges ? 'Save Changes Live' : 'All Changes Saved'}</span>
              </button>

              {hasUnsavedChanges && (
                <button
                  onClick={handleDiscardAll}
                  className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full border border-frost-100/25 bg-indigo-900/60 text-frost-300 hover:text-frost-100 hover:bg-indigo-800 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Discard</span>
                </button>
              )}

              <button
                onClick={() => onNavigate('home')}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-full border border-frost-100/25 bg-indigo-900/60 text-frost-100 hover:bg-indigo-800 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Site</span>
              </button>

              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-full border border-frost-100/25 bg-indigo-900/60 text-frost-100 hover:bg-indigo-800 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={() => setConfirmResetOpen(true)}
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-indigo-500/50 bg-indigo-800/60 text-frost-100 hover:bg-indigo-700 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Defaults</span>
              </button>
            </div>
          </div>

          {/* Telemetry Counter Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/40">
                <span className="text-[10px] font-mono text-frost-400 uppercase tracking-widest block mb-1">
                  {stat.label}
                </span>
                <span className="font-display text-2xl font-bold text-frost-50">
                  {String(stat.count).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: FROST WHITE MASTER CONSOLE (Dual-Palette Contrast & Live CRUD) */}
      {/* ========================================================================= */}
      <section className="relative py-16 sm:py-20 md:py-28 bg-frost-100 text-indigo-950 border-t border-frost-300">
        
        {/* Subtle geometric dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#271E79_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

        <div className="max-w-7xl mx-auto px-5 sm:px-12 relative z-10">
          
          {/* Navigation Tab Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-frost-300 scrollbar-none">
            {[
              { id: 'bookings', label: `Charter Manifest (${(bookings || []).length})`, icon: Calendar },
              { id: 'hero', label: 'Hero Narrative & HUD', icon: Compass },
              { id: 'experiences', label: `Experiences (${(workingData.experiences || []).length})`, icon: Wind },
              { id: 'packages', label: `Packages (${(workingData.packages || []).length})`, icon: Sparkles },
              { id: 'rides', label: `Rides & Toys (${(workingData.rides || []).length})`, icon: Zap },
              { id: 'divers', label: `Master Divers (${(workingData.crewMembers || []).length})`, icon: ShieldCheck },
              { id: 'divePrograms', label: `Dive Programs (${(workingData.divePrograms || []).length})`, icon: Waves },
              { id: 'reviews', label: `Guest Reviews (${(workingData.reviews || []).length})`, icon: Star },
              { id: 'routes', label: `Routes (${(workingData.routes || []).length})`, icon: MapPin },
              { id: 'fleet', label: `Fleet Decks (${(workingData.fleetDecks || []).length})`, icon: Layers },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-950 text-frost-50 font-bold shadow-md'
                      : 'bg-frost-50 text-indigo-950 border border-frost-300 hover:border-indigo-900/40 hover:bg-frost-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-frost-100' : 'text-indigo-800'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* TAB 1: HERO SEQUENCE & HUD TELEMETRY */}
          {/* ===================================================================== */}
          {activeTab === 'hero' && (
            <div className="space-y-12 animate-in fade-in duration-300">
              
              {/* Telemetry HUD Editor */}
              <div className="p-6 sm:p-8 rounded-3xl bg-frost-50 border border-frost-300 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-frost-300">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                      HUD Telemetry Overlay Specs
                    </span>
                    <h2 className="font-display text-xl font-bold text-indigo-950">
                      Live Bridge Telemetry (Hero Overlay)
                    </h2>
                  </div>
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-wider uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes Live</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(workingData.heroTelemetry || {}).map(([key, val]) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-[11px] font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleTelemetryChange(key, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 font-mono text-xs focus:outline-none focus:border-indigo-800 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Narrative Stages */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                      Hero Narrative Stages
                    </span>
                    <h2 className="font-display text-2xl font-bold text-indigo-950">
                      4-Stage Scroll Sequence Titles & Copy
                    </h2>
                  </div>
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-wider uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes Live</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(workingData.heroStages || []).map((stage, idx) => (
                    <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-frost-300">
                          <span className="font-display text-sm font-bold text-indigo-950 px-3 py-1 rounded-full bg-frost-200">
                            STAGE {stage.index}
                          </span>
                          <span className="font-mono text-[11px] text-indigo-700 uppercase tracking-widest font-semibold">
                            Position: {stage.position}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] font-mono text-indigo-800 uppercase tracking-widest block mb-1">
                              Stage Tag
                            </label>
                            <input
                              type="text"
                              value={stage.tag}
                              onChange={(e) => handleHeroStageChange(idx, { tag: e.target.value })}
                              className="w-full px-4 py-2 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 font-mono text-xs focus:outline-none focus:border-indigo-800"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-indigo-800 uppercase tracking-widest block mb-1">
                              Headline Title
                            </label>
                            <input
                              type="text"
                              value={stage.title}
                              onChange={(e) => handleHeroStageChange(idx, { title: e.target.value })}
                              className="w-full px-4 py-2 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 font-display font-bold text-sm focus:outline-none focus:border-indigo-800"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-indigo-800 uppercase tracking-widest block mb-1">
                              Editorial Subtitle / Copy
                            </label>
                            <textarea
                              rows={3}
                              value={stage.subtitle}
                              onChange={(e) => handleHeroStageChange(idx, { subtitle: e.target.value })}
                              className="w-full px-4 py-2 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs leading-relaxed focus:outline-none focus:border-indigo-800"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-indigo-600 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-indigo-700" />
                        <span>{hasUnsavedChanges ? "Staged in draft. Click 'Save Changes Live' to broadcast live." : "Saved & synchronized live to website."}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: EXPERIENCES */}
          {/* ===================================================================== */}
          {activeTab === 'experiences' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-indigo-800/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search experiences by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-frost-50 border border-frost-300 text-indigo-950 text-xs placeholder:text-indigo-950/40 focus:outline-none focus:border-indigo-800"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenCreate('experience')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Experience</span>
                  </button>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(workingData.experiences || [])
                  .filter(exp => 
                    exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    exp.category.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((exp) => (
                    <div key={exp.id} className="p-6 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-indigo-950 text-frost-50 text-[10px] font-mono font-bold tracking-widest uppercase">
                            #{exp.number || exp.id}
                          </span>
                          <span className="text-xs font-mono text-indigo-700 font-bold">
                            {exp.altitude}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest block mb-1">
                            {exp.category}
                          </span>
                          <h3 className="font-display text-lg font-bold text-indigo-950 mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-xs font-mono text-indigo-800 mb-2">
                            {exp.tagline}
                          </p>
                          <p className="text-xs text-indigo-950/80 leading-relaxed line-clamp-3">
                            {exp.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-frost-300 flex items-center justify-between text-xs font-mono">
                          <span className="text-indigo-700 font-bold">{exp.pricing}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-frost-300">
                        <button
                          onClick={() => handleOpenEdit('experience', exp)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation({
                            isOpen: true,
                            entityType: 'experience',
                            id: exp.id,
                            title: exp.title,
                          })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-900 hover:text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: CHARTER PACKAGES */}
          {/* ===================================================================== */}
          {activeTab === 'packages' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                    Charter Tiers & Passes
                  </span>
                  <h2 className="font-display text-2xl font-bold text-indigo-950">
                    Experiences Page Passes & Packages
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenCreate('package')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Package</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(workingData.packages || []).map((pkg) => (
                  <div key={pkg.id || pkg.title} className="p-6 sm:p-8 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-frost-200 text-indigo-950 text-[10px] font-mono font-bold tracking-wider uppercase">
                          {pkg.tag}
                        </span>
                        <span className="font-display text-xl font-bold text-indigo-950">
                          {pkg.price}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-lg font-bold text-indigo-950 mb-1">
                          {pkg.title}
                        </h3>
                        <span className="text-[11px] font-mono text-indigo-700 font-semibold block mb-3">
                          {pkg.duration}
                        </span>
                        <p className="text-xs text-indigo-950/80 leading-relaxed mb-4">
                          {pkg.description}
                        </p>

                        <div className="space-y-1.5">
                          {pkg.features?.map((feat, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-xs text-indigo-900">
                              <Check className="w-3.5 h-3.5 text-indigo-700 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-frost-300">
                      <button
                        onClick={() => handleOpenEdit('package', pkg)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmation({
                          isOpen: true,
                          entityType: 'package',
                          id: pkg.id,
                          title: pkg.title,
                        })}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-900 hover:text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 4: RIDES & WATER TOYS */}
          {/* ===================================================================== */}
          {activeTab === 'rides' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-indigo-800/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search water toys and rides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-frost-50 border border-frost-300 text-indigo-950 text-xs placeholder:text-indigo-950/40 focus:outline-none focus:border-indigo-800"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenCreate('ride')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Ride / Toy</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(workingData.rides || [])
                  .filter(ride => 
                    ride.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    ride.categoryLabel?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((ride) => (
                    <div key={ride.id} className="p-6 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Interactive Drag-and-Drop Image Preview */}
                        <CardImageDropTarget
                          currentImage={ride.image}
                          alt={ride.name}
                          tag={ride.tag}
                          onImageFileDrop={(file) => handleQuickImageDrop('ride', ride.id, file)}
                        />

                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-indigo-700 font-semibold mb-1">
                            <span>{ride.categoryLabel}</span>
                            <span>{ride.speed}</span>
                          </div>

                          <h3 className="font-display text-lg font-bold text-indigo-950 mb-1">
                            {ride.name}
                          </h3>
                          <p className="text-xs text-indigo-950/80 leading-relaxed line-clamp-2 mb-3">
                            {ride.tagline}
                          </p>

                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-frost-100 p-3 rounded-xl border border-frost-200">
                            <div>
                              <span className="text-indigo-950/60 block text-[9px] uppercase">Altitude</span>
                              <span className="font-bold text-indigo-950">{ride.altitude}</span>
                            </div>
                            <div>
                              <span className="text-indigo-950/60 block text-[9px] uppercase">Capacity</span>
                              <span className="font-bold text-indigo-950">{ride.capacity}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-frost-300">
                        <button
                          onClick={() => handleOpenEdit('ride', ride)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation({
                            isOpen: true,
                            entityType: 'ride',
                            id: ride.id,
                            title: ride.name,
                          })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-900 hover:text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 5: MASTER DIVERS & CREW */}
          {/* ===================================================================== */}
          {activeTab === 'divers' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                    Onboard Master Instructors
                  </span>
                  <h2 className="font-display text-2xl font-bold text-indigo-950">
                    Master Dive Team Dossiers
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenCreate('diver')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Diver Profile</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(workingData.crewMembers || []).map((diver) => (
                  <div key={diver.id || diver.name} className="p-6 sm:p-8 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      <div className="flex items-start gap-5">
                        <CardImageDropTarget
                          currentImage={diver.image}
                          alt={diver.name}
                          tag={null}
                          className="w-20 h-20 rounded-2xl overflow-hidden border border-frost-300 shrink-0 relative bg-indigo-950 group"
                          onImageFileDrop={(file) => handleQuickImageDrop('diver', diver.id || diver.name, file)}
                        />
                        <div>
                          <span className="text-[10px] font-mono text-indigo-700 uppercase tracking-widest font-bold block">
                            {diver.role}
                          </span>
                          <h3 className="font-display text-xl font-bold text-indigo-950">
                            {diver.name}
                          </h3>
                          <span className="text-xs font-mono text-indigo-900 block mt-1">
                            {diver.credentials}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-frost-100 p-3.5 rounded-2xl border border-frost-200">
                        <div>
                          <span className="text-indigo-950/60 block text-[9px] uppercase">Dives Logged</span>
                          <span className="font-bold text-indigo-950">{diver.dives}</span>
                        </div>
                        <div>
                          <span className="text-indigo-950/60 block text-[9px] uppercase">Experience</span>
                          <span className="font-bold text-indigo-950">{diver.experience}</span>
                        </div>
                      </div>

                      <p className="text-xs text-indigo-950/80 leading-relaxed">
                        {diver.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {diver.specialties?.map((spec, sidx) => (
                          <span key={sidx} className="px-2.5 py-1 rounded-full bg-frost-200 text-indigo-900 text-[10px] font-mono">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-frost-300">
                      <button
                        onClick={() => handleOpenEdit('diver', diver)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                        <span>Edit Profile</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmation({
                          isOpen: true,
                          entityType: 'diver',
                          id: diver.id,
                          title: diver.name,
                        })}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-900 hover:text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 6: DIVE PROGRAMS */}
          {/* ===================================================================== */}
          {activeTab === 'divePrograms' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                    Guided Safaris & Certifications
                  </span>
                  <h2 className="font-display text-2xl font-bold text-indigo-950">
                    Ocean Scuba Programs
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenCreate('diveProgram')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Dive Program</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(workingData.divePrograms || []).map((prog) => (
                  <div key={prog.id || prog.title} className="p-6 sm:p-8 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-frost-200 text-indigo-950 text-[10px] font-mono font-bold tracking-wider uppercase">
                          {prog.badge}
                        </span>
                        <span className="text-xs font-mono text-indigo-700 font-bold">
                          {prog.depth}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-lg font-bold text-indigo-950 mb-1">
                          {prog.title}
                        </h3>
                        <span className="text-[11px] font-mono text-indigo-800 font-semibold block mb-2">
                          Duration: {prog.duration} • Ratio: {prog.instructorRatio}
                        </span>
                        <p className="text-xs text-indigo-950/80 leading-relaxed mb-4">
                          {prog.description}
                        </p>

                        <div className="space-y-1.5">
                          {prog.features?.map((feat, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-xs text-indigo-900">
                              <Check className="w-3.5 h-3.5 text-indigo-700 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-frost-300">
                      <button
                        onClick={() => handleOpenEdit('diveProgram', prog)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmation({
                          isOpen: true,
                          entityType: 'diveProgram',
                          id: prog.id,
                          title: prog.title,
                        })}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-900 hover:text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 7: GUEST REVIEWS */}
          {/* ===================================================================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-indigo-800/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search reviews by guest name or route..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-frost-50 border border-frost-300 text-indigo-950 text-xs placeholder:text-indigo-950/40 focus:outline-none focus:border-indigo-800"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenCreate('review')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Guest Review</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(workingData.reviews || [])
                  .filter(r => 
                    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    r.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.headline.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((review) => (
                    <div key={review.id} className="p-6 sm:p-8 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-indigo-800">
                            {[...Array(review.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-frost-200 text-indigo-950 text-[10px] font-mono font-bold uppercase">
                            {review.tag}
                          </span>
                        </div>

                        <h4 className="font-display text-base font-bold text-indigo-950 leading-snug">
                          {review.headline}
                        </h4>

                        <p className="text-xs text-indigo-950/80 leading-relaxed italic">
                          "{review.quote}"
                        </p>

                        <div className="pt-3 border-t border-frost-300 flex items-center justify-between text-[11px] font-mono text-indigo-700">
                          <span className="font-bold text-indigo-950">{review.name}</span>
                          <span>{review.route} • {review.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-frost-300">
                        <button
                          onClick={() => handleOpenEdit('review', review)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation({
                            isOpen: true,
                            entityType: 'review',
                            id: review.id,
                            title: `${review.name}'s review`,
                          })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-900 hover:text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 8: ITINERARY ROUTES & FLEET DECKS */}
          {/* ===================================================================== */}
          {activeTab === 'routes' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                    Itinerary Passages & Distances
                  </span>
                  <h2 className="font-display text-2xl font-bold text-indigo-950">
                    Archipelago Routes (Interactive Builder)
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveAll}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenCreate('route')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Route</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(workingData.routes || []).map((rt) => (
                  <div key={rt.id} className="p-6 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-700 font-bold">
                          {rt.distance}
                        </span>
                        <MapPin className="w-4 h-4 text-indigo-800" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-indigo-950 mb-1">
                        {rt.name}
                      </h3>
                      <p className="text-xs font-mono text-indigo-900 leading-relaxed">
                        {rt.legs}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-frost-300">
                      <button
                        onClick={() => handleOpenEdit('route', rt)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmation({
                          isOpen: true,
                          entityType: 'route',
                          id: rt.id,
                          title: rt.name,
                        })}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-900 hover:text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 9: FLEET DECK ARCHITECTURE */}
          {/* ===================================================================== */}
          {activeTab === 'fleet' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                    Naval Architecture & Blueprint Levels
                  </span>
                  <h2 className="font-display text-2xl font-bold text-indigo-950">
                    4-Level Deck Architecture & Machinery Specs
                  </h2>
                </div>

                {hasUnsavedChanges && (
                  <button
                    onClick={handleSaveAll}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-md cursor-pointer ring-1 ring-indigo-500 shrink-0"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes Live</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(workingData.fleetDecks || []).map((deck) => (
                  <div key={deck.id} className="p-6 sm:p-8 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-indigo-950 text-frost-50 text-[10px] font-mono font-bold tracking-widest uppercase">
                          {deck.level}
                        </span>
                        <span className="text-xs font-mono text-indigo-700 font-bold">
                          {deck.dimensions}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-lg font-bold text-indigo-950 mb-1">
                          {deck.name}
                        </h3>
                        <span className="text-[11px] font-mono text-indigo-800 uppercase tracking-wider block mb-3">
                          Blueprint: {deck.blueprintArea}
                        </span>

                        <div className="space-y-2">
                          {deck.features?.map((feat, fidx) => (
                            <div key={fidx} className="flex items-start gap-2 text-xs text-indigo-900">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-800 shrink-0 mt-1.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-4 border-t border-frost-300">
                      <button
                        onClick={() => handleOpenEdit('deck', deck)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-frost-300 hover:border-indigo-900 bg-frost-100 text-indigo-950 text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-indigo-800" />
                        <span>Edit Deck Blueprint</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 10: CHARTER MANIFEST & INCOMING RESERVATIONS (Flaw 2) */}
          {/* ===================================================================== */}
          {activeTab === 'bookings' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-frost-300">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-indigo-700 font-bold block mb-1">
                    Charter Manifest & Concierge Queue
                  </span>
                  <h2 className="font-display text-2xl font-bold text-indigo-950">
                    Live Booking Inquiries ({bookings.length})
                  </h2>
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-frost-50 border border-frost-300 space-y-3">
                  <Calendar className="w-10 h-10 text-indigo-800 mx-auto" />
                  <h3 className="font-display text-lg font-bold text-indigo-950">No Booking Inquiries Yet</h3>
                  <p className="text-xs text-indigo-900/70 max-w-sm mx-auto">
                    New reservation inquiries submitted through the Booking Modal or Itinerary Builder will appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="p-6 rounded-3xl bg-frost-50 border border-frost-300 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-frost-300">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-indigo-950 px-3 py-1 rounded-full bg-frost-200 border border-frost-300">
                            {booking.code}
                          </span>
                          <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold ${
                            booking.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : booking.status === 'Completed'
                              ? 'bg-frost-300 text-indigo-950'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            {booking.status || 'Pending'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {booking.status !== 'Confirmed' && (
                            <button
                              onClick={() => {
                                updateBookingStatus(booking.id, 'Confirmed');
                                showToast(`Reservation ${booking.code} confirmed!`, 'success');
                              }}
                              className="px-3 py-1.5 rounded-full bg-indigo-950 text-frost-50 text-[11px] font-mono tracking-wider uppercase hover:bg-indigo-900 transition-all cursor-pointer font-semibold"
                            >
                              Confirm
                            </button>
                          )}
                          {booking.status !== 'Completed' && (
                            <button
                              onClick={() => {
                                updateBookingStatus(booking.id, 'Completed');
                                showToast(`Reservation ${booking.code} marked completed.`, 'info');
                              }}
                              className="px-3 py-1.5 rounded-full bg-frost-200 text-indigo-950 text-[11px] font-mono tracking-wider uppercase hover:bg-frost-300 transition-all cursor-pointer border border-frost-300 font-semibold"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => {
                              deleteBooking(booking.id);
                              showToast(`Reservation ${booking.code} removed.`, 'info');
                            }}
                            className="p-1.5 rounded-full text-rose-700 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Delete Inquiry"
                            aria-label="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-indigo-700 uppercase tracking-widest block mb-1">Guest Contact</span>
                          <div className="font-bold text-indigo-950 text-sm">{booking.name}</div>
                          <div className="text-indigo-900">{booking.email}</div>
                          <div className="text-indigo-900">{booking.phone}</div>
                        </div>

                        <div>
                          <span className="text-[10px] text-indigo-700 uppercase tracking-widest block mb-1">Charter Voyage</span>
                          <div className="font-bold text-indigo-950">{booking.port}</div>
                          <div className="text-indigo-900">Date: {booking.date}</div>
                          <div className="text-indigo-900">Accommodations: {booking.guests} Guests</div>
                        </div>

                        <div>
                          <span className="text-[10px] text-indigo-700 uppercase tracking-widest block mb-1">Experience & Value</span>
                          <div className="font-bold text-indigo-950">{booking.preferredExperience}</div>
                          {booking.estimate && (
                            <div className="font-bold text-indigo-800 text-sm mt-0.5">
                              ${booking.estimate.toLocaleString()} USD
                            </div>
                          )}
                        </div>
                      </div>

                      {booking.itineraryDossier && (
                        <div className="p-3.5 rounded-2xl bg-frost-200/80 border border-frost-300 text-xs font-mono space-y-1">
                          <span className="text-[10px] uppercase text-indigo-800 font-bold block">
                            Custom Itinerary Details
                          </span>
                          <div className="text-indigo-950">
                            Route: {booking.itineraryDossier.route} ({booking.itineraryDossier.duration})
                          </div>
                          {booking.itineraryDossier.activities?.length > 0 && (
                            <div className="text-indigo-900 text-[11px]">
                              Water Thrills: {booking.itineraryDossier.activities.join(', ')}
                            </div>
                          )}
                        </div>
                      )}

                      {booking.specialRequests && (
                        <div className="text-xs text-indigo-950 font-sans italic bg-frost-100 p-3 rounded-xl border border-frost-300">
                          " {booking.specialRequests} "
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* UNIVERSAL CREATE / EDIT MODAL FORM */}
      {/* ========================================================================= */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto bg-indigo-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-frost-50 text-indigo-950 border border-frost-300 shadow-2xl p-5 sm:p-10 my-0 sm:my-8 animate-in fade-in slide-in-from-bottom-5 sm:zoom-in-95 duration-300">
            
            {/* Mobile Grab Handle Indicator */}
            <div className="w-12 h-1 rounded-full bg-indigo-950/20 mx-auto mb-4 block sm:hidden" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-frost-300 mb-5 sm:mb-6">
              <div>
                <span className="font-mono text-[10px] text-indigo-700 uppercase tracking-widest font-bold block mb-1">
                  {modalConfig.mode === 'create' ? 'Create New Entry' : 'Update Existing Entry'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-indigo-950">
                  {modalConfig.entityType.toUpperCase()} CONFIGURATION
                </h3>
              </div>
              <button
                onClick={() => setModalConfig({ isOpen: false, mode: 'create', entityType: '', formData: {} })}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-frost-300 flex items-center justify-center text-indigo-950 hover:bg-frost-200 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveModal} className="space-y-5">
              
              {/* Common Name / Title input */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                  {modalConfig.entityType === 'diver' || modalConfig.entityType === 'review' ? 'Name / Guest' : 'Title / Model Name'}
                </label>
                <input
                  type="text"
                  required
                  value={modalConfig.formData.title || modalConfig.formData.name || ''}
                  onChange={(e) => setModalConfig(prev => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      [modalConfig.entityType === 'diver' || modalConfig.entityType === 'review' || modalConfig.entityType === 'ride' ? 'name' : 'title']: e.target.value
                    }
                  }))}
                  className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-sm focus:outline-none focus:border-indigo-800"
                />
              </div>

              {/* Tagline / Subtitle (if applicable) */}
              {(modalConfig.entityType === 'experience' || modalConfig.entityType === 'ride' || modalConfig.entityType === 'review') && (
                <div className="space-y-1">
                  <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                    {modalConfig.entityType === 'review' ? 'Review Headline' : 'Tagline / Summary'}
                  </label>
                  <input
                    type="text"
                    required
                    value={modalConfig.formData.tagline || modalConfig.formData.headline || ''}
                    onChange={(e) => setModalConfig(prev => ({
                      ...prev,
                      formData: {
                        ...prev.formData,
                        [modalConfig.entityType === 'review' ? 'headline' : 'tagline']: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-sm focus:outline-none focus:border-indigo-800"
                  />
                </div>
              )}

              {/* Dual-column metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modalConfig.formData.category !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Category
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.category || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, category: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.pricing !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Pricing Specs
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.pricing || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, pricing: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.price !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Package Price
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.price || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, price: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.speed !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Top Speed
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.speed || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, speed: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.altitude !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Altitude / Depth
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.altitude || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, altitude: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.role !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.role || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, role: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.credentials !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Credentials
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.credentials || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, credentials: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.route !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Charter Route
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.route || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, route: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.rating !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Star Rating (1 - 5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={modalConfig.formData.rating || 5}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, rating: Number(e.target.value) }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}

                {modalConfig.formData.distance !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                      Distance (Nautical Miles)
                    </label>
                    <input
                      type="text"
                      value={modalConfig.formData.distance || ''}
                      onChange={(e) => setModalConfig(prev => ({
                        ...prev,
                        formData: { ...prev.formData, distance: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                    />
                  </div>
                )}
              </div>

              {/* Legs for Route */}
              {modalConfig.formData.legs !== undefined && (
                <div className="space-y-1">
                  <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                    Waypoints & Legs
                  </label>
                  <input
                    type="text"
                    value={modalConfig.formData.legs || ''}
                    onChange={(e) => setModalConfig(prev => ({
                      ...prev,
                      formData: { ...prev.formData, legs: e.target.value }
                    }))}
                    className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs focus:outline-none focus:border-indigo-800"
                  />
                </div>
              )}

              {/* Luxury Drag & Drop Image Uploader (if applicable) */}
              {(modalConfig.formData.image !== undefined || modalConfig.entityType === 'ride' || modalConfig.entityType === 'diver') && (
                <ImageDropzone
                  label={modalConfig.entityType === 'diver' ? 'Diver Profile Photograph' : 'Vessel & Equipment Media Asset'}
                  hint="Drag & drop high-res image here, or click to browse"
                  value={modalConfig.formData.image || ''}
                  onChange={(newImg) => setModalConfig(prev => ({
                    ...prev,
                    formData: { ...prev.formData, image: newImg }
                  }))}
                />
              )}

              {/* Description / Bio / Quote */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold">
                  {modalConfig.entityType === 'review' ? 'Guest Quote / Testimonial' : modalConfig.entityType === 'diver' ? 'Biography' : 'Description'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={modalConfig.formData.quote || modalConfig.formData.bio || modalConfig.formData.desc || modalConfig.formData.description || ''}
                  onChange={(e) => setModalConfig(prev => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      [modalConfig.entityType === 'review' ? 'quote' : modalConfig.entityType === 'diver' ? 'bio' : 'description']: e.target.value,
                      desc: e.target.value // keep sync for experiences
                    }
                  }))}
                  className="w-full px-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs leading-relaxed focus:outline-none focus:border-indigo-800"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-frost-300">
                <button
                  type="button"
                  onClick={() => setModalConfig({ isOpen: false, mode: 'create', entityType: '', formData: {} })}
                  className="px-5 py-2.5 rounded-full border border-frost-300 hover:bg-frost-200 text-indigo-950 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSaveModal(e, false)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-indigo-900/30 bg-frost-200 hover:bg-frost-300 text-indigo-950 text-xs font-mono tracking-wider uppercase font-semibold cursor-pointer"
                >
                  <span>Save to Staging</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono tracking-widest uppercase font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ring-1 ring-indigo-500"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Publish Live</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRM DELETE MODAL */}
      {/* ========================================================================= */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-indigo-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-t-3xl sm:rounded-3xl bg-frost-50 text-indigo-950 border border-frost-300 shadow-2xl space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200">
            {/* Grab handle indicator */}
            <div className="w-12 h-1 rounded-full bg-indigo-950/20 mx-auto mb-2 block sm:hidden" />

            <div className="w-12 h-12 rounded-full bg-indigo-950 text-frost-50 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-indigo-950">
                Confirm Removal
              </h3>
              <p className="text-xs text-indigo-950/80 leading-relaxed">
                Are you sure you wish to delete <span className="font-bold text-indigo-950">"{deleteConfirmation.title}"</span>? This will immediately remove it from all live website views.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-frost-300">
              <button
                onClick={() => setDeleteConfirmation({ isOpen: false, entityType: '', id: null, title: '' })}
                className="px-5 py-2.5 rounded-full border border-frost-300 hover:bg-frost-200 text-indigo-950 text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(false)}
                className="px-4 py-2.5 rounded-full border border-indigo-900/30 bg-frost-200 hover:bg-frost-300 text-indigo-950 text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer"
              >
                Stage Removal
              </button>
              <button
                onClick={() => handleConfirmDelete(true)}
                className="px-6 py-2.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono uppercase tracking-widest font-bold shadow-md cursor-pointer"
              >
                Delete & Publish Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRM RESTORE FACTORY DEFAULTS MODAL */}
      {/* ========================================================================= */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-indigo-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-t-3xl sm:rounded-3xl bg-frost-50 text-indigo-950 border border-frost-300 shadow-2xl space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200">
            {/* Grab handle indicator */}
            <div className="w-12 h-1 rounded-full bg-indigo-950/20 mx-auto mb-2 block sm:hidden" />

            <div className="w-12 h-12 rounded-full bg-indigo-950 text-frost-50 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-indigo-950">
                Restore Factory Defaults?
              </h3>
              <p className="text-xs text-indigo-950/80 leading-relaxed">
                This action resets all customized content across hero narratives, sea experiences, toys, dive rosters, reviews, and decks back to the original catalog defaults.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-frost-300">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-5 py-2.5 rounded-full border border-frost-300 hover:bg-frost-200 text-indigo-950 text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Keep Current Data
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-6 py-2.5 rounded-full bg-indigo-950 text-frost-50 hover:bg-indigo-900 text-xs font-mono uppercase tracking-widest font-bold shadow-md cursor-pointer"
              >
                Reset All Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Dock for Instant Save across any scrolled position */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-8 inset-x-0 z-40 flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-indigo-950/95 backdrop-blur-md border border-frost-100/20 shadow-2xl text-frost-50 max-w-2xl w-full">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider font-bold block text-frost-50">
                Unsaved Modifications Staged
              </span>
              <span className="text-[11px] text-frost-300 font-mono">
                Click Save to broadcast all modifications live across the website
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleDiscardAll}
                className="px-4 py-2 rounded-full border border-frost-100/20 hover:bg-indigo-900 text-frost-300 hover:text-frost-100 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-frost-50 text-indigo-950 hover:bg-frost-200 text-xs font-mono tracking-wider uppercase font-extrabold shadow-xl transition-all cursor-pointer ring-2 ring-indigo-400"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Live Website</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Luxury Footer */}
      <Footer onOpenBooking={() => onNavigate('home')} />

    </div>
  );
}
