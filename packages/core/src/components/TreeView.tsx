import cn from "classnames";
import { useState, type FC } from "react";

import type { TraceSpan } from "../types";

import { findTimeRange } from "../services/find-time-range.ts";
import { flattenSpans } from "../services/flatten-span-cards.ts";
import { SpanCard } from "./SpanCard.tsx";
import {
  SpanCardCollapseAllButton,
  SpanCardExpandAllButton,
} from "./SpanCardControls.tsx";
import { SpanCardSearchInput } from "./SpanCardSearchInput.tsx";

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
  const [searchValue, setSearchValue] = useState("");

  const allCards = flattenSpans(spans);

  const { minStart, maxEnd } = findTimeRange(allCards);

  return (
    <div
      className={cn(
        "border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-950",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 p-3 dark:border-gray-600">
        <SpanCardSearchInput
          id="span-search"
          name="search"
          clearable
          onClear={() => setSearchValue("")}
          value={searchValue}
          onValueChange={setSearchValue}
          className="max-w-60 grow"
        />

        <div className="flex items-center gap-2">
          <div className="ml-auto flex items-center gap-3">
            <SpanCardExpandAllButton onExpandAll={() => {}} />
            <SpanCardCollapseAllButton onCollapseAll={() => {}} />
          </div>
        </div>
      </div>

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
    </div>
  );
};
