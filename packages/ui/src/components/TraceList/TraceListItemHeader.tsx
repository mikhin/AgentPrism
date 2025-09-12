import type { TraceRecord } from "@evilmartians/agent-prism-types";

import { formatDuration } from "@evilmartians/agent-prism-data";

import { Avatar, type AvatarProps } from "../Avatar.tsx";
import { Badge } from "../Badge.tsx";

interface TraceListItemHeaderProps {
  trace: TraceRecord;
  avatar?: AvatarProps;
}

export const TraceListItemHeader = ({
  trace,
  avatar,
}: TraceListItemHeaderProps) => {
  return (
    <header className="flex min-w-0 flex-wrap items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
        {avatar && <Avatar {...avatar} />}

        <h3 className="font-regular max-w-full truncate text-sm text-gray-950 dark:text-gray-200">
          {trace.name}
        </h3>
      </div>

      <div className="flex items-center gap-2">
        <Badge size="sm" theme="gray" variant="outline" label={trace.spansCount === 1 ? "1 span" : `${trace.spansCount} spans`} />

        <Badge size="sm" theme="gray" variant="outline" label={formatDuration(trace.durationMs)} />
      </div>
    </header>
  );
};
