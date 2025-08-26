import { TreeView } from "ai-agent-trace-ui-core";
import { type ReactElement } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";
import { sampleTreeViewDataDeepNesting } from "../data/sample-tree-view-data-deep-nesting.ts";
import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const TreeViewPage = (): ReactElement => {
  return (
    <div className="p-8">
      <SandboxSection
        title="Tree View Component"
        description="A hierarchical tree view for displaying span data with selection functionality and span count."
      >
        <SandboxItem title="Basic Tree View" pattern="dots">
          <TreeView
            expandButton="inside"
            spans={sampleTreeViewData}
            onSpanSelect={(span) => console.log(`Selected span: ${span.id}`)}
            expandedSpansIds={[]}
            onExpandSpansIdsChange={() => {}}
          />
        </SandboxItem>

        <SandboxItem title="Tree View with Initial Selection" pattern="grid">
          <TreeView
            expandButton="inside"
            spans={sampleTreeViewData}
            selectedSpan={sampleTreeViewData[1]}
            onSpanSelect={(span) => console.log(`Selected span: ${span.id}`)}
            expandedSpansIds={[]}
            onExpandSpansIdsChange={() => {}}
          />
        </SandboxItem>

        <SandboxItem title="Tree View with deep nesting" pattern="dots">
          <TreeView
            expandButton="inside"
            spans={sampleTreeViewDataDeepNesting}
            onSpanSelect={(span) => console.log(`Selected span: ${span.id}`)}
            expandedSpansIds={[]}
            onExpandSpansIdsChange={() => {}}
          />
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
