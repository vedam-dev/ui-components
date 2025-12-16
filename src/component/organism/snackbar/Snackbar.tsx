import React from 'react';
import { Snackbar as MuiSnackbar, Box, Typography, IconButton, useTheme } from '@mui/material';
import { Close, CheckCircle, Warning, Info } from '@mui/icons-material';

export type SnackbarVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface SnackbarProps {
  open: boolean;
  message: string | string[];
  title?: string;
  variant: SnackbarVariant;
  autoHideDuration?: number;
  onClose?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  title,
  variant,
  autoHideDuration = 6000,
  onClose,
}) => {
  const theme = useTheme();

  const getVariantStyles = (variant: SnackbarVariant) => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#F4FFF6',
          border: `1px solid ${theme.palette.success.main}`,
          icon: <CheckCircle sx={{ color: theme.palette.success.main, fontSize: '24px' }} />,
          textColor: theme.palette.success.main,
          closeIconColor: theme.palette.success.main,
          borderRadius: '16px',
        };
      case 'error':
        return {
          backgroundColor: '#FFF3F3',
          border: `1px solid ${theme.palette.error.main}`,
          icon: null,
          textColor: theme.palette.error.main,
          closeIconColor: theme.palette.error.main,
          borderRadius: '16px',
        };
      case 'warning':
        return {
          backgroundColor: '#FFF7E0',
          border: `1px solid ${theme.palette.warning.main}`,
          icon: <Warning sx={{ color: theme.palette.warning.main, fontSize: '24px' }} />,
          textColor: theme.palette.warning.main,
          closeIconColor: theme.palette.warning.main,
          borderRadius: '16px',
        };
      case 'info':
        return {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.info.main}`,
          icon: <Info sx={{ color: theme.palette.info.main, fontSize: '24px' }} />,
          textColor: theme.palette.info.main,
          closeIconColor: theme.palette.info.main,
          borderRadius: '16px',
        };
      case 'default':
      default:
        return {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.grey[400]}`,
          icon: null,
          textColor: theme.palette.grey[700],
          closeIconColor: theme.palette.grey[700],
          borderRadius: '16px',
        };
    }
  };

  const styles = getVariantStyles(variant);
  const messages = Array.isArray(message) ? message : [message];

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          minWidth: '400px',
          padding: 0,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          borderRadius: styles.borderRadius,
          overflow: 'hidden',
          backgroundColor: 'transparent',
        },
        marginTop: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          backgroundColor: styles.backgroundColor,
          border: styles.border,
          padding: '20px 24px',
          borderRadius: styles.borderRadius,
          position: 'relative',
        }}
      >
        {/* Icon Container */}
        {styles.icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              flexShrink: 0,
            }}
          >
            {styles.icon}
          </Box>
        )}

        {/* Content */}
        <Box sx={{ flex: 1, paddingRight: '32px' }}>
          {messages.map((msg, index) => (
            <Typography
              key={index}
              sx={{
                margin: 0,
                fontSize: '16px',
                color: styles.textColor,
                lineHeight: '24px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: index < messages.length - 1 ? '8px' : 0,
              }}
            >
              {messages.length > 1 && (variant === 'default' || variant === 'error') && (
                <span style={{ marginRight: '8px' }}>•</span>
              )}
              {msg}
            </Typography>
          ))}
        </Box>

        {/* Close Button */}
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '4px',
          }}
        >
          <Close sx={{ color: styles.closeIconColor, fontSize: '24px' }} />
        </IconButton>
      </Box>
    </MuiSnackbar>
  );
};

export default Snackbar;
