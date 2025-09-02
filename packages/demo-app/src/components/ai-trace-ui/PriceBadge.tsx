import { Badge, type BadgeProps } from "./Badge";

interface PriceBadgeProps {
  cost: number;
  size?: BadgeProps["size"];
}

export const PriceBadge = ({ cost, size = "xs" }: PriceBadgeProps) => {
  return (
    <Badge theme="gray" size={size}>
      $ {cost}
    </Badge>
  );
};
