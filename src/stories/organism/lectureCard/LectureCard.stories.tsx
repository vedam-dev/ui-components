import type { Meta, StoryObj } from '@storybook/react';
import LectureCard, {
  LectureCardMenuItem,
} from '../../../component/organism/lectureCard/LectureCard';

// Helper function for detailed console output
const logMenuClick = (action: string, context: Parameters<LectureCardMenuItem['onClick']>[0]) => {
  console.group(`🔘 Menu Item Clicked: ${action}`);
  console.log('📋 Context Data:', {
    title: context.title,
    date: context.date,
    subtitle: context.subtitle,
    lectureState: context.lectureState,
    attendanceStatus: context.attendanceStatus,
    disabled: context.disabled,
    image: context.image,
  });
  console.table({
    Title: context.title,
    Date: context.date,
    Subtitle: context.subtitle || 'N/A',
    'Lecture State': context.lectureState || 'default',
    'Attendance Status': context.attendanceStatus || 'N/A',
    Disabled: context.disabled ? 'Yes' : 'No',
  });
  console.groupEnd();
};

const meta: Meta<typeof LectureCard> = {
  title: 'Organism/LectureCard',
  component: LectureCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title of the lecture card',
    },
    date: {
      control: 'text',
      description: 'Date / subtitle shown under the title',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle text',
    },
    image: {
      control: {
        type: 'select',
        options: ['default', 'unsplash', 'placeholder'],
        mapping: {
          default:
            'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Image.png',
          unsplash:
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
          placeholder: 'https://via.placeholder.com/800x400',
        },
      },
      description: 'Image URL for left side (select a preset or provide a URL)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the watch button and play icon',
    },
    lectureState: {
      control: {
        type: 'select',
        options: [undefined, 'inFuture', 'hasEnded'],
      },
      description:
        'Lecture state that controls title color (inFuture=green, hasEnded=blue, undefined=black)',
    },
    variant: {
      control: {
        type: 'select',
        options: ['default', 'compact'],
      },
      description: 'Card size variant',
    },
    showImageHighlight: {
      control: 'boolean',
      description: 'Show decorative highlight border on image',
    },
    attendanceStatus: {
      control: {
        type: 'select',
        options: [
          undefined,
          'Present',
          'Absent',
          'Late',
          'Leave',
          'Excused',
          'Awaiting Start',
          'Session in progress',
          '',
        ],
      },
      description: 'Attendance status (if undefined, badge not shown; if empty string, shows "NA")',
    },
    menuItems: {
      control: 'object',
      description:
        'Array of menu items to display in the menu. Each item should have label, optional icon, and onClick handler.',
    },
    onWatch: { action: 'watchClicked' },
    onButtonClick: { action: 'buttonClicked' },
    sx: {
      control: 'object',
      description: 'Optional MUI sx overrides for the root container',
    },
  },
} satisfies Meta<typeof LectureCard>;

export default meta;
type Story = StoryObj<typeof LectureCard>;

export const Default: Story = {
  args: {
    title: 'Machine Learning Coding',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
  },
};

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <mask
      id="mask0_4985_3043"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <rect width="16" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_4985_3043)">
      <path
        d="M5.75 12.499C5.3375 12.499 4.98438 12.3521 4.69063 12.0584C4.39688 11.7646 4.25 11.4115 4.25 10.999V1.99902C4.25 1.58652 4.39688 1.2334 4.69063 0.939648C4.98438 0.645898 5.3375 0.499023 5.75 0.499023H12.5C12.9125 0.499023 13.2656 0.645898 13.5594 0.939648C13.8531 1.2334 14 1.58652 14 1.99902V10.999C14 11.4115 13.8531 11.7646 13.5594 12.0584C13.2656 12.3521 12.9125 12.499 12.5 12.499H5.75ZM5.75 10.999H12.5V1.99902H5.75V10.999ZM2.75 15.499C2.3375 15.499 1.98438 15.3521 1.69063 15.0584C1.39688 14.7646 1.25 14.4115 1.25 13.999V3.49902H2.75V13.999H11V15.499H2.75Z"
        fill="#777777"
      />
    </g>
  </svg>
);

