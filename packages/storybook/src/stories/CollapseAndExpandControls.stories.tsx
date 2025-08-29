import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ExpandAllButton,
  CollapseAllButton,
  CollapseAndExpandControlsSource,
} from "@ai-agent-trace-ui/ui";

// Create a wrapper component for the meta since we have two related components
const ControlsWrapper = () => null;

const meta = {
  title: "Atoms/CollapseAndExpandControls",
  component: ControlsWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${CollapseAndExpandControlsSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ControlsWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// ExpandAllButton component
export const ExpandAll: Story = {
  render: () => (
    <ExpandAllButton onExpandAll={() => console.log("Expand all clicked")} />
  ),
};

// CollapseAllButton component
export const CollapseAll: Story = {
  render: () => (
    <CollapseAllButton
      onCollapseAll={() => console.log("Collapse all clicked")}
    />
  ),
};

// Both buttons together
export const BothControls: Story = {
  render: () => (
    <div className="flex gap-2">
      <ExpandAllButton onExpandAll={() => console.log("Expand all clicked")} />
      <CollapseAllButton
        onCollapseAll={() => console.log("Collapse all clicked")}
      />
    </div>
  ),
};
