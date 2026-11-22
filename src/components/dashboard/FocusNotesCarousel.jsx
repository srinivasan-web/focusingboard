import { useState, useEffect, useCallback, useRef } from "react";
import { Check, ChevronLeft, ChevronRight, Clock, Sparkles } from "lucide-react";
import Icon from "../ui/Icon.jsx";

const slides = [
  {
    title: "Make today count.",
    description: "A little focus goes a long way.",
    taskLabel: "NEXT UP",
    task: "Design landing page",
    progress: 62,
    statusIcon: Check,
    statusTone: "bg-focus-success-soft text-focus-success",
  },
  {
    title: "Small steps, big progress.",
    description: "Keep your priorities in view.",
    taskLabel: "IN PROGRESS",
    task: "Fix navigation",
    progress: 67,
    statusIcon: Clock,
    statusTone: "bg-focus-info-soft text-focus-info",
  },
  {
    title: "Celebrate the wins.",
    description: "Every completed task moves you forward.",
    taskLabel: "COMPLETED",
    task: "Onboarding copy",
    progress: 100,
    statusIcon: Sparkles,
    statusTone: "bg-focus-primary-soft text-focus-primary",
  },
];

export default function FocusNotesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const activeSlide = slides[activeIndex];

  const showSlide = useCallback((index) => {
    setActiveIndex((prev) => {
      const next = (index + slides.length) % slides.length;
      return next;
    });
  }, []);

  const nextSlide = useCallback(() => {
    showSlide(activeIndex + 1);
  }, [activeIndex, showSlide]);

  const prevSlide = useCallback(() => {
    showSlide(activeIndex - 1);
  }, [activeIndex, showSlide]);

  // Auto-advance with pause on hover/focus and reduced motion respect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation when carousel is focused
  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevSlide();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }
  }

  return (
    <section
      ref={containerRef}
      aria-label="Focus Notes"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="focus-notes-gradient relative overflow-hidden rounded-[20px] px-6 py-6 text-white shadow-card transition-all sm:px-8 sm:py-7 focus-ring"
    >
      <div className="relative z-10 flex min-h-[140px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
        {/* Left Content Area */}
        <div
          key={activeIndex}
          aria-live="polite"
          aria-atomic="true"
          className="min-w-0 flex-1 animate-fade-in"
        >
          {/* Eyebrow and Slide Counter */}
          <div className="mb-2.5 flex items-center gap-3 text-[10px] font-bold tracking-[0.14em] text-white/80">
            <span>FOCUS NOTES</span>
            <span aria-hidden="true" className="h-2.5 w-[1px] bg-white/40" />
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Heading and Description */}
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl text-white drop-shadow-sm">
            {activeSlide.title}
          </h2>
          <p className="mt-1 max-w-md text-xs sm:text-sm text-white/85 leading-relaxed">
            {activeSlide.description}
          </p>

          {/* Progress Indicators */}
          <div className="mt-5 flex items-center gap-2">
            {slides.map((slide, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`Jump to slide ${index + 1}: ${slide.title}`}
                  aria-pressed={isSelected}
                  onClick={() => showSlide(index)}
                  className="group py-1.5 focus-ring rounded"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-1 rounded-pill transition-all duration-300 ${
                      isSelected
                        ? "w-8 bg-white shadow-sm"
                        : "w-4 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Preview Card (Slide Preview) */}
        <div
          key={`card-${activeIndex}`}
          className="hidden w-48 shrink-0 rotate-2 rounded-2xl bg-white p-3.5 text-focus-text shadow-floating-preview transition-all duration-300 hover:rotate-0 sm:block animate-fade-in"
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-lg ${activeSlide.statusTone}`}
            >
              <Icon icon={activeSlide.statusIcon} size={14} strokeWidth={2.4} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold tracking-wider text-focus-subtle">
                {activeSlide.taskLabel}
              </p>
              <p className="truncate text-xs font-bold text-focus-text">
                {activeSlide.task}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2.5">
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-pill bg-focus-canvas"
              role="progressbar"
              aria-label={`${activeSlide.task} progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={activeSlide.progress}
            >
              <span
                className="block h-full rounded-pill bg-focus-primary transition-all duration-500 ease-out"
                style={{ width: `${activeSlide.progress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-focus-primary">
              {activeSlide.progress}%
            </span>
          </div>
        </div>

        {/* Controls: Prev & Next */}
        <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous focus note"
            className="grid size-9 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95 focus-ring"
          >
            <Icon icon={ChevronLeft} size={19} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next focus note"
            className="grid size-9 place-items-center rounded-xl bg-white text-focus-primary shadow-sm transition-all hover:bg-white/90 hover:scale-105 active:scale-95 focus-ring"
          >
            <Icon icon={ChevronRight} size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
