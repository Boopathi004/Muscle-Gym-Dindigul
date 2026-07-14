"use client";

import React, { useState } from "react";
import { Filter, Eye, X, Dumbbell, Sparkles } from "lucide-react";

interface GalleryItem {
  id: number;
  category: "interior" | "equipment" | "sessions" | "transformations";
  title: string;
  desc: string;
  bgGradient: string;
}

export default function Gallery() {
  const [filter, setFilter] = useState<"all" | "interior" | "equipment" | "sessions" | "transformations">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "interior", label: "Gym Interior" },
    { value: "equipment", label: "Premium Gear" },
    { value: "sessions", label: "Training Sessions" },
    { value: "transformations", label: "Transformations" },
  ] as const;

  // Curated premium abstract gallery cards representing gym activity
  const items: GalleryItem[] = [
    {
      id: 1,
      category: "interior",
      title: "Begampur Main Floor",
      desc: "Spacious AC gym floor setup with premium imported machines and full safety padding.",
      bgGradient: "from-brand-orange/40 via-brand-black to-brand-black",
    },
    {
      id: 2,
      category: "equipment",
      title: "Imported Weight Stacks",
      desc: "Heavy duty pulley machines, lat pulldowns, and compound seating for isolated muscle target.",
      bgGradient: "from-brand-yellow/30 via-brand-black to-brand-black",
    },
    {
      id: 3,
      category: "sessions",
      title: "Master Rajkumar Coaching Batch",
      desc: "Head Coach Rajkumar demonstrating progressive overhead lifts and posture adjustments.",
      bgGradient: "from-brand-orange/30 via-brand-black to-brand-black",
    },
    {
      id: 4,
      category: "transformations",
      title: "Arun's 6-Month Success",
      desc: "Incredible fat loss transformation logging -18kg fat loss and major muscle hypertrophy.",
      bgGradient: "from-brand-yellow/40 via-brand-black to-brand-black",
    },
    {
      id: 5,
      category: "interior",
      title: "Trichy Bypass Cardio Zone",
      desc: "Advanced imported treadmills and metabolic spin bikes looking out to DMart road.",
      bgGradient: "from-brand-yellow/30 via-brand-black to-brand-black",
    },
    {
      id: 6,
      category: "equipment",
      title: "Heavy Barbell Platform",
      desc: "Olympic-grade competition bars and rubberized bumper weight plates for heavy compounds.",
      bgGradient: "from-brand-orange/40 via-brand-black to-brand-black",
    },
    {
      id: 7,
      category: "sessions",
      title: "Unisex Morning Group Workout",
      desc: "High energy metabolic circuit containing battle ropes, box jumps, and kettlebell swings.",
      bgGradient: "from-brand-yellow/45 via-brand-black to-brand-black",
    },
    {
      id: 8,
      category: "transformations",
      title: "Karthik's Strength Progress",
      desc: "Powerlifting transformation adding 40kg to squat and deadlift maxes safely.",
      bgGradient: "from-brand-orange/35 via-brand-black to-brand-black",
    },
  ];

  const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter);

  const openLightbox = (id: number) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) setLightboxIndex(index);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % items.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white">
            GYM <span className="text-brand-yellow">GALLERY</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Explore our branch interiors, heavy strength machinery, and real member achievements.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <span className="text-brand-gray text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Filter className="h-4 w-4" /> Filter Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat.value
                  ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black shadow-[0_0_15px_rgba(255,140,0,0.3)]"
                  : "bg-brand-surface-card border border-brand-dark-gray/50 text-brand-gray hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="group relative cursor-pointer glass-card rounded-2xl border border-brand-dark-gray/50 h-64 overflow-hidden flex flex-col justify-between p-6 hover:border-brand-yellow/30 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Glowing decorative gradient backplane */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-40 group-hover:opacity-60 transition-opacity -z-10`} />
              
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-brand-dark-gray/40 border border-brand-dark-gray/60 px-2 py-0.5 rounded text-brand-gray font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="p-1.5 bg-brand-black/50 rounded-lg text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="h-4 w-4" />
                </span>
              </div>

              <div>
                <h3 className="font-bebas text-xl text-white tracking-wide mb-1 group-hover:text-brand-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="text-brand-gray text-[11px] leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {lightboxIndex !== null && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-brand-dark-gray/20 hover:bg-brand-yellow text-white hover:text-brand-black transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Body */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full rounded-3xl border border-brand-yellow/20 overflow-hidden shadow-2xl relative"
            >
              {/* Dynamic decorative backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${items[lightboxIndex].bgGradient} opacity-20 -z-10`} />
              
              <div className="h-72 bg-gradient-to-br from-brand-yellow/10 to-brand-orange/5 flex flex-col items-center justify-center text-brand-yellow/30 border-b border-brand-dark-gray/35">
                <Dumbbell className="h-20 w-20 animate-bounce" />
                <span className="text-[10px] text-brand-gray font-bold tracking-widest mt-2 uppercase">Muscle Gym Interactive View</span>
              </div>

              <div className="p-8">
                <span className="text-xs bg-brand-yellow/10 border border-brand-yellow/30 px-3 py-1 rounded-full text-brand-yellow font-extrabold uppercase tracking-widest">
                  {items[lightboxIndex].category}
                </span>
                <h2 className="font-bebas text-3xl text-white tracking-wide mt-4 mb-2">
                  {items[lightboxIndex].title}
                </h2>
                <p className="text-brand-gray text-sm leading-relaxed">
                  {items[lightboxIndex].desc}
                </p>

                {/* Navigation arrows inside lightbox */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-brand-dark-gray/30">
                  <button
                    onClick={prevImage}
                    className="text-xs font-bold text-brand-gray hover:text-brand-yellow uppercase tracking-wider cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextImage}
                    className="text-xs font-bold text-brand-gray hover:text-brand-yellow uppercase tracking-wider cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
