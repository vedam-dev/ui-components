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

const today = new Date();
const todayStr = today.toISOString().split('T')[0];

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0];

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

export const Default: Story = {
  args: {
    events: [
      {
        date: yesterdayStr,
        time: '14:00 - 17:30',
        subject: 'Computer Science',
        iconUrl: iconUrls[0],
      },
      {
        date: todayStr,
        time: '08:00 - 09:30',
        subject: 'JAVA',
        iconUrl: iconUrls[1],
      },
      {
        date: todayStr,
        time: '10:30 - 23:30',
        subject: 'Mathematics',
        iconUrl: iconUrls[2],
      },
      {
        date: tomorrowStr,
        time: '15:30 - 18:30',
        subject: 'Unix',
        iconUrl: iconUrls[3],
      },
      {
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '09:00 - 11:00',
        subject: 'Data Structures',
        iconUrl: iconUrls[0],
      },
      {
        date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '14:00 - 16:00',
        subject: 'Algorithms',
        iconUrl: iconUrls[1],
      },
    ],
  },
};

export const CurrentOngoing: Story = {
  args: {
    events: [
      {
        date: yesterdayStr,
        time: '15:00 - 16:23',
        subject: 'Data Structures',
        iconUrl: iconUrls[0],
      },
      {
        date: todayStr,
        time: '00:00 - 23:59',
        subject: 'Algorithms (All Day)',
        iconUrl: iconUrls[1],
      },
      {
        date: tomorrowStr,
        time: '10:30 - 12:30',
        subject: 'Operating Systems',
        iconUrl: iconUrls[2],
      },
      {
        date: tomorrowStr,
        time: '14:00 - 15:30',
        subject: 'Database Systems',
        iconUrl: iconUrls[3],
      },
      {
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '09:00 - 11:00',
        subject: 'Web Development',
        iconUrl: iconUrls[0],
      },
    ],
  },
};

export const AllUpcoming: Story = {
  args: {
    events: [
      {
        date: tomorrowStr,
        time: '08:00 - 09:30',
        subject: 'Network Security',
        iconUrl: iconUrls[0],
      },
      {
        date: tomorrowStr,
        time: '10:00 - 11:30',
        subject: 'Cloud Computing',
        iconUrl: iconUrls[1],
      },
      {
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '13:00 - 14:30',
        subject: 'Mobile Development',
        iconUrl: iconUrls[2],
      },
      {
        date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '15:00 - 16:30',
        subject: 'DevOps',
        iconUrl: iconUrls[3],
      },
      {
        date: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '09:00 - 10:30',
        subject: 'Machine Learning',
        iconUrl: iconUrls[0],
      },
      {
        date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '11:00 - 12:30',
        subject: 'Blockchain',
        iconUrl: iconUrls[1],
      },
    ],
  },
};
