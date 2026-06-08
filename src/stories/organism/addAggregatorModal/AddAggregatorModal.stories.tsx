import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../component/atom/button';
import AddAggregatorModal, {
  AddAggregatorModalProps,
  AggregatorOption,
  AggregatorValues,
} from '../../../component/organism/addAggregatorModal/AddAggregatorModal';

const meta: Meta<typeof AddAggregatorModal> = {
  title: 'Organism/AddAggregatorModal',
  component: AddAggregatorModal,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['add', 'edit'] },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AddAggregatorModal>;

// ── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_5_AGGREGATORS: AggregatorOption[] = [
  {
    id: 'cashfree',
    name: 'Cashfree',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'easebuzz',
    name: 'Easebuzz',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'paytm',
    name: 'Paytm',
    fields: [
      {
        key: 'merchantId',
        label: 'Merchant ID',
        placeholder: 'Enter Paytm Merchant ID',
      },
      {
        key: 'merchantKey',
        label: 'Merchant Key',
        placeholder: 'Enter Paytm Merchant Key',
      },
    ],
  },
];

const MOCK_3_AGGREGATORS: AggregatorOption[] = [
  {
    id: 'cashfree',
    name: 'Cashfree',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'easebuzz',
    name: 'Easebuzz',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    fields: [
      { key: 'clientId', label: 'Client ID', placeholder: 'Enter' },
      { key: 'clientSecret', label: 'Client Secret', placeholder: 'Enter' },
    ],
  },
];

const MOCK_INITIAL_VALUES: Record<string, AggregatorValues> = {
  cashfree: {
    title: 'Cashfree',
    description: 'Lorem Ipsum si amet',
    credentials: {
      clientId: '123CSHFRE456',
      clientSecret: 'GRT56748375-DGDT-7',
    },
  },
  easebuzz: {
    title: 'Easebuzz',
    description: 'Easebuzz payment gateway description',
    credentials: {
      clientId: 'EZB-99228833',
      clientSecret: 'EB-SEC-KEY-7788',
    },
  },
  razorpay: {
    title: 'Razorpay',
    description: 'Razorpay payment setup',
    credentials: {
      clientId: 'RZP-88776655',
      clientSecret: 'RZP-SEC-KEY-1122',
    },
  },
};

// ── Add View (5 Aggregators - Shows scroll arrows) ───────────────────────────

export const AddView: Story = {
  render: (args: AddAggregatorModalProps) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Add Aggregator Modal
        </Button>
        <AddAggregatorModal
          {...args}
          variant="add"
          open={open}
          onClose={() => setOpen(false)}
          aggregators={MOCK_3_AGGREGATORS}
          onSubmit={async (aggregatorId: string, values: AggregatorValues) => {
            console.log('Submitted aggregator:', aggregatorId, values);
            await new Promise((r) => setTimeout(r, 800));
          }}
        />
      </>
    );
  },
};

// ── Edit View (3 Aggregators - No scroll arrows, Credentials disabled) ────────

export const EditView: Story = {
  render: (args: AddAggregatorModalProps) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Edit Aggregator Modal
        </Button>
        <AddAggregatorModal
          {...args}
          variant="edit"
          open={open}
          onClose={() => setOpen(false)}
          aggregators={MOCK_3_AGGREGATORS}
          initialValues={MOCK_INITIAL_VALUES}
          initialAggregatorId="cashfree"
          onSubmit={async (aggregatorId: string, values: AggregatorValues) => {
            console.log('Saved aggregator:', aggregatorId, values);
            await new Promise((r) => setTimeout(r, 800));
          }}
        />
      </>
    );
  },
};
