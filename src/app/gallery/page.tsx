"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Filter, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type Category = "all" | "achievements" | "transformations";

interface GalleryItem {
  id: number;
  src: string;
  category: Exclude<Category, "all">;
  title: string;
  desc: string;
}

const items: GalleryItem[] = [
  // ── Achievements ─────────────────────────────────────────────────────────
  {
    id: 1,
    src: "/gallery/achievements/ach1.jpg",
    category: "achievements",
    title: "Championship Victory",
    desc: "Our athletes dominating the regional bodybuilding championship stage.",
  },
  {
    id: 2,
    src: "/gallery/achievements/ach2.jpg",
    category: "achievements",
    title: "Competition Medals",
    desc: "Medal winners proudly representing Muscle Gym Dindigul.",
  },
  {
    id: 3,
    src: "/gallery/achievements/ach3.jpg",
    category: "achievements",
    title: "Trophy Ceremony",
    desc: "Award ceremony celebrating our competitors' hard work.",
  },
  {
    id: 4,
    src: "/gallery/achievements/ach4.jpg",
    category: "achievements",
    title: "Stage Performance",
    desc: "Flawless physique presentation at the district-level competition.",
  },
  {
    id: 5,
    src: "/gallery/achievements/ach5.jpg",
    category: "achievements",
    title: "Team Champions",
    desc: "Gold & silver medalists from our unisex training batch.",
  },
  {
    id: 6,
    src: "/gallery/achievements/ach6.jpg",
    category: "achievements",
    title: "Bodybuilding Contest",
    desc: "Physique athletes in peak condition at the state-level event.",
  },
  {
    id: 7,
    src: "/gallery/achievements/ach7.jpg",
    category: "achievements",
    title: "Prize Distribution",
    desc: "Exciting prize ceremony with our winning team.",
  },
  {
    id: 8,
    src: "/gallery/achievements/ach8.jpg",
    category: "achievements",
    title: "Fitness Showcase",
    desc: "Bodybuilders with trophies at the inter-district competition.",
  },
  {
    id: 9,
    src: "/gallery/achievements/ach9.jpg",
    category: "achievements",
    title: "District Trophy",
    desc: "Muscle Gym members receiving district-level athletic recognition.",
  },
  {
    id: 10,
    src: "/gallery/achievements/ach10.jpg",
    category: "achievements",
    title: "Champions Collage",
    desc: "Highlight reel of our members' competition victories.",
  },
  {
    id: 11,
    src: "/gallery/achievements/ach11.jpg",
    category: "achievements",
    title: "Fat Loss Achievement",
    desc: "Member's documented fat loss journey — from 102 kg down to competition-ready conditioning.",
  },
  {
    id: 12,
    src: "/gallery/achievements/ach12.jpg",
    category: "achievements",
    title: "Strength Achievement",
    desc: "Powerlifting milestone — from beginner to advanced strength in 4 months.",
  },
  {
    id: 13,
    src: "/gallery/achievements/ach13.jpg",
    category: "achievements",
    title: "Machine Gains",
    desc: "Isolation work achievement — muscle definition built through dedicated cable and machine training.",
  },
  {
    id: 14,
    src: "/gallery/achievements/ach14.jpg",
    category: "achievements",
    title: "Coach-Guided Win",
    desc: "Head coach demonstrating technique — a milestone moment in a member's personalised programme.",
  },
  {
    id: 15,
    src: "/gallery/achievements/ach15.jpg",
    category: "achievements",
    title: "Power Rack PR",
    desc: "Olympic squat and bench press personal record — a major strength achievement.",
  },
  {
    id: 16,
    src: "/gallery/achievements/ach16.jpg",
    category: "achievements",
    title: "Muscle Building Win",
    desc: "Lean muscle building achievement documented over a 6-month hypertrophy plan.",
  },
  {
    id: 101,
    src: "/gallery/achievements/ach17.jpeg",
    category: "achievements",
    title: "Championship Success",
    desc: "A proud moment showcasing dedication and hard work at the championship.",
  },
  {
    id: 102,
    src: "/gallery/achievements/ach18.jpeg",
    category: "achievements",
    title: "Medal Winner",
    desc: "Celebrating an incredible victory and bringing home the medal.",
  },
  {
    id: 103,
    src: "/gallery/achievements/ach19.jpeg",
    category: "achievements",
    title: "Trophy Presentation",
    desc: "Outstanding performance rewarded with a well-deserved trophy.",
  },

  // ── Transformations ───────────────────────────────────────────────────────
  {
    id: 17,
    src: "/gallery/transformations/trans1.jpg",
    category: "transformations",
    title: "Elite Physique",
    desc: "Member showcasing incredible muscle definition — results from 6 months of structured training.",
  },
  {
    id: 18,
    src: "/gallery/transformations/trans2.jpg",
    category: "transformations",
    title: "Power Training",
    desc: "Functional strength transformation combining boxing bag and sledgehammer conditioning.",
  },
  {
    id: 19,
    src: "/gallery/transformations/trans3.jpg",
    category: "transformations",
    title: "Tyre Flip Progress",
    desc: "Explosive functional training milestone — tyre flips as part of the transformation journey.",
  },
  {
    id: 20,
    src: "/gallery/transformations/trans4.jpg",
    category: "transformations",
    title: "Rope Training",
    desc: "Battle rope conditioning results — improved cardiovascular endurance and upper-body strength.",
  },
  {
    id: 21,
    src: "/gallery/transformations/trans5.jpg",
    category: "transformations",
    title: "Iron Chains",
    desc: "Variable resistance chain training milestone for our advanced transformation members.",
  },
  {
    id: 22,
    src: "/gallery/transformations/trans6.jpg",
    category: "transformations",
    title: "Body Recomposition",
    desc: "Dramatic body recomposition achieved under expert supervision on the main training floor.",
  },
  {
    id: 23,
    src: "/gallery/transformations/trans7.jpg",
    category: "transformations",
    title: "Morning Session Result",
    desc: "Consistent early morning training over 5 months — visible physique transformation.",
  },
  {
    id: 24,
    src: "/gallery/transformations/trans9.jpg",
    category: "transformations",
    title: "Group Progress",
    desc: "Batch transformation — group training members after 90-day structured programme.",
  },
  {
    id: 25,
    src: "/gallery/transformations/trans11.jpg",
    category: "transformations",
    title: "Cardio & Core",
    desc: "Cardio-focused transformation with dedicated core conditioning results.",
  },
  {
    id: 26,
    src: "/gallery/transformations/trans13.jpg",
    category: "transformations",
    title: "Motivational Milestone",
    desc: "A member's 3-month milestone photo — the Muscle Gym transformation programme in action.",
  },
  {
    id: 28,
    src: "/gallery/transformations/trans18.jpg",
    category: "transformations",
    title: "Pro-Level Physique",
    desc: "Member reaching competition-standard conditioning through the Muscle Gym Pro programme.",
  },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Photos" },
  { value: "achievements", label: "Achievements" },
  { value: "transformations", label: "Transformations" },
];

