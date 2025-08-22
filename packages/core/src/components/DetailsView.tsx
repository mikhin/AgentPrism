import type { ReactElement } from "react";

import { SquareTerminal, Tags } from "lucide-react";

import type { SpanCardType } from "../types/span";
import type { AvatarProps } from "./Avatar";

import { DetailsViewAttributesTab } from "./DetailsViewAttributesTab.tsx";
import { DetailsViewHeader } from "./DetailsViewHeader.tsx";
import { DetailsViewMetrics } from "./DetailsViewMetrics.tsx";
import { DetailsViewRawDataTab } from "./DetailsViewRawDataTab.tsx";
import { Tabs } from "./Tabs.tsx";

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
  const tabItems = [
    {
      value: "attributes",
      label: "Attributes",
      icon: <Tags className="size-4" />,
      content: <DetailsViewAttributesTab data={data} />,
    },
    {
      value: "raw",
      label: "RAW",
      icon: <SquareTerminal className="size-4" />,
      content: <DetailsViewRawDataTab data={data} />,
    },
  ];

  return (
    <div
      className={`max-w-[480px] rounded border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-950 ${className}`}
    >
      <DetailsViewHeader data={data} avatar={avatar} copyButton={copyButton} />

      <DetailsViewMetrics data={data} />

      <Tabs
        items={tabItems}
        onValueChange={onTabChange}
        theme="underline"
        defaultValue={defaultTab}
      />
    </div>
  );
};
