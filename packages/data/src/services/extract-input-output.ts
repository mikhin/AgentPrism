import { INPUT_OUTPUT_ATTRIBUTES, type Span } from "@ai-agent-trace-ui/types";

import { getAttributeValue } from "./get-attribute-value";

export type InputOutputData = {
  input?: string;
  output?: string;
  inputMimeType?: string;
  outputMimeType?: string;
};

/**
 * Extract input and output values from a span's attributes.
 * @param {Span} span - The span object to extract input/output data from. The span should conform to the {@link Span} type and contain relevant attributes for input, output, and their MIME types.
 * @returns {InputOutputData} Object containing input, output, and their MIME types if available.
 */
export const extractInputOutput = (span: Span): InputOutputData => {
  const input = getAttributeValue(span, INPUT_OUTPUT_ATTRIBUTES.INPUT_VALUE);
  const output = getAttributeValue(span, INPUT_OUTPUT_ATTRIBUTES.OUTPUT_VALUE);
  const inputMimeType = getAttributeValue(
    span,
    INPUT_OUTPUT_ATTRIBUTES.INPUT_MIME_TYPE,
  );
  const outputMimeType = getAttributeValue(
    span,
    INPUT_OUTPUT_ATTRIBUTES.OUTPUT_MIME_TYPE,
  );

  return {
    input: typeof input === "string" ? input : undefined,
    output: typeof output === "string" ? output : undefined,
    inputMimeType:
      typeof inputMimeType === "string" ? inputMimeType : undefined,
    outputMimeType:
      typeof outputMimeType === "string" ? outputMimeType : undefined,
  };
};
