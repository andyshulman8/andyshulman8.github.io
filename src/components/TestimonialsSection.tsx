import { TEXT_MUTED } from "../constants/theme";
import { testimonials } from "../data/testimonials";

/**
 * TestimonialsSection Component
 *
 * Displays passenger testimonials in a grid layout with quote styling
 * Lazy-loaded to reduce initial bundle size
 */
export function TestimonialsSection() {
  return (
    <section
      className="mb-16 py-10 px-6 w-full mx-auto"
      style={{ backgroundColor: "var(--color-back)" }}
      aria-label="Passenger Testimonials"
    >
      {/* Ticket Banner Separator with Testimonials (match All Aboard background) */}
      <div
        className="relative py-12 px-6 overflow-hidden border-y-0"
        style={{ backgroundColor: "var(--color-back)" }}
      >
        <img
          loading="lazy"
          decoding="async"
          src="/images/Home/tickets.webp"
          alt="Tickets banner"
          className="absolute top-0 rounded left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
        />

        {/* Content overlay */}
        <div className="relative z-10 w-full mx-auto">
          <div className="flex items-left justify-left gap-4">
            <h3 className="text-3xl font-bold text-white">
              Passenger Testimonials
            </h3>
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
              style={{ color: "var(--color-silver)" }}
            >
              &quot;
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <p className="text-white/80 italic mb-8 leading-relaxed flex-grow">
                {testimonial.quote}
              </p>

              <div
                className="flex items-center gap-4 pt-6 border-t"
                style={{ borderColor: "var(--color-silver)" }}
              >
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{
                      color: "var(--color-silver)",
                      borderColor: "var(--color-silver)",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{
                      color: "var(--color-back)",
                      backgroundColor: "var(--color-silver)",
                    }}
                  >
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}

                <div>
                  <div
                    className="font-bold text-sm tracking-tight"
                    style={{ color: "var(--color-silver)" }}
                  >
                    {testimonial.author}
                  </div>
                  <div
                    className="text-[11px] uppercase tracking-widest leading-tight"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {testimonial.role} <br />
                    <span className="" style={{ color: TEXT_MUTED }}>
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-[-15px] right-4 text-7xl font-serif opacity-10 transition-transform group-hover:translate-y-1 select-none"
              style={{ color: "var(--color-silver)" }}
            >
              &quot;
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
