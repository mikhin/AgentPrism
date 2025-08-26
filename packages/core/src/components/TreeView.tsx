import cn from "classnames";
import { type FC } from "react";

import type { TraceSpan } from "../types";

import { findTimeRange } from "../services/find-time-range.ts";
import { flattenSpans } from "../services/flatten-span-cards.ts";
import { SpanCard } from "./SpanCard.tsx";

interface TreeViewProps {
  spans: TraceSpan[];
  className?: string;
  selectedSpan?: TraceSpan;
  onSpanSelect?: (span: TraceSpan) => void;
  expandButton: "inside" | "outside";
}

export const TreeView: FC<TreeViewProps> = ({
  spans,
  onSpanSelect,
  className = "",
  selectedSpan,
  expandButton,
}) => {
  const allCards = flattenSpans(spans);

  const { minStart, maxEnd } = findTimeRange(allCards);

  return (
    <div className="p-2 pt-4">
      <ul
        className={cn(className, "overflow-x-auto")}
        role="tree"
        aria-label="Hierarchical card list"
      >
        {spans.map((span, idx) => (
          <SpanCard
            expandButton={expandButton}
            key={span.id}
            data={span}
            level={0}
            selectedSpan={selectedSpan}
            onSpanSelect={onSpanSelect}
            minStart={minStart}
            maxEnd={maxEnd}
            isLastChild={idx === spans.length - 1}
          />
        ))}
      </ul>
    </div>
  );
};
