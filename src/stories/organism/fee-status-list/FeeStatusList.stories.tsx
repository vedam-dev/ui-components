import { Meta, StoryObj } from '@storybook/react';
import FeeStatusList, { FeeStatus } from '../../../component/organism/fee-status-list/FeeStatusList';
import { Typography } from '@mui/material';

const meta: Meta<typeof FeeStatusList> = {
  title: 'Components/FeeStatusList',
  component: FeeStatusList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(FeeStatus),
    },
    onPayNow: { action: 'Pay Now clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof FeeStatusList>;

const commonFeeItems = [
  { label: 'Semester', value: 'Semester 1 Fees' },
  { label: 'Fees', value: '₹ 1,00,000' },
  { label: 'Due Date', value: '07/06/2025' },
];

export const Overdue: Story = {
  args: {
    status: FeeStatus.OVERDUE,
    feeItems: commonFeeItems,
  },
};

export const Due: Story = {
  args: {
    status: FeeStatus.DUE,
    feeItems: [
      { label: 'Semester', value: 'Semester 2 Fees' },
      { label: 'Fees', value: '₹ 75,000' },
      { label: 'Due Date', value: '15/08/2025' },
    ],
  },
};

export const Paid: Story = {
  args: {
    status: FeeStatus.PAID,
    feeItems: [
      { label: 'Semester', value: 'Semester 1 Fees' },
      { label: 'Fees', value: '₹ 1,00,000' },
      { label: 'Paid On', value: '30/06/2025' },
    ],
  },
};

export const WithCustomValue: Story = {
  args: {
    status: FeeStatus.OVERDUE,
    feeItems: [
      { label: 'Semester', value: 'Computer Science' },
      {
        label: 'Amount',
        value: (
          <Typography color="error" fontWeight="bold">
            ₹ 1,20,000
          </Typography>
        ),
      },
      { label: 'Days Overdue', value: '15 days' },
    ],
  },
};

export const MultipleFeesExample: Story = {
  args: {
    status: FeeStatus.DUE,
    feeItems: [
      { label: 'Semester', value: 'Semester 3 Fees' },
      { label: 'Tuition Fee', value: '₹ 80,000' },
      { label: 'Lab Fee', value: '₹ 15,000' },
      { label: 'Library Fee', value: '₹ 5,000' },
      { label: 'Due Date', value: '30/09/2025' },
    ],
  },
};

export const ResponsiveExample: Story = {
  args: {
    status: FeeStatus.DUE,
    feeItems: commonFeeItems,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};