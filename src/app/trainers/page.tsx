"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TRAINERS = [
  {
    name: "Master Rajkumar",
    badge: "⭐ Head Coach & Founder",
    badgeColor: "bg-brand-yellow text-brand-black",
    imgSrc: "/trainers/rajkumar.jpg",
    imgAlt: "Master Rajkumar — Head Coach & Founder, Muscle Gym Dindigul",
    branch: "All Branches",
    branchLabel: "Muscle Gym — All Branches",
    logo: "/logos/logo1.jpg",
    borderColor: "border-brand-yellow/60",
    shadowColor: "shadow-[0_0_30px_rgba(244,208,63,0.2)]",
    hoverBorder: "hover:border-brand-yellow/45 hover:shadow-[0_0_30px_rgba(244,208,63,0.08)]",
    bio: "With 18+ years of dedicated strength and bodybuilding experience, Master Rajkumar is renowned across Dindigul for scientific training splits and dietary profiles. Gold Medalist in State Powerlifting.",
  },
  {
    name: "Mani Ratnam",
    badge: "💪 Trainer",
    badgeColor: "bg-brand-orange text-brand-black",
    imgSrc: "/trainers/manager trichy.jpeg",
    imgAlt: "Mani Ratnam — Managing Owner, Muscle Fitness Studio Unisex, Trichy Road",
    branch: "Trichy Road Branch",
    branchLabel: "Muscle Fitness Studio — Trichy Road",
    logo: "/logos/logo2.png",
    borderColor: "border-brand-orange/60",
    shadowColor: "shadow-[0_0_30px_rgba(255,140,0,0.2)]",
    hoverBorder: "hover:border-brand-orange/45 hover:shadow-[0_0_30px_rgba(255,140,0,0.08)]",
    bio: "Managing owner and head trainer of the Trichy Road branch. Mani Ratnam combines business operations with expert strength coaching to deliver life-changing member transformations.",
  },
  {
    name: "Balaji",
    badge: "💪 Trainer",
    badgeColor: "bg-brand-yellow text-brand-black",
    imgSrc: "/trainers/coach1.jpg",
    imgAlt: "Balaji — Trainer, Muscle Gym Dindigul",
    branch: "All Branches",
    branchLabel: "Muscle Gym — All Branches",
    logo: "/logos/logo1.jpg",
    borderColor: "border-brand-yellow/60",
    shadowColor: "shadow-[0_0_30px_rgba(244,208,63,0.2)]",
    hoverBorder: "hover:border-brand-yellow/45 hover:shadow-[0_0_30px_rgba(244,208,63,0.08)]",
    bio: "A dedicated fitness trainer with a passion for strength training and bodybuilding. Balaji works across all branches helping members build muscle and achieve their fitness goals.",
  },
  {
    name: "Suresh Kumar",
    badge: "🔥 HIIT Expert",
    badgeColor: "bg-brand-orange text-brand-black",
    imgSrc: "/trainers/coach2.jpg",
    imgAlt: "Suresh Kumar — HIIT & Cardio Endurance Coach",
    branch: "Trichy Road Branch",
    branchLabel: "Muscle Fitness Studio — Trichy Road",
    logo: "/logos/logo2.png",
    borderColor: "border-brand-orange/60",
    shadowColor: "shadow-[0_0_30px_rgba(255,140,0,0.2)]",
    hoverBorder: "hover:border-brand-orange/45 hover:shadow-[0_0_30px_rgba(255,140,0,0.08)]",
    bio: "Specializing in HIIT and cardio endurance with 6+ years of experience, Suresh has helped hundreds of members achieve peak fitness through high-energy training.",
  },
  {
    name: "Priya Sharma",
    badge: "💪 Women's Specialist",
    badgeColor: "bg-pink-500 text-white",
    imgSrc: "/trainers/coach3.jpg",
    imgAlt: "Priya Sharma — Women's Fitness & Weight Loss Coach",
    branch: "Palani Road Branch",
    branchLabel: "Muscle Pro Studio — Palani Road",
    logo: "/logos/logo3.png",
    borderColor: "border-pink-400/60",
    shadowColor: "shadow-[0_0_30px_rgba(236,72,153,0.2)]",
    hoverBorder: "hover:border-pink-400/45 hover:shadow-[0_0_30px_rgba(236,72,153,0.08)]",
    bio: "Female fitness expert with 5+ years in weight loss and functional movement. Priya creates a safe, motivating environment for women to build strength and confidence.",
  },
  {
    name: "Selvam",
    badge: "🏋️ Strength Expert",
    badgeColor: "bg-brand-yellow text-brand-black",
    imgSrc: "/trainers/coach4.jpg",
    imgAlt: "Selvam — Strength & Conditioning Coach",
    branch: "Bagambur Branch",
    branchLabel: "Muscle Gym — Bagambur",
    logo: "/logos/logo1.jpg",
    borderColor: "border-brand-yellow/60",
    shadowColor: "shadow-[0_0_30px_rgba(244,208,63,0.2)]",
    hoverBorder: "hover:border-brand-yellow/45 hover:shadow-[0_0_30px_rgba(244,208,63,0.08)]",
    bio: "Fitness trainer with 4+ years in strength and conditioning. Selvam focuses on correct mechanics and progressive overload to push every member closer to their athletic goals.",
  },
  {
    name: "Trainer",
    badge: "💪 Trainer",
    badgeColor: "bg-brand-orange text-brand-black",
    imgSrc: "/trainers/trainer.jpeg",
    imgAlt: "Trainer — Muscle Gym Dindigul",
    branch: "Muscle Gym",
    branchLabel: "Muscle Gym — Dindigul",
    logo: "/logos/logo1.jpg",
    borderColor: "border-brand-orange/60",
    shadowColor: "shadow-[0_0_30px_rgba(255,140,0,0.2)]",
    hoverBorder: "hover:border-brand-orange/45 hover:shadow-[0_0_30px_rgba(255,140,0,0.08)]",
    bio: "A dedicated fitness trainer at Muscle Gym Dindigul, committed to helping every member reach their strength and fitness goals.",
  },
];

