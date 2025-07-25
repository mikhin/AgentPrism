import { SpanCard, SpanCardsList } from "ai-agent-trace-ui-core";
import { useState, type ReactElement } from "react";

import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const TreeViewPage = (): ReactElement => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    undefined,
  );

  return (
    <div>
      <SpanCardsList>
        {sampleTreeViewData.map((span) => (
          <SpanCard
            key={span.id}
            data={span}
            level={0}
            selectedCardId={selectedCardId}
            onSelectionChange={(id, isSelected) => {
              setSelectedCardId(isSelected ? id : undefined);
              console.log(`Card ${id} selection changed to ${isSelected}`);
            }}
          />
        ))}
      </SpanCardsList>
    </div>
  );
};
