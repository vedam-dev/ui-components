import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../../../component/atom/text-field';
import { Box, Stack } from '@mui/material';

const meta: Meta<typeof TextField> = {
  title: 'Atom/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Type',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
};

export const States = {
  render: () => (
    <Stack spacing={4}>
      <TextField 
        label="Empty Field"
        placeholder="your@email.com"
      />
      <TextField
        label="Valid Email"
        value="valid@example.com"
      />
      <TextField
        label="Invalid Email"
        value="invalid-email"
      />
    </Stack>
  ),
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'your@email.com',
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
};
