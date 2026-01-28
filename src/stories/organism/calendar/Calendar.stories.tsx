import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ReusableCalendar, { CalendarEvent } from '../../../component/organism/calendar/Calendar';

const meta: Meta<typeof ReusableCalendar> = {
  title: 'Organism/ReusableCalendar',
  component: ReusableCalendar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A reusable weekly calendar component with grid layout and event support.',
      },
    },
  },
  argTypes: {
    weekStart: {
      control: 'date',
      description: 'The start date of the week to display',
    },
    semesterName: {
      control: 'text',
      description: 'Name of the semester to display in the header',
    },
    onEventClick: {
      action: 'eventClicked',
      description: 'Callback function when an event is clicked',
    },
    events: {
      control: 'object',
      description: 'Array of calendar events to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReusableCalendar>;

// Sample events data matching the image
const sampleEvents: CalendarEvent[] = [
  // Original entries (1-22)
  {
    id: 1,
    name: 'Java',
    description: '',
    start: '2024-06-03T08:30:00',
    end: '2024-06-03T09:00:00',
  },
  {
    id: 2,
    name: 'Contest',
    description: '(Year I)',
    start: '2024-06-03T10:00:00',
    end: '2024-06-03T11:30:00',
  },
  {
    id: 3,
    name: 'DSA',
    description: '(Year I)',
    start: '2024-06-03T14:30:00',
    end: '2024-06-03T18:30:00',
  },

  {
    id: 4,
    name: 'Java',
    description: '',
    start: '2024-06-04T08:30:00',
    end: '2024-06-04T09:00:00',
  },
  {
    id: 5,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-04T10:30:00',
    end: '2024-06-04T12:00:00',
  },
  {
    id: 6,
    name: 'Exam',
    description: '(Year II)',
    start: '2024-06-05T13:00:00',
    end: '2024-06-05T14:30:00',
  },
  {
    id: 7,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-08T16:00:00',
    end: '2024-06-08T17:00:00',
  },

  {
    id: 8,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-06T13:00:00',
    end: '2024-06-06T14:00:00',
  },

  {
    id: 9,
    name: 'Exam',
    description: '(Year II)',
    start: '2024-06-10T08:00:00',
    end: '2024-06-10T09:30:00',
  },
  {
    id: 10,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-10T12:00:00',
    end: '2024-06-10T13:00:00',
  },
  {
    id: 11,
    name: 'Contest',
    description: '(Year I)',
    start: '2024-06-10T13:00:00',
    end: '2024-06-10T14:30:00',
  },
  {
    id: 12,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-10T15:00:00',
    end: '2024-06-10T16:00:00',
  },
  {
    id: 13,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-10T16:00:00',
    end: '2024-06-10T17:00:00',
  },

  {
    id: 14,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-11T08:00:00',
    end: '2024-06-11T09:00:00',
  },
  {
    id: 15,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-11T10:30:00',
    end: '2024-06-11T11:30:00',
  },
  {
    id: 16,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-11T14:30:00',
    end: '2024-06-11T15:30:00',
  },
  {
    id: 17,
    name: 'Contest',
    description: '(Year I)',
    start: '2024-06-11T16:00:00',
    end: '2024-06-11T17:30:00',
  },

  {
    id: 18,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-12T10:30:00',
    end: '2024-06-12T11:30:00',
  },
  {
    id: 19,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-12T13:00:00',
    end: '2024-06-12T14:00:00',
  },

  {
    id: 20,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-13T08:00:00',
    end: '2024-06-13T09:00:00',
  },
  {
    id: 21,
    name: 'Java',
    description: '(Year I)',
    start: '2024-06-13T14:30:00',
    end: '2024-06-13T15:30:00',
  },
  {
    id: 22,
    name: 'Exam',
    description: '(Year II)',
    start: '2024-06-13T16:00:00',
    end: '2024-06-13T17:30:00',
  },

  // Additional events (23-44)
  // Monday extras (overlaps / short)
  {
    id: 23,
    name: 'Java Lab',
    description: '(Year I)',
    start: '2024-06-03T09:00:00',
    end: '2024-06-03T10:00:00',
  },
  {
    id: 24,
    name: 'Study Group',
    description: '(Year I)',
    start: '2024-06-03T11:45:00',
    end: '2024-06-03T12:30:00',
  },

  // Tuesday extras
  {
    id: 25,
    name: 'Seminar: Cloud',
    description: '(All)',
    start: '2024-06-04T12:30:00',
    end: '2024-06-04T14:00:00',
    isImportant: true,
  },
  {
    id: 26,
    name: 'Project Meeting',
    description: '(Year II)',
    start: '2024-06-04T15:00:00',
    end: '2024-06-04T16:30:00',
  },

  // Wednesday extras
  {
    id: 27,
    name: 'Guest Lecture',
    description: '(AI & ML)',
    start: '2024-06-05T09:00:00',
    end: '2024-06-05T10:30:00',
  },
  {
    id: 28,
    name: 'Exam Prep',
    description: '(Year II)',
    start: '2024-06-05T11:00:00',
    end: '2024-06-05T12:30:00',
  },

  // Thursday extras
  {
    id: 29,
    name: 'Workshop: Git',
    description: '(All)',
    start: '2024-06-06T08:30:00',
    end: '2024-06-06T10:00:00',
  },
  {
    id: 30,
    name: 'Hackathon Sync',
    description: '(Team A)',
    start: '2024-06-06T10:30:00',
    end: '2024-06-06T12:30:00',
    isImportant: true,
  },
  {
    id: 31,
    name: 'One-on-one',
    description: '(Mentor)',
    start: '2024-06-06T15:30:00',
    end: '2024-06-06T16:00:00',
  },

  // Friday extras
  {
    id: 32,
    name: 'Revision',
    description: '(Year I)',
    start: '2024-06-07T09:00:00',
    end: '2024-06-07T10:30:00',
  },
  {
    id: 33,
    name: 'Group Discussion',
    description: '(Year I)',
    start: '2024-06-07T11:00:00',
    end: '2024-06-07T12:00:00',
  },

  // Saturday extras
  {
    id: 34,
    name: 'Mock Test',
    description: '(Year I)',
    start: '2024-06-08T09:00:00',
    end: '2024-06-08T11:00:00',
    isImportant: true,
  },
  {
    id: 35,
    name: 'Lab Slot',
    description: '(Year I)',
    start: '2024-06-08T11:30:00',
    end: '2024-06-08T13:00:00',
  },

  // Sunday extras
  {
    id: 36,
    name: 'Project Deadline',
    description: '(Year II)',
    start: '2024-06-09T13:00:00',
    end: '2024-06-09T16:00:00',
    isImportant: true,
  },
  {
    id: 37,
    name: 'Catch-up',
    description: '(Year I)',
    start: '2024-06-09T16:30:00',
    end: '2024-06-09T17:30:00',
  },

  // More mixed events across the same week for density
  {
    id: 38,
    name: 'AI Lab',
    description: '(Year II)',
    start: '2024-06-03T13:00:00',
    end: '2024-06-03T14:00:00',
  },
  {
    id: 39,
    name: 'Open Office',
    description: '(Faculty)',
    start: '2024-06-04T09:30:00',
    end: '2024-06-04T10:15:00',
  },
  {
    id: 40,
    name: 'Career Talk',
    description: '(All)',
    start: '2024-06-05T15:00:00',
    end: '2024-06-05T16:00:00',
  },
  {
    id: 41,
    name: 'Code Review',
    description: '(Team B)',
    start: '2024-06-10T11:30:00',
    end: '2024-06-10T12:30:00',
  },
  {
    id: 42,
    name: 'Practice',
    description: '(Year I)',
    start: '2024-06-11T12:00:00',
    end: '2024-06-11T13:00:00',
  },
  {
    id: 43,
    name: 'Seminar: Security',
    description: '(All)',
    start: '2024-06-12T08:30:00',
    end: '2024-06-12T10:00:00',
    isImportant: true,
    color: 'red',
  },
  {
    id: 44,
    name: 'Exam Review',
    description: '(Year II)',
    start: '2024-06-13T10:00:00',
    end: '2024-06-13T11:30:00',
  },
];

// Primary story - matches the image exactly
export const Default: Story = {
  args: {
    events: sampleEvents,
    weekStart: new Date('2024-06-07'),
    semesterName: 'Semester 1',
    onEventClick: action('event-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default calendar view with sample events matching the provided design.',
      },
    },
  },
};

// Empty calendar
export const Empty: Story = {
  args: {
    events: [],
    weekStart: new Date('2024-06-07'),
    semesterName: 'Semester 1',
    onEventClick: action('event-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with no events scheduled.',
      },
    },
  },
};

