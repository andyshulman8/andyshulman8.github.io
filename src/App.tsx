import { useState, useEffect, useRef } from 'react';
import { Train, MapPin, Info, ChevronRight } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useNavigate, Link } from 'react-router-dom';
import { FullscreenImageViewer } from './components/FullscreenImageViewer.tsx';
import { TrainCar } from './components/Train/TrainCar.tsx';
import { SkillsBoard } from './components/Skills/SkillsBoard.tsx';
import { BackToTopButton } from './components/Layout/BackToTopButton.tsx';
import './styles/animations.css';
import { caseStudies } from './data/caseStudies';
import { testimonials } from './data/testimonials';
import {
  THEME_COLOR,
  INFO_COLOR,
  BACK_COLOR,
  SILVER,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  TEXT_MUTED,
  GA_ID,
  ANIMATION,
  UI,
} from './constants/theme';
import { useBackToTop } from './hooks/index';

interface Spark {
  id: number;
  angle: number;
  distance: number;
  duration: number;
  x: number;
  y: number;
}

export default function DesignCentralStation() {
  const navigate = useNavigate();

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [processLoaded, setProcessLoaded] = useState(false);
  const showBackToTop = useBackToTop(UI.backToTopThreshold);

  const [sparks, setSparks] = useState<Spark[]>([]);
  const trainRef = useRef<HTMLDivElement>(null);
  const rearCarRef = useRef<HTMLDivElement>(null);

  const handleTrainClick = () => {
    const rearCar = rearCarRef.current;
    
    if (rearCar) {
      const rect = rearCar.getBoundingClientRect();
      // Position sparks at the bottom-left of the rear car
      const sparkX = rect.left + 8; // Small offset from left edge
      const sparkY = rect.bottom - 4; // Bottom of the car

      const newSparks: Spark[] = Array.from({ length: UI.sparkCount }, (_, i) => ({
        id: Date.now() + i,
        angle: Math.random() * UI.sparkAngle - (UI.sparkAngle / 2),
        distance: UI.sparkDistance.min + Math.random() * (UI.sparkDistance.max - UI.sparkDistance.min),
        duration: UI.sparkDuration.min + Math.random() * (UI.sparkDuration.max - UI.sparkDuration.min),
        x: sparkX,
        y: sparkY
      }));
      
      setSparks(newSparks);
      setTimeout(() => setSparks([]), ANIMATION.sparkFly);
    }
  };

  useEffect(() => {
    const scriptId = 'ga-script';
    
    if (document.getElementById(scriptId)) return;
    
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', GA_ID, {
      page_path: window.location.pathname,
    });
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
                  ref={trainRef}
                  className="train-animation cursor-pointer"
                  onMouseOver={handleTrainClick}
                  role="button"
                  aria-label="Click for train announcement"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleTrainClick()}
                >
                  <div className="flex items-end gap-0">
                    <div ref={rearCarRef} className="rear-car">
                      <TrainCar variant="rear" />
                    </div>
                    <TrainCar variant="middle" />
                    <TrainCar variant="middle" />
                    <TrainCar variant="front" />
                  </div>
                </div>
              </div>
            </div>


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
      style={{ boxShadow: `${UI.infoBoxShadow.x}px ${UI.infoBoxShadow.y}px ${UI.infoBoxShadow.blur}px ${INFO_COLOR}10` }}
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
                  boxShadow: `0 0 ${UI.cornerAccentLights.glowIntensity}px ${SILVER}`,
                }}
              />
              <div
                className="absolute -top-2 -right-2 w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: SILVER,
                  boxShadow: `0 0 ${UI.cornerAccentLights.glowIntensity}px ${SILVER}`,
                  animationDelay: `${UI.animationDelays.staggerSmall}s`,
                }}
              />
              <div
                className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: SILVER,
                  boxShadow: `0 0 ${UI.cornerAccentLights.glowIntensity}px ${SILVER}`,
                  animationDelay: `${UI.animationDelays.staggerMedium}s`,
                }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full animate-pulse"
                style={{
                  backgroundColor: SILVER,
                  boxShadow: `0 0 ${UI.cornerAccentLights.glowIntensity}px ${SILVER}`,
                  animationDelay: `${UI.animationDelays.staggerLarge}s`,
                }}
              />
            </div>
          </div>
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
            className={`absolute inset-0 transition-opacity duration-${UI.imageLoadingDuration} ${
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
            className={`cursor-pointer hover:opacity-90 transition-opacity duration-${UI.imageLoadingDuration} ${
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
              style={{ boxShadow: `0 0 20px ${INFO_COLOR}${Math.round(UI.shadowOpacities.default * 255).toString(16).padStart(2, '0')}` }}
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
                      alt=""
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
            <div className="mt-8 text-sm" style={{ color: TEXT_SECONDARY }}>
              Montrose, Colorado • <u><a href="https://www.linkedin.com/in/andrea-shulman/">LinkedIn</a></u> • andyshulman8@gmail.com
             </div>
            </footer>

            <BackToTopButton isVisible={showBackToTop} />
        </div>
         <Analytics /> 
         <SpeedInsights />
      </div>
  );
}