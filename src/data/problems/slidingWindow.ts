import { Problem } from "../problems";

export const SLIDING_WINDOW_PROBLEMS: Problem[] = [
  {
    id: "best-time-to-buy-and-sell-stock",
    number: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Sliding Window",
    acceptance: "54.2%",
    functionName: "maxProfit",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
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
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    return maxProfit;
}`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        l, r = 0, 1
        maxP = 0
        while r < len(prices):
            if prices[l] < prices[r]:
                profit = prices[r] - prices[l]
                maxP = max(maxP, profit)
            else:
                l = r
            r += 1
        return maxP`
    },
    editorial: {
      overview: "Track the minimum price observed so far, and calculate the maximum difference between any future price and this minimum.",
      approaches: [
        {
          name: "Approach: One Pass Tracking Minimum",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain a running minimum price. For every day, calculate profit = price - minPrice and update maxProfit.",
          code: `function maxProfit(prices) {
    let min = Infinity, maxP = 0;
    for (const p of prices) {
        min = Math.min(min, p);
        maxP = Math.max(maxP, p - min);
    }
    return maxP;
}`
        }
      ]
    },
    hints: ["Keep track of the minimum price you have seen so far as you iterate."],
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
    companies: ["Amazon", "Google", "Meta", "Goldman Sachs", "Bloomberg"],
    roles: ["quant", "backend", "fullstack", "frontend"],
    tags: ["Array", "Dynamic Programming"]
  },
  {
    id: "longest-substring-without-repeating-characters",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptance: "34.7%",
    functionName: "lengthOfLongestSubstring",
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
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
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
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
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function lengthOfLongestSubstring(s) {
    const seen = new Map();
    let maxLen = 0;
    let left = 0;
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (seen.has(char) && seen.get(char) >= left) {
            left = seen.get(char) + 1;
        }
        seen.set(char, right);
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
      overview: "Sliding window with a hash map stores the most recent index of each character to advance the left pointer in O(1).",
      approaches: [
        {
          name: "Approach: Sliding Window with Hash Map",
          timeComplexity: "O(N)",
          spaceComplexity: "O(min(M, N)) where M is alphabet size",
          explanation: "Maintain a window [left, right]. When a character at right has been seen at index j >= left, move left to j + 1.",
          code: `function lengthOfLongestSubstring(s) {
    const map = new Map();
    let left = 0, max = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            left = map.get(s[right]) + 1;
        }
        map.set(s[right], right);
        max = Math.max(max, right - left + 1);
    }
    return max;
}`
        }
      ]
    },
    hints: ["Use a sliding window [L, R] and expand R while characters are unique."],
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
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Hash Table", "String", "Sliding Window"]
  },
  {
    id: "longest-repeating-character-replacement",
    number: 424,
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptance: "53.8%",
    functionName: "characterReplacement",
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.`,
    examples: [
      {
        input: 's = "ABAB", k = 2',
        output: "4",
        explanation: 'Replace the two "A"s with two "B"s or vice versa.'
      },
      {
        input: 's = "AABABBA", k = 1',
        output: "4",
        explanation: 'Replace the one "A" in the middle with "B" and form "AABBBBA". The substring "BBBB" has length 4.'
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of only uppercase English letters.",
      "0 <= k <= s.length"
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function characterReplacement(s, k) {
    // Write your code here

};`,
      python: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function characterReplacement(s, k) {
    const counts = new Map();
    let left = 0, maxCount = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        counts.set(char, (counts.get(char) || 0) + 1);
        maxCount = Math.max(maxCount, counts.get(char));
        while ((right - left + 1) - maxCount > k) {
            counts.set(s[left], counts.get(s[left]) - 1);
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      python: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = {}
        res = 0
        l = 0
        maxf = 0
        for r in range(len(s)):
            count[s[r]] = 1 + count.get(s[r], 0)
            maxf = max(maxf, count[s[r]])
            while (r - l + 1) - maxf > k:
                count[s[l]] -= 1
                l += 1
            res = max(res, r - l + 1)
        return res`
    },
    editorial: {
      overview: "A window [L, R] is valid if (windowLength - maxFrequency) <= k.",
      approaches: [
        {
          name: "Approach: Sliding Window with Frequency Map",
          timeComplexity: "O(N)",
          spaceComplexity: "O(26) = O(1)",
          explanation: "Maintain frequency count of characters in window. If length - maxCount > k, increment left pointer and decrement its count.",
          code: `function characterReplacement(s, k) {
    const map = new Map();
    let l = 0, maxf = 0, maxLen = 0;
    for (let r = 0; r < s.length; r++) {
        map.set(s[r], (map.get(s[r]) || 0) + 1);
        maxf = Math.max(maxf, map.get(s[r]));
        while ((r - l + 1) - maxf > k) {
            map.set(s[l], map.get(s[l]) - 1);
            l++;
        }
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`
        }
      ]
    },
    hints: ["A window is valid if (window size - max frequency char) <= k."],
    testCases: [
      {
        input: ["ABAB", 2],
        expected: 4,
        displayInput: 's = "ABAB", k = 2',
        displayExpected: "4"
      },
      {
        input: ["AABABBA", 1],
        expected: 4,
        displayInput: 's = "AABABBA", k = 1',
        displayExpected: "4"
      }
    ],
    companies: ["Google", "Amazon", "Meta"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Hash Table", "String", "Sliding Window"]
  },
  {
    id: "permutation-in-string",
    number: 567,
    title: "Permutation in String",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptance: "44.6%",
    functionName: "checkInclusion",
    description: `Given two strings \`s1\` and \`s2\`, return \`true\` *if* \`s2\` *contains a permutation of* \`s1\`, *or* \`false\` *otherwise*.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.`,
    examples: [
      {
        input: 's1 = "ab", s2 = "eidbaooo"',
        output: "true",
        explanation: 's2 contains one permutation of s1 ("ba").'
      },
      {
        input: 's1 = "ab", s2 = "eidboaoo"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s1.length, s2.length <= 10^4",
      "s1 and s2 consist of lowercase English letters."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
    // Write your code here

};`,
      python: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    const count1 = new Array(26).fill(0);
    const count2 = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        count1[s1.charCodeAt(i) - 97]++;
        count2[s2.charCodeAt(i) - 97]++;
    }
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (count1[i] === count2[i]) matches++;
    }
    let l = 0;
    for (let r = s1.length; r < s2.length; r++) {
        if (matches === 26) return true;
        let idx = s2.charCodeAt(r) - 97;
        count2[idx]++;
        if (count1[idx] === count2[idx]) matches++;
        else if (count1[idx] + 1 === count2[idx]) matches--;

        idx = s2.charCodeAt(l) - 97;
        count2[idx]--;
        if (count1[idx] === count2[idx]) matches++;
        else if (count1[idx] - 1 === count2[idx]) matches--;
        l++;
    }
    return matches === 26;
}`,
      python: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False
        s1Count, s2Count = [0] * 26, [0] * 26
        for i in range(len(s1)):
            s1Count[ord(s1[i]) - ord('a')] += 1
            s2Count[ord(s2[i]) - ord('a')] += 1
        matches = 0
        for i in range(26):
            matches += (1 if s1Count[i] == s2Count[i] else 0)
        l = 0
        for r in range(len(s1), len(s2)):
            if matches == 26:
                return True
            index = ord(s2[r]) - ord('a')
            s2Count[index] += 1
            if s1Count[index] == s2Count[index]:
                matches += 1
            elif s1Count[index] + 1 == s2Count[index]:
                matches -= 1
            index = ord(s2[l]) - ord('a')
            s2Count[index] -= 1
            if s1Count[index] == s2Count[index]:
                matches += 1
            elif s1Count[index] - 1 == s2Count[index]:
                matches -= 1
            l += 1
        return matches == 26`
    },
    editorial: {
      overview: "Fixed-size sliding window of length s1.length counts matching character frequencies in O(26) = O(1) time per step.",
      approaches: [
        {
          name: "Approach: Fixed Size Sliding Window",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain an array of size 26 for frequency counts and track number of character matches out of 26 letters.",
          code: `function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    const c1 = new Array(26).fill(0), c2 = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        c1[s1.charCodeAt(i) - 97]++;
        c2[s2.charCodeAt(i) - 97]++;
    }
    const match = () => c1.every((v, i) => v === c2[i]);
    for (let i = 0; i <= s2.length - s1.length; i++) {
        if (match()) return true;
        c2[s2.charCodeAt(i) - 97]--;
        if (i + s1.length < s2.length) {
            c2[s2.charCodeAt(i + s1.length) - 97]++;
        }
    }
    return false;
}`
        }
      ]
    },
    hints: ["Use a sliding window of length len(s1) across s2 and check if character counts match."],
    testCases: [
      {
        input: ["ab", "eidbaooo"],
        expected: true,
        displayInput: 's1 = "ab", s2 = "eidbaooo"',
        displayExpected: "true"
      },
      {
        input: ["ab", "eidboaoo"],
        expected: false,
        displayInput: 's1 = "ab", s2 = "eidboaoo"',
        displayExpected: "false"
      }
    ],
    companies: ["Microsoft", "Meta", "Amazon"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Hash Table", "Two Pointers", "String", "Sliding Window"]
  },
  {
    id: "minimum-window-substring",
    number: 76,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "Sliding Window",
    acceptance: "42.7%",
    functionName: "minWindow",
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (**including duplicates**) is included in the window. If there is no such substring, return the empty string \`""\`.

The testcases will be generated such that the answer is **unique**.`,
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.'
      },
      {
        input: 's = "a", t = "a"',
        output: '"a"'
      },
      {
        input: 's = "a", t = "aa"',
        output: '""',
        explanation: 'Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.'
      }
    ],
    constraints: [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
    // Write your code here

};`,
      python: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function minWindow(s, t) {
    if (t === "" || s.length < t.length) return "";
    const countT = new Map();
    for (const c of t) countT.set(c, (countT.get(c) || 0) + 1);
    const window = new Map();
    let have = 0, need = countT.size;
    let res = [-1, -1], resLen = Infinity;
    let l = 0;
    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        window.set(c, (window.get(c) || 0) + 1);
        if (countT.has(c) && window.get(c) === countT.get(c)) {
            have++;
        }
        while (have === need) {
            if ((r - l + 1) < resLen) {
                res = [l, r];
                resLen = r - l + 1;
            }
            window.set(s[l], window.get(s[l]) - 1);
            if (countT.has(s[l]) && window.get(s[l]) < countT.get(s[l])) {
                have--;
            }
            l++;
        }
    }
    return resLen !== Infinity ? s.slice(res[0], res[1] + 1) : "";
}`,
      python: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if t == "":
            return ""
        countT, window = {}, {}
        for c in t:
            countT[c] = 1 + countT.get(c, 0)
        have, need = 0, len(countT)
        res, resLen = [-1, -1], float("infinity")
        l = 0
        for r in range(len(s)):
            c = s[r]
            window[c] = 1 + window.get(c, 0)
            if c in countT and window[c] == countT[c]:
                have += 1
            while have == need:
                if (r - l + 1) < resLen:
                    res = [l, r]
                    resLen = r - l + 1
                window[s[l]] -= 1
                if s[l] in countT and window[s[l]] < countT[s[l]]:
                    have -= 1
                l += 1
        l, r = res
        return s[l : r + 1] if resLen != float("infinity") else ""`
    },
    editorial: {
      overview: "Variable sliding window: expand right until all characters in t are matched, then shrink left to minimize window length.",
      approaches: [
        {
          name: "Approach: Sliding Window with Condition Matching",
          timeComplexity: "O(M + N)",
          spaceComplexity: "O(M + N)",
          explanation: "Maintain counts of target characters and track 'have' vs 'need'. When have === need, record the current window and shrink from the left.",
          code: `function minWindow(s, t) {
    if (t.length > s.length) return "";
    const target = {};
    for (const c of t) target[c] = (target[c] || 0) + 1;
    let have = 0, need = Object.keys(target).length;
    let minLen = Infinity, minStart = 0, l = 0;
    const window = {};
    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        window[c] = (window[c] || 0) + 1;
        if (target[c] && window[c] === target[c]) have++;
        while (have === need) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                minStart = l;
            }
            window[s[l]]--;
            if (target[s[l]] && window[s[l]] < target[s[l]]) have--;
            l++;
        }
    }
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}`
        }
      ]
    },
    hints: ["Expand R until the window satisfies condition, then contract L to minimize."],
    testCases: [
      {
        input: ["ADOBECODEBANC", "ABC"],
        expected: "BANC",
        displayInput: 's = "ADOBECODEBANC", t = "ABC"',
        displayExpected: '"BANC"'
      },
      {
        input: ["a", "a"],
        expected: "a",
        displayInput: 's = "a", t = "a"',
        displayExpected: '"a"'
      },
      {
        input: ["a", "aa"],
        expected: "",
        displayInput: 's = "a", t = "aa"',
        displayExpected: '""'
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Uber", "Apple"],
    roles: ["quant", "backend", "fullstack"],
    tags: ["Hash Table", "String", "Sliding Window"]
  }
];
