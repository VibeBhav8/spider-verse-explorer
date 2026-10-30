"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Users, ShieldAlert, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Globe },
    { href: "/characters", label: "Spider-People", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/85 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-[#06070c]/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff0055] via-purple-600 to-[#00f0ff] p-[2px] transition-transform duration-200 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white dark:bg-[#06070c]">
              <Sparkles className="h-5 w-5 text-[#ff0055] transition-transform duration-300 group-hover:rotate-12 dark:text-[#00f0ff]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-widest text-[#ff0055] dark:text-[#00f0ff]">
              SPIDER-VERSE
            </span>
            <span className="text-base font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#ff0055] dark:text-white">
              MULTIVERSE ARCHIVE
            </span>
          </div>
        </Link>

        {/* Right Nav Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Navigation links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-sm font-semibold transition-all ${
                    isActive
                      ? "text-[#ff0055] dark:text-[#00f0ff]"
                      : "text-slate-700 hover:bg-black/5 hover:text-black dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-1 -bottom-3.5 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#ff0055]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Multiverse Dimension Status Pill */}
          <div className="hidden items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-mono font-medium text-amber-700 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-300 md:flex">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500 animate-pulse dark:text-yellow-400" />
            <span>CANON: STABLE</span>
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
