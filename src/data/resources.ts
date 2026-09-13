export interface ComplexityGuide {
  operation: string;
  dataStructure: string;
  timeBest: string;
  timeAvg: string;
  timeWorst: string;
  spaceWorst: string;
}

export interface DsaPattern {
  id: string;
  name: string;
  difficulty: string;
  description: string;
  identifyingClues: string[];
  templateCode: string;
  sampleProblems: string[];
}

export const BIG_O_COMPLEXITIES: ComplexityGuide[] = [
  { operation: "Access / Search", dataStructure: "Array", timeBest: "O(1)", timeAvg: "O(1) / O(n)", timeWorst: "O(n)", spaceWorst: "O(n)" },
  { operation: "Insert / Delete", dataStructure: "Array", timeBest: "O(1)", timeAvg: "O(n)", timeWorst: "O(n)", spaceWorst: "O(n)" },
  { operation: "Access / Search", dataStructure: "Hash Table", timeBest: "O(1)", timeAvg: "O(1)", timeWorst: "O(n)", spaceWorst: "O(n)" },
  { operation: "Insert / Delete", dataStructure: "Hash Table", timeBest: "O(1)", timeAvg: "O(1)", timeWorst: "O(n)", spaceWorst: "O(n)" },
  { operation: "Access / Search", dataStructure: "Binary Search Tree", timeBest: "O(1)", timeAvg: "O(log n)", timeWorst: "O(n)", spaceWorst: "O(n)" },
  { operation: "Insert / Delete", dataStructure: "Binary Search Tree", timeBest: "O(1)", timeAvg: "O(log n)", timeWorst: "O(n)", spaceWorst: "O(n)" },
  { operation: "Find Min / Max", dataStructure: "Min/Max Heap", timeBest: "O(1)", timeAvg: "O(1)", timeWorst: "O(1)", spaceWorst: "O(n)" },
  { operation: "Insert / Extract", dataStructure: "Min/Max Heap", timeBest: "O(1)", timeAvg: "O(log n)", timeWorst: "O(log n)", spaceWorst: "O(n)" },
  { operation: "Traversal (BFS/DFS)", dataStructure: "Graph (V, E)", timeBest: "O(V+E)", timeAvg: "O(V+E)", timeWorst: "O(V+E)", spaceWorst: "O(V)" }
];

export const DSA_PATTERNS: DsaPattern[] = [
  {
    id: "two-pointers",
    name: "Two Pointers Technique",
    difficulty: "Fundamental",
    description: "Use two pointers converging from ends or moving in tandem to eliminate redundant O(N^2) loops into clean O(N) linear scans.",
    identifyingClues: [
      "Input is sorted array or list",
      "Looking for pairs that meet target sum or condition",
      "In-place string or array reversal/palindrome checks"
    ],
    templateCode: `function twoPointers(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === target) return [left, right];
    else if (currentSum < target) left++;
    else right--;
  }
  return [];
}`,
    sampleProblems: ["3Sum", "Container With Most Water", "Valid Palindrome", "Two Sum II"]
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    difficulty: "Medium",
    description: "Maintain a dynamic or fixed sub-array window [left, right] to track optimal contiguous subarrays or substrings.",
    identifyingClues: [
      "Contiguous subarray, substring, or subsegment",
      "Finding minimum, maximum, or exact length with a constraint (e.g. at most K distinct chars)"
    ],
    templateCode: `function slidingWindow(s) {
  const windowMap = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);
    while (windowConditionViolated(windowMap)) {
      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    sampleProblems: ["Longest Substring Without Repeating Characters", "Minimum Window Substring", "Best Time to Buy and Sell Stock"]
  },
  {
    id: "topological-sort",
    name: "Topological Sort & Kahn's Algorithm",
    difficulty: "Medium - Hard",
    description: "Linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v.",
    identifyingClues: [
      "Prerequisite dependencies (take course A before course B)",
      "Build system compilation ordering",
      "Cycle detection in directed networks"
    ],
    templateCode: `function topoSort(numNodes, edges) {
  const inDegree = new Array(numNodes).fill(0);
  const adj = Array.from({ length: numNodes }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    inDegree[v]++;
  }
  const queue = [];
  for (let i = 0; i < numNodes; i++) if (inDegree[i] === 0) queue.push(i);
  let processed = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    processed++;
    for (const neighbor of adj[node]) {
      if (--inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return processed === numNodes;
}`,
    sampleProblems: ["Course Schedule", "Course Schedule II", "Alien Dictionary"]
  },
  {
    id: "dynamic-programming-1d",
    name: "1D Dynamic Programming",
    difficulty: "Medium",
    description: "Break down an optimization or counting problem into overlapping subproblems and store intermediate results.",
    identifyingClues: [
      "Count the number of ways to reach a state",
      "Find the minimum or maximum cost/value",
      "Decision at each step depends on previous sub-steps"
    ],
    templateCode: `function dynamicProgramming(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // base case
  for (let i = 1; i <= n; i++) {
    // state transition
    dp[i] = dp[i - 1] + (i >= 2 ? dp[i - 2] : 0);
  }
  return dp[n];
}`,
    sampleProblems: ["Climbing Stairs", "Coin Change", "House Robber", "Decode Ways"]
  }
];
