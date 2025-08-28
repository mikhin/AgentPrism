# AI Agent Trace UI

React components for visualizing OpenTelemetry traces from AI agents. Display LLM calls, tool executions, and agent workflows in a hierarchical timeline.

**⚠️ Alpha Release:** This library is under active development. APIs may change.

## Prerequisites

- React 19+
- Tailwind CSS 3
- TypeScript

## Installation

Install the data and types packages:

```bash
npm install github:mikhin/ai-agent-trace-ui#main/packages/data
npm install github:mikhin/ai-agent-trace-ui#main/packages/types
```

Copy the UI components to your project:

```bash
npx degit mikhin/ai-agent-trace-ui/packages/ui/src/components src/components/ai-trace-ui
```

Install required UI dependencies:

```json
{
  "dependencies": {
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-tabs": "^1.1.13",
    "classnames": "2.5.1",
    "lucide-react": "^0.534.0",
    "react-json-pretty": "^2.2.0"
  }
}
```

## Quick Start

```tsx
// UI components are copied to your project - you own them, customize as needed
import { TreeView } from "./components/ai-trace-ui/TreeView";
// Data transformations stay external - consistent OTLP parsing across updates
import { convertOTelDocumentToSpanCards } from "@ai-agent-trace-ui/data";
// Your trace data in OTLP wire format
import traceData from "./trace.json";

function App() {
  // Transform OTLP format to UI-ready structure
  const spans = convertOTelDocumentToSpanCards(traceData);

  return (
    <TreeView
      spans={spans}
      onSpanClick={(span) => console.log("Clicked:", span)}
    />
  );
}
```

## Full Example: Traces List → Tree View → Details

```tsx
import { useState } from "react";
import { TraceList, TreeView, DetailsView } from "@ai-agent-trace-ui/ui";
import { convertOTelDocumentToSpanCards } from "@ai-agent-trace-ui/data";
import type { TraceSpan } from "@ai-agent-trace-ui/types";

function TraceExplorer() {
  const [traces, setTraces] = useState<TraceSpan[][]>([]);
  const [selectedTrace, setSelectedTrace] = useState<TraceSpan[] | null>(null);
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan | null>(null);

  // Fetch your traces from backend
  useEffect(() => {
    fetch("/api/traces")
      .then((res) => res.json())
      .then((data) => {
        const processedTraces = data.map((doc) =>
          convertOTelDocumentToSpanCards(doc),
        );
        setTraces(processedTraces);
      });
  }, []);

  return (
    <div className="flex h-screen">
      {/* Traces list sidebar */}
      <div className="w-80 border-r">
        <TraceList
          traces={traces}
          onTraceSelect={(trace) => {
            setSelectedTrace(trace);
            setSelectedSpan(null);
          }}
        />
      </div>

      {/* Tree view */}
      <div className="flex-1 overflow-auto">
        {selectedTrace && (
          <TreeView
            spans={selectedTrace}
            onSpanClick={setSelectedSpan}
            selectedSpanId={selectedSpan?.id}
          />
        )}
      </div>

      {/* Details panel */}
      {selectedSpan && (
        <div className="w-96 border-l">
          <DetailsView
            span={selectedSpan}
            onClose={() => setSelectedSpan(null)}
          />
        </div>
      )}
    </div>
  );
}
```

## Data Format

This library accepts OpenTelemetry traces in [OTLP wire format](https://opentelemetry.io/docs/specs/otlp/).

### Input Format (OTLP)

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

### Supported Semantic Conventions

- **OpenTelemetry GenAI**: `gen_ai.*` attributes for LLM operations
- **OpenInference**: `llm.*`, `retrieval.*` attributes
- **Standard OpenTelemetry**: HTTP, database, and other standard spans

### Custom Attributes

For cost tracking, add these custom attributes to your spans:

- `gen_ai.usage.input_cost` - Input token cost
- `gen_ai.usage.output_cost` - Output token cost
- `gen_ai.usage.cost` - Total cost (fallback)
