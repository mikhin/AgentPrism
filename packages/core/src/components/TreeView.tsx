import { useState, useCallback, type FC } from "react";

import type { SpanCardType } from "../types/span";

import { findTimeRange } from "../services/find-time-range.ts";
import { flattenSpans } from "../services/flatten-span-cards.ts";
import { SpanCard } from "./SpanCard.tsx";
import {
  SpanCardCollapseAllButton,
  SpanCardExpandAllButton,
} from "./SpanCardControls.tsx";
import { SpanCardSearchInput } from "./SpanCardSearchInput.tsx";

interface TreeViewProps {
  spans: SpanCardType[];
  onSelectionChange?: (selectedId: string | undefined) => void;
  className?: string;
  initialSelectedId?: string;
  expandButton: "inside" | "outside";
}

export const TreeView: FC<TreeViewProps> = ({
  spans,
  onSelectionChange,
  className = "",
  initialSelectedId,
  expandButton,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    initialSelectedId,
  );

  const [searchValue, setSearchValue] = useState("");

  const allCards = flattenSpans(spans);

  const { minStart, maxEnd } = findTimeRange(allCards);

  const handleCardSelectionChange = useCallback(
    (cardId: string, isSelected: boolean) => {
      const newSelectedId = isSelected ? cardId : undefined;
      setSelectedCardId(newSelectedId);
      onSelectionChange?.(newSelectedId);
    },
    [onSelectionChange],
  );

  return (
    <div className={`border bg-white dark:bg-gray-950 ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b p-3">
        <SpanCardSearchInput
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

      <div className="p-2">
        <ul
          className={className}
          role="tree"
          aria-label="Hierarchical card list"
        >
          {spans.map((span) => (
            <SpanCard
              expandButton={expandButton}
              key={span.id}
              data={span}
              level={0}
              selectedCardId={selectedCardId}
              onSelectionChange={handleCardSelectionChange}
              minStart={minStart}
              maxEnd={maxEnd}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
