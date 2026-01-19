/**
 * CaseStudyTemplate
 *
 * Renders a full interactive case study experience including:
 * - Overview entry point
 * - Linear “journey” through stops
 * - Media carousels and fullscreen viewing
 * - Progress navigation and transitions
 *
 * This component intentionally owns a large amount of state to
 * keep cross-stop interactions (media, transitions, navigation)
 * synchronized in one place.
 */



import { ChevronLeft, ChevronRight, Train } from 'lucide-react';
import CalloutBox from '../components/CalloutBox';
import { allCaseStudies } from './casedata.tsx';
import type { CaseStudyData, Stop } from './casedata.tsx';
import TrainTransition from './train.tsx';
import { FullscreenImageViewer } from '../components/FullscreenImageViewer.tsx';
import CarouselControls from '../components/CarouselControlsNew';
import NumberedFeatures from '../components/NumberedFeatures.tsx';
import VisionTimeline from '../components/VisionTimeline.tsx';
import { WindowFrame, WindowContent, WindowCornerAccents } from '../components/WindowFrame';
import { useNavigate, useLocation } from 'react-router-dom';
import { renderMarkdownLinks } from '../utils/renderMarkdownLinks';
import { TRANSITION_DURATION_MS, PANEL_STYLE, TEXT_ACCENT_STYLE, TEXT_SECONDARY_STYLE, BORDER_SILVER_STYLE, glowStyle, largeGlowStyle } from '../utils/caseStudyConstants';
import { useState, useEffect, useRef } from 'react';
import { ExpressTicketCTA } from '../components/ticket.tsx';


// ============================================================
// Color Constants
// ============================================================

const THEME_COLOR = '#424141';
const SILVER = '#dfe1e5ff';
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';
const ACCENT_COLOR = SILVER;
const PREV_BUTTON_HOVER_BG = '#339989';

// ============================================================
// Type Definitions
// ============================================================

/**
 * Discriminated union for fullscreen viewer state
 * Prevents state drift by encoding type + data together
 */
type FullscreenState =
  | { type: 'closed' }
  | { type: 'peeks'; index: number }
  | { type: 'stop'; index: number }
  | { type: 'single'; src: string | { src: string; type: 'image' | 'video' } };

interface CaseStudyTemplateProps {
  onBack: () => void;
  onNextRoute: () => void;
  onStopChange: (index: number) => void;
  onOverview: () => void;
  dataIndex: number;
  initialStop?: number;
}

// ============================================================
// Components
// ============================================================

/**
 * WindowMedia
 *
 * Renders either an image or video inside a WindowFrame.
 * Accepts a string URL for backward compatibility or
 * a typed object when explicit media type is required.
 *
 * @param src - Media source (string URL or {src, type} object)
 */
