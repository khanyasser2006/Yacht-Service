import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor } from 'lucide-react';
import framesManifest from './frames.json';
import { useSiteData } from '../context/SiteDataContext';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence({ onAnimationComplete }) {
  const { siteData } = useSiteData();
  const stages = siteData?.heroStages || [];

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentNarrative, setCurrentNarrative] = useState(0);

  // State refs for decoupled render loop
  const bitmapsRef = useRef([]);
  const frameIndexRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const lastDrawnIndexRef = useRef(-1);

  const totalFrames = framesManifest.length || 595;

  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

    // Preload and decode images off-thread using createImageBitmap
    const loadFrames = async () => {
      const loadedBitmaps = new Array(totalFrames);
      let loadedCount = 0;

      const batchSize = 16;
      for (let i = 0; i < totalFrames; i += batchSize) {
        if (isCancelled) return;
        const batch = [];
        for (let j = i; j < i + batchSize && j < totalFrames; j++) {
          const fileName = framesManifest[j] || `frame_${String(j + 1).padStart(3, '0')}.jpg`;
          const url = `/cabinet_frames_600fps/${fileName}`;

          const p = fetch(url)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              return res.blob();
            })
            .then((blob) => createImageBitmap(blob))
            .then((bitmap) => {
              loadedBitmaps[j] = bitmap;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            })
            .catch(() => {
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            });
          batch.push(p);
        }
        await Promise.all(batch);
      }

      if (!isCancelled) {
        bitmapsRef.current = loadedBitmaps;
        setIsLoaded(true);
      }
    };

    loadFrames();

    // Decoupled requestAnimationFrame Render Loop
    const render = () => {
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(frameIndexRef.current))
      );

      const bitmap = bitmapsRef.current[targetIndex] || bitmapsRef.current[0];

      if (bitmap && targetIndex !== lastDrawnIndexRef.current) {
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = bitmap.width;
        const ih = bitmap.height;

        const hRatio = cw / iw;
        const vRatio = ch / ih;
        const ratio = Math.max(hRatio, vRatio);

        const sw = (iw * ratio) | 0;
        const sh = (ih * ratio) | 0;
        const sx = ((cw - sw) / 2) | 0;
        const sy = ((ch - sh) / 2) | 0;

        ctx.drawImage(bitmap, 0, 0, iw, ih, sx, sy, sw, sh);
        lastDrawnIndexRef.current = targetIndex;
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = (window.innerWidth * dpr) | 0;
      canvas.height = (window.innerHeight * dpr) | 0;
      lastDrawnIndexRef.current = -1;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [totalFrames]);

  // GSAP ScrollTrigger timeline
  useEffect(() => {
    if (!containerRef.current) return;

    const proxy = { frame: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          proxy.frame = self.progress * (totalFrames - 1);
          frameIndexRef.current = proxy.frame;

          const p = self.progress;
          if (p < 0.22) {
            setCurrentNarrative(0);
          } else if (p < 0.52) {
            setCurrentNarrative(1);
          } else if (p < 0.78) {
            setCurrentNarrative(2);
          } else {
            setCurrentNarrative(3);
          }

          if (onAnimationComplete) {
            onAnimationComplete(p >= 0.96);
          }
        },
        onLeave: () => {
          if (onAnimationComplete) onAnimationComplete(true);
        },
        onEnterBack: () => {
          if (onAnimationComplete) onAnimationComplete(false);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [totalFrames, onAnimationComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-indigo-950 overflow-hidden select-none">
      
      {/* 2D Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Preload Progress Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-indigo-950 text-frost-100 transition-opacity duration-700">
          <div className="flex flex-col items-center space-y-6 max-w-sm px-6 text-center">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-frost-100/10 border-t-frost-100 animate-spin" />
              <Anchor className="w-6 h-6 text-frost-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-frost-400">
                AURA NAUTICA
              </span>
              <div className="font-display text-xl font-bold tracking-widest text-frost-50">
                INITIALIZING STREAM
              </div>
            </div>

            <div className="w-48 h-1 bg-indigo-900/80 rounded-full overflow-hidden border border-frost-100/10">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-300 to-frost-100 transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC MULTI-POSITION HERO TITLES */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        
        {/* STAGE 1: Left Facade (Top-Left) */}
        <div 
          className={`absolute top-24 sm:top-36 left-5 sm:left-16 max-w-[calc(100vw-2.5rem)] sm:max-w-xl text-left transition-all duration-700 transform ${
            currentNarrative === 0
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-6 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
            <span className="font-display text-xs font-semibold text-frost-300 tracking-[0.25em]">
              {stages[0]?.index || 'I'}
            </span>
            <div className="w-6 h-[1px] bg-frost-100/30" />
            <span className="font-mono text-[9px] sm:text-[10px] text-frost-300 uppercase tracking-[0.25em]">
              {stages[0]?.tag || 'VESSEL INTRODUCTION'}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.08] text-glow mb-2.5">
            {stages[0]?.title || 'THE ART OF SEA FLIGHT'}
          </h1>

          <p className="text-frost-100/90 text-xs sm:text-base font-light leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            {stages[0]?.subtitle || 'Where naval engineering dissolves into pure oceanic adrenaline. Superyacht charters crafted for boundless thrills and high-altitude flight.'}
          </p>
        </div>

        {/* STAGE 2: Parachute Sky Riding (Right-Bottom) */}
        <div 
          className={`absolute bottom-12 sm:bottom-24 right-5 sm:right-16 max-w-[calc(100vw-2.5rem)] sm:max-w-xl text-right flex flex-col items-end transition-all duration-700 transform ${
            currentNarrative === 1
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 mb-2.5">
            <span className="font-mono text-[9px] sm:text-[10px] text-frost-300 uppercase tracking-[0.25em]">
              {stages[1]?.tag || 'AERO-TETHER ASCENTS'}
            </span>
            <div className="w-6 h-[1px] bg-frost-100/30" />
            <span className="font-display text-xs font-semibold text-frost-300 tracking-[0.25em]">
              {stages[1]?.index || 'II'}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.08] text-glow mb-2.5">
            {stages[1]?.title || 'PARACHUTE SKY RIDING'}
          </h1>

          <p className="text-frost-100/90 text-xs sm:text-base font-light leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            {stages[1]?.subtitle || 'Ascend eight hundred feet above pristine azure swells towed by custom hydraulic tensioning with zero vibration and panoramic horizons.'}
          </p>
        </div>

        {/* STAGE 3: Hydro-Jet & Foils (Left-Bottom) */}
        <div 
          className={`absolute bottom-14 sm:bottom-28 left-5 sm:left-16 max-w-[calc(100vw-2.5rem)] sm:max-w-xl text-left transition-all duration-700 transform ${
            currentNarrative === 2
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
            <span className="font-display text-xs font-semibold text-frost-300 tracking-[0.25em]">
              {stages[2]?.index || 'III'}
            </span>
            <div className="w-6 h-[1px] bg-frost-100/30" />
            <span className="font-mono text-[9px] sm:text-[10px] text-frost-300 uppercase tracking-[0.25em]">
              {stages[2]?.tag || 'HYDRO-JET DYNAMICS'}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.08] text-glow mb-2.5">
            {stages[2]?.title || 'SEABOB & HYDROFOIL CAVITATION'}
          </h1>

          <p className="text-frost-100/90 text-xs sm:text-base font-light leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            {stages[2]?.subtitle || 'Effortless sub-aquatic agility at twenty-two knots and whisper-silent e-foil flight levitating three feet above rolling open water.'}
          </p>
        </div>

        {/* STAGE 4: Bespoke Regattas (Top-Right) */}
        <div 
          className={`absolute top-24 sm:top-36 right-5 sm:right-16 max-w-[calc(100vw-2.5rem)] sm:max-w-xl text-right flex flex-col items-end transition-all duration-700 transform ${
            currentNarrative === 3
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-6 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 mb-2.5">
            <span className="font-mono text-[9px] sm:text-[10px] text-frost-300 uppercase tracking-[0.25em]">
              {stages[3]?.tag || 'BESPOKE REGATTAS'}
            </span>
            <div className="w-6 h-[1px] bg-frost-100/30" />
            <span className="font-display text-xs font-semibold text-frost-300 tracking-[0.25em]">
              {stages[3]?.index || 'IV'}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-frost-50 leading-[1.08] text-glow mb-2.5">
            {stages[3]?.title || 'UNRIVALED PRIVATE HORIZONS'}
          </h1>

          <p className="text-frost-100/90 text-xs sm:text-base font-light leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            {stages[3]?.subtitle || 'Custom archipelago journeys curated with private master dive guides, Michelin-level hospitality, and seamless tender access.'}
          </p>
        </div>

      </div>

    </div>
  );
}
