import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MonthlyCalendar, {
  MonthlyCalendarEvent,
  AttendanceStatus,
  TooltipData,
} from '../../../component/organism/analyticCalendar/AnalyticCalendar';

const meta: Meta<typeof MonthlyCalendar> = {
  title: 'Organism/AnalyticCalendar',
  component: MonthlyCalendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `A monthly calendar component with attendance tracking support and tooltips.

**Color Coding:**
- 🟠 Orange (#FDEBD9) = Leave
- 🔵 Blue (#3870CA26) = Holiday  
- 🟢 Green (#42B65724) = Present
- 🔴 Red (#F9D7D7) = Absent
- ⚪ Grey (#F5F5F7) = No event data (default)

**Features:**
- Week starts on Monday
- Today's date highlighted with orange border
- Hover effects on all date cells
- Tooltip shows attendance details on hover
- Click handlers for date selection
- Supports single events and date ranges`,
      },
    },
  },
  argTypes: {
    currentDate: {
      control: 'date',
      description: 'The current month to display',
    },
    onDateClick: {
      action: 'date-clicked',
      description: 'Callback function when a date is clicked',
    },
    events: {
      control: 'object',
      description: 'Array of calendar events with attendance status',
    },
    tooltipData: {
      control: 'object',
      description: 'Map of tooltip data for each date (key format: YYYY-M-D)',
    },
    sx: {
      control: 'object',
      description: 'MUI sx prop for custom styling',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MonthlyCalendar>;

const createEvent = (
  year: number,
  month: number,
  day: number,
  status: AttendanceStatus,
  type: 'single' | 'range-start' | 'range-middle' | 'range-end' = 'single'
): MonthlyCalendarEvent => ({
  id: `${year}-${month}-${day}-${status}`,
  date: new Date(year, month, day),
  type,
  status,
});

const createTooltipData = (
  year: number,
  month: number,
  day: number,
  presentCount: number,
  absentCount: number,
  noSessionCount: number,
  leaveCount: number
): [string, TooltipData] => [
  `${year}-${month}-${day}`,
  { presentCount, absentCount, noSessionCount, leaveCount },
];

// Example tooltip data
const sampleTooltipData = new Map<string, TooltipData>([
  createTooltipData(2024, 0, 1, 2, 1, 0, 1),
  createTooltipData(2024, 0, 2, 3, 0, 1, 0),
  createTooltipData(2024, 0, 3, 2, 2, 0, 0),
  createTooltipData(2024, 0, 4, 4, 0, 0, 0),
  createTooltipData(2024, 0, 5, 1, 2, 1, 0),
  createTooltipData(2024, 0, 8, 3, 1, 0, 0),
  createTooltipData(2024, 0, 9, 2, 0, 2, 1),
  createTooltipData(2024, 0, 10, 4, 0, 0, 0),
  createTooltipData(2024, 0, 15, 2, 2, 0, 0),
  createTooltipData(2024, 0, 18, 3, 1, 0, 1),
]);

export const WithTooltips: Story = {
  args: {
    events: [
      createEvent(2024, 0, 1, 'present'),
      createEvent(2024, 0, 2, 'present'),
      createEvent(2024, 0, 3, 'present'),
      createEvent(2024, 0, 4, 'present'),
      createEvent(2024, 0, 5, 'present'),
      createEvent(2024, 0, 8, 'present'),
      createEvent(2024, 0, 9, 'present'),
      createEvent(2024, 0, 10, 'present'),
      createEvent(2024, 0, 15, 'leave'),
      createEvent(2024, 0, 18, 'absent'),
    ],
    tooltipData: sampleTooltipData,
    currentDate: new Date(2024, 0, 1),
    onDateClick: action('date-clicked'),
  },
};

export const FigmaDesign: Story = {
  args: {
    events: [
      createEvent(2024, 0, 1, 'present'),
      createEvent(2024, 0, 2, 'present'),
      createEvent(2024, 0, 3, 'present'),
      createEvent(2024, 0, 4, 'present'),
      createEvent(2024, 0, 5, 'present'),
      createEvent(2024, 0, 6, 'leave', 'range-start'),
      createEvent(2024, 0, 7, 'holiday', 'range-middle'),
      createEvent(2024, 0, 8, 'present'),
      createEvent(2024, 0, 9, 'present'),
      createEvent(2024, 0, 10, 'present'),
      createEvent(2024, 0, 11, 'present'),
      createEvent(2024, 0, 12, 'present'),
      createEvent(2024, 0, 13, 'present'),
      createEvent(2024, 0, 14, 'holiday', 'range-middle'),
      createEvent(2024, 0, 15, 'present'),
      createEvent(2024, 0, 16, 'present'),
      createEvent(2024, 0, 17, 'present'),
      createEvent(2024, 0, 18, 'present'),
      createEvent(2024, 0, 19, 'absent'),
      createEvent(2024, 0, 20, 'holiday', 'range-middle'),
      createEvent(2024, 0, 21, 'holiday', 'range-middle'),
      createEvent(2024, 0, 28, 'holiday', 'range-end'),
    ],
    tooltipData: new Map<string, TooltipData>([
      createTooltipData(2024, 0, 1, 3, 0, 0, 1),
      createTooltipData(2024, 0, 2, 2, 1, 0, 1),
      createTooltipData(2024, 0, 3, 3, 1, 0, 0),
      createTooltipData(2024, 0, 4, 4, 0, 0, 0),
      createTooltipData(2024, 0, 5, 2, 1, 1, 0),
      createTooltipData(2024, 0, 6, 0, 0, 2, 2),
      createTooltipData(2024, 0, 7, 0, 0, 4, 0),
      createTooltipData(2024, 0, 8, 3, 0, 1, 0),
      createTooltipData(2024, 0, 9, 4, 0, 0, 0),
      createTooltipData(2024, 0, 10, 2, 1, 0, 1),
      createTooltipData(2024, 0, 11, 3, 1, 0, 0),
      createTooltipData(2024, 0, 12, 4, 0, 0, 0),
      createTooltipData(2024, 0, 13, 2, 0, 1, 1),
      createTooltipData(2024, 0, 14, 0, 0, 4, 0),
      createTooltipData(2024, 0, 15, 3, 1, 0, 0),
      createTooltipData(2024, 0, 16, 2, 2, 0, 0),
      createTooltipData(2024, 0, 17, 3, 0, 0, 1),
      createTooltipData(2024, 0, 18, 4, 0, 0, 0),
      createTooltipData(2024, 0, 19, 1, 3, 0, 0),
      createTooltipData(2024, 0, 20, 0, 0, 4, 0),
      createTooltipData(2024, 0, 21, 0, 0, 3, 1),
      createTooltipData(2024, 0, 28, 0, 0, 4, 0),
    ]),
    currentDate: new Date(2024, 0, 1),
    onDateClick: action('date-clicked'),
  },
};

export const Default: Story = {
  args: {
    events: [],
    currentDate: new Date(2024, 0, 1),
    onDateClick: action('date-clicked'),
  },
};

export const CurrentMonth: Story = {
  args: {
    events: [
      createEvent(2025, 9, 5, 'holiday', 'range-start'),
      createEvent(2025, 9, 6, 'holiday', 'range-middle'),
      createEvent(2025, 9, 7, 'holiday', 'range-end'),
      createEvent(2025, 9, 15, 'absent'),
      createEvent(2025, 9, 20, 'leave'),
    ],
    tooltipData: new Map<string, TooltipData>([
      createTooltipData(2025, 9, 5, 0, 0, 3, 1),
      createTooltipData(2025, 9, 6, 0, 0, 4, 0),
      createTooltipData(2025, 9, 7, 0, 0, 3, 1),
      createTooltipData(2025, 9, 15, 1, 3, 0, 0),
      createTooltipData(2025, 9, 20, 2, 1, 0, 1),
    ]),
    currentDate: new Date(2025, 9, 1),
    onDateClick: action('date-clicked'),
  },
};

export const AllStatusTypes: Story = {
  args: {
    events: [
      createEvent(2024, 0, 5, 'leave'),
      createEvent(2024, 0, 12, 'holiday'),
      createEvent(2024, 0, 18, 'present'),
      createEvent(2024, 0, 25, 'absent'),
    ],
    tooltipData: new Map<string, TooltipData>([
      createTooltipData(2024, 0, 5, 0, 0, 2, 2),
      createTooltipData(2024, 0, 12, 0, 0, 4, 0),
      createTooltipData(2024, 0, 18, 3, 0, 0, 1),
      createTooltipData(2024, 0, 25, 1, 3, 0, 0),
    ]),
    currentDate: new Date(2024, 0, 1),
    onDateClick: action('date-clicked'),
  },
};

export const RealisticAttendanceWithTooltips: Story = {
  args: {
    events: [
      createEvent(2024, 0, 2, 'leave', 'range-start'),
      createEvent(2024, 0, 3, 'leave', 'range-middle'),
      createEvent(2024, 0, 4, 'leave', 'range-end'),
      createEvent(2024, 0, 5, 'present'),
      createEvent(2024, 0, 8, 'present'),
      createEvent(2024, 0, 9, 'present'),
      createEvent(2024, 0, 10, 'present'),
      createEvent(2024, 0, 11, 'present'),
      createEvent(2024, 0, 12, 'absent'),
      createEvent(2024, 0, 15, 'present'),
      createEvent(2024, 0, 16, 'present'),
      createEvent(2024, 0, 17, 'present'),
      createEvent(2024, 0, 18, 'present'),
      createEvent(2024, 0, 22, 'absent'),
      createEvent(2024, 0, 27, 'holiday', 'range-start'),
      createEvent(2024, 0, 28, 'holiday', 'range-middle'),
      createEvent(2024, 0, 29, 'holiday', 'range-end'),
    ],
    tooltipData: new Map<string, TooltipData>([
      createTooltipData(2024, 0, 2, 0, 0, 2, 2),
      createTooltipData(2024, 0, 3, 0, 0, 3, 1),
      createTooltipData(2024, 0, 4, 0, 0, 2, 2),
      createTooltipData(2024, 0, 5, 4, 0, 0, 0),
      createTooltipData(2024, 0, 8, 3, 1, 0, 0),
      createTooltipData(2024, 0, 9, 4, 0, 0, 0),
      createTooltipData(2024, 0, 10, 3, 0, 1, 0),
      createTooltipData(2024, 0, 11, 4, 0, 0, 0),
      createTooltipData(2024, 0, 12, 1, 3, 0, 0),
      createTooltipData(2024, 0, 15, 3, 1, 0, 0),
      createTooltipData(2024, 0, 16, 4, 0, 0, 0),
      createTooltipData(2024, 0, 17, 2, 2, 0, 0),
      createTooltipData(2024, 0, 18, 3, 0, 0, 1),
      createTooltipData(2024, 0, 22, 0, 4, 0, 0),
      createTooltipData(2024, 0, 27, 0, 0, 4, 0),
      createTooltipData(2024, 0, 28, 0, 0, 3, 1),
      createTooltipData(2024, 0, 29, 0, 0, 4, 0),
    ]),
    currentDate: new Date(2024, 0, 1),
    onDateClick: action('date-clicked'),
  },
};

export const FullMonthTracking: Story = {
  args: {
    events: [
      createEvent(2024, 0, 1, 'present'),
      createEvent(2024, 0, 2, 'present'),
      createEvent(2024, 0, 3, 'absent'),
      createEvent(2024, 0, 4, 'present'),
      createEvent(2024, 0, 5, 'present'),
      createEvent(2024, 0, 8, 'holiday', 'range-start'),
      createEvent(2024, 0, 9, 'holiday', 'range-middle'),
      createEvent(2024, 0, 10, 'holiday', 'range-middle'),
      createEvent(2024, 0, 11, 'holiday', 'range-middle'),
      createEvent(2024, 0, 12, 'holiday', 'range-end'),
      createEvent(2024, 0, 15, 'leave', 'range-start'),
      createEvent(2024, 0, 16, 'leave', 'range-middle'),
      createEvent(2024, 0, 17, 'leave', 'range-middle'),
      createEvent(2024, 0, 18, 'leave', 'range-end'),
      createEvent(2024, 0, 19, 'present'),
      createEvent(2024, 0, 22, 'present'),
      createEvent(2024, 0, 23, 'absent'),
      createEvent(2024, 0, 24, 'present'),
      createEvent(2024, 0, 25, 'present'),
      createEvent(2024, 0, 26, 'absent'),
      createEvent(2024, 0, 29, 'present'),
      createEvent(2024, 0, 30, 'present'),
      createEvent(2024, 0, 31, 'present'),
    ],
    tooltipData: new Map<string, TooltipData>([
      createTooltipData(2024, 0, 1, 2, 0, 0, 1),
      createTooltipData(2024, 0, 2, 4, 0, 0, 0),
      createTooltipData(2024, 0, 3, 1, 3, 0, 0),
      createTooltipData(2024, 0, 4, 3, 1, 0, 0),
      createTooltipData(2024, 0, 5, 4, 0, 0, 0),
      createTooltipData(2024, 0, 8, 0, 0, 4, 0),
      createTooltipData(2024, 0, 9, 0, 0, 3, 1),
      createTooltipData(2024, 0, 10, 0, 0, 4, 0),
      createTooltipData(2024, 0, 11, 0, 0, 4, 0),
      createTooltipData(2024, 0, 12, 0, 0, 3, 1),
      createTooltipData(2024, 0, 15, 0, 0, 2, 2),
      createTooltipData(2024, 0, 16, 0, 0, 1, 3),
      createTooltipData(2024, 0, 17, 0, 0, 2, 2),
      createTooltipData(2024, 0, 18, 0, 0, 1, 3),
      createTooltipData(2024, 0, 19, 3, 1, 0, 0),
      createTooltipData(2024, 0, 22, 4, 0, 0, 0),
      createTooltipData(2024, 0, 23, 2, 2, 0, 0),
      createTooltipData(2024, 0, 24, 3, 0, 1, 0),
      createTooltipData(2024, 0, 25, 4, 0, 0, 0),
      createTooltipData(2024, 0, 26, 1, 3, 0, 0),
      createTooltipData(2024, 0, 29, 3, 0, 0, 1),
      createTooltipData(2024, 0, 30, 4, 0, 0, 0),
      createTooltipData(2024, 0, 31, 3, 1, 0, 0),
    ]),
    currentDate: new Date(2024, 0, 1),
    onDateClick: action('date-clicked'),
  },
};