import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import IconDropdown from '../../../component/molecule/icon-dropdown/IconDropdown';

const meta: Meta<typeof IconDropdown> = {
  title: 'Molecule/IconDropdown',
  component: IconDropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconDropdown>;

export const MonthDropdown: Story = {
  render: (args) => <IconDropdown {...args} />,
  args: {
    label: 'June 2025',
    iconUrl:
      'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/certificate/Vector-2.jpg',
    options: ['May 2025', 'June 2025', 'July 2025'],
  },
};

export const SemesterDropdown: Story = {
  render: (args) => <IconDropdown {...args} />,
  args: {
    label: 'Semester',
    iconUrl:
      'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/certificate/Vector-3.jpg',
    options: ['Semester 1', 'Semester 2', 'Semester 3'],
  },
};
