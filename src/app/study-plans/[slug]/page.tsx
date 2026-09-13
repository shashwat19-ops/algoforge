"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { STUDY_PLANS } from "@/data/studyPlans";
import { PROBLEMS } from "@/data/problems";
import { useUser } from "@/context/UserContext";
import {
  BookOpen,
  ChevronLeft,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Layers,
  Code2,
  Check
} from "lucide-react";

export default function StudyPlanDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const plan = STUDY_PLANS.find((p) => p.slug === resolvedParams.slug);

  if (!plan) {
    notFound();
  }

  const { solvedProblems, isBookmarked, toggleBookmark } = useUser();

  const allProblemIds = plan.chapters.flatMap((c) => c.problemIds);
  const totalProblems = allProblemIds.length;
  const solvedCount = allProblemIds.filter((id) =>
    solvedProblems.has(id)
  ).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/study-plans"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Study Plans</span>
          </Link>
        </div>

        {/* Plan Header Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{plan.badge}</span>
              </div>
              <h1 className="text-3xl font-black text-white">
                {plan.title}
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                {plan.description}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between min-w-[220px]">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Roadmap Progress</span>
                <span className="font-bold text-emerald-400">
                  {totalProblems > 0
                    ? Math.round((solvedCount / totalProblems) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {solvedCount} / {totalProblems}
                <span className="text-xs font-normal text-slate-400 ml-1.5">Solved</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      totalProblems > 0
                        ? (solvedCount / totalProblems) * 100
                        : 0
                    }%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Accordion / List */}
        <div className="space-y-6">
          {plan.chapters.map((chapter, chIdx) => {
            const chapterProblems = PROBLEMS.filter((p) =>
              chapter.problemIds.includes(p.id)
            );
            const chSolvedCount = chapterProblems.filter((p) =>
              solvedProblems.has(p.id)
            ).length;

            return (
              <div
                key={chIdx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl"
              >
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                      {chIdx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-white">
                        {chapter.title}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {chapter.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {chSolvedCount} / {chapter.problemIds.length} Solved
                  </span>
                </div>

                <div className="divide-y divide-slate-800/60">
                  {chapterProblems.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">
                      Problems being mapped for this chapter.
                    </div>
                  ) : (
                    chapterProblems.map((problem, pIdx) => {
                      const isProblemSolved = solvedProblems.has(problem.id);
                      const isProblemBookmarked = isBookmarked(problem.id);

                      return (
                        <div
                          key={problem.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 px-6 hover:bg-slate-800/40 transition-colors gap-3"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-5 flex justify-center">
                              {isProblemSolved ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <span className="text-xs text-slate-500 font-mono">
                                  {pIdx + 1}
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => toggleBookmark(problem.id)}
                              className="text-slate-500 hover:text-blue-400 transition-colors"
                            >
                              <Bookmark
                                className={`h-4 w-4 ${
                                  isProblemBookmarked
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
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}
