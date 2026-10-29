"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Compass } from "lucide-react";

interface MultiversePortalJumpProps {
  universe: string;
  themeColor: string;
  accentColor: string;
}

export default function MultiversePortalJump({
  universe,
  themeColor,
  accentColor,
}: MultiversePortalJumpProps) {
  const shouldReduceMotion = useReducedMotion();
  const [showPortal, setShowPortal] = useState(true);

  useEffect(() => {
    // If reduced motion is requested, do not run the portal sequence
    if (shouldReduceMotion) {
      setShowPortal(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowPortal(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion, universe]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {showPortal && (
        <motion.div
          key="portal-jump"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/90 backdrop-blur-md"
        >
          {/* Chromatic Portal Rings */}
          <motion.div
            initial={{ scale: 0.2, rotate: -45, opacity: 0 }}
            animate={{ scale: [0.2, 1.4, 3], rotate: [0, 90, 180], opacity: [0, 1, 0] }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="absolute h-96 w-96 rounded-full border-4"
            style={{
              borderColor: themeColor,
              boxShadow: `0 0 60px ${themeColor}, inset 0 0 60px ${accentColor}`,
            }}
          />

          <motion.div
            initial={{ scale: 0.1, rotate: 45, opacity: 0 }}
            animate={{ scale: [0.1, 1.8, 3.5], rotate: [45, -45, -120], opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.05 }}
            className="absolute h-[32rem] w-[32rem] rounded-full border-2 border-dashed"
            style={{
              borderColor: accentColor,
            }}
          />

          {/* Multiverse Jump Coordinates Tag */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-2 border-2 border-black bg-[#ffe600] px-6 py-3 font-mono text-black shadow-[5px_5px_0px_#ff0055] -rotate-2"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <Compass className="h-4 w-4 animate-spin" />
              <span>MULTIVERSE JUMP INITIATED</span>
            </div>
            <div className="text-xl font-black tracking-tight">
              TARGET: {universe}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
