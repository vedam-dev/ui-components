import Box from '@mui/material/Box';
import React, { FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface ArrowButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowButton: FC<ArrowButtonProps> = ({ onClick, disabled }) => {
  const theme = useCoreTheme() as CoreTheme;
  const isClickable = onClick && !disabled;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: isClickable ? 'pointer' : 'default',
        flex: '0 0 auto',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      onClick={isClickable ? onClick : undefined}
    >
      <Box
        sx={{
          width: '39px',
          height: '39px',
          borderRadius: '39px',
          background: theme.palette.primary[100],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease-in-out',
          '&:hover': isClickable
            ? {
                background: theme.palette.primary[200],
              }
            : {},
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="16"
          viewBox="0 0 10 19"
          fill="none"
        >
          <path
            d="M9.75562 10.0788L1.42322 18.2602C1.3458 18.3363 1.2539 18.3965 1.15275 18.4377C1.0516 18.4788 0.943187 18.5 0.833703 18.5C0.72422 18.5 0.615808 18.4788 0.514659 18.4377C0.413509 18.3965 0.321602 18.3363 0.244186 18.2602C0.166769 18.1842 0.105359 18.094 0.0634615 17.9947C0.021564 17.8953 0 17.7889 0 17.6814C0 17.5739 0.021564 17.4675 0.0634615 17.3681C0.105359 17.2688 0.166769 17.1786 0.244186 17.1026L7.98811 9.5L0.244186 1.89743C0.0878359 1.74391 -1.64741e-09 1.5357 0 1.3186C1.64741e-09 1.10149 0.0878359 0.893277 0.244186 0.739761C0.400535 0.586245 0.612592 0.5 0.833703 0.5C1.05482 0.5 1.26687 0.586245 1.42322 0.739761L9.75562 8.92116C9.83309 8.99715 9.89455 9.08738 9.93649 9.1867C9.97842 9.28602 10 9.39248 10 9.5C10 9.60752 9.97842 9.71398 9.93649 9.8133C9.89455 9.91262 9.83309 10.0028 9.75562 10.0788Z"
            fill={theme.palette.primary[500]}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default ArrowButton;
