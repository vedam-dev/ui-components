import {
  Box,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  Color,
  ClickAwayListener,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { SxProps, Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import React, {
  ComponentProps,
  FC,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CoreTheme, useCoreTheme } from '../../../../theme/core-theme';
import { SvgIcon } from '../../../atom/icon';
import { Button } from '../../../atom/button';
import { Button as MuiButton } from '@mui/material';
import { INavigationItem, INavigationItemMultiple, NavigationMenuItems } from '../types';
import MenuSubItems from './components/MenuSubItems';
import { INavigationMainLogoProps } from './components/NavigationMainLogo';
import { INavigationMenuItemButtonProps } from './components/NavigationMenuButton';
import { handleSkipTo } from '../navigationUtils';

export interface INavigationMobileMenuProps extends INavigationMainLogoProps {
  height: string;
  showSkipContent?: boolean;
  skipContentLabel?: string;
  skipContentStyle?: SxProps<Theme>;
  appBarProps?: ComponentProps<typeof AppBar>;
  appBarContainerProps?: ComponentProps<typeof Container>;
  appToolbarContainerProps?: ComponentProps<typeof Container>;
  secondaryMenu?: React.ReactNode;
  navigationButtonProps?: INavigationMenuItemButtonProps;
  mobileNonLoginSection?: React.ReactNode;
  mobileNonLoginSectionAsMenuItem?: boolean;
  mobileAccountSection?: React.ReactNode;
  mobileSignOutItem?:
    | React.ReactNode
    | {
        label: string;
        onClick: () => void;
      };
  navigationMenuItems: NavigationMenuItems;
  isLoggedIn?: boolean;
  currentPath?: string;
  mobileNonLoginBreakpoint?: number;
  renderHamburgerFirst?: boolean;
  ariaLabels?: {
    hamburgerButton?: {
      open: string;
      close: string;
    };
    menuButtonAriaLabel?: string;
    menuSubItemAriaLabel?: string;
  };
  customSkipTo?: () => void;
}

export type NavigationMobileMenuProps = INavigationMobileMenuProps;

const NavigationMenu: FC<NavigationMobileMenuProps> = ({
  height,
  showSkipContent,
  skipContentLabel,
  skipContentStyle = skipToContentStyle,
  ariaLabels,
  appBarProps,
  appBarContainerProps,
  appToolbarContainerProps,
  navigationMenuItems,
  secondaryMenu,
  isLoggedIn,
  mobileNonLoginSection,
  mobileNonLoginSectionAsMenuItem,
  mobileAccountSection,
  mobileSignOutItem,
  currentPath,
  mobileNonLoginBreakpoint,
  renderHamburgerFirst = false,
  customSkipTo,
  ...mainLogoProps
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'md'));
  const isLargerTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(mobileNonLoginBreakpoint || 'md')
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState('');

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(anchorElNav ? null : event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleItemClick = (e: SyntheticEvent, item: INavigationItem): void => {
    setMenuOpen(menuOpen === item.label ? '' : item.label);
    mainLogoProps.onNavigationClick(e, item);
    handleCloseNavMenu();
  };

  const menuItemSx = {
    padding: `${theme.spacing(2)} ${theme.spacing(6)}`,
    minHeight: 'auto',
    '&:hover': { backgroundColor: 'transparent' },
  };

  const nonLoginItem = useMemo(() => {
    if (
      (mobileNonLoginBreakpoint ? isLargerTablet : isMobile || isTablet) &&
      !isLoggedIn &&
      mobileNonLoginSection
    ) {
      if (mobileNonLoginSectionAsMenuItem) {
        return (
          <MenuItem
            disableRipple
            sx={{
              ...menuItemSx,
              cursor: 'default',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.stopPropagation();
              }
            }}
            onClick={handleCloseNavMenu}
          >
            <Box
              className="nav__mobile-non-login-section"
              sx={{
                width: '100%',
                color: theme.palette.grey[500],
                whiteSpace: 'normal',
                marginBottom: theme.spacing(2),
              }}
            >
              {mobileNonLoginSection}
            </Box>
          </MenuItem>
        );
      }
      return (
        <Box className="nav__mobile-non-login-section" onClick={handleCloseNavMenu}>
          {mobileNonLoginSection}
        </Box>
      );
    }
    return null;
  }, [mobileNonLoginBreakpoint, isLargerTablet, isMobile, isTablet, isLoggedIn]);

  const signOutItem = useMemo(() => {
    if (isMobile && isLoggedIn && mobileSignOutItem) {
      if (typeof mobileSignOutItem === 'object' && 'label' in mobileSignOutItem) {
        return (
          <MenuItem
            sx={menuItemSx}
            onClick={() => {
              mobileSignOutItem.onClick();
              handleCloseNavMenu();
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: (theme.palette.error as unknown as Color)['400'] }}
            >
              {mobileSignOutItem.label}
            </Typography>
          </MenuItem>
        );
      }
      return <Box onClick={handleCloseNavMenu}>{mobileSignOutItem}</Box>;
    }
    return null;
  }, [isMobile, isLoggedIn, mobileSignOutItem]);

  // Hamburger Menu Aria Label
  const hamburgerLabel = useMemo(() => {
    if (ariaLabels?.hamburgerButton) {
      return anchorElNav ? ariaLabels.hamburgerButton.close : ariaLabels.hamburgerButton.open;
    }
    return undefined;
  }, [anchorElNav, ariaLabels]);

  const hamburgerButton = useMemo(() => {
    return (
      <Button
        aria-haspopup="true"
        disableFocusRipple={true}
        disableRipple={true}
        onClick={handleOpenNavMenu}
        variant={`text`}
        sx={mainButtonStyle}
        tabIndex={0}
        className="nav__mobile-menu"
        aria-label={hamburgerLabel}
      >
        <SvgIcon iconName="monotoneMenu" sx={{ width: '32px', height: '32px' }} />
      </Button>
    );
  }, [hamburgerLabel]);

  const [isHidden, setIsHidden] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anchorElNav) {
      ref?.current?.focus();
      setIsHidden(!anchorElNav);
    }
  }, [Boolean(anchorElNav)]);
  return (
    <>
      <AppBar
        position={appBarProps?.position ?? 'sticky'}
        {...appBarProps}
        sx={{
          zIndex: 999,
          ...appBarProps?.sx,
        }}
      >
        {showSkipContent && (
          <MuiButton
            role="link"
            sx={skipContentStyle}
            onClick={(e) => {
              handleSkipTo(e);
              customSkipTo?.();
            }}
            tabIndex={0}
          >
            {skipContentLabel ?? 'Skip to main content'}
          </MuiButton>
        )}
        <Container
          disableGutters
          maxWidth="lg"
          {...appBarContainerProps}
          sx={{
            p: theme.spacing(0),
            ...appBarContainerProps?.sx,
          }}
        >
          <Toolbar
            disableGutters
            {...appToolbarContainerProps}
            sx={{
              height,
              alignItems: 'center',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              ...appToolbarContainerProps?.sx,
            }}
          >
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={handleCloseNavMenu}
            >
              <Box>
                {renderHamburgerFirst ? (
                  <>
                    {hamburgerButton}
                    {mainLogoProps.LogoIcon}
                  </>
                ) : (
                  <>
                    {mainLogoProps.LogoIcon}
                    {hamburgerButton}
                  </>
                )}
                <Menu
                  MenuListProps={{ component: 'div', role: 'menu', tabIndex: undefined }}
                  anchorEl={anchorElNav}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: -8,
                    horizontal: 'center',
                  }}
                  marginThreshold={0}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  slotProps={{
                    paper: {
                      style: {
                        width: isMobile ? '100%' : '300px',
                        maxWidth: '100%',
                        left: '0 !important',
                        zIndex: 10,
                        borderRadius: theme.spacing(2),
                        boxShadow: theme.vd.shadows.y16,
                        padding: 0,
                        paddingTop: theme.spacing(6),
                      },
                    },
                    root: {
                      style: {
                        zIndex: 998,
                      },
                    },
                  }}
                >
                  <span
                    style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}
                    ref={ref}
                    tabIndex={-1}
                    aria-hidden={true}
                  />
                  <div aria-hidden={isHidden}>
                    {nonLoginItem}

                    {navigationMenuItems.map((item, index) => {
                      const navItem = item as INavigationItemMultiple;
                      const subItems = navItem!.subItems && navItem!.subItems.length > 0;
                      const isSelected =
                        currentPath === item?.uri || item.selected || !!anchorElNav;

                      return subItems ? (
                        <MenuSubItems
                          itemsCount={navigationMenuItems.length}
                          index={index}
                          key={`NavItem_${index}`}
                          onNavigationClick={(
                            e: SyntheticEvent,
                            navSubItem: INavigationItemMultiple
                          ) => {
                            if (!navSubItem.subItems || !navSubItem.subItems.length) {
                              setAnchorElNav(null);
                              handleItemClick(e, navSubItem);
                            } else {
                              setMenuOpen(menuOpen === item.label ? '' : item.label);
                            }
                          }}
                          item={navItem}
                          isSelected={isSelected}
                          isMenuOpen={menuOpen === navItem?.label}
                          mobileAccountSection={isLoggedIn && mobileAccountSection}
                          aria-label={
                            ariaLabels?.menuSubItemAriaLabel
                              ? `${ariaLabels.menuSubItemAriaLabel}`
                              : undefined
                          }
                          sx={{
                            ...menuItemSx,
                            display: item.hidden ? 'none' : 'block',
                          }}
                        />
                      ) : (
                        <MuiButton
                          onClick={(e: SyntheticEvent) =>
                            handleItemClick(e, navItem as INavigationItem)
                          }
                          tabIndex={0}
                          sx={{
                            ...menuItemSx,
                            display: item.hidden ? 'none' : 'block',
                            width: '100%',
                            textAlign: 'left',
                            '&:focus-visible': {
                              border: `1px solid ${theme.palette.primary.main}`,
                              outline: `1px solid ${theme.palette.primary.main}`,
                            },
                          }}
                          aria-label={`${navItem.label}, item ${index + 1} of ${mobileAccountSection && isLoggedIn ? navigationMenuItems.length + 1 : navigationMenuItems.length}`}
                          role="link"
                          key={`NavItem_${index}`}
                        >
                          <Typography
                            className={isSelected ? 'active' : ''}
                            variant="body1"
                            sx={{
                              color: theme.palette.grey[900],
                              fontWeight: 'bold',
                            }}
                          >
                            {navItem.label}
                          </Typography>
                        </MuiButton>
                      );
                    })}

                    {signOutItem}
                  </div>
                </Menu>
              </Box>
            </ClickAwayListener>
            {secondaryMenu}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default NavigationMenu;

const mainButtonStyle: (theme: Theme) => SystemStyleObject<Theme> = (theme) => {
  return {
    width: '48px',
    height: '48px',
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    borderBottom: 'none',
    borderRadius: theme.spacing(0),
    '&:hover, &:active, &:focus-visible': {
      backgroundColor: theme.palette.background.default,
    },
  };
};

const skipToContentStyle: (theme: Theme) => SystemStyleObject<Theme> = (theme) => {
  return {
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
    margin: '10 0',
    '&:focus, &:focus-visible': {
      zIndex: 0,
      top: 10,
      position: 'relative',
      height: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      width: '30%',
      margin: `0 auto`,
    },
    [theme.breakpoints.down('sm')]: {
      width: '45%',
      margin: `0 auto`,
    },
  };
};
