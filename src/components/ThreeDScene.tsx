"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import DumbbellModel from "./DumbbellModel";
import * as THREE from "three";

// ─── Multi-color Particles ───────────────────────────────────────────────────
function GlowParticles() {
  const ref = useRef<THREE.Points>(null);
  const refB = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const particleCountA = isMobile ? 60 : 140;
  const particleCountB = isMobile ? 30 : 70;

  const posA = React.useMemo(() => {
    const arr = new Float32Array(particleCountA * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i]     = (Math.random() - 0.5) * 9;
      arr[i + 1] = (Math.random() - 0.5) * 9;
      arr[i + 2] = (Math.random() - 0.5) * 9;
    }
    return arr;
  }, [particleCountA]);

  const posB = React.useMemo(() => {
    const arr = new Float32Array(particleCountB * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i]     = (Math.random() - 0.5) * 7;
      arr[i + 1] = (Math.random() - 0.5) * 7;
      arr[i + 2] = (Math.random() - 0.5) * 7;
    }
    return arr;
  }, [particleCountB]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.055;
      ref.current.rotation.x = Math.sin(t * 0.025) * 0.1;
    }
    if (refB.current) {
      refB.current.rotation.y = -t * 0.04;
      refB.current.rotation.z = Math.cos(t * 0.03) * 0.08;
    }
  });

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posA, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#FF8C00" transparent opacity={0.65} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <points ref={refB}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posB, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#00e5ff" transparent opacity={0.35} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </>
  );
}

// ─── Pulsing halo disc ────────────────────────────────────────────────────────
function FloorHalo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.18 + Math.sin(t * 1.4) * 0.09;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.0, 0]}>
      <circleGeometry args={[2.0, 48]} />
      <meshBasicMaterial color="#F4D03F" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// ─── Loading Fallback ─────────────────────────────────────────────────────────
function SceneLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="w-14 h-14 border-4 border-brand-yellow/20 border-t-brand-orange rounded-full animate-spin mb-4" />
      <span className="font-bebas tracking-widest text-sm text-brand-gray animate-pulse">
        LOADING 3D SCENE...
      </span>
    </div>
  );
}

// ─── Static CSS Fallback (low-end / no-WebGL devices) ────────────────────────
function StaticDumbbellFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative flex items-center justify-center select-none">
        {/* Outer glow */}
        <div className="absolute w-64 h-64 bg-gradient-to-br from-brand-orange/20 to-brand-yellow/10 rounded-full blur-3xl" />
        {/* Dumbbell SVG */}
        <svg
          viewBox="0 0 200 80"
          className="w-64 h-28 relative z-10 drop-shadow-[0_0_20px_rgba(244,208,63,0.5)]"
          aria-label="Dumbbell"
        >
          {/* Handle */}
          <rect x="55" y="35" width="90" height="10" rx="5" fill="#c0c0c0" />
          {/* Brand accent center */}
          <rect x="85" y="33" width="30" height="14" rx="4" fill="#F4D03F" opacity="0.9" />
          {/* Left plates */}
          <rect x="28" y="20" width="12" height="40" rx="4" fill="#e63946" />
          <rect x="38" y="24" width="10" height="32" rx="3" fill="#2196F3" />
          <rect x="46" y="28" width="9" height="24" rx="3" fill="#F4D03F" />
          {/* Right plates */}
          <rect x="160" y="20" width="12" height="40" rx="4" fill="#e63946" />
          <rect x="152" y="24" width="10" height="32" rx="3" fill="#2196F3" />
          <rect x="145" y="28" width="9" height="24" rx="3" fill="#F4D03F" />
          {/* End caps */}
          <rect x="18" y="28" width="12" height="24" rx="5" fill="#a0a0a0" />
          <rect x="170" y="28" width="12" height="24" rx="5" fill="#a0a0a0" />
        </svg>
      </div>
    </div>
  );
}

// ─── Detect low-end device ────────────────────────────────────────────────────
function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  // Low RAM (≤2 GB) or very few CPU cores (≤2)
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
  const lowCPU = navigator.hardwareConcurrency <= 2;
  return lowMemory || lowCPU;
}

// ─── Main Scene ───────────────────────────────────────────────────────────────
export default function ThreeDScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [showStatic, setShowStatic] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    // Degrade gracefully on low-end devices — skip WebGL entirely
    if (isLowEndDevice()) setShowStatic(true);

    return () => window.removeEventListener("resize", check);
  }, []);

  const hint = isMobile
    ? "👆 Swipe / Drag to rotate"
    : "🖱️ Left Click + Drag to rotate";

  if (showStatic) {
    return (
      <div className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <StaticDumbbellFallback />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[420px] md:h-[500px] lg:h-[620px] select-none cursor-grab active:cursor-grabbing">
      {/* Mobile interaction hint */}
      <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-brand-gray/60 pointer-events-none z-10 sm:hidden">
        {hint}
      </p>

      <Suspense fallback={<SceneLoader />}>
        <Canvas
          gl={{
            antialias: !isMobile,
            powerPreference: isMobile ? "default" : "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          className="w-full h-full bg-transparent"
        >
          <PerspectiveCamera makeDefault position={[0, 0.4, 5.8]} fov={46} />

          <ambientLight intensity={0.35} />
          <directionalLight position={[-4, 5, 3]} intensity={2.8} color="#F4D03F" />
          <pointLight position={[5, 1, -2]} intensity={18} color="#4FC3F7" />
          <pointLight position={[0, -3, -4]} intensity={22} color="#FF6D00" />

          <DumbbellModel />
          <GlowParticles />
          <FloorHalo />

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.6}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
