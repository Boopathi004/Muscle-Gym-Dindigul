"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Star, ArrowRight } from "lucide-react";
import StaggerTrainers from "@/components/StaggerTrainers";

export default function Trainers() {
  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white">
            EXPERT <span className="text-brand-yellow">COACHES</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Train under certified professionals who track your movements, plan your macros, and keep you accountable.
          </p>
        </div>

        {/* FEATURED TRAINER SECTION (MASTER RAJKUMAR) */}
        <section className="glass-card rounded-3xl border border-brand-yellow/20 p-8 sm:p-12 mb-20 relative overflow-hidden shadow-[0_10px_40px_rgba(244,208,63,0.02)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] group">
                {/* Outer glow accent */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-brand-yellow via-brand-orange to-brand-yellow opacity-75 blur-md transition-all duration-500 group-hover:opacity-100" />
                {/* Main frame */}
                <div className="relative w-full h-full rounded-3xl border-2 border-brand-yellow overflow-hidden shadow-[0_0_35px_rgba(244,208,63,0.2)]">
                  <Image
                    src="/trainers/coach1.jpg"
                    alt="Master Rajkumar — Head Coach & Founder, Muscle Gym Dindigul"
                    fill
                    className="object-cover object-top transition-all duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 320px, 400px"
                    priority
                  />
                  {/* Premium overlay shading for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Interactive view button overlay */}
                  <div className="absolute left-0 right-0 top-0 m-4 flex h-[30px] w-[29px] items-center justify-start gap-1 overflow-hidden rounded-full bg-[rgba(51,51,51,0.8)] transition-all duration-300 group-hover:w-[72px] z-20 select-none">
                    <Image width={28} height={28} src="https://www.lovart.ai/assets/play-s.svg" alt="Play" />
                    <span className="text-[rgba(255,255,255,0.8)] sm:text-[14px] sm:font-[700]">View</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left">
              <span className="bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full w-max mx-auto lg:mx-0">
                ⭐ HEAD COACH & FOUNDER
              </span>
              <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
                Master <span className="text-brand-yellow">RAJKUMAR</span>
              </h2>
              <p className="text-brand-gray text-sm sm:text-base leading-relaxed">
                With 18+ years of dedicated strength and bodybuilding experience, Master Rajkumar is renowned across Dindigul for compiling scientific training splits and dietary profiles. He has coached multiple state-level medalists.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-brand-gray uppercase mt-2">
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <Star className="h-4 w-4 text-brand-yellow" />
                  <span>Gold Medalist in State Powerlifting</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <Users className="h-4 w-4 text-brand-orange" />
                  <span>Unisex Personal Training Specialist</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mt-4">
                <Link
                  href="/join"
                  className="w-full sm:w-auto bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase px-6 py-3 rounded-full hover:scale-105 transition-all tracking-wider flex items-center justify-center gap-1.5"
                >
                  Book 1-on-1 session <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/919787045050?text=Hi%20Master%20Rajkumar,%20I'm%20interested%20in%20personal%20training!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-brand-dark-gray/80 hover:border-brand-yellow hover:text-brand-yellow font-bold text-xs uppercase px-6 py-3 rounded-full transition-all flex items-center justify-center gap-1.5"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COACHING STAFF — STAGGER CAROUSEL */}
        <section>
          <div className="text-center mb-8">
            <h3 className="font-bebas text-3xl tracking-widest text-white">
              MEET THE <span className="text-brand-orange">COACHING STAFF</span>
            </h3>
            <p className="text-brand-gray text-xs mt-2">
              Click any card or use the arrows to explore our trainers
            </p>
          </div>
          <StaggerTrainers />
        </section>

      </div>
    </div>
  );
}
