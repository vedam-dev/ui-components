import { useMediaQuery } from '@mui/material';
import React from 'react';
import { Theme } from '@mui/material/styles';
import { UseScrollTriggerOptions } from '@mui/material/useScrollTrigger/useScrollTrigger';
import { FC, SyntheticEvent } from 'react';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { Button } from '../../../../atom/button';
import { OnNavigationClick, onDropdownClick } from '../../types';

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
  defaultIconSize = {
    width: 60,
    height: 60,
  },
  onNavigationClick,
  homePage,
}) => {
  const theme = useCoreTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const secondaryIconSize: LogoIconSize = defaultIconSize;

  const iconSize: LogoIconSize = secondaryIconSize;

  const onClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    onNavigationClick(e, {
      uri: homePage ?? '/',
      isExternal: false,
      label: 'mobileLogo',
    });
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
        width: iconSize.width,
        height: `auto`,
        transition: `all 0.5s ease-in-out`,
        paddingY: theme.spacing(2),
        top: isMobile ? 0 : theme.spacing(5),
        left: isMobile ? 0 : 'initial',
        right: isMobile ? 0 : 'initial',
        marginLeft: isMobile ? `auto` : '24px',
        marginRight: isMobile ? `auto` : '0',
        position: isMobile ? 'absolute' : 'relative',
      }}
    >
      {LogoIcon}
    </Button>
  );
};

export default NavigationMainLogo;
