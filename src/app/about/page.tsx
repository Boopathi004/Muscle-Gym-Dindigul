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
      desc: "Master Rajkumar establishes the first Muscle Gym branch in Begampur to bring professional weight training and fitness education to Dindigul.",
    },
    {
      year: "2016",
      title: "Imported Equipment Upgrade",
      desc: "Replaced standard weight rigs with premium imported biomechanically sound machines. Crossed 1,500+ satisfied member transformations.",
    },
    {
      year: "2020",
      title: "Trichy Bypass Branch Expansion",
      desc: "Opened our massive second branch near DMart Bypass, introducing advanced lifting platforms and elite cardio conditioning zones.",
    },
    {
      year: "2024",
      title: "Palani Road Branch Launch",
      desc: "Launched our third branch opposite the Income Tax office on Palani Road, establishing Muscle Gym as Dindigul's dominant fitness brand.",
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
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white">
            OUR <span className="text-brand-yellow">STORY</span> & MENTORSHIP
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Building strength, discipline, and healthy lifestyles across Dindigul since 2012.
          </p>
        </div>

        {/* OWNER / COACH PROFILE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-5 relative group">
            {/* Glowing frame */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-yellow to-brand-orange rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 -z-10" />
            <div className="bg-brand-surface-card rounded-3xl border border-brand-dark-gray/60 aspect-[4/5] relative overflow-hidden group/image shadow-[0_0_30px_rgba(244,208,63,0.15)]">
              <Image
                src="/trainers/rajeshkumar.jpg"
                alt="Master Rajkumar — Head Coach & Founder, Muscle Gym Dindigul"
                fill
                className="object-cover object-top image-hover-anim"
                sizes="(max-width: 768px) 100vw, 450px"
                priority
              />
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
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
              Master <span className="text-brand-yellow">Rajkumar</span>
            </h2>
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

        {/* MISSION & PHILOSOPHY */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
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
        <section className="relative">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-widest text-white">
              GYM <span className="text-brand-orange">TIMELINE</span>
            </h2>
            <p className="text-brand-gray text-xs sm:text-sm uppercase tracking-wider font-bold mt-2">
              Our 14-Year Journey of Excellence
            </p>
          </div>

          <div className="relative border-l-2 border-brand-orange/30 ml-4 md:ml-32 md:pl-8 flex flex-col gap-12 py-4">
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
