import { Problem } from "../problems";

export const LINKED_LIST_PROBLEMS: Problem[] = [
  {
    id: "reverse-linked-list",
    number: 206,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "76.4%",
    functionName: "reverseList",
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.`,
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      },
      {
        input: "head = []",
        output: "[]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    // Write your code here

};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function reverseList(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
      python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev, curr = None, head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev`
    },
    editorial: {
      overview: "Iterate through the linked list, redirecting each node's `next` pointer to its predecessor `prev`.",
      approaches: [
        {
          name: "Approach: Iterative In-Place Reversal",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Maintain `prev` and `curr` pointers. In each iteration, save `curr.next`, set `curr.next = prev`, and advance `prev` and `curr`.",
          code: `function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
        }
      ]
    },
    hints: ["Keep track of the previous node while traversing forward."],
    testCases: [
      {
        input: [{ __isListNode: true, values: [1, 2, 3, 4, 5] }],
        expected: [5, 4, 3, 2, 1],
        displayInput: "head = [1,2,3,4,5]",
        displayExpected: "[5,4,3,2,1]"
      },
      {
        input: [{ __isListNode: true, values: [1, 2] }],
        expected: [2, 1],
        displayInput: "head = [1,2]",
        displayExpected: "[2,1]"
      }
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Linked List", "Recursion"]
  },
  {
    id: "merge-two-sorted-lists",
    number: 21,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: "64.2%",
    functionName: "mergeTwoLists",
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return *the head of the merged linked list*.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]"
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Write your code here

};`,
      python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let tail = dummy;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 || list2;
    return dummy.next;
}`,
      python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy
        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next`
    },
    editorial: {
      overview: "Use a dummy head and compare the values of list1 and list2 node by node.",
      approaches: [
        {
          name: "Approach: Two-Pointer Iteration with Dummy Node",
          timeComplexity: "O(N + M)",
          spaceComplexity: "O(1)",
          explanation: "Maintain a pointer to the tail of the merged list. Compare the current heads of list1 and list2, attach the smaller node to tail, and advance that list's pointer.",
          code: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let tail = dummy;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            tail.next = list1; list1 = list1.next;
        } else {
            tail.next = list2; list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 || list2;
    return dummy.next;
}`
        }
      ]
    },
    hints: ["Use a dummy node to avoid special handling for the head of the merged list."],
    testCases: [
      {
        input: [
          { __isListNode: true, values: [1, 2, 4] },
          { __isListNode: true, values: [1, 3, 4] }
        ],
        expected: [1, 1, 2, 3, 4, 4],
        displayInput: "list1 = [1,2,4], list2 = [1,3,4]",
        displayExpected: "[1,1,2,3,4,4]"
      },
      {
        input: [
          { __isListNode: true, values: [] },
          { __isListNode: true, values: [0] }
        ],
        expected: [0],
        displayInput: "list1 = [], list2 = [0]",
        displayExpected: "[0]"
      }
    ],
    companies: ["Amazon", "Apple", "Microsoft", "Meta", "Google"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Linked List", "Recursion"]
  },
  {
    id: "reorder-list",
    number: 143,
    title: "Reorder List",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "56.8%",
    functionName: "reorderList",
    description: `You are given the head of a singly linked-list:
\`L0 -> L1 -> ... -> Ln - 1 -> Ln\`

Reorder the list to be on the following form:
\`L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ...\`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    examples: [
      {
        input: "head = [1,2,3,4]",
        output: "[1,4,2,3]"
      },
      {
        input: "head = [1,2,3,4,5]",
        output: "[1,5,2,4,3]"
      }
    ],
    constraints: [
      "The number of nodes in the list is in the range [1, 5 * 10^4].",
      "1 <= Node.val <= 1000"
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
function reorderList(head) {
    // Write your code here

};`,
      python: `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        # Do not return anything, modify head in-place instead.
        pass`
    },
    solutionCode: {
      javascript: `function reorderList(head) {
    if (!head || !head.next) return head;
    // 1. Find middle with slow & fast pointers
    let slow = head, fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 2. Reverse second half
    let second = slow.next;
    slow.next = null;
    let prev = null;
    while (second) {
        const temp = second.next;
        second.next = prev;
        prev = second;
        second = temp;
    }
    // 3. Merge two halves
    let first = head;
    second = prev;
    while (second) {
        const tmp1 = first.next;
        const tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
    return head;
}`,
      python: `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next:
            return
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        second = slow.next
        prev = slow.next = None
        while second:
            tmp = second.next
            second.next = prev
            prev = second
            second = tmp
        first, second = head, prev
        while second:
            tmp1, tmp2 = first.next, second.next
            first.next = second
            second.next = tmp1
            first, second = tmp1, tmp2`
    },
    editorial: {
      overview: "Find the middle of the list, reverse the second half, and interleave the two halves.",
      approaches: [
        {
          name: "Approach: Middle + Reverse + Merge",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Step 1: Find middle using slow/fast pointers. Step 2: Reverse second half. Step 3: Weave nodes from head and reversed second half.",
          code: `function reorderList(head) {
    if (!head || !head.next) return head;
    let slow = head, fast = head.next;
    while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
    let second = slow.next; slow.next = null;
    let prev = null;
    while (second) { const tmp = second.next; second.next = prev; prev = second; second = tmp; }
    let first = head; second = prev;
    while (second) {
        const tmp1 = first.next, tmp2 = second.next;
        first.next = second; second.next = tmp1;
        first = tmp1; second = tmp2;
    }
    return head;
}`
        }
      ]
    },
    hints: ["Split list into two halves, reverse the second half, and merge them alternately."],
    testCases: [
      {
        input: [{ __isListNode: true, values: [1, 2, 3, 4] }],
        expected: [1, 4, 2, 3],
        displayInput: "head = [1,2,3,4]",
        displayExpected: "[1,4,2,3]"
      },
      {
        input: [{ __isListNode: true, values: [1, 2, 3, 4, 5] }],
        expected: [1, 5, 2, 4, 3],
        displayInput: "head = [1,2,3,4,5]",
        displayExpected: "[1,5,2,4,3]"
      }
    ],
    companies: ["Meta", "Amazon", "Microsoft", "Google"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Linked List", "Two Pointers", "Stack"]
  },
  {
    id: "remove-nth-node-from-end-of-list",
    number: 19,
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "44.9%",
    functionName: "removeNthFromEnd",
    description: `Given the \`head\` of a linked list, remove the \`n-th\` node from the end of the list and return its head.`,
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]"
      },
      {
        input: "head = [1], n = 1",
        output: "[]"
      },
      {
        input: "head = [1,2], n = 1",
        output: "[1]"
      }
    ],
    constraints: [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz"
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
    // Write your code here

};`,
      python: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head);
    let left = dummy;
    let right = head;
    for (let i = 0; i < n; i++) {
        right = right.next;
    }
    while (right) {
        left = left.next;
        right = right.next;
    }
    left.next = left.next.next;
    return dummy.next;
}`,
      python: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        left = dummy
        right = head
        while n > 0:
            right = right.next
            n -= 1
        while right:
            left = left.next
            right = right.next
        left.next = left.next.next
        return dummy.next`
    },
    editorial: {
      overview: "Use two pointers separated by n steps. When the fast pointer reaches the end, the slow pointer is right before the target node.",
      approaches: [
        {
          name: "Approach: Two Pointers with Offset",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Initialize dummy node pointing to head. Advance right pointer n steps ahead. Then advance left and right until right hits null. Skip left.next.",
          code: `function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head);
    let left = dummy, right = head;
    while (n > 0) { right = right.next; n--; }
    while (right) { left = left.next; right = right.next; }
    left.next = left.next.next;
    return dummy.next;
}`
        }
      ]
    },
    hints: ["Advance a fast pointer n nodes first, then advance both pointers until the fast pointer reaches the end."],
    testCases: [
      {
        input: [{ __isListNode: true, values: [1, 2, 3, 4, 5] }, 2],
        expected: [1, 2, 3, 5],
        displayInput: "head = [1,2,3,4,5], n = 2",
        displayExpected: "[1,2,3,5]"
      },
      {
        input: [{ __isListNode: true, values: [1] }, 1],
        expected: [],
        displayInput: "head = [1], n = 1",
        displayExpected: "[]"
      }
    ],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    roles: ["frontend", "backend", "fullstack"],
    tags: ["Linked List", "Two Pointers"]
  },
  {
    id: "add-two-numbers",
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "43.1%",
    functionName: "addTwoNumbers",
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]"
      },
      {
        input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]"
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Write your code here

};`,
      python: `class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;
    while (l1 || l2 || carry) {
        const v1 = l1 ? l1.val : 0;
        const v2 = l2 ? l2.val : 0;
        const sum = v1 + v2 + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return dummy.next;
}`,
      python: `class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy
        carry = 0
        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            val = v1 + v2 + carry
            carry = val // 10
            val = val % 10
            cur.next = ListNode(val)
            cur = cur.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return dummy.next`
    },
    editorial: {
      overview: "Simulate elementary school addition digit by digit, tracking the carry forward.",
      approaches: [
        {
          name: "Approach: Elementary Math with Dummy Node",
          timeComplexity: "O(max(N, M))",
          spaceComplexity: "O(max(N, M))",
          explanation: "Iterate while l1, l2, or carry exists. Sum digit values plus carry, create a new node with sum % 10, update carry = Math.floor(sum / 10).",
          code: `function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy, carry = 0;
    while (l1 || l2 || carry) {
        const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return dummy.next;
}`
        }
      ]
    },
    hints: ["Keep track of the carry and create new nodes for each digit."],
    testCases: [
      {
        input: [
          { __isListNode: true, values: [2, 4, 3] },
          { __isListNode: true, values: [5, 6, 4] }
        ],
        expected: [7, 0, 8],
        displayInput: "l1 = [2,4,3], l2 = [5,6,4]",
        displayExpected: "[7,0,8]"
      },
      {
        input: [
          { __isListNode: true, values: [0] },
          { __isListNode: true, values: [0] }
        ],
        expected: [0],
        displayInput: "l1 = [0], l2 = [0]",
        displayExpected: "[0]"
      }
    ],
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Apple", "Bloomberg"],
    roles: ["frontend", "backend", "fullstack", "quant"],
    tags: ["Linked List", "Math", "Recursion"]
  },
  {
    id: "find-the-duplicate-number",
    number: 287,
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: "60.4%",
    functionName: "findDuplicate",
    description: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.

There is only **one repeated number** in \`nums\`, return *this repeated number*.

You must solve the problem **without** modifying the array \`nums\` and uses only constant extra space.`,
    examples: [
      {
        input: "nums = [1,3,4,2,2]",
        output: "2"
      },
      {
        input: "nums = [3,1,3,4,2]",
        output: "3"
      },
      {
        input: "nums = [3,3,3,3,3]",
        output: "3"
      }
    ],
    constraints: [
      "1 <= n <= 10^5",
      "nums.length == n + 1",
      "1 <= nums[i] <= n",
      "All the integers in nums appear only once except for precisely one integer which appears two or more times."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
    // Write your code here

};`,
      python: `class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        # Write your code here
        pass`
    },
    solutionCode: {
      javascript: `function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    let slow2 = nums[0];
    while (slow !== slow2) {
        slow = nums[slow];
        slow2 = nums[slow2];
    }
    return slow;
}`,
      python: `class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        slow, fast = 0, 0
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        slow2 = 0
        while True:
            slow = nums[slow]
            slow2 = nums[slow2]
            if slow == slow2:
                return slow`
    },
    editorial: {
      overview: "Treat the array as a linked list where nums[i] is the next pointer. Use Floyd's Tortoise and Hare cycle detection.",
      approaches: [
        {
          name: "Approach: Floyd's Cycle Finding Algorithm",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation: "Phase 1: Find intersection point of slow and fast pointers. Phase 2: Start a new pointer from head and move both 1 step at a time until they meet at the cycle entry.",
          code: `function findDuplicate(nums) {
    let slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    let slow2 = nums[0];
    while (slow !== slow2) {
        slow = nums[slow];
        slow2 = nums[slow2];
    }
    return slow;
}`
        }
      ]
    },
    hints: ["Treat indices and values as nodes and pointers in a linked list."],
    testCases: [
      {
        input: [[1, 3, 4, 2, 2]],
        expected: 2,
        displayInput: "nums = [1,3,4,2,2]",
        displayExpected: "2"
      },
      {
        input: [[3, 1, 3, 4, 2]],
        expected: 3,
        displayInput: "nums = [3,1,3,4,2]",
        displayExpected: "3"
      }
    ],
    companies: ["Amazon", "Microsoft", "Google", "Meta"],
    roles: ["backend", "quant", "fullstack"],
    tags: ["Array", "Two Pointers", "Binary Search", "Bit Manipulation"]
  }
];
