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
  Award,
  Crown
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
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a0a0a0] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Companies</span>
          </Link>
        </div>

        {/* Company Header Card */}
        <div className="p-6 rounded-2xl bg-[#282828] border border-[#383838]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div
                className={`h-14 w-14 rounded-xl bg-gradient-to-tr ${company.color} flex items-center justify-center font-black text-white text-xl shadow-md shrink-0`}
              >
                {company.logo}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-black text-white">
                    {company.name} Interview Bank
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/30 flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Premium Unlocked
                  </span>
                </div>
                <p className="text-xs text-[#a0a0a0] max-w-2xl">
                  {company.description}
                </p>
              </div>
            </div>

            {/* Progress pill */}
            <div className="p-3.5 rounded-xl bg-[#1e1e1e] border border-[#383838] flex items-center gap-4 min-w-[180px]">
              <div className="flex-1">
                <div className="text-[11px] text-[#8a8a8a]">Solved for {company.name}</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {solvedCount} / {companyProblems.length}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#00b8a3]">
                  {companyProblems.length > 0
                    ? Math.round((solvedCount / companyProblems.length) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Top Topics */}
          <div className="mt-5 pt-4 border-t border-[#383838] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#8a8a8a] mr-1">
              Frequent Assessment Topics:
            </span>
            {company.popularCategories.map((cat, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-0.5 rounded bg-[#1e1e1e] text-[#eff1f6] border border-[#383838] inline-flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] font-bold text-[#FFA116]">
                  {cat.percentage}%
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Problem Table */}
        <div className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden">
          <div className="p-4 border-b border-[#383838] flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#FFA116]" />
              <span>Questions Asked at {company.name} ({companyProblems.length})</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#383838] text-[11px] font-semibold text-[#8a8a8a] uppercase bg-[#222222]">
                  <th className="py-2.5 px-4 w-12 text-center">Status</th>
                  <th className="py-2.5 px-4">Title</th>
                  <th className="py-2.5 px-4 w-28">Difficulty</th>
                  <th className="py-2.5 px-4 w-32">Category</th>
                  <th className="py-2.5 px-4 w-28">Acceptance</th>
                  <th className="py-2.5 px-4 w-20 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333] text-xs">
                {companyProblems.map((problem) => {
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

      </main>

      <Footer />
    </div>
  );
}
