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
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00b8a3]/20 border border-[#00b8a3]/30 text-[#00b8a3] text-xs font-bold mb-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Targeted Career Tracks</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Role-Specific DSA Tracks
            </h1>
            <p className="text-xs text-[#a0a0a0] mt-1.5 max-w-2xl">
              Tailor your algorithm preparation to the exact questions and weightages required for your target engineering domain.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8a8a8a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search engineering roles..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#282828] border border-[#383838] text-xs text-white placeholder-[#8a8a8a] focus:outline-none focus:border-[#FFA116] transition-all"
            />
          </div>
        </div>

        {/* ROLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map((role) => {
            return (
              <Link
                key={role.slug}
                href={`/roles/${role.slug}`}
                className="group p-5 rounded-xl bg-[#282828] border border-[#383838] hover:border-[#FFA116]/50 hover:bg-[#303030] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{role.icon}</span>
                    <span className="text-[10px] font-bold text-[#00b8a3] bg-[#00b8a3]/20 px-2 py-0.5 rounded-full border border-[#00b8a3]/30">
                      {role.salaryRange}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#FFA116] transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-[#a0a0a0] mt-1 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.keySkills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#1e1e1e] text-[#a0a0a0] border border-[#383838]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#383838] flex items-center justify-between text-xs text-[#8a8a8a]">
                  <span>DSA: {role.interviewBreakdown.dsa}% of Loop</span>
                  <span className="flex items-center gap-1 text-[#FFA116] font-semibold group-hover:translate-x-0.5 transition-transform">
                    View Track <ArrowRight className="h-3 w-3" />
                  </span>
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
