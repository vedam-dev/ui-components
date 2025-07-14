
import React, { ComponentProps, FC, MouseEvent } from 'react';
import { Chip as BaseChip } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

type StatusVariants = 'success' | 'error' | 'warning';
type BaseVariants = 'filled' | 'outlined';
type PaletteColorKeys =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

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
  variant?: BaseVariants | StatusVariants;
  sx?: any;
}

export type ChipProps = Omit<ComponentProps<typeof BaseChip>, 'variant'> & IChipProps;

const Chip: FC<ChipProps> = ({
  avatar,
  clickable,
  color = 'default',
  deleteIcon,
  disabled,
  icon,
  label,
  onClick,
  onDelete,
  size = 'medium',
  skipFocusWhenDisabled,
  variant = 'filled',
  sx,
  ...props
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const { palette } = theme;


  const STATUS_COLORS: Record<StatusVariants, string> = {
    success: palette.success.dark, 
    error: palette.error.dark, 
    warning: palette.warning.dark, 
  };

  const getColorValue = () => {
    if ((['success', 'error', 'warning'] as StatusVariants[]).includes(variant as StatusVariants)) {
      return STATUS_COLORS[variant as StatusVariants];
    }
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
      return (palette[color as PaletteColorKeys]?.main || color) as string;
    }
    return color;
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => onClick?.(event);
  const handleDelete = () => onDelete?.();

  const baseVariant: BaseVariants = variant === 'outlined' ? 'outlined' : 'filled';
  const colorValue = getColorValue();

  const sxValue = SxOverride(
    {
      padding: '0px 10px',
      borderRadius: '100px',
      ...(baseVariant === 'filled' && {
        backgroundColor: colorValue,
        color: palette.common.white,
      }),
      ...(baseVariant === 'outlined' && {
        color: colorValue,
        borderColor: colorValue,
      }),
      '& .MuiChip-deleteIcon': {
        color: baseVariant === 'filled' ? palette.common.white : colorValue,
      },
      cursor: clickable || !!onClick ? 'pointer' : undefined,
    },
    sx
  );

  return (
    <BaseChip
      avatar={avatar}
      color={
        (['success', 'error', 'warning'] as StatusVariants[]).includes(variant as StatusVariants)
          ? undefined
          : color === 'default'
          ? undefined
          : (color as PaletteColorKeys)
      }
      deleteIcon={deleteIcon}
      disabled={disabled}
      icon={icon}
      label={label}
      onClick={handleClick}
      onDelete={onDelete ? handleDelete : undefined}
      size={size}
      skipFocusWhenDisabled={skipFocusWhenDisabled}
      variant={baseVariant}
      clickable={clickable || !!onClick}
      sx={sxValue}
      {...props}
    />
  );
};

export default Chip;
