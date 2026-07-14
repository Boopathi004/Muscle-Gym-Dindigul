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
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-yellow via-brand-orange to-brand-yellow opacity-70 blur-sm" />
                {/* Border ring */}
                <div className="relative w-56 h-56 rounded-full border-2 border-brand-yellow overflow-hidden shadow-[0_0_30px_rgba(244,208,63,0.25)]">
                  <Image
                    src="/trainers/rajeshkumar.jpg"
                    alt="Master Rajkumar — Head Coach & Founder, Muscle Gym Dindigul"
                    fill
                    className="object-cover object-top"
                    sizes="224px"
                    priority
                  />
                  {/* Subtle bottom gradient for text legibility on mobile */}
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-8 flex flex-col gap-4 text-center lg:text-left">
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
