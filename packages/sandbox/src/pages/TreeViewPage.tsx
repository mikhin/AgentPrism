import { SpanCardsList } from "ai-agent-trace-ui-core";
import { useState, type ReactElement } from "react";

import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const TreeViewPage = (): ReactElement => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-gray-50 p-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {selectedCardId && (
          <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              <strong>Selected:</strong> Card ID {selectedCardId}
            </p>
          </div>
        )}

        <SpanCardsList
          spans={sampleTreeViewData}
          onSelectionChange={setSelectedCardId}
          initialSelectedId={selectedCardId}
        />
      </div>
    </div>
  );
};
