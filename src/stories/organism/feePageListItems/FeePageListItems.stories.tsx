import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FeeListItem, {
  FeeListItemRow,
  FeeListItemStatus,
  FeeListItemButton,
} from '../../../component/organism/feePageListitems/FeePageListItems';

const meta: Meta<typeof FeeListItem> = {
  title: 'Organism/FeeListItem',
  component: FeeListItem,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
      description: 'Background color for the card',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FeeListItem>;

// Mock environment variable
process.env.REACT_APP_CURRENCY = 'INR';

// Default fee item
const DefaultFeeItem = (
  <>
    <FeeListItemRow title="Description" value="College Fees" />
    <FeeListItemRow title="Payment Mode" value="Online" />
    <FeeListItemRow title="Payment ID" value="198026VEDAM" />
    <FeeListItemRow title="Date" value="07/06/2025" />
    <FeeListItemRow title="Amount" value="15000" />
    <FeeListItemStatus status="Success" />
    <FeeListItemButton onClick={() => console.log('View Receipt')} />
  </>
);

export const Default: Story = {
  args: {
    children: DefaultFeeItem,
    bgColor: '#FFFFFF',
  },
};

export const SuccessStatus: Story = {
  args: {
    children: (
      <>
        <FeeListItemRow title="Description" value="Tuition Fees" />
        <FeeListItemRow title="Payment Mode" value="Online" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/06/2025" />
        <FeeListItemRow title="Amount" value="75000" />
        <FeeListItemStatus status="Success" />
        <FeeListItemButton onClick={() => console.log('View Receipt')} />
      </>
    ),
  },
};

export const PendingStatus: Story = {
  args: {
    children: (
      <>
        <FeeListItemRow title="Description" value="Library Fees" />
        <FeeListItemRow title="Payment Mode" value="Offline" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/05/2025" />
        <FeeListItemRow title="Amount" value="25000" />
        <FeeListItemStatus status="Pending" />
        <FeeListItemButton onClick={() => console.log('View Receipt')} />
      </>
    ),
    bgColor: '#FFF8E1',
  },
};

export const FailedStatus: Story = {
  args: {
    children: (
      <>
        <FeeListItemRow title="Description" value="Lab Fees" />
        <FeeListItemRow title="Payment Mode" value="Online" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/04/2025" />
        <FeeListItemRow title="Amount" value="35000" />
        <FeeListItemStatus status="Failed" />
        <FeeListItemButton onClick={() => console.log('View Receipt')} />
      </>
    ),
    bgColor: '#FFEBEE',
  },
};

export const MultipleItems: StoryObj = {
  render: () => (
    <div style={{ margin: '0 auto' }}>
      <FeeListItem>
        <FeeListItemRow title="Description" value="College Fees" />
        <FeeListItemRow title="Payment Mode" value="Online" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/06/2025" />
        <FeeListItemRow title="Amount" value="15000" />
        <FeeListItemStatus status="Success" />
        <FeeListItemButton onClick={() => console.log('Receipt 1')} />
      </FeeListItem>

      <FeeListItem bgColor="#FFF8E1">
        <FeeListItemRow title="Description" value="Upskilling Fees" />
        <FeeListItemRow title="Payment Mode" value="Offline" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/05/2025" />
        <FeeListItemRow title="Amount" value="12500" />
        <FeeListItemStatus status="Pending" />
        <FeeListItemButton onClick={() => console.log('Receipt 2')} />
      </FeeListItem>

      <FeeListItem bgColor="#FFEBEE">
        <FeeListItemRow title="Description" value="Vedam Fees" />
        <FeeListItemRow title="Payment Mode" value="Online" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/04/2025" />
        <FeeListItemRow title="Amount" value="10500" />
        <FeeListItemStatus status="Failed" />
        <FeeListItemButton onClick={() => console.log('Receipt 3')} />
      </FeeListItem>
    </div>
  ),
};

export const LessItems: StoryObj = {
  parameters: {
    env: {
      REACT_APP_CURRENCY: 'USD',
    },
  },
  render: () => (
    <FeeListItem>
      <FeeListItemRow title="Description" value="International Fees" />
      <FeeListItemRow title="Payment Mode" value="Online" />
      <FeeListItemRow title="Amount" value="5000" />
      <FeeListItemStatus status="Success" />
      <FeeListItemButton onClick={() => console.log('USD Receipt')} />
    </FeeListItem>
  ),
};

export const WithoutButton: Story = {
  args: {
    children: (
      <>
        <FeeListItemRow title="Description" value="Lab Fees" />
        <FeeListItemRow title="Payment Mode" value="Online" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/04/2025" />
        <FeeListItemRow title="Amount" value="35000" />
        <FeeListItemStatus status="Failed" />
        <FeeListItemButton />
      </>
    ),
    bgColor: '#FFEBEE',
  },
};

export const WithoutButtonAlternative: Story = {
  args: {
    children: (
      <>
        <FeeListItemRow title="Description" value="Hostel Fees" />
        <FeeListItemRow title="Payment Mode" value="Cash" />
        <FeeListItemRow title="Payment ID" value="198026VEDAM" />
        <FeeListItemRow title="Date" value="07/03/2025" />
        <FeeListItemRow title="Amount" value="45000" />
        <FeeListItemStatus status="Success" />
      </>
    ),
  },
};
