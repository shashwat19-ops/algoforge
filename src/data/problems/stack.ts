import { Problem } from "../problems";

export const STACK_PROBLEMS: Problem[] = [
  {
    id: "valid-parentheses",
    number: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptance: "41.1%",
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
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (char in map) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        Map = {")": "(", "]": "[", "}": "{"}
        stack = []
        for c in s:
            if c not in Map:
                stack.append(c)
                continue
            if not stack or stack[-1] != Map[c]:
                return False
            stack.pop()
        return not stack`
    },
    editorial: {
      overview: "Use a LIFO Stack to push opening brackets and pop/match when encountering closing brackets.",
      approaches: [
        {
          name: "Approach: Stack",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Push every open bracket onto the stack. When seeing a close bracket, verify the top of the stack matches. Return true if stack is empty at the end.",
          code: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const c of s) {
        if (map[c]) {
            if (stack.pop() !== map[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}`
        }
      ]
    },
    hints: ["Use a stack. Push opening brackets, and when you see a closing bracket, pop from the stack and verify it matches."],
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
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["String", "Stack"]
  },
  {
    id: "evaluate-reverse-polish-notation",
    number: 150,
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack",
    acceptance: "50.1%",
    functionName: "evalRPN",
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a **Reverse Polish Notation**.

Evaluate the expression. Return *an integer that represents the value of the expression*.

**Note** that:
- The valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero**.`,
    examples: [
      {
        input: 'tokens = ["2","1","+","3","*"]',
        output: "9",
        explanation: "((2 + 1) * 3) = 9"
      },
      {
        input: 'tokens = ["4","13","5","/","+"]',
        output: "6",
        explanation: "(4 + (13 / 5)) = 6"
      }
    ],
    constraints: [
      "1 <= tokens.length <= 10^4",
      "tokens[i] is either an operator: '+', '-', '*', or '/', or an integer in the range [-200, 200]."
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
    // Write your code here

};`,
      python: `class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function evalRPN(tokens) {
    const stack = [];
    for (const t of tokens) {
        if (t === "+") {
            stack.push(stack.pop() + stack.pop());
        } else if (t === "-") {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(a - b);
        } else if (t === "*") {
            stack.push(stack.pop() * stack.pop());
        } else if (t === "/") {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(Math.trunc(a / b));
        } else {
            stack.push(Number(t));
        }
    }
    return stack[0];
}`,
      python: `class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        stack = []
        for c in tokens:
            if c == "+":
                stack.append(stack.pop() + stack.pop())
            elif c == "-":
                a, b = stack.pop(), stack.pop()
                stack.append(b - a)
            elif c == "*":
                stack.append(stack.pop() * stack.pop())
            elif c == "/":
                a, b = stack.pop(), stack.pop()
                stack.append(int(float(b) / a))
            else:
                stack.append(int(c))
        return stack[0]`
    },
    editorial: {
      overview: "Iterate through tokens. Push numbers to the stack. When an operator is encountered, pop the top two numbers, apply the operator, and push the result back.",
      approaches: [
        {
          name: "Approach: Stack Evaluation",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Maintain a stack of operands. Remember that for '-' and '/', the second popped operand is the left operand.",
          code: `function evalRPN(tokens) {
    const stack = [];
    for (const t of tokens) {
        if (t === "+") stack.push(stack.pop() + stack.pop());
        else if (t === "-") { const b = stack.pop(), a = stack.pop(); stack.push(a - b); }
        else if (t === "*") stack.push(stack.pop() * stack.pop());
        else if (t === "/") { const b = stack.pop(), a = stack.pop(); stack.push(Math.trunc(a / b)); }
        else stack.push(Number(t));
    }
    return stack[0];
}`
        }
      ]
    },
    hints: ["Pop two elements whenever you see an operator, evaluate, and push result back."],
    testCases: [
      {
        input: [["2", "1", "+", "3", "*"]],
        expected: 9,
        displayInput: 'tokens = ["2","1","+","3","*"]',
        displayExpected: "9"
      },
      {
        input: [["4", "13", "5", "/", "+"]],
        expected: 6,
        displayInput: 'tokens = ["4","13","5","/","+"]',
        displayExpected: "6"
      }
    ],
    companies: ["Amazon", "LinkedIn", "Google"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Array", "Math", "Stack"]
  },
  {
    id: "generate-parentheses",
    number: 22,
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "Stack",
    acceptance: "75.2%",
    functionName: "generateParenthesis",
    description: `Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.`,
    examples: [
      {
        input: "n = 3",
        output: '["((()))","(()())","(())()","()(())","()()()"]'
      },
      {
        input: "n = 1",
        output: '["()"]'
      }
    ],
    constraints: [
      "1 <= n <= 8"
    ],
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    // Write your code here

};`,
      python: `class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function generateParenthesis(n) {
    const res = [];
    function backtrack(curr, openCount, closeCount) {
        if (curr.length === 2 * n) {
            res.push(curr);
            return;
        }
        if (openCount < n) {
            backtrack(curr + "(", openCount + 1, closeCount);
        }
        if (closeCount < openCount) {
            backtrack(curr + ")", openCount, closeCount + 1);
        }
    }
    backtrack("", 0, 0);
    return res;
}`,
      python: `class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        res = []
        def backtrack(openN, closedN, path):
            if openN == closedN == n:
                res.append("".join(path))
                return
            if openN < n:
                path.append("(")
                backtrack(openN + 1, closedN, path)
                path.pop()
            if closedN < openN:
                path.append(")")
                backtrack(openN, closedN + 1, path)
                path.pop()
        backtrack(0, 0, [])
        return res`
    },
    editorial: {
      overview: "Backtracking builds valid strings by adding '(' when openCount < n and ')' when closeCount < openCount.",
      approaches: [
        {
          name: "Approach: Backtracking",
          timeComplexity: "O(4^N / sqrt(N)) (Catalan number)",
          spaceComplexity: "O(N)",
          explanation: "Maintain counts of open and closed parentheses. Add '(' if open < n, and ')' if closed < open.",
          code: `function generateParenthesis(n) {
    const res = [];
    const dfs = (str, open, close) => {
        if (str.length === 2 * n) { res.push(str); return; }
        if (open < n) dfs(str + '(', open + 1, close);
        if (close < open) dfs(str + ')', open, close + 1);
    };
    dfs('', 0, 0);
    return res;
}`
        }
      ]
    },
    hints: ["Add '(' only if open < n, and ')' only if close < open."],
    testCases: [
      {
        input: [3],
        expected: ["((()))", "(()())", "(())()", "()(())", "()()()"],
        displayInput: "n = 3",
        displayExpected: '["((()))","(()())","(())()","()(())","()()()"]'
      },
      {
        input: [1],
        expected: ["()"],
        displayInput: "n = 1",
        displayExpected: '["()"]'
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["String", "Dynamic Programming", "Backtracking"]
  },
  {
    id: "daily-temperatures",
    number: 739,
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack",
    acceptance: "66.5%",
    functionName: "dailyTemperatures",
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return *an array* \`answer\` *such that* \`answer[i]\` *is the number of days you have to wait after the* \`i-th\` *day to get a warmer temperature*. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
    examples: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]"
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]"
      },
      {
        input: "temperatures = [30,60,90]",
        output: "[1,1,0]"
      }
    ],
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
    // Write your code here

};`,
      python: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function dailyTemperatures(temperatures) {
    const res = new Array(temperatures.length).fill(0);
    const stack = []; // indices of temperatures
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            res[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    return res;
}`,
      python: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        res = [0] * len(temperatures)
        stack = []  # pair: [temp, index]
        for i, t in enumerate(temperatures):
            while stack and t > stack[-1][0]:
                stackT, stackInd = stack.pop()
                res[stackInd] = i - stackInd
            stack.append((t, i))
        return res`
    },
    editorial: {
      overview: "A Monotonic Decreasing Stack stores temperatures and their indices. Whenever a warmer temperature is encountered, pop previous colder days and calculate distance.",
      approaches: [
        {
          name: "Approach: Monotonic Decreasing Stack",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Each index is pushed and popped from the stack at most once, resulting in linear O(N) time.",
          code: `function dailyTemperatures(temperatures) {
    const res = new Array(temperatures.length).fill(0);
    const stack = [];
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prev = stack.pop();
            res[prev] = i - prev;
        }
        stack.push(i);
    }
    return res;
}`
        }
      ]
    },
    hints: ["Use a monotonic decreasing stack to keep track of indices of previous days."],
    testCases: [
      {
        input: [[73, 74, 75, 71, 69, 72, 76, 73]],
        expected: [1, 1, 4, 2, 1, 1, 0, 0],
        displayInput: "temperatures = [73,74,75,71,69,72,76,73]",
        displayExpected: "[1,1,4,2,1,1,0,0]"
      },
      {
        input: [[30, 40, 50, 60]],
        expected: [1, 1, 1, 0],
        displayInput: "temperatures = [30,40,50,60]",
        displayExpected: "[1,1,1,0]"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Bloomberg"],
    roles: ["quant", "backend", "fullstack"],
    tags: ["Array", "Stack", "Monotonic Stack"]
  },
  {
    id: "largest-rectangle-in-histogram",
    number: 84,
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "Stack",
    acceptance: "44.1%",
    functionName: "largestRectangleArea",
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return *the area of the largest rectangle in the histogram*.`,
    examples: [
      {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation: "The above is a histogram where width of each bar is 1. The largest rectangle is shown in the red area, which has an area = 10 units."
      },
      {
        input: "heights = [2,4]",
        output: "4"
      }
    ],
    constraints: [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
    // Write your code here

};`,
      python: `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function largestRectangleArea(heights) {
    let maxArea = 0;
    const stack = []; // [index, height]
    for (let i = 0; i < heights.length; i++) {
        let start = i;
        while (stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
            const [index, height] = stack.pop();
            maxArea = Math.max(maxArea, height * (i - index));
            start = index;
        }
        stack.push([start, heights[i]]);
    }
    for (const [index, height] of stack) {
        maxArea = Math.max(maxArea, height * (heights.length - index));
    }
    return maxArea;
}`,
      python: `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        maxArea = 0
        stack = []  # pair: (index, height)
        for i, h in enumerate(heights):
            start = i
            while stack and stack[-1][1] > h:
                index, height = stack.pop()
                maxArea = max(maxArea, height * (i - index))
                start = index
            stack.append((start, h))
        for i, h in stack:
            maxArea = max(maxArea, h * (len(heights) - i))
        return maxArea`
    },
    editorial: {
      overview: "Monotonic Increasing Stack records where rectangles of given heights can extend backwards.",
      approaches: [
        {
          name: "Approach: Monotonic Stack",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Maintain a stack of [start_index, height]. When a shorter bar is seen, pop higher bars and compute their area with width = current_index - start_index.",
          code: `function largestRectangleArea(heights) {
    let max = 0;
    const stack = [];
    for (let i = 0; i < heights.length; i++) {
        let start = i;
        while (stack.length && stack[stack.length - 1][1] > heights[i]) {
            const [idx, h] = stack.pop();
            max = Math.max(max, h * (i - idx));
            start = idx;
        }
        stack.push([start, heights[i]]);
    }
    for (const [idx, h] of stack) {
        max = Math.max(max, h * (heights.length - idx));
    }
    return max;
}`
        }
      ]
    },
    hints: ["Use a monotonic stack to determine left and right boundaries where each bar is the minimum."],
    testCases: [
      {
        input: [[2, 1, 5, 6, 2, 3]],
        expected: 10,
        displayInput: "heights = [2,1,5,6,2,3]",
        displayExpected: "10"
      },
      {
        input: [[2, 4]],
        expected: 4,
        displayInput: "heights = [2,4]",
        displayExpected: "4"
      }
    ],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    roles: ["quant", "backend", "systems"],
    tags: ["Array", "Stack", "Monotonic Stack"]
  }
];
