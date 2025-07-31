import { type ReadableSpan } from "@opentelemetry/sdk-trace-base";

import type { Span } from "../types/span";
import { calculateDuration } from "./calculate-duration.ts";
import { mapSpanStatus } from "./map-span-status.ts";
import { determineSpanType } from "./determine-span-type.ts";
import { generateTitle } from "./generate-title.ts";
import { extractTokenCount } from "./extract-token-count.ts";
import { extractCost } from "./extract-cost.ts";
import { convertTimestamp } from "./convert-timestamp.ts";

export const convertOTelSpanToSpanCard = (
  span: ReadableSpan,
  children: Span[] = [],
): Span => {
  const duration = calculateDuration(span);
  const status = mapSpanStatus(span.status.code);
  const spanType = determineSpanType(span);
  const tokensCount = extractTokenCount(span);
  const cost = extractCost(span);

  return {
    id: span.spanContext().spanId,
    title: generateTitle(span),
    type: spanType,
    status,
    duration,
    tokensCount,
    cost,
    startTime: convertTimestamp(span.startTime),
    endTime: convertTimestamp(span.endTime),
    children,
  };
};
