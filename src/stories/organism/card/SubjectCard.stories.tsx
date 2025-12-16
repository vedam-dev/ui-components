import type { Meta, StoryObj } from '@storybook/react';
import SubjectCard from '../../../component/organism/card/SubjectCard';
import { fn } from '@storybook/test';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { JSX } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const storybookTheme = createTheme({
  spacing: 4,
});

// Define gradient and border arrays for easy reference
const gradients = [
  'linear-gradient(180deg, #F3E8FF 0%, #FFF 100%)',
  'linear-gradient(180deg, #FFEAC0 0%, #FFF 100%)',
  'linear-gradient(180deg, #FFDBB6 0%, #FFF 100%)',
  'linear-gradient(180deg, #A6F5F8 0%, #FFF 100%)',
];

const borders = [
  '1px solid #DAC2F2',
  '1px solid #FFEAC0',
  '1px solid #FFDBB6',
  '1px solid #A6F5F8',
];

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
    index: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Index for card styling (determines gradient/border color)',
    },
    gradient: {
      control: 'text',
      description: 'CSS gradient for card background',
    },
    border: {
      control: 'text',
      description: 'CSS border for card',
    },
  },
  args: {
    onGoToClass: fn(),
    index: 0,
  },
};

export default meta;
type Story = StoryObj<typeof SubjectCard>;

export const WithBatchOnly: Story = {
  args: {
    subject: 'Dev 102',
    description:
      'Advanced calculus, algebra, and mathematical analysis,Advanced calculus, algebra, and mathematical analysis,',
    batch: 'Batch I',
    courseCode: '102',
    iconUrl: 'https://example.com/icon.png',
    credits: '200',
    variant: 'course-offering',
    index: 0,
    gradient: gradients[0],
    border: borders[0],
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
    index: 1,
    gradient: gradients[1],
    border: borders[1],
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
    teacher: 'Dr. Stephen Hawking',
    description: 'Advanced calculus, algebra, and mathematical analysis',
    batch: 'Batch III',
    courseCode: 'PHY101',
    credits: '250',
    variant: 'course-offering',
    index: 2,
    gradient: gradients[2],
    border: borders[2],
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
    index: 3,
    gradient: gradients[3],
    border: borders[3],
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
    index: 0,
    gradient: gradients[0],
    border: borders[0],
    onGoToClass: fn(),
  },
};

export const CourseOfferingNoBatch: Story = {
  args: {
    subject: 'Chemistry',
    teacher: 'Dr. Marie Curie',
    description: 'Advanced calculus, algebra, and mathematical analysis',
    courseCode: 'CHEM101',
    credits: '200',
    variant: 'course-offering',
    index: 1,
    gradient: gradients[1],
    border: borders[1],
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
    index: 2,
    gradient: gradients[2],
    border: borders[2],
    buttons: [
      {
        text: 'Enroll',
        onClick: fn(),
        variant: 'contained',
      },
    ],
  },
};

// Story to showcase all 4 gradient variations
export const AllGradientVariations: Story = {
  decorators: [
    (Story): JSX.Element => (
      <ThemeProvider theme={storybookTheme}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            padding: '20px',
          }}
        >
          <SubjectCard
            subject="Purple Gradient"
            description="This card uses gradient index 0 (purple)"
            index={0}
            gradient={gradients[0]}
            border={borders[0]}
            buttons={[{ text: 'View', onClick: fn(), variant: 'outlined' }]}
          />
          <SubjectCard
            subject="Yellow Gradient"
            description="This card uses gradient index 1 (yellow)"
            index={1}
            gradient={gradients[1]}
            border={borders[1]}
            buttons={[{ text: 'View', onClick: fn(), variant: 'outlined' }]}
          />
          <SubjectCard
            subject="Orange Gradient"
            description="This card uses gradient index 2 (orange)"
            index={2}
            gradient={gradients[2]}
            border={borders[2]}
            buttons={[{ text: 'View', onClick: fn(), variant: 'outlined' }]}
          />
          <SubjectCard
            subject="Cyan Gradient"
            description="This card uses gradient index 3 (cyan)"
            index={3}
            gradient={gradients[3]}
            border={borders[3]}
            buttons={[{ text: 'View', onClick: fn(), variant: 'outlined' }]}
          />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    subject: 'Gradient Showcase',
    description: 'See all gradient variations',
    index: 0,
  },
};