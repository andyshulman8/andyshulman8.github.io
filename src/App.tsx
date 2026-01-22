import { useState, useRef, lazy, Suspense } from "react";
import { Train, MapPin, ChevronRight } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useNavigate, Link } from "react-router-dom";
import { TrainCar } from "./components/Train/TrainCar.tsx";
import { BackToTopButton } from "./components/Layout/BackToTopButton.tsx";
import "./styles/animations.css";
import { caseStudies } from "./data/caseStudies";
import {
  THEME_COLOR,
  TEXT_SECONDARY,
  ANIMATION,
  UI,
} from "./constants/theme";
import { useBackToTop } from "./hooks/index";

const FullscreenImageViewer = lazy(
  () =>
    import("./components/FullscreenImageViewer.tsx").then((mod) => ({
      default: mod.FullscreenImageViewer,
    }))
);

const TrainTransition = lazy(() => import("./pages/train.tsx"));

const InformationBooth = lazy(() =>
  import("./components/InformationBooth.tsx").then((mod) => ({
    default: mod.InformationBooth,
  }))
);

const TestimonialsSection = lazy(() =>
  import("./components/TestimonialsSection.tsx").then((mod) => ({
    default: mod.TestimonialsSection,
  }))
);

/**
 * Spark animation particle interface
 * Represents a single spark element ejected from the train
 */
interface Spark {
  id: number;
  angle: number;
  distance: number;
  duration: number;
  x: number;
  y: number;
}

/**
 * Generates spark particles originating from a DOM rect.
 * @param origin - The x,y origin point for spark emission
 * @returns Array of spark particles with randomized angles and durations
 */
const generateSparks = (origin: { x: number; y: number }): Spark[] =>
  Array.from({ length: UI.sparkCount }, (_, i) => ({
    id: Date.now() + i,
    angle: Math.random() * UI.sparkAngle - UI.sparkAngle / 2,
    distance:
      UI.sparkDistance.min +
      Math.random() * (UI.sparkDistance.max - UI.sparkDistance.min),
    duration:
      UI.sparkDuration.min +
      Math.random() * (UI.sparkDuration.max - UI.sparkDuration.min),
    x: origin.x,
    y: origin.y,
  }));

/**
 * DesignCentralStation - Main application entry point
 *
 * The portfolio homepage showcasing:
 * - Interactive train animation with spark effects
 * - Case study grid with navigation
 * - Information booth with design process map (lazy-loaded)
 * - Skills panel and about section (lazy-loaded)
 * - Passenger testimonials carousel (lazy-loaded)
 *
 * Analytics: Integrates Google Analytics via Vercel
 *
 * NOTE:
 * Information booth, testimonials, and train transition are lazy-loaded
 * to minimize initial bundle size for faster LCP and FCP.
 */

