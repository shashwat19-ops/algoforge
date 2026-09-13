import { Problem } from "../problems";

export const BACKTRACKING_PROBLEMS: Problem[] = [
  {
    id: "subsets",
    number: 78,
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "78.2%",
    functionName: "subsets",
    description: `Given an integer array \`nums\` of **unique** elements, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.`,
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
      },
      {
        input: "nums = [0]",
        output: "[[],[0]]"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All the numbers of nums are unique."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function subsets(nums) {
    const res = [];
    const subset = [];
    function dfs(i) {
        if (i >= nums.length) {
            res.push([...subset]);
            return;
        }
        // include nums[i]
        subset.push(nums[i]);
        dfs(i + 1);
        // exclude nums[i]
        subset.pop();
        dfs(i + 1);
    }
    dfs(0);
    return res;
}`,
      python: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        res = []
        subset = []
        def dfs(i):
            if i >= len(nums):
                res.append(subset.copy())
                return
            subset.append(nums[i])
            dfs(i + 1)
            subset.pop()
            dfs(i + 1)
        dfs(0)
        return res`
    },
    editorial: {
      overview: "At each index i, branch into two decisions: include nums[i] or exclude nums[i].",
      approaches: [
        {
          name: "Approach: Backtracking / Decision Tree DFS",
          timeComplexity: "O(N * 2^N)",
          spaceComplexity: "O(N)",
          explanation: "There are 2^N subsets in total. DFS explores both choices (take / skip) down to the leaf node where a copy is appended to output.",
          code: `function subsets(nums) {
    const res = [];
    const backtrack = (start, curr) => {
        res.push([...curr]);
        for (let i = start; i < nums.length; i++) {
            curr.push(nums[i]);
            backtrack(i + 1, curr);
            curr.pop();
        }
    };
    backtrack(0, []);
    return res;
}`
        }
      ]
    },
    hints: ["At each element, choose whether to include it or skip it."],
    testCases: [
      {
        input: [[1, 2, 3]],
        expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        displayInput: "nums = [1,2,3]",
        displayExpected: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
      },
      {
        input: [[0]],
        expected: [[], [0]],
        displayInput: "nums = [0]",
        displayExpected: "[[],[0]]"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Backtracking", "Bit Manipulation"]
  },
  {
    id: "combination-sum",
    number: 39,
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "71.4%",
    functionName: "combinationSum",
    description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return *a list of all **unique combinations** of* \`candidates\` *where the chosen numbers sum to* \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`,
    examples: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
        explanation: "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7."
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]"
      },
      {
        input: "candidates = [2], target = 1",
        output: "[]"
      }
    ],
    constraints: [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "All elements of candidates are distinct.",
      "1 <= target <= 40"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
    // Write your code here

};`,
      python: `class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function combinationSum(candidates, target) {
    const res = [];
    function backtrack(i, cur, total) {
        if (total === target) {
            res.push([...cur]);
            return;
        }
        if (total > target || i >= candidates.length) {
            return;
        }
        cur.push(candidates[i]);
        backtrack(i, cur, total + candidates[i]);
        cur.pop();
        backtrack(i + 1, cur, total);
    }
    backtrack(0, [], 0);
    return res;
}`,
      python: `class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        res = []
        def dfs(i, cur, total):
            if total == target:
                res.append(cur.copy())
                return
            if i >= len(candidates) or total > target:
                return
            cur.append(candidates[i])
            dfs(i, cur, total + candidates[i])
            cur.pop()
            dfs(i + 1, cur, total)
        dfs(0, [], 0)
        return res`
    },
    editorial: {
      overview: "Branch between taking the current element again (same index i) and skipping to the next element (index i + 1).",
      approaches: [
        {
          name: "Approach: Backtracking Decision Tree",
          timeComplexity: "O(2^(target / min(candidates)))",
          spaceComplexity: "O(target / min(candidates))",
          explanation: "At each step, add candidates[i] and recurse with same i, or do not add candidates[i] and recurse with i + 1.",
          code: `function combinationSum(candidates, target) {
    const res = [];
    const dfs = (i, cur, sum) => {
        if (sum === target) { res.push([...cur]); return; }
        if (sum > target || i >= candidates.length) return;
        cur.push(candidates[i]);
        dfs(i, cur, sum + candidates[i]);
        cur.pop();
        dfs(i + 1, cur, sum);
    };
    dfs(0, [], 0);
    return res;
}`
        }
      ]
    },
    hints: ["Allow picking the current candidate multiple times by keeping index i."],
    testCases: [
      {
        input: [[2, 3, 6, 7], 7],
        expected: [[2, 2, 3], [7]],
        displayInput: "candidates = [2,3,6,7], target = 7",
        displayExpected: "[[2,2,3],[7]]"
      },
      {
        input: [[2, 3, 5], 8],
        expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
        displayInput: "candidates = [2,3,5], target = 8",
        displayExpected: "[[2,2,2,2],[2,3,3],[3,5]]"
      }
    ],
    companies: ["Airbnb", "Meta", "Amazon", "Google", "Microsoft"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Array", "Backtracking"]
  },
  {
    id: "permutations",
    number: 46,
    title: "Permutations",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "78.9%",
    functionName: "permute",
    description: `Given an array \`nums\` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.`,
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      },
      {
        input: "nums = [0,1]",
        output: "[[0,1],[1,0]]"
      },
      {
        input: "nums = [1]",
        output: "[[1]]"
      }
    ],
    constraints: [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
      "All the integers of nums are unique."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function permute(nums) {
    const res = [];
    function backtrack(curr, used) {
        if (curr.length === nums.length) {
            res.push([...curr]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            curr.push(nums[i]);
            backtrack(curr, used);
            curr.pop();
            used[i] = false;
        }
    }
    backtrack([], new Array(nums.length).fill(false));
    return res;
}`,
      python: `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        res = []
        if len(nums) == 1:
            return [nums[:]]
        for i in range(len(nums)):
            n = nums.pop(0)
            perms = self.permute(nums)
            for p in perms:
                p.append(n)
            res.extend(perms)
            nums.append(n)
        return res`
    },
    editorial: {
      overview: "Iterate over all elements, marking used items in a boolean array or swapped indices.",
      approaches: [
        {
          name: "Approach: Backtracking with Used Set / Boolean Array",
          timeComplexity: "O(N! * N)",
          spaceComplexity: "O(N)",
          explanation: "Build permutations recursively. For each unused element, push to current list, mark visited, recurse, and backtrack.",
          code: `function permute(nums) {
    const res = [];
    const dfs = (curr, visited) => {
        if (curr.length === nums.length) { res.push([...curr]); return; }
        for (let i = 0; i < nums.length; i++) {
            if (visited[i]) continue;
            visited[i] = true;
            curr.push(nums[i]);
            dfs(curr, visited);
            curr.pop();
            visited[i] = false;
        }
    };
    dfs([], []);
    return res;
}`
        }
      ]
    },
    hints: ["Use a boolean array to track visited elements and backtrack."],
    testCases: [
      {
        input: [[1, 2, 3]],
        expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
        displayInput: "nums = [1,2,3]",
        displayExpected: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      },
      {
        input: [[0, 1]],
        expected: [[0, 1], [1, 0]],
        displayInput: "nums = [0,1]",
        displayExpected: "[[0,1],[1,0]]"
      }
    ],
    companies: ["Microsoft", "Amazon", "Meta", "Google"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Backtracking"]
  },
  {
    id: "word-search",
    number: 79,
    title: "Word Search",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "42.5%",
    functionName: "exist",
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` *if* \`word\` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true"
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true"
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false"
      }
    ],
    constraints: [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
      "board and word consists of only lowercase and uppercase English letters."
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
    // Write your code here

};`,
      python: `class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    function dfs(r, c, i) {
        if (i === word.length) return true;
        if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) {
            return false;
        }
        const temp = board[r][c];
        board[r][c] = "#"; // mark visited
        const found = dfs(r + 1, c, i + 1) ||
                      dfs(r - 1, c, i + 1) ||
                      dfs(r, c + 1, i + 1) ||
                      dfs(r, c - 1, i + 1);
        board[r][c] = temp; // backtrack
        return found;
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === word[0] && dfs(r, c, 0)) return true;
        }
    }
    return false;
}`,
      python: `class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        path = set()
        def dfs(r, c, i):
            if i == len(word):
                return True
            if (r < 0 or c < 0 or r >= ROWS or c >= COLS or
                word[i] != board[r][c] or (r, c) in path):
                return False
            path.add((r, c))
            res = (dfs(r + 1, c, i + 1) or
                   dfs(r - 1, c, i + 1) or
                   dfs(r, c + 1, i + 1) or
                   dfs(r, c - 1, i + 1))
            path.remove((r, c))
            return res
        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0): return True
        return False`
    },
    editorial: {
      overview: "Explore 4 directions from matching starting characters using DFS. Temporarily modify cell or use a visited set to avoid re-visiting in the same path.",
      approaches: [
        {
          name: "Approach: 2D Grid DFS with In-Place Backtracking",
          timeComplexity: "O(M * N * 3^L) where L = word.length",
          spaceComplexity: "O(L)",
          explanation: "Temporarily replace board[r][c] with '#' while recursing to its 4 neighbors. Restore the character when returning.",
          code: `function exist(board, word) {
    const m = board.length, n = board[0].length;
    const dfs = (r, c, k) => {
        if (k === word.length) return true;
        if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[k]) return false;
        const tmp = board[r][c];
        board[r][c] = '#';
        const res = dfs(r+1,c,k+1) || dfs(r-1,c,k+1) || dfs(r,c+1,k+1) || dfs(r,c-1,k+1);
        board[r][c] = tmp;
        return res;
    };
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (dfs(i, j, 0)) return true;
    return false;
}`
        }
      ]
    },
    hints: ["Explore all 4 directions recursively and mark visited cells."],
    testCases: [
      {
        input: [
          [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
          "ABCCED"
        ],
        expected: true,
        displayInput: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        displayExpected: "true"
      },
      {
        input: [
          [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
          "ABCB"
        ],
        expected: false,
        displayInput: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        displayExpected: "false"
      }
    ],
    companies: ["Bloomberg", "Amazon", "Microsoft", "Meta", "Google"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "String", "Backtracking", "Matrix"]
  },
  {
    id: "letter-combinations-of-a-phone-number",
    number: 17,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: "60.4%",
    functionName: "letterCombinations",
    description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
- 2: "abc"
- 3: "def"
- 4: "ghi"
- 5: "jkl"
- 6: "mno"
- 7: "pqrs"
- 8: "tuv"
- 9: "wxyz"`,
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]'
      },
      {
        input: 'digits = ""',
        output: "[]"
      },
      {
        input: 'digits = "2"',
        output: '["a","b","c"]'
      }
    ],
    constraints: [
      "0 <= digits.length <= 4",
      "digits[i] is a digit in the range ['2', '9']."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
    // Write your code here

};`,
      python: `class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function letterCombinations(digits) {
    if (!digits) return [];
    const map = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
    };
    const res = [];
    function backtrack(i, curr) {
        if (i === digits.length) {
            res.push(curr);
            return;
        }
        for (const char of map[digits[i]]) {
            backtrack(i + 1, curr + char);
        }
    }
    backtrack(0, "");
    return res;
}`,
      python: `class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        res = []
        digitToChar = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "qprs", "8": "tuv", "9": "wxyz"
        }
        def backtrack(i, curStr):
            if len(curStr) == len(digits):
                res.append(curStr)
                return
            for c in digitToChar[digits[i]]:
                backtrack(i + 1, curStr + c)
        if digits:
            backtrack(0, "")
        return res`
    },
    editorial: {
      overview: "Map digits to keypad characters and recursively build Cartesian products.",
      approaches: [
        {
          name: "Approach: Backtracking / Cartesian Product DFS",
          timeComplexity: "O(4^N)",
          spaceComplexity: "O(N)",
          explanation: "At each digit, iterate through its corresponding letters, append to current string, and advance index.",
          code: `function letterCombinations(digits) {
    if (!digits.length) return [];
    const map = { '2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz' };
    const res = [];
    const dfs = (i, str) => {
        if (i === digits.length) { res.push(str); return; }
        for (const ch of map[digits[i]]) dfs(i + 1, str + ch);
    };
    dfs(0, '');
    return res;
}`
        }
      ]
    },
    hints: ["Map each digit to its string of letters and use backtracking."],
    testCases: [
      {
        input: ["23"],
        expected: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
        displayInput: 'digits = "23"',
        displayExpected: '["ad","ae","af","bd","be","bf","cd","ce","cf"]'
      },
      {
        input: [""],
        expected: [],
        displayInput: 'digits = ""',
        displayExpected: "[]"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Uber"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Hash Table", "String", "Backtracking"]
  }
];
