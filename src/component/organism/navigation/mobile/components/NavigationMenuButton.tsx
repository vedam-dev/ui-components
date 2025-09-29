import { Menu } from '@mui/material';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { FC, MouseEvent, SyntheticEvent, useState } from 'react';
import { useCoreTheme } from '../../../../../theme/core-theme';
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
} & INavigationMenuItemButtonProps &
  InheritedProps;

const NavigationMenuButton: FC<NavigationMenuItemProps> = ({
  item,
  onNavigationClick,
  onDropdownClick,
  ...otherProps
}) => {
  const theme = useCoreTheme();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const navItem = item as INavigationItemMultiple;

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => {
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

  const isSelected = item.selected || !!anchorElNav;

  return (
    <Box component={`li`}>
      <Button
        variant="text"
        sx={[buttonStyle, buttonStyleSelected(isSelected, theme)]}
        {...otherProps}
        onClick={onClick}
        href={item.uri}
        component={`a`}
        onMouseEnter={handleOpenNavMenu}
        onMouseLeave={handleOpenNavMenu}
      >
        <Typography variant={'button'}>{item?.label}</Typography>
        {!!navItem.subItems && navItem.subItems.length > 0 ? (
          <>
            <SvgIcon iconName={`monotoneChevronDown`} sx={iconStyle} />
          </>
        ) : null}
      </Button>

      {!!navItem.subItems && navItem.subItems.length > 0 ? (
        <>
          <Menu
            id="main-navbar-item"
            autoFocus={true}
            role={`menu`}
            variant={`selectedMenu`}
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            keepMounted={true}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {navItem.subItems.map((subItem) => {
              return (
                <NavigationSubMenuItem
                  key={JSON.stringify(subItem)}
                  item={subItem}
                  onItemClick={onSubMenuClick}
                />
              );
            })}
          </Menu>
        </>
      ) : null}
    </Box>
  );
};

export default NavigationMenuButton;

const iconStyle: (theme: Theme) => SystemStyleObject<Theme> = (theme) => {
  return {
    height: `12px`,
    width: `12px`,
    ml: theme.spacing(2),
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
    borderBottom: 'none',
    borderRadius: 0,
    '&:hover, &:active': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
    },
  };
};

const buttonStyleSelected: (isSelected: boolean, theme: Theme) => SystemStyleObject<Theme> = (
  isSelected,
  theme
) => {
  if (!isSelected) {
    return {};
  }
  return {
    color: theme.palette.text.primary,
    borderBottom: '3px solid ' + theme.palette.text.primary,
  };
};
