import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TimePicker from '../../../component/organism/timePicker/TimePicker';
import { Box } from '@mui/material';

const meta: Meta<typeof TimePicker> = {
  title: 'Organism/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'radio',
      options: ['12h', '24h'],
      description: 'Time format (12-hour or 24-hour)',
    },
    error: {
      control: 'boolean',
      description: 'Shows error state',
    },
    required: {
      control: 'boolean',
      description: 'Marks field as required',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the time picker',
    },
    label: {
      control: 'text',
      description: 'Label for the time picker',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

// Helper function to create a date with specific time
const createTime = (hours: number, minutes: number = 0): Date => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const Default: StoryObj = {
  render: () => {
    const [startTime, setStartTime] = useState<Date | null>(createTime(9, 0));

    return (
      <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', maxWidth: 400 }}>
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          format="12h"
          required
          helperText="Meeting start time"
        />
      </Box>
    );
  },
};

export const TwelveHourFormat: StoryObj = {
  render: () => {
    const [startTime, setStartTime] = useState<Date | null>(createTime(9, 0));

    return (
      <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', maxWidth: 400 }}>
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          format="12h"
          required
          helperText="Meeting start time"
        />
      </Box>
    );
  },
};

export const TwentyFourHourFormat: StoryObj = {
  render: () => {
    const [startTime, setStartTime] = useState<Date | null>(createTime(9, 0));

    return (
      <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', maxWidth: 400 }}>
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          format="24h"
          required
          helperText="Meeting start time"
        />
      </Box>
    );
  },
};

// Interactive story with validation
export const WithValidation: StoryObj = {
  render: () => {
    const [time, setTime] = useState<Date | null>(null);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const handleChange = (newValue: Date | null) => {
      setTime(newValue);
      if (!newValue) {
        setError(true);
        setHelperText('Time is required');
      } else if (newValue.getHours() < 9) {
        setError(true);
        setHelperText('Time must be after 9:00 AM');
      } else {
        setError(false);
        setHelperText('Time is valid ✓');
      }
    };

    return (
      <Box sx={{ maxWidth: 400 }}>
        <TimePicker
          label="Office Hours"
          value={time}
          onChange={handleChange}
          error={error}
          helperText={helperText || 'Select a time after 9:00 AM'}
          required
          minTime={createTime(9, 0)}
        />
      </Box>
    );
  },
};
