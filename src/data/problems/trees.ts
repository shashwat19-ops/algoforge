import { Problem } from "../problems";

export const TREE_PROBLEMS: Problem[] = [
  {
    id: "invert-binary-tree",
    number: 226,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    acceptance: "77.5%",
    functionName: "invertTree",
    description: `Given the \`root\` of a binary tree, invert the tree, and return *its root*.`,
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]"
      },
      {
        input: "root = [2,1,3]",
        output: "[2,3,1]"
      },
      {
        input: "root = []",
        output: "[]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
    // Write your code here

};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function invertTree(root) {
    if (!root) return null;
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`,
      python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        tmp = root.left
        root.left = root.right
        root.right = tmp
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root`
    },
    editorial: {
      overview: "Recursively swap the left and right children for every node in the binary tree.",
      approaches: [
        {
          name: "Approach: Recursive DFS",
          timeComplexity: "O(N)",
          spaceComplexity: "O(H) where H is tree height",
          explanation: "Base case: if root is null, return null. Swap root.left and root.right, recursively invert both subtrees, and return root.",
          code: `function invertTree(root) {
    if (!root) return null;
    const left = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(left);
    return root;
}`
        }
      ]
    },
    hints: ["Swap left and right children at each node recursively."],
    testCases: [
      {
        input: [{ __isTreeNode: true, values: [4, 2, 7, 1, 3, 6, 9] }],
        expected: [4, 7, 2, 9, 6, 3, 1],
        displayInput: "root = [4,2,7,1,3,6,9]",
        displayExpected: "[4,7,2,9,6,3,1]"
      },
      {
        input: [{ __isTreeNode: true, values: [2, 1, 3] }],
        expected: [2, 3, 1],
        displayInput: "root = [2,1,3]",
        displayExpected: "[2,3,1]"
      }
    ],
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"]
  },
  {
    id: "maximum-depth-of-binary-tree",
    number: 104,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    acceptance: "75.8%",
    functionName: "maxDepth",
    description: `Given the \`root\` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3"
      },
      {
        input: "root = [1,null,2]",
        output: "2"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
    // Write your code here

};`,
      python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`
    },
    editorial: {
      overview: "The depth of a tree is 1 + max(depth(left), depth(right)).",
      approaches: [
        {
          name: "Approach: Recursive DFS",
          timeComplexity: "O(N)",
          spaceComplexity: "O(H)",
          explanation: "Recursively compute maximum depth of left and right subtrees and take their maximum plus one.",
          code: `function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
        }
      ]
    },
    hints: ["Depth is 1 + max(depth(left), depth(right))."],
    testCases: [
      {
        input: [{ __isTreeNode: true, values: [3, 9, 20, null, null, 15, 7] }],
        expected: 3,
        displayInput: "root = [3,9,20,null,null,15,7]",
        displayExpected: "3"
      },
      {
        input: [{ __isTreeNode: true, values: [1, null, 2] }],
        expected: 2,
        displayInput: "root = [1,null,2]",
        displayExpected: "2"
      }
    ],
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Tree", "Depth-First Search", "Binary Tree"]
  },
  {
    id: "same-tree",
    number: 100,
    title: "Same Tree",
    difficulty: "Easy",
    category: "Trees",
    acceptance: "61.3%",
    functionName: "isSameTree",
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    examples: [
      {
        input: "p = [1,2,3], q = [1,2,3]",
        output: "true"
      },
      {
        input: "p = [1,2], q = [1,null,2]",
        output: "false"
      },
      {
        input: "p = [1,2,1], q = [1,1,2]",
        output: "false"
      }
    ],
    constraints: [
      "The number of nodes in both trees is in the range [0, 100].",
      "-10^4 <= Node.val <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
    // Write your code here

};`,
      python: `class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      python: `class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q:
            return True
        if not p or not q or p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`
    },
    editorial: {
      overview: "Recursively check if both roots are null, or both have identical values and their left/right subtrees are identical.",
      approaches: [
        {
          name: "Approach: Recursive DFS",
          timeComplexity: "O(N)",
          spaceComplexity: "O(H)",
          explanation: "Compare current node values and recursively check if both left children and both right children match.",
          code: `function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`
        }
      ]
    },
    hints: ["Check if both nodes are null, or values match, then recurse on left and right."],
    testCases: [
      {
        input: [
          { __isTreeNode: true, values: [1, 2, 3] },
          { __isTreeNode: true, values: [1, 2, 3] }
        ],
        expected: true,
        displayInput: "p = [1,2,3], q = [1,2,3]",
        displayExpected: "true"
      },
      {
        input: [
          { __isTreeNode: true, values: [1, 2] },
          { __isTreeNode: true, values: [1, null, 2] }
        ],
        expected: false,
        displayInput: "p = [1,2], q = [1,null,2]",
        displayExpected: "false"
      }
    ],
    companies: ["Amazon", "Google", "Microsoft"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Tree", "Depth-First Search", "Binary Tree"]
  },
  {
    id: "lowest-common-ancestor-of-a-binary-search-tree",
    number: 235,
    title: "Lowest Common Ancestor of a Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "64.8%",
    functionName: "lowestCommonAncestor",
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the **definition of LCA on Wikipedia**: "The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow **a node to be a descendant of itself**)."`,
    examples: [
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        output: "6",
        explanation: "The LCA of nodes 2 and 8 is 6."
      },
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
        output: "2",
        explanation: "The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself."
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the BST."
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
function lowestCommonAncestor(root, p, q) {
    // Write your code here

};`,
      python: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {
    const pVal = typeof p === 'object' ? p.val : p;
    const qVal = typeof q === 'object' ? q.val : q;
    let curr = root;
    while (curr) {
        if (pVal < curr.val && qVal < curr.val) {
            curr = curr.left;
        } else if (pVal > curr.val && qVal > curr.val) {
            curr = curr.right;
        } else {
            return curr.val !== undefined ? curr.val : curr;
        }
    }
    return root.val;
}`,
      python: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        cur = root
        while cur:
            if p.val > cur.val and q.val > cur.val:
                cur = cur.right
            elif p.val < cur.val and q.val < cur.val:
                cur = cur.left
            else:
                return cur`
    },
    editorial: {
      overview: "Exploit BST properties: if both p and q are smaller than current node, LCA is in left subtree; if both are larger, LCA is in right subtree; otherwise current node is the split point (LCA).",
      approaches: [
        {
          name: "Approach: BST Traversal",
          timeComplexity: "O(H) where H is tree height",
          spaceComplexity: "O(1)",
          explanation: "Starting from root, move left if both values are smaller, move right if both values are larger. The split point is the LCA.",
          code: `function lowestCommonAncestor(root, p, q) {
    let curr = root;
    while (curr) {
        if (p < curr.val && q < curr.val) curr = curr.left;
        else if (p > curr.val && q > curr.val) curr = curr.right;
        else return curr.val;
    }
}`
        }
      ]
    },
    hints: ["Use BST ordering: if both values are less than root, go left. If both greater, go right."],
    testCases: [
      {
        input: [{ __isTreeNode: true, values: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5] }, 2, 8],
        expected: 6,
        displayInput: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        displayExpected: "6"
      },
      {
        input: [{ __isTreeNode: true, values: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5] }, 2, 4],
        expected: 2,
        displayInput: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
        displayExpected: "2"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
  },
  {
    id: "binary-tree-level-order-traversal",
    number: 102,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "67.4%",
    functionName: "levelOrder",
    description: `Given the \`root\` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).`,
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]"
      },
      {
        input: "root = [1]",
        output: "[[1]]"
      },
      {
        input: "root = []",
        output: "[]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
    // Write your code here

};`,
      python: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function levelOrder(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(currentLevel);
    }
    return res;
}`,
      python: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        res = []
        q = collections.deque()
        if root:
            q.append(root)
        while q:
            val = []
            for i in range(len(q)):
                node = q.popleft()
                val.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(val)
        return res`
    },
    editorial: {
      overview: "Use Breadth-First Search (BFS) with a queue. Process all nodes at the current level before moving to child nodes.",
      approaches: [
        {
          name: "Approach: BFS Queue",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation: "Maintain a queue. At each level, determine queue size, pop all nodes for that level, collect their values, and push their children.",
          code: `function levelOrder(root) {
    if (!root) return [];
    const res = [], queue = [root];
    while (queue.length) {
        const len = queue.length, level = [];
        for (let i = 0; i < len; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(level);
    }
    return res;
}`
        }
      ]
    },
    hints: ["Use a queue to process nodes level by level."],
    testCases: [
      {
        input: [{ __isTreeNode: true, values: [3, 9, 20, null, null, 15, 7] }],
        expected: [[3], [9, 20], [15, 7]],
        displayInput: "root = [3,9,20,null,null,15,7]",
        displayExpected: "[[3],[9,20],[15,7]]"
      },
      {
        input: [{ __isTreeNode: true, values: [1] }],
        expected: [[1]],
        displayInput: "root = [1]",
        displayExpected: "[[1]]"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Tree", "Breadth-First Search", "Binary Tree"]
  },
  {
    id: "validate-binary-search-tree",
    number: 98,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "33.2%",
    functionName: "isValidBST",
    description: `Given the \`root\` of a binary tree, *determine if it is a valid binary search tree (BST)*.

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true"
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "The root node's value is 5 but its right child's value is 4."
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
    // Write your code here

};`,
      python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function isValidBST(root) {
    function validate(node, low, high) {
        if (!node) return true;
        if (node.val <= low || node.val >= high) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
    return validate(root, -Infinity, Infinity);
}`,
      python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def valid(node, left, right):
            if not node:
                return True
            if not (left < node.val < right):
                return False
            return valid(node.left, left, node.val) and valid(node.right, node.val, right)
        return valid(root, float("-inf"), float("inf"))`
    },
    editorial: {
      overview: "Pass a valid range (min, max) down recursively. For left children, update max; for right children, update min.",
      approaches: [
        {
          name: "Approach: Range Validation DFS",
          timeComplexity: "O(N)",
          spaceComplexity: "O(H)",
          explanation: "Check that root.val is strictly between (min, max). Recurse left with upper bound = root.val, recurse right with lower bound = root.val.",
          code: `function isValidBST(root) {
    const validate = (node, min, max) => {
        if (!node) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    };
    return validate(root, -Infinity, Infinity);
}`
        }
      ]
    },
    hints: ["Pass allowed value boundaries (min, max) down during recursion."],
    testCases: [
      {
        input: [{ __isTreeNode: true, values: [2, 1, 3] }],
        expected: true,
        displayInput: "root = [2,1,3]",
        displayExpected: "true"
      },
      {
        input: [{ __isTreeNode: true, values: [5, 1, 4, null, null, 3, 6] }],
        expected: false,
        displayInput: "root = [5,1,4,null,null,3,6]",
        displayExpected: "false"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
  },
  {
    id: "kth-smallest-element-in-a-bst",
    number: 230,
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "72.1%",
    functionName: "kthSmallest",
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return *the* \`k\`*th smallest value (**1-indexed**) of all the values of the nodes in the tree*.`,
    examples: [
      {
        input: "root = [3,1,4,null,2], k = 1",
        output: "1"
      },
      {
        input: "root = [5,3,6,2,4,null,null,1], k = 3",
        output: "3"
      }
    ],
    constraints: [
      "The number of nodes in the tree is n.",
      "1 <= k <= n <= 10^4",
      "0 <= Node.val <= 10^4"
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    // Write your code here

};`,
      python: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function kthSmallest(root, k) {
    const stack = [];
    let curr = root;
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        k--;
        if (k === 0) return curr.val;
        curr = curr.right;
    }
    return -1;
}`,
      python: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
            curr = curr.right
        return -1`
    },
    editorial: {
      overview: "An in-order traversal of a BST visits nodes in strictly ascending sorted order. The k-th visited node is the k-th smallest element.",
      approaches: [
        {
          name: "Approach: Iterative In-Order Traversal",
          timeComplexity: "O(H + k)",
          spaceComplexity: "O(H)",
          explanation: "Push left children onto stack until null, pop, decrement k, and explore right subtrees.",
          code: `function kthSmallest(root, k) {
    const stack = [];
    let cur = root;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        k--;
        if (k === 0) return cur.val;
        cur = cur.right;
    }
}`
        }
      ]
    },
    hints: ["In-order traversal of a BST yields elements in sorted ascending order."],
    testCases: [
      {
        input: [{ __isTreeNode: true, values: [3, 1, 4, null, 2] }, 1],
        expected: 1,
        displayInput: "root = [3,1,4,null,2], k = 1",
        displayExpected: "1"
      },
      {
        input: [{ __isTreeNode: true, values: [5, 3, 6, 2, 4, null, null, 1] }, 3],
        expected: 3,
        displayInput: "root = [5,3,6,2,4,null,null,1], k = 3",
        displayExpected: "3"
      }
    ],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Uber"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
  },
  {
    id: "binary-tree-right-side-view",
    number: 199,
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    category: "Trees",
    acceptance: "63.9%",
    functionName: "rightSideView",
    description: `Given the \`root\` of a binary tree, imagine yourself standing on the **right side** of it, return *the values of the nodes you can see ordered from top to bottom*.`,
    examples: [
      {
        input: "root = [1,2,3,null,5,null,4]",
        output: "[1,3,4]"
      },
      {
        input: "root = [1,null,3]",
        output: "[1,3]"
      },
      {
        input: "root = []",
        output: "[]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
    // Write your code here

};`,
      python: `class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> list[int]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function rightSideView(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (i === size - 1) res.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return res;
}`,
      python: `class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> list[int]:
        if not root:
            return []
        res = []
        q = collections.deque([root])
        while q:
            size = len(q)
            for i in range(size):
                node = q.popleft()
                if i == size - 1:
                    res.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
        return res`
    },
    editorial: {
      overview: "Perform BFS level order traversal. The last node processed at each level is visible from the right side.",
      approaches: [
        {
          name: "Approach: Level Order BFS",
          timeComplexity: "O(N)",
          spaceComplexity: "O(D) where D is diameter of tree",
          explanation: "At each level in BFS, push the last element of the level array to the result.",
          code: `function rightSideView(root) {
    if (!root) return [];
    const res = [], q = [root];
    while (q.length) {
        const len = q.length;
        for (let i = 0; i < len; i++) {
            const node = q.shift();
            if (i === len - 1) res.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return res;
}`
        }
      ]
    },
    hints: ["Traverse level by level and record the rightmost node at each depth."],
    testCases: [
      {
        input: [{ __isTreeNode: true, values: [1, 2, 3, null, 5, null, 4] }],
        expected: [1, 3, 4],
        displayInput: "root = [1,2,3,null,5,null,4]",
        displayExpected: "[1,3,4]"
      },
      {
        input: [{ __isTreeNode: true, values: [1, null, 3] }],
        expected: [1, 3],
        displayInput: "root = [1,null,3]",
        displayExpected: "[1,3]"
      }
    ],
    companies: ["Meta", "Amazon", "Google", "Bloomberg", "Apple"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"]
  }
];
