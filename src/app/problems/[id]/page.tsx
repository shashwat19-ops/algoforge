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
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Tag,
  Maximize2
} from "lucide-react";

// Dynamically import Monaco Editor to prevent SSR hydration mismatches
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#1e1e1e] text-[#8a8a8a] font-mono text-xs">
      Loading Monaco Code Studio...
    </div>
  )
});

export default function ProblemWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const problemId = typeof params?.id === "string" ? params.id : "";

  const problemIndex = useMemo(() => {
    return PROBLEMS.findIndex((p) => p.id === problemId);
  }, [problemId]);

  const problem = useMemo(() => {
    return PROBLEMS[problemIndex] || null;
  }, [problemIndex]);

  const prevProblem = problemIndex > 0 ? PROBLEMS[problemIndex - 1] : null;
  const nextProblem = problemIndex < PROBLEMS.length - 1 ? PROBLEMS[problemIndex + 1] : null;

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
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Problem Not Found</h1>
        <p className="text-[#a0a0a0] text-sm">
          The requested problem &apos;{problemId}&apos; does not exist in the catalog.
        </p>
        <Link
          href="/problems"
          className="px-4 py-2 rounded-lg bg-[#FFA116] hover:bg-[#e08f14] text-[#1a1a1a] text-xs font-bold transition-colors"
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

  // Run Code against sample test cases
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

  // Submit Code against all test cases
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
    if (confirm("Reset editor to default template? Any unsaved edits will be cleared.")) {
      if (selectedLanguage === "javascript") {
        setCode(problem.starterCode.javascript);
      } else {
        setCode(problem.starterCode.python);
      }
    }
  };

  // Save notes locally
  const handleSaveNotes = () => {
    saveNote(problem.id, notesText);
    setNotesSavedStatus(true);
    setTimeout(() => setNotesSavedStatus(false), 2000);
  };

  // Copy solution code
  const copySolutionCode = () => {
    const sol =
      selectedLanguage === "javascript"
        ? problem.solutionCode.javascript
        : problem.solutionCode.python;
    navigator.clipboard.writeText(sol);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  // Handle AI question
  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const q = aiQuestion;
    setAiQuestion("");

    // Socratic response logic
    let ans = `For ${problem.title}, consider the state invariants. What data structure gives optimal lookup for this constraint?`;
    if (q.toLowerCase().includes("complexity") || q.toLowerCase().includes("time")) {
      ans = `The optimal time complexity is ${problem.editorial.approaches[0]?.timeComplexity || "O(N)"}. Can you achieve this without nested loops?`;
    } else if (q.toLowerCase().includes("space")) {
      ans = `The optimal space complexity is ${problem.editorial.approaches[0]?.spaceComplexity || "O(1)"}.`;
    } else if (q.toLowerCase().includes("hint") || q.toLowerCase().includes("edge")) {
      ans = problem.hints[0] || "Consider boundary conditions like single-element arrays and duplicate elements.";
    }

    setAiAnswers((prev) => [...prev, { q, a: ans }]);
  };

  // Pick Random Question
  const handlePickRandom = () => {
    const unsolved = PROBLEMS.filter((p) => !solvedProblems.has(p.id));
    const pool = unsolved.length > 0 ? unsolved : PROBLEMS;
    const randomProblem = pool[Math.floor(Math.random() * pool.length)];
    if (randomProblem) {
      router.push(`/problems/${randomProblem.id}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-[#eff1f6] overflow-hidden select-none">

      {/* TOP LEETCODE WORKSPACE NAVIGATION BAR */}
      <header className="h-12 border-b border-[#383838] bg-[#282828] px-4 flex items-center justify-between shrink-0">
        {/* Left: Problem List Navigation & Prev/Next */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/problems"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-xs font-semibold text-[#eff1f6] transition-colors"
            title="Problem List"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#a0a0a0]" />
            <span className="hidden sm:inline">Problem List</span>
          </Link>

          {/* Prev problem */}
          {prevProblem && (
            <Link
              href={`/problems/${prevProblem.id}`}
              className="p-1 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-[#a0a0a0] hover:text-white transition-colors"
              title={`Previous: ${prevProblem.title}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          )}

          {/* Next problem */}
          {nextProblem && (
            <Link
              href={`/problems/${nextProblem.id}`}
              className="p-1 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-[#a0a0a0] hover:text-white transition-colors"
              title={`Next: ${nextProblem.title}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}

          {/* Pick Random */}
          <button
            onClick={handlePickRandom}
            className="hidden md:flex p-1 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-[#FFA116] transition-colors"
            title="Pick a random problem"
          >
            <Shuffle className="h-4 w-4" />
          </button>

          {/* Problem Number & Title */}
          <div className="flex items-center gap-2 pl-1 truncate">
            <span className="font-semibold text-xs sm:text-sm text-white flex items-center gap-1.5 truncate">
              <span className="font-mono text-[#a0a0a0]">{problem.number}.</span>
              <span className="truncate">{problem.title}</span>
              {isSolved && (
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00b8a3] shrink-0" />
              )}
            </span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                problem.difficulty === "Easy"
                  ? "bg-[#00b8a3]/20 text-[#00b8a3]"
                  : problem.difficulty === "Medium"
                  ? "bg-[#ffc01e]/20 text-[#ffc01e]"
                  : "bg-[#ff375f]/20 text-[#ff375f]"
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Center: Practice Timer */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#1a1a1a] border border-[#383838]">
          <Clock className="h-3.5 w-3.5 text-[#8a8a8a]" />
          <span className="font-mono text-xs font-bold text-[#eff1f6]">
            {formatTime(secondsElapsed)}
          </span>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="text-[#8a8a8a] hover:text-white p-0.5"
            title={timerRunning ? "Pause Timer" : "Resume Timer"}
          >
            {timerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button
            onClick={() => setSecondsElapsed(0)}
            className="text-[#8a8a8a] hover:text-white p-0.5"
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
            className="p-1.5 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-[#8a8a8a] hover:text-[#FFA116] transition-colors"
            title={bookmarked ? "Remove Bookmark" : "Bookmark Problem"}
          >
            <Bookmark
              className={`h-3.5 w-3.5 ${
                bookmarked ? "fill-[#FFA116] text-[#FFA116]" : ""
              }`}
            />
          </button>

          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            className="p-1.5 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-[#8a8a8a] hover:text-white transition-colors"
            title="Reset to starter template"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Run Code */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-[#eff1f6] text-xs font-semibold border border-[#404040] disabled:opacity-50 transition-all"
            title="Run code against sample test cases"
          >
            <Play className="h-3 w-3 text-[#FFA116] fill-[#FFA116]" />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>

          {/* Submit Code */}
          <button
            onClick={handleSubmitCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-[#2cbb5d] hover:bg-[#27a853] text-white text-xs font-bold shadow-sm disabled:opacity-50 transition-all"
            title="Submit code for full evaluation"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
            <span>Submit</span>
          </button>
        </div>
      </header>

      {/* MAIN TWO-PANE SPLIT WORKSPACE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden gap-1 p-1 bg-[#1a1a1a]">

        {/* LEFT PANE: TABS & CONTENT (5.5 COLS) */}
        <div className="lg:col-span-5 flex flex-col rounded-lg bg-[#282828] border border-[#383838] overflow-hidden">

          {/* Left Tabs Header */}
          <div className="h-9 border-b border-[#383838] bg-[#242424] px-2 flex items-center gap-1 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveLeftTab("description")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                activeLeftTab === "description"
                  ? "bg-[#333333] text-white font-semibold"
                  : "text-[#a0a0a0] hover:text-white hover:bg-[#2c2c2c]"
              }`}
            >
              <FileCode className="h-3.5 w-3.5 text-[#FFA116]" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("editorial")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                activeLeftTab === "editorial"
                  ? "bg-[#333333] text-white font-semibold"
                  : "text-[#a0a0a0] hover:text-white hover:bg-[#2c2c2c]"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-[#00b8a3]" />
              <span>Editorial</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("submissions")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                activeLeftTab === "submissions"
                  ? "bg-[#333333] text-white font-semibold"
                  : "text-[#a0a0a0] hover:text-white hover:bg-[#2c2c2c]"
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5 text-[#2cbb5d]" />
              <span>Submissions ({problemSubmissions.length})</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("hints")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                activeLeftTab === "hints"
                  ? "bg-[#333333] text-white font-semibold"
                  : "text-[#a0a0a0] hover:text-white hover:bg-[#2c2c2c]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#a855f7]" />
              <span>AI Coach & Hints</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("notes")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                activeLeftTab === "notes"
                  ? "bg-[#333333] text-white font-semibold"
                  : "text-[#a0a0a0] hover:text-white hover:bg-[#2c2c2c]"
              }`}
            >
              <Terminal className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span>Notes</span>
            </button>
          </div>

          {/* Left Tab Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-[#eff1f6] text-xs select-text">

            {/* TAB 1: DESCRIPTION */}
            {activeLeftTab === "description" && (
              <div className="space-y-6">
                {/* Title & Metadata Header */}
                <div className="space-y-2">
                  <h1 className="text-lg font-bold text-white">
                    {problem.number}. {problem.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full ${
                        problem.difficulty === "Easy"
                          ? "bg-[#00b8a3]/20 text-[#00b8a3]"
                          : problem.difficulty === "Medium"
                          ? "bg-[#ffc01e]/20 text-[#ffc01e]"
                          : "bg-[#ff375f]/20 text-[#ff375f]"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#333333] text-[#a0a0a0]">
                      {problem.category}
                    </span>
                    {problem.tags && problem.tags.length > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-[#333333] text-[#a0a0a0]">
                        Tag: {problem.tags[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Problem Description text */}
                <div className="leading-relaxed whitespace-pre-line text-[#eff1f6] text-xs space-y-3 font-sans">
                  {problem.description}
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#a0a0a0]">
                    Examples
                  </h3>

                  {problem.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-[#1e1e1e] border border-[#383838] space-y-2 font-mono text-xs"
                    >
                      <div className="font-bold text-[#8a8a8a] text-[11px]">
                        Example {idx + 1}:
                      </div>
                      <div className="text-[#eff1f6]">
                        <span className="text-[#8a8a8a] font-semibold">Input: </span>
                        {example.input}
                      </div>
                      <div className="text-[#eff1f6]">
                        <span className="text-[#8a8a8a] font-semibold">Output: </span>
                        <span className="text-[#00b8a3] font-bold">{example.output}</span>
                      </div>
                      {example.explanation && (
                        <div className="text-[#a0a0a0] font-sans text-xs pt-1 border-t border-[#2e2e2e]">
                          <span className="font-semibold text-[#8a8a8a]">Explanation: </span>
                          {example.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#a0a0a0]">
                    Constraints
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-[#eff1f6]">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Company Tags */}
                {problem.companies && problem.companies.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-[#383838]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFA116]">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>Asked at Top Tech Companies (Unlocked)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.companies.map((company, idx) => (
                        <Link
                          key={idx}
                          href="/companies"
                          className="px-2 py-0.5 rounded bg-[#333333] hover:bg-[#3e3e3e] text-[#eff1f6] text-[11px] font-medium border border-[#404040] transition-colors"
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
                  <span className="text-xs font-bold text-[#FFA116] uppercase tracking-wider">
                    Official Solution Editorial
                  </span>
                  <p className="text-xs text-[#eff1f6] leading-relaxed">
                    {problem.editorial.overview}
                  </p>
                </div>

                {problem.editorial.approaches.map((approach, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] space-y-3">
                    <h3 className="text-sm font-bold text-white">
                      {approach.name}
                    </h3>

                    {/* Big-O Badges */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded bg-[#282828] border border-[#383838] space-y-0.5">
                        <span className="text-[10px] font-bold text-[#FFA116] uppercase">
                          Time Complexity
                        </span>
                        <div className="font-mono font-bold text-xs text-white">
                          {approach.timeComplexity}
                        </div>
                      </div>
                      <div className="p-2.5 rounded bg-[#282828] border border-[#383838] space-y-0.5">
                        <span className="text-[10px] font-bold text-[#a855f7] uppercase">
                          Space Complexity
                        </span>
                        <div className="font-mono font-bold text-xs text-white">
                          {approach.spaceComplexity}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-2.5 rounded bg-[#282828] border border-[#383838] leading-relaxed text-xs text-[#eff1f6] whitespace-pre-line">
                      {approach.explanation}
                    </div>

                    {/* Approach Code */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-[#8a8a8a]">Implementation</div>
                      <pre className="p-3 rounded bg-[#161616] border border-[#383838] text-xs font-mono text-[#2cbb5d] overflow-x-auto">
                        {approach.code}
                      </pre>
                    </div>
                  </div>
                ))}

                {/* Reference Code in Solution */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#a0a0a0] uppercase">
                      Complete Solution ({selectedLanguage === "javascript" ? "JavaScript" : "Python"})
                    </span>
                    <button
                      onClick={copySolutionCode}
                      className="flex items-center gap-1 text-xs text-[#FFA116] hover:underline"
                    >
                      {copiedSolution ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#00b8a3]" />
                          <span className="text-[#00b8a3]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-[#161616] border border-[#383838] text-xs font-mono text-[#2cbb5d] overflow-x-auto">
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
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#a0a0a0]">
                  Submission History
                </h3>

                {problemSubmissions.length === 0 ? (
                  <div className="py-12 text-center text-[#8a8a8a] space-y-2">
                    <ListOrdered className="h-8 w-8 mx-auto text-[#555555]" />
                    <p className="text-xs font-medium">No submissions yet for this problem.</p>
                    <p className="text-[11px] text-[#666666]">
                      Click &apos;Submit&apos; above to run against all test cases.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {problemSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          {sub.status === "Accepted" ? (
                            <CheckCircle2 className="h-4 w-4 text-[#2cbb5d]" />
                          ) : (
                            <XCircle className="h-4 w-4 text-[#ff375f]" />
                          )}
                          <div>
                            <div
                              className={`text-xs font-bold ${
                                sub.status === "Accepted"
                                  ? "text-[#2cbb5d]"
                                  : "text-[#ff375f]"
                              }`}
                            >
                              {sub.status}
                            </div>
                            <div className="text-[10px] text-[#8a8a8a]">
                              {new Date(sub.timestamp).toLocaleTimeString()} • {sub.language}
                            </div>
                          </div>
                        </div>

                        <div className="text-right text-xs font-mono">
                          <div className="text-white font-semibold">{sub.runtimeMs} ms</div>
                          <div className="text-[10px] text-[#8a8a8a]">
                            {sub.passedCount} / {sub.totalCount} passed
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: HINTS & SOCRATIC AI COACH */}
            {activeLeftTab === "hints" && (
              <div className="space-y-6">
                {/* Progressive Hints */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">
                    Progressive Hints
                  </span>
                  {problem.hints.map((hint, idx) => (
                    <details
                      key={idx}
                      className="group p-3 rounded-lg bg-[#1e1e1e] border border-[#383838] cursor-pointer"
                    >
                      <summary className="font-semibold text-xs text-[#eff1f6] group-open:text-[#FFA116] transition-colors">
                        Hint {idx + 1} (Click to reveal)
                      </summary>
                      <p className="mt-2 text-xs text-[#a0a0a0] leading-relaxed border-t border-[#2e2e2e] pt-2">
                        {hint}
                      </p>
                    </details>
                  ))}
                </div>

                {/* Socratic AI Coach */}
                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#a855f7]/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#a855f7]" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Socratic AI Algorithm Assistant
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#8a8a8a]">
                    Ask clarifying questions, optimal complexity clues, or edge case guidance without spoiling the full solution.
                  </p>

                  {/* Previous QA */}
                  {aiAnswers.length > 0 && (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {aiAnswers.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded bg-[#282828] border border-[#383838] text-xs space-y-1">
                          <div className="font-semibold text-[#a855f7]">Q: {item.q}</div>
                          <div className="text-[#eff1f6]">{item.a}</div>
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
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#282828] border border-[#383838] text-xs text-white placeholder-[#8a8a8a] focus:outline-none focus:border-[#a855f7]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#a855f7] hover:bg-[#9333ea] text-white text-xs font-bold transition-colors"
                    >
                      Ask
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 5: NOTES */}
            {activeLeftTab === "notes" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#a0a0a0]">
                    Private Problem Notes
                  </h3>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1 rounded bg-[#FFA116] hover:bg-[#e08f14] text-[#1a1a1a] text-xs font-bold transition-colors"
                  >
                    {notesSavedStatus ? "Saved!" : "Save Notes"}
                  </button>
                </div>
                <p className="text-[11px] text-[#8a8a8a]">
                  Saved locally in your browser storage.
                </p>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Key insights:&#10;- Two pointers gives O(N) time&#10;- Beware of negative index numbers"
                  className="w-full h-64 p-3 rounded-lg bg-[#1e1e1e] border border-[#383838] text-xs font-mono text-[#eff1f6] placeholder-[#666666] focus:outline-none focus:border-[#FFA116]"
                />
              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANE: CODE EDITOR (TOP) & TEST CONSOLE (BOTTOM) (7 COLS) */}
        <div className="lg:col-span-7 flex flex-col rounded-lg bg-[#282828] border border-[#383838] overflow-hidden">

          {/* Code Editor Header */}
          <div className="h-9 border-b border-[#383838] bg-[#242424] px-3 flex items-center justify-between shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#8a8a8a] uppercase">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as "javascript" | "python")}
                className="bg-[#1e1e1e] border border-[#383838] rounded px-2 py-0.5 text-xs font-semibold text-[#FFA116] focus:outline-none"
              >
                <option value="javascript">JavaScript (ES6)</option>
                <option value="python">Python 3 (Preview)</option>
              </select>
            </div>

            <div className="text-[11px] text-[#00b8a3] font-mono flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00b8a3]"></span>
              Sandboxed In-Browser Execution
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[320px] overflow-hidden bg-[#1e1e1e]">
            <MonacoEditor
              height="100%"
              language={selectedLanguage === "python" ? "python" : "javascript"}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 13,
                fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                roundedSelection: true,
                automaticLayout: true,
                tabSize: 2,
                padding: { top: 10, bottom: 10 }
              }}
            />
          </div>

          {/* BOTTOM TEST CONSOLE DRAWER */}
          <div className="h-[250px] border-t border-[#383838] bg-[#242424] flex flex-col shrink-0">

            {/* Test Console Header Tabs */}
            <div className="h-8 border-b border-[#383838] bg-[#1e1e1e] px-3 flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveRightTab("testcases")}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                  activeRightTab === "testcases"
                    ? "bg-[#333333] text-white"
                    : "text-[#8a8a8a] hover:text-white"
                }`}
              >
                <span>Testcase</span>
              </button>

              <button
                onClick={() => setActiveRightTab("results")}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                  activeRightTab === "results"
                    ? "bg-[#333333] text-white"
                    : "text-[#8a8a8a] hover:text-white"
                }`}
              >
                <span>Test Result</span>
                {runResult && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      runResult.status === "Accepted"
                        ? "bg-[#2cbb5d]"
                        : "bg-[#ff375f]"
                    }`}
                  />
                )}
              </button>
            </div>

            {/* Test Console Content Body */}
            <div className="flex-1 overflow-y-auto p-4 select-text bg-[#242424]">

              {/* TESTCASES TAB */}
              {activeRightTab === "testcases" && (
                <div className="space-y-3">
                  {/* Case buttons */}
                  <div className="flex items-center gap-1.5">
                    {problem.testCases.map((tc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTestCaseIdx(idx)}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                          selectedTestCaseIdx === idx
                            ? "bg-[#333333] text-white border border-[#404040]"
                            : "bg-[#1e1e1e] text-[#8a8a8a] hover:text-white"
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
                        <div className="text-[10px] text-[#8a8a8a] font-semibold uppercase mb-1">
                          Input:
                        </div>
                        <div className="p-2.5 rounded bg-[#1e1e1e] border border-[#383838] text-[#eff1f6]">
                          {problem.testCases[selectedTestCaseIdx].displayInput || JSON.stringify(problem.testCases[selectedTestCaseIdx].input)}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-[#8a8a8a] font-semibold uppercase mb-1">
                          Expected Output:
                        </div>
                        <div className="p-2 rounded bg-[#1e1e1e] border border-[#383838] text-[#00b8a3] font-bold">
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
                    <div className="py-8 text-center text-[#8a8a8a] text-xs">
                      Click &apos;Run&apos; to test with sample inputs or &apos;Submit&apos; to evaluate the full test suite.
                    </div>
                  ) : (
                    <div className="space-y-3 font-mono text-xs">
                      {/* Overall Verdict Banner */}
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1e1e1e] border border-[#383838]">
                        <div className="flex items-center gap-2">
                          {runResult.status === "Accepted" ? (
                            <CheckCircle2 className="h-4 w-4 text-[#2cbb5d]" />
                          ) : (
                            <XCircle className="h-4 w-4 text-[#ff375f]" />
                          )}
                          <span
                            className={`text-xs font-bold ${
                              runResult.status === "Accepted"
                                ? "text-[#2cbb5d]"
                                : "text-[#ff375f]"
                            }`}
                          >
                            {runResult.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-[#8a8a8a] text-xs">
                          <span>Runtime: <span className="text-white font-bold">{Math.round(runResult.runtimeMs)} ms</span></span>
                          <span>Passed: <span className="text-white font-bold">{runResult.passedCount}/{runResult.totalCount}</span></span>
                        </div>
                      </div>

                      {/* Error Message if any */}
                      {runResult.errorMessage && (
                        <div className="p-2.5 rounded bg-[#331118] border border-[#551922] text-[#ff375f] text-xs">
                          {runResult.errorMessage}
                        </div>
                      )}

                      {/* Individual Test Cases Results */}
                      <div className="space-y-2">
                        {runResult.results.map((tc, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded border text-xs space-y-1 ${
                              tc.passed
                                ? "bg-[#1e1e1e] border-[#383838]"
                                : "bg-[#2d1a20] border-[#551922]"
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span className={tc.passed ? "text-[#2cbb5d]" : "text-[#ff375f]"}>
                                Case {idx + 1}: {tc.passed ? "Passed" : "Failed"}
                              </span>
                              <span className="text-[10px] text-[#8a8a8a]">{tc.executionTimeMs.toFixed(1)} ms</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                              <div>
                                <span className="text-[#8a8a8a]">Output: </span>
                                <span className={tc.passed ? "text-[#00b8a3]" : "text-[#ff375f] font-bold"}>
                                  {tc.actual}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#8a8a8a]">Expected: </span>
                                <span className="text-[#00b8a3]">
                                  {tc.expected}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Console Logs */}
                      {runResult.stdout && runResult.stdout.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <div className="text-[10px] text-[#8a8a8a] font-semibold uppercase">
                            Stdout / Logs:
                          </div>
                          <div className="p-2 rounded bg-[#161616] text-[#8a8a8a] font-mono text-[11px] whitespace-pre-wrap">
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
