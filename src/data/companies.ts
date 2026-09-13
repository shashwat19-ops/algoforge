export interface CompanyInterviewInfo {
  slug: string;
  name: string;
  logo: string; // Tailwind icon or brand color
  color: string;
  description: string;
  tier: "FAANG / Big Tech" | "Top Tier Fintech" | "Unicorn / High Growth";
  totalQuestions: number;
  hiringBar: string;
  interviewRounds: Array<{
    title: string;
    duration: string;
    description: string;
    focusAreas: string[];
  }>;
  popularCategories: Array<{
    name: string;
    percentage: number;
  }>;
  topProblemIds: string[];
  interviewTips: string[];
}

export const COMPANIES: CompanyInterviewInfo[] = [
  {
    slug: "google",
    name: "Google",
    logo: "G",
    color: "from-blue-500 via-red-500 to-yellow-500",
    description: "Known for heavy focus on graph algorithms, dynamic programming, and clean, optimal O(log N) / O(N) algorithmic approaches with high test coverage.",
    tier: "FAANG / Big Tech",
    totalQuestions: 142,
    hiringBar: "Very High (Strict Big-O complexity expectations & edge-case testing)",
    interviewRounds: [
      {
        title: "Technical Phone Screen",
        duration: "45 mins",
        description: "1 Medium or Hard DSA question on Google Docs or proprietary code editor without autocomplete.",
        focusAreas: ["Arrays", "Two Pointers", "Binary Search", "Hash Maps"]
      },
      {
        title: "Onsite Round 1 & 2: Core Data Structures",
        duration: "45 mins each",
        description: "Graphs (BFS/DFS, Dijkstra, Topological Sort), Trees, and Dynamic Programming.",
        focusAreas: ["Graphs", "DP", "Tries", "Sliding Window"]
      },
      {
        title: "Onsite Round 3: Algorithms & Scalability",
        duration: "45 mins",
        description: "Complex algorithmic problem with follow-up constraints and scale modifications.",
        focusAreas: ["Advanced Graphs", "Intervals", "Heap"]
      },
      {
        title: "Onsite Round 4: Googleyness & Leadership",
        duration: "45 mins",
        description: "Behavioral interview focused on navigating ambiguity, team collaboration, and ethical decision making.",
        focusAreas: ["Googleyness", "Communication", "Leadership"]
      }
    ],
    popularCategories: [
      { name: "Graphs & Trees", percentage: 35 },
      { name: "Dynamic Programming", percentage: 25 },
      { name: "Arrays & Two Pointers", percentage: 20 },
      { name: "Binary Search", percentage: 20 }
    ],
    topProblemIds: [
      "two-sum",
      "course-schedule",
      "number-of-islands",
      "coin-change",
      "binary-search",
      "container-with-most-water",
      "search-in-rotated-sorted-array"
    ],
    interviewTips: [
      "Always clarify constraints (e.g. integer overflows, empty inputs, duplicate numbers).",
      "State your brute-force approach first in 30 seconds, then optimize to target complexity.",
      "Write modular, clean code and walk through a trace with a dry-run test case before saying you are done."
    ]
  },
  {
    slug: "meta",
    name: "Meta",
    logo: "M",
    color: "from-blue-600 to-indigo-600",
    description: "Meta places paramount value on speed and bug-free execution. Expect to solve two medium problems in 45 minutes with working, clean code.",
    tier: "FAANG / Big Tech",
    totalQuestions: 156,
    hiringBar: "High Speed & Precision (Target: 2 medium problems in 40 mins)",
    interviewRounds: [
      {
        title: "Technical Phone Screen",
        duration: "45 mins",
        description: "2 Medium DSA problems from recent Meta tagged list. Speed is essential.",
        focusAreas: ["Arrays", "Two Pointers", "Binary Trees", "Strings"]
      },
      {
        title: "Onsite Coding 1",
        duration: "45 mins",
        description: "2 algorithmic problems emphasizing Trees, Recursion, and Binary Search.",
        focusAreas: ["Trees", "Binary Search", "Sliding Window"]
      },
      {
        title: "Onsite Coding 2",
        duration: "45 mins",
        description: "2 algorithmic problems focused on Graphs, Heaps, and Dynamic Programming.",
        focusAreas: ["Graphs", "Heap", "Hash Table"]
      },
      {
        title: "System Design / Behavioral",
        duration: "45 mins",
        description: "Distributed system architecture (Feed, Messenger, Video platform) or behavioral stories.",
        focusAreas: ["Scalability", "Caching", "Meta Values"]
      }
    ],
    popularCategories: [
      { name: "Trees & Recursion", percentage: 30 },
      { name: "Arrays & Strings", percentage: 30 },
      { name: "Two Pointers & Sliding Window", percentage: 25 },
      { name: "Binary Search & Heap", percentage: 15 }
    ],
    topProblemIds: [
      "valid-palindrome",
      "3sum",
      "product-of-array-except-self",
      "group-anagrams",
      "valid-parentheses",
      "top-k-frequent-elements",
      "longest-substring-without-repeating-characters"
    ],
    interviewTips: [
      "Practice solving tagged Meta questions within 15-18 minutes per problem.",
      "Aim for zero syntax errors and explain your approach concisely before writing code.",
      "Meta heavily repeats questions from its top-50 6-month frequency list."
    ]
  },
  {
    slug: "amazon",
    name: "Amazon",
    logo: "A",
    color: "from-amber-500 to-orange-600",
    description: "Heavily evaluates Amazon Leadership Principles (LP) alongside Trees, Graphs, Priority Queues, and Breadth-First Search.",
    tier: "FAANG / Big Tech",
    totalQuestions: 178,
    hiringBar: "LP Weighted (50% Leadership Principles, 50% DSA & System Design)",
    interviewRounds: [
      {
        title: "Online Assessment (OA)",
        duration: "90 mins",
        description: "2 DSA questions + Work Style Assessment & LP situational judgment test.",
        focusAreas: ["Arrays", "Strings", "Sorting", "Priority Queue"]
      },
      {
        title: "Onsite Round 1: Problem Solving & Customer Obsession",
        duration: "60 mins",
        description: "25 mins LP deep dive + 35 mins coding on Trees/Graphs.",
        focusAreas: ["Trees", "BFS/DFS", "Customer Obsession"]
      },
      {
        title: "Onsite Round 2: Data Structures & Ownership",
        duration: "60 mins",
        description: "25 mins LP + 35 mins Priority Queues / Dynamic Programming.",
        focusAreas: ["Heaps", "DP", "Ownership"]
      },
      {
        title: "Onsite Round 3: Bar Raiser",
        duration: "60 mins",
        description: "Independent interviewer testing culture fit, depth of technical competence, and Learn & Be Curious.",
        focusAreas: ["Bar Raiser LP", "Complex Algorithms"]
      }
    ],
    popularCategories: [
      { name: "Trees & Graphs", percentage: 35 },
      { name: "Arrays & Hashing", percentage: 25 },
      { name: "Heap & Priority Queue", percentage: 20 },
      { name: "Dynamic Programming", percentage: 20 }
    ],
    topProblemIds: [
      "number-of-islands",
      "top-k-frequent-elements",
      "course-schedule",
      "coin-change",
      "best-time-to-buy-and-sell-stock",
      "two-sum",
      "group-anagrams"
    ],
    interviewTips: [
      "Prepare at least 2 STAR method stories for all 16 Leadership Principles.",
      "Focus on customer-centric trade-offs and error handling.",
      "Expect questions involving order fulfillment grids (BFS) and top items (Heaps)."
    ]
  },
  {
    slug: "apple",
    name: "Apple",
    logo: "",
    color: "from-gray-400 to-gray-700",
    description: "Emphasis on memory efficiency, hardware-level performance implications, low-level data structures, and rock-solid code quality.",
    tier: "FAANG / Big Tech",
    totalQuestions: 98,
    hiringBar: "High Craftsmanship & Low-Level Efficiency",
    interviewRounds: [
      {
        title: "Screening Call",
        duration: "45 mins",
        description: "Data structure basics, memory management, and 1 Medium algorithmic question.",
        focusAreas: ["Arrays", "Pointers", "Bit Manipulation"]
      },
      {
        title: "Onsite Technical Rounds (3-4 rounds)",
        duration: "45-60 mins each",
        description: "Deep dive into algorithms, concurrency, system design, and domain expertise.",
        focusAreas: ["Algorithms", "Concurrency", "Optimization"]
      }
    ],
    popularCategories: [
      { name: "Arrays & Two Pointers", percentage: 30 },
      { name: "Trees & Recursion", percentage: 25 },
      { name: "Bit Manipulation", percentage: 25 },
      { name: "Dynamic Programming", percentage: 20 }
    ],
    topProblemIds: [
      "two-sum",
      "3sum",
      "valid-parentheses",
      "product-of-array-except-self",
      "binary-search",
      "search-in-rotated-sorted-array"
    ],
    interviewTips: [
      "Be prepared to discuss in-place memory modifications and cache locality.",
      "Keep code modular with clear variable naming."
    ]
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    logo: "MS",
    color: "from-cyan-500 to-blue-600",
    description: "Broad algorithmic questions with a strong emphasis on linked lists, trees, strings, and growth mindset.",
    tier: "FAANG / Big Tech",
    totalQuestions: 135,
    hiringBar: "Structured Problem Solving & Collaboration",
    interviewRounds: [
      {
        title: "Online Assessment (Codility)",
        duration: "80 mins",
        description: "2-3 coding problems covering strings, arrays, and greedy approaches.",
        focusAreas: ["Strings", "Greedy", "Math"]
      },
      {
        title: "Onsite Loop (4 rounds)",
        duration: "45-60 mins each",
        description: "Mix of algorithms, object-oriented design, system design, and behavioral.",
        focusAreas: ["Trees", "Graphs", "OOP", "Growth Mindset"]
      }
    ],
    popularCategories: [
      { name: "Arrays & Strings", percentage: 35 },
      { name: "Trees & Linked Lists", percentage: 30 },
      { name: "Dynamic Programming", percentage: 20 },
      { name: "Graphs", percentage: 15 }
    ],
    topProblemIds: [
      "valid-parentheses",
      "two-sum",
      "longest-substring-without-repeating-characters",
      "course-schedule",
      "climbing-stairs",
      "number-of-islands"
    ],
    interviewTips: [
      "Demonstrate learning and adaptability when receiving hints from the interviewer.",
      "Write test cases for edge conditions before running."
    ]
  },
  {
    slug: "netflix",
    name: "Netflix",
    logo: "N",
    color: "from-red-600 to-rose-800",
    description: "High senior-level bar focusing on concurrency, distributed systems, streaming architectures, and high-performance algorithms.",
    tier: "FAANG / Big Tech",
    totalQuestions: 75,
    hiringBar: "Very Senior & High Autonomy",
    interviewRounds: [
      {
        title: "Recruiter & Tech Screen",
        duration: "45 mins",
        description: "Senior technical assessment covering system architecture and data structures.",
        focusAreas: ["Concurrency", "Data Structures", "System Design"]
      },
      {
        title: "Onsite Panel (4-5 rounds)",
        duration: "45 mins each",
        description: "Algorithmic problem solving, distributed systems, and deep culture fit.",
        focusAreas: ["Algorithms", "High Scale", "Freedom & Responsibility"]
      }
    ],
    popularCategories: [
      { name: "Sliding Window & Intervals", percentage: 35 },
      { name: "Graphs & Topological Sort", percentage: 25 },
      { name: "Dynamic Programming", percentage: 20 },
      { name: "Design Data Structures", percentage: 20 }
    ],
    topProblemIds: [
      "longest-substring-without-repeating-characters",
      "group-anagrams",
      "course-schedule",
      "coin-change",
      "top-k-frequent-elements"
    ],
    interviewTips: [
      "Read the Netflix Culture Deck carefully; culture alignment is heavily evaluated.",
      "Discuss operational trade-offs, fault tolerance, and network latency."
    ]
  },
  {
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    logo: "GS",
    color: "from-sky-500 to-indigo-700",
    description: "Heavy focus on math, dynamic programming, arrays, financial simulation logic, and high-frequency calculation efficiency.",
    tier: "Top Tier Fintech",
    totalQuestions: 110,
    hiringBar: "High Quantitative & Algorithmic Rigor",
    interviewRounds: [
      {
        title: "HackerRank Assessment",
        duration: "60 mins",
        description: "Math, probability, and 2 medium algorithmic problems.",
        focusAreas: ["Math", "Arrays", "DP"]
      },
      {
        title: "Superday Coding Rounds (3-4 rounds)",
        duration: "45 mins each",
        description: "Deep algorithmic problem solving and low-latency considerations.",
        focusAreas: ["Dynamic Programming", "Two Pointers", "Strings"]
      }
    ],
    popularCategories: [
      { name: "Dynamic Programming & Math", percentage: 40 },
      { name: "Arrays & Strings", percentage: 30 },
      { name: "Two Pointers", percentage: 20 },
      { name: "Heaps", percentage: 10 }
    ],
    topProblemIds: [
      "best-time-to-buy-and-sell-stock",
      "coin-change",
      "3sum",
      "valid-anagram",
      "climbing-stairs"
    ],
    interviewTips: [
      "Be prepared for mathematical proofs and edge-case boundary conditions.",
      "Understand Big-O time and space trade-offs thoroughly."
    ]
  },
  {
    slug: "bloomberg",
    name: "Bloomberg",
    logo: "BB",
    color: "from-blue-500 to-cyan-600",
    description: "Famous for LRU Cache, design data structures, custom heaps, and string manipulation for market feed data.",
    tier: "Top Tier Fintech",
    totalQuestions: 125,
    hiringBar: "High Practical Engineering & Data Structure Design",
    interviewRounds: [
      {
        title: "Technical Screen",
        duration: "45 mins",
        description: "1-2 problems on custom data structure design and string manipulation.",
        focusAreas: ["Data Structure Design", "Hash Maps", "Linked Lists"]
      },
      {
        title: "Onsite Coding (3 rounds)",
        duration: "60 mins each",
        description: "Algorithms, low-level design, and engineering manager round.",
        focusAreas: ["LRU Cache", "Heap", "Two Pointers", "Trees"]
      }
    ],
    popularCategories: [
      { name: "Data Structure Design", percentage: 35 },
      { name: "Two Pointers & Sliding Window", percentage: 25 },
      { name: "Trees & Graphs", percentage: 25 },
      { name: "Arrays & Strings", percentage: 15 }
    ],
    topProblemIds: [
      "two-sum",
      "valid-parentheses",
      "3sum",
      "top-k-frequent-elements",
      "container-with-most-water",
      "group-anagrams"
    ],
    interviewTips: [
      "Master LRU Cache and custom priority queue implementations.",
      "Expect questions that mimic ticker data or order book streams."
    ]
  }
];
