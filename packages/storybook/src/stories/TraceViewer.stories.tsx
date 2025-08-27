import type { OpenTelemetryDocument } from "@ai-agent-trace-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { convertOTelDocumentToSpanCards } from "@ai-agent-trace-ui/data";
import { TraceViewer } from "@ai-agent-trace-ui/ui";

import quoTavAgentDataRaw from "../data/quo_tav_agent.json";
import ragEarningsAgentDataRaw from "../data/rag_earnings_agent.json";
import smolDeepResearchAgentDataRaw from "../data/smol_deep_research_agent.json";

const quoTavAgentData = convertOTelDocumentToSpanCards(
  quoTavAgentDataRaw as OpenTelemetryDocument[],
);
const ragEarningsAgentData = convertOTelDocumentToSpanCards(
  ragEarningsAgentDataRaw as OpenTelemetryDocument[],
);
const smolDeepResearchAgentData = convertOTelDocumentToSpanCards(
  smolDeepResearchAgentDataRaw as OpenTelemetryDocument[],
);

const data = [
  {
    traceRecord: {
      id: "quo-tav",
      name: "7a8b9c1d",
      spansCount: 24,
      durationMs: 3200,
      agentDescription: "research-agent",
    },
    spans: quoTavAgentData,
  },
  {
    traceRecord: {
      id: "rag-earnings",
      name: "f2e3d4c5",
      spansCount: 156,
      durationMs: 45670,
      agentDescription: "data-analysis-bot",
    },
    spans: ragEarningsAgentData,
  },
  {
    traceRecord: {
      id: "smol-deep-research",
      name: "9b8a7c6d",
      spansCount: 13,
      durationMs: 2500,
      agentDescription: "customer-support-ai",
    },
    spans: smolDeepResearchAgentData,
  },
];

export const TraceViewerStory: Story = {
  args: {
    data,
  },
};

const meta: Meta<typeof TraceViewer> = {
  title: "Components/TraceViewer",
  component: TraceViewer,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof TraceViewer>;
