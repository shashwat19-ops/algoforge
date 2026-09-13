"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";
import { PROBLEMS, Problem } from "@/data/problems";
import { useUser } from "@/context/UserContext";
import { runJavaScriptProblem, ProblemRunResult } from "@/lib/executor/problemRunner";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Bookmark,
  Sparkles,
  BookOpen,
  FileCode,
  Terminal,
  ListOrdered,
  Building2,
  Copy,
  Check,
  Pause,
  AlertCircle,
  HelpCircle
} from "lucide-react";

// Dynamically import Monaco Editor to prevent SSR hydration mismatches
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#0d121f] text-slate-500 font-mono text-xs">
      Loading Code Studio...
    </div>
  )
});

export default function ProblemWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const problemId = typeof params?.id === "string" ? params.id : "";

  const problem = useMemo(() => {
    return PROBLEMS.find((p) => p.id === problemId);
  }, [problemId]);

  const {
    solvedProblems,
    submissions,
    isBookmarked,
    toggleBookmark,
    addSubmission,
    getNote,
    saveNote
  } = useUser();

  // Active state tabs
  const [activeLeftTab, setActiveLeftTab] = useState<
    "description" | "editorial" | "submissions" | "hints" | "notes"
  >("description");
  const [activeRightTab, setActiveRightTab] = useState<"testcases" | "results">("testcases");

  // Code editor state
  const [selectedLanguage, setSelectedLanguage] = useState<"javascript" | "python">("javascript");
  const [code, setCode] = useState<string>("");

  // Test cases state
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0);

  // Execution result state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runResult, setRunResult] = useState<ProblemRunResult | null>(null);

  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  // Notes state
  const [notesText, setNotesText] = useState<string>("");
  const [notesSavedStatus, setNotesSavedStatus] = useState<boolean>(false);

  // AI Prompt State
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [aiAnswers, setAiAnswers] = useState<Array<{ q: string; a: string }>>([]);

  // Copied code feedback
  const [copiedSolution, setCopiedSolution] = useState<boolean>(false);

  // Initialize code and notes on problem load
  useEffect(() => {
    if (problem) {
      if (selectedLanguage === "javascript") {
        setCode(problem.starterCode.javascript);
      } else if (selectedLanguage === "python") {
        setCode(problem.starterCode.python);
      }
      setNotesText(getNote(problem.id));
      setRunResult(null);
      setActiveRightTab("testcases");
    }
  }, [problem, selectedLanguage, getNote]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Problem Not Found</h1>
        <p className="text-slate-400 text-sm">
          The requested problem &apos;{problemId}&apos; does not exist in the AlgoForge catalog.
        </p>
        <Link
          href="/problems"
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
        >
          Return to Problems
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(problem.id);
  const isSolved = solvedProblems.has(problem.id);
  const problemSubmissions = submissions.filter((s) => s.problemId === problem.id);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  // Run Code against first 2 sample test cases
  const handleRunCode = () => {
    if (!problem) return;
    setIsRunning(true);
    setActiveRightTab("results");

    setTimeout(() => {
      const sampleCases = problem.testCases.slice(0, 2);
      const result = runJavaScriptProblem(code, problem.functionName, sampleCases);
      setRunResult(result);
      setIsRunning(false);
    }, 150);
  };

  // Submit Code against all comprehensive test cases
  const handleSubmitCode = () => {
    if (!problem) return;
    setIsRunning(true);
    setActiveRightTab("results");

    setTimeout(() => {
      const result = runJavaScriptProblem(code, problem.functionName, problem.testCases);
      setRunResult(result);
      setIsRunning(false);

      // Record submission
      addSubmission({
        problemId: problem.id,
        status: result.status,
        language: selectedLanguage,
        runtimeMs: Math.round(result.runtimeMs),
        memoryKb: result.memoryKb,
        code: code,
        passedCount: result.passedCount,
        totalCount: result.totalCount,
        errorMessage: result.errorMessage
      });

      // Trigger Confetti if Accepted
      if (result.status === "Accepted") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 250);
  };

  // Reset to original starter code
  const handleResetCode = () => {
    if (confirm("Reset editor to original starter template? Any unsaved edits will be cleared.")) {
      if (selectedLanguage === "javascript") {
        setCode(problem.starterCode.javascript);
      } else {
        setCode(problem.starterCode.python);
      }
    }
  };

  // Save Notes handler
  const handleSaveNotes = () => {
    saveNote(problem.id, notesText);
    setNotesSavedStatus(true);
    setTimeout(() => setNotesSavedStatus(false), 2000);
  };

  // Handle AI Socratic Tutor question
  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    let response = "";
    const qLower = aiQuestion.toLowerCase();
    const primaryApproach = problem.editorial.approaches?.[0];
    const timeComp = primaryApproach?.timeComplexity || "O(N)";
    const spaceComp = primaryApproach?.spaceComplexity || "O(1)";
    const patternName = problem.tags?.[0] || problem.category;

    if (qLower.includes("time complexity") || qLower.includes("big o") || qLower.includes("complexity")) {
      response = `For ${problem.title}, the optimal time complexity is ${timeComp} with the ${patternName} approach, and space complexity is ${spaceComp}.`;
    } else if (qLower.includes("hint") || qLower.includes("stuck") || qLower.includes("how to start")) {
      response = `💡 Algorithmic Strategy: Think about the ${patternName} pattern. Notice: ${problem.hints?.[0] || "Break the problem down into smaller sub-problems."}`;
    } else if (qLower.includes("edge case") || qLower.includes("corner case")) {
      response = `Check for: empty arrays/strings, single-element collections, negative values, and duplicate elements.`;
    } else {
      response = `Based on the ${problem.category} category: Consider whether you can store frequencies in a Hash Map or narrow down the search space with two pointers. Check Hint 1 for progressive guidance!`;
    }

    setAiAnswers((prev) => [...prev, { q: aiQuestion, a: response }]);
    setAiQuestion("");
  };

  const copySolutionCode = () => {
    const sol =
      selectedLanguage === "javascript"
        ? problem.solutionCode.javascript
        : problem.solutionCode.python;
    navigator.clipboard.writeText(sol);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0d14] text-slate-100 overflow-hidden select-none">

      {/* TOP WORKSPACE NAVIGATION BAR */}
      <header className="h-14 border-b border-border/80 bg-[#0d121f] px-4 flex items-center justify-between shrink-0">
        {/* Left: Back Link & Problem Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/problems"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Back to Problems"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span>{problem.title}</span>
              {isSolved && (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              )}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                problem.difficulty === "Easy"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : problem.difficulty === "Medium"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Center: Timer & Controls */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-mono text-xs font-bold text-slate-300">
            {formatTime(secondsElapsed)}
          </span>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="text-slate-500 hover:text-slate-300"
            title={timerRunning ? "Pause Timer" : "Resume Timer"}
          >
            {timerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button
            onClick={() => setSecondsElapsed(0)}
            className="text-slate-500 hover:text-slate-300"
            title="Reset Timer"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>

        {/* Right: Actions, Run, Submit */}
        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(problem.id)}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-blue-400 transition-colors"
            title={bookmarked ? "Remove Bookmark" : "Bookmark Problem"}
          >
            <Bookmark
              className={`h-4 w-4 ${
                bookmarked ? "fill-blue-500 text-blue-500" : ""
              }`}
            />
          </button>

          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset Template Code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Run Code */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 disabled:opacity-50 transition-all"
          >
            <Play className="h-3.5 w-3.5 text-blue-400 fill-blue-400/20" />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>

          {/* Submit Code */}
          <button
            onClick={handleSubmitCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 disabled:opacity-50 transition-all"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
            <span>Submit</span>
          </button>
        </div>
      </header>

      {/* MAIN TWO-PANE WORKSPACE BODY */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* LEFT PANE: DESCRIPTION / EDITORIAL / SUBMISSIONS / HINTS / NOTES */}
        <div className="flex flex-col border-r border-border/80 bg-[#0d121f] overflow-hidden">

          {/* Left Tabs Bar */}
          <div className="h-10 border-b border-border/80 bg-[#0b0e17] px-3 flex items-center gap-1 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveLeftTab("description")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeLeftTab === "description"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <FileCode className="h-3.5 w-3.5 text-blue-400" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("editorial")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeLeftTab === "editorial"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              <span>Editorial</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("submissions")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeLeftTab === "submissions"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5 text-emerald-400" />
              <span>Submissions ({problemSubmissions.length})</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("hints")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeLeftTab === "hints"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>AI Coach & Hints</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("notes")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeLeftTab === "notes"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span>Notes</span>
            </button>
          </div>

          {/* Left Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-sm select-text">

            {/* TAB 1: DESCRIPTION */}
            {activeLeftTab === "description" && (
              <div className="space-y-6">
                {/* Header info */}
                <div className="space-y-2">
                  <h1 className="text-xl font-bold text-white">
                    {problem.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full ${
                        problem.difficulty === "Easy"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : problem.difficulty === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {problem.category}
                    </span>
                    {problem.tags && problem.tags.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                        Pattern: {problem.tags[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Problem Description text */}
                <div className="leading-relaxed whitespace-pre-line text-slate-200 text-sm">
                  {problem.description}
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Examples
                  </h3>

                  {problem.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2 font-mono text-xs"
                    >
                      <div className="font-bold text-slate-400 text-[11px] uppercase">
                        Example {idx + 1}:
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500 font-semibold">Input: </span>
                        {example.input}
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500 font-semibold">Output: </span>
                        <span className="text-emerald-400 font-bold">{example.output}</span>
                      </div>
                      {example.explanation && (
                        <div className="text-slate-400 font-sans text-xs pt-1 border-t border-slate-800/80">
                          <span className="font-semibold text-slate-500">Explanation: </span>
                          {example.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Constraints
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-slate-300">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Company Tags */}
                {problem.companies && problem.companies.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>Asked at Top Companies</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.companies.map((company, idx) => (
                        <Link
                          key={idx}
                          href={`/companies`}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                        >
                          {company}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDITORIAL */}
            {activeLeftTab === "editorial" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Official Solution Editorial
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {problem.editorial.overview}
                  </p>
                </div>

                {problem.editorial.approaches.map((approach, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-white">
                      {approach.name}
                    </h3>

                    {/* Big-O Badges */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-0.5">
                        <span className="text-[11px] font-bold text-blue-400 uppercase">
                          Time Complexity
                        </span>
                        <div className="font-mono font-bold text-sm text-white">
                          {approach.timeComplexity}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-0.5">
                        <span className="text-[11px] font-bold text-purple-400 uppercase">
                          Space Complexity
                        </span>
                        <div className="font-mono font-bold text-sm text-white">
                          {approach.spaceComplexity}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 leading-relaxed text-xs text-slate-300 whitespace-pre-line">
                      {approach.explanation}
                    </div>

                    {/* Approach Code */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-slate-400">Implementation</div>
                      <pre className="p-3 rounded-xl bg-[#080c14] border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                        {approach.code}
                      </pre>
                    </div>
                  </div>
                ))}

                {/* Reference Code in Solution */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Complete Solution ({selectedLanguage === "javascript" ? "JavaScript" : "Python"})
                    </span>
                    <button
                      onClick={copySolutionCode}
                      className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                    >
                      {copiedSolution ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                    {selectedLanguage === "javascript"
                      ? problem.solutionCode.javascript
                      : problem.solutionCode.python}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 3: SUBMISSIONS */}
            {activeLeftTab === "submissions" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">
                  Your Submission History
                </h3>

                {problemSubmissions.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 space-y-2">
                    <ListOrdered className="h-8 w-8 mx-auto text-slate-600" />
                    <p className="text-xs">No submissions yet for this problem.</p>
                    <p className="text-[11px] text-slate-600">
                      Click &apos;Submit&apos; above to run against all test cases.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {problemSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {sub.status === "Accepted" ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <div>
                            <div
                              className={`text-xs font-bold ${
                                sub.status === "Accepted"
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {sub.status}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {new Date(sub.timestamp).toLocaleTimeString()} • {sub.language}
                            </div>
                          </div>
                        </div>

                        <div className="text-right text-xs font-mono">
                          <div className="text-slate-200">{sub.runtimeMs} ms</div>
                          <div className="text-[10px] text-slate-500">
                            {sub.passedCount} / {sub.totalCount} passed
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: HINTS & AI COACH */}
            {activeLeftTab === "hints" && (
              <div className="space-y-6">
                {/* Progressive Hints */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    Progressive Hints
                  </span>
                  {problem.hints.map((hint, idx) => (
                    <details
                      key={idx}
                      className="group p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
                    >
                      <summary className="font-semibold text-xs text-slate-300 group-open:text-purple-400 transition-colors">
                        Hint {idx + 1} (Click to reveal)
                      </summary>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2">
                        {hint}
                      </p>
                    </details>
                  ))}
                </div>

                {/* Socratic AI Coach */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-950/20 to-slate-900 border border-purple-500/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Socratic AI Algorithm Assistant
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Stuck on an edge case or need time complexity insights? Ask a question without spoiling the full solution.
                  </p>

                  {/* Previous QA */}
                  {aiAnswers.length > 0 && (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {aiAnswers.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                          <div className="font-semibold text-purple-300">Q: {item.q}</div>
                          <div className="text-slate-300">{item.a}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={handleAskAI} className="flex gap-2">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="e.g. What is the optimal time complexity?"
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
                    >
                      Ask
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 5: NOTES */}
            {activeLeftTab === "notes" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Private Problem Notes
                  </h3>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                  >
                    {notesSavedStatus ? "Saved!" : "Save Notes"}
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Write down your key learnings, edge cases to remember, or alternative approaches. Saved locally.
                </p>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Key insights:&#10;- Beware of empty input array&#10;- Two pointers gives O(N) instead of O(N^2)"
                  className="w-full h-64 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANE: CODE EDITOR (TOP) & TEST CONSOLE (BOTTOM) */}
        <div className="flex flex-col h-full bg-[#090d16] overflow-hidden">

          {/* Code Editor Header */}
          <div className="h-10 border-b border-border/80 bg-[#0b0e17] px-4 flex items-center justify-between shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as "javascript" | "python")}
                className="bg-slate-800 border border-slate-700 rounded-md px-2 py-0.5 text-xs font-semibold text-blue-400 focus:outline-none"
              >
                <option value="javascript">JavaScript (ES6)</option>
                <option value="python">Python 3 (Preview)</option>
              </select>
            </div>

            <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Sandboxed Engine
            </div>
          </div>

          {/* Monaco Editor Container (60% height) */}
          <div className="flex-1 min-h-[300px] overflow-hidden bg-[#0d121f]">
            <MonacoEditor
              height="100%"
              language={selectedLanguage === "python" ? "python" : "javascript"}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 13,
                fontFamily: "var(--font-mono), Menlo, Monaco, Consolas, monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                roundedSelection: true,
                automaticLayout: true,
                tabSize: 2,
                padding: { top: 12, bottom: 12 }
              }}
            />
          </div>

          {/* BOTTOM TEST CONSOLE (40% height) */}
          <div className="h-[260px] border-t border-border/80 bg-[#0b0e17] flex flex-col shrink-0">

            {/* Test Console Tabs */}
            <div className="h-9 border-b border-border/80 bg-[#090d16] px-3 flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveRightTab("testcases")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeRightTab === "testcases"
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>Test Cases</span>
              </button>

              <button
                onClick={() => setActiveRightTab("results")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeRightTab === "results"
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>Test Result</span>
                {runResult && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      runResult.status === "Accepted"
                        ? "bg-emerald-400"
                        : "bg-red-400"
                    }`}
                  />
                )}
              </button>
            </div>

            {/* Test Console Body */}
            <div className="flex-1 overflow-y-auto p-4 select-text">

              {/* TESTCASES TAB */}
              {activeRightTab === "testcases" && (
                <div className="space-y-3">
                  {/* Case buttons */}
                  <div className="flex items-center gap-2">
                    {problem.testCases.map((tc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTestCaseIdx(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          selectedTestCaseIdx === idx
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Selected Case inputs */}
                  {problem.testCases[selectedTestCaseIdx] && (
                    <div className="space-y-2 font-mono text-xs">
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase mb-1">
                          Inputs:
                        </div>
                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                          {problem.testCases[selectedTestCaseIdx].displayInput || JSON.stringify(problem.testCases[selectedTestCaseIdx].input)}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase mb-1">
                          Expected Output:
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                          {problem.testCases[selectedTestCaseIdx].displayExpected || JSON.stringify(problem.testCases[selectedTestCaseIdx].expected)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* RESULTS TAB */}
              {activeRightTab === "results" && (
                <div>
                  {!runResult ? (
                    <div className="py-8 text-center text-slate-500 text-xs">
                      Click &apos;Run&apos; to test with sample inputs or &apos;Submit&apos; to evaluate the full test suite.
                    </div>
                  ) : (
                    <div className="space-y-3 font-mono text-xs">
                      {/* Overall Verdict Banner */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="flex items-center gap-2">
                          {runResult.status === "Accepted" ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <span
                            className={`text-sm font-bold ${
                              runResult.status === "Accepted"
                                ? "text-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {runResult.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-slate-400 text-xs">
                          <span>Runtime: <span className="text-white font-bold">{Math.round(runResult.runtimeMs)} ms</span></span>
                          <span>Passed: <span className="text-white font-bold">{runResult.passedCount}/{runResult.totalCount}</span></span>
                        </div>
                      </div>

                      {/* Error Message if any */}
                      {runResult.errorMessage && (
                        <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/60 text-red-300 text-xs">
                          {runResult.errorMessage}
                        </div>
                      )}

                      {/* Details of individual test case results */}
                      <div className="space-y-2">
                        {runResult.results.map((tc, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                              tc.passed
                                ? "bg-emerald-950/15 border-emerald-900/40"
                                : "bg-red-950/20 border-red-900/50"
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span className={tc.passed ? "text-emerald-400" : "text-red-400"}>
                                Case {idx + 1}: {tc.passed ? "Passed" : "Failed"}
                              </span>
                              <span className="text-[10px] text-slate-500">{tc.executionTimeMs.toFixed(1)} ms</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                              <div>
                                <span className="text-slate-500">Output: </span>
                                <span className={tc.passed ? "text-emerald-300" : "text-red-300 font-bold"}>
                                  {tc.actual}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500">Expected: </span>
                                <span className="text-emerald-400">
                                  {tc.expected}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Console Logs if any */}
                      {runResult.stdout && runResult.stdout.length > 0 && (
                        <div className="space-y-1 pt-2">
                          <div className="text-[10px] text-slate-500 font-semibold uppercase">
                            Console Logs:
                          </div>
                          <div className="p-2 rounded-lg bg-slate-950 text-slate-400 font-mono text-[11px] whitespace-pre-wrap">
                            {runResult.stdout.join("\n")}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
