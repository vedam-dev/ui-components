import type { Meta, StoryObj } from '@storybook/react';
import DynamicBreadcrumbs from '../../../component/organism/breadcrumbs/BreadCrumbs';

const meta: Meta<typeof DynamicBreadcrumbs> = {
  title: 'Organism/DynamicBreadcrumbs',
  component: DynamicBreadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dynamic breadcrumb component with Material-UI styling and interactive items.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
    },
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumb items',
    },
    sx: {
      control: 'object',
      description: 'Custom styles for the breadcrumbs container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DynamicBreadcrumbs>;

const sampleItems = [{ label: 'Contest' }, { label: 'Course List' }, { label: 'Overall Scores' }];

const interactiveItems = [
  { label: 'Home', href: '#home', onClick: () => console.log('Home clicked') },
  { label: 'Contest', href: '#contest', onClick: () => console.log('Contest clicked') },
  { label: 'Course List', href: '#courses', onClick: () => console.log('Courses clicked') },
  { label: 'Overall Scores' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default breadcrumb view matching the provided image with "Contest > Course List > Overall Scores"',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    items: interactiveItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive breadcrumbs where items are clickable and have hover effects',
      },
    },
  },
};

export const CustomSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '/',
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with custom slash separator instead of default chevron',
      },
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Single breadcrumb item (no separators shown)',
      },
    },
  },
};

export const TwoItems: Story = {
  args: {
    items: [{ label: 'Contest', href: '#contest' }, { label: 'Overall Scores' }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with two items',
      },
    },
  },
};

export const LongTrail: Story = {
  args: {
    items: [
      { label: 'Home', href: '#home' },
      { label: 'Academic', href: '#academic' },
      { label: 'Computer Science', href: '#cs' },
      { label: 'Programming', href: '#programming' },
      { label: 'Contest', href: '#contest' },
      { label: '2024 Season', href: '#2024' },
      { label: 'Overall Scores' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Long breadcrumb trail demonstrating truncation behavior',
      },
    },
  },
};

export const CustomStyled: Story = {
  args: {
    items: sampleItems,
    sx: {
      p: 2,
      backgroundColor: '#F9FAFB',
      borderRadius: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with custom container styling',
      },
    },
  },
};
