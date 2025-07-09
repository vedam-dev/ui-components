// FeeSelectionModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import FeeSelectionModal from '../../../component/organism/feesModal/FeesModal';
import { useState } from 'react';
import Button from '@mui/material/Button';

const meta: Meta<typeof FeeSelectionModal> = {
  title: 'Components/FeeSelectionModal',
  component: FeeSelectionModal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    onPayNow: { action: 'payNowClicked' },
  },
};

export default meta;

type Story = StoryObj<typeof FeeSelectionModal>;

// Template for stories
const Template = (args: any) => {
  const [open, setOpen] = useState(false);
  
  const feeItems = [
    {
      id: 'tuition',
      description: 'Tuition Fees',
      amount: '1,25,000'
    },
    {
      id: 'upskilling',
      description: 'Upskilling Fees',
      amount: '1,25,000'
    }
  ];

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Fee Selection Modal
      </Button>
      <FeeSelectionModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        feeItems={feeItems}
      />
    </div>
  );
};

// Default story
export const Default: Story = {
  render: Template,
  args: {},
};

// Empty state story
export const EmptyState: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Empty Modal
        </Button>
        <FeeSelectionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          feeItems={[]}
        />
      </div>
    );
  },
  args: {},
};

// Single item story
export const SingleItem: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    const feeItems = [
      {
        id: 'tuition',
        description: 'Tuition Fees',
        amount: '1,25,000'
      }
    ];

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Single Item Modal
        </Button>
        <FeeSelectionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          feeItems={feeItems}
        />
      </div>
    );
  },
  args: {},
};

// Many items story
export const ManyItems: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    const feeItems = [
      {
        id: 'tuition',
        description: 'Tuition Fees',
        amount: '1,25,000'
      },
      {
        id: 'upskilling',
        description: 'Upskilling Fees',
        amount: '1,25,000'
      },
     
    ];

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Many Items Modal
        </Button>
        <FeeSelectionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          feeItems={feeItems}
        />
      </div>
    );
  },
  args: {},
};