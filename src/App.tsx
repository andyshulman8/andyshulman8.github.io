import { useState, useEffect, useRef } from 'react';
import { Train, MapPin, Info, ChevronRight, ChevronUp } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useNavigate, Link } from 'react-router-dom';
import { FullscreenImageViewer } from './components/FullscreenImageViewer.tsx';
// import ReactGA from "react-ga4";

// ReactGA.initialize("G-5KXX19NNJM");
// ReactGA.send({
//   hitType: "pageview",
//   page: window.location.pathname + window.location.search,
// });

export {};

declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface Spark {
  id: number;
  angle: number;
  distance: number;
  duration: number;
  x: number;
  y: number;
}

const THEME_COLOR = '#424141';
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';
const SILVER = '#dfe1e5ff';
const TEXT_SECONDARY = '#a8adb3';
const TEXT_TERTIARY = '#868b92';
const TEXT_MUTED = '#9ca3af';
// const GA_ID = 'G-5KXX19NNJM'; 

const TRAIN_BODY_COLOR = THEME_COLOR;
const TRAIN_BORDER_COLOR = SILVER;
const TRAIN_WHEEL_COLOR = "#111827";

interface TrainCarProps {
  variant?: 'rear' | 'middle' | 'front';
}

const TrainCar = ({ variant = 'middle' }: TrainCarProps) => {
  const isRear = variant === 'rear';
  const isFront = variant === 'front';
  const isMiddle = variant === 'middle';

  // Rear car has 2 windows, middle cars have 5 windows, front car has 1 large window
  const windowCount = isRear ? 2 : isFront ? 1 : 5;
  const hasRedLight = isRear;

  return (
    <div
      className={`relative w-16 h-10 border-2 shadow-lg flex-shrink-0 ${
        isRear ? 'rounded-l-3xl' : isFront ? 'rounded-r-3xl' : ''
      } ${isMiddle ? 'border-y-2 border-r-2' : ''}`}
      style={{
        backgroundColor: TRAIN_BODY_COLOR,
        borderColor: TRAIN_BORDER_COLOR,
      }}
    >
      {/* Side lights */}
      {(!isRear && !isFront) && (
      <div className="absolute top-2 left-3 bottom-3 w-0.5 bg-yellow-400/60" />
      )}
      {(!isRear && !isFront) && (
        <div className="absolute top-2 right-3 bottom-3 w-0.5 bg-yellow-400/60" />
      )}

      {/* Windows */}
      <div className={`absolute top-2 ${isRear ? 'left-3 right-1' : 'left-1 right-1'} h-5 flex ${isRear ? 'gap-0.5' : isMiddle ? 'gap-0.5' : 'gap-0'}`}>
        {Array.from({ length: windowCount }).map((_, i) => (
          <div key={i} className="flex-1 border border-white/30 bg-white/10" />
        ))}
        {isMiddle && (
          <>
            <div className="w-1 bg-current opacity-20" />
            <div className="flex-1 border border-white/30 bg-white/10" />
            <div className="w-1 bg-current opacity-20" />
            <div className="flex-1 border border-white/30 bg-white/10" />
          </>
        )}
      </div>

      {/* Red light indicator (rear only) */}
      {hasRedLight && (
        <div className="absolute top-7 left-2 w-2 h-2 bg-red-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
      )}

      {/* Wheels */}
      <div
        className="absolute -bottom-1.5 left-3 w-2.5 h-2.5 rounded-full border-2"
        style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }}
      />
      <div
        className={`absolute -bottom-1.5 ${isFront ? 'right-4' : 'right-2.5'} w-${isFront ? '3' : '2.5'} h-${isFront ? '3' : '2.5'} rounded-full border-2`}
        style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
          width: isFront ? '12px' : '10px',
          height: isFront ? '12px' : '10px',
        }}
      />

      {/* Connection piece */}
      {!isFront && (
        <div
          className="absolute -right-1 top-2 bottom-2 w-2 bg-black/40 border-y border-white/20"
          style={{
            clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)',
          }}
        />
      )}

      {/* Front car specific: top label and front light */}
      {isFront && (
        <>
          <div className="absolute top-0 left-0 right-0 h-2 bg-orange-700 flex items-center justify-center rounded-tr-3xl overflow-hidden">
            <div className="text-[8px] font-bold text-white">EXPRESS</div>
          </div>

          <div className="absolute top-3 left-2 right-3 h-6 rounded-md border border-white/40 bg-gradient-to-b from-sky-300/20 to-white/5 shadow-inner" />

          <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-lg animate-pulse border border-yellow-500" />
        </>
      )}
    </div>
  );
};

const SkillsBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            // Add delay before starting animation
            setTimeout(() => {
              setIsVisible(true);
            }, 500); // 500ms delay after becoming visible
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px'
      }
    );

    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    return () => {
      if (boardRef.current) {
        observer.unobserve(boardRef.current);
      }
    };
  }, [isVisible]);

  const skillCategories = [
    { title: 'User Research', items: ['Pendo', 'Accessibility', 'User Interviews', 'Usability Testing', 'Heuristic Evaluation'] },
    { title: 'Infrastructure', items: ['Design Systems', 'Information Architecture', 'Systems Design', 'Behavior Design', 'Material UI'] },
    { title: 'Interaction', items: ['Figma', 'Rapid Prototyping', 'User Flows', 'Journey Mapping', 'AI Design'] },
    { title: 'Engineering', items: ['Python, HTML, CSS, C++', 'Prompt Design', 'Cursor & Framer', 'APIs & Automation', 'Git'] }
  ];

  return (
    <div className="mb-12" ref={boardRef}>
      <h3 className="text-white/90 text-2xl font-bold mb-4">Operating the System</h3>
      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 font-mono shadow-2xl">
        <div className="split-flap-board grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {skillCategories.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-3">
              <div className="text-sm uppercase tracking-wider" style={{ color: SILVER }}>
                {cat.title}
              </div>
              <div className="space-y-2">
                {cat.items.map((it, iIdx) => (
                  <div
                    key={iIdx}
                    className={`split-flap-item ${isVisible ? 'settled' : 'searching'}`}
                    style={{ 
                      '--settle-delay': `${(cIdx * 5 + iIdx) * 300}ms`,
                      color: SILVER
                    } as React.CSSProperties}
                  >
                    <div className="flap">
                      <div className="flap-front">{it}</div>
                      <div className="flap-back"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .split-flap-board { 
            perspective: 1000px; 
          }
          
          .split-flap-item {
            position: relative;
            height: 40px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.25rem;
            overflow: hidden;
          }
          
          .flap {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s;
          }
          
          .flap-front,
          .flap-back {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 0.75rem;
            font-size: 0.875rem;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          .flap-front {
            background: rgba(0, 0, 0, 0.8);
            z-index: 2;
          }
          
          .flap-back {
            background: rgba(30, 30, 30, 0.9);
            transform: rotateX(180deg);
          }
          
          .split-flap-item.searching .flap {
            animation: flip-search 0.8s linear infinite;
          }
          
          .split-flap-item.settled .flap {
            animation: flip-settle 1s cubic-bezier(.2,.8,.2,1) forwards;
            animation-delay: var(--settle-delay);
          }
          
          @keyframes flip-search {
            0% { transform: rotateX(0deg); }
            100% { transform: rotateX(360deg); }
          }
          
          @keyframes flip-settle {
            0% { transform: rotateX(0deg); }
            25% { transform: rotateX(90deg); }
            50% { transform: rotateX(180deg); }
            75% { transform: rotateX(270deg); }
            100% { transform: rotateX(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default function DesignCentralStation() {
  const navigate = useNavigate();

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [processLoaded, setProcessLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [sparks, setSparks] = useState<Spark[]>([]);
  const handleTrainClick = () => {

    // Get the position of the rear car (first car in the flex layout)
    const trainElement = document.querySelector('.train-animation');
    const rearCar = trainElement?.querySelector('.rear-car');
    
    if (rearCar) {
      const rect = rearCar.getBoundingClientRect();
      // Position sparks at the bottom-left of the rear car
      const sparkX = rect.left + 8; // Small offset from left edge
      const sparkY = rect.bottom - 4; // Bottom of the car


      const newSparks: Spark[] = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        angle: Math.random() * 90 - 45,
        distance: 20 + Math.random() * 30,
        duration: 0.5 + Math.random() * 0.5,
        x: sparkX,
        y: sparkY
      }));
      
      setSparks(newSparks);
      setTimeout(() => setSparks([]), 1000);
    }
  };

  // useEffect(() => {
  //   const scriptId = 'ga-script';
    
  //   if (document.getElementById(scriptId)) return;
    
  //   const script = document.createElement("script");
  //   script.id = scriptId;
  //   script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  //   script.async = true;
  //   document.head.appendChild(script);

  //   window.dataLayer = window.dataLayer || [];
    
  //   function gtag(...args: any[]) {
  //     window.dataLayer.push(args);
  //   }
    
  //   gtag('js', new Date());
  //   gtag('config', GA_ID, {
  //     page_path: window.location.pathname,
  //   });
  // }, []);

  const caseStudies = [
    {
      id: 'logs',
      name: 'Logs: Rags to Riches',
      year: 2025,
      line: 'Red Line',
      color: '#E53935',
      thumbnail: '/images/Home/Thumbs/1.webp',
      tagline: 'From niche add-on to flagship product',
      impact: 'Cut troubleshooting from hours to 10 minutes',
      methodology: 'Stanford d.school',
      route: ['User Interviews', 'Empathy Maps', 'Define Problem', 'Converge', 'Build Prototype', 'Test']
    },
    {
      id: 'alerts',
      name: 'Smarter Alerts',
      year: 2025,
      line: 'Purple Line',
      color: '#8E24AA',
      thumbnail: '/images/Home/Thumbs/2.webp',
      tagline: 'Cut alert noise 30% and laid AI foundation',
      impact: '30% reduction in alert fatigue',
      methodology: 'Behavior Design',
      route: ['User Interviews', 'Clarify Outcome', 'Simplify Behavior', 'Make Easier', 'Build Flows', 'Test']
    },
    {
      id: 'data',
      name: 'Secure Data',
      year: 2025,
      line: 'Red + Green Lines',
      color: '#43A047',
      thumbnail: '/images/Home/Thumbs/loyola.webp',
      tagline: 'Protected 17,000 students with AI-powered search',
      impact: 'Future-proofed log management for compliance',
      methodology: 'Mixed Route',
      route: ['User Interviews', 'Define Problem', 'Identify Causes', 'Design Mechanisms', 'Build Prototype', 'Test']
    },
    {
      id: 'team',
      name: 'Empowered Team',
      year: 2020,
      line: 'Blue Line',
      color: '#1E88E5',
      thumbnail: '/images/Home/Thumbs/align.webp',
      tagline: 'Scaled design thinking across 17 global leaders',
      impact: '3 piloted solutions in 12 weeks',
      methodology: 'Business Strategy',
      route: ['User Interviews', 'Map System', 'Identify Levers', 'Brainstorm', 'Shape Strategy', 'Test']
    },
    {
      id: 'future',
      name: 'Imagining the Future',
      year: 2019,
      line: 'Green Line',
      color: '#43A047',
      thumbnail: '/images/Home/Thumbs/sesi.webp',
      tagline: 'Built confidence framework into new museum',
      impact: '100K+ visitors since 2022',
      methodology: 'Sustainability',
      route: ['User Interviews', 'Map System', 'Identify Causes', 'Shape Strategy', 'Evaluation Plan', 'Test']
    },
    {
      id: 'health',
      name: 'Health Frameworks',
      year: 2019,
      line: 'Purple + Blue Lines',
      color: '#8E24AA',
      thumbnail: '/images/Home/Thumbs/bose.webp',
      tagline: 'Aligned fragmented health teams under uncertainty',
      impact: '40% reduction in expert dependency',
      methodology: 'Mixed Route',
      route: ['User Interviews', 'Clarify Outcome', 'Map System', 'Build Prototype', 'Test']
    }
  ];

  const testimonials = [
    {
      quote: "Andy played a crucial role in launching this new product: from shaping the user experience and performing deep UX research to ensuring seamless integration of design and workflows across the broader LogicMonitor platform. What impressed me most was his ability to translate complex technical requirements into intuitive user experiences.",
      author: "David Femino",
      role: "Sr. Manager, PM - Cloud & Logs",
      company: "LogicMonitor",
      avatar: '/images/Home/David.webp'
    },
    {
      quote: "Beyond the enthusiasm, Andy is a model of professionalism and is extremely knowledgeable about the intricacies of enterprise UX, AI, and AIOps. The next organization will gain a truly valuable team member who elevates the entire design process through smart strategy, collaborative spirit, and a deep technical understanding. Highly recommended!",
      author: "Richard Huddleston",
      role: "Technical Fellow",
      company: "LogicMonitor",
      avatar: '/images/Home/richard.webp'
    },
    {
      quote: "He really used his holistic approach to make some real impact for us as a business and for our customers. Andy has been fantastic as a coach, motivator and project leader to our global cross functional teams. His fast approach towards getting empathetic insights from customers and transforming it into iterative testing was refreshing.",
      author: "Volker Probst",
      role: "Customer Experience VP",
      company: "Align Technology",
      avatar: '/images/Home/volker.webp'
    }
  ];

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen text-[#FFFAFB]" style={{ backgroundColor: BACK_COLOR }}>
      <div className="text-white" style={{ backgroundColor: BACK_COLOR }}>
            
        <a href="#main-content" className="skip-link">
            Skip to main content
        </a>

        <header className="relative h-[33vh] min-h-[300px] overflow-hidden bg-center bg-cover bg-[url('/images/Home/hero1.png')] md:bg-[url('/images/Home/hero2.png')]">
          {fullscreenImage && (
            <FullscreenImageViewer
              src={fullscreenImage}
              onClose={() => setFullscreenImage(null)}
            />
          )}

          <section className="relative h-[33vh] min-h-[300px] overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/images/Home/test.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0"  style={{ backgroundColor: `${BACK_COLOR}60` }}></div>
            <div className="relative h-full flex items-center px-6 md:pl-12 z-10">
              <div className="text-left">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    Final destination: <span className='metal-heading'>Impact</span>
                  </h1>
                </div>
                <h2 className="text-lg md:text-xl text-white/80 font-semibold mb-4">Designing clarity for high-stakes systems</h2>
                <br/> <h2 className="" style={{ color: TEXT_TERTIARY }}>Andy Shulman · Senior UX Designer</h2>
              </div>
            </div>
          </section>
        </header>
      
        <main id="main-content" tabIndex={-1}>
      
          <section className=" px-6 w-full mx-auto" aria-label="Train">
            <div className="relative mb-12 h-24 flex items-bottom">
              
              {/* {trainClicked && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 z-30 animate-bounce-in">
                  <div className="relative bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl border-2 border-gray-300 whitespace-nowrap">
                    <span className="font-bold text-sm">{trainMessage}</span>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-0 h-0 border-l-9 border-r-9 border-t-9 border-transparent border-t-gray-300" />
                  </div>
                </div>
              )} */}
              
              {sparks.map((spark) => (
                <div
                  key={spark.id}
                  className="fixed z-30 pointer-events-none"
                  style={{
                    left: `${spark.x}px`,
                    top: `${spark.y}px`,
                    transform: `rotate(${spark.angle}deg) translateY(-${spark.distance}px)`,
                    animation: `spark-fly ${spark.duration}s ease-out forwards`,
                    '--angle': `${spark.angle}deg`
                  } as React.CSSProperties}
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg" 
                       style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)' }} />
                </div>
              ))}

              <div className="absolute left-0 right-0 bottom-4 flex items-center z-0">
                <div
                  className="w-full border-t-4 border-dashed"
                  style={{ borderColor: SILVER }}
                ></div>
              </div>

              <div
                className="absolute left-0 right-0 bottom-4 transform -translate-y-1/4 h-1 z-10"
                style={{ backgroundColor: `${SILVER}`,  filter: 'brightness(0.4)'}}
              ></div>

              <div className="absolute top-1 left-0 w-full h-full flex items-center z-20">
                <div 
                  className="train-animation cursor-pointer"
                  onMouseOver={handleTrainClick}
                  role="button"
                  aria-label="Click for train announcement"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrainClick()}
                >
                  <div className="flex items-end gap-0">
                    <div className="rear-car">
                      <TrainCar variant="rear" />
                    </div>
                    <TrainCar variant="middle" />
                    <TrainCar variant="middle" />
                    <TrainCar variant="front" />
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes train-move {
                0% { transform: translateX(-200px); }
                100% { transform: translateX(calc(100vw + 200px)); }
              }
              
              .train-animation {
                animation: train-move 15s linear infinite;
              }
              
              @keyframes bounce-in {
                0% { transform: translateX(-50%) scale(0); opacity: 0; }
                50% { transform: translateX(-50%) scale(1.1); }
                100% { transform: translateX(-50%) scale(1); opacity: 1; }
              }
              
              .animate-bounce-in {
                animation: bounce-in 0.3s ease-out forwards;
              }
              
              @keyframes spark-fly {
                0% { 
                  opacity: 1; 
                  transform: rotate(var(--angle)) translateY(0) scale(1);
                }
                100% { 
                  opacity: 0; 
                  transform: rotate(var(--angle)) translateY(-50px) scale(0.3);
                }
              }
            `}</style>
          </section>

          <section className="px-6 w-full mx-auto" aria-label="Case studies">
            <div className="text-left mt-6 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                Case Studies
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((project) => (
                <Link
                  key={project.id}
                  to={`/${project.id}`}
                  onClick={() => navigate(`/${project.id}`)}
                  className="group relative bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all cursor-pointer overflow-hidden block"
                >
                  <div className="mb-4">
                    {project.thumbnail && (
                      <img
                        src={project.thumbnail}
                        alt={`${project.name} thumbnail`}
                        className="w-full h-24 md:h-28 object-cover rounded-md mb-4"
                      />
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-black/60 text-white/70 px-2 py-1 rounded-md text-xs border border-white/10">
                    est: {project.year}
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:text-white group-hover:translate-x-1 transition-all" style={{ color: TEXT_SECONDARY }}/>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4">{project.tagline}</p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: SILVER }}/>
                      <span className="" style={{ color: TEXT_TERTIARY }}>{project.impact}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
<section className="py-16 px-6" aria-label="Information Booth">
  <div className="grid gap-8">
    {/* Information Booth Panel */}
    <div
      className="relative bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
      style={{ boxShadow: `0 4px 24px ${INFO_COLOR}10` }}
    >
      {/* Top chevron banner with glowing INFORMATION sign inside */}
      <div className="relative flex justify-center mb-10">
        <div className="relative">
          {/* Blue rectangle banner */}
          <div className="h-20 px-4 bg-blue-600 flex items-center justify-center relative">
            {/* Glowing INFORMATION sign - INSIDE the banner */}
            <div className="relative inline-block">
              {/* Backlight glow */}
              <div
                className="absolute inset-0 rounded-lg blur-xl opacity-50"
                style={{
                  backgroundColor: INFO_COLOR,
                  transform: 'scale(1.2)',
                }}
              />
              
              {/* Sign face */}
              <div className="relative flex items-center gap-3 px-1 py-2">
                <Info className="w-8 h-8 relative z-10" style={{ color: SILVER }} />
                <h2 className="text-3xl font-bold text-white relative z-10 tracking-wide">
                  INFORMATION
                </h2>
              </div>
              
              {/* Corner accent lights */}
              <div
                className="absolute -top-2 -left-2 w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: SILVER,
                  boxShadow: `0 0 10px ${SILVER}`,
                }}
              />
              <div
                className="absolute -top-2 -right-2 w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: SILVER,
                  boxShadow: `0 0 10px ${SILVER}`,
                  animationDelay: '0.5s',
                }}
              />
              <div
                className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: SILVER,
                  boxShadow: `0 0 10px ${SILVER}`,
                  animationDelay: '1s',
                }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: SILVER,
                  boxShadow: `0 0 10px ${SILVER}`,
                  animationDelay: '1.5s',
                }}
              />
            </div>
          </div>
          
          {/* Downward chevron triangle
          <div
            className="absolute left-1/2 -bottom-6 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: '48px solid transparent',
              borderRight: '48px solid transparent',
              borderTop: '24px solid rgb(37, 99, 235)',
            }}
          /> */}
        </div>
      </div>

      {/* Content below chevron */}
      <div className="mt-8">
        <h3 className="text-white/90 text-2xl font-bold mb-4">
          The Complete Transit System
        </h3>
        <p className="text-left mb-6" style={{ color: TEXT_TERTIARY }}>
          This is my design process map. Each project follows a unique route
          through these stations, combining methodologies from Stanford d.school,
          Business Strategy, Behavior Design, and Sustainability frameworks.
        </p>

        {/* Process Map Image */}
        <div className="bg-[#f5e6d3] rounded-xl border border-black/20 overflow-hidden relative aspect-video">
          {/* Loading skeleton */}
          <div
            aria-hidden={processLoaded}
            className={`absolute inset-0 transition-opacity duration-500 ${
              processLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-full rounded-md bg-gradient-to-br from-[#f2e8df] to-[#e6dccf] animate-pulse" />
            </div>
          </div>

          {/* Spinner while loading */}
          {!processLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Actual image */}
          <img
            src="/images/Home/process.webp"
            alt="Design process map"
            loading="lazy"
            decoding="async"
            onLoad={() => setProcessLoaded(true)}
            onError={() => setProcessLoaded(true)}
            className={`cursor-pointer hover:opacity-90 transition-opacity duration-500 ${
              processLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setFullscreenImage('/images/Home/process.webp')}
          />
        </div>
      </div>

      {/* Skills Panel */}
      <div className="pt-12">
        <SkillsBoard />
      </div>

      {/* About Me Panel */}
      <div className="pt-12">
        <div className="flex items-start gap-4 mb-6">
          {/* Headshot */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
               style={{ borderColor: SILVER }}>
            <img
              src="/images/Home/headshot.png"
              alt="Andy Shulman"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <h3 className="text-white/90 text-2xl font-bold self-center">
            About the Conductor
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">

            <p className="text-white/80 leading-relaxed">
              I'm Andy, a Senior UX Designer with{' '}
              <span className="relative inline-block group">
                <u>
                  <a 
                    aria-label="Andy Shulman's resume (opens in new tab)" 
                    href="https://drive.google.com/file/d/1m1BwzMNuZySV6jw0Jr3FmXCiecmqptiu/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    over 5 years experience
                  </a>
                </u>
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  See Resume →
                </span>
              </span>{' '}
              transforming complex enterprise systems into intuitive experiences. I have a Master's in Sustainability Science from Stanford
                          and a skillset that brings together design thinking, behavior design, business strategy,
                          and systems thinking.
            </p>
          
            <p className="text-white/80 leading-relaxed">
              My work spans enterprise B2B SaaS, health tech, to mission-driven organizations.
              I've designed AI-driven features, laid foundations for IBM partnerships, and helped
              teams from cancer treatment centers to global energy companies work more efficiently.
            </p>
            <p className="text-white/80 leading-relaxed">
              I am currently based in Montrose, Colorado with my adventure dog, exploring opportunities
              in climate tech and mental health spaces. Check out my adventures:
            </p>
          </div>

          <div className="md:col-span-1 h-full">
            <div
              className="bg-[#0f0f0f] border-2 border-white/10 rounded-lg overflow-hidden h-full hover:border-white/30 transition-all duration-300"
              style={{ boxShadow: `0 0 20px ${INFO_COLOR}20` }}
            >
              <div className="w-full h-full aspect-video">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1QR8iQSZT8-UmjddIlJR1cA6dtaqnYTHc"
                  className="w-full h-full"
                  title="Map preview"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Passenger Testimonials (section background matching All Aboard) */}
      <section className="mb-16 py-10 px-6 w-full mx-auto" style={{ backgroundColor: BACK_COLOR }} aria-label="Passenger Testimonials">
        {/* Ticket Banner Separator with Testimonials (match All Aboard background) */}
        <div className="relative py-12 px-6 overflow-hidden border-y-0" style={{ backgroundColor: BACK_COLOR }}>
          <img src="/images/Home/tickets.webp" alt="Tickets banner" className="absolute top-0 rounded left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0" />

          {/* Content overlay */}
          <div className="relative z-10 w-full mx-auto">
            <div className="flex items-left justify-left gap-4">
              <h3 className="text-3xl font-bold text-white">Passenger Testimonials</h3>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8"></div>

        {/* Passenger Testimonials Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="relative bg-white/5 border border-white/10 p-10 rounded-2xl overflow-hidden group transition-all hover:bg-white/[0.07]"
            >
              <div 
                className="absolute top-2 left-4 text-7xl font-serif opacity-10 transition-transform group-hover:-translate-y-1 select-none"
                style={{ color: SILVER }}
              >
                “
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <p className="text-white/80 italic mb-8 leading-relaxed flex-grow">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t" style={{borderColor: SILVER}}>
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt=""//{testimonial.author}
                      className="w-12 h-12 rounded-full object-cover border-2"
                      style={{color: SILVER, borderColor: SILVER}}
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs" 
                      style={{ color: BACK_COLOR, backgroundColor: SILVER }}
                    >
                      {testimonial.author.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                  )}
                  
                  <div>
                    <div className="font-bold text-sm tracking-tight" style={{ color: SILVER }}>
                      {testimonial.author}
                    </div>
                    <div className="text-[11px] uppercase tracking-widest leading-tight" style={{ color: TEXT_SECONDARY }}>
                      {testimonial.role} <br />
                      <span className="" style={{ color: TEXT_MUTED }}>{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="absolute bottom-[-15px] right-4 text-7xl font-serif opacity-10 transition-transform group-hover:translate-y-1 select-none"
                style={{ color: SILVER }}
              >
                ”
              </div>
            </div>
          ))}
        </div>
      </section>
</main>
            

          {/* Contact - Thanks for Riding */}
          <footer className="text-center bg-black/40 py-12 border-t-2 " style={{ borderColor: `${THEME_COLOR}30` }}>
            <Train className="w-16 h-16 mx-auto mb-6" style={{ color: THEME_COLOR }}/>
            <h3 className="text-4xl font-bold mb-4">Thanks for Riding!</h3>
            <p className="text-2xl text-white/80 mb-8">
              Let's build your next impactful experience
            </p>
            {/*
            <div className="flex flex-wrap items-center justify-center gap-6 max-w-2xl mx-auto">
              <a 
                href="mailto:andyshulman8@gmail.com" 
                className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Andy
              </a>
              
            </div>
            */}
            <div className="mt-8 text-sm" style={{ color: TEXT_SECONDARY }}>
              Montrose, Colorado • <u><a href="https://www.linkedin.com/in/andrea-shulman/">LinkedIn</a></u> • andyshulman8@gmail.com
             </div>
            </footer>

            {/* Back to top button */}
            {showBackToTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-white/6 hover:bg-white/10 backdrop-blur-md transition-colors shadow-lg"
              >
                <ChevronUp className="w-5 h-5 text-white/90" />
              </button>
            )}
        </div>
         <Analytics /> 
         <SpeedInsights />
      </div>
    // </div>
  );
}