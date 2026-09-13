"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANIES } from "@/data/companies";
import { PROBLEMS } from "@/data/problems";
import { useUser } from "@/context/UserContext";
import {
  Building2,
  ChevronLeft,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Layers,
  Code2,
  Clock,
  Award
} from "lucide-react";

export default function CompanyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const company = COMPANIES.find((c) => c.slug === resolvedParams.slug);

  if (!company) {
    notFound();
  }

  const { solvedProblems, isBookmarked, toggleBookmark } = useUser();

  // Find all matching problems for this company
  const companyProblems = PROBLEMS.filter((p) =>
    p.companies.some(
      (tag) => tag.toLowerCase() === company.name.toLowerCase()
    )
  );

  const solvedCount = companyProblems.filter((p) =>
    solvedProblems.has(p.id)
  ).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Companies</span>
          </Link>
        </div>

        {/* Company Header Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-5">
              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-tr ${company.color} flex items-center justify-center font-black text-white text-2xl shadow-xl flex-shrink-0`}
              >
                {company.logo}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-white">
                    {company.name} Interview Bank
                  </h1>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Premium Unlocked
                  </span>
                </div>
                <p className="text-sm text-slate-400 max-w-2xl">
                  {company.description}
                </p>
              </div>
            </div>

            {/* Progress pill */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-4 min-w-[200px]">
              <div className="flex-1">
                <div className="text-xs text-slate-400">Solved for {company.name}</div>
                <div className="text-xl font-black text-white mt-0.5">
                  {solvedCount} / {companyProblems.length}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-400">
                  {companyProblems.length > 0
                    ? Math.round((solvedCount / companyProblems.length) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Top Topics */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2">
              Frequent Assessment Topics:
            </span>
            {company.popularCategories.map((cat, i) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700/60 inline-flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] font-bold text-blue-400">({cat.percentage}%)</span>
              </span>
            ))}
          </div>
        </div>

        {/* Problems List */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {companyProblems.length} Frequently Asked Questions
            </div>
            <span className="text-xs text-slate-500">
              Ranked by frequency in recent technical interviews
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {companyProblems.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Code2 className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm">More problems are being curated for this company.</p>
              </div>
            ) : (
              companyProblems.map((problem, index) => {
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

      </main>

      <Footer />
    </div>
  );
}
