"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

interface WatchMeshProps {
  themeColor: string;
  accentColor: string;
  isReducedMotion: boolean;
}

function WatchMesh({
  themeColor,
  accentColor,
  isReducedMotion,
}: WatchMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (isReducedMotion) return;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8;
      ring1Ref.current.rotation.x += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.6;
      ring2Ref.current.rotation.y += delta * 0.5;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.2;
    }
  });

  const parsedTheme = new THREE.Color(themeColor || "#00f0ff");
  const parsedAccent = new THREE.Color(accentColor || "#ff0055");

  return (
    <group ref={groupRef} dispose={null}>
      {/* Watch Outer Chassis / Bezel */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.4, 0.45, 8]} />
        <meshStandardMaterial
          color="#12131d"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Bezel Ring */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[1.9, 2.0, 0.1, 32]} />
        <meshStandardMaterial
          color="#1e2030"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Holographic Face Screen */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[1.75, 1.75, 0.05, 32]} />
        <meshStandardMaterial
          color="#06070c"
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Outer Hologram Gyro Ring */}
      <mesh ref={ring1Ref} position={[0, 0.38, 0]}>
        <torusGeometry args={[1.4, 0.04, 16, 64]} />
        <meshStandardMaterial
          color={parsedTheme}
          emissive={parsedTheme}
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Hologram Gyro Ring */}
      <mesh ref={ring2Ref} position={[0, 0.42, 0]}>
        <torusGeometry args={[1.0, 0.035, 16, 48]} />
        <meshStandardMaterial
          color={parsedAccent}
          emissive={parsedAccent}
          emissiveIntensity={2.0}
          roughness={0.1}
        />
      </mesh>

      {/* Multiverse Dimension Core Crystal */}
      <mesh ref={coreRef} position={[0, 0.48, 0]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color={parsedTheme}
          emissive={parsedTheme}
          emissiveIntensity={2.5}
          wireframe
        />
      </mesh>

      {/* 4 Cardinal Dimension Node Sensors */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 1.55,
            0.32,
            Math.sin(angle) * 1.55,
          ]}
        >
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={parsedAccent}
            emissive={parsedAccent}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}

      {/* Watch Straps (Strap Upper & Lower) */}
      <mesh position={[0, -0.05, 2.6]}>
        <boxGeometry args={[1.6, 0.25, 1.6]} />
        <meshStandardMaterial
          color="#0f1019"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      <mesh position={[0, -0.05, -2.6]}>
        <boxGeometry args={[1.6, 0.25, 1.6]} />
        <meshStandardMaterial
          color="#0f1019"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}

interface DimensionWatch3DProps {
  themeColor?: string;
  accentColor?: string;
  universeName?: string;
}

export default function DimensionWatch3D({
  themeColor = "#00f0ff",
  accentColor = "#ff0055",
  universeName = "Earth-1610",
}: DimensionWatch3DProps) {
  const shouldReduceMotion = useReducedMotion();
  const isReduced = !!shouldReduceMotion;

  return (
    <div className="relative h-72 w-full overflow-hidden border-2 border-white/20 bg-[#06070e] halftone-bg">
      {/* 3D Canvas Container */}
      <Canvas
        camera={{ position: [0, 3.8, 4.2], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <pointLight
          position={[0, 2, 0]}
          color={themeColor}
          intensity={3}
          distance={8}
        />
        <pointLight
          position={[0, -2, 0]}
          color={accentColor}
          intensity={2}
          distance={6}
        />

        {/* Floating Animation (if motion enabled) */}
        {isReduced ? (
          <WatchMesh
            themeColor={themeColor}
            accentColor={accentColor}
            isReducedMotion={true}
          />
        ) : (
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            <WatchMesh
              themeColor={themeColor}
              accentColor={accentColor}
              isReducedMotion={false}
            />
          </Float>
        )}

        {/* Orbit Controls (Drag to rotate in 3D, no zoom hijack) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      {/* Top Cybernetic UI Overlay */}
      <div className="pointer-events-none absolute top-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider">
        <div className="flex items-center gap-1.5 text-[#00f0ff] bg-black/75 px-2 py-0.5 border border-[#00f0ff]/30">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-ping" />
          <span>GIZMO WATCH 3D // {universeName}</span>
        </div>
        <div className="text-slate-400 bg-black/75 px-2 py-0.5 border border-white/10 hidden sm:block">
          DRAG TO ROTATE
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="pointer-events-none absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="bg-black/80 px-2 py-0.5 border border-white/10">
          DIMENSIONAL LOCK: ACTIVE
        </span>
        <span
          className="bg-black/80 px-2 py-0.5 border"
          style={{ borderColor: themeColor, color: themeColor }}
        >
          FREQUENCY SYNC
        </span>
      </div>
    </div>
  );
}
