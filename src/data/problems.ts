export interface TestCase {
  input: any[];
  expected: any;
  displayInput: string;
  displayExpected: string;
}

export interface Approach {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  code: string;
}

export interface Editorial {
  overview: string;
  approaches: Approach[];
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  acceptance: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
  };
  solutionCode: {
    javascript: string;
    python: string;
  };
  editorial: Editorial;
  hints: string[];
  testCases: TestCase[];
  companies: string[];
  roles: string[];
  tags: string[];
  functionName: string;
}

export const PROBLEMS: Problem[] = [
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
        hashmap = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in hashmap:
                return [hashmap[diff], i]
            hashmap[num] = i
        return []`
    },
    editorial: {
      overview: "The problem asks for two indices whose values sum to target. A brute force approach checks every pair in O(N^2) time. We can optimize this using a Hash Map in O(N) time by storing the complement of each element as we iterate.",
      approaches: [
        {
          name: "One-pass Hash Table",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation: "While we iterate and inserting elements into the table, we also look back to check if current element's complement already exists in the table. If it exists, we have found a solution and return immediately.",
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
        },
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation: "Loop through each element x and find if there is another value that equals to target - x.",
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
        }
      ]
    },
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter.",
      "Can we change our array somehow so that this search becomes faster? A hash map allows O(1) lookup time."
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
      },
      {
        input: [[1, 5, 8, 12, 19, 24], 31],
        expected: [3, 4],
        displayInput: "nums = [1,5,8,12,19,24], target = 31",
        displayExpected: "[3,4]"
      }
    ],
    companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft", "Uber", "Bloomberg"],
    roles: ["Frontend", "Backend", "Fullstack", "Systems", "AI/ML"],
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
        pass`
    },
    solutionCode: {
      javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
}`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t): return False
        count = {}
        for c in s:
            count[c] = count.get(c, 0) + 1
        for c in t:
            if c not in count or count[c] == 0:
                return False
            count[c] -= 1
        return True`
    },
    editorial: {
      overview: "An anagram must have the exact same character frequencies for both strings.",
      approaches: [
        {
          name: "Frequency Hash Map",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1) (capped at 26 characters)",
          explanation: "Count frequencies of each character in s, then decrement frequencies using characters from t. If any count goes below zero or strings have different lengths, return false.",
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
      "Check length first. If lengths differ, they can't be anagrams.",
      "Use an array of size 26 or a hash map to tally character counts."
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
      },
      {
        input: ["listen", "silent"],
        expected: true,
        displayInput: 's = "listen", t = "silent"',
        displayExpected: "true"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Bloomberg", "Uber"],
    roles: ["Frontend", "Backend", "Fullstack"],
    tags: ["Hash Table", "String", "Sorting"]
  },
  {
    id: "group-anagrams",
    number: 49,
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    acceptance: "68.2%",
    functionName: "groupAnagrams",
    description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.

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
        pass`
    },
    solutionCode: {
      javascript: `function groupAnagrams(strs) {
    const map = new Map();
    for (const s of strs) {
        const count = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            count[s.charCodeAt(i) - 97]++;
        }
        const key = count.join('#');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
}`,
      python: `from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        ans = defaultdict(list)
        for s in strs:
            count = [0] * 26
            for c in s:
                count[ord(c) - ord('a')] += 1
            ans[tuple(count)].append(s)
        return list(ans.values())`
    },
    editorial: {
      overview: "Anagrams have identical character frequency counts. We can use character counts (or sorted strings) as hash map keys.",
      approaches: [
        {
          name: "Categorize by Character Count",
          timeComplexity: "O(N * K) where N is number of strings and K is max string length",
          spaceComplexity: "O(N * K)",
          explanation: "Map each string to a 26-element array representing character frequencies and use its serialized representation as a Map key.",
          code: `function groupAnagrams(strs) {
    const map = new Map();
    for (const str of strs) {
        const count = new Array(26).fill(0);
        for (const char of str) count[char.charCodeAt(0) - 97]++;
        const key = count.join('#');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    return Array.from(map.values());
}`
        }
      ]
    },
    hints: [
      "Two strings are anagrams if and only if their sorted strings are equal or their character frequencies are identical.",
      "Use a hash map where the key is the sorted string or count tuple."
    ],
    testCases: [
      {
        input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
        expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
        displayInput: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        displayExpected: '[["eat","tea","ate"],["tan","nat"],["bat"]]'
      },
      {
        input: [[""]],
        expected: [[""]],
        displayInput: 'strs = [""]',
        displayExpected: '[[""]]'
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"],
    roles: ["Backend", "Fullstack", "Systems"],
    tags: ["Array", "Hash Table", "String"]
  },
  {
    id: "top-k-frequent-elements",
    number: 347,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
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
        pass`
    },
    solutionCode: {
      javascript: `function topKFrequent(nums, k) {
    const map = new Map();
    for (const n of nums) map.set(n, (map.get(n) || 0) + 1);

    const bucket = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of map) {
        bucket[freq].push(num);
    }

    const res = [];
    for (let i = bucket.length - 1; i >= 0 && res.length < k; i--) {
        if (bucket[i].length > 0) {
            res.push(...bucket[i]);
        }
    }
    return res.slice(0, k);
}`,
      python: `class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        count = {}
        freq = [[] for _ in range(len(nums) + 1)]

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
      overview: "Bucket sort allows O(N) linear time solution by bucketing elements according to their frequency (from 1 to N).",
      approaches: [
        {
          name: "Bucket Sort",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation: "Count frequencies in a hash map. Create an array of buckets where index represents frequency and value is list of numbers with that frequency. Iterate from highest frequency bucket down to collect k numbers.",
          code: `function topKFrequent(nums, k) {
    const map = new Map();
    for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
    const bucket = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of map) bucket[freq].push(num);
    const res = [];
    for (let i = bucket.length - 1; i >= 0 && res.length < k; i--) {
        res.push(...bucket[i]);
    }
    return res.slice(0, k);
}`
        }
      ]
    },
    hints: [
      "Can we count frequencies first?",
      "Can we use bucket sort where index = frequency?"
    ],
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
    companies: ["Meta", "Amazon", "Google", "Apple", "Uber"],
    roles: ["Backend", "Systems", "AI/ML"],
    tags: ["Array", "Hash Table", "Divide and Conquer", "Bucket Sort", "Heap"]
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
      overview: "Instead of dividing total product, we compute prefix and postfix products for every position.",
      approaches: [
        {
          name: "Prefix & Postfix in O(1) Extra Space",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1) (excluding output array)",
          explanation: "First pass fills result array with prefix products. Second pass iterates backwards multiplying suffix product.",
          code: `function productExceptSelf(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let pre = 1, post = 1;
    for (let i = 0; i < n; i++) {
        res[i] = pre;
        pre *= nums[i];
    }
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= post;
        post *= nums[i];
    }
    return res;
}`
        }
      ]
    },
    hints: [
      "Think how you can compute product of left elements and product of right elements separately.",
      "Multiply left prefix with right postfix at each index."
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
    companies: ["Amazon", "Meta", "Google", "Apple", "Microsoft"],
    roles: ["Backend", "Systems", "Quant"],
    tags: ["Array", "Prefix Sum"]
  },
  {
    id: "valid-palindrome",
    number: 125,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    acceptance: "48.1%",
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
        pass`
    },
    solutionCode: {
      javascript: `function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !isAlphaNumeric(s[l])) l++;
        while (l < r && !isAlphaNumeric(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++;
        r--;
    }
    return true;
}

function isAlphaNumeric(c) {
    const code = c.charCodeAt(0);
    return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
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
      overview: "Two pointers starting at opposite ends move towards each other, skipping non-alphanumeric characters.",
      approaches: [
        {
          name: "Two Pointers in-place",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation: "Maintain left and right pointers. Skip non-alphanumeric characters on both sides, compare characters case-insensitively.",
          code: `function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
        while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++; r--;
    }
    return true;
}`
        }
      ]
    },
    hints: [
      "Use two pointers: one from the beginning and one from the end.",
      "Check if characters are alphanumeric and ignore case."
    ],
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
    companies: ["Meta", "Microsoft", "Amazon", "Apple"],
    roles: ["Frontend", "Backend"],
    tags: ["Two Pointers", "String"]
  },
  {
    id: "3sum",
    number: 15,
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "34.7%",
    functionName: "threeSum",
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2]."
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
        pass`
    },
    solutionCode: {
      javascript: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const res = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] > 0) break;

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
      overview: "Sorting the array allows us to fix one element and use the classic Two Pointers approach for the remaining pair while skipping duplicates.",
      approaches: [
        {
          name: "Sorting and Two Pointers",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1) or O(n) depending on sort implementation",
          explanation: "Sort nums. For each element, run two pointers to find pairs that sum to -nums[i]. Skip duplicates for both fixed index and moving pointers.",
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
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`
        }
      ]
    },
    hints: [
      "Can sorting the array make duplicate handling easier?",
      "For each element nums[i], can you solve Two Sum II for the remaining subarray?"
    ],
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
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple", "Uber"],
    roles: ["Backend", "Fullstack", "Systems"],
    tags: ["Array", "Two Pointers", "Sorting"]
  },
  {
    id: "container-with-most-water",
    number: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    acceptance: "55.2%",
    functionName: "maxArea",
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.`,
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49 (between index 1 and 8)."
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
        pass`
    },
    solutionCode: {
      javascript: `function maxArea(height) {
    let l = 0, r = height.length - 1;
    let max = 0;
    while (l < r) {
        const h = Math.min(height[l], height[r]);
        const area = h * (r - l);
        if (area > max) max = area;
        if (height[l] < height[r]) {
            l++;
        } else {
            r--;
        }
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
            else:
                r -= 1
        return res`
    },
    editorial: {
      overview: "Water capacity is limited by the shorter bar. Moving the pointer at the shorter bar gives a chance to find a taller bar to compensate for the decreasing width.",
      approaches: [
        {
          name: "Two Pointers Greedy",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation: "Place pointers at both ends. Compute area, then advance whichever pointer points to the shorter bar.",
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
    hints: [
      "Start with widest container (pointers at 0 and n-1).",
      "Always move the pointer pointing to the shorter vertical line."
    ],
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
    companies: ["Google", "Amazon", "Meta", "Bloomberg", "Apple"],
    roles: ["Frontend", "Backend", "Fullstack"],
    tags: ["Array", "Two Pointers", "Greedy"]
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    number: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Sliding Window",
    acceptance: "54.3%",
    functionName: "maxProfit",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    // Write your code here

};`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        pass`
    },
    solutionCode: {
      javascript: `function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit`
    },
    editorial: {
      overview: "Track minimum price seen so far and calculate profit if we sold at today's price.",
      approaches: [
        {
          name: "One Pass Greedy Tracking Min",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation: "Maintain minPrice seen so far and update maxProfit with Math.max(maxProfit, currentPrice - minPrice).",
          code: `function maxProfit(prices) {
    let min = Infinity, maxProfit = 0;
    for (const p of prices) {
        min = Math.min(min, p);
        maxProfit = Math.max(maxProfit, p - min);
    }
    return maxProfit;
}`
        }
      ]
    },
    hints: [
      "Track the minimum buying price as you scan through the array.",
      "At each day, check what your profit would be if you sold today."
    ],
    testCases: [
      {
        input: [[7, 1, 5, 3, 6, 4]],
        expected: 5,
        displayInput: "prices = [7,1,5,3,6,4]",
        displayExpected: "5"
      },
      {
        input: [[7, 6, 4, 3, 1]],
        expected: 0,
        displayInput: "prices = [7,6,4,3,1]",
        displayExpected: "0"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Apple", "Microsoft", "Goldman Sachs"],
    roles: ["Frontend", "Backend", "Fullstack", "Quant"],
    tags: ["Array", "Dynamic Programming"]
  },
  {
    id: "longest-substring-without-repeating-characters",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptance: "35.1%",
    functionName: "lengthOfLongestSubstring",
    description: `Given a string \`s\`, find the length of the **longest substring** without duplicate characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.\nNotice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Write your code here

};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`
    },
    solutionCode: {
      javascript: `function lengthOfLongestSubstring(s) {
    const map = new Map();
    let left = 0;
    let maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;
        }
        map.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charSet = set()
        l = 0
        res = 0
        for r in range(len(s)):
            while s[r] in charSet:
                charSet.remove(s[l])
                l += 1
            charSet.add(s[r])
            res = max(res, r - l + 1)
        return res`
    },
    editorial: {
      overview: "Use a sliding window [left, right] and a Map storing the last seen index of each character to skip duplicate occurrences in O(1).",
      approaches: [
        {
          name: "Optimized Sliding Window with Map",
          timeComplexity: "O(n)",
          spaceComplexity: "O(min(m, n)) where m is character set size",
          explanation: "Maintain left pointer. When duplicate is found, move left pointer directly past the previous instance of the character.",
          code: `function lengthOfLongestSubstring(s) {
    const map = new Map();
    let l = 0, max = 0;
    for (let r = 0; r < s.length; r++) {
        if (map.has(s[r]) && map.get(s[r]) >= l) {
            l = map.get(s[r]) + 1;
        }
        map.set(s[r], r);
        max = Math.max(max, r - l + 1);
    }
    return max;
}`
        }
      ]
    },
    hints: [
      "Use a sliding window to maintain characters in current window.",
      "Store character's last seen position in a hash table."
    ],
    testCases: [
      {
        input: ["abcabcbb"],
        expected: 3,
        displayInput: 's = "abcabcbb"',
        displayExpected: "3"
      },
      {
        input: ["bbbbb"],
        expected: 1,
        displayInput: 's = "bbbbb"',
        displayExpected: "1"
      },
      {
        input: ["pwwkew"],
        expected: 3,
        displayInput: 's = "pwwkew"',
        displayExpected: "3"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple", "Bloomberg"],
    roles: ["Frontend", "Backend", "Fullstack", "Systems"],
    tags: ["Hash Table", "String", "Sliding Window"]
  },
  {
    id: "valid-parentheses",
    number: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "40.9%",
    functionName: "isValid",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      },
      {
        input: 's = "([])"',
        output: "true"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your code here

};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        pass`
    },
    solutionCode: {
      javascript: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        closeToOpen = {")": "(", "]": "[", "}": "{"}
        for c in s:
            if c in closeToOpen:
                if stack and stack[-1] == closeToOpen[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)
        return True if not stack else False`
    },
    editorial: {
      overview: "A stack naturally models LIFO ordering of nested brackets.",
      approaches: [
        {
          name: "Stack Data Structure",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation: "Push opening brackets onto stack. For closing brackets, check if the popped item matches the corresponding opening bracket. Check if stack is empty at end.",
          code: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    for (const c of s) {
        if (c in pairs) {
            if (stack.pop() !== pairs[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}`
        }
      ]
    },
    hints: [
      "Use a stack to remember opening brackets.",
      "When encountering a closing bracket, verify it matches the most recent opening bracket on top of the stack."
    ],
    testCases: [
      {
        input: ["()"],
        expected: true,
        displayInput: 's = "()"',
        displayExpected: "true"
      },
      {
        input: ["()[]{}"],
        expected: true,
        displayInput: 's = "()[]{}"',
        displayExpected: "true"
      },
      {
        input: ["(]"],
        expected: false,
        displayInput: 's = "(]"',
        displayExpected: "false"
      },
      {
        input: ["([])"],
        expected: true,
        displayInput: 's = "([])"',
        displayExpected: "true"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple", "Bloomberg"],
    roles: ["Frontend", "Backend", "Fullstack"],
    tags: ["String", "Stack"]
  },
  {
    id: "binary-search",
    number: 704,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    acceptance: "57.8%",
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
        pass`
    },
    solutionCode: {
      javascript: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
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
      overview: "Standard binary search repeatedly divides the search space in half based on comparison with the midpoint.",
      approaches: [
        {
          name: "Iterative Binary Search",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          explanation: "Maintain low and high pointers, calculate mid with integer overflow protection, shrink search half based on value comparison.",
          code: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
        }
      ]
    },
    hints: [
      "Use pointers for start and end of search interval.",
      "Calculate mid index and compare nums[mid] with target."
    ],
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
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple"],
    roles: ["Frontend", "Backend", "Fullstack", "Systems"],
    tags: ["Array", "Binary Search"]
  },
  {
    id: "search-in-rotated-sorted-array",
    number: 33,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: "40.5%",
    functionName: "search",
    description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\` (\`1 <= k < nums.length\`) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\` (**0-indexed**).

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
        pass`
    },
    solutionCode: {
      javascript: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) return mid;

        // Left half is sorted
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        } else { // Right half is sorted
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
      overview: "In a rotated sorted array, at least one half (left or right of mid) is always sorted. We check if target lies in the sorted portion.",
      approaches: [
        {
          name: "Modified Binary Search",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          explanation: "Check whether left or right half is normally sorted. If target falls inside the sorted boundary, narrow into it; otherwise search the other half.",
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
    hints: [
      "At any midpoint, either the left half [l...mid] or right half [mid...r] is strictly sorted.",
      "Check if target is within the sorted range."
    ],
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
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple", "ByteDance"],
    roles: ["Backend", "Systems", "Quant"],
    tags: ["Array", "Binary Search"]
  },
  {
    id: "climbing-stairs",
    number: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "1D DP",
    acceptance: "52.7%",
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
        pass`
    },
    solutionCode: {
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let one = 2, two = 1;
    for (let i = 3; i <= n; i++) {
        const temp = one + two;
        two = one;
        one = temp;
    }
    return one;
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
      overview: "To reach step n, you must come from step n-1 (1 step) or step n-2 (2 steps). Thus, ways(n) = ways(n-1) + ways(n-2), identical to Fibonacci.",
      approaches: [
        {
          name: "Dynamic Programming (Space Optimized)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation: "Maintain two variables for the previous two steps and roll them forward.",
          code: `function climbStairs(n) {
    if (n <= 2) return n;
    let prev1 = 2, prev2 = 1;
    for (let i = 3; i <= n; i++) {
        let cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}`
        }
      ]
    },
    hints: [
      "To reach the nth step, what were the possible previous steps you were on?",
      "Sum ways to reach n-1 and ways to reach n-2."
    ],
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
    companies: ["Amazon", "Google", "Meta", "Apple", "Uber"],
    roles: ["Frontend", "Backend", "Fullstack"],
    tags: ["Math", "Dynamic Programming", "Memoization"]
  },
  {
    id: "coin-change",
    number: 322,
    title: "Coin Change",
    difficulty: "Medium",
    category: "1D DP",
    acceptance: "43.8%",
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
        pass`
    },
    solutionCode: {
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
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
      overview: "Bottom-up Dynamic Programming computes the minimum coins needed for all sub-amounts from 1 to amount.",
      approaches: [
        {
          name: "Bottom-up DP",
          timeComplexity: "O(amount * len(coins))",
          spaceComplexity: "O(amount)",
          explanation: "Let dp[i] be the min coins to form amount i. For each i, dp[i] = min(dp[i], 1 + dp[i - coin]) for all coin <= i.",
          code: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const c of coins) {
            if (i - c >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
        }
      ]
    },
    hints: [
      "Use DP array where dp[i] represents fewest coins to make amount i.",
      "Base case: dp[0] = 0."
    ],
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
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple", "Goldman Sachs"],
    roles: ["Backend", "Systems", "Quant"],
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"]
  },
  {
    id: "number-of-islands",
    number: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "59.2%",
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
        pass`
    },
    solutionCode: {
      javascript: `function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        grid[r][c] = '0'; // mark visited
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }

    return count;
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        islands = 0

        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == "0":
                return
            grid[r][c] = "0"
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":
                    dfs(r, c)
                    islands += 1
        return islands`
    },
    editorial: {
      overview: "Iterate through the grid. Whenever a '1' is encountered, trigger DFS/BFS to sink all connected land cells ('1' -> '0') and increment island count.",
      approaches: [
        {
          name: "DFS Flood Fill",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(M * N) worst case recursion stack",
          explanation: "For each unvisited '1', increment island count and recursively mark all connected '1's as '0' in 4 directions.",
          code: `function numIslands(grid) {
    let count = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') {
                count++;
                sink(grid, r, c);
            }
        }
    }
    return count;
}
function sink(grid, r, c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '0') return;
    grid[r][c] = '0';
    sink(grid, r + 1, c); sink(grid, r - 1, c);
    sink(grid, r, c + 1); sink(grid, r, c - 1);
}`
        }
      ]
    },
    hints: [
      "Scan each cell in the matrix.",
      "When encountering '1', run BFS or DFS to visit the entire island."
    ],
    testCases: [
      {
        input: [[
          ["1","1","1","1","0"],
          ["1","1","0","1","0"],
          ["1","1","0","0","0"],
          ["0","0","0","0","0"]
        ]],
        expected: 1,
        displayInput: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        displayExpected: "1"
      },
      {
        input: [[
          ["1","1","0","0","0"],
          ["1","1","0","0","0"],
          ["0","0","1","0","0"],
          ["0","0","0","1","1"]
        ]],
        expected: 3,
        displayInput: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        displayExpected: "3"
      }
    ],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Bloomberg", "Uber"],
    roles: ["Backend", "Systems", "Fullstack"],
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"]
  },
  {
    id: "course-schedule",
    number: 207,
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    acceptance: "47.2%",
    functionName: "canFinish",
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you **must** take course \`b_i\` first if you want to take course \`a_i\`.

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
      "0 <= a_i, b_i < numCourses",
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
        pass`
    },
    solutionCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
    const inDegree = new Array(numCourses).fill(0);
    const adj = Array.from({ length: numCourses }, () => []);

    for (const [course, pre] of prerequisites) {
        adj[pre].push(course);
        inDegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let taken = 0;
    while (queue.length > 0) {
        const node = queue.shift();
        taken++;
        for (const neighbor of adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return taken === numCourses;
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
      overview: "Detecting if all courses can be finished is equivalent to detecting cycles in a directed graph (or running Kahn's algorithm for Topological Sort).",
      approaches: [
        {
          name: "Kahn's Algorithm (BFS Topological Sort)",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V + E)",
          explanation: "Compute in-degrees for all vertices. Enqueue all vertices with 0 in-degree. When popping, decrement neighbors' in-degree. If total popped nodes equals numCourses, no cycle exists.",
          code: `function canFinish(numCourses, prerequisites) {
    const inDeg = new Array(numCourses).fill(0);
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [c, p] of prerequisites) { adj[p].push(c); inDeg[c]++; }
    const q = [];
    for (let i = 0; i < numCourses; i++) if (inDeg[i] === 0) q.push(i);
    let count = 0;
    while (q.length) {
        const u = q.shift();
        count++;
        for (const v of adj[u]) if (--inDeg[v] === 0) q.push(v);
    }
    return count === numCourses;
}`
        }
      ]
    },
    hints: [
      "Model this problem as finding a cycle in a directed graph.",
      "Topological sort (Kahn's algorithm) or DFS cycle detection works."
    ],
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
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Uber", "Apple"],
    roles: ["Backend", "Systems", "AI/ML"],
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"]
  }
];
