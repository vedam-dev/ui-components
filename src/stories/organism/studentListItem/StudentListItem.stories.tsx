import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StudentListItem from '../../../component/organism/studentListItem/StudentListItem';

const meta: Meta<typeof StudentListItem> = {
  title: 'Organism/StudentListItem',
  component: StudentListItem,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'number',
      description: 'Student ID',
    },
    name: {
      control: 'text',
      description: 'Student name',
    },
    email: {
      control: 'text',
      description: 'Student email address',
    },
    status: {
      control: 'select',
      options: ['Active', 'Inactive'],
      description: 'Student status',
    },
    bgColor: {
      control: 'color',
      description: 'Background color for the card',
    },
    onViewDetails: {
      action: 'View Details clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StudentListItem>;

// Active student
export const ActiveStudent: Story = {
  args: {
    id: 1,
    name: 'Sameeksha Kapoor',
    email: 'sameeksha.kapoor@vedamsot.org',
    status: 'Active',
    bgColor: '#FFFFFF',
    onViewDetails: () => console.log('View Details clicked for Sameeksha Kapoor'),
  },
};

// Inactive student
export const InactiveStudent: Story = {
  args: {
    id: 2,
    name: 'Sameeksha Kapoor',
    email: 'sameeksha.kapoor@vedamsot.org',
    status: 'Inactive',
    bgColor: '#FFFFFF',
    onViewDetails: () => console.log('View Details clicked for Sameeksha Kapoor'),
  },
};

// Multiple students example
export const MultipleStudents: StoryObj = {
  render: () => (
    <div style={{ margin: '0 auto' }}>
      <StudentListItem
        id={1}
        name="Sameeksha Kapoor"
        email="sameeksha.kapoor@vedamsot.org"
        status="Active"
        bgColor="#FFFFFF"
        onViewDetails={() => console.log('View Details: Sameeksha Kapoor')}
      />
      <StudentListItem
        id={2}
        name="Sameeksha Kapoor"
        email="sameeksha.kapoor@vedamsot.org"
        status="Inactive"
        bgColor="#FFFFFF"
        onViewDetails={() => console.log('View Details: Sameeksha Kapoor')}
      />
      <StudentListItem
        id={3}
        name="Rahul Sharma"
        email="rahul.sharma@vedamsot.org"
        status="Active"
        bgColor="#FFFFFF"
        onViewDetails={() => console.log('View Details: Rahul Sharma')}
      />
      <StudentListItem
        id={4}
        name="Priya Patel"
        email="priya.patel@vedamsot.org"
        status="Active"
        bgColor="#FFFFFF"
        onViewDetails={() => console.log('View Details: Priya Patel')}
      />
      <StudentListItem
        id={5}
        name="Amit Kumar"
        email="amit.kumar@vedamsot.org"
        status="Inactive"
        bgColor="#FFFFFF"
        onViewDetails={() => console.log('View Details: Amit Kumar')}
      />
      <StudentListItem
        id={6}
        name="Neha Singh"
        email="neha.singh@vedamsot.org"
        status="Active"
        bgColor="#FFFFFF"
        onViewDetails={() => console.log('View Details: Neha Singh')}
      />
      <StudentListItem
        id={7}
        name="Vikram Rao"
        email="vikram.rao@vedamsot.org"
        status="Active"
        bgColor="#FFFFFF"
        onViewDetails={() => console.log('View Details: Vikram Rao')}
      />
    </div>
  ),
};
