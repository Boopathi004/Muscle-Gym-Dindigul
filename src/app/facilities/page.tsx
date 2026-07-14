"use client";

import React, { useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Wind, ShowerHead, Lock, Flame, Sparkles } from "lucide-react";
import * as THREE from "three";

// ─── Material Configurations ──────────────────────────────────────────
const CHROME = { metalness: 0.98, roughness: 0.05, color: "#d0d0d0" };
const DARK_STEEL = { metalness: 0.85, roughness: 0.35, color: "#1c1c1f" };
const GOLD = { metalness: 0.9, roughness: 0.15, color: "#F4D03F" };

const PLATE_COLORS = [
  { base: "#e63946", emissive: "#e63946" }, // Red
  { base: "#2196F3", emissive: "#2196F3" }, // Blue
  { base: "#F4D03F", emissive: "#F4D03F" }, // Yellow
  { base: "#4CAF50", emissive: "#4CAF50" }, // Green
];

// ─── 1. Upgraded Realistic Barbell Model ────────────────────────────
function BarbellModel() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  // Stack configurations for left/right sides
  // [offset, radius, thickness, colorIdx]
  const platesLeft: [number, number, number, number][] = [
    [1.15, 0.36, 0.08, 0], // Red outer
    [1.24, 0.36, 0.08, 0], 
    [1.33, 0.32, 0.07, 1], // Blue
    [1.41, 0.28, 0.06, 2], // Yellow
    [1.48, 0.22, 0.05, 3], // Green inner
  ];

  const platesRight: [number, number, number, number][] = [
    [-1.15, 0.36, 0.08, 0],
    [-1.24, 0.36, 0.08, 0],
    [-1.33, 0.32, 0.07, 1],
    [-1.41, 0.28, 0.06, 2],
    [-1.48, 0.22, 0.05, 3],
  ];

  return (
    <group ref={ref} rotation={[0, 0, 0.25]} scale={[0.9, 0.9, 0.9]}>
      {/* Central bar */}
      <mesh castShadow>
        <cylinderGeometry args={[0.025, 0.025, 3.2, 32]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>

      {/* Knurled Hand-grips */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((offset, i) => (
        <mesh key={i} position={[0, offset, 0]}>
          <cylinderGeometry args={[0.027, 0.027, 0.16, 24]} />
          <meshStandardMaterial
            color="#FF8C00"
            metalness={0.8}
            roughness={0.3}
            emissive="#FF8C00"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* Left side plates stack */}
      {platesLeft.map(([y, r, t, cIdx], i) => {
        const pColor = PLATE_COLORS[cIdx];
        return (
          <group key={`L-${i}`} position={[0, y, 0]}>
            {/* Main Plate */}
            <mesh castShadow>
              <cylinderGeometry args={[r, r, t, 32]} />
              <meshStandardMaterial
                color={pColor.base}
                metalness={0.7}
                roughness={0.4}
                emissive={pColor.emissive}
                emissiveIntensity={0.15}
              />
            </mesh>
            {/* Glowing Accent Rim */}
            <mesh>
              <cylinderGeometry args={[r + 0.006, r + 0.006, 0.012, 24]} />
              <meshStandardMaterial
                color={pColor.base}
                emissive={pColor.emissive}
                emissiveIntensity={0.6}
                metalness={0.5}
                roughness={0.2}
                toneMapped={false}
              />
            </mesh>
            {/* Chrome ring inner spacer */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[r * 0.22, r * 0.22, t * 1.15, 16]} />
              <meshStandardMaterial {...DARK_STEEL} />
            </mesh>
          </group>
        );
      })}

      {/* Right side plates stack */}
      {platesRight.map(([y, r, t, cIdx], i) => {
        const pColor = PLATE_COLORS[cIdx];
        return (
          <group key={`R-${i}`} position={[0, y, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[r, r, t, 32]} />
              <meshStandardMaterial
                color={pColor.base}
                metalness={0.7}
                roughness={0.4}
                emissive={pColor.emissive}
                emissiveIntensity={0.15}
              />
            </mesh>
            <mesh>
              <cylinderGeometry args={[r + 0.006, r + 0.006, 0.012, 24]} />
              <meshStandardMaterial
                color={pColor.base}
                emissive={pColor.emissive}
                emissiveIntensity={0.6}
                metalness={0.5}
                roughness={0.2}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[r * 0.22, r * 0.22, t * 1.15, 16]} />
              <meshStandardMaterial {...DARK_STEEL} />
            </mesh>
          </group>
        );
      })}

      {/* Chrome Lock Collars */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.06, 24]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.06, 24]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
    </group>
  );
}

// ─── 2. Upgraded Realistic Kettlebell Model ──────────────────────────
function KettlebellModel() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={ref} position={[0, -0.3, 0]} scale={[1.4, 1.4, 1.4]}>
      {/* Kettlebell Body (Smooth Dark Cast-iron) */}
      <mesh castShadow>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial {...DARK_STEEL} roughness={0.4} />
      </mesh>

      {/* Heavy base stand */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.34, 0.38, 0.12, 32]} />
        <meshStandardMaterial {...DARK_STEEL} roughness={0.45} />
      </mesh>

      {/* Colored Handle (Powder coated Red with gloss finish) */}
      <group position={[0, 0.45, 0]}>
        {/* Top curved grip */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.45, 24]} />
          <meshStandardMaterial color="#e63946" metalness={0.4} roughness={0.2} />
        </mesh>
        {/* Left curve connector */}
        <mesh position={[-0.22, -0.15, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.35, 24]} />
          <meshStandardMaterial color="#e63946" metalness={0.4} roughness={0.2} />
        </mesh>
        {/* Right curve connector */}
        <mesh position={[0.22, -0.15, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.35, 24]} />
          <meshStandardMaterial color="#e63946" metalness={0.4} roughness={0.2} />
        </mesh>
      </group>

      {/* Gold branding ring badge on Kettlebell face */}
      <group position={[0, 0, 0.46]} rotation={[0.25, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.03, 32]} />
          <meshStandardMaterial {...GOLD} />
        </mesh>
        {/* Glowing inner core ring */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.01, 24]} />
          <meshStandardMaterial
            color="#FF8C00"
            emissive="#FF8C00"
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// ─── 3. Upgraded Realistic Dumbbell Model ───────────────────────────
function SimpleDumbbellModel() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <group ref={ref} scale={[1.1, 1.1, 1.1]} rotation={[0.4, 0, 0.25]}>
      {/* Chrome Handle */}
      <mesh castShadow>
        <cylinderGeometry args={[0.065, 0.065, 1.4, 32]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>

      {/* Knurled Orange grip stripes */}
      {[-0.35, -0.15, 0.0, 0.15, 0.35].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.025, 24]} />
          <meshStandardMaterial
            color="#FF8C00"
            metalness={0.9}
            roughness={0.1}
            emissive="#FF8C00"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Left Stack (Red / Blue) */}
      <group position={[0, 0.65, 0]}>
        {/* Plate 1 (Red) */}
        <mesh castShadow position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.12, 32]} />
          <meshStandardMaterial color="#e63946" metalness={0.7} roughness={0.3} emissive="#e63946" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.346, 0.346, 0.015, 24]} />
          <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
        {/* Plate 2 (Blue) */}
        <mesh castShadow position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.30, 0.30, 0.10, 32]} />
          <meshStandardMaterial color="#2196F3" metalness={0.7} roughness={0.3} emissive="#2196F3" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.306, 0.306, 0.015, 24]} />
          <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
        {/* End cap screw */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial {...CHROME} />
        </mesh>
      </group>

      {/* Right Stack (Red / Blue) */}
      <group position={[0, -0.65, 0]}>
        {/* Plate 1 (Red) */}
        <mesh castShadow position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.12, 32]} />
          <meshStandardMaterial color="#e63946" metalness={0.7} roughness={0.3} emissive="#e63946" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.346, 0.346, 0.015, 24]} />
          <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
        {/* Plate 2 (Blue) */}
        <mesh castShadow position={[0, -0.13, 0]}>
          <cylinderGeometry args={[0.30, 0.30, 0.10, 32]} />
          <meshStandardMaterial color="#2196F3" metalness={0.7} roughness={0.3} emissive="#2196F3" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, -0.13, 0]}>
          <cylinderGeometry args={[0.306, 0.306, 0.015, 24]} />
          <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
        {/* End cap screw */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial {...CHROME} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Main Facilities Component ──────────────────────────────────────
export default function Facilities() {
  const [activeModel, setActiveModel] = useState<"barbell" | "dumbbell" | "kettlebell">("barbell");

  const amenities = [
    { icon: <Wind className="h-6 w-6" />, name: "Fully Air Conditioned", desc: "Keep body temperatures regulated and oxygen flow high during heavy compounds." },
    { icon: <ShowerHead className="h-6 w-6" />, name: "Private Shower Cabinets", desc: "Spacious, clean shower areas and changing rooms available for unisex timings." },
    { icon: <Lock className="h-6 w-6" />, name: "Secure Locker Storage", desc: "Store personal accessories, supplements, and workout bags safely." },
    { icon: <Flame className="h-6 w-6" />, name: "Supplements Bar", desc: "Affordable dynamic hydration shakes, BCAAs, and premium whey supplements." },
  ];

  return (
    <div className="relative min-h-screen py-16 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white">
            GYM <span className="text-brand-yellow">FACILITIES</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            State-of-the-art training spaces featuring heavy imported weight stacks and elite lifestyle amenities.
          </p>
        </div>

        {/* 3D INTERACTIVE SHOWCASE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark-gray/30 border border-brand-yellow/10 rounded-full w-max">
              <Sparkles className="h-4 w-4 text-brand-yellow animate-pulse" />
              <span className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">Premium 3D Interactive Equipment</span>
            </div>
            
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              INTERACT WITH OUR <span className="text-brand-yellow">GEAR</span>
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed">
              We supply top-tier international standard bars, plates, and iron cast bells designed to handle massive physical stress safely. Tap, rotate, and interact with the customized high-energy gear representations below.
            </p>

            {/* Model Selector Tabs */}
            <div className="flex gap-3 mt-4">
              {(["barbell", "dumbbell", "kettlebell"] as const).map((model) => (
                <button
                  key={model}
                  onClick={() => setActiveModel(model)}
                  className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeModel === model
                      ? "bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black shadow-[0_0_15px_rgba(255,140,0,0.3)]"
                      : "bg-brand-surface-card border border-brand-dark-gray/60 text-brand-gray hover:text-white"
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Canvas Box with Upgraded Lighting */}
          <div className="lg:col-span-5 order-1 lg:order-2 glass-card rounded-3xl border border-brand-dark-gray/80 h-[380px] sm:h-[420px] relative overflow-hidden flex items-center justify-center">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-yellow/20 border-t-brand-orange rounded-full animate-spin mb-3" />
                <span className="text-xs text-brand-gray uppercase tracking-widest font-bold animate-pulse">Lifting Model...</span>
              </div>
            }>
              <Canvas
                gl={{
                  antialias: true,
                  powerPreference: "high-performance",
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.3
                }}
                className="w-full h-full bg-transparent"
              >
                <PerspectiveCamera makeDefault position={[0, 0, 2.4]} fov={50} />
                
                {/* 3-Point Studio Lighting Rig (Context-lost Safe) */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[-3, 4, 3]} intensity={2.2} color="#F4D03F" />
                <pointLight position={[4, 1, -2]} intensity={14} color="#4FC3F7" />
                <pointLight position={[0, -2, -3]} intensity={16} color="#FF6D00" />
                
                {activeModel === "barbell" && <BarbellModel />}
                {activeModel === "dumbbell" && <SimpleDumbbellModel />}
                {activeModel === "kettlebell" && <KettlebellModel />}

                <OrbitControls enableZoom={false} autoRotate={false} />
              </Canvas>
            </Suspense>
            <div className="absolute bottom-4 right-4 bg-brand-black/60 border border-brand-dark-gray/40 px-3 py-1.5 rounded-lg text-[10px] text-brand-gray font-bold uppercase tracking-widest">
              🖱️ Left Click + Drag to rotate
            </div>
          </div>
        </section>

        {/* AMENITIES SECTION */}
        <section>
          <div className="text-center mb-16">
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-widest text-white">
              GYM <span className="text-brand-orange">AMENITIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((am, i) => (
              <div 
                key={i} 
                className="glass-card p-6 rounded-2xl border border-brand-dark-gray/40 hover:border-brand-yellow/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-dark-gray/30 border border-brand-yellow/10 flex items-center justify-center text-brand-yellow shrink-0">
                  {am.icon}
                </div>
                <div>
                  <h4 className="font-bebas text-lg text-white tracking-wide mb-1">{am.name}</h4>
                  <p className="text-brand-gray text-xs leading-relaxed">{am.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
