export type OpenTelemetryDocument = {
  resourceSpans: ResourceSpan[];
};

export type ResourceSpan = {
  resource: Resource;
  scopeSpans: ScopeSpan[];
  schemaUrl?: string;
};

export type Resource = {
  attributes: ResourceAttribute[];
};

export type ResourceAttribute = {
  key: string;
  value: AttributeValue;
};

export type AttributeValue = {
  stringValue?: string;
  intValue?: string;
  boolValue?: boolean;
};

export type ScopeSpan = {
  scope: Scope;
  spans: Span[];
  schemaUrl?: string;
};

export type Scope = {
  name: string;
  version?: string;
};

export type Span = {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  kind: SpanKind;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes: SpanAttribute[];
  status: Status;
  flags: number;
  events?: Event[];

  traceState?: string;
  droppedAttributesCount?: number;
  droppedEventsCount?: number;
  droppedLinksCount?: number;
  links?: Link[];
};

export type SpanAttribute = {
  key: string;
  value: AttributeValue;
};

export type Event = {
  timeUnixNano: string;
  name: string;
  attributes?: SpanAttribute[];
  droppedAttributesCount?: number;
};

export type Link = {
  traceId: string;
  spanId: string;
  traceState?: string;
  attributes?: SpanAttribute[];
  droppedAttributesCount?: number;
};

export type Status = {
  code?: StatusCode;
  message?: string;
};

export type SpanKind =
  | "SPAN_KIND_INTERNAL"
  | "SPAN_KIND_SERVER"
  | "SPAN_KIND_CLIENT"
  | "SPAN_KIND_PRODUCER"
  | "SPAN_KIND_CONSUMER";

export type StatusCode =
  | "STATUS_CODE_OK"
  | "STATUS_CODE_ERROR"
  | "STATUS_CODE_UNSET";
