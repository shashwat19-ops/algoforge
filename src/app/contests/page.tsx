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
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFA116]/20 border border-[#FFA116]/30 text-[#FFA116] text-xs font-bold mb-2">
              <Trophy className="h-3.5 w-3.5" />
              <span>Competitive Arena</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Contest Arena
            </h1>
            <p className="text-xs text-[#a0a0a0] mt-1.5 max-w-2xl">
              Compete in weekly and bi-weekly algorithmic contests. Test your problem-solving speed against the clock and climb the global ranking leaderboard.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#282828] border border-[#383838]">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === "upcoming"
                  ? "bg-[#383838] text-white"
                  : "text-[#8a8a8a] hover:text-white"
              }`}
            >
              Active & Upcoming
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === "leaderboard"
                  ? "bg-[#383838] text-white"
                  : "text-[#8a8a8a] hover:text-white"
              }`}
            >
              Global Leaderboard
            </button>
          </div>
        </div>

        {/* CONTESTS TAB */}
        {activeTab === "upcoming" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONTESTS.map((contest) => (
                <div
                  key={contest.id}
                  className="p-5 rounded-xl bg-[#282828] border border-[#383838] hover:border-[#FFA116]/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00b8a3]/20 text-[#00b8a3] border border-[#00b8a3]/30 flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        <span>{contest.status}</span>
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[#8a8a8a]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{contest.duration}</span>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-white">
                        {contest.title}
                      </h2>
                      <div className="flex items-center gap-4 text-xs text-[#8a8a8a] mt-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-[#8a8a8a]" />
                          <span>{contest.startTime}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-[#8a8a8a]" />
                          <span>{(contest.registeredCount || contest.participantsCount || 0).toLocaleString()} Registered</span>
                        </span>
                      </div>
                    </div>

                    {/* Problems List preview */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider">
                        Contest Challenges ({contest.problems.length})
                      </div>
                      <div className="space-y-1">
                        {contest.problems.map((p, idx) => {
                          const matchedProblem = PROBLEMS.find((item) => item.id === p.problemId || item.id === p.id);
                          const problemTitle = matchedProblem?.title || `Problem ${idx + 1}`;
                          const difficulty = matchedProblem?.difficulty || (idx === 0 ? "Easy" : idx < 3 ? "Medium" : "Hard");

                          return (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-[#1e1e1e] border border-[#383838] flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[#8a8a8a]">Q{idx + 1}.</span>
                                <span className="font-medium text-white">{problemTitle}</span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`text-[10px] font-semibold ${
                                    difficulty === "Easy"
                                      ? "text-[#00b8a3]"
                                      : difficulty === "Medium"
                                      ? "text-[#ffc01e]"
                                      : "text-[#ff375f]"
                                  }`}
                                >
                                  {difficulty}
                                </span>
                                <span className="font-mono font-bold text-[#FFA116] text-[11px]">
                                  {p.score} pts
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#383838] flex items-center justify-between">
                    <div className="text-xs text-[#8a8a8a]">
                      Prize Pool: <span className="text-[#FFA116] font-bold">{contest.prizePool}</span>
                    </div>

                    <Link
                      href={`/contests/${contest.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFA116] hover:bg-[#e08e14] text-black font-bold text-xs transition-all"
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
          <div className="rounded-xl border border-[#383838] bg-[#282828] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#383838] bg-[#222222] flex items-center justify-between">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Global Contest Leaderboard
              </div>
              <span className="text-xs text-[#8a8a8a]">
                Updated in real-time across contests
              </span>
            </div>

            <div className="divide-y divide-[#333333]">
              {MOCK_LEADERBOARD.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3.5 px-5 hover:bg-[#333333] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-7 flex justify-center font-black text-xs">
                      {user.rank === 1 ? (
                        <Medal className="h-4 w-4 text-[#ffc01e]" />
                      ) : user.rank === 2 ? (
                        <Medal className="h-4 w-4 text-[#a0a0a0]" />
                      ) : user.rank === 3 ? (
                        <Medal className="h-4 w-4 text-[#FFA116]" />
                      ) : (
                        <span className="text-[#8a8a8a] font-mono">#{user.rank}</span>
                      )}
                    </div>

                    <div className="h-8 w-8 rounded-lg bg-[#1e1e1e] border border-[#383838] flex items-center justify-center font-bold text-xs text-white">
                      {user.username.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="font-bold text-xs text-white">
                        {user.username}
                      </div>
                      <div className="text-[10px] text-[#8a8a8a]">
                        {user.solvedCount} Problems Solved
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs font-black font-mono text-[#FFA116]">
                        {user.rating}
                      </div>
                      <div className="text-[9px] text-[#8a8a8a] font-medium uppercase">
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
