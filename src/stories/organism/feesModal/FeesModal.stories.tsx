import type { Meta, StoryObj } from '@storybook/react';
import FeeSelectionModal from '../../../component/organism/feesModal/FeesModal';
import { useState } from 'react';
import Button from "../../../component/atom/button/Button";

const meta: Meta<typeof FeeSelectionModal> = {
  title: 'Organism/FeeSelectionModal',
  component: FeeSelectionModal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    onPayNow: { action: 'payNowClicked' },
    title: { 
      control: 'text',
      defaultValue: 'Select Fees to Pay' 
    },
  },
};

export default meta;

type Story = StoryObj<typeof FeeSelectionModal>;

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
        title={args.title}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};

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
    args: {
    title: 'Single Fee Payment' 
  },
};

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
export const MultipleItem: Story = {
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
        description: 'upskilling Fees',
        amount: '1,25,000'
      },
      {
        id: 'hostel',
        description: 'Hostel Fees',
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

