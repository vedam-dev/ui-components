import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../../component/atom/chip';
import { Avatar } from '@mui/material';
import { Done, Delete } from '@mui/icons-material';

const meta = {
  title: 'Atom/Chip',
  component: Chip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Chip',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Chip',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Chip',
    variant: 'outlined',
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Chip',
    size: 'small',
  },
};

export const Clickable: Story = {
  args: {
    label: 'Clickable Chip',
    clickable: true,
    color: 'info',
  },
};

export const WithAvatar: Story = {
  args: {
    label: 'With Avatar',
    avatar: <Avatar>A</Avatar>,
    color: 'success',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: <Done />,
    color: 'warning',
  },
};

export const Deletable: Story = {
  args: {
    label: 'Deletable Chip',
    onDelete: () => alert('Delete clicked'),
    color: 'error',
  },
};

export const CustomDeleteIcon: Story = {
  args: {
    label: 'Custom Delete',
    onDelete: () => alert('Delete clicked'),
    deleteIcon: <Delete />,
    color: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Chip',
    disabled: true,
  },
};