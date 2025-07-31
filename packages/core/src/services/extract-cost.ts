import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { getAttributeValue } from "./get-attribute-value.ts";
import { LLM_ATTRIBUTES } from "../constants.ts";

export const extractCost = (span: ReadableSpan): number => {
  const cost = getAttributeValue(span, LLM_ATTRIBUTES.COST);

  return typeof cost === "number" ? cost : 0;
};
