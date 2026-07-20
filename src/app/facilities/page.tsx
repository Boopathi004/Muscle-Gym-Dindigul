"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Wind, ShowerHead, Cloud, Flame, Sparkles, ParkingCircle, Footprints } from "lucide-react";

// Video source map for the equipment showcase
const VIDEO_MAP = {
  barbell: "/videos/barbell.mp4",
  dumbbell: "/videos/dumbble.mp4",
  kettlebell: "/videos/ball.mp4",
};

const facilityPhotos = [
  {
    src: "/facilities/shoe-rack-1.jpeg",
    label: "Shoe Rack",
    title: "Dedicated Shoe Rack Area",
    desc: "Organised shoe storage with shelves and bench seating at the entrance.",
    branch: "Palani Road Branch",
  },
  {
    src: "/facilities/shoe-rack-2.jpeg",
    label: "Shoe Rack",
    title: "Entry & Locker Zone",
    desc: "Clean entry corridor with dedicated shoe racks and full-length mirror.",
    branch: "Palani Road Branch",
  },
  {
    src: "/facilities/steam-shower-palani.jpeg",
    label: "Steam Room & Shower",
    title: "Premium Steam Room & Shower",
    desc: "Luxury glass-enclosed shower cabin with a dedicated steam room — exclusively at Branch 3.",
    branch: "Palani Road Branch",
  },
  {
    src: "/facilities/parking-palani-1.jpeg",
    label: "Parking Space",
    title: "Open Parking Area",
    desc: "Spacious open-air parking for cars and two-wheelers, easily accessible from the main road.",
    branch: "Palani Road Branch",
  },
  {
    src: "/facilities/parking-palani-2.jpeg",
    label: "Covered Parking",
    title: "Covered Two-Wheeler Parking",
    desc: "Sheltered paver-block parking bay with dedicated space for bikes and bicycles.",
    branch: "Palani Road Branch",
  },
];

export default function Facilities() {
  const [activeModel, setActiveModel] = useState<"barbell" | "dumbbell" | "kettlebell">("barbell");

  const amenities = [
    { icon: <Wind className="h-6 w-6" />, name: "Fully Air Conditioned", desc: "Keep body temperatures regulated and oxygen flow high during heavy compounds." },
    { icon: <ShowerHead className="h-6 w-6" />, name: "Private Shower Cabinets", desc: "Spacious, clean shower areas and changing rooms available for unisex timings." },
    { icon: <Cloud className="h-6 w-6" />, name: "Steam Room", desc: "Relax and detoxify your body after an intense workout session (Branch 3 only)." },
    { icon: <Flame className="h-6 w-6" />, name: "Supplements Bar", desc: "Affordable dynamic hydration shakes, BCAAs, and premium whey supplements." },
    { icon: <Footprints className="h-6 w-6" />, name: "Shoe Rack Area", desc: "Dedicated shoe storage with shelves and benches at every branch entrance." },
    { icon: <ParkingCircle className="h-6 w-6" />, name: "Free Parking", desc: "Ample open-air and covered parking available for two-wheelers and cars." },
  ];

  return (
    <div className="relative min-h-screen py-16 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            GYM <span className="text-brand-yellow">FACILITIES</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            State-of-the-art training spaces featuring heavy imported weight stacks and elite lifestyle amenities.
          </p>
        </div>

        {/* EQUIPMENT SHOWCASE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-yellow/10 rounded-full w-max">
              <Sparkles className="h-4 w-4 text-brand-yellow animate-pulse" />
              <span className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">Premium Equipment Showcase</span>
            </div>
            
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              OUR PROFESSIONAL <span className="text-brand-yellow">GEAR</span>
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed">
              We supply top-tier international standard bars, plates, and iron cast bells designed to handle massive physical stress safely. View our high-energy training gear in action below.
            </p>

            {/* Model Selector Tabs */}
            <div className="flex gap-3 mt-4">
              {(["barbell", "dumbbell", "kettlebell"] as const).map((model) => (
                <button
                  key={model}
                  onClick={() => setActiveModel(model)}
                  className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeModel === model
                      ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black shadow-[0_0_15px_rgba(255,140,0,0.3)]"
                      : "bg-brand-surface-card border border-brand-dark-gray/60 text-brand-gray hover:text-white"
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* Video Player Container */}
          <div className="lg:col-span-5 order-1 lg:order-2 glass-card rounded-3xl border border-brand-dark-gray/80 h-[280px] sm:h-[380px] md:h-[420px] relative overflow-hidden flex items-center justify-center bg-black/40">
            <video
              key={activeModel}
              src={VIDEO_MAP[activeModel]}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* AMENITIES SECTION */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-widest text-white">
              GYM <span className="text-brand-orange">AMENITIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((am, i) => (
              <div 
                key={i} 
                className="glass-card p-6 rounded-2xl border border-brand-dark-gray/40 hover:border-brand-yellow/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-dark-gray/30 border border-brand-yellow/10 flex items-center justify-center text-brand-yellow shrink-0">
                  {am.icon}
                </div>
                <div>
                  <h4 className="font-bebas text-lg text-white tracking-wide mb-1">{am.name}</h4>
                  <p className="text-brand-gray text-xs leading-relaxed">{am.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FACILITY PHOTOS — Branch 3 (Palani Road) */}
        <section>
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Palani Road Branch Exclusive</span>
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-widest text-white mt-2">
              FACILITY <span className="text-brand-yellow">PHOTOS</span>
            </h2>
            <p className="text-brand-gray text-sm mt-3 max-w-lg mx-auto">
              Explore the premium facilities at our Palani Road branch — from clean parking to steam rooms and organised shoe storage.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {facilityPhotos.map((photo, i) => (
              <div
                key={i}
                className="group relative break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-brand-dark-gray/40 hover:border-brand-yellow/40 hover:shadow-[0_0_20px_rgba(255,137,59,0.15)] transition-all duration-300"
              >
                <div className="relative w-full">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={600}
                    height={450}
                    unoptimized
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Label badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-black bg-brand-yellow px-2 py-0.5 rounded-full shadow">
                    {photo.label}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-orange mb-1">{photo.branch}</span>
                  <h3 className="font-bebas text-lg text-white tracking-wide leading-tight">{photo.title}</h3>
                  <p className="text-brand-gray text-[10px] leading-relaxed mt-0.5">{photo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
