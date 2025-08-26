import type { Meta, StoryObj } from "@storybook/react-vite";

import { Filters, FiltersSource } from "ai-agent-trace-ui-core";
import { useState } from "react";

const meta = {
  title: "Components/Filters",
  component: Filters,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${FiltersSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The title for the filters",
      defaultValue: "Tree View Details",
    },
    items: {
      control: { type: "object" },
      description:
        "Array of filter items with value, label, and selected state",
      defaultValue: [
        { value: "option1", label: "Option 1", selected: false },
        { value: "option2", label: "Option 2", selected: true },
        { value: "option3", label: "Option 3", selected: false },
      ],
    },
    onChange: {
      action: "changed",
      description: "Callback function when filter selection changes",
    },
    buttonProps: {
      control: { type: "object" },
      description:
        "Additional props for the IconButton (excluding aria-label and onClick)",
      defaultValue: {},
    },
  },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Tree View Details",
    items: [
      { value: "option1", label: "Option 1", selected: false },
      { value: "option2", label: "Option 2", selected: true },
      { value: "option3", label: "Option 3", selected: false },
    ],
    onChange: (value, selected) =>
      console.log("Filter changed:", value, selected),
  },

  render: (args) => {
    const [items, setItems] = useState(
      args.items.map((item) => ({
        ...item,
        selected: false,
      })),
    );

    function onChange(value: string, selected: boolean) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.value === value ? { ...item, selected } : item,
        ),
      );
    }

    return <Filters {...args} items={items} onChange={onChange} />;
  },
};

export const WithCustomButtonProps: Story = {
  args: {
    title: "Custom Filters",
    items: [
      { value: "status", label: "Status", selected: true },
      { value: "priority", label: "Priority", selected: false },
      { value: "category", label: "Category", selected: false },
    ],
    onChange: (value, selected) =>
      console.log("Filter changed:", value, selected),
    buttonProps: {
      size: "md",
      variant: "ghost",
    },
  },
  render: (args) => {
    const [items, setItems] = useState(
      args.items.map((item) => ({
        ...item,
        selected: false,
      })),
    );

    function onChange(value: string, selected: boolean) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.value === value ? { ...item, selected } : item,
        ),
      );
    }

    return <Filters {...args} items={items} onChange={onChange} />;
  },
};
