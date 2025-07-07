import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../../component/atom/checkbox';
import { FormControlLabel } from '@mui/material';

const meta = {
  title: 'Atom/Checkbox',
  component: Checkbox,
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
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    checked: true
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <FormControlLabel
      control={<Checkbox {...args} />}
      label="Checkbox Label"
    />
  ),
  args: {
    color: 'primary',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const SuccessColor: Story = {
  args: {
    color: 'success',
  },
};

export const ErrorColor: Story = {
  args: {
    color: 'error',
  },
};