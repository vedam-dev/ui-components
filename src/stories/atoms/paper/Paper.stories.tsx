import type { Meta, StoryObj } from '@storybook/react';
import { Paper } from '../../../component/atom/paper';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atom/Paper',
  component: Paper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Y16Shadow: Story = {
  args: {
    shadow: 'y16',
    children: 'Y16Shadow',
    sx: {
      padding: '20px',
    },
  },
};

export const Y12Shadow: Story = {
  args: {
    shadow: 'y12',
    children: 'Y12Shadow',
    sx: {
      padding: '20px',
    },
  },
};

export const Y8Shadow: Story = {
  args: {
    shadow: 'y8',
    children: 'Y8Shadow',
    sx: {
      padding: '20px',
    },
  },
};

export const NoShadow: Story = {
  args: {
    shadow: 'none',
    children: 'NoShadow',
    sx: {
      padding: '20px',
    },
  },
};
