import { Button as MuiButton, SxProps, Theme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { PopoverOrigin } from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { ComponentProps, CSSProperties, FC } from 'react';
import { useCoreTheme } from '../../../../theme/core-theme';
import { INavigationItemMultiple, NavigationMenuItems } from '../types';
import { INavigationMainLogoProps } from './components/NavigationMainLogo';
import NavigationMenuButton, {
  INavigationMenuItemButtonProps,
} from './components/NavigationMenuButton';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { handleSkipTo } from '../navigationUtils';

export interface INavigationMenuProps extends INavigationMainLogoProps {
  height: string;
  largeHeight?: string;
  showSkipContent?: boolean;
  skipContentLabel?: string;
  appBarProps?: ComponentProps<typeof AppBar>;
  appBarContainerProps?: ComponentProps<typeof Container>;
  appToolbarContainerProps?: ComponentProps<typeof Container>;
  primaryMenuProps?: ComponentProps<typeof Box>;
  secondaryMenu?: React.ReactNode;
  navigationButtonProps?: INavigationMenuItemButtonProps;
  skipContentStyle?: SxProps<Theme>;
  navigationMenuItems: NavigationMenuItems;
  currentPath?: string;
  subMenuAnchorOrigin?: PopoverOrigin;
  subMenuTransformOrigin?: PopoverOrigin;
  subMenuStyle?: CSSProperties;
  subMenuRootStyle?: CSSProperties;
  subMenuIconStyle?: CSSProperties;
  ariaLabels?: {
    logoAriaLabel?: string;
    menuButtonAriaLabel?: string;
  };
  customSkipTo?: () => void;
}

export type NavigationMenuProps = INavigationMenuProps;

const NavigationMenu: FC<NavigationMenuProps> = ({
  largeHeight,
  showSkipContent,
  skipContentLabel,
  skipContentStyle = skipToContentStyle,
  appBarProps,
  appBarContainerProps,
  appToolbarContainerProps,
  primaryMenuProps,
  secondaryMenu,
  navigationMenuItems,
  navigationButtonProps,
  currentPath,
  subMenuAnchorOrigin,
  subMenuTransformOrigin,
  subMenuStyle,
  subMenuIconStyle,
  subMenuRootStyle,
  customSkipTo,
  ...mainLogoProps
}) => {
  const theme = useCoreTheme();

  const mainNavHeight = largeHeight;

  const visibleItems = navigationMenuItems.filter((item) => !item.hidden);
  const totalVisibleItems = visibleItems.length;

  return (
    <AppBar position={appBarProps?.position ?? 'sticky'} {...appBarProps}>
      <Container
        disableGutters
        maxWidth="xl"
        {...appBarContainerProps}
        sx={{
          pt: theme.spacing(0),
          pb: theme.spacing(0),
          pl: theme.spacing(6),
          pr: theme.spacing(6),
          ...appBarContainerProps?.sx,
        }}
      >
        <Toolbar
          disableGutters
          {...appToolbarContainerProps}
          sx={{
            height: mainNavHeight,
            alignItems: 'center',
            justifyContent: 'space-between',
            ...appToolbarContainerProps?.sx,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {mainLogoProps.LogoIcon ? (
              <div style={{ display: 'flex' }}>
                {showSkipContent && (
                  <MuiButton
                    role="link"
                    sx={skipContentStyle}
                    style={{ order: 1 }}
                    onClick={(e) => {
                      handleSkipTo(e);
                      customSkipTo?.();
                    }}
                    aria-label={skipContentLabel}
                    tabIndex={0}
                  >
                    {skipContentLabel ?? 'Skip to main content'}
                  </MuiButton>
                )}
                <Box
                  className="logo-container"
                  sx={{
                    height: mainNavHeight,
                    width: 120,
                    position: 'relative',
                    order: 2,
                  }}
                >
                  {mainLogoProps.LogoIcon}
                </Box>
              </div>
            ) : null}
            <Box sx={{ flexGrow: 1 }}>
              <Box
                {...primaryMenuProps}
                sx={{ flexGrow: 1, display: 'flex', paddingLeft: theme.spacing(6) }}
                alignItems={`center`}
                gap={theme.spacing(3)}
                ml={primaryMenuProps?.ml ?? theme.spacing(40)}
              >
                {navigationMenuItems.map((item, idx) => {
                  const positionInSet = idx + 1 - (visibleItems.length - totalVisibleItems);
                  const ariaLabel = `${item.label}, item ${positionInSet} of ${totalVisibleItems}`;

                  const additionalProps = item.hidden
                    ? navigationButtonProps
                    : {
                        'aria-posinset': positionInSet,
                        'aria-setsize': totalVisibleItems,
                        'aria-label': ariaLabel,
                        ...navigationButtonProps,
                        role:
                          !(item as INavigationItemMultiple)?.subItems ||
                          (item as INavigationItemMultiple)?.subItems.length === 0
                            ? 'link'
                            : 'button',
                      };

                  return (
                    <NavigationMenuButton
                      key={idx}
                      tabIndex={0}
                      onNavigationClick={mainLogoProps.onNavigationClick}
                      onDropdownClick={
                        mainLogoProps.onDropdownClick ? mainLogoProps.onDropdownClick : undefined
                      }
                      item={item}
                      navigationButtonProps={additionalProps}
                      currentPath={currentPath}
                      anchorOrigin={subMenuAnchorOrigin}
                      menuStyle={subMenuStyle}
                      transformOrigin={subMenuTransformOrigin}
                      subMenuIconStyle={subMenuIconStyle}
                      rootStyle={subMenuRootStyle}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
          {secondaryMenu}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationMenu;

const skipToContentStyle: (theme: Theme) => SystemStyleObject<Theme> = (theme) => ({
  position: 'absolute',
  top: '-200%',
  zIndex: 100,
  width: '220px',
  textDecoration: 'none',
  background: theme.palette.primary.dark,
  color: theme.palette.common.white,
  padding: 'theme.spacing(1) theme.spacing(2)',
  borderRadius: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.common.white}`,
  outline: `2px solid ${theme.palette.common.black}`,
  alignItems: 'center',
  fontFamily: theme.typography.subtitle2.fontFamily,
  margin: '10 0',
  '&:focus, &:focus-visible': {
    zIndex: 0,
    top: 10,
    position: 'relative',
  },
  [theme.breakpoints.down('md')]: {
    width: '30%',
    margin: `0 auto`,
  },
  [theme.breakpoints.down('sm')]: {
    width: '45%',
    margin: `0 auto`,
  },
});
