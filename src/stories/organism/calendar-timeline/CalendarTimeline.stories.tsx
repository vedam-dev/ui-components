import type { Meta, StoryObj } from '@storybook/react';
import CalendarTimeline from '../../../component/organism/calendar-timeline/CalendarTimeline';

const meta: Meta<typeof CalendarTimeline> = {
  title: 'Organism/CalendarTimeline',
  component: CalendarTimeline,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CalendarTimeline>;

const iconUrls = [
  'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155723-2.png',
  'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155723-3.png',
  'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155723.png',
  'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155731.png',
];

export const Default: Story = {
  args: {
    events: [
      {
        date: '31 July',
        time: '2:00 - 5:30',
        subject: 'Computer Science',
        iconUrl: iconUrls[0],
      },
      {
        date: '1 August',
        time: '10:30 - 12:30',
        subject: 'JAVA',
        iconUrl: iconUrls[1],
      },
      {
        date: '2 August',
        time: '10:30 - 12:30',
        subject: 'Mathematics',
        iconUrl: iconUrls[2],
      },
      {
        date: '2 August',
        time: '10:30 - 12:30',
        subject: 'Unix',
        iconUrl: iconUrls[3],
      },
    ],
  },
};

export const SameDayMultipleClasses: Story = {
  args: {
    events: [
      {
        date: '31 July',
        time: '10:30 - 12:30',
        subject: 'Computer Science',
        iconUrl: iconUrls[0],
      },
      {
        date: '31 July',
        time: '12:30 - 14:30',
        subject: 'JAVA',
        iconUrl: iconUrls[1],
      },
      {
        date: '31 July',
        time: '15:30 - 18:30',
        subject: 'Mathematics',
        iconUrl: iconUrls[2],
      },
      {
        date: '31 July',
        time: '20:00 - 22:00',
        subject: 'Unix',
        iconUrl: iconUrls[3],
      },
    ],
  },
};

export const CurrentUpcomingClasses: Story = {
  args: {
    events: [
      {
        date: '28 July',
        time: '15:00 - 16:23',
        subject: 'Data Structures',
        iconUrl: iconUrls[0],
      },
      {
        date: '29 July',
        time: '11:00 - 12:30',
        subject: 'Algorithms',
        iconUrl: iconUrls[1],
      },
      {
        date: '29 July',
        time: '10:30 - 12:30',
        subject: 'Operating Systems',
        iconUrl: iconUrls[2],
      },
      {
        date: '30 July',
        time: '14:00 - 15:30',
        subject: 'Database Systems',
        iconUrl: iconUrls[3],
      },
      {
        date: '31 July',
        time: '14:00 - 15:30',
        subject: 'Database Systems',
        iconUrl: iconUrls[3],
      },
    ],
  },
};

export const OnlyTwoClasses: Story = {
  args: {
    events: [
      {
        date: '31 July',
        time: '10:00 - 11:30',
        subject: 'Machine Learning',
        iconUrl: iconUrls[0],
      },
      {
        date: '31 July',
        time: '14:00 - 15:30',
        subject: 'Web Development',
        iconUrl: iconUrls[1],
      },
    ],
  },
};

export const ExactlyFourClasses: Story = {
  args: {
    events: [
      {
        date: '22 July',
        time: '08:00 - 09:30',
        subject: 'Network Security',
        iconUrl: iconUrls[0],
      },
      {
        date: '22 July',
        time: '10:00 - 11:30',
        subject: 'Cloud Computing',
        iconUrl: iconUrls[1],
      },
      {
        date: '23 July',
        time: '13:00 - 14:30',
        subject: 'Mobile Development',
        iconUrl: iconUrls[2],
      },
      {
        date: '24 July',
        time: '15:00 - 16:30',
        subject: 'DevOps',
        iconUrl: iconUrls[3],
      },
    ],
  },
};
