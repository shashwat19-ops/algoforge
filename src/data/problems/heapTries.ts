import { Problem } from "../problems";

export const HEAP_TRIE_PROBLEMS: Problem[] = [
  {
    id: "kth-largest-element-in-an-array",
    number: 215,
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    acceptance: "66.8%",
    functionName: "findKthLargest",
    description: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k-th\` *largest element in the array*.

Note that it is the \`k-th\` largest element in the sorted order, not the \`k-th\` distinct element.

Can you solve it without sorting?`,
    examples: [
      {
        input: "nums = [3,2,1,5,6,4], k = 2",
        output: "5"
      },
      {
        input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        output: "4"
      }
    ],
    constraints: [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
    // Write your code here

};`,
      python: `class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function findKthLargest(nums, k) {
    // Quickselect algorithm
    function quickSelect(left, right, targetIndex) {
        const pivot = nums[right];
        let p = left;
        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                [nums[p], nums[i]] = [nums[i], nums[p]];
                p++;
            }
        }
        [nums[p], nums[right]] = [nums[right], nums[p]];
        if (p === targetIndex) return nums[p];
        if (p < targetIndex) return quickSelect(p + 1, right, targetIndex);
        return quickSelect(left, p - 1, targetIndex);
    }
    return quickSelect(0, nums.length - 1, nums.length - k);
}`,
      python: `class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        k = len(nums) - k
        def quickSelect(l, r):
            pivot, p = nums[r], l
            for i in range(l, r):
                if nums[i] <= pivot:
                    nums[p], nums[i] = nums[i], nums[p]
                    p += 1
            nums[p], nums[r] = nums[r], nums[p]
            if p > k: return quickSelect(l, p - 1)
            elif p < k: return quickSelect(p + 1, r)
            else: return nums[p]
        return quickSelect(0, len(nums) - 1)`
    },
    editorial: {
      overview: "Use QuickSelect (partitioning) to find the k-th largest element in average O(N) time.",
      approaches: [
        {
          name: "Approach: QuickSelect Partitioning",
          timeComplexity: "O(N) average, O(N^2) worst",
          spaceComplexity: "O(1)",
          explanation: "Partition the array around a pivot. If the pivot lands on index (n - k), we have found the k-th largest element.",
          code: `function findKthLargest(nums, k) {
    const target = nums.length - k;
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const pivot = nums[r];
        let p = l;
        for (let i = l; i < r; i++) {
            if (nums[i] <= pivot) {
                [nums[p], nums[i]] = [nums[i], nums[p]];
                p++;
            }
        }
        [nums[p], nums[r]] = [nums[r], nums[p]];
        if (p === target) return nums[p];
        if (p < target) l = p + 1;
        else r = p - 1;
    }
}`
        }
      ]
    },
    hints: ["Use a Min-Heap of size k or QuickSelect."],
    testCases: [
      {
        input: [[3, 2, 1, 5, 6, 4], 2],
        expected: 5,
        displayInput: "nums = [3,2,1,5,6,4], k = 2",
        displayExpected: "5"
      },
      {
        input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
        expected: 4,
        displayInput: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        displayExpected: "4"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple", "Goldman Sachs"],
    roles: ["quant", "backend", "fullstack", "systems"],
    tags: ["Array", "Divide and Conquer", "Sorting", "Heap (Priority Queue)", "Quickselect"]
  },
  {
    id: "k-closest-points-to-origin",
    number: 973,
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    acceptance: "66.1%",
    functionName: "kClosest",
    description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the **X-Y** plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the **X-Y** plane is the Euclidean distance (i.e., \`√(x1 - x2)^2 + (y1 - y2)^2\`).

You may return the answer in **any order**. The answer is **guaranteed** to be **unique** (except for the order that it is in).`,
    examples: [
      {
        input: "points = [[1,3],[-2,2]], k = 1",
        output: "[[-2,2]]",
        explanation: "The distance between (1, 3) and the origin is sqrt(10). The distance between (-2, 2) and the origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer."
      },
      {
        input: "points = [[3,3],[5,-1],[-2,4]], k = 2",
        output: "[[3,3],[-2,4]]",
        explanation: "The answer [[-2,4],[3,3]] would also be accepted."
      }
    ],
    constraints: [
      "1 <= k <= points.length <= 10^4",
      "-10^4 <= xi, yi <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
    // Write your code here

};`,
      python: `class Solution:
    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function kClosest(points, k) {
    return points
        .map(([x, y]) => ({ point: [x, y], dist: x * x + y * y }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, k)
        .map(item => item.point);
}`,
      python: `class Solution:
    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:
        pts = []
        for x, y in points:
            dist = (x ** 2) + (y ** 2)
            pts.append([dist, x, y])
        heapq.heapify(pts)
        res = []
        for _ in range(k):
            dist, x, y = heapq.heappop(pts)
            res.append([x, y])
        return res`
    },
    editorial: {
      overview: "Calculate Euclidean distance squared x^2 + y^2 for each point, and retrieve the smallest k items using a Max Heap or sorting.",
      approaches: [
        {
          name: "Approach: Distance Squared Sorting / Heap",
          timeComplexity: "O(N log K)",
          spaceComplexity: "O(K)",
          explanation: "Maintain a Max-Heap of size k holding the closest points seen so far.",
          code: `function kClosest(points, k) {
    return points.sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2)).slice(0, k);
}`
        }
      ]
    },
    hints: ["Compare distance squares (x^2 + y^2) to avoid square root computations."],
    testCases: [
      {
        input: [[[1, 3], [-2, 2]], 1],
        expected: [[-2, 2]],
        displayInput: "points = [[1,3],[-2,2]], k = 1",
        displayExpected: "[[-2,2]]"
      },
      {
        input: [[[3, 3], [5, -1], [-2, 4]], 2],
        expected: [[3, 3], [-2, 4]],
        displayInput: "points = [[3,3],[5,-1],[-2,4]], k = 2",
        displayExpected: "[[3,3],[-2,4]]"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Array", "Math", "Divide and Conquer", "Geometry", "Sorting", "Heap (Priority Queue)"]
  },
  {
    id: "task-scheduler",
    number: 621,
    title: "Task Scheduler",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    acceptance: "59.2%",
    functionName: "leastInterval",
    description: `You are given an array of CPU \`tasks\`, each represented by letters A to Z, and a cooling time \`n\`. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: **identical** tasks must be separated by at least \`n\` intervals because of cooling time.

Return the *minimum number of CPU intervals* that the CPU will take to finish all given tasks.`,
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: "8",
        explanation: "A -> B -> idle -> A -> B -> idle -> A -> B"
      },
      {
        input: 'tasks = ["A","C","A","B","D","B"], n = 1',
        output: "6",
        explanation: "A -> B -> C -> D -> A -> B"
      },
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 3',
        output: "10",
        explanation: "A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B"
      }
    ],
    constraints: [
      "1 <= tasks.length <= 10^4",
      "tasks[i] is an uppercase English letter.",
      "0 <= n <= 100"
    ],
    starterCode: {
      javascript: `/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
function leastInterval(tasks, n) {
    // Write your code here

};`,
      python: `class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function leastInterval(tasks, n) {
    const counts = {};
    for (const t of tasks) counts[t] = (counts[t] || 0) + 1;
    const maxFreq = Math.max(...Object.values(counts));
    let maxCount = 0;
    for (const count of Object.values(counts)) {
        if (count === maxFreq) maxCount++;
    }
    const emptySlots = (maxFreq - 1) * (n + 1) + maxCount;
    return Math.max(tasks.length, emptySlots);
}`,
      python: `class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        count = Counter(tasks)
        maxCount = max(count.values())
        max_c = 0
        for val in count.values():
            if val == maxCount:
                max_c += 1
        time = (maxCount - 1) * (n + 1) + max_c
        return max(len(tasks), time)`
    },
    editorial: {
      overview: "The most frequent task creates (maxFreq - 1) chunks of size (n + 1). Fill remaining slots with other tasks.",
      approaches: [
        {
          name: "Approach: Greedy Frequency Math",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1) (26 letters)",
          explanation: "Formula: Math.max(tasks.length, (maxFreq - 1) * (n + 1) + countOfMaxFreqTasks).",
          code: `function leastInterval(tasks, n) {
    const freq = {};
    for (const t of tasks) freq[t] = (freq[t] || 0) + 1;
    const max = Math.max(...Object.values(freq));
    const maxCount = Object.values(freq).filter(c => c === max).length;
    return Math.max(tasks.length, (max - 1) * (n + 1) + maxCount);
}`
        }
      ]
    },
    hints: ["Find the maximum frequency among all tasks and calculate idle slots."],
    testCases: [
      {
        input: [["A", "A", "A", "B", "B", "B"], 2],
        expected: 8,
        displayInput: 'tasks = ["A","A","A","B","B","B"], n = 2',
        displayExpected: "8"
      },
      {
        input: [["A", "C", "A", "B", "D", "B"], 1],
        expected: 6,
        displayInput: 'tasks = ["A","C","A","B","D","B"], n = 1',
        displayExpected: "6"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft"],
    roles: ["backend", "quant", "systems", "fullstack"],
    tags: ["Array", "Hash Table", "Greedy", "Sorting", "Heap (Priority Queue)", "Counting"]
  },
  {
    id: "implement-trie-prefix-tree",
    number: 208,
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    acceptance: "64.8%",
    functionName: "Trie",
    description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.`,
    examples: [
      {
        input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        output: "[null, null, true, false, true, null, true]",
        explanation: 'Trie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple");   // return True\ntrie.search("app");     // return False\ntrie.startsWith("app"); // return True\ntrie.insert("app");\ntrie.search("app");     // return True'
      }
    ],
    constraints: [
      "1 <= word.length, prefix.length <= 2000",
      "word and prefix consist only of lowercase English letters.",
      "At most 3 * 10^4 calls in total will be made to insert, search, and startsWith."
    ],
    starterCode: {
      javascript: `var Trie = function() {
    this.root = {};
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    // Write your code here

};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    // Write your code here

};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    // Write your code here

};`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def startsWith(self, prefix: str) -> bool:
        pass`
    },
    solutionCode: {
      javascript: `var Trie = function() {
    this.root = {};
};
Trie.prototype.insert = function(word) {
    let curr = this.root;
    for (const ch of word) {
        if (!curr[ch]) curr[ch] = {};
        curr = curr[ch];
    }
    curr.isEnd = true;
};
Trie.prototype.search = function(word) {
    let curr = this.root;
    for (const ch of word) {
        if (!curr[ch]) return false;
        curr = curr[ch];
    }
    return !!curr.isEnd;
};
Trie.prototype.startsWith = function(prefix) {
    let curr = this.root;
    for (const ch of prefix) {
        if (!curr[ch]) return false;
        curr = curr[ch];
    }
    return true;
};`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.end_of_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.end_of_word

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True`
    },
    editorial: {
      overview: "Each tree node has pointers/keys for child characters and a boolean marker `isEnd` indicating if a valid inserted word terminates at this node.",
      approaches: [
        {
          name: "Approach: Hash Map / Array Trie Nodes",
          timeComplexity: "O(L) per operation where L is word length",
          spaceComplexity: "O(T * L) total characters stored",
          explanation: "Iterate letter by letter creating or walking tree nodes.",
          code: `class Trie {
    constructor() { this.root = {}; }
    insert(word) {
        let node = this.root;
        for (let c of word) node = (node[c] = node[c] || {});
        node.end = true;
    }
    search(word) {
        let node = this.root;
        for (let c of word) if (!(node = node[c])) return false;
        return !!node.end;
    }
    startsWith(prefix) {
        let node = this.root;
        for (let c of prefix) if (!(node = node[c])) return false;
        return true;
    }
}`
        }
      ]
    },
    hints: ["Use nested objects or children dictionaries with an isEnd boolean flag."],
    testCases: [
      {
        input: ["insert:apple", "search:apple", "search:app", "startsWith:app"],
        expected: [null, true, false, true],
        displayInput: 'commands = ["insert(apple)", "search(apple)", "search(app)", "startsWith(app)"]',
        displayExpected: "[null, true, false, true]"
      }
    ],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Twitter"],
    roles: ["frontend", "backend", "fullstack", "systems"],
    tags: ["Hash Table", "String", "Design", "Trie"]
  }
];
