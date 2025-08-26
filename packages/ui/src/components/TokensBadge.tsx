import { Coins } from "lucide-react";

import { Badge, type BadgeProps } from "./Badge";

interface TokensBadgeProps {
  tokensCount: number;
  size?: BadgeProps["size"];
}

export const TokensBadge = ({ tokensCount, size = "xs" }: TokensBadgeProps) => {
  return (
    <Badge iconStart={<Coins className="size-2.5" />} theme="gray" size={size}>
      {tokensCount}
    </Badge>
  );
};
