import cn from "classnames";
import { ArrowLeft } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

import type { ColorVariant } from "../types/ui";
import type { AvatarProps } from "./Avatar";

import { Badge } from "./Badge";
import { IconButton } from "./IconButton";
import { TraceListItem } from "./TraceListItem";

export type TraceListBadge = {
  label: string;
  theme: ColorVariant;
};

export type Trace = {
  id: string;
  name: string;
  spansCount: number;
  durationMs: number;
  agentDescription: string;
  badges?: TraceListBadge[];
  avatar?: AvatarProps;
  onClick?: () => void;
};

type TraceListProps = {
  traces: Trace[];

  expanded: boolean;
  onExpandStateChange: (expanded: boolean) => void;

  className?: string;
};

export const TraceList = ({
  traces,
  expanded,
  onExpandStateChange,
  className,
}: TraceListProps) => {
  return (
    <div
      className={cn(
        "w-full",
        "flex flex-col gap-3",
        expanded ? "w-full" : "w-fit",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2
            className={cn(
              "font-regular text-base text-gray-900 dark:text-gray-200",
              !expanded && "hidden",
            )}
          >
            Traces
          </h2>

          <Badge
            size="md"
            theme="gray"
            aria-label={`Total number of traces: ${traces.length}`}
          >
            {traces.length}
          </Badge>
        </div>

        <IconButton
          aria-label={expanded ? "Collapse Trace List" : "Expand Trace List"}
          onClick={() => onExpandStateChange(!expanded)}
          size="sm"
        >
          <ArrowLeft
            className={cn(
              "size-3 transition-transform",
              expanded ? "" : "rotate-180",
            )}
          />
        </IconButton>
      </header>

      {expanded && (
        <div className="flex flex-col items-center rounded border border-gray-200 dark:border-gray-800">
          {traces.map((trace, idx) => (
            <Fragment key={trace.id}>
              <TraceListItem {...trace} />

              {idx < traces.length - 1 && (
                <div className="h-px w-[calc(100%_-_32px)] bg-gray-200 dark:bg-gray-900" />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
