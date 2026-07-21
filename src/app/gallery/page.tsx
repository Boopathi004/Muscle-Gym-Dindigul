"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Filter, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type Category = "all" | "achievements" | "transformations" | "interiors";

interface GalleryItem {
  id: number;
  src: string;
  category: Exclude<Category, "all">;
  title: string;
  desc: string;
  branch?: number;
}

const items: GalleryItem[] = [
  // ── Achievements ─────────────────────────────────────────────────────────
  {
    id: 1,
    src: "/gallery/achievements/ach1.jpg",
    category: "achievements",
    title: "Championship Victory",
    desc: "Our athletes dominating the regional bodybuilding championship stage.",
  },
  {
    id: 2,
    src: "/gallery/achievements/ach2.jpg",
    category: "achievements",
    title: "Competition Medals",
    desc: "Medal winners proudly representing Muscle Gym Dindigul.",
  },
  {
    id: 3,
    src: "/gallery/achievements/ach3.jpg",
    category: "achievements",
    title: "Trophy Ceremony",
    desc: "Award ceremony celebrating our competitors' hard work.",
  },
  {
    id: 4,
    src: "/gallery/achievements/ach4.jpg",
    category: "achievements",
    title: "Stage Performance",
    desc: "Flawless physique presentation at the district-level competition.",
  },
  {
    id: 5,
    src: "/gallery/achievements/ach5.jpg",
    category: "achievements",
    title: "Team Champions",
    desc: "Gold & silver medalists from our unisex training batch.",
  },
  {
    id: 6,
    src: "/gallery/achievements/ach6.jpg",
    category: "achievements",
    title: "Bodybuilding Contest",
    desc: "Physique athletes in peak condition at the state-level event.",
  },
  {
    id: 7,
    src: "/gallery/achievements/ach7.jpg",
    category: "achievements",
    title: "Prize Distribution",
    desc: "Exciting prize ceremony with our winning team.",
  },
  {
    id: 8,
    src: "/gallery/achievements/ach8.jpg",
    category: "achievements",
    title: "Fitness Showcase",
    desc: "Bodybuilders with trophies at the inter-district competition.",
  },
  {
    id: 9,
    src: "/gallery/achievements/ach9.jpg",
    category: "achievements",
    title: "District Trophy",
    desc: "Muscle Gym members receiving district-level athletic recognition.",
  },
  {
    id: 10,
    src: "/gallery/achievements/ach10.jpg",
    category: "achievements",
    title: "Champions Collage",
    desc: "Highlight reel of our members' competition victories.",
  },
  {
    id: 11,
    src: "/gallery/achievements/ach11.jpg",
    category: "achievements",
    title: "Fat Loss Achievement",
    desc: "Member's documented fat loss journey — from 102 kg down to competition-ready conditioning.",
  },
  {
    id: 12,
    src: "/gallery/achievements/ach12.jpg",
    category: "achievements",
    title: "Strength Achievement",
    desc: "Powerlifting milestone — from beginner to advanced strength in 4 months.",
  },
  {
    id: 13,
    src: "/gallery/achievements/ach13.jpg",
    category: "achievements",
    title: "Machine Gains",
    desc: "Isolation work achievement — muscle definition built through dedicated cable and machine training.",
  },
  {
    id: 14,
    src: "/gallery/achievements/ach14.jpg",
    category: "achievements",
    title: "Coach-Guided Win",
    desc: "Head coach demonstrating technique — a milestone moment in a member's personalised programme.",
  },
  {
    id: 15,
    src: "/gallery/achievements/ach15.jpg",
    category: "achievements",
    title: "Power Rack PR",
    desc: "Olympic squat and bench press personal record — a major strength achievement.",
  },
  {
    id: 16,
    src: "/gallery/achievements/ach16.jpg",
    category: "achievements",
    title: "Muscle Building Win",
    desc: "Lean muscle building achievement documented over a 6-month hypertrophy plan.",
  },
  {
    id: 101,
    src: "/gallery/achievements/ach17.jpeg",
    category: "achievements",
    title: "Championship Success",
    desc: "A proud moment showcasing dedication and hard work at the championship.",
  },
  {
    id: 102,
    src: "/gallery/achievements/ach18.jpeg",
    category: "achievements",
    title: "Medal Winner",
    desc: "Celebrating an incredible victory and bringing home the medal.",
  },
  {
    id: 103,
    src: "/gallery/achievements/ach19.jpeg",
    category: "achievements",
    title: "Trophy Presentation",
    desc: "Outstanding performance rewarded with a well-deserved trophy.",
  },
  {
    id: 104,
    src: "/gallery/achievements/ach20.jpeg",
    category: "achievements",
    title: "Championship Team Celebration",
    desc: "Our members and coaches celebrating victory at the benchpress championship.",
  },
  {
    id: 105,
    src: "/gallery/achievements/ach21.jpeg",
    category: "achievements",
    title: "Rotary Club Championship Winner",
    desc: "Team championship win presentation at the Dindigul District Gym Association championship.",
  },
  {
    id: 106,
    src: "/gallery/achievements/ach22.jpeg",
    category: "achievements",
    title: "Muscle Gym Anniversary Celebration",
    desc: "A massive turnout of members celebrating a milestone gym anniversary.",
  },
  {
    id: 107,
    src: "/gallery/achievements/ach23.jpeg",
    category: "achievements",
    title: "Madura Fitness Studio Showcase",
    desc: "Muscle Gym athletes demonstrating their shape and receiving trophies.",
  },
  {
    id: 108,
    src: "/gallery/achievements/ach24.jpeg",
    category: "achievements",
    title: "Mr. Muscle Man 2023 Competition",
    desc: "A showcase of outstanding physique athletes at the Mr. Muscle Man event.",
  },
  {
    id: 109,
    src: "/gallery/achievements/ach25.jpeg",
    category: "achievements",
    title: "Medal Winners Inside the Gym",
    desc: "Members proudly displaying their medals and certificates after competition.",
  },
  {
    id: 110,
    src: "/gallery/achievements/ach26.jpeg",
    category: "achievements",
    title: "Team Ready for Competition",
    desc: "Muscle Gym Dindigul team heading out together to represent the gym at a district-level event.",
  },
  {
    id: 111,
    src: "/gallery/achievements/ach27.jpeg",
    category: "achievements",
    title: "Championship Achievement",
    desc: "Proud moment showcasing dedication and hard work at the championship.",
  },
  {
    id: 112,
    src: "/gallery/achievements/ach28.jpeg",
    category: "achievements",
    title: "Winning Pose",
    desc: "Displaying the winning physique on stage.",
  },
  {
    id: 113,
    src: "/gallery/achievements/ach29.jpeg",
    category: "achievements",
    title: "Stage Presentation",
    desc: "Confident stage presence and posing during the bodybuilding competition.",
  },
  {
    id: 114,
    src: "/gallery/achievements/ach30.jpeg",
    category: "achievements",
    title: "Medal Ceremony",
    desc: "Receiving the well-deserved medal for outstanding performance.",
  },
  {
    id: 115,
    src: "/gallery/achievements/ach31.jpeg",
    category: "achievements",
    title: "Victory Celebration",
    desc: "Celebrating the hard-earned victory with the team.",
  },
  {
    id: 116,
    src: "/gallery/achievements/ach32.jpeg",
    category: "achievements",
    title: "Champion's Trophy",
    desc: "Holding the championship trophy with pride.",
  },
  {
    id: 117,
    src: "/gallery/achievements/ach33.jpeg",
    category: "achievements",
    title: "Fitness Milestone",
    desc: "A major fitness milestone achieved and recognized.",
  },
  {
    id: 118,
    src: "/gallery/achievements/ach34.jpeg",
    category: "achievements",
    title: "Team Success",
    desc: "Another successful outing for the Muscle Gym team.",
  },
  {
    id: 119,
    src: "/gallery/achievements/ach35.jpeg",
    category: "achievements",
    title: "Dedication Rewarded",
    desc: "Years of dedication paying off on the competitive stage.",
  },

  // ── Transformations ───────────────────────────────────────────────────────
  {
    id: 17,
    src: "/gallery/transformations/trans1.jpg",
    category: "transformations",
    title: "Elite Physique",
    desc: "Member showcasing incredible muscle definition — results from 6 months of structured training.",
  },
  {
    id: 18,
    src: "/gallery/transformations/trans2.jpg",
    category: "transformations",
    title: "Power Training",
    desc: "Functional strength transformation combining boxing bag and sledgehammer conditioning.",
  },
  {
    id: 19,
    src: "/gallery/transformations/trans3.jpg",
    category: "transformations",
    title: "Tyre Flip Progress",
    desc: "Explosive functional training milestone — tyre flips as part of the transformation journey.",
  },
  {
    id: 20,
    src: "/gallery/transformations/trans4.jpg",
    category: "transformations",
    title: "Rope Training",
    desc: "Battle rope conditioning results — improved cardiovascular endurance and upper-body strength.",
  },
  {
    id: 21,
    src: "/gallery/transformations/trans5.jpg",
    category: "transformations",
    title: "Iron Chains",
    desc: "Variable resistance chain training milestone for our advanced transformation members.",
  },
  {
    id: 22,
    src: "/gallery/transformations/trans6.jpg",
    category: "transformations",
    title: "Body Recomposition",
    desc: "Dramatic body recomposition achieved under expert supervision on the main training floor.",
  },
  {
    id: 23,
    src: "/gallery/transformations/trans7.jpg",
    category: "transformations",
    title: "Morning Session Result",
    desc: "Consistent early morning training over 5 months — visible physique transformation.",
  },
  {
    id: 24,
    src: "/gallery/transformations/trans9.jpg",
    category: "transformations",
    title: "Group Progress",
    desc: "Batch transformation — group training members after 90-day structured programme.",
  },
  {
    id: 25,
    src: "/gallery/transformations/trans11.jpg",
    category: "transformations",
    title: "Cardio & Core",
    desc: "Cardio-focused transformation with dedicated core conditioning results.",
  },
  {
    id: 26,
    src: "/gallery/transformations/trans13.jpg",
    category: "transformations",
    title: "Motivational Milestone",
    desc: "A member's 3-month milestone photo — the Muscle Gym transformation programme in action.",
  },
  {
    id: 28,
    src: "/gallery/transformations/trans18.jpg",
    category: "transformations",
    title: "Pro-Level Physique",
    desc: "Member reaching competition-standard conditioning through the Muscle Gym Pro programme.",
  },
  {
    id: 30,
    src: "/gallery/transformations/after1.jpg",
    category: "transformations",
    title: "After State — Competition Conditioning",
    desc: "Stage-ready physique transformation achieved under Master Rajkumar's coaching.",
  },
  {
    id: 31,
    src: "/gallery/transformations/trans20.jpeg",
    category: "transformations",
    title: "Remarkable Progress",
    desc: "Amazing transformation showcasing dedication and consistency in the gym.",
  },
  // ── Branch 1: Bagambur Interiors & Equipment ──
  {
    id: 201,
    src: "/gallery/interiors/branch1-bagambur/2012-1.jpeg",
    category: "interiors",
    title: "Founder's Era — Original Gym Floor",
    desc: "The starting of the gym version back in 2012.",
    branch: 1,
  },
  {
    id: 202,
    src: "/gallery/interiors/branch1-bagambur/2012-2.jpeg",
    category: "interiors",
    title: "Founder's Era — Legacy Space",
    desc: "The starting of the gym version back in 2012.",
    branch: 1,
  },
  {
    id: 203,
    src: "/gallery/interiors/branch1-bagambur/2012-3.jpeg",
    category: "interiors",
    title: "Founder's Era — Legacy Weights",
    desc: "The starting of the gym version back in 2012.",
    branch: 1,
  },
  {
    id: 204,
    src: "/gallery/interiors/branch1-bagambur/2026-1.jpeg",
    category: "interiors",
    title: "Modern Cardio Zone",
    desc: "Improved and upgraded in past years till now.",
    branch: 1,
  },
  {
    id: 205,
    src: "/gallery/interiors/branch1-bagambur/2026-2.jpeg",
    category: "interiors",
    title: "Modern Strength Deck",
    desc: "Improved and upgraded in past years till now.",
    branch: 1,
  },
  {
    id: 206,
    src: "/gallery/interiors/branch1-bagambur/2026-3.jpeg",
    category: "interiors",
    title: "Advanced Lifting Racks",
    desc: "Improved and upgraded in past years till now.",
    branch: 1,
  },
  {
    id: 207,
    src: "/gallery/interiors/branch1-bagambur/2026-31.jpeg",
    category: "interiors",
    title: "Lifting Racks",
    desc: "Sturdy squad racks and benches on our premium rubberized flooring.",
    branch: 1,
  },
  {
    id: 208,
    src: "/gallery/interiors/branch1-bagambur/2026-4.jpeg",
    category: "interiors",
    title: "Flagship Gym Floor",
    desc: "Full view of our modern, air-conditioned flagship training floor.",
    branch: 1,
  },
  {
    id: 209,
    src: "/gallery/interiors/branch1-bagambur/WhatsApp-Image-2026-07-18-at-8.40.14-AM-(1).jpeg",
    category: "interiors",
    title: "Imported Plate-Loaded Machines",
    desc: "Improved and upgraded in past years till now.",
    branch: 1,
  },
  {
    id: 210,
    src: "/gallery/interiors/branch1-bagambur/WhatsApp-Image-2026-07-18-at-8.40.14-AM-(2).jpeg",
    category: "interiors",
    title: "Hypertrophy Stations",
    desc: "Specially selected isolation stations for maximum muscle building.",
    branch: 1,
  },
  {
    id: 211,
    src: "/gallery/interiors/branch1-bagambur/WhatsApp-Image-2026-07-18-at-8.40.14-AM.jpeg",
    category: "interiors",
    title: "Full Studio Interior",
    desc: "Unisex training atmosphere with modern layout and lighting.",
    branch: 1,
  },
  // ── Branch 2: Trichy Road Interiors & Equipment ──
  {
    id: 221,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.42.37-AM.jpeg",
    category: "interiors",
    title: "Trichy Road Full Gym View",
    desc: "Bright, motivating, and clean unisex fitness environment.",
    branch: 2,
  },
  {
    id: 222,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.36.03-AM-(1).jpeg",
    category: "interiors",
    title: "Lifting Benches & Racks",
    desc: "High-grade benches and racks for heavy free-weight training.",
    branch: 2,
  },
  {
    id: 223,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.36.03-AM.jpeg",
    category: "interiors",
    title: "Trichy Road Free Weights",
    desc: "A wide selection of pro-grade dumbbells and custom barbells.",
    branch: 2,
  },
  {
    id: 224,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.36.04-AM-(1).jpeg",
    category: "interiors",
    title: "Plate Loaded Strength Machines",
    desc: "Advanced biomechanically optimized plate-loaded machines.",
    branch: 2,
  },
  {
    id: 225,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.36.04-AM-(2).jpeg",
    category: "interiors",
    title: "Hypertrophy Station Setup",
    desc: "Isolation equipment designed for targeting key muscle groups.",
    branch: 2,
  },
  {
    id: 226,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.36.04-AM.jpeg",
    category: "interiors",
    title: "Trichy Road Cable Machine",
    desc: "Multi-functional dual cable crossover machine for full body training.",
    branch: 2,
  },
  {
    id: 227,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.36.05-AM.jpeg",
    category: "interiors",
    title: "Premium Leg Press Station",
    desc: "Heavy duty leg press machine for lower body strength and mass.",
    branch: 2,
  },
  {
    id: 228,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.42.37-AM-(1).jpeg",
    category: "interiors",
    title: "Functional Training Floor",
    desc: "Dedicated spacious turf area for functional conditioning.",
    branch: 2,
  },
  {
    id: 229,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.42.37-AM-(2).jpeg",
    category: "interiors",
    title: "Trichy Road Cardio Deck",
    desc: "High-end commercial treadmills and spin bikes.",
    branch: 2,
  },
  {
    id: 230,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.42.37-AM-(3).jpeg",
    category: "interiors",
    title: "Conditioning Equipment Area",
    desc: "Agility ladders, battle ropes, and boxes for high-intensity work.",
    branch: 2,
  },
  {
    id: 231,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.42.37-AM.jpeg",
    category: "interiors",
    title: "Full Gym Layout View",
    desc: "Bright, motivating, and clean unisex fitness environment.",
    branch: 2,
  },
  {
    id: 232,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.42.38-AM-(1).jpeg",
    category: "interiors",
    title: "Modern Locker Rooms",
    desc: "Safe and secure storage space for personal belongings.",
    branch: 2,
  },
  {
    id: 233,
    src: "/gallery/interiors/branch2-trichy/WhatsApp-Image-2026-07-18-at-8.42.38-AM.jpeg",
    category: "interiors",
    title: "Trichy Road Entrance & Reception",
    desc: "Welcoming reception desk and lounge for members.",
    branch: 2,
  },
  // ── Branch 3: Palani Road Interiors & Equipment ──
  {
    id: 241,
    src: "/gallery/interiors/branch3-palani/IMG20260718062018.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Premium Equipment",
    desc: "Brand new line of premium heavy-duty lifting equipment.",
    branch: 3,
  },
  {
    id: 242,
    src: "/gallery/interiors/branch3-palani/IMG20260718062311.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Power Rack Station",
    desc: "Olympic grade power rack and platform for professional athletes.",
    branch: 3,
  },
  {
    id: 243,
    src: "/gallery/interiors/branch3-palani/IMG20260718080410.jpg.jpeg",
    category: "interiors",
    title: "Premium Dumbbell Rack",
    desc: "Two levels of professional grade dumbbells ranging from light to heavy.",
    branch: 3,
  },
  {
    id: 244,
    src: "/gallery/interiors/branch3-palani/IMG20260718080425.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Cable Crossover",
    desc: "Versatile cable crossover station for functional upper body exercises.",
    branch: 3,
  },
  {
    id: 245,
    src: "/gallery/interiors/branch3-palani/IMG20260718080605.jpg.jpeg",
    category: "interiors",
    title: "Plate Loaded Row Station",
    desc: "Advanced biomechanically optimized row machine for back development.",
    branch: 3,
  },
  {
    id: 246,
    src: "/gallery/interiors/branch3-palani/IMG20260718080726.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Leg Press Station",
    desc: "High-capacity leg press machine for compound lower body training.",
    branch: 3,
  },
  {
    id: 247,
    src: "/gallery/interiors/branch3-palani/IMG20260718080831.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Squat Rack Setup",
    desc: "Squat rack with Olympic barbell and premium bumper plates.",
    branch: 3,
  },
  {
    id: 248,
    src: "/gallery/interiors/branch3-palani/IMG20260718081004.jpg.jpeg",
    category: "interiors",
    title: "Modern Steam Room",
    desc: "Luxury steam room therapy exclusively available at Palani Road branch.",
    branch: 3,
  },
  {
    id: 249,
    src: "/gallery/interiors/branch3-palani/IMG20260718081021.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Restroom & Shower",
    desc: "Clean, hygienic, and modern restrooms for our members.",
    branch: 3,
  },
  {
    id: 250,
    src: "/gallery/interiors/branch3-palani/IMG20260718081224.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Cardio Zone",
    desc: "Fully air-conditioned cardio section overlooking the main street.",
    branch: 3,
  },
  {
    id: 251,
    src: "/gallery/interiors/branch3-palani/IMG20260718081948.jpg.jpeg",
    category: "interiors",
    title: "Palani Road Equipment Row",
    desc: "Full row of state-of-the-art machines for complete body training.",
    branch: 3,
  },
  {
    id: 252,
    src: "/gallery/interiors/branch3-palani/IMG20260718082120.jpg.jpeg",
    category: "interiors",
    title: "Isometric Chest Press Setup",
    desc: "Targeted chest press machine for deep chest isolation and hypertrophy.",
    branch: 3,
  },
  {
    id: 253,
    src: "/gallery/interiors/branch3-palani/IMG20260718083332.jpg.jpeg",
    category: "interiors",
    title: "Main Training Floor View",
    desc: "A wide perspective of the premium, spacious training layout at Palani Road.",
    branch: 3,
  },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Photos" },
  { value: "achievements", label: "Achievements" },
  { value: "transformations", label: "Transformations" },
  { value: "interiors", label: "Gym Interiors & Equipment" },
];

