import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@mui/material';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { getIsWindows } from '../../../../../util/platform';
import { Button } from '../../../../atom/button';
import { Typography } from '../../../../atom/typography';
const NavigationSubMenuItem = ({ key, item, onItemClick, ariaProps }) => {
    const theme = useCoreTheme();
    const onClick = (e) => {
        e.preventDefault();
        onItemClick(e, item);
    };
    return (_jsx(MenuItem, { tabIndex: 0, sx: {
            '&:hover, &:active': { backgroundColor: 'transparent' },
            '&:focus-visible': {
                border: getIsWindows() ? `2px solid ${theme.palette.text.primary} !important` : 'none'
            }
        }, onClick: onClick, role: "link", ...ariaProps, children: _jsx(Button, { tabIndex: -1, disableFocusRipple: true, disableRipple: true, "aria-hidden": true, variant: "text", style: {
                textDecoration: 'none',
                borderRadius: theme.spacing(0),
                width: '100%',
                justifyContent: 'flex-start'
            }, href: item.uri, component: `a`, small: true, children: _jsx(Typography, { tabIndex: -1, variant: 'body1', sx: [buttonStyle], children: item.label }) }, key) }));
};
export default NavigationSubMenuItem;
const buttonStyle = theme => {
    return {
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        textDecoration: 'none',
        borderBottom: 'none',
        borderRadius: 0,
        lineHeight: 1,
        padding: `${theme.spacing(2)} 0`,
        '&:hover, &:active': { color: theme.palette.text.primary, textDecoration: 'underline' }
    };
};
