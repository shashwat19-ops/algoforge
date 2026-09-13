import { AlgorithmPreset } from "../types";

export const ALGORITHM_PRESETS: AlgorithmPreset[] = [
  {
    id: "quicksort",
    name: "Quick Sort",
    category: "sorting",
    description: "Efficient, recursive divide-and-conquer algorithm partitioning around a selected pivot element.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    defaultData: [55, 23, 89, 12, 67, 34, 91, 45, 78, 19, 82, 38, 51, 63, 27, 74],
    code: `// Quick Sort implementation with visualizer instrumentation
function run(arr, recorder) {
  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    recorder.record({
      array: arr,
      highlights: { [high]: "pivot", [low]: "selected" },
      message: \`Chosen pivot: \${pivot} at index \${high}\`,
      variables: { pivot, low, high, i }
    });

    for (let j = low; j < high; j++) {
      recorder.record({
        array: arr,
        highlights: { [j]: "compare", [high]: "pivot", ...(i >= low ? { [i]: "selected" } : {}) },
        message: \`Comparing arr[\${j}] (\${arr[j]}) with pivot \${pivot}\`,
        variables: { current: arr[j], pivot, i, j }
      });

      if (recorder.compare(arr[j], pivot)) {
        i++;
        if (i !== j) {
          recorder.swap(arr, i, j);
          recorder.record({
            array: arr,
            highlights: { [i]: "swap", [j]: "swap", [high]: "pivot" },
            message: \`Swapped \${arr[j]} and \${arr[i]}\`,
            variables: { swappedA: arr[i], swappedB: arr[j] }
          });
        }
      }
    }

    recorder.swap(arr, i + 1, high);
    recorder.record({
      array: arr,
      highlights: { [i + 1]: "sorted", [high]: "selected" },
      message: \`Placed pivot \${pivot} at final partitioned index \${i + 1}\`,
      variables: { pivotIndex: i + 1 }
    });

    return i + 1;
  }

  quickSort(0, arr.length - 1);
}
`,
  },
  {
    id: "mergesort",
    name: "Merge Sort",
    category: "sorting",
    description: "Stable, recursive divide-and-conquer algorithm that divides the array into halves and merges sorted sub-arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    defaultData: [42, 17, 88, 31, 95, 12, 56, 73, 29, 64, 83, 5, 49, 91, 37, 68],
    code: `// Merge Sort implementation
function run(arr, recorder) {
  function mergeSort(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    recorder.record({
      array: arr,
      highlights: { [left]: "selected", [mid]: "pivot", [right]: "selected" },
      message: \`Dividing range [\${left}..\${right}] at mid \${mid}\`,
      variables: { left, mid, right }
    });

    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      recorder.record({
        array: arr,
        highlights: { [k]: "compare", [left + i]: "selected", [mid + 1 + j]: "selected" },
        message: \`Merging: comparing \${leftArr[i]} and \${rightArr[j]}\`,
        variables: { k, iVal: leftArr[i], jVal: rightArr[j] }
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      recorder.record({
        array: arr,
        highlights: { [k]: "swap" },
        message: \`Placed \${arr[k]} at index \${k}\`,
        variables: { placed: arr[k], atIndex: k }
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      recorder.record({
        array: arr,
        highlights: { [k]: "swap" },
        message: \`Flushing remaining left element \${arr[k]} to index \${k}\`
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      recorder.record({
        array: arr,
        highlights: { [k]: "swap" },
        message: \`Flushing remaining right element \${arr[k]} to index \${k}\`
      });
      j++;
      k++;
    }
  }

  mergeSort(0, arr.length - 1);
}
`,
  },
  {
    id: "bubblesort",
    name: "Bubble Sort",
    category: "sorting",
    description: "Simple comparison-based sorting algorithm that repeatedly steps through the list, swapping adjacent elements if in wrong order.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    defaultData: [64, 34, 25, 12, 22, 11, 90, 48, 73, 56, 18, 82],
    code: `// Bubble Sort with early exit optimization
function run(arr, recorder) {
  const n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      recorder.record({
        array: arr,
        highlights: { [j]: "compare", [j + 1]: "compare" },
        message: \`Comparing arr[\${j}] (\${arr[j]}) and arr[\${j + 1}] (\${arr[j + 1]})\`,
        variables: { pass: i + 1, j, a: arr[j], b: arr[j + 1] }
      });

      if (recorder.compare(arr[j + 1], arr[j])) {
        recorder.swap(arr, j, j + 1);
        swapped = true;
        recorder.record({
          array: arr,
          highlights: { [j]: "swap", [j + 1]: "swap" },
          message: \`Swapped \${arr[j]} and \${arr[j + 1]}\`,
          variables: { swapped: true }
        });
      }
    }

    // Mark the last element of this pass as sorted
    const sortedIdx = n - i - 1;
    recorder.record({
      array: arr,
      highlights: { [sortedIdx]: "sorted" },
      message: \`Index \${sortedIdx} (\${arr[sortedIdx]}) is now in sorted position\`,
      variables: { confirmedSorted: arr[sortedIdx] }
    });

    if (!swapped) {
      recorder.log("Array is fully sorted early.");
      break;
    }
  }
}
`,
  },
  {
    id: "binarysearch",
    name: "Binary Search",
    category: "searching",
    description: "Fast logarithmic search algorithm for sorted datasets by repeatedly halving the search space.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    defaultData: [5, 12, 19, 23, 27, 34, 38, 45, 51, 63, 67, 74, 78, 82, 89, 91],
    code: `// Binary Search targeting element 63
function run(arr, recorder) {
  // Ensure array is sorted for binary search
  arr.sort((a, b) => a - b);
  const target = 63;
  let low = 0;
  let high = arr.length - 1;
  let foundIndex = -1;

  recorder.record({
    array: arr,
    highlights: {},
    message: \`Searching for target \${target} in sorted array\`,
    variables: { target, low, high }
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    recorder.record({
      array: arr,
      highlights: { [low]: "selected", [mid]: "pivot", [high]: "selected" },
      message: \`Examining mid index \${mid} with value \${arr[mid]}\`,
      variables: { low, mid, high, midVal: arr[mid], target }
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      recorder.record({
        array: arr,
        highlights: { [mid]: "target" },
        message: \`Target \${target} found at index \${mid}!\`,
        variables: { result: "FOUND", index: mid }
      });
      break;
    } else if (arr[mid] < target) {
      low = mid + 1;
      recorder.record({
        array: arr,
        highlights: { [mid]: "compare" },
        message: \`\${arr[mid]} < \${target}. Shifting search range to right [\${low}..\${high}]\`,
        variables: { newLow: low }
      });
    } else {
      high = mid - 1;
      recorder.record({
        array: arr,
        highlights: { [mid]: "compare" },
        message: \`\${arr[mid]} > \${target}. Shifting search range to left [\${low}..\${high}]\`,
        variables: { newHigh: high }
      });
    }
  }

  if (foundIndex === -1) {
    recorder.log("Target value not found in array");
  }
}
`,
  },
  {
    id: "dijkstra",
    name: "Grid Pathfinding (Dijkstra)",
    category: "graph",
    description: "Classic shortest-path algorithm exploring nodes in increasing order of distance from the source.",
    timeComplexity: {
      best: "O(V + E log V)",
      average: "O(V + E log V)",
      worst: "O(V²)",
    },
    spaceComplexity: "O(V)",
    defaultData: [15, 20], // 15 rows, 20 cols
    code: `// Grid Pathfinding Visualizer (Dijkstra / BFS)
function run(arr, recorder) {
  const rows = 12;
  const cols = 20;
  // 0: empty, 1: wall, 2: start, 3: end, 4: visited, 5: path
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  const start = { r: 2, c: 2 };
  const end = { r: 9, c: 17 };

  grid[start.r][start.c] = 2;
  grid[end.r][end.c] = 3;

  // Add some obstacle walls
  for (let r = 2; r < 10; r++) grid[r][8] = 1;
  for (let r = 0; r < 8; r++) grid[r][13] = 1;

  recorder.record({
    message: "Initialized Grid: Start (Green), End (Red), Obstacles (Gray)",
    graphData: { grid: grid.map(row => [...row]) },
    variables: { start: \`(\${start.r},\${start.c})\`, end: \`(\${end.r},\${end.c})\` }
  });

  const queue = [{ r: start.r, c: start.c, path: [] }];
  const visited = new Set();
  visited.add(\`\${start.r},\${start.c}\`);

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  let found = false;
  let finalPath = [];

  while (queue.length > 0) {
    const { r, c, path } = queue.shift();
    const currentPath = [...path, { r, c }];

    if (r === end.r && c === end.c) {
      found = true;
      finalPath = currentPath;
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      const key = \`\${nr},\${nc}\`;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(key)) {
        if (grid[nr][nc] !== 1) { // Not a wall
          visited.add(key);
          if (grid[nr][nc] !== 3 && grid[nr][nc] !== 2) {
            grid[nr][nc] = 4; // Visited
          }
          queue.push({ r: nr, c: nc, path: currentPath });
        }
      }
    }

    recorder.record({
      message: \`Exploring frontier from (\${r}, \${c})\`,
      graphData: { grid: grid.map(row => [...row]) },
      variables: { queueSize: queue.length, visitedTotal: visited.size }
    });
  }

  if (found) {
    for (const p of finalPath) {
      if (grid[p.r][p.c] !== 2 && grid[p.r][p.c] !== 3) {
        grid[p.r][p.c] = 5; // Final shortest path
      }
    }
    recorder.record({
      message: \`Shortest path found! Total length: \${finalPath.length} steps\`,
      graphData: { grid: grid.map(row => [...row]) },
      variables: { pathLength: finalPath.length, status: "OPTIMAL PATH REACHED" }
    });
  }
}
`,
  },
];
