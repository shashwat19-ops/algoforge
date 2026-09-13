export interface StudyPlan {
  slug: string;
  title: string;
  badge: string;
  color: string;
  estimatedWeeks: number;
  totalProblems: number;
  description: string;
  author: string;
  chapters: Array<{
    title: string;
    description: string;
    problemIds: string[];
  }>;
}

export const STUDY_PLANS: StudyPlan[] = [
  {
    slug: "blind-75",
    title: "Blind 75 Essential DSA",
    badge: "Most Popular",
    color: "from-blue-600 to-indigo-600",
    estimatedWeeks: 6,
    totalProblems: 75,
    description: "The definitive curated list of 75 high-yield DSA questions created by an ex-Facebook Tech Lead covering all critical algorithmic patterns.",
    author: "Yangshun Tay",
    chapters: [
      {
        title: "Week 1: Arrays & Two Pointers",
        description: "Core array lookups, duplicate detection, and two-pointer narrowing.",
        problemIds: [
          "two-sum",
          "best-time-to-buy-and-sell-stock",
          "product-of-array-except-self",
          "valid-anagram",
          "group-anagrams",
          "top-k-frequent-elements"
        ]
      },
      {
        title: "Week 2: Two Pointers & Sliding Window",
        description: "Palindromes, sorted arrays, and substring sliding windows.",
        problemIds: [
          "valid-palindrome",
          "3sum",
          "container-with-most-water",
          "longest-substring-without-repeating-characters"
        ]
      },
      {
        title: "Week 3: Stack & Binary Search",
        description: "Parentheses validation, sorted search, and rotated array searches.",
        problemIds: [
          "valid-parentheses",
          "binary-search",
          "search-in-rotated-sorted-array"
        ]
      },
      {
        title: "Week 4: Graphs & BFS/DFS",
        description: "Grid connectivity and cycle detection in dependency graphs.",
        problemIds: [
          "number-of-islands",
          "course-schedule"
        ]
      },
      {
        title: "Week 5: Dynamic Programming",
        description: "1D DP subproblems, memoization, and bottom-up tables.",
        problemIds: [
          "climbing-stairs",
          "coin-change"
        ]
      }
    ]
  },
  {
    slug: "neetcode-150",
    title: "NeetCode 150 Master Roadmap",
    badge: "Comprehensive",
    color: "from-emerald-500 to-teal-700",
    estimatedWeeks: 10,
    totalProblems: 150,
    description: "An organized, pattern-by-pattern progression from beginner fundamentals to advanced graph and DP techniques.",
    author: "Navdeep Singh (NeetCode)",
    chapters: [
      {
        title: "Pattern 1: Arrays & Hashing",
        description: "Hash map lookups, frequency counting, prefix arrays.",
        problemIds: ["two-sum", "valid-anagram", "group-anagrams", "top-k-frequent-elements", "product-of-array-except-self"]
      },
      {
        title: "Pattern 2: Two Pointers & Sliding Window",
        description: "In-place array manipulation and dynamic windows.",
        problemIds: ["valid-palindrome", "3sum", "container-with-most-water", "longest-substring-without-repeating-characters", "best-time-to-buy-and-sell-stock"]
      },
      {
        title: "Pattern 3: Stack & Binary Search",
        description: "Monotonic stacks and logarithmic space searches.",
        problemIds: ["valid-parentheses", "binary-search", "search-in-rotated-sorted-array"]
      },
      {
        title: "Pattern 4: Graphs & Topo Sort",
        description: "Islands, cycle detection, topological sorting.",
        problemIds: ["number-of-islands", "course-schedule"]
      },
      {
        title: "Pattern 5: 1D & 2D Dynamic Programming",
        description: "Optimal substructure and state transitions.",
        problemIds: ["climbing-stairs", "coin-change"]
      }
    ]
  },
  {
    slug: "striver-sde-sheet",
    title: "Striver's SDE Sheet (Top 180)",
    badge: "FAANG Ready",
    color: "from-amber-500 to-orange-600",
    estimatedWeeks: 8,
    totalProblems: 180,
    description: "The most trusted interview prep sheet in the subcontinent, designed to crack Google, Amazon, Microsoft, and top tier product firms.",
    author: "Raj Vikramaditya (Striver / takeUforward)",
    chapters: [
      {
        title: "Day 1-5: Arrays & Math",
        description: "Prefix sums, Kadane's algorithm, stock buy/sell, and matrix manipulation.",
        problemIds: ["two-sum", "best-time-to-buy-and-sell-stock", "product-of-array-except-self", "3sum"]
      },
      {
        title: "Day 6-12: Hashing, Two Pointers & Sliding Window",
        description: "Substrings, longest streaks, anagrams, and two pointer mechanics.",
        problemIds: ["valid-anagram", "group-anagrams", "longest-substring-without-repeating-characters", "container-with-most-water"]
      },
      {
        title: "Day 13-20: Binary Search & Graph Algorithms",
        description: "Rotated search, island components, course schedule DAGs.",
        problemIds: ["binary-search", "search-in-rotated-sorted-array", "number-of-islands", "course-schedule"]
      },
      {
        title: "Day 21-30: Dynamic Programming Masterclass",
        description: "Coin change, climbing stairs, knapsack variations, and DP on grids.",
        problemIds: ["climbing-stairs", "coin-change"]
      }
    ]
  },
  {
    slug: "grind-75",
    title: "Grind 75 by Blind Author",
    badge: "Hours Customizable",
    color: "from-purple-600 to-pink-600",
    estimatedWeeks: 4,
    totalProblems: 75,
    description: "An improved, modern alternative to Blind 75 that dynamically adjusts to your available study hours per week.",
    author: "Yangshun Tay",
    chapters: [
      {
        title: "Core Essentials (High Frequency)",
        description: "The non-negotiable questions asked in 80% of tech screens.",
        problemIds: ["two-sum", "valid-parentheses", "best-time-to-buy-and-sell-stock", "valid-palindrome", "binary-search"]
      },
      {
        title: "Medium Powerhouse Problems",
        description: "Build deep pattern recognition with 3Sum, Course Schedule, and Coin Change.",
        problemIds: ["3sum", "container-with-most-water", "longest-substring-without-repeating-characters", "number-of-islands", "course-schedule", "coin-change"]
      }
    ]
  }
];
