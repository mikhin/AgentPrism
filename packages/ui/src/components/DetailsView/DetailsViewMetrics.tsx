import type { TraceSpan } from "@evilmartians/agent-prism-types";

import { getDurationMs, formatDuration } from "@evilmartians/agent-prism-data";
import { Coins } from "lucide-react";

import { Badge } from "../Badge";
import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../shared.ts";

interface DetailsViewMetricsProps {
  data: TraceSpan;
}

export const DetailsViewMetrics = ({ data }: DetailsViewMetricsProps) => {
  const Icon = getSpanCategoryIcon(data.type);
  const durationMs = getDurationMs(data);

  return (
    <div className="mb-4 flex flex-wrap items-center justify-start gap-1">
      <Badge
        iconStart={<Icon className="size-2.5" />}
        theme={getSpanCategoryTheme(data.type)}
        size="xs"
      >
        {getSpanCategoryLabel(data.type)}
      </Badge>

      <Badge iconStart={<Coins className="size-2.5" />} theme="gray" size="xs">
        {data.tokensCount}
      </Badge>

      <Badge theme="gray" size="xs">
        $ {data.cost}
      </Badge>

      <span className="text-xs text-gray-500 dark:text-gray-600">
        LATENCY: {formatDuration(durationMs)}
      </span>
    </div>
  );
};
