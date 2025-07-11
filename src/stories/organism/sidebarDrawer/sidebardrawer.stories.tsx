import type { Meta, StoryObj } from "@storybook/react";
import SidebarDrawer, { SidebarDrawerProps, SidebarItem } from "../../../component/organism/sidebardrawer/SidebarDrawer";
import {
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Inventory as InventoryIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  Folder as FolderIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";

const meta: Meta<SidebarDrawerProps> = {
  title: "Organism/SidebarDrawer",
  component: SidebarDrawer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    anchor: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
    collapsedWidth: { control: "number" },
    expandedWidth: { control: "number" },
    defaultExpanded: { control: "boolean" },
    items: { 
      control: "object",
      description: "Array of sidebar navigation items"
    },
    onItemClick: {
      table: {
        disable: true,
      },
    },
    paperSx: {
      table: {
        disable: true,
      },
    },
    transitionDuration: {
      table: {
        disable: true,
      },
    },
    container: {
      table: {
        disable: true,
      },
    },
    componentsProps: {
      table: {
        disable: true,
      },
    },
    slotProps: {
      table: {
        disable: true,
      },
    },
    slots: {
      table: {
        disable: true,
      },
    },
    components: {
      table: {
        disable: true,
      },
    },
    classes: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
    elevation: {
      table: {
        disable: true,
      },
    },
    BackdropComponent: {
      table: {
        disable: true,
      },
    },
    closeAfterTransition: {
      table: {
        disable: true,
      },
    },
    disableEnforceFocus: {
      table: {
        disable: true,
      },
    },
    disableEscapeKeyDown: {
      table: {
        disable: true,
      },
    },
    disablePortal: {
      table: {
        disable: true,
      },
    },
    hideBackdrop: {
      table: {
        disable: true,
      },
    },
    keepMounted: {
      table: {
        disable: true,
      },
    },
    onTransitionExited: {
      table: {
        disable: true,
      },
    },
    ModalProps: {
      table: {
        disable: true,
      },
    },
    PaperProps: {
      table: {
        disable: true,
      },
    },
    SlideProps: {
      table: {
        disable: true,
      },
    },
    onTransitionEnter: {
      table: {
        disable: true,
      },
    },
    disableRestoreFocus: {
      table: {
        disable: true,
      },
    },
    disableScrollLock: {
      table: {
        disable: true,
      },
    },
    disableAutoFocus: {
      table: {
        disable: true,
      },
    },
    BackdropProps: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<SidebarDrawerProps>;


const defaultItems: SidebarItem[] = [
  {
    id: 'dashboard',
    icon: <DashboardIcon />,
    text: 'Dashboard',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'users',
    icon: <PeopleIcon />,
    text: 'Users',
    onClick: () => console.log('Users clicked'),
  },
  {
    id: 'analytics',
    icon: <AnalyticsIcon />,
    text: 'Analytics',
    onClick: () => console.log('Analytics clicked'),
  },
  
];

const Template: Story = {
  render: (args) => {
    return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <SidebarDrawer {...args} />
       
      </Box>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    items: defaultItems,
    anchor: "left",
    collapsedWidth: 64,
    expandedWidth: 240,
    defaultExpanded: false,
  },
};

export const WithManyItems: Story = {
  ...Template,
  name: "Sidebar With Many Items",
  args: {
    items: [
      {
        id: 'dashboard',
        icon: <DashboardIcon />,
        text: 'Dashboard',
        onClick: () => console.log('Dashboard clicked'),
      },
      {
        id: 'users',
        icon: <PeopleIcon />,
        text: 'Users',
        onClick: () => console.log('Users clicked'),
      },
      {
        id: 'analytics',
        icon: <AnalyticsIcon />,
        text: 'Analytics',
        onClick: () => console.log('Analytics clicked'),
      },
      {
        id: 'inventory',
        icon: <InventoryIcon />,
        text: 'Inventory',
        onClick: () => console.log('Inventory clicked'),
      },
      {
        id: 'notifications',
        icon: <NotificationsIcon />,
        text: 'Notifications',
        onClick: () => console.log('Notifications clicked'),
      },
      {
        id: 'email',
        icon: <EmailIcon />,
        text: 'Email',
        onClick: () => console.log('Email clicked'),
      },
      {
        id: 'files',
        icon: <FolderIcon />,
        text: 'Files',
        onClick: () => console.log('Files clicked'),
      },
      {
        id: 'favorites',
        icon: <StarIcon />,
        text: 'Favorites',
        onClick: () => console.log('Favorites clicked'),
      },
      {
        id: 'schedule',
        icon: <ScheduleIcon />,
        text: 'Schedule',
        onClick: () => console.log('Schedule clicked'),
      },
      {
        id: 'profile',
        icon: <AccountCircleIcon />,
        text: 'Profile',
        onClick: () => console.log('Profile clicked'),
      },
      {
        id: 'settings',
        icon: <SettingsIcon />,
        text: 'Settings',
        onClick: () => console.log('Settings clicked'),
      },
      {
        id: 'help',
        icon: <HelpIcon />,
        text: 'Help',
        onClick: () => console.log('Help clicked'),
      },
    ],
    anchor: "left",
    collapsedWidth: 64,
    expandedWidth: 240,
    defaultExpanded: false,
  },
};

export const InitiallyExpanded: Story = {
  ...Default,
  name: "Initially Expanded",
  args: {
    ...Default.args,
    defaultExpanded: true,
  },
};

export const CustomWidths: Story = {
  ...Default,
  name: "Custom Widths",
  args: {
    ...Default.args,
    collapsedWidth: 80,
    expandedWidth: 300,
  },
};

export const WithDisabledItems: Story = {
  ...Template,
  name: "With Disabled Items",
  args: {
    items: [
      {
        id: 'dashboard',
        icon: <DashboardIcon />,
        text: 'Dashboard',
        onClick: () => console.log('Dashboard clicked'),
      },
      {
        id: 'users',
        icon: <PeopleIcon />,
        text: 'Users',
        onClick: () => console.log('Users clicked'),
        disabled: true,
      },
      {
        id: 'analytics',
        icon: <AnalyticsIcon />,
        text: 'Analytics',
        onClick: () => console.log('Analytics clicked'),
      },
      {
        id: 'notifications',
        icon: <NotificationsIcon />,
        text: 'Notifications',
        onClick: () => console.log('Notifications clicked'),
        disabled: true,
      },
      {
        id: 'settings',
        icon: <SettingsIcon />,
        text: 'Settings',
        onClick: () => console.log('Settings clicked'),
      },
    ],
    anchor: "left",
    collapsedWidth: 64,
    expandedWidth: 240,
    defaultExpanded: false,
  },
};