import type { Meta, StoryObj } from "@storybook/react-vite";

import { TokensBadge } from "ai-agent-trace-ui-core";

const TokensBadgeSource = `
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
`;

const meta = {
  title: "Components/TokensBadge",
  component: TokensBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${TokensBadgeSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tokensCount: {
      control: { type: "number" },
      description: "The number of tokens to display",
      defaultValue: 1500,
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md"],
      description: "The size of the badge",
      defaultValue: "xs",
    },
  },
} satisfies Meta<typeof TokensBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tokensCount: 1500,
  },
};

export const Small: Story = {
  args: {
    tokensCount: 2500,
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    tokensCount: 5000,
    size: "md",
  },
};

export const LargeTokenCount: Story = {
  args: {
    tokensCount: 15000,
    size: "md",
  },
};
