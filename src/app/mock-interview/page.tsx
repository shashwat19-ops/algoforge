"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROBLEMS, Problem } from "@/data/problems";
import { COMPANIES } from "@/data/companies";
import { ROLES } from "@/data/roles";
import { runJavaScriptProblem, ProblemRunResult } from "@/lib/executor/problemRunner";
import { useUser } from "@/context/UserContext";
import {
  Sparkles,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Award,
  Send,
  Bot,
  User,
  HelpCircle,
  Flame,
  ArrowRight,
  Terminal,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#1e1e1e] flex items-center justify-center text-[#8a8a8a] font-mono text-xs">
      Loading Sandboxed Monaco Engine...
    </div>
  )
});

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export default function MockInterviewPage() {
  const { markSolved } = useUser();

  // Setup state
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("Google");
  const [selectedRole, setSelectedRole] = useState("Fullstack Engineer");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium");

  // Active problem
  const [problem, setProblem] = useState<Problem>(PROBLEMS[0]);
  const [userCode, setUserCode] = useState<string>("");

  // Timer: 45 minutes = 2700 seconds
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Execution result
  const [runResult, setRunResult] = useState<ProblemRunResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Final scorecard
  const [scorecard, setScorecard] = useState<{
    verdict: "Strong Hire" | "Hire" | "Leaning Hire" | "Needs Practice";
    problemSolving: number;
    complexity: number;
    codeQuality: number;
    communication: number;
    feedback: string;
  } | null>(null);

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleFinishInterview();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartInterview = () => {
    // Pick suitable problem matching difficulty if possible
    const candidates = PROBLEMS.filter((p) => p.difficulty === selectedDifficulty);
    const chosen = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];

    setProblem(chosen);
    setUserCode(chosen.starterCode.javascript);
    setTimeLeft(45 * 60);
    setTimerActive(true);
    setInterviewStarted(true);
    setInterviewFinished(false);
    setScorecard(null);
    setRunResult(null);

    // Initial greeting from AI interviewer
    setMessages([
      {
        id: "1",
        sender: "ai",
        text: `Hello! I'm your Senior Technical Interviewer for today's ${selectedCompany} ${selectedRole} assessment. We have 45 minutes to solve an algorithmic challenge. Please take a minute to read the problem statement, think out loud about your approach, edge cases, and time/space complexity before diving into coding!`,
        timestamp: "Just now"
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage.trim(),
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsAiTyping(true);

    // Contextual AI interviewer response
    setTimeout(() => {
      let reply = "";
      const lower = userMsg.text.toLowerCase();

      if (lower.includes("approach") || lower.includes("hash") || lower.includes("two pointer") || lower.includes("dp")) {
        reply = `That's a solid intuition! Could you walk me through the time complexity and space complexity of that approach? Also, how would you handle empty or single-element inputs?`;
      } else if (lower.includes("complexity") || lower.includes("o(n)") || lower.includes("o(1)")) {
        reply = `Great analysis. That meets our optimal constraints. Feel free to implement the solution in the code editor on the right!`;
      } else if (lower.includes("hint") || lower.includes("stuck") || lower.includes("help")) {
        reply = `Hint: Consider ${problem.hints[0] || "using a hash map to store frequencies or previous indices in a single pass"}.`;
      } else {
        reply = `Interesting point. How do you plan to handle potential edge cases or duplicate elements?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: reply,
          timestamp: "Just now"
        }
      ]);
      setIsAiTyping(false);
    }, 1200);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runJavaScriptProblem(userCode, problem.functionName, problem.testCases);
      setRunResult(res);
      setIsRunning(false);

      if (res.status === "Accepted") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "ai",
            text: `Excellent work! All ${res.passedCount}/${res.totalCount} test cases passed with execution time of ${res.runtimeMs.toFixed(1)}ms. You're ready to finish your interview session.`,
            timestamp: "Just now"
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "ai",
            text: `It looks like some test cases failed (${res.passedCount}/${res.totalCount} passed). Check the execution logs in the bottom test runner to debug the edge cases.`,
            timestamp: "Just now"
          }
        ]);
      }
    }, 300);
  };

  const handleFinishInterview = () => {
    setTimerActive(false);
    setInterviewFinished(true);

    const passed = runResult?.status === "Accepted" || ((runResult?.passedCount ?? 0) === (runResult?.totalCount ?? -1) && (runResult?.totalCount ?? 0) > 0);
    const timeSpentSec = 45 * 60 - timeLeft;

    let verdict: "Strong Hire" | "Hire" | "Leaning Hire" | "Needs Practice" = "Hire";
    let ps = passed ? 9 : 6;
    let comp = passed ? 9 : 6;
    let cq = 8;
    let comm = messages.length >= 4 ? 9 : 7;

    if (passed && timeSpentSec < 20 * 60) {
      verdict = "Strong Hire";
      ps = 10;
      comp = 10;
    } else if (!passed && timeSpentSec > 40 * 60) {
      verdict = "Needs Practice";
      ps = 5;
    }

    if (passed) {
      markSolved(problem.id);
    }

    setScorecard({
      verdict,
      problemSolving: ps,
      complexity: comp,
      codeQuality: cq,
      communication: comm,
      feedback: passed
        ? `The candidate demonstrated outstanding algorithmic reasoning for ${problem.title}, accurately articulating time and space complexities and writing clean, optimal code that passed all edge cases within the allotted time.`
        : `The candidate showed good effort tackling ${problem.title}, but did not fully resolve all edge cases or syntax constraints before time expired. Continued practice on ${problem.tags?.[0] || problem.category} patterns is recommended.`
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-[#eff1f6]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* NOT STARTED / SETUP VIEW */}
        {!interviewStarted && (
          <div className="max-w-3xl mx-auto space-y-6 py-6">
            <div className="text-center space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFA116]/20 border border-[#FFA116]/30 text-[#FFA116] text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Technical Assessment Simulator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                45-Minute Timed Mock Interview
              </h1>
              <p className="text-xs sm:text-sm text-[#a0a0a0] max-w-xl mx-auto leading-relaxed">
                Simulate a real FAANG technical interview. An interactive AI interviewer probes your thought process, analyzes edge cases, and generates an automated rubric scorecard.
              </p>
            </div>

            {/* Setup Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#282828] border border-[#383838] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Company */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#eff1f6]">Target Company</label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1e1e] border border-[#383838] text-xs font-semibold text-white focus:outline-none focus:border-[#FFA116]"
                  >
                    {COMPANIES.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#eff1f6]">Engineering Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1e1e] border border-[#383838] text-xs font-semibold text-white focus:outline-none focus:border-[#FFA116]"
                  >
                    {ROLES.map((r) => (
                      <option key={r.slug} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#eff1f6]">Difficulty Tier</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e1e1e] border border-[#383838] text-xs font-semibold text-white focus:outline-none focus:border-[#FFA116]"
                  >
                    <option value="Easy">Easy (Entry Level)</option>
                    <option value="Medium">Medium (Standard FAANG)</option>
                    <option value="Hard">Hard (Senior / Principal)</option>
                  </select>
                </div>
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#383838] space-y-2 text-xs text-[#a0a0a0]">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#00b8a3]" />
                  <span>Interview Assessment Rules:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>You have exactly 45 minutes to discuss the solution and write passing code.</li>
                  <li>Type your thought process into the chat to earn communication points.</li>
                  <li>In-browser test runner evaluates edge cases instantly with zero server lag.</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleStartInterview}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#FFA116] hover:bg-[#e08e14] text-black font-bold text-sm transition-all"
                >
                  <Play className="h-4 w-4 fill-black" />
                  <span>Begin 45-Min Interview Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE INTERVIEW VIEW */}
        {interviewStarted && (
          <div className="space-y-4">
            {/* Top Status Bar */}
            <div className="p-3.5 rounded-xl bg-[#282828] border border-[#383838] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 font-mono text-sm font-bold">
                  <Clock
                    className={`h-4 w-4 ${
                      timeLeft < 300 ? "text-[#ff375f] animate-pulse" : "text-[#FFA116]"
                    }`}
                  />
                  <span
                    className={
                      timeLeft < 300 ? "text-[#ff375f] font-black" : "text-white"
                    }
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <div className="h-4 w-px bg-[#383838] hidden sm:block" />

                <div className="hidden sm:flex items-center gap-2 text-xs text-[#a0a0a0]">
                  <span>Target:</span>
                  <span className="font-bold text-white">{selectedCompany}</span>
                  <span>•</span>
                  <span>{selectedRole}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    setInputMessage("Could you please provide a hint?");
                    handleSendMessage();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#333333] hover:bg-[#3e3e3e] text-[#eff1f6] text-xs font-semibold transition-colors border border-[#404040]"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-[#FFA116]" />
                  <span>Ask Hint</span>
                </button>

                <button
                  onClick={handleFinishInterview}
                  className="px-3.5 py-1.5 rounded-lg bg-[#ff375f]/20 hover:bg-[#ff375f] text-[#ff375f] hover:text-white border border-[#ff375f]/30 text-xs font-bold transition-all"
                >
                  Finish Interview
                </button>
              </div>
            </div>

            {/* Split Screen Studio */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[600px]">

              {/* LEFT 5 COLS: Problem Statement & AI Chat */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {/* Problem Statement Card */}
                <div className="p-4 rounded-xl bg-[#282828] border border-[#383838] space-y-2.5 max-h-[280px] overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h2 className="font-black text-base text-white">
                      {problem.title}
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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

                  <p className="text-xs text-[#eff1f6] leading-relaxed whitespace-pre-line">
                    {problem.description}
                  </p>

                  <div className="pt-2 border-t border-[#383838]">
                    <div className="text-[11px] font-bold text-[#8a8a8a]">Sample Example:</div>
                    <div className="mt-1 p-2 rounded-lg bg-[#1e1e1e] font-mono text-[11px] text-[#eff1f6] space-y-0.5">
                      <div>Input: {problem.examples[0]?.input}</div>
                      <div>Output: {problem.examples[0]?.output}</div>
                    </div>
                  </div>
                </div>

                {/* AI Interviewer Live Chat */}
                <div className="flex-1 rounded-xl bg-[#282828] border border-[#383838] flex flex-col overflow-hidden min-h-[320px]">
                  <div className="px-4 py-2.5 border-b border-[#383838] bg-[#222222] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-[#FFA116]" />
                      <span className="text-xs font-bold text-white">
                        AI Interviewer Stream
                      </span>
                    </div>
                    {isAiTyping && (
                      <span className="text-[10px] text-[#FFA116] animate-pulse">
                        Interviewer typing...
                      </span>
                    )}
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto max-h-[300px]">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex gap-2.5 ${
                          m.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {m.sender === "ai" && (
                          <div className="h-6 w-6 rounded-md bg-[#FFA116]/20 border border-[#FFA116]/30 flex items-center justify-center flex-shrink-0 text-[#FFA116]">
                            <Bot className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <div
                          className={`p-2.5 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                            m.sender === "user"
                              ? "bg-[#FFA116] text-black font-medium"
                              : "bg-[#1e1e1e] text-[#eff1f6] border border-[#383838]"
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat input */}
                  <div className="p-2.5 border-t border-[#383838] bg-[#222222] flex items-center gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      placeholder="Explain your approach, ask questions, or discuss complexity..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#1e1e1e] border border-[#383838] text-xs text-white placeholder-[#8a8a8a] focus:outline-none focus:border-[#FFA116]"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 rounded-lg bg-[#FFA116] hover:bg-[#e08e14] text-black transition-colors"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT 7 COLS: Code Editor & Execution Console */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                {/* Editor Container */}
                <div className="rounded-xl border border-[#383838] bg-[#1e1e1e] overflow-hidden flex flex-col h-[400px]">
                  <div className="px-3.5 py-2 border-b border-[#383838] bg-[#222222] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">JavaScript</span>
                      <span className="text-[10px] text-[#00b8a3] font-mono">Live Sandbox</span>
                    </div>
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#333333] hover:bg-[#3e3e3e] text-white text-xs font-bold border border-[#404040] disabled:opacity-50 transition-all"
                    >
                      <Play className="h-3 w-3 text-[#FFA116] fill-[#FFA116]" />
                      <span>{isRunning ? "Running..." : "Test Code"}</span>
                    </button>
                  </div>

                  <div className="flex-1">
                    <MonacoEditor
                      height="100%"
                      language="javascript"
                      theme="vs-dark"
                      value={userCode}
                      onChange={(val) => setUserCode(val || "")}
                      options={{
                        fontSize: 13,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        lineNumbers: "on"
                      }}
                    />
                  </div>
                </div>

                {/* Test Runner Results */}
                <div className="p-3.5 rounded-xl bg-[#282828] border border-[#383838] space-y-2.5 min-h-[160px]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#8a8a8a] uppercase tracking-wider">
                      Sandboxed Execution Results
                    </span>
                    {runResult && (
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          runResult.status === "Accepted"
                            ? "bg-[#00b8a3]/20 text-[#00b8a3]"
                            : "bg-[#ff375f]/20 text-[#ff375f]"
                        }`}
                      >
                        {runResult.status === "Accepted"
                          ? `Passed (${runResult.runtimeMs.toFixed(1)}ms)`
                          : `${runResult.passedCount} / ${runResult.totalCount} Passed`}
                      </span>
                    )}
                  </div>

                  {!runResult ? (
                    <div className="text-xs text-[#8a8a8a] font-mono py-4 text-center">
                      Click &quot;Test Code&quot; to execute tests against sample constraints.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {runResult.results.map((t, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg border font-mono text-xs ${
                            t.passed
                              ? "bg-[#00b8a3]/10 border-[#00b8a3]/30 text-[#00b8a3]"
                              : "bg-[#ff375f]/10 border-[#ff375f]/30 text-[#ff375f]"
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-[11px]">
                            <span>Case {t.testCaseIndex + 1}</span>
                            <span>{t.passed ? "PASSED" : "FAILED"}</span>
                          </div>
                          <div className="mt-1 text-[11px] text-[#a0a0a0] space-y-0.5">
                            <div>Input: {t.input}</div>
                            <div>Expected: {t.expected}</div>
                            <div>Actual: {t.actual}</div>
                            {t.error && <div className="text-[#ff375f]">Error: {t.error}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST INTERVIEW SCORECARD MODAL */}
        {interviewFinished && scorecard && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-2xl w-full p-6 sm:p-8 rounded-2xl bg-[#282828] border border-[#383838] shadow-2xl space-y-5">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 rounded-xl bg-[#FFA116]/20 border border-[#FFA116]/30 flex items-center justify-center mx-auto text-[#FFA116]">
                  <Award className="h-6 w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Technical Interview Assessment
                </h2>
                <div className="inline-block px-3 py-1 rounded-full font-bold text-xs uppercase bg-[#00b8a3]/20 text-[#00b8a3] border border-[#00b8a3]/30">
                  Verdict: {scorecard.verdict}
                </div>
              </div>

              {/* Rubric metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
                  <div className="text-[10px] text-[#8a8a8a]">Problem Solving</div>
                  <div className="text-lg font-black text-[#FFA116] mt-0.5">
                    {scorecard.problemSolving}/10
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
                  <div className="text-[10px] text-[#8a8a8a]">Complexity</div>
                  <div className="text-lg font-black text-[#ffc01e] mt-0.5">
                    {scorecard.complexity}/10
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
                  <div className="text-[10px] text-[#8a8a8a]">Code Quality</div>
                  <div className="text-lg font-black text-[#00b8a3] mt-0.5">
                    {scorecard.codeQuality}/10
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1e1e1e] border border-[#383838]">
                  <div className="text-[10px] text-[#8a8a8a]">Communication</div>
                  <div className="text-lg font-black text-white mt-0.5">
                    {scorecard.communication}/10
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="p-3.5 rounded-xl bg-[#1e1e1e] border border-[#383838] space-y-1">
                <div className="text-xs font-bold text-white">
                  Senior Interviewer Debrief Notes:
                </div>
                <p className="text-xs text-[#a0a0a0] leading-relaxed">
                  {scorecard.feedback}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  onClick={() => {
                    setInterviewFinished(false);
                    setInterviewStarted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#FFA116] hover:bg-[#e08e14] text-black font-bold text-xs transition-all"
                >
                  Start New Interview
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
