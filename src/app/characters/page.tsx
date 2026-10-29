"use client";

import React, { Suspense, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Users,
  ShieldAlert,
} from "lucide-react";
import CharacterCard from "@/components/character/CharacterCard";
import { characters, getAllUniverses } from "@/data/characters";

function CharacterGallery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL query parameters
  const currentUniverse = searchParams.get("universe") || "all";
  const currentSort = searchParams.get("sort") || "name-asc";
  const currentQuery = searchParams.get("search") || "";

  const allUniverses = useMemo(() => getAllUniverses(), []);

  // Update URL params
  const updateParams = useCallback(
    (newParams: { universe?: string; sort?: string; search?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newParams.universe !== undefined) {
        if (newParams.universe === "all") {
          params.delete("universe");
        } else {
          params.set("universe", newParams.universe);
        }
      }

      if (newParams.sort !== undefined) {
        if (newParams.sort === "name-asc") {
          params.delete("sort");
        } else {
          params.set("sort", newParams.sort);
        }
      }

      if (newParams.search !== undefined) {
        if (!newParams.search.trim()) {
          params.delete("search");
        } else {
          params.set("search", newParams.search.trim());
        }
      }

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams]
  );

  // Filter and Sort characters
  const filteredCharacters = useMemo(() => {
    let result = [...characters];

    // Filter by universe
    if (currentUniverse !== "all") {
      result = result.filter((char) => char.universe === currentUniverse);
    }

    // Filter by search text
    if (currentQuery.trim()) {
      const q = currentQuery.toLowerCase();
      result = result.filter(
        (char) =>
          char.name.toLowerCase().includes(q) ||
          char.alias.toLowerCase().includes(q) ||
          char.universe.toLowerCase().includes(q) ||
          char.powers.some((p) => p.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (currentSort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "universe":
        result.sort((a, b) => a.universe.localeCompare(b.universe));
        break;
      case "agility":
        result.sort((a, b) => b.stats.agility - a.stats.agility);
        break;
      case "strength":
        result.sort((a, b) => b.stats.strength - a.stats.strength);
        break;
      case "default":
      default:
        // Keep order in characters.json
        break;
    }

    return result;
  }, [currentUniverse, currentSort, currentQuery]);

  const handleResetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 border-2 border-black bg-[#00f0ff] px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#ff0055] -rotate-1 mb-3">
          <ShieldAlert className="h-4 w-4" />
          <span>DIMENSIONAL ARCHIVE // 8 ACTIVE ANOMALIES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          SPIDER-PEOPLE <span className="text-[#ff0055]">DATABASE</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-400">
          Biometric scans, origin realities, and arachnid capabilities classified by the Spider-Society. Filter by dimension or sort by alphabetical order.
        </p>
      </div>

      {/* Control Bar: Search + Universe Filter + Sort */}
      <div className="mb-8 flex flex-col gap-4 rounded-none border-2 border-white/10 bg-[#090b14]/90 p-4 halftone-bg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, alias, powers, or earth..."
            value={currentQuery}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full border-2 border-white/20 bg-black/60 py-2 pl-10 pr-4 font-mono text-sm text-white placeholder-slate-500 transition-colors focus:border-[#00f0ff] focus:outline-none focus:shadow-[3px_3px_0px_#00f0ff]"
          />
          {currentQuery && (
            <button
              onClick={() => updateParams({ search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Universe Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#00f0ff]" />
            <select
              aria-label="Filter by Universe"
              value={currentUniverse}
              onChange={(e) => updateParams({ universe: e.target.value })}
              className="border-2 border-white/20 bg-[#090b14] px-3 py-2 font-mono text-xs sm:text-sm font-bold text-white transition-colors focus:border-[#00f0ff] focus:outline-none"
            >
              <option value="all">All Universes ({characters.length})</option>
              {allUniverses.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </div>

          {/* Alphabetical Name Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-[#ff0055]" />
            <select
              aria-label="Sort Characters"
              value={currentSort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="border-2 border-white/20 bg-[#090b14] px-3 py-2 font-mono text-xs sm:text-sm font-bold text-white transition-colors focus:border-[#ff0055] focus:outline-none"
            >
              <option value="name-asc">Alphabetical (A &rarr; Z)</option>
              <option value="name-desc">Alphabetical (Z &rarr; A)</option>
              <option value="universe">Universe Designation</option>
              <option value="agility">Agility Rating</option>
              <option value="strength">Strength Rating</option>
              <option value="default">Canon Order</option>
            </select>
          </div>

          {/* Reset button if filtered */}
          {(currentUniverse !== "all" ||
            currentSort !== "name-asc" ||
            currentQuery) && (
            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="inline-flex items-center gap-1 border border-white/20 bg-white/5 px-2.5 py-2 font-mono text-xs font-bold text-slate-300 hover:border-[#ffe600] hover:text-[#ffe600] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Universe Quick Filter Pills */}
      <div className="mb-8 flex flex-wrap gap-2 items-center">
        <span className="font-mono text-xs text-slate-400 mr-2 flex items-center gap-1">
          <Users className="h-3.5 w-3.5 text-[#ffe600]" />
          <span>Realities:</span>
        </span>
        <button
          onClick={() => updateParams({ universe: "all" })}
          className={`border px-3 py-1 font-mono text-xs font-bold transition-all ${
            currentUniverse === "all"
              ? "border-[#00f0ff] bg-[#00f0ff] text-black shadow-[2px_2px_0px_#ff0055]"
              : "border-white/10 bg-black/40 text-slate-300 hover:border-white/30"
          }`}
        >
          All ({characters.length})
        </button>
        {allUniverses.map((uni) => {
          const isSelected = currentUniverse === uni;
          return (
            <button
              key={uni}
              onClick={() => updateParams({ universe: uni })}
              className={`border px-3 py-1 font-mono text-xs font-bold transition-all ${
                isSelected
                  ? "border-[#ff0055] bg-[#ff0055] text-white shadow-[2px_2px_0px_#00f0ff]"
                  : "border-white/10 bg-black/40 text-slate-300 hover:border-white/30"
              }`}
            >
              {uni}
            </button>
          );
        })}
      </div>

      {/* Characters Count & Status Line */}
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-slate-400">
        <div>
          Showing{" "}
          <span className="font-bold text-[#00f0ff]">
            {filteredCharacters.length}
          </span>{" "}
          of {characters.length} Spider-People
        </div>
        <div className="hidden sm:block text-slate-500">
          URL Synced &bull; Persistent State
        </div>
      </div>

      {/* Character Card Grid */}
      {filteredCharacters.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredCharacters.map((char, index) => (
              <CharacterCard
                key={char.id}
                character={char}
                priority={index < 4}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="my-16 flex flex-col items-center justify-center border-2 border-dashed border-white/20 p-12 text-center halftone-bg">
          <ShieldAlert className="h-12 w-12 text-[#ff0055] mb-4" />
          <h3 className="text-2xl font-black uppercase text-white">
            NO ANOMALIES FOUND IN THIS TIMELINE
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            No Spider-People match your current search criteria ({currentUniverse !== "all" ? `Universe: ${currentUniverse}, ` : ""}{currentQuery ? `Query: "${currentQuery}"` : ""}).
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-6 inline-flex items-center gap-2 border-2 border-black bg-[#ffe600] px-5 py-2.5 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0px_#ff0055] hover:scale-105 transition-transform"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Multiverse Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

function CharacterGallerySkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-12 w-64 bg-white/10 animate-pulse mb-8" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-96 border-2 border-white/10 bg-[#0c0d16] animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function CharactersPage() {
  return (
    <Suspense fallback={<CharacterGallerySkeleton />}>
      <CharacterGallery />
    </Suspense>
  );
}
