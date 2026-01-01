import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
//import { allCaseStudies } from './casedata.tsx'; // Import your new file
//import Dot from './dot.tsx';
import { allCaseStudies } from './casedata';
import type { CaseStudyData } from './casedata';

//const THEME_COLOR = '#7DE2D1';
const SECONDARY_COLOR = '#339989';
const INFO_COLOR = '#2B2C28';
const BACK_COLOR = '#141515';

const lineColors = {
  red: '#E53935',
  blue: '#1E88E5',
  purple: '#8E24AA',
  green: '#43A047'
} as const;

const lineNames = {
  red: 'Stanford d.school',
  blue: 'Business Strategy',
  purple: 'Behavior Design',
  green: 'Sustainability'
} as const;

//type LineColor = keyof typeof lineColors;
//type Phase = 'Empathize' | 'Define' | 'Ideate' | 'Prototype' | 'Test';

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
}

// interface CaseStudyData {
//   title: string;
//   line_color: LineColor;
//   destination: string;
//   background: string;
//   overview: string;
//   stops: Stop[];
// }

interface CaseStudyTemplateProps {
  onBack: () => void;
  onNextRoute: () => void;
  dataIndex: number; // Add this
}

// interface LogsCaseStudyProps {
//   onBack: () => void;
// }

// Main Case Study Component - accepts onBack prop
export default function CaseStudyTemplate({ onBack, onNextRoute, dataIndex }: CaseStudyTemplateProps) {
  //const caseStudyData = allCaseStudies[dataIndex]

  const caseStudyData: CaseStudyData = allCaseStudies[dataIndex];
  
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
  
  // FIXED: Explicitly typed index as a number
  const goToStop = (index: number) => {
    setCurrentStop(index);
    setShowOverview(false);
  };


  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BACK_COLOR }}>
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: INFO_COLOR + 'CC' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
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
                <h2 className="text-2xl font-bold text-white/80">🎯 Impact</h2>
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
                  {caseStudyData.stops.map((stop: Stop, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToStop(index)}
                      className="w-full text-left flex items-start gap-6 p-6 rounded-lg transition-all group"
                      style={{ backgroundColor: 'transparent' }}
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
              <button 
        onClick={onNextRoute} // Trigger the function when clicked
        className="text-white/40 text-sm hover:text-white/80 transition-colors cursor-pointer block w-full text-center"
      >
        Or try the next route
      </button>
            </div>
          </div>
        ) : (
          // Stop Details View
          <div className="space-y-8">
            {/* Progress Bar */}
            {/* <div className="space-y-2">
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
            </div> */}

          {/* Stop Details View*/}
          <div className="space-y-8">
            {/* Progress Tracker - NEW DESIGN */}
            <div className="mb-12">
              <div className="relative flex items-center justify-between max-w-4xl mx-auto">
                {/* Background Track */}
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/10 -translate-y-1/2" />
                
                {/* Active Progress Line */}
                <div 
                  className="absolute left-0 top-1/2 h-1 -translate-y-1/2 transition-all duration-500 ease-out"
                  style={{ 
                    width: `${((currentStop + 1) / caseStudyData.stops.length) * 100}%`,
                    backgroundColor: lineColor
                  }}
                />

                {/* Interactive Stop Dots */}
                {caseStudyData.stops.map((stop: Stop, index: number) => {
                  const isActive = index <= currentStop;
                  const isCurrent = index === currentStop;

                  return (
                    <button
                      key={index}
                      onClick={() => goToStop(index)}
                      className="relative z-10 group focus:outline-none"
                    >
                      {/* The Dot */}
                      <div 
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-300`}
                        style={{
                          backgroundColor: isActive ? lineColor : BACK_COLOR,
                          borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.3)'
                        }}
                      >
                        {/* Pulse Ring for Current Stop */}
                        {isCurrent && (
                          <div 
                            className="absolute inset-0 rounded-full border-2 border-white animate-pulse"
                            style={{ transform: 'scale(1.8)', opacity: 1 }}
                          />
                        )}
                      </div>

                      {/* Tooltip on Hover */}
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
                  onClick={onBack}
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