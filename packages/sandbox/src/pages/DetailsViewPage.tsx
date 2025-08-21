import { DetailsView, type SpanCardType } from "ai-agent-trace-ui-core";
import { type ReactElement } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";

export const DetailsViewPage = (): ReactElement => {
  const testData: SpanCardType = {
    id: "test-span",
    title: "ChatCompletion",
    attributes: [
      { key: "Input", value: { stringValue: "gpt-4" } },
      { key: "prompt_tokens", value: { intValue: "1000" } },
      { key: "completion_tokens", value: { intValue: "500" } },
      { key: "total_tokens", value: { intValue: "1500" } },
      { key: "user_id", value: { stringValue: "user123" } },
    ],
    startTime: new Date("2023-01-01T00:00:00Z"),
    endTime: new Date("2023-01-01T00:05:00Z"),
    tokensCount: 500,
    type: "llm_call",
    duration: 300,
    status: "success",
    cost: 10,
  };

  return (
    <div className="p-8">
      <SandboxSection
        title="Details View Component"
        description="A detailed view for displaying span information, including attributes, events, and links."
      >
        <SandboxItem title="Basic Details View" pattern="dots">
          <DetailsView
            data={testData}
            avatar={{
              letter: "A",
              bgColor: "purple",
              size: "sm",
            }}
          />
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
