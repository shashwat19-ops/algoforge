export interface RoleTrack {
  slug: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  salaryRange: string;
  keySkills: string[];
  dsaWeight: string; // e.g. "High (40% of interview)"
  recommendedProblemIds: string[];
  trackPhases: Array<{
    phase: string;
    description: string;
    patterns: string[];
  }>;
  interviewBreakdown: {
    dsa: number;
    systemDesign: number;
    domainKnowledge: number;
    behavioral: number;
  };
}

export const ROLES: RoleTrack[] = [
  {
    slug: "frontend",
    title: "Frontend Engineer",
    icon: "Layout",
    color: "from-blue-500 to-cyan-500",
    description: "Master essential algorithms for UI state trees, DOM reconciliation, virtual scrolling, debounce/throttle queues, and responsive client caching.",
    salaryRange: "$130,000 - $240,000",
    keySkills: ["DOM manipulation", "Tree traversal", "State management", "Virtual DOM diffing", "Async queues", "Debounce/Throttle"],
    dsaWeight: "Moderate to High (35-50% of technical loops)",
    recommendedProblemIds: [
      "two-sum",
      "valid-parentheses",
      "valid-anagram",
      "longest-substring-without-repeating-characters",
      "group-anagrams",
      "climbing-stairs",
      "binary-search"
    ],
    trackPhases: [
      {
        phase: "Phase 1: String & Object Manipulation",
        description: "Master hash maps, JSON traversal, and string operations essential for frontend data handling.",
        patterns: ["Arrays & Hashing", "Two Pointers"]
      },
      {
        phase: "Phase 2: Tree & Graph UI Structures",
        description: "DOM trees, component hierarchies, and routing DAGs.",
        patterns: ["Trees & BFS/DFS", "Topological Sort"]
      },
      {
        phase: "Phase 3: Sliding Windows & Queues",
        description: "Virtual scrolling, rate-limiting, and debounced events.",
        patterns: ["Sliding Window", "Monotonic Stack"]
      }
    ],
    interviewBreakdown: {
      dsa: 40,
      systemDesign: 25,
      domainKnowledge: 25,
      behavioral: 10
    }
  },
  {
    slug: "backend",
    title: "Backend Engineer",
    icon: "Server",
    color: "from-emerald-500 to-teal-600",
    description: "Deep algorithmic problem solving focusing on high-throughput services, graph dependency resolution, caching layers, and database query optimizations.",
    salaryRange: "$140,000 - $260,000",
    keySkills: ["Distributed Systems", "Graph Algorithms", "Database Indexing", "Caching", "Concurrency", "API Architecture"],
    dsaWeight: "High (50-60% of technical loops)",
    recommendedProblemIds: [
      "course-schedule",
      "number-of-islands",
      "coin-change",
      "top-k-frequent-elements",
      "product-of-array-except-self",
      "search-in-rotated-sorted-array",
      "3sum"
    ],
    trackPhases: [
      {
        phase: "Phase 1: Fast Lookup & Aggregations",
        description: "Master Hash Tables, Prefix Sums, and Heaps for high-volume telemetry and leaderboard aggregations.",
        patterns: ["Arrays & Hashing", "Heap / Priority Queue"]
      },
      {
        phase: "Phase 2: Graph Networks & Dependency Resolution",
        description: "Package managers, build pipelines, and microservice topology with BFS, DFS, and topological sort.",
        patterns: ["Graphs", "Topological Sort", "Union Find"]
      },
      {
        phase: "Phase 3: Dynamic Programming & Optimization",
        description: "Resource scheduling, rate-limiting tokens, and knapsack resource allocation.",
        patterns: ["1D DP", "2D DP", "Greedy"]
      }
    ],
    interviewBreakdown: {
      dsa: 50,
      systemDesign: 30,
      domainKnowledge: 10,
      behavioral: 10
    }
  },
  {
    slug: "fullstack",
    title: "Full-Stack Engineer",
    icon: "Layers",
    color: "from-purple-500 to-pink-600",
    description: "Balanced preparation covering end-to-end web architectures, client-server data synchronization, pagination algorithms, and CRUD optimizations.",
    salaryRange: "$135,000 - $250,000",
    keySkills: ["Full lifecycle engineering", "GraphQL/REST", "SQL/NoSQL", "React/Next.js", "Authentication", "Realtime WebSockets"],
    dsaWeight: "Moderate to High (40-50% of technical loops)",
    recommendedProblemIds: [
      "two-sum",
      "valid-palindrome",
      "best-time-to-buy-and-sell-stock",
      "valid-parentheses",
      "group-anagrams",
      "number-of-islands",
      "climbing-stairs"
    ],
    trackPhases: [
      {
        phase: "Phase 1: Foundation DSA",
        description: "Arrays, strings, hash maps, and two pointers.",
        patterns: ["Arrays & Hashing", "Two Pointers", "Sliding Window"]
      },
      {
        phase: "Phase 2: Data Structures & Trees",
        description: "Binary search, trees, and linked list manipulations.",
        patterns: ["Binary Search", "Trees", "Stack"]
      },
      {
        phase: "Phase 3: System Algorithms",
        description: "Basic graphs and dynamic programming fundamentals.",
        patterns: ["Graphs", "1D DP"]
      }
    ],
    interviewBreakdown: {
      dsa: 45,
      systemDesign: 30,
      domainKnowledge: 15,
      behavioral: 10
    }
  },
  {
    slug: "systems",
    title: "Distributed Systems & Infrastructure",
    icon: "Cpu",
    color: "from-amber-500 to-red-600",
    description: "Low-level data structures, consensus protocols, bitwise operations, lock-free queues, and cache coherence algorithms.",
    salaryRange: "$150,000 - $285,000",
    keySkills: ["Raft/Paxos", "Memory Management", "Bit Manipulation", "Lock-free structures", "OS internals", "Network programming"],
    dsaWeight: "Very High (60-70% of technical loops)",
    recommendedProblemIds: [
      "product-of-array-except-self",
      "search-in-rotated-sorted-array",
      "top-k-frequent-elements",
      "course-schedule",
      "coin-change",
      "number-of-islands"
    ],
    trackPhases: [
      {
        phase: "Phase 1: Bit Manipulation & Memory",
        description: "Bitwise arithmetic, masks, and pointer manipulations.",
        patterns: ["Bit Manipulation", "Arrays"]
      },
      {
        phase: "Phase 2: Custom Data Structure Design",
        description: "LRU/LFU cache, Segment Trees, Trie, and Bloom Filters.",
        patterns: ["Tries", "Heap", "Design"]
      },
      {
        phase: "Phase 3: Complex Graph Routing",
        description: "Shortest path, Minimum Spanning Tree, and Network Flow.",
        patterns: ["Advanced Graphs", "Union Find"]
      }
    ],
    interviewBreakdown: {
      dsa: 55,
      systemDesign: 35,
      domainKnowledge: 5,
      behavioral: 5
    }
  },
  {
    slug: "ai-ml",
    title: "Machine Learning & AI Engineer",
    icon: "Sparkles",
    color: "from-violet-500 to-purple-700",
    description: "Matrix math, dynamic programming, vector search, graph neural network topology, and efficient tensor indexing algorithms.",
    salaryRange: "$155,000 - $290,000",
    keySkills: ["PyTorch/JAX", "Vector Embeddings", "Matrix Factorization", "Search & Ranking", "DP Algorithms", "Distributed Training"],
    dsaWeight: "High (50% of technical loops)",
    recommendedProblemIds: [
      "3sum",
      "top-k-frequent-elements",
      "coin-change",
      "course-schedule",
      "container-with-most-water",
      "two-sum"
    ],
    trackPhases: [
      {
        phase: "Phase 1: Vector & Matrix Operations",
        description: "2D Array transformations, prefix products, and fast lookups.",
        patterns: ["Arrays & Hashing", "Two Pointers"]
      },
      {
        phase: "Phase 2: Tree Search & Graph Embeddings",
        description: "Beam search, decision trees, and graph embeddings.",
        patterns: ["Trees", "Graphs", "Heap"]
      },
      {
        phase: "Phase 3: DP & Loss Optimization",
        description: "Viterbi algorithm, dynamic programming, and greedy beam searches.",
        patterns: ["1D DP", "2D DP", "Greedy"]
      }
    ],
    interviewBreakdown: {
      dsa: 45,
      systemDesign: 25,
      domainKnowledge: 20,
      behavioral: 10
    }
  },
  {
    slug: "quant",
    title: "Quantitative Developer",
    icon: "TrendingUp",
    color: "from-emerald-400 to-green-700",
    description: "Ultra-low-latency algorithms, mathematical optimizations, order matching engines, and statistical DP modeling.",
    salaryRange: "$180,000 - $400,000+",
    keySkills: ["C++20/Rust", "Low Latency", "Probability & Math", "Order Book Design", "SIMD Optimization", "Cache Locality"],
    dsaWeight: "Extreme (70-80% of technical loops)",
    recommendedProblemIds: [
      "best-time-to-buy-and-sell-stock",
      "search-in-rotated-sorted-array",
      "3sum",
      "coin-change",
      "top-k-frequent-elements",
      "product-of-array-except-self"
    ],
    trackPhases: [
      {
        phase: "Phase 1: Numerical Optimization & Math",
        description: "Binary search on answers, prefix products, and bitwise tricks.",
        patterns: ["Binary Search", "Bit Manipulation", "Math"]
      },
      {
        phase: "Phase 2: Sliding Window & Priority Queues",
        description: "Moving averages, order book priority queues, and monotonic queues.",
        patterns: ["Sliding Window", "Heap / Priority Queue", "Monotonic Stack"]
      },
      {
        phase: "Phase 3: Advanced DP & Game Theory",
        description: "Stochastic DP, minimax, and memoized simulations.",
        patterns: ["2D DP", "Intervals"]
      }
    ],
    interviewBreakdown: {
      dsa: 70,
      systemDesign: 15,
      domainKnowledge: 10,
      behavioral: 5
    }
  }
];
