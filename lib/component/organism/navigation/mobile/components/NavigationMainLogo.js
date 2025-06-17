import { jsx as _jsx } from "react/jsx-runtime";
import { useMediaQuery } from '@mui/material';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { Button } from '../../../../atom/button';
const NavigationMainLogo = ({ logoAriaLabel, LogoIcon, defaultIconSize = {
    width: 60,
    height: 60
}, onNavigationClick, homePage }) => {
    const theme = useCoreTheme();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const secondaryIconSize = defaultIconSize;
    const iconSize = secondaryIconSize;
    const onClick = (e) => {
        e.preventDefault();
        onNavigationClick(e, { uri: homePage ?? '/', isExternal: false, label: 'mobileLogo' });
    };
    return (_jsx(Button, { href: homePage ?? '/', onClick: onClick, component: "a", "aria-label": logoAriaLabel, role: 'link', variant: "text", className: "logo", sx: {
            width: iconSize.width,
            height: `auto`,
            transition: `all 0.5s ease-in-out`,
            paddingY: theme.spacing(2),
            top: isMobile ? 0 : theme.spacing(5),
            left: isMobile ? 0 : 'initial',
            right: isMobile ? 0 : 'initial',
            marginLeft: isMobile ? `auto` : '24px',
            marginRight: isMobile ? `auto` : '0',
            position: isMobile ? 'absolute' : 'relative'
        }, children: LogoIcon }));
};
export default NavigationMainLogo;
