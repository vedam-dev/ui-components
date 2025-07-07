import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../../../component/atom/text-field';
import { Stack} from '@mui/material';

const meta = {
  title: 'Atom/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
    },
    margin: {
      control: 'select',
      options: ['dense', 'none', 'normal'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary TextField',
    variant: 'outlined',
  },
};

export const EmailValidation: Story = {
  args: {
    label: 'Email',
    type: 'email',
    validate: {
      type: 'email',
      emailMessage: 'Please enter a valid email address'
    },
    required: true,
    placeholder: 'your@email.com',
  },
};

export const AllVariants = {
  render: () => (
    <Stack spacing={2} width={300}>
      <TextField label="Outlined" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />
    </Stack>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'TextField with helper text',
    helperText: 'This is some helper text',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Error TextField',
    error: true,
    helperText: 'This is an error message',
    defaultValue: 'Invalid value',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled TextField',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Multiline TextField',
    multiline: true,
    rows: 4,
    placeholder: 'Enter multiple lines of text...',
  },
};

export const SelectField: Story = {
  args: {
    select: true,
    label: 'Select',
    defaultValue: 'option1',
    children: [
      <option key="option1" value="option1">Option 1</option>,
      <option key="option2" value="option2">Option 2</option>,
      <option key="option3" value="option3">Option 3</option>,
    ],
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width TextField',
    fullWidth: true,
  },
  parameters: {
    layout: 'fullscreen'
  },
};