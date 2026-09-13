import { Problem } from "../problems";

export const ARRAYS_HASHING_PROBLEMS: Problem[] = [
  {
    id: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    acceptance: "52.4%",
    functionName: "twoSum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here

};`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in seen:
                return [seen[diff], i]
            seen[n] = i
        return []`
    },
    editorial: {
      overview: "The Two Sum problem is the classic introduction to hash table lookups. While a naive brute-force search compares all pairs in O(N^2) time, a hash map allows us to find the complement in O(1) time.",
      approaches: [
        {
          name: "Approach 1: Brute Force",
          timeComplexity: "O(N^2)",
          spaceComplexity: "O(1)",
          explanation: "Iterate through each element x and search if there is another value that equals target - x. For each element, check the rest of the array.",
          code: `function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`
        },
        {
          name: "Approach 2: One-Pass Hash Map (Optimal)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "While we iterate and insert elements into the hash table, we also look back to check if current element's complement already exists in the table. If it exists, we have found a solution and return the indices immediately.",
          code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
        }
      ]
    },
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Can you think of an O(N) solution?",
      "Can we use extra space? What data structure allows O(1) lookups by key?",
      "As you iterate through the array, store the numbers you have seen so far in a hash map with their indices. For each number x, check if (target - x) is already in your map."
    ],
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        displayInput: "nums = [2,7,11,15], target = 9",
        displayExpected: "[0,1]"
      },
      {
        input: [[3, 2, 4], 6],
        expected: [1, 2],
        displayInput: "nums = [3,2,4], target = 6",
        displayExpected: "[1,2]"
      },
      {
        input: [[3, 3], 6],
        expected: [0, 1],
        displayInput: "nums = [3,3], target = 6",
        displayExpected: "[0,1]"
      }
    ],
    companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Hash Table"]
  },
  {
    id: "valid-anagram",
    number: 242,
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    acceptance: "64.8%",
    functionName: "isAnagram",
    description: `Given two strings \`s\` and \`t\`, return \`true\` *if* \`t\` *is an anagram of* \`s\`, *and* \`false\` *otherwise*.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true"
      },
      {
        input: 's = "rat", t = "car"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    // Write your code here

};`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
        counts[t.charCodeAt(i) - 97]--;
    }
    return counts.every(c => c === 0);
}`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = {}
        for char in s:
            count[char] = count.get(char, 0) + 1
        for char in t:
            if char not in count or count[char] == 0:
                return False
            count[char] -= 1
        return True`
    },
    editorial: {
      overview: "An anagram must have the exact same character frequency counts for every letter.",
      approaches: [
        {
          name: "Approach 1: Frequency Array",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Since strings contain lowercase English characters, we can use an array of size 26 to tally occurrences in s and subtract occurrences in t.",
          code: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
}`
        }
      ]
    },
    hints: [
      "If the lengths of s and t are different, can they be anagrams?",
      "Can you count how many times each character appears in both strings and compare?"
    ],
    testCases: [
      {
        input: ["anagram", "nagaram"],
        expected: true,
        displayInput: 's = "anagram", t = "nagaram"',
        displayExpected: "true"
      },
      {
        input: ["rat", "car"],
        expected: false,
        displayInput: 's = "rat", t = "car"',
        displayExpected: "false"
      }
    ],
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    roles: ["frontend", "fullstack", "backend"],
    tags: ["Hash Table", "String", "Sorting"]
  },
  {
    id: "contains-duplicate",
    number: 217,
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    acceptance: "61.7%",
    functionName: "containsDuplicate",
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true"
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false"
      },
      {
        input: "nums = [1,1,1,3,3,4,3,2,4,2]",
        output: "true"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function containsDuplicate(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        return len(nums) != len(set(nums))`
    },
    editorial: {
      overview: "Using a HashSet gives O(N) time complexity and O(N) space complexity by tracking seen elements in O(1) amortized time.",
      approaches: [
        {
          name: "Approach: Hash Set",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Iterate through the array and insert each element into a set. If an element already exists, a duplicate is found.",
          code: `function containsDuplicate(nums) {
    const set = new Set();
    for (const n of nums) {
        if (set.has(n)) return true;
        set.add(n);
    }
    return false;
}`
        }
      ]
    },
    hints: ["Use a Set to keep track of elements you have already visited."],
    testCases: [
      {
        input: [[1, 2, 3, 1]],
        expected: true,
        displayInput: "nums = [1,2,3,1]",
        displayExpected: "true"
      },
      {
        input: [[1, 2, 3, 4]],
        expected: false,
        displayInput: "nums = [1,2,3,4]",
        displayExpected: "false"
      },
      {
        input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]],
        expected: true,
        displayInput: "nums = [1,1,1,3,3,4,3,2,4,2]",
        displayExpected: "true"
      }
    ],
    companies: ["Apple", "Amazon", "Microsoft", "Adobe"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Array", "Hash Table", "Sorting"]
  },
  {
    id: "group-anagrams",
    number: 49,
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    acceptance: "68.2%",
    functionName: "groupAnagrams",
    description: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: 'strs = [""]',
        output: '[[""]]'
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]'
      }
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    // Write your code here

};`,
      python: `class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function groupAnagrams(strs) {
    const map = new Map();
    for (const str of strs) {
        const key = str.split("").sort().join("");
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    return Array.from(map.values());
}`,
      python: `from collections import defaultdict
class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        res = defaultdict(list)
        for s in strs:
            res[tuple(sorted(s))].append(s)
        return list(res.values())`
    },
    editorial: {
      overview: "Strings that are anagrams share the same sorted character representation or character frequency tuple.",
      approaches: [
        {
          name: "Approach 1: Categorize by Sorted String",
          timeComplexity: "O(N * K log K)",
          spaceComplexity: "O(N * K)",
          explanation: "Sort each string and use the sorted string as a key in a hash map mapping to a list of original strings.",
          code: `function groupAnagrams(strs) {
    const map = {};
    for (const str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map[sorted]) map[sorted] = [];
        map[sorted].push(str);
    }
    return Object.values(map);
}`
        }
      ]
    },
    hints: [
      "Two strings are anagrams if and only if their sorted strings are equal.",
      "Can you use the sorted string as a key in a hash map?"
    ],
    testCases: [
      {
        input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
        expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
        displayInput: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        displayExpected: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: [[""]],
        expected: [[""]],
        displayInput: 'strs = [""]',
        displayExpected: '[[""]]'
      },
      {
        input: [["a"]],
        expected: [["a"]],
        displayInput: 'strs = ["a"]',
        displayExpected: '[["a"]]'
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Apple", "Microsoft"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Array", "Hash Table", "String", "Sorting"]
  },
  {
    id: "top-k-frequent-elements",
    number: 347,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    acceptance: "63.5%",
    functionName: "topKFrequent",
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.`,
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]"
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
    // Write your code here

};`,
      python: `class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function topKFrequent(nums, k) {
    const map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, count] of map.entries()) {
        buckets[count].push(num);
    }
    const res = [];
    for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
        if (buckets[i].length > 0) {
            res.push(...buckets[i]);
        }
    }
    return res.slice(0, k);
}`,
      python: `class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        count = {}
        freq = [[] for i in range(len(nums) + 1)]
        for n in nums:
            count[n] = 1 + count.get(n, 0)
        for n, c in count.items():
            freq[c].append(n)
        res = []
        for i in range(len(freq) - 1, 0, -1):
            for n in freq[i]:
                res.append(n)
                if len(res) == k:
                    return res`
    },
    editorial: {
      overview: "Bucket sort allows solving Top K Frequent in O(N) time where the index represents frequency.",
      approaches: [
        {
          name: "Approach: Bucket Sort",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Count frequencies with a hash map, then populate an array of buckets where bucket[freq] contains numbers appearing freq times. Traverse from right to left.",
          code: `function topKFrequent(nums, k) {
    const count = new Map();
    for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of count.entries()) buckets[freq].push(num);
    const res = [];
    for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
        res.push(...buckets[i]);
    }
    return res.slice(0, k);
}`
        }
      ]
    },
    hints: ["Can you group elements by their count using an array of buckets?"],
    testCases: [
      {
        input: [[1, 1, 1, 2, 2, 3], 2],
        expected: [1, 2],
        displayInput: "nums = [1,1,1,2,2,3], k = 2",
        displayExpected: "[1,2]"
      },
      {
        input: [[1], 1],
        expected: [1],
        displayInput: "nums = [1], k = 1",
        displayExpected: "[1]"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Heap (Priority Queue)", "Bucket Sort"]
  },
  {
    id: "product-of-array-except-self",
    number: 238,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    acceptance: "66.1%",
    functionName: "productExceptSelf",
    description: `Given an integer array \`nums\`, return *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]"
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}`,
      python: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        res = [1] * len(nums)
        prefix = 1
        for i in range(len(nums)):
            res[i] = prefix
            prefix *= nums[i]
        postfix = 1
        for i in range(len(nums) - 1, -1, -1):
            res[i] *= postfix
            postfix *= nums[i]
        return res`
    },
    editorial: {
      overview: "Compute prefix products in a first pass and multiply with suffix products in a reverse pass to achieve O(1) auxiliary space.",
      approaches: [
        {
          name: "Approach: Prefix & Suffix Products",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Initialize an output array where output[i] contains product of all elements to the left. Then maintain a running suffix product moving backwards.",
          code: `function productExceptSelf(nums) {
    const res = new Array(nums.length).fill(1);
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}`
        }
      ]
    },
    hints: [
      "Think how you can compute the product of all elements to the left of index i and the product of all elements to the right of index i.",
      "Can you do it in two passes?"
    ],
    testCases: [
      {
        input: [[1, 2, 3, 4]],
        expected: [24, 12, 8, 6],
        displayInput: "nums = [1,2,3,4]",
        displayExpected: "[24,12,8,6]"
      },
      {
        input: [[-1, 1, 0, -3, 3]],
        expected: [0, 0, 9, 0, 0],
        displayInput: "nums = [-1,1,0,-3,3]",
        displayExpected: "[0,0,9,0,0]"
      }
    ],
    companies: ["Amazon", "Meta", "Apple", "Microsoft", "Google"],
    roles: ["backend", "quant", "systems", "fullstack"],
    tags: ["Array", "Prefix Sum"]
  },
  {
    id: "valid-sudoku",
    number: 36,
    title: "Valid Sudoku",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    acceptance: "60.4%",
    functionName: "isValidSudoku",
    description: `Determine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits \`1-9\` without repetition.
2. Each column must contain the digits \`1-9\` without repetition.
3. Each of the nine \`3 x 3\` sub-boxes of the grid must contain the digits \`1-9\` without repetition.

**Note:**
- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.`,
    examples: [
      {
        input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: "true"
      }
    ],
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit 1-9 or '.'"
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    // Write your code here

};`,
      python: `class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function isValidSudoku(board) {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val === '.') continue;
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
            if (rows[r].has(val) || cols[c].has(val) || boxes[b].has(val)) {
                return false;
            }
            rows[r].add(val);
            cols[c].add(val);
            boxes[b].add(val);
        }
    }
    return true;
}`,
      python: `class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        cols = collections.defaultdict(set)
        rows = collections.defaultdict(set)
        squares = collections.defaultdict(set)
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    continue
                if (board[r][c] in rows[r] or
                    board[r][c] in cols[c] or
                    board[r][c] in squares[(r // 3, c // 3)]):
                    return False
                cols[c].add(board[r][c])
                rows[r].add(board[r][c])
                squares[(r // 3, c // 3)].add(board[r][c])
        return True`
    },
    editorial: {
      overview: "Validate rows, columns, and 3x3 boxes using sets.",
      approaches: [
        {
          name: "Approach: Hash Sets for Rows, Cols, and Boxes",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          explanation: "Iterate across the 81 cells once, checking whether the digit exists in the row, column, or (r//3, c//3) subgrid set.",
          code: `function isValidSudoku(board) {
    const seen = new Set();
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val === '.') continue;
            const rowKey = \`row \${r} \${val}\`;
            const colKey = \`col \${c} \${val}\`;
            const boxKey = \`box \${Math.floor(r/3)}-\${Math.floor(c/3)} \${val}\`;
            if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) return false;
            seen.add(rowKey);
            seen.add(colKey);
            seen.add(boxKey);
        }
    }
    return true;
}`
        }
      ]
    },
    hints: ["Use a Set to record unique values in each row, column, and 3x3 sub-grid."],
    testCases: [
      {
        input: [
          [
            ["5","3",".",".","7",".",".",".","."],
            ["6",".",".","1","9","5",".",".","."],
            [".","9","8",".",".",".",".","6","."],
            ["8",".",".",".","6",".",".",".","3"],
            ["4",".",".","8",".","3",".",".","1"],
            ["7",".",".",".","2",".",".",".","6"],
            [".","6",".",".",".",".","2","8","."],
            [".",".",".","4","1","9",".",".","5"],
            [".",".",".",".","8",".",".","7","9"]
          ]
        ],
        expected: true,
        displayInput: "board = [[5,3,.,.,7...]]",
        displayExpected: "true"
      }
    ],
    companies: ["Amazon", "Apple", "Uber", "Microsoft"],
    roles: ["backend", "fullstack", "quant"],
    tags: ["Array", "Hash Table", "Matrix"]
  },
  {
    id: "longest-consecutive-sequence",
    number: 128,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    acceptance: "47.9%",
    functionName: "longestConsecutive",
    description: `Given an unsorted array of integers \`nums\`, return *the length of the longest consecutive elements sequence.*

You must write an algorithm that runs in \`O(n)\` time.`,
    examples: [
      {
        input: "nums = [100,4,200,1,3,2]",
        output: "4",
        explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4."
      },
      {
        input: "nums = [0,3,7,2,5,8,4,6,0,1]",
        output: "9"
      }
    ],
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxLen = 0;
    for (const num of set) {
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            while (set.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            maxLen = Math.max(maxLen, currentStreak);
        }
    }
    return maxLen;
}`,
      python: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        numSet = set(nums)
        longest = 0
        for n in nums:
            if (n - 1) not in numSet:
                length = 1
                while (n + length) in numSet:
                    length += 1
                longest = max(length, longest)
        return longest`
    },
    editorial: {
      overview: "By storing all numbers in a HashSet, we can check if each number is the start of a sequence (i.e., num - 1 not in set).",
      approaches: [
        {
          name: "Approach: Hash Set Intelligent Sequence Building",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Only start counting sequence length if num - 1 is absent. This ensures each sequence is traversed only once.",
          code: `function longestConsecutive(nums) {
    const set = new Set(nums);
    let longest = 0;
    for (const n of set) {
        if (!set.has(n - 1)) {
            let len = 1;
            while (set.has(n + len)) len++;
            longest = Math.max(longest, len);
        }
    }
    return longest;
}`
        }
      ]
    },
    hints: [
      "Put numbers in a set for O(1) lookups.",
      "How do you identify if a number is the beginning of a sequence?"
    ],
    testCases: [
      {
        input: [[100, 4, 200, 1, 3, 2]],
        expected: 4,
        displayInput: "nums = [100,4,200,1,3,2]",
        displayExpected: "4"
      },
      {
        input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
        expected: 9,
        displayInput: "nums = [0,3,7,2,5,8,4,6,0,1]",
        displayExpected: "9"
      }
    ],
    companies: ["Google", "Amazon", "Meta", "Spotify"],
    roles: ["backend", "quant", "systems"],
    tags: ["Array", "Hash Table", "Union Find"]
  },
  {
    id: "majority-element",
    number: 169,
    title: "Majority Element",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    acceptance: "64.2%",
    functionName: "majorityElement",
    description: `Given an array \`nums\` of size \`n\`, return *the majority element*.

The majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.`,
    examples: [
      {
        input: "nums = [3,2,3]",
        output: "3"
      },
      {
        input: "nums = [2,2,1,1,1,2,2]",
        output: "2"
      }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5 * 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function majorityElement(nums) {
    let candidate = nums[0];
    let count = 0;
    for (const num of nums) {
        if (count === 0) candidate = num;
        count += (num === candidate ? 1 : -1);
    }
    return candidate;
}`,
      python: `class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        res = count = 0
        for n in nums:
            if count == 0:
                res = n
            count += (1 if n == res else -1)
        return res`
    },
    editorial: {
      overview: "Boyer-Moore Voting Algorithm finds the majority element in O(N) time and O(1) space.",
      approaches: [
        {
          name: "Approach: Boyer-Moore Voting Algorithm",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain a candidate and a counter. Increment when the element matches candidate, decrement otherwise. Reset candidate when count hits 0.",
          code: `function majorityElement(nums) {
    let candidate = null, count = 0;
    for (const n of nums) {
        if (count === 0) candidate = n;
        count += (n === candidate ? 1 : -1);
    }
    return candidate;
}`
        }
      ]
    },
    hints: ["Try Boyer-Moore Voting Algorithm for O(1) extra memory."],
    testCases: [
      {
        input: [[3, 2, 3]],
        expected: 3,
        displayInput: "nums = [3,2,3]",
        displayExpected: "3"
      },
      {
        input: [[2, 2, 1, 1, 1, 2, 2]],
        expected: 2,
        displayInput: "nums = [2,2,1,1,1,2,2]",
        displayExpected: "2"
      }
    ],
    companies: ["Amazon", "Microsoft", "Google"],
    roles: ["backend", "quant", "systems"],
    tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Counting"]
  }
];
