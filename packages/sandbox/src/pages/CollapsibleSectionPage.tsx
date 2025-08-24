import { CollapsibleSection } from "ai-agent-trace-ui-core";
import { type FC } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";

export const CollapsibleSectionPage: FC = () => {
  return (
    <div className="p-8">
      <SandboxSection
        title="Collapsible Section Component"
        description="A flexible collapsible component with customizable styling and behavior."
      >
        <SandboxItem title="Basic Usage (title + children)" pattern="dots">
          <CollapsibleSection title="Basic Section">
            <p>This shows the minimum required props: title and children.</p>
            <p className="mt-2">
              Default behavior: starts closed, standard styling.
            </p>
          </CollapsibleSection>
        </SandboxItem>

        <SandboxItem title="defaultOpen: true" pattern="grid">
          <CollapsibleSection title="Initially Open Section" defaultOpen={true}>
            <p>This section demonstrates the defaultOpen prop set to true.</p>
            <p className="mt-2">
              It starts expanded when the component mounts.
            </p>
          </CollapsibleSection>
        </SandboxItem>

        <SandboxItem title="className: Custom Container" pattern="dots">
          <CollapsibleSection
            title="Custom Container Styling"
            className="border-2 border-red-400 bg-red-50 shadow-lg"
          >
            <p>This demonstrates the className prop for the main container.</p>
            <p className="mt-2">
              Red border, background, and enhanced shadow applied.
            </p>
          </CollapsibleSection>
        </SandboxItem>

        <SandboxItem title="triggerClassName: Custom Header" pattern="grid">
          <CollapsibleSection
            title="Custom Header Styling"
            triggerClassName="bg-green-200 text-green-800 font-bold hover:bg-green-300 rounded-t-lg"
          >
            <p>This shows the triggerClassName prop for header styling.</p>
            <p className="mt-2">
              Green background, bold text, and rounded top corners.
            </p>
          </CollapsibleSection>
        </SandboxItem>

        <SandboxItem title="contentClassName: Custom Content" pattern="dots">
          <CollapsibleSection
            title="Custom Content Styling"
            contentClassName="bg-purple-100 border-t-2 border-purple-400"
          >
            <p>This demonstrates the contentClassName prop for content area.</p>
            <p className="mt-2">
              Purple background with top border applied to content.
            </p>
          </CollapsibleSection>
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
