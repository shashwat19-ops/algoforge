"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROBLEMS } from "@/data/problems";
import { COMPANIES } from "@/data/companies";
import { ROLES } from "@/data/roles";
import { STUDY_PLANS } from "@/data/studyPlans";
import { useUser } from "@/context/UserContext";
import {
  Code2,
  Sparkles,
  Zap,
  Building2,
  Briefcase,
  BookOpen,
  Eye,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Flame,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Search,
  Play
} from "lucide-react";

export default function HomePage() {
  const { solvedProblems, streak } = useUser();

  const easyCount = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const mediumCount = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hardCount = PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-border/50">
          {/* Glowing Ambient Backgrounds */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <span>100% Free LeetCode Pro Alternative • Zero Server Cost</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Master DSA & Ace Top <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300">
                  Tech Interviews for Free
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Unlimited access to curated DSA question banks, company-wise tagged problems, role tracks, mock AI interviews, and interactive algorithm visualizers — with zero paywalls.
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/problems"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                >
                  <Code2 className="h-4 w-4" />
                  <span>Start Solving Problems</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/visualizer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition-all hover:scale-[1.02]"
                >
                  <Eye className="h-4 w-4 text-cyan-400" />
                  <span>Algorithm Visualizer</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto text-left">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                  <div className="text-xs text-slate-400 font-medium">Curated Problems</div>
                  <div className="text-2xl font-black text-white mt-1">{PROBLEMS.length}+</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">JS & Python Support</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                  <div className="text-xs text-slate-400 font-medium">Unlocked Companies</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">{COMPANIES.length} Top Tech</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Google, Meta, Amazon...</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                  <div className="text-xs text-slate-400 font-medium">Your Progress</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">{solvedProblems.size} Solved</div>
                  <div className="text-[11px] text-amber-400 mt-0.5">{streak.current} Day Streak 🔥</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                  <div className="text-xs text-slate-400 font-medium">Execution Engine</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">In-Browser</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Zero Lag, Instant Tests</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STUDY ROADMAPS SECTION */}
        <section className="py-16 border-b border-border/50 bg-[#0c101a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Curated Study Paths</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Industry-Standard Roadmaps
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Follow proven study collections designed to take you from fundamentals to FAANG-ready.
                </p>
              </div>
              <Link
                href="/study-plans"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                View all roadmaps <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STUDY_PLANS.map((plan) => (
                <Link
                  key={plan.slug}
                  href={`/study-plans/${plan.slug}`}
                  className="group relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {plan.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {plan.estimatedWeeks} wks
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {plan.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>By {plan.author}</span>
                    <span className="font-semibold text-slate-200">
                      {plan.chapters.reduce((acc, c) => acc + c.problemIds.length, 0)} Problems
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TOP COMPANIES QUESTION BANK */}
        <section className="py-16 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>LeetCode Premium Unlocked</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Company-Wise Question Banks
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Target questions frequently asked in Google, Meta, Amazon, Apple, and Fintech interviews.
                </p>
              </div>
              <Link
                href="/companies"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                Explore all companies <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMPANIES.map((company) => (
                <Link
                  key={company.slug}
                  href={`/companies/${company.slug}`}
                  className="group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${company.color} flex items-center justify-center font-black text-white text-sm shadow-md`}
                    >
                      {company.logo}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                        {company.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {company.totalQuestions} Questions
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ROLE TRACKS */}
        <section className="py-16 border-b border-border/50 bg-[#0c101a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>Targeted Preparation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Role-Specific DSA Tracks
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Optimize your prep time with algorithms strictly relevant to your target engineering domain.
                </p>
              </div>
              <Link
                href="/roles"
                className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                View all role paths <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ROLES.slice(0, 3).map((role) => (
                <Link
                  key={role.slug}
                  href={`/roles/${role.slug}`}
                  className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400">
                        {role.salaryRange}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        DSA Weight: {role.interviewBreakdown.dsa}%
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                      {role.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {role.keySkills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
                    <span>{role.recommendedProblemIds.length} Core Problems</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ALGORITHM VISUALIZER SHOWCASE BANNER */}
        <section className="py-16 border-b border-border/50 bg-gradient-to-b from-[#0a0d14] via-[#0d1322] to-[#0a0d14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />

              <div className="max-w-xl space-y-5 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Interactive Algorithm Studio</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  See Algorithms in Action with Live Step-by-Step Visualization
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Understand how Bubble Sort, Quick Sort, Merge Sort, Binary Search, Dijkstra 2D Grid Pathfinding, and Tree Traversals execute in real-time. Control speed, step through operations, and inspect state variables.
                </p>

                <div className="pt-2">
                  <Link
                    href="/visualizer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                  >
                    <Play className="h-4 w-4 fill-slate-950" />
                    <span>Launch Visualizer</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROBLEM LIST */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Featured Core Problems
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  High-yield interview questions with full test runners, hints, and editorials.
                </p>
              </div>
              <Link
                href="/problems"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                View full library ({PROBLEMS.length}) <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {PROBLEMS.slice(0, 6).map((problem, index) => {
                const isSolved = solvedProblems.has(problem.id);
                return (
                  <Link
                    key={problem.id}
                    href={`/problems/${problem.id}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-6 text-center text-xs font-bold text-slate-500">
                        {isSolved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">
                          {problem.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span>{problem.category}</span>
                          {problem.tags && problem.tags.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{problem.tags[0]}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
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
                      <span className="hidden sm:inline text-xs text-slate-500">
                        {problem.acceptance}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
