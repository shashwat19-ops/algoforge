"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { STUDY_PLANS } from "@/data/studyPlans";
import { PROBLEMS } from "@/data/problems";
import { useUser } from "@/context/UserContext";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers
} from "lucide-react";

export default function StudyPlansPage() {
  const { solvedProblems } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* HEADER */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFA116]/20 border border-[#FFA116]/30 text-[#FFA116] text-xs font-bold mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Structured Interview Roadmaps</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Curated Study Plans & Roadmaps
          </h1>
          <p className="text-xs text-[#a0a0a0] mt-1.5 max-w-2xl">
            Step-by-step learning schedules crafted by industry experts (Blind 75, NeetCode 150, Striver&apos;s SDE Sheet, Grind 75, Top Interview 150).
          </p>
        </div>

        {/* STUDY PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STUDY_PLANS.map((plan) => {
            const allProblemIds = plan.chapters.flatMap((c) => c.problemIds);
            const totalProblems = allProblemIds.length;
            const solvedInPlan = allProblemIds.filter((id) =>
              solvedProblems.has(id)
            ).length;
            const progressPercent =
              totalProblems > 0
                ? Math.round((solvedInPlan / totalProblems) * 100)
                : 0;

            return (
              <Link
                key={plan.slug}
                href={`/study-plans/${plan.slug}`}
                className="group p-6 rounded-xl bg-[#282828] border border-[#383838] hover:border-[#FFA116]/50 hover:bg-[#303030] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/30">
                      {plan.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#8a8a8a] font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{plan.estimatedWeeks} Weeks Pace</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-[#FFA116] transition-colors">
                      {plan.title}
                    </h2>
                    <p className="text-xs text-[#a0a0a0] mt-1 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Chapters Preview */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider">
                      Included Modules ({plan.chapters.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.chapters.map((ch, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#1e1e1e] text-[#a0a0a0] border border-[#383838]"
                        >
                          {ch.title} ({ch.problemIds.length})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Footer */}
                <div className="pt-3 border-t border-[#383838] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8a8a8a]">Progress</span>
                    <span className="font-semibold text-white">
                      {solvedInPlan} / {totalProblems} Solved ({progressPercent}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#1e1e1e] overflow-hidden">
                    <div
                      className="h-full bg-[#00b8a3] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}
