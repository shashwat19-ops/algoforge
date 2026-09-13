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
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* HEADER */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Structured Interview Prep</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Curated Study Plans & Roadmaps
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Step-by-step learning schedules crafted by industry experts to build algorithmic mastery systematically without overwhelming you.
          </p>
        </div>

        {/* STUDY PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="group p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all hover:-translate-y-1 shadow-xl shadow-black/40 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {plan.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{plan.estimatedWeeks} Weeks Pace</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                      {plan.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Chapters Preview */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Modules ({plan.chapters.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.chapters.map((ch, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {ch.title} ({ch.problemIds.length})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Footer */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Created by {plan.author}</span>
                    <span className="font-bold text-white">
                      {solvedInPlan} / {totalProblems} ({progressPercent}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
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
