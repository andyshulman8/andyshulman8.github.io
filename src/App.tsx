import { useState, useEffect, useRef, lazy } from 'react';
import { Train, MapPin, Info, ChevronRight, ChevronUp } from 'lucide-react';
// Lazy-load case study pages to reduce initial bundle size and improve load time
const CaseStudyTemplate = lazy(() => import('./pages/logs'));
import { FullscreenImageViewer } from './components/FullscreenImageViewer.tsx';
// framer-motion import removed — not used here to reduce bundle size

const THEME_COLOR = '#424141'; // Change this once to update everywhere
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';
const SILVER = '#dfe1e5ff';
const SECONDARY_COLOR = SILVER;

const TRAIN_BODY_COLOR = THEME_COLOR;         // main car color
const TRAIN_BORDER_COLOR = SILVER;        // or a darker variant of THEME_COLOR
const TRAIN_WHEEL_COLOR = "#111827";         // near-black
const ALL_ABOARD_BG = "#020617";             // dark panel behind text
//const ALL_ABOARD_TEXT = THEME_COLOR;         // or a light accent
const ALL_ABOARD_BORDER = SILVER;

const SkillsBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const boardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (boardRef.current) observer.observe(boardRef.current);
    return () => observer.disconnect();
  }, []);

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
                      '--settle-delay': `${(cIdx * 5 + iIdx) * 150}ms`,
                      color: SILVER
                    } as React.CSSProperties}
                  >
                    {/* The flipping part */}
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
          
          /* Searching animation - slower continuous flip */
          .split-flap-item.searching .flap {
            animation: flip-search 0.8s linear infinite;
          }
          
          /* Settled animation - final reveal with delay */
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


//interface Station {
//  name: string;
//  stations: string[];
//  color: string;
//}
// Removed an unused MiniMap component to reduce bundle size and remove dead code.




