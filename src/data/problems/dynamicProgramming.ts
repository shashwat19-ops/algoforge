import { Problem } from "../problems";

export const DYNAMIC_PROGRAMMING_PROBLEMS: Problem[] = [
  {
    id: "climbing-stairs",
    number: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "1-D Dynamic Programming",
    acceptance: "53.2%",
    functionName: "climbStairs",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    // Write your code here

};`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let one = 1;
    let two = 2;
    for (let i = 3; i <= n; i++) {
        const current = one + two;
        one = two;
        two = current;
    }
    return two;
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        one, two = 1, 1
        for _ in range(n - 1):
            temp = one
            one = one + two
            two = temp
        return one`
    },
    editorial: {
      overview: "Recognize that ways(n) = ways(n-1) + ways(n-2), mirroring the Fibonacci sequence.",
      approaches: [
        {
          name: "Approach: Bottom-Up Dynamic Programming (Space Optimized)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain two variables holding the number of ways to reach the previous two steps.",
          code: `function climbStairs(n) {
    let [a, b] = [1, 1];
    for (let i = 0; i < n - 1; i++) {
        [a, b] = [a + b, a];
    }
    return a;
}`
        }
      ]
    },
    hints: ["To reach nth step, what could have been your previous step?"],
    testCases: [
      {
        input: [2],
        expected: 2,
        displayInput: "n = 2",
        displayExpected: "2"
      },
      {
        input: [3],
        expected: 3,
        displayInput: "n = 3",
        displayExpected: "3"
      },
      {
        input: [5],
        expected: 8,
        displayInput: "n = 5",
        displayExpected: "8"
      }
    ],
    companies: ["Amazon", "Google", "Apple", "Microsoft", "Meta"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Math", "Dynamic Programming", "Memoization"]
  },
  {
    id: "min-cost-climbing-stairs",
    number: 746,
    title: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    category: "1-D Dynamic Programming",
    acceptance: "66.5%",
    functionName: "minCostClimbingStairs",
    description: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`i-th\` step on a staircase. Once you pay the cost, you can either climb \`one\` or \`two\` steps.

You can either start from the step with index \`0\`, or the step with index \`1\`.

Return *the minimum cost to reach the top of the floor*.`,
    examples: [
      {
        input: "cost = [10,15,20]",
        output: "15",
        explanation: "You will start at index 1.\n- Pay 15 and climb two steps to reach the top.\nThe total cost is 15."
      },
      {
        input: "cost = [1,100,1,1,1,100,1,1,100,1]",
        output: "6",
        explanation: "You will start at index 0.\n- Pay 1 and climb two steps to reach index 2.\n- Pay 1 and climb two steps to reach index 4.\n- Pay 1 and climb two steps to reach index 6.\n- Pay 1 and climb one step to reach index 7.\n- Pay 1 and climb two steps to reach index 9.\n- Pay 1 and climb one step to reach the top.\nThe total cost is 6."
      }
    ],
    constraints: [
      "2 <= cost.length <= 1000",
      "0 <= cost[i] <= 999"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} cost
 * @return {number}
 */
function minCostClimbingStairs(cost) {
    // Write your code here

};`,
      python: `class Solution:
    def minCostClimbingStairs(self, cost: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function minCostClimbingStairs(cost) {
    let downOne = 0;
    let downTwo = 0;
    for (let i = 2; i <= cost.length; i++) {
        const takeOne = downOne + cost[i - 1];
        const takeTwo = downTwo + cost[i - 2];
        downTwo = downOne;
        downOne = Math.min(takeOne, takeTwo);
    }
    return downOne;
}`,
      python: `class Solution:
    def minCostClimbingStairs(self, cost: list[int]) -> int:
        for i in range(len(cost) - 3, -1, -1):
            cost[i] += min(cost[i + 1], cost[i + 2])
        return min(cost[0], cost[1])`
    },
    editorial: {
      overview: "Transition formula: dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]).",
      approaches: [
        {
          name: "Approach: Constant Space DP",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Compute minimal cost in a single pass maintaining only the previous two costs.",
          code: `function minCostClimbingStairs(cost) {
    let a = 0, b = 0;
    for (let i = 2; i <= cost.length; i++) {
        let temp = Math.min(a + cost[i - 1], b + cost[i - 2]);
        b = a; a = temp;
    }
    return a;
}`
        }
      ]
    },
    hints: ["Build bottom-up: at each step choose the min between 1-step and 2-step jump."],
    testCases: [
      {
        input: [[10, 15, 20]],
        expected: 15,
        displayInput: "cost = [10,15,20]",
        displayExpected: "15"
      },
      {
        input: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]],
        expected: 6,
        displayInput: "cost = [1,100,1,1,1,100,1,1,100,1]",
        displayExpected: "6"
      }
    ],
    companies: ["Amazon", "Google", "Apple", "Microsoft"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Array", "Dynamic Programming"]
  },
  {
    id: "house-robber",
    number: 198,
    title: "House Robber",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    acceptance: "51.3%",
    functionName: "rob",
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.`,
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4."
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\nTotal amount you can rob = 2 + 9 + 1 = 12."
      }
    ],
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def rob(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function rob(nums) {
    let rob1 = 0;
    let rob2 = 0;
    for (const n of nums) {
        const temp = Math.max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}`,
      python: `class Solution:
    def rob(self, nums: list[int]) -> int:
        rob1, rob2 = 0, 0
        for n in nums:
            temp = max(n + rob1, rob2)
            rob1 = rob2
            rob2 = temp
        return rob2`
    },
    editorial: {
      overview: "At each house i, the max money is max(nums[i] + rob(i-2), rob(i-1)).",
      approaches: [
        {
          name: "Approach: Dynamic Programming (Two Variables)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain two pointers: rob1 (max loot excluding adjacent house) and rob2 (max loot including adjacent house).",
          code: `function rob(nums) {
    let [r1, r2] = [0, 0];
    for (const n of nums) {
        [r1, r2] = [r2, Math.max(n + r1, r2)];
    }
    return r2;
}`
        }
      ]
    },
    hints: ["Choose between robbing current house + (i-2) best vs skipping current house."],
    testCases: [
      {
        input: [[1, 2, 3, 1]],
        expected: 4,
        displayInput: "nums = [1,2,3,1]",
        displayExpected: "4"
      },
      {
        input: [[2, 7, 9, 3, 1]],
        expected: 12,
        displayInput: "nums = [2,7,9,3,1]",
        displayExpected: "12"
      }
    ],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Cisco"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Dynamic Programming"]
  },
  {
    id: "coin-change",
    number: 322,
    title: "Coin Change",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    acceptance: "44.7%",
    functionName: "coinChange",
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1"
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1"
      },
      {
        input: "coins = [1], amount = 0",
        output: "0"
      }
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    // Write your code here

};`,
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let a = 1; a <= amount; a++) {
        for (const c of coins) {
            if (a - c >= 0) {
                dp[a] = Math.min(dp[a], 1 + dp[a - c]);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
        return dp[amount] if dp[amount] != float('inf') else -1`
    },
    editorial: {
      overview: "Unbounded Knapsack dynamic programming. dp[a] = min over coin c of (1 + dp[a - c]).",
      approaches: [
        {
          name: "Approach: Bottom-Up DP Table",
          timeComplexity: "O(amount * len(coins))",
          spaceComplexity: "O(amount)",
          explanation: "Iteratively build the fewest coins needed for all values from 0 up to amount.",
          code: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const c of coins) {
            if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`
        }
      ]
    },
    hints: ["Use dp[i] to store the minimum coins needed for amount i."],
    testCases: [
      {
        input: [[1, 2, 5], 11],
        expected: 3,
        displayInput: "coins = [1,2,5], amount = 11",
        displayExpected: "3"
      },
      {
        input: [[2], 3],
        expected: -1,
        displayInput: "coins = [2], amount = 3",
        displayExpected: "-1"
      },
      {
        input: [[1], 0],
        expected: 0,
        displayInput: "coins = [1], amount = 0",
        displayExpected: "0"
      }
    ],
    companies: ["Amazon", "Bloomberg", "Google", "Meta", "Microsoft", "Apple"],
    roles: ["backend", "quant", "systems", "fullstack"],
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"]
  },
  {
    id: "longest-increasing-subsequence",
    number: 300,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    acceptance: "55.8%",
    functionName: "lengthOfLIS",
    description: `Given an integer array \`nums\`, return *the length of the longest strictly increasing subsequence*.`,
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4"
      },
      {
        input: "nums = [7,7,7,7,7,7,7]",
        output: "1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function lengthOfLIS(nums) {
    if (!nums || nums.length === 0) return 0;
    const tails = [];
    for (const x of nums) {
        let l = 0, r = tails.length;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (tails[m] < x) l = m + 1;
            else r = m;
        }
        tails[l] = x;
    }
    return tails.length;
}`,
      python: `class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`
    },
    editorial: {
      overview: "Patience Sorting / Binary Search achieves O(N log N) time complexity by maintaining lowest tail elements of increasing subsequences.",
      approaches: [
        {
          name: "Approach: Binary Search (Patience Sort)",
          timeComplexity: "O(N log N)",
          spaceComplexity: "O(N)",
          explanation: "Maintain an array `tails` where tails[i] is the smallest tail of all increasing subsequences of length i+1. Use binary search to update.",
          code: `function lengthOfLIS(nums) {
    const tails = [];
    for (const x of nums) {
        let i = 0, j = tails.length;
        while (i < j) {
            const mid = (i + j) >> 1;
            if (tails[mid] < x) i = mid + 1;
            else j = mid;
        }
        tails[i] = x;
    }
    return tails.length;
}`
        }
      ]
    },
    hints: ["Try binary search with patience sort to achieve O(N log N)."],
    testCases: [
      {
        input: [[10, 9, 2, 5, 3, 7, 101, 18]],
        expected: 4,
        displayInput: "nums = [10,9,2,5,3,7,101,18]",
        displayExpected: "4"
      },
      {
        input: [[0, 1, 0, 3, 2, 3]],
        expected: 4,
        displayInput: "nums = [0,1,0,3,2,3]",
        displayExpected: "4"
      },
      {
        input: [[7, 7, 7, 7, 7, 7, 7]],
        expected: 1,
        displayInput: "nums = [7,7,7,7,7,7,7]",
        displayExpected: "1"
      }
    ],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    roles: ["backend", "quant", "systems"],
    tags: ["Array", "Binary Search", "Dynamic Programming"]
  },
  {
    id: "unique-paths",
    number: 62,
    title: "Unique Paths",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    acceptance: "64.3%",
    functionName: "uniquePaths",
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.`,
    examples: [
      {
        input: "m = 3, n = 7",
        output: "28"
      },
      {
        input: "m = 3, n = 2",
        output: "3",
        explanation: "From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down"
      }
    ],
    constraints: [
      "1 <= m, n <= 100"
    ],
    starterCode: {
      javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
    // Write your code here

};`,
      python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function uniquePaths(m, n) {
    let row = new Array(n).fill(1);
    for (let i = 0; i < m - 1; i++) {
        const newRow = new Array(n).fill(1);
        for (let j = n - 2; j >= 0; j--) {
            newRow[j] = newRow[j + 1] + row[j];
        }
        row = newRow;
    }
    return row[0];
}`,
      python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        for i in range(m - 1):
            newRow = [1] * n
            for j in range(n - 2, -1, -1):
                newRow[j] = newRow[j + 1] + row[j]
            row = newRow
        return row[0]`
    },
    editorial: {
      overview: "Standard grid DP where paths to cell (r, c) = paths(r-1, c) + paths(r, c-1).",
      approaches: [
        {
          name: "Approach: 1-D Row DP",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(N)",
          explanation: "Maintain a single array of length n representing the bottom row and accumulate rightwards and upwards.",
          code: `function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);
    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            dp[c] += dp[c - 1];
        }
    }
    return dp[n - 1];
}`
        }
      ]
    },
    hints: ["Use dynamic programming: dp[i][j] = dp[i-1][j] + dp[i][j-1]."],
    testCases: [
      {
        input: [3, 7],
        expected: 28,
        displayInput: "m = 3, n = 7",
        displayExpected: "28"
      },
      {
        input: [3, 2],
        expected: 3,
        displayInput: "m = 3, n = 2",
        displayExpected: "3"
      }
    ],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Math", "Dynamic Programming", "Combinatorics"]
  },
  {
    id: "decode-ways",
    number: 91,
    title: "Decode Ways",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    acceptance: "35.1%",
    functionName: "numDecodings",
    description: `A message containing letters from \`A-Z\` can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \`"11106"\` can be mapped into:
- \`"AAJF"\` with the grouping \`(1 1 10 6)\`
- \`"KJF"\` with the grouping \`(11 10 6)\`

Note that the grouping \`(1 11 06)\` is invalid because \`"06"\` cannot be mapped into \`'F'\` since \`"6"\` is different from \`"06"\`.

Given a string \`s\` containing only digits, return *the number of ways to decode it*.`,
    examples: [
      {
        input: "s = \"12\"",
        output: "2",
        explanation: "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."
      },
      {
        input: "s = \"226\"",
        output: "3",
        explanation: "\"226\" could be decoded as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6)."
      },
      {
        input: "s = \"06\"",
        output: "0",
        explanation: "\"06\" cannot be mapped to \"F\" because of the leading zero (\"6\" is different from \"06\")."
      }
    ],
    constraints: [
      "1 <= s.length <= 100",
      "s contains only digits and may contain leading zero(s)."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
    // Write your code here

};`,
      python: `class Solution:
    def numDecodings(self, s: str) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function numDecodings(s) {
    if (!s || s[0] === '0') return 0;
    const n = s.length;
    let prev2 = 1, prev1 = 1;
    for (let i = 1; i < n; i++) {
        let cur = 0;
        if (s[i] !== '0') cur += prev1;
        const twoDigit = parseInt(s.substring(i - 1, i + 1), 10);
        if (twoDigit >= 10 && twoDigit <= 26) cur += prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}`,
      python: `class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0':
            return 0
        prev2, prev1 = 1, 1
        for i in range(1, len(s)):
            cur = 0
            if s[i] != '0':
                cur += prev1
            two_digit = int(s[i-1:i+1])
            if 10 <= two_digit <= 26:
                cur += prev2
            prev2, prev1 = prev1, cur
        return prev1`
    },
    editorial: {
      overview: "At each position, we can decode 1 digit if s[i] != '0', and 2 digits if s[i-1..i] is between 10 and 26.",
      approaches: [
        {
          name: "Approach: O(1) Space DP",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain two variables for ways at dp[i-2] and dp[i-1], checking single and double digit validities.",
          code: `function numDecodings(s) {
    if (!s || s[0] === '0') return 0;
    let dp1 = 1, dp2 = 1;
    for (let i = 1; i < s.length; i++) {
        let cur = 0;
        if (s[i] !== '0') cur += dp1;
        const val = parseInt(s.substring(i - 1, i + 1));
        if (val >= 10 && val <= 26) cur += dp2;
        dp2 = dp1;
        dp1 = cur;
    }
    return dp1;
}`
        }
      ]
    },
    hints: ["Consider edge cases with '0' digits and numbers greater than 26."],
    testCases: [
      {
        input: ["12"],
        expected: 2,
        displayInput: "s = \"12\"",
        displayExpected: "2"
      },
      {
        input: ["226"],
        expected: 3,
        displayInput: "s = \"226\"",
        displayExpected: "3"
      },
      {
        input: ["06"],
        expected: 0,
        displayInput: "s = \"06\"",
        displayExpected: "0"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Uber"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["String", "Dynamic Programming"]
  },
  {
    id: "word-break",
    number: 139,
    title: "Word Break",
    difficulty: "Medium",
    category: "1-D Dynamic Programming",
    acceptance: "46.8%",
    functionName: "wordBreak",
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.`,
    examples: [
      {
        input: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
        output: "true",
        explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"."
      },
      {
        input: "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
        output: "true",
        explanation: "Return true because \"applepenapple\" can be segmented as \"apple pen apple\"."
      },
      {
        input: "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20",
      "s and wordDict[i] consist of only lowercase English letters.",
      "All the strings of wordDict are unique."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    // Write your code here

};`,
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function wordBreak(s, wordDict) {
    const dp = new Array(s.length + 1).fill(false);
    dp[s.length] = true;
    for (let i = s.length - 1; i >= 0; i--) {
        for (const w of wordDict) {
            if (i + w.length <= s.length && s.substring(i, i + w.length) === w) {
                if (dp[i + w.length]) {
                    dp[i] = true;
                    break;
                }
            }
        }
    }
    return dp[0];
}`,
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        dp = [False] * (len(s) + 1)
        dp[len(s)] = True
        for i in range(len(s) - 1, -1, -1):
            for w in wordDict:
                if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:
                    dp[i] = dp[i + len(w)]
                if dp[i]:
                    break
        return dp[0]`
    },
    editorial: {
      overview: "Bottom-up DP starting from index s.length down to 0. dp[i] is true if any dictionary word matches s[i..i+len] and dp[i+len] is true.",
      approaches: [
        {
          name: "Approach: Bottom-Up Dynamic Programming",
          timeComplexity: "O(N * M * K) where N=len(s), M=dict size, K=avg word length",
          spaceComplexity: "O(N)",
          explanation: "Set dp[len(s)] = true. Iterate backwards through s and try matching each word in the dictionary.",
          code: `function wordBreak(s, wordDict) {
    const dp = new Array(s.length + 1).fill(false);
    dp[s.length] = true;
    for (let i = s.length - 1; i >= 0; i--) {
        for (const w of wordDict) {
            if (i + w.length <= s.length && s.slice(i, i + w.length) === w && dp[i + w.length]) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[0];
}`
        }
      ]
    },
    hints: ["dp[i] is true if a prefix matches a word and the remainder can also be segmented."],
    testCases: [
      {
        input: ["leetcode", ["leet", "code"]],
        expected: true,
        displayInput: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
        displayExpected: "true"
      },
      {
        input: ["applepenapple", ["apple", "pen"]],
        expected: true,
        displayInput: "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
        displayExpected: "true"
      },
      {
        input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]],
        expected: false,
        displayInput: "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        displayExpected: "false"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Bloomberg", "Apple", "Microsoft"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Hash Table", "String", "Dynamic Programming", "Trie", "Memoization"]
  },
  {
    id: "longest-common-subsequence",
    number: 1143,
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "2-D Dynamic Programming",
    acceptance: "58.2%",
    functionName: "longestCommonSubsequence",
    description: `Given two strings \`text1\` and \`text2\`, return *the length of their longest **common subsequence**.* If there is no **common subsequence**, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
- For example, \`"ace"\` is a subsequence of \`"abcde"\`.

A **common subsequence** of two strings is a subsequence that is common to both strings.`,
    examples: [
      {
        input: "text1 = \"abcde\", text2 = \"ace\"",
        output: "3",
        explanation: "The longest common subsequence is \"ace\" and its length is 3."
      },
      {
        input: "text1 = \"abc\", text2 = \"abc\"",
        output: "3",
        explanation: "The longest common subsequence is \"abc\" and its length is 3."
      },
      {
        input: "text1 = \"abc\", text2 = \"def\"",
        output: "0",
        explanation: "There is no such common subsequence, so the result is 0."
      }
    ],
    constraints: [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of only lowercase English characters."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
    // Write your code here

};`,
      python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (text1[i] === text2[j]) {
                dp[i][j] = 1 + dp[i + 1][j + 1];
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
    }
    return dp[0][0];
}`,
      python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0 for _ in range(len(text2) + 1)] for _ in range(len(text1) + 1)]
        for i in range(len(text1) - 1, -1, -1):
            for j in range(len(text2) - 1, -1, -1):
                if text1[i] == text2[j]:
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
        return dp[0][0]`
    },
    editorial: {
      overview: "Classic 2D Dynamic Programming. If characters match, dp[i][j] = 1 + dp[i+1][j+1]; otherwise max(dp[i+1][j], dp[i][j+1]).",
      approaches: [
        {
          name: "Approach: 2D Dynamic Programming Table",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(M * N)",
          explanation: "Build a (m+1) x (n+1) grid from bottom-up, checking character match or taking the maximum of advancing text1 or text2.",
          code: `function longestCommonSubsequence(text1, text2) {
    const dp = Array.from({ length: text1.length + 1 }, () => new Array(text2.length + 1).fill(0));
    for (let i = 0; i < text1.length; i++) {
        for (let j = 0; j < text2.length; j++) {
            if (text1[i] === text2[j]) dp[i + 1][j + 1] = 1 + dp[i][j];
            else dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
        }
    }
    return dp[text1.length][text2.length];
}`
        }
      ]
    },
    hints: ["If text1[i] == text2[j], LCS increases by 1 from dp[i+1][j+1]."],
    testCases: [
      {
        input: ["abcde", "ace"],
        expected: 3,
        displayInput: "text1 = \"abcde\", text2 = \"ace\"",
        displayExpected: "3"
      },
      {
        input: ["abc", "abc"],
        expected: 3,
        displayInput: "text1 = \"abc\", text2 = \"abc\"",
        displayExpected: "3"
      },
      {
        input: ["abc", "def"],
        expected: 0,
        displayInput: "text1 = \"abc\", text2 = \"def\"",
        displayExpected: "0"
      }
    ],
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["String", "Dynamic Programming"]
  }
];
