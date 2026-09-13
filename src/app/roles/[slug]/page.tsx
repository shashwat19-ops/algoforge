"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ROLES } from "@/data/roles";
import { PROBLEMS } from "@/data/problems";
import { useUser } from "@/context/UserContext";
import {
  Briefcase,
  ChevronLeft,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Check,
  TrendingUp
} from "lucide-react";

export default function RoleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const role = ROLES.find((r) => r.slug === resolvedParams.slug);

  if (!role) {
    notFound();
  }

  const { solvedProblems, isBookmarked, toggleBookmark } = useUser();

  // Find matching problems from recommended IDs
  const roleProblems = PROBLEMS.filter((p) =>
    role.recommendedProblemIds.includes(p.id)
  );

  const solvedCount = roleProblems.filter((p) =>
    solvedProblems.has(p.id)
  ).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/roles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Role Tracks</span>
          </Link>
        </div>

        {/* Role Header Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Engineering Track</span>
              </div>
              <h1 className="text-3xl font-black text-white">
                {role.title} DSA Roadmap
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                {role.description}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between min-w-[220px]">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Progress</span>
                <span className="font-bold text-emerald-400">
                  {roleProblems.length > 0
                    ? Math.round((solvedCount / roleProblems.length) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {solvedCount} / {roleProblems.length}
                <span className="text-xs font-normal text-slate-400 ml-1.5">Solved</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      roleProblems.length > 0
                        ? (solvedCount / roleProblems.length) * 100
                        : 0
                    }%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/40">
              <div className="text-slate-400">Market Compensation</div>
              <div className="font-bold text-emerald-400 text-sm mt-0.5">
                {role.salaryRange}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40">
              <div className="text-slate-400">DSA Weightage</div>
              <div className="font-bold text-blue-400 text-sm mt-0.5">
                {role.interviewBreakdown.dsa}% of total score
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40">
              <div className="text-slate-400">System Design Weight</div>
              <div className="font-bold text-purple-400 text-sm mt-0.5">
                {role.interviewBreakdown.systemDesign}%
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/40">
              <div className="text-slate-400">Domain Assessment</div>
              <div className="font-bold text-amber-400 text-sm mt-0.5">
                {role.interviewBreakdown.domainKnowledge}%
              </div>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {roleProblems.length} High-Yield Core Problems
            </div>
            <span className="text-xs text-slate-500">
              Curated for {role.title} interviews
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {roleProblems.map((problem, index) => {
              const isSolved = solvedProblems.has(problem.id);
              const bookmarked = isBookmarked(problem.id);

              return (
                <div
                  key={problem.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-6 hover:bg-slate-800/40 transition-colors gap-3"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-5 flex justify-center">
                      {isSolved ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleBookmark(problem.id)}
                      className="text-slate-500 hover:text-blue-400 transition-colors"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          bookmarked
                            ? "fill-blue-500 text-blue-500"
                            : "text-slate-600 hover:text-slate-400"
                        }`}
                      />
                    </button>

                    <div className="flex-1">
                      <Link
                        href={`/problems/${problem.id}`}
                        className="font-bold text-sm text-slate-200 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                      >
                        <span>{problem.title}</span>
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

                    <Link
                      href={`/problems/${problem.id}`}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-600/15 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 transition-all"
                    >
                      <span>Solve</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
