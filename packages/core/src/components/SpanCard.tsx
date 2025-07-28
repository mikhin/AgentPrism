import * as Collapsible from "@radix-ui/react-collapsible";
import { useState, type FC, useCallback } from "react";

import type { Span } from "../types/span";

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

const MARGIN_LEVEL_STEP = 20;

interface SpanCardProps {
  data: Span;
  level?: number;
  selectedCardId?: string;
  onSelectionChange?: (cardId: string, isSelected: boolean) => void;
}

export const SpanCard: FC<SpanCardProps> = ({
  data,
  level = 0,
  selectedCardId,
  onSelectionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
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

  const marginLeft = level ? MARGIN_LEVEL_STEP : 0;

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="relative" style={{ marginLeft: `${marginLeft}px` }}>
          <div
            // ${isSelected ? "bg-blue-50" : "bg-white"}
            className={`box-content h-5 cursor-pointer pb-3`}
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
            <div className="flex items-baseline">
              {hasChildren && (
                <Collapsible.Trigger asChild className="ml-1 mr-3">
                  <button
                    className="flex size-3 items-center justify-center bg-red-500 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
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

              <Avatar size="xs" rounded="full" className="mr-1.5" />

              <h3 className="mr-3 overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5">
                {data.title}
              </h3>

              <div className="flex items-center justify-start space-x-1">
                <Badge variant="primary" size="xs">
                  {data.tokensCount}
                </Badge>

                <Badge variant="success" size="xs">
                  {data.cost}
                </Badge>

                <Badge variant="warning" size="xs">
                  {data.type}
                </Badge>
              </div>
            </div>
          </div>

          {hasChildren && (
            <Collapsible.Content>
              <ul role="group">
                {data.children?.map((child) => (
                  <SpanCard
                    key={child.id}
                    data={child}
                    level={level + 1}
                    selectedCardId={selectedCardId}
                    onSelectionChange={handleChildSelectionChange}
                  />
                ))}
              </ul>
            </Collapsible.Content>
          )}
        </div>
      </Collapsible.Root>
    </li>
  );
};
