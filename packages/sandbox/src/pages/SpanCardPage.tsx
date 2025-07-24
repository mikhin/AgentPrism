import { SpanCard } from "ai-agent-trace-ui-core";
import { type ReactElement } from "react";

import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const SpanCardPage = (): ReactElement => {
  return (
    <div>
      <SpanCard data={sampleTreeViewData[0]} level={0} />
    </div>
  );
};
