import type { BadgeTheme } from "../components/Badge.tsx";
import type { SpanCategory } from "../types/span.ts";

/**
 * Get badge theme/color for span category (for UI styling)
 */
export function getSpanCategoryTheme(category: SpanCategory): BadgeTheme {
  const themes: Record<SpanCategory, BadgeTheme> = {
    llm_call: "purple",
    tool_execution: "orange",
    agent_invocation: "indigo",
    chain_operation: "teal",
    retrieval: "cyan",
    embedding: "emerald",
    create_agent: "sky",
    unknown: "gray",
  };

  return themes[category];
}
