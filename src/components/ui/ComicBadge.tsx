"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ComicBadgeProps {
  sound: string;
  variant?: "yellow" | "cyan" | "magenta" | "electric";
  className?: string;
  rotation?: number;
  delay?: number;
}

export default function ComicBadge({
  sound,
  variant = "yellow",
  className = "",
  rotation = -6,
  delay = 0,
}: ComicBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantStyles = {
    yellow: "bg-[#ffe600] text-black border-black shadow-[3px_3px_0px_#000]",
    cyan: "bg-[#00f0ff] text-black border-black shadow-[3px_3px_0px_#ff0055]",
    magenta: "bg-[#ff0055] text-white border-black shadow-[3px_3px_0px_#00f0ff]",
    electric: "bg-black text-[#00f0ff] border-[#00f0ff] shadow-[3px_3px_0px_#ffe600]",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: shouldReduceMotion ? 0 : [0, -8, 0],
        rotate: shouldReduceMotion ? rotation : [rotation, rotation + 3, rotation],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        scale: { duration: 0.4 },
        opacity: { duration: 0.4 },
      }}
      className={`inline-block select-none font-black uppercase tracking-wider px-3 py-1 border-2 text-sm md:text-base font-mono skew-x-[-4deg] ${variantStyles[variant]} ${className}`}
      style={{
        clipPath: "polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%)",
      }}
    >
      {sound}
    </motion.div>
  );
}
