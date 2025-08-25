import type { ReactNode } from "react";

import cn from "classnames";

interface TraceListItemBadgeProps {
  children: ReactNode;
}

export const TraceListItemBadge = ({ children }: TraceListItemBadgeProps) => {
  return (
    <span
      className={cn(
        "flex items-center",
        "h-4 px-1",
        "rounded border border-gray-200 dark:border-gray-800",
        "text-xs font-medium text-gray-950 dark:text-gray-400",
      )}
    >
      {children}
    </span>
  );
};
