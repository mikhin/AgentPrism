import cn from "classnames";
import { useCallback, type KeyboardEvent } from "react";

import type { TraceRecord } from "../types";

import { type AvatarProps } from "./Avatar";
import { Badge, type BadgeProps } from "./Badge";
import { PriceBadge } from "./PriceBadge";
import { TokensBadge } from "./TokensBadge";
import { TraceListItemHeader } from "./TraceListItemHeader";

interface TraceListItemProps {
  trace: TraceRecord;
  badges?: Array<BadgeProps>;
  avatar?: AvatarProps;
  onClick?: () => void;
  isSelected?: boolean;
}

export const TraceListItem = ({
  trace,
  avatar,
  onClick,
  badges,
  isSelected,
}: TraceListItemProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  const { name, agentDescription, totalCost, totalTokens } = trace;

  return (
    <div
      className={cn(
        "group w-full",
        "flex flex-col gap-2.5 p-4",
        "cursor-pointer rounded",
        "outline-none -outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-300",
        isSelected && "bg-gray-100 dark:bg-gray-900",
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`Select trace ${name}`}
    >
      <TraceListItemHeader trace={trace} avatar={avatar} />

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-4 max-w-full truncate text-sm text-gray-600 dark:text-gray-400">
          {agentDescription}
        </span>

        {typeof totalCost === "number" && <PriceBadge cost={totalCost} />}

        {typeof totalTokens === "number" && (
          <TokensBadge tokensCount={totalTokens} />
        )}

        {badges?.map((badge, index) => (
          <Badge key={index} theme={badge.theme} size="xs">
            {badge.children}
          </Badge>
        ))}
      </div>
    </div>
  );
};
