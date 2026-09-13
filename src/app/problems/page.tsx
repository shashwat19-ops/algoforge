"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROBLEMS, Problem } from "@/data/problems";
import { COMPANIES } from "@/data/companies";
import { STUDY_PLANS } from "@/data/studyPlans";
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
  ChevronRight,
  Shuffle,
  FileText,
  Calendar,
  Lock,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Crown
} from "lucide-react";

// Topic categories with pre-calculated counts
const TOPIC_TAGS = [
  { name: "All Topics", key: "All" },
  { name: "Array", key: "Array" },
  { name: "Two Pointers", key: "Two Pointers" },
  { name: "Sliding Window", key: "Sliding Window" },
  { name: "Stack", key: "Stack" },
  { name: "Binary Search", key: "Binary Search" },
  { name: "Linked List", key: "Linked List" },
  { name: "Tree", key: "Trees" },
  { name: "Heap / Priority Queue", key: "Heap" },
  { name: "Backtracking", key: "Backtracking" },
  { name: "Graph", key: "Graphs" },
  { name: "Dynamic Programming", key: "Dynamic Programming" },
  { name: "Greedy", key: "Greedy" },
  { name: "Math", key: "Math" },
  { name: "Bit Manipulation", key: "Bit Manipulation" },
  { name: "Trie", key: "Trie" }
];

function ProblemsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  const initialCompany = searchParams.get("company") || "all";

  const { solvedProblems, isBookmarked, toggleBookmark, streak } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialFilter === "bookmarked" ? "Bookmarked" : "All"
  );
  const [selectedCompany, setSelectedCompany] = useState<string>(
    initialCompany !== "all" ? initialCompany : "All"
  );
  const [showAllTags, setShowAllTags] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((problem) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesNumber = problem.number.toString().includes(query);
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesCategory = problem.category.toLowerCase().includes(query);
        const matchesTag = problem.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesCompany = problem.companies?.some((c) =>
          c.toLowerCase().includes(query)
        );
        if (!matchesNumber && !matchesTitle && !matchesCategory && !matchesTag && !matchesCompany) {
          return false;
        }
      }

      // Difficulty
      if (selectedDifficulty !== "All" && problem.difficulty !== selectedDifficulty) {
        return false;
      }

      // Topic tag filter
      if (selectedTopic !== "All") {
        const topicLower = selectedTopic.toLowerCase();
        const matchesCat = problem.category.toLowerCase().includes(topicLower);
        const matchesTag = problem.tags?.some((t) => t.toLowerCase().includes(topicLower));
        if (!matchesCat && !matchesTag) return false;
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
    selectedTopic,
    selectedStatus,
    selectedCompany,
    solvedProblems,
    isBookmarked
  ]);

  // Paginated problems
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, currentPage]);

  const totalPages = Math.ceil(filteredProblems.length / pageSize) || 1;

  // Pick a random unsolved problem
  const handlePickRandom = () => {
    const unsolved = PROBLEMS.filter((p) => !solvedProblems.has(p.id));
    const pool = unsolved.length > 0 ? unsolved : PROBLEMS;
    const randomProblem = pool[Math.floor(Math.random() * pool.length)];
    if (randomProblem) {
      router.push(`/problems/${randomProblem.id}`);
    }
  };

  // Solved Stats calculation
  const totalProblems = PROBLEMS.length;
  const totalSolved = solvedProblems.size;

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

  // Daily Challenge Problem (e.g. 3Sum or LRU Cache)
  const dailyProblem = PROBLEMS.find((p) => p.number === 15) || PROBLEMS[0];

  return (
    <div className="space-y-6">

      {/* FEATURED STUDY ROADMAPS CAROUSEL / BANNERS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a0a0a0]">
            <Award className="h-4 w-4 text-[#FFA116]" />
            <span>Featured Interview Study Plans</span>
          </div>
          <Link
            href="/study-plans"
            className="text-xs text-[#FFA116] hover:underline flex items-center gap-1 font-medium"
          >
            <span>View All Roadmaps</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STUDY_PLANS.slice(0, 4).map((plan) => {
            const allIds = plan.chapters.flatMap((ch) => ch.problemIds);
            const planSolved = allIds.filter((id) => solvedProblems.has(id)).length;
            const progress = Math.round((planSolved / (allIds.length || 1)) * 100);

            return (
              <Link
                key={plan.slug}
                href={`/study-plans/${plan.slug}`}
                className="p-4 rounded-xl bg-[#282828] hover:bg-[#333333] border border-[#383838] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/30">
                      {plan.badge || "FEATURED"}
                    </span>
                    <span className="text-[11px] font-mono text-[#a0a0a0]">
                      {plan.totalProblems} Qs
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white mt-2 group-hover:text-[#FFA116] transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-[11px] text-[#8a8a8a] line-clamp-1 mt-0.5">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#383838]">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[#a0a0a0]">Progress</span>
                    <span className="font-mono text-white font-semibold">
                      {planSolved} / {plan.totalProblems} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#FFA116] h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* TOPIC TAG FILTER PILLS BAR */}
      <div className="p-3.5 rounded-xl bg-[#282828] border border-[#383838] space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-[#a0a0a0] uppercase tracking-wider">
            Filter By Topic
          </div>
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="text-xs text-[#FFA116] hover:underline flex items-center gap-1 font-medium"
          >
            <span>{showAllTags ? "Show Less" : "Expand All"}</span>
            {showAllTags ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(showAllTags ? TOPIC_TAGS : TOPIC_TAGS.slice(0, 8)).map((tag) => {
            const isSelected = selectedTopic === tag.key;
            // Count matching problems
            const count =
              tag.key === "All"
                ? PROBLEMS.length
                : PROBLEMS.filter(
                    (p) =>
                      p.category.toLowerCase().includes(tag.key.toLowerCase()) ||
                      p.tags?.some((t) => t.toLowerCase().includes(tag.key.toLowerCase()))
                  ).length;

            return (
              <button
                key={tag.key}
                onClick={() => {
                  setSelectedTopic(tag.key);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#FFA116] text-[#1a1a1a] font-bold shadow-sm"
                    : "bg-[#333333] hover:bg-[#3e3e3e] text-[#eff1f6]"
                }`}
              >
                <span>{tag.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? "bg-[#1a1a1a]/20 text-[#1a1a1a]" : "bg-[#1a1a1a] text-[#a0a0a0]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN EXPLORER: (PROBLEMS LIST 70% | SIDEBAR WIDGETS 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: PROBLEMS CONTROLS & TABLE (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">

          {/* CONTROL TOOLBAR (Search, Dropdown Filters, Pick One) */}
          <div className="p-3.5 rounded-xl bg-[#282828] border border-[#383838] flex flex-wrap items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search questions..."
                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#383838] text-xs text-[#eff1f6] placeholder-[#8a8a8a] focus:outline-none focus:border-[#FFA116]"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Difficulty Dropdown */}
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#383838] text-xs font-medium text-[#eff1f6] focus:outline-none focus:border-[#FFA116]"
              >
                <option value="All">Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {/* Status Dropdown */}
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#383838] text-xs font-medium text-[#eff1f6] focus:outline-none focus:border-[#FFA116]"
              >
                <option value="All">Status</option>
                <option value="Solved">Solved</option>
                <option value="Unsolved">Unsolved</option>
                <option value="Bookmarked">Bookmarked</option>
              </select>

              {/* Company Dropdown */}
              <select
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#383838] text-xs font-medium text-[#eff1f6] focus:outline-none focus:border-[#FFA116]"
              >
                <option value="All">All Companies (Pro Free)</option>
                {COMPANIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Pick Random Button */}
              <button
                onClick={handlePickRandom}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#333333] hover:bg-[#3e3e3e] text-[#FFA116] border border-[#FFA116]/30 text-xs font-bold transition-all"
                title="Pick a random problem to solve"
              >
                <Shuffle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Pick One</span>
              </button>
            </div>
          </div>

          {/* PROBLEMS TABLE (1:1 LeetCode Design) */}
          <div className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-4 py-3 border-b border-[#383838] text-xs font-semibold text-[#8a8a8a] select-none bg-[#242424]">
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-5 sm:col-span-6">Title</div>
              <div className="col-span-2 text-right hidden sm:block">Acceptance</div>
              <div className="col-span-3 sm:col-span-2 text-center">Difficulty</div>
              <div className="col-span-3 sm:col-span-1 text-right">Action</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#333333]">
              {paginatedProblems.length === 0 ? (
                <div className="py-16 text-center text-[#8a8a8a] space-y-3">
                  <Code2 className="h-10 w-10 text-[#555555] mx-auto" />
                  <p className="text-sm font-medium">No problems match your current filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDifficulty("All");
                      setSelectedTopic("All");
                      setSelectedStatus("All");
                      setSelectedCompany("All");
                      setCurrentPage(1);
                    }}
                    className="text-xs font-bold text-[#FFA116] hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                paginatedProblems.map((problem) => {
                  const isSolved = solvedProblems.has(problem.id);
                  const isProblemBookmarked = isBookmarked(problem.id);

                  return (
                    <div
                      key={problem.id}
                      className="grid grid-cols-12 items-center px-4 py-3 hover:bg-[#333333] transition-colors text-xs"
                    >
                      {/* Status Column */}
                      <div className="col-span-1 flex justify-center items-center">
                        {isSolved ? (
                          <CheckCircle2 className="h-4 w-4 text-[#00b8a3]" />
                        ) : (
                          <div className="h-3 w-3 rounded-full border border-[#4a4a4a]" />
                        )}
                      </div>

                      {/* Title Column */}
                      <div className="col-span-5 sm:col-span-6 flex items-center gap-2 pr-2">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="font-medium text-[#eff1f6] hover:text-[#FFA116] transition-colors truncate"
                        >
                          <span className="text-[#a0a0a0] mr-1.5 font-mono">{problem.number}.</span>
                          <span>{problem.title}</span>
                        </Link>

                        {/* Company Pill Badge */}
                        {problem.companies && problem.companies.length > 0 && (
                          <span className="hidden xl:inline-block text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#333333] text-[#a0a0a0] border border-[#404040]">
                            {problem.companies[0]}
                          </span>
                        )}
                      </div>

                      {/* Acceptance Column */}
                      <div className="col-span-2 text-right hidden sm:block font-mono text-[#a0a0a0]">
                        {problem.acceptance}
                      </div>

                      {/* Difficulty Column */}
                      <div className="col-span-3 sm:col-span-2 text-center">
                        <span
                          className={`font-semibold text-xs ${
                            problem.difficulty === "Easy"
                              ? "text-[#00b8a3]"
                              : problem.difficulty === "Medium"
                              ? "text-[#ffc01e]"
                              : "text-[#ff375f]"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>

                      {/* Action Column */}
                      <div className="col-span-3 sm:col-span-1 flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleBookmark(problem.id)}
                          className="text-[#666666] hover:text-[#FFA116] p-1 transition-colors"
                          title={isProblemBookmarked ? "Remove Bookmark" : "Bookmark Problem"}
                        >
                          <Bookmark
                            className={`h-3.5 w-3.5 ${
                              isProblemBookmarked ? "fill-[#FFA116] text-[#FFA116]" : ""
                            }`}
                          />
                        </button>

                        <Link
                          href={`/problems/${problem.id}`}
                          className="p-1 rounded text-[#a0a0a0] hover:text-[#FFA116] hover:bg-[#3e3e3e] transition-colors"
                          title="Solve Problem"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Table Footer with Pagination */}
            <div className="px-4 py-3 border-t border-[#383838] bg-[#242424] flex items-center justify-between text-xs text-[#8a8a8a]">
              <div>
                Showing {(currentPage - 1) * pageSize + 1} -{" "}
                {Math.min(currentPage * pageSize, filteredProblems.length)} of {filteredProblems.length}{" "}
                Problems
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1 rounded bg-[#333333] hover:bg-[#3e3e3e] disabled:opacity-40 text-[#eff1f6]"
                  >
                    Prev
                  </button>
                  <span className="px-2 font-mono text-white">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2.5 py-1 rounded bg-[#333333] hover:bg-[#3e3e3e] disabled:opacity-40 text-[#eff1f6]"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LEETCODE SIDEBAR WIDGETS (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">

          {/* WIDGET 1: SESSION / SOLVED PROGRESS RING (Donut Chart) */}
          <div className="p-5 rounded-xl bg-[#282828] border border-[#383838] space-y-4">
            <div className="flex items-center justify-between border-b border-[#383838] pb-3">
              <span className="text-xs font-bold text-[#eff1f6] uppercase tracking-wider">
                Session Progress
              </span>
              <span className="text-xs font-bold text-[#FFA116] bg-[#FFA116]/10 px-2 py-0.5 rounded border border-[#FFA116]/30">
                100% Free
              </span>
            </div>

            {/* Circular Progress & Breakdown */}
            <div className="flex items-center gap-5">
              {/* Circular SVG Ring */}
              <div className="relative h-24 w-24 shrink-0 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-[#383838]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress Circle */}
                  <path
                    className="text-[#FFA116]"
                    strokeDasharray={`${(totalSolved / totalProblems) * 100}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-white">{totalSolved}</span>
                  <span className="text-[9px] text-[#8a8a8a] -mt-1 font-mono">/{totalProblems}</span>
                </div>
              </div>

              {/* Solved breakdown bars */}
              <div className="flex-1 space-y-2.5 text-xs">
                {/* Easy Row */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#00b8a3] font-semibold">Easy</span>
                    <span className="font-mono text-[#a0a0a0]">
                      {easySolved}/{easyTotal}
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#00b8a3] h-1.5 rounded-full"
                      style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Medium Row */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#ffc01e] font-semibold">Medium</span>
                    <span className="font-mono text-[#a0a0a0]">
                      {medSolved}/{medTotal}
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#ffc01e] h-1.5 rounded-full"
                      style={{ width: `${medTotal > 0 ? (medSolved / medTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Hard Row */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#ff375f] font-semibold">Hard</span>
                    <span className="font-mono text-[#a0a0a0]">
                      {hardSolved}/{hardTotal}
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#ff375f] h-1.5 rounded-full"
                      style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WIDGET 2: DAILY CHALLENGE CARD */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#282828] to-[#242424] border border-[#383838] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFA116]">
                <Calendar className="h-4 w-4" />
                <span>Daily Challenge</span>
              </div>
              <span className="text-[10px] font-mono text-[#a0a0a0] bg-[#1a1a1a] px-2 py-0.5 rounded">
                Day {streak.current || 1} of 365
              </span>
            </div>

            <div>
              <Link
                href={`/problems/${dailyProblem.id}`}
                className="font-bold text-sm text-white hover:text-[#FFA116] transition-colors block"
              >
                {dailyProblem.number}. {dailyProblem.title}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-[11px] font-bold ${
                    dailyProblem.difficulty === "Easy"
                      ? "text-[#00b8a3]"
                      : dailyProblem.difficulty === "Medium"
                      ? "text-[#ffc01e]"
                      : "text-[#ff375f]"
                  }`}
                >
                  {dailyProblem.difficulty}
                </span>
                <span className="text-[10px] text-[#8a8a8a]">•</span>
                <span className="text-[11px] text-[#a0a0a0]">{dailyProblem.category}</span>
              </div>
            </div>

            <Link
              href={`/problems/${dailyProblem.id}`}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#FFA116] hover:bg-[#e08f14] text-[#1a1a1a] font-bold text-xs transition-colors shadow-sm"
            >
              <span>Solve Today&apos;s Problem</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* WIDGET 3: TRENDING COMPANIES (PRO UNLOCKED) */}
          <div className="p-4 rounded-xl bg-[#282828] border border-[#383838] space-y-3">
            <div className="flex items-center justify-between border-b border-[#383838] pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#eff1f6]">
                <Building2 className="h-3.5 w-3.5 text-[#FFA116]" />
                <span>Trending Companies</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#FFA116]/20 text-[#FFA116]">
                UNLOCKED
              </span>
            </div>

            <div className="space-y-1.5">
              {COMPANIES.slice(0, 6).map((c) => (
                <button
                  key={c.slug}
                  onClick={() => {
                    setSelectedCompany(c.name);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedCompany === c.name
                      ? "bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/40 font-bold"
                      : "text-[#a0a0a0] hover:text-white hover:bg-[#333333]"
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="text-[10px] font-mono text-[#8a8a8a]">
                    {c.totalQuestions} Qs
                  </span>
                </button>
              ))}
            </div>

            <Link
              href="/companies"
              className="text-[11px] text-[#FFA116] hover:underline block text-center pt-1 font-medium"
            >
              Explore All 8 Company Question Banks →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function ProblemsCatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense fallback={<div className="text-center py-12 text-[#8a8a8a]">Loading LeetCode Problem Explorer...</div>}>
          <ProblemsCatalogContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
