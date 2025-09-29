import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from '@mui/material';
import { FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';

export interface AppBarProps extends MuiAppBarProps {
  /**
   * The color of the component
   * @default 'primary'
   */
  color?:
    | 'default'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  /**
   * If true, the color prop is applied in dark mode
   * @default false
   */
  enableColorOnDark?: boolean;
}

const AppBar: FC<AppBarProps> = ({
  color = {
    primary: 'red',
    secondary: 'blue',
    tertiary: 'green',
    main: 'grey',
  },
  enableColorOnDark = false,
  sx,
  ...props
}) => {
  const { palette } = useCoreTheme() as CoreTheme;

  const sxValue = SxOverride(
    {
      ...(enableColorOnDark && {
        '@media (prefers-color-scheme: dark)': {
          backgroundColor:
            typeof palette[color as keyof typeof palette] === 'object' &&
            palette[color as keyof typeof palette] !== null &&
            'main' in (palette[color as keyof typeof palette] as object)
              ? (palette[color as keyof typeof palette] as { main: string }).main
              : color,
        },
      }),
    },
    sx
  );

  return <MuiAppBar color={color as MuiAppBarProps['color']} sx={sxValue} {...props} />;
};

export default AppBar;
