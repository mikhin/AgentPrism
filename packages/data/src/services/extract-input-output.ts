import { INPUT_OUTPUT_ATTRIBUTES, type Span } from "@ai-agent-trace-ui/types";

import { getAttributeValue } from "./get-attribute-value";

export type InputOutputData = {
  input?: string;
  output?: string;
};

/**
 * Extract input and output values from a span's attributes.
 * @param {Span} span - The span object to extract input/output data from. The span should conform to the {@link Span} type and contain relevant attributes for input, output, and their MIME types.
 * @returns {InputOutputData} Object containing input, output, and their MIME types if available.
 */
export const extractInputOutput = (span: Span): InputOutputData => {
  const input = getAttributeValue(span, INPUT_OUTPUT_ATTRIBUTES.INPUT_VALUE);
  const output = getAttributeValue(span, INPUT_OUTPUT_ATTRIBUTES.OUTPUT_VALUE);

  return {
    input: typeof input === "string" ? input : undefined,
    output: typeof output === "string" ? output : undefined,
  };
};
