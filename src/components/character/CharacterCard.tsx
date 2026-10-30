"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Shield, Sparkles, ArrowUpRight } from "lucide-react";
import { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
  priority?: boolean;
}

export default function CharacterCard({
  character,
  priority = false,
}: CharacterCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout={!shouldReduceMotion}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25, scale: shouldReduceMotion ? 1 : 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        layout: { duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" },
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -8,
              transition: { duration: 0.25, ease: "easeOut" },
            }
      }
      className="group relative flex flex-col overflow-hidden border-2 border-slate-900/15 bg-white shadow-[4px_4px_0px_#00b4d8] transition-all duration-300 hover:border-[#ff0055] hover:shadow-[6px_6px_0px_#ff0055] dark:border-white/20 dark:bg-[#0c0d16] dark:shadow-[5px_5px_0px_#000] dark:hover:border-[#00f0ff] dark:hover:shadow-[7px_7px_0px_#ff0055]"
    >
      {/* Chromatic Glitch Accent Bars */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f0ff] via-[#ffe600] to-[#ff0055] opacity-80" />

      {/* Top Banner: Universe & Badge */}
      <div className="flex items-center justify-between border-b border-black/10 bg-slate-100 px-3.5 py-2 font-mono text-xs dark:border-white/10 dark:bg-[#07080f]">
        <div className="flex items-center gap-1.5 font-bold text-[#ff0055] dark:text-[#00f0ff]">
          <Shield className="h-3.5 w-3.5" />
          <span className="tracking-wider">{character.universe}</span>
        </div>
        {character.badge && (
          <span className="rounded-none border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-black uppercase text-amber-700 dark:border-[#ffe600]/30 dark:bg-[#ffe600]/10 dark:text-[#ffe600]">
            {character.badge}
          </span>
        )}
      </div>

      {/* Character Image Container */}
      <Link
        href={`/characters/${character.id}`}
        className="relative block h-72 w-full overflow-hidden bg-gradient-to-b from-slate-200 to-slate-100 focus:outline-none dark:from-[#141624] dark:to-[#0c0d16]"
      >
        {/* Halftone Dot Overlay */}
        <div className="absolute inset-0 halftone-bg opacity-30 z-10 pointer-events-none" />

        {/* Dynamic Character Image */}
        <Image
          src={
            imageError
              ? "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80"
              : character.imageUrl
          }
          alt={character.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />

        {/* Comic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-[#0c0d16] dark:via-[#0c0d16]/30 z-10" />

        {/* Glitch Overlay on Hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 z-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${character.themeColor}, transparent 70%)`,
          }}
        />

        {/* Alias Tag floating on image */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="inline-block border border-black bg-[#ffe600] px-2.5 py-0.5 font-mono text-[11px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000] -rotate-1">
            {character.alias}
          </span>
        </div>
      </Link>

      {/* Character Info Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Name with Chromatic Shadow on Hover */}
        <Link href={`/characters/${character.id}`}>
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 transition-colors group-hover:text-[#ff0055] dark:text-white dark:group-hover:text-[#00f0ff]">
            {character.name}
          </h3>
        </Link>

        {/* Short Bio */}
        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
          {character.bio}
        </p>

        {/* Powers Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {character.powers.slice(0, 3).map((power, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 border border-black/10 bg-black/5 px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <Zap className="h-2.5 w-2.5 text-[#ff0055] dark:text-[#00f0ff]" />
              <span className="truncate max-w-[130px]">{power}</span>
            </span>
          ))}
          {character.powers.length > 3 && (
            <span className="border border-black/10 bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              +{character.powers.length - 3}
            </span>
          )}
        </div>

        {/* Biometric Stat Meters */}
        <div className="mt-5 space-y-2 border-t border-black/10 pt-3 font-mono text-xs dark:border-white/10">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Agility</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-slate-200 overflow-hidden dark:bg-white/10">
                <div
                  className="h-full bg-[#00b4d8] dark:bg-[#00f0ff]"
                  style={{ width: `${character.stats.agility}%` }}
                />
              </div>
              <span className="w-6 text-right font-bold text-slate-900 dark:text-white">
                {character.stats.agility}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Strength</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-slate-200 overflow-hidden dark:bg-white/10">
                <div
                  className="h-full bg-[#ff0055]"
                  style={{ width: `${character.stats.strength}%` }}
                />
              </div>
              <span className="w-6 text-right font-bold text-slate-900 dark:text-white">
                {character.stats.strength}
              </span>
            </div>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between dark:border-white/10">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <Sparkles className="h-3 w-3 text-amber-500 dark:text-[#ffe600]" />
            <span className="truncate max-w-[120px]">
              {character.firstAppearance}
            </span>
          </div>

          <Link
            href={`/characters/${character.id}`}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#ff0055] transition-colors hover:text-black dark:text-[#00f0ff] dark:hover:text-[#ff0055]"
          >
            <span>Dossier</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
