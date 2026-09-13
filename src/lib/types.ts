export type AlgorithmCategory = "sorting" | "searching" | "graph" | "tree" | "dp";

export interface ExecutionStep {
  array?: number[];
  highlights?: { [index: number]: "compare" | "swap" | "sorted" | "pivot" | "selected" | "target" };
  variables?: Record<string, string | number | boolean | null | undefined>;
  message?: string;
  line?: number;
  stats?: {
    comparisons?: number;
    swaps?: number;
    accesses?: number;
    operations?: number;
  };
  // Graph specific step data
  graphData?: {
    nodes?: Array<{ id: string; x: number; y: number; label: string; state?: "unvisited" | "visiting" | "visited" | "path" }>;
    edges?: Array<{ from: string; to: string; weight?: number; active?: boolean; inPath?: boolean }>;
    grid?: number[][]; // 0: empty, 1: wall, 2: start, 3: end, 4: visited, 5: path
  };
}

export interface ExecutionResult {
  success: boolean;
  steps: ExecutionStep[];
  error?: string;
  totalTimeMs?: number;
  logs: string[];
}

export interface AlgorithmPreset {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  code: string;
  defaultData: number[];
}

export type PlaybackSpeed = 0.25 | 0.5 | 1 | 2 | 5 | 10;