export default function DesignCentralStation() {
  const navigate = useNavigate();

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const showBackToTop = useBackToTop(UI.backToTopThreshold);

  const [sparks, setSparks] = useState<Spark[]>([]);
  const trainRef = useRef<HTMLButtonElement>(null);
  const rearCarRef = useRef<HTMLDivElement>(null);
  const [showTransition, setShowTransition] = useState(false);

  /**
   * Generates and displays spark particles when train is hovered.
   * Sparks emit from the rear car's bottom-left position.
   */
  const handleTrainHover = () => {
    const rearCar = rearCarRef.current;
    if (!rearCar) return;

    const rect = rearCar.getBoundingClientRect();
    setSparks(generateSparks({ x: rect.left + 8, y: rect.bottom - 4 }));

    window.setTimeout(() => setSparks([]), ANIMATION.sparkFly);
  };

  const handleTrainClick = () => {
    setShowTransition(true);

    // Navigate to random case study (first "stop")
    const randomCaseStudy =
      caseStudies[Math.floor(Math.random() * caseStudies.length)];

    window.setTimeout(() => {
      navigate(`/${randomCaseStudy.id}`);
      setShowTransition(false);
    }, 1400); // Match TRANSITION_DURATION_MS from caseStudyConstants
  };

  return (
    <div
      className="min-h-screen text-[#FFFAFB]"
      style={{ backgroundColor: "var(--color-back)" }}
    >
      <div
        className="text-white"
        style={{ backgroundColor: "var(--color-back)" }}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <header className="relative h-[33vh] min-h-[300px] overflow-hidden">
          {fullscreenImage && (
            <Suspense fallback={null}>
              <FullscreenImageViewer
                src={fullscreenImage}
                onClose={() => setFullscreenImage(null)}
              />
            </Suspense>
          )}

          <section className="relative h-[33vh] min-h-[300px] overflow-hidden">
            {/* Hero image with responsive variants for LCP optimization */}
            <picture className="absolute inset-0">
              <source
                media="(min-width: 768px)"
                srcSet="/images/Home/hero2.webp"
                type="image/webp"
              />
              <source
                media="(max-width: 767px)"
                srcSet="/images/Home/hero1.webp"
                type="image/webp"
              />
              <img
                src="/images/Home/hero2.webp"
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover object-center"
                fetchPriority="high"
                loading="eager"
              />
            </picture>

            {/* Dark overlay */}
            <div
              className="absolute inset-0 z-5"
              style={{ backgroundColor: "rgba(20, 21, 21, 0.375)" }}
            ></div>

            {/* Content */}
            <div className="relative h-full flex items-center px-6 md:pl-12 z-10">
              <div className="text-left">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    Final destination:{" "}
                    <span className="metal-heading">Impact</span>
                  </h1>
                </div>
                <h2 className="text-lg md:text-xl text-white/80 font-semibold mb-4">
                  Designing clarity for high-stakes systems
                </h2>
                <h2
                  className="text-base md:text-lg"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Andy Shulman · Senior UX Designer
                </h2>
              </div>
            </div>
          </section>
        </header>

        <main id="main-content" tabIndex={-1}>
          {/* Train Animation Section */}
          <section className="px-6 w-full mx-auto" aria-label="Train">
            <div className="relative mb-12 h-24 flex items-bottom">
              {sparks.map((spark) => (
                <div
                  key={spark.id}
                  className="fixed z-30 pointer-events-none"
                  style={
                    {
                      left: `${spark.x}px`,
                      top: `${spark.y}px`,
                      transform: `rotate(${spark.angle}deg) translateY(-${spark.distance}px)`,
                      animation: `spark-fly ${spark.duration}s ease-out forwards`,
                      "--angle": `${spark.angle}deg`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
                    style={{ boxShadow: "0 0 10px rgba(251, 191, 36, 0.8)" }}
                  />
                </div>
              ))}

              <div className="absolute left-0 right-0 bottom-4 flex items-center z-0">
                <div
                  className="w-full border-t-4 border-dashed"
                  style={{ borderColor: "var(--color-silver)" }}
                ></div>
              </div>

              <div
                className="absolute left-0 right-0 bottom-4 transform -translate-y-1/4 h-1 z-10"
                style={{
                  backgroundColor: "var(--color-silver)",
                  filter: "brightness(0.4)",
                }}
              ></div>

              <div className="absolute top-1 left-0 w-full h-full flex items-center z-20">
                <button
                  ref={trainRef}
                  className="train-animation bg-transparent border-none p-0 cursor-pointer"
                  onClick={handleTrainClick}
                  onMouseOver={handleTrainHover}
                  onFocus={handleTrainHover}
                  aria-label="Click train for random case study journey"
                >
                  <div className="flex items-end gap-0">
                    <div ref={rearCarRef} className="rear-car">
                      <TrainCar variant="rear" />
                    </div>
                    <TrainCar variant="middle" />
                    <TrainCar variant="middle" />
                    <TrainCar variant="front" />
                  </div>
                </button>
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
                  className="group relative bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all cursor-pointer overflow-hidden block"
                >
                  <div className="mb-4">
                    {project.thumbnail && (
                      <img
                        src={project.thumbnail}
                        alt={`${project.name} thumbnail`}
                        className="w-full h-24 md:h-28 object-cover rounded-md mb-4"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-black/60 text-white/70 px-2 py-1 rounded-md text-xs border border-white/10">
                    est: {project.year}
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    </div>
                    <ChevronRight
                      className="w-5 h-5 group-hover:text-white group-hover:translate-x-1 transition-all"
                      style={{ color: "var(--color-text-secondary)" }}
                    />
                  </div>

                  <p className="text-white/70 text-sm mb-4">
                    {project.tagline}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="w-4 h-4"
                        style={{ color: "var(--color-silver)" }}
                      />
                      <span
                        className=""
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {project.impact}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Lazy-loaded Information Booth */}
          <Suspense
            fallback={
              <div className="py-16 px-6 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin" />
              </div>
            }
          >
            <InformationBooth onFullscreenImage={setFullscreenImage} />
          </Suspense>

          {/* Lazy-loaded Testimonials Section */}
          <Suspense
            fallback={
              <div className="mb-16 py-10 px-6 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin" />
              </div>
            }
          >
            <TestimonialsSection />
          </Suspense>
        </main>

        {/* Contact - Thanks for Riding */}
        <footer
          className="text-center bg-black/40 py-12 border-t-2 "
          style={{ borderColor: `${THEME_COLOR}30` }}
        >
          <Train
            className="w-16 h-16 mx-auto mb-6"
            style={{ color: THEME_COLOR }}
          />
          <h3 className="text-4xl font-bold mb-4">Thanks for Riding!</h3>
          <p className="text-2xl text-white/80 mb-8">
            Let&apos;s build your next impactful experience
          </p>
          <div className="mt-8 text-sm" style={{ color: TEXT_SECONDARY }}>
            Montrose, Colorado •{" "}
            <u>
              <a href="https://www.linkedin.com/in/andrea-shulman/">LinkedIn</a>
            </u>{" "}
            • andyshulman8@gmail.com
          </div>
          <div className="mt-12 text-xs text-white/50">
            This site uses anonymized analytics (including Google Analytics) to understand general usage.          </div>
        </footer>

        <BackToTopButton isVisible={showBackToTop} />
        {showTransition && (
          <Suspense fallback={null}>
            <TrainTransition isActive={showTransition} direction="right" />
          </Suspense>
        )}
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

