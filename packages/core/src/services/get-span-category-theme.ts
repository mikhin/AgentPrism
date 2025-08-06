import type { SpanCategory } from "../types/span.ts";
import type { ColorVariant } from "../types/ui.ts";

/**
 * Get badge theme/color for span category (for UI styling)
 */
export function getSpanCategoryTheme(category: SpanCategory): ColorVariant {
  const themes: Record<SpanCategory, ColorVariant> = {
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
