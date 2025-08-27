import {
  OPENINFERENCE_ATTRIBUTES,
  OPENINFERENCE_MAPPINGS,
  type Span,
  type TraceSpanCategory,
} from "@ai-agent-trace-ui/types";

import { getAttributeValue } from "./get-attribute-value.ts";

/**
 * Categorize span using OpenInference semantic conventions
 */
export function categorizeOpenInference(span: Span): TraceSpanCategory {
  const spanKind = getAttributeValue(span, OPENINFERENCE_ATTRIBUTES.SPAN_KIND);

  if (typeof spanKind === "string") {
    const category = OPENINFERENCE_MAPPINGS[spanKind];

    if (category) return category;
  }

  return "unknown";
}
