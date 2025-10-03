import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AttendanceSummaryCard from '../../../component/organism/attendanceSummaryCard/AttendanceSummaryCard';

const meta: Meta<typeof AttendanceSummaryCard> = {
  title: 'Organism/AttendanceSummaryCard',
  component: AttendanceSummaryCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `A summary card component displaying attendance statistics with average attendance range and student count.

**Features:**
- Shows average attendance as a percentage range
- Displays current vs total student count
- Optional navigation button with hover effects
- Clean, modern design with purple accents
- Fully customizable with sx prop`,
      },
    },
  },
  argTypes: {
    averageAttendanceMin: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Minimum average attendance percentage',
    },
    averageAttendanceMax: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Maximum average attendance percentage',
    },
    currentStudents: {
      control: { type: 'number', min: 0 },
      description: 'Current number of students',
    },
    totalStudents: {
      control: { type: 'number', min: 0 },
      description: 'Total number of students',
    },
    showNavigateButton: {
      control: 'boolean',
      description: 'Show or hide the navigation button',
    },
    onNavigate: {
      action: 'navigate-clicked',
      description: 'Callback function when navigation button is clicked',
    },
    sx: {
      control: 'object',
      description: 'MUI sx prop for custom styling',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AttendanceSummaryCard>;

export const Default: Story = {
  args: {
    averageAttendanceMin: 81,
    averageAttendanceMax: 100,
    currentStudents: 35,
    totalStudents: 90,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const HighAttendance: Story = {
  args: {
    averageAttendanceMin: 90,
    averageAttendanceMax: 100,
    currentStudents: 45,
    totalStudents: 50,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const ModerateAttendance: Story = {
  args: {
    averageAttendanceMin: 60,
    averageAttendanceMax: 80,
    currentStudents: 28,
    totalStudents: 45,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const LowAttendance: Story = {
  args: {
    averageAttendanceMin: 40,
    averageAttendanceMax: 60,
    currentStudents: 15,
    totalStudents: 30,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};
export const PerfectAttendance: Story = {
  args: {
    averageAttendanceMin: 100,
    averageAttendanceMax: 100,
    currentStudents: 50,
    totalStudents: 50,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const WithoutNavigation: Story = {
  args: {
    averageAttendanceMin: 85,
    averageAttendanceMax: 95,
    currentStudents: 40,
    totalStudents: 50,
    showNavigateButton: false,
  },
};

export const LargeClass: Story = {
  args: {
    averageAttendanceMin: 75,
    averageAttendanceMax: 90,
    currentStudents: 180,
    totalStudents: 200,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const SmallClass: Story = {
  args: {
    averageAttendanceMin: 88,
    averageAttendanceMax: 100,
    currentStudents: 8,
    totalStudents: 10,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const NarrowRange: Story = {
  args: {
    averageAttendanceMin: 92,
    averageAttendanceMax: 96,
    currentStudents: 35,
    totalStudents: 40,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const WideRange: Story = {
  args: {
    averageAttendanceMin: 50,
    averageAttendanceMax: 95,
    currentStudents: 30,
    totalStudents: 50,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const CustomStyling: Story = {
  args: {
    averageAttendanceMin: 80,
    averageAttendanceMax: 95,
    currentStudents: 42,
    totalStudents: 50,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
    sx: {
      border: '2px solid #8A18FF',
      boxShadow: '0 4px 24px rgba(138, 24, 255, 0.15)',
    },
  },
};

export const NoStudentsPresent: Story = {
  args: {
    averageAttendanceMin: 0,
    averageAttendanceMax: 0,
    currentStudents: 0,
    totalStudents: 50,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};

export const FullCapacity: Story = {
  args: {
    averageAttendanceMin: 95,
    averageAttendanceMax: 100,
    currentStudents: 100,
    totalStudents: 100,
    showNavigateButton: true,
    onNavigate: action('navigate-clicked'),
  },
};
