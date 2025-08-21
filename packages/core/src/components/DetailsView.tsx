import {
  Copy,
  Plus,
  MessageSquare,
  Coins,
  Tags,
  SquareTerminal,
} from "lucide-react";
import { type ReactElement } from "react";

import type { SpanCardType } from "../types/span.ts";

import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../utils/ui.ts";
import { Avatar, type AvatarProps } from "./Avatar.tsx";
import { Badge } from "./Badge.tsx";
import { Button } from "./Button.tsx";
import { CollapsibleSection } from "./CollapsibleSection.tsx";
import { IconButton } from "./IconButton.tsx";
import { SpanCardStatus } from "./SpanCardStatus.tsx";
import { Tabs, type TabItem } from "./Tabs.tsx";

interface DetailsViewProps {
  data: SpanCardType;
  avatar?: AvatarProps;
  defaultTab?: string;
  className?: string;
  showCopyButton?: boolean;
  onCopy?: (data: SpanCardType) => void;
  onTabChange?: (tabValue: string) => void;
}

export const DetailsView = ({
  data,
  avatar,
  defaultTab,
  className,
  showCopyButton,
  onCopy,
  onTabChange,
}: DetailsViewProps): ReactElement => {
  const Icon = getSpanCategoryIcon(data.type);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(data);
    }
  };

  const tabItems: TabItem[] = [
    {
      value: "attributes",
      label: "Attributes",
      icon: <Tags className="size-4" />,
      content: (
        <div className="space-y-6">
          {data.attributes.map((attribute, index) => {
            const value =
              attribute.value.stringValue ||
              attribute.value.intValue ||
              attribute.value.boolValue?.toString() ||
              "N/A";

            return (
              <CollapsibleSection
                key={`${attribute.key}-${index}`}
                title={attribute.key}
                defaultOpen
              >
                <div className="font-mono text-xs">{value}</div>
              </CollapsibleSection>
            );
          })}
        </div>
      ),
    },
    {
      value: "raw",
      label: "RAW",
      icon: <SquareTerminal className="size-4" />,
      content: (
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">Raw Data</h3>
          <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm">
            {`{
  "data": "raw content",
  "format": "unprocessed"
}`}
          </pre>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`max-w-[480px] rounded border border-gray-200 bg-white p-4 ${className}`}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {avatar && (
            <div style={{ gridArea: "avatar" }}>
              <Avatar {...avatar} />
            </div>
          )}

          <span className="text-base tracking-wide text-gray-900 dark:text-gray-200">
            {data.title}
          </span>

          <div className="flex size-5 items-center justify-center">
            <SpanCardStatus status={data.status} />
          </div>

          {showCopyButton && (
            <IconButton size="sm" onClick={handleCopy}>
              <Copy className="size-3 text-gray-500" />
            </IconButton>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button size="xs" iconStart={<Plus className="size-4" />}>
            Action
          </Button>

          <Button size="xs" iconStart={<Plus className="size-4" />}>
            Action
          </Button>

          <IconButton size="sm">
            <MessageSquare className="size-3 text-gray-500" />
          </IconButton>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-start space-x-1">
        <Badge
          iconStart={<Icon className="size-2.5" />}
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

        <Badge theme="gray" size="xs">
          {data.duration}
        </Badge>
      </div>

      <Tabs
        items={tabItems}
        onValueChange={onTabChange}
        theme="underline"
        defaultValue={defaultTab}
      />
    </div>
  );
};
