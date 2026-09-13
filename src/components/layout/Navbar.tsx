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
  GraduationCap,
  Compass,
  Crown
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { solvedProblems, streak, bookmarkedProblems } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/problems", label: "Problems" },
    { href: "/companies", label: "Companies", badge: "Free Pro" },
    { href: "/study-plans", label: "Study Roadmaps" },
    { href: "/roles", label: "Role Tracks" },
    { href: "/visualizer", label: "Visualizer" },
    { href: "/mock-interview", label: "Mock AI" },
    { href: "/contests", label: "Contest" },
    { href: "/resources", label: "Cheatsheet" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#383838] bg-[#282828] text-[#eff1f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Left: Brand Logo & Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* LeetCode stylized logo glyph */}
              <div className="h-8 w-8 rounded-lg bg-[#FFA116] flex items-center justify-center shadow-md shadow-[#FFA116]/20">
                <Code2 className="h-5 w-5 text-[#1a1a1a] stroke-[2.5]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-white tracking-tight">
                  Algo<span className="text-[#FFA116]">Forge</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/40">
                  PRO FREE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/problems"
                    ? pathname === "/problems" || pathname.startsWith("/problems/")
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "text-white font-semibold bg-[#383838]"
                        : "text-[#a0a0a0] hover:text-white hover:bg-[#333333]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#FFA116]/20 text-[#FFA116] border border-[#FFA116]/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Metrics & User Profile */}
          <div className="flex items-center gap-3">
            {/* Streak Counter with flame */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#333333] border border-[#404040] text-[#FFA116] text-xs font-bold"
              title={`${streak.current} Day Streak`}
            >
              <Flame className="h-3.5 w-3.5 fill-[#FFA116] text-[#FFA116]" />
              <span>{streak.current}</span>
            </div>

            {/* Solved Problems Counter */}
            <Link
              href="/problems"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#333333] border border-[#404040] text-[#00b8a3] text-xs font-bold hover:bg-[#383838] transition-colors"
              title="Problems Solved"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#00b8a3]" />
              <span>{solvedProblems.size} Solved</span>
            </Link>

            {/* Bookmarks */}
            <Link
              href="/problems?filter=bookmarked"
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#333333] border border-[#404040] text-[#a0a0a0] text-xs font-medium hover:text-white hover:bg-[#383838] transition-colors"
              title="Bookmarked Questions"
            >
              <Bookmark className="h-3.5 w-3.5 text-[#FFA116] fill-[#FFA116]/20" />
              <span>{bookmarkedProblems.size}</span>
            </Link>

            {/* Free Premium Unlocked Badge */}
            <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-md bg-gradient-to-r from-[#FFA116]/10 to-[#ffb800]/10 border border-[#FFA116]/30 text-[#FFA116] text-xs font-semibold">
              <Crown className="h-3.5 w-3.5 text-[#FFA116]" />
              <span>Premium Unlocked</span>
            </div>

            {/* Profile Avatar */}
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-lg bg-[#333333] hover:bg-[#383838] border border-[#404040] transition-all group"
            >
              <div className="h-6 w-6 rounded-md bg-[#FFA116] text-[#1a1a1a] flex items-center justify-center text-xs font-bold">
                S
              </div>
              <span className="hidden sm:inline text-xs font-medium text-[#eff1f6] group-hover:text-white">
                Shashwat
              </span>
            </Link>

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md bg-[#333333] text-[#a0a0a0] hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#383838] space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-[#a0a0a0] hover:text-white hover:bg-[#333333]"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#FFA116]/20 text-[#FFA116]">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
