import { useState, useEffect } from 'react';
import { ChevronLeft, X, ChevronRight, Train } from 'lucide-react';
import { allCaseStudies } from './casedata';
import type { CaseStudyData } from './casedata';
import TrainTransition from './train.tsx';
import { FullscreenImageViewer } from '../components/FullscreenImageViewer.tsx';


// Color constants - adjust these to change the entire theme
const SILVER = '#dfe1e5ff';
const SECONDARY_COLOR = '#339989';
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';


const ACCENT_COLOR = SILVER; // Primary accent color for buttons, highlights
//const HOVER_COLOR = SECONDARY_COLOR; // Hover states

interface Stop {
  station_name: string;
  phase: string;
  content: string;
  quote?: string;
  quoteAuthor?: string;
  insights?: string[];
  impact?: {
    metric1: string;
    label1: string;
    metric2: string;
    label2: string;
  };
  images?: string[]; // Array of image URLs for carousel
}

interface BeforeAfter {
  before: string; // Image URL or description
  after: string; // Image URL or description
  label?: string;
}

interface CaseStudyTemplateProps {
  onBack: () => void;
  onNextRoute: () => void;
  dataIndex: number;
}

export default function CaseStudyTemplate({ onBack, onNextRoute, dataIndex }: CaseStudyTemplateProps) {
  const [showTransition, setShowTransition] = useState(false);
  const caseStudyData: CaseStudyData = allCaseStudies[dataIndex];
  
  const [currentStop, setCurrentStop] = useState(0);
  const [showOverview, setShowOverview] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const startJourney = () => {
    setShowTransition(true); // Trigger train animation
    
    // Wait for animation to finish, then navigate
    setTimeout(() => {
      setShowOverview(false);
      setCurrentStop(0);
      setShowTransition(false);
    }, 1200); // Match your longest animation duration
  };
  
  // Placeholder before/after
  const beforeAfter: BeforeAfter = {
    before: '/images/rags/before.png',
    after: '/images/rags/after.png',
    label: 'Transformation'
  };
  
  const nextStop = () => {
    if (currentStop < caseStudyData.stops.length - 1) {
      setCurrentStop(currentStop + 1);
      setShowOverview(false);
    }
  };
  
  const prevStop = () => {
    if (currentStop > 0) {
      setCurrentStop(currentStop - 1);
    }
  };
  
  const goToStop = (index: number) => {
    setCurrentStop(index);
    setShowOverview(false);
  };

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const images = caseStudyData.stops[currentStop].images;
    if (!images || images.length === 0) {
      setCarouselIndex(0);
      return;
    }
    if (carouselIndex >= images.length) {
      setCarouselIndex(0);
    }
  }, [currentStop, caseStudyData, carouselIndex]);

  return (
    
    
    <div className="min-h-screen text-white" style={{ backgroundColor: BACK_COLOR }}>
      {/* Fullscreen Image Viewer */}
      {/* <FullscreenImageViewer 
        src={fullscreenImage} 
        alt="Fullscreen view"
        onClose={() => setFullscreenImage(null)}
      /> */}


      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: INFO_COLOR + 'CC' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Station</span>
          </button>
          <div className="text-right">
            <div className="text-sm text-white/40">{caseStudyData.destination}</div>
            <div className="text-xl font-bold" style={{ color: ACCENT_COLOR }}>
              {caseStudyData.title}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {showOverview ? (
          // Overview Section
          <div className="space-y-16">
            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold mb-2">{caseStudyData.title}</h1>
              <div className="flex items-center justify-center gap-3">
                {/* <div className="h-1 w-24 rounded-full" style={{ backgroundColor: ACCENT_COLOR }} /> */}
                <span className="text-xl text-white/60">Destination:</span>
                <span className="text-xl font-semibold">{caseStudyData.destination}</span>
              </div>
            </div>

            {/* Background Section */}
            <div className="">
              <h2 className="text-2xl font-bold mb-6 text-white/80">Background</h2>
              <p className="text-white/60 leading-relaxed text-l">
                {caseStudyData.background}
              </p>
            </div>

            {/* Sneak Peek Section */}
            <div>
              <div className="grid md:grid-cols-3 gap-8 items-stretch">
                {/* Left: Destination (Impact Metrics) */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-8 text-left">Sneak Peeks</h2>
                  <p className="text-white/60 leading-relaxed mb-8">
                    {caseStudyData.overview}
                  </p>
                </div>
                
                {/* Right: Train Window Image Carousel */}
                <div className="relative md:col-span-2 space-y-6">
                  {/* Fullscreen overlay */}
                  {isFullscreen && (
                    <div 
                      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                      onClick={() => {
                        setIsFullscreen(false);
                        setFullscreenImage(null);  // Reset image too
                      }}
                    >
                      <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg z-10"
                        style={{ 
                          background: 'linear-gradient(145deg, #333 0%, #222 100%)',
                          border: '2px solid #555',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)'
                        }}
                      >
                        <X size={24} style={{ color: '#aaa' }} />
                      </button>
                      
                      <div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                        {/* Heavy metal train frame - fullscreen version */}
                        <div className="relative p-8 rounded-2xl" style={{ 
                          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)',
                          border: '6px solid #333',
                          boxShadow: 'inset 0 8px 32px rgba(0,0,0,0.8), 0 16px 48px rgba(0,0,0,0.6)'
                        }}>
                          <div className="relative p-3 rounded-xl overflow-hidden w-full flex items-center justify-center" style={{
                            background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)',
                            border: '4px solid #444',
                            boxShadow: 'inset 0 3px 12px rgba(0,0,0,0.9), inset 0 0 0 3px rgba(255,255,255,0.05)'
                          }}>
                            <div className="relative rounded-lg w-full overflow-hidden h-[70vh]" style={{
                              background: 'linear-gradient(145deg, #1f1f1f 0%, #111 100%)',
                              border: '2px solid rgba(255,255,255,0.08)',
                              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9)'
                            }}>
                              <img 
                                src={fullscreenImage}
                                alt={`Fullscreen preview`}
                                className="absolute inset-0 w-full h-full object-contain"
                              />
                              
                              <div className="absolute inset-0" style={{
                                background: `
                                  radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                                  linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
                                `
                              }} />
                            </div>
                            
                            {/* Window controls - fullscreen version */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 items-center">
                              <button
                                onClick={() => setCarouselIndex((carouselIndex - 1 + caseStudyData.peaks.length) % caseStudyData.peaks.length)}
                                className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                                style={{ 
                                  background: 'linear-gradient(145deg, #333 0%, #222 100%)',
                                  border: '3px solid #555',
                                  boxShadow: '0 6px 16px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)'
                                }}
                              >
                                <ChevronLeft size={24} style={{ color: '#aaa' }} />
                              </button>
                              
                              <div className="flex gap-3">
                                {caseStudyData.peaks.map((_, i) => (
                                  <div
                                    key={i}
                                    onClick={() => setCarouselIndex(i)}
                                    className="w-4 h-4 rounded-full cursor-pointer transition-all hover:scale-125"
                                    style={{ 
                                      background: i === carouselIndex ? '#aaa' : 'rgba(170,170,170,0.4)',
                                      boxShadow: i === carouselIndex ? '0 0 12px rgba(170,170,170,0.8)' : 'none',
                                      border: '2px solid rgba(255,255,255,0.2)'
                                    }}
                                  />
                                ))}
                              </div>
                              
                              <button
                                onClick={() => setCarouselIndex((carouselIndex + 1) % caseStudyData.peaks.length)}
                                className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                                style={{ 
                                  background: 'linear-gradient(145deg, #333 0%, #222 100%)',
                                  border: '3px solid #555',
                                  boxShadow: '0 6px 16px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)'
                                }}
                              >
                                <ChevronRight size={24} style={{ color: '#aaa' }} />
                              </button>
                            </div>
                            
                            {/* Corner rivets - fullscreen */}
                            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos, i) => (
                              <div
                                key={i}
                                className={`absolute w-4 h-4 rounded-full shadow-md`}
                                style={{
                                  [pos.includes('top') ? 'top' : 'bottom']: '-3px',
                                  [pos.includes('left') ? 'left' : 'right']: '-3px',
                                  background: 'radial-gradient(circle, #666 30%, #444 70%)',
                                  border: '2px solid #888',
                                  boxShadow: '0 3px 8px rgba(0,0,0,0.6)'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className="relative p-6 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => {
                      const currentImages = caseStudyData.stops[currentStop].images;
                      if (currentImages && currentImages.length > 0) {
                        setFullscreenImage(currentImages[carouselIndex]);
                        setIsFullscreen(true);
                      }
                    }}
                    style={{ 
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)',
                      border: '4px solid #333',
                      boxShadow: 'inset 0 6px 24px rgba(0,0,0,0.8), 0 12px 40px rgba(0,0,0,0.6)'
                    }}
                  >
                    {/* Riveted inner bezel */}
                    <div className="relative p-2 rounded-xl overflow-hidden w-full flex items-center justify-center" style={{
                      background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)',
                      border: '3px solid #444',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.05)'
                    }}>
                      {/* Glass pane */}
                      <div className="relative rounded-lg w-full overflow-hidden h-[20rem]" style={{
                        background: 'linear-gradient(145deg, #1f1f1f 0%, #111 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)'
                      }}>
                        {/* Image */}
                        <img 
                          src={caseStudyData.stops[currentStop].images![carouselIndex]} 
                          alt={`Stop image ${carouselIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                        
                        {/* Window glare/reflection */}
                        <div className="absolute inset-0" style={{
                          background: `
                            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                            linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
                          `
                        }} />
                        
                        {/* Dust/dirt specks */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                          backgroundImage: `
                            radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
                            radial-gradient(1px 1px at 80px 70px, rgba(255,255,255,0.2), transparent),
                            radial-gradient(1px 1px at 120px 40px, rgba(255,255,255,0.15), transparent)
                          `
                        }} />
                      </div>
                      
                      {/* Window controls - metal levers */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 items-center z-10">
                        {/* Lever-style buttons */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCarouselIndex((carouselIndex - 1 + caseStudyData.peaks.length) % caseStudyData.peaks.length);
                          }}
                          className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                          style={{ 
                            background: 'linear-gradient(145deg, #333 0%, #222 100%)',
                            border: '2px solid #555',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)'
                          }}
                        >
                          <ChevronLeft size={16} style={{ color: '#aaa' }} />
                        </button>
                        
                        {/* Dots as indicator lights */}
                        <div className="flex gap-2">
                          {caseStudyData.peaks.map((_, i) => (
                            <div
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCarouselIndex(i);
                              }}
                              className="w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-125"
                              style={{ 
                                background: i === carouselIndex ? '#aaa' : 'rgba(170,170,170,0.4)',
                                boxShadow: i === carouselIndex ? '0 0 8px rgba(170,170,170,0.8)' : 'none',
                                border: '1px solid rgba(255,255,255,0.2)'
                              }}
                            />
                          ))}
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCarouselIndex((carouselIndex + 1) % caseStudyData.peaks.length);
                          }}
                          className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                          style={{ 
                            background: 'linear-gradient(145deg, #333 0%, #222 100%)',
                            border: '2px solid #555',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)'
                          }}
                        >
                          <ChevronRight size={16} style={{ color: '#aaa' }} />
                        </button>
                      </div>
                      
                      {/* Corner rivets */}
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

                  {/* Impact metrics in 2-column grid */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                      <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                        30%
                      </div>
                      <div className="text-white/60 text-sm">
                        Noise Reduction
                      </div>
                    </div>
                    
                    <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                      <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                        10min
                      </div>
                      <div className="text-white/60 text-sm">
                        Resolution Time
                      </div>
                    </div>
                    <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                      <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                        1000+
                      </div>
                      <div className="text-white/60 text-sm">
                        Customers Served
                      </div>
                    </div>
                    <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                      <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                        $250K
                      </div>
                      <div className="text-white/60 text-sm">
                        Annual Savings
                      </div>
                    </div>
                  </div>

            {/* Before & After Section */}
            <div>
              {caseStudyData.before && caseStudyData.after && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Before */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-center text-white/80">Before</h2>
                  <div className="rounded-lg overflow-hidden h-[400px]" style={{ backgroundColor: INFO_COLOR }}>
                    <img 
                      src={caseStudyData.before} 
                      alt="Before"
                      className="w-full h-full object-cover object-left-top bg-black/20 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => caseStudyData.before && setFullscreenImage(caseStudyData.before)}
                    />
                  </div>
                  <p className="text-white/50 text-sm text-center">
                    Fragmented tools, slow troubleshooting
                  </p>
                </div>
                {/* After */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-center text-white/80">After</h2>
                  <div className="rounded-lg overflow-hidden h-[400px]" style={{ backgroundColor: INFO_COLOR }}>
                    <img 
                      src={caseStudyData.after} 
                      alt="After"
                      className="w-full h-full object-cover object-left-top bg-black/20 cursor-pointer hover:opacity-90 transition-opacity"
                      // onClick={() => setFullscreenImage(caseStudyData.after)}
                      onClick={() => caseStudyData.after && setFullscreenImage(caseStudyData.after)}
                    />
                  </div>
                  <p className="text-white/50 text-sm text-center">
                    Unified platform, 10-minute resolution
                  </p>
                </div>
              </div> )}
            </div>

            {/* Ready to Board - KEPT THE SAME */}
            <div className="text-center mt-16 space-y-6">
              <h2 className="text-3xl font-bold">Ready to Board?</h2>
               <button
    onClick={startJourney} // Changed from previous onClick
    className="px-8 py-4 rounded-full font-bold text-black text-lg transition-all hover:scale-105"
    style={{ 
      backgroundColor: ACCENT_COLOR,
      boxShadow: `0 0 30px ${ACCENT_COLOR}40`
    }}
  >
    Start Journey →
  </button>
              <button 
                onClick={onNextRoute}
                className="text-white/40 text-sm hover:text-white/80 transition-colors cursor-pointer block w-full text-center"
              >
                Or try the next route
              </button> <TrainTransition 
    isActive={showTransition}
    //lineColor="blue" // or map to case study color
    direction="right"
  />

            </div>
          </div>
        ) : (
          // Stop Details View
          <div className="space-y-8">
            {/* Progress Tracker */}
            <div className="mb-12">
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
                      className="relative z-10 group focus:outline-none"
                    >
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

                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                          {stop.station_name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Station Name */}
<div className="text-center space-y-2">
  <div className="text-sm font-mono text-white/40">
    {/* {caseStudyData.stops[currentStop].phase.toUpperCase()} PHASE */}
  </div>
  <h2 className="text-3xl font-bold">
    {caseStudyData.stops[currentStop].station_name}
  </h2>
</div>

{/* Images carousel if available */}
{caseStudyData.stops[currentStop].images && caseStudyData.stops[currentStop].images.length > 0 && (
  <div className="relative max-w-4xl mx-auto">
    {/* Regular train window */}
    <div 
      className="relative p-6 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" 
  onClick={() => {
    const currentImages = caseStudyData.stops[currentStop].images;
    if (currentImages && currentImages.length > 0) {
      setFullscreenImage(currentImages[carouselIndex]);
      setIsFullscreen(true);
    }
  }}
      style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)',
        border: '4px solid #333',
        boxShadow: 'inset 0 6px 24px rgba(0,0,0,0.8), 0 12px 40px rgba(0,0,0,0.6)'
      }}
    >
      {/* Riveted inner bezel */}
      <div className="relative p-2 rounded-xl overflow-hidden w-full flex items-center justify-center" style={{
        background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)',
        border: '3px solid #444',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9), inset 0 0 0 2px rgba(255,255,255,0.05)'
      }}>
        {/* Glass pane */}
        <div className="relative rounded-lg w-full overflow-hidden h-[20rem]" style={{
          background: 'linear-gradient(145deg, #1f1f1f 0%, #111 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)'
        }}>
          {/* Image */}
          <img 
            src={caseStudyData.stops[currentStop].images[carouselIndex]} 
            alt={`Stop image ${carouselIndex + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
          />
          
          {/* Window glare/reflection */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
              linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
            `
          }} />
          
          {/* Dust/dirt specks */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 80px 70px, rgba(255,255,255,0.2), transparent),
              radial-gradient(1px 1px at 120px 40px, rgba(255,255,255,0.15), transparent)
            `
          }} />
        </div>
        
        {/* Window controls - metal levers */}
{caseStudyData.stops[currentStop].images?.length > 1 && (
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 items-center z-10">
    {/* Lever-style buttons */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        const len = caseStudyData.stops[currentStop].images!.length;
        setCarouselIndex((carouselIndex - 1 + len) % len);
      }}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
      style={{ 
        background: 'linear-gradient(145deg, #333 0%, #222 100%)',
        border: '2px solid #555',
        boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)'
      }}
    >
      <ChevronLeft size={16} style={{ color: '#aaa' }} />
    </button>
    
    {/* Dots as indicator lights */}
    <div className="flex gap-2">
      {caseStudyData.stops[currentStop].images!.map((_, i) => (
        <div
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            setCarouselIndex(i);
          }}
          className="w-3 h-3 rounded-full cursor-pointer transition-all hover:scale-125"
          style={{ 
            background: i === carouselIndex ? '#aaa' : 'rgba(170,170,170,0.4)',
            boxShadow: i === carouselIndex ? '0 0 8px rgba(170,170,170,0.8)' : 'none',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        />
      ))}
    </div>
    
    <button
      onClick={(e) => {
        e.stopPropagation();
        const len = caseStudyData.stops[currentStop].images!.length;
        setCarouselIndex((carouselIndex + 1) % len);
      }}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
      style={{ 
        background: 'linear-gradient(145deg, #333 0%, #222 100%)',
        border: '2px solid #555',
        boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)'
      }}
    >
      <ChevronRight size={16} style={{ color: '#aaa' }} />
    </button>
  </div>
)}

        
        {/* Corner rivets */}
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

