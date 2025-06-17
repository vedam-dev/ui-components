import { jsx as _jsx } from "react/jsx-runtime";
import { useCoreTheme } from '../../../../../theme/core-theme';
import { Button } from '@mui/material';
const NavigationMainLogo = ({ logoAriaLabel, LogoIcon, onNavigationClick, homePage }) => {
    const theme = useCoreTheme();
    const onClick = (e) => {
        e.preventDefault();
        onNavigationClick(e, { uri: homePage ?? '/', isExternal: false, label: 'mainLogo' });
    };
    return (_jsx(Button, { href: homePage ?? '/', onClick: onClick, component: "a", "aria-label": logoAriaLabel, role: 'link', variant: "text", className: "logo", sx: {
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            paddingTop: theme.spacing(4),
            top: 0,
            left: 0
        }, children: LogoIcon }));
};
export default NavigationMainLogo;
