export interface ContestProblem {
  id: string;
  problemId: string;
  score: number;
}

export interface Contest {
  id: string;
  title: string;
  type: "Weekly" | "Biweekly";
  number: number;
  durationMinutes: number;
  duration?: string;
  status: "Active" | "Upcoming" | "Completed";
  startTime: string;
  participantsCount: number;
  registeredCount?: number;
  prizePool?: string;
  problems: ContestProblem[];
  leaderboard: Array<{
    rank: number;
    username: string;
    score: number;
    finishTime: string;
    avatarBg: string;
  }>;
}

export interface GlobalLeaderboardUser {
  rank: number;
  username: string;
  rating: number;
  solvedCount: number;
  avatarBg?: string;
}

export const MOCK_LEADERBOARD: GlobalLeaderboardUser[] = [
  { rank: 1, username: "tourist_coder", rating: 3240, solvedCount: 420 },
  { rank: 2, username: "algorithm_god", rating: 3180, solvedCount: 395 },
  { rank: 3, username: "jiangly_clone", rating: 3125, solvedCount: 388 },
  { rank: 4, username: "leetcode_grandmaster", rating: 2980, solvedCount: 360 },
  { rank: 5, username: "shashwat_ops", rating: 2890, solvedCount: 345 },
  { rank: 6, username: "faang_bound", rating: 2750, solvedCount: 310 },
  { rank: 7, username: "matrix_hacker", rating: 2680, solvedCount: 290 },
  { rank: 8, username: "zero_bug_dev", rating: 2540, solvedCount: 275 },
  { rank: 9, username: "binary_sage", rating: 2480, solvedCount: 260 },
  { rank: 10, username: "graph_navigator", rating: 2420, solvedCount: 250 }
];

export const CONTESTS: Contest[] = [
  {
    id: "weekly-contest-415",
    title: "Weekly Contest 415",
    type: "Weekly",
    number: 415,
    durationMinutes: 90,
    duration: "90 Mins",
    status: "Active",
    startTime: "Happening Now",
    participantsCount: 24810,
    registeredCount: 24810,
    prizePool: "$5,000 + Top Performer Badges",
    problems: [
      { id: "q1", problemId: "two-sum", score: 3 },
      { id: "q2", problemId: "valid-palindrome", score: 4 },
      { id: "q3", problemId: "container-with-most-water", score: 5 },
      { id: "q4", problemId: "course-schedule", score: 7 }
    ],
    leaderboard: [
      { rank: 1, username: "tourist_coder", score: 19, finishTime: "00:18:24", avatarBg: "bg-red-500" },
      { rank: 2, username: "algorithm_god", score: 19, finishTime: "00:21:05", avatarBg: "bg-amber-500" },
      { rank: 3, username: "leetcode_grandmaster", score: 19, finishTime: "00:23:40", avatarBg: "bg-purple-500" },
      { rank: 4, username: "faang_bound", score: 19, finishTime: "00:27:12", avatarBg: "bg-blue-500" },
      { rank: 5, username: "shashwat_ops", score: 19, finishTime: "00:29:45", avatarBg: "bg-emerald-500" },
      { rank: 6, username: "zero_bug_dev", score: 16, finishTime: "00:34:10", avatarBg: "bg-cyan-500" },
      { rank: 7, username: "matrix_hacker", score: 16, finishTime: "00:39:20", avatarBg: "bg-indigo-500" }
    ]
  },
  {
    id: "biweekly-contest-138",
    title: "Biweekly Contest 138",
    type: "Biweekly",
    number: 138,
    durationMinutes: 90,
    duration: "90 Mins",
    status: "Upcoming",
    startTime: "Saturday at 8:00 PM EST",
    participantsCount: 18420,
    registeredCount: 18420,
    prizePool: "$3,000 + AlgoForge Merch",
    problems: [
      { id: "q1", problemId: "valid-anagram", score: 3 },
      { id: "q2", problemId: "group-anagrams", score: 4 },
      { id: "q3", problemId: "coin-change", score: 5 },
      { id: "q4", problemId: "search-in-rotated-sorted-array", score: 6 }
    ],
    leaderboard: []
  },
  {
    id: "weekly-contest-414",
    title: "Weekly Contest 414",
    type: "Weekly",
    number: 414,
    durationMinutes: 90,
    duration: "90 Mins",
    status: "Completed",
    startTime: "Last Sunday",
    participantsCount: 31200,
    registeredCount: 31200,
    prizePool: "$5,000 + Trophies",
    problems: [
      { id: "q1", problemId: "climbing-stairs", score: 3 },
      { id: "q2", problemId: "best-time-to-buy-and-sell-stock", score: 4 },
      { id: "q3", problemId: "3sum", score: 5 },
      { id: "q4", problemId: "number-of-islands", score: 6 }
    ],
    leaderboard: [
      { rank: 1, username: "jiangly", score: 18, finishTime: "00:14:12", avatarBg: "bg-rose-500" },
      { rank: 2, username: "ecnerwala", score: 18, finishTime: "00:17:09", avatarBg: "bg-amber-500" },
      { rank: 3, username: "neal_wu", score: 18, finishTime: "00:19:44", avatarBg: "bg-indigo-500" },
      { rank: 4, username: "shashwat_ops", score: 18, finishTime: "00:22:15", avatarBg: "bg-emerald-500" }
    ]
  }
];
