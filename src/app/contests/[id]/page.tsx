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
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Back breadcrumb */}
        <div>
          <Link
            href="/contests"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a0a0a0] hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Contests Arena</span>
          </Link>
        </div>

        {/* Contest Header Card */}
        <div className="p-6 rounded-2xl bg-[#282828] border border-[#383838] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00b8a3]/20 border border-[#00b8a3]/30 text-[#00b8a3] text-xs font-bold">
                <Flame className="h-3.5 w-3.5" />
                <span>Live Contest Arena</span>
              </div>
              <h1 className="text-2xl font-black text-white">
                {contest.title}
              </h1>
              <p className="text-xs text-[#a0a0a0] max-w-xl">
                Solve all 4 problems with optimal time complexity before time runs out. Incorrect submissions incur a 5-minute penalty.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] text-center min-w-[180px]">
              <div className="text-xs text-[#8a8a8a] flex items-center justify-center gap-1 font-medium">
                <Clock className="h-3.5 w-3.5 text-[#FFA116]" />
                <span>Contest Ends In</span>
              </div>
              <div className="text-2xl font-black font-mono text-[#FFA116] mt-0.5">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Contest Challenges Grid */}
        <div className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#383838] bg-[#222222] flex items-center justify-between">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Contest Problem Set
            </div>
            <span className="text-xs text-[#8a8a8a]">
              Total Score: 18 Points
            </span>
          </div>

          <div className="divide-y divide-[#333333]">
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
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 px-4 hover:bg-[#333333] transition-colors gap-3"
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <span className="font-mono text-xs font-bold text-[#8a8a8a] w-6">
                      Q{idx + 1}
                    </span>

                    <div className="flex-1">
                      <Link
                        href={solveHref}
                        className="font-medium text-xs text-white hover:text-[#FFA116] transition-colors"
                      >
                        {problemTitle}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-[#8a8a8a] mt-0.5">
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

                  <div className="flex items-center justify-between sm:justify-end gap-4 pl-9 sm:pl-0">
                    <span
                      className={`text-xs font-semibold ${
                        difficulty === "Easy"
                          ? "text-[#00b8a3]"
                          : difficulty === "Medium"
                          ? "text-[#ffc01e]"
                          : "text-[#ff375f]"
                      }`}
                    >
                      {difficulty}
                    </span>

                    <Link
                      href={solveHref}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#FFA116] hover:bg-[#e08e14] text-black transition-all"
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
