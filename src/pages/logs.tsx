// import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Train } from 'lucide-react';
import CalloutBox from '../components/CalloutBox';
import { allCaseStudies } from './casedata.tsx';
import type { CaseStudyData } from './casedata.tsx';
import TrainTransition from './train.tsx';
import { FullscreenImageViewer } from '../components/FullscreenImageViewer.tsx';
import CarouselControls from '../components/CarouselControlsNew';
import NumberedFeatures from '../components/NumberedFeatures.tsx';
import VisionTimeline from '../components/VisionTimeline.tsx';
// import { useLocation } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CaseStudyWrapper from '../components/CaseStudyWrapper.tsx'; // adjust path
import DesignCentralStation from '../App.tsx'; // optional landing page
// import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesignCentralStation />} />
        <Route path="/:caseid" element={<CaseStudyWrapper />} />
        <Route path="/:caseid/:stop" element={<CaseStudyWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



// Color constants
const THEME_COLOR = '#424141'; 
const SILVER = '#dfe1e5ff';
const SECONDARY_COLOR = '#339989';
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';
const ACCENT_COLOR = SILVER;

// Helper component for video/image in windows
const WindowMedia = ({ src }: { src: string | { src: string; type: 'image' | 'video' } }) => {
  const mediaSrc = typeof src === 'string' ? src : src.src;
  const isVideo = mediaSrc.toLowerCase().endsWith('.mp4') || 
                  (typeof src !== 'string' && src.type === 'video');

  return (
    <div className="absolute inset-0 w-full h-full">
      {isVideo ? (
        <video
          src={mediaSrc}
          title="Video of Experience"
          className="w-full h-full object-cover object-left-top"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img 
          src={mediaSrc}
          alt="Sneak Peek"
          className="w-full h-full object-cover object-left-top"
        />
      )}
    </div>
  );
};

// Helper: turn [label](url) into links
const renderMarkdownLinks = (text: string) => {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [full, label, url] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    parts.push(
      <a
        key={start}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="underline text-blue-800 hover:text-blue-500"
      >
        {label}
      </a>
    );

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

interface Stop {
  station_name: string;
  subtitle?: string;
  phase: string;
  content: string;
  quote?: string;
  quoteAuthor?: string;
  quoteImage?: string;
  quotePreface?: string;
  insights?: string[];
  callout?: string;
  numberedFeatures?: { title: string; description: string }[];
  features?: { title: string; description: string }[];
  impact?: {
    metric1: string;
    label1: string;
    metric2: string;
    label2: string;
  };
  images?: string[];
}

interface CaseStudyTemplateProps {
  onBack: () => void;
  onNextRoute: () => void;
  onStopChange: (index: number) => void;
  onOverview: () => void;
  dataIndex: number;
  initialStop?: number;
}

export default function CaseStudyTemplate({ 
  onBack, 
  onNextRoute, 
  onStopChange,
  onOverview,
  dataIndex, 
  initialStop 
}: CaseStudyTemplateProps) {
const navigate = useNavigate();  
const [showDropdown, setShowDropdown] = useState<boolean>(false);
const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  if (showDropdown) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [showDropdown]);

  const location = useLocation();

  useEffect(() => {
    // Force scroll reset on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);


  const [showTransition, setShowTransition] = useState(false);
  const caseStudyData: CaseStudyData = allCaseStudies[dataIndex];
  
  const [showOverview, setShowOverview] = useState(initialStop === undefined);
  const [currentStop, setCurrentStop] = useState(initialStop ?? 0);
  
  const [peekIndex, setPeekIndex] = useState(0);
  const [stopCarouselIndex, setStopCarouselIndex] = useState(0);
  const [fullscreenSource, setFullscreenSource] = useState<'peeks' | 'stop' | 'single'>('peeks');
  const [fullscreenImage, setFullscreenImage] = useState<string | { src: string; type: 'image' | 'video' } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state when URL changes
  useEffect(() => {
    if (initialStop === undefined) {
      setShowOverview(true);
    } else {
      setShowOverview(false);
      setCurrentStop(initialStop);
    }
    window.scrollTo(0, 0);
  }, [initialStop]);

  // Reset carousel when stop changes
  useEffect(() => {
    const images = caseStudyData.stops[currentStop].images;
    if (!images || images.length === 0) {
      setStopCarouselIndex(0);
      return;
    }
    if (stopCarouselIndex >= images.length) {
      setStopCarouselIndex(0);
    }
  }, [currentStop, caseStudyData, stopCarouselIndex]);

  const startJourney = () => {
    setShowTransition(true);
    
    setTimeout(() => {
      setShowOverview(false);
      setCurrentStop(0);
      setShowTransition(false);
      onStopChange(0);
    }, 1200);
  };
  
  const nextStop = () => {
    if (currentStop < caseStudyData.stops.length - 1) {
      const newStop = currentStop + 1;
      setCurrentStop(newStop);
      onStopChange(newStop);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStop = () => {
    if (currentStop > 0) {
      const newStop = currentStop - 1;
      setCurrentStop(newStop);
      onStopChange(newStop);
      window.scrollTo(0, 0);
    }
  };
  
  const goToStop = (index: number) => {
    setCurrentStop(index);
    setShowOverview(false);
    onStopChange(index);
    window.scrollTo(0, 0);
  };

  const handleBackToOverview = () => {
    setShowOverview(true);
    setIsFullscreen(false);
    setFullscreenImage(null);
    setFullscreenSource('peeks');
    onOverview();
    window.scrollTo(0, 0);
  };

  const stop = caseStudyData.stops[currentStop];
  const hasImages = !!stop.images && stop.images.length > 0;
  const featureCount = stop.features?.length || 0;

  const quoteBlock = stop.quote && (
    <blockquote 
      className="rounded-lg border-l-4 pl-6 pr-6 py-4 my-8 italic text-black flex items-start gap-4"
      style={{ borderColor: THEME_COLOR, backgroundColor: SILVER }}
    >
      <div className="flex-1">
        {stop.quotePreface && (
          <div className="text-xs font-semibold uppercase tracking-wide text-black/60 mb-1">
            {stop.quotePreface}
          </div>
        )}
        "{stop.quote}"
        {stop.quoteAuthor && (
          <>
            <div className="w-full border-t border-black/30 my-4" />
            <footer className="text-sm mt-2 not-italic text-black/70 flex items-center gap-3 pt-2">
              {stop.quoteImage && (
                <img 
                  src={stop.quoteImage} 
                  alt={stop.quoteAuthor}
                  className="w-10 h-10 rounded-full object-cover border-2"
                  style={{ boxShadow: '0 0 0 2px rgba(0,0,0,0.04) inset', borderColor: INFO_COLOR }}
                />
              )}
              <span>{stop.quoteAuthor}</span>
            </footer>
          </>
        )}
      </div>
    </blockquote>
  );

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BACK_COLOR }}>
      <style>{`.features-grid{grid-template-columns:1fr;} @media (min-width:768px){.features-grid{grid-template-columns:repeat(var(--cols), minmax(0,1fr));}}`}</style>
      
      {isFullscreen && (
        <FullscreenImageViewer
          src={
            fullscreenSource === 'single'
              ? (typeof fullscreenImage === 'string' ? fullscreenImage : fullscreenImage?.src)
              : undefined
          }
          images={
            fullscreenSource === 'peeks'
              ? caseStudyData.peeks.map(item => typeof item === 'string' ? item : item.src) as string[]
              : fullscreenSource === 'stop'
              ? caseStudyData.stops[currentStop].images ?? undefined
              : undefined
          }
          currentIndex={fullscreenSource === 'peeks' ? peekIndex : stopCarouselIndex}
          onChangeIndex={(i) => {
            if (fullscreenSource === 'stop') setStopCarouselIndex(i);
            else if (fullscreenSource === 'peeks') setPeekIndex(i);
          }}
          onClose={() => {
            setIsFullscreen(false);
            setFullscreenImage(null);
            setFullscreenSource('peeks');
          }}
        />
      )}

      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: INFO_COLOR + 'CC' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span>Back to Station</span>
          </button>

          {/* CENTER: Title + Impact */}
          <div className="flex flex-col items-center flex-1 mx-8 text-center" ref={dropdownRef}>
            <div className="text-xl font-bold mb-1" style={{ color: ACCENT_COLOR }}>
              {caseStudyData.title}
            </div>
            <div className="text-sm text-white/40 max-w-xs">
              {caseStudyData.destination}
            </div>
          </div>

          {/* RIGHT: Case Study Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button 
          className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-white/10 transition-all"
          onClick={() => setShowDropdown(prev => !prev)} 
        >
          <div className="text-sm text-white/60 group-hover:text-white transition-colors">
            All Journeys
          </div>
          <svg 
            className="w-4 h-4 text-white/60 group-hover:text-white transition-all duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ 
              transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-black/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2">
              {allCaseStudies.map((study, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/${study.id}`);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-all flex items-center gap-3 group"
                >
                  {/* <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT_COLOR }} /> */}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white truncate">{study.title}</div>
                    <div className="text-xs text-white/60 truncate">{study.destination}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6">
        {showOverview ? (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center space-y-6 mb-8">
              <h1 className="text-4xl font-bold mb-2">{caseStudyData.title}</h1>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl text-white/60">Destination:</span>
                <span className="text-xl font-semibold">{caseStudyData.destination}</span>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white/80">Background</h2>
              <p className="text-white/60 leading-relaxed text-l">
                {caseStudyData.background}
              </p>
            </div>

            <div className="mb-8">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-8 text-left">Sneak Peeks</h2>
                  <p className="text-white/60 leading-relaxed mb-8">
                    {caseStudyData.overview}
                  </p>
                </div>
                
                <div className="relative md:col-span-2 space-y-6">
                  <div 
                    className="relative p-6 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => {
                      if (caseStudyData.peeks && caseStudyData.peeks.length) {
                        setFullscreenSource('peeks');
                        setPeekIndex(peekIndex);
                        const mediaItem = caseStudyData.peeks[peekIndex];
                        setFullscreenImage(typeof mediaItem === 'string' ? mediaItem : mediaItem.src);
                        setIsFullscreen(true);
                      }
                    }}
                    style={{ 
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)',
                      border: '4px solid #333',
                      boxShadow: 'inset 0 6px 24px rgba(0,0,0,0.8), 0 12px 40px rgba(0,0,0,0.6)'
                    }}
                  >
                    <div className="relative p-2 rounded-xl overflow-hidden w-full flex items-center justify-center" style={{
                      background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)',
                      border: '3px solid #444',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.05)'
                    }}>
                      <div className="relative rounded-lg w-full overflow-hidden h-[20rem]" style={{
                        background: 'linear-gradient(145deg, #1f1f1f 0%, #111 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)'
                      }}>
                        <WindowMedia src={caseStudyData.peeks[peekIndex]} />
                        <div className="absolute inset-0" style={{
                          background: `
                            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                            linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
                          `
                        }} />
                      </div>
                      
                      <CarouselControls
                        length={caseStudyData.peeks.length}
                        activeIndex={peekIndex}
                        onPrev={() => setPeekIndex((peekIndex - 1 + caseStudyData.peeks.length) % caseStudyData.peeks.length)}
                        onNext={() => setPeekIndex((peekIndex + 1) % caseStudyData.peeks.length)}
                        onSelect={(i) => setPeekIndex(i)}
                        size="small"
                      />

                      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos, i) => (
                        <div
                          key={i}
                          className={`absolute w-3 h-3 rounded-full shadow-md`}
                          style={{
                            [pos.includes('top') ? 'top' : 'bottom']: '-2px',
                            [pos.includes('left') ? 'left' : 'right']: '-2px',
                            background: 'radial-gradient(circle, #666 30%, #444 70%)',
                            border: '1px solid #888',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {caseStudyData.allImpact && caseStudyData.allImpact.length > 0 && (
             <div
                className="mb-12 w-full grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                  alignItems: 'stretch',
                  justifyItems: 'stretch',
                }}
              >


              {caseStudyData.allImpact.map((item, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg p-6 text-center shadow-lg transition-transform" 
                    style={{ backgroundColor: INFO_COLOR, minHeight: '100%' }}
                  >
                    <div className="text-3xl font-bold mb-2" style={{ color: SILVER }}>
                      {item.metric}
                    </div>
                    <div className="text-white/60 text-sm">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {caseStudyData.before && caseStudyData.after && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-center text-white/80">Before</h2>
                  <div className="rounded-lg overflow-hidden h-[400px]" style={{ backgroundColor: INFO_COLOR }}>
                    <img 
                      src={caseStudyData.before} 
                      alt="Before"
                      className="w-full h-full object-cover object-left-top bg-black/20 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        if (caseStudyData.before) {
                          setFullscreenSource('single');
                          setFullscreenImage(caseStudyData.before);
                          setIsFullscreen(true);
                        }
                      }}
                    />
                  </div>
                  <p className="text-white/50 text-sm text-center">
                    Fragmented tools, slow troubleshooting
                  </p>
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-center text-white/80">After</h2>
                  <div className="rounded-lg overflow-hidden h-[400px]" style={{ backgroundColor: INFO_COLOR }}>
                    <img 
                      src={caseStudyData.after} 
                      alt="After"
                      className="w-full h-full object-cover object-left-top bg-black/20 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        if (caseStudyData.after) {
                          setFullscreenSource('single');
                          setFullscreenImage(caseStudyData.after);
                          setIsFullscreen(true);
                        }
                      }}
                    />
                  </div>
                  <p className="text-white/50 text-sm text-center">
                    Unified platform, 10-minute resolution
                  </p>
                </div>
              </div>
            )}

            <div className="text-center mt-16 space-y-6">
              <h2 className="text-3xl font-bold">Ready to Board?</h2>
              <button
                onClick={startJourney}
                className="px-8 py-4 rounded-full font-bold text-black text-lg transition-all hover:scale-105"
                style={{ 
                  backgroundColor: ACCENT_COLOR,
                  boxShadow: `0 0 30px ${ACCENT_COLOR}40`
                }}
                aria-label="Start Journey"
              >
                Start Journey →
              </button>
              <button 
                onClick={onNextRoute}
                className="text-white/40 text-sm hover:text-white/80 transition-colors cursor-pointer block w-full text-center"
                aria-label="Or try the next case study"
              >
                Or try the next case study
              </button>
              <TrainTransition isActive={showTransition} direction="right" />
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="mb-16">
              <div className="relative flex items-center justify-between max-w-4xl mx-auto">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/10 -translate-y-1/2" />
                
                <div 
                  className="absolute left-0 top-1/2 h-1 -translate-y-1/2 transition-all duration-500 ease-out"
                  style={{ 
                    width: `${(currentStop / (caseStudyData.stops.length - 1)) * 100}%`,
                    backgroundColor: ACCENT_COLOR
                  }}
                />

                {caseStudyData.stops.map((stop: Stop, index: number) => {
                  const isActive = index <= currentStop;
                  const isCurrent = index === currentStop;

                  return (
                  <button
                    key={index}
                    onClick={() => goToStop(index)}
                    aria-label={`Go to ${stop.station_name}`}
                    className="relative z-10 group focus:outline-none"
                  >
                    {/* The Stop Circle */}
                    <div 
                      className="w-6 h-6 rounded-full border-2 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? ACCENT_COLOR : BACK_COLOR,
                        borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.3)'
                      }}
                    >
                      {isCurrent && (
                        <div 
                          className="absolute inset-0 rounded-full border-2 border-white animate-pulse"
                          style={{ transform: 'scale(1.8)', opacity: 1 }}
                        />
                      )}
                    </div>

                    {/* The Station Name - Responsive Visibility */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none 
                                    opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-300">
                      <span 
                        className={`text-xs mb-3 font-medium uppercase tracking-wider transition-colors duration-300 ${
                          isActive || isCurrent 
                            ? 'text-[#dfe1e5ff]'           // Current and Past stops
                            : 'text-[#424141]'       // Future stops (Silver)
                        }`}
                      >
                        {stop.station_name}
                      </span>
                    </div>
                  </button>
                );

                })}
              </div>
            </div>

            <div className="text-center space-y-2 mt-8 mb-6">
              <h2 className="text-3xl font-bold">
                {caseStudyData.stops[currentStop].station_name}
              </h2>
            </div>

            {caseStudyData.stops[currentStop].subtitle && (
              <div className="text-center mb-6">
                <h3 className="text-md font-bold">
                  {caseStudyData.stops[currentStop].subtitle}
                </h3>
              </div>
            )}

            {hasImages && (
              <div className="relative max-w-4xl mx-auto mb-8">
                <div 
                  className="relative p-6 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" 
                  onClick={() => {
                    const currentImages = caseStudyData.stops[currentStop].images;
                    if (currentImages && currentImages.length > 0) {
                      setFullscreenSource('stop');
                      setFullscreenImage(currentImages[stopCarouselIndex]);
                      setIsFullscreen(true);
                    }
                  }}
                  style={{ 
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)',
                    border: '4px solid #333',
                    boxShadow: 'inset 0 6px 24px rgba(0,0,0,0.8), 0 12px 40px rgba(0,0,0,0.6)'
                  }}
                >
                  <div className="relative p-2 rounded-xl overflow-hidden w-full flex items-center justify-center" style={{
                    background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)',
                    border: '3px solid #444',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.05)'
                  }}>
                    <div className="relative rounded-lg w-full overflow-hidden h-[20rem]" style={{
                      background: 'linear-gradient(145deg, #1f1f1f 0%, #111 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)'
                    }}>
                      <WindowMedia src={caseStudyData.stops[currentStop].images![stopCarouselIndex]} />
                      <div className="absolute inset-0" style={{
                        background: `
                          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                          linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
                        `
                      }} />
                    </div>
                    
                    <CarouselControls
                      length={caseStudyData.stops[currentStop].images?.length || 0}
                      activeIndex={stopCarouselIndex}
                      onPrev={() => {
                        const len = caseStudyData.stops[currentStop].images!.length;
                        setStopCarouselIndex((stopCarouselIndex - 1 + len) % len);
                      }}
                      onNext={() => {
                        const len = caseStudyData.stops[currentStop].images!.length;
                        setStopCarouselIndex((stopCarouselIndex + 1) % len);
                      }}
                      onSelect={(i) => setStopCarouselIndex(i)}
                      size="small"
                    />

                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute w-3 h-3 rounded-full shadow-md`}
                        style={{
                          [pos.includes('top') ? 'top' : 'bottom']: '-2px',
                          [pos.includes('left') ? 'left' : 'right']: '-2px',
                          background: 'radial-gradient(circle, #666 30%, #444 70%)',
                          border: '1px solid #888',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              {!hasImages && quoteBlock}

              <p className="text-l text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                {stop.content}
              </p>

              {caseStudyData.id === 'future' && stop.station_name === 'Vision Definition' && (
                <div className="my-8">
                  <VisionTimeline />
                </div>
              )}

              {stop.numberedFeatures && <NumberedFeatures items={stop.numberedFeatures} />}

              {stop.callout && (
                <CalloutBox>
                  {renderMarkdownLinks(stop.callout)}
                </CalloutBox>
              )}

              {stop.insights && (
                <div className="rounded-lg p-6 my-8" style={{ backgroundColor: INFO_COLOR }}>
                  <h3 className="text-lg font-bold mb-4 text-white/90">Key Insights</h3>
                  <ul className="space-y-2">
                    {stop.insights.map((insight: string, i: number) => (
                      <li key={i} className="text-white/70">{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {stop.features && (
                <div
                  className="grid gap-4 my-8 features-grid"
                  style={{ ['--cols' as any]: Math.min(Math.max(featureCount, 1), 4) }}
                >
                  {stop.features.map((f: any, i: number) => (
                    <div key={i} className="rounded-lg p-6" style={{ backgroundColor: INFO_COLOR }}>
                      <h4 className="text-lg font-bold mb-2" style={{ color: ACCENT_COLOR }}>{f.title}</h4>
                      <p className="text-white/70 text-sm">{f.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {hasImages && quoteBlock}

              {stop.impact && (
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                    <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                      {stop.impact.metric1}
                    </div>
                    <div className="text-white/60">{stop.impact.label1}</div>
                  </div>
                  <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                    <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                      {stop.impact.metric2}
                    </div>
                    <div className="text-white/60">{stop.impact.label2}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 pt-8 border-t border-white/10">
              <button
                onClick={prevStop}
                aria-label="Previous Stop"
                disabled={currentStop === 0}
                className="flex items-center gap-2 px-4 py-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all w-full sm:w-auto justify-center"
                style={{ backgroundColor: INFO_COLOR }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = SECONDARY_COLOR)}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = INFO_COLOR}
              >
                <ChevronLeft size={20} />
                Previous Stop
              </button>

              <button
                onClick={handleBackToOverview}
                aria-label="Back to Overview"
                className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105 w-full sm:w-auto justify-center"
                style={{ backgroundColor: INFO_COLOR, boxShadow: `0 0 20px ${INFO_COLOR}40` }}
              >
                Back to Overview
              </button>

              {currentStop < caseStudyData.stops.length - 1 ? (
                <button
                  onClick={nextStop}
                  aria-label="Next Stop"
                  className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105 w-full sm:w-auto justify-center"
                  style={{ backgroundColor: INFO_COLOR, boxShadow: `0 0 20px ${INFO_COLOR}40` }}
                >
                  Next Stop
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={onNextRoute}
                  className="flex items-center gap-2 px-4 py-3 rounded-full text-black transition-all hover:scale-105 w-full sm:w-auto justify-center"
                  style={{ backgroundColor: ACCENT_COLOR, boxShadow: `0 0 20px ${ACCENT_COLOR}40` }}
                  aria-label="Next Journey"
                >
                  Next Journey
                  <Train size={20} />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}