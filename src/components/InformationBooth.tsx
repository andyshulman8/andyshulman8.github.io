import { useState, useRef, useCallback, useMemo } from "react";
import { Info } from "lucide-react";
import { SkillsBoard } from "./Skills/SkillsBoard.tsx";
import {
  INFO_COLOR,
  SILVER,
  UI,
} from "../constants/theme";
import { useIntersectionOnce } from "../hooks/useIntersectionOnce";

interface InformationBoothProps {
  onFullscreenImage: (src: string) => void;
}

/**
 * Skeleton placeholder shown while the map iframe is loading.
 */
const MapSkeleton = () => (
  <div className="relative w-full h-full animate-pulse bg-neutral-900">
    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/60 to-neutral-900/60" />
  </div>
);

export function InformationBooth({ onFullscreenImage }: InformationBoothProps) {
  const [processLoaded, setProcessLoaded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const memoizedCallback = useCallback(() => setMapLoaded(true), []);
  const memoizedOptions = useMemo(() => ({ threshold: 0.25 }), []);

  useIntersectionOnce(mapRef, memoizedCallback, memoizedOptions);

  return (
    <section className="py-16 px-6" aria-label="Information Booth">
      <div className="grid gap-8">
        {/* Information Booth Panel */}
        <div
          className="relative bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
          style={{
            boxShadow: `${UI.infoBoxShadow.x}px ${UI.infoBoxShadow.y}px ${UI.infoBoxShadow.blur}px ${INFO_COLOR}10`,
          }}
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
                      transform: "scale(1.2)",
                    }}
                  />

                  {/* Sign face */}
                  <div className="relative flex items-center gap-3 px-1 py-2">
                    <Info
                      className="w-8 h-8 relative z-10"
                      style={{ color: "var(--color-silver)" }}
                    />
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
            <p
              className="text-left mb-6"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              This is my design process map. Each project follows a unique
              route through these stations, combining methodologies from
              Stanford d.school, Business Strategy, Behavior Design, and
              Sustainability frameworks.
            </p>

            {/* Process Map Image */}
            <div className="bg-[#f5e6d3] rounded-xl border border-black/20 overflow-hidden relative aspect-video">
              {/* Loading skeleton */}
              <div
                aria-hidden={processLoaded}
                className={`absolute inset-0 transition-opacity duration-${UI.imageLoadingDuration} ${
                  processLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
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
              <button
                className={`w-full h-full cursor-pointer hover:opacity-90 transition-opacity duration-${UI.imageLoadingDuration} border-0 bg-transparent p-0 ${
                  processLoaded ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => onFullscreenImage("/images/Home/process.webp")}
                aria-label="View design process map in fullscreen"
              >
                <img
                  src="/images/Home/process.webp"
                  alt="Design process map"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setProcessLoaded(true)}
                  onError={() => setProcessLoaded(true)}
                  className="w-full h-full object-cover"
                />
              </button>
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
              <div
                className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ borderColor: SILVER }}
              >
                <img
                  src="/images/Home/headshot.webp"
                  alt="Andy Shulman"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="text-white/90 text-2xl font-bold self-center">
                About the Conductor
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-4">
                <p className="text-white/80 leading-relaxed">
                  I&apos;m Andy, a Senior UX Designer with{" "}
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
                  </span>{" "}
                  transforming complex enterprise systems into intuitive
                  experiences. I have a Master&apos;s in Sustainability Science
                  from Stanford and a skill set that brings together design
                  thinking, behavior design, business strategy, and
                  systems thinking.
                </p>

                <p className="text-white/80 leading-relaxed">
                  My work spans enterprise B2B SaaS, health tech, to
                  mission-driven organizations. I&apos;ve designed AI-driven
                  features, laid foundations for IBM partnerships, and
                  helped teams from cancer treatment centers to global
                  energy companies work more efficiently.
                </p>
                <p className="text-white/80 leading-relaxed">
                  I am currently based in Montrose, Colorado with my
                  adventure dog, exploring opportunities in climate tech
                  and mental health spaces. Check out my adventures:
                </p>
              </div>

              <div className="md:col-span-1 h-full">
                <div
                  ref={mapRef}
                  className="bg-[#0f0f0f] border-2 border-white/10 rounded-lg overflow-hidden h-full hover:border-white/30 transition-all duration-300"
                  style={{
                    boxShadow: `0 0 20px ${INFO_COLOR}${Math.round(
                      UI.shadowOpacities.default * 255,
                    )
                      .toString(16)
                      .padStart(2, "0")}`,
                  }}
                >
                  <div className="w-full h-full aspect-video">
                    {mapLoaded ? (
                      <iframe
                        src="https://www.google.com/maps/d/embed?mid=1QR8iQSZT8-UmjddIlJR1cA6dtaqnYTHc"
                        className="w-full h-full"
                        loading="lazy"
                        title="Map preview"
                      />
                    ) : (
                      <MapSkeleton />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
