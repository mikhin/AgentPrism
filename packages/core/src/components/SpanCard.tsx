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
import {
  type SpanCardConnectorType,
  SpanCardConnector,
} from "./SpanCardConnector";
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
  isLastChild: boolean;
}

interface SpanCardState {
  isExpanded: boolean;
  hasChildren: boolean;
  isSelected: boolean;
}

const getContentWidth = (level: number) => {
  if (level === 0) {
    return LAYOUT_CONSTANTS.CONTENT_BASE_WIDTH - 4;
  }

  return (
    LAYOUT_CONSTANTS.CONTENT_BASE_WIDTH - level * LAYOUT_CONSTANTS.MARGIN_STEP
  );
};

const getConnectorsLayout = ({
  level,
  hasCollapseButton,
  isLastChild,
}: {
  hasCollapseButton: boolean;
  isLastChild: boolean;
  level: number;
}): {
  connectors: SpanCardConnectorType[];
  connectorsColumnWidth: number;
} => {
  const connectors: SpanCardConnectorType[] = [];

  if (level === 0) {
    return {
      connectors: [],
      connectorsColumnWidth: 20,
    };
  }

  for (let i = 0; i < level - 1; i++) {
    connectors.push("vertical");
  }

  if (!isLastChild) {
    connectors.push("t-right");
  }

  if (isLastChild) {
    connectors.push("corner-top-right");
  }

  let connectorsColumnWidth = connectors.length * LAYOUT_CONSTANTS.MARGIN_STEP;

  if (hasCollapseButton) {
    connectorsColumnWidth += LAYOUT_CONSTANTS.MARGIN_STEP;
  }

  return {
    connectors,
    connectorsColumnWidth,
  };
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
      <Collapsible.Content>
        <ul role="group">
          {data.children.map((child, idx) => (
            <SpanCard
              expandButton={expandButton}
              key={child.id}
              data={child}
              minStart={minStart}
              maxEnd={maxEnd}
              level={level + 1}
              selectedCardId={selectedCardId}
              onSelectionChange={onChildSelectionChange}
              isLastChild={idx === (data.children || []).length - 1}
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
  isLastChild,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const state: SpanCardState = {
    isExpanded,
    hasChildren: Boolean(data.children?.length),
    isSelected: selectedCardId === data.id,
  };

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

  const { connectors, connectorsColumnWidth } = getConnectorsLayout({
    level,
    hasCollapseButton: hasExpandButtonAsFirstChild,
    isLastChild,
  });

  return (
    <li
      role="treeitem"
      aria-expanded={state.hasChildren ? state.isExpanded : undefined}
      className="list-none"
    >
      <Collapsible.Root open={state.isExpanded} onOpenChange={setIsExpanded}>
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `${connectorsColumnWidth}px 1fr`,
          }}
          onClick={eventHandlers.handleCardClick}
          onKeyDown={eventHandlers.handleKeyDown}
          tabIndex={0}
          role="button"
          aria-pressed={state.isSelected}
          aria-describedby={`span-card-desc-${data.id}`}
          aria-expanded={state.hasChildren ? state.isExpanded : undefined}
          aria-label={`${state.isSelected ? "Selected" : "Not selected"} span card for ${data.title} at level ${level}`}
        >
          <div className="flex flex-nowrap">
            {connectors.map((connector, idx) => (
              <SpanCardConnector key={`${connector}-${idx}`} type={connector} />
            ))}

            {hasExpandButtonAsFirstChild && (
              <div className="flex w-5 flex-col items-center">
                <SpanCardToggle
                  isExpanded={state.isExpanded}
                  title={data.title}
                  onToggleClick={eventHandlers.handleToggleClick}
                />

                {state.isExpanded && <SpanCardConnector type="vertical" />}
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex flex-wrap items-start gap-x-2 gap-y-1",
              "mb-3 min-h-5 w-full cursor-pointer",
              level !== 0 && !hasExpandButtonAsFirstChild && "pl-2",
              level !== 0 && hasExpandButtonAsFirstChild && "pl-1",
            )}
          >
            <div
              className="relative flex min-h-4 shrink-0 flex-wrap items-start gap-1"
              style={{
                width: `min(${contentWidth}px, 100%)`,
              }}
            >
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
