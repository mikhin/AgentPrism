import type { SpanCategory } from "../types/span.ts";

/**
 * Get human-readable label for span category (for UI display)
 */
export function getSpanCategoryLabel(category: SpanCategory): string {
  const labels: Record<SpanCategory, string> = {
    llm_call: "LLM Call",
    tool_execution: "Tool Execution",
    agent_invocation: "Agent Invocation",
    chain_operation: "Chain Operation",
    retrieval: "Retrieval",
    embedding: "Embedding",
    create_agent: "Create Agent",
    unknown: "Unknown",
  };

  return labels[category];
}
