"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ROLES } from "@/data/roles";
import { PROBLEMS } from "@/data/problems";
import {
  Briefcase,
  Search,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
  Code2
} from "lucide-react";

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = ROLES.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-3">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Targeted Career Preparation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Role-Specific DSA Tracks
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Don&apos;t practice aimlessly. Tailor your algorithm preparation to the exact questions and weightages required for your target engineering domain.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search engineering roles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* ROLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => {
            return (
              <Link
                key={role.slug}
                href={`/roles/${role.slug}`}
                className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {role.salaryRange}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      DSA: {role.interviewBreakdown.dsa}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.keySkills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Interview Breakdown Bar */}
                  <div className="pt-2">
                    <div className="text-[11px] text-slate-400 mb-1.5 flex justify-between font-medium">
                      <span>Interview Round Distribution</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 flex overflow-hidden">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: `${role.interviewBreakdown.dsa}%` }}
                        title={`DSA: ${role.interviewBreakdown.dsa}%`}
                      />
                      <div
                        className="bg-purple-500 h-full"
                        style={{ width: `${role.interviewBreakdown.systemDesign}%` }}
                        title={`System Design: ${role.interviewBreakdown.systemDesign}%`}
                      />
                      <div
                        className="bg-emerald-500 h-full"
                        style={{ width: `${role.interviewBreakdown.domainKnowledge}%` }}
                        title={`Domain: ${role.interviewBreakdown.domainKnowledge}%`}
                      />
                      <div
                        className="bg-amber-500 h-full"
                        style={{ width: `${role.interviewBreakdown.behavioral}%` }}
                        title={`Behavioral: ${role.interviewBreakdown.behavioral}%`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>DSA {role.interviewBreakdown.dsa}%</span>
                      <span>SysDesign {role.interviewBreakdown.systemDesign}%</span>
                      <span>Domain {role.interviewBreakdown.domainKnowledge}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-bold">
                  <span>{role.recommendedProblemIds.length} Recommended Problems</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