export const WithMenuItems: Story = {
  args: {
    title: 'Machine Learning Coding',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
    menuItems: [
      {
        id: 'copy-urid',
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
          // Portal can use context.title, context.date, etc.
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Machine Learning Coding',
    subtitle: 'Advanced Neural Networks and Deep Learning',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
  },
};

export const WithSubtitleAndMenuItems: Story = {
  args: {
    title: 'Machine Learning Coding',
    subtitle: 'Advanced Neural Networks and Deep Learning',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
    menuItems: [
      {
        id: 'copy-urid',
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
      {
        id: 'share',
        label: 'Share',
        onClick: (context) => {
          logMenuClick('Share', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Machine Learning Coding — Deep Dive: CNNs, RNNs, Transformers and Practical Projects',
    date: 'Wednesday, 10 June 2025',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const FutureLecture: Story = {
  args: {
    title: 'Upcoming Advanced Python Workshop',
    date: 'Monday, 15 January 2026',
    lectureState: 'inFuture',
    disabled: true,
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const EndedLecture: Story = {
  args: {
    title: 'Introduction to Data Science',
    date: 'Friday, 20 December 2024',
    lectureState: 'hasEnded',
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const FutureLectureWithSubtitle: Story = {
  args: {
    title: 'Deep Learning Fundamentals',
    subtitle: 'Learn the basics of neural networks and backpropagation',
    date: 'Thursday, 30 January 2026',
    lectureState: 'inFuture',
    disabled: true,
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const EndedLectureWithSubtitle: Story = {
  args: {
    title: 'Web Development Masterclass',
    subtitle: 'Building modern web applications with React and Node.js',
    date: 'Tuesday, 10 December 2024',
    lectureState: 'hasEnded',
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const CompactVariant: Story = {
  args: {
    title: 'Quick Tutorial Session',
    date: 'Wednesday, 10 June 2025',
    variant: 'compact',
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const CompactFutureLecture: Story = {
  args: {
    title: 'Git & GitHub Workshop',
    date: 'Saturday, 25 January 2026',
    variant: 'compact',
    lectureState: 'inFuture',
    disabled: true,
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const CompactEndedLecture: Story = {
  args: {
    title: 'CSS Grid & Flexbox',
    date: 'Monday, 18 December 2024',
    variant: 'compact',
    lectureState: 'hasEnded',
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const DisabledDefault: Story = {
  args: {
    title: 'Maintenance - Temporarily Unavailable',
    date: 'Wednesday, 10 June 2025',
    disabled: true,
  },
};

export const WithoutImageHighlight: Story = {
  args: {
    title: 'Clean Design Lecture',
    date: 'Wednesday, 10 June 2025',
    showImageHighlight: false,
    menuItems: [
      {
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const AllStatesComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <LectureCard title="Default State (No lectureState prop)" date="Wednesday, 10 June 2025" />
      <LectureCard
        title="Future Lecture (Green Title)"
        date="Monday, 15 January 2026"
        lectureState="inFuture"
        disabled={true}
      />
      <LectureCard
        title="Ended Lecture (Blue Title)"
        date="Friday, 20 December 2024"
        lectureState="hasEnded"
      />
      <LectureCard
        title="Present"
        date="Wednesday, 10 June 2025"
        lectureState="inFuture"
        attendanceStatus="Present"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard
        title="Absent"
        date="Wednesday, 10 June 2025"
        attendanceStatus="Absent"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard
        title="Late"
        date="Wednesday, 10 June 2025"
        attendanceStatus="Late"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard
        title="Leave"
        date="Wednesday, 10 June 2025"
        attendanceStatus="Leave"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard
        title="Excused"
        date="Wednesday, 10 June 2025"
        attendanceStatus="Excused"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard
        title="Awaiting Start"
        date="Wednesday, 10 June 2025"
        attendanceStatus="Awaiting Start"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard
        title="Session in progress"
        date="Wednesday, 10 June 2025"
        attendanceStatus="Session in progress"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard
        title="NA (Empty String)"
        date="Wednesday, 10 June 2025"
        attendanceStatus="NA"
        menuItems={[
          {
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
        ]}
      />
      <LectureCard title="No Attendance Status (undefined)" date="Wednesday, 10 June 2025" />
      <LectureCard
        title="With Menu Items - No Attendance"
        date="Wednesday, 10 June 2025"
        menuItems={[
          {
            id: 'copy-urid',
            label: 'Copy URID',
            icon: <CopyIcon />,
            onClick: (context) => logMenuClick('Copy URID', context),
          },
          {
            id: 'share',
            label: 'Share',
            onClick: (context) => logMenuClick('Share', context),
          },
        ]}
      />
    </div>
  ),
};

export const DynamicMenuWithConditionalVisibility: Story = {
  args: {
    title: 'Machine Learning Coding',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
    menuItems: [
      {
        id: 'copy-urid',
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
        // Always visible
        visible: true,
      },
      {
        id: 'edit',
        label: 'Edit Lecture',
        onClick: (context) => {
          logMenuClick('Edit Lecture', context);
        },
        // Only visible for future lectures
        visible: (context) => context.lectureState === 'inFuture',
      },
      {
        id: 'delete',
        label: 'Delete',
        onClick: (context) => {
          logMenuClick('Delete', context);
        },
        // Only visible for ended lectures
        visible: (context) => context.lectureState === 'hasEnded',
      },
      {
        id: 'share',
        label: 'Share',
        onClick: (context) => {
          logMenuClick('Share', context);
        },
        // Always visible
      },
    ] as LectureCardMenuItem[],
  },
};

export const DynamicMenuWithDisabledItems: Story = {
  args: {
    title: 'Machine Learning Coding',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
    disabled: true,
    menuItems: [
      {
        id: 'copy-urid',
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context) => {
          logMenuClick('Copy URID', context);
        },
      },
      {
        id: 'edit',
        label: 'Edit Lecture',
        onClick: (context) => {
          logMenuClick('Edit Lecture', context);
        },
        disabled: true, // This item is disabled
      },
      {
        id: 'share',
        label: 'Share',
        onClick: (context) => {
          logMenuClick('Share', context);
        },
      },
    ] as LectureCardMenuItem[],
  },
};

export const DynamicMenuWithContext: Story = {
  args: {
    title: 'Advanced React Patterns',
    subtitle: 'Hooks, Context, and Performance Optimization',
    date: 'Friday, 20 December 2024',
    lectureState: 'hasEnded',
    attendanceStatus: 'Present',
    menuItems: [
      {
        id: 'copy-urid',
        label: 'Copy URID',
        icon: <CopyIcon />,
        onClick: (context, _event) => {
          logMenuClick('Copy URID', context);
          // Portal can use this context to perform actions
        },
      },
      {
        id: 'view-details',
        label: 'View Details',
        onClick: (context) => {
          logMenuClick('View Details', context);
          alert(`Viewing details for: ${context.title}\nDate: ${context.date}`);
        },
      },
      {
        id: 'download',
        label: 'Download Recording',
        onClick: (context) => {
          logMenuClick('Download Recording', context);
        },
        // Only show download for ended lectures
        visible: (context) => context.lectureState === 'hasEnded',
      },
    ] as LectureCardMenuItem[],
  },
};
