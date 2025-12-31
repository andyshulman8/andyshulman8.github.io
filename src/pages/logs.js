import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

const THEME_COLOR = '#7DE2D1'; // Change this once to update everywhere
const SECONDARY_COLOR = '#339989';
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';

const lineColors = {
  red: '#E53935',
  blue: '#1E88E5',
  purple: '#8E24AA',
  green: '#43A047'
};

const lineNames = {
  red: 'Stanford d.school',
  blue: 'Business Strategy',
  purple: 'Behavior Design',
  green: 'Sustainability'
};

// Sample data for "Logs: Rags to Riches"
const caseStudyData = {
  title: "Logs: Rags to Riches",
  line_color: "red",
  destination: "Established LM Logs as competitive player",
  background: "Before LogicMonitor had acquired (and properly integrated) a logs product, users were forced to jump between disconnected tools during critical moments. RaySearch Labs' Senior IT Solutions Engineer spent 50-60% of his time manually reviewing logs.",
  overview: "I joined and took over design for LogicMonitor Logs, helping users bridge the critical gap between knowing that something is wrong and solving the problem. Through close collaboration across global teams, I helped transform LM Logs from a niche add-on to a flagship product that LogicMonitor itself relied on.",
  stops: [
    {
      station_name: "User Research",
      phase: "Empathize",
      content: "I led recurring user research sessions, conducting Zoom interviews and analyzing users' current workflows to understand where our product was failing. Working with customers like RaySearch Labs (who develop pioneering cancer treatment software), I discovered three critical gaps.",
      quote: "I needed to see my entire environment from a single pane of glass. To monitor everything on the network, whether it be a server to a workstation to a piece of networking equipment.",
      quoteAuthor: "John Burriss, Senior IT Solutions Engineer at RaySearch Labs",
      insights: [
        "Disconnected Tools: Critical troubleshooting moments are stressful when you have siloed apps",
        "Inefficient Filtering: Competitors offered advanced search while users reacted 'Why is LM Logs search so small?'",
        "Raw Data Overload: Without proper visualizations, the benefit of LM Logs was buried"
      ]
    },
    {
      station_name: "Define Solutions",
      phase: "Define",
      content: "Based on research findings, I identified three design pillars: Unified Platform (seamless workflows connecting logs across the platform), Empowered Search (deeper control over filtering for both novice and expert users), and Uncovering Patterns (transforming raw log data into actionable insights).",
    },
    {
      station_name: "Unified Platform",
      phase: "Ideate",
      content: "I designed seamless workflows connecting logs across the platform: Added logs widgets capabilities to dashboards, made logs visible alongside device and service data, and displayed anomalous logs available within alerts. LogicMonitor allows its users to access a plethora of tools to help monitor their infrastructure.",
    },
    {
      station_name: "Empowered Search",
      phase: "Ideate",
      content: "I expanded the size of the search bar and added recent searches, in-line errors, type-ahead, and stateful search (edited vs searching vs searched). Gave both novice and expert users deeper control over filtering by emphasizing and injecting features into search.",
      quote: "I like a big search box and inline support is super helpful.",
      quoteAuthor: "NOC Engineer at HyeTech Networks"
    },
    {
      station_name: "Visual Analytics",
      phase: "Prototype",
      content: "I designed multiple graph types, advanced query operators (count, avg, sum, min, max), and dashboard integration so logs widgets could be embedded alongside system performance metrics. RaySearch could have a dashboard on a TV in their office—a spike in errors would be obvious and immediately easy to assess.",
    },
    {
      station_name: "Launch & Impact",
      phase: "Test",
      content: "Through close collaboration across global teams, I helped transform LM Logs from a niche add-on to a flagship product. LogicMonitor did not use its own logs product until my team and I improved and integrated it enough to achieve all its needs.",
      quote: "We had users complaining that there was a licensing error. Using LogicMonitor's platform, including LM Logs, we were able to trace the issue and do a stop service on a server way down the line. The process took about 10 minutes versus the two to three hours it would have taken without the visibility.",
      quoteAuthor: "John Burriss, Senior IT Solutions Engineer at RaySearch Labs",
      impact: {
        metric1: "2-3 hours → 10 minutes",
        label1: "Issue Resolution Time",
        metric2: "Improved Visibility",
        label2: "Engineers solve complex issues in one tool"
      }
    }
  ]
};


// ADD THE onBack PROP HERE
export default function LogsCaseStudy({ onBack }) {
  const [currentStop, setCurrentStop] = useState(0);
  const [showOverview, setShowOverview] = useState(true);
  
  const lineColor = lineColors[caseStudyData.line_color];
  const lineName = lineNames[caseStudyData.line_color];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BACK_COLOR }}>
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: INFO_COLOR + 'CC' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack} // CHANGE THIS FROM window.history.back()
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Home size={20} />
            <span>Back to Map</span>
          </button>
          <div className="text-right">
            <div className="text-sm text-white/40">Line {lineName}</div>
            <div className="text-xl font-bold" style={{ color: lineColor }}>{caseStudyData.title}</div>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-12">
          {/* ... Rest of your existing CaseStudy JSX code ... */}
          <h1 className="text-5xl font-bold text-center">{caseStudyData.title}</h1>
          <button 
            onClick={() => setShowOverview(false)}
            className="mt-8 mx-auto block px-8 py-3 rounded-full font-bold"
            style={{ backgroundColor: lineColor }}
          >
            View Case Study
          </button>
      </main>
    </div>
  );
}

