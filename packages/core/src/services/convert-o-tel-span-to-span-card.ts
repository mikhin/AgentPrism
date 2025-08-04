import type { Span } from "../types/open-telemetry.ts";
import type { SpanCardType } from "../types/span.ts";
import { calculateDuration } from "./calculate-duration.ts";
import { convertTimestamp } from "./convert-timestamp.ts";
import { determineSpanType } from "./determine-span-type.ts";
import { extractCost } from "./extract-cost.ts";
import { extractTokenCount } from "./extract-token-count.ts";
import { generateTitle } from "./generate-title.ts";
import { mapSpanStatus } from "./map-span-status.ts";

export const convertOTelSpanToSpanCard = (
  span: Span,
  children: SpanCardType[] = [],
): SpanCardType => {
  const duration = calculateDuration(span);
  const status = mapSpanStatus(span.status.code);
  const spanType = determineSpanType(span);
  const tokensCount = extractTokenCount(span);
  const cost = extractCost(span);

  return {
    id: span.spanId,
    title: generateTitle(span),
    type: spanType,
    status,
    duration,
    tokensCount,
    cost,
    startTime: convertTimestamp(span.startTimeUnixNano),
    endTime: convertTimestamp(span.endTimeUnixNano),
    children,
  };
};