const WindowMedia = ({ src }: { src: string | { src: string; type: 'image' | 'video' } }) => {
  const mediaSrc = typeof src === 'string' ? src : src.src;
  const isVideo = mediaSrc.toLowerCase().endsWith('.mp4') ||
    (typeof src !== 'string' && src.type === 'video');

  return (
    <div className="absolute inset-0 w-full h-full">
      {isVideo ? (
        <video
          src={mediaSrc}
          title="Video Preview"
          className="w-full h-full object-cover object-left-top"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={mediaSrc}
          alt="Preview"
          className="w-full h-full object-cover object-left-top"
          loading="lazy"
        />
      )}
    </div>
  );
};

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
    if (!showDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
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
  const [fullscreen, setFullscreen] = useState<FullscreenState>({ type: 'closed' });
  const [isPrevHovered, setIsPrevHovered] = useState(false);

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

  /**
   * Starts the case study journey from the first stop.
   * Centralizes transition timing to avoid drift between CTAs.
   */
  const startJourneyAtBeginning = () => {
    setShowTransition(true);

    window.setTimeout(() => {
      setShowOverview(false);
      setCurrentStop(0);
      setShowTransition(false);
      onStopChange(0);
    }, TRANSITION_DURATION_MS);
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
    setFullscreen({ type: 'closed' });
    onOverview();
    window.scrollTo(0, 0);
  };

  const stop = caseStudyData.stops[currentStop];
  const hasImages = !!stop.images && stop.images.length > 0;
  const featureCount = stop.features?.length || 0;

  const quoteBlock = stop.quote && (
    <blockquote 
      className="rounded-lg border-l-4 pl-6 pr-6 py-4 my-8 italic text-black flex items-start gap-4"
    style={{ 
      borderColor: THEME_COLOR, 
      backgroundColor: SILVER
    }}
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
    <div className="min-h-screen text-white bg-[color:var(--color-back)]">
      <style>{`.features-grid{grid-template-columns:1fr;} @media (min-width:768px){.features-grid{grid-template-columns:repeat(var(--cols), minmax(0,1fr));}}`}</style>
      
      {fullscreen.type !== 'closed' && (
        <FullscreenImageViewer
          src={
            fullscreen.type === 'single'
              ? typeof fullscreen.src === 'string'
                ? fullscreen.src
                : fullscreen.src.src
              : undefined
          }
          images={
            fullscreen.type === 'peeks'
              ? caseStudyData.peeks
              : fullscreen.type === 'stop'
              ? caseStudyData.stops[currentStop].images
              : undefined
          }
          currentIndex={
            fullscreen.type === 'peeks' || fullscreen.type === 'stop'
              ? fullscreen.index
              : undefined
          }
          onChangeIndex={(i) => {
            if (fullscreen.type === 'peeks' || fullscreen.type === 'stop') {
              setFullscreen({ ...fullscreen, index: i });
            }
          }}
          onClose={() => setFullscreen({ type: 'closed' })}
        />
      )}


      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-[color:var(--color-info)]/[0.8]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => { window.scrollTo(0, 0); onBack(); }} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span>Back to Station</span>
          </button>

          {/* CENTER: Title + Impact */}
          <div className="flex flex-col items-center flex-1 mx-8 text-center">
            <div className="text-xl font-bold mb-1" style={TEXT_ACCENT_STYLE}>
              {caseStudyData.title}
            </div>
            <div className="hidden sm:flex text-sm text-white/40 max-w-xs">
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
            Case Studies
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
            {/* Header row - flex with ticket pushed to right */}
            <div className="w-full lg:w-auto">
  {/* Flex container that wraps */}
  <div className="flex flex-wrap items-start gap-4">
    <div className="flex-1 min-w-[250px]">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
        {caseStudyData.title}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-2">
        <span className="text-lg sm:text-xl text-white/60 block sm:inline">
          Destination:
        </span>
        <span className="text-lg sm:text-xl font-semibold">
          {caseStudyData.destination}
        </span>
      </div>
    </div>

    {/* Ticket CTA will wrap to next line if it doesn't fit */}
    <div className="w-full sm:w-auto mb-[24px]">
      <ExpressTicketCTA
        onClick={startJourneyAtBeginning}
      />
    </div>
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
                  <WindowFrame
                    onClick={() => {
                      if (caseStudyData.peeks && caseStudyData.peeks.length) {
                        setFullscreen({ type: 'peeks', index: peekIndex });
                      }
                    }}
                  >
                    <WindowContent>
                      <WindowMedia src={caseStudyData.peeks[peekIndex]} />
                    </WindowContent>
                    
                    <CarouselControls
                      length={caseStudyData.peeks.length}
                      activeIndex={peekIndex}
                      onPrev={() => setPeekIndex((peekIndex - 1 + caseStudyData.peeks.length) % caseStudyData.peeks.length)}
                      onNext={() => setPeekIndex((peekIndex + 1) % caseStudyData.peeks.length)}
                      onSelect={(i) => setPeekIndex(i)}
                      size="small"
                    />

                    <WindowCornerAccents />
                  </WindowFrame>
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
                    style={PANEL_STYLE}
                  >
                    <div className="text-3xl font-bold mb-2" style={TEXT_ACCENT_STYLE}>
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
              <div className="grid md:grid-cols-2 gap-8 w-full mx-auto">
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-center text-white/80">Before</h2>
                  <div className="rounded-lg overflow-hidden h-[400px]" style={PANEL_STYLE}>
                    <img 
                      src={caseStudyData.before} 
                      alt="Before"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-left-top bg-black/20 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        if (caseStudyData.before) {
                          setFullscreen({ type: 'single', src: caseStudyData.before });
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
                  <div className="rounded-lg overflow-hidden h-[400px]" style={PANEL_STYLE}>
                    <img 
                      src={caseStudyData.after} 
                      alt="After"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-left-top bg-black/20 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        if (caseStudyData.after) {
                          setFullscreen({ type: 'single', src: caseStudyData.after });
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
{!caseStudyData.before &&
  !caseStudyData.after &&
  caseStudyData.stops[caseStudyData.stops.length - 1]?.quote && (
    <section
      className="mb-16 py-10 w-full mx-auto"
      style={{ backgroundColor: 'var(--color-back)' }}
      aria-label="Passenger Testimonials"
    >
      <div className="grid md:grid-cols-1 gap-8">
        <div
          className="relative bg-white/5 border border-white/10 p-10 rounded-2xl overflow-hidden group transition-all hover:bg-white/[0.07]"
        >
        <div
          className="absolute top-2 left-4 text-7xl font-serif opacity-10 transition-transform group-hover:-translate-y-1 select-none"
          style={TEXT_ACCENT_STYLE}
        >
          “
        </div>
        <div className="relative z-10 flex flex-col h-full">
            <p className="text-white/80 italic mb-8 leading-relaxed flex-grow">
              {caseStudyData.stops[caseStudyData.stops.length - 1].quote}
            </p>

            <div className="flex items-center gap-4 pt-6 border-t" style={BORDER_SILVER_STYLE}>
              {(() => {
                const authorString = caseStudyData.stops[caseStudyData.stops.length - 1].quoteAuthor || '';
                const name = authorString.split(',')[0]?.trim() || '';
                const [firstLine, ...restLines] = authorString
                  .replace(/,\s*/g, '\n')
                  .replace(/\sat\s/i, '\n')
                  .split('\n');

                return (
                  <>
                    {caseStudyData.stops[caseStudyData.stops.length - 1].quoteImage && (
                      <img 
                        src={caseStudyData.stops[caseStudyData.stops.length - 1].quoteImage}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 rounded-full object-cover border-2"
                        style={BORDER_SILVER_STYLE}
                      />
                    )}
                    
                    <div
                      className="text-[11px] tracking-widest leading-tight whitespace-pre-line"
                      style={TEXT_SECONDARY_STYLE}
                    >
                      <span className="font-bold text-sm tracking-tight" style={TEXT_ACCENT_STYLE}>{firstLine}</span>
                      <span className="uppercase"> {restLines.length > 0 && (
                        <>
                          {'\n'}
                          {restLines.join('\n')}
                        </>
                      )}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          <div
            className="absolute bottom-[-15px] right-4 text-7xl font-serif opacity-10 transition-transform group-hover:translate-y-1 select-none"
            style={TEXT_ACCENT_STYLE}
          >
            ”
          </div>
        </div>
      </div>
    </section>
  )}


            <div className="text-center mt-16  relative">
              <h2 className="text-3xl font-bold">Ready to Board?</h2>

              <button
                onClick={startJourneyAtBeginning}
                className={`px-8 py-4 rounded-full font-bold text-black text-lg hover:scale-105 ${
                  'relative mt-12 mb-1 px-8 py-4 text-lg'
                }`}
                style={{
                  backgroundColor: ACCENT_COLOR,
                  ...({
                    bottom: `calc(24px + env(safe-area-inset-bottom))`,
                    zIndex: 40
                  }),
                  ...largeGlowStyle(ACCENT_COLOR)
                }}
                aria-label="View full case study"
              >
                View full case study →
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
                <WindowFrame
                  onClick={() => {
                    const currentImages = caseStudyData.stops[currentStop].images;
                    if (currentImages && currentImages.length > 0) {
                      setFullscreen({ type: 'stop', index: stopCarouselIndex });
                    }
                  }}
                >
                  <WindowContent>
                    <WindowMedia src={caseStudyData.stops[currentStop].images![stopCarouselIndex]} />
                  </WindowContent>
                  
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

                  <WindowCornerAccents />
                </WindowFrame>
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
                <div className="rounded-lg p-6 my-8" style={PANEL_STYLE}>
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
                    <div key={i} className="rounded-lg p-6" style={PANEL_STYLE}>
                      <h4 className="text-lg font-bold mb-2" style={TEXT_ACCENT_STYLE}>{f.title}</h4>
                      <p className="text-white/70 text-sm">{f.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {hasImages && quoteBlock}

              {stop.impact && (
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="rounded-lg p-6 text-center bg-[color:var(--color-info)]">
                    <div className="text-3xl font-bold mb-2 text-[color:var(--color-accent)]">
                      {stop.impact.metric1}
                    </div>
                    <div className="text-white/60">{stop.impact.label1}</div>
                  </div>
                  <div className="rounded-lg p-6 text-center bg-[color:var(--color-info)]">
                    <div className="text-3xl font-bold mb-2 text-[color:var(--color-accent)]">
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
                style={{
                  ...PANEL_STYLE,
                  ...(isPrevHovered && currentStop > 0 && { backgroundColor: PREV_BUTTON_HOVER_BG })
                }}
                onMouseEnter={() => setIsPrevHovered(true)}
                onMouseLeave={() => setIsPrevHovered(false)}
              >
                <ChevronLeft size={20} />
                Previous Stop
              </button>

              <button
                onClick={handleBackToOverview}
                aria-label="Back to Overview"
                className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105 w-full sm:w-auto justify-center"
                style={{ ...PANEL_STYLE, ...glowStyle(INFO_COLOR) }}
              >
                Back to Overview
              </button>

              {currentStop < caseStudyData.stops.length - 1 ? (
                <button
                  onClick={nextStop}
                  aria-label="Next Stop"
                  className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105 w-full sm:w-auto justify-center"
                  style={{ ...PANEL_STYLE, ...glowStyle(INFO_COLOR) }}
                >
                  Next Stop
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={onNextRoute}
                  className="flex items-center gap-2 px-4 py-3 rounded-full text-black transition-all hover:scale-105 w-full sm:w-auto justify-center"
                  style={{ backgroundColor: ACCENT_COLOR, ...largeGlowStyle(ACCENT_COLOR) }}
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
      <footer className="text-center bg-black/40 py-12 border-t-2 border-[color:var(--color-theme)]/[0.19]">
          <Train className="w-16 h-16 mx-auto mb-6 text-[color:var(--color-theme)]" />
          <h3 className="text-4xl font-bold mb-4">Thanks for Riding!</h3>
          <p className="text-2xl text-white/80 mb-8">
            Let's build your next impactful experience
          </p>
          <div className="mt-8 text-sm text-[color:var(--color-text-secondary)]">
            Montrose, Colorado • <u><a href="https://www.linkedin.com/in/andrea-shulman/">LinkedIn</a></u> • andyshulman8@gmail.com
            </div>
          </footer>
    </div>
  );
}