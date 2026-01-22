/**
 * FullscreenImageViewer Component
 *
 * Purpose: Provides a high-immersion, modal-based viewing experience for
 * both images and videos across the portfolio and case studies [1, 4].
 *
 * Mixed Media Support:
 * - Uses 'getMediaSrc' to normalize strings or media objects [1, 5].
 * - Uses 'isVideo' to detect file extensions (.mp4, .webm, .mov) or explicit types [5].
 *
 * Navigation & Interaction:
 * - Supports gallery navigation (prev/next) for collections like "Sneak Peeks" [1, 6].
 * - Implements click-to-close on the backdrop and a dedicated close button [6, 7].
 *
 * Design & Performance:
 * - Styling: Employs a metallic window frame design with "corner rivets,"
 *   simulated glass reflections, and radial gradients for depth [1, 8, 9].
 * - Performance: Uses 'e.stopPropagation()' on the modal content to prevent
 *   unintended closing when interacting with media or controls [7].
 */

import { X, ChevronLeft, ChevronRight } from "lucide-react";
type MediaItem = string | { src: string; type: "image" | "video" };

interface FullscreenImageViewerProps {
  src?: string | null;
  images?: MediaItem[];
  currentIndex?: number;
  onChangeIndex?: (i: number) => void;
  onClose: () => void;
}

export const FullscreenImageViewer = ({
  src,
  images,
  currentIndex = 0,
  onChangeIndex,
  onClose,
}: FullscreenImageViewerProps) => {
  // Helper functions
  const getMediaSrc = (item: MediaItem): string => {
    return typeof item === "string" ? item : item.src;
  };

  const isVideo = (item: MediaItem): boolean => {
    if (typeof item === "string") {
      return (
        item.toLowerCase().endsWith(".mp4") ||
        item.toLowerCase().endsWith(".webm") ||
        item.toLowerCase().endsWith(".mov")
      );
    }
    return item.type === "video";
  };

  // Build gallery
  const gallery = images && images.length ? images : src ? [src] : [];
  if (!gallery.length) return null;

  const active =
    currentIndex >= 0 && currentIndex < gallery.length ? currentIndex : 0;
  const prev = () =>
    onChangeIndex &&
    onChangeIndex((active - 1 + gallery.length) % gallery.length);
  const next = () =>
    onChangeIndex && onChangeIndex((active + 1) % gallery.length);

  const currentItem = gallery[active];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg z-10"
        style={{
          background: "linear-gradient(145deg, #333 0%, #222 100%)",
          border: "2px solid #555",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.1)",
        }}
      >
        <X size={24} style={{ color: "#aaa" }} />
      </button>

      <div
        className="relative max-w-7xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative p-8 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)",
            border: "6px solid #333",
            boxShadow:
              "inset 0 8px 32px rgba(0,0,0,0.8), 0 16px 48px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="relative p-3 rounded-xl overflow-hidden w-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)",
              border: "4px solid #444",
              boxShadow:
                "inset 0 3px 12px rgba(0,0,0,0.9), inset 0 0 0 3px rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="relative rounded-lg w-full overflow-hidden h-[70vh]"
              style={{
                background: "linear-gradient(145deg, #1f1f1f 0%, #111 100%)",
                border: "2px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.9)",
              }}
            >
              {/* Render video or image */}
              {isVideo(currentItem) ? (
                <video
                  src={getMediaSrc(currentItem)}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-left-top"
                />
              ) : (
                <img
                  src={getMediaSrc(currentItem)}
                  alt={`Fullscreen preview ${active + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-left-top"
                />
              )}

              {/* Window glare/reflection */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 50%), 
                    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%), 
                    linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)
                  `,
                }}
              />
            </div>

            {/* Corner rivets */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map(
              (pos, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 rounded-full shadow-md`}
                  style={{
                    [pos.includes("top") ? "top" : "bottom"]: "-3px",
                    [pos.includes("left") ? "left" : "right"]: "-3px",
                    background: "radial-gradient(circle, #666 30%, #444 70%)",
                    border: "2px solid #888",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.6)",
                  }}
                />
              ),
            )}

            {/* Navigation controls */}
            {gallery.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 items-center z-10">
                <button
                  onClick={prev}
                  className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                  style={{
                    background: "linear-gradient(145deg, #333 0%, #222 100%)",
                    border: "3px solid #555",
                  }}
                >
                  <ChevronLeft size={24} style={{ color: "#aaa" }} />
                </button>

                <div className="flex gap-3">
                  {gallery.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => onChangeIndex && onChangeIndex(i)}
                      className="w-4 h-4 rounded-full cursor-pointer transition-all hover:scale-125"
                      style={{
                        background:
                          i === active ? "#aaa" : "rgba(170,170,170,0.4)",
                        boxShadow:
                          i === active
                            ? "0 0 12px rgba(170,170,170,0.8)"
                            : "none",
                        border: "2px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                  style={{
                    background: "linear-gradient(145deg, #333 0%, #222 100%)",
                    border: "3px solid #555",
                  }}
                >
                  <ChevronRight size={24} style={{ color: "#aaa" }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
