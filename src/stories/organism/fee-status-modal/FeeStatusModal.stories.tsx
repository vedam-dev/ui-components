import { Meta, StoryObj } from '@storybook/react';
import FeeStatusModal, { FeeStatusModalProps } from '../../../component/organism/fee-status-modal/FeeStatusModal';
import { useState } from 'react';
import { Button } from '@mui/material';

const meta: Meta<typeof FeeStatusModal> = {
  title: 'Components/Modal/FeeStatusModal',
  component: FeeStatusModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['success', 'failure', 'pending'],
    },
    infoText: { control: 'text' },
    showDownloadButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FeeStatusModal>;

const ModalWrapper = (args: FeeStatusModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Fee Status Modal
      </Button>
      <FeeStatusModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

// ✅ Default Success Modal
export const Success: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    status: 'success',
    infoText: 'Your Payment receipt is ready to download',
    showDownloadButton: true,
    onDownloadClick: () => alert('Download Receipt Clicked'),
  },
};

// ✅ Failure Modal
export const Failure: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    status: 'failure',
    infoText: 'Payment failed! Please try again.',
    showDownloadButton: false,
  },
};

// ✅ Pending Modal
export const Pending: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    status: 'pending',
    infoText: 'Your payment is under processing.',
    showDownloadButton: false,
  },
};