// ── Shuffle grid data — 16 real site images ──────────────────────────────────
const shuffleData = [
  { id: 1,  src: "/gallery/achievements/ach1.jpg" },
  { id: 2,  src: "/gallery/achievements/ach2.jpg" },
  { id: 3,  src: "/gallery/achievements/ach3.jpg" },
  { id: 4,  src: "/gallery/achievements/ach4.jpg" },
  { id: 5,  src: "/gallery/achievements/ach5.jpg" },
  { id: 6,  src: "/gallery/achievements/ach6.jpg" },
  { id: 7,  src: "/gallery/achievements/ach7.jpg" },
  { id: 8,  src: "/gallery/achievements/ach8.jpg" },
  { id: 9,  src: "/gallery/transformations/trans1.jpg" },
  { id: 10, src: "/gallery/transformations/trans2.jpg" },
  { id: 11, src: "/gallery/transformations/trans3.jpg" },
  { id: 12, src: "/gallery/transformations/trans4.jpg" },
  { id: 13, src: "/gallery/transformations/trans5.jpg" },
  { id: 14, src: "/gallery/transformations/trans6.jpg" },
  { id: 15, src: "/gallery/transformations/trans7.jpg" },
  { id: 16, src: "/gallery/transformations/trans9.jpg" },
  { id: 101, src: "/gallery/achievements/ach17.jpeg" },
  { id: 102, src: "/gallery/achievements/ach18.jpeg" },
  { id: 103, src: "/gallery/achievements/ach19.jpeg" },
  { id: 104, src: "/gallery/achievements/ach20.jpeg" },
  { id: 105, src: "/gallery/achievements/ach21.jpeg" },
  { id: 106, src: "/gallery/achievements/ach22.jpeg" },
  { id: 107, src: "/gallery/achievements/ach23.jpeg" },
  { id: 108, src: "/gallery/achievements/ach24.jpeg" },
  { id: 109, src: "/gallery/achievements/ach25.jpeg" },
  { id: 110, src: "/gallery/achievements/ach26.jpeg" },
];

