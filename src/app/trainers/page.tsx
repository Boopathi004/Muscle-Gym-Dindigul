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
    logo: "/logos/logo-bagambur.jpg",
    borderColor: "border-brand-yellow/60",
    shadowColor: "shadow-[0_0_30px_rgba(244,208,63,0.2)]",
    hoverBorder: "hover:border-brand-yellow/45 hover:shadow-[0_0_30px_rgba(244,208,63,0.08)]",
    bio: "With 18+ years of dedicated strength and bodybuilding experience, Master Rajkumar is renowned across Dindigul for scientific training splits and dietary profiles. Gold Medalist in State Powerlifting.",
  },
  {
    name: "Mani Kumar",
    badge: "🕺 Zumba & Personal Training",
    badgeColor: "bg-brand-orange text-brand-black",
    imgSrc: "/trainers/mani-kumar.jpg",
    imgAlt: "Mani Kumar — Zumba & Personal Training Coach, Muscle Fitness Studio Trichy Road",
    branch: "Trichy Road Branch",
    branchLabel: "Muscle Fitness Studio — Trichy Road",
    logo: "/logos/logo-primary.png",
    borderColor: "border-brand-orange/60",
    shadowColor: "shadow-[0_0_30px_rgba(255,140,0,0.2)]",
    hoverBorder: "hover:border-brand-orange/45 hover:shadow-[0_0_30px_rgba(255,140,0,0.08)]",
    bio: "CFN (Certified in Food & Nutrition) certified Zumba instructor and personal trainer with 10 years of experience. Mani Kumar combines expert nutrition guidance with high-energy dance fitness and personalised strength plans at the Trichy Road branch.",
  },
  {
    name: "Dinesh",
    badge: "🔥 HIIT Training",
    badgeColor: "bg-red-600 text-white",
    imgSrc: "/trainers/dinesh.jpg",
    imgAlt: "Dinesh — HIIT Training & Strength Coach, Muscle Fitness Studio Trichy Road",
    branch: "Trichy Road Branch",
    branchLabel: "Muscle Fitness Studio — Trichy Road",
    logo: "/logos/logo-primary.png",
    borderColor: "border-red-500/60",
    shadowColor: "shadow-[0_0_30px_rgba(220,38,38,0.2)]",
    hoverBorder: "hover:border-red-500/45 hover:shadow-[0_0_30px_rgba(220,38,38,0.08)]",
    bio: "Strength & Cardio specialist with 10 years of experience. Dinesh designs intense HIIT circuits and progressive strength programs that deliver real results at the Trichy Road branch.",
  },
  {
    name: "Barath",
    badge: "🏋️ Strength Training Expert",
    badgeColor: "bg-brand-yellow text-brand-black",
    imgSrc: "/trainers/barath.jpg",
    imgAlt: "Barath — Strength Training Expert, Muscle Fitness Studio Trichy Road",
    branch: "Trichy Road Branch",
    branchLabel: "Muscle Fitness Studio — Trichy Road",
    logo: "/logos/logo-primary.png",
    borderColor: "border-brand-yellow/60",
    shadowColor: "shadow-[0_0_30px_rgba(244,208,63,0.2)]",
    hoverBorder: "hover:border-brand-yellow/45 hover:shadow-[0_0_30px_rgba(244,208,63,0.08)]",
    bio: "Dedicated strength training specialist with 6 years of experience in personal training, strength training, and cardio conditioning. Barath crafts tailored programs that help every member build power, endurance, and a stronger physique at the Trichy Road branch.",
  },
  {
    name: "Suthan",
    badge: "🏆 Powerlifting",
    badgeColor: "bg-brand-yellow text-brand-black",
    imgSrc: "/trainers/suthan.jpg",
    imgAlt: "Suthan — Powerlifting & Personal Training Coach, Muscle Pro Studio Palani Road",
    branch: "Palani Road Branch",
    branchLabel: "Muscle Pro Studio — Palani Road",
    logo: "/logos/logo-alt.png",
    borderColor: "border-brand-yellow/60",
    shadowColor: "shadow-[0_0_30px_rgba(244,208,63,0.2)]",
    hoverBorder: "hover:border-brand-yellow/45 hover:shadow-[0_0_30px_rgba(244,208,63,0.08)]",
    bio: "Powerlifting specialist with 8 years of experience across personal training, cardio, and strength training. Suthan pushes members to their peak with disciplined programming and expert technique coaching at the Palani Road branch.",
  },
  {
    name: "Guru",
    badge: "⚡ Cardio Expert",
    badgeColor: "bg-brand-orange text-brand-black",
    imgSrc: "/trainers/guru.jpg",
    imgAlt: "Guru — Cardio Expert & Personal Training Coach, Muscle Pro Studio Palani Road",
    branch: "Palani Road Branch",
    branchLabel: "Muscle Pro Studio — Palani Road",
    logo: "/logos/logo-alt.png",
    borderColor: "border-brand-orange/60",
    shadowColor: "shadow-[0_0_30px_rgba(255,140,0,0.2)]",
    hoverBorder: "hover:border-brand-orange/45 hover:shadow-[0_0_30px_rgba(255,140,0,0.08)]",
    bio: "Cardio specialist and personal trainer with 8 years of experience in personal training, cardio, and strength training. Guru brings high-energy sessions and structured programming to keep members fit, focused, and motivated at the Palani Road branch.",
  },
  {
    name: "Mani Rathinam",
    badge: "💪 Fitness Trainer",
    badgeColor: "bg-brand-orange text-brand-black",
    imgSrc: "/trainers/manager trichy.jpeg",
    imgAlt: "Mani Rathinam — Fitness Trainer, Muscle Fitness Studio Unisex, Trichy Road",
    branch: "Trichy Road Branch",
    branchLabel: "Muscle Fitness Studio — Trichy Road",
    logo: "/logos/logo-primary.png",
    borderColor: "border-brand-orange/60",
    shadowColor: "shadow-[0_0_30px_rgba(255,140,0,0.2)]",
    hoverBorder: "hover:border-brand-orange/45 hover:shadow-[0_0_30px_rgba(255,140,0,0.08)]",
    bio: "Fitness trainer and personal training specialist with 3 years of experience at the Trichy Road branch. Mani Rathinam is dedicated to guiding every member with focused, personalised training plans.",
  },
  {
    name: "Jerom",
    badge: "👩‍💪 Women's Specialist",
    badgeColor: "bg-pink-500 text-white",
    imgSrc: "/trainers/placeholder.jpg",
    imgAlt: "Jerom — Women's Training Specialist, Muscle Fitness Studio Trichy Road",
    branch: "Trichy Road Branch",
    branchLabel: "Muscle Fitness Studio — Trichy Road",
    logo: "/logos/logo-primary.png",
    borderColor: "border-pink-400/60",
    shadowColor: "shadow-[0_0_30px_rgba(236,72,153,0.2)]",
    hoverBorder: "hover:border-pink-400/45 hover:shadow-[0_0_30px_rgba(236,72,153,0.08)]",
    bio: "Women's training specialist with 2 years of experience dedicated to women's fitness and wellness. Jerom creates a safe, empowering environment for women to build strength, confidence, and a healthier lifestyle.",
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
