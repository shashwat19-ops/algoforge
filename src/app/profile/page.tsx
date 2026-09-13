"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROBLEMS } from "@/data/problems";
import { useUser } from "@/context/UserContext";
import {
  Trophy,
  Flame,
  Award,
  Calendar,
  Bookmark,
  CheckCircle2,
  Clock,
  Zap,
  Code2,
  TrendingUp,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Medal,
  Activity,
  Layers,
  User
} from "lucide-react";

export default function ProfilePage() {
  const { solvedProblems, isBookmarked, toggleBookmark, submissions, streak } =
    useUser();

  const [filterPeriod, setFilterPeriod] = useState<"all" | "month" | "year">(
    "year"
  );

  // Difficulty counts
  const totalProblemsCount = PROBLEMS.length;
  const easyTotal = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const mediumTotal = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hardTotal = PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  const solvedEasy = PROBLEMS.filter(
    (p) => p.difficulty === "Easy" && solvedProblems.has(p.id)
  ).length;
  const solvedMedium = PROBLEMS.filter(
    (p) => p.difficulty === "Medium" && solvedProblems.has(p.id)
  ).length;
  const solvedHard = PROBLEMS.filter(
    (p) => p.difficulty === "Hard" && solvedProblems.has(p.id)
  ).length;

  const totalSolved = solvedProblems.size;
  const bookmarkedList = PROBLEMS.filter((p) => isBookmarked(p.id));

  // Generate 52 weeks (364 days) of mock + real heatmap data
  const heatmapData = useMemo(() => {
    const days = [];
    const today = new Date();

    // Create mapping of actual submissions by date string YYYY-MM-DD
    const subMap: Record<string, number> = {};
    submissions.forEach((sub) => {
      const dateStr = new Date(sub.timestamp).toISOString().split("T")[0];
      subMap[dateStr] = (subMap[dateStr] || 0) + 1;
    });

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      // Calculate activity: real submissions + deterministic mock activity based on date hash
      let count = subMap[dateStr] || 0;

      // Add pseudo-random consistent historical activity for realistic look
      const hash = (d.getFullYear() * 1000 + d.getMonth() * 100 + d.getDate()) % 17;
      if (hash === 1 || hash === 4 || hash === 7 || hash === 11 || hash === 14) {
        count += (hash % 4) + 1;
      }

      days.push({
        date: dateStr,
        count: count,
        dayOfWeek: d.getDay()
      });
    }
    return days;
  }, [submissions]);

  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-[#282828] border-[#383838]";
    if (count === 1) return "bg-[#005a4e] border-[#007a6a] text-[#00b8a3]";
    if (count === 2) return "bg-[#008272] border-[#009e8b] text-white";
    if (count === 3) return "bg-[#00b8a3] border-[#22d3bb] text-black";
    return "bg-[#2fe5ce] border-[#5cf7e4] text-black";
  };

  const ACHIEVEMENTS = [
    {
      title: "First Step",
      desc: "Solved your first algorithmic challenge on AlgoForge.",
      icon: Trophy,
      color: "text-[#FFA116] bg-[#FFA116]/10 border-[#FFA116]/20",
      unlocked: totalSolved >= 1
    },
    {
      title: "Consistent Grinder",
      desc: "Maintained a continuous practice streak.",
      icon: Flame,
      color: "text-[#FFA116] bg-[#FFA116]/10 border-[#FFA116]/20",
      unlocked: streak.current >= 3 || streak.max >= 3
    },
    {
      title: "Blind 75 Pioneer",
      desc: "Mastered fundamental core data structures and patterns.",
      icon: ShieldCheck,
      color: "text-[#00b8a3] bg-[#00b8a3]/10 border-[#00b8a3]/20",
      unlocked: totalSolved >= 5
    },
    {
      title: "Hardcore Problem Solver",
      desc: "Successfully cracked Hard category challenges.",
      icon: Star,
      color: "text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/20",
      unlocked: solvedHard >= 1
    },
    {
      title: "Mock Interview Elite",
      desc: "Passed a full 45-minute timed AI technical interview.",
      icon: Award,
      color: "text-[#FFA116] bg-[#FFA116]/10 border-[#FFA116]/20",
      unlocked: true
    },
    {
      title: "Speed Demon",
      desc: "Submitted optimal 0ms solution with sub-10MB memory usage.",
      icon: Zap,
      color: "text-[#ffc01e] bg-[#ffc01e]/10 border-[#ffc01e]/20",
      unlocked: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* PROFILE HEADER HERO */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#282828] border border-[#383838] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-[#1e1e1e] border border-[#383838] p-1 flex items-center justify-center font-black text-2xl text-[#FFA116] shadow-inner">
                SS
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    Shashwat Sharma
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFA116]/20 border border-[#FFA116]/30 text-[#FFA116] text-xs font-bold">
                    PRO Lifetime Unlocked
                  </span>
                </div>
                <p className="text-xs text-[#a0a0a0]">
                  Global Rank: <span className="font-bold text-white font-mono">#1,420</span> • Rating: <span className="font-bold text-[#FFA116] font-mono">1,845</span>
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs text-[#8a8a8a]">
                  <span className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-[#FFA116]" />
                    <span className="font-bold text-white">{streak.current} Days</span> Streak
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-[#8a8a8a]" />
                    Joined AlgoForge
                  </span>
                </div>
              </div>
            </div>

            {/* QUICK STATS CARDS */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] text-center min-w-[90px]">
                <div className="text-xs text-[#8a8a8a] font-medium">Solved</div>
                <div className="text-2xl font-black text-white mt-0.5 font-mono">
                  {totalSolved}
                </div>
                <div className="text-[10px] text-[#8a8a8a] mt-0.5">
                  of {totalProblemsCount}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] text-center min-w-[90px]">
                <div className="text-xs text-[#8a8a8a] font-medium">Acceptance</div>
                <div className="text-2xl font-black text-[#00b8a3] mt-0.5 font-mono">
                  89.4%
                </div>
                <div className="text-[10px] text-[#8a8a8a] mt-0.5">
                  High Precision
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] text-center min-w-[90px]">
                <div className="text-xs text-[#8a8a8a] font-medium">Global Top</div>
                <div className="text-2xl font-black text-[#FFA116] mt-0.5 font-mono">
                  Top 4%
                </div>
                <div className="text-[10px] text-[#8a8a8a] mt-0.5">
                  Percentile
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIFFICULTY PROGRESS & BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Solved Problems Breakdown */}
          <div className="lg:col-span-1 p-6 rounded-xl bg-[#282828] border border-[#383838] space-y-5">
            <h2 className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#FFA116]" />
              <span>Solved Breakdown</span>
            </h2>

            {/* Total circular visual */}
            <div className="p-5 rounded-xl bg-[#1e1e1e] border border-[#383838] flex items-center justify-between">
              <div>
                <div className="text-xs text-[#8a8a8a]">Total Solved</div>
                <div className="text-3xl font-black text-white font-mono mt-0.5">
                  {totalSolved}
                  <span className="text-xs font-normal text-[#8a8a8a] ml-1.5">
                    / {totalProblemsCount}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-[#FFA116]/30 border-t-[#FFA116] flex items-center justify-center font-bold text-xs text-white">
                {totalProblemsCount > 0 ? Math.round((totalSolved / totalProblemsCount) * 100) : 0}%
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              {/* Easy */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#00b8a3]">Easy</span>
                  <span className="font-mono text-white">
                    {solvedEasy} / {easyTotal}
                  </span>
                </div>
                <div className="w-full bg-[#1e1e1e] border border-[#383838] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#00b8a3] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${easyTotal > 0 ? (solvedEasy / easyTotal) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#ffc01e]">Medium</span>
                  <span className="font-mono text-white">
                    {solvedMedium} / {mediumTotal}
                  </span>
                </div>
                <div className="w-full bg-[#1e1e1e] border border-[#383838] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#ffc01e] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${mediumTotal > 0 ? (solvedMedium / mediumTotal) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#ff375f]">Hard</span>
                  <span className="font-mono text-white">
                    {solvedHard} / {hardTotal}
                  </span>
                </div>
                <div className="w-full bg-[#1e1e1e] border border-[#383838] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#ff375f] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${hardTotal > 0 ? (solvedHard / hardTotal) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 365-Day Activity Heatmap */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-[#282828] border border-[#383838] space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00b8a3]" />
                <span>365-Day Practice Activity Heatmap</span>
              </h2>
              <span className="text-xs text-[#8a8a8a]">
                {heatmapData.reduce((acc, curr) => acc + curr.count, 0)} Submissions in past year
              </span>
            </div>

            {/* Scrollable Heatmap Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[700px]">
                {heatmapData.map((d, idx) => (
                  <div
                    key={idx}
                    title={`${d.date}: ${d.count} submissions`}
                    className={`h-3 w-3 rounded-[2px] border transition-transform hover:scale-125 cursor-pointer ${getActivityColor(
                      d.count
                    )}`}
                  />
                ))}
              </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between pt-3 border-t border-[#383838] text-xs text-[#8a8a8a]">
              <span>Less Activity</span>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-[2px] bg-[#282828] border border-[#383838]" />
                <div className="h-3 w-3 rounded-[2px] bg-[#005a4e] border border-[#007a6a]" />
                <div className="h-3 w-3 rounded-[2px] bg-[#008272] border border-[#009e8b]" />
                <div className="h-3 w-3 rounded-[2px] bg-[#00b8a3] border border-[#22d3bb]" />
                <div className="h-3 w-3 rounded-[2px] bg-[#2fe5ce] border border-[#5cf7e4]" />
              </div>
              <span>More Activity</span>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS & BADGES */}
        <div className="p-6 rounded-xl bg-[#282828] border border-[#383838] space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider flex items-center gap-2">
              <Medal className="h-4 w-4 text-[#FFA116]" />
              <span>Badges & Certifications Unlocked</span>
            </h2>
            <span className="text-xs text-[#8a8a8a]">
              {ACHIEVEMENTS.filter((a) => a.unlocked).length} / {ACHIEVEMENTS.length} Earned
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((ach, idx) => {
              const Icon = ach.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                    ach.unlocked
                      ? "bg-[#1e1e1e] border-[#383838]"
                      : "bg-[#222222] border-[#333333] opacity-40 grayscale"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center border shrink-0 ${ach.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white">
                        {ach.title}
                      </h3>
                      {ach.unlocked && (
                        <span className="text-[10px] font-bold text-[#00b8a3]">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8a8a8a] leading-snug">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOOKMARKED PROBLEMS & RECENT SUBMISSIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Bookmarked Problems */}
          <div className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#383838] bg-[#222222] flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-[#FFA116]" />
                <span>Saved Bookmarks ({bookmarkedList.length})</span>
              </h2>
              <Link
                href="/problems"
                className="text-xs text-[#FFA116] hover:text-[#e08e14] font-semibold"
              >
                Browse All
              </Link>
            </div>

            <div className="divide-y divide-[#333333]">
              {bookmarkedList.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#8a8a8a]">
                  No bookmarked problems yet. Click the bookmark icon on any problem to save it for quick review.
                </div>
              ) : (
                bookmarkedList.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 px-5 flex items-center justify-between hover:bg-[#333333] transition-colors"
                  >
                    <div>
                      <Link
                        href={`/problems/${p.id}`}
                        className="font-bold text-xs text-white hover:text-[#FFA116] transition-colors"
                      >
                        {p.title}
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] text-[#8a8a8a] mt-0.5">
                        <span>{p.category}</span>
                        {p.tags && p.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{p.tags[0]}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.difficulty === "Easy"
                            ? "bg-[#00b8a3]/10 text-[#00b8a3] border border-[#00b8a3]/20"
                            : p.difficulty === "Medium"
                            ? "bg-[#ffc01e]/10 text-[#ffc01e] border border-[#ffc01e]/20"
                            : "bg-[#ff375f]/10 text-[#ff375f] border border-[#ff375f]/20"
                        }`}
                      >
                        {p.difficulty}
                      </span>
                      <button
                        onClick={() => toggleBookmark(p.id)}
                        className="text-[#FFA116] hover:text-[#8a8a8a]"
                        title="Remove bookmark"
                      >
                        <Bookmark className="h-4 w-4 fill-[#FFA116]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#383838] bg-[#222222] flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Code2 className="h-4 w-4 text-[#00b8a3]" />
                <span>Recent Submissions</span>
              </h2>
              <span className="text-xs text-[#8a8a8a]">
                {submissions.length} Recorded
              </span>
            </div>

            <div className="divide-y divide-[#333333]">
              {submissions.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#8a8a8a]">
                  No submissions yet. Head over to the Problem Arena to solve your first challenge!
                </div>
              ) : (
                submissions.slice(0, 6).map((sub) => {
                  const prob = PROBLEMS.find((p) => p.id === sub.problemId);
                  return (
                    <div
                      key={sub.id}
                      className="p-3.5 px-5 flex items-center justify-between hover:bg-[#333333] transition-colors"
                    >
                      <div>
                        <Link
                          href={`/problems/${sub.problemId}`}
                          className="font-bold text-xs text-white hover:text-[#00b8a3] transition-colors"
                        >
                          {prob?.title || sub.problemId}
                        </Link>
                        <div className="flex items-center gap-3 text-[11px] text-[#8a8a8a] mt-0.5">
                          <span className="capitalize text-white">
                            {sub.language}
                          </span>
                          <span>•</span>
                          <span>{sub.runtimeMs} ms</span>
                          <span>•</span>
                          <span>{sub.memoryKb} KB</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sub.status === "Accepted"
                              ? "bg-[#00b8a3]/20 text-[#00b8a3] border border-[#00b8a3]/30"
                              : "bg-[#ff375f]/20 text-[#ff375f] border border-[#ff375f]/30"
                          }`}
                        >
                          {sub.status}
                        </span>
                        <div className="text-[10px] text-[#8a8a8a] mt-1">
                          {new Date(sub.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
