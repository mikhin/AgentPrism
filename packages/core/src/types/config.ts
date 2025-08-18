import type { SpanBadgeType, SpanCategory } from "./span";

export type BadgesConfig = Record<SpanCategory, SpanBadgeType>;

export type AgentTraceConfig = {
  badges: BadgesConfig;
};
