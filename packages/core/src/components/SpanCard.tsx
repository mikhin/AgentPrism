import * as Collapsible from "@radix-ui/react-collapsible";
import {
  useState,
  type FC,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import type { SpanCardType } from "../types/span";

import { getSpanCategoryTheme } from "../utils/ui";
import { Avatar, type AvatarProps } from "./Avatar";
import { SpanCardTimeline } from "./SpanCardTimeline";
import { SpanCardStatus } from "./SpanCardStatus";
import { SpanCardBadges } from "./SpanCardBadges";
import { SpanCardToggle } from "./SpanCardToggle";
import { SpanCardHorizontalConnector } from "./SpanCardConnectors";
import { getTimelineData } from "../services/get-timeline-data";
import { formatDuration } from "../services/calculate-duration";
import cn from "classnames";

const LAYOUT_CONSTANTS = {
  MARGIN_LEVEL_ZERO: 5,
  MARGIN_LEVEL_NON_ZERO: 9,
  MARGIN_STEP: 20,
  CONTENT_BASE_WIDTH: 320,
  BASE_HORIZONTAL_LINE_WIDTH: 8,
} as const;

interface SpanCardProps {
  data: SpanCardType;
  level?: number;
  selectedCardId?: string;
  avatar?: AvatarProps;
  onSelectionChange?: (cardId: string, isSelected: boolean) => void;
  expandButton: "inside" | "outside";
  minStart: number;
  maxEnd: number;
}

interface LayoutCalculations {
  marginLeft: number;
  horizontalLineWidth: number;
  contentWidth: number;
}

interface SpanCardState {
  isExpanded: boolean;
  hasChildren: boolean;
  isSelected: boolean;
}

const calculateLayout = (
  level: number,
  hasChildren: boolean,
): LayoutCalculations => {
  const marginLeft = level !== 0 ? LAYOUT_CONSTANTS.MARGIN_STEP / 2 : 0;
  const horizontalLineWidth =
    LAYOUT_CONSTANTS.BASE_HORIZONTAL_LINE_WIDTH +
    (hasChildren ? 0 : LAYOUT_CONSTANTS.MARGIN_STEP);
  const contentWidth =
    LAYOUT_CONSTANTS.CONTENT_BASE_WIDTH - level * LAYOUT_CONSTANTS.MARGIN_STEP;

  return { marginLeft, horizontalLineWidth, contentWidth };
};

const getContentWidth = (level: number) => {
  if (level === 0) {
    return LAYOUT_CONSTANTS.CONTENT_BASE_WIDTH - 4;
  }

  return (
    LAYOUT_CONSTANTS.CONTENT_BASE_WIDTH - level * LAYOUT_CONSTANTS.MARGIN_STEP
  );
};

const useSpanCardEventHandlers = (
  data: SpanCardType,
  isSelected: boolean,
  onSelectionChange?: (cardId: string, isSelected: boolean) => void,
) => {
  const handleCardClick = useCallback((): void => {
    onSelectionChange?.(data.id, !isSelected);
  }, [data.id, isSelected, onSelectionChange]);

  const handleChildSelectionChange = useCallback(
    (childId: string, childIsSelected: boolean): void => {
      onSelectionChange?.(childId, childIsSelected);
    },
    [onSelectionChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick],
  );

  const handleToggleClick = useCallback(
    (e: MouseEvent | KeyboardEvent): void => {
      e.stopPropagation();
    },
    [],
  );

  return {
    handleCardClick,
    handleChildSelectionChange,
    handleKeyDown,
    handleToggleClick,
  };
};

const SpanCardChildren: FC<{
  expandButton: "inside" | "outside";
  data: SpanCardType;
  level: number;
  selectedCardId?: string;
  onChildSelectionChange: (childId: string, childIsSelected: boolean) => void;
  minStart: number;
  maxEnd: number;
}> = ({
  data,
  level,
  selectedCardId,
  onChildSelectionChange,
  expandButton,
  minStart,
  maxEnd,
}) => {
  if (!data.children?.length) return null;

  return (
    <div className="relative">
      <Collapsible.Content
        className="border-l-2 border-gray-100 dark:border-gray-800"
        style={{
          marginLeft:
            level === 0
              ? LAYOUT_CONSTANTS.MARGIN_LEVEL_ZERO
              : LAYOUT_CONSTANTS.MARGIN_LEVEL_NON_ZERO,
        }}
      >
        <ul role="group">
          {data.children.map((child) => (
            <SpanCard
              expandButton={expandButton}
              key={child.id}
              data={child}
              minStart={minStart}
              maxEnd={maxEnd}
              level={level + 1}
              selectedCardId={selectedCardId}
              onSelectionChange={onChildSelectionChange}
            />
          ))}
        </ul>
      </Collapsible.Content>
    </div>
  );
};

export const SpanCard: FC<SpanCardProps> = ({
  data,
  level = 0,
  selectedCardId,
  onSelectionChange,
  expandButton,
  avatar,
  minStart,
  maxEnd,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const state: SpanCardState = {
    isExpanded,
    hasChildren: Boolean(data.children?.length),
    isSelected: selectedCardId === data.id,
  };

  const layout = calculateLayout(level, state.hasChildren);

  const eventHandlers = useSpanCardEventHandlers(
    data,
    state.isSelected,
    onSelectionChange,
  );

  const { durationMs } = getTimelineData({
    spanCard: data,
    minStart,
    maxEnd,
  });

  const hasExpandButtonAsFirstChild =
    expandButton === "inside" && state.hasChildren;

  const contentWidth = getContentWidth(level);

  return (
    <li
      role="treeitem"
      aria-expanded={state.hasChildren ? state.isExpanded : undefined}
      className="list-none"
    >
      <Collapsible.Root
        open={state.isExpanded}
        onOpenChange={setIsExpanded}
        style={{ marginLeft: `${layout.marginLeft}px` }}
      >
        <div
          className={cn(
            "relative",
            "flex flex-wrap items-start gap-x-2 gap-y-1",
            "mb-3 min-h-5 w-full cursor-pointer",
          )}
          onClick={eventHandlers.handleCardClick}
          onKeyDown={eventHandlers.handleKeyDown}
          tabIndex={0}
          role="button"
          aria-pressed={state.isSelected}
          aria-describedby={`span-card-desc-${data.id}`}
          aria-expanded={state.hasChildren ? state.isExpanded : undefined}
          aria-label={`${state.isSelected ? "Selected" : "Not selected"} span card for ${data.title} at level ${level}`}
        >
          {state.isExpanded && hasExpandButtonAsFirstChild && (
            <div
              className="absolute -bottom-3 h-[calc(100%-8px)] w-0.5 transform bg-gray-100 dark:bg-gray-800"
              style={{
                left:
                  level === 0
                    ? LAYOUT_CONSTANTS.MARGIN_LEVEL_ZERO
                    : LAYOUT_CONSTANTS.MARGIN_LEVEL_NON_ZERO,
              }}
            />
          )}

          <div
            className={cn(
              "relative flex min-h-4 shrink-0 flex-wrap items-start gap-1",
              level !== 0 && !hasExpandButtonAsFirstChild && "pl-2",
              level !== 0 && hasExpandButtonAsFirstChild && "pl-1",
            )}
            style={{
              width: `min(${contentWidth}px, 100%)`,
            }}
          >
            {level !== 0 && (
              <SpanCardHorizontalConnector
                level={level}
                hasCollapseButton={hasExpandButtonAsFirstChild}
                stepLength={LAYOUT_CONSTANTS.MARGIN_STEP}
              />
            )}

            {hasExpandButtonAsFirstChild && (
              <div className="flex h-4 items-center">
                <SpanCardToggle
                  isExpanded={state.isExpanded}
                  title={data.title}
                  onToggleClick={eventHandlers.handleToggleClick}
                />
              </div>
            )}

            {avatar && <Avatar {...avatar} />}

            <h3 className="mr-3 h-4 max-w-28 truncate text-sm leading-[14px] text-gray-900 dark:text-gray-200">
              {data.title}
            </h3>

            <SpanCardBadges data={data} />
          </div>

          <div className="shrink-1 flex grow flex-wrap items-center justify-end gap-1">
            {expandButton === "outside" && (
              <div>
                <SpanCardStatus status={data.status} />
              </div>
            )}

            <SpanCardTimeline
              theme={getSpanCategoryTheme(data.type)}
              minStart={minStart}
              maxEnd={maxEnd}
              spanCard={data}
            />

            <div className="flex items-center gap-2">
              <span className="inline-block w-14 flex-1 shrink-0 whitespace-nowrap px-1 text-right text-xs text-black dark:text-white">
                {formatDuration(durationMs)}
              </span>

              {expandButton === "inside" && (
                <div>
                  <SpanCardStatus status={data.status} />
                </div>
              )}
            </div>
          </div>

          {expandButton === "outside" &&
            (state.hasChildren ? (
              <div style={{ gridArea: "expand" }}>
                <SpanCardToggle
                  isExpanded={state.isExpanded}
                  title={data.title}
                  onToggleClick={eventHandlers.handleToggleClick}
                />
              </div>
            ) : (
              <div
                className="w-3"
                style={{ gridArea: "expand" }}
                aria-hidden="true"
              />
            ))}
        </div>

        <SpanCardChildren
          minStart={minStart}
          maxEnd={maxEnd}
          expandButton={expandButton}
          data={data}
          level={level}
          selectedCardId={selectedCardId}
          onChildSelectionChange={eventHandlers.handleChildSelectionChange}
        />
      </Collapsible.Root>
    </li>
  );
};
