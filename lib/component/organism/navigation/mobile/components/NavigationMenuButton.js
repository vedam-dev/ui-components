import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { Button } from '../../../../atom/button';
import { SvgIcon } from '../../../../atom/icon';
import { Typography } from '../../../../atom/typography';
import NavigationSubMenuItem from './NavigationSubMenuItem';
const NavigationMenuButton = ({ item, onNavigationClick, onDropdownClick, ...otherProps }) => {
    const theme = useCoreTheme();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navItem = item;
    const handleOpenNavMenu = (event) => {
        if (!navItem.subItems || navItem.subItems.length < 1) {
            setAnchorElNav(null);
            return;
        }
        if (onDropdownClick)
            onDropdownClick(item);
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const onClick = (e) => {
        e.preventDefault();
        handleCloseNavMenu();
        onNavigationClick(e, item);
    };
    const onSubMenuClick = (e, selected) => {
        handleCloseNavMenu();
        onNavigationClick(e, selected);
    };
    const isSelected = item.selected || !!anchorElNav;
    return (_jsxs(Box, { component: `li`, children: [_jsxs(Button, { variant: "text", sx: [buttonStyle, buttonStyleSelected(isSelected, theme)], ...otherProps, onClick: onClick, href: item.uri, component: `a`, onMouseEnter: handleOpenNavMenu, onMouseLeave: handleOpenNavMenu, children: [_jsx(Typography, { variant: 'button', children: item?.label }), !!navItem.subItems && navItem.subItems.length > 0 ? (_jsx(_Fragment, { children: _jsx(SvgIcon, { iconName: `monotoneChevronDown`, sx: iconStyle }) })) : null] }), !!navItem.subItems && navItem.subItems.length > 0 ? (_jsx(_Fragment, { children: _jsx(Menu, { id: "main-navbar-item", autoFocus: true, role: `menu`, variant: `selectedMenu`, anchorEl: anchorElNav, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, keepMounted: true, transformOrigin: { vertical: 'top', horizontal: 'center' }, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, children: navItem.subItems.map(subItem => {
                        return (_jsx(NavigationSubMenuItem, { item: subItem, onItemClick: onSubMenuClick }, JSON.stringify(subItem)));
                    }) }) })) : null] }));
};
export default NavigationMenuButton;
const iconStyle = theme => {
    return {
        height: `12px`,
        width: `12px`,
        ml: theme.spacing(2),
        color: theme.palette.text.secondary,
        '&:hover, &:active': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default
        }
    };
};
const buttonStyle = theme => {
    return {
        color: theme.palette.text.secondary,
        borderBottom: 'none',
        borderRadius: 0,
        '&:hover, &:active': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default
        }
    };
};
const buttonStyleSelected = (isSelected, theme) => {
    if (!isSelected) {
        return {};
    }
    return {
        color: theme.palette.text.primary,
        borderBottom: '3px solid ' + theme.palette.text.primary
    };
};
