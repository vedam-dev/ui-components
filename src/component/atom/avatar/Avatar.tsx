import { Avatar as BaseAvatar } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

export interface IAvatarProps {
  color?: string;
  backgroundColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export type AvatarProps = ComponentProps<typeof BaseAvatar> & IAvatarProps;

const Avatar: FC<AvatarProps> = ({ color, sx, backgroundColor, children, ...props }) => {
  const { palette, vd } = useCoreTheme() as CoreTheme;

  let backgroundColorValue: string = 'inherit';

  if (!!backgroundColor && backgroundColor !== 'inherit') {
    backgroundColorValue = palette[backgroundColor]?.main;
  }

  const colorValue = color ? color : palette.common.white;

  const sxValue = SxOverride(
    {
      ...vd.typography.avatar,
      background: backgroundColorValue,
      color: colorValue,
      alignContent: 'center'
    },
    sx
  );

  return (
    <BaseAvatar {...props} sx={sxValue}>
      {children}
    </BaseAvatar>
  );
};

export default Avatar;
