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
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/study-plans"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a0a0a0] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Study Plans</span>
          </Link>
        </div>

        {/* Plan Header Card */}
        <div className="p-6 rounded-2xl bg-[#282828] border border-[#383838] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFA116]/20 border border-[#FFA116]/30 text-[#FFA116] text-xs font-bold">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{plan.badge}</span>
              </div>
              <h1 className="text-2xl font-black text-white">
                {plan.title}
              </h1>
              <p className="text-xs text-[#a0a0a0] max-w-2xl leading-relaxed">
                {plan.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] flex flex-col justify-between min-w-[200px]">
              <div className="flex items-center justify-between text-xs text-[#8a8a8a]">
                <span>Roadmap Progress</span>
                <span className="font-bold text-[#00b8a3]">
                  {totalProblems > 0
                    ? Math.round((solvedCount / totalProblems) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="text-xl font-black text-white mt-1">
                {solvedCount} / {totalProblems}
                <span className="text-xs font-normal text-[#8a8a8a] ml-1.5">Solved</span>
              </div>
              <div className="w-full bg-[#333333] rounded-full h-1.5 mt-2.5 overflow-hidden">
                <div
                  className="bg-[#00b8a3] h-full rounded-full transition-all duration-500"
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
        <div className="space-y-4">
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
                className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden"
              >
                {/* Chapter Title Bar */}
                <div className="p-3.5 bg-[#222222] border-b border-[#383838] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-md bg-[#333333] flex items-center justify-center font-bold text-xs text-[#FFA116]">
                      {chIdx + 1}
                    </span>
                    <h2 className="font-bold text-sm text-white">
                      {chapter.title}
                    </h2>
                  </div>
                  <div className="text-xs text-[#8a8a8a]">
                    {chSolvedCount} / {chapterProblems.length} Solved
                  </div>
                </div>

                {/* Chapter Problems Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#383838] text-[11px] font-semibold text-[#8a8a8a] uppercase bg-[#1e1e1e]">
                        <th className="py-2.5 px-4 w-12 text-center">Status</th>
                        <th className="py-2.5 px-4">Problem</th>
                        <th className="py-2.5 px-4 w-28">Difficulty</th>
                        <th className="py-2.5 px-4 w-32">Category</th>
                        <th className="py-2.5 px-4 w-28">Acceptance</th>
                        <th className="py-2.5 px-4 w-20 text-center">Bookmark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333333] text-xs">
                      {chapterProblems.map((problem) => {
                        const solved = solvedProblems.has(problem.id);
                        const bookmarked = isBookmarked(problem.id);

                        return (
                          <tr
                            key={problem.id}
                            className="hover:bg-[#333333] transition-colors group"
                          >
                            <td className="py-3 px-4 text-center">
                              {solved ? (
                                <CheckCircle2 className="h-4 w-4 text-[#00b8a3] mx-auto" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border border-[#4a4a4a] mx-auto" />
                              )}
                            </td>

                            <td className="py-3 px-4 font-medium text-white">
                              <Link
                                href={`/problems/${problem.id}`}
                                className="hover:text-[#FFA116] transition-colors flex items-center gap-2"
                              >
                                <span className="text-[#8a8a8a]">{problem.number}.</span>
                                <span>{problem.title}</span>
                              </Link>
                            </td>

                            <td className="py-3 px-4">
                              <span
                                className={`font-semibold ${
                                  problem.difficulty === "Easy"
                                    ? "text-[#00b8a3]"
                                    : problem.difficulty === "Medium"
                                    ? "text-[#ffc01e]"
                                    : "text-[#ff375f]"
                                }`}
                              >
                                {problem.difficulty}
                              </span>
                            </td>

                            <td className="py-3 px-4 text-[#a0a0a0]">
                              {problem.category}
                            </td>

                            <td className="py-3 px-4 font-mono text-[#a0a0a0]">
                              {problem.acceptance}
                            </td>

                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => toggleBookmark(problem.id)}
                                className="text-[#8a8a8a] hover:text-[#FFA116] transition-colors"
                                title="Bookmark"
                              >
                                <Bookmark
                                  className={`h-4 w-4 ${
                                    bookmarked ? "fill-[#FFA116] text-[#FFA116]" : ""
                                  }`}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
