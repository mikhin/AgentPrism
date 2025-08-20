import type { FC, PropsWithChildren, ReactElement } from "react";

import type { ColorVariant } from "../types/ui";

import { roundedClasses } from "../constants/ui";

const BASE_CLASSES =
  "inline-flex items-center justify-center font-medium transition-all duration-200";

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
};

const filledThemeClasses: Record<ColorVariant, string> = {
  purple: "text-white bg-purple-500 dark:bg-purple-600",
  indigo: "text-white bg-indigo-500 dark:bg-indigo-600",
  orange: "text-white bg-orange-500 dark:bg-orange-600",
  teal: "text-white bg-teal-500 dark:bg-teal-600",
  cyan: "text-white bg-cyan-500 dark:bg-cyan-600",
  sky: "text-white bg-sky-500 dark:bg-sky-600",
  yellow: "text-white bg-yellow-500 dark:bg-yellow-600",
  emerald: "text-white bg-emerald-500 dark:bg-emerald-600",
  red: "text-white bg-red-500 dark:bg-red-600",
  gray: "text-white bg-gray-500 dark:bg-gray-600",
};

const variantClasses = {
  filled: "",
  outlined:
    "border border-2 bg-transparent text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600",
  ghost: "bg-transparent text-gray-600 dark:text-gray-300",
};

export type ButtonProps = {
  children: React.ReactNode;
  size?: "xs";
  theme?: ColorVariant;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  variant?: "filled" | "outlined" | "ghost";
  fullWidth?: boolean;
  disabled?: boolean;
  iconStart?: ReactElement;
  iconEnd?: ReactElement;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  size = "xs",
  theme = "gray",
  rounded = "md",
  variant = "filled",
  fullWidth = false,
  disabled = false,
  iconStart,
  iconEnd,
  type = "button",
  onClick,
  className = "",
}) => {
  const widthClass = fullWidth ? "w-full" : "";
  const stateClasses = disabled
    ? "cursor-not-allowed opacity-50"
    : "hover:opacity-90";
  const filledThemeClass =
    variant === "filled"
      ? filledThemeClasses[theme] || filledThemeClasses.gray
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE_CLASSES} ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${filledThemeClass} ${widthClass} ${stateClasses} ${className}`}
    >
      {iconStart && <span className="mr-1">{iconStart}</span>}
      {children}
      {iconEnd && <span className="ml-1">{iconEnd}</span>}
    </button>
  );
};
