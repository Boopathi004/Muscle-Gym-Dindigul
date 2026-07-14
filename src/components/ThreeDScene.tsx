"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import DumbbellModel from "./DumbbellModel";
import * as THREE from "three";

// ─── Multi-color Particles ───────────────────────────────────────────────────
function GlowParticles() {
  const ref = useRef<THREE.Points>(null); // brand orange
  const refB = useRef<THREE.Points>(null); // cyan accent
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
        <pointsMaterial
          size={0.055}
          color="#FF8C00"
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={refB}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posB, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#00e5ff"
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// ─── Pulsing halo disc (uses plane, not ring geometry) ────────────────────────
function FloorHalo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.18 + Math.sin(t * 1.4) * 0.09;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.0, 0]}>
      <circleGeometry args={[2.0, 48]} />
      <meshBasicMaterial
        color="#F4D03F"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Loading Fallback ────────────────────────────────────────────────────────
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

// ─── Main Scene ──────────────────────────────────────────────────────────────
export default function ThreeDScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[420px] md:h-[500px] lg:h-[620px] select-none cursor-grab active:cursor-grabbing">
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          // No shadows — biggest GPU saver
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

          {/* ── Lean lighting rig (3 lights, NO castShadow) ── */}

          {/* Soft global fill */}
          <ambientLight intensity={0.35} />

          {/* Gold key from upper-left */}
          <directionalLight
            position={[-4, 5, 3]}
            intensity={2.8}
            color="#F4D03F"
          />

          {/* Cool blue fill from right */}
          <pointLight position={[5, 1, -2]} intensity={18} color="#4FC3F7" />

          {/* Orange rim from behind-low */}
          <pointLight position={[0, -3, -4]} intensity={22} color="#FF6D00" />

          {/* ── Objects ── */}
          <DumbbellModel />
          <GlowParticles />
          <FloorHalo />

          {/* ── Controls ── */}
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
