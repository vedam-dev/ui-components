import { MenuItem } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { AriaAttributes, FC, SyntheticEvent } from 'react';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { getIsWindows } from '../../../../../util/platform';
import { Button } from '../../../../atom/button';
import { ButtonProps } from '../../../../atom/button/Button';
import { Typography } from '../../../../atom/typography';
import { INavigationItem } from '../../types';

export type INavigationSubMenuItemProps = ButtonProps;

type InheritedProps = { onItemClick: (e: SyntheticEvent, item: INavigationItem) => void };

export type NavigationSubMenuItemProps = {
  item: INavigationItem;
  ariaProps: AriaAttributes;
} & INavigationSubMenuItemProps &
  InheritedProps;

const NavigationSubMenuItem: FC<NavigationSubMenuItemProps> = ({
  key,
  item,
  onItemClick,
  ariaProps,
}) => {
  const theme = useCoreTheme();
  const onClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    onItemClick(e, item);
  };
  return (
    <MenuItem
      tabIndex={0}
      sx={{
        '&:hover, &:active': { backgroundColor: 'transparent' },
        '&:focus-visible': {
          border: getIsWindows() ? `2px solid ${theme.palette.text.primary} !important` : 'none',
        },
      }}
      onClick={onClick}
      role="link"
      {...ariaProps}
    >
      <Button
        key={key}
        tabIndex={-1}
        disableFocusRipple={true}
        disableRipple={true}
        aria-hidden={true}
        variant="text"
        style={{
          textDecoration: 'none',
          borderRadius: theme.spacing(0),
          width: '100%',
          justifyContent: 'flex-start',
        }}
        href={item.uri}
        component={`a`}
        small={true}
      >
        <Typography tabIndex={-1} variant={'body1'} sx={[buttonStyle]}>
          {item.label}
        </Typography>
      </Button>
    </MenuItem>
  );
};

export default NavigationSubMenuItem;

const buttonStyle: (theme: Theme) => SystemStyleObject<Theme> = (theme) => {
  return {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    textDecoration: 'none',
    borderBottom: 'none',
    borderRadius: 0,
    lineHeight: 1,
    padding: `${theme.spacing(2)} 0`,
    '&:hover, &:active': { color: theme.palette.text.primary, textDecoration: 'underline' },
  };
};
