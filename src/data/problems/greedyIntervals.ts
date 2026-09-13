import { Problem } from "../problems";

export const GREEDY_INTERVALS_PROBLEMS: Problem[] = [
  {
    id: "maximum-subarray",
    number: 53,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Greedy",
    acceptance: "51.1%",
    functionName: "maxSubArray",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let curSum = 0;
    for (const n of nums) {
        if (curSum < 0) curSum = 0;
        curSum += n;
        maxSum = Math.max(maxSum, curSum);
    }
    return maxSum;
}`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        maxSub = nums[0]
        curSum = 0
        for n in nums:
            if curSum < 0:
                curSum = 0
            curSum += n
            maxSub = max(maxSub, curSum)
        return maxSub`
    },
    editorial: {
      overview: "Kadane's algorithm keeps running total and resets negative prefix sums to 0 in O(N) time.",
      approaches: [
        {
          name: "Approach: Kadane's Greedy Algorithm",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Iterate across the array; whenever current sum falls below 0, reset it to 0 and continually record maximum sum.",
          code: `function maxSubArray(nums) {
    let max = nums[0], cur = 0;
    for (let x of nums) {
        cur = Math.max(x, cur + x);
        max = Math.max(max, cur);
    }
    return max;
}`
        }
      ]
    },
    hints: ["If the current sum becomes negative, reset it to zero."],
    testCases: [
      {
        input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expected: 6,
        displayInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        displayExpected: "6"
      },
      {
        input: [[1]],
        expected: 1,
        displayInput: "nums = [1]",
        displayExpected: "1"
      },
      {
        input: [[5, 4, -1, 7, 8]],
        expected: 23,
        displayInput: "nums = [5,4,-1,7,8]",
        displayExpected: "23"
      }
    ],
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Meta", "Bloomberg", "Cisco"],
    roles: ["frontend", "backend", "fullstack", "quant", "systems"],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming", "Greedy"]
  },
  {
    id: "jump-game",
    number: 55,
    title: "Jump Game",
    difficulty: "Medium",
    category: "Greedy",
    acceptance: "39.0%",
    functionName: "canJump",
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` *if you can reach the last index, or* \`false\` *otherwise*.`,
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def canJump(self, nums: list[int]) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function canJump(nums) {
    let goal = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (i + nums[i] >= goal) {
            goal = i;
        }
    }
    return goal === 0;
}`,
      python: `class Solution:
    def canJump(self, nums: list[int]) -> bool:
        goal = len(nums) - 1
        for i in range(len(nums) - 2, -1, -1):
            if i + nums[i] >= goal:
                goal = i
        return goal == 0`
    },
    editorial: {
      overview: "Iterate backwards from the end, shifting the goal post forward if reachable from current index.",
      approaches: [
        {
          name: "Approach: Greedy Goal Post",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Set goal to the last index. If index i can reach goal (i + nums[i] >= goal), move goal to i.",
          code: `function canJump(nums) {
    let goal = nums.length - 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (i + nums[i] >= goal) goal = i;
    }
    return goal === 0;
}`
        }
      ]
    },
    hints: ["Work backwards: shift the target index whenever a previous index can reach it."],
    testCases: [
      {
        input: [[2, 3, 1, 1, 4]],
        expected: true,
        displayInput: "nums = [2,3,1,1,4]",
        displayExpected: "true"
      },
      {
        input: [[3, 2, 1, 0, 4]],
        expected: false,
        displayInput: "nums = [3,2,1,0,4]",
        displayExpected: "false"
      }
    ],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Dynamic Programming", "Greedy"]
  },
  {
    id: "merge-intervals",
    number: 56,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
    acceptance: "47.7%",
    functionName: "merge",
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.`,
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    // Write your code here

};`,
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function merge(intervals) {
    if (!intervals || intervals.length === 0) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const output = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const lastEnd = output[output.length - 1][1];
        const [start, end] = intervals[i];
        if (start <= lastEnd) {
            output[output.length - 1][1] = Math.max(lastEnd, end);
        } else {
            output.push([start, end]);
        }
    }
    return output;
}`,
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda i: i[0])
        output = [intervals[0]]
        for start, end in intervals[1:]:
            lastEnd = output[-1][1]
            if start <= lastEnd:
                output[-1][1] = max(lastEnd, end)
            else:
                output.append([start, end])
        return output`
    },
    editorial: {
      overview: "Sort intervals by start time and iterate, merging when intervals[i].start <= previous.end.",
      approaches: [
        {
          name: "Approach: Sort & Merge",
          timeComplexity: "O(N log N)",
          spaceComplexity: "O(N)",
          explanation: "Sort by start time. For each interval, either extend previous interval's end or append a new interval.",
          code: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let res = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let last = res[res.length - 1];
        if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);
        else res.push(intervals[i]);
    }
    return res;
}`
        }
      ]
    },
    hints: ["Sort intervals by start time first."],
    testCases: [
      {
        input: [[[1, 3], [2, 6], [8, 10], [15, 18]]],
        expected: [[1, 6], [8, 10], [15, 18]],
        displayInput: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        displayExpected: "[[1,6],[8,10],[15,18]]"
      },
      {
        input: [[[1, 4], [4, 5]]],
        expected: [[1, 5]],
        displayInput: "intervals = [[1,4],[4,5]]",
        displayExpected: "[[1,5]]"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg", "Apple"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Sorting"]
  },
  {
    id: "non-overlapping-intervals",
    number: 435,
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Intervals",
    acceptance: "53.4%",
    functionName: "eraseOverlapIntervals",
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return *the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping*.`,
    examples: [
      {
        input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        output: "1",
        explanation: "[1,3] can be removed and the rest of the intervals are non-overlapping."
      },
      {
        input: "intervals = [[1,2],[1,2],[1,2]]",
        output: "2",
        explanation: "You need to remove two [1,2] to make the rest of the intervals non-overlapping."
      },
      {
        input: "intervals = [[1,2],[2,3]]",
        output: "0",
        explanation: "You don't need to remove any of the intervals since they're already non-overlapping."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^5",
      "intervals[i].length == 2",
      "-5 * 10^4 <= starti < endi <= 5 * 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
    // Write your code here

};`,
      python: `class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function eraseOverlapIntervals(intervals) {
    if (intervals.length <= 1) return 0;
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let prevEnd = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            count++;
        } else {
            prevEnd = intervals[i][1];
        }
    }
    return count;
}`,
      python: `class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        res = 0
        prevEnd = intervals[0][1]
        for start, end in intervals[1:]:
            if start < prevEnd:
                res += 1
            else:
                prevEnd = end
        return res`
    },
    editorial: {
      overview: "Interval Scheduling / Greedy: sort intervals by end time. Always keep the interval with earliest ending time.",
      approaches: [
        {
          name: "Approach: Greedy Interval Scheduling",
          timeComplexity: "O(N log N)",
          spaceComplexity: "O(1)",
          explanation: "Sort by end time. If an interval starts before the previous one ends, it must be removed.",
          code: `function eraseOverlapIntervals(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    let removals = 0, lastEnd = -Infinity;
    for (const [start, end] of intervals) {
        if (start < lastEnd) removals++;
        else lastEnd = end;
    }
    return removals;
}`
        }
      ]
    },
    hints: ["Sort intervals by their end points and greedily select the ones that finish earliest."],
    testCases: [
      {
        input: [[[1, 2], [2, 3], [3, 4], [1, 3]]],
        expected: 1,
        displayInput: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
        displayExpected: "1"
      },
      {
        input: [[[1, 2], [1, 2], [1, 2]]],
        expected: 2,
        displayInput: "intervals = [[1,2],[1,2],[1,2]]",
        displayExpected: "2"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Dynamic Programming", "Greedy", "Sorting", "Intervals"]
  },
  {
    id: "insert-interval",
    number: 57,
    title: "Insert Interval",
    difficulty: "Medium",
    category: "Intervals",
    acceptance: "41.6%",
    functionName: "insert",
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` *after the insertion*.`,
    examples: [
      {
        input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        output: "[[1,5],[6,9]]"
      },
      {
        input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
        explanation: "Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10]."
      }
    ],
    constraints: [
      "0 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^5",
      "intervals is sorted by starti in ascending order.",
      "newInterval.length == 2",
      "0 <= start <= end <= 10^5"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    // Write your code here

};`,
      python: `class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function insert(intervals, newInterval) {
    const res = [];
    let i = 0;
    const n = intervals.length;
    while (i < n && intervals[i][1] < newInterval[0]) {
        res.push(intervals[i]);
        i++;
    }
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push(newInterval);
    while (i < n) {
        res.push(intervals[i]);
        i++;
    }
    return res;
}`,
      python: `class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        res = []
        for i in range(len(intervals)):
            if newInterval[1] < intervals[i][0]:
                res.append(newInterval)
                return res + intervals[i:]
            elif newInterval[0] > intervals[i][1]:
                res.append(intervals[i])
            else:
                newInterval = [
                    min(newInterval[0], intervals[i][0]),
                    max(newInterval[1], intervals[i][1])
                ]
        res.append(newInterval)
        return res`
    },
    editorial: {
      overview: "Iterate through intervals in three phases: 1) Add all intervals that finish before newInterval starts. 2) Merge all overlapping intervals with newInterval. 3) Add remaining intervals that start after newInterval finishes.",
      approaches: [
        {
          name: "Approach: Linear Scan Merging",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Process intervals before, overlapping, and after newInterval in a single linear pass.",
          code: `function insert(intervals, newInterval) {
    let res = [], i = 0;
    while (i < intervals.length && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push(newInterval);
    while (i < intervals.length) res.push(intervals[i++]);
    return res;
}`
        }
      ]
    },
    hints: ["Add all intervals ending before newInterval, merge overlaps, then append remainder."],
    testCases: [
      {
        input: [[[1, 3], [6, 9]], [2, 5]],
        expected: [[1, 5], [6, 9]],
        displayInput: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        displayExpected: "[[1,5],[6,9]]"
      },
      {
        input: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]],
        expected: [[1, 2], [3, 10], [12, 16]],
        displayInput: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        displayExpected: "[[1,2],[3,10],[12,16]]"
      }
    ],
    companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array"]
  }
];
