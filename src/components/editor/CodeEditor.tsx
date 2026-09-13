"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Code2, Play, RefreshCw, Copy, Check } from "lucide-react";

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#1e1e1e] text-slate-400 font-mono text-sm">
      <RefreshCw className="mr-2 h-4 w-4 animate-spin text-indigo-400" />
      Loading Monaco Code Engine...
    </div>
  ),
});

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  isExecuting?: boolean;
  language?: string;
  theme?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onExecute,
  isExecuting = false,
  language = "javascript",
  theme = "vs-dark",
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#1e1e1e] shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#18181b] px-4 py-2.5">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 text-xs font-medium text-slate-400 font-mono flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-indigo-400" />
            algorithm.js
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={onExecute}
            disabled={isExecuting}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 transition"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{isExecuting ? "Executing..." : "Compile & Run"}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 min-h-[350px]">
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={(val) => onChange(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
            tabSize: 2,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
};
