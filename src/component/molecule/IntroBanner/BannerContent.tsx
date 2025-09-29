import React from 'react';
import { styled } from '@mui/system';
import { Box } from '../../atom/box';
import { Typography } from '@mui/material';
import { Button } from '../../atom/button';
import { useCoreTheme } from '../../../theme/core-theme';

const StyledLogo = styled('img')({
  width: '213px',
  height: 'auto',
});

export interface IBannerContent {
  logoUrl?: string;
  logoAlt?: string;
  logoTitle?: string;
  title?: string;
  titleComponent?: React.ElementType;
  shouldOutline?: boolean;
  outlineColor?: string;
  secondaryTitle?: string;
  titleColor?: string;
  buttonText?: string;
  buttonColor?: string;
  buttonBackgroundColor?: string;
  isButtonV2?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const BannerContent: React.FC<IBannerContent> = ({
  logoUrl,
  logoAlt,
  logoTitle,
  title,
  titleComponent = 'div',
  shouldOutline,
  outlineColor,
  secondaryTitle,
  titleColor,
  buttonText,
  buttonColor,
  buttonBackgroundColor,
  isButtonV2,
  onClick,
}) => {
  const theme = useCoreTheme();
  const textShadow = {
    textShadow: `0px 0px 2px ${outlineColor}`,
  };

  return (
    <Box
      sx={{
        width: '1024px',
      }}
    >
      {logoUrl && <StyledLogo src={logoUrl} alt={logoAlt} aria-label={logoAlt} title={logoTitle} />}
      {title && (
        <Typography
          component={titleComponent}
          variant="h4"
          sx={{
            color: titleColor,
            marginBlock: !secondaryTitle ? theme.spacing(6) : theme.spacing(1),
            marginBottom: !secondaryTitle ? theme.spacing(6) : theme.spacing(1),
          }}
        >
          {shouldOutline ? <span style={textShadow}>{title}</span> : title}
        </Typography>
      )}
      {secondaryTitle && (
        <Typography
          component="div"
          variant="h4"
          sx={{
            color: titleColor,
            marginBlock: !secondaryTitle ? theme.spacing(6) : theme.spacing(1),
            marginBottom: secondaryTitle ? theme.spacing(6) : theme.spacing(1),
          }}
        >
          {shouldOutline ? <span style={textShadow}>{secondaryTitle}</span> : secondaryTitle}
        </Typography>
      )}
      {buttonText && (
        <Box>
          <Button
            shapeType="round"
            size="large"
            onClick={(e) => onClick && onClick(e)}
            style={{
              backgroundColor: buttonBackgroundColor,
              color: buttonColor,
              paddingLeft: theme.spacing(4),
              paddingRight: theme.spacing(4),
            }}
            isV2={isButtonV2}
          >
            {buttonText}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BannerContent;
