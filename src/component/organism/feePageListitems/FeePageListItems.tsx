import React from 'react';
import { Box, Typography } from '@mui/material';
import Chip from '../../atom/chip/Chip';
import Button from '../../atom/button/Button';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface FeeListItemRowProps {
  title: string;
  value: string;
}

export const FeeListItemRow: React.FC<FeeListItemRowProps> = ({ title, value }) => {
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: theme.spacing(1),
        flex: 1,
        minWidth: 0,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.grey[500],
          fontSize: { md: '12px', lg: '14px' },
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { md: '14px', lg: '16px' },
          fontWeight: 400,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export enum FeeStatusVariant {
  Success = 'success',
  Paid = 'success',
  Pending = 'warning',
  Unpaid = 'warning',
  Failed = 'error',
  Overdue = 'error',
}

export interface FeeListItemStatusProps {
  status: 'Success' | 'Pending' | 'Failed' | 'Paid' | 'Unpaid' | 'Overdue';
}

export const FeeListItemStatus: React.FC<FeeListItemStatusProps> = ({ status }) => {
  const theme = useCoreTheme() as CoreTheme;
  const chipVariant = FeeStatusVariant[status];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        minWidth: 0,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: { md: 'none', lg: 'block' },
          color: theme.palette.grey[500],
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Status
      </Typography>
      <Chip
        variant={chipVariant}
        label={status}
        sx={{
          padding: 0,
          height: 'auto',
          minHeight: 'auto',
          width: { md: '65px', lg: 'auto' },
          fontSize: { md: '10px', lg: '14px' },
          '& .MuiChip-label': {
            padding: theme.spacing(0),
            lineHeight: 1.8,
          },
        }}
      />
    </Box>
  );
};

export interface FeeListItemButtonProps {
  onClick?: () => void;
}

export const FeeListItemButton: React.FC<FeeListItemButtonProps> = ({ onClick }) => {
  const theme = useCoreTheme() as CoreTheme;
  // If no onClick handler is provided, don't render the button
  if (!onClick) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1,
        minWidth: 0,
      }}
    >
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          display: 'inline-flex',
          paddingY: theme.spacing(1),
          paddingX: theme.spacing(2.5),
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '12px',
          borderRadius: theme.spacing(25),
          border: '1px solid #87B3FA',
          textTransform: 'none',
          fontWeight: 500,
          color: theme.palette.info.main,
          '&:hover': {
            border: '1px solid #5D9BFB',
            backgroundColor: 'rgba(135, 179, 250, 0.04)',
          },
        }}
      >
        View Receipt
      </Button>
    </Box>
  );
};

export interface FeeListItemProps {
  bgColor?: string;
  children: React.ReactNode;
}

const FeeListItem: React.FC<FeeListItemProps> = ({ children }) => {
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Box
      sx={{
        borderRadius: theme.spacing(6),
        boxShadow: theme.vd.shadows.y4,
        backgroundColor: 'background.paper',
        mb: theme.spacing(2),
        width: '100%',
        px: { md: '24px', lg: '32px' },
        py: { md: '14px', lg: '24px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: { md: theme.spacing(5), lg: theme.spacing(10) },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FeeListItem;
