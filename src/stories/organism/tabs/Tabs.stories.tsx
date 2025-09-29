import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '../../../component/organism/tabs/Tabs';
import { Box } from '@mui/material';

const sampleTabs = [
  { label: 'Overview', content: <Box sx={{ p: 1 }}>This is the overview panel.</Box> },
  { label: 'Details', content: <Box sx={{ p: 1 }}>Here are some details.</Box> },
  { label: 'Settings', content: <Box sx={{ p: 1 }}>Settings content goes here.</Box> },
];

const meta: Meta<typeof Tabs> = {
  title: 'Organism/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    // `tabs` is a complex ReactNode array — disable controls for it and provide predefined stories instead
    tabs: {
      control: false,
      description: 'Array of tab items: { label, content, disabled? }',
    },
    initialIndex: {
      control: { type: 'number', min: 0 },
      description: 'Initial active tab index',
      defaultValue: 0,
    },
    disableTransition: {
      control: 'boolean',
      description: 'Disable enter/exit transitions for panels',
      defaultValue: false,
    },
    tabGap: {
      control: { type: 'number' },
      description: 'Gap (in px) between tab buttons',
      defaultValue: 12,
    },
    minPanelHeight: {
      control: 'text',
      description: 'Minimum height for the panel area (px or CSS unit)',
      defaultValue: '200px',
    },
    tabSx: {
      control: 'object',
      description: 'MUI `sx` applied to each tab button',
    },
    panelSx: {
      control: 'object',
      description: 'MUI `sx` applied to each panel',
    },
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    initialIndex: 0,
    disableTransition: false,
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [sampleTabs[0], { ...sampleTabs[1], disabled: true }, sampleTabs[2]],
    initialIndex: 0,
  },
};

export const NoTransition: Story = {
  args: {
    tabs: sampleTabs,
    disableTransition: true,
  },
};

export const CustomStyling: Story = {
  args: {
    tabs: sampleTabs,
    tabSx: { fontSize: '16px', letterSpacing: '0.2px' },
    panelSx: { minHeight: '120px', display: 'flex', alignItems: 'center' },
    tabGap: 8,
  },
};

export const StartingAtSecondTab: Story = {
  args: {
    tabs: sampleTabs,
    initialIndex: 1,
  },
};
