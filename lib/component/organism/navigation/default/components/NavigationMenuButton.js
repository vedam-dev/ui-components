import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCoreTheme } from '../../../../../theme/core-theme';
import { getIsWindows } from '../../../../../util/platform';
import { Box } from '../../../../atom/box';
import { Button } from '../../../../atom/button';
import { SvgIcon } from '../../../../atom/icon';
import { Typography } from '../../../../atom/typography';
import NavigationSubMenuItem from './NavigationSubMenuItem';
const NavigationMenuButton = ({ item, currentPath, onNavigationClick, onDropdownClick, anchorOrigin = { vertical: 'bottom', horizontal: 'center' }, transformOrigin = { vertical: 'top', horizontal: 'center' }, menuStyle = { borderRadius: '8px' }, rootStyle = { top: 12 }, subMenuIconStyle, navigationButtonProps = {}, ...otherProps }) => {
    const theme = useCoreTheme();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [isWindows, setIsWindows] = useState(false);
    useEffect(() => {
        setIsWindows(getIsWindows());
    }, []);
    const navItem = item;
    const hasSubMenu = !!navItem.subItems && navItem.subItems.length > 0;
    const chevronDownStyle = { ...iconStyle(theme), ...subMenuIconStyle };
    const handleOpenNavMenu = (event) => {
        event.preventDefault();
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
    const isSelected = currentPath === item.uri || item.selected || !!anchorElNav;
    const accessibilityConfig = hasSubMenu
        ? { 'aria-expanded': Boolean(anchorElNav), 'aria-haspopup': true, 'aria-label': undefined }
        : { 'aria-label': item?.label };
    return (_jsxs(Box, { sx: { display: item.hidden ? 'none !important' : 'block' }, className: isSelected ? 'active' : '', children: [_jsxs(Button, { disableFocusRipple: true, disableRipple: true, variant: "text", ...otherProps, style: { textDecoration: 'none', margin: 0 }, sx: {
                    borderRadius: 0,
                    padding: `0 !important`,
                    borderBottom: isSelected
                        ? `2px solid ${theme.palette.text.primary}`
                        : `2px solid transparent`,
                    '&:hover, &:active': { borderBottom: `2px solid ${theme.palette.text.primary}` },
                    '&:focus-visible': {
                        outline: `2px solid ${theme.palette.text.primary} !important`,
                        border: '2px solid transparent !important',
                        borderRadius: '4px'
                    }
                }, onClick: hasSubMenu ? handleOpenNavMenu : onClick, href: item.uri, small: true, component: `a`, ...accessibilityConfig, ...navigationButtonProps, children: [_jsx(Typography, { variant: 'button', sx: [buttonStyle, buttonStyleSelected(isSelected, theme)], children: item?.label }), hasSubMenu ? (_jsx(_Fragment, { children: _jsx(SvgIcon, { iconName: `monotoneChevronDown`, sx: chevronDownStyle }) })) : null] }), hasSubMenu ? (_jsx(Menu, { id: "main-navbar-item", autoFocus: false, role: "none", variant: `selectedMenu`, anchorEl: anchorElNav, anchorOrigin: anchorOrigin, keepMounted: true, transformOrigin: transformOrigin, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, slotProps: { paper: { style: { ...menuStyle } }, root: { style: { ...rootStyle } } }, children: navItem.subItems.map((subItem, index) => {
                    return (_jsx(NavigationSubMenuItem, { item: subItem, onItemClick: onSubMenuClick, ariaProps: {
                            'aria-label': `${subItem.accessibilityLabel} ${isWindows ? `,item ${index + 1} of ${navItem.subItems.length}` : ',item'}`
                        } }, JSON.stringify(subItem)));
                }) })) : null] }));
};
export default NavigationMenuButton;
const iconStyle = theme => {
    return {
        height: `12px`,
        width: `12px`,
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
        textDecoration: 'none',
        borderBottom: 'none',
        borderRadius: 0,
        lineHeight: 1,
        padding: theme.spacing(3),
        '&:hover, &:active': { color: theme.palette.text.primary }
    };
};
const buttonStyleSelected = (isSelected, theme) => {
    if (!isSelected) {
        return {};
    }
    return { color: theme.palette.text.primary };
};
