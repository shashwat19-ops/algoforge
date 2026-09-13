import { Problem } from "../problems";

export const GRAPH_PROBLEMS: Problem[] = [
  {
    id: "number-of-islands",
    number: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "59.1%",
    functionName: "numIslands",
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1"
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3"
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    // Write your code here

};`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") {
            return;
        }
        grid[r][c] = "0"; // sink the island
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "1") {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        islands = 0
        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != "1":
                return
            grid[r][c] = "0"
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":
                    islands += 1
                    dfs(r, c)
        return islands`
    },
    editorial: {
      overview: "Iterate over every cell. When '1' is found, increment island count and use DFS/BFS to sink all connected land cells to '0'.",
      approaches: [
        {
          name: "Approach: DFS Flood Fill / Island Sinking",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(M * N)",
          explanation: "For every unvisited '1', trigger DFS in all 4 cardinal directions and mark visited cells by mutating them to '0'.",
          code: `function numIslands(grid) {
    let count = 0;
    const dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
    };
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++)
            if (grid[i][j] === '1') { count++; dfs(i, j); }
    return count;
}`
        }
      ]
    },
    hints: ["Traverse grid cells, and when you see '1', flood fill connected '1's to '0'."],
    testCases: [
      {
        input: [[
          ["1", "1", "1", "1", "0"],
          ["1", "1", "0", "1", "0"],
          ["1", "1", "0", "0", "0"],
          ["0", "0", "0", "0", "0"]
        ]],
        expected: 1,
        displayInput: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        displayExpected: "1"
      },
      {
        input: [[
          ["1", "1", "0", "0", "0"],
          ["1", "1", "0", "0", "0"],
          ["0", "0", "1", "0", "0"],
          ["0", "0", "0", "1", "1"]
        ]],
        expected: 3,
        displayInput: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        displayExpected: "3"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"]
  },
  {
    id: "max-area-of-island",
    number: 695,
    title: "Max Area of Island",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "72.4%",
    functionName: "maxAreaOfIsland",
    description: `You are given an \`m x n\` binary matrix \`grid\`. An island is a group of \`1\`'s (representing land) connected **4-directionally** (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value \`1\` in the island.

Return *the maximum **area** of an island in* \`grid\`. If there is no island, return \`0\`.`,
    examples: [
      {
        input: `grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]`,
        output: "6",
        explanation: "The answer is not 11, because the island must be connected 4-directionally."
      },
      {
        input: "grid = [[0,0,0,0,0,0,0,0]]",
        output: "0"
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 50",
      "grid[i][j] is either 0 or 1."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland(grid) {
    // Write your code here

};`,
      python: `class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function maxAreaOfIsland(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) {
            return 0;
        }
        grid[r][c] = 0;
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, dfs(r, c));
            }
        }
    }
    return maxArea;
}`,
      python: `class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        def dfs(r, c):
            if r < 0 or c < 0 or r >= ROWS or c >= COLS or grid[r][c] != 1:
                return 0
            grid[r][c] = 0
            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
        area = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    area = max(area, dfs(r, c))
        return area`
    },
    editorial: {
      overview: "Compute area via DFS by returning 1 + sum of all 4 adjacent connected land areas.",
      approaches: [
        {
          name: "Approach: Recursive DFS Area Counting",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(M * N)",
          explanation: "When encountering 1, flood-fill while tallying the total count of reachable cells.",
          code: `function maxAreaOfIsland(grid) {
    let max = 0;
    const dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== 1) return 0;
        grid[r][c] = 0;
        return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
    };
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++)
            if (grid[i][j] === 1) max = Math.max(max, dfs(i, j));
    return max;
}`
        }
      ]
    },
    hints: ["Count cells visited during flood fill and track the maximum."],
    testCases: [
      {
        input: [[[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]],
        expected: 6,
        displayInput: "grid = [[0,0,1,0,0...]]",
        displayExpected: "6"
      },
      {
        input: [[[0, 0, 0, 0, 0, 0, 0, 0]]],
        expected: 0,
        displayInput: "grid = [[0,0,0,0,0,0,0,0]]",
        displayExpected: "0"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"]
  },
  {
    id: "rotting-oranges",
    number: 994,
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "54.6%",
    functionName: "orangesRotting",
    description: `You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return *the minimum number of minutes that must elapse until no cell has a fresh orange*. If this is impossible, return \`-1\`.`,
    examples: [
      {
        input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        output: "4"
      },
      {
        input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
        output: "-1",
        explanation: "The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally."
      },
      {
        input: "grid = [[0,2]]",
        output: "0",
        explanation: "Since there are already no fresh oranges at minute 0, the answer is just 0."
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 10",
      "grid[i][j] is 0, 1, or 2."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
    // Write your code here

};`,
      python: `class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let fresh = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) queue.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
        }
    }
    if (fresh === 0) return 0;
    let time = 0;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (queue.length > 0 && fresh > 0) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
        time++;
    }
    return fresh === 0 ? time : -1;
}`,
      python: `class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        q = deque()
        time, fresh = 0, 0
        ROWS, COLS = len(grid), len(grid[0])
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    fresh += 1
                if grid[r][c] == 2:
                    q.append((r, c))
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        while fresh > 0 and q:
            for i in range(len(q)):
                r, c = q.popleft()
                for dr, dc in directions:
                    row, col = r + dr, c + dc
                    if (row in range(ROWS) and col in range(COLS) and grid[row][col] == 1):
                        grid[row][col] = 2
                        q.append((row, col))
                        fresh -= 1
            time += 1
        return time if fresh == 0 else -1`
    },
    editorial: {
      overview: "Multi-source BFS spreads rot level-by-level in minutes across all adjacent fresh oranges.",
      approaches: [
        {
          name: "Approach: Multi-Source BFS",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(M * N)",
          explanation: "Initialize queue with all initial rotten oranges. In each step, infect adjacent fresh oranges and decrement fresh count until queue is empty.",
          code: `function orangesRotting(grid) {
    let q = [], fresh = 0, time = 0;
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[0].length; c++)
            if (grid[r][c] === 2) q.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
    if (!fresh) return 0;
    while (q.length && fresh) {
        let len = q.length;
        for (let i = 0; i < len; i++) {
            const [r, c] = q.shift();
            for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nc >= 0 && nr < grid.length && nc < grid[0].length && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2; fresh--; q.push([nr, nc]);
                }
            }
        }
        time++;
    }
    return fresh === 0 ? time : -1;
}`
        }
      ]
    },
    hints: ["Use multi-source BFS starting from all rotten oranges."],
    testCases: [
      {
        input: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]],
        expected: 4,
        displayInput: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        displayExpected: "4"
      },
      {
        input: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]],
        expected: -1,
        displayInput: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
        displayExpected: "-1"
      }
    ],
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Breadth-First Search", "Matrix"]
  },
  {
    id: "course-schedule",
    number: 207,
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "47.2%",
    functionName: "canFinish",
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible."
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible."
      }
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "All the pairs prerequisites[i] are unique."
    ],
    starterCode: {
      javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
    // Write your code here

};`,
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [course, pre] of prerequisites) {
        adj[course].push(pre);
    }
    const visiting = new Set();
    const visited = new Set();

    function dfs(crs) {
        if (visiting.has(crs)) return false; // cycle
        if (visited.has(crs)) return true;

        visiting.add(crs);
        for (const pre of adj[crs]) {
            if (!dfs(pre)) return false;
        }
        visiting.delete(crs);
        visited.add(crs);
        return true;
    }

    for (let c = 0; c < numCourses; c++) {
        if (!dfs(c)) return false;
    }
    return true;
}`,
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        preMap = {i: [] for i in range(numCourses)}
        for crs, pre in prerequisites:
            preMap[crs].append(pre)
        visiting = set()
        def dfs(crs):
            if crs in visiting:
                return False
            if preMap[crs] == []:
                return True
            visiting.add(crs)
            for pre in preMap[crs]:
                if not dfs(pre):
                    return False
            visiting.remove(crs)
            preMap[crs] = []
            return True
        for c in range(numCourses):
            if not dfs(c):
                return False
        return True`
    },
    editorial: {
      overview: "Model courses as a directed graph and check for directed cycles using Topological Sort / Kahn's algorithm or 3-color DFS.",
      approaches: [
        {
          name: "Approach: Cycle Detection via DFS (3 States)",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V + E)",
          explanation: "Keep track of nodes in current DFS recursion stack (visiting). If we reach an active node in the stack, a directed cycle exists.",
          code: `function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [c, p] of prerequisites) adj[c].push(p);
    const visiting = new Set(), visited = new Set();
    const dfs = (c) => {
        if (visiting.has(c)) return false;
        if (visited.has(c)) return true;
        visiting.add(c);
        for (const p of adj[c]) if (!dfs(p)) return false;
        visiting.delete(c); visited.add(c);
        return true;
    };
    for (let i = 0; i < numCourses; i++) if (!dfs(i)) return false;
    return true;
}`
        }
      ]
    },
    hints: ["Detect if there is a cycle in the directed dependency graph."],
    testCases: [
      {
        input: [2, [[1, 0]]],
        expected: true,
        displayInput: "numCourses = 2, prerequisites = [[1,0]]",
        displayExpected: "true"
      },
      {
        input: [2, [[1, 0], [0, 1]]],
        expected: false,
        displayInput: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        displayExpected: "false"
      }
    ],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Robinhood"],
    roles: ["backend", "quant", "systems", "fullstack"],
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"]
  },
  {
    id: "clone-graph",
    number: 133,
    title: "Clone Graph",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "56.4%",
    functionName: "cloneGraph",
    description: `Given a reference of a node in a **connected** undirected graph.

Return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.`,
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation: "There are 4 nodes in the graph. Node 1's neighbors are 2 and 4. Node 2's neighbors are 1 and 3. Node 3's neighbors are 2 and 4. Node 4's neighbors are 1 and 3."
      },
      {
        input: "adjList = [[]]",
        output: "[[]]",
        explanation: "Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors."
      }
    ],
    constraints: [
      "The number of nodes in the graph is in the range [0, 100].",
      "1 <= Node.val <= 100",
      "Node.val is unique for each node."
    ],
    starterCode: {
      javascript: `/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {_Node} node
 * @return {_Node}
 */
function cloneGraph(node) {
    // Write your code here

};`,
      python: `"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function cloneGraph(node) {
    if (!node) return null;
    const oldToNew = new Map();
    function dfs(curr) {
        if (oldToNew.has(curr)) return oldToNew.get(curr);
        const copy = { val: curr.val, neighbors: [] };
        oldToNew.set(curr, copy);
        for (const nei of curr.neighbors || []) {
            copy.neighbors.push(dfs(nei));
        }
        return copy;
    }
    return dfs(node);
}`,
      python: `class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        oldToNew = {}
        def dfs(node):
            if node in oldToNew:
                return oldToNew[node]
            copy = Node(node.val)
            oldToNew[node] = copy
            for nei in node.neighbors:
                copy.neighbors.append(dfs(nei))
            return copy
        return dfs(node) if node else None`
    },
    editorial: {
      overview: "Use a hash map to map original nodes to their cloned copies, traversing with DFS or BFS to clone vertices and edges recursively.",
      approaches: [
        {
          name: "Approach: Hash Map + DFS",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          explanation: "Maintain a map of visited nodes. When visiting a node, if cloned already, return clone. Otherwise create clone, put in map, and recursively clone neighbors.",
          code: `function cloneGraph(node) {
    if (!node) return null;
    const visited = new Map();
    function dfs(n) {
        if (visited.has(n.val)) return visited.get(n.val);
        const copy = { val: n.val, neighbors: [] };
        visited.set(n.val, copy);
        for (const nei of n.neighbors) copy.neighbors.push(dfs(nei));
        return copy;
    }
    return dfs(node);
}`
        }
      ]
    },
    hints: ["Use a hash map to remember cloned nodes and avoid infinite loops in cycles."],
    testCases: [
      {
        input: [[[2, 4], [1, 3], [2, 4], [1, 3]]],
        expected: [[2, 4], [1, 3], [2, 4], [1, 3]],
        displayInput: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        displayExpected: "[[2,4],[1,3],[2,4],[1,3]]"
      },
      {
        input: [[]],
        expected: [],
        displayInput: "adjList = []",
        displayExpected: "[]"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Uber"],
    roles: ["backend", "quant", "systems"],
    tags: ["Hash Table", "Depth-First Search", "Breadth-First Search", "Graph"]
  }
];
