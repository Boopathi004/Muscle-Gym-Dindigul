"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Dumbbell, Flame, ShieldAlert, UserCheck, HeartPulse, Activity, ChevronRight, Filter } from "lucide-react";
import { INITIAL_PROGRAMS } from "@/lib/constants";

export default function Programs() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Strength", "Cardio", "Coaching", "Functional"];

  const filteredPrograms = filter === "All"
    ? INITIAL_PROGRAMS
    : INITIAL_PROGRAMS.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()) || (filter === "Coaching" && p.title.toLowerCase().includes("personal")));

  // Icon mapping helper
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("muscle") || t.includes("strength")) return <Dumbbell className="h-6 w-6" />;
    if (t.includes("weight") || t.includes("burn")) return <Flame className="h-6 w-6" />;
    if (t.includes("powerlifting")) return <ShieldAlert className="h-6 w-6" />;
    if (t.includes("personal")) return <UserCheck className="h-6 w-6" />;
    if (t.includes("cardio")) return <HeartPulse className="h-6 w-6" />;
    return <Activity className="h-6 w-6" />;
  };

  return (
    <div className="relative min-h-screen py-16">
      {/* Background decorations */}
      <div className="absolute top-[20%] right-0 w-[300px] h-[300px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-0 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            TRAINING <span className="text-brand-yellow">PROGRAMS</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            Choose a training plan tailored to your fitness path. Led by local certified coaches.
          </p>
        </div>

        {/* FILTER STRIP */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <span className="text-brand-gray text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Filter className="h-4 w-4" /> Filter Classes:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black shadow-[0_0_15px_rgba(255,140,0,0.3)]"
                  : "bg-brand-surface-card border border-brand-dark-gray/50 text-brand-gray hover:text-white hover:border-brand-yellow/45"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PROGRAMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="glass-card rounded-3xl border border-brand-dark-gray/50 p-8 flex flex-col justify-between hover:border-brand-yellow/40 hover:shadow-[0_10px_30px_rgba(244,208,63,0.03)] transition-all duration-300"
            >
              <div>
                <div className="w-14 h-14 bg-brand-dark-gray/30 border border-brand-yellow/10 rounded-2xl flex items-center justify-center text-brand-yellow mb-6">
                  {getIcon(prog.title)}
                </div>
                
                <h3 className="font-bebas text-2xl tracking-wider text-white mb-3">
                  {prog.title}
                </h3>
                
                <p className="text-brand-gray text-sm leading-relaxed mb-8">
                  {prog.description}
                </p>

                <div className="bg-brand-black/40 border border-brand-dark-gray/25 px-4 py-3 rounded-xl flex flex-col gap-2 mb-8 text-xs text-brand-gray">
                  <div className="flex justify-between">
                    <span className="font-bold text-brand-light-gray uppercase">Schedule:</span>
                    <span>{prog.schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-brand-light-gray uppercase">Focus:</span>
                    <span>{prog.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-brand-light-gray uppercase">Intensity:</span>
                    <span className="text-brand-orange font-bold">Elite Batch</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/join?plan=Transformation&branch=Begampur`}
                className="w-full bg-brand-dark-gray/40 border border-brand-dark-gray/80 hover:border-brand-yellow hover:text-brand-yellow py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                Enroll In Program <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
