import { Select as BaseSelect } from '@mui/material';
import React from 'react';
import { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

type PaletteColorKeys = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface ISelectProps {
  autoWidth?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  displayEmpty?: boolean;
  IconComponent?: React.ElementType;
  id?: string;
  input?: React.ReactElement;
  label?: React.ReactNode;
  labelId?: string;
  MenuProps?: object;
  multiple?: boolean;
  native?: boolean;
  onChange?: (event: unknown, child?: React.ReactNode) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  onOpen?: (event: React.SyntheticEvent) => void;
  open?: boolean;
  renderValue?: (value: unknown) => React.ReactNode;
  SelectDisplayProps?: object;
  color?: PaletteColorKeys;
  size?: 'small' | 'medium';
  value?: unknown;
}

export type SelectProps = Omit<ComponentProps<typeof BaseSelect>, 'color'> & ISelectProps;

const Select: FC<SelectProps> = ({
  autoWidth = false,
  variant = 'outlined',
  displayEmpty = false,
  color,
  size = 'medium',
  sx,
  multiple,
  value,
  ...props
}) => {
  const { palette } = useCoreTheme() as CoreTheme;

  // Validate value when multiple is true
  if (multiple && !Array.isArray(value)) {
    value = [];
  }

  const getColor = (): string | undefined => {
    if (!color || color === 'primary') return undefined;

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

  const sxValue = SxOverride(
    {
      color: getColor(),
      '& .MuiSelect-icon': {
        color: getColor(),
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: getColor(),
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: getColor(),
      },
    },
    sx
  );

  return (
    <BaseSelect
      autoWidth={autoWidth}
      variant={variant}
      displayEmpty={displayEmpty}
      size={size}
      sx={sxValue}
      multiple={multiple}
      value={value}
      {...props}
    />
  );
};

export default Select;
