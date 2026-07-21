"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Plate colour config ─────────────────────────────────────────────────────
const PLATE_COLORS = [
  { base: "#e63946", emissive: "#e63946" }, // red   — heaviest
  { base: "#2196F3", emissive: "#2196F3" }, // blue
  { base: "#FFEB3B", emissive: "#FFEB3B" }, // yellow (brand)
  { base: "#4CAF50", emissive: "#4CAF50" }, // green  — lightest
];

// ─── Single Weight Plate ─────────────────────────────────────────────────────
interface PlateProps {
  y: number;
  radius: number;
  thickness: number;
  colorIdx: number;
}
function Plate({ y, radius, thickness, colorIdx }: PlateProps) {
  const c = PLATE_COLORS[colorIdx % PLATE_COLORS.length];
  return (
    <group position={[0, y, 0]}>
      {/* Main cylinder */}
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, thickness, 32]} />
        <meshStandardMaterial
          color={c.base}
          metalness={0.7}
          roughness={0.4}
          emissive={c.emissive}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Bright rim line (thin cylinder, no torus) */}
      <mesh>
        <cylinderGeometry args={[radius + 0.008, radius + 0.008, 0.02, 24]} />
        <meshStandardMaterial
          color={c.base}
          emissive={c.emissive}
          emissiveIntensity={0.7}
          metalness={0.5}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>
      {/* Centre hub */}
      <mesh>
        <cylinderGeometry args={[radius * 0.22, radius * 0.22, thickness * 1.2, 20]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  );
}

// ─── Knurl Ring ──────────────────────────────────────────────────────────────
function KnurlRing({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0]}>
      <cylinderGeometry args={[0.08, 0.08, 0.03, 18]} />
      <meshStandardMaterial
        color="#FF893B"
        metalness={0.9}
        roughness={0.2}
        emissive="#FF893B"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// ─── End Cap ─────────────────────────────────────────────────────────────────
function EndCap({ y }: { y: number }) {
  return (
    <group position={[0, y, 0]}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.13, 0.12, 24]} />
        <meshStandardMaterial color="#c8c8c8" metalness={0.96} roughness={0.06} />
      </mesh>
    </group>
  );
}

// ─── Main Dumbbell ───────────────────────────────────────────────────────────
export default function DumbbellModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.38;
    groupRef.current.rotation.z = Math.sin(t * 0.22) * 0.18;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.14;

    const mx = state.pointer.x * 0.45;
    const my = state.pointer.y * 0.3;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      my,
      0.08
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mx + t * 0.38,
      0.08
    );
  });

  // [y, radius, thickness, colorIdx]
  const platesLeft:  [number, number, number, number][] = [
    [1.06, 0.48, 0.17, 0],
    [1.27, 0.42, 0.14, 1],
    [1.45, 0.36, 0.11, 2],
    [1.60, 0.30, 0.09, 3],
  ];
  const platesRight: [number, number, number, number][] = [
    [-1.06, 0.48, 0.17, 0],
    [-1.27, 0.42, 0.14, 1],
    [-1.45, 0.36, 0.11, 2],
    [-1.60, 0.30, 0.09, 3],
  ];

  return (
    <group ref={groupRef} scale={[1.7, 1.7, 1.7]}>

      {/* Handle bar */}
      <mesh castShadow>
        <cylinderGeometry args={[0.068, 0.068, 2.1, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.96} roughness={0.08} />
      </mesh>

      {/* Neon yellow centre accent */}
      <mesh>
        <cylinderGeometry args={[0.075, 0.075, 0.7, 24]} />
        <meshStandardMaterial
          color="#FFEB3B"
          emissive="#FFEB3B"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Knurl grip rings */}
      {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((y) => (
        <KnurlRing key={y} y={y} />
      ))}

      {/* Left plates */}
      {platesLeft.map(([y, r, t, c], i) => (
        <Plate key={`L${i}`} y={y} radius={r} thickness={t} colorIdx={c} />
      ))}

      {/* Right plates */}
      {platesRight.map(([y, r, t, c], i) => (
        <Plate key={`R${i}`} y={y} radius={r} thickness={t} colorIdx={c} />
      ))}

      {/* End caps */}
      <EndCap y={1.78} />
      <EndCap y={-1.78} />

    </group>
  );
}
