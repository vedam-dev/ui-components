import type React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, useTheme } from '@mui/material';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FeeTypeModalInitialData {
  name?: string;
  code?: string;
}

export interface FeeTypeModalProps {
  open: boolean;
  onClose: () => void;
  variant: 'create' | 'edit';
  onSubmit?: (data: { name: string; code: string }) => Promise<void> | void;
  initialData?: FeeTypeModalInitialData;
}

// ── Component ─────────────────────────────────────────────────────────────────

const FeeTypeModal: React.FC<FeeTypeModalProps> = ({
  open,
  onClose,
  variant,
  onSubmit,
  initialData,
}) => {
  const theme = useTheme();

  const isEdit = variant === 'edit';
  const title = isEdit ? 'Edit Fee Type' : 'Create New Fee Type';
  const subtitle = isEdit ? 'Edit details for the fee type' : 'Enter details for the fee type';
  const submitLabel = isEdit ? 'Edit Fee Type' : 'Create Fee Type';

  const [name, setName] = useState(initialData?.name ?? '');
  const [code, setCode] = useState(initialData?.code ?? '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initialData?.name ?? '');
      setCode(initialData?.code ?? '');
      setIsLoading(false);
    }
  }, [open, initialData]);

  const handleClose = () => {
    setName('');
    setCode('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !code.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit?.({ name: name.trim(), code: code.trim() });
      handleClose();
    } catch (err: unknown) {
      // Errors are handled by the parent via snackbar
      console.error('FeeTypeModal submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !name.trim() || !code.trim() || isLoading;

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: theme.palette.common.white,
      fontSize: '16px',
      '& fieldset': { borderColor: theme.palette.grey[300] },
      '&:hover fieldset': { borderColor: theme.palette.grey[400] },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[400],
        borderWidth: '1px',
      },
    },
    '& .MuiOutlinedInput-input': { padding: '13px 20px' },
  };

  const labelSx = {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.primary,
    mb: '8px',
    fontFamily: 'Outfit, sans-serif',
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '672px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '24px',
          padding: '32px',
          outline: 'none',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: '24px' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '22px',
              color: theme.palette.text.primary,
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '23px',
              color: theme.palette.text.secondary,
              fontFamily: 'Outfit, sans-serif',
              mt: '4px',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Fee Title */}
        <Box sx={{ mb: '20px' }}>
          <Typography sx={labelSx}>Fee Title</Typography>
          <TextField
            fullWidth
            placeholder="Type"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={textFieldSx}
          />
        </Box>

        {/* Fee Code */}
        <Box sx={{ mb: '32px' }}>
          <Typography sx={labelSx}>Fee Code</Typography>
          <TextField
            fullWidth
            placeholder="Type"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            sx={textFieldSx}
          />
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={isLoading}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.common.white,
              fontSize: '16px',
              fontWeight: 500,
              borderRadius: '12px',
              padding: '13px 24px',
              textTransform: 'none',
              fontFamily: 'Outfit, sans-serif',
              '&:hover': {
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: 'rgba(0,0,0,0.03)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isDisabled}
            sx={{
              backgroundColor: theme.palette.primary.main,
              fontSize: '16px',
              fontWeight: 500,
              borderRadius: '12px',
              padding: '13px 24px',
              color: theme.palette.common.white,
              textTransform: 'none',
              fontFamily: 'Outfit, sans-serif',
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              '&:disabled': {
                backgroundColor: theme.palette.grey[400],
                color: theme.palette.common.white,
              },
            }}
          >
            {isLoading ? 'Saving...' : submitLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeeTypeModal;
