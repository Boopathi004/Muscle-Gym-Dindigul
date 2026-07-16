"use client";

import * as React from "react";
import Link from "next/link";

/* ----------------------------------------------------------------
 * ScrollReelCoaches
 * Counter-rotating scroll reel + per-character text rise.
 * Adapted for larger side-by-side coach images.
 * ---------------------------------------------------------------- */

interface Coach {
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  badge: string;
  image: string;
  branch: string;
}

const COACHES: Coach[] = [
  {
    name: "Master RAJKUMAR",
    specialty: "Head Coach · General Secretary - Dindigul District Gym Owner's Association",
    experience: "18+ Years",
    badge: "⭐ HEAD COACH",
    bio: "With over 18 years of professional fitness training experience, Master Rajkumar has trained and transformed thousands of individuals in Dindigul. He specializes in competition-level bodybuilding coaching, powerlifting, strength conditioning, and lifestyle transformations.",
    image: "/trainers/rajkumar.jpg",
    branch: "All Branches",
  },
  {
    name: "Rajesh Kumar",
    specialty: "Personal Trainer & Fitness Expert",
    experience: "5+ Years",
    badge: "⭐ PRO COACH",
    bio: "Rajesh is a dedicated personal trainer who helps clients achieve their specific fitness goals. His structured training programs focus on proper technique, consistent progress, and sustainable lifestyle changes.",
    image: "/trainers/coach1.jpg",
    branch: "All Branches",
  },
  {
    name: "Suresh Kumar",
    specialty: "HIIT & Cardio Endurance Coach",
    experience: "6 Years",
    badge: "HIIT EXPERT",
    bio: "Suresh is a passionate coach who specializes in cardiovascular endurance, fat loss programs, and metabolic conditioning. He designs engaging high-energy sessions that burn fat and build stamina. Certified Group Fitness Instructor.",
    image: "/trainers/coach2.jpg",
    branch: "Muscle Fitness Studio Unisex, Trichy Road",
  },
  {
    name: "Priya Sharma",
    specialty: "Weight Loss & Functional Movement",
    experience: "5 Years",
    badge: "WOMEN'S SPECIALIST",
    bio: "Priya focuses on corrective exercises, functional movement, and targeted fat loss plans. She is dedicated to helping members build core strength and improve flexibility. ISSA Certified · Female Fitness Expert.",
    image: "/trainers/coach3.jpg",
    branch: "Muscle Pro Fitness Studio Unisex, Palani Road",
  },
  {
    name: "Selvam",
    specialty: "Strength & Conditioning Coach",
    experience: "4 Years",
    badge: "STRENGTH EXPERT",
    bio: "Selvam specializes in weight training, muscle hypertrophy, and personalized competition preparation. He focuses on safety, proper biomechanics, and consistent progress tracking.",
    image: "/trainers/coach4.jpg",
    branch: "Muscle Gym, Bagambur",
  },
];

/* Geometry - scaled up for bigger images */
const CELL_WIDTH = 190;
const CELL_HEIGHT = 260;
const GAP = 12;
const STEP = 3 * (CELL_HEIGHT + GAP);

const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const FEATURED_SHADOW =
  "0 4px 20px -2px rgba(0,0,0,0.5), 0 2px 8px -1px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.6)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-2xl border border-brand-dark-gray/20 bg-gradient-to-b from-brand-surface-card/30 to-brand-black/60 blur-[2px]"
      style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
    />
  );
}

function Featured({ 
  src, 
  alt, 
  isActive, 
  onClick 
}: { 
  src: string; 
  alt?: string; 
  isActive?: boolean; 
  onClick?: () => void; 
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-2xl transition-all duration-500",
        isActive 
          ? "ring-2 ring-brand-yellow/80 shadow-[0_0_30px_rgba(244,208,63,0.35)] scale-100 opacity-100 cursor-default" 
          : "opacity-40 blur-[0.5px] scale-90 saturate-50 cursor-pointer hover:opacity-75 hover:scale-95"
      )}
      style={{ 
        width: CELL_WIDTH, 
        height: CELL_HEIGHT, 
        boxShadow: isActive ? FEATURED_SHADOW : "none" 
      }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
      />
      {/* subtle gradient sheen for active element */}
      {isActive ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay"
          style={{
            background:
              "linear-gradient(220deg, rgba(244,208,63,0) 40%, rgba(244,208,63,0.2) 50%, rgba(255,140,0,0.1) 60%, rgba(244,208,63,0) 70%)",
          }}
        />
      ) : (
        /* desaturate non-active coach */
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-black/30 mix-blend-saturation"
        />
      )}
    </div>
  );
}

