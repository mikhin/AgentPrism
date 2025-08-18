import type { ColorVariant } from "../types/ui.ts";

export const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

/**
 * Unified color theme classes for consistent styling across components
 */
export const colorThemeClasses: Record<
  ColorVariant,
  {
    bg: string;
    darkBg: string;
    text: string;
    darkText: string;
  }
> = {
  purple: {
    bg: "bg-purple-100",
    darkBg: "dark:bg-purple-950/60",
    text: "text-purple-500",
    darkText: "dark:text-purple-300",
  },
  indigo: {
    bg: "bg-indigo-100",
    darkBg: "dark:bg-indigo-950/60",
    text: "text-indigo-500",
    darkText: "dark:text-indigo-300",
  },
  orange: {
    bg: "bg-orange-100",
    darkBg: "dark:bg-orange-950/60",
    text: "text-orange-600",
    darkText: "dark:text-orange-300",
  },
  teal: {
    bg: "bg-teal-100",
    darkBg: "dark:bg-teal-950/60",
    text: "text-teal-600",
    darkText: "dark:text-teal-300",
  },
  cyan: {
    bg: "bg-cyan-100",
    darkBg: "dark:bg-cyan-950/60",
    text: "text-cyan-600",
    darkText: "dark:text-cyan-300",
  },
  sky: {
    bg: "bg-sky-100",
    darkBg: "dark:bg-sky-950/60",
    text: "text-sky-600",
    darkText: "dark:text-sky-300",
  },
  yellow: {
    bg: "bg-yellow-100",
    darkBg: "dark:bg-yellow-950/60",
    text: "text-yellow-700",
    darkText: "dark:text-yellow-300",
  },
  emerald: {
    bg: "bg-emerald-100",
    darkBg: "dark:bg-emerald-950/60",
    text: "text-emerald-600",
    darkText: "dark:text-emerald-300",
  },
  red: {
    bg: "bg-red-100",
    darkBg: "dark:bg-red-950/60",
    text: "text-red-600",
    darkText: "dark:text-red-300",
  },
  gray: {
    bg: "bg-gray-100",
    darkBg: "dark:bg-gray-900",
    text: "text-gray-600",
    darkText: "dark:text-gray-300",
  },
};
