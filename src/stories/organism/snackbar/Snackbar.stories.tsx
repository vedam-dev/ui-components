import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Snackbar from '../../../component/organism/snackbar/Snackbar';
import { Box, Button } from '@mui/material';

const meta: Meta<typeof Snackbar> = {
  title: 'Organism/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['success', 'error', 'warning', 'info', 'default'],
      description: 'The type of snackbar',
    },
    open: {
      control: 'boolean',
      description: 'Controls the visibility of the snackbar',
    },
    message: {
      control: 'text',
      description: 'The main message content',
    },
    title: {
      control: 'text',
      description: 'Optional title for the snackbar',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Duration in ms before auto-hide',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

const useSnackbarState = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleOpen, handleClose };
};

// Error Snackbar with multiple messages
export const ErrorMultipleMessages: StoryObj = {
  render: () => {
    const { open, handleOpen, handleClose } = useSnackbarState();

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="error" onClick={handleOpen}>
          Show Error Snackbar
        </Button>
        <Snackbar
          open={open}
          onClose={handleClose}
          variant="error"
          message={[
            'No payment aggregator selected.',
            'Due date needs to be filled.',
            'Due date needs to be filled.',
          ]}
        />
      </Box>
    );
  },
};

// Success Snackbar - Fee Created
export const SuccessFeeCreated: StoryObj = {
  render: () => {
    const { open, handleOpen, handleClose } = useSnackbarState();

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={handleOpen}>
          Show Success Snackbar
        </Button>
        <Snackbar
          open={open}
          onClose={handleClose}
          variant="success"
          message="Fee Created for Ankit through CashFree payment gateway"
        />
      </Box>
    );
  },
};

// Warning Snackbar
export const WarningMessage: StoryObj = {
  render: () => {
    const { open, handleOpen, handleClose } = useSnackbarState();

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="warning" onClick={handleOpen}>
          Show Warning Snackbar
        </Button>
        <Snackbar open={open} onClose={handleClose} variant="warning" message="Warning message" />
      </Box>
    );
  },
};

// Info Snackbar
export const InformationMessage: StoryObj = {
  render: () => {
    const { open, handleOpen, handleClose } = useSnackbarState();

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="info" onClick={handleOpen}>
          Show Info Snackbar
        </Button>
        <Snackbar open={open} onClose={handleClose} variant="info" message="Information message" />
      </Box>
    );
  },
};

// Default State Snackbar
export const DefaultState: StoryObj = {
  render: () => {
    const { open, handleOpen, handleClose } = useSnackbarState();

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={handleOpen}>
          Show Default Snackbar
        </Button>
        <Snackbar open={open} onClose={handleClose} variant="default" message="Default state" />
      </Box>
    );
  },
};
