import type { Span } from "ai-agent-trace-ui-core";

export const sampleTreeViewData: Span[] = [
  {
    id: "1",
    title: "LLM Request Processing",
    description: "Complete trace of a large language model request lifecycle.",
    children: [
      {
        id: "1-1",
        title: "User Input Processing",
        description: "Handling and preprocessing of the user's initial prompt.",
        children: [
          {
            id: "1-1-1",
            title: "Prompt Normalization",
            description: "Cleaning and standardizing the input text.",
            children: [
              {
                id: "1-1-1-1",
                title: "Text Sanitization",
                description:
                  "Removing potentially harmful or invalid characters.",
                children: [
                  {
                    id: "1-1-1-1-1",
                    title: "Special Character Handling",
                    description:
                      "Processing of non-alphanumeric characters in the input.",
                  },
                  {
                    id: "1-1-1-1-2",
                    title: "Encoding Verification",
                    description:
                      "Ensuring proper text encoding for model input.",
                  },
                ],
              },
              {
                id: "1-1-1-2",
                title: "Language Detection",
                description:
                  "Identifying the primary language of the input text.",
                children: [
                  {
                    id: "1-1-1-2-1",
                    title: "Language Confidence Score",
                    description: "Probability metrics for detected language.",
                  },
                  {
                    id: "1-1-1-2-2",
                    title: "Multilingual Handling",
                    description: "Processing for text with multiple languages.",
                  },
                ],
              },
            ],
          },
          {
            id: "1-1-2",
            title: "Context Assembly",
            description: "Building context window with relevant information.",
            children: [
              {
                id: "1-1-2-1",
                title: "Retrieval Augmentation",
                description: "Adding external knowledge to the context.",
                children: [
                  {
                    id: "1-1-2-1-1",
                    title: "Vector Search Operation",
                    description:
                      "Semantic similarity lookup in vector database.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        title: "Model Inference",
        description: "Core language model token generation process.",
        children: [
          {
            id: "1-2-1",
            title: "Token Generation",
            description: "Iterative production of output tokens by the model.",
            children: [
              {
                id: "1-2-1-1",
                title: "Sampling Operation",
                description: "Probabilistic selection of next tokens.",
                children: [
                  {
                    id: "1-2-1-1-1",
                    title: "Temperature Application",
                    description:
                      "Applying randomness factor to token distribution.",
                  },
                ],
              },
            ],
          },
          {
            id: "1-2-2",
            title: "Model Performance Metrics",
            description: "Performance data collected during inference.",
            children: [
              {
                id: "1-2-2-1",
                title: "Latency Measurements",
                description: "Timing data for model inference operations.",
                children: [
                  {
                    id: "1-2-2-1-1",
                    title: "Token-wise Timing",
                    description: "Per-token generation speed metrics.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Function Calling Execution",
    description:
      "Trace of the AI system invoking external tools and functions.",
    children: [
      {
        id: "2-1",
        title: "Tool Selection",
        description:
          "Decision process for choosing appropriate external function.",
        children: [
          {
            id: "2-1-1",
            title: "Function Matching",
            description:
              "Determining which function best satisfies the request.",
            children: [
              {
                id: "2-1-1-1",
                title: "Parameter Extraction",
                description:
                  "Identifying required parameters from user context.",
                children: [
                  {
                    id: "2-1-1-1-1",
                    title: "Type Validation",
                    description:
                      "Verifying parameter types match function signature.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2-2",
        title: "External API Call",
        description: "Execution of function call to third-party service.",
        children: [
          {
            id: "2-2-1",
            title: "HTTP Request",
            description: "Network operation to external service endpoint.",
            children: [
              {
                id: "2-2-1-1",
                title: "Response Processing",
                description: "Handling and parsing of the API response.",
                children: [
                  {
                    id: "2-2-1-1-1",
                    title: "Error Handling",
                    description:
                      "Processing of error conditions from external service.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Response Post-processing",
    description: "Final processing and delivery of AI-generated content.",
    children: [
      {
        id: "3-1",
        title: "Content Filtering",
        description: "Safety and policy enforcement on generated text.",
        children: [
          {
            id: "3-1-1",
            title: "Policy Evaluation",
            description: "Checking output against content policies.",
            children: [
              {
                id: "3-1-1-1",
                title: "Toxicity Detection",
                description: "Identifying potentially harmful content.",
                children: [
                  {
                    id: "3-1-1-1-1",
                    title: "Category Classification",
                    description:
                      "Specific toxicity categories identified in content.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
