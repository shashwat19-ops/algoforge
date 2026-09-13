"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANIES } from "@/data/companies";
import { PROBLEMS } from "@/data/problems";
import {
  Building2,
  Search,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Crown
} from "lucide-react";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFA116]/20 border border-[#FFA116]/30 text-[#FFA116] text-xs font-bold mb-2">
              <Crown className="h-3.5 w-3.5" />
              <span>100% Unlocked Company Questions (Free Pro)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Company-Wise Question Banks
            </h1>
            <p className="text-xs text-[#a0a0a0] mt-1.5 max-w-2xl">
              Target exact problems asked in Google, Meta, Amazon, Apple, Microsoft, Netflix, Goldman Sachs, and Bloomberg interviews.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8a8a8a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#282828] border border-[#383838] text-xs text-white placeholder-[#8a8a8a] focus:outline-none focus:border-[#FFA116] transition-all"
            />
          </div>
        </div>

        {/* COMPANIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCompanies.map((company) => {
            // Count matching problems in dataset
            const matchingCount = PROBLEMS.filter((p) =>
              p.companies.some(
                (c) => c.toLowerCase() === company.name.toLowerCase()
              )
            ).length;

            return (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="group p-5 rounded-xl bg-[#282828] border border-[#383838] hover:border-[#FFA116]/50 hover:bg-[#303030] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-tr ${company.color} flex items-center justify-center font-black text-white text-sm shadow-md`}
                    >
                      {company.logo}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00b8a3]/20 text-[#00b8a3] border border-[#00b8a3]/30">
                      Unlocked Free
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#FFA116] transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-xs text-[#a0a0a0] mt-1 line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>
                  </div>

                  {/* Interview Focus Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {company.popularCategories.slice(0, 3).map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#1e1e1e] text-[#a0a0a0] border border-[#383838]"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#383838] flex items-center justify-between text-xs text-[#8a8a8a]">
                  <span>{matchingCount || company.totalQuestions} Questions</span>
                  <span className="flex items-center gap-1 text-[#FFA116] font-semibold group-hover:translate-x-0.5 transition-transform">
                    Practice <ArrowRight className="h-3 w-3" />
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
