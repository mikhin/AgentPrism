import type { ReactElement } from "react";

import { Badge } from "ai-agent-trace-ui-core";

import { SandboxItem } from "../components/SandboxItem.tsx";
import { SandboxSection } from "../components/SandboxSection";

export const BadgePage = (): ReactElement => {
  return (
    <div className="space-y-8">
      <SandboxSection
        title="Badge Themes"
        description="Different visual themes for badges"
      >
        <SandboxItem title="Purple">
          <Badge theme="purple">Model Call</Badge>
        </SandboxItem>
        <SandboxItem title="Indigo">
          <Badge theme="indigo">Agent Call</Badge>
        </SandboxItem>
        <SandboxItem title="Orange">
          <Badge theme="orange">Tool Call</Badge>
        </SandboxItem>
        <SandboxItem title="Teal">
          <Badge theme="teal">Workflow Call</Badge>
        </SandboxItem>
        <SandboxItem title="Cyan">
          <Badge theme="cyan">Planning Call</Badge>
        </SandboxItem>
        <SandboxItem title="Sky">
          <Badge theme="sky">Memory Call</Badge>
        </SandboxItem>
        <SandboxItem title="Yellow">
          <Badge theme="yellow">Reflection Call</Badge>
        </SandboxItem>
        <SandboxItem title="Emerald">
          <Badge theme="emerald">Retrieval Call</Badge>
        </SandboxItem>
        <SandboxItem title="Red">
          <Badge theme="red">Guardrail Call</Badge>
        </SandboxItem>
        <SandboxItem title="Gray">
          <Badge theme="gray">Neutral</Badge>
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="Badge Sizes"
        description="Different size options for badges"
      >
        <SandboxItem title="Extra Small">
          <Badge size="xs" theme="gray">
            XS Badge
          </Badge>
        </SandboxItem>
        <SandboxItem title="Small">
          <Badge size="sm" theme="gray">
            Small Badge
          </Badge>
        </SandboxItem>
        <SandboxItem title="Medium">
          <Badge size="md" theme="gray">
            Medium Badge
          </Badge>
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
