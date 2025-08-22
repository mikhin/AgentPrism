import {
  Copy,
  Plus,
  MessageSquare,
  Coins,
  Tags,
  SquareTerminal,
  Check,
} from "lucide-react";
import { useState, type ReactElement } from "react";
import JSONPretty from "react-json-pretty";
import colors from "tailwindcss/colors";

import type { SpanCardType } from "../types/span.ts";

import { formatDuration } from "../services/calculate-duration.ts";
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
import { Input } from "./Input.tsx";
import { SpanCardStatus } from "./SpanCardStatus.tsx";
import { Tabs, type TabItem } from "./Tabs.tsx";

interface DetailsViewProps {
  data: SpanCardType;
  avatar?: AvatarProps;
  defaultTab?: string;
  className?: string;
  copyButton?: {
    isEnabled?: boolean;
    onCopy?: (data: SpanCardType) => void;
  };
  onTabChange?: (tabValue: string) => void;
}

export const DetailsView = ({
  data,
  avatar,
  defaultTab,
  className,
  copyButton,
  onTabChange,
}: DetailsViewProps): ReactElement => {
  const Icon = getSpanCategoryIcon(data.type);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    if (copyButton?.onCopy) {
      copyButton?.onCopy(data);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const startMs = +data.startTime;
  const endMs = +data.endTime;
  const durationMs = endMs - startMs;

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
                <Input
                  id={`${data.id}-attribute-${index}`}
                  value={value}
                  disabled
                  readOnly
                  clearable={false}
                  inputClassName="font-mono text-xs"
                  className="w-full"
                />
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
        <div className="pt-4">
          <div className="rounded border border-gray-200 bg-transparent dark:border-gray-600">
            <JSONPretty
              booleanStyle={`color: ${colors.blue[400]};`}
              className="rounded-xl p-4"
              data={data.raw}
              id={`json-pretty-${data.id || "span-details"}`}
              keyStyle={`color: ${colors.blue[400]};`}
              mainStyle={`color: ${colors.gray[400]}; font-size: 12px;`}
              stringStyle={`color: ${colors.red[600]};`}
              valueStyle={`color: ${colors.red[600]};`}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`max-w-[480px] rounded border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-950 ${className}`}
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

          {copyButton && (
            <IconButton
              aria-label={
                copyButton.isEnabled ? "Copy span details" : "Copy disabled"
              }
              variant="ghost"
              size="sm"
              onClick={handleCopy}
            >
              {hasCopied ? (
                <Check className="size-3 text-gray-500" />
              ) : (
                <Copy className="size-3 text-gray-500" />
              )}
            </IconButton>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button size="xs" iconStart={<Plus className="size-4" />}>
            Primary
          </Button>

          <Button
            variant="ghost"
            size="xs"
            iconStart={<Plus className="size-4" />}
          >
            Secondary
          </Button>

          <IconButton
            aria-label={"Open chat with AI assistant (feature coming soon)"}
            size="md"
          >
            <MessageSquare className="size-3 text-gray-500" />
          </IconButton>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-start space-x-2">
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

        <span className="dark: text-xs text-gray-500 dark:text-gray-600">
          LATENCY: {formatDuration(durationMs)}
        </span>
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