export default function Trainers() {
  return (
    <div className="relative min-h-screen py-16">
      {/* Decorative blurs */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            MEET OUR <span className="text-brand-yellow">COACHING STAFF</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            Train under dedicated professionals who track your movements, plan your macros, and keep you accountable.
          </p>
        </div>

        {/* TRAINER CARDS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20 reveal-on-scroll">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.name}
              className={`glass-card rounded-3xl border border-brand-dark-gray/50 p-5 flex flex-col gap-5 transition-all duration-500 ${trainer.hoverBorder}`}
            >
              {/* Photo with overlay */}
              <div className={`relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 ${trainer.borderColor} ${trainer.shadowColor} group`}>
                <Image
                  src={trainer.imgSrc}
                  alt={trainer.imgAlt}
                  fill
                  className="object-cover object-top image-hover-anim"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* View button */}
                <div className="absolute left-0 right-0 top-0 m-4 flex h-[30px] w-[29px] items-center justify-start gap-1 overflow-hidden rounded-full bg-[rgba(51,51,51,0.8)] transition-all duration-300 group-hover:w-[72px] z-20 select-none">
                  <Image width={28} height={28} src="/play-s.svg" alt="Play" />
                  <span className="text-[rgba(255,255,255,0.8)] sm:text-[14px] sm:font-[700]">View</span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-5">
                  <div className={`inline-flex items-center gap-2 ${trainer.badgeColor} px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest w-max mb-2`}>
                    {trainer.badge}
                  </div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide leading-tight">{trainer.name}</h3>
                </div>
              </div>

              {/* Branch info + bio */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={trainer.logo}
                    alt="Branch Logo"
                    width={40}
                    height={40}
                    className="object-contain rounded-lg border border-brand-yellow/30 p-1 bg-black/40 flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-bebas text-sm tracking-wider text-brand-yellow leading-tight">{trainer.branchLabel}</span>
                    <span className="text-brand-gray text-[10px] font-bold uppercase tracking-widest">{trainer.branch}</span>
                  </div>
                </div>
                <p className="text-brand-gray text-xs leading-relaxed">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/join"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold px-8 py-4 rounded-full hover:scale-105 transition-all uppercase text-sm tracking-wider"
          >
            Book Personal Coaching <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
