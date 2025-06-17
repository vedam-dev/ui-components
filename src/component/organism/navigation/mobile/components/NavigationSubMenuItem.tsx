import { MenuItem } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { FC, SyntheticEvent } from 'react';
import { Button } from '../../../../atom/button';
import { ButtonProps } from '../../../../atom/button/Button';
import { Typography } from '../../../../atom/typography';
import { INavigationItem } from '../../types';

export type INavigationSubMenuItemProps = ButtonProps;

type InheritedProps = { onItemClick: (e: SyntheticEvent, item: INavigationItem) => void };

export type NavigationSubMenuItemProps = { item: INavigationItem } & INavigationSubMenuItemProps &
  InheritedProps;

const NavigationSubMenuItem: FC<NavigationSubMenuItemProps> = ({
  item,
  onItemClick,
  ...otherProps
}) => {
  const onClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    onItemClick(e, item);
  };

  return (
    <MenuItem onClick={onClick} sx={menuItemStyle}>
      <Button
        variant="text"
        sx={buttonStyle}
        {...otherProps}
        onClick={onClick}
        href={item.uri}
        component={`a`}
      >
        <Typography variant={'button'}>{item.label}</Typography>
      </Button>
    </MenuItem>
  );
};

export default NavigationSubMenuItem;

const menuItemStyle: (theme: Theme) => SystemStyleObject<Theme> = theme => {
  return {
    '&:hover, &:active': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default
    }
  };
};

const buttonStyle: (theme: Theme) => SystemStyleObject<Theme> = theme => {
  return {
    color: theme.palette.text.primary,
    borderBottom: 'none',
    borderRadius: 0,
    '&:hover, &:active': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default
    }
  };
};
