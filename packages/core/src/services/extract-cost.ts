import type { Span } from "../types/open-telemetry";

import { OPENTELEMETRY_GENAI_ATTRIBUTES } from "../constants/span-mappings.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const extractCost = (span: Span): number => {
  const inputCost = getAttributeValue(
    span,
    OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_INPUT_COST,
  );

  const outputCost = getAttributeValue(
    span,
    OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_OUTPUT_COST,
  );

  let totalCost = 0;

  if (typeof inputCost === "number") {
    totalCost += inputCost;
  }

  if (typeof outputCost === "number") {
    totalCost += outputCost;
  }

  // If both are missing, use fallback
  if (totalCost === 0) {
    const fallbackCost = getAttributeValue(span, "gen_ai.usage.cost");

    if (typeof fallbackCost === "number") {
      totalCost = fallbackCost;
    }
  }

  return totalCost;
};
