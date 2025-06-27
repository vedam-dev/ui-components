import { Checkbox as BaseCheckbox } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

type PaletteColorKeys = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

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
}

export type CheckboxProps = ComponentProps<typeof BaseCheckbox> & ICheckboxProps;

const Checkbox: FC<CheckboxProps> = ({
  color = 'primary',
  size = 'medium',
  sx,
  ...props
}) => {
  const { palette } = useCoreTheme() as CoreTheme;

  const getColor = () => {
    if (color === 'default') return undefined;
    
    const paletteColors: PaletteColorKeys[] = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];
    if (paletteColors.includes(color as PaletteColorKeys)) {
      return palette[color as PaletteColorKeys]?.main;
    }
    
    return color;
  };

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
      color={color === 'default' ? undefined : color as PaletteColorKeys}
      size={size}
      sx={sxValue}
      {...props}
    />
  );
};

export default Checkbox;