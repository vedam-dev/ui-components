import { FC, SyntheticEvent } from 'react';
import React from 'react';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { UseScrollTriggerOptions } from '@mui/material/useScrollTrigger/useScrollTrigger';
import { OnNavigationClick, onDropdownClick } from '../../types';
import { Button } from '@mui/material';

interface LogoIconSize {
  width: number;
  height: number;
}

export interface INavigationMainLogoProps {
  LogoIcon: React.ReactNode;
  defaultIconSize?: LogoIconSize;
  largeIconSize?: LogoIconSize;
  iconResize?: UseScrollTriggerOptions;
  onNavigationClick: OnNavigationClick;
  onDropdownClick?: onDropdownClick;
  homePage?: string;
  logoAriaLabel?: string;
}

const NavigationMainLogo: FC<INavigationMainLogoProps> = ({
  logoAriaLabel,
  LogoIcon,
  onNavigationClick,
  homePage,
}) => {
  const theme = useCoreTheme();

  const onClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    onNavigationClick(e, { uri: homePage ?? '/', isExternal: false, label: 'mainLogo' });
  };

  return (
    <Button
      href={homePage ?? '/'}
      onClick={onClick}
      component="a"
      aria-label={logoAriaLabel}
      role={'link'}
      variant="text"
      className="logo"
      sx={{
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        paddingTop: theme.spacing(4),
        top: 0,
        left: 0,
      }}
    >
      {LogoIcon}
    </Button>
  );
};

export default NavigationMainLogo;
