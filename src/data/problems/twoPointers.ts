import { Problem } from "../problems";

export const TWO_POINTERS_PROBLEMS: Problem[] = [
  {
    id: "valid-palindrome",
    number: 125,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    acceptance: "46.9%",
    functionName: "isPalindrome",
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.'
      },
      {
        input: 's = " "',
        output: "true",
        explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.'
      }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    // Write your code here

};`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not s[l].isalnum():
                l += 1
            while l < r and not s[r].isalnum():
                r -= 1
            if s[l].lower() != s[r].lower():
                return False
            l += 1
            r -= 1
        return True`
    },
    editorial: {
      overview: "Two pointers converging from both ends skip non-alphanumeric characters and compare lowercase characters.",
      approaches: [
        {
          name: "Approach: Two Pointers (In-Place)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain two pointers: left starting at index 0 and right starting at length - 1. Increment left and decrement right while skipping non-alphanumerics, comparing character matches.",
          code: `function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
        while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++;
        r--;
    }
    return true;
}`
        }
      ]
    },
    hints: ["Use two pointers starting at both ends of the string and move inwards."],
    testCases: [
      {
        input: ["A man, a plan, a canal: Panama"],
        expected: true,
        displayInput: 's = "A man, a plan, a canal: Panama"',
        displayExpected: "true"
      },
      {
        input: ["race a car"],
        expected: false,
        displayInput: 's = "race a car"',
        displayExpected: "false"
      },
      {
        input: [" "],
        expected: true,
        displayInput: 's = " "',
        displayExpected: "true"
      }
    ],
    companies: ["Meta", "Amazon", "Microsoft", "Spotify"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Two Pointers", "String"]
  },
  {
    id: "two-sum-ii-input-array-is-sorted",
    number: 167,
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "61.2%",
    functionName: "twoSum",
    description: `Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\` number.

Return *the indices of the two numbers,* \`index1\` *and* \`index2\`, *added by one as an integer array* \`[index1, index2]\` *of length 2.*

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.`,
    examples: [
      {
        input: "numbers = [2,7,11,15], target = 9",
        output: "[1,2]"
      },
      {
        input: "numbers = [2,3,4], target = 6",
        output: "[1,3]"
      },
      {
        input: "numbers = [-1,0], target = -1",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 <= numbers.length <= 3 * 10^4",
      "-1000 <= numbers[i] <= 1000",
      "numbers is sorted in non-decreasing order.",
      "-1000 <= target <= 1000",
      "The tests are generated such that there is exactly one solution."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {
    // Write your code here

};`,
      python: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function twoSum(numbers, target) {
    let l = 0, r = numbers.length - 1;
    while (l < r) {
        const sum = numbers[l] + numbers[r];
        if (sum === target) return [l + 1, r + 1];
        if (sum < target) l++;
        else r--;
    }
    return [];
}`,
      python: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        l, r = 0, len(numbers) - 1
        while l < r:
            curSum = numbers[l] + numbers[r]
            if curSum > target:
                r -= 1
            elif curSum < target:
                l += 1
            else:
                return [l + 1, r + 1]`
    },
    editorial: {
      overview: "Since the array is sorted, two pointers from left and right can sum the elements and adjust based on whether the sum is less than or greater than target.",
      approaches: [
        {
          name: "Approach: Two Pointers",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Sum the smallest and largest available elements. If sum is smaller than target, increment left pointer. If larger, decrement right pointer.",
          code: `function twoSum(numbers, target) {
    let l = 0, r = numbers.length - 1;
    while (l < r) {
        const sum = numbers[l] + numbers[r];
        if (sum === target) return [l + 1, r + 1];
        if (sum < target) l++;
        else r--;
    }
    return [];
}`
        }
      ]
    },
    hints: ["Since the array is already sorted, can you use two pointers starting at ends?"],
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        expected: [1, 2],
        displayInput: "numbers = [2,7,11,15], target = 9",
        displayExpected: "[1,2]"
      },
      {
        input: [[2, 3, 4], 6],
        expected: [1, 3],
        displayInput: "numbers = [2,3,4], target = 6",
        displayExpected: "[1,3]"
      }
    ],
    companies: ["Amazon", "Google", "Apple"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Array", "Two Pointers", "Binary Search"]
  },
  {
    id: "3sum",
    number: 15,
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "34.5%",
    functionName: "threeSum",
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]"
      },
      {
        input: "nums = [0,1,1]",
        output: "[]"
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]"
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++;
                r--;
            } else if (sum < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    return res;
}`,
      python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        res = []
        nums.sort()
        for i, a in enumerate(nums):
            if a > 0:
                break
            if i > 0 and a == nums[i - 1]:
                continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                threeSum = a + nums[l] + nums[r]
                if threeSum > 0:
                    r -= 1
                elif threeSum < 0:
                    l += 1
                else:
                    res.append([a, nums[l], nums[r]])
                    l += 1
                    r -= 1
                    while nums[l] == nums[l - 1] and l < r:
                        l += 1
        return res`
    },
    editorial: {
      overview: "Sorting the array allows applying the Two Pointers technique on the remaining elements for each index i.",
      approaches: [
        {
          name: "Approach: Sort + Two Pointers",
          timeComplexity: "O(N^2)",
          spaceComplexity: "O(1) auxiliary",
          explanation: "Sort nums. For each index i, if nums[i] is identical to previous, skip to avoid duplicates. Then run Two Sum II on the sub-array from i+1 to end.",
          code: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++;
                r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`
        }
      ]
    },
    hints: ["Sort the array first.", "Fix one number and use two pointers to find the other two."],
    testCases: [
      {
        input: [[-1, 0, 1, 2, -1, -4]],
        expected: [[-1, -1, 2], [-1, 0, 1]],
        displayInput: "nums = [-1,0,1,2,-1,-4]",
        displayExpected: "[[-1,-1,2],[-1,0,1]]"
      },
      {
        input: [[0, 1, 1]],
        expected: [],
        displayInput: "nums = [0,1,1]",
        displayExpected: "[]"
      },
      {
        input: [[0, 0, 0]],
        expected: [[0, 0, 0]],
        displayInput: "nums = [0,0,0]",
        displayExpected: "[[0,0,0]]"
      }
    ],
    companies: ["Meta", "Amazon", "Apple", "Google", "Microsoft"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Array", "Two Pointers", "Sorting"]
  },
  {
    id: "container-with-most-water",
    number: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "55.6%",
    functionName: "maxArea",
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.`,
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The max area is between index 1 (height 8) and index 8 (height 7), area = min(8, 7) * (8 - 1) = 7 * 7 = 49."
      },
      {
        input: "height = [1,1]",
        output: "1"
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    // Write your code here

};`,
      python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function maxArea(height) {
    let max = 0;
    let l = 0, r = height.length - 1;
    while (l < r) {
        const area = Math.min(height[l], height[r]) * (r - l);
        max = Math.max(max, area);
        if (height[l] < height[r]) l++;
        else r--;
    }
    return max;
}`,
      python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        res = 0
        while l < r:
            res = max(res, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]:
                l += 1
            elif height[r] <= height[l]:
                r -= 1
        return res`
    },
    editorial: {
      overview: "Two pointers at the outermost boundaries maximize width. Moving the pointer with smaller height is the only way to potentially find a larger area.",
      approaches: [
        {
          name: "Approach: Two Pointers Greedy",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Calculate area as min(h[l], h[r]) * (r - l). Advance whichever pointer points to the shorter line.",
          code: `function maxArea(height) {
    let l = 0, r = height.length - 1, max = 0;
    while (l < r) {
        max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return max;
}`
        }
      ]
    },
    hints: ["Start with maximum width and move the pointer with the smaller height inward."],
    testCases: [
      {
        input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
        expected: 49,
        displayInput: "height = [1,8,6,2,5,4,8,3,7]",
        displayExpected: "49"
      },
      {
        input: [[1, 1]],
        expected: 1,
        displayInput: "height = [1,1]",
        displayExpected: "1"
      }
    ],
    companies: ["Amazon", "Google", "Meta", "Bloomberg"],
    roles: ["quant", "backend", "fullstack"],
    tags: ["Array", "Two Pointers", "Greedy"]
  },
  {
    id: "trapping-rain-water",
    number: 42,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    acceptance: "61.3%",
    functionName: "trap",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped."
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9"
      }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    // Write your code here

};`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function trap(height) {
    if (!height || height.length === 0) return 0;
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let res = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            res += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            res += rightMax - height[r];
        }
    }
    return res;
}`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        if not height:
            return 0
        l, r = 0, len(height) - 1
        leftMax, rightMax = height[l], height[r]
        res = 0
        while l < r:
            if leftMax < rightMax:
                l += 1
                leftMax = max(leftMax, height[l])
                res += leftMax - height[l]
            else:
                r -= 1
                rightMax = max(rightMax, height[r])
                res += rightMax - height[r]
        return res`
    },
    editorial: {
      overview: "Water trapped at any index is min(leftMax, rightMax) - height[i]. Two pointers eliminate the need for O(N) memory.",
      approaches: [
        {
          name: "Approach: Two Pointers (O(1) Space)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain leftMax and rightMax. Since water trapped is bounded by the smaller of the two maxes, process the side with the smaller max.",
          code: `function trap(height) {
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r], res = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            res += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            res += rightMax - height[r];
        }
    }
    return res;
}`
        }
      ]
    },
    hints: [
      "For each bar, how much water can be trapped on top of it?",
      "Water level is min(max_left, max_right) - height[i]."
    ],
    testCases: [
      {
        input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
        expected: 6,
        displayInput: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        displayExpected: "6"
      },
      {
        input: [[4, 2, 0, 3, 2, 5]],
        expected: 9,
        displayInput: "height = [4,2,0,3,2,5]",
        displayExpected: "9"
      }
    ],
    companies: ["Goldman Sachs", "Google", "Amazon", "Meta", "Apple"],
    roles: ["quant", "backend", "systems"],
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"]
  },
  {
    id: "move-zeroes",
    number: 283,
    title: "Move Zeroes",
    difficulty: "Easy",
    category: "Two Pointers",
    acceptance: "61.8%",
    functionName: "moveZeroes",
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note** that you must do this in-place without making a copy of the array.`,
    examples: [
      {
        input: "nums = [0,1,0,3,12]",
        output: "[1,3,12,0,0]"
      },
      {
        input: "nums = [0]",
        output: "[0]"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        # Do not return anything, modify nums in-place instead.
        pass`
    },
    solutionCode: {
      javascript: `function moveZeroes(nums) {
    let insertPos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            const temp = nums[insertPos];
            nums[insertPos] = nums[i];
            nums[i] = temp;
            insertPos++;
        }
    }
    return nums;
}`,
      python: `class Solution:
    def moveZeroes(self, nums: list[int]) -> list[int]:
        l = 0
        for r in range(len(nums)):
            if nums[r]:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1
        return nums`
    },
    editorial: {
      overview: "Use a slow pointer to track where the next non-zero element should be swapped.",
      approaches: [
        {
          name: "Approach: Two Pointers (In-place Swap)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain pointer l for the next insertion slot. Whenever pointer r encounters a non-zero, swap nums[l] and nums[r] and increment l.",
          code: `function moveZeroes(nums) {
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
        if (nums[r] !== 0) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++;
        }
    }
    return nums;
}`
        }
      ]
    },
    hints: ["Use a pointer to track the last non-zero element index."],
    testCases: [
      {
        input: [[0, 1, 0, 3, 12]],
        expected: [1, 3, 12, 0, 0],
        displayInput: "nums = [0,1,0,3,12]",
        displayExpected: "[1,3,12,0,0]"
      },
      {
        input: [[0]],
        expected: [0],
        displayInput: "nums = [0]",
        displayExpected: "[0]"
      }
    ],
    companies: ["Meta", "Amazon", "Microsoft", "Apple"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Array", "Two Pointers"]
  }
];
