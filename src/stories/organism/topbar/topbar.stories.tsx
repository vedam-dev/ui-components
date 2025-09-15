import type { Meta, StoryObj } from "@storybook/react";
import TopBar from "../../../component/organism/topbar/TopBar";
import { School } from "@mui/icons-material";

const meta: Meta<typeof TopBar> = {
  title: "Organism/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  argTypes: {
    collegeLogo: {
      control: {
        type: "select",
        options: ["default", "custom", "image"],
        mapping: {
          default: undefined,
          custom: <School fontSize="large" color="primary" />,
          image: "https://via.placeholder.com/40",
        },
      },
      description: "College logo (ReactNode or image URL)",
    },

    studentId: {
      control: "text",
      description: "Student identification number",
    },
    studentName: {
      control: "text",
      description: "Full name of the student",
    },
    studentPhoto: {
      control: {
        type: "select",
        options: ["none", "image"],
        mapping: {
          none: undefined,
          image: "https://via.placeholder.com/40",
        },
      },
      description: "URL of student profile photo",
    },
    streakCount: {
      control: { type: "number", min: 0 },
      description: "Number of days in current streak",
    },
    coinCount: {
      control: { type: "number", min: 0 },
      description: "Number of coins/points earned",
    },
    notificationCount: {
      control: { type: "number", min: 0 },
      description: "Number of notifications",
      defaultValue: 0,
    },
    onLogoClick: { action: "logoClicked" },
    onProfileClick: { action: "profileClicked" },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  args: {
    studentId: "VED2025",
    studentName: "Sameeksha Kapoor",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    streakCount: 120,
    coinCount: 4500,
    notificationCount: 3,
  },
};

export const Custom_Logo: Story = {
  args: {
    collegeLogo: 'https://via.placeholder.com/40',
    studentId: "ENG2024",
    studentName: "Alex Johnson",
    studentPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    streakCount: 120,
    coinCount: 4500,
    hideHamburger:true,
  },
};

