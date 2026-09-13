import { Problem } from "../problems";

export const BINARY_SEARCH_PROBLEMS: Problem[] = [
  {
    id: "binary-search",
    number: 704,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    acceptance: "58.1%",
    functionName: "search",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // Write your code here

};`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            m = l + ((r - l) // 2)
            if nums[m] > target:
                r = m - 1
            elif nums[m] < target:
                l = m + 1
            else:
                return m
        return -1`
    },
    editorial: {
      overview: "Standard binary search repeatedly divides the search space in half based on comparison with the middle element.",
      approaches: [
        {
          name: "Approach: Iterative Binary Search",
          timeComplexity: "O(log N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain search bounds [low, high]. Compare target to nums[mid]. Halve the search space each step.",
          code: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
        }
      ]
    },
    hints: ["Find the midpoint index and compare nums[mid] to target."],
    testCases: [
      {
        input: [[-1, 0, 3, 5, 9, 12], 9],
        expected: 4,
        displayInput: "nums = [-1,0,3,5,9,12], target = 9",
        displayExpected: "4"
      },
      {
        input: [[-1, 0, 3, 5, 9, 12], 2],
        expected: -1,
        displayInput: "nums = [-1,0,3,5,9,12], target = 2",
        displayExpected: "-1"
      }
    ],
    companies: ["Microsoft", "Google", "Amazon", "Apple"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Binary Search"]
  },
  {
    id: "search-a-2d-matrix",
    number: 74,
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "50.4%",
    functionName: "searchMatrix",
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` *if* \`target\` *is in* \`matrix\` *or* \`false\` *otherwise*.

You must write a solution in \`O(log(m * n))\` time complexity.`,
    examples: [
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        output: "true"
      },
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        output: "false"
      }
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 100",
      "-10^4 <= matrix[i][j], target <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    // Write your code here

};`,
      python: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function searchMatrix(matrix, target) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let l = 0, r = rows * cols - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        const row = Math.floor(mid / cols);
        const col = mid % cols;
        const val = matrix[row][col];
        if (val === target) return true;
        if (val < target) l = mid + 1;
        else r = mid - 1;
    }
    return false;
}`,
      python: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        ROWS, COLS = len(matrix), len(matrix[0])
        l, r = 0, ROWS * COLS - 1
        while l <= r:
            m = (l + r) // 2
            val = matrix[m // COLS][m % COLS]
            if val > target:
                r = m - 1
            elif val < target:
                l = m + 1
            else:
                return True
        return False`
    },
    editorial: {
      overview: "Treat the m x n 2D matrix as a flat 1D sorted array of length m * n.",
      approaches: [
        {
          name: "Approach: Virtual 1D Binary Search",
          timeComplexity: "O(log(M * N))",
          spaceComplexity: "O(1)",
          explanation: "Map index mid to matrix coordinate: row = Math.floor(mid / cols), col = mid % cols.",
          code: `function searchMatrix(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let l = 0, r = m * n - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        const val = matrix[Math.floor(mid / n)][mid % n];
        if (val === target) return true;
        if (val < target) l = mid + 1;
        else r = mid - 1;
    }
    return false;
}`
        }
      ]
    },
    hints: ["Convert index to row and column coordinates: row = index / cols, col = index % cols."],
    testCases: [
      {
        input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3],
        expected: true,
        displayInput: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        displayExpected: "true"
      },
      {
        input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13],
        expected: false,
        displayInput: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        displayExpected: "false"
      }
    ],
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    roles: ["quant", "backend", "fullstack"],
    tags: ["Array", "Binary Search", "Matrix"]
  },
  {
    id: "koko-eating-bananas",
    number: 875,
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "51.8%",
    functionName: "minEatingSpeed",
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i-th\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return *the minimum integer* \`k\` *such that she can eat all the bananas within* \`h\` *hours*.`,
    examples: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4"
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30"
      },
      {
        input: "piles = [30,11,23,4,20], h = 6",
        output: "23"
      }
    ],
    constraints: [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {
    // Write your code here

};`,
      python: `class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function minEatingSpeed(piles, h) {
    let l = 1, r = Math.max(...piles);
    let res = r;
    while (l <= r) {
        const k = Math.floor((l + r) / 2);
        let hours = 0;
        for (const p of piles) {
            hours += Math.ceil(p / k);
        }
        if (hours <= h) {
            res = k;
            r = k - 1;
        } else {
            l = k + 1;
        }
    }
    return res;
}`,
      python: `class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        l, r = 1, max(piles)
        res = r
        while l <= r:
            k = (l + r) // 2
            totalTime = 0
            for p in piles:
                totalTime += math.ceil(float(p) / k)
            if totalTime <= h:
                res = k
                r = k - 1
            else:
                l = k + 1
        return res`
    },
    editorial: {
      overview: "Binary search on the answer space [1, max(piles)] to find the smallest speed k that satisfies total hours <= h.",
      approaches: [
        {
          name: "Approach: Binary Search on Answer Space",
          timeComplexity: "O(N log(max(P)))",
          spaceComplexity: "O(1)",
          explanation: "Speed k ranges from 1 to max(piles). Calculate hours required as sum(ceil(pile / k)). If hours <= h, try smaller speed k.",
          code: `function minEatingSpeed(piles, h) {
    let l = 1, r = Math.max(...piles), res = r;
    while (l <= r) {
        const k = Math.floor((l + r) / 2);
        const hours = piles.reduce((acc, p) => acc + Math.ceil(p / k), 0);
        if (hours <= h) { res = k; r = k - 1; }
        else l = k + 1;
    }
    return res;
}`
        }
      ]
    },
    hints: ["Binary search on eating speed k between 1 and max(piles)."],
    testCases: [
      {
        input: [[3, 6, 7, 11], 8],
        expected: 4,
        displayInput: "piles = [3,6,7,11], h = 8",
        displayExpected: "4"
      },
      {
        input: [[30, 11, 23, 4, 20], 5],
        expected: 30,
        displayInput: "piles = [30,11,23,4,20], h = 5",
        displayExpected: "30"
      },
      {
        input: [[30, 11, 23, 4, 20], 6],
        expected: 23,
        displayInput: "piles = [30,11,23,4,20], h = 6",
        displayExpected: "23"
      }
    ],
    companies: ["Google", "Amazon", "Meta", "Airbnb"],
    roles: ["quant", "backend", "fullstack"],
    tags: ["Array", "Binary Search"]
  },
  {
    id: "find-minimum-in-rotated-sorted-array",
    number: 153,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "50.9%",
    functionName: "findMin",
    description: `Suppose an array of length \`n\` sorted in ascending order is **rotated** between \`1\` and \`n\` times.

Given the sorted rotated array \`nums\` of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1",
        explanation: "The original array was [1,2,3,4,5] rotated 3 times."
      },
      {
        input: "nums = [4,5,6,7,0,1,2]",
        output: "0",
        explanation: "The original array was [0,1,2,4,5,6,7] and it was rotated 4 times."
      },
      {
        input: "nums = [11,13,15,17]",
        output: "11",
        explanation: "The original array was [11,13,15,17] and it was rotated 4 times."
      }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All the integers of nums are unique.",
      "nums is sorted and rotated between 1 and n times."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function findMin(nums) {
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] > nums[r]) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }
    return nums[l];
}`,
      python: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        res = nums[0]
        l, r = 0, len(nums) - 1
        while l <= r:
            if nums[l] < nums[r]:
                res = min(res, nums[l])
                break
            m = (l + r) // 2
            res = min(res, nums[m])
            if nums[m] >= nums[l]:
                l = m + 1
            else:
                r = m - 1
        return res`
    },
    editorial: {
      overview: "Compare nums[mid] to nums[right]. If nums[mid] > nums[right], the pivot must be in the right half.",
      approaches: [
        {
          name: "Approach: Modified Binary Search",
          timeComplexity: "O(log N)",
          spaceComplexity: "O(1)",
          explanation: "Whenever nums[mid] > nums[right], the minimum is strictly to the right of mid (l = mid + 1). Otherwise, the minimum is at or to the left of mid (r = mid).",
          code: `function findMin(nums) {
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] > nums[r]) l = mid + 1;
        else r = mid;
    }
    return nums[l];
}`
        }
      ]
    },
    hints: ["Compare the middle element with the rightmost element to decide which half contains the pivot."],
    testCases: [
      {
        input: [[3, 4, 5, 1, 2]],
        expected: 1,
        displayInput: "nums = [3,4,5,1,2]",
        displayExpected: "1"
      },
      {
        input: [[4, 5, 6, 7, 0, 1, 2]],
        expected: 0,
        displayInput: "nums = [4,5,6,7,0,1,2]",
        displayExpected: "0"
      },
      {
        input: [[11, 13, 15, 17]],
        expected: 11,
        displayInput: "nums = [11,13,15,17]",
        displayExpected: "11"
      }
    ],
    companies: ["Microsoft", "Amazon", "Meta", "Google"],
    roles: ["quant", "backend", "fullstack"],
    tags: ["Array", "Binary Search"]
  },
  {
    id: "search-in-rotated-sorted-array",
    number: 33,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "41.2%",
    functionName: "search",
    description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\` (\`1 <= k < nums.length\`).

Given the array \`nums\` after the possible rotation and an integer \`target\`, return *the index of* \`target\` *if it is in* \`nums\`, *or* \`-1\` *if it is not in* \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4"
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1"
      },
      {
        input: "nums = [1], target = 0",
        output: "-1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10^4 <= target <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // Write your code here

};`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[r]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
    }
    return -1;
}`,
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if target == nums[mid]:
                return mid
            if nums[l] <= nums[mid]:
                if target > nums[mid] or target < nums[l]:
                    l = mid + 1
                else:
                    r = mid - 1
            else:
                if target < nums[mid] or target > nums[r]:
                    r = mid - 1
                else:
                    l = mid + 1
        return -1`
    },
    editorial: {
      overview: "At least one half of the rotated array is always strictly sorted. Determine which half is sorted and check if target falls inside it.",
      approaches: [
        {
          name: "Approach: One-Pass Binary Search",
          timeComplexity: "O(log N)",
          spaceComplexity: "O(1)",
          explanation: "If nums[l] <= nums[mid], the left half is sorted. If target lies in [nums[l], nums[mid]), search left; otherwise search right.",
          code: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`
        }
      ]
    },
    hints: ["Find which half of the array is normally ordered, then check if target is in that half."],
    testCases: [
      {
        input: [[4, 5, 6, 7, 0, 1, 2], 0],
        expected: 4,
        displayInput: "nums = [4,5,6,7,0,1,2], target = 0",
        displayExpected: "4"
      },
      {
        input: [[4, 5, 6, 7, 0, 1, 2], 3],
        expected: -1,
        displayInput: "nums = [4,5,6,7,0,1,2], target = 3",
        displayExpected: "-1"
      }
    ],
    companies: ["Meta", "Google", "Amazon", "Microsoft", "Apple"],
    roles: ["quant", "backend", "fullstack"],
    tags: ["Array", "Binary Search"]
  }
];
