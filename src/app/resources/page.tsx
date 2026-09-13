"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Search,
  Zap,
  HelpCircle,
  FileCode,
  ShieldCheck,
  Terminal
} from "lucide-react";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"patterns" | "big-o" | "framework">("patterns");
  const [selectedPattern, setSelectedPattern] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const DSA_PATTERNS = [
    {
      name: "1. Two Pointers",
      category: "Array / String",
      description: "Uses two references traversing the data structure simultaneously to search for pairs or partitions in O(N) time with O(1) space.",
      whenToUse: [
        "Input is a sorted array or linked list",
        "Target search: pair with target sum, palindrome verification, trapping water",
        "Eliminates nested loop O(N^2) brute force"
      ],
      template: `function twoPointers(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === target) {
      return [left, right];
    } else if (currentSum < target) {
      left++; // Need a larger sum
    } else {
      right--; // Need a smaller sum
    }
  }
  return [-1, -1];
}`
    },
    {
      name: "2. Sliding Window",
      category: "Array / String / Subarray",
      description: "Maintains a running subarray/substring window that expands or shrinks dynamically to find optimal ranges in O(N) linear time.",
      whenToUse: [
        "Continuous subarrays or substrings meeting a condition",
        "Finding max/min sum of subarray of size K",
        "Longest substring without repeating characters"
      ],
      template: `function slidingWindow(nums, k) {
  let left = 0;
  let windowSum = 0;
  let maxSum = -Infinity;

  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];

    // Shrink window if constraint violated or window size reached
    if (right >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= nums[left];
      left++;
    }
  }
  return maxSum;
}`
    },
    {
      name: "3. Fast & Slow Pointers (Floyd's Cycle)",
      category: "Linked List / Cycle Detection",
      description: "Uses two pointers moving at different speeds (1x and 2x) to detect cycles or find middle nodes in O(N) time and O(1) space.",
      whenToUse: [
        "Detecting cycles in linked lists or state graphs",
        "Finding middle element of a linked list in one pass",
        "Finding cycle entry node (Floyd's algorithm phase 2)"
      ],
      template: `function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // Cycle detected
    }
  }
  return false;
}`
    },
    {
      name: "4. Merge Intervals",
      category: "Intervals / Sorting",
      description: "Sorts overlapping intervals by start time and iteratively merges adjacent intervals in O(N log N) time.",
      whenToUse: [
        "Interval scheduling, calendar booking, meeting room conflicts",
        "Overlapping intervals that must be consolidated"
      ],
      template: `function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const prev = merged[merged.length - 1];

    if (current[0] <= prev[1]) {
      // Overlap: merge by taking max end time
      prev[1] = Math.max(prev[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}`
    },
    {
      name: "5. Breadth-First Search (BFS / Level Order)",
      category: "Tree / Graph / Shortest Path",
      description: "Explores nodes level-by-level using a FIFO queue. Guarantees shortest path in unweighted graphs.",
      whenToUse: [
        "Level-order traversal in binary trees",
        "Shortest path in unweighted grids/graphs",
        "Connected components, topological sort (Kahn's algo)"
      ],
      template: `function treeBFS(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`
    },
    {
      name: "6. Depth-First Search (DFS / Backtracking)",
      category: "Tree / Graph / Recursion",
      description: "Recursively dives deep along each branch before backtracking. Ideal for searching permutations, combinations, and all paths.",
      whenToUse: [
        "Exploring all root-to-leaf paths",
        "Generating permutations, subsets, N-Queens",
        "Flood fill / island counting in 2D grids"
      ],
      template: `function dfsGrid(grid, r, c) {
  // Boundary check & visited check
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '0') {
    return;
  }

  grid[r][c] = '0'; // Mark visited

  // Explore 4 directions
  dfsGrid(grid, r + 1, c);
  dfsGrid(grid, r - 1, c);
  dfsGrid(grid, r, c + 1);
  dfsGrid(grid, r, c - 1);
}`
    },
    {
      name: "7. Top 'K' Elements (Heap / Priority Queue)",
      category: "Heap / Sorting",
      description: "Maintains a Min-Heap of size K to find top K largest elements in O(N log K) time without sorting the entire array.",
      whenToUse: [
        "Finding Kth largest/smallest element",
        "Top K frequent elements or words",
        "Continuous stream processing where full sort is expensive"
      ],
      template: `// Using Min-Heap of size K for Top K Largest Elements
function findKthLargest(nums, k) {
  // In JavaScript, build/use a MinHeap structure:
  const minHeap = new MinHeap(); // Keeps K elements

  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop(); // Remove smallest, keeping top K
    }
  }
  return minHeap.peek();
}`
    },
    {
      name: "8. Binary Search (Modified / Search Space)",
      category: "Divide & Conquer",
      description: "Halves search space each step in O(log N) time. Applies to sorted arrays and monotonic decision answer spaces.",
      whenToUse: [
        "Rotated sorted arrays, find peak element",
        "Search in 2D sorted matrix",
        "Binary search on answer space (e.g., capacity to ship packages in D days)"
      ],
      template: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`
    },
    {
      name: "9. Dynamic Programming (Tabulation & Memoization)",
      category: "Optimization / DP",
      description: "Breaks complex problems into overlapping subproblems with optimal substructure, caching intermediate results in O(N) or O(N*M).",
      whenToUse: [
        "Optimization problems (min cost, max profit, longest subsequence)",
        "Counting total ways to reach a state",
        "Decision problems with choices at each step (0/1 Knapsack, Coin Change)"
      ],
      template: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`
    },
    {
      name: "10. Monotonic Stack",
      category: "Stack / Next Greater Element",
      description: "Maintains elements in strictly increasing or decreasing order to resolve 'Next Greater / Smaller Element' in O(N) linear time.",
      whenToUse: [
        "Daily temperatures, next greater element",
        "Largest rectangle in histogram, trapping rain water",
        "Stock span problem"
      ],
      template: `function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`
    }
  ];

  const BIG_O_DATA = [
    {
      name: "Array / Dynamic Array",
      access: "O(1)",
      search: "O(N)",
      insertion: "O(N)",
      deletion: "O(N)",
      space: "O(N)"
    },
    {
      name: "Hash Table / Map",
      access: "N/A",
      search: "O(1) avg",
      insertion: "O(1) avg",
      deletion: "O(1) avg",
      space: "O(N)"
    },
    {
      name: "Singly Linked List",
      access: "O(N)",
      search: "O(N)",
      insertion: "O(1)",
      deletion: "O(1)",
      space: "O(N)"
    },
    {
      name: "Binary Search Tree (Balanced)",
      access: "O(log N)",
      search: "O(log N)",
      insertion: "O(log N)",
      deletion: "O(log N)",
      space: "O(N)"
    },
    {
      name: "Min / Max Heap",
      access: "O(1) peek",
      search: "O(N)",
      insertion: "O(log N)",
      deletion: "O(log N) pop",
      space: "O(N)"
    },
    {
      name: "Trie (Prefix Tree)",
      access: "O(L) word len",
      search: "O(L)",
      insertion: "O(L)",
      deletion: "O(L)",
      space: "O(ALPHABET * N)"
    },
    {
      name: "Graph (Adjacency List)",
      access: "N/A",
      search: "O(V + E)",
      insertion: "O(1)",
      deletion: "O(E)",
      space: "O(V + E)"
    }
  ];

  const SORTING_BIG_O = [
    { name: "Quick Sort", timeBest: "O(N log N)", timeAvg: "O(N log N)", timeWorst: "O(N^2)", space: "O(log N)", stable: "No" },
    { name: "Merge Sort", timeBest: "O(N log N)", timeAvg: "O(N log N)", timeWorst: "O(N log N)", space: "O(N)", stable: "Yes" },
    { name: "Heap Sort", timeBest: "O(N log N)", timeAvg: "O(N log N)", timeWorst: "O(N log N)", space: "O(1)", stable: "No" },
    { name: "Insertion Sort", timeBest: "O(N)", timeAvg: "O(N^2)", timeWorst: "O(N^2)", space: "O(1)", stable: "Yes" },
    { name: "Bubble Sort", timeBest: "O(N)", timeAvg: "O(N^2)", timeWorst: "O(N^2)", space: "O(1)", stable: "Yes" },
    { name: "Counting Sort", timeBest: "O(N + K)", timeAvg: "O(N + K)", timeWorst: "O(N + K)", space: "O(K)", stable: "Yes" }
  ];

  const INTERVIEW_FRAMEWORK = [
    {
      step: 1,
      title: "Clarify Requirements & Constraints",
      time: "3 - 5 mins",
      bullets: [
        "Ask about input format, data size (N), range of values (negative, zero, duplicates).",
        "Clarify return type and edge cases (empty array, null root, single element).",
        "State your initial understanding in your own words to confirm alignment with interviewer."
      ]
    },
    {
      step: 2,
      title: "Formulate Test Cases & Edge Conditions",
      time: "3 mins",
      bullets: [
        "Write 1 standard normal test case.",
        "Write 2-3 edge cases (e.g. empty input, sorted descending, all duplicates, negative numbers).",
        "Keep these test cases visible to dry-run later."
      ]
    },
    {
      step: 3,
      title: "Brainstorm & State High-Level Approach",
      time: "5 - 7 mins",
      bullets: [
        "Start with the brute-force solution to show you have a baseline.",
        "Identify the bottleneck (e.g. nested O(N^2) loops, duplicate recalculations).",
        "Propose optimal pattern (Two Pointers, Hash Map, BFS, DP) with Time and Space complexity analysis.",
        "Get explicit verbal approval from interviewer before writing single line of code."
      ]
    },
    {
      step: 4,
      title: "Write Clean, Modular Production Code",
      time: "15 - 20 mins",
      bullets: [
        "Use meaningful variable names (e.g. `left`, `right`, `seen`, `maxSum`).",
        "Handle edge cases and base cases right at the top of the function.",
        "Talk aloud while typing: explain what each block of code is doing."
      ]
    },
    {
      step: 5,
      title: "Dry Run & Verify with Test Cases",
      time: "5 mins",
      bullets: [
        "Manually trace your code line-by-line using your test cases from Step 2.",
        "Track pointer/variable values in comments to prove correctness.",
        "Catch off-by-one errors (< vs <=) before running."
      ]
    },
    {
      step: 6,
      title: "Complexity Review & Optimization",
      time: "3 mins",
      bullets: [
        "Re-state exact Big-O Time and Space complexities.",
        "Discuss potential trade-offs (e.g. O(1) space vs O(N) time).",
        "Ask interviewer if they would like to explore follow-up extensions."
      ]
    }
  ];

  const filteredPatterns = DSA_PATTERNS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* HEADER HERO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              <span>DSA Mastery Cheatsheets & Reference</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              AlgoForge Engineering Handbook
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Comprehensive reference guides for algorithmic patterns, Big-O complexity charts, and proven FAANG interview problem-solving frameworks.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab("patterns")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "patterns"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              14 DSA Patterns
            </button>
            <button
              onClick={() => setActiveTab("big-o")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "big-o"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Big-O Complexity
            </button>
            <button
              onClick={() => setActiveTab("framework")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "framework"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Interview Framework
            </button>
          </div>
        </div>

        {/* TAB 1: 14 DSA PATTERNS */}
        {activeTab === "patterns" && (
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search algorithmic patterns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Pattern Selector List */}
              <div className="lg:col-span-4 space-y-2">
                {filteredPatterns.map((pattern, idx) => {
                  const isSelected = selectedPattern === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPattern(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? "bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-500/10"
                          : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">
                          {pattern.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                          {pattern.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {pattern.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Pattern Detail Viewer */}
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
                {filteredPatterns[selectedPattern] && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                          {filteredPatterns[selectedPattern].category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-white">
                        {filteredPatterns[selectedPattern].name}
                      </h2>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {filteredPatterns[selectedPattern].description}
                      </p>
                    </div>

                    {/* When to use triggers */}
                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                      <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        <span>Problem Triggers & Recognition</span>
                      </div>
                      <ul className="space-y-2">
                        {filteredPatterns[selectedPattern].whenToUse.map(
                          (useCase, uIdx) => (
                            <li
                              key={uIdx}
                              className="text-xs text-slate-300 flex items-start gap-2.5"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                              <span>{useCase}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Code Template */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Code2 className="h-4 w-4 text-emerald-400" />
                          <span>Standard Code Boilerplate</span>
                        </div>
                        <button
                          onClick={() =>
                            copyCode(
                              filteredPatterns[selectedPattern].template,
                              selectedPattern
                            )
                          }
                          className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 transition-colors"
                        >
                          {copiedIndex === selectedPattern ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Template</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                        <pre>{filteredPatterns[selectedPattern].template}</pre>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BIG-O COMPLEXITY */}
        {activeTab === "big-o" && (
          <div className="space-y-8">
            {/* Data Structures Complexity */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="h-4 w-4 text-blue-400" />
                  <span>Common Data Structure Complexities</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4 px-6">Data Structure</th>
                      <th className="p-4">Access</th>
                      <th className="p-4">Search</th>
                      <th className="p-4">Insertion</th>
                      <th className="p-4">Deletion</th>
                      <th className="p-4">Space Complexity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {BIG_O_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 px-6 font-bold font-sans text-white">
                          {row.name}
                        </td>
                        <td className="p-4 text-emerald-400">{row.access}</td>
                        <td className="p-4 text-amber-400">{row.search}</td>
                        <td className="p-4 text-emerald-400">{row.insertion}</td>
                        <td className="p-4 text-emerald-400">{row.deletion}</td>
                        <td className="p-4 text-blue-400">{row.space}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sorting Algorithms Complexity */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>Sorting Algorithms Complexities</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4 px-6">Algorithm</th>
                      <th className="p-4">Best Time</th>
                      <th className="p-4">Average Time</th>
                      <th className="p-4">Worst Time</th>
                      <th className="p-4">Worst Space</th>
                      <th className="p-4">Stable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {SORTING_BIG_O.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 px-6 font-bold font-sans text-white">
                          {row.name}
                        </td>
                        <td className="p-4 text-emerald-400">{row.timeBest}</td>
                        <td className="p-4 text-emerald-400">{row.timeAvg}</td>
                        <td className="p-4 text-amber-400">{row.timeWorst}</td>
                        <td className="p-4 text-blue-400">{row.space}</td>
                        <td className="p-4 font-sans font-semibold text-slate-300">
                          {row.stable}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW FRAMEWORK */}
        {activeTab === "framework" && (
          <div className="space-y-6">
            <div className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span>The 45-Minute FAANG Coding Interview Protocol</span>
              </h2>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                Senior engineering interviewers evaluate candidate problem formulation, structured thought communication, and edge-case resilience far more than sheer syntax speed. Follow this strict 6-stage blueprint to consistently ace technical screens.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INTERVIEW_FRAMEWORK.map((stage) => (
                <div
                  key={stage.step}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                        {stage.step}
                      </span>
                      <h3 className="font-bold text-sm text-white">
                        {stage.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      {stage.time}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-800">
                    {stage.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
