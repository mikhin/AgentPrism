import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarSource } from "ai-agent-trace-ui-core";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${AvatarSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "The image source for the avatar",
    },
    alt: {
      control: "text",
      description: "The alt text for the avatar",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the avatar",
      defaultValue: "md",
    },
    letter: {
      control: "text",
      description:
        "Custom letter to display (will use first letter of alt if not provided)",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the avatar",
      defaultValue: "full",
    },
    bgColor: {
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
      description: "Background color theme for the letter avatar",
      defaultValue: "gray",
    },
    textColor: {
      control: { type: "select" },
      options: ["white", "black"],
      description: "Text color for the letter avatar",
      defaultValue: "white",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with image
export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Sarah Johnson",
    size: "md",
  },
};

// Letter avatar when no image is provided
export const LetterAvatar: Story = {
  args: {
    letter: "JD",
    alt: "John Doe",
    bgColor: "indigo",
    size: "md",
  },
};

// Automatically uses first letter of alt when no letter is provided
export const AutoLetter: Story = {
  args: {
    alt: "Alice Cooper",
    bgColor: "purple",
    size: "md",
  },
};

// All available sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" alt="Extra Small" bgColor="gray" />
      <Avatar size="sm" alt="Small" bgColor="red" />
      <Avatar size="md" alt="Medium" bgColor="orange" />
      <Avatar size="lg" alt="Large" bgColor="teal" />
      <Avatar size="xl" alt="Extra Large" bgColor="indigo" />
    </div>
  ),
};

// Different color variants for letter avatars
export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar alt="Gray" bgColor="gray" />
      <Avatar alt="Red" bgColor="red" />
      <Avatar alt="Orange" bgColor="orange" />
      <Avatar alt="Yellow" bgColor="yellow" textColor="black" />
      <Avatar alt="Teal" bgColor="teal" />
      <Avatar alt="Indigo" bgColor="indigo" />
      <Avatar alt="Purple" bgColor="purple" />
      <Avatar alt="Sky" bgColor="sky" />
      <Avatar alt="Cyan" bgColor="cyan" />
      <Avatar alt="Emerald" bgColor="emerald" />
    </div>
  ),
};

// Different border radius options
export const RoundedVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar alt="None" rounded="none" bgColor="gray" />
      <Avatar alt="Small" rounded="sm" bgColor="red" />
      <Avatar alt="Medium" rounded="md" bgColor="orange" />
      <Avatar alt="Large" rounded="lg" bgColor="teal" />
      <Avatar alt="Full" rounded="full" bgColor="indigo" />
    </div>
  ),
};
