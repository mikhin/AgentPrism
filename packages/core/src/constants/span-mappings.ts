import type { SpanCategory } from "../types/span";

// Attribute key constants for different standards
export const OPENTELEMETRY_GENAI_ATTRIBUTES = {
  OPERATION_NAME: "gen_ai.operation.name",
  SYSTEM: "gen_ai.system",
  MODEL: "gen_ai.request.model",
  AGENT_NAME: "gen_ai.agent.name",
  TOOL_NAME: "gen_ai.tool.name",
} as const;

export const OPENINFERENCE_ATTRIBUTES = {
  SPAN_KIND: "openinference.span.kind",
  LLM_MODEL: "llm.model_name",
  INPUT_MESSAGES: "llm.input_messages",
  RETRIEVAL_DOCUMENTS: "retrieval.documents",
  EMBEDDING_MODEL: "embedding.model_name",
} as const;

export const STANDARD_OPENTELEMETRY_ATTRIBUTES = {
  HTTP_METHOD: "http.method",
  DB_SYSTEM: "db.system",
  DB_OPERATION: "db.operation.name",
  FUNCTION_NAME: "function.name",
} as const;

// OpenTelemetry GenAI operation name mappings
export const OPENTELEMETRY_GENAI_MAPPINGS: Record<string, SpanCategory> = {
  // LLM operations
  chat: "llm_call",
  generate_content: "llm_call",
  text_completion: "llm_call",

  // Tool operations
  execute_tool: "tool_execution",

  // Agent operations
  invoke_agent: "agent_invocation",
  create_agent: "create_agent",

  // Embedding operations
  embeddings: "embedding",
} as const;

// OpenInference span kind mappings
export const OPENINFERENCE_MAPPINGS: Record<string, SpanCategory> = {
  LLM: "llm_call",
  TOOL: "tool_execution",
  CHAIN: "chain_operation",
  AGENT: "agent_invocation",
  RETRIEVER: "retrieval",
  EMBEDDING: "embedding",
} as const;

// Standard OpenTelemetry detection patterns
export const STANDARD_OPENTELEMETRY_PATTERNS = {
  HTTP_KEYWORDS: [],
  DATABASE_KEYWORDS: [],
  FUNCTION_KEYWORDS: ["tool", "function"],
  LLM_KEYWORDS: ["openai", "anthropic", "gpt", "claude"],
  CHAIN_KEYWORDS: ["chain", "workflow", "langchain"],
  AGENT_KEYWORDS: ["agent"],
  RETRIEVAL_KEYWORDS: ["pinecone", "chroma", "retrieval", "vector", "search"],
} as const;
