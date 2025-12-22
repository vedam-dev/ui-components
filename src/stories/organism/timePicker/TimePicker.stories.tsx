import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TimePicker from '../../../component/organism/timePicker/TimePicker';
import { Box, Typography } from '@mui/material';

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
    disabled: {
      control: 'boolean',
      description: 'Disables the time picker',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text for the icon button',
    },
  },
};

export default meta;

// Helper function to create a date with specific time
const createTime = (hours: number, minutes: number = 0): Date => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const Default: StoryObj = {
  render: () => {
    const [time, setTime] = useState<Date | null>(createTime(9, 0));

    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TimePicker value={time} onChange={setTime} format="12h" tooltip="Select start time" />
        <Typography>
          Selected time:{' '}
          {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'None'}
        </Typography>
      </Box>
    );
  },
};

export const TwelveHourFormat: StoryObj = {
  render: () => {
    const [time, setTime] = useState<Date | null>(createTime(14, 30));

    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TimePicker
          value={time}
          onChange={setTime}
          format="12h"
          tooltip="Select time (12-hour format)"
        />
        <Typography>
          Selected:{' '}
          {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'None'}
        </Typography>
      </Box>
    );
  },
};

export const TwentyFourHourFormat: StoryObj = {
  render: () => {
    const [time, setTime] = useState<Date | null>(createTime(14, 30));

    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TimePicker
          value={time}
          onChange={setTime}
          format="24h"
          tooltip="Select time (24-hour format)"
        />
        <Typography>
          Selected:{' '}
          {time
            ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
            : 'None'}
        </Typography>
      </Box>
    );
  },
};

export const WithTimeConstraints: StoryObj = {
  render: () => {
    const [time, setTime] = useState<Date | null>(createTime(12, 0));

    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TimePicker
          value={time}
          onChange={setTime}
          format="12h"
          minTime={createTime(9, 0)}
          maxTime={createTime(17, 0)}
          tooltip="Select time between 9 AM and 5 PM"
        />
        <Typography>
          Business hours (9 AM - 5 PM):{' '}
          {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'None'}
        </Typography>
      </Box>
    );
  },
};

export const DisabledState: StoryObj = {
  render: () => {
    const [time, setTime] = useState<Date | null>(createTime(10, 0));

    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TimePicker
          value={time}
          onChange={setTime}
          disabled={true}
          tooltip="Disabled time picker"
        />
        <Typography color="text.secondary">Disabled time picker</Typography>
      </Box>
    );
  },
};
