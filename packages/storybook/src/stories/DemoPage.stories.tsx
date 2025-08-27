import type { Meta, StoryObj } from "@storybook/react-vite";

import { DemoPage } from "../components/DemoPage";

export const DemoPageStory: Story = {};

const meta: Meta<typeof DemoPage> = {
  title: "Pages/DemoPage",
  component: DemoPage,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof DemoPage>;
