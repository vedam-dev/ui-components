import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../../component/atom/avatar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atom/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Letter: Story = {
  args: {
    children: 'XD',
    backgroundColor: 'primary'
  }
};

export const Image: Story = {
  args: {
    src: '/1.png',
    children: 'VD',
    backgroundColor: 'secondary'
  }
};

export const Square: Story = {
  args: {
    variant: 'square',
    children: 'VD',
    backgroundColor: 'error'
  }
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    children: 'VD',
    backgroundColor: 'success'
  }
};
