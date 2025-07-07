import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '../../../component/molecule/skeleton/Skeleton';
import { Box } from '@mui/material';

const meta = {
  title: 'Molecule/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false]
    },
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'rounded', 'circular']
    },
    width: {
      control: 'text'
    },
    height: {
      control: 'text'
    }
  }
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 310
  }
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 310,
    height: 160
  }
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 310,
    height: 160
  }
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 100,
    height: 100
  }
};

export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    variant: 'rectangular',
    width: 310,
    height: 160
  }
};

export const NoAnimation: Story = {
  args: {
    animation: false,
    variant: 'rectangular',
    width: 310,
    height: 160
  }
};

export const WithChildren: Story = {
  render: args => (
    <Box sx={{ width: 210 }}>
      <Skeleton {...args}>
        <img
          src="https://images.unsplash.com/photo-1636690498207-d7b393423b9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="placeholder"
          width={310}
          height={120}
        />
      </Skeleton>
    </Box>
  ),
  args: {
    variant: 'rectangular',
    width: 310,
    height: 120
  }
};

export const ComplexExample: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ marginLeft: 2, width: '100%' }}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </Box>
      </Box>
      <Skeleton variant="rectangular" height={120} sx={{ my: 2 }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  )
};
