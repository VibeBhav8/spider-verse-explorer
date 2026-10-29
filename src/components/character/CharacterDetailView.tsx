"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Zap,
  Sparkles,
  Quote,
  Activity,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Character } from "@/types/character";
import MultiversePortalJump from "./MultiversePortalJump";

// Lazy-load 3D Dimension Watch using next/dynamic (ssr: false) for peak Lighthouse score
const DimensionWatch3D = dynamic(
  () => import("@/components/canvas/DimensionWatch3D"),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-72 w-full flex flex-col items-center justify-center border-2 border-white/20 bg-[#06070e] halftone-bg animate-pulse text-center p-4 font-mono text-xs text-slate-400">
        <Compass className="h-8 w-8 text-[#00f0ff] animate-spin mb-2" />
        <span>INITIALIZING 3D MULTIVERSE WATCH...</span>
      </div>
    ),
  }
);

interface CharacterDetailViewProps {
  character: Character;
  allCharacters: Character[];
}

export default function CharacterDetailView({
  character,
  allCharacters,
}: CharacterDetailViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [activePower, setActivePower] = useState<string | null>(null);

  // Find previous and next characters for quick navigation
  const currentIndex = allCharacters.findIndex((c) => c.id === character.id);
  const prevChar =
    allCharacters[
      (currentIndex - 1 + allCharacters.length) % allCharacters.length
    ];
  const nextChar = allCharacters[(currentIndex + 1) % allCharacters.length];

  // Overall power index
  const powerIndex = Math.round(
    (character.stats.agility +
      character.stats.strength +
      character.stats.speed +
      character.stats.intellect) /
      4
  );

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      {/* Multiverse Jump Portal Overlay */}
      <MultiversePortalJump
        universe={character.universe}
        themeColor={character.themeColor}
        accentColor={character.accentColor}
      />

      <div className="mx-auto max-w-7xl">
        {/* Top Breadcrumb & Universe Hopper Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
          <Link
            href="/characters"
            className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-[#00f0ff] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Back to Multiverse Roster</span>
          </Link>

          {/* Quick Prev / Next Navigator */}
          <div className="flex items-center gap-2">
            <Link
              href={`/characters/${prevChar.id}`}
              className="inline-flex items-center gap-1 border border-white/20 bg-black/60 px-3 py-1 font-mono text-xs font-bold text-slate-300 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{prevChar.name}</span>
            </Link>
            <Link
              href={`/characters/${nextChar.id}`}
              className="inline-flex items-center gap-1 border border-white/20 bg-black/60 px-3 py-1 font-mono text-xs font-bold text-slate-300 hover:border-[#ff0055] hover:text-[#ff0055] transition-colors"
            >
              <span className="hidden sm:inline">{nextChar.name}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Main Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Visual Render Panel (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Character Poster Box */}
            <div className="relative overflow-hidden border-2 border-white/20 bg-[#090b14] shadow-[8px_8px_0px_#000] p-2">
              {/* Halftone Accent Border */}
              <div className="relative h-[30rem] w-full overflow-hidden bg-[#0e101a] border border-white/10">
                <div className="absolute inset-0 halftone-bg opacity-25 z-10 pointer-events-none" />

                {/* Character Image */}
                <Image
                  src={
                    imageError
                      ? "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80"
                      : character.imageUrl
                  }
                  alt={character.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  onError={() => setImageError(true)}
                />

                {/* Comic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-transparent z-10" />

                {/* Dynamic Theme Glow Aura */}
                <div
                  className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full blur-3xl opacity-40"
                  style={{ backgroundColor: character.themeColor }}
                />

                {/* Universe Stamp */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                  <div className="inline-flex items-center gap-1.5 border border-black bg-[#00f0ff] px-2.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#ff0055]">
                    <Shield className="h-3.5 w-3.5" />
                    <span>{character.universe}</span>
                  </div>
                  {character.badge && (
                    <div className="inline-block border border-black bg-[#ffe600] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
                      {character.badge}
                    </div>
                  )}
                </div>

                {/* First Appearance Badge */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-sm border border-white/20 px-2.5 py-1 font-mono text-[11px] text-slate-300">
                    <Sparkles className="h-3 w-3 text-[#ffe600]" />
                    <span>Debut: {character.firstAppearance}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Multiverse Dimension Watch */}
            <div className="border-2 border-white/10 bg-[#090b14]/90 p-3 comic-border">
              <div className="flex items-center justify-between mb-2 font-mono text-xs">
                <span className="font-bold text-[#ffe600] flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-[#00f0ff]" />
                  <span>DIMENSION WATCH ARTIFACT</span>
                </span>
                <span className="text-[10px] text-slate-400">R3F 3D CAD</span>
              </div>
              <DimensionWatch3D
                themeColor={character.themeColor}
                accentColor={character.accentColor}
                universeName={character.universe}
              />
            </div>

            {/* Dimensional Biometrics Summary */}
            <div className="border border-white/10 bg-[#090b14]/80 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span>CANON STABILITY</span>
                <span className="font-bold text-[#00f0ff]">SECURED (99.8%)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span>MULTIVERSE THREAT INDEX</span>
                <span className="font-bold text-[#ffe600]">
                  CLASS {powerIndex > 90 ? "S (ALPHA)" : "A (ENHANCED)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>DIMENSIONAL ANCHOR</span>
                <span className="font-bold text-[#ff0055]">{character.id}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Lore, Stats & Powers (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Character Header Title */}
            <div>
              <div className="font-mono text-sm font-black uppercase tracking-widest text-[#ffe600]">
                {character.alias}
              </div>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-1">
                {character.name}
              </h1>
            </div>

            {/* Character Speech Quote Box */}
            <div className="relative border-2 border-black bg-[#ffe600] p-5 font-mono text-black shadow-[5px_5px_0px_#ff0055] -rotate-1">
              <Quote className="h-6 w-6 text-black/50 mb-2" />
              <blockquote className="text-base sm:text-lg font-black leading-snug">
                &ldquo;{character.quote}&rdquo;
              </blockquote>
              <div className="mt-3 text-right text-xs font-black uppercase tracking-wider text-black/75">
                &mdash; {character.name} ({character.universe})
              </div>
            </div>

            {/* Bio Dossier */}
            <div className="border-2 border-white/10 bg-[#090b14]/90 p-6 halftone-bg comic-border">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff] mb-3">
                <Activity className="h-4 w-4" />
                <span>SPIDER-SOCIETY DOSSIER</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {character.bio}
              </p>
            </div>

            {/* Detailed Biometric Stats */}
            <div className="border-2 border-white/10 bg-[#090b14]/90 p-6 comic-border">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#ff0055]">
                  <Zap className="h-4 w-4" />
                  <span>BIOMETRIC PERFORMANCE RATINGS</span>
                </div>
                <div className="font-mono text-xs text-slate-400">
                  OVERALL INDEX:{" "}
                  <span className="font-bold text-[#00f0ff]">{powerIndex}/100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Agility & Reflexes",
                    val: character.stats.agility,
                    color: "#00f0ff",
                  },
                  {
                    label: "Physical Strength",
                    val: character.stats.strength,
                    color: "#ff0055",
                  },
                  {
                    label: "Locomotion Speed",
                    val: character.stats.speed,
                    color: "#ffe600",
                  },
                  {
                    label: "Tactical Intellect",
                    val: character.stats.intellect,
                    color: "#00f5d4",
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>{stat.label}</span>
                      <span className="font-bold text-white">{stat.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.val}%` }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.8,
                          delay: idx * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-full"
                        style={{ backgroundColor: stat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Powers Manifest */}
            <div className="border-2 border-white/10 bg-[#090b14]/90 p-6 comic-border">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#ffe600] mb-3">
                <Sparkles className="h-4 w-4" />
                <span>ARACHNID POWERS MANIFEST</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {character.powers.map((power, idx) => {
                  const isHovered = activePower === power;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                      onMouseEnter={() => setActivePower(power)}
                      onMouseLeave={() => setActivePower(null)}
                      className={`inline-flex items-center gap-1.5 border-2 px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                        isHovered
                          ? "border-[#00f0ff] bg-[#00f0ff] text-black shadow-[3px_3px_0px_#ff0055]"
                          : "border-white/20 bg-black/50 text-slate-200 hover:border-white/40"
                      }`}
                    >
                      <Zap
                        className={`h-3.5 w-3.5 ${
                          isHovered ? "text-black" : "text-[#00f0ff]"
                        }`}
                      />
                      <span>{power}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* UNIVERSE NAVIGATION SWITCHER */}
        <section className="mt-16 border-t border-white/10 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
              <Compass className="h-4 w-4 text-[#ffe600]" />
              <span>DIMENSION HOPPER // SELECT TIMELINE</span>
            </div>
            <span className="font-mono text-xs text-slate-400">
              {allCharacters.length} Connected Dimensions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {allCharacters.map((char) => {
              const isActive = char.id === character.id;
              return (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className={`group relative flex flex-col items-center border-2 p-2.5 transition-all ${
                    isActive
                      ? "border-[#00f0ff] bg-[#00f0ff]/10 shadow-[3px_3px_0px_#ff0055]"
                      : "border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {/* Universe Tag */}
                  <span
                    className={`font-mono text-[10px] font-black uppercase ${
                      isActive ? "text-[#00f0ff]" : "text-slate-400"
                    }`}
                  >
                    {char.universe.replace("Earth-", "E-")}
                  </span>

                  {/* Character Name */}
                  <span
                    className={`mt-1 text-center font-mono text-xs font-bold truncate max-w-full ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {char.name.split(" ")[0]}
                  </span>

                  {/* Active Indicator dot */}
                  {isActive && (
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff0055] animate-ping" />
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
