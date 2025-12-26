import type { Meta, StoryObj } from '@storybook/react';
import LectureCard from '../../../component/organism/lectureCard/LectureCard';

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
      description: 'Lecture state that controls title color (inFuture=green, hasEnded=blue, undefined=black)',
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
    onWatch: { action: 'watchClicked' },
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

export const WithSubtitle: Story = {
  args: {
    title: 'Machine Learning Coding',
    subtitle: 'Advanced Neural Networks and Deep Learning',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
    buttonText: 'Start Recording',
  },
};


export const LongTitle: Story = {
  args: {
    title: 'Machine Learning Coding — Deep Dive: CNNs, RNNs, Transformers and Practical Projects',
    date: 'Wednesday, 10 June 2025',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
  },
};

export const FutureLecture: Story = {
  args: {
    title: 'Upcoming Advanced Python Workshop',
    date: 'Monday, 15 January 2026',
    lectureState: 'inFuture',
    disabled: true,
  },
};

export const EndedLecture: Story = {
  args: {
    title: 'Introduction to Data Science',
    date: 'Friday, 20 December 2024',
    lectureState: 'hasEnded',
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
  },
};

export const EndedLectureWithSubtitle: Story = {
  args: {
    title: 'Web Development Masterclass',
    subtitle: 'Building modern web applications with React and Node.js',
    date: 'Tuesday, 10 December 2024',
    lectureState: 'hasEnded',
  },
};

export const CompactVariant: Story = {
  args: {
    title: 'Quick Tutorial Session',
    date: 'Wednesday, 10 June 2025',
    variant: 'compact',
  },
};

export const CompactFutureLecture: Story = {
  args: {
    title: 'Git & GitHub Workshop',
    date: 'Saturday, 25 January 2026',
    variant: 'compact',
    lectureState: 'inFuture',
    disabled: true,
  },
};

export const CompactEndedLecture: Story = {
  args: {
    title: 'CSS Grid & Flexbox',
    date: 'Monday, 18 December 2024',
    variant: 'compact',
    lectureState: 'hasEnded',
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
  },
};

export const AllStatesComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <LectureCard
        title="Default State (No lectureState prop)"
        date="Wednesday, 10 June 2025"
      />
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
    </div>
  ),
};