"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Star } from "lucide-react";

const SQRT_5000 = Math.sqrt(5000);

// ─── Trainer data with real photo for Rajkumar ────────────────────────────────
const TRAINER_CARDS = [
  {
    tempId: 0,
    name: "Master RAJKUMAR",
    specialty: "Head Coach · General Secretary - Dindigul District Gym Owner's Association",
    experience: "18+ Years",
    badge: "⭐ HEAD COACH",
    highlight: "18+ Years Bodybuilding & Fitness Coach",
    imgSrc: "/trainers/coach1.jpg",
    branch: "All Branches",
    instagram: "https://instagram.com/muscle_gym_dindigul",
  },
  {
    tempId: 1,
    name: "Suresh Kumar",
    specialty: "HIIT & Cardio Endurance Coach",
    experience: "6 Years",
    badge: "HIIT EXPERT",
    highlight: "Certified Group Fitness Instructor",
    imgSrc: "/trainers/coach2.jpg",
    branch: "Muscle Fitness Studio Unisex, Trichy Road",
    instagram: "https://instagram.com/muscle_gym_dindigul",
  },
  {
    tempId: 2,
    name: "Priya Sharma",
    specialty: "Weight Loss & Functional Movement",
    experience: "5 Years",
    badge: "WOMEN'S SPECIALIST",
    highlight: "ISSA Certified · Female Fitness Expert",
    imgSrc: "/trainers/coach3.jpg",
    branch: "Muscle Pro Fitness Studio Unisex, Palani Road",
    instagram: "https://instagram.com/muscle_gym_dindigul",
  },
  {
    tempId: 3,
    name: "Selvam",
    specialty: "Strength & Conditioning Coach",
    experience: "4 Years",
    badge: "STRENGTH EXPERT",
    highlight: "Certified Fitness Instructor",
    imgSrc: "/trainers/coach4.jpg",
    branch: "Muscle Gym, Bagambur",
    instagram: "https://instagram.com/muscle_gym_dindigul",
  },
];

// Placeholder initials avatar
function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-brand-yellow/20 to-brand-orange/20 text-brand-yellow font-bebas text-3xl tracking-widest">
      {initials}
    </div>
  );
}

interface CardProps {
  position: number;
  trainer: (typeof TRAINER_CARDS)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

function TrainerCard({ position, trainer, handleMove, cardSize }: CardProps) {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={`group absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out ${
        isCenter
          ? "z-10 bg-gradient-to-br from-brand-yellow/10 to-brand-orange/5 border-brand-yellow"
          : "z-0 bg-brand-surface-card border-brand-dark-gray/50 hover:border-brand-yellow/40"
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(244,208,63,0.15)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      {/* Corner cut diagonal line */}
      <span
        className="absolute block origin-top-right rotate-45 bg-brand-dark-gray/50"
        style={{ right: -2, top: 38, width: SQRT_5000, height: 1 }}
      />

      {/* Photo */}
      <div
        className="mb-4 overflow-hidden bg-brand-dark-gray/30 border border-brand-dark-gray/50 relative"
        style={{
          width: 52,
          height: 60,
          boxShadow: "3px 3px 0px rgba(0,0,0,0.5)",
        }}
      >
        {trainer.imgSrc ? (
          <>
            <Image
              src={trainer.imgSrc}
              alt={trainer.name}
              width={52}
              height={60}
              className="object-cover object-top w-full h-full transition-all duration-300 group-hover:scale-110"
            />
            {/* Interactive mini view button overlay */}
            <div className="absolute left-0 right-0 top-0 m-0.5 flex h-[16px] w-[15px] items-center justify-start gap-0.5 overflow-hidden rounded-full bg-[rgba(51,51,51,0.8)] transition-all duration-300 group-hover:w-[38px] z-20 select-none">
              <Image width={14} height={14} src="https://www.lovart.ai/assets/play-s.svg" alt="Play" />
              <span className="text-[rgba(255,255,255,0.8)] text-[8px] font-bold">View</span>
            </div>
          </>
        ) : (
          <InitialsAvatar name={trainer.name} />
        )}
      </div>

      {/* Badge */}
      <span
        className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-2 ${
          isCenter
            ? "bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40"
            : "bg-brand-dark-gray/40 text-brand-gray border border-brand-dark-gray/60"
        }`}
      >
        {trainer.badge}
      </span>

      {/* Name */}
      <h3
        className={`font-bebas text-xl tracking-wider leading-tight mb-1 ${
          isCenter ? "text-white" : "text-brand-light-gray"
        }`}
      >
        {trainer.name}
      </h3>

      {/* Specialty */}
      <p
        className={`text-xs font-semibold mb-2 leading-snug ${
          isCenter ? "text-brand-yellow" : "text-brand-gray"
        }`}
      >
        {trainer.specialty}
      </p>

      {/* Highlight */}
      <p
        className={`text-[10px] leading-relaxed ${
          isCenter ? "text-white/60" : "text-brand-gray/60"
        }`}
      >
        {trainer.highlight}
      </p>

      {/* Footer */}
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
        <span
          className={`text-[9px] font-bold uppercase tracking-wide ${
            isCenter ? "text-brand-orange" : "text-brand-dark-gray"
          }`}
        >
          {trainer.experience} · {trainer.branch.replace(" Branch", "")}
        </span>
        {isCenter && (
          <Link
            href="/join"
            onClick={(e) => e.stopPropagation()}
            className="text-[9px] font-bold text-brand-yellow uppercase tracking-wider flex items-center gap-0.5 hover:text-brand-orange transition-colors"
          >
            Book <ArrowRight className="h-2.5 w-2.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function StaggerTrainers() {
  const [cardSize, setCardSize] = useState(300);
  const [list, setList] = useState(TRAINER_CARDS);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const update = () => {
      const sm = window.matchMedia("(min-width: 640px)").matches;
      const md = window.matchMedia("(min-width: 1024px)").matches;
      setCardSize(md ? 300 : sm ? 270 : 230);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 560 }}>
      {list.map((trainer, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <TrainerCard
            key={trainer.tempId}
            trainer={trainer}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Navigation buttons */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        <button
          onClick={() => handleMove(-1)}
          aria-label="Previous trainer"
          className="flex h-12 w-12 items-center justify-center border-2 border-brand-dark-gray/60 bg-brand-black hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
          style={{ clipPath: "polygon(10px 0%, 100% 0%, 100% 100%, 0 100%, 0 10px)" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          aria-label="Next trainer"
          className="flex h-12 w-12 items-center justify-center border-2 border-brand-dark-gray/60 bg-brand-black hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
          style={{ clipPath: "polygon(0 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 0 100%)" }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Hint text */}
      <p className="absolute bottom-6 right-6 text-[9px] text-brand-gray/40 uppercase tracking-widest hidden sm:block">
        Click card or use arrows
      </p>
    </div>
  );
}
