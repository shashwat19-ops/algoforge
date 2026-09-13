import React from "react";
import Link from "next/link";
import { Code2, Github, Terminal, Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-[#080b11] text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-black text-white">
                Algo<span className="text-blue-400">Forge</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The premier zero-cost algorithmic interview prep platform. 100% unlocked company questions, role tracks, mock interviews, and interactive algorithm visualizers.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero Server Cost • Local Sandbox Engine</span>
            </div>
          </div>

          {/* Col 2: Problems & Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Practice & Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/problems" className="hover:text-blue-400 transition-colors">
                  All DSA Problems
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Company Question Banks</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded font-bold">PRO</span>
                </Link>
              </li>
              <li>
                <Link href="/roles" className="hover:text-blue-400 transition-colors">
                  Role-Wise DSA Paths
                </Link>
              </li>
              <li>
                <Link href="/study-plans" className="hover:text-blue-400 transition-colors">
                  Blind 75 & NeetCode 150
                </Link>
              </li>
              <li>
                <Link href="/contests" className="hover:text-blue-400 transition-colors">
                  Live Contest Arena
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/visualizer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-cyan-400" />
                  <span>Algorithm Visualizer</span>
                </Link>
              </li>
              <li>
                <Link href="/mock-interview" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-purple-400" />
                  <span>Mock AI Interview Simulator</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-blue-400 transition-colors">
                  Big-O Cheatsheets & DSA Patterns
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-blue-400 transition-colors">
                  Submission Heatmap & Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Performance & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              AlgoForge executes your JavaScript algorithms completely in-browser with zero latency, client-side validation, and instant test suite feedback.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-1">
                <Terminal className="h-3.5 w-3.5" />
                <span>Next.js 15 & Monaco Editor</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                High-performance sandboxed evaluator with custom Big-O profiling.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p className="text-xs">
            © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">AlgoForge</span>. Built for engineers cracking high-tier technical interviews.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
