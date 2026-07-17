"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

const LOGOS = [
  {
    id: "logo1",
    src: "/logos/logo1.jpg",
    glowColor: "rgba(255, 107, 0, 0.35)", // Primary Orange glow
    glowColorHex: "#FF6B00",
  },
  {
    id: "logo2",
    src: "/logos/logo2.png",
    glowColor: "rgba(255, 107, 0, 0.35)", // Primary Orange glow
    glowColorHex: "#FF6B00",
  },
  {
    id: "logo3",
    src: "/logos/logo3.png",
    glowColor: "rgba(232, 255, 0, 0.35)", // Lemon Yellow glow
    glowColorHex: "#E8FF00",
  },
];

export default function LoadingScreen() {
  // Only show once per browser session — not on back-navigation or internal routing
  const [isLoading, setIsLoading] = useState(false);
  const [activeLogoIndex, setActiveLogoIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  
  const progress = useMotionValue(0);
  const progressPercentage = useTransform(progress, (latest) => `${Math.round(latest)}%`);
  const progressScaleX = useTransform(progress, (v) => v / 100);

  useEffect(() => {
    // Check if we already showed the loading screen this session
    const alreadyShown = sessionStorage.getItem("muscleGymLoadingShown");
    if (alreadyShown) {
      setIsLoading(false);
      return;
    }

    // First time — mark it and show loading screen
    sessionStorage.setItem("muscleGymLoadingShown", "1");
    setIsLoading(true);

    const progressControl = animate(progress, 100, {
      duration: 3.2,
      ease: "linear",
    });

    const logo1Timer = setTimeout(() => setActiveLogoIndex(1), 1050);
    const logo2Timer = setTimeout(() => setActiveLogoIndex(2), 2100);
    
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3200);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      progressControl.stop();
      clearTimeout(logo1Timer);
      clearTimeout(logo2Timer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [progress]);

  if (!isLoading) return null;

  const currentLogo = LOGOS[activeLogoIndex];

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={isExiting ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#111111] overflow-hidden"
    >
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF6B00] rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, -60, 60, 0], y: [0, 60, -60, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#E8FF00] rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, 40, -40, 0], y: [0, -40, 40, 0] }} 
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#8C8C8C] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="relative flex flex-col items-center z-10 w-full max-w-sm">
        {/* Logo Stack & Rotating Ring */}
        <div className="relative flex items-center justify-center w-[140px] h-[140px] mb-8">
          
          {/* Rotating Gradient Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-6px] rounded-full border-[2px] border-transparent"
            style={{
              background: "linear-gradient(#111111, #111111) padding-box, linear-gradient(135deg, #FF6B00, #E8FF00, #8C8C8C) border-box",
            }}
          />

          {/* Crossfading Logos */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentLogo.id}
              initial={{ scale: 0.6, opacity: 0, filter: "blur(10px)" }}
              animate={{ 
                scale: isExiting ? 1.15 : 1, 
                opacity: 1, 
                filter: "blur(0px)",
                boxShadow: `0 0 20px ${currentLogo.glowColor}`
              }}
              exit={{ scale: 1.08, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="absolute inset-0 rounded-full flex items-center justify-center bg-[#111111] overflow-hidden"
              style={{
                border: `1px solid ${currentLogo.glowColorHex}40`
              }}
            >
              <Image 
                src={currentLogo.src} 
                alt="Muscle Gym Logo"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="text-[#B5B5B5] font-medium tracking-[3px] text-[12px] sm:text-sm mb-12 uppercase text-center"
        >
          Train Different. Train Muscle.
        </motion.p>

        {/* Loading Progress Bar & Counter */}
        <motion.div 
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-[220px] flex flex-col items-center"
        >
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full origin-left"
              style={{
                width: "100%",
                scaleX: progressScaleX,
                background: "linear-gradient(90deg, #FF6B00, #E8FF00)"
              }}
            />
          </div>
          <motion.div 
            className="text-white font-medium text-sm sm:text-base tracking-wider"
          >
            {progressPercentage}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
