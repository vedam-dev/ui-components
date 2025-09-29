import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../../component/atom/typography';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atom/Typography',
  component: Typography,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'H1',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'H2',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'H3',
  },
};

export const H4: Story = {
  args: {
    variant: 'h4',
    children: 'H4',
  },
};

export const H5: Story = {
  args: {
    variant: 'h5',
    children: 'H5',
  },
};

export const H6: Story = {
  args: {
    variant: 'h6',
    children: 'H6',
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
    children: 'Button',
  },
};
export const ButtonS: Story = {
  args: {
    isButtonS: true,
    variant: 'button',
    children: 'Button S',
  },
};
export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle1',
  },
};

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'Subtitle2',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body1',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body2',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'overline',
  },
};
