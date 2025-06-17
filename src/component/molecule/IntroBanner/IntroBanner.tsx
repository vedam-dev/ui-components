import React, { FC } from 'react';
import { styled } from '@mui/system';
import { Box } from '../../atom/box';
import { useMediaQuery } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import { Theme } from '@mui/material/styles';
import BannerContent, { IBannerContent } from './BannerContent';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';

export interface IIntroBannerProps {
  label?: string;
  title?: string;
  secondaryTitle?: string;
  altText?: string;
  decorativeBanner?: boolean;
  gradientColor?: string;
  outlineStyle?: string;
  bannerContent?: IBannerContent;
  desktopUrl: string;
  tabletUrl: string;
  mobileUrl: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
  // option to change role for accessibility. ARIA roles provide semantic meaning to content
  role?: string;
}

const ResponsiveImages: FC<{
  desktopUrl?: string;
  tabletUrl?: string;
  mobileUrl?: string;
  label?: string;
  title?: string;
  altText?: string;
  decorativeBanner?: boolean;
}> = ({ desktopUrl, tabletUrl, mobileUrl, label, title, altText, decorativeBanner }) => {
  const theme: CoreTheme = useCoreTheme() as CoreTheme;
  const mobileBreakpoints = theme.breakpoints.values;

  return (
    <picture>
      <source srcSet={mobileUrl} media={`(max-width: ${mobileBreakpoints.sm}px)`} />
      <source srcSet={tabletUrl} media={`(max-width: ${mobileBreakpoints.md}px)`} />
      <StyledImage
        src={desktopUrl}
        alt={altText}
        aria-label={label}
        title={title}
        aria-hidden={decorativeBanner}
      />
    </picture>
  );
};

const bannerContentWrapper: (theme: Theme) => SystemStyleObject<Theme> = theme => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingLeft: {
    xs: theme.spacing(6),
    sm: theme.spacing(8),
    md: theme.spacing(8),
    lg: 0
  }
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

const IntroBanner: FC<IIntroBannerProps> = ({
  label,
  title,
  altText,
  decorativeBanner,
  onClick,
  gradientColor,
  outlineStyle,
  bannerContent,
  children,
  desktopUrl,
  tabletUrl,
  mobileUrl,
  role = 'separator' // Option to change role for accessibility, separator is default
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const styleIsGradient = outlineStyle === 'Gradient';

  return (
    <Box
      sx={{
        position: 'relative',
        height: {
          xs: '330px',
          lg: '384px'
        }
      }}
    >
      <ResponsiveImages
        desktopUrl={desktopUrl}
        tabletUrl={tabletUrl}
        mobileUrl={mobileUrl}
        altText={altText}
        aria-label={label}
        decorativeBanner={decorativeBanner}
        title={title}
      />

      {styleIsGradient && gradientColor && (
        <Box
          role={role}
          sx={{
            backgroundImage: isMobile
              ? `linear-gradient(90deg, ${gradientColor} 0%, rgba(255, 255, 255, 0.66) 10%, rgba(255, 255, 255, 0.75) 47%, rgba(255, 255, 255, 0.50) 55.06%, rgba(255, 255, 255, 0.00) 70%, rgba(255, 255, 255, 0.00) 80%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(90deg, ${gradientColor} 0%, rgba(255, 255, 255, 0.75) 60%, rgba(255, 255, 255, 0.50) 80%, rgba(255, 255, 255, 0.30) 85%, rgba(255, 255, 255, 0.00) 95%, rgba(255, 255, 255, 0.00) 100%)`
              : `linear-gradient(98deg, ${gradientColor} 10%, rgba(255, 255, 255, 0.9) 35%, rgba(255, 255, 255, 0.8) 43%, rgba(255, 255, 255, 0.6) 52%, rgba(255, 255, 255, 0) 65%), linear-gradient(95deg, ${gradientColor} 5%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0) 70%)`,
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0
          }}
        />
      )}

      <Box sx={bannerContentWrapper}>
        {bannerContent ? (
          <BannerContent
            buttonBackgroundColor={bannerContent?.buttonBackgroundColor}
            buttonColor={bannerContent?.buttonColor}
            buttonText={bannerContent?.buttonText}
            isButtonV2={bannerContent?.isButtonV2}
            logoAlt={bannerContent?.logoAlt}
            logoTitle={bannerContent?.logoTitle}
            logoUrl={bannerContent?.logoUrl}
            onClick={onClick}
            title={bannerContent?.title}
            titleComponent={bannerContent?.titleComponent}
            shouldOutline={!styleIsGradient}
            outlineColor={gradientColor}
            secondaryTitle={bannerContent?.secondaryTitle}
            titleColor={bannerContent?.titleColor}
          />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default IntroBanner;
