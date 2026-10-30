"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="group relative flex h-8 w-16 items-center rounded-full border-2 border-slate-900 bg-slate-200 p-0.5 shadow-[2px_2px_0px_#00f0ff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f0ff] dark:border-white/30 dark:bg-[#0e101a] dark:shadow-[2px_2px_0px_#ff0055]"
    >
      {/* Background icon indicators */}
      <div className="absolute inset-x-1.5 flex items-center justify-between pointer-events-none">
        <Sun className="h-3.5 w-3.5 text-amber-500 transition-opacity duration-200" />
        <Moon className="h-3.5 w-3.5 text-[#00f0ff] transition-opacity duration-200" />
      </div>

      {/* Sliding Knob */}
      <motion.div
        layout={!shouldReduceMotion}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 30 }
        }
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-black bg-gradient-to-tr from-[#ffe600] to-amber-300 shadow-md dark:border-white/20 dark:from-[#ff0055] dark:to-purple-500"
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-white" />
        ) : (
          <Sun className="h-3 w-3 text-black" />
        )}
      </motion.div>
    </button>
  );
}