// Calendar with different event types
export const MixedEventTypes: Story = {
  args: {
    events: [
      {
        id: 1,
        name: 'Regular Class',
        description: 'Standard lecture',
        start: '2024-06-10T09:00:00',
        end: '2024-06-10T10:30:00',
      },
      {
        id: 2,
        name: 'Exam',
        description: 'Midterm examination',
        start: '2024-06-10T14:00:00',
        end: '2024-06-10T16:00:00',
      },
      {
        id: 3,
        name: 'Contest',
        description: 'Programming contest',
        start: '2024-06-11T10:00:00',
        end: '2024-06-11T12:00:00',
      },
      {
        id: 4,
        name: 'Important Meeting',
        description: 'Project review',
        start: '2024-06-12T15:00:00',
        end: '2024-06-12T16:00:00',
        isImportant: true,
      },
    ],
    weekStart: new Date('2024-06-10'),
    semesterName: 'Semester 2',
    onEventClick: action('event-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar showing different event types with various styling.',
      },
    },
  },
};

// Calendar with overlapping events
export const OverlappingEvents: Story = {
  args: {
    events: [
      {
        id: 1,
        name: 'Morning Lecture',
        description: 'Database Systems',
        start: '2024-06-10T09:00:00',
        end: '2024-06-10T11:00:00',
      },
      {
        id: 2,
        name: 'Lab Session',
        description: 'Practical work',
        start: '2024-06-10T10:00:00',
        end: '2024-06-10T12:00:00',
      },
      {
        id: 3,
        name: 'Tutorial',
        description: 'Q&A session',
        start: '2024-06-10T11:30:00',
        end: '2024-06-10T12:30:00',
      },
    ],
    weekStart: new Date('2024-06-10'),
    semesterName: 'Spring Semester',
    onEventClick: action('event-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with overlapping events to test layout handling.',
      },
    },
  },
};

// Current week
export const CurrentWeek: Story = {
  args: {
    events: [
      {
        id: 1,
        name: "Today's Meeting",
        description: 'Team standup',
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(11, 0, 0, 0)),
      },
      {
        id: 2,
        name: "Tomorrow's Exam",
        description: 'Final assessment',
        start: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(14, 0, 0, 0)),
        end: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(16, 0, 0, 0)),
      },
    ],
    semesterName: 'Fall Semester',
    onEventClick: action('event-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar showing the current week with today highlighted.',
      },
    },
  },
};

// Minimal events for testing
export const MinimalEvents: Story = {
  args: {
    events: [
      {
        id: 1,
        name: 'Short Meeting',
        start: '2024-06-10T09:00:00',
        end: '2024-06-10T09:30:00',
      },
      {
        id: 2,
        name: 'Long Workshop',
        start: '2024-06-11T13:00:00',
        end: '2024-06-11T17:00:00',
      },
    ],
    weekStart: new Date('2024-06-10'),
    semesterName: 'Summer Semester',
    onEventClick: action('event-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with minimal event data to test edge cases.',
      },
    },
  },
};
