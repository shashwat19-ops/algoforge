import { TestCase } from "@/data/problems";

export interface TestResult {
  testCaseIndex: number;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  executionTimeMs: number;
  error?: string;
  logs?: string[];
}

export interface ProblemRunResult {
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit Exceeded";
  results: TestResult[];
  passedCount: number;
  totalCount: number;
  runtimeMs: number;
  memoryKb: number;
  stdout: string[];
  errorMessage?: string;
}

export function runJavaScriptProblem(
  userCode: string,
  functionName: string,
  testCases: TestCase[]
): ProblemRunResult {
  const startTime = performance.now();
  const allLogs: string[] = [];
  const results: TestResult[] = [];
  let passedCount = 0;

  // Sandbox console.log
  const customConsole = {
    log: (...args: any[]) => {
      const formatted = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      allLogs.push(formatted);
    },
    error: (...args: any[]) => {
      allLogs.push("[ERROR] " + args.map((a) => String(a)).join(" "));
    },
    warn: (...args: any[]) => {
      allLogs.push("[WARN] " + args.map((a) => String(a)).join(" "));
    },
  };

  try {
    // Construct executable function inside safe scope
    const wrappedCode = `
      ${userCode}
      if (typeof ${functionName} === 'function') {
        return ${functionName};
      }
      throw new Error("Function '${functionName}' is not defined in your code.");
    `;

    const runner = new Function("console", wrappedCode);
    const userFn = runner(customConsole);

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const caseStartTime = performance.now();
      let actualOutput: any;
      let isError = false;
      let errorMsg: string | undefined;

      try {
        // Deep clone input so user mutation doesn't taint subsequent operations
        const clonedInput = JSON.parse(JSON.stringify(tc.input));
        actualOutput = userFn(...clonedInput);
      } catch (err: any) {
        isError = true;
        errorMsg = err.message || String(err);
      }

      const caseDuration = Math.round((performance.now() - caseStartTime) * 100) / 100;

      const isPassed = !isError && deepEqual(actualOutput, tc.expected);
      if (isPassed) passedCount++;

      results.push({
        testCaseIndex: i,
        passed: isPassed,
        input: tc.displayInput,
        expected: tc.displayExpected,
        actual: isError ? `Error: ${errorMsg}` : JSON.stringify(actualOutput),
        executionTimeMs: caseDuration,
        error: errorMsg,
      });
    }

    const totalRuntime = Math.max(1, Math.round(performance.now() - startTime));
    // Approximate memory footprint (simulated standard LeetCode range 41-45MB)
    const memoryKb = Math.floor(41000 + Math.random() * 4000);

    const isAllPassed = passedCount === testCases.length;

    return {
      status: isAllPassed ? "Accepted" : "Wrong Answer",
      results,
      passedCount,
      totalCount: testCases.length,
      runtimeMs: totalRuntime,
      memoryKb,
      stdout: allLogs,
    };
  } catch (err: any) {
    const totalRuntime = Math.max(1, Math.round(performance.now() - startTime));
    return {
      status: "Runtime Error",
      results: [],
      passedCount: 0,
      totalCount: testCases.length,
      runtimeMs: totalRuntime,
      memoryKb: 0,
      stdout: allLogs,
      errorMessage: err.message || "Failed to execute JavaScript code.",
    };
  }
}

// Deep comparison helper for arrays, sets, numbers, booleans, objects
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;

  if (typeof a !== typeof b) return false;

  if (typeof a === "number" && typeof b === "number") {
    // Handle floating point precision
    return Math.abs(a - b) < 1e-6;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    // Check if both are nested arrays of 2D coordinates or order-independent sets (like 3Sum / Group Anagrams)
    const areArrayElementsArrays = a.length > 0 && Array.isArray(a[0]);
    if (areArrayElementsArrays) {
      // Sort stringified representations if order doesn't matter
      const sortedA = a.map((item) => (Array.isArray(item) ? [...item].sort() : item)).sort();
      const sortedB = b.map((item) => (Array.isArray(item) ? [...item].sort() : item)).sort();
      return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}
