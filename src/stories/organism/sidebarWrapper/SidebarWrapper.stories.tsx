// SidebarWrapper.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SidebarWrapper from "../../../component/organism/sidebarWrapper/SidebarWrapper";

export default {
  title: "Organism/SidebarWrapper",
  component: SidebarWrapper,
} as Meta<typeof SidebarWrapper>;

type Story = StoryObj<typeof SidebarWrapper>;

export const Default: Story = {
  render: () => <SidebarWrapper />,
};
