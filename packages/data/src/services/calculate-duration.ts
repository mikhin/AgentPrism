import type { Span } from "@evilmartians/agent-prism-types";

export const calculateDuration = (span: Span): number => {
  // Convert string nanosecond timestamps to BigInt for precise arithmetic
  const startNano = BigInt(span.startTimeUnixNano);
  const endNano = BigInt(span.endTimeUnixNano);

  // Calculate duration in nanoseconds
  const durationNano = endNano - startNano;

  // Divide by 1_000_000 to get milliseconds
  return Number(durationNano / BigInt(1_000_000));
};
