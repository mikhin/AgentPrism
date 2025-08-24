import type { SpanCardType } from "../types/span.ts";

export const getDurationMs = (spanCard: SpanCardType): number => {
  const startMs = +spanCard.startTime;
  const endMs = +spanCard.endTime;
  return endMs - startMs;
};
