import type { PropsWithChildren, ReactElement, ReactNode } from "react";

import { badgeThemeClasses } from "../constants";
import type { ColorVariant } from "../types/ui.ts";

interface BadgeProps extends PropsWithChildren {
  theme?: ColorVariant;
  size?: "sm" | "md" | "xs";
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
}

const sizes = {
  xs: "px-1.5 py-1 h-3.5",
  sm: "px-2 py-0.5",
  md: "px-2.5 py-1",
};

const textSizes = {
  xs: "text-xs font-normal leading-3",
  sm: "text-xs font-medium",
  md: "text-sm font-medium",
};

export const Badge = ({
  children,
  theme = "gray",
  size = "md",
  iconStart,
  iconEnd,
  className = "",
}: BadgeProps): ReactElement => {
  return (
    <span
      className={`inline-flex min-w-fit items-center overflow-hidden text-ellipsis whitespace-nowrap rounded font-medium ${badgeThemeClasses[theme]} ${sizes[size]} ${className}`}
    >
      {iconStart && <span className="mr-0.5 flex-shrink-0">{iconStart}</span>}

      <span
        className={`${textSizes[size]} min-w-0 flex-shrink-0 tracking-normal`}
      >
        {children}
      </span>

      {iconEnd && <span className="ml-0.5 flex-shrink-0">{iconEnd}</span>}
    </span>
  );
};
