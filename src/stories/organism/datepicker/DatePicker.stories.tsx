  import type { Meta, StoryObj } from '@storybook/react';
  import { action } from '@storybook/addon-actions';
  import { CustomDatePicker } from '../../../component/molecule/datepicker/DatePicker';
  import type { CustomDatePickerProps } from '../../../component/molecule/datepicker/DatePicker';
  import { Box } from '@mui/material';
  import React, { useState } from 'react';

  const meta: Meta<typeof CustomDatePicker> = {
    title: 'Molecule/DatePicker',
    component: CustomDatePicker,
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component:
            'A reusable MUI-based date picker component with validation, min/max date restrictions, and error handling support.',
        },
      },
    },
    tags: ['autodocs'],
    argTypes: {
      label: {
        control: 'text',
        description: 'Label text displayed above the date picker',
        table: {
          defaultValue: { summary: 'Select date' },
        },
      },
      value: {
        control: 'date',
        description: 'Currently selected date value',
      },
      onChange: {
        description: 'Callback function triggered when date changes',
        table: {
          type: { summary: '(date: Date | null) => void' },
        },
      },
      minDate: {
        control: 'date',
        description: 'Minimum selectable date',
      },
      maxDate: {
        control: 'date',
        description: 'Maximum selectable date',
      },
      fullWidth: {
        control: 'boolean',
        description: 'Whether the date picker should take full width',
        table: {
          defaultValue: { summary: 'true' },
        },
      },
    },
    decorators: [
      (Story) => (
        <Box sx={{ width: '400px', padding: '20px' }}>
          <Story />
        </Box>
      ),
    ],
  };

  export default meta;
  type Story = StoryObj<typeof CustomDatePicker>;

  const toDate = (value: any): Date | null => {
    if (value == null) return null;
  
    if (typeof value === 'number' || typeof value === 'string') {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    if (value instanceof Date) return value;
    return null;
  };

  const DatePickerWithState = (args: Partial<CustomDatePickerProps>) => {
    const [date, setDate] = useState<Date | null>(toDate(args.value));

    return (
      <CustomDatePicker
        {...(args as CustomDatePickerProps)}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          if (typeof args.onChange === 'function') args.onChange(newDate);
        }}
      />
    );
  };

  export const Default: Story = {
    args: {
      label: 'Select date',
      value: new Date(2025, 7, 17),
      onChange: action('date-changed'),
    },
    parameters: {
      docs: {
        description: {
          story: 'Default date picker with a pre-selected date matching the design reference.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const Empty: Story = {
    args: {
      label: 'Select date',
      value: null,
      onChange: action('date-changed'),
    },
    parameters: {
      docs: {
        description: {
          story: 'Date picker with no date selected initially.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const WithDateRestrictions: Story = {
    args: {
      label: 'Select date',
      value: null,
      onChange: action('date-changed'),
      minDate: new Date(2025, 7, 1),
      maxDate: new Date(2025, 7, 31),
    },
    parameters: {
      docs: {
        description: {
          story: 'Date picker with minimum and maximum date restrictions.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const RequiredField: Story = {
    args: {
      label: 'Birth Date',
      value: null,
      onChange: action('date-changed'),
      maxDate: new Date(),
    },
    parameters: {
      docs: {
        description: {
          story: 'Required date picker field (indicated by asterisk) with max date set to today.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const CustomLabel: Story = {
    args: {
      label: 'Appointment Date',
      value: null,
      onChange: action('date-changed'),
    },
    parameters: {
      docs: {
        description: {
          story: 'Date picker with custom label text.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const FutureDatesOnly: Story = {
    args: {
      label: 'Event Date',
      value: null,
      onChange: action('date-changed'),
      minDate: new Date(),
    },
    parameters: {
      docs: {
        description: {
          story: 'Date picker that only allows selection of future dates.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const PastDatesOnly: Story = {
    args: {
      label: 'Birth Date',
      value: null,
      onChange: action('date-changed'),
      maxDate: new Date(),
    },
    parameters: {
      docs: {
        description: {
          story: 'Date picker that only allows selection of past dates.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const DateRangeFrom: Story = {
    args: {
      label: 'From Date',
      value: new Date(2025, 7, 1),
      onChange: action('from-date-changed'),
      maxDate: new Date(2025, 7, 31),
    },
    parameters: {
      docs: {
        description: {
          story: 'Date picker for selecting the start date of a range.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };

  export const DateRangeTo: Story = {
    args: {
      label: 'To Date',
      value: new Date(2025, 7, 31),
      onChange: action('to-date-changed'),
      minDate: new Date(2025, 7, 1),
    },
    parameters: {
      docs: {
        description: {
          story: 'Date picker for selecting the end date of a range.',
        },
      },
    },
    render: (args) => <DatePickerWithState {...(args as Partial<CustomDatePickerProps>)} />,
  };
