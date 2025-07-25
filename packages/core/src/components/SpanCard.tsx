import * as Collapsible from "@radix-ui/react-collapsible";
import { useState, type FC, useCallback } from "react";

import type { Span } from "../types/span.ts";

import { Badge } from "./Badge.tsx";

type SpanCardProps = {
  data: Span;
  level?: number;
  selectedCardId?: string;
  onSelectionChange?: (id: string, isSelected: boolean) => void;
};

const MARGIN_LEVEL_STEP = 24; // Pixels per level for indentation

export const SpanCard: FC<SpanCardProps> = ({
  data,
  level = 0,
  selectedCardId,
  onSelectionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = data.children && data.children.length > 0;
  const isSelected = selectedCardId === data.id;

  const handleCardClick = useCallback(() => {
    onSelectionChange?.(data.id, !isSelected);
  }, [data.id, isSelected, onSelectionChange]);

  const handleChildSelectionChange = useCallback(
    (childId: string, childIsSelected: boolean) => {
      onSelectionChange?.(childId, childIsSelected);
    },
    [onSelectionChange],
  );

  const marginLeft = level * MARGIN_LEVEL_STEP;

  return (
    <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className="relative bg-white"
        style={{ marginLeft: `${marginLeft}px` }}
      >
        <div
          className={`cursor-pointer border p-4 ${
            isSelected ? "bg-blue-50" : ""
          }`}
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCardClick();
            }
          }}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected}
          aria-describedby={`card-desc-${data.id}`}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-label={`Card: ${data.title}${hasChildren ? ". Has child items." : ""}`}
        >
          <div className="flex justify-between">
            <div className="flex-1">
              <h3 className="mb-2">{data.title}</h3>

              <div className="flex space-x-2">
                <Badge variant="primary" size="sm">
                  {data.startTime.toLocaleString()} - {data.duration}ms
                </Badge>
                <Badge variant="success" size="sm">
                  {`Cost: $${data.cost.toFixed(2)}`}
                </Badge>
              </div>
            </div>

            {/* Expand/Collapse button - separate from card selection */}
            {hasChildren && (
              <Collapsible.Trigger asChild>
                <button
                  className="p-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card selection when expanding
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation(); // Prevent keyboard events from bubbling to card
                  }}
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} ${data.title} children`}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? (
                    <span aria-hidden="true">&#9660;</span>
                  ) : (
                    <span aria-hidden="true">&#9654;</span>
                  )}
                </button>
              </Collapsible.Trigger>
            )}
          </div>
        </div>

        {hasChildren && (
          <Collapsible.Content>
            <ul role="group">
              {data.children?.map((child) => (
                <li key={child.id} role="treeitem" aria-expanded={undefined}>
                  <SpanCard
                    key={child.id}
                    data={child}
                    level={level + 1}
                    selectedCardId={selectedCardId}
                    onSelectionChange={handleChildSelectionChange}
                  />
                </li>
              ))}
            </ul>
          </Collapsible.Content>
        )}
      </div>
    </Collapsible.Root>
  );
};
