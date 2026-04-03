import { Checkbox as BaseCheckbox, Box } from '@mui/material';
import React from 'react';
import { ComponentProps, FC } from 'react';
import SxOverride from '../../../util/SxOverride';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

type PaletteColorKeys = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

import DoneIcon from '@mui/icons-material/Done';

const SquaredIcon = () => (
  <Box
    className="squared-icon"
    sx={{
      width: '18px',
      height: '18px',
      borderRadius: '4px',
      bgcolor: 'white',
      border: '2px solid #E5E5E5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    }}
  />
);

const SquaredCheckedIcon = () => (
  <Box
    className="squared-checked-icon"
    sx={{
      width: '18px',
      height: '18px',
      borderRadius: '4px',
      bgcolor: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      transition: 'all 0.2s ease',
    }}
  >
    <DoneIcon sx={{ fontSize: '16px' }} />
  </Box>
);

export interface ICheckboxProps {
  checked?: boolean;
  checkedIcon?: React.ReactNode;
  color?: 'default' | PaletteColorKeys | string;
  defaultChecked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  size?: 'medium' | 'small' | string;
  value?: any;
  variant?: 'standard' | 'squared';
}

export type CheckboxProps = ComponentProps<typeof BaseCheckbox> & ICheckboxProps;

const Checkbox: FC<CheckboxProps> = ({
  color = 'primary',
  size = 'medium',
  sx,
  variant = 'standard',
  ...props
}) => {
  const { palette } = useCoreTheme() as CoreTheme;

  const getColor = () => {
    if (color === 'default') return undefined;

    const paletteColors: PaletteColorKeys[] = [
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ];
    if (paletteColors.includes(color as PaletteColorKeys)) {
      return palette[color as PaletteColorKeys]?.main;
    }

    return color;
  };

  if (variant === 'squared') {
    return (
      <BaseCheckbox
        icon={<SquaredIcon />}
        checkedIcon={<SquaredCheckedIcon />}
        disableRipple
        sx={SxOverride(
          {
            p: 0,
            '&:hover': {
              bgcolor: 'transparent',
              '& .squared-icon': {
                bgcolor: '#F3F1F6',
                transform: 'scale(1.1)',
              },
              '& .squared-checked-icon': {
                bgcolor: palette.primary?.dark || '#7B2CBF',
                transform: 'scale(1.1)',
              },
            },
            '&.Mui-disabled': {
              '& .squared-checked-icon': {
                bgcolor: '#777777',
              },
            },
          },
          sx
        )}
        disabled={props.disabled}
        {...props}
      />
    );
  }

  const sxValue = SxOverride(
    {
      color: getColor(),
      '&.Mui-checked': {
        color: getColor(),
      },
    },
    sx
  );

  return (
    <BaseCheckbox
      color={color === 'default' ? undefined : (color as PaletteColorKeys)}
      size={size}
      sx={sxValue}
      {...props}
    />
  );
};

export default Checkbox;
