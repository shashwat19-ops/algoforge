"use client";

import React from "react";
import { Sparkles, Terminal, Code2, BookOpen, Layers } from "lucide-react";
import { ALGORITHM_PRESETS } from "@/lib/algorithms/presets";
import { AlgorithmPreset } from "@/lib/types";

interface HeaderProps {
  selectedPreset: AlgorithmPreset;
  onSelectPreset: (preset: AlgorithmPreset) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedPreset,
  onSelectPreset,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-3.5 backdrop-blur-md sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-mono">
                AlgoForge
              </h1>
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 ring-1 ring-indigo-500/20">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive Algorithm Engineering & Canvas Execution Suite
            </p>
          </div>
        </div>

        {/* Algorithm Preset Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
            <Layers className="h-4 w-4 text-indigo-400" />
            <span className="text-slate-400">Algorithm:</span>
            <select
              value={selectedPreset.id}
              onChange={(e) => {
                const found = ALGORITHM_PRESETS.find((p) => p.id === e.target.value);
                if (found) onSelectPreset(found);
              }}
              className="bg-transparent font-medium text-white outline-none cursor-pointer"
            >
              {ALGORITHM_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id} className="bg-slate-900 text-white">
                  {preset.name} ({preset.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Complexity Info Badges */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono">
          <div className="rounded-md border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-slate-300">
            <span className="text-slate-500">Time:</span>{" "}
            <span className="text-indigo-400 font-semibold">{selectedPreset.timeComplexity.average}</span>
          </div>
          <div className="rounded-md border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-slate-300">
            <span className="text-slate-500">Space:</span>{" "}
            <span className="text-emerald-400 font-semibold">{selectedPreset.spaceComplexity}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
