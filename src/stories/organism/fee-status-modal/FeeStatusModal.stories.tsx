import { Meta, StoryObj } from '@storybook/react';
import FeeStatusModal, {
  FeeStatusModalProps,
} from '../../../component/organism/fee-status-modal/FeeStatusModal';
import { useState } from 'react';
import Button from '../../../component/atom/button/Button';

const meta: Meta<typeof FeeStatusModal> = {
  title: 'Organism/Modal/FeeStatusModal',
  component: FeeStatusModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'radio',
      options: ['success', 'failure', 'pending'],
    },
    infoText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FeeStatusModal>;

// Wrapper to control open/close within Storybook
const ModalWrapper = (args: FeeStatusModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Fee Status Modal
      </Button>
      <FeeStatusModal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Success: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    status: 'success',
    infoText: 'Your Payment receipt is ready to download',
  },
};

export const Failure: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    status: 'failure',
    infoText: 'Payment failed! Please try again.',
  },
};

export const Pending: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    status: 'pending',
    infoText: 'Your payment is under processing.',
  },
};

export const WithCustomButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    status: 'success',
    infoText: 'Download from your profile dashboard.',
    customDownloadButton: (
      <Button
        variant="contained"
        sx={{ mt: 4, px: 3, borderRadius: '12px' }}
        onClick={() => alert('Custom download action')}
      >
        Custom Button Label
      </Button>
    ),
  },
};
