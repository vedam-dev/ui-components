import type { Meta, StoryObj } from '@storybook/react';
import Select from '../../../component/atom/dropdown/Select';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const meta = {
  title: 'Atom/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable Select component built on Material-UI, supporting single and multiple selection with various styles and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = (args): React.ReactElement => (
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="select-label">Label</InputLabel>
    <Select {...args} labelId="select-label" label="Label">
      <MenuItem value={10}>Option 1</MenuItem>
      <MenuItem value={20}>Option 2</MenuItem>
      <MenuItem value={30}>Option 3</MenuItem>
    </Select>
  </FormControl>
);

export const Primary: Story = {
  render: Template,
  args: {
    color: 'primary',
  },
};

export const Secondary: Story = {
  render: Template,
  args: {
    color: 'secondary',
  },
};

export const Small: Story = {
  render: Template,
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  render: Template,
  args: {
    size: 'medium',
  },
};

export const FilledVariant: Story = {
  render: Template,
  args: {
    variant: 'filled',
  },
};

export const OutlinedVariant: Story = {
  render: Template,
  args: {
    variant: 'outlined',
  },
};

export const StandardVariant: Story = {
  render: Template,
  args: {
    variant: 'standard',
  },
};

export const WithLabel: Story = {
  render: Template,
  args: {
    color: 'primary',
  },
};

export const ErrorState: Story = {
  render: Template,
  args: {
    color: 'error',
    error: true,
  },
};

export const SuccessState: Story = {
  render: Template,
  args: {
    color: 'success',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

const MultipleSelectTemplate: Story['render'] = (args): React.ReactElement => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (event: unknown): undefined => {
    const value = (event as React.ChangeEvent<{ value: unknown }>).target.value;
    setSelectedValues(typeof value === 'string' ? value.split(',') : (value as string[]));
    return undefined;
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="multiple-select-label">Multiple</InputLabel>
      <Select
        {...args}
        multiple
        labelId="multiple-select-label"
        value={selectedValues}
        onChange={handleChange}
        label="Multiple"
      >
        <MenuItem value="10">Option 1</MenuItem>
        <MenuItem value="20">Option 2</MenuItem>
        <MenuItem value="30">Option 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export const MultipleSelect: Story = {
  render: MultipleSelectTemplate,
  args: {
    color: 'primary',
  },
};
