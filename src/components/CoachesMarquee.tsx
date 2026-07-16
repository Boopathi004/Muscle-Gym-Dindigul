"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    specialty: "Head Coach · General Secretary",
    experience: "18+ Years",
    badge: "⭐ HEAD COACH",
    bio: "With over 18 years of professional fitness training experience, Master Rajkumar has trained and transformed thousands of individuals in Dindigul.",
    image: "/trainers/rajkumar.jpg",
    branch: "All Branches",
  },
  {
    name: "Rajesh Kumar",
    specialty: "Personal Trainer",
    experience: "5+ Years",
    badge: "⭐ PRO COACH",
    bio: "Rajesh is a dedicated personal trainer who helps clients achieve their specific fitness goals. His structured training programs focus on proper technique.",
    image: "/trainers/coach1.jpg",
    branch: "All Branches",
  },
  {
    name: "Suresh Kumar",
    specialty: "HIIT & Cardio Endurance",
    experience: "6 Years",
    badge: "HIIT EXPERT",
    bio: "Suresh is a passionate coach who specializes in cardiovascular endurance, fat loss programs, and metabolic conditioning.",
    image: "/trainers/coach2.jpg",
    branch: "Trichy Road",
  },
  {
    name: "Priya Sharma",
    specialty: "Weight Loss & Functional",
    experience: "5 Years",
    badge: "WOMEN'S SPECIALIST",
    bio: "Priya focuses on corrective exercises, functional movement, and targeted fat loss plans. She is dedicated to helping members build core strength.",
    image: "/trainers/coach3.jpg",
    branch: "Palani Road",
  },
  {
    name: "Selvam",
    specialty: "Strength & Conditioning",
    experience: "4 Years",
    badge: "STRENGTH EXPERT",
    bio: "Selvam specializes in weight training, muscle hypertrophy, and personalized competition preparation. He focuses on safety and biomechanics.",
    image: "/trainers/coach4.jpg",
    branch: "Bagambur",
  },
];

export default function CoachesMarquee() {
  const duplicatedCoaches = [...COACHES, ...COACHES, ...COACHES];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div 
      className="relative w-full max-w-full overflow-hidden py-10" 
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        className={cn(
          "flex gap-6 w-max animate-marquee",
          expandedIndex !== null ? "[animation-play-state:paused]" : "hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedCoaches.map((coach, i) => (
          <div
            key={i}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            className="relative w-[320px] sm:w-[380px] h-[500px] sm:h-[560px] shrink-0 bg-black rounded-3xl overflow-hidden flex flex-col border border-brand-dark-gray/40 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer group"
          >
            {/* Background Image - Large & Full Width */}
            <div className="absolute inset-0">
              <Image 
                src={coach.image} 
                alt={coach.name} 
                fill 
                className={cn(
                  "object-cover object-top transition-all duration-700",
                  expandedIndex === i ? "scale-105 opacity-40 blur-sm" : "group-hover:scale-105"
                )}
              />
              {/* Fade to black gradient always visible at bottom for name */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-500" />
            </div>

            {/* Click Indicator (Only when not expanded) */}
            <div className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              expandedIndex === i ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            )}>
              <span className="bg-brand-yellow/90 text-brand-black font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full shadow-[0_0_20px_rgba(244,208,63,0.5)]">
                Click for details
              </span>
            </div>

            {/* Content Area */}
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              {/* Expandable Details */}
              <div 
                className={cn(
                  "flex flex-col overflow-hidden transition-all duration-500 ease-in-out origin-bottom",
                  expandedIndex === i ? "max-h-[300px] opacity-100 mb-6 translate-y-0" : "max-h-0 opacity-0 mb-0 translate-y-4"
                )}
              >
                <p className="text-white text-base sm:text-lg font-medium leading-relaxed italic">
                  “{coach.bio}”
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20">
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase bg-brand-black px-3 py-1 rounded-full border border-brand-dark-gray/50">
                    {coach.branch}
                  </span>
                </div>
              </div>

              {/* Name and Role (Always visible) */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold text-xl drop-shadow-md">— {coach.name}</span>
                  <span className="text-brand-orange text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border border-brand-orange/30 rounded-full bg-brand-black/50 backdrop-blur-md">
                    {coach.badge.replace('⭐', '').trim()}
                  </span>
                </div>
                <span className="text-brand-yellow/90 text-sm font-semibold drop-shadow-md">{coach.specialty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
