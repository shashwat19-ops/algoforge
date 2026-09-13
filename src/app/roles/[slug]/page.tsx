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
  TrendingUp,
  Code2
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
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/roles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a0a0a0] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Role Tracks</span>
          </Link>
        </div>

        {/* Role Header Card */}
        <div className="p-6 rounded-2xl bg-[#282828] border border-[#383838] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00b8a3]/20 border border-[#00b8a3]/30 text-[#00b8a3] text-xs font-bold">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Career Track</span>
              </div>
              <h1 className="text-2xl font-black text-white">
                {role.title} DSA Roadmap
              </h1>
              <p className="text-xs text-[#a0a0a0] max-w-2xl leading-relaxed">
                {role.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] flex flex-col justify-between min-w-[200px]">
              <div className="flex items-center justify-between text-xs text-[#8a8a8a]">
                <span>Progress</span>
                <span className="font-bold text-[#00b8a3]">
                  {roleProblems.length > 0
                    ? Math.round((solvedCount / roleProblems.length) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="text-xl font-black text-white mt-1">
                {solvedCount} / {roleProblems.length}
                <span className="text-xs font-normal text-[#8a8a8a] ml-1.5">Solved</span>
              </div>
              <div className="w-full bg-[#333333] rounded-full h-1.5 mt-2.5 overflow-hidden">
                <div
                  className="bg-[#00b8a3] h-full rounded-full transition-all duration-500"
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#383838] text-xs">
            <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
              <div className="text-[#8a8a8a] text-[11px]">Comp Range</div>
              <div className="font-bold text-[#00b8a3] text-sm mt-0.5">
                {role.salaryRange}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
              <div className="text-[#8a8a8a] text-[11px]">DSA Weightage</div>
              <div className="font-bold text-[#FFA116] text-sm mt-0.5">
                {role.interviewBreakdown.dsa}% of loop
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
              <div className="text-[#8a8a8a] text-[11px]">System Design</div>
              <div className="font-bold text-white text-sm mt-0.5">
                {role.interviewBreakdown.systemDesign}%
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
              <div className="text-[#8a8a8a] text-[11px]">Domain Assessment</div>
              <div className="font-bold text-[#ffc01e] text-sm mt-0.5">
                {role.interviewBreakdown.domainKnowledge}%
              </div>
            </div>
          </div>
        </div>

        {/* Problems List Table */}
        <div className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden">
          <div className="p-4 border-b border-[#383838] flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#FFA116]" />
              <span>Core Track Questions ({roleProblems.length})</span>
            </h2>
            <span className="text-xs text-[#8a8a8a]">
              Curated for {role.title} interviews
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#383838] text-[11px] font-semibold text-[#8a8a8a] uppercase bg-[#1e1e1e]">
                  <th className="py-2.5 px-4 w-12 text-center">Status</th>
                  <th className="py-2.5 px-4">Title</th>
                  <th className="py-2.5 px-4 w-28">Difficulty</th>
                  <th className="py-2.5 px-4 w-32">Category</th>
                  <th className="py-2.5 px-4 w-28">Acceptance</th>
                  <th className="py-2.5 px-4 w-20 text-center">Bookmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333] text-xs">
                {roleProblems.map((problem) => {
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
