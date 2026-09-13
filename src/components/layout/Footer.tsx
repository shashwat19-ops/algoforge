import React from "react";
import Link from "next/link";
import { Code2, Terminal, Sparkles, ShieldCheck, Zap, Crown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#383838] bg-[#1e1e1e] text-[#a0a0a0] text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#FFA116] flex items-center justify-center text-[#1a1a1a]">
                <Code2 className="h-4 w-4 text-[#1a1a1a] stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Algo<span className="text-[#FFA116]">Forge</span>
              </span>
            </div>
            <p className="text-[#8a8a8a] leading-relaxed text-xs">
              The premier zero-cost algorithmic interview prep platform. 100% unlocked company questions, role tracks, mock interviews, and interactive algorithm visualizers.
            </p>
            <div className="flex items-center gap-2 text-[#00b8a3] text-[11px] font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero Server Cost • Local Sandbox Engine</span>
            </div>
          </div>

          {/* Col 2: Problems & Tracks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Practice & Tracks
            </h4>
            <ul className="space-y-1.5 text-xs text-[#a0a0a0]">
              <li>
                <Link href="/problems" className="hover:text-white transition-colors">
                  All DSA Problems
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Company Question Banks</span>
                  <span className="text-[9px] bg-[#FFA116]/20 text-[#FFA116] px-1.5 py-0.2 rounded font-bold border border-[#FFA116]/30">PRO</span>
                </Link>
              </li>
              <li>
                <Link href="/roles" className="hover:text-white transition-colors">
                  Role-Wise DSA Paths
                </Link>
              </li>
              <li>
                <Link href="/study-plans" className="hover:text-white transition-colors">
                  Blind 75 & NeetCode 150
                </Link>
              </li>
              <li>
                <Link href="/contests" className="hover:text-white transition-colors">
                  Live Contest Arena
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Interactive Tools
            </h4>
            <ul className="space-y-1.5 text-xs text-[#a0a0a0]">
              <li>
                <Link href="/visualizer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-[#FFA116]" />
                  <span>Algorithm Visualizer</span>
                </Link>
              </li>
              <li>
                <Link href="/mock-interview" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-[#a855f7]" />
                  <span>Mock AI Interview Simulator</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Big-O Cheatsheets & DSA Patterns
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Submission Heatmap & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Architecture */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Architecture
            </h4>
            <p className="text-xs text-[#8a8a8a] leading-relaxed">
              AlgoForge executes your algorithms in-browser with zero latency, client-side validation, and instant test suite feedback.
            </p>
            <div className="p-3 rounded-lg bg-[#282828] border border-[#383838] text-[11px] text-[#eff1f6]">
              <div className="flex items-center gap-1.5 text-[#FFA116] font-semibold mb-1">
                <Terminal className="h-3.5 w-3.5" />
                <span>Next.js 15 & Monaco Editor</span>
              </div>
              <p className="text-[#8a8a8a] text-[10px]">
                High-performance sandboxed evaluator with custom Big-O profiling.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-[#383838] mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8a8a8a]">
          <p className="text-xs">
            © {new Date().getFullYear()} <span className="text-white font-semibold">AlgoForge</span>. Built for engineers cracking high-tier technical interviews.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#00b8a3] font-medium flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00b8a3] animate-ping"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
