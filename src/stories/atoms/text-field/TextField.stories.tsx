import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../../../component/atom/text-field';
import { Stack, Box } from '@mui/material';
import { useState } from 'react';

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
    color: 'primary',
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
      emailMessage: 'Incorrect email id entered!'
    },
    required: true,
    placeholder: 'Enter your email',
  },
};

export const PasswordConfirmation: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
      <Box width={300}>
        <Stack spacing={2}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            validate={{
              sameAs: password,
              matchMessage: 'Passwords do not match!'
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Stack>
      </Box>
    );
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