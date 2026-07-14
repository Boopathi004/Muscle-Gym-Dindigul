"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const [isTouch, setIsTouch] = useState(true); // default true to avoid SSR mismatch

  useEffect(() => {
    // Touch devices: skip Framer Motion entirely — saves GPU compositing cost
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // On touch/mobile, render a lightweight static card with a simple fade-in
  if (isTouch) {
    return (
      <div className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return <TiltCardDesktop className={className}>{children}</TiltCardDesktop>;
}

// ─── Desktop-only 3D tilt (Framer Motion, mouse-only) ────────────────────────
function TiltCardDesktop({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); x.set(0); y.set(0); }}
      style={{
        transformStyle: "preserve-3d",
        rotateX: hovering ? rotateX : 0,
        rotateY: hovering ? rotateY : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative cursor-pointer transition-shadow duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
