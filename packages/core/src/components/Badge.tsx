import type { PropsWithChildren, ReactElement, ReactNode } from "react";

type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "solid";

interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant;
  size?: "sm" | "md" | "xs";
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
}

const variants = {
  primary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  neutral: "bg-gray-100 text-gray-800",
  solid: "bg-gray-500 text-white",
};

const sizes = {
  xs: "text-xs px-1.5 py-1 h-3.5",
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
};

const textSizes = {
  xs: "text-xs font-normal leading-3",
  sm: "text-xs font-medium",
  md: "text-sm font-medium",
};

export const Badge = ({
  children,
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  className,
}: BadgeProps): ReactElement => {
  return (
    <span
      className={`inline-flex max-w-full items-center overflow-hidden text-ellipsis whitespace-nowrap rounded font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {iconStart && iconStart}

      <span className={`${textSizes[size]} tracking-normal`}>{children}</span>

      {iconEnd && iconEnd}
    </span>
  );
};
