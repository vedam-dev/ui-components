import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from '@mui/system';
import { Box } from '../../atom/box';
import { useMediaQuery } from '@mui/material';
import { useCoreTheme } from '../../../theme/core-theme';
import BannerContent from './BannerContent';
const ResponsiveImages = ({ desktopUrl, tabletUrl, mobileUrl, label, title, altText, decorativeBanner }) => {
    const theme = useCoreTheme();
    const mobileBreakpoints = theme.breakpoints.values;
    return (_jsxs("picture", { children: [_jsx("source", { srcSet: mobileUrl, media: `(max-width: ${mobileBreakpoints.sm}px)` }), _jsx("source", { srcSet: tabletUrl, media: `(max-width: ${mobileBreakpoints.md}px)` }), _jsx(StyledImage, { src: desktopUrl, alt: altText, "aria-label": label, title: title, "aria-hidden": decorativeBanner })] }));
};
const bannerContentWrapper = theme => ({
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
const IntroBanner = ({ label, title, altText, decorativeBanner, onClick, gradientColor, outlineStyle, bannerContent, children, desktopUrl, tabletUrl, mobileUrl, role = 'separator' // Option to change role for accessibility, separator is default
 }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const styleIsGradient = outlineStyle === 'Gradient';
    return (_jsxs(Box, { sx: {
            position: 'relative',
            height: {
                xs: '330px',
                lg: '384px'
            }
        }, children: [_jsx(ResponsiveImages, { desktopUrl: desktopUrl, tabletUrl: tabletUrl, mobileUrl: mobileUrl, altText: altText, "aria-label": label, decorativeBanner: decorativeBanner, title: title }), styleIsGradient && gradientColor && (_jsx(Box, { role: role, sx: {
                    backgroundImage: isMobile
                        ? `linear-gradient(90deg, ${gradientColor} 0%, rgba(255, 255, 255, 0.66) 10%, rgba(255, 255, 255, 0.75) 47%, rgba(255, 255, 255, 0.50) 55.06%, rgba(255, 255, 255, 0.00) 70%, rgba(255, 255, 255, 0.00) 80%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(90deg, ${gradientColor} 0%, rgba(255, 255, 255, 0.75) 60%, rgba(255, 255, 255, 0.50) 80%, rgba(255, 255, 255, 0.30) 85%, rgba(255, 255, 255, 0.00) 95%, rgba(255, 255, 255, 0.00) 100%)`
                        : `linear-gradient(98deg, ${gradientColor} 10%, rgba(255, 255, 255, 0.9) 35%, rgba(255, 255, 255, 0.8) 43%, rgba(255, 255, 255, 0.6) 52%, rgba(255, 255, 255, 0) 65%), linear-gradient(95deg, ${gradientColor} 5%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0) 70%)`,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0
                } })), _jsx(Box, { sx: bannerContentWrapper, children: bannerContent ? (_jsx(BannerContent, { buttonBackgroundColor: bannerContent?.buttonBackgroundColor, buttonColor: bannerContent?.buttonColor, buttonText: bannerContent?.buttonText, isButtonV2: bannerContent?.isButtonV2, logoAlt: bannerContent?.logoAlt, logoTitle: bannerContent?.logoTitle, logoUrl: bannerContent?.logoUrl, onClick: onClick, title: bannerContent?.title, titleComponent: bannerContent?.titleComponent, shouldOutline: !styleIsGradient, outlineColor: gradientColor, secondaryTitle: bannerContent?.secondaryTitle, titleColor: bannerContent?.titleColor })) : (children) })] }));
};
export default IntroBanner;
