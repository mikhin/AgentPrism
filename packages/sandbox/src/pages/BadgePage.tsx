import type { ReactElement } from "react";

import { Badge } from "ai-agent-trace-ui-core";

export const BadgePage = (): ReactElement => {
  return (
    <div className="space-y-8 p-6">
      <section>
        <h2 className="mb-4 text-xl font-bold">Badge Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Badge Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </div>
      </section>
    </div>
  );
};
