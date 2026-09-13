"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CONTESTS } from "@/data/contests";
import { PROBLEMS } from "@/data/problems";
import {
  Trophy,
  ChevronLeft,
  Clock,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
  Users,
  ShieldAlert
} from "lucide-react";

export default function ContestDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const contest = CONTESTS.find((c) => c.id === resolvedParams.id);

  if (!contest) {
    notFound();
  }

  // 90 minutes contest timer = 5400s
  const [timeLeft, setTimeLeft] = useState<number>(5400);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/contests"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Contests Arena</span>
          </Link>
        </div>

        {/* Contest Header Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 relative overflow-hidden shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                <Flame className="h-3.5 w-3.5" />
                <span>Live Contest Arena</span>
              </div>
              <h1 className="text-3xl font-black text-white">
                {contest.title}
              </h1>
              <p className="text-sm text-slate-400 max-w-xl">
                Solve all 4 problems with optimal time complexity before time runs out. Incorrect submissions incur a 5-minute penalty.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-center min-w-[200px] shadow-xl">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1 font-medium">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Contest Ends In</span>
              </div>
              <div className="text-3xl font-black font-mono text-amber-400 mt-1">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Contest Challenges Grid */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Contest Problem Set
            </div>
            <span className="text-xs text-slate-500">
              Total Score: 18 Points
            </span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {contest.problems.map((p, idx) => {
              // Find matching full problem if exists
              const matchedProblem = PROBLEMS.find(
                (item) => item.id === p.problemId || item.id === p.id
              );
              const problemTitle = matchedProblem?.title || `Problem ${idx + 1}`;
              const difficulty = matchedProblem?.difficulty || (idx === 0 ? "Easy" : idx < 3 ? "Medium" : "Hard");
              const solveHref = matchedProblem
                ? `/problems/${matchedProblem.id}`
                : `/problems/${PROBLEMS[idx % PROBLEMS.length].id}`;

              return (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-6 hover:bg-slate-800/40 transition-colors gap-3"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-mono text-sm font-bold text-slate-500 w-6">
                      Q{idx + 1}
                    </span>

                    <div className="flex-1">
                      <Link
                        href={solveHref}
                        className="font-bold text-sm text-slate-200 hover:text-amber-400 transition-colors"
                      >
                        {problemTitle}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>Score: {p.score} pts</span>
                        {matchedProblem && (
                          <>
                            <span>•</span>
                            <span>{matchedProblem.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 pl-9 sm:pl-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        difficulty === "Easy"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : difficulty === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {difficulty}
                    </span>

                    <Link
                      href={solveHref}
                      className="flex items-center gap-1 text-xs font-bold px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20 transition-all"
                    >
                      <span>Solve Problem</span>
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
