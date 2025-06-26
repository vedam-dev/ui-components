import { Checkbox as BaseCheckbox } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

type PaletteColorKeys = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface ICheckboxProps {
  /**
   * If true, the component is checked
   */
  checked?: boolean;
  /**
   * The icon to display when the component is checked
   */
  checkedIcon?: React.ReactNode;
  /**
   * The color of the component
   * @default 'primary'
   */
  color?: 'default' | PaletteColorKeys | string;
  /**
   * The default checked state
   */
  defaultChecked?: boolean;
  /**
   * If true, the component is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the ripple effect is disabled
   * @default false
   */
  disableRipple?: boolean;
  /**
   * The icon to display when the component is unchecked
   */
  icon?: React.ReactNode;
  /**
   * If true, the component appears indeterminate
   * @default false
   */
  indeterminate?: boolean;
  /**
   * The icon to display when the component is indeterminate
   */
  indeterminateIcon?: React.ReactNode;
  /**
   * Callback fired when the state changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * If true, the input element is required
   * @default false
   */
  required?: boolean;
  /**
   * The size of the component
   * @default 'medium'
   */
  size?: 'medium' | 'small' | string;
  /**
   * The value of the component
   */
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
    
    // Check if color is a valid palette key
    const paletteColors: PaletteColorKeys[] = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];
    if (paletteColors.includes(color as PaletteColorKeys)) {
      return palette[color as PaletteColorKeys]?.main;
    }
    
    // For custom string colors, return the string directly
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