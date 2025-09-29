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
    image: {
      control: {
        type: 'select',
        options: ['default', 'unsplash', 'placeholder'],
        mapping: {
          default: '/notpossible.png',
          unsplash:
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
          placeholder: 'https://via.placeholder.com/800x400',
        },
      },
      description: 'Image URL for left side (select a preset or provide a URL)',
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
