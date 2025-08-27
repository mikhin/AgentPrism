import {
  OPENTELEMETRY_GENAI_ATTRIBUTES,
  OPENTELEMETRY_GENAI_MAPPINGS,
  type Span,
  type TraceSpanCategory,
} from "@ai-agent-trace-ui/types";

import { getAttributeValue } from "./get-attribute-value.ts";

/**
 * Categorize span using OpenTelemetry GenAI semantic conventions
 */
export function categorizeOpenTelemetryGenAI(span: Span): TraceSpanCategory {
  const operationName = getAttributeValue(
    span,
    OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME,
  );

  if (typeof operationName === "string") {
    const category = OPENTELEMETRY_GENAI_MAPPINGS[operationName];

    if (category) return category;
  }

  return "unknown";
}
