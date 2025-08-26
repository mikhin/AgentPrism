import type { TraceSpan } from "../types";

import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../utils/ui";
import { Badge } from "./Badge";
import { PriceBadge } from "./PriceBadge";
import { TokensBadge } from "./TokensBadge";

interface SpanCardBagdesProps {
  data: TraceSpan;
}

export const SpanCardBadges = ({ data }: SpanCardBagdesProps) => {
  const Icon = getSpanCategoryIcon(data.type);

  return (
    <div className="flex flex-wrap items-center justify-start gap-1">
      <Badge
        iconStart={<Icon className="size-2.5" />}
        theme={getSpanCategoryTheme(data.type)}
        size="xs"
      >
        {getSpanCategoryLabel(data.type)}
      </Badge>

      <TokensBadge tokensCount={data.tokensCount} />

      <PriceBadge cost={data.cost} />
    </div>
  );
};
