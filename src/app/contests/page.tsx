"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CONTESTS, MOCK_LEADERBOARD } from "@/data/contests";
import { PROBLEMS } from "@/data/problems";
import {
  Trophy,
  Clock,
  Flame,
  Award,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  Medal,
  CheckCircle2
} from "lucide-react";

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "leaderboard">("upcoming");

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
              <Trophy className="h-3.5 w-3.5" />
              <span>Competitive Programming Arena</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              AlgoForge Contest Arena
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Compete in weekly and bi-weekly algorithmic contests. Test your speed against the clock and climb the global ranking leaderboard.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "upcoming"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Active & Upcoming
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "leaderboard"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Global Leaderboard
            </button>
          </div>
        </div>

        {/* CONTESTS TAB */}
        {activeTab === "upcoming" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONTESTS.map((contest) => (
                <div
                  key={contest.id}
                  className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5" />
                        <span>{contest.status}</span>
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{contest.duration}</span>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-black text-white">
                        {contest.title}
                      </h2>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          <span>{contest.startTime}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-slate-500" />
                          <span>{(contest.registeredCount || contest.participantsCount || 0).toLocaleString()} Joined</span>
                        </span>
                      </div>
                    </div>

                    {/* Problems List preview */}
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Contest Challenges ({contest.problems.length})
                      </div>
                      <div className="space-y-1.5">
                        {contest.problems.map((p, idx) => {
                          const matchedProblem = PROBLEMS.find((item) => item.id === p.problemId || item.id === p.id);
                          const problemTitle = matchedProblem?.title || `Problem ${idx + 1}`;
                          const difficulty = matchedProblem?.difficulty || (idx === 0 ? "Easy" : idx < 3 ? "Medium" : "Hard");

                          return (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-slate-500">Q{idx + 1}.</span>
                                <span className="font-bold text-slate-200">{problemTitle}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    difficulty === "Easy"
                                      ? "text-emerald-400"
                                      : difficulty === "Medium"
                                      ? "text-amber-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {difficulty}
                                </span>
                                <span className="font-mono font-bold text-amber-400">
                                  {p.score} pts
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Prize Pool: <span className="text-amber-400 font-bold">{contest.prizePool}</span>
                    </div>

                    <Link
                      href={`/contests/${contest.id}`}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/20 transition-all"
                    >
                      <span>Enter Arena</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === "leaderboard" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Global Ranking
              </div>
              <span className="text-xs text-slate-500">
                Updated in real-time across contests
              </span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {MOCK_LEADERBOARD.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-4 px-6 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 flex justify-center font-black text-sm">
                      {user.rank === 1 ? (
                        <Medal className="h-5 w-5 text-amber-400" />
                      ) : user.rank === 2 ? (
                        <Medal className="h-5 w-5 text-slate-300" />
                      ) : user.rank === 3 ? (
                        <Medal className="h-5 w-5 text-amber-700" />
                      ) : (
                        <span className="text-slate-500 font-mono">#{user.rank}</span>
                      )}
                    </div>

                    <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                      {user.username.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="font-bold text-sm text-white">
                        {user.username}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {user.solvedCount} Problems Solved
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-amber-400">
                        {user.rating}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium uppercase">
                        Rating
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
