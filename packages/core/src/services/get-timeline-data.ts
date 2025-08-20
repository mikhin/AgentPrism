import type { SpanCardType } from "../types/span";

export const getTimelineData = ({
  spanCard,
  minStart,
  maxEnd,
}: {
  spanCard: SpanCardType;
  minStart: number;
  maxEnd: number;
}) => {
  const startMs = +spanCard.startTime;
  const endMs = +spanCard.endTime;
  const totalRange = maxEnd - minStart;
  const durationMs = endMs - startMs;
  const startPercent = ((startMs - minStart) / totalRange) * 100;
  const widthPercent = (durationMs / totalRange) * 100;

  return {
    durationMs,
    startPercent,
    widthPercent,
  };
};
