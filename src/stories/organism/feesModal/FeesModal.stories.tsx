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
    isButtonDisabled: { action: 'checkDisabled' },
  },
};

export default meta;

type Story = StoryObj<typeof FeeSelectionModal>;

const Template = (args: any) => {
  const [open, setOpen] = useState(false);
  
  const feeItems = [
    {
      id: 1,
      description: 'Tuition Fees',
      amount: '1,25,000',
      status: 'UNPAID'
    },
    {
      id: 2,
      description: 'Upskilling Fees',
      amount: '1,25,000',
      status: 'UNPAID'
    }
  ];

  const handlePayNow = (feeId: string) => {
    console.log('Pay now clicked for fee:', feeId);
    args.onPayNow?.(feeId);
  };

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
        onPayNow={handlePayNow}
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
          onPayNow={() => {}}
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
        id: 1,
        description: 'Tuition Fees',
        amount: '1,25,000',
        status: 'UNPAID'
      }
    ];

    const handlePayNow = (feeId: string) => {
      console.log('Pay now clicked for fee:', feeId);
      args.onPayNow?.(feeId);
    };

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
          onPayNow={handlePayNow}
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
        id: 1,
        description: 'Tuition Fees',
        amount: '1,25,000',
        status: 'UNPAID'
      },
      {
        id: 2,
        description: 'Upskilling Fees',
        amount: '1,25,000',
        status: 'PAID'
      },
      {
        id: 3,
        description: 'Hostel Fees',
        amount: '1,25,000',
        status: 'UNPAID'
      }
    ];

    const handlePayNow = (feeId: string) => {
      console.log('Pay now clicked for fee:', feeId);
      args.onPayNow?.(feeId);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Multiple Items Modal
        </Button>
        <FeeSelectionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          feeItems={feeItems}
          onPayNow={handlePayNow}
        />
      </div>
    );
  },
  args: {},
};

export const WithInfoItems: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const feeItems = [
      { id: 1, description: 'Tuition Fees', amount: '1,00,000', status: 'UNPAID' },
      { id: 2, description: 'Lab Fees', amount: '20,000', status: 'UNPAID' },
    ];
    const infoItems = [
      { label: 'Total Course Fees', value: '₹1,20,000' },
      { label: 'Scholarship', value: '₹20,000' },
      { label: 'Seat Block Fees', value: '₹5,000' },
      { label: 'Final Payable', value: '₹95,000' },
    ];

    const handlePayNow = (feeId: string) => {
      console.log('Pay now clicked for fee:', feeId);
      args.onPayNow?.(feeId);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal with Info Header
        </Button>
        <FeeSelectionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          feeItems={feeItems}
          onPayNow={handlePayNow}
          infoItems={infoItems}
          title="Fees Overview"
        />
      </div>
    );
  },
  args: {},
};

export const WithDisabledItems: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const feeItems = [
      { id: 1, description: 'Tuition Fees', amount: '1,00,000', status: 'UNPAID' },
      { id: 2, description: 'Lab Fees', amount: '20,000', status: 'PAID' },
    ];

    const isButtonDisabled = (feeId: string) => {
      return feeId === '1'; // Disable the first item
    };

    const handlePayNow = (feeId: string) => {
      console.log('Pay now clicked for fee:', feeId);
      args.onPayNow?.(feeId);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal with Disabled Items
        </Button>
        <FeeSelectionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          feeItems={feeItems}
          onPayNow={handlePayNow}
          isButtonDisabled={isButtonDisabled}
        />
      </div>
    );
  },
  args: {},
};