import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AlgoForge | Zero-Cost 1:1 LeetCode Pro Platform & DSA Engineering Studio",
  description: "Master Data Structures & Algorithms for free. Unlocked company question banks, role tracks, mock interview AI, interactive visualizer, and in-browser code sandbox.",
  keywords: ["LeetCode Free", "DSA Practice", "Algorithm Visualizer", "FAANG Interview Prep", "NeetCode", "Blind 75", "JavaScript DSA", "Python DSA"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0d14] text-slate-100 antialiased flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
