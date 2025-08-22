import { useCallback, type KeyboardEvent } from "react";
import { formatDuration } from "../services/calculate-duration";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import type { Trace } from "./TraceList";
import { TraceListItemBadge } from "./TraceListItemBadge";

import cn from "classnames";

export const TraceListItem = ({
  name,
  spansCount,
  durationMs,
  agentDescription,
  avatar,
  onClick,
  badges,
}: Trace) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  return (
    <div
      className={cn(
        "group w-full",
        "flex flex-col gap-2.5 p-4",
        "hover:bg-gray-100 dark:hover:bg-gray-900",
        "cursor-pointer rounded",
        "outline-none -outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-300",
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`Select trace ${name}`}
    >
      <header className="flex min-w-0 flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
          {avatar && <Avatar {...avatar} />}

          <h3 className="font-regular max-w-full truncate text-sm text-gray-950 dark:text-gray-200">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <TraceListItemBadge>
            {spansCount === 1 ? "1 span" : `${spansCount} spans`}
          </TraceListItemBadge>

          <TraceListItemBadge>{formatDuration(durationMs)}</TraceListItemBadge>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-4 max-w-full truncate text-sm text-gray-600 dark:text-gray-400">
          {agentDescription}
        </span>

        {badges?.map((badge) => (
          <Badge key={badge.label} theme={badge.theme} size="xs">
            {badge.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};
