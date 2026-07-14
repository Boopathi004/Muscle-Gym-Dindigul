"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Flame, ShieldAlert, Award } from "lucide-react";

export default function Results() {
  // Slider ratio state (percentage of "after" showing from left, 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white">
            MEMBER <span className="text-brand-yellow">TRANSFORMATIONS</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Review real, verifiable physical achievements from our Dindigul fitness family.
          </p>
        </div>

        {/* INTERACTIVE BEFORE/AFTER SLIDER */}
        <section className="max-w-4xl mx-auto mb-24 flex flex-col gap-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-yellow/10 rounded-full w-max mb-4">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">Drag to Compare</span>
            </div>
            <h2 className="font-bebas text-3xl text-white tracking-wide">
              INTERACTIVE TRANSFORMATION SLIDER
            </h2>
            <p className="text-brand-gray text-xs sm:text-sm mt-1">
              Drag the yellow indicator bar left and right to reveal Before vs. After details.
            </p>
          </div>

          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[400px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-brand-dark-gray/70"
          >
            {/* BEFORE LAYER (BACKGROUND) */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-brand-black to-brand-black flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-red-900/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-4 animate-pulse">
                <Flame className="h-10 w-10" />
              </div>
              <h3 className="font-bebas text-4xl text-red-500 tracking-widest uppercase">BEFORE STATE</h3>
              <p className="text-brand-gray text-sm max-w-xs mt-2">
                102kg Weight • 35% Body Fat • Low Energy • Structural Back Strain
              </p>
            </div>

            {/* AFTER LAYER (SLIDER REVEAL) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-brand-yellow/20 via-brand-black to-brand-black flex flex-col items-center justify-center p-8 text-center"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Force inner elements to keep their layout width */}
              <div className="w-[800px] max-w-[90vw] flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow mb-4 shadow-[0_0_15px_rgba(244,208,63,0.2)]">
                  <Award className="h-10 w-10" />
                </div>
                <h3 className="font-bebas text-4xl text-brand-yellow tracking-widest uppercase">AFTER STATE</h3>
                <p className="text-white text-sm max-w-xs mt-2 font-bold">
                  84kg Weight • 12% Body Fat • High Metabolic Stamina • Strong Back Core
                </p>
              </div>
            </div>

            {/* VERTICAL SLIDER HANDLE */}
            <div
              className="absolute inset-y-0 w-1 bg-gradient-to-b from-brand-yellow to-brand-orange shadow-[0_0_10px_rgba(244,208,63,0.5)] cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-brand-yellow text-brand-black flex items-center justify-center border-2 border-white shadow-lg text-xs font-black uppercase tracking-wider select-none font-bebas">
                ◀▶
              </div>
            </div>
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
                    "{card.desc}"
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
            Enroll today under Master Rajkumar's guidance and begin tracking your physical progression.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase px-8 py-3.5 rounded-full hover:scale-105 transition-all tracking-wider shadow-[0_0_15px_rgba(255,140,0,0.3)]"
          >
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
