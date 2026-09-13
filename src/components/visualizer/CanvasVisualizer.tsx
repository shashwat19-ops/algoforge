"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { ExecutionStep } from "@/lib/types";

interface CanvasVisualizerProps {
  currentStep?: ExecutionStep;
  isComplete?: boolean;
}

export const CanvasVisualizer: React.FC<CanvasVisualizerProps> = ({
  currentStep,
  isComplete = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevStepRef = useRef<ExecutionStep | undefined>(undefined);

  // Trigger celebratory confetti on completion
  useEffect(() => {
    if (isComplete) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#10b981", "#ec4899", "#f59e0b", "#3b82f6"],
      });
    }
  }, [isComplete]);

  // Main canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = Math.max(rect.height, 350);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Draw dark grid background pattern
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (!currentStep) {
      // Empty placeholder state
      ctx.fillStyle = "#64748b";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("Click 'Compile & Run' or 'Play' to start visualization", width / 2, height / 2);
      return;
    }

    // Check if graph / grid data is present
    if (currentStep.graphData?.grid) {
      drawGridGraph(ctx, width, height, currentStep.graphData.grid);
      return;
    }

    // Default: Array Bar Visualizer
    if (currentStep.array && currentStep.array.length > 0) {
      drawArrayBars(ctx, width, height, currentStep.array, currentStep.highlights || {});
    }

    prevStepRef.current = currentStep;
  }, [currentStep]);

  // Helper to draw array bars
  const drawArrayBars = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    arr: number[],
    highlights: Record<number, string>
  ) => {
    const padding = 30;
    const bottomPadding = 45;
    const renderWidth = width - padding * 2;
    const renderHeight = height - padding - bottomPadding;

    const maxVal = Math.max(...arr, 100);
    const n = arr.length;
    const gap = Math.max(2, Math.min(8, renderWidth / (n * 5)));
    const barWidth = Math.max(4, (renderWidth - gap * (n - 1)) / n);

    arr.forEach((val, idx) => {
      const barHeight = Math.max(6, (val / maxVal) * renderHeight);
      const x = padding + idx * (barWidth + gap);
      const y = height - bottomPadding - barHeight;

      const state = highlights[idx];

      // Determine bar colors and gradient
      let fillTop = "#4f46e5";
      let fillBottom = "#3730a3";
      let glowColor = "rgba(79, 70, 229, 0.4)";

      if (state === "compare") {
        fillTop = "#f59e0b"; // amber
        fillBottom = "#b45309";
        glowColor = "rgba(245, 158, 11, 0.6)";
      } else if (state === "swap") {
        fillTop = "#ef4444"; // rose red
        fillBottom = "#b91c1c";
        glowColor = "rgba(239, 68, 68, 0.6)";
      } else if (state === "sorted") {
        fillTop = "#10b981"; // emerald green
        fillBottom = "#047857";
        glowColor = "rgba(16, 185, 129, 0.6)";
      } else if (state === "pivot") {
        fillTop = "#ec4899"; // pink/purple
        fillBottom = "#be185d";
        glowColor = "rgba(236, 72, 153, 0.6)";
      } else if (state === "selected" || state === "target") {
        fillTop = "#06b6d4"; // cyan
        fillBottom = "#0e7490";
        glowColor = "rgba(6, 182, 212, 0.6)";
      }

      // Draw glow if active
      if (state) {
        ctx.save();
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12;
      }

      // Bar gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, fillTop);
      gradient.addColorStop(1, fillBottom);

      ctx.fillStyle = gradient;
      const radius = Math.min(4, barWidth / 2);

      // Rounded rectangle top
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, y + barHeight);
      ctx.lineTo(x, y + barHeight);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      if (state) {
        ctx.restore();
      }

      // Render value text on top if bars are wide enough
      if (barWidth >= 16) {
        ctx.fillStyle = "#cbd5e1";
        ctx.font = `${Math.min(11, Math.max(9, barWidth * 0.45))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        ctx.fillText(String(val), x + barWidth / 2, y - 6);
      }

      // Render index at the bottom
      if (barWidth >= 14 && n <= 35) {
        ctx.fillStyle = "#64748b";
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(String(idx), x + barWidth / 2, height - bottomPadding + 14);
      }
    });
  };

  // Helper to draw 2D Grid pathfinding graph
  const drawGridGraph = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    grid: number[][]
  ) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const padding = 20;

    const cellWidth = (width - padding * 2) / cols;
    const cellHeight = (height - padding * 2) / rows;
    const cellSize = Math.min(cellWidth, cellHeight);

    const startX = (width - cols * cellSize) / 2;
    const startY = (height - rows * cellSize) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const type = grid[r][c];
        const x = startX + c * cellSize;
        const y = startY + r * cellSize;

        // Colors based on cell type
        // 0: empty, 1: wall, 2: start, 3: end, 4: visited, 5: path
        if (type === 1) {
          ctx.fillStyle = "#334155"; // Wall
        } else if (type === 2) {
          ctx.fillStyle = "#10b981"; // Start (Green)
        } else if (type === 3) {
          ctx.fillStyle = "#ef4444"; // End (Red)
        } else if (type === 4) {
          ctx.fillStyle = "#6366f1"; // Visited (Indigo)
        } else if (type === 5) {
          ctx.fillStyle = "#facc15"; // Shortest Path (Gold Yellow)
        } else {
          ctx.fillStyle = "#1e293b"; // Empty cell
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;

        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        ctx.strokeRect(x, y, cellSize, cellSize);

        // Labels for Start & End
        if (type === 2 || type === 3) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(type === 2 ? "S" : "E", x + cellSize / 2, y + cellSize / 2);
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[350px] w-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-2xl"
    >
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Step Message & Variable HUD Overlay */}
      {currentStep && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-800/80 bg-slate-900/90 px-3.5 py-2 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <p className="text-xs font-medium text-slate-200 font-mono">
              {currentStep.message || "Executing operation..."}
            </p>
          </div>

          {currentStep.variables && Object.keys(currentStep.variables).length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              {Object.entries(currentStep.variables).map(([key, val]) => (
                <span
                  key={key}
                  className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 border border-slate-700/50"
                >
                  <span className="text-indigo-400">{key}:</span> {String(val)}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
