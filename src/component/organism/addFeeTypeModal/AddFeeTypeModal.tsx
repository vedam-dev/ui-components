import type React from 'react';
import { useState, useEffect } from 'react';
import { Modal, useTheme, TextField } from '@mui/material';
import { Box } from '../../atom/box';
import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FeeTypeModalInitialData {
  name?: string;
  priority?: number;
}

export interface FeeTypeModalProps {
  open: boolean;
  onClose: () => void;
  variant: 'create' | 'edit';
  onSubmit?: (data: { name: string; priority: number }) => Promise<void> | void;
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
  const submitLabel = isEdit ? 'Save' : 'Create';

  const [name, setName] = useState(initialData?.name ?? '');
  const [priority, setPriority] = useState<number>(initialData?.priority ?? 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initialData?.name ?? '');
      setPriority(initialData?.priority ?? 0);
      setIsLoading(false);
    }
  }, [open, initialData]);

  const handleClose = () => {
    setName('');
    setPriority(0);
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit?.({ name: name.trim(), priority });
      handleClose();
    } catch (err: unknown) {
      // Errors are handled by the parent via snackbar
      console.error('FeeTypeModal submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !name.trim() || isLoading;

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

  const getPriorityMessage = (p: number) => {
    if (p === 0) return 'Fee can be paid anytime';
    if (p === 1) return 'Fee will be paid first';
    return `Fee will be paid after Priority ${p - 1} fees`;
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '8px',
            }}
          >
            <Typography sx={{ ...labelSx, mb: 0 }}>Title</Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '20px',
                color: theme.palette.text.secondary,
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {`(${name.length}/50)`}
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Type"
            value={name}
            inputProps={{ maxLength: 50 }}
            onChange={(e) => setName(e.target.value)}
            sx={textFieldSx}
          />
        </Box>

        {/* Priority Order */}
        <Box sx={{ mb: '32px' }}>
          <Typography sx={labelSx}>Assign a Priority Order</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Decrement Button */}
            <Box
              onClick={() => priority > 0 && setPriority(priority - 1)}
              sx={{
                width: '48px',
                height: '48px',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: priority > 0 ? 'pointer' : 'not-allowed',
                opacity: priority > 0 ? 1 : 0.5,
                backgroundColor: theme.palette.common.white,
                userSelect: 'none',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: priority > 0 ? 'rgba(0,0,0,0.02)' : theme.palette.common.white,
                },
              }}
            >
              <Typography
                sx={{ fontSize: '20px', fontWeight: 400, color: theme.palette.text.primary }}
              >
                —
              </Typography>
            </Box>

            {/* Priority Value */}
            <Box
              sx={{
                width: '140px',
                height: '48px',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 500,
                color: theme.palette.text.primary,
                fontFamily: 'Outfit, sans-serif',
                backgroundColor: theme.palette.common.white,
              }}
            >
              {priority}
            </Box>

            {/* Increment Button */}
            <Box
              onClick={() => setPriority(priority + 1)}
              sx={{
                width: '48px',
                height: '48px',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: theme.palette.common.white,
                userSelect: 'none',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.02)',
                },
              }}
            >
              <Typography
                sx={{ fontSize: '20px', fontWeight: 400, color: theme.palette.text.primary }}
              >
                +
              </Typography>
            </Box>

            {/* Info Message Box */}
            <Box
              sx={{
                flex: 1,
                height: '48px',
                backgroundColor: theme.palette.grey[100],
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                px: '16px',
              }}
            >
              <InfoOutlinedIcon sx={{ color: theme.palette.info[500], fontSize: '18px' }} />
              <Typography
                sx={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: theme.palette.info[500],
                  lineHeight: 'normal',
                }}
              >
                {getPriorityMessage(priority)}
              </Typography>
            </Box>
          </Box>
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
