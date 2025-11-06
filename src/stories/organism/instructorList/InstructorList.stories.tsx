import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InstructorList from '../../../component/organism/instructorList/InstructorList';

const meta: Meta<typeof InstructorList> = {
  title: 'Organism/InstructorList',
  component: InstructorList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card-based instructor selection component with ratings and pastel gradient backgrounds.',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    variant: {
      control: 'select',
      options: ['instructor', 'semester'],
    },
    sx: { control: 'object' },
  },
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof InstructorList>;

const Interactive = (args: any) => {
  const [value, setValue] = useState(args.value ?? 'john-1');
  return <InstructorList {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'john-1', name: 'John Doe', rating: 5 },
      { value: 'john-2', name: 'John Doe', rating: 4.5 },
      { value: 'john-3', name: 'John Doe', rating: 5 },
      { value: 'john-4', name: 'John Doe', rating: 4.5 },
      { value: 'john-5', name: 'John Doe', rating: 5 },
      { value: 'john-6', name: 'John Doe', rating: 5 },
      { value: 'john-7', name: 'John Doe', rating: 4.5 },
      { value: 'john-8', name: 'John Doe', rating: 5 },
    ],
    value: 'john-1',
    title: 'Instructor List',
    subtitle: 'Choose a an instructor to view their ratings',
  },
};

export const SemesterVariant: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    variant: 'semester',
    options: [
      { value: 'sem-1', name: 'Semester 1' },
      { value: 'sem-2', name: 'Semester 2' },
      { value: 'sem-3', name: 'Semester 3' },
      { value: 'sem-4', name: 'Semester 4' },
      { value: 'sem-5', name: 'Semester 5' },
      { value: 'sem-6', name: 'Semester 6' },
      { value: 'sem-7', name: 'Semester 7' },
      { value: 'sem-8', name: 'Semester 8' },
    ],
    value: 'sem-1',
    title: 'Semester List',
    subtitle: 'Choose a semester in the chosen program',
  },
};

export const WithDifferentInstructors: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'jane-smith', name: 'Jane Smith', rating: 5 },
      { value: 'bob-johnson', name: 'Bob Johnson', rating: 4.5 },
      { value: 'alice-williams', name: 'Alice Williams', rating: 4.8 },
      { value: 'charlie-brown', name: 'Charlie Brown', rating: 4.2 },
      { value: 'diana-davis', name: 'Diana Davis', rating: 5 },
      { value: 'evan-miller', name: 'Evan Miller', rating: 4.7 },
    ],
    value: 'jane-smith',
  },
};

export const WithSelectedInstructor: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'john-1', name: 'John Doe', rating: 5 },
      { value: 'john-2', name: 'John Doe', rating: 4.5 },
      { value: 'john-3', name: 'John Doe', rating: 5 },
      { value: 'john-4', name: 'John Doe', rating: 4.5 },
    ],
    value: 'john-3',
  },
};

export const WithDisabledOption: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'john-1', name: 'John Doe', rating: 5 },
      { value: 'john-2', name: 'John Doe', rating: 4.5, disabled: true },
      { value: 'john-3', name: 'John Doe', rating: 5 },
      { value: 'john-4', name: 'John Doe', rating: 4.5 },
    ],
    value: 'john-1',
  },
};

export const Disabled: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    disabled: true,
    value: 'john-1',
  },
};

export const CustomTitles: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    title: 'Select Your Instructor',
    subtitle: 'Pick an instructor to view their detailed ratings and reviews',
    value: 'john-1',
  },
};

export const FewInstructors: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'prof-1', name: 'Prof. Smith', rating: 5 },
      { value: 'prof-2', name: 'Dr. Johnson', rating: 4.8 },
      { value: 'prof-3', name: 'Ms. Williams', rating: 4.5 },
    ],
    value: 'prof-1',
  },
};

export const ManyInstructors: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'inst-1', name: 'John Doe', rating: 5 },
      { value: 'inst-2', name: 'Jane Smith', rating: 4.5 },
      { value: 'inst-3', name: 'Bob Wilson', rating: 4.8 },
      { value: 'inst-4', name: 'Alice Brown', rating: 4.2 },
      { value: 'inst-5', name: 'Charlie Davis', rating: 5 },
      { value: 'inst-6', name: 'Diana Miller', rating: 4.7 },
      { value: 'inst-7', name: 'Evan Taylor', rating: 4.9 },
      { value: 'inst-8', name: 'Fiona Anderson', rating: 4.6 },
      { value: 'inst-9', name: 'George Thomas', rating: 5 },
      { value: 'inst-10', name: 'Hannah Jackson', rating: 4.4 },
      { value: 'inst-11', name: 'Ian White', rating: 4.8 },
      { value: 'inst-12', name: 'Julia Harris', rating: 4.3 },
    ],
    value: 'inst-5',
  },
};

export const VariousRatings: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'rate-1', name: 'Perfect Teacher', rating: 5 },
      { value: 'rate-2', name: 'Great Teacher', rating: 4.9 },
      { value: 'rate-3', name: 'Good Teacher', rating: 4.5 },
      { value: 'rate-4', name: 'Nice Teacher', rating: 4.2 },
      { value: 'rate-5', name: 'Okay Teacher', rating: 4 },
      { value: 'rate-6', name: 'Average Teacher', rating: 3.8 },
    ],
    value: 'rate-1',
  },
};