{/* Content */}

            

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-l text-white/80 leading-relaxed">
                {caseStudyData.stops[currentStop].content}
              </p>

             {/* Quote if available */}
            {caseStudyData.stops[currentStop].quote && (
              <blockquote 
                className="border-l-4 pl-6 py-4 my-8 italic text-white/60 flex items-start gap-4"
                style={{ borderColor: ACCENT_COLOR }}
              >
                <div className="flex-1">
                  "{caseStudyData.stops[currentStop].quote}"
                  {caseStudyData.stops[currentStop].quoteAuthor && (
                    <footer className="text-sm mt-4 not-italic text-white/40 flex items-center gap-3 pt-2">
                      {caseStudyData.stops[currentStop].quoteImage && (
                        <img 
                          src={caseStudyData.stops[currentStop].quoteImage} 
                          alt={caseStudyData.stops[currentStop].quoteAuthor}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                        />
                      )}
                      <span>— {caseStudyData.stops[currentStop].quoteAuthor}</span>
                    </footer>
                  )}
                </div>
              </blockquote>
            )}

              {/* Insights if available */}
              {caseStudyData.stops[currentStop].insights && (
                <div className="rounded-lg p-6 my-8" style={{ backgroundColor: INFO_COLOR }}>
                  <h3 className="text-lg font-bold mb-4 text-white/90">Key Insights</h3>
                  <ul className="space-y-2">
                    {caseStudyData.stops[currentStop].insights.map((insight: string, i: number) => (
                      <li key={i} className="text-white/70">{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact if available */}
              {caseStudyData.stops[currentStop].impact && (
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                    <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                      {caseStudyData.stops[currentStop].impact.metric1}
                    </div>
                    <div className="text-white/60">
                      {caseStudyData.stops[currentStop].impact.label1}
                    </div>
                  </div>
                  <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                    <div className="text-3xl font-bold mb-2" style={{ color: ACCENT_COLOR }}>
                      {caseStudyData.stops[currentStop].impact.metric2}
                    </div>
                    <div className="text-white/60">
                      {caseStudyData.stops[currentStop].impact.label2}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-white/10">
              <button
                onClick={prevStop}
                disabled={currentStop === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                style={{ backgroundColor: INFO_COLOR }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = SECONDARY_COLOR)}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = INFO_COLOR}
              >
                <ChevronLeft size={20} />
                Previous Stop
              </button>
              
              <button
                onClick={() => setShowOverview(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: INFO_COLOR,
                    boxShadow: `0 0 20px ${INFO_COLOR}40` }}
                // onMouseEnter={(e) => e.currentTarget.style.backgroundColor = SECONDARY_COLOR}
                // onMouseLeave={(e) => e.currentTarget.style.backgroundColor = INFO_COLOR}
              >
                Back to Overview
              </button>

              {currentStop < caseStudyData.stops.length - 1 ? (
                <button
                  onClick={nextStop}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: INFO_COLOR,
                    boxShadow: `0 0 20px ${INFO_COLOR}40`
                  }}
                >
                  Next Stop
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-black transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: ACCENT_COLOR,
                    boxShadow: `0 0 20px ${ACCENT_COLOR}40`
                  }}
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