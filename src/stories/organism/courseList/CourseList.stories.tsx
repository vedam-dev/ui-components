import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CourseList from '../../../component/organism/courseList/CourseList';

const meta: Meta<typeof CourseList> = {
  title: 'Organism/CourseList',
  component: CourseList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card-based course selection component with pastel gradient backgrounds.',
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
    sx: { control: 'object' },
  },
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof CourseList>;

const Interactive = (args: any) => {
  const [value, setValue] = useState(args.value ?? 'java');
  return <CourseList {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'java', label: 'Java' },
      { value: 'mathematics', label: 'Mathematics' },
      { value: 'web-development', label: 'Web Development' },
      { value: 'physics', label: 'Physics' },
    ],
    value: 'java',
    title: 'Course List',
    subtitle: "Choose a course to view it's contest details",
  },
};

export const WithMathematicsSelected: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'java', label: 'Java' },
      { value: 'mathematics', label: 'Mathematics' },
      { value: 'web-development', label: 'Web Development' },
      { value: 'physics', label: 'Physics' },
    ],
    value: 'mathematics',
  },
};

export const WithManyCourses: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'java', label: 'Java' },
      { value: 'mathematics', label: 'Mathematics' },
      { value: 'web-development', label: 'Web Development' },
      { value: 'physics', label: 'Physics' },
      { value: 'chemistry', label: 'Chemistry' },
      { value: 'biology', label: 'Biology' },
      { value: 'english', label: 'English' },
      { value: 'history', label: 'History' },
    ],
    value: 'chemistry',
  },
};

export const WithDisabledOption: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'java', label: 'Java' },
      { value: 'mathematics', label: 'Mathematics', disabled: true },
      { value: 'web-development', label: 'Web Development' },
      { value: 'physics', label: 'Physics' },
    ],
    value: 'java',
  },
};

export const Disabled: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    disabled: true,
    value: 'java',
  },
};

export const CustomTitles: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    title: 'Select Your Subject',
    subtitle: 'Pick a subject to begin your learning journey',
    value: 'java',
  },
};

export const TwoCourses: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'frontend', label: 'Frontend Development' },
      { value: 'backend', label: 'Backend Development' },
    ],
    value: 'frontend',
  },
};
