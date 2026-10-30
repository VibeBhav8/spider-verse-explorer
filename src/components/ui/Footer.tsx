import Link from "next/link";
import { Sparkles, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-black/10 bg-slate-100/90 py-12 transition-colors dark:border-white/10 dark:bg-[#040508]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#ff0055] dark:text-[#00f0ff]" />
              <span className="font-mono text-base font-extrabold tracking-wider text-slate-900 dark:text-white">
                SPIDER-VERSE ARCHIVE
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              An interactive visual index cataloging anomalies, canon events, and arachnid heroes across the dimensional continuum.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff0055]">
              Dimensional Links
            </h4>
            <div className="mt-3 flex flex-col gap-2 font-mono text-sm text-slate-700 dark:text-slate-300">
              <Link href="/" className="hover:text-[#ff0055] transition-colors dark:hover:text-[#00f0ff]">
                Multiverse HQ
              </Link>
              <Link href="/characters" className="hover:text-[#ff0055] transition-colors dark:hover:text-[#00f0ff]">
                Spider-People Roster
              </Link>
            </div>
          </div>

          {/* Spider-Society Disclaimer */}
          <div className="md:text-right">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-mono font-medium text-red-600 dark:text-red-400">
              <Shield className="h-3.5 w-3.5" />
              <span>CLASSIFIED // SPIDER-SOCIETY HQ</span>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Disrupting canon events may trigger irreversible dimensional unraveling. Traverse with caution.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-black/5 pt-6 text-xs text-slate-500 transition-colors dark:border-white/5 sm:flex-row">
          <p>© {new Date().getFullYear()} Spider-Verse Explorer. Built for Web-Warriors.</p>
          <p className="mt-2 flex items-center gap-1 sm:mt-0">
            Powered by Next.js 14, Tailwind &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
