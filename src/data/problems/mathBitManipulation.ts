import { Problem } from "../problems";

export const MATH_BIT_PROBLEMS: Problem[] = [
  {
    id: "rotate-image",
    number: 48,
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Math & Geometry",
    acceptance: "74.8%",
    functionName: "rotate",
    description: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90** degrees (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

*Note for AlgoForge:* Return the mutated matrix for test verification.`,
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[[7,4,1],[8,5,2],[9,6,3]]"
      },
      {
        input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
      }
    ],
    constraints: [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
function rotate(matrix) {
    // Write your code here (modify matrix in-place and return it)

};`,
      python: `class Solution:
    def rotate(self, matrix: list[list[int]]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function rotate(matrix) {
    let l = 0;
    let r = matrix.length - 1;
    while (l < r) {
        for (let i = 0; i < r - l; i++) {
            const top = l;
            const bottom = r;
            const topLeft = matrix[top][l + i];
            matrix[top][l + i] = matrix[bottom - i][l];
            matrix[bottom - i][l] = matrix[bottom][r - i];
            matrix[bottom][r - i] = matrix[top + i][r];
            matrix[top + i][r] = topLeft;
        }
        r--;
        l++;
    }
    return matrix;
}`,
      python: `class Solution:
    def rotate(self, matrix: list[list[int]]) -> list[list[int]]:
        l, r = 0, len(matrix) - 1
        while l < r:
            for i in range(r - l):
                top, bottom = l, r
                topLeft = matrix[top][l + i]
                matrix[top][l + i] = matrix[bottom - i][l]
                matrix[bottom - i][l] = matrix[bottom][r - i]
                matrix[bottom][r - i] = matrix[top + i][r]
                matrix[top + i][r] = topLeft
            r -= 1
            l += 1
        return matrix`
    },
    editorial: {
      overview: "Rotate layer-by-layer moving 4 values simultaneously in clockwise cycles.",
      approaches: [
        {
          name: "Approach: Transpose & Reverse / 4-Way Swap",
          timeComplexity: "O(N^2)",
          spaceComplexity: "O(1)",
          explanation: "Rotate elements from outer layer inwards with 4-way variable swap.",
          code: `function rotate(matrix) {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
        matrix[i].reverse();
    }
    return matrix;
}`
        }
      ]
    },
    hints: ["Transpose the matrix along its diagonal and reverse each row."],
    testCases: [
      {
        input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
        expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
        displayInput: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        displayExpected: "[[7,4,1],[8,5,2],[9,6,3]]"
      },
      {
        input: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]],
        expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]],
        displayInput: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        displayExpected: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
      }
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
    roles: ["frontend", "backend", "fullstack", "systems"],
    tags: ["Array", "Math", "Matrix"]
  },
  {
    id: "set-matrix-zeroes",
    number: 73,
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Math & Geometry",
    acceptance: "56.4%",
    functionName: "setZeroes",
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.

You must do it **in place**.

*Note for AlgoForge:* Return the modified matrix for test assertion.`,
    examples: [
      {
        input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        output: "[[1,0,1],[0,0,0],[1,0,1]]"
      },
      {
        input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]"
      }
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200",
      "-2^31 <= matrix[i][j] <= 2^31 - 1"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
function setZeroes(matrix) {
    // Write your code here (modify matrix in-place and return it)

};`,
      python: `class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function setZeroes(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let rowZero = false;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === 0) {
                matrix[0][c] = 0;
                if (r > 0) matrix[r][0] = 0;
                else rowZero = true;
            }
        }
    }

    for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
            if (matrix[0][c] === 0 || matrix[r][0] === 0) {
                matrix[r][c] = 0;
            }
        }
    }

    if (matrix[0][0] === 0) {
        for (let r = 0; r < rows; r++) matrix[r][0] = 0;
    }
    if (rowZero) {
        for (let c = 0; c < cols; c++) matrix[0][c] = 0;
    }
    return matrix;
}`,
      python: `class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> list[list[int]]:
        ROWS, COLS = len(matrix), len(matrix[0])
        rowZero = False
        for r in range(ROWS):
            for c in range(COLS):
                if matrix[r][c] == 0:
                    matrix[0][c] = 0
                    if r > 0:
                        matrix[r][0] = 0
                    else:
                        rowZero = True
        for r in range(1, ROWS):
            for c in range(1, COLS):
                if matrix[0][c] == 0 or matrix[r][0] == 0:
                    matrix[r][c] = 0
        if matrix[0][0] == 0:
            for r in range(ROWS):
                matrix[r][0] = 0
        if rowZero:
            for c in range(COLS):
                matrix[0][c] = 0
        return matrix`
    },
    editorial: {
      overview: "Use the first row and first column as in-place indicator markers to achieve O(1) extra space.",
      approaches: [
        {
          name: "Approach: In-Place First Row/Col Marker",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(1)",
          explanation: "Mark first row and first col whenever a 0 is found. Update inner matrix, then handle first row & column.",
          code: `function setZeroes(matrix) {
    let r0 = false, c0 = false;
    for (let r = 0; r < matrix.length; r++) if (matrix[r][0] === 0) c0 = true;
    for (let c = 0; c < matrix[0].length; c++) if (matrix[0][c] === 0) r0 = true;
    for (let r = 1; r < matrix.length; r++)
        for (let c = 1; c < matrix[0].length; c++)
            if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; }
    for (let r = 1; r < matrix.length; r++)
        for (let c = 1; c < matrix[0].length; c++)
            if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
    if (r0) for (let c = 0; c < matrix[0].length; c++) matrix[0][c] = 0;
    if (c0) for (let r = 0; r < matrix.length; r++) matrix[r][0] = 0;
    return matrix;
}`
        }
      ]
    },
    hints: ["Use the first row and column of the matrix itself to store zero flags."],
    testCases: [
      {
        input: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]],
        expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
        displayInput: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        displayExpected: "[[1,0,1],[0,0,0],[1,0,1]]"
      },
      {
        input: [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]],
        expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]],
        displayInput: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        displayExpected: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg"],
    roles: ["backend", "quant", "fullstack", "systems"],
    tags: ["Array", "Hash Table", "Matrix"]
  },
  {
    id: "single-number",
    number: 136,
    title: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "73.2%",
    functionName: "singleNumber",
    description: `Given a **non-empty** array of integers \`nums\`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1"
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4"
      },
      {
        input: "nums = [1]",
        output: "1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function singleNumber(nums) {
    let res = 0;
    for (const n of nums) {
        res ^= n;
    }
    return res;
}`,
      python: `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        res = 0
        for n in nums:
            res ^= n
        return res`
    },
    editorial: {
      overview: "XOR of any number with itself is 0 (a ^ a = 0) and XOR with 0 is itself (a ^ 0 = a).",
      approaches: [
        {
          name: "Approach: Bitwise XOR",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "XOR all numbers in the array. Duplicate numbers cancel out, leaving the single unique number.",
          code: `function singleNumber(nums) {
    return nums.reduce((acc, x) => acc ^ x, 0);
}`
        }
      ]
    },
    hints: ["Think about XOR properties: A ^ A = 0, and A ^ 0 = A."],
    testCases: [
      {
        input: [[2, 2, 1]],
        expected: 1,
        displayInput: "nums = [2,2,1]",
        displayExpected: "1"
      },
      {
        input: [[4, 1, 2, 1, 2]],
        expected: 4,
        displayInput: "nums = [4,1,2,1,2]",
        displayExpected: "4"
      },
      {
        input: [[1]],
        expected: 1,
        displayInput: "nums = [1]",
        displayExpected: "1"
      }
    ],
    companies: ["Amazon", "Google", "Apple", "Microsoft", "Meta"],
    roles: ["frontend", "backend", "fullstack", "systems", "quant"],
    tags: ["Array", "Bit Manipulation"]
  },
  {
    id: "number-of-1-bits",
    number: 191,
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "71.0%",
    functionName: "hammingWeight",
    description: `Given a positive integer \`n\`, write a function that returns the number of set bits it has (also known as the Hamming weight).`,
    examples: [
      {
        input: "n = 11",
        output: "3",
        explanation: "The input binary string 1011 has a total of three set bits."
      },
      {
        input: "n = 128",
        output: "1",
        explanation: "The input binary string 10000000 has a total of one set bit."
      },
      {
        input: "n = 2147483645",
        output: "30"
      }
    ],
    constraints: [
      "1 <= n <= 2^31 - 1"
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function hammingWeight(n) {
    // Write your code here

};`,
      python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`,
      python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            n &= n - 1
            res += 1
        return res`
    },
    editorial: {
      overview: "Brian Kernighan's Algorithm: `n & (n - 1)` clears the lowest set bit in O(set bits) time.",
      approaches: [
        {
          name: "Approach: Brian Kernighan's Bit Trick",
          timeComplexity: "O(1) - proportional to set bits",
          spaceComplexity: "O(1)",
          explanation: "In each step, n & (n - 1) removes the least significant set bit until n becomes 0.",
          code: `function hammingWeight(n) {
    let count = 0;
    while (n) { n &= n - 1; count++; }
    return count;
}`
        }
      ]
    },
    hints: ["n & (n - 1) always drops the lowest set bit."],
    testCases: [
      {
        input: [11],
        expected: 3,
        displayInput: "n = 11",
        displayExpected: "3"
      },
      {
        input: [128],
        expected: 1,
        displayInput: "n = 128",
        displayExpected: "1"
      }
    ],
    companies: ["Apple", "Amazon", "Microsoft", "Google", "Meta"],
    roles: ["systems", "quant", "backend", "fullstack"],
    tags: ["Divide and Conquer", "Bit Manipulation"]
  },
  {
    id: "missing-number",
    number: 268,
    title: "Missing Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "66.5%",
    functionName: "missingNumber",
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array*.`,
    examples: [
      {
        input: "nums = [3,0,1]",
        output: "2",
        explanation: "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums."
      },
      {
        input: "nums = [0,1]",
        output: "2",
        explanation: "n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums."
      },
      {
        input: "nums = [9,6,4,2,3,5,7,0,1]",
        output: "8",
        explanation: "n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums."
      }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 10^4",
      "0 <= nums[i] <= n",
      "All the numbers of nums are unique."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function missingNumber(nums) {
    let res = nums.length;
    for (let i = 0; i < nums.length; i++) {
        res += (i - nums[i]);
    }
    return res;
}`,
      python: `class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        res = len(nums)
        for i in range(len(nums)):
            res += i - nums[i]
        return res`
    },
    editorial: {
      overview: "Compute expected sum n*(n+1)/2 minus actual sum, or use XOR across all numbers [0..n] and array elements.",
      approaches: [
        {
          name: "Approach: Gauss Formula / Running Difference",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Accumulate sum differences between indices 0..n and array values.",
          code: `function missingNumber(nums) {
    const n = nums.length;
    const expected = (n * (n + 1)) / 2;
    const actual = nums.reduce((a, b) => a + b, 0);
    return expected - actual;
}`
        }
      ]
    },
    hints: ["Sum of 0..n is n*(n+1)/2."],
    testCases: [
      {
        input: [[3, 0, 1]],
        expected: 2,
        displayInput: "nums = [3,0,1]",
        displayExpected: "2"
      },
      {
        input: [[0, 1]],
        expected: 2,
        displayInput: "nums = [0,1]",
        displayExpected: "2"
      },
      {
        input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]],
        expected: 8,
        displayInput: "nums = [9,6,4,2,3,5,7,0,1]",
        displayExpected: "8"
      }
    ],
    companies: ["Amazon", "Microsoft", "Google", "Meta", "Apple"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Hash Table", "Math", "Binary Search", "Bit Manipulation", "Sorting"]
  },
  {
    id: "counting-bits",
    number: 338,
    title: "Counting Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    acceptance: "78.4%",
    functionName: "countBits",
    description: `Given an integer \`n\`, return *an array* \`ans\` *of length* \`n + 1\` *such that for each* \`i\` (\`0 <= i <= n\`), \`ans[i]\` *is the **number of 1's** in the binary representation of* \`i\`.`,
    examples: [
      {
        input: "n = 2",
        output: "[0,1,1]",
        explanation: "0 --> 0\n1 --> 1\n2 --> 10"
      },
      {
        input: "n = 5",
        output: "[0,1,1,2,1,2]",
        explanation: "0 --> 0\n1 --> 1\n2 --> 10\n3 --> 11\n4 --> 100\n5 --> 101"
      }
    ],
    constraints: [
      "0 <= n <= 10^5"
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number[]}
 */
function countBits(n) {
    // Write your code here

};`,
      python: `class Solution:
    def countBits(self, n: int) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function countBits(n) {
    const dp = new Array(n + 1).fill(0);
    let offset = 1;
    for (let i = 1; i <= n; i++) {
        if (offset * 2 === i) {
            offset = i;
        }
        dp[i] = 1 + dp[i - offset];
    }
    return dp;
}`,
      python: `class Solution:
    def countBits(self, n: int) -> list[int]:
        dp = [0] * (n + 1)
        offset = 1
        for i in range(1, n + 1):
            if offset * 2 == i:
                offset = i
            dp[i] = 1 + dp[i - offset]
        return dp`
    },
    editorial: {
      overview: "Dynamic Programming pattern: dp[i] = 1 + dp[i - offset] where offset is the most significant power of 2 so far.",
      approaches: [
        {
          name: "Approach: DP + Significant Bit Offset",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1) extra space",
          explanation: "Whenever i doubles, update offset = i. Number of set bits is 1 + dp[i - offset].",
          code: `function countBits(n) {
    const ans = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}`
        }
      ]
    },
    hints: ["dp[i] = dp[i >> 1] + (i & 1)."],
    testCases: [
      {
        input: [2],
        expected: [0, 1, 1],
        displayInput: "n = 2",
        displayExpected: "[0,1,1]"
      },
      {
        input: [5],
        expected: [0, 1, 1, 2, 1, 2],
        displayInput: "n = 5",
        displayExpected: "[0,1,1,2,1,2]"
      }
    ],
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Meta"],
    roles: ["systems", "quant", "backend", "fullstack"],
    tags: ["Dynamic Programming", "Bit Manipulation"]
  },
  {
    id: "spiral-matrix",
    number: 54,
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Math & Geometry",
    acceptance: "50.5%",
    functionName: "spiralOrder",
    description: `Given an \`m x n\` \`matrix\`, return *all elements of the* \`matrix\` *in spiral order*.`,
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[1,2,3,6,9,8,7,4,5]"
      },
      {
        input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        output: "[1,2,3,4,8,12,11,10,9,5,6,7]"
      }
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
    // Write your code here

};`,
      python: `class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function spiralOrder(matrix) {
    const res = [];
    if (!matrix || matrix.length === 0) return res;
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) res.push(matrix[top][c]);
        top++;
        for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
        right--;
        if (top <= bottom) {
            for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
            bottom--;
        }
        if (left <= right) {
            for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
            left++;
        }
    }
    return res;
}`,
      python: `class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        res = []
        left, right = 0, len(matrix[0])
        top, bottom = 0, len(matrix)
        while left < right and top < bottom:
            for i in range(left, right):
                res.append(matrix[top][i])
            top += 1
            for i in range(top, bottom):
                res.append(matrix[i][right - 1])
            right -= 1
            if not (left < right and top < bottom):
                break
            for i in range(right - 1, left - 1, -1):
                res.append(matrix[bottom - 1][i])
            bottom -= 1
            for i in range(bottom - 1, top - 1, -1):
                res.append(matrix[i][left])
            left += 1
        return res`
    },
    editorial: {
      overview: "Maintain 4 boundaries: top, bottom, left, and right. Traverse in 4 directions clockwise, shrinking boundaries as you complete each direction.",
      approaches: [
        {
          name: "Approach: 4 Boundary Simulation",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(1) extra space",
          explanation: "Move right across top row, down right column, left across bottom row, and up left column.",
          code: `function spiralOrder(matrix) {
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1, res = [];
    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) res.push(matrix[top][i]);
        top++;
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
            left++;
        }
    }
    return res;
}`
        }
      ]
    },
    hints: ["Keep 4 boundary pointers and shrink inward after processing each side."],
    testCases: [
      {
        input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
        expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
        displayInput: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        displayExpected: "[1,2,3,6,9,8,7,4,5]"
      },
      {
        input: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]],
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
        displayInput: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        displayExpected: "[1,2,3,4,8,12,11,10,9,5,6,7]"
      }
    ],
    companies: ["Microsoft", "Amazon", "Apple", "Google", "Meta"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Matrix", "Simulation"]
  }
];
