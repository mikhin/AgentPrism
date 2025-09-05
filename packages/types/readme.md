# @evilmartians/agent-prism-types

TypeScript type definitions and constants for [AgentPrism](https://github.com/evilmartians/AgentPrism) - AI agent trace visualization library.

Part of the [AgentPrism](https://github.com/evilmartians/AgentPrism) project for visualizing AI agent traces, LLM calls, and tool executions.

## Installation

```bash
npm install @evilmartians/agent-prism-types
```

## Usage

```typescript
// Import types
import type {
  Span,
  TraceSpan,
  SpanAttribute,
  TraceSpanCategory,
  OTelSpan,
  OTelDocument,
} from "@evilmartians/agent-prism-types";

// Import constants for OpenInference semantic conventions
import {
  OPENINFERENCE_ATTRIBUTES,
  OPENINFERENCE_MAPPINGS,
  GENAI_MAPPINGS,
  STANDARD_OTEL_MAPPINGS,
} from "@evilmartians/agent-prism-types";
```

## What's Included

- **Core Types**: `Span`, `TraceSpan`, `SpanAttribute` - UI-ready span representations
- **Categories**: `TraceSpanCategory` - span categorization (LLM, Tool, Agent, etc.)
- **OpenTelemetry Types**: `OTelSpan`, `OTelDocument` - OTLP format types
- **Semantic Convention Mappings**: Constants for OpenInference, GenAI, and standard OpenTelemetry attributes

## Related Packages

- [`@evilmartians/agent-prism-data`](https://www.npmjs.com/package/@evilmartians/agent-prism-data) - Data transformation utilities
- [AgentPrism UI Components](https://github.com/evilmartians/AgentPrism) - React components for visualization

## Documentation

See the main [AgentPrism documentation](https://github.com/evilmartians/AgentPrism) and [Storybook](https://agent-prism-ui.web.app/) for complete usage examples and UI components.

## License

MIT © [Evil Martians](https://evilmartians.com)
