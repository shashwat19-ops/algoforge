"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Sparkles,
  Zap,
  Layers,
  Grid,
  Search,
  ArrowRight,
  Info
} from "lucide-react";

type VisualizerCategory = "sorting" | "searching" | "pathfinding";

export default function VisualizerPage() {
  const [category, setCategory] = useState<VisualizerCategory>("sorting");

  // SORTING STATE
  const [arraySize, setArraySize] = useState<number>(24);
  const [sortingAlgo, setSortingAlgo] = useState<"bubble" | "selection" | "insertion">("bubble");
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortComparisons, setSortComparisons] = useState<number>(0);
  const [sortSwaps, setSortSwaps] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(40); // delay ms
  const sortingAbortRef = useRef<boolean>(false);

  // SEARCHING STATE
  const [searchArray, setSearchArray] = useState<number[]>([]);
  const [searchTarget, setSearchTarget] = useState<number>(42);
  const [searchLeft, setSearchLeft] = useState<number | null>(null);
  const [searchRight, setSearchRight] = useState<number | null>(null);
  const [searchMid, setSearchMid] = useState<number | null>(null);
  const [searchFoundIdx, setSearchFoundIdx] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchLogs, setSearchLogs] = useState<string[]>([]);

  // PATHFINDING 2D GRID STATE (15 rows x 25 cols)
  const GRID_ROWS = 14;
  const GRID_COLS = 24;
  const [startNode, setStartNode] = useState<{ r: number; c: number }>({ r: 2, c: 2 });
  const [endNode, setEndNode] = useState<{ r: number; c: number }>({ r: 11, c: 21 });
  const [gridWalls, setGridWalls] = useState<boolean[][]>(() =>
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false))
  );
  const [visitedNodes, setVisitedNodes] = useState<{ r: number; c: number }[]>([]);
  const [pathNodes, setPathNodes] = useState<{ r: number; c: number }[]>([]);
  const [isPathfinding, setIsPathfinding] = useState<boolean>(false);
  const [pathAlgo, setPathAlgo] = useState<"bfs" | "dijkstra">("bfs");
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  // Generate random sorting array
  const generateRandomArray = (size: number) => {
    const newArr: number[] = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 10);
    }
    setArray(newArr);
    setActiveIndices([]);
    setSortedIndices([]);
    setSortComparisons(0);
    setSortSwaps(0);
  };

  // Generate sorted array for binary search
  const generateSearchArray = () => {
    const sorted = [12, 18, 23, 29, 34, 42, 51, 58, 64, 70, 77, 83, 89, 95, 104, 112, 120];
    setSearchArray(sorted);
    setSearchLeft(null);
    setSearchRight(null);
    setSearchMid(null);
    setSearchFoundIdx(null);
    setSearchLogs(["Ready to search. Click 'Run Binary Search'."]);
  };

  useEffect(() => {
    generateRandomArray(arraySize);
    generateSearchArray();
  }, [arraySize]);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // --- SORTING ALGORITHMS ---
  const handleStartSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    sortingAbortRef.current = false;
    let arr = [...array];
    let comps = 0;
    let swaps = 0;

    if (sortingAlgo === "bubble") {
      const n = arr.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (sortingAbortRef.current) break;
          comps++;
          setSortComparisons(comps);
          setActiveIndices([j, j + 1]);
          await sleep(speed);

          if (arr[j] > arr[j + 1]) {
            swaps++;
            setSortSwaps(swaps);
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setArray([...arr]);
            await sleep(speed);
          }
        }
        setSortedIndices((prev) => [...prev, n - i - 1]);
      }
    } else if (sortingAlgo === "selection") {
      const n = arr.length;
      for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          if (sortingAbortRef.current) break;
          comps++;
          setSortComparisons(comps);
          setActiveIndices([minIdx, j]);
          await sleep(speed);

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          swaps++;
          setSortSwaps(swaps);
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          setArray([...arr]);
          await sleep(speed);
        }
        setSortedIndices((prev) => [...prev, i]);
      }
    } else if (sortingAlgo === "insertion") {
      const n = arr.length;
      setSortedIndices([0]);
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
          if (sortingAbortRef.current) break;
          comps++;
          swaps++;
          setSortComparisons(comps);
          setSortSwaps(swaps);
          setActiveIndices([j, j + 1]);
          arr[j + 1] = arr[j];
          setArray([...arr]);
          await sleep(speed);
          j = j - 1;
        }
        arr[j + 1] = key;
        setArray([...arr]);
        setSortedIndices((prev) => Array.from({ length: i + 1 }, (_, k) => k));
        await sleep(speed);
      }
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, k) => k));
    setIsSorting(false);
  };

  const handleStopSort = () => {
    sortingAbortRef.current = true;
    setIsSorting(false);
  };

  // --- BINARY SEARCH ALGORITHM ---
  const handleStartBinarySearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setSearchFoundIdx(null);
    let l = 0;
    let r = searchArray.length - 1;
    const logs: string[] = [];

    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      setSearchLeft(l);
      setSearchRight(r);
      setSearchMid(mid);
      logs.push(`Examining index ${mid} (value: ${searchArray[mid]}) | Search window [${l} .. ${r}]`);
      setSearchLogs([...logs]);
      await sleep(600);

      if (searchArray[mid] === searchTarget) {
        setSearchFoundIdx(mid);
        logs.push(`🎯 Target ${searchTarget} FOUND at index ${mid}!`);
        setSearchLogs([...logs]);
        setIsSearching(false);
        return;
      } else if (searchArray[mid] < searchTarget) {
        logs.push(`${searchArray[mid]} < ${searchTarget} → Discarding left half. Moving left pointer to ${mid + 1}.`);
        setSearchLogs([...logs]);
        l = mid + 1;
      } else {
        logs.push(`${searchArray[mid]} > ${searchTarget} → Discarding right half. Moving right pointer to ${mid - 1}.`);
        setSearchLogs([...logs]);
        r = mid - 1;
      }
      await sleep(400);
    }

    logs.push(`❌ Target ${searchTarget} was not found in array.`);
    setSearchLogs([...logs]);
    setIsSearching(false);
  };

  // --- PATHFINDING (BFS / DIJKSTRA) ---
  const handleRunPathfinding = async () => {
    if (isPathfinding) return;
    setIsPathfinding(true);
    setVisitedNodes([]);
    setPathNodes([]);

    const visited: boolean[][] = Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill(false)
    );
    const parent: Map<string, { r: number; c: number }> = new Map();
    const queue: { r: number; c: number }[] = [{ r: startNode.r, c: startNode.c }];
    visited[startNode.r][startNode.c] = true;

    const visitedHistory: { r: number; c: number }[] = [];
    let found = false;

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ];

    while (queue.length > 0) {
      const current = queue.shift()!;
      visitedHistory.push(current);

      if (current.r === endNode.r && current.c === endNode.c) {
        found = true;
        break;
      }

      for (const [dr, dc] of dirs) {
        const nr = current.r + dr;
        const nc = current.c + dc;

        if (
          nr >= 0 &&
          nr < GRID_ROWS &&
          nc >= 0 &&
          nc < GRID_COLS &&
          !visited[nr][nc] &&
          !gridWalls[nr][nc]
        ) {
          visited[nr][nc] = true;
          parent.set(`${nr},${nc}`, current);
          queue.push({ r: nr, c: nc });
        }
      }

      if (visitedHistory.length % 3 === 0) {
        setVisitedNodes([...visitedHistory]);
        await sleep(15);
      }
    }

    setVisitedNodes([...visitedHistory]);

    if (found) {
      // Reconstruct shortest path
      const path: { r: number; c: number }[] = [];
      let curr = endNode;
      while (curr && !(curr.r === startNode.r && curr.c === startNode.c)) {
        path.push(curr);
        const p = parent.get(`${curr.r},${curr.c}`);
        if (!p) break;
        curr = p;
      }
      path.push(startNode);
      path.reverse();

      for (let i = 0; i < path.length; i++) {
        setPathNodes(path.slice(0, i + 1));
        await sleep(25);
      }
    }

    setIsPathfinding(false);
  };

  const toggleWall = (r: number, c: number) => {
    if ((r === startNode.r && c === startNode.c) || (r === endNode.r && c === endNode.c)) {
      return;
    }
    const newWalls = gridWalls.map((rowArr, rowIdx) =>
      rowArr.map((cell, colIdx) => (rowIdx === r && colIdx === c ? !cell : cell))
    );
    setGridWalls(newWalls);
  };

  const clearGrid = () => {
    setGridWalls(
      Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false))
    );
    setVisitedNodes([]);
    setPathNodes([]);
  };

  const generateMaze = () => {
    const newWalls = Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill(false)
    );
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        if (
          (r === startNode.r && c === startNode.c) ||
          (r === endNode.r && c === endNode.c)
        ) {
          continue;
        }
        if (Math.random() < 0.28) {
          newWalls[r][c] = true;
        }
      }
    }
    setGridWalls(newWalls);
    setVisitedNodes([]);
    setPathNodes([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Zap className="h-3.5 w-3.5" />
              <span>Step-by-Step Execution</span>
            </div>
            <h1 className="text-3xl font-black text-white">
              Algorithm Studio & Visualizer
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Visualize sorting, searching, and 2D graph pathfinding algorithms with live state inspection.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setCategory("sorting")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                category === "sorting"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sorting
            </button>
            <button
              onClick={() => setCategory("searching")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                category === "searching"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Binary Search
            </button>
            <button
              onClick={() => setCategory("pathfinding")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                category === "pathfinding"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              2D Pathfinding
            </button>
          </div>
        </div>

        {/* --- 1. SORTING VISUALIZER --- */}
        {category === "sorting" && (
          <div className="space-y-6">
            {/* Control Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Algorithm Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Algorithm:</span>
                  <select
                    value={sortingAlgo}
                    onChange={(e: any) => setSortingAlgo(e.target.value)}
                    disabled={isSorting}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="bubble">Bubble Sort (O(N²))</option>
                    <option value="selection">Selection Sort (O(N²))</option>
                    <option value="insertion">Insertion Sort (O(N²))</option>
                  </select>
                </div>

                {/* Size Slider */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Size:</span>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={arraySize}
                    disabled={isSorting}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    className="w-24 accent-blue-500"
                  />
                  <span className="font-mono text-white font-bold">{arraySize}</span>
                </div>

                {/* Speed Slider */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Speed:</span>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={105 - speed}
                    onChange={(e) => setSpeed(105 - Number(e.target.value))}
                    className="w-20 accent-blue-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateRandomArray(arraySize)}
                  disabled={isSorting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-50 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Randomize</span>
                </button>

                {isSorting ? (
                  <button
                    onClick={handleStopSort}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all"
                  >
                    <Pause className="h-3.5 w-3.5" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartSort}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Sort Array</span>
                  </button>
                )}
              </div>
            </div>

            {/* Metrics HUD */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 font-medium uppercase">Comparisons</div>
                <div className="text-xl font-mono font-black text-amber-400 mt-0.5">
                  {sortComparisons}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 font-medium uppercase">Swaps / Shifts</div>
                <div className="text-xl font-mono font-black text-red-400 mt-0.5">
                  {sortSwaps}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 font-medium uppercase">Elements Sorted</div>
                <div className="text-xl font-mono font-black text-emerald-400 mt-0.5">
                  {sortedIndices.length} / {array.length}
                </div>
              </div>
            </div>

            {/* Bar Chart Stage */}
            <div className="h-72 rounded-2xl bg-[#0d121f] border border-slate-800 p-6 flex items-end justify-center gap-1.5 sm:gap-2">
              {array.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group"
                  >
                    <div
                      className={`w-full rounded-t-md transition-all duration-75 ${
                        isActive
                          ? "bg-amber-400 shadow-lg shadow-amber-400/50 scale-y-105"
                          : isSorted
                          ? "bg-emerald-500 shadow-sm shadow-emerald-500/20"
                          : "bg-blue-600 hover:bg-blue-500"
                      }`}
                      style={{ height: `${val}%` }}
                    />
                    {array.length <= 25 && (
                      <span className="text-[10px] font-mono text-slate-500 mt-1">
                        {val}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- 2. SEARCHING VISUALIZER --- */}
        {category === "searching" && (
          <div className="space-y-6">
            {/* Control Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Target Value:</span>
                  <input
                    type="number"
                    value={searchTarget}
                    disabled={isSearching}
                    onChange={(e) => setSearchTarget(Number(e.target.value))}
                    className="w-20 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={generateSearchArray}
                  disabled={isSearching}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-50 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleStartBinarySearch}
                  disabled={isSearching}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 disabled:opacity-50 transition-all"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Run Binary Search</span>
                </button>
              </div>
            </div>

            {/* Sorted Array Display */}
            <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 overflow-x-auto">
              <div className="flex items-center justify-center gap-2 min-w-max py-4">
                {searchArray.map((num, idx) => {
                  const isLeft = searchLeft === idx;
                  const isRight = searchRight === idx;
                  const isMid = searchMid === idx;
                  const isFound = searchFoundIdx === idx;
                  const isEliminated =
                    searchLeft !== null &&
                    searchRight !== null &&
                    (idx < searchLeft || idx > searchRight);

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      {/* Pointers Top Label */}
                      <div className="h-4 font-mono text-[10px] font-bold">
                        {isMid && <span className="text-amber-400">MID</span>}
                      </div>

                      {/* Box */}
                      <div
                        className={`w-12 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-sm border-2 transition-all ${
                          isFound
                            ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/40 scale-110"
                            : isMid
                            ? "bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/20 scale-105"
                            : isEliminated
                            ? "bg-slate-900/40 text-slate-600 border-slate-800/40 opacity-40"
                            : "bg-slate-900 text-slate-200 border-slate-700"
                        }`}
                      >
                        {num}
                      </div>

                      {/* Index Bottom Label */}
                      <div className="font-mono text-[10px] text-slate-500">
                        [{idx}]
                      </div>

                      {/* L / R marker */}
                      <div className="h-4 font-mono text-[10px] font-bold flex gap-1">
                        {isLeft && <span className="text-blue-400">L</span>}
                        {isRight && <span className="text-purple-400">R</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trace Step Log */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Execution Trace
              </div>
              <div className="space-y-1 font-mono text-xs text-slate-300 max-h-36 overflow-y-auto">
                {searchLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-slate-600">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 3. 2D GRID PATHFINDING --- */}
        {category === "pathfinding" && (
          <div className="space-y-6">
            {/* Control Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Path Algorithm:</span>
                  <select
                    value={pathAlgo}
                    onChange={(e: any) => setPathAlgo(e.target.value)}
                    disabled={isPathfinding}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="bfs">Breadth-First Search (Shortest Unweighted)</option>
                    <option value="dijkstra">Dijkstra&apos;s Algorithm</option>
                  </select>
                </div>

                <button
                  onClick={generateMaze}
                  disabled={isPathfinding}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Generate Maze
                </button>

                <button
                  onClick={clearGrid}
                  disabled={isPathfinding}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                >
                  Clear Walls
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunPathfinding}
                  disabled={isPathfinding}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 disabled:opacity-50 transition-all"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Find Shortest Path</span>
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-3 w-3 rounded-md bg-emerald-500"></span> Start Node
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-3 w-3 rounded-md bg-red-500"></span> Target Node
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-3 w-3 rounded-md bg-slate-700"></span> Obstacle Wall
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="h-3 w-3 rounded-md bg-amber-400"></span> Shortest Path
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Click on any cell to place or remove obstacle walls
              </span>
            </div>

            {/* 2D Grid Board */}
            <div
              className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 flex justify-center overflow-x-auto"
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
            >
              <div
                className="grid gap-[2px] bg-slate-800/40 p-2 rounded-xl"
                style={{
                  gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`
                }}
              >
                {Array.from({ length: GRID_ROWS }).map((_, r) =>
                  Array.from({ length: GRID_COLS }).map((_, c) => {
                    const isStart = startNode.r === r && startNode.c === c;
                    const isEnd = endNode.r === r && endNode.c === c;
                    const isWall = gridWalls[r][c];
                    const isPath = pathNodes.some((p) => p.r === r && p.c === c);
                    const isVisited =
                      !isPath && visitedNodes.some((v) => v.r === r && v.c === c);

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => toggleWall(r, c)}
                        onMouseEnter={() => {
                          if (isMouseDown) toggleWall(r, c);
                        }}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] cursor-pointer transition-colors duration-75 flex items-center justify-center text-[10px] font-bold ${
                          isStart
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40"
                            : isEnd
                            ? "bg-red-500 text-white shadow-md shadow-red-500/40"
                            : isPath
                            ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/40"
                            : isVisited
                            ? "bg-cyan-600/40 border border-cyan-500/20"
                            : isWall
                            ? "bg-slate-700 shadow-inner"
                            : "bg-[#0f1422] hover:bg-slate-800/80"
                        }`}
                      >
                        {isStart ? "S" : isEnd ? "E" : ""}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
