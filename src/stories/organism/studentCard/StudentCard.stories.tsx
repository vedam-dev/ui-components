import type { Meta, StoryObj } from '@storybook/react';
import StudentCard from '../../../component/organism/studentCard/StudentCard';

const meta: Meta<typeof StudentCard> = {
  title: 'Organism/StudentCard',
  component: StudentCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title of the card',
    },
    description: {
      control: 'text',
      description: 'The description text below the title',
    },
    attendanceCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of attended sessions',
    },
    totalCount: {
      control: { type: 'number', min: 1 },
      description: 'Total number of sessions',
    },
    attendancePercentage: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Attendance percentage',
    },
    showNavigateButton: {
      control: 'boolean',
      description: 'Show or hide the navigation button',
    },
    onNavigate: {
      action: 'navigate clicked',
      description: 'Callback function when navigate button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StudentCard>;

export const Default: Story = {
  args: {
    title: 'Student Attendance',
    description: "Overall student's attendance for this semester",
    attendanceCount: 38,
    totalCount: 50,
    attendancePercentage: 75,
    showNavigateButton: true,
  },
};

export const WithoutNavigateButton: Story = {
  args: {
    title: 'Student Attendance',
    description: "Overall student's attendance for this semester",
    attendanceCount: 38,
    totalCount: 50,
    attendancePercentage: 75,
    showNavigateButton: false,
  },
};

export const HighAttendance: Story = {
  args: {
    title: 'Student Attendance',
    description: 'Excellent attendance record',
    attendanceCount: 48,
    totalCount: 50,
    attendancePercentage: 96,
    showNavigateButton: true,
  },
};

export const LowAttendance: Story = {
  args: {
    title: 'Student Attendance',
    description: 'Needs improvement',
    attendanceCount: 20,
    totalCount: 50,
    attendancePercentage: 40,
    showNavigateButton: true,
  },
};

export const PerfectAttendance: Story = {
  args: {
    title: 'Perfect Attendance',
    description: 'No absences this semester',
    attendanceCount: 50,
    totalCount: 50,
    attendancePercentage: 100,
    showNavigateButton: true,
  },
};

export const CustomContent: Story = {
  args: {
    title: 'Class Attendance',
    description: 'Mathematics course - Fall 2024',
    attendanceCount: 42,
    totalCount: 50,
    attendancePercentage: 84,
    showNavigateButton: true,
  },
};

export const MinimalAttendance: Story = {
  args: {
    title: 'Student Attendance',
    description: 'Critical attendance status',
    attendanceCount: 5,
    totalCount: 50,
    attendancePercentage: 10,
    showNavigateButton: true,
  },
};

export const Interactive: Story = {
  args: {
    title: 'Student Attendance',
    description: "Overall student's attendance for this semester",
    attendanceCount: 38,
    totalCount: 50,
    attendancePercentage: 75,
    showNavigateButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Try clicking the navigation button and changing the controls below.',
      },
    },
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <StudentCard
        title="Class Attendance"
        description="Mathematics course - Fall 2024"
        scoreTitle="Attendance Count"
        percentageTitle="Attendance Percentage"
        attendanceCount={42}
        totalCount={50}
        attendancePercentage={84}
        showNavigateButton={true}
      />
      <StudentCard
        title="Contest Performance"
        description="Overall student's performance in the contests"
        scoreTitle="Average Score"
        percentageTitle="Average Percentage"
        attendanceCount={38}
        totalCount={50}
        attendancePercentage={76}
        showNavigateButton={true}
      />
      <StudentCard
        title="Mock Interview"
        description="Overall student's performance in mock interviews"
        scoreTitle="Overall Score"
        percentageTitle="Average Percentage"
        attendanceCount={45}
        totalCount={48}
        attendancePercentage={93.75}
        showNavigateButton={false}
      />
    </div>
  ),
};
