import { useState, type FC, useCallback } from "react";

import type { Span } from "../types/span.ts";
import { SpanCard } from "./SpanCard.tsx";

type SpanCardsListProps = {
  spans: Span[];
  onSelectionChange?: (selectedId: string | undefined) => void;
  className?: string;
  initialSelectedId?: string;
};

export const SpanCardsList: FC<SpanCardsListProps> = ({
  spans,
  onSelectionChange,
  className = "",
  initialSelectedId = undefined,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    initialSelectedId,
  );

  const handleCardSelectionChange = useCallback(
    (cardId: string, isSelected: boolean) => {
      const newSelectedId = isSelected ? cardId : undefined;
      setSelectedCardId(newSelectedId);
      onSelectionChange?.(newSelectedId);
    },
    [onSelectionChange],
  );

  return (
    <ul className={className} role="tree" aria-label="Hierarchical card list">
      {spans.map((span) => (
        <li key={span.id} role="treeitem" aria-expanded={undefined}>
          <SpanCard
            data={span}
            level={0}
            selectedCardId={selectedCardId}
            onSelectionChange={handleCardSelectionChange}
          />
        </li>
      ))}
    </ul>
  );
};
