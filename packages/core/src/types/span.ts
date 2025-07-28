export type Span = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  cost: number;
  type: "LLM" | "TOOL" | "CHAIN" | "AGENT";
  children?: Span[];
  tokensCount: number;
};
