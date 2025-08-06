import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, Coins } from "lucide-react";
import {
  useState,
  type FC,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import type { SpanCardType } from "../types/span";
import type { ColorVariant } from "../types/ui.ts";

import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../utils/ui";
import { Avatar, type AvatarProps } from "./Avatar";
import { Badge } from "./Badge";

const LAYOUT_CONSTANTS = {
  MARGIN_LEVEL_STEP: 20,
  BASE_HORIZONTAL_LINE_WIDTH: 8,
  CONTENT_BASE_WIDTH: 300,
} as const;

const STATUS_COLORS = {
  success: "bg-green-500 dark:bg-green-700",
  error: "bg-red-500 dark:bg-red-700",
  running: "bg-violet-500 dark:bg-violet-700",
  warning: "bg-yellow-500 dark:bg-yellow-700",
} as const;

const timelineBgColors: Record<ColorVariant, string> = {
  purple: "bg-purple-400 dark:bg-purple-600",
  indigo: "bg-indigo-400 dark:bg-indigo-600",
  orange: "bg-orange-400 dark:bg-orange-600",
  teal: "bg-teal-400 dark:bg-teal-600",
  cyan: "bg-cyan-400 dark:bg-cyan-600",
  sky: "bg-sky-400 dark:bg-sky-600",
  yellow: "bg-yellow-400 dark:bg-yellow-600",
  emerald: "bg-emerald-400 dark:bg-emerald-600",
  red: "bg-red-400 dark:bg-red-600",
  gray: "bg-gray-400 dark:bg-gray-600",
};

interface SpanCardProps {
  data: SpanCardType;
  level?: number;
  selectedCardId?: string;
  avatar?: AvatarProps;
  onSelectionChange?: (cardId: string, isSelected: boolean) => void;
  expandButton: "inside" | "outside";
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
  const marginLeft = level !== 0 ? LAYOUT_CONSTANTS.MARGIN_LEVEL_STEP : 0;
  const horizontalLineWidth =
    LAYOUT_CONSTANTS.BASE_HORIZONTAL_LINE_WIDTH +
    (hasChildren ? 0 : LAYOUT_CONSTANTS.MARGIN_LEVEL_STEP);
  const contentWidth =
    LAYOUT_CONSTANTS.CONTENT_BASE_WIDTH -
    level * LAYOUT_CONSTANTS.MARGIN_LEVEL_STEP;

  return { marginLeft, horizontalLineWidth, contentWidth };
};

const getStatusColor = (status: keyof typeof STATUS_COLORS): string => {
  return STATUS_COLORS[status] || "bg-gray-500";
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

const SpanCardToggle: FC<{
  isExpanded: boolean;
  title: string;
  onToggleClick: (e: MouseEvent | KeyboardEvent) => void;
}> = ({ isExpanded, title, onToggleClick }) => (
  <Collapsible.Trigger asChild>
    <button
      className="flex size-3 items-center justify-center"
      onClick={onToggleClick}
      onKeyDown={onToggleClick}
      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title} children`}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <ChevronDown aria-hidden="true" className="text-gray-500" />
      ) : (
        <ChevronRight aria-hidden="true" className="text-gray-500" />
      )}
    </button>
  </Collapsible.Trigger>
);

const SpanCardContent: FC<{
  data: SpanCardType;
}> = ({ data }) => {
  const Icon = getSpanCategoryIcon(data.type);

  return (
    <div className="flex items-center">
      <h3 className="mr-3 max-w-32 overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5">
        {data.title}
      </h3>

      <div className="flex items-center justify-start space-x-1">
        <Badge
          iconStart={<Icon className="h-3 w-3" />}
          theme={getSpanCategoryTheme(data.type)}
          size="xs"
        >
          {getSpanCategoryLabel(data.type)}
        </Badge>
        <Badge
          iconStart={<Coins className="size-2.5" />}
          theme="gray"
          size="xs"
        >
          {data.tokensCount}
        </Badge>
        <Badge theme="gray" size="xs">
          $ {data.cost}
        </Badge>
      </div>
    </div>
  );
};

const SpanCardTimeline: FC<{
  duration: number;
  theme: ColorVariant;
}> = ({ duration, theme }) => (
  <>
    <span
      aria-hidden="true"
      className="flex h-3.5 w-full items-center justify-self-start rounded bg-gray-100 px-1 py-1"
    >
      <span className={`h-1.5 w-full rounded-sm ${timelineBgColors[theme]}`} />
    </span>

    <span className="justify-self-end text-xs leading-3">{duration}</span>
  </>
);

const SpanCardStatus: FC<{
  status: keyof typeof STATUS_COLORS;
}> = ({ status }) => {
  const statusColor = getStatusColor(status);

  return (
    <span
      className={`size-1.5 rounded-full ${statusColor}`}
      aria-label={`Status: ${status}`}
      title={`Status: ${status}`}
    />
  );
};

const SpanCardConnector: FC<{
  level: number;
  horizontalLineWidth: number;
}> = ({ level, horizontalLineWidth }) => {
  if (level === 0) return null;

  return (
    <div
      className="absolute -left-[15px] top-2.5 h-0.5 bg-gray-100"
      style={{ width: `${horizontalLineWidth}px` }}
    />
  );
};

const SpanCardChildren: FC<{
  expandButton: "inside" | "outside";
  data: SpanCardType;
  level: number;
  selectedCardId?: string;
  onChildSelectionChange: (childId: string, childIsSelected: boolean) => void;
}> = ({
  data,
  level,
  selectedCardId,
  onChildSelectionChange,
  expandButton,
}) => {
  if (!data.children?.length) return null;

  return (
    <div className="relative">
      <div className="absolute -top-3 ml-1 h-[calc(100%-9px)] w-0.5 translate-x-1/2 transform bg-gray-100" />

      <Collapsible.Content>
        <ul role="group">
          {data.children.map((child) => (
            <SpanCard
              expandButton={expandButton}
              key={child.id}
              data={child}
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

  const gridTemplateColumns =
    expandButton === "inside"
      ? `12px ${avatar ? "16px" : ""} ${layout.contentWidth}px auto 50px 6px`
      : `${avatar ? "16px" : ""} ${layout.contentWidth}px 6px auto 50px 12px`;

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
          className="relative box-content grid h-5 w-full cursor-pointer items-center pb-3"
          style={{
            gridTemplateColumns,
            gap: "8px",
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
          <SpanCardConnector
            level={level}
            horizontalLineWidth={layout.horizontalLineWidth}
          />

          {expandButton == "inside" &&
            (state.hasChildren ? (
              <SpanCardToggle
                isExpanded={state.isExpanded}
                title={data.title}
                onToggleClick={eventHandlers.handleToggleClick}
              />
            ) : (
              <div className="w-3" aria-hidden="true" />
            ))}

          {avatar && <Avatar {...avatar} />}

          <SpanCardContent data={data} />

          {expandButton == "outside" && <SpanCardStatus status={data.status} />}

          <SpanCardTimeline
            theme={getSpanCategoryTheme(data.type)}
            duration={data.duration}
          />

          {expandButton == "outside" &&
            (state.hasChildren ? (
              <SpanCardToggle
                isExpanded={state.isExpanded}
                title={data.title}
                onToggleClick={eventHandlers.handleToggleClick}
              />
            ) : (
              <div className="w-3" aria-hidden="true" />
            ))}

          {expandButton == "inside" && <SpanCardStatus status={data.status} />}
        </div>

        <SpanCardChildren
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
