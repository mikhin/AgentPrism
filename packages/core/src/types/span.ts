export type SpanCardType = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  cost: number;
  type: "LLM" | "TOOL" | "CHAIN" | "AGENT";
  children?: SpanCardType[];
  tokensCount: number;
  status: "success" | "error" | "running" | "warning";
};
