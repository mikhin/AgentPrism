import type { Meta, StoryObj } from "@storybook/react-vite";

import { PriceBadge, PriceBadgeSource } from "@ai-agent-trace-ui/ui";

const meta = {
  title: "Atoms/PriceBadge",
  component: PriceBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${PriceBadgeSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    cost: {
      control: { type: "number" },
      description: "The cost amount to display",
      defaultValue: 0.5,
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md"],
      description: "The size of the badge",
      defaultValue: "xs",
    },
  },
} satisfies Meta<typeof PriceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cost: 0.5,
  },
};
