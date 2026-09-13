"use client";

import React from "react";
import { Terminal, Trash2 } from "lucide-react";

interface ConsoleLogsProps {
  logs: string[];
  onClear?: () => void;
  error?: string;
  executionTime?: number;
}

export const ConsoleLogs: React.FC<ConsoleLogsProps> = ({
  logs,
  onClear,
  error,
  executionTime,
}) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-indigo-400" />
          <span>Execution Output & Diagnostics</span>
          {executionTime !== undefined && (
            <span className="text-[11px] text-slate-500">
              ({executionTime.toFixed(2)}ms runtime)
            </span>
          )}
        </div>
        {onClear && logs.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200"
            title="Clear Console"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 font-mono text-xs text-slate-300 space-y-1 select-text">
        {error && (
          <div className="rounded border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400">
            [Runtime Error]: {error}
          </div>
        )}

        {logs.length === 0 && !error && (
          <div className="text-slate-500 italic">No output. Execution logs will appear here.</div>
        )}

        {logs.map((log, index) => (
          <div key={index} className="leading-relaxed">
            <span className="text-indigo-500 mr-2">›</span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
