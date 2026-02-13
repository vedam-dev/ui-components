import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Chip } from '../../../component/atom/chip';
import { IChipProps } from '@component/atom/chip/Chip';
import { Avatar } from '@mui/material';
import { Done, Delete } from '@mui/icons-material';

const meta: Meta<IChipProps> = {
  title: 'Atom/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
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
      options: ['filled', 'outlined', 'success', 'error', 'warning'],
    },
    label: { control: 'text' },
    // onClick: { action: 'clicked' },
    // onDelete: { action: 'deleted' },
  },
};

export default meta;

type Story = StoryObj<IChipProps>;

export const Default: Story = {
  args: { label: 'Default Chip' },
};

export const Primary: Story = {
  args: { label: 'Primary Chip', color: 'primary' },
};

export const Outlined: Story = {
  args: { label: 'Outlined Chip', variant: 'outlined', color: 'secondary' },
};

export const Small: Story = {
  args: { label: 'Small Chip', size: 'small' },
};

export const Clickable: Story = {
  args: { label: 'Clickable Chip', clickable: true, color: 'info' },
};

export const WithAvatar: Story = {
  args: { label: 'With Avatar', avatar: <Avatar>A</Avatar>, color: 'success' },
};

export const WithIcon: Story = {
  args: { label: 'With Icon', icon: <Done />, color: 'warning' },
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
  args: { label: 'Disabled Chip', disabled: true },
};

export const Success: Story = {
  args: { label: 'Success Chip', variant: 'success' },
};

export const ErrorChip: Story = {
  args: { label: 'Error Chip', variant: 'error' },
};

export const Warning: Story = {
  args: { label: 'Warning Chip', variant: 'warning' },
};
