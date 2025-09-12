import { Meta, StoryObj } from '@storybook/react';
import IconDropdown from '../../../component/molecule/icon-dropdown/IconDropdown';

const meta: Meta<typeof IconDropdown> = {
  title: 'Molecule/IconDropdown',
  component: IconDropdown,
  tags: ['autodocs'],
  argTypes: {
    autoWidth: {
      control: 'boolean',
      description: 'Automatically adjust width based on content length',
    },
    minWidth: {
      control: 'number',
      description: 'Minimum width when autoWidth is enabled',
    },
  },
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

// New variant without icon
export const TextOnlyDropdown: Story = {
  render: (args) => <IconDropdown {...args} />,
  args: {
    label: 'Select Status',
    options: ['Active', 'Inactive', 'Pending', 'Completed'],
  },
};

// New variant with auto width
export const AutoWidthDropdown: Story = {
  render: (args) => <IconDropdown {...args} />,
  args: {
    label: 'Short',
    options: ['Short', 'Medium Length Option', 'Very Long Option Name Here'],
    autoWidth: true,
    minWidth: 100,
  },
};

// Combined variant: No icon + auto width
export const TextOnlyAutoWidth: Story = {
  render: (args) => <IconDropdown {...args} />,
  args: {
    label: 'Choose',
    options: ['Choose', 'A longer option text', 'Even much longer option text that extends further'],
    autoWidth: true,
    minWidth: 120,
  },
};