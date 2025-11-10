import type { Meta, StoryObj } from '@storybook/react';
import SubjectCard from '../../../component/organism/card/SubjectCard';
import { fn } from '@storybook/test';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { JSX } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';

const storybookTheme = createTheme({
  spacing: 4,
});

const meta: Meta<typeof SubjectCard> = {
  title: 'Organism/SubjectCard',
  component: SubjectCard,
  decorators: [
    (Story): JSX.Element => (
      <ThemeProvider theme={storybookTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable subject card component with support for various styling options and content configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ... existing argTypes remain the same
  },
  args: {
    onGoToClass: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SubjectCard>;

export const WithBatchOnly: Story = {
  args: {
    subject: 'Dev 102',
    description: 'Advanced calculus, algebra, and mathematical analysis',
    batch: 'Batch I',
    courseCode: '102',
    credit: '200',
    variant: 'course-offering',
    buttons: [
      {
        text: 'Replicate',
        onClick: fn(),
        variant: 'outlined',
        startIcon: <ContentCopyIcon />,
      },
      {
        text: 'Add Details',
        onClick: fn(),
        variant: 'contained',
      },
    ],
  },
};

export const WithTeacherOnly: Story = {
  args: {
    subject: 'Mathematics',
    teacher: 'Priya Sharma',
    description: 'Advanced calculus, algebra, and mathematical analysis',
    duration: '10 Months',
    lectureCount: 34,
    buttons: [
      {
        text: 'Go to Class',
        onClick: fn(),
        variant: 'outlined',
      },
    ],
  },
};

export const WithBatchAndTeacherShowsOnlyBatch: Story = {
  args: {
    subject: 'Physics',
    teacher: 'Dr. Stephen Hawking', // This won't show because batch takes priority
    description: 'Advanced calculus, algebra, and mathematical analysis',
    batch: 'Batch III', // This will show
    courseCode: 'PHY101',
    credit: '250',
    variant: 'course-offering',
    buttons: [
      {
        text: 'Replicate',
        onClick: fn(),
        variant: 'outlined',
      },
      {
        text: 'Add Details',
        onClick: fn(),
        variant: 'contained',
      },
    ],
  },
};

export const NoBatchNoTeacher: Story = {
  args: {
    subject: 'Minimal Course',
    description: 'This course shows only subject and description without batch or teacher',
    duration: '6 months',
    lectureCount: 24,
    buttons: [
      {
        text: 'View Details',
        onClick: fn(),
        variant: 'outlined',
      },
    ],
  },
};

export const DefaultWithTeacher: Story = {
  args: {
    subject: 'Web Development',
    teacher: 'Priya Sharma',
    duration: '4 months',
    lectureCount: 24,
    description: 'Advanced calculus, algebra, and mathematical analysis',
    buttonText: 'Go to Class',
    onGoToClass: fn(),
  },
};

export const CourseOfferingNoBatch: Story = {
  args: {
    subject: 'Chemistry',
    teacher: 'Dr. Marie Curie', // This will show because no batch is provided
    description: 'Advanced calculus, algebra, and mathematical analysis',
    courseCode: 'CHEM101',
    credit: '200',
    variant: 'course-offering',
    buttons: [
      {
        text: 'Replicate',
        onClick: fn(),
        variant: 'outlined',
      },
      {
        text: 'Add Details',
        onClick: fn(),
        variant: 'contained',
      },
    ],
  },
};

export const EmptySecondaryText: Story = {
  args: {
    subject: 'Course Without Instructor',
    description: 'This course has no batch or instructor specified',
    buttons: [
      {
        text: 'Enroll',
        onClick: fn(),
        variant: 'contained',
      },
    ],
  },
};
