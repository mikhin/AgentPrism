import type { FC, PropsWithChildren, ReactElement } from "react";

import type { ColorVariant } from "../types/ui";

import { roundedClasses } from "../constants/ui";
import { getBgColorClass } from "../utils/ui";

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
};

const variantClasses = {
  filled: "text-white",
  outlined: "border border-2 bg-transparent",
  ghost: "bg-transparent",
};

export type ButtonProps = {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * The size of the button
   * @default "md"
   */
  size?: "xs";
  /**
   * The color theme for the button
   * Uses the unified color theme system
   * @default "gray"
   */
  theme?: ColorVariant;
  /**
   * The border radius of the button
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /**
   * The variant style of the button
   * @default "filled"
   */
  variant?: "filled" | "outlined" | "ghost";
  /**
   * Is the button full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Is the button disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon to display at the start of the button
   */
  iconStart?: ReactElement;
  /**
   * Icon to display at the end of the button
   */
  iconEnd?: ReactElement;
  /**
   * The type of the button
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
  /**
   * Callback when the button is clicked
   */
  onClick?: () => void;
  /**
   * Optional className for additional styling
   */
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
  const bgClass = variant === "filled" ? getBgColorClass(theme) : "";

  // For outlined and ghost variants, use text color matching the theme
  const textClass =
    variant !== "filled" ? `text-${theme}-500 dark:text-${theme}-400` : "";

  // Border color for outlined variant
  const borderClass =
    variant === "outlined"
      ? `border-${theme}-500 dark:border-${theme}-400`
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${bgClass} ${textClass} ${borderClass} ${fullWidth ? "w-full" : ""} ${disabled ? "cursor-not-allowed opacity-50" : "hover:opacity-90"} transition-all duration-200 ${className} `}
    >
      {iconStart && <span className="mr-1">{iconStart}</span>}
      {children}
      {iconEnd && <span className="ml-1">{iconEnd}</span>}
    </button>
  );
};
