# AlgoForge ⚡

> **A high-performance, zero-cost, 1:1 algorithmic problem-solving and interview preparation platform with all premium features completely unlocked.**

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

---

## 🌟 Overview

**AlgoForge** is built for engineers preparing for FAANG and top-tier technical interviews. Traditional platforms lock curated company problem lists, advanced study roadmaps, mock AI interview simulations, and interactive algorithm visualizers behind paywalls.

AlgoForge eliminates every paywall and runs **100% in the browser** with zero cloud execution server costs, utilizing an in-memory client-side execution sandbox with deep test case validation.

---

## 🚀 Key Features

### 1. 💻 Interactive Code Arena
- **Monaco Code Editor**: VS Code-powered editing experience with syntax highlighting, auto-completion, line numbers, and intelligent indentation.
- **Client-Side Execution Engine**: Sandboxed execution supporting JavaScript and Python algorithms with output capturing (`console.log`), execution timers (`performance.now()`), and memory profiling.
- **Comprehensive Test Case Runner**: Validates edge cases with deep equality assertions and per-test execution diagnostics.
- **Interactive Multi-Tab Workspace**:
  - *Problem Description & Constraints*
  - *Multi-Approach Editorial & Complexity Proofs* (Brute Force, Optimized, Optimal)
  - *Submissions History & Performance Metrics*
  - *Socratic AI Hints & Guided Prompts*
  - *Persistent Scratchpad Notes*

### 2. 🏢 Company-Wise Question Banks (Premium Unlocked)
- Curated high-frequency question archives for **Google, Meta, Amazon, Apple, Microsoft, Netflix, Goldman Sachs, and Bloomberg**.
- Real-time frequency analytics, acceptance rates, and primary topic tagging.

### 3. 🎯 Targeted Role-Specific DSA Roadmaps
- Customized algorithmic tracks designed for specific engineering domains:
  - **Frontend Engineering** (DOM Trees, Virtualized Queues, Event Schedulers)
  - **Backend Systems** (Rate Limiters, Cache Replacement, Graph Traversals, Stream Processing)
  - **Fullstack Engineering** (State Synchronization, JSON Parsers, Search Indexing)
  - **Systems & Low-Level** (Bit Manipulation, Memory Layouts, Pointer Mechanics)
  - **AI / ML Engineering** (Matrix Operations, Tensor Reshaping, Vector Distance)
  - **Quantitative Developer** (Dynamic Programming, Fast Math, Sliding Window Orderbooks)

### 4. 📚 Industry-Standard Study Roadmaps
- **Blind 75**: The essential 75 questions to master core algorithmic patterns.
- **NeetCode 150**: Comprehensive topic-wise coverage across 18 DSA categories.
- **Striver's SDE Sheet**: Curated roadmap for top service-to-product transitions.
- **Grind 75**: High-yield problem set optimized for rapid interview readiness.

### 5. 🎨 Interactive Algorithm Studio & Visualizer
- **Sorting Visualizer**: Real-time visual comparison of Bubble Sort, Selection Sort, and Insertion Sort with adjustable playback speed and step-by-step pointers.
- **Binary Search Visualizer**: Step-by-step `low`, `mid`, and `high` pointer movement with active target elimination.
- **2D Grid Pathfinding (Dijkstra / BFS)**: Interactive wall drawing, real-time node exploration, and shortest path reconstruction.

### 6. 🤖 45-Minute Timed AI Mock Interview Simulator
- Realistic technical interview simulation with countdown timer.
- Socratic AI interviewer that provides hints without giving away solutions.
- Automated evaluation rubric measuring **Problem Solving, Coding Fluency, Time Complexity, Communication, and Edge Case Coverage**.

### 7. 🏆 Contest Arena & Global Leaderboard
- Weekly and Bi-Weekly algorithmic contests with countdown timers and point distributions.
- Real-time scoring and rank calculations.

### 8. 📊 Profile Analytics & 365-Day Activity Heatmap
- GitHub-style 365-day practice heatmap tracking daily problem-solving volume.
- Difficulty breakdown progress rings (Easy, Medium, Hard).
- Unlocked badges, achievements, bookmarked questions, and submission logs.

### 9. 📖 Engineering Cheatsheets & Patterns
- Big-O time and space complexity lookup matrix for 12+ data structures and 8+ sorting algorithms.
- 14 essential algorithmic patterns (Sliding Window, Two Pointers, Fast & Slow, Monotonic Stack, Top-K Elements, etc.) with code snippets.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Code Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Visuals & Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti), CSS Grid & Flexbox
- **State & Storage**: React Context API + LocalStorage persistence (zero backend dependency)
- **Deployment**: Vercel / Netlify / Cloudflare Pages ready

---

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/shashwat19-ops/algoforge.git

# Navigate to project directory
cd algoforge

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
algoforge/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root Layout & Theme Context
│   │   ├── page.tsx                # Landing Page & Feature Showcase
│   │   ├── problems/
│   │   │   ├── page.tsx            # Problem Catalog with Filters
│   │   │   └── [id]/page.tsx       # Monaco Editor & Execution Arena
│   │   ├── companies/
│   │   │   ├── page.tsx            # Company Hub
│   │   │   └── [slug]/page.tsx     # Company-Specific Problems
│   │   ├── roles/
│   │   │   ├── page.tsx            # Engineering Role Tracks
│   │   │   └── [slug]/page.tsx     # Role-Specific Curriculum
│   │   ├── study-plans/
│   │   │   ├── page.tsx            # Study Roadmaps (Blind 75, NeetCode)
│   │   │   └── [slug]/page.tsx     # Roadmap Chapter Breakdown
│   │   ├── visualizer/
│   │   │   └── page.tsx            # Interactive Algorithm Studio
│   │   ├── mock-interview/
│   │   │   └── page.tsx            # 45-Min AI Mock Interview Simulator
│   │   ├── contests/
│   │   │   ├── page.tsx            # Contest Arena & Leaderboard
│   │   │   └── [id]/page.tsx       # Live Contest Workspace
│   │   ├── profile/
│   │   │   └── page.tsx            # 365-Day Heatmap & Analytics
│   │   └── resources/
│   │       └── page.tsx            # Big-O Matrix & 14 Algorithmic Patterns
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx          # Global Navigation & Streak Display
│   │       └── Footer.tsx          # Footer with Links & Platform Stats
│   ├── context/
│   │   └── UserContext.tsx         # LocalStorage State Management
│   ├── data/
│   │   ├── problems.ts             # Comprehensive DSA Problem Catalog
│   │   ├── companies.ts            # Company Archive & Question Tagging
│   │   ├── roles.ts                # Engineering Roles & Skill Weights
│   │   ├── studyPlans.ts           # Blind 75, NeetCode 150, SDE Sheet
│   │   └── contests.ts             # Active & Historical Contests
│   └── lib/
│       └── executor/
│           └── problemRunner.ts    # Sandboxed JS/Python Execution Engine
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🛡️ Security & Privacy

- **Zero Remote Code Execution**: Code execution runs entirely within the client's isolated browser environment, mitigating server-side vulnerabilities and RCE attack surfaces.
- **Zero Tracking / Ads**: All user progress, solutions, notes, and interview transcripts remain strictly within client-side storage.

---

## 👤 Author

**Shashwat Sharma**
- GitHub: [@shashwat19-ops](https://github.com/shashwat19-ops)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
