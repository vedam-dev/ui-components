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
      description: 'Date shown under the title',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle shown between title and date',
    },
    buttonText: {
      control: 'text',
      description: 'Text displayed on the action button',
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
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Card variant - default or compact',
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
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Machine Learning Coding — Deep Dive: CNNs, RNNs, Transformers and Practical Projects',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
  },
};

export const Compact: Story = {
  args: {
    title: 'Machine Learning Coding',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Watch Now',
    variant: 'compact',
  },
};

export const WithoutImageHighlight: Story = {
  args: {
    title: 'Machine Learning Coding',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Start Recording',
    showImageHighlight: false,
  },
};

export const CustomButtonText: Story = {
  args: {
    title: 'Machine Learning Coding',
    date: 'Wednesday, 10 June 2025',
    buttonText: 'Watch Recording',
  },
};
