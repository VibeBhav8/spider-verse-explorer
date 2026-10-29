"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Globe,
  Sparkles,
  ShieldAlert,
  Compass,
  Cpu,
  Layers,
} from "lucide-react";
import ComicBadge from "@/components/ui/ComicBadge";
import { characters } from "@/data/characters";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants with reduced-motion awareness
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        {/* Floating Comic Sound Effect Badges */}
        <div className="pointer-events-none absolute inset-0 max-w-7xl mx-auto overflow-hidden">
          {/* THWIP! Top Right */}
          <div className="absolute top-16 right-4 sm:right-16 md:right-24 z-20">
            <ComicBadge
              sound="THWIP!"
              variant="yellow"
              rotation={12}
              delay={0.2}
            />
          </div>

          {/* BZZT! Top Left */}
          <div className="absolute top-28 left-4 sm:left-12 md:left-20 z-20">
            <ComicBadge
              sound="BZZT!"
              variant="cyan"
              rotation={-14}
              delay={0.5}
            />
          </div>

          {/* POW! Bottom Right */}
          <div className="absolute bottom-24 right-6 sm:right-28 z-20 hidden sm:block">
            <ComicBadge
              sound="POW!"
              variant="magenta"
              rotation={8}
              delay={0.8}
            />
          </div>

          {/* CRUNCH! Bottom Left */}
          <div className="absolute bottom-32 left-8 sm:left-24 z-20 hidden md:block">
            <ComicBadge
              sound="CRUNCH!"
              variant="electric"
              rotation={-8}
              delay={1.1}
            />
          </div>
        </div>

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          {/* Issue Header Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-none border-2 border-black bg-[#ffe600] px-4 py-1 text-xs font-mono font-black uppercase text-black shadow-[3px_3px_0px_#ff0055] -rotate-1 mb-6"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>CLASSIFIED ARCHIVE // ISSUE #001</span>
          </motion.div>

          {/* Bold Comic Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.95]"
          >
            <span className="block drop-shadow-[4px_4px_0px_#ff0055]">
              SPIDER
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff0055] drop-shadow-[5px_5px_0px_rgba(0,240,255,0.7)]">
              VERSE
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl tracking-widest text-[#ffe600] mt-2 font-mono font-extrabold drop-shadow-[3px_3px_0px_#000]">
              EXPLORER
            </span>
          </motion.h1>

          {/* Subtitle with Comic Halftone Backing */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-sans leading-relaxed"
          >
            Leap across dimensions. Traverse the interconnected web of destiny, inspect biometric profiles of 8 Spider-People, and safeguard canon events before reality unravels.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* Primary 'Enter Multiverse' CTA */}
            <Link
              href="/characters"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#ff0055] px-8 py-4 font-mono text-base font-black uppercase tracking-wider text-white border-2 border-white shadow-[6px_6px_0px_#00f0ff] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0px_#ffe600] active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px_#ffe600]"
            >
              <Compass className="h-5 w-5 text-[#ffe600] transition-transform duration-300 group-hover:rotate-45" />
              <span>Enter Multiverse</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <a
              href="#features"
              className="group inline-flex items-center justify-center gap-2 border-2 border-white/30 bg-black/50 backdrop-blur-sm px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider text-slate-200 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
            >
              <Zap className="h-4 w-4 text-[#00f0ff]" />
              <span>Explore Features</span>
            </a>
          </motion.div>

          {/* Multiverse Metric Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { label: "Tracked Realities", val: "8 Universes", color: "#00f0ff" },
              { label: "Canon Status", val: "99.8% Stable", color: "#ffe600" },
              { label: "Spider-Society", val: "HQ Nueva York", color: "#ff0055" },
              { label: "Anomalies", val: "Contained", color: "#00f5d4" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="border border-white/10 bg-[#0c0d14]/80 p-3 rounded-none comic-border text-center"
              >
                <div
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: stat.color }}
                >
                  {stat.label}
                </div>
                <div className="font-mono text-sm sm:text-base font-black text-white mt-1">
                  {stat.val}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED SPIDER-PEOPLE PREVIEW (Scroll Triggered) */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
                <Globe className="h-3.5 w-3.5" />
                <span>MULTIVERSE ROSTER PREVIEW</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
                MEET THE <span className="text-[#ff0055]">WEB-WARRIORS</span>
              </h2>
            </div>
            <Link
              href="/characters"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 font-mono text-sm font-bold text-[#00f0ff] hover:text-[#ff0055] transition-colors"
            >
              <span>View all 8 Spider-People</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Character Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.slice(0, 4).map((char, index) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/characters/${char.id}`}
                  className="group relative block overflow-hidden border-2 border-white/15 bg-[#090b12] transition-all hover:border-[#00f0ff] hover:shadow-[5px_5px_0px_#ff0055]"
                >
                {/* Image Container with Halftone Accent */}
                <div className="relative h-64 w-full overflow-hidden bg-[#0e101a]">
                  <Image
                    src={char.imageUrl}
                    alt={char.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-transparent to-transparent" />

                  {/* Universe Badge */}
                  <div className="absolute top-3 left-3 bg-black/80 border border-white/20 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-[#00f0ff]">
                    {char.universe}
                  </div>

                  {/* Character Theme Glow */}
                  <div
                    className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity"
                    style={{ backgroundColor: char.themeColor }}
                  />
                </div>

                {/* Character Info */}
                <div className="p-4">
                  <div className="font-mono text-xs font-bold text-[#ffe600] uppercase tracking-wider">
                    {char.alias}
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-[#00f0ff] transition-colors">
                    {char.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                    {char.bio}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-mono text-[11px] text-slate-400">
                      Top Power:
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-white">
                      {char.powers[0].split(" ")[0]}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Scroll Triggered) */}
      <section
        id="features"
        className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#ffe600] bg-[#ffe600]/10 border border-[#ffe600]/30 px-3 py-1 rounded-full mb-3">
              <Sparkles className="h-3.5 w-3.5 text-[#ffe600]" />
              <span>MULTIVERSE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              BUILT FOR <span className="text-[#00f0ff]">DIMENSION-HOPPERS</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base">
              Harness advanced Spider-Society technology to inspect timelines, filter arachnid capabilities, and experience multi-dimensional rendering.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Layers,
                title: "8 Dimension Archives",
                desc: "Explore Earth-1610, Earth-65, Earth-928, Earth-138 and beyond with rich lore, canon badges, and power manifests.",
                color: "#ff0055",
                badge: "CLASSIFIED",
              },
              {
                icon: Globe,
                title: "Interactive Web Canvas",
                desc: "Real-time HTML5 2D glowing web strands with mouse pointer tension and an accessible reduced-motion fallback grid.",
                color: "#00f0ff",
                badge: "CANVAS 2D",
              },
              {
                icon: Cpu,
                title: "3D Spider-Artifact Bonus",
                desc: "Powered by Three.js & React Three Fiber for dynamic 3D web-watch models and chromatic glitch visualizers.",
                color: "#ffe600",
                badge: "R3F ENGINE",
              },
            ].map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative p-6 border-2 border-white/10 bg-[#090b14]/90 halftone-bg comic-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-black"
                      style={{ backgroundColor: feat.color }}
                    >
                      <Icon className="h-6 w-6 text-black" />
                    </div>
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-white/10 text-slate-300 border border-white/20">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold uppercase text-white">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEAP OF FAITH QUOTE SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-transparent to-[#0a0c16]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative p-8 sm:p-12 border-2 border-[#00f0ff] bg-black/70 shadow-[6px_6px_0px_#ff0055]"
          >
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#ffe600] mb-4">
              {"// CANON EVENT INSIGHT"}
            </div>
            <blockquote className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-snug">
              &ldquo;How will I know when I&apos;m ready? You won&apos;t. It&apos;s all it is, Miles. A leap of faith.&rdquo;
            </blockquote>
            <div className="mt-6 font-mono text-sm font-bold text-[#00f0ff]">
              &mdash; PETER B. PARKER (EARTH-616)
            </div>

            <div className="mt-8">
              <Link
                href="/characters"
                className="inline-flex items-center gap-2 bg-[#ffe600] text-black px-6 py-3 font-mono text-sm font-black uppercase border-2 border-black shadow-[4px_4px_0px_#ff0055] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
              >
                <span>Take the Leap</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
