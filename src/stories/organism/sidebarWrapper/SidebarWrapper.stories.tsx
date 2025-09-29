import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SidebarWrapper from '../../../component/organism/sidebarWrapper/SidebarWrapper';
import { SidebarItem } from '@component/organism/sidebardrawer/SidebarDrawer';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

const customItems: SidebarItem[] = [
  {
    id: 'custom-dashboard',
    icon: <DashboardIcon />,
    text: 'Custom Dashboard',
    onClick: () => console.log('Custom Dashboard clicked'),
  },
  {
    id: 'custom-users',
    icon: <PeopleIcon />,
    text: 'Custom Users',
    onClick: () => console.log('Custom Users clicked'),
  },
  {
    id: 'custom-analytics',
    icon: <AnalyticsIcon />,
    text: 'Custom Analytics',
    onClick: () => console.log('Custom Analytics clicked'),
  },
];

export default {
  title: 'Organism/SidebarWrapper',
  component: SidebarWrapper,
  argTypes: {
    items: { control: 'object' },
  },
} as Meta<typeof SidebarWrapper>;

type Story = StoryObj<typeof SidebarWrapper>;

export const Default: Story = {
  args: {},
};

export const WithCustomItems: Story = {
  args: {
    items: customItems,
  },
};
export const WithCustomItemsWithoutStats: Story = {
  args: {
    items: customItems,
    hideStatsContainer: true,
  },
};
