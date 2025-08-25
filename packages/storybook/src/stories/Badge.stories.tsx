import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, BadgeSource } from "ai-agent-trace-ui-core";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${BadgeSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "select" },
      options: [
        "gray",
        "red",
        "orange",
        "yellow",
        "teal",
        "indigo",
        "purple",
        "sky",
        "cyan",
        "emerald",
      ],
      description: "The color theme of the badge",
      defaultValue: "gray",
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "outline"],
      description: "The visual variant of the badge",
      defaultValue: "solid",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md"],
      description: "The size of the badge",
      defaultValue: "md",
    },
    children: {
      control: "text",
      description: "The content of the badge",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic badge
export const Default: Story = {
  args: {
    children: "Badge",
    theme: "gray",
  },
};

// Size prop
export const Size: Story = {
  args: {
    children: "Small",
    theme: "indigo",
    size: "sm",
  },
};

// Variant prop
export const Variant: Story = {
  args: {
    children: "Outline",
    theme: "indigo",
    variant: "outline",
  },
};

// Theme prop
export const Theme: Story = {
  args: {
    children: "Red",
    theme: "red",
  },
};

// IconStart prop
export const IconStart: Story = {
  args: {
    children: "Start",
    theme: "emerald",
    iconStart: <span>✓</span>,
  },
};

// IconEnd prop
export const IconEnd: Story = {
  args: {
    children: "End",
    theme: "orange",
    iconEnd: <span>→</span>,
  },
};
