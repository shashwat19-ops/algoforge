"use client";

import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
  Shuffle,
  Gauge,
  Activity,
  Layers,
  Zap,
} from "lucide-react";
import { PlaybackSpeed, ExecutionStep } from "@/lib/types";

interface ExecutionControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentStepIndex: number;
  totalSteps: number;
  onStepChange: (index: number) => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onRandomize: () => void;
  speed: PlaybackSpeed;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  currentStep?: ExecutionStep;
}

export const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  isPlaying,
  onTogglePlay,
  currentStepIndex,
  totalSteps,
  onStepChange,
  onStepForward,
  onStepBackward,
  onReset,
  onRandomize,
  speed,
  onSpeedChange,
  currentStep,
}) => {
  const speeds: PlaybackSpeed[] = [0.25, 0.5, 1, 2, 5, 10];

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md">
      {/* Top Bar: Progress timeline slider */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-slate-400 min-w-[50px]">
          {totalSteps > 0 ? `${currentStepIndex + 1}/${totalSteps}` : "0/0"}
        </span>

        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => onStepChange(Number(e.target.value))}
          disabled={totalSteps <= 0}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-indigo-500 hover:accent-indigo-400 disabled:opacity-40"
        />

        <div className="flex items-center gap-1">
          <button
            onClick={onRandomize}
            className="flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
            title="Randomize Dataset"
          >
            <Shuffle className="h-3.5 w-3.5 text-indigo-400" />
            <span>Shuffle</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
            title="Reset Execution"
          >
            <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Middle Bar: Playback Controls & Speed */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
        {/* Playback Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onStepChange(0)}
            disabled={currentStepIndex <= 0 || totalSteps <= 0}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 transition"
            title="Jump to Start"
          >
            <SkipBack className="h-4 w-4" />
          </button>

          <button
            onClick={onStepBackward}
            disabled={currentStepIndex <= 0 || totalSteps <= 0}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 transition"
            title="Step Backward"
          >
            <FastForward className="h-4 w-4 rotate-180" />
          </button>

          <button
            onClick={onTogglePlay}
            disabled={totalSteps <= 0}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 transition"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={currentStepIndex >= totalSteps - 1 || totalSteps <= 0}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 transition"
            title="Step Forward"
          >
            <FastForward className="h-4 w-4" />
          </button>

          <button
            onClick={() => onStepChange(totalSteps - 1)}
            disabled={currentStepIndex >= totalSteps - 1 || totalSteps <= 0}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 transition"
            title="Jump to End"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 p-1">
          <Gauge className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
          <div className="flex items-center gap-0.5">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold transition ${
                  speed === s
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-amber-400" />
            <span>Comparisons:</span>
            <span className="font-semibold text-slate-200">
              {currentStep?.stats?.comparisons ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-rose-400" />
            <span>Swaps:</span>
            <span className="font-semibold text-slate-200">
              {currentStep?.stats?.swaps ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-400" />
            <span>Operations:</span>
            <span className="font-semibold text-slate-200">
              {currentStep?.stats?.operations ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
