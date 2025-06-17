import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@mui/material';
import { Button } from '../../../../atom/button';
import { Typography } from '../../../../atom/typography';
const NavigationSubMenuItem = ({ item, onItemClick, ...otherProps }) => {
    const onClick = (e) => {
        e.preventDefault();
        onItemClick(e, item);
    };
    return (_jsx(MenuItem, { onClick: onClick, sx: menuItemStyle, children: _jsx(Button, { variant: "text", sx: buttonStyle, ...otherProps, onClick: onClick, href: item.uri, component: `a`, children: _jsx(Typography, { variant: 'button', children: item.label }) }) }));
};
export default NavigationSubMenuItem;
const menuItemStyle = theme => {
    return {
        '&:hover, &:active': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default
        }
    };
};
const buttonStyle = theme => {
    return {
        color: theme.palette.text.primary,
        borderBottom: 'none',
        borderRadius: 0,
        '&:hover, &:active': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default
        }
    };
};
