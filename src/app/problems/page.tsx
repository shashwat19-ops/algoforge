"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROBLEMS, Problem } from "@/data/problems";
import { COMPANIES } from "@/data/companies";
import { useUser } from "@/context/UserContext";
import {
  Search,
  CheckCircle2,
  Bookmark,
  Filter,
  Code2,
  Sparkles,
  ArrowUpDown,
  Building2,
  Flame,
  Check,
  ChevronRight
} from "lucide-react";

function ProblemsCatalogContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  const initialCompany = searchParams.get("company") || "all";

  const { solvedProblems, isBookmarked, toggleBookmark } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialFilter === "bookmarked" ? "Bookmarked" : "All"
  );
  const [selectedCompany, setSelectedCompany] = useState<string>(
    initialCompany !== "all" ? initialCompany : "All"
  );

  // Extract all categories
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    PROBLEMS.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((problem) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesCategory = problem.category.toLowerCase().includes(query);
        const matchesTag = problem.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesCompany = problem.companies?.some((c) =>
          c.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesCategory && !matchesTag && !matchesCompany) {
          return false;
        }
      }

      // Difficulty
      if (selectedDifficulty !== "All" && problem.difficulty !== selectedDifficulty) {
        return false;
      }

      // Category
      if (selectedCategory !== "All" && problem.category !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus === "Solved" && !solvedProblems.has(problem.id)) {
        return false;
      }
      if (selectedStatus === "Unsolved" && solvedProblems.has(problem.id)) {
        return false;
      }
      if (selectedStatus === "Bookmarked" && !isBookmarked(problem.id)) {
        return false;
      }

      // Company
      if (selectedCompany !== "All") {
        const compLower = selectedCompany.toLowerCase();
        const hasCompany = problem.companies?.some((c) =>
          c.toLowerCase().includes(compLower)
        );
        if (!hasCompany) return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedDifficulty,
    selectedCategory,
    selectedStatus,
    selectedCompany,
    solvedProblems,
    isBookmarked
  ]);

  // Solved Stats calculation
  const easyTotal = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const easySolved = PROBLEMS.filter(
    (p) => p.difficulty === "Easy" && solvedProblems.has(p.id)
  ).length;

  const medTotal = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const medSolved = PROBLEMS.filter(
    (p) => p.difficulty === "Medium" && solvedProblems.has(p.id)
  ).length;

  const hardTotal = PROBLEMS.filter((p) => p.difficulty === "Hard").length;
  const hardSolved = PROBLEMS.filter(
    (p) => p.difficulty === "Hard" && solvedProblems.has(p.id)
  ).length;

  return (
    <div className="space-y-8">
      {/* TOP STATS & PROGRESS HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Overall Progress</div>
            <div className="text-2xl font-black text-white mt-1">
              {solvedProblems.size}{" "}
              <span className="text-sm font-normal text-slate-400">/ {PROBLEMS.length} Solved</span>
            </div>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(solvedProblems.size / PROBLEMS.length) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase">Easy</span>
            <span className="text-xs text-slate-400">
              {easySolved} / {easyTotal}
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0}%
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%`
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase">Medium</span>
            <span className="text-xs text-slate-400">
              {medSolved} / {medTotal}
            </span>
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1">
            {medTotal > 0 ? Math.round((medSolved / medTotal) * 100) : 0}%
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${medTotal > 0 ? (medSolved / medTotal) * 100 : 0}%`
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 uppercase">Hard</span>
            <span className="text-xs text-slate-400">
              {hardSolved} / {hardTotal}
            </span>
          </div>
          <div className="text-2xl font-black text-red-400 mt-1">
            {hardTotal > 0 ? Math.round((hardSolved / hardTotal) * 100) : 0}%
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by problem name, category, pattern, or company..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Quick company filter */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Companies (Premium Free)</option>
            {COMPANIES.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1">Difficulty:</span>
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedDifficulty === diff
                    ? diff === "Easy"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : diff === "Medium"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : diff === "Hard"
                      ? "bg-red-500/20 text-red-300 border border-red-500/40"
                      : "bg-blue-600/20 text-blue-300 border border-blue-500/40"
                    : "bg-slate-800/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1">Status:</span>
            {["All", "Solved", "Unsolved", "Bookmarked"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedStatus === status
                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/40"
                    : "bg-slate-800/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEMS TABLE */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Showing {filteredProblems.length} of {PROBLEMS.length} Problems
          </div>
          {selectedCompany !== "All" && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Filtered by {selectedCompany}
            </span>
          )}
        </div>

        <div className="divide-y divide-slate-800/60">
          {filteredProblems.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Code2 className="h-10 w-10 text-slate-600 mx-auto" />
              <p className="text-sm">No problems match your selected filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDifficulty("All");
                  setSelectedCategory("All");
                  setSelectedStatus("All");
                  setSelectedCompany("All");
                }}
                className="text-xs font-bold text-blue-400 hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredProblems.map((problem, index) => {
              const isSolved = solvedProblems.has(problem.id);
              const isProblemBookmarked = isBookmarked(problem.id);

              return (
                <div
                  key={problem.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-6 hover:bg-slate-800/40 transition-colors gap-3"
                >
                  {/* Left: Status, Index, Title, Tags */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Solved Status Indicator */}
                    <div className="w-5 flex justify-center">
                      {isSolved ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Bookmark button */}
                    <button
                      onClick={() => toggleBookmark(problem.id)}
                      className="text-slate-500 hover:text-blue-400 transition-colors"
                      title={isProblemBookmarked ? "Remove Bookmark" : "Bookmark Problem"}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          isProblemBookmarked
                            ? "fill-blue-500 text-blue-500"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Title & Category */}
                    <div className="flex-1">
                      <Link
                        href={`/problems/${problem.id}`}
                        className="font-bold text-sm text-slate-200 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                      >
                        <span>{problem.title}</span>
                        {problem.companies && problem.companies.length > 0 && (
                          <span className="hidden lg:inline text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                            {problem.companies[0]}
                          </span>
                        )}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-slate-300 font-medium">
                          {problem.category}
                        </span>
                        {problem.tags && problem.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{problem.tags[0]}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Difficulty, Acceptance, Solve Link */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 pl-9 sm:pl-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        problem.difficulty === "Easy"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : problem.difficulty === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {problem.difficulty}
                    </span>

                    <span className="text-xs text-slate-400 font-mono w-14 text-right hidden sm:inline">
                      {problem.acceptance}
                    </span>

                    <Link
                      href={`/problems/${problem.id}`}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition-all"
                    >
                      <span>Solve</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProblemsCatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading catalog...</div>}>
          <ProblemsCatalogContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
