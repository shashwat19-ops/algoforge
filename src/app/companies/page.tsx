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
  CheckCircle2
} from "lucide-react";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
              <Unlock className="h-3.5 w-3.5" />
              <span>100% Unlocked Company Questions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Company-Wise Question Banks
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Target exact problems asked in Google, Meta, Amazon, Apple, Microsoft, Netflix, Goldman Sachs, and Bloomberg interviews.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* COMPANIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${company.color} flex items-center justify-center font-black text-white text-base shadow-lg`}
                    >
                      {company.logo}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Free Access
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>
                  </div>

                  {/* Interview Focus Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {company.popularCategories.slice(0, 3).map((cat, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-amber-400">
                    {matchingCount > 0 ? matchingCount : company.totalQuestions} Curated Questions
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
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