// ── Shuffle grid data — 16 real site images ──────────────────────────────────
const shuffleData = [
  { id: 1,  src: "/gallery/achievements/ach1.jpg" },
  { id: 2,  src: "/gallery/achievements/ach2.jpg" },
  { id: 3,  src: "/gallery/achievements/ach3.jpg" },
  { id: 4,  src: "/gallery/achievements/ach4.jpg" },
  { id: 5,  src: "/gallery/achievements/ach5.jpg" },
  { id: 6,  src: "/gallery/achievements/ach6.jpg" },
  { id: 7,  src: "/gallery/achievements/ach7.jpg" },
  { id: 8,  src: "/gallery/achievements/ach8.jpg" },
  { id: 9,  src: "/gallery/transformations/trans1.jpg" },
  { id: 10, src: "/gallery/transformations/trans2.jpg" },
  { id: 11, src: "/gallery/transformations/trans3.jpg" },
  { id: 12, src: "/gallery/transformations/trans4.jpg" },
  { id: 13, src: "/gallery/transformations/trans5.jpg" },
  { id: 14, src: "/gallery/transformations/trans6.jpg" },
  { id: 15, src: "/gallery/transformations/trans7.jpg" },
  { id: 16, src: "/gallery/transformations/trans9.jpg" },
  { id: 101, src: "/gallery/achievements/ach17.jpeg" },
  { id: 102, src: "/gallery/achievements/ach18.jpeg" },
  { id: 103, src: "/gallery/achievements/ach19.jpeg" },
];

