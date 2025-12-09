import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SidebarWrapper from '../../../component/organism/sidebarWrapper/SidebarWrapper';
import { SidebarItem } from '@component/organism/sidebardrawer/SidebarDrawer';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Payment as PaymentIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  EventNote as EventNoteIcon,
  Settings as SettingsIcon,
  Folder as FolderIcon,
  Assessment as AssessmentIcon,
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

const itemsWithSubmenus: SidebarItem[] = [
  {
    id: 'dashboard',
    icon: <DashboardIcon />,
    text: 'Dashboard',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'class-session',
    icon: <EventNoteIcon />,
    text: 'Class Session',
    onClick: () => console.log('Class Session clicked'),
  },
  {
    id: 'attendance',
    icon: <SchoolIcon />,
    text: 'Attendance',
    onClick: () => console.log('Attendance clicked'),
  },
  {
    id: 'assignments',
    icon: <AssignmentIcon />,
    text: 'Assignments',
    onClick: () => console.log('Assignments clicked'),
  },
  {
    id: 'fees',
    icon: <PaymentIcon />,
    text: 'Fees',
    submenu: [
      {
        id: 'fees-dashboard',
        text: 'Dashboard',
        onClick: () => console.log('Fees Dashboard clicked'),
      },
      {
        id: 'all-fees',
        text: 'All Fees',
        onClick: () => console.log('All Fees clicked'),
      },
      {
        id: 'create-fees',
        text: 'Create Fees',
        onClick: () => console.log('Create Fees clicked'),
      },
    ],
  },
  {
    id: 'users',
    icon: <PeopleIcon />,
    text: 'Users',
    onClick: () => console.log('Users clicked'),
  },
  {
    id: 'settings',
    icon: <SettingsIcon />,
    text: 'Settings',
    onClick: () => console.log('Settings clicked'),
  },
];

const complexItems: SidebarItem[] = [
  {
    id: 'dashboard',
    icon: <DashboardIcon />,
    text: 'Dashboard',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'analytics',
    icon: <AnalyticsIcon />,
    text: 'Analytics',
    submenu: [
      {
        id: 'overview',
        text: 'Overview',
        onClick: () => console.log('Analytics Overview clicked'),
      },
      {
        id: 'reports',
        text: 'Reports',
        onClick: () => console.log('Analytics Reports clicked'),
      },
      {
        id: 'insights',
        text: 'Insights',
        onClick: () => console.log('Analytics Insights clicked'),
      },
      {
        id: 'trends',
        text: 'Trends',
        onClick: () => console.log('Analytics Trends clicked'),
      },
    ],
  },
  {
    id: 'users',
    icon: <PeopleIcon />,
    text: 'Users',
    onClick: () => console.log('Users clicked'),
  },
  {
    id: 'content',
    icon: <FolderIcon />,
    text: 'Content',
    submenu: [
      {
        id: 'articles',
        text: 'Articles',
        onClick: () => console.log('Articles clicked'),
      },
      {
        id: 'media',
        text: 'Media',
        onClick: () => console.log('Media clicked'),
      },
      {
        id: 'categories',
        text: 'Categories',
        onClick: () => console.log('Categories clicked'),
      },
    ],
  },
  {
    id: 'reports',
    icon: <AssessmentIcon />,
    text: 'Reports',
    submenu: [
      {
        id: 'sales',
        text: 'Sales Report',
        onClick: () => console.log('Sales Report clicked'),
      },
      {
        id: 'performance',
        text: 'Performance',
        onClick: () => console.log('Performance clicked'),
      },
    ],
  },
  {
    id: 'settings',
    icon: <SettingsIcon />,
    text: 'Settings',
    submenu: [
      {
        id: 'general',
        text: 'General',
        onClick: () => console.log('General Settings clicked'),
      },
      {
        id: 'security',
        text: 'Security',
        onClick: () => console.log('Security Settings clicked'),
      },
      {
        id: 'notifications',
        text: 'Notifications',
        onClick: () => console.log('Notification Settings clicked'),
      },
    ],
  },
];

export default {
  title: 'Organism/SidebarWrapper',
  component: SidebarWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    items: { control: 'object' },
    collapsedWidth: { control: 'number' },
    expandedWidth: { control: 'number' },
    hoverDelayMs: { control: 'number' },
    hideStatsContainer: { control: 'boolean' },
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

export const WithAccordionSubmenus: Story = {
  name: 'With Accordion Submenus',
  args: {
    items: itemsWithSubmenus,
  },
};

export const WithAccordionSubmenusNoStats: Story = {
  name: 'With Accordion Submenus (No Stats)',
  args: {
    items: itemsWithSubmenus,
    hideStatsContainer: true,
  },
};

export const ComplexWithMultipleSubmenus: Story = {
  name: 'Complex - Multiple Submenus',
  args: {
    items: complexItems,
  },
};

export const ComplexWithMultipleSubmenusNoStats: Story = {
  name: 'Complex - Multiple Submenus (No Stats)',
  args: {
    items: complexItems,
    hideStatsContainer: true,
  },
};

export const CustomSidebarWidths: Story = {
  name: 'Custom Sidebar Widths',
  args: {
    items: itemsWithSubmenus,
    collapsedWidth: 100,
    expandedWidth: 280,
  },
};

export const FastHoverDelay: Story = {
  name: 'Fast Hover Delay (300ms)',
  args: {
    items: itemsWithSubmenus,
    hoverDelayMs: 300,
  },
};

export const SlowHoverDelay: Story = {
  name: 'Slow Hover Delay (2000ms)',
  args: {
    items: itemsWithSubmenus,
    hoverDelayMs: 2000,
  },
};
