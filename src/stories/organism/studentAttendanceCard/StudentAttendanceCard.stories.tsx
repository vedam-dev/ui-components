import type { Meta, StoryObj } from '@storybook/react';
import StudentAttendanceCard from '../../../component/organism/studentAttendanceCard/StudentAttendanceCard';

const meta: Meta<typeof StudentAttendanceCard> = {
  title: 'Organism/StudentAttendanceCard',
  component: StudentAttendanceCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Student name',
    },
    email: {
      control: 'text',
      description: 'Student email address',
    },
    attendance: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Attendance percentage',
    },
    value: {
      control: { type: 'text'},
      description: 'Value Title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StudentAttendanceCard>;

export const Default: Story = {
  args: {
    name: 'Sameeksha Kapoor',
    email: 'sameeksha.kapoor@vedamsot.org',
    attendance: 44,
  },
};

export const HighAttendance: Story = {
  args: {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@vedamsot.org',
    attendance: 95,
  },
};

export const MediumAttendance: Story = {
  args: {
    name: 'Priya Patel',
    email: 'priya.patel@vedamsot.org',
    attendance: 72,
  },
};

export const LowAttendance: Story = {
  args: {
    name: 'Arjun Kumar',
    email: 'arjun.kumar@vedamsot.org',
    attendance: 28,
  },
};

export const PerfectAttendance: Story = {
  args: {
    name: 'Ananya Singh',
    email: 'ananya.singh@vedamsot.org',
    attendance: 100,
  },
};

export const LongName: Story = {
  args: {
    name: 'Sameeksha Kapoor Extraordinaire',
    email: 'sameeksha.kapoor.extraordinaire@vedamsot.org',
    attendance: 67,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#F5F5F7',
      }}
    >
      <StudentAttendanceCard
        name="Sameeksha Kapoor"
        email="sameeksha.kapoor@vedamsot.org"
        attendance={44}
        value="Average Attendance"
      />
      <StudentAttendanceCard
        name="Rahul Sharma"
        email="rahul.sharma@vedamsot.org"
        attendance={87}
        value="Average Attendance"
      />
      <StudentAttendanceCard name="Priya Patel" email="priya.patel@vedamsot.org" attendance={92} value="Average Attendance" />
      <StudentAttendanceCard name="Arjun Kumar" email="arjun.kumar@vedamsot.org" attendance={68} value="Average Attendance" />
      <StudentAttendanceCard
        name="Ananya Singh"
        email="ananya.singh@vedamsot.org"
        attendance={100}
        value="Average Attendance"
      />
    </div>
  ),
};