const shuffleArray = (arr: typeof shuffleData) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateSquares = (isInitial: boolean = false) => {
  const data = isInitial ? shuffleData : shuffleArray(shuffleData);
  return data.map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url("${encodeURI(sq.src)}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState(() => generateSquares(true));

  useEffect(() => {
    const tick = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(tick, 3000);
    };
    timeoutRef.current = setTimeout(tick, 3000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[340px] sm:h-[400px] gap-1">
      {squares}
    </div>
  );
};

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const filtered = filter === "all" ? items.filter(i => i.category !== "interiors") : items.filter((i) => i.category === filter);

  const openLightbox = (id: number) => {
    const idx = filtered.findIndex((i) => i.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex((lightboxIndex + dir + filtered.length) % filtered.length);
    },
    [lightboxIndex, filtered.length]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > 50) navigate(1);
    if (touchEnd - touchStart > 50) navigate(-1);
  };

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SHUFFLE HERO ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 mb-12 sm:mb-20">
          {/* Left: text */}
          <div>
            <span className="block mb-3 text-xs font-bold uppercase tracking-widest text-brand-yellow">
              Real Moments · Real Results
            </span>
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white leading-none page-heading-left">
              GYM <span className="text-brand-yellow">GALLERY</span>
            </h1>
            <p className="text-brand-gray text-sm sm:text-base max-w-md mt-6">
              Explore our athletes, achievements, and transformation journeys.
              Every photo is a real moment from Muscle Gym Dindigul.
            </p>
            <a
              href="/join"
              className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase px-7 py-3 rounded-full hover:scale-105 transition-transform tracking-wider shadow-[0_0_15px_rgba(255,140,0,0.3)]"
            >
              Join Now
            </a>
          </div>
          {/* Right: animated shuffle grid — hidden on small mobile to avoid overflow */}
          <div className="hidden md:block">
            <ShuffleGrid />
          </div>
        </div>


        {/* ── FILTER BAR ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="text-brand-gray text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Filter className="h-4 w-4" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat.value
                  ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black shadow-[0_0_18px_rgba(255,180,0,0.35)]"
                  : "bg-brand-surface-card border border-brand-dark-gray/50 text-brand-gray hover:text-white hover:border-brand-yellow/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── GALLERY GRID ── */}
        {filter === "interiors" ? (
          <div className="flex flex-col gap-16">
            {[
              { 
                id: 1, 
                displayName: (
                  <>
                    <span className="text-brand-yellow">MUSCLE</span> <span className="text-brand-orange">GYM</span>
                    <span className="text-white">, Bagambur</span>
                  </>
                ), 
                items: filtered.filter(i => i.branch === 1) 
              },
              { 
                id: 2, 
                displayName: (
                  <>
                    <span className="text-brand-yellow">MUSCLE</span> <span className="text-brand-orange">FITNESS STUDIO UNISEX</span>
                    <span className="text-white">, Trichy Road</span>
                  </>
                ), 
                items: filtered.filter(i => i.branch === 2) 
              },
              { 
                id: 3, 
                displayName: (
                  <>
                    <span className="text-brand-yellow">MUSCLE</span> <span className="text-brand-orange">PRO FITNESS STUDIO UNISEX</span>
                    <span className="text-white">, Palani Road</span>
                  </>
                ), 
                items: filtered.filter(i => i.branch === 3) 
              }
            ].map((branch) => (
              <motion.div 
                key={branch.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-t border-brand-dark-gray/30 pt-8 first:border-0 first:pt-0"
              >
                <h2 className="font-bebas text-3xl sm:text-4xl tracking-widest mb-6 drop-shadow-[0_0_8px_rgba(255,137,59,0.2)]">
                  {branch.displayName}
                </h2>
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
                  {branch.items.map((item) => (
                    <motion.div
                      key={item.id}
                      onClick={() => openLightbox(item.id)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="group relative break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-brand-dark-gray/40 hover:border-brand-yellow/40 hover:shadow-[0_0_20px_rgba(255,137,59,0.15)] transition-all duration-300"
                    >
                      {/* Actual photo */}
                      <div className="relative w-full">
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <h3 className="font-bebas text-base text-white tracking-wide leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-brand-gray text-[9px] leading-relaxed line-clamp-2 mt-0.5">
                          {item.desc}
                        </p>
                      </div>

                      {/* Zoom icon */}
                      <div className="absolute top-2.5 right-2.5 p-1.5 bg-brand-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="h-3.5 w-3.5 text-brand-yellow" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="group relative break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-brand-dark-gray/40 hover:border-brand-yellow/40 transition-all duration-300"
              >
                {/* Actual photo */}
                <div className="relative w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover transition-transform duration-150 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2 py-0.5 rounded w-fit mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bebas text-lg text-white tracking-wide leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-brand-gray text-[10px] leading-relaxed line-clamp-2 mt-0.5">
                    {item.desc}
                  </p>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 p-2 bg-brand-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-4 w-4 text-brand-yellow" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-brand-gray">
            <p className="text-lg">No photos in this category yet.</p>
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {current && (
        <div
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-50 bg-brand-black/97 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 rounded-full bg-brand-dark-gray/60 hover:bg-brand-yellow text-white hover:text-brand-black transition-colors z-10 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-3 sm:left-6 p-3 rounded-full bg-brand-dark-gray/60 hover:bg-brand-yellow text-white hover:text-brand-black transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-3 sm:right-6 p-3 rounded-full bg-brand-dark-gray/60 hover:bg-brand-yellow text-white hover:text-brand-black transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={current.src}
                alt={current.title}
                width={1200}
                height={900}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-brand-dark-gray/40"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center px-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-3 py-0.5 rounded-full">
                {current.category}
              </span>
              <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-2">
                {current.title}
              </h2>
              <p className="text-brand-gray text-xs sm:text-sm mt-1 max-w-md mx-auto">
                {current.desc}
              </p>
              <p className="text-brand-dark-gray text-[10px] mt-3 uppercase tracking-widest">
                {lightboxIndex! + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
