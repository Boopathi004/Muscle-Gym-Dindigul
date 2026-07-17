"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { INITIAL_TRAINERS } from "@/lib/constants";


export default function About() {
  const rajkumar = INITIAL_TRAINERS[0]; // Master Rajkumar

  const milestones = [
    {
      year: "2012",
      title: "Founding Era",
      desc: "Master Rajkumar establishes the first Muscle Gym, Bagambur branch to bring professional weight training and fitness education to Dindigul.",
    },
    {
      year: "2016",
      title: "Imported Equipment Upgrade",
      desc: "Replaced standard weight rigs with premium imported biomechanically sound machines. Crossed 1,500+ satisfied member transformations.",
    },
    {
      year: "2020",
      title: "Muscle Fitness Studio Unisex, Trichy Road — Expansion",
      desc: "Opened our massive second branch near DMart Bypass as Muscle Fitness Studio Unisex, Trichy Road, introducing advanced lifting platforms and elite cardio conditioning zones.",
    },
    {
      year: "2024",
      title: "Muscle Pro Fitness Studio Unisex, Palani Road — Launch",
      desc: "Launched our third branch opposite the Income Tax office as Muscle Pro Fitness Studio Unisex, Palani Road, establishing the brand as Dindigul's dominant fitness network.",
    },
    {
      year: "2026",
      title: "Going Premium Digital",
      desc: "Unifying all three branches under a single high-fidelity, 3D-driven digital experience and custom member tracking.",
    },
  ];

  return (
    <div className="relative min-h-screen py-16">
      {/* Decorative Blur */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            OUR <span className="text-brand-yellow">STORY</span> & MENTORSHIP
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            Building strength, discipline, and healthy lifestyles across Dindigul since 2012.
          </p>
        </div>

        {/* OWNER / COACH PROFILE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16 sm:mb-28 reveal-on-scroll">
          <div className="lg:col-span-5 relative group">
            {/* Glowing frame */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-yellow to-brand-orange rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 -z-10" />
            <div className="bg-brand-surface-card rounded-3xl border border-brand-dark-gray/60 aspect-[4/5] relative overflow-hidden group/image shadow-[0_0_30px_rgba(244,208,63,0.15)]">
              <Image
                src={rajkumar.imageUrl}
                alt="Master Rajkumar — Head Coach & Founder, Muscle Gym Dindigul"
                fill
                className="object-cover object-top image-hover-anim"
                sizes="(max-width: 768px) 100vw, 450px"
                priority
              />
              {/* Interactive view button overlay */}
              <div className="absolute left-0 right-0 top-0 m-4 flex h-[30px] w-[29px] items-center justify-start gap-1 overflow-hidden rounded-full bg-[rgba(51,51,51,0.8)] transition-all duration-300 group-hover:w-[72px] z-20 select-none">
                <Image width={28} height={28} src="https://www.lovart.ai/assets/play-s.svg" alt="Play" />
                <span className="text-[rgba(255,255,255,0.8)] sm:text-[14px] sm:font-[700]">View</span>
              </div>
              {/* Dark gradient overlay with info at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-bebas text-3xl text-white tracking-wider">{rajkumar.name}</h3>
                <p className="text-brand-yellow text-xs font-bold uppercase tracking-wider mt-1">{rajkumar.specialty}</p>
                <div className="w-max bg-brand-yellow text-brand-black border border-brand-yellow px-3.5 py-1.5 rounded-full mt-3.5 text-[10px] font-extrabold uppercase tracking-widest">
                  🏆 18+ Years Expert Coach
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-yellow/10 rounded-full w-max">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">Meet the founder</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
                Master <span className="text-brand-yellow">Rajkumar</span>
              </h2>
              <div className="flex items-center gap-3 sm:gap-4 bg-brand-black/30 border border-brand-dark-gray/40 p-3 rounded-2xl w-full sm:w-max overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-yellow blur-md opacity-30 rounded-full" />
                  <Image src="/logos/logo1.jpg" alt="Muscle Gym Begampur Logo" width={80} height={80} className="relative object-contain rounded-full border-2 border-brand-yellow/50" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bebas text-2xl sm:text-3xl tracking-widest uppercase">
                    <span className="text-brand-orange">Muscle</span> <span className="text-white">Gym</span>
                  </span>
                  <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Begampur Branch
                  </span>
                </div>
              </div>
            </div>
            <p className="text-brand-gray text-base leading-relaxed">
              {rajkumar.bio}
            </p>
            <div className="bg-brand-surface-card/60 border border-brand-dark-gray/60 p-6 rounded-2xl flex flex-col gap-3">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">Credentials & Background:</span>
              <p className="text-white text-sm font-medium leading-relaxed">
                {rajkumar.certifications}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Link 
                href="/join"
                className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-bold px-6 py-3 rounded-full hover:scale-105 transition-all uppercase text-sm tracking-wider flex items-center gap-2"
              >
                Book Personal Coaching <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* BRANCH MANAGER — PALANI ROAD */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center mb-16 sm:mb-28 reveal-on-scroll">
          {/* Text left side */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-yellow/20 rounded-full w-max">
              <ShieldCheck className="h-4 w-4 text-brand-yellow" />
              <span className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">Branch Manager · Palani Road</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                Meet Our <span className="text-brand-yellow">Branch Manager</span>
              </h2>
              <div className="flex items-center gap-4 bg-brand-black/30 border border-brand-dark-gray/40 p-3 rounded-2xl w-max">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-orange blur-md opacity-20 rounded-full" />
                  <Image src="/logos/logo2.png" alt="Muscle Pro Fitness Studio Logo" width={80} height={80} className="relative object-contain rounded-xl border border-brand-orange/30 p-1" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bebas text-2xl sm:text-3xl tracking-widest uppercase">
                    <span className="text-brand-orange">Muscle Pro</span> <span className="text-white">Studio</span>
                  </span>
                  <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" /> Palani Road Branch
                  </span>
                </div>
              </div>
            </div>
            <p className="text-brand-gray text-base leading-relaxed">
              A decorated Ex-Army veteran who brings unmatched discipline, resilience, and leadership to Muscle Pro Fitness Studio Unisex on Palani Road. His military background and hands-on approach inspire every member to train harder, stay consistent, and push beyond their limits — embodying the true spirit of strength and dedication.
            </p>
            <div className="bg-brand-surface-card/60 border border-brand-dark-gray/60 p-6 rounded-2xl flex flex-col gap-3">
              <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest block">Background & Role:</span>
              <p className="text-white text-sm font-medium leading-relaxed">
                Ex-Indian Army · Branch Manager — Muscle Pro Fitness Studio Unisex, Palani Road · Discipline & Strength Coach · Community Leadership Expert
              </p>
            </div>
          </div>

          {/* Image right side — slightly smaller than founder */}
          <div className="lg:col-span-5 relative group order-1 lg:order-2">
            <div className="rounded-3xl border-2 border-brand-yellow/60 overflow-hidden shadow-[0_0_40px_rgba(244,208,63,0.25)] ring-4 ring-brand-yellow/10 max-w-[320px] mx-auto lg:mx-0 transition-all duration-500 group-hover:border-brand-yellow group-hover:shadow-[0_0_50px_rgba(244,208,63,0.4)]" style={{ aspectRatio: '4/5' }}>
              <div className="relative w-full h-full">
                <Image
                  src="/trainers/manager_palani.jpeg"
                  alt="Branch Manager — Muscle Pro Fitness Studio Unisex, Palani Road"
                  fill
                  className="object-cover object-top image-hover-anim"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                {/* Interactive view button overlay */}
                <div className="absolute left-0 right-0 top-0 m-4 flex h-[30px] w-[29px] items-center justify-start gap-1 overflow-hidden rounded-full bg-[rgba(51,51,51,0.8)] transition-all duration-300 group-hover:w-[72px] z-20 select-none">
                  <Image width={28} height={28} src="https://www.lovart.ai/assets/play-s.svg" alt="Play" />
                  <span className="text-[rgba(255,255,255,0.8)] sm:text-[14px] sm:font-[700]">View</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest w-max mb-2">
                    🎖️ Ex-Army · Branch Manager
                  </div>
                  <p className="text-brand-gray text-xs">Muscle Pro Fitness Studio Unisex, Palani Road</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-16 sm:mb-28 reveal-on-scroll">
          <div className="glass-card p-8 rounded-2xl border border-brand-dark-gray/50 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bebas text-2xl text-white tracking-wide">Our Mission</h3>
            <p className="text-brand-gray text-xs leading-relaxed">
              To deliver premium-quality fitness facilities and scientific training models accessible to every resident in Dindigul, fostering healthier communities.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border border-brand-dark-gray/50 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-bebas text-2xl text-white tracking-wide">Unisex Safety</h3>
            <p className="text-brand-gray text-xs leading-relaxed">
              Providing a highly secure, clean, and welcoming environment for both men and women, featuring dedicated women's sessions and female trainers.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-brand-dark-gray/50 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="font-bebas text-2xl text-white tracking-wide">Progressive Overload</h3>
            <p className="text-brand-gray text-xs leading-relaxed">
              We focus on strength progression and form mechanics. No shortcuts. Every workout log is designed to push you closer to your athletic goals.
            </p>
          </div>
        </section>

        {/* GLOWING TIMELINE */}
        <section className="relative mb-28 reveal-on-scroll">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-widest text-white">
              GYM <span className="text-brand-orange">TIMELINE</span>
            </h2>
            <p className="text-brand-gray text-xs sm:text-sm uppercase tracking-wider font-bold mt-2">
              Our 14-Year Journey of Excellence
            </p>
          </div>

          <div className="relative border-l-2 border-brand-orange/30 ml-4 md:ml-16 lg:ml-32 pl-6 md:pl-8 flex flex-col gap-10 sm:gap-12 py-4">

            {milestones.map((ms, index) => (
              <div key={index} className="relative pl-6 md:pl-8 group">
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-black border-2 border-brand-yellow group-hover:border-brand-orange transition-colors duration-300" />
                
                {/* Checkpoint content */}
                <div className="glass-card p-6 rounded-2xl border border-brand-dark-gray/40 max-w-3xl hover:border-brand-yellow/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bebas text-2xl text-brand-yellow tracking-wider">{ms.year}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <h4 className="font-bebas text-lg text-white tracking-wide">{ms.title}</h4>
                  </div>
                  <p className="text-brand-gray text-xs sm:text-sm leading-relaxed">
                    {ms.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>



      </div>
    </div>
  );
}
