import type { ButtonHTMLAttributes } from "react";
import cn from "classnames";

type IconButtonSize = "md";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
}

const sizeClasses: Record<IconButtonSize, string> = {
  md: "h-7 min-h-7",
};

export const IconButton = ({
  children,
  className,
  size = "md",
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        className,
        sizeClasses[size],
        "inline-flex aspect-square shrink-0 items-center justify-center",
        "rounded border border-gray-200 bg-transparent",
        "text-gray-500",
        "hover:bg-gray-200",
      )}
    >
      {children}
    </button>
  );
};
