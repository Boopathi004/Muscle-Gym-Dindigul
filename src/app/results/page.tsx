"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Flame, Award, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function Results() {
  // Slider ratio state (percentage of "after" showing from left, 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const transformationCards = [
    {
      name: "Arun Kumar",
      type: "Fat Loss & Conditioning",
      stats: { before: "102 kg", after: "84 kg", duration: "6 Months" },
      coach: "Master Rajkumar",
      desc: "Combined structured push/pull strength routine with a caloric deficit plan. Master Rajkumar helped me lock down my form and remain consistent weekly.",
    },
    {
      name: "Karthikeyan",
      type: "Strength & Powerlifting",
      stats: { before: "Deadlift: 140kg", after: "Deadlift: 180kg", duration: "4 Months" },
      coach: "Master Rajkumar",
      desc: "Highly tailored progressive overload scheme. Focused on hip mobility, bracing mechanics, and compound squat/deadlift frequency.",
    },
    {
      name: "Meera Nair",
      type: "Weight Loss & Lifestyle",
      stats: { before: "76 kg", after: "64 kg", duration: "5 Months" },
      coach: "Priya Sharma",
      desc: "Designed engaging cardiovascular stamina templates and functional core workouts. Rebuilt mobility and stamina after a prolonged desk job.",
    },
  ];

  // Photo grid — only the 12 remaining transformation images
  // (trans8, trans10, trans12, trans14, trans15, trans16 moved to achievements)
  const photos = [
    { id: 1,  src: "/gallery/transformations/trans1.jpg",  title: "Elite Physique" },
    { id: 2,  src: "/gallery/transformations/trans2.jpg",  title: "Power Training" },
    { id: 3,  src: "/gallery/transformations/trans3.jpg",  title: "Tyre Flip Progress" },
    { id: 4,  src: "/gallery/transformations/trans4.jpg",  title: "Rope Training" },
    { id: 5,  src: "/gallery/transformations/trans5.jpg",  title: "Iron Chains" },
    { id: 6,  src: "/gallery/transformations/trans6.jpg",  title: "Body Recomposition" },
    { id: 7,  src: "/gallery/transformations/trans7.jpg",  title: "Morning Session Result" },
    { id: 8,  src: "/gallery/transformations/trans9.jpg",  title: "Group Progress" },
    { id: 9,  src: "/gallery/transformations/trans11.jpg", title: "Cardio & Core" },
    { id: 10, src: "/gallery/transformations/trans13.jpg", title: "Motivational Milestone" },
    { id: 11, src: "/gallery/transformations/trans18.jpg", title: "Pro-Level Physique" },
    { id: 12, src: "/gallery/transformations/before1.jpg", title: "Baseline Assessment" },
    { id: 13, src: "/gallery/transformations/after1.jpg",  title: "Stage Physique Transformation" },
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const navigate = (dir: 1 | -1) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + photos.length) % photos.length);
  };
  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > 50) navigate(1);
    if (touchEnd - touchStart > 50) navigate(-1);
  };

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            MEMBER <span className="text-brand-yellow">TRANSFORMATIONS</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            Review real, verifiable physical achievements from our Dindigul fitness family.
          </p>
        </div>

        {/* REAL MEMBER TRANSFORMATION FEATURED COMPARISON */}
        <section className="max-w-5xl mx-auto mb-24 flex flex-col gap-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full w-max mb-3">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider">Featured Transformation</span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
              BEFORE & AFTER <span className="text-brand-yellow">TRANSFORMATION</span>
            </h2>
            <p className="text-brand-gray text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              Real results achieved through scientific training, disciplined nutrition, and dedicated coaching at Muscle Gym Dindigul.
            </p>
          </div>

          {/* SIDE BY SIDE CLEAR COMPARISON CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* BEFORE CARD */}
            <div className="glass-card rounded-3xl border border-red-500/30 overflow-hidden flex flex-col group hover:border-red-500/60 transition-all duration-300">
              <div className="relative h-[320px] sm:h-[450px] md:h-[520px] w-full bg-black/90 flex items-center justify-center">
                {/* Background ambient glow/blur */}
                <Image
                  src="/gallery/transformations/before1.jpg"
                  alt="Before Transformation Blur"
                  fill
                  className="object-cover opacity-20 blur-xl"
                />
                {/* Main uncropped full image */}
                <div className="relative w-full h-full p-4">
                  <Image
                    src="/gallery/transformations/before1.jpg"
                    alt="Before Transformation"
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-red-600/90 text-white text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-md border border-red-400/30 flex items-center gap-1.5 shadow-lg z-10">
                  <Flame className="h-3.5 w-3.5" /> BEFORE
                </div>
              </div>
              <div className="p-6 bg-brand-surface-card/60 flex flex-col gap-2 border-t border-red-500/20">
                <h3 className="font-bebas text-2xl text-red-500 tracking-wider">INITIAL BASELINE</h3>
                <p className="text-brand-gray text-xs leading-relaxed">
                  Before starting structured training — focusing on posture alignment, metabolic baseline building, and fat loss foundation.
                </p>
              </div>
            </div>

            {/* AFTER CARD */}
            <div className="glass-card rounded-3xl border border-brand-yellow/40 overflow-hidden flex flex-col group hover:border-brand-yellow/80 shadow-[0_0_30px_rgba(244,208,63,0.15)] transition-all duration-300">
              <div className="relative h-[320px] sm:h-[450px] md:h-[520px] w-full bg-black/90 flex items-center justify-center">
                {/* Background ambient glow/blur */}
                <Image
                  src="/gallery/transformations/after1.jpg"
                  alt="After Transformation Blur"
                  fill
                  className="object-cover opacity-20 blur-xl"
                />
                {/* Main uncropped full image */}
                <div className="relative w-full h-full p-4">
                  <Image
                    src="/gallery/transformations/after1.jpg"
                    alt="After Transformation"
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-md border border-brand-yellow/50 flex items-center gap-1.5 shadow-lg z-10">
                  <Award className="h-3.5 w-3.5" /> AFTER RESULT
                </div>
              </div>
              <div className="p-6 bg-brand-surface-card/60 flex flex-col gap-2 border-t border-brand-yellow/20">
                <h3 className="font-bebas text-2xl text-brand-yellow tracking-wider">STAGE PHYSIQUE & PEAK CONDITIONING</h3>
                <p className="text-brand-gray text-xs leading-relaxed">
                  Transformed into competition-level lean muscle mass, symmetry, low body fat percentage, and peak strength.
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE COMPARISON SLIDER BELOW */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="text-center">
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                INTERACTIVE SLIDER REVEAL
              </h3>
              <p className="text-brand-gray text-xs">
                Drag the yellow handle left or right to slide between Before and After
              </p>
            </div>

            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[320px] sm:h-[450px] md:h-[520px] rounded-3xl overflow-hidden select-none cursor-ew-resize border-2 border-brand-yellow/40 shadow-2xl bg-black"
            >
              {/* BASE LAYER: BEFORE IMAGE */}
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <Image
                  src="/gallery/transformations/before1.jpg"
                  alt="Before Transformation Blur"
                  fill
                  className="object-cover opacity-15 blur-lg"
                />
                <Image
                  src="/gallery/transformations/before1.jpg"
                  alt="Before Transformation"
                  fill
                  className="object-contain object-center"
                  priority
                />
                {/* BEFORE BADGE ANCHORED TOP-RIGHT OF CONTAINER */}
                <div className="absolute top-4 right-4 bg-red-600/90 text-white text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-md border border-red-400/40 z-10 shadow-lg flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" /> BEFORE
                </div>
              </div>

              {/* SLIDING LAYER: AFTER IMAGE (REVEALS FROM LEFT) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden bg-black border-r-4 border-brand-yellow shadow-[5px_0_25px_rgba(244,208,63,0.6)] z-20"
                style={{ width: `${sliderPosition}%` }}
              >
                <div 
                  className="h-full relative flex items-center justify-center"
                  style={{ width: containerWidth || 1000 }}
                >
                  <Image
                    src="/gallery/transformations/after1.jpg"
                    alt="After Transformation Blur"
                    fill
                    className="object-cover opacity-15 blur-lg"
                  />
                  <Image
                    src="/gallery/transformations/after1.jpg"
                    alt="After Transformation"
                    fill
                    className="object-contain object-center"
                    priority
                  />
                  {/* AFTER BADGE ANCHORED TOP-LEFT OF SLIDING LAYER */}
                  <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-md border border-brand-yellow/50 z-10 shadow-lg flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" /> AFTER
                  </div>
                </div>
              </div>

              {/* VERTICAL SLIDER HANDLE WITH DYNAMIC TEXT */}
              <div
                className="absolute inset-y-0 w-1 bg-brand-yellow z-30 cursor-ew-resize flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="px-3 py-1.5 rounded-full bg-brand-yellow text-brand-black flex items-center gap-1 border-2 border-black shadow-2xl text-[11px] font-black uppercase tracking-wider select-none font-bebas">
                  <span>◀</span>
                  <span>{sliderPosition > 50 ? "AFTER" : "BEFORE"}</span>
                  <span>▶</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REAL TRANSFORMATION PHOTO GRID ── */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-yellow/10 rounded-full w-max mb-4 mx-auto">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">Real Members · Real Results</span>
            </div>
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-widest uppercase">
              TRANSFORMATION <span className="text-brand-yellow">PHOTO GALLERY</span>
            </h2>
            <p className="text-brand-gray text-xs sm:text-sm max-w-lg mx-auto mt-2">
              Every photo you see below is a real Muscle Gym Dindigul member&apos;s journey — documented, genuine, and verifiable.
            </p>
          </div>

          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className="group relative break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-brand-dark-gray/40 hover:border-brand-yellow/40 transition-all duration-300"
              >
                <div className="relative w-full">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover transition-transform duration-150 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2 py-0.5 rounded w-fit mb-1">
                    Transformation
                  </span>
                  <h3 className="font-bebas text-lg text-white tracking-wide leading-tight">{photo.title}</h3>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-3 right-3 p-2 bg-brand-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-4 w-4 text-brand-yellow" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSFORMATION CARDS GRID */}
        <section>
          <div className="text-center mb-12">
            <h3 className="font-bebas text-3xl tracking-widest text-white uppercase">
              DETAILED <span className="text-brand-orange">CASE STUDIES</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformationCards.map((card, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-brand-dark-gray/50 p-6 flex flex-col justify-between hover:border-brand-yellow/30 transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] bg-brand-orange/20 border border-brand-orange/30 px-2 py-0.5 rounded text-brand-orange font-bold uppercase tracking-wider">
                    {card.type}
                  </span>
                  
                  <h4 className="font-bebas text-2xl text-white tracking-wide mt-4 mb-2">
                    {card.name}
                  </h4>

                  <p className="text-brand-gray text-xs leading-relaxed mb-6">
                    &ldquo;{card.desc}&rdquo;
                  </p>
                </div>

                <div>
                  {/* Before vs After stats bar */}
                  <div className="bg-brand-black/40 border border-brand-dark-gray/25 p-4 rounded-xl flex flex-col gap-2 mb-4 text-[11px] text-brand-gray">
                    <div className="flex justify-between">
                      <span className="font-bold text-brand-light-gray">Before:</span>
                      <span className="text-red-500 font-bold">{card.stats.before}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-brand-light-gray">After:</span>
                      <span className="text-brand-yellow font-bold">{card.stats.after}</span>
                    </div>
                    <div className="flex justify-between border-t border-brand-dark-gray/20 pt-2">
                      <span className="font-bold text-brand-light-gray">Duration:</span>
                      <span className="text-white font-bold">{card.stats.duration}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-brand-gray font-bold uppercase tracking-widest flex justify-between items-center">
                    <span>Coach: {card.coach}</span>
                    <span className="text-brand-yellow">Verified ✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="mt-20 text-center glass-card p-10 rounded-3xl border border-brand-yellow/20 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            READY TO WRITE YOUR OWN SUCCESS STORY?
          </h3>
          <p className="text-brand-gray text-xs sm:text-sm max-w-lg mx-auto mt-2 mb-6">
            Enroll today under Master Rajkumar&apos;s guidance and begin tracking your physical progression.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase px-8 py-3.5 rounded-full hover:scale-105 transition-all tracking-wider shadow-[0_0_15px_rgba(255,140,0,0.3)]"
          >
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

      </div>

      {/* ── LIGHTBOX ── */}
      {currentPhoto && (
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

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.title}
                width={1200}
                height={900}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-brand-dark-gray/40"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            <div className="mt-4 text-center px-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-3 py-0.5 rounded-full">
                Transformation
              </span>
              <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-2">
                {currentPhoto.title}
              </h2>
              <p className="text-brand-dark-gray text-[10px] mt-3 uppercase tracking-widest">
                {lightboxIndex! + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
