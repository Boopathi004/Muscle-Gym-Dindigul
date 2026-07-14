"use client";

import React from "react";
import Link from "next/link";
import { Award, Users, Star, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { INITIAL_TRAINERS } from "@/lib/constants";

// Inline SVG components to replace missing lucide-react social icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

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
            
            {/* Image/Avatar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-brand-yellow/20 to-brand-orange/20 border-2 border-brand-yellow flex items-center justify-center text-brand-yellow">
                <Award className="h-28 w-28" />
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

        {/* ALL TRAINERS GRID */}
        <section>
          <div className="text-center mb-12">
            <h3 className="font-bebas text-3xl tracking-widest text-white">
              COACHING <span className="text-brand-orange">STAFF</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_TRAINERS.map((trainer) => (
              <TiltCard 
                key={trainer.id}
                className="glass-card rounded-2xl border border-brand-dark-gray/50 p-6 flex flex-col justify-between hover:border-brand-yellow/30 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Photo Placeholder */}
                  <div className="h-48 rounded-xl bg-gradient-to-br from-brand-dark-gray/20 to-brand-black/40 border border-brand-dark-gray/30 flex items-center justify-center text-brand-gray mb-5">
                    <Users className="h-16 w-16 opacity-30" />
                  </div>

                  <h4 className="font-bebas text-2xl text-white tracking-wide">
                    {trainer.name}
                  </h4>
                  <p className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3">
                    {trainer.specialty}
                  </p>
                  
                  <p className="text-brand-gray text-xs leading-relaxed mb-6">
                    {trainer.bio}
                  </p>
                </div>

                <div>
                  <div className="bg-brand-black/30 border border-brand-dark-gray/20 px-3.5 py-2.5 rounded-xl text-[10px] text-brand-gray font-bold uppercase mb-5">
                    <span className="text-brand-light-gray">Experience:</span> {trainer.experience} Years | <span className="text-brand-light-gray">Branch:</span> {trainer.branch.replace(" Branch", "")}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-brand-dark-gray/20">
                    <Link
                      href="/join"
                      className="text-xs text-brand-yellow hover:text-brand-orange font-bold uppercase tracking-wider flex items-center gap-1 py-3 -my-3 min-h-[44px] cursor-pointer"
                    >
                      Book Session <ArrowRight className="h-3 w-3" />
                    </Link>
                    <div className="flex items-center">
                      <a
                        href={trainer.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-gray hover:text-white transition-colors p-3.5 -m-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                        aria-label={`Visit ${trainer.name} on Instagram`}
                      >
                        <InstagramIcon className="h-4.5 w-4.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
