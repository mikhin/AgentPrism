import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch, SwitchSource } from "ai-agent-trace-ui-core";
import { useState } from "react";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${SwitchSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "Whether the switch is checked/on",
      defaultValue: false,
    },
    valueLabel: {
      control: { type: "text" },
      description: "The label for the aria-label (used for accessibility)",
      defaultValue: "option",
    },
    onChange: {
      action: "changed",
      description: "Callback function when switch state changes",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    valueLabel: "option",
    onChange: (checked) => console.log("Switch changed:", checked),
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    valueLabel: "option",
    onChange: (checked) => console.log("Switch changed:", checked),
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const WithCustomLabel: Story = {
  args: {
    checked: false,
    valueLabel: "notifications",
    onChange: (checked) => console.log("Switch changed:", checked),
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Interactive: Story = {
  args: {
    checked: false,
    valueLabel: "feature",
    onChange: (checked) => console.log("Switch changed:", checked),
  },
  parameters: {
    docs: {
      description: {
        story:
          "This switch is interactive - you can click it to toggle the state.",
      },
    },
  },
};
