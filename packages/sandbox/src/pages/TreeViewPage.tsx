import { SpanCardsList } from "ai-agent-trace-ui-core";
import { useState, type ReactElement } from "react";

import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const TreeViewPage = (): ReactElement => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    undefined,
  );

  return (
    <div>
      <strong>Selected:</strong> Card ID {selectedCardId}
      <SpanCardsList
        spans={sampleTreeViewData}
        onSelectionChange={setSelectedCardId}
        initialSelectedId={selectedCardId}
      />
    </div>
  );
};
