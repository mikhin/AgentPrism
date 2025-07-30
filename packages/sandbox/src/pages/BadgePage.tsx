import type { ReactElement } from "react";

import { Badge } from "ai-agent-trace-ui-core";
import {
  Brain,
  Bot,
  Wrench,
  Workflow,
  CalendarClock,
  Database,
  Landmark,
  Search,
  ShieldAlert,
} from "lucide-react";

import { SandboxItem } from "../components/SandboxItem.tsx";
import { SandboxSection } from "../components/SandboxSection";

export const BadgePage = (): ReactElement => {
  return (
    <div className="space-y-8">
      <SandboxSection
        title="Badge Colors"
        description="Color themes without icons"
      >
        <SandboxItem title="Purple">
          <Badge theme="purple">Purple</Badge>
        </SandboxItem>
        <SandboxItem title="Indigo">
          <Badge theme="indigo">Indigo</Badge>
        </SandboxItem>
        <SandboxItem title="Orange">
          <Badge theme="orange">Orange</Badge>
        </SandboxItem>
        <SandboxItem title="Teal">
          <Badge theme="teal">Teal</Badge>
        </SandboxItem>
        <SandboxItem title="Cyan">
          <Badge theme="cyan">Cyan</Badge>
        </SandboxItem>
        <SandboxItem title="Sky">
          <Badge theme="sky">Sky</Badge>
        </SandboxItem>
        <SandboxItem title="Yellow">
          <Badge theme="yellow">Yellow</Badge>
        </SandboxItem>
        <SandboxItem title="Emerald">
          <Badge theme="emerald">Emerald</Badge>
        </SandboxItem>
        <SandboxItem title="Red">
          <Badge theme="red">Red</Badge>
        </SandboxItem>
        <SandboxItem title="Gray">
          <Badge theme="gray">Gray</Badge>
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="Badges with Icons"
        description="Theme colors with iconStart"
      >
        <SandboxItem title="Purple">
          <Badge theme="purple" iconStart={<Brain className="h-3.5 w-3.5" />}>
            Model
          </Badge>
        </SandboxItem>
        <SandboxItem title="Indigo">
          <Badge theme="indigo" iconStart={<Bot className="h-3.5 w-3.5" />}>
            Agent
          </Badge>
        </SandboxItem>
        <SandboxItem title="Orange">
          <Badge theme="orange" iconStart={<Wrench className="h-3.5 w-3.5" />}>
            Tool
          </Badge>
        </SandboxItem>
        <SandboxItem title="Teal">
          <Badge theme="teal" iconStart={<Workflow className="h-3.5 w-3.5" />}>
            Workflow
          </Badge>
        </SandboxItem>
        <SandboxItem title="Cyan">
          <Badge
            theme="cyan"
            iconStart={<CalendarClock className="h-3.5 w-3.5" />}
          >
            Planning
          </Badge>
        </SandboxItem>
        <SandboxItem title="Sky">
          <Badge theme="sky" iconStart={<Database className="h-3.5 w-3.5" />}>
            Memory
          </Badge>
        </SandboxItem>
        <SandboxItem title="Yellow">
          <Badge
            theme="yellow"
            iconStart={<Landmark className="h-3.5 w-3.5" />}
          >
            Reflection
          </Badge>
        </SandboxItem>
        <SandboxItem title="Emerald">
          <Badge theme="emerald" iconStart={<Search className="h-3.5 w-3.5" />}>
            Retrieval
          </Badge>
        </SandboxItem>
        <SandboxItem title="Red">
          <Badge
            theme="red"
            iconStart={<ShieldAlert className="h-3.5 w-3.5" />}
          >
            Guardrail
          </Badge>
        </SandboxItem>
        <SandboxItem title="Gray">
          <Badge theme="gray" iconStart={<Bot className="h-3.5 w-3.5" />}>
            Neutral
          </Badge>
        </SandboxItem>
      </SandboxSection>

      <SandboxSection title="Badge Sizes" description="Different size options">
        <SandboxItem title="Extra Small">
          <Badge size="xs" theme="gray" iconStart={<Bot className="h-3 w-3" />}>
            XS Badge
          </Badge>
        </SandboxItem>
        <SandboxItem title="Small">
          <Badge
            size="sm"
            theme="gray"
            iconStart={<Bot className="h-3.5 w-3.5" />}
          >
            Small Badge
          </Badge>
        </SandboxItem>
        <SandboxItem title="Medium">
          <Badge size="md" theme="gray" iconStart={<Bot className="h-4 w-4" />}>
            Medium Badge
          </Badge>
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