// Main Portfolio Component
export default function DesignCentralStation() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

  //const [activeSection, setActiveSection] = useState('hero');
  //const [hoveredProject, setHoveredProject] = useState<string | null>(null);


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
      tagline: 'Reducing alert noise through behavior design',
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
      tagline: 'Privacy-first log management',
      impact: '$250K annual savings for customers',
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
      tagline: 'Teaching design thinking at scale',
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
      tagline: 'Museum framework for social impact',
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
      tagline: 'Hardware + software interaction design',
      impact: '40% reduction in expert dependency',
      methodology: 'Mixed Route',
      route: ['User Interviews', 'Clarify Outcome', 'Map System', 'Build Prototype', 'Test']
    }
  ];


  //const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  const routeOrder = ['logs', 'alerts', 'data', 'team', 'future', 'health'];

  const [view, setView] = useState('map');

  const handleNextRoute = () => {
  // Find where we are currently
  const currentIndex = routeOrder.indexOf(view);
  // Get the next one (loop back to 0 if at the end)
  const nextIndex = (currentIndex + 1) % routeOrder.length;
  // Change the view
  setView(routeOrder[nextIndex]);
  // Optional: Scroll to top when changing routes
  window.scrollTo(0, 0);
};

  const viewToIndex: Record<string, number> = {
  logs: 0,
  alerts: 1,
  data: 2,
  team: 3,
  future: 4,
  health: 5
};

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [processLoaded, setProcessLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Whether we're viewing a case study (render inside app shell)
  const isCaseView = view !== 'map' && viewToIndex[view] !== undefined;

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Show case study pages (lazy-loaded to improve initial load)
  if (isCaseView) {
    return (
        <CaseStudyTemplate dataIndex={viewToIndex[view]} onBack={() => setView('map')} onNextRoute={handleNextRoute} />
    );
  }

  return (
    <div className="min-h-screen text-[#FFFAFB]" style={{ backgroundColor: BACK_COLOR }}>
      <div className="min-h-screen text-white" style={{ backgroundColor: BACK_COLOR }}>
            {/* Fullscreen Image Viewer */}
                  <FullscreenImageViewer 
                    src={fullscreenImage} 
                    onClose={() => setFullscreenImage(null)}
                  />

            {/* Landing content starts */}
              {/* Hero Section - Station Entrance (commented out) */}
              <section className="relative h-[33vh] min-h-[300px] overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/images/Home/test.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0"  style={{ backgroundColor: `${BACK_COLOR}60` }}></div>
          <div className="relative h-full flex items-center px-6 md:pl-12 z-10">
            <div className="text-left">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  Final destination: <span className='metal-heading'>Impact</span>
                </h1>
              </div>
      <h2 className="text-lg md:text-xl text-white/80 font-semibold mb-4">Designing clarity into complex systems</h2>
              <br/> <h2 className="text-white/60">Andy Shulman · Senior UX Designer</h2>
            </div>
          </div>
        </section>
      

      
      {/* All Aboard Section - FIXED */}
      <section className=" px-6 max-w-7xl mx-auto">
        {/* Animated Train Track with proper z-index */}
        <div className="relative mb-12 h-24 flex items-bottom">
          {/* Railroad ties (dashed) placed below the rail */}
          <div className="absolute left-0 right-0 bottom-4 flex items-center z-0">
            <div
              className="w-full border-t-4 border-dashed"
              style={{ borderColor: SILVER }}
            ></div>
          </div>

          {/* Solid rail placed between train and ties */}
          <div
            className="absolute left-0 right-0 bottom-4 transform -translate-y-1/4 h-1 z-10"
            style={{ backgroundColor: `${SILVER}`,  filter: 'brightness(0.4)'}}
          ></div>

          {/* Animated Train - above the solid rail */}
<div className="absolute top-1 left-0 w-full h-full flex items-center z-20">
  <div className="train-animation">
    <div className="flex items-end gap-0"> {/* No gap - cars are connected */}
      
      {/* Rear car - tail car (now at back of train) */}
      <div className="relative w-16 h-10 rounded-l-3xl border-2 shadow-lg flex-shrink-0" style={{
        backgroundColor: TRAIN_BODY_COLOR,
        borderColor: TRAIN_BORDER_COLOR,
      }}>
        {/* Door stripe */}
        <div className="absolute top-2 right-3 bottom-3 w-0.5 bg-yellow-400/60" />
        
        {/* Windows row */}
        <div className="absolute top-2 left-3 right-1 h-5 flex gap-0.5">
          <div className="flex-1 border border-white/30 bg-white/10" />
          <div className="w-1 bg-current opacity-20" />
          <div className="flex-1 border border-white/30 bg-white/10" />
        </div>
        
        {/* Rear light */}
        <div className="absolute top-7 left-2 w-2 h-2 bg-red-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Wheels */}
        <div className="absolute -bottom-1.5 left-3 w-2.5 h-2.5 rounded-full border-2" style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }} />
        <div className="absolute -bottom-1.5 right-2.5 w-2.5 h-2.5 rounded-full border-2" style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }} />
        
        {/* Accordion connector to next car */}
        <div className="absolute -right-1 top-2 bottom-2 w-2 bg-black/40 border-y border-white/20" style={{
          clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)'
        }} />
      </div>

      {/* Subway car 2 - passenger car */}
      <div className="relative w-16 h-10 border-y-2 border-r-2 shadow-lg flex-shrink-0" style={{
        backgroundColor: TRAIN_BODY_COLOR,
        borderColor: TRAIN_BORDER_COLOR,
      }}>
        {/* Door stripe */}
        <div className="absolute top-2 left-3 bottom-3 w-0.5 bg-yellow-400/60" />
        <div className="absolute top-2 right-3 bottom-3 w-0.5 bg-yellow-400/60" />
        
        {/* Windows row */}
        <div className="absolute top-2 left-1 right-1 h-5 flex gap-0.5">
          <div className="flex-1 border border-white/30 bg-white/10" />
          <div className="w-1 bg-current opacity-20" />
          <div className="flex-1 border border-white/30 bg-white/10" />
          <div className="w-1 bg-current opacity-20" />
          <div className="flex-1 border border-white/30 bg-white/10" />
        </div>
        
        {/* Wheels */}
        <div className="absolute -bottom-1.5 left-2.5 w-2.5 h-2.5 rounded-full border-2" style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }} />
        <div className="absolute -bottom-1.5 right-2.5 w-2.5 h-2.5 rounded-full border-2" style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }} />
        
        {/* Accordion connector */}
        <div className="absolute -right-1 top-2 bottom-2 w-2 bg-black/40 border-y border-white/20" style={{
          clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)'
        }} />
      </div>

      {/* Subway car 1 - passenger car */}
      <div className="relative w-16 h-10 border-y-2 border-r-2 shadow-lg flex-shrink-0" style={{
        backgroundColor: TRAIN_BODY_COLOR,
        borderColor: TRAIN_BORDER_COLOR,
      }}>
        {/* Door stripe */}
        <div className="absolute top-2 left-3 bottom-3 w-0.5 bg-yellow-400/60" />
        <div className="absolute top-2 right-3 bottom-3 w-0.5 bg-yellow-400/60" />
        
        {/* Windows row */}
        <div className="absolute top-2 left-1 right-1 h-5 flex gap-0.5">
          <div className="flex-1 border border-white/30 bg-white/10" />
          <div className="w-1 bg-current opacity-20" />
          <div className="flex-1 border border-white/30 bg-white/10" />
          <div className="w-1 bg-current opacity-20" />
          <div className="flex-1 border border-white/30 bg-white/10" />
        </div>
        
        {/* Wheels */}
        <div className="absolute -bottom-1.5 left-2.5 w-2.5 h-2.5 rounded-full border-2" style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }} />
        <div className="absolute -bottom-1.5 right-2.5 w-2.5 h-2.5 rounded-full border-2" style={{
          backgroundColor: TRAIN_WHEEL_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }} />
        
        {/* Accordion connector */}
        <div className="absolute -right-1 top-2 bottom-2 w-2 bg-black/40 border-y border-white/20" style={{
          clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)'
        }} />
      </div>

      {/* Front car - rounded subway nose (now at front) */}
      <div className="relative">
        <div className="w-16 h-10 rounded-r-3xl border-2 shadow-xl relative overflow-visible" style={{
          backgroundColor: TRAIN_BODY_COLOR,
          borderColor: TRAIN_BORDER_COLOR,
        }}>
          {/* Destination sign strip on top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-orange-500/80 flex items-center justify-center rounded-tr-3xl overflow-hidden">
            <div className="text-[6px] font-bold text-white">EXPRESS</div>
          </div>
          
          {/* Large front windshield */}
          <div className="absolute top-3 left-2 right-3 h-6 rounded-md border border-white/40 bg-gradient-to-b from-sky-300/20 to-white/5 shadow-inner" />
          
          {/* Headlight - at the very front */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-lg animate-pulse border border-yellow-500" />
          
          {/* Wheels - fully visible */}
          <div className="absolute -bottom-1.5 left-3 w-3 h-3 rounded-full border-2 shadow-md" style={{
            backgroundColor: TRAIN_WHEEL_COLOR,
            borderColor: TRAIN_BORDER_COLOR,
          }} />
          <div className="absolute -bottom-1.5 right-4 w-3 h-3 rounded-full border-2 shadow-md" style={{
            backgroundColor: TRAIN_WHEEL_COLOR,
            borderColor: TRAIN_BORDER_COLOR,
          }} />
        </div>
      </div>

    </div>
  </div>
</div>
          {/* "All Aboard!" text - highest z-index */}
          {/* <div className="absolute inset-0 flex items-center justify-left pointer-events-none z-20">
            <div
              className="px-6 py-3 rounded-full border-2 shadow-xl"
              style={{
                backgroundColor: ALL_ABOARD_BG,
                borderColor: ALL_ABOARD_BORDER,
              }}
            >
              <h2
                className="text-3xl font-bold text-white"
              >
                Transit Journeys
              </h2>
            </div> */}
          {/* </div> */}
        </div>


        <style>{`
          @keyframes train-move {
            0% { transform: translateX(-200px); }
            100% { transform: translateX(calc(100vw + 200px)); }
          }
          
          .train-animation {
            animation: train-move 15s linear infinite;
          }
        `}</style>

        {/* Short intro under All Aboard */}
        {/* <div className="absolute inset-0 flex items-center justify-left pointer-events-none z-20">
            <div
              className="px-6 py-3 rounded-full border-2 shadow-xl"
              style={{
                backgroundColor: ALL_ABOARD_BG,
                borderColor: ALL_ABOARD_BORDER,
              }}
            >
              <h2
                className="text-3xl font-bold text-white"
              >
                Transit Journeys
              </h2>
            </div>
            </div> */}
        <div className="text-left mt-6 mb-8">
          <h2
                className="text-3xl font-bold text-white mb-6"
              >
                Transit Journeys
              </h2>
          <p className="text-white/60">
            These case studies trace how products move through my design transit system, shown in detail at the Information Booth.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((project) => (
            <a
              key={project.id}
              onClick={() => setView(project.id)}
              // href={`https://ashulman-i4ku6yb.gamma.site/project1`}
              className="group relative bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all cursor-pointer overflow-hidden block"
              //onMouseEnter={() => setHoveredProject(project.id)}
              //onMouseLeave={() => setHoveredProject(null)}
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

              {/* Year badge (top-right) */}
              <div className="absolute top-4 right-4 bg-black/60 text-white/70 px-2 py-1 rounded-md text-xs border border-white/10">
                est: {project.year}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  {/* line color for studies */}
                  {/* <div className="text-xs text-white/60 mb-1">{project.line}</div> */}
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              
              <p className="text-white/70 text-sm mb-4">{project.tagline}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: SILVER }}/>
                  <span className="text-white/60">{project.impact}</span>
                </div>
                
              </div>

              {/* Route preview on hover
              {hoveredProject === project.id && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-sm p-6 flex flex-col justify-center">
                  <div className="text-xs text-white/60 mb-3">Route Preview:</div>
                  <div className="space-y-2">
                    {project.route.map((station, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: project.color }}
                        ></div>
                        <span className="text-sm">{station}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}*/}
            </a>
          ))}
        </div>
      </section>

       <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Backlit Info Booth Sign */}
          

          {/* Information Panels - Booth Style */}
          <div className="grid gap-8">
            {/* Process Map Panel */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-8 
                            hover:border-white/20 transition-all duration-300"
                style={{ boxShadow: `0 4px 24px ${INFO_COLOR}10` }}>
              <div className="flex items-start gap-4 mb-6">
                {/* <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-lg">
                  <Map className="w-6 h-6 text-blue-400" />
                </div> */}
                <div>
                  <div className="relative inline-block mb-12">
                {/* Main sign structure */}
            <div className="relative">
              {/* Backlight panel - the actual light source */}
              <div className="absolute inset-0 rounded-lg blur-2xl opacity-70" 
                  style={{ 
                    backgroundColor: INFO_COLOR,
                    transform: 'scale(1)',
                    zIndex: 0
                  }}></div>
              
              {/* Translucent sign face - like a lightbox */}
              <div className="relative border-4 rounded-lg px-3 py-5 overflow-hidden" 
                  style={{ 
                    borderColor: '#1a1a1a',
                    backgroundColor: `${INFO_COLOR}15`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: `
                      0 0 60px ${INFO_COLOR}60,
                      inset 0 0 40px ${INFO_COLOR}30,
                      0 8px 32px rgba(0,0,0,0.4)
                    `, paddingLeft: 8, paddingRight:8,
                    zIndex: 1
                  }}>
                
                {/* Inner glow effect */}
                <div className="absolute inset-0 opacity-40" 
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${INFO_COLOR}40 0%, transparent 70%)`
                    }}></div>
                
                {/* Content */}
                <div className="relative flex items-center gap-4 z-10">
                  <div className="flex items-center gap-4">
                        <Info className="w-10 h-10 " style={{ color: SILVER }}/>
                        <h2 className="text-3xl font-bold text-[#FFFAFB]">INFORMATION</h2>
                      </div>
                </div>
                
                {/* Light rays effect (removed) */}
              </div>
              
              {/* Metal frame edges */}
              <div className="absolute -inset-1 border-2 rounded-lg pointer-events-none" 
                  style={{ 
                    borderColor: '#2a2a2a',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)'
                  }}></div>
            </div>
            {/* Mounting brackets with lights */}
            <div className="absolute -top-3 -left-3 w-4 h-4 rounded-full border-2 animate-pulse" 
                style={{ 
                  borderColor: SECONDARY_COLOR, 
                  backgroundColor: INFO_COLOR,
                  boxShadow: `0 0 12px ${INFO_COLOR}`
                }}></div>
            <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full border-2 animate-pulse" 
                style={{ 
                  borderColor: SECONDARY_COLOR, 
                  backgroundColor: INFO_COLOR,
                  boxShadow: `0 0 12px ${INFO_COLOR}`,
                  animationDelay: '0.5s'
                }}></div>
            <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full border-2 animate-pulse" 
                style={{ 
                  borderColor: SECONDARY_COLOR, 
                  backgroundColor: INFO_COLOR,
                  boxShadow: `0 0 12px ${INFO_COLOR}`,
                  animationDelay: '1s'
                }}></div>
            <div className="absolute -bottom-3 -right-3 w-4 h-4 rounded-full border-2 animate-pulse" 
                style={{ 
                  borderColor: SECONDARY_COLOR, 
                  backgroundColor: INFO_COLOR,
                  boxShadow: `0 0 12px ${INFO_COLOR}`,
                  animationDelay: '1.5s'
                }}></div>
          </div>
                  <h3 className="text-white/90 text-2xl font-bold mb-2">The Complete Transit System</h3>
                  <p className="text-white/60 text-left">
                    This is my design process map. Each project follows a unique route through these stations, 
                    combining methodologies from Stanford d.school, Business Strategy, Behavior Design, and 
                    Sustainability frameworks.
                  </p>
                </div>
              </div>
              <div className="bg-[#f5e6d3] rounded-xl border border-black/20 overflow-hidden relative aspect-video">
                {/* Skeleton placeholder: visible until the image finishes loading */}
                <div
                  aria-hidden={processLoaded}
                  className={`absolute inset-0 transition-opacity duration-500 ${processLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full rounded-md bg-gradient-to-br from-[#f2e8df] to-[#e6dccf] animate-pulse" />
                  </div>
                </div>

                {/* Circular loader centered over the skeleton while loading */}
                {!processLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin" />
                  </div>
                )}

                {/* Actual image: decode async, lazy-load, and fade in when ready */}
                <img
                  src="/images/Home/process.webp"
                  alt="Design process map"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setProcessLoaded(true)}
                  onError={() => setProcessLoaded(true)}
                  className={`cursor-pointer hover:opacity-90 transition-opacity duration-500 ${processLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onClick={() => setFullscreenImage("/images/Home/process.webp")}
                />
              </div>
              {/* Skills Panel */}
            <div className="pt-12"
                style={{ boxShadow: `0 4px 24px ${INFO_COLOR}10` }}>
              {/* <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-lg">
                  <Briefcase className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="metal-heading text-2xl font-bold">Station Capabilities</h3>
              </div> */}
              <SkillsBoard />
            </div>

            {/* About Me Panel */}
            <div className="mb-12"
                style={{ boxShadow: `0 4px 24px ${INFO_COLOR}10` }}>
              <div className="flex items-start gap-4 mb-6">
                {/* <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3 rounded-lg">
                  <User className="w-6 h-6 text-orange-400" />
                </div> */}
                {/* Headshot - circular, floating left */}
  <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
    <img 
      src="/images/Home/headshot.png"
      alt="Andy Shulman"
      style={{border: SILVER }}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
  
  {/* Title next to image */}
  <h3 className="text-white/90 text-2xl font-bold self-center">
    About the Conductor
  </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2 space-y-4">
                  <p className="text-white/80 leading-relaxed">
                    I'm Andy, a Senior UX Designer with 5+ years transforming complex enterprise systems 
                    into intuitive experiences. I have a Master's in Sustainability Science from Stanford 
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

                <aside className="md:col-span-1 h-full">
                  <div className="bg-[#0f0f0f] border-2 border-white/10 rounded-lg overflow-hidden h-full 
                                  hover:border-white/30 transition-all duration-300"
                      style={{ boxShadow: `0 0 20px ${INFO_COLOR}20` }}>
                    <div className="w-full h-full aspect-video">
                      <iframe
                        src="https://www.google.com/maps/d/embed?mid=1QR8iQSZT8-UmjddIlJR1cA6dtaqnYTHc"
                        className="w-full h-full"
                        title="Map preview"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
            </div>

            
            </div>
          </div>
        </section>

      {/* Passenger Testimonials (section background matching All Aboard) */}
      <section className="mb-16 py-10 px-6 max-w-7xl mx-auto" style={{ backgroundColor: BACK_COLOR }}>
        {/* Ticket Banner Separator with Testimonials (match All Aboard background) */}
        <div className="relative py-12 px-6 overflow-hidden border-y-0" style={{ backgroundColor: BACK_COLOR }}>
          <img src="/images/Home/tickets.webp" alt="Tickets banner" className="absolute top-0 rounded left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0" />

          {/* Content overlay */}
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-left justify-left gap-4">
              <h3 className="text-3xl font-bold text-white">Passenger Testimonials</h3>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8"></div>

        {/* Passenger Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      alt={testimonial.author}
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
                    <div className="text-[11px] uppercase tracking-widest text-white/40 leading-tight">
                      {testimonial.role} <br />
                      <span className="text-white/20">{testimonial.company}</span>
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

            

          {/* Contact - Thanks for Riding */}
          <footer className="text-center bg-black/40 py-12 border-t-2 " style={{ borderColor: `${THEME_COLOR}30` }}>
            <Train className="w-16 h-16 mx-auto mb-6" style={{ color: THEME_COLOR }}/>
            <h3 className="text-4xl font-bold mb-4">Thanks for Riding!</h3>
            <p className="text-2xl text-white/80 mb-8">
              Please contact Andy to build your next impactful experience.
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
            <div className="mt-8 text-white/40 text-sm">
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
      </div>
    // </div>
  );
}