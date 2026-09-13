import { ARRAYS_HASHING_PROBLEMS } from "./problems/arraysHashing";
import { TWO_POINTERS_PROBLEMS } from "./problems/twoPointers";
import { SLIDING_WINDOW_PROBLEMS } from "./problems/slidingWindow";
import { STACK_PROBLEMS } from "./problems/stack";
import { BINARY_SEARCH_PROBLEMS } from "./problems/binarySearch";
import { LINKED_LIST_PROBLEMS } from "./problems/linkedList";
import { TREE_PROBLEMS } from "./problems/trees";
import { HEAP_TRIE_PROBLEMS } from "./problems/heapTries";
import { BACKTRACKING_PROBLEMS } from "./problems/backtracking";
import { GRAPH_PROBLEMS } from "./problems/graphs";
import { DYNAMIC_PROGRAMMING_PROBLEMS } from "./problems/dynamicProgramming";
import { GREEDY_INTERVALS_PROBLEMS } from "./problems/greedyIntervals";
import { MATH_BIT_PROBLEMS } from "./problems/mathBitManipulation";

export interface TestCase {
  input: any[];
  expected: any;
  displayInput: string;
  displayExpected: string;
}

export interface Approach {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  code: string;
}

export interface Editorial {
  overview: string;
  approaches: Approach[];
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  acceptance: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
  };
  solutionCode: {
    javascript: string;
    python: string;
  };
  editorial: Editorial;
  hints: string[];
  testCases: TestCase[];
  companies: string[];
  roles: string[];
  tags: string[];
  functionName: string;
}

export const PROBLEMS: Problem[] = [
  ...ARRAYS_HASHING_PROBLEMS,
  ...TWO_POINTERS_PROBLEMS,
  ...SLIDING_WINDOW_PROBLEMS,
  ...STACK_PROBLEMS,
  ...BINARY_SEARCH_PROBLEMS,
  ...LINKED_LIST_PROBLEMS,
  ...TREE_PROBLEMS,
  ...HEAP_TRIE_PROBLEMS,
  ...BACKTRACKING_PROBLEMS,
  ...GRAPH_PROBLEMS,
  ...DYNAMIC_PROGRAMMING_PROBLEMS,
  ...GREEDY_INTERVALS_PROBLEMS,
  ...MATH_BIT_PROBLEMS
];

export function getProblemById(id: string): Problem | undefined {
  return PROBLEMS.find((p) => p.id === id || String(p.number) === id);
}

export function getProblemsByCategory(category: string): Problem[] {
  return PROBLEMS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getAllCategories(): string[] {
  return Array.from(new Set(PROBLEMS.map((p) => p.category)));
}

export function getProblemDifficultyColor(difficulty: "Easy" | "Medium" | "Hard" | string): string {
  switch (difficulty) {
    case "Easy":
      return "#00B8A3"; // LeetCode official teal-green
    case "Medium":
      return "#FFC01E"; // LeetCode official gold-yellow
    case "Hard":
      return "#FF375F"; // LeetCode official crimson-red
    default:
      return "#8c8c8c";
  }
}

export function getDailyProblem(): Problem {
  // Deterministic daily problem based on day of year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return PROBLEMS[dayOfYear % PROBLEMS.length];
}
