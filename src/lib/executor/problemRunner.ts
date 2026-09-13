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
    // Standard LeetCode data structures & helpers
    const environmentHelpers = `
      function ListNode(val, next) {
        this.val = (val===undefined ? 0 : val);
        this.next = (next===undefined ? null : next);
      }
      function TreeNode(val, left, right) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
      }
      function arrayToList(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return null;
        let head = new ListNode(arr[0]);
        let curr = head;
        for (let i = 1; i < arr.length; i++) {
          curr.next = new ListNode(arr[i]);
          curr = curr.next;
        }
        return head;
      }
      function listToArray(head) {
        const res = [];
        let curr = head;
        let count = 0;
        while (curr && count < 10000) {
          res.push(curr.val);
          curr = curr.next;
          count++;
        }
        return res;
      }
      function arrayToTree(arr) {
        if (!Array.isArray(arr) || arr.length === 0 || arr[0] === null) return null;
        const root = new TreeNode(arr[0]);
        const queue = [root];
        let i = 1;
        while (queue.length > 0 && i < arr.length) {
          const curr = queue.shift();
          if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            curr.left = new TreeNode(arr[i]);
            queue.push(curr.left);
          }
          i++;
          if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            curr.right = new TreeNode(arr[i]);
            queue.push(curr.right);
          }
          i++;
        }
        return root;
      }
      function treeToArray(root) {
        if (!root) return [];
        const res = [];
        const queue = [root];
        while (queue.length > 0) {
          const curr = queue.shift();
          if (curr) {
            res.push(curr.val);
            queue.push(curr.left);
            queue.push(curr.right);
          } else {
            res.push(null);
          }
        }
        while (res.length > 0 && res[res.length - 1] === null) {
          res.pop();
        }
        return res;
      }
    `;

    // Construct executable function inside safe scope
    const wrappedCode = `
      ${environmentHelpers}
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

        // Convert inputs if function expects ListNode / TreeNode
        const preparedArgs = clonedInput.map((arg: any) => {
          if (arg && typeof arg === "object" && arg.__isListNode) {
            return arrayToListHelper(arg.values);
          }
          if (arg && typeof arg === "object" && arg.__isTreeNode) {
            return arrayToTreeHelper(arg.values);
          }
          return arg;
        });

        actualOutput = userFn(...preparedArgs);

        // Normalize returned ListNode or TreeNode to standard array format for deepEqual
        if (actualOutput && typeof actualOutput === "object" && "val" in actualOutput) {
          if ("next" in actualOutput) {
            actualOutput = listToArrayHelper(actualOutput);
          } else if ("left" in actualOutput || "right" in actualOutput) {
            actualOutput = treeToArrayHelper(actualOutput);
          }
        }
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
    // Handle ListNode serialization comparison if one is ListNode and other is array
    if ("val" in a && ("next" in a || a.next === null)) {
      return deepEqual(listToArrayHelper(a), b);
    }
    if ("val" in b && ("next" in b || b.next === null)) {
      return deepEqual(a, listToArrayHelper(b));
    }
    // Handle TreeNode serialization comparison
    if ("val" in a && ("left" in a || "right" in a)) {
      return deepEqual(treeToArrayHelper(a), b);
    }
    if ("val" in b && ("left" in b || "right" in b)) {
      return deepEqual(a, treeToArrayHelper(b));
    }

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

export function arrayToListHelper(arr: any[]) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const head: any = { val: arr[0], next: null };
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = { val: arr[i], next: null };
    curr = curr.next;
  }
  return head;
}

export function listToArrayHelper(head: any) {
  const res: any[] = [];
  let curr = head;
  let count = 0;
  while (curr && count < 10000) {
    res.push(curr.val);
    curr = curr.next;
    count++;
  }
  return res;
}

export function arrayToTreeHelper(arr: any[]) {
  if (!Array.isArray(arr) || arr.length === 0 || arr[0] === null) return null;
  const root: any = { val: arr[0], left: null, right: null };
  const queue: any[] = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift();
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      curr.left = { val: arr[i], left: null, right: null };
      queue.push(curr.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      curr.right = { val: arr[i], left: null, right: null };
      queue.push(curr.right);
    }
    i++;
  }
  return root;
}

export function treeToArrayHelper(root: any) {
  if (!root) return [];
  const res: any[] = [];
  const queue: any[] = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr) {
      res.push(curr.val);
      queue.push(curr.left);
      queue.push(curr.right);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
}