const shuffleArray = (arr: typeof shuffleData) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateSquares = (isInitial: boolean = false) => {
  const data = isInitial ? shuffleData : shuffleArray(shuffleData);
  return data.map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url("${encodeURI(sq.src)}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState(() => generateSquares(true));

  useEffect(() => {
    const tick = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(tick, 3000);
    };
    timeoutRef.current = setTimeout(tick, 3000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[340px] sm:h-[400px] gap-1">
      {squares}
    </div>
  );
};

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  const openLightbox = (id: number) => {
    const idx = filtered.findIndex((i) => i.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex((lightboxIndex + dir + filtered.length) % filtered.length);
    },
    [lightboxIndex, filtered.length]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > 50) navigate(1);
    if (touchEnd - touchStart > 50) navigate(-1);
  };

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SHUFFLE HERO ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 mb-12 sm:mb-20">
          {/* Left: text */}
          <div>
            <span className="block mb-3 text-xs font-bold uppercase tracking-widest text-brand-yellow">
              Real Moments · Real Results
            </span>
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white leading-none page-heading-left">
              GYM <span className="text-brand-yellow">GALLERY</span>
            </h1>
            <p className="text-brand-gray text-sm sm:text-base max-w-md mt-6">
              Explore our athletes, achievements, and transformation journeys.
              Every photo is a real moment from Muscle Gym Dindigul.
            </p>
            <a
              href="/join"
              className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase px-7 py-3 rounded-full hover:scale-105 transition-transform tracking-wider shadow-[0_0_15px_rgba(255,140,0,0.3)]"
            >
              Join Now
            </a>
          </div>
          {/* Right: animated shuffle grid — hidden on small mobile to avoid overflow */}
          <div className="hidden md:block">
            <ShuffleGrid />
          </div>
        </div>


        {/* ── FILTER BAR ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="text-brand-gray text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Filter className="h-4 w-4" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat.value
                  ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black shadow-[0_0_18px_rgba(255,180,0,0.35)]"
                  : "bg-brand-surface-card border border-brand-dark-gray/50 text-brand-gray hover:text-white hover:border-brand-yellow/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── GALLERY GRID ── */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="group relative break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-brand-dark-gray/40 hover:border-brand-yellow/40 transition-all duration-300"
            >
              {/* Actual photo */}
              <div className="relative w-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover transition-transform duration-150 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2 py-0.5 rounded w-fit mb-1">
                  {item.category}
                </span>
                <h3 className="font-bebas text-lg text-white tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="text-brand-gray text-[10px] leading-relaxed line-clamp-2 mt-0.5">
                  {item.desc}
                </p>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 p-2 bg-brand-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-4 w-4 text-brand-yellow" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-brand-gray">
            <p className="text-lg">No photos in this category yet.</p>
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {current && (
        <div
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-50 bg-brand-black/97 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 rounded-full bg-brand-dark-gray/60 hover:bg-brand-yellow text-white hover:text-brand-black transition-colors z-10 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-3 sm:left-6 p-3 rounded-full bg-brand-dark-gray/60 hover:bg-brand-yellow text-white hover:text-brand-black transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-3 sm:right-6 p-3 rounded-full bg-brand-dark-gray/60 hover:bg-brand-yellow text-white hover:text-brand-black transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={current.src}
                alt={current.title}
                width={1200}
                height={900}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-brand-dark-gray/40"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center px-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-3 py-0.5 rounded-full">
                {current.category}
              </span>
              <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-2">
                {current.title}
              </h2>
              <p className="text-brand-gray text-xs sm:text-sm mt-1 max-w-md mx-auto">
                {current.desc}
              </p>
              <p className="text-brand-dark-gray text-[10px] mt-3 uppercase tracking-widest">
                {lightboxIndex! + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
