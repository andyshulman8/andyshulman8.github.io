//import { useState } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Train, MapPin, Info, ChevronRight } from 'lucide-react';

const THEME_COLOR = '#7DE2D1'; // Change this once to update everywhere
const SECONDARY_COLOR = '#339989';
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';

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
      <h3 className="text-2xl font-bold mb-4" style={{ color: THEME_COLOR }}>Operating the System</h3>
      <div className="bg-black border-2 rounded-lg p-6 font-mono" style={{ borderColor: `${THEME_COLOR}50` }}>
        <div className="split-flap-board grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {skillCategories.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-3">
              <div className="text-sm text-white/60 uppercase tracking-wider">{cat.title}</div>
              <div className="space-y-2">
                {cat.items.map((it, iIdx) => (
                  <div
                    key={iIdx}
                    className={`split-flap-item ${isVisible ? 'is-flipping' : ''} bg-black/80 border border-white/6 rounded px-3 py-2 text-sm`}
                    style={{ animationDelay: isVisible ? `${(cIdx * 6 + iIdx) * 200}ms` : '0ms', color: THEME_COLOR  }}
                  >
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .split-flap-board { perspective: 1000px; }
          .split-flap-item { transform: rotateX(-90deg); opacity: 0; transform-origin: top; backface-visibility: hidden; -webkit-backface-visibility: hidden;}
          .split-flap-item.is-flipping { animation: flap 600ms cubic-bezier(.2,.8,.2,1) forwards; }
          @keyframes flap { from { transform: rotateX(-90deg); opacity: 0; } to { transform: rotateX(0deg); opacity: 1; } }
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
// Mini Map Component for Case Study Pages
// eslint-disable-next-line @typescript-eslint/no-unused-vars
{/*}
function CaseStudyMiniMap({ route, currentStation }: { route: Station; currentStation: string }) {
  const stations = route.stations;
  
  return (
    <div className="fixed top-20 right-6 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 p-4 w-64 z-50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></div>
        <span className="text-white text-sm font-semibold">{route.name}</span>
      </div>
      
      <div className="space-y-2">
        {stations.map((station: string, idx: number) => (
          <div 
            key={idx}
            className={`flex items-center gap-2 text-xs transition-all ${
              currentStation === station ? 'text-[#7DE2D1] font-semibold' : 'text-white/60'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              currentStation === station ? 'bg-[#7DE2D1]' : 'bg-white/40'
            }`}></div>
            <span>{station}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/50">
        Scroll to move along the line
      </div>
    </div>
  );
} */}

// Main Portfolio Component
export default function DesignCentralStation() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

  //const [activeSection, setActiveSection] = useState('hero');
  //const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const caseStudies = [
    {
      id: 'logs',
      name: 'Logs: Rags to Riches',
      line: 'Red Line',
      color: '#E53935',
      thumbnail: '/images/Home/Thumbs/1.jpg',
      tagline: 'From niche add-on to flagship product',
      impact: 'Cut troubleshooting from hours to 10 minutes',
      methodology: 'Stanford d.school',
      route: ['User Interviews', 'Empathy Maps', 'Define Problem', 'Converge', 'Build Prototype', 'Test']
    },
    {
      id: 'alerts',
      name: 'Smarter Alerts',
      line: 'Purple Line',
      color: '#8E24AA',
      thumbnail: '/images/Home/Thumbs/2.jpg',
      tagline: 'Reducing alert noise through behavior design',
      impact: '30% reduction in alert fatigue',
      methodology: 'Behavior Design',
      route: ['User Interviews', 'Clarify Outcome', 'Simplify Behavior', 'Make Easier', 'Build Flows', 'Test']
    },
    {
      id: 'secure',
      name: 'Secure Data',
      line: 'Red + Green Lines',
      color: '#43A047',
      thumbnail: '/images/Home/Thumbs/loyola.jpg',
      tagline: 'Privacy-first log management',
      impact: '$250K annual savings for customers',
      methodology: 'Mixed Route',
      route: ['User Interviews', 'Define Problem', 'Identify Causes', 'Design Mechanisms', 'Build Prototype', 'Test']
    },
    {
      id: 'team',
      name: 'Empowered Team',
      line: 'Blue Line',
      color: '#1E88E5',
      thumbnail: '/images/Home/Thumbs/align.jpg',
      tagline: 'Teaching design thinking at scale',
      impact: '3 piloted solutions in 12 weeks',
      methodology: 'Business Strategy',
      route: ['User Interviews', 'Map System', 'Identify Levers', 'Brainstorm', 'Shape Strategy', 'Test']
    },
    {
      id: 'future',
      name: 'Imagining the Future',
      line: 'Green Line',
      color: '#43A047',
      thumbnail: '/images/Home/Thumbs/sesi.png',
      tagline: 'Museum framework for social impact',
      impact: '100K+ visitors since 2022',
      methodology: 'Sustainability',
      route: ['User Interviews', 'Map System', 'Identify Causes', 'Shape Strategy', 'Evaluation Plan', 'Test']
    },
    {
      id: 'health',
      name: 'Health Frameworks',
      line: 'Purple + Blue Lines',
      color: '#8E24AA',
      thumbnail: '/images/Home/Thumbs/bose.png',
      tagline: 'Hardware + software interaction design',
      impact: '40% reduction in expert dependency',
      methodology: 'Mixed Route',
      route: ['User Interviews', 'Clarify Outcome', 'Map System', 'Build Prototype', 'Test']
    }
  ];


  //const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Andy played a crucial role in launching this new product — from shaping the user experience and performing deep UX research to ensuring seamless integration of design and workflows across the broader LogicMonitor platform. What impressed me most was his ability to translate complex technical requirements into intuitive user experiences.",
      author: "David Femino",
      role: "Sr. Manager, PM - Cloud & Logs",
      company: "LogicMonitor",
      avatar: '/images/Home/David.png'
    },
    {
      quote: "Beyond the enthusiasm, Andy is a model of professionalism and is extremely knowledgeable about the intricacies of enterprise UX, AI, and AIOps. The next organization will gain a truly valuable team member who elevates the entire design process through smart strategy, collaborative spirit, and a deep technical understanding. Highly recommended!",
      author: "Richard Huddleston",
      role: "Technical Fellow",
      company: "LogicMonitor",
      avatar: '/images/Home/richard.jpeg'
    },
    {
      quote: "He really used his holistic approach to make some real impact for us as a business and for our customers. Andy has been fantastic as a coach, motivator and project leader to our global cross functional teams. His fast approach towards getting empathetic insights from customers and transforming it into iterative testing was refreshing.",
      author: "Volker Probst",
      role: "Customer Experience VP",
      company: "Align Technology",
      avatar: '/images/Home/volker.png'
    }
  ];

  return (
    <div className="min-h-screen text-[#FFFAFB]" style={{ backgroundColor: BACK_COLOR }}>
      {/* Hero Section - Station Entrance 
      <header className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left column: narrative (left-aligned) *
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Final destination: <span className="text-[#7DE2D1]">Impact</span></h1>
              <h2 className="text-lg md:text-xl text-white/80 font-semibold mb-4">All routes begin with empathy.</h2>
              <p className="text-white/60 max-w-xl">I’m Andy Shulman, a Senior UX Designer with experience simplifying complexity.</p>
            </div>

            {/* Right column: Ticket booth visual (card) *
            <aside className="flex justify-end md:justify-end">
              <img src="/images/Home/sublines.png" alt="Subway Lines" className="w-full h-[33vh] object-cover rounded-lg shadow-lg mb-4" />
              <img src="/images/Home/tickets.jpg" alt="Ticket preview" className="w-full h-[33vh] object-cover" />
            </aside>
          </div>
        </div>
      </header> 
      */}
        {/* Hero Section (single) */}
        <section className="relative h-[33vh] min-h-[300px] overflow-hidden bg-center bg-cover" style={{ backgroundImage: "url('/images/Home/test.png')" }}>
          <div className="absolute inset-0"  style={{ backgroundColor: `${BACK_COLOR}60` }}></div>
          <div className="relative h-full flex items-center px-6 md:pl-12 z-10">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Final destination: <span className="" style={{ color: THEME_COLOR }}>Impact</span></h1>
              <h2 className="text-lg md:text-xl text-white/80 font-semibold mb-4">All routes begin with empathy.</h2>
              <p className="text-white/60">I’m Andy Shulman, a Senior UX Designer with experience simplifying complexity.</p>
            </div>
          </div>
        </section>
      

      
      {/* All Aboard Section - FIXED */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        {/* Animated Train Track with proper z-index */}
        <div className="relative mb-12 h-24 flex items-center">
          {/* Railroad ties (dashed) placed below the rail */}
          <div className="absolute left-0 right-0 bottom-4 flex items-center z-0">
            <div className="w-full border-t-4 border-dashed" style={{ borderColor: `${THEME_COLOR}40` }}></div>
          </div>

          {/* Solid rail placed between train and ties */}
          <div className="absolute left-0 right-0 bottom-4 transform -translate-y-1/2 h-1 z-10" style={{ backgroundColor: THEME_COLOR }}></div>

          {/* Animated Train - above the solid rail */}
          <div className="absolute top-1 left-0 w-full h-full flex items-center z-20">
            <div className="train-animation">
              <div className="flex items-end gap-2">
                {/* Train engine */}
                <div className="relative">
                  <div className="w-14 h-8 bg-teal-400 rounded-r-lg border-2 border-teal-600 relative shadow-lg">
                    <div className="absolute -top-3 left-4 w-3 h-4 bg-teal-600 rounded-t-sm border-t-2 border-teal-400">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute -bottom-1 left-3 w-3 h-3 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                    <div className="absolute -bottom-1 right-3 w-3 h-3 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                  </div>
                </div>

                {/* Train cars */}
                <div className="relative w-14 h-7 bg-teal-400 border-2 border-teal-600 shadow-md">
                  <div className="absolute top-1 left-1 right-1 bottom-1 border border-teal-600/30"></div>
                  <div className="absolute -bottom-1 left-3 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                  <div className="absolute -bottom-1 right-3 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                </div>

                <div className="relative w-14 h-7 bg-teal-400 border-2 border-teal-600 shadow-md">
                  <div className="absolute top-1 left-1 right-1 bottom-1 border border-teal-600/30"></div>
                  <div className="absolute -bottom-1 left-3 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                  <div className="absolute -bottom-1 right-3 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                </div>

                <div className="w-14 h-7 bg-teal-400 rounded-sm border-2 border-teal-600 relative">
                  <div className="absolute -right-1 -bottom-1 w-3 h-2 bg-teal-600 rounded-sm"></div>
                  <div className="absolute left-1 top-1 bottom-1 w-3 bg-teal-600/20 border-r border-teal-600"></div>
                  <div className="absolute -bottom-1 left-3 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                  <div className="absolute -bottom-1 right-3 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-teal-600"></div>
                </div>
              </div>
            </div>
          </div>

          {/* "All Aboard!" text - highest z-index */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="bg-gray-900 px-6 py-3 rounded-full border-2 border-teal-400 shadow-xl">
              <h2 className="text-3xl font-bold text-teal-400">
                All Aboard!
              </h2>
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
        `}</style>

        {/* Short intro under All Aboard */}
        <div className="text-left mt-6 mb-8">
          <p className="text-white/60">
            Each project is a journey throughout my design transit system, which you can see in detail at the Information Booth.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((project) => (
            <a
              key={project.id}
              href={`https://ashulman-i4ku6yb.gamma.site/project1`}
              /*/case/${project.id}*/
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

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-white/60 mb-1">{project.line}</div>
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              
              <p className="text-white/70 text-sm mb-4">{project.tagline}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: THEME_COLOR }}/>
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

       {/* Information Booth Section */}
      <section className="py-16 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
            {/* Info Booth Sign */}
            <div className="relative inline-block mb-12">
              <div className="border-4 rounded-lg px-4 py-4 shadow-2xl" style={{ borderColor: `${SECONDARY_COLOR}20`, backgroundColor: BACK_COLOR }} >
                <div className="flex items-center gap-4">
                  <Info className="w-10 h-10 " style={{ color: THEME_COLOR }}/>
                  <h2 className="text-4xl font-bold text-[#FFFAFB] tracking-wide">INFORMATION</h2>
                </div>
              </div>
              {/* Mounting brackets */}
              <div className="absolute -top-3 -left-3 w-4 h-4 rounded-full border-2" style={{ borderColor: `${SECONDARY_COLOR}`, backgroundColor: INFO_COLOR }}></div>
              <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full border-2" style={{ borderColor: `${SECONDARY_COLOR}`, backgroundColor: INFO_COLOR }}></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full border-2" style={{ borderColor: `${SECONDARY_COLOR}`, backgroundColor: INFO_COLOR }}></div>
              <div className="absolute -bottom-3 -right-3 w-4 h-4 rounded-full border-2" style={{ borderColor: `${SECONDARY_COLOR}`, backgroundColor: INFO_COLOR }}></div>
            </div>

          {/* Process Map */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-4" style={{ color: THEME_COLOR }}>The Complete Transit System</h3>
            <p className="text-white/60 text-left mb-8 mx-auto">
              This is my design process map. Each project follows a unique route through these stations, 
              combining methodologies from Stanford d.school, Business Strategy, Behavior Design, and 
              Sustainability frameworks.
            </p>
            <div className="bg-[#f5e6d3] rounded-xl border-1 border-black/20">
              {/*<div className="text-left text-black/60 text-sm mb-4">
                [Your subway map image would go here - the one you shared with all the colored lines]
              </div>*/}
              <img
                src="/images/Home/process.jpg"
                alt="Design process map"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <SkillsBoard />

          {/* About Me with map preview (heading full-width; grid below) */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-4" style={{ color: THEME_COLOR }}>About the Conductor</h3>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-4">
                <p className="text-white/80 leading-relaxed">
                  I'm Andy, a Senior UX Designer with 5+ years transforming complex enterprise systems 
                  into intuitive experiences. I have a Master's in Sustainability Science from Stanford 
                  and a skillset that brings together design thinking, behavior design, business strategy, and systems thinking.
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
                <div className="bg-[#0f0f0f] border border-white/6 rounded-lg overflow-hidden h-full">
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
      </section>  

      {/* Passenger Testimonials (section background matching All Aboard) */}
      <section className="mb-16 py-10 px-6 max-w-7xl mx-auto" style={{ backgroundColor: BACK_COLOR }}>
      {/* Ticket Banner Separator with Testimonials (match All Aboard background) */}
          <div className="relative py-12 px-6 overflow-hidden border-y-0 bg-[#141515]">
            <img src="/images/Home/tickets.png" alt="Tickets banner" className="absolute top-0 rounded left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0" />
            
            {/* Content overlay */}
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="flex items-left justify-left gap-4">
                <h3 className="text-3xl font-bold text-white">Passenger Testimonials</h3>
              </div>
            </div>
          </div>
              <div className="flex items-center gap-4 mb-8">
                
              </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="bg-black/60 border border-white/10 rounded-xl p-6 hover:border-[var(THEME_COLOR)]/50 transition-all"
                  style={{ color: THEME_COLOR }}
                >
                  <div className="text-6xl mb-4" style={{ color: `${THEME_COLOR}20` }}>"</div>
                  <p className="text-white/80 italic mb-4 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#2B2C28] font-semibold text-sm" style={{ backgroundColor: THEME_COLOR }}>
                          {testimonial.author.split(' ').map(n => n[0]).slice(0,2).join('')}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold" style={{ color: THEME_COLOR }}>{testimonial.author}</div>
                        <div className="text-sm text-white/60">
                          <span>{testimonial.role}</span>
                          {testimonial.company && (
                            <span className="text-white/40"> <br></br> {testimonial.company}</span>
                          )}
                        </div>
                      </div>
                    </div>
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
            {/*}
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
        </div>
      //</section>
    //</div>
  );
}