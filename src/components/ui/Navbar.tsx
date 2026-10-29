"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Users, ShieldAlert, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Globe },
    { href: "/characters", label: "Spider-People", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#06070c]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff0055] via-purple-600 to-[#00f0ff] p-[2px] transition-transform duration-200 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#06070c]">
              <Sparkles className="h-5 w-5 text-[#00f0ff] transition-transform duration-300 group-hover:rotate-12 group-hover:text-[#ff0055]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-widest text-[#00f0ff]">
              SPIDER-VERSE
            </span>
            <span className="text-base font-extrabold tracking-tight text-white transition-colors group-hover:text-[#ff0055]">
              MULTIVERSE ARCHIVE
            </span>
          </div>
        </Link>

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
                    ? "text-[#00f0ff]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
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

          {/* Multiverse Dimension Status Pill */}
          <div className="hidden items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 text-xs font-mono font-medium text-yellow-300 sm:flex">
            <ShieldAlert className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
            <span>CANON: STABLE</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
