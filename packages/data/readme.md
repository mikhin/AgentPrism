# @evilmartians/agent-prism-data

Data transformation utilities for [AgentPrism](https://github.com/evilmartians/AgentPrism) - converting OpenTelemetry traces to UI-ready formats for AI agent trace visualization.

Part of the [AgentPrism](https://github.com/evilmartians/AgentPrism) project for visualizing AI agent traces, LLM calls, and tool executions.

## Installation

```bash
npm install @evilmartians/agent-prism-data @evilmartians/agent-prism-types
```

Note: This package has a peer dependency on `@evilmartians/agent-prism-types`.

## Usage

```typescript
import {
  convertOTelDocumentToSpanCards,
  convertOTelTraceToSpanTree,
  convertOTelSpanToSpanCard,
  getDurationMs,
  formatDuration,
  getTimelineData,
  flattenSpans,
  findTimeRange,
  extractInputOutput,
} from "@evilmartians/agent-prism-data";

// Main function: Convert OTLP document to UI-ready spans
const spans = convertOTelDocumentToSpanCards(otelDocument);

// Build hierarchical tree structure
const tree = convertOTelTraceToSpanTree(otelTrace);

// Convert individual span
const spanCard = convertOTelSpanToSpanCard(otelSpan);

// Utility functions
const duration = getDurationMs(startNano, endNano);
const formatted = formatDuration(durationMs);
const timeline = getTimelineData(spans);
const flat = flattenSpans(nestedSpans);
const [start, end] = findTimeRange(spans);
const { input, output } = extractInputOutput(span);
```

## Features

- **OTLP to UI conversion**: Transform OpenTelemetry traces into visualization-ready format
- **Semantic convention support**: Handles OpenInference, GenAI, and standard OTEL attributes
- **Hierarchical structure**: Build parent-child relationships for tree visualization
- **Timeline calculations**: Calculate durations, offsets, and time ranges
- **Token & cost extraction**: Extract LLM token counts and usage costs from spans
- **Input/Output parsing**: Extract prompts and completions from LLM spans

## Related Packages

- [`@evilmartians/agent-prism-types`](https://www.npmjs.com/package/@evilmartians/agent-prism-types) - TypeScript type definitions
- [AgentPrism UI Components](https://github.com/evilmartians/AgentPrism) - React components for visualization

## Documentation

See the main [AgentPrism documentation](https://github.com/evilmartians/AgentPrism) and [Storybook](https://agent-prism-ui.web.app/) for complete usage examples and UI components.

## License

MIT © [Evil Martians](https://evilmartians.com)
