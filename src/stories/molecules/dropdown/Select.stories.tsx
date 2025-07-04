import type { Meta, StoryObj } from '@storybook/react';
import Select from '../../../component/molecule/dropdown/Select';
import { MenuItem, FormControl, InputLabel } from '@mui/material';

const meta = {
  title: 'Molecule/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard']
    },
    size: {
      control: 'select',
      options: ['small', 'medium']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']
    }
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story['render'] = args => (
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel>Select</InputLabel>
    <Select {...args}>
      <MenuItem value={10}>Option 1</MenuItem>
      <MenuItem value={20}>Option 2</MenuItem>
      <MenuItem value={30}>Option 3</MenuItem>
    </Select>
  </FormControl>
);

export const Primary: Story = {
  render: Template,
  args: {
    color: 'primary'
  }
};

export const Secondary: Story = {
  render: Template,
  args: {
    color: 'secondary'
  }
};

export const Small: Story = {
  render: Template,
  args: {
    size: 'small'
  }
};

export const FilledVariant: Story = {
  render: Template,
  args: {
    variant: 'filled'
  }
};

export const StandardVariant: Story = {
  render: Template,
  args: {
    variant: 'standard'
  }
};

export const MultipleSelect: Story = {
  render: args => (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Multiple Select</InputLabel>
      <Select {...args} multiple>
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
        <MenuItem value={30}>Option 3</MenuItem>
      </Select>
    </FormControl>
  ),
  args: {
    color: 'primary'
  }
};

export const WithLabel: Story = {
  render: args => (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="select-label">Label</InputLabel>
      <Select {...args} labelId="select-label" label="Label">
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
        <MenuItem value={30}>Option 3</MenuItem>
      </Select>
    </FormControl>
  ),
  args: {
    color: 'primary'
  }
};

export const ErrorState: Story = {
  render: Template,
  args: {
    color: 'error'
  }
};

export const SuccessState: Story = {
  render: Template,
  args: {
    color: 'success'
  }
};
