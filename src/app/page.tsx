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
  Crown,
  Terminal,
  Cpu,
  Layers,
  Search,
  Play,
  Bookmark,
  Check
} from "lucide-react";

export default function HomePage() {
  const { solvedProblems, streak, bookmarkedProblems } = useUser();

  const easyCount = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const mediumCount = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hardCount = PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#383838] bg-[#1a1a1a]">
          {/* Subtle Ambient Background Accent */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFA116]/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFA116]/10 border border-[#FFA116]/30 text-[#FFA116] text-xs font-semibold shadow-sm">
                <Crown className="h-3.5 w-3.5 text-[#FFA116]" />
                <span>100% Free LeetCode Pro Alternative • All Features Unlocked</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                Master DSA & Ace Top <br />
                <span className="text-[#FFA116]">
                  Tech Interviews for Free
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed max-w-2xl mx-auto">
                Unlimited access to {PROBLEMS.length}+ curated DSA question banks, company-wise tagged archives, role tracks, mock AI interviews, and interactive algorithm visualizers — completely free with zero paywalls.
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/problems"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFA116] hover:bg-[#e08f14] text-[#1a1a1a] font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                >
                  <Code2 className="h-4 w-4 stroke-[2.5]" />
                  <span>Start Solving Problems</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/companies"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#282828] hover:bg-[#333333] border border-[#383838] text-white font-bold text-xs transition-all hover:scale-[1.02]"
                >
                  <Building2 className="h-4 w-4 text-[#FFA116]" />
                  <span>Company Archives</span>
                </Link>

                <Link
                  href="/visualizer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#282828] hover:bg-[#333333] border border-[#383838] text-white font-bold text-xs transition-all hover:scale-[1.02]"
                >
                  <Eye className="h-4 w-4 text-[#00b8a3]" />
                  <span>Visualizer</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-4xl mx-auto text-left">
                <div className="p-4 rounded-xl bg-[#282828] border border-[#383838]">
                  <div className="text-[11px] text-[#a0a0a0] font-medium">Curated Problems</div>
                  <div className="text-2xl font-black text-white mt-1">{PROBLEMS.length}+</div>
                  <div className="text-[11px] text-[#00b8a3] mt-0.5">JS & Python Support</div>
                </div>

                <div className="p-4 rounded-xl bg-[#282828] border border-[#383838]">
                  <div className="text-[11px] text-[#a0a0a0] font-medium">Company Question Banks</div>
                  <div className="text-2xl font-black text-[#FFA116] mt-1">{COMPANIES.length} Top Tech</div>
                  <div className="text-[11px] text-[#a0a0a0] mt-0.5">Google, Meta, Amazon...</div>
                </div>

                <div className="p-4 rounded-xl bg-[#282828] border border-[#383838]">
                  <div className="text-[11px] text-[#a0a0a0] font-medium">Your Progress</div>
                  <div className="text-2xl font-black text-[#00b8a3] mt-1">{solvedProblems.size} Solved</div>
                  <div className="text-[11px] text-[#FFA116] mt-0.5">{streak.current} Day Streak 🔥</div>
                </div>

                <div className="p-4 rounded-xl bg-[#282828] border border-[#383838]">
                  <div className="text-[11px] text-[#a0a0a0] font-medium">Execution Engine</div>
                  <div className="text-2xl font-black text-[#eff1f6] mt-1">In-Browser</div>
                  <div className="text-[11px] text-[#a0a0a0] mt-0.5">Instant Sandboxed Tests</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STUDY ROADMAPS SECTION */}
        <section className="py-14 border-b border-[#383838] bg-[#222222]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFA116] mb-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Curated Study Paths</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Industry-Standard Roadmaps
                </h2>
                <p className="text-xs text-[#a0a0a0] mt-1">
                  Follow proven study collections designed to take you from fundamentals to FAANG-ready.
                </p>
              </div>
              <Link
                href="/study-plans"
                className="text-xs font-bold text-[#FFA116] hover:text-[#ffb800] flex items-center gap-1"
              >
                View all roadmaps <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STUDY_PLANS.map((plan) => (
                <Link
                  key={plan.slug}
                  href={`/study-plans/${plan.slug}`}
                  className="group p-5 rounded-xl bg-[#282828] border border-[#383838] hover:border-[#FFA116]/50 hover:bg-[#303030] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/30">
                        {plan.badge}
                      </span>
                      <span className="text-xs text-[#8a8a8a] font-medium">
                        {plan.estimatedWeeks} wks
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-[#FFA116] transition-colors">
                      {plan.title}
                    </h3>

                    <p className="text-xs text-[#a0a0a0] line-clamp-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#383838] flex items-center justify-between text-xs text-[#8a8a8a]">
                    <span>By {plan.author}</span>
                    <span className="font-semibold text-white">
                      {plan.chapters.reduce((acc, c) => acc + c.problemIds.length, 0)} Problems
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TOP COMPANIES QUESTION BANK */}
        <section className="py-14 border-b border-[#383838] bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFA116] mb-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>LeetCode Premium Unlocked</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Company-Wise Question Banks
                </h2>
                <p className="text-xs text-[#a0a0a0] mt-1">
                  Target questions frequently asked in Google, Meta, Amazon, Apple, Microsoft, and Fintech interviews.
                </p>
              </div>
              <Link
                href="/companies"
                className="text-xs font-bold text-[#FFA116] hover:text-[#ffb800] flex items-center gap-1"
              >
                Explore all companies <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {COMPANIES.map((company) => (
                <Link
                  key={company.slug}
                  href={`/companies/${company.slug}`}
                  className="group p-3.5 rounded-xl bg-[#282828] border border-[#383838] hover:border-[#4a4a4a] hover:bg-[#303030] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg bg-gradient-to-tr ${company.color} flex items-center justify-center font-black text-white text-xs shadow-sm`}
                    >
                      {company.logo}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white group-hover:text-[#FFA116] transition-colors">
                        {company.name}
                      </div>
                      <div className="text-[11px] text-[#8a8a8a]">
                        {company.totalQuestions} Questions
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#555555] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ROLE TRACKS */}
        <section className="py-14 border-b border-[#383838] bg-[#222222]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00b8a3] mb-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>Targeted Preparation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Role-Specific DSA Tracks
                </h2>
                <p className="text-xs text-[#a0a0a0] mt-1">
                  Tailored algorithmic patterns prioritized by role: Frontend, Backend, Systems, AI/ML, and Quant.
                </p>
              </div>
              <Link
                href="/roles"
                className="text-xs font-bold text-[#00b8a3] hover:text-[#2cbb5d] flex items-center gap-1"
              >
                View all role tracks <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROLES.map((role) => (
                <Link
                  key={role.slug}
                  href={`/roles/${role.slug}`}
                  className="group p-5 rounded-xl bg-[#282828] border border-[#383838] hover:border-[#00b8a3]/50 hover:bg-[#303030] transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{role.icon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00b8a3]/20 text-[#00b8a3] border border-[#00b8a3]/30">
                      DSA Focus
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#00b8a3] transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-[#a0a0a0] mt-1 line-clamp-2 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#383838] flex items-center justify-between text-xs text-[#8a8a8a]">
                    <span>Avg Salary: {role.salaryRange}</span>
                    <span className="font-semibold text-white">
                      {role.keySkills.length} Focus Areas
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-14 border-b border-[#383838] bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFA116]">
                <Zap className="h-3.5 w-3.5" />
                <span>Zero Paywall Platform</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Everything You Need to Get Hired
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#282828] border border-[#383838] space-y-2.5">
                <div className="h-9 w-9 rounded-lg bg-[#FFA116]/20 text-[#FFA116] flex items-center justify-center">
                  <Terminal className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white">In-Browser Code Sandbox</h3>
                <p className="text-xs text-[#a0a0a0] leading-relaxed">
                  Real-time syntax validation, instant test executions, and console logging with Monaco Editor support.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#282828] border border-[#383838] space-y-2.5">
                <div className="h-9 w-9 rounded-lg bg-[#00b8a3]/20 text-[#00b8a3] flex items-center justify-center">
                  <Eye className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Interactive Visualizers</h3>
                <p className="text-xs text-[#a0a0a0] leading-relaxed">
                  Step-by-step graphical animations for Sorting, Trees, Two Pointers, and Dynamic Programming algorithms.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#282828] border border-[#383838] space-y-2.5">
                <div className="h-9 w-9 rounded-lg bg-[#a855f7]/20 text-[#a855f7] flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Socratic AI Mock Tutor</h3>
                <p className="text-xs text-[#a0a0a0] leading-relaxed">
                  45-minute timed mock interviews with progressive hints and time/space complexity analysis without spoilers.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
