import type { ComponentPropsWithRef } from "react";

import { Badge, type BadgeProps } from "./Badge";

export type TimestampBadgeProps = ComponentPropsWithRef<"span"> & {
  timestamp: number;
  size?: BadgeProps["size"];
};

export const TimestampBadge = ({
  timestamp,
  size = "xs",
  ...rest
}: TimestampBadgeProps) => {
  return (
    <Badge
      theme="gray"
      size={size}
      {...rest}
      label={formatTimestamp(timestamp)}
    />
  );
};

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}
