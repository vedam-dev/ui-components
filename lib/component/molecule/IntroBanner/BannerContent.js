import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from '@mui/system';
import { Box } from '../../atom/box';
import { Typography } from '@mui/material';
import { Button } from '../../atom/button';
import { useCoreTheme } from '../../../theme/core-theme';
const StyledLogo = styled('img')({
    width: '213px',
    height: 'auto'
});
const BannerContent = ({ logoUrl, logoAlt, logoTitle, title, titleComponent = 'div', shouldOutline, outlineColor, secondaryTitle, titleColor, buttonText, buttonColor, buttonBackgroundColor, isButtonV2, onClick }) => {
    const theme = useCoreTheme();
    const textShadow = {
        textShadow: `0px 0px 2px ${outlineColor}`
    };
    return (_jsxs(Box, { sx: {
            width: '1024px'
        }, children: [logoUrl && _jsx(StyledLogo, { src: logoUrl, alt: logoAlt, "aria-label": logoAlt, title: logoTitle }), title && (_jsx(Typography, { component: titleComponent, variant: "h4", sx: {
                    color: titleColor,
                    marginBlock: !secondaryTitle ? theme.spacing(6) : theme.spacing(1),
                    marginBottom: !secondaryTitle ? theme.spacing(6) : theme.spacing(1)
                }, children: shouldOutline ? _jsx("span", { style: textShadow, children: title }) : title })), secondaryTitle && (_jsx(Typography, { component: "div", variant: "h4", sx: {
                    color: titleColor,
                    marginBlock: !secondaryTitle ? theme.spacing(6) : theme.spacing(1),
                    marginBottom: secondaryTitle ? theme.spacing(6) : theme.spacing(1)
                }, children: shouldOutline ? _jsx("span", { style: textShadow, children: secondaryTitle }) : secondaryTitle })), buttonText && (_jsx(Box, { children: _jsx(Button, { shapeType: "round", size: "large", onClick: e => onClick && onClick(e), style: {
                        backgroundColor: buttonBackgroundColor,
                        color: buttonColor,
                        paddingLeft: theme.spacing(4),
                        paddingRight: theme.spacing(4)
                    }, isV2: isButtonV2, children: buttonText }) }))] }));
};
export default BannerContent;