export default function CaseStudyPage() {
  const [currentStop, setCurrentStop] = useState(0);
  const [showOverview, setShowOverview] = useState(true);
  
  const lineColor = lineColors[caseStudyData.line_color];
  const lineName = lineNames[caseStudyData.line_color];
  
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
  
  const goToStop = (index) => {
    setCurrentStop(index);
    setShowOverview(false);
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BACK_COLOR }}>
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: INFO_COLOR + 'CC' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Home size={20} />
            <span>Back to Map</span>
          </button>
          <div className="text-right">
            <div className="text-sm text-white/40">Line {lineName}</div>
            <div 
              className="text-xl font-bold"
              style={{ color: lineColor }}
            >
              {caseStudyData.title}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {showOverview ? (
          // Overview Section
          <div className="space-y-12">
            {/* Title & Destination */}
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold mb-2">{caseStudyData.title}</h1>
              <div className="flex items-center justify-center gap-3">
                <div 
                  className="h-1 w-24 rounded-full"
                  style={{ backgroundColor: lineColor }}
                />
                <span className="text-xl text-white/60">Final Destination:</span>
                <span className="text-xl font-semibold">{caseStudyData.destination}</span>
              </div>
            </div>

            {/* Prepare for Your Trip */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white/80">📍 Background</h2>
                <p className="text-white/60 leading-relaxed">
                  {caseStudyData.background}
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white/80">🎯 Overview</h2>
                <p className="text-white/60 leading-relaxed">
                  {caseStudyData.overview}
                </p>
              </div>
            </div>

            {/* Interactive Stops */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">🚇 Live Stops</h2>
              <div className="relative">
                {/* Subway line visual */}
                <div 
                  className="absolute left-8 top-0 bottom-0 w-1 rounded-full"
                  style={{ backgroundColor: lineColor + '40' }}
                />
                
                <div className="space-y-6">
                  {caseStudyData.stops.map((stop, index) => (
                    <button
                      key={index}
                      onClick={() => goToStop(index)}
                      className="w-full text-left flex items-start gap-6 p-6 rounded-lg transition-all group"
                      style={{ 
                        backgroundColor: 'transparent',
                        ':hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Station dot */}
                      <div className="relative flex-shrink-0">
                        <div 
                          className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform"
                          style={{ 
                            backgroundColor: lineColor,
                            borderColor: BACK_COLOR
                          }}
                        >
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Station info */}
                      <div className="flex-1 pt-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-white/40">
                            {stop.phase.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-white/90">
                          {stop.station_name}
                        </h3>
                        <p className="text-white/50 text-sm line-clamp-2">
                          {stop.content.substring(0, 120)}...
                        </p>
                      </div>
                      
                      <ChevronRight 
                        className="text-white/30 group-hover:text-white/60 transition-colors mt-6" 
                        size={24} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ready to Board */}
            <div className="text-center mt-16 space-y-6">
              <h2 className="text-3xl font-bold">Ready to Board?</h2>
              <button
                onClick={() => {
                  setShowOverview(false);
                  setCurrentStop(0);
                }}
                className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                style={{ 
                  backgroundColor: lineColor,
                  boxShadow: `0 0 30px ${lineColor}40`
                }}
              >
                Start Journey →
              </button>
              <div className="text-white/40 text-sm">
                Or try another route from the map
              </div>
            </div>
          </div>
        ) : (
          // Stop Details View
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/40">
                <span>Stop {currentStop + 1} of {caseStudyData.stops.length}</span>
                <span>{caseStudyData.stops[currentStop].phase}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((currentStop + 1) / caseStudyData.stops.length) * 100}%`,
                    backgroundColor: lineColor
                  }}
                />
              </div>
            </div>

            {/* Station Name */}
            <div className="text-center space-y-2">
              <div className="text-sm font-mono text-white/40">
                {caseStudyData.stops[currentStop].phase.toUpperCase()} PHASE
              </div>
              <h2 className="text-4xl font-bold">
                {caseStudyData.stops[currentStop].station_name}
              </h2>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/80 leading-relaxed">
                {caseStudyData.stops[currentStop].content}
              </p>

              {/* Quote if available */}
              {caseStudyData.stops[currentStop].quote && (
                <blockquote 
                  className="border-l-4 pl-6 py-4 my-8 italic text-white/60"
                  style={{ borderColor: lineColor }}
                >
                  "{caseStudyData.stops[currentStop].quote}"
                  <footer className="text-sm mt-2 not-italic text-white/40">
                    — {caseStudyData.stops[currentStop].quoteAuthor}
                  </footer>
                </blockquote>
              )}

              {/* Insights if available */}
              {caseStudyData.stops[currentStop].insights && (
                <div className="rounded-lg p-6 my-8" style={{ backgroundColor: INFO_COLOR }}>
                  <h3 className="text-lg font-bold mb-4 text-white/90">Key Insights</h3>
                  <ul className="space-y-2">
                    {caseStudyData.stops[currentStop].insights.map((insight, i) => (
                      <li key={i} className="text-white/70">{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact if available */}
              {caseStudyData.stops[currentStop].impact && (
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: lineColor }}
                    >
                      {caseStudyData.stops[currentStop].impact.metric1}
                    </div>
                    <div className="text-white/60">
                      {caseStudyData.stops[currentStop].impact.label1}
                    </div>
                  </div>
                  <div className="rounded-lg p-6 text-center" style={{ backgroundColor: INFO_COLOR }}>
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: lineColor }}
                    >
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
                className="px-6 py-3 rounded-full transition-all"
                style={{ backgroundColor: INFO_COLOR }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = SECONDARY_COLOR}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = INFO_COLOR}
              >
                View All Stops
              </button>

              {currentStop < caseStudyData.stops.length - 1 ? (
                <button
                  onClick={nextStop}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: lineColor,
                    boxShadow: `0 0 20px ${lineColor}40`
                  }}
                >
                  Next Stop
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: lineColor,
                    boxShadow: `0 0 20px ${lineColor}40`
                  }}
                >
                  Back to Map
                  <Home size={20} />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}