import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SwitchRole from '../../../component/organism/switch/Switch';

const meta: Meta<typeof SwitchRole> = {
  title: 'Organism/SwitchRole',
  component: SwitchRole,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Card-based role switching component that displays all available roles for a user across campuses, with async loading state support.',
      },
    },
  },
  argTypes: {
    onSwitchRole: { action: 'role switched' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    loadingValue: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    sx: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchRole>;

const defaultOptions = [
  {
    value: 'program-manager-pune',
    role: 'Program Manager',
    campus: 'Pune',
    institutionName: 'Ajeenkya D.Y. Patil University',
  },
  {
    value: 'admin-gurugram',
    role: 'Admin',
    campus: 'Gurugram',
    institutionName: 'Sushant University of Engineering & Technology',
  },
  {
    value: 'instructor-pune',
    role: 'Instructor',
    campus: 'Pune',
    institutionName: 'Ajeenkya D.Y. Patil University',
  },
  {
    value: 'instructor-gurugram',
    role: 'Instructor',
    campus: 'Gurugram',
    institutionName: 'Sushant University of Engineering & Technology',
  },
  {
    value: 'admin-pune',
    role: 'Admin',
    campus: 'Pune',
    institutionName: 'Ajeenkya D.Y. Patil University',
  },
];

const Interactive = (args: any) => {
  const [loadingValue, setLoadingValue] = useState<string | undefined>(undefined);

  const handleSwitchRole = async (role: any) => {
    setLoadingValue(role.value);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingValue(undefined);
    args.onSwitchRole?.(role);
  };

  return (
    <SwitchRole
      {...args}
      loadingValue={args.loadingValue ?? loadingValue}
      onSwitchRole={handleSwitchRole}
    />
  );
};

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
  },
};

export const SingleRole: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [defaultOptions[0]],
  },
};

export const TwoRoles: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions.slice(0, 2),
  },
};

export const WithLoadingState: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
    loadingValue: 'instructor-pune',
  },
};

export const WithDisabledOption: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      defaultOptions[0],
      { ...defaultOptions[1], disabled: true },
      defaultOptions[2],
      defaultOptions[3],
      defaultOptions[4],
    ],
  },
};

export const AllDisabled: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
    disabled: true,
  },
};

export const CustomTitle: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: defaultOptions,
    title: 'Switch Your Role',
    subtitle: 'Select the role you want to access',
  },
};

export const ManyRoles: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      ...defaultOptions,
      {
        value: 'mentor-mumbai',
        role: 'Mentor',
        campus: 'Mumbai',
        institutionName: 'Vedam School of Technology',
      },
      {
        value: 'coordinator-bangalore',
        role: 'Coordinator',
        campus: 'Bangalore',
        institutionName: 'Vedam School of Technology',
      },
    ],
  },
};
