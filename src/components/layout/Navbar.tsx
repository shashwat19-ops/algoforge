"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {
  Code2,
  Building2,
  Briefcase,
  BookOpen,
  Eye,
  Trophy,
  Flame,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  User,
  GraduationCap
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { solvedProblems, streak, bookmarkedProblems } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/problems", label: "Problems", icon: Code2 },
    { href: "/companies", label: "Companies", icon: Building2, badge: "Premium Free" },
    { href: "/roles", label: "Role Tracks", icon: Briefcase },
    { href: "/study-plans", label: "Study Roadmaps", icon: BookOpen },
    { href: "/visualizer", label: "Visualizer", icon: Eye, badge: "Interactive" },
    { href: "/mock-interview", label: "Mock AI", icon: Sparkles },
    { href: "/contests", label: "Contests", icon: Trophy },
    { href: "/resources", label: "Cheatsheet", icon: GraduationCap }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-[#0a0d14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <div className="h-full w-full bg-[#0d121f] rounded-[11px] flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  Algo<span className="text-blue-400">Forge</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-emerald-400 uppercase -mt-1">
                  100% Free Pro
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "text-white bg-blue-600/15 border border-blue-500/30 shadow-sm shadow-blue-500/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                          link.badge === "Premium Free"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Metrics & Profile */}
          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold"
              title={`${streak.current} Day Streak`}
            >
              <Flame className="h-4 w-4 fill-amber-500 text-orange-400 animate-pulse" />
              <span>{streak.current}d</span>
            </div>

            {/* Solved Count Counter */}
            <Link
              href="/problems"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
              title="Problems Solved"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{solvedProblems.size} Solved</span>
            </Link>

            {/* Bookmarks */}
            <Link
              href="/problems?filter=bookmarked"
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-colors"
              title="Bookmarked Questions"
            >
              <Bookmark className="h-3.5 w-3.5 text-blue-400 fill-blue-400/20" />
              <span>{bookmarkedProblems.size}</span>
            </Link>

            {/* Profile Avatar */}
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all group"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                S
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-slate-200 group-hover:text-white">
                Shashwat
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 bg-[#0c101a] rounded-b-xl px-2 space-y-1 mb-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-blue-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
