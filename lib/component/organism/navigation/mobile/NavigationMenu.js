import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Menu, MenuItem, Typography, useMediaQuery, ClickAwayListener } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useCoreTheme } from '../../../../theme/core-theme';
import { SvgIcon } from '../../../atom/icon';
import { Button } from '../../../atom/button';
import { Button as MuiButton } from '@mui/material';
import MenuSubItems from './components/MenuSubItems';
import { handleSkipTo } from '../navigationUtils';
const NavigationMenu = ({ height, showSkipContent, skipContentLabel, skipContentStyle = skipToContentStyle, ariaLabels, appBarProps, appBarContainerProps, appToolbarContainerProps, navigationMenuItems, secondaryMenu, isLoggedIn, mobileNonLoginSection, mobileNonLoginSectionAsMenuItem, mobileAccountSection, mobileSignOutItem, currentPath, mobileNonLoginBreakpoint, renderHamburgerFirst = false, customSkipTo, ...mainLogoProps }) => {
    const theme = useCoreTheme();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));
    const isLargerTablet = useMediaQuery((theme) => theme.breakpoints.down(mobileNonLoginBreakpoint || 'md'));
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState('');
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(anchorElNav ? null : event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleItemClick = (e, item) => {
        setMenuOpen(menuOpen === item.label ? '' : item.label);
        mainLogoProps.onNavigationClick(e, item);
        handleCloseNavMenu();
    };
    const menuItemSx = {
        padding: `${theme.spacing(2)} ${theme.spacing(6)}`,
        minHeight: 'auto',
        '&:hover': { backgroundColor: 'transparent' }
    };
    const nonLoginItem = useMemo(() => {
        if ((mobileNonLoginBreakpoint ? isLargerTablet : isMobile || isTablet) &&
            !isLoggedIn &&
            mobileNonLoginSection) {
            if (mobileNonLoginSectionAsMenuItem) {
                return (_jsx(MenuItem, { disableRipple: true, sx: {
                        ...menuItemSx,
                        cursor: 'default'
                    }, onKeyDown: e => {
                        if (e.key === 'Tab') {
                            e.stopPropagation();
                        }
                    }, onClick: handleCloseNavMenu, children: _jsx(Box, { className: "nav__mobile-non-login-section", sx: {
                            width: '100%',
                            color: theme.palette.grey[500],
                            whiteSpace: 'normal',
                            marginBottom: theme.spacing(2)
                        }, children: mobileNonLoginSection }) }));
            }
            return (_jsx(Box, { className: "nav__mobile-non-login-section", onClick: handleCloseNavMenu, children: mobileNonLoginSection }));
        }
        return null;
    }, [mobileNonLoginBreakpoint, isLargerTablet, isMobile, isTablet, isLoggedIn]);
    const signOutItem = useMemo(() => {
        if (isMobile && isLoggedIn && mobileSignOutItem) {
            if (typeof mobileSignOutItem === 'object' && 'label' in mobileSignOutItem) {
                return (_jsx(MenuItem, { sx: menuItemSx, onClick: () => {
                        mobileSignOutItem.onClick();
                        handleCloseNavMenu();
                    }, children: _jsx(Typography, { variant: "body1", sx: { color: theme.palette.error['400'] }, children: mobileSignOutItem.label }) }));
            }
            return _jsx(Box, { onClick: handleCloseNavMenu, children: mobileSignOutItem });
        }
        return null;
    }, [isMobile, isLoggedIn, mobileSignOutItem]);
    // Hamburger Menu Aria Label
    const hamburgerLabel = useMemo(() => {
        if (ariaLabels?.hamburgerButton) {
            return anchorElNav ? ariaLabels.hamburgerButton.close : ariaLabels.hamburgerButton.open;
        }
        return undefined;
    }, [anchorElNav, ariaLabels]);
    const hamburgerButton = useMemo(() => {
        return (_jsx(Button, { "aria-haspopup": "true", disableFocusRipple: true, disableRipple: true, onClick: handleOpenNavMenu, variant: `text`, sx: mainButtonStyle, tabIndex: 0, className: "nav__mobile-menu", "aria-label": hamburgerLabel, children: _jsx(SvgIcon, { iconName: "monotoneMenu", sx: { width: '32px', height: '32px' } }) }));
    }, [hamburgerLabel]);
    const [isHidden, setIsHidden] = useState(true);
    const ref = useRef(null);
    useEffect(() => {
        if (anchorElNav) {
            ref?.current?.focus();
            setIsHidden(!anchorElNav);
        }
    }, [Boolean(anchorElNav)]);
    return (_jsx(_Fragment, { children: _jsxs(AppBar, { position: appBarProps?.position ?? 'sticky', ...appBarProps, sx: {
                zIndex: 999,
                ...appBarProps?.sx
            }, children: [showSkipContent && (_jsx(MuiButton, { role: "link", sx: skipContentStyle, onClick: e => {
                        handleSkipTo(e);
                        customSkipTo?.();
                    }, tabIndex: 0, children: skipContentLabel ?? 'Skip to main content' })), _jsx(Container, { disableGutters: true, maxWidth: "lg", ...appBarContainerProps, sx: {
                        p: theme.spacing(0),
                        ...appBarContainerProps?.sx
                    }, children: _jsxs(Toolbar, { disableGutters: true, ...appToolbarContainerProps, sx: {
                            height,
                            alignItems: 'center',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            ...appToolbarContainerProps?.sx
                        }, children: [_jsx(ClickAwayListener, { mouseEvent: "onMouseDown", touchEvent: "onTouchStart", onClickAway: handleCloseNavMenu, children: _jsxs(Box, { children: [renderHamburgerFirst ? (_jsxs(_Fragment, { children: [hamburgerButton, mainLogoProps.LogoIcon] })) : (_jsxs(_Fragment, { children: [mainLogoProps.LogoIcon, hamburgerButton] })), _jsxs(Menu, { MenuListProps: { component: 'div', role: 'menu', tabIndex: undefined }, anchorEl: anchorElNav, keepMounted: true, anchorOrigin: {
                                                vertical: 'bottom',
                                                horizontal: 'center'
                                            }, transformOrigin: {
                                                vertical: -8,
                                                horizontal: 'center'
                                            }, marginThreshold: 0, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, slotProps: {
                                                paper: {
                                                    style: {
                                                        width: isMobile ? '100%' : '300px',
                                                        maxWidth: '100%',
                                                        left: '0 !important',
                                                        zIndex: 10,
                                                        borderRadius: theme.spacing(2),
                                                        boxShadow: theme.pbl.shadows.y16,
                                                        padding: 0,
                                                        paddingTop: theme.spacing(6)
                                                    }
                                                },
                                                root: {
                                                    style: {
                                                        zIndex: 998
                                                    }
                                                }
                                            }, children: [_jsx("span", { style: { position: 'absolute', clip: 'rect(0 0 0 0)' }, ref: ref, tabIndex: -1, "aria-hidden": true }), _jsxs("div", { "aria-hidden": isHidden, children: [nonLoginItem, navigationMenuItems.map((item, index) => {
                                                            const navItem = item;
                                                            const subItems = navItem.subItems && navItem.subItems.length > 0;
                                                            const isSelected = currentPath === item?.uri || item.selected || !!anchorElNav;
                                                            return subItems ? (_jsx(MenuSubItems, { itemsCount: navigationMenuItems.length, index: index, onNavigationClick: (e, navSubItem) => {
                                                                    if (!navSubItem.subItems || !navSubItem.subItems.length) {
                                                                        setAnchorElNav(null);
                                                                        handleItemClick(e, navSubItem);
                                                                    }
                                                                    else {
                                                                        setMenuOpen(menuOpen === item.label ? '' : item.label);
                                                                    }
                                                                }, item: navItem, isSelected: isSelected, isMenuOpen: menuOpen === navItem?.label, mobileAccountSection: isLoggedIn && mobileAccountSection, "aria-label": ariaLabels?.menuSubItemAriaLabel
                                                                    ? `${ariaLabels.menuSubItemAriaLabel}`
                                                                    : undefined, sx: {
                                                                    ...menuItemSx,
                                                                    display: item.hidden ? 'none' : 'block'
                                                                } }, `NavItem_${index}`)) : (_jsx(MuiButton, { onClick: (e) => handleItemClick(e, navItem), tabIndex: 0, sx: {
                                                                    ...menuItemSx,
                                                                    display: item.hidden ? 'none' : 'block',
                                                                    width: '100%',
                                                                    textAlign: 'left',
                                                                    '&:focus-visible': {
                                                                        border: `1px solid ${theme.palette.primary.main}`,
                                                                        outline: `1px solid ${theme.palette.primary.main}`
                                                                    }
                                                                }, "aria-label": `${navItem.label}, item ${index + 1} of ${mobileAccountSection && isLoggedIn ? navigationMenuItems.length + 1 : navigationMenuItems.length}`, role: "link", children: _jsx(Typography, { className: isSelected ? 'active' : '', variant: "body1", sx: {
                                                                        color: theme.palette.grey[900],
                                                                        fontWeight: 'bold'
                                                                    }, children: navItem.label }) }, `NavItem_${index}`));
                                                        }), signOutItem] })] })] }) }), secondaryMenu] }) })] }) }));
};
export default NavigationMenu;
const mainButtonStyle = theme => {
    return {
        width: '48px',
        height: '48px',
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(6),
        borderBottom: 'none',
        borderRadius: theme.spacing(0),
        '&:hover, &:active, &:focus-visible': {
            backgroundColor: theme.palette.background.default
        }
    };
};
const skipToContentStyle = theme => {
    return {
        position: 'absolute',
        top: '-200%',
        zIndex: 100,
        width: '220px',
        textDecoration: 'none',
        background: theme.palette.primary.dark,
        color: theme.palette.common.white,
        padding: 'theme.spacing(1) theme.spacing(2)',
        borderRadius: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        border: `1px solid ${theme.palette.common.white}`,
        outline: `2px solid ${theme.palette.common.black}`,
        alignItems: 'center',
        fontFamily: theme.typography.subtitle2.fontFamily,
        margin: '10 0',
        '&:focus, &:focus-visible': {
            zIndex: 0,
            top: 10,
            position: 'relative',
            height: 'auto'
        },
        [theme.breakpoints.down('md')]: {
            width: '30%',
            margin: `0 auto`
        },
        [theme.breakpoints.down('sm')]: {
            width: '45%',
            margin: `0 auto`
        }
    };
};
