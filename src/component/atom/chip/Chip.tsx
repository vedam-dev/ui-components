import { Chip as BaseChip } from '@mui/material';
import { ComponentProps, FC, MouseEvent } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

type StatusVariants = 'success' | 'error' | 'warning';
type BaseVariants = 'filled' | 'outlined';

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

  variant?: BaseVariants | StatusVariants;
}

export type ChipProps = ComponentProps<typeof BaseChip> & IChipProps;

const STATUS_COLORS: Record<StatusVariants, string> = {
  success: '#42B657',
  error: '#E74E2C',
  warning: '#EEB929',
};

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
    if ((['success', 'error', 'warning'] as StatusVariants[]).includes(variant as StatusVariants)) {
      return STATUS_COLORS[variant as StatusVariants];
    }
    if (color === 'default') return undefined;
    const paletteColors: PaletteColorKeys[] = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];
    if (paletteColors.includes(color as PaletteColorKeys)) {
      return palette[color as PaletteColorKeys]?.main || color;
    }
    return color;
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => onClick?.(event);
  const handleDelete = () => onDelete?.();

  const baseVariant: BaseVariants = variant === 'outlined' ? 'outlined' : 'filled';

  const sxValue = SxOverride(
    {
      padding: '0px 10px',
      borderRadius: '100px',
      ...(baseVariant === 'filled' && {
        backgroundColor: getColorValue(),
        color: palette.common.white,
      }),
      ...(baseVariant === 'outlined' && {
        color: getColorValue(),
        borderColor: getColorValue(),
      }),
      '& .MuiChip-deleteIcon': {
        color: baseVariant === 'filled' ? palette.common.white : getColorValue(),
      },
      cursor: props.clickable || !!onClick ? 'pointer' : undefined,
    },
    sx
  );

  return (
    <BaseChip
      color={(['success', 'error', 'warning'] as StatusVariants[]).includes(variant as StatusVariants) ? undefined : (color === 'default' ? undefined : (color as PaletteColorKeys))}
      size={size}
      variant={baseVariant}
      onClick={handleClick}
      onDelete={onDelete ? handleDelete : undefined}
      clickable={false}
      sx={sxValue}
      {...props}
    />
  );
};

export default Chip;