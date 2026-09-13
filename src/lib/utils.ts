import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomArray(length: number = 30, min: number = 10, max: number = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
