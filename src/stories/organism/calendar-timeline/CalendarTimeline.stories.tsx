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
  "https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155723-2.png",
  "https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155723-3.png",
  "https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155723.png",
  "https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155731.png"
];

export const Default: Story = {
  args: {
    events: [
      {
        date: "10 June",
        time: "10:30 am - 12:30pm",
        subject: "Computer Science",
        iconUrl: iconUrls[0]
      },
      {
        date: "13 June",
        time: "10:30 am - 12:30pm",
        subject: "JAVA", 
        iconUrl: iconUrls[1]
      },
      {
        date: "14 June",
        time: "10:30 am - 12:30pm",
        subject: "Mathematics",
        iconUrl: iconUrls[2]
      },
      {
        date: "20 June",
        time: "10:30 am - 12:30pm",
        subject: "Unix",
        iconUrl: iconUrls[3]
      }
    ],
    visibleItems: 4
  }
};

export const WithMultipleEventsPerDate: Story = {
  args: {
    events: [
      {
        date: "10 June",
        time: "9:00 am - 10:00am",
        subject: "Computer Science",
        iconUrl: iconUrls[0]
      },
      {
        date: "10 June",
        time: "10:30 am - 12:30pm",
        subject: "Algorithms", 
        iconUrl: iconUrls[1]
      },
      {
        date: "10 June",
        time: "2:00 pm - 3:30pm",
        subject: "Data Structures",
        iconUrl: iconUrls[2]
      },
      
      {
        date: "11 June",
        time: "8:00 am - 9:30am",
        subject: "Operating Systems",
        iconUrl: iconUrls[3]
      },
      {
        date: "11 June",
        time: "10:00 am - 11:30am",
        subject: "Networking",
        iconUrl: iconUrls[0]
      },
      {
        date: "13 June",
        time: "10:30 am - 12:30pm",
        subject: "JAVA",
        iconUrl: iconUrls[1]
      }
    ],
    visibleItems: 4
  }
};

export const WithSingleDayMultipleEvents: Story = {
  args: {
    events: [
      {
        date: "15 June",
        time: "8:00 am - 9:00am",
        subject: "Morning Lecture",
        iconUrl: iconUrls[0]
      },
      {
        date: "15 June",
        time: "9:30 am - 10:30am",
        subject: "Lab Session", 
        iconUrl: iconUrls[1]
      },
      {
        date: "15 June",
        time: "11:00 am - 12:00pm",
        subject: "Group Discussion",
        iconUrl: iconUrls[2]
      },
      {
        date: "15 June",
        time: "1:00 pm - 2:30pm",
        subject: "Workshop",
        iconUrl: iconUrls[3]
      }
    ],
    visibleItems: 4
  }
};