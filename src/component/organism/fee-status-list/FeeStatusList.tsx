import React, { ComponentProps } from 'react';
import { Box, Typography } from '@mui/material';
import { useCoreTheme } from '../../../theme/core-theme';
import { Button } from '../../atom/button';

export enum FeeStatus {
  OVERDUE = 'overdue',
  DUE = 'due',
  PAID = 'paid',
}

export interface FeeItem {
  label: string;
  value: string | React.ReactNode;
}

export interface IFeeStatusListProps {
  status: FeeStatus;
  feeItems: FeeItem[];
  onPayNow?: () => void;
}

export type FeeStatusListProps = ComponentProps<typeof Box> & IFeeStatusListProps;

const statusIcons = {
  [FeeStatus.OVERDUE]: '⚠️',
  [FeeStatus.DUE]: '⏳',
  [FeeStatus.PAID]: '✅',
};

const FeeStatusList: React.FC<FeeStatusListProps> = ({
  status,
  feeItems,
  onPayNow,
  ...props
}) => {
  const theme = useCoreTheme();

  const getStatusColor = (status: FeeStatus) => {
    switch (status) {
      case FeeStatus.OVERDUE:
        return theme.palette.error.main;
      case FeeStatus.DUE:
        return theme.palette.warning.main;
      case FeeStatus.PAID:
        return theme.palette.success.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const statusColor = getStatusColor(status);
  const semesterItem = feeItems.find(item => item.label.toLowerCase() === 'semester');
  const otherItems = feeItems.filter(item => item.label.toLowerCase() !== 'semester');

  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        background: 'linear-gradient(180deg, #EDDBFF 0%, #FFE6CE 100%)',
        borderRadius: '36px',
        padding: theme.spacing(5, 4),
        marginBottom: theme.spacing(2),
        width: '100%',
        maxWidth: '1200px',
        border: '1px solid #7B2CBF',
        position: 'relative',
        ...props.sx,
      }}
    >
      {/* Status Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: -12,
          left: theme.spacing(4),
          backgroundColor: theme.palette.common.white,
          color: statusColor,
          padding: theme.spacing(0.5, 1.5),
          borderRadius: theme.spacing(3),
          border: `1px solid ${statusColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100px',
          gap: theme.spacing(0.5),
          zIndex: 1,
        }}
      >
        <Box sx={{ fontSize: '0.875rem' }}>{statusIcons[status]}</Box>
        <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '0.75rem' }}>
          {status}
        </Typography>
      </Box>

      {/* Column 1: Semester + Icon */}
      <Box
        sx={{
          flex: 1,
          minWidth: 200,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            backgroundImage: `url('https://acjlsquedaotbhbxmtee.storage.supabase.co/v1/object/public/vedam-website-assets/images/certificate/Group%201261155605.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
            width: 60,
            height: 60,
            border: `2px solid ${theme.palette.divider}`,
          }}
        />
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {semesterItem?.label || 'Semester'}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {semesterItem?.value || 'Semester 1 Fees'}
          </Typography>
        </Box>
      </Box>

      {/* Dynamic Fields */}
      {otherItems.map((item, index) => (
        <Box
          key={`${item.label}-${index}`}
          sx={{
            flex: 1,
            minWidth: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.label}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}

      {/* Pay Now Button */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
        }}
      >
        <Button
          variant="contained"
          onClick={onPayNow}
          sx={{
            minWidth: '200px',
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: '#7C3AED',
            '&:hover': {
              backgroundColor: '#6D28D9',
            },
          }}
        >
          Pay Now
        </Button>
      </Box>
    </Box>
  );
};

export default FeeStatusList;
