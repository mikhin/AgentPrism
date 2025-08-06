import type { SpanCategory } from "../types/span.ts";

/**
 * Get human-readable label for span category (for UI display)
 */
export function getSpanCategoryLabel(category: SpanCategory): string {
  const labels: Record<SpanCategory, string> = {
    llm_call: "LLM",
    tool_execution: "TOOL",
    agent_invocation: "AGENT INVOCATION",
    chain_operation: "CHAIN",
    retrieval: "RETRIEVAL",
    embedding: "EMBEDDING",
    create_agent: "CREATE AGENT",
    unknown: "UNKNOWN",
  };

  return labels[category];
}
