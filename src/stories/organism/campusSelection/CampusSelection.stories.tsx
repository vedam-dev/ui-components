import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CampusSelection from '../../../component/organism/campusSelection/CampusSelection';

const meta: Meta<typeof CampusSelection> = {
  title: 'Organism/CampusSelection',
  component: CampusSelection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card-based campus selection component with carousel pagination for browsing multiple campuses.',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    onSelectCampus: { action: 'campus selected' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    showNavigationButtons: { control: 'boolean' },
    itemsPerPage: { control: 'number' },
    sx: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CampusSelection>;

const defaultOptions = [
  {
    value: 'pune1',
    collegeName: 'Vedam School of Technology',
    campus: 'Campus : Pune',
    collegeId: '1234ABC',
    location: 'Ajeenkya DY Patil ABC Campus\nCharholi Budruk\nPune, Maharashtra',
    pincode: '412105',
  },
  {
    value: 'gurugram',
    collegeName: 'Vedam School of Technology',
    campus: 'Campus : Gurugram',
    collegeId: '5678ABC',
    location: 'Sector 39, Unitech Cyber Park, Gurugram\nHaryana',
    pincode: '360097',
  },
  {
    value: 'pune2',
    collegeName: 'Vedam School of Technology',
    campus: 'Campus : Pune',
    collegeId: '1234ABC',
    location: 'Ajeenkya DY Patil ABC Campus\nCharholi Budruk\nPune, Maharashtra',
    pincode: '412105',
  },
];

const Interactive = (args: any) => {
  const [value, setValue] = useState(args.value ?? 'pune1');
  return (
    <CampusSelection
      {...args}
      value={value}
      onChange={setValue}
      onSelectCampus={(campus) => {
        console.log('Selected campus:', campus);
        args.onSelectCampus?.(campus);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
    value: 'pune1',
    showNavigationButtons: true,
    itemsPerPage: 3,
  },
};

export const WithPagination: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      ...defaultOptions,
      {
        value: 'mumbai',
        collegeName: 'Vedam School of Technology',
        campus: 'Campus : Mumbai',
        collegeId: '9012ABC',
        location: 'Powai, Hiranandani Gardens\nMumbai, Maharashtra',
        pincode: '400076',
      },
    ],
    value: 'pune1',
    itemsPerPage: 3,
  },
};

export const ManyCampuses: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      ...defaultOptions,
      {
        value: 'mumbai',
        collegeName: 'Vedam School of Technology',
        campus: 'Campus : Mumbai',
        collegeId: '9012ABC',
        location: 'Powai, Hiranandani Gardens\nMumbai, Maharashtra',
        pincode: '400076',
      },
      {
        value: 'bangalore',
        collegeName: 'Vedam School of Technology',
        campus: 'Campus : Bangalore',
        collegeId: '3456ABC',
        location: 'Electronic City Phase 1\nBangalore, Karnataka',
        pincode: '560100',
      },
      {
        value: 'hyderabad',
        collegeName: 'Vedam School of Technology',
        campus: 'Campus : Hyderabad',
        collegeId: '7890ABC',
        location: 'HITEC City, Madhapur\nHyderabad, Telangana',
        pincode: '500081',
      },
      {
        value: 'delhi',
        collegeName: 'Vedam School of Technology',
        campus: 'Campus : Delhi',
        collegeId: '2468ABC',
        location: 'Connaught Place\nNew Delhi, Delhi',
        pincode: '110001',
      },
    ],
    value: 'mumbai',
    itemsPerPage: 3,
  },
};

export const TwoPerPage: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      ...defaultOptions,
      {
        value: 'mumbai',
        collegeName: 'Vedam School of Technology',
        campus: 'Campus : Mumbai',
        collegeId: '9012ABC',
        location: 'Powai, Hiranandani Gardens\nMumbai, Maharashtra',
        pincode: '400076',
      },
      {
        value: 'bangalore',
        collegeName: 'Vedam School of Technology',
        campus: 'Campus : Bangalore',
        collegeId: '3456ABC',
        location: 'Electronic City Phase 1\nBangalore, Karnataka',
        pincode: '560100',
      },
    ],
    value: 'pune1',
    itemsPerPage: 2,
  },
};

export const WithoutNavigation: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
    value: 'gurugram',
    showNavigationButtons: false,
  },
};

export const WithDisabledOption: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      defaultOptions[0],
      {
        ...defaultOptions[1],
        disabled: true,
      },
      defaultOptions[2],
    ],
    value: 'pune1',
  },
};

export const Disabled: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
    disabled: true,
    value: 'pune1',
  },
};

export const CustomTitle: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
    value: 'gurugram',
    title: 'Select Your Campus',
    subtitle: 'Pick the campus location that works best for you',
  },
};