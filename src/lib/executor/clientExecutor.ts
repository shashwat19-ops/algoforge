import { ExecutionResult, ExecutionStep } from "../types";

export class StepRecorder {
  public steps: ExecutionStep[] = [];
  public logs: string[] = [];
  private maxSteps: number = 2000;
  private comparisons: number = 0;
  private swaps: number = 0;
  private accesses: number = 0;

  constructor(maxSteps = 2000) {
    this.maxSteps = maxSteps;
  }

  log(...args: any[]) {
    const formatted = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
      .join(" ");
    this.logs.push(formatted);
  }

  record(step: ExecutionStep) {
    if (this.steps.length >= this.maxSteps) {
      if (this.steps.length === this.maxSteps) {
        this.logs.push("Step limit reached (2000 steps). Execution snapshot capped.");
      }
      return;
    }

    const recordedStats = {
      comparisons: this.comparisons,
      swaps: this.swaps,
      accesses: this.accesses,
      operations: this.comparisons + this.swaps + this.accesses,
      ...step.stats,
    };

    this.steps.push({
      ...step,
      array: step.array ? [...step.array] : undefined,
      highlights: step.highlights ? { ...step.highlights } : {},
      variables: step.variables ? { ...step.variables } : undefined,
      stats: recordedStats,
    });
  }

  compare(a: number, b: number): boolean {
    this.comparisons++;
    this.accesses += 2;
    return a < b;
  }

  swap(arr: number[], i: number, j: number) {
    this.swaps++;
    this.accesses += 4;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  resetStats() {
    this.comparisons = 0;
    this.swaps = 0;
    this.accesses = 0;
  }
}

export function executeAlgorithmCode(
  userCode: string,
  initialData: number[]
): ExecutionResult {
  const recorder = new StepRecorder();
  const startTime = performance.now();

  try {
    // Record initial step
    recorder.record({
      array: [...initialData],
      highlights: {},
      message: "Initial state",
      variables: { size: initialData.length },
    });

    // Provide a safe environment with helper utilities
    const context = {
      recorder,
      console: {
        log: (...args: any[]) => recorder.log(...args),
        warn: (...args: any[]) => recorder.log("[WARN]", ...args),
        error: (...args: any[]) => recorder.log("[ERR]", ...args),
      },
      data: [...initialData],
      Math,
      Array,
      Object,
      Number,
      String,
      Boolean,
    };

    const runner = new Function(
      "context",
      `
      const { recorder, console, data, Math, Array, Object, Number, String, Boolean } = context;
      let array = [...data];

      ${userCode}

      if (typeof run === "function") {
        run(array, recorder);
      }
      `
    );

    runner(context);

    // Final sorted / completed check step if array was used
    if (recorder.steps.length > 0) {
      const lastStep = recorder.steps[recorder.steps.length - 1];
      if (lastStep.array) {
        const finalHighlights: Record<number, "sorted"> = {};
        for (let i = 0; i < lastStep.array.length; i++) {
          finalHighlights[i] = "sorted";
        }
        recorder.record({
          array: lastStep.array,
          highlights: finalHighlights,
          message: "Execution completed successfully",
          variables: { status: "Done", totalSteps: recorder.steps.length },
        });
      }
    }

    const totalTimeMs = performance.now() - startTime;

    return {
      success: true,
      steps: recorder.steps,
      totalTimeMs,
      logs: recorder.logs,
    };
  } catch (err: any) {
    const totalTimeMs = performance.now() - startTime;
    return {
      success: false,
      steps: recorder.steps,
      error: err?.message || String(err),
      totalTimeMs,
      logs: recorder.logs,
    };
  }
}