function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function ScrollReelCoaches() {
  const coaches = COACHES;
  const count = coaches.length;

  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;
      setIndex(next);
      setExiting(true);
      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  const goTo = React.useCallback(
    (target: number) => {
      if (animating.current || target === index) return;
      const dir = target > index ? 1 : -1;
      const steps = Math.abs(target - index);
      let stepsDone = 0;
      const doStep = () => {
        if (stepsDone >= steps) return;
        stepsDone++;
        paginate(dir as 1 | -1);
        if (stepsDone < steps) timeouts.current.push(setTimeout(doStep, SLIDE_MS + 50));
      };
      doStep();
    },
    [index, paginate]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); paginate(1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); paginate(-1); }
  };

  const centerIdx = (count - 1) / 2;

  /* Columns Layout with Derived Indices */
  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    coaches.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [coaches, count]);

  const leftItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    coaches.forEach((_, k) => {
      const coachIndex = (2 * centerIdx - k - 1 + count) % count;
      items.push({ type: "featured", i: coachIndex });
      if (k < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [coaches, count, centerIdx]);

  const rightItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    coaches.forEach((_, k) => {
      const coachIndex = (2 * centerIdx - k + 1 + count) % count;
      items.push({ type: "featured", i: coachIndex });
      if (k < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [coaches, count, centerIdx]);

  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = coaches[displayIndex];
  const STAGGER = 6;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Coaching Staff"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative flex w-full max-w-[1200px] mx-auto flex-col items-stretch gap-8 overflow-hidden rounded-3xl border border-brand-dark-gray/50 bg-brand-surface-card/30 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.5)] outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow md:flex-row p-6 md:p-8"
    >
      {/* Reel section */}
      <div
        aria-hidden="true"
        className="relative h-[300px] md:h-[450px] w-full md:w-[610px] shrink-0 self-stretch overflow-hidden flex items-center justify-center"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-x-0 flex items-center justify-center gap-3">
          {/* Left column - side view, hidden on small devices */}
          <div
            className="hidden md:flex shrink-0 flex-col gap-3 will-change-transform"
            style={colStyle(sideY)}
          >
            {leftItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured key={i} src={coaches[item.i].image} alt={coaches[item.i].name} isActive={false} onClick={() => goTo(item.i)} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Middle column - active focus, always visible */}
          <div
            className="flex shrink-0 flex-col gap-3 will-change-transform"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured key={i} src={coaches[item.i].image} alt={coaches[item.i].name} isActive={item.i === index} onClick={() => goTo(item.i)} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Right column - side view, hidden on small devices */}
          <div
            className="hidden md:flex shrink-0 flex-col gap-3 will-change-transform"
            style={colStyle(sideY)}
          >
            {rightItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured key={i} src={coaches[item.i].image} alt={coaches[item.i].name} isActive={false} onClick={() => goTo(item.i)} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-4 md:py-6">
        <div className="flex flex-col gap-4">
          {/* Badge */}
          <span className="w-max bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            {current.badge}
          </span>

          {/* Animated name + specialty */}
          <div
            className="relative w-full max-w-[450px] overflow-hidden"
            aria-live="polite"
          >
            {/* invisible sizer */}
            <div aria-hidden="true" className="invisible flex min-h-[160px] flex-col gap-4">
              <p className="m-0 text-3xl font-bebas tracking-wider text-white">{current.name}</p>
              <p className="m-0 text-base font-semibold text-brand-yellow">{current.specialty}</p>
              <p className="m-0 text-sm leading-relaxed text-brand-gray">{current.bio}</p>
            </div>
            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-4 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit"
              )}
            >
              <p className="m-0 text-3xl font-bebas tracking-wider text-white">
                <Chars text={current.name} startIndex={0} staggerMs={STAGGER} />
              </p>
              <p className="m-0 text-base font-semibold text-brand-yellow">
                <Chars text={current.specialty} startIndex={current.name.length + 2} staggerMs={STAGGER} />
              </p>
              <p className="m-0 text-sm leading-relaxed text-brand-gray">
                <Chars text={current.bio} startIndex={current.name.length + current.specialty.length + 4} staggerMs={STAGGER} />
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-brand-gray mt-2">
            <span className="text-brand-orange">{current.experience}</span>
            <span>·</span>
            <span>{current.branch}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label="Previous coach"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-brand-dark-gray/80 bg-transparent text-white transition-all duration-200 hover:enabled:scale-110 hover:enabled:border-brand-yellow hover:enabled:text-brand-yellow active:enabled:scale-95 disabled:cursor-default disabled:opacity-30"
          >
            <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.5 2.5 3.5 6l4 3.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {coaches.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === index
                    ? "w-6 h-2 bg-brand-yellow"
                    : "w-2 h-2 bg-brand-dark-gray/60 hover:bg-brand-gray"
                }`}
                aria-label={`Go to coach ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label="Next coach"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-brand-dark-gray/80 bg-transparent text-white transition-all duration-200 hover:enabled:scale-110 hover:enabled:border-brand-yellow hover:enabled:text-brand-yellow active:enabled:scale-95 disabled:cursor-default disabled:opacity-30"
          >
            <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4.5 2.5 4 3.5-4 3.5" />
            </svg>
          </button>

          <Link
            href="/join"
            className="ml-auto bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-full hover:scale-105 transition-all tracking-widest"
          >
            Book Session
          </Link>
        </div>
      </div>
    </div>
  );
}
