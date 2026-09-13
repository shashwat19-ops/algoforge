"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Submission {
  id: string;
  problemId: string;
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";
  language: string;
  runtimeMs: number;
  memoryKb: number;
  code: string;
  timestamp: number;
  passedCount: number;
  totalCount: number;
  errorMessage?: string;
}

export interface MockInterviewResult {
  id: string;
  company: string;
  role: string;
  score: number;
  feedback: string[];
  durationMinutes: number;
  completedAt: number;
  problemsSolved: number;
}

interface UserContextType {
  solvedProblems: Set<string>;
  attemptedProblems: Set<string>;
  bookmarkedProblems: Set<string>;
  submissions: Submission[];
  notes: Record<string, string>;
  mockInterviews: MockInterviewResult[];
  streak: {
    current: number;
    max: number;
    lastActiveDate: string;
  };
  markSolved: (problemId: string) => void;
  toggleBookmark: (problemId: string) => void;
  isBookmarked: (problemId: string) => boolean;
  saveNote: (problemId: string, note: string) => void;
  getNote: (problemId: string) => string;
  addSubmission: (submission: Omit<Submission, "id" | "timestamp">) => Submission;
  saveMockInterview: (result: Omit<MockInterviewResult, "id" | "completedAt">) => void;
  getSubmissionsForProblem: (problemId: string) => Submission[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SOLVED: "algoforge_solved",
  ATTEMPTED: "algoforge_attempted",
  BOOKMARKS: "algoforge_bookmarks",
  SUBMISSIONS: "algoforge_submissions",
  NOTES: "algoforge_notes",
  STREAK: "algoforge_streak",
  MOCKS: "algoforge_mocks",
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [attemptedProblems, setAttemptedProblems] = useState<Set<string>>(new Set());
  const [bookmarkedProblems, setBookmarkedProblems] = useState<Set<string>>(new Set());
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [mockInterviews, setMockInterviews] = useState<MockInterviewResult[]>([]);
  const [streak, setStreak] = useState({
    current: 0,
    max: 0,
    lastActiveDate: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedSolved = localStorage.getItem(STORAGE_KEYS.SOLVED);
      if (storedSolved) setSolvedProblems(new Set(JSON.parse(storedSolved)));

      const storedAttempted = localStorage.getItem(STORAGE_KEYS.ATTEMPTED);
      if (storedAttempted) setAttemptedProblems(new Set(JSON.parse(storedAttempted)));

      const storedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (storedBookmarks) setBookmarkedProblems(new Set(JSON.parse(storedBookmarks)));

      const storedSubmissions = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      if (storedSubmissions) setSubmissions(JSON.parse(storedSubmissions));

      const storedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (storedNotes) setNotes(JSON.parse(storedNotes));

      const storedMocks = localStorage.getItem(STORAGE_KEYS.MOCKS);
      if (storedMocks) setMockInterviews(JSON.parse(storedMocks));

      const storedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (storedStreak) {
        setStreak(JSON.parse(storedStreak));
      }
    } catch (e) {
      console.error("Failed to load user state from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SOLVED, JSON.stringify(Array.from(solvedProblems)));
      localStorage.setItem(STORAGE_KEYS.ATTEMPTED, JSON.stringify(Array.from(attemptedProblems)));
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(Array.from(bookmarkedProblems)));
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
      localStorage.setItem(STORAGE_KEYS.MOCKS, JSON.stringify(mockInterviews));
    } catch (e) {
      console.error("Failed to persist user state", e);
    }
  }, [solvedProblems, attemptedProblems, bookmarkedProblems, submissions, notes, streak, mockInterviews, isLoaded]);

  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0];
    if (streak.lastActiveDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    let newCurrent = streak.current;

    if (streak.lastActiveDate === yesterday) {
      newCurrent += 1;
    } else if (streak.lastActiveDate !== today) {
      newCurrent = 1;
    }

    const newMax = Math.max(streak.max, newCurrent);
    setStreak({
      current: newCurrent,
      max: newMax,
      lastActiveDate: today,
    });
  };

  const markSolved = (problemId: string) => {
    setSolvedProblems((prev) => new Set(prev).add(problemId));
    setAttemptedProblems((prev) => new Set(prev).add(problemId));
    updateStreak();
  };

  const toggleBookmark = (problemId: string) => {
    setBookmarkedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      return next;
    });
  };

  const isBookmarked = (problemId: string) => bookmarkedProblems.has(problemId);

  const saveNote = (problemId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [problemId]: note }));
  };

  const getNote = (problemId: string) => notes[problemId] || "";

  const addSubmission = (sub: Omit<Submission, "id" | "timestamp">): Submission => {
    const newSub: Submission = {
      ...sub,
      id: "sub_" + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };

    setSubmissions((prev) => [newSub, ...prev]);
    setAttemptedProblems((prev) => new Set(prev).add(sub.problemId));

    if (sub.status === "Accepted") {
      markSolved(sub.problemId);
    }

    return newSub;
  };

  const saveMockInterview = (result: Omit<MockInterviewResult, "id" | "completedAt">) => {
    const newMock: MockInterviewResult = {
      ...result,
      id: "mock_" + Math.random().toString(36).substring(2, 9),
      completedAt: Date.now(),
    };
    setMockInterviews((prev) => [newMock, ...prev]);
  };

  const getSubmissionsForProblem = (problemId: string) => {
    return submissions.filter((s) => s.problemId === problemId);
  };

  return (
    <UserContext.Provider
      value={{
        solvedProblems,
        attemptedProblems,
        bookmarkedProblems,
        submissions,
        notes,
        mockInterviews,
        streak,
        markSolved,
        toggleBookmark,
        isBookmarked,
        saveNote,
        getNote,
        addSubmission,
        saveMockInterview,
        getSubmissionsForProblem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
