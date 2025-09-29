import type { Meta, StoryObj } from '@storybook/react';
import React, { ReactNode } from 'react';
import Accordion from '../../../component/atom/accordion/Accordion';
import { Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type AccordionStoryArgs = React.ComponentProps<typeof Accordion> & {
  summary?: ReactNode;
  children?: ReactNode;
};

const meta = {
  title: 'Atom/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultExpanded: {
      control: 'boolean',
      description: 'If true, expands the accordion by default',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the accordion will be disabled',
    },
    expanded: {
      control: 'boolean',
      description: 'If true, expands the accordion (controlled)',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevation'],
      description: 'The variant to use',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the accordion',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when expand/collapse state changes',
    },
    summary: {
      control: false,
      table: { category: 'Slots' },
      description: 'Header content (ReactNode)',
    },
    children: {
      control: false,
      table: { category: 'Slots' },
      description: 'Accordion details content (ReactNode)',
    },
  },
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

const sampleContent = (
  <Typography variant="body1">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
    amet blandit leo lobortis eget.
  </Typography>
);

const Template: Story['render'] = (args) => (
  <Accordion {...args} id={args.id ?? 'accordion'}>
    <Accordion.Summary>
      <Box display="flex" alignItems="center" width="100%">
        {typeof args.summary === 'string' ? (
          <Typography variant="subtitle1" flex={1}>
            {args.summary}
          </Typography>
        ) : (
          args.summary
        )}
      </Box>
    </Accordion.Summary>
    <Accordion.Details>{args.children}</Accordion.Details>
  </Accordion>
);

export const Default: Story = {
  render: Template,
  args: {
    summary: <Typography variant="subtitle1">Accordion Header</Typography>,
    children: sampleContent,
  },
};

export const ExpandedByDefault: Story = {
  render: Template,
  args: {
    defaultExpanded: true,
    summary: <Typography variant="subtitle1">Expanded Accordion</Typography>,
    children: sampleContent,
  },
};

export const OutlinedVariant: Story = {
  render: Template,
  args: {
    variant: 'outlined',
    summary: <Typography variant="subtitle1">Outlined Accordion</Typography>,
    children: sampleContent,
  },
};

export const SmallSize: Story = {
  render: Template,
  args: {
    size: 'small',
    summary: <Typography variant="subtitle1">Small Accordion</Typography>,
    children: sampleContent,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    summary: <Typography variant="subtitle1">Disabled Accordion</Typography>,
    children: sampleContent,
  },
};

export const Controlled: Story = {
  render: Template,
  args: {
    expanded: false,
    summary: <Typography variant="subtitle1">Controlled Accordion</Typography>,
    children: <Typography>Current state: Collapsed</Typography>,
  },
};

export const WithCustomHeader: Story = {
  render: Template,
  args: {
    summary: (
      <Box display="flex" alignItems="center" gap={1} width="100%">
        <Typography flex={1}>Custom Header Content</Typography>
        <ExpandMoreIcon />
      </Box>
    ),
    children: sampleContent,
  },
};
