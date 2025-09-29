import { Menu } from '@mui/material';
import { PopoverOrigin } from '@mui/material/Popover';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { CSSProperties, FC, MouseEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { getIsWindows } from '../../../../../util/platform';
import { Box } from '../../../../atom/box';
import { Button } from '../../../../atom/button';
import { ButtonProps } from '../../../../atom/button/Button';
import { SvgIcon } from '../../../../atom/icon';
import { Typography } from '../../../../atom/typography';
import {
  INavigationItem,
  INavigationItemMultiple,
  NavigationMenuItem,
  OnNavigationClick,
  onDropdownClick,
} from '../../types';
import NavigationSubMenuItem from './NavigationSubMenuItem';

export type INavigationMenuItemButtonProps = ButtonProps;

type InheritedProps = { onNavigationClick: OnNavigationClick; onDropdownClick?: onDropdownClick };

export type NavigationMenuItemProps = {
  item: NavigationMenuItem;
  currentPath?: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  menuStyle?: CSSProperties;
  rootStyle?: CSSProperties;
  subMenuIconStyle?: CSSProperties;
  navigationButtonProps?: INavigationMenuItemButtonProps;
} & INavigationMenuItemButtonProps &
  InheritedProps & { menuOpen?: string };

const NavigationMenuButton: FC<NavigationMenuItemProps> = ({
  item,
  currentPath,
  onNavigationClick,
  onDropdownClick,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  transformOrigin = { vertical: 'top', horizontal: 'center' },
  menuStyle = { borderRadius: '8px' },
  rootStyle = { top: 12 },
  subMenuIconStyle,
  navigationButtonProps = {},
  ...otherProps
}) => {
  const theme = useCoreTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    setIsWindows(getIsWindows());
  }, []);

  const navItem = item as INavigationItemMultiple;
  const hasSubMenu = !!navItem.subItems && navItem.subItems.length > 0;
  const chevronDownStyle = { ...iconStyle(theme), ...subMenuIconStyle };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (!navItem.subItems || navItem.subItems.length < 1) {
      setAnchorElNav(null);
      return;
    }
    if (onDropdownClick) onDropdownClick(item);
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const onClick = (e: SyntheticEvent): void => {
    e.preventDefault();

    handleCloseNavMenu();
    onNavigationClick(e, item);
  };

  const onSubMenuClick = (e: SyntheticEvent, selected: INavigationItem): void => {
    handleCloseNavMenu();
    onNavigationClick(e, selected);
  };

  const isSelected = currentPath === item.uri || item.selected || !!anchorElNav;

  const accessibilityConfig = hasSubMenu
    ? { 'aria-expanded': Boolean(anchorElNav), 'aria-haspopup': true, 'aria-label': undefined }
    : { 'aria-label': item?.label };

  return (
    <Box
      sx={{ display: item.hidden ? 'none !important' : 'block' }}
      className={isSelected ? 'active' : ''}
    >
      <Button
        disableFocusRipple={true}
        disableRipple={true}
        variant="text"
        {...otherProps}
        style={{ textDecoration: 'none', margin: 0 }}
        sx={{
          borderRadius: 0,
          padding: `0 !important`,
          borderBottom: isSelected
            ? `2px solid ${theme.palette.text.primary}`
            : `2px solid transparent`,
          '&:hover, &:active': { borderBottom: `2px solid ${theme.palette.text.primary}` },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.text.primary} !important`,
            border: '2px solid transparent !important',
            borderRadius: '4px',
          },
        }}
        onClick={hasSubMenu ? handleOpenNavMenu : onClick}
        href={item.uri}
        small={true}
        component={`a`}
        {...accessibilityConfig}
        {...navigationButtonProps}
      >
        <Typography variant={'button'} sx={[buttonStyle, buttonStyleSelected(isSelected, theme)]}>
          {item?.label}
        </Typography>
        {hasSubMenu ? (
          <>
            <SvgIcon iconName={`monotoneChevronDown`} sx={chevronDownStyle} />
          </>
        ) : null}
      </Button>

      {hasSubMenu ? (
        <Menu
          id="main-navbar-item"
          autoFocus={false}
          role="none"
          variant={`selectedMenu`}
          anchorEl={anchorElNav}
          anchorOrigin={anchorOrigin}
          keepMounted={true}
          transformOrigin={transformOrigin}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          slotProps={{ paper: { style: { ...menuStyle } }, root: { style: { ...rootStyle } } }}
        >
          {navItem.subItems.map((subItem, index) => {
            return (
              <NavigationSubMenuItem
                key={JSON.stringify(subItem)}
                item={subItem}
                onItemClick={onSubMenuClick}
                ariaProps={{
                  'aria-label': `${subItem.accessibilityLabel} ${isWindows ? `,item ${index + 1} of ${navItem.subItems.length}` : ',item'}`,
                }}
              />
            );
          })}
        </Menu>
      ) : null}
    </Box>
  );
};

export default NavigationMenuButton;

const iconStyle: (theme: Theme) => SystemStyleObject<Theme> = (theme) => {
  return {
    height: `12px`,
    width: `12px`,
    color: theme.palette.text.secondary,
    '&:hover, &:active': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
    },
  };
};

const buttonStyle: (theme: Theme) => SystemStyleObject<Theme> = (theme) => {
  return {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    borderBottom: 'none',
    borderRadius: 0,
    lineHeight: 1,
    padding: theme.spacing(3),
    '&:hover, &:active': { color: theme.palette.text.primary },
  };
};

const buttonStyleSelected: (isSelected: boolean, theme: Theme) => SystemStyleObject<Theme> = (
  isSelected,
  theme
) => {
  if (!isSelected) {
    return {};
  }
  return { color: theme.palette.text.primary };
};
