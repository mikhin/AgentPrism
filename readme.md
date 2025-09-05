# AgentPrism

React components for visualizing traces from AI agents. Display LLM calls, tool executions, and agent workflows in a hierarchical timeline.

**⚠️ Alpha Release:** This library is under active development. APIs may change.

<img width="1280" height="755" alt="github-cover-screen" src="https://github.com/user-attachments/assets/7fa167ab-aa33-4b18-b6f0-83af9ef5cfba" />

## Storybook

[https://agent-prism-ui.web.app/](https://agent-prism-ui.web.app/)

## Prerequisites

- React 19+
- Tailwind CSS 3
- TypeScript

## Installation

Copy the UI components to your project:

```bash
npx degit evilmartians/agent-prism/packages/ui/src/components src/components/agent-prism
```

Install the data and types packages:

```bash
npm install @evilmartians/agent-prism-data @evilmartians/agent-prism-types
```

Install required UI dependencies:

```bash
npm install @radix-ui/react-collapsible @radix-ui/react-tabs classnames lucide-react react-json-pretty
```

## Quick Start

Here is a minimal example of rendering a trace tree view:

```tsx
// UI components are copied to your project - you own them, customize as needed
import { TreeView } from "./components/agent-prism/TreeView";
// Data transformations stay external - consistent OTLP parsing across updates
import { convertOTelDocumentToSpanCards } from "@evilmartians/agent-prism-data";
// Your trace data in OTLP wire format
import traceData from "./trace.json";

function App() {
  // Transform OTLP format to UI-ready structure
  const spans = convertOTelDocumentToSpanCards(traceData);

  return (
    <TreeView
      expandButton="inside"
      expandedSpansIds={[]}
      onExpandSpansIdsChange={() => {}}
      onSpanSelect={(span) => console.log("Clicked:", span)}
      spans={spans}
    />
  );
}
```

## Full Example: Traces List → Tree View → Details

```tsx
import { useState, useEffect } from "react";
import { TraceList } from "./components/agent-prism/TraceList/TraceList";
import { TreeView } from "./components/agent-prism/TreeView";
import { DetailsView } from "./components/agent-prism/DetailsView/DetailsView";
import { convertOTelDocumentToSpanCards } from "@evilmartians/agent-prism-data";
import type { TraceSpan, TraceRecord } from "@evilmartians/agent-prism-types";

function TraceExplorer() {
  const [data, setData] = useState<
    Array<{ traceRecord: TraceRecord; spans: TraceSpan[] }>
  >([]);
  const [selectedTrace, setSelectedTrace] = useState<TraceRecord | undefined>(
    undefined,
  );
  const [selectedTraceSpans, setSelectedTraceSpans] = useState<TraceSpan[]>([]);
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan | undefined>(
    undefined,
  );
  const [expandedSpansIds, setExpandedSpansIds] = useState<string[]>([]);

  // Fetch your traces from backend
  useEffect(() => {
    fetch("/api/traces")
      .then((res) => res.json())
      .then((rawData) => {
        const processedData = rawData.map((doc) => ({
          traceRecord: doc.traceRecord, // Assuming your API returns this structure
          spans: convertOTelDocumentToSpanCards(doc),
        }));
        setData(processedData);
      });
  }, []);

  const traceRecords = data.map((item) => item.traceRecord);

  const handleTraceSelect = (trace: TraceRecord) => {
    setSelectedTrace(trace);
    const traceData = data.find((item) => item.traceRecord.id === trace.id);
    setSelectedTraceSpans(traceData?.spans ?? []);
    setSelectedSpan(undefined);
  };

  return (
    <div className="flex h-screen">
      {/* Traces list sidebar */}
      <div className="w-80 border-r">
        <TraceList
          traces={traceRecords}
          expanded={true}
          onExpandStateChange={() => {}}
          onTraceSelect={handleTraceSelect}
          selectedTrace={selectedTrace}
        />
      </div>

      {/* Tree view */}
      <div className="flex-1 overflow-auto">
        {selectedTraceSpans.length > 0 && (
          <TreeView
            spans={selectedTraceSpans}
            expandButton="inside"
            onSpanSelect={setSelectedSpan}
            selectedSpan={selectedSpan}
            expandedSpansIds={expandedSpansIds}
            onExpandSpansIdsChange={setExpandedSpansIds}
          />
        )}
      </div>

      {/* Details panel */}
      {selectedSpan && (
        <div className="w-96 border-l">
          <DetailsView data={selectedSpan} />
        </div>
      )}
    </div>
  );
}
```

## Data Format

This UI library uses its own data format tailored for UI components. To integrate your data, you can use the provided data adapters from the `@evilmartians/agent-prism-data` package. Each adapter is designed to handle different input data formats and will transform the data into the UI-compatible structure.

### Data Adapters

Currently, the library provides an adapter called `convertOTelDocumentToSpanCards` specifically for handling [OTLP data](https://opentelemetry.io/docs/specs/otel/protocol/file-exporter/). This adapter transforms OTLP input data into a format suitable for the UI components, like `TreeView`.

However, this is just one example of a data adapter, and you can create or use other adapters to handle different formats as needed. Each adapter processes data and returns it in a way that the UI components can render.

### Example OTLP Input Data Format

For instance, if you're using the OTLP format, here's how the input data might look:

```typescript
{
  "resourceSpans": [{
    "resource": {
      "attributes": [...]
    },
    "scopeSpans": [{
      "spans": [{
        "traceId": "...",
        "spanId": "...",
        "parentSpanId": "...",
        "name": "openai.chat",
        "startTimeUnixNano": "1234567890000000",
        "endTimeUnixNano": "1234567891000000",
        "attributes": [
          {
            "key": "gen_ai.request.model",
            "value": { "stringValue": "gpt-4" }
          },
          {
            "key": "gen_ai.usage.input_tokens",
            "value": { "intValue": "150" }
          }
        ]
      }]
    }]
  }]
}
```

#### Supported Semantic Conventions

- **OpenTelemetry GenAI**: `gen_ai.*` attributes for LLM operations
- **OpenInference**: `llm.*`, `retrieval.*` attributes
- **Standard OpenTelemetry**: HTTP, database, and other standard spans

#### Custom Attributes

If you need to track custom attributes, like AI usage costs, you can add them to your spans. Common attributes include:

- `gen_ai.usage.input_cost` - Cost for input tokens.
- `gen_ai.usage.output_cost` - Cost for output tokens.
- `gen_ai.usage.cost` - Total cost (fallback value if individual costs aren't available).

Once the data is processed by the appropriate adapter, the transformed data will be ready for use with the UI components like `TreeView` or DetailsView.

## Contributing

We welcome contributions to the AI Agent Trace UI library. Please see our [Contribution Guide](CONTRIBUTING.md) for more details on how to get involved.
