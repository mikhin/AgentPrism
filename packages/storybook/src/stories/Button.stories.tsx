import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Button } from "./Button";
// Import the actual source code as raw string
import ButtonSource from "./Button.tsx?raw";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

// Add story to show component source code
export const SourceCode: Story = {
  render: () => (
    <div style={{ fontFamily: "monospace" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Button primary label="Example Button" />
      </div>
      <div>
        <h3 style={{ fontFamily: "sans-serif" }}>📋 Component Source Code</h3>
        <p style={{ fontFamily: "sans-serif" }}>
          Copy this complete implementation into your project:
        </p>
        <pre
          style={{
            backgroundColor: "#f6f8fa",
            border: "1px solid #d1d9e0",
            borderRadius: "6px",
            padding: "16px",
            overflow: "auto",
            fontSize: "14px",
            lineHeight: "1.45",
          }}
        >
          <code>{ButtonSource}</code>
        </pre>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Complete Button component source code ready to copy and paste into your project.",
      },
    },
  },
};
