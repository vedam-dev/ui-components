import { Skeleton as BaseSkeleton } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

export interface ISkeletonProps {
  animation?: 'pulse' | 'wave' | false;
  children?: React.ReactNode;
  height?: number | string;
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  width?: number | string;
}

export type SkeletonProps = ComponentProps<typeof BaseSkeleton> & ISkeletonProps;

const Skeleton: FC<SkeletonProps> = ({
  animation = 'pulse',
  children,
  height,
  variant = 'text',
  width,
  sx,
  ...props
}) => {
  const { palette } = useCoreTheme() as CoreTheme;

  const sxValue = SxOverride(
    {
      backgroundColor: palette.grey[200],
      ...(variant === 'circular' && { borderRadius: '50%' }),
      ...(variant === 'rounded' && { borderRadius: '4px' }),
      ...(animation === 'wave' && {
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, ${palette.grey[100]}, transparent)`,
          animation: 'wave 1.5s linear 0.5s infinite',
          transform: 'translateX(-100%)'
        }
      })
    },
    sx
  );

  return (
    <BaseSkeleton
      animation={animation}
      variant={variant}
      width={width}
      height={height}
      sx={sxValue}
      {...props}
    >
      {children}
    </BaseSkeleton>
  );
};

export default Skeleton;
