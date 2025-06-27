import { Chip as BaseChip } from '@mui/material';
import { ComponentProps, FC, MouseEvent } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

type PaletteColorKeys = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface IChipProps {
  avatar?: React.ReactElement;

  clickable?: boolean;

  color?: 'default' | PaletteColorKeys | string;

  deleteIcon?: React.ReactElement;

  disabled?: boolean;

  icon?: React.ReactElement;
 
  label?: React.ReactNode;

  onClick?: (event: MouseEvent<HTMLDivElement>) => void;

  onDelete?: () => void;

  size?: 'small' | 'medium' | string;

  skipFocusWhenDisabled?: boolean;

  variant?: 'filled' | 'outlined' | string;
}

export type ChipProps = ComponentProps<typeof BaseChip> & IChipProps;

const Chip: FC<ChipProps> = ({
  color = 'default',
  size = 'medium',
  variant = 'filled',
  onClick,
  onDelete,
  sx,
  ...props
}) => {
  const { palette } = useCoreTheme() as CoreTheme;

  const getColorValue = () => {
    if (color === 'default') return undefined;
    
    const paletteColors: PaletteColorKeys[] = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];
    if (paletteColors.includes(color as PaletteColorKeys)) {
      const paletteColor = palette[color as PaletteColorKeys];
      return paletteColor?.main || color;
    }
    return color;
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const sxValue = SxOverride(
    {
      ...(variant === 'filled' && {
        backgroundColor: getColorValue(),
        color: palette.common.white,
      }),
      ...(variant === 'outlined' && {
        color: getColorValue(),
        borderColor: getColorValue(),
      }),
      '& .MuiChip-deleteIcon': {
        color: variant === 'filled' ? palette.common.white : getColorValue(),
      },
      cursor: props.clickable || onClick ? 'pointer' : undefined,
    },
    sx
  );

  return (
    <BaseChip
      color={color === 'default' ? undefined : color as PaletteColorKeys}
      size={size}
      variant={variant}
      onClick={handleClick}
      onDelete={onDelete ? handleDelete : undefined}
      sx={sxValue}
      {...props}
    />
  );
};

export default Chip;