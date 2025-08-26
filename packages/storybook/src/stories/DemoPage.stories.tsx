import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  convertOTelDocumentToSpanCards,
  DetailsView,
  TraceList,
  TraceListItemHeader,
  TreeView,
  type OpenTelemetryDocument,
  type TraceRecord,
  type TraceSpan,
} from "ai-agent-trace-ui-core";
import cn from "classnames";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import quoTavAgentDataRaw from "../agent-data/quo_tav_agent.json";
import ragEarningsAgentDataRaw from "../agent-data/rag_earnings_agent.json";
import smolDeepResearchAgentDataRaw from "../agent-data/smol_deep_research_agent.json";

const quoTavAgentData = convertOTelDocumentToSpanCards(
  quoTavAgentDataRaw as OpenTelemetryDocument[],
);
const ragEarningsAgentData = convertOTelDocumentToSpanCards(
  ragEarningsAgentDataRaw as OpenTelemetryDocument[],
);
const smolDeepResearchAgentData = convertOTelDocumentToSpanCards(
  smolDeepResearchAgentDataRaw as OpenTelemetryDocument[],
);

const MOCK_TRACE_RECORDS: TraceRecord[] = [
  {
    id: "quo-tav",
    name: "7a8b9c1d",
    spansCount: 24,
    durationMs: 3200,
    agentDescription: "research-agent",
  },
  {
    id: "rag-earnings",
    name: "f2e3d4c5",
    spansCount: 156,
    durationMs: 45670,
    agentDescription: "data-analysis-bot",
  },
  {
    id: "smol-deep-research",
    name: "9b8a7c6d",
    spansCount: 13,
    durationMs: 2500,
    agentDescription: "customer-support-ai",
  },
];

export const DemoPageStory: Story = {};

export const DemoPage = () => {
  return (
    <div className="h-full w-full p-4 lg:p-8">
      <div className="hidden 2xl:block">
        <DesktopLayout />
      </div>

      <div className="2xl:hidden">
        <MobileLayout />
      </div>
    </div>
  );
};

const DesktopLayout = () => {
  const [selectedTrace, setSelectedTrace] = useState<TraceRecord>();
  const [selectedTraceSpans, setSelectedTraceSpans] = useState<TraceSpan[]>([]);
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan>();

  const [traceListExpanded, setTraceListExpanded] = useState(true);

  function handleTraceSelect(trace: TraceRecord) {
    setSelectedTrace(trace);

    if (trace.id === "quo-tav") {
      setSelectedTraceSpans(quoTavAgentData);
    } else if (trace.id === "rag-earnings") {
      setSelectedTraceSpans(ragEarningsAgentData);
    } else if (trace.id === "smol-deep-research") {
      setSelectedTraceSpans(smolDeepResearchAgentData);
    }
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        traceListExpanded
          ? "grid-cols-[20%_1fr_30%]"
          : "grid-cols-[min-content_1fr_30%]",
      )}
    >
      <TraceList
        traces={MOCK_TRACE_RECORDS}
        expanded={traceListExpanded}
        onExpandStateChange={setTraceListExpanded}
        onTraceSelect={handleTraceSelect}
        selectedTrace={selectedTrace}
      />

      {selectedTrace ? (
        <div className="flex flex-col gap-4">
          <TraceListItemHeader trace={selectedTrace} />

          <TreeView
            spans={selectedTraceSpans}
            expandButton="inside"
            onSpanSelect={setSelectedSpan}
            selectedSpan={selectedSpan}
          />
        </div>
      ) : (
        <Placeholder title="Select a trace to see the details" />
      )}

      {selectedSpan ? (
        <DetailsView data={selectedSpan} />
      ) : (
        <Placeholder title="Select a span to see the details" />
      )}
    </div>
  );
};

const MobileLayout = () => {
  const [selectedTrace, setSelectedTrace] = useState<TraceRecord>();
  const [selectedTraceSpans, setSelectedTraceSpans] = useState<TraceSpan[]>([]);
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan>();

  const [traceListExpanded, setTraceListExpanded] = useState(true);

  function handleTraceSelect(trace: TraceRecord) {
    setSelectedTrace(trace);

    if (trace.id === "quo-tav") {
      setSelectedTraceSpans(quoTavAgentData);
    } else if (trace.id === "rag-earnings") {
      setSelectedTraceSpans(ragEarningsAgentData);
    } else if (trace.id === "smol-deep-research") {
      setSelectedTraceSpans(smolDeepResearchAgentData);
    }
  }

  if (!selectedTrace) {
    return (
      <TraceList
        traces={MOCK_TRACE_RECORDS}
        expanded={traceListExpanded}
        onExpandStateChange={setTraceListExpanded}
        onTraceSelect={handleTraceSelect}
        selectedTrace={selectedTrace}
      />
    );
  }

  if (selectedTrace && selectedTraceSpans.length && !selectedSpan) {
    return (
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => {
            setSelectedTrace(undefined);
            setSelectedTraceSpans([]);
          }}
          iconStart={<ArrowLeft className="size-3" />}
          variant="ghost"
          className="self-start"
        >
          Traces list
        </Button>

        <TraceListItemHeader trace={selectedTrace} />

        <TreeView
          spans={selectedTraceSpans}
          expandButton="inside"
          onSpanSelect={setSelectedSpan}
          selectedSpan={selectedSpan}
        />
      </div>
    );
  }

  if (selectedTrace && selectedTraceSpans.length && selectedSpan) {
    return (
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => {
            setSelectedSpan(undefined);
          }}
          iconStart={<ArrowLeft className="size-3" />}
          variant="ghost"
          className="self-start"
        >
          Tree View
        </Button>

        <DetailsView data={selectedSpan} />
      </div>
    );
  }

  return null;
};

interface PlaceholderProps {
  title: string;
}

const Placeholder = ({ title }: PlaceholderProps) => {
  return (
    <p className="flex items-center justify-center rounded-lg bg-gray-100 p-4 text-center text-gray-600 dark:bg-gray-900 dark:text-gray-200">
      {title}
    </p>
  );
};

const meta: Meta<typeof DemoPage> = {
  title: "Pages/DemoPage",
  component: DemoPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DemoPage>;
