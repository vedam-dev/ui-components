import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button as MuiButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useCoreTheme } from '../../../../theme/core-theme';
import NavigationMenuButton from './components/NavigationMenuButton';
import { handleSkipTo } from '../navigationUtils';
const NavigationMenu = ({ largeHeight, showSkipContent, skipContentLabel, skipContentStyle = skipToContentStyle, appBarProps, appBarContainerProps, appToolbarContainerProps, primaryMenuProps, secondaryMenu, navigationMenuItems, navigationButtonProps, currentPath, subMenuAnchorOrigin, subMenuTransformOrigin, subMenuStyle, subMenuIconStyle, subMenuRootStyle, customSkipTo, ...mainLogoProps }) => {
    const theme = useCoreTheme();
    const mainNavHeight = largeHeight;
    const visibleItems = navigationMenuItems.filter(item => !item.hidden);
    const totalVisibleItems = visibleItems.length;
    return (_jsx(AppBar, { position: appBarProps?.position ?? 'sticky', ...appBarProps, children: _jsx(Container, { disableGutters: true, maxWidth: "xl", ...appBarContainerProps, sx: {
                pt: theme.spacing(0),
                pb: theme.spacing(0),
                pl: theme.spacing(6),
                pr: theme.spacing(6),
                ...appBarContainerProps?.sx
            }, children: _jsxs(Toolbar, { disableGutters: true, ...appToolbarContainerProps, sx: {
                    height: mainNavHeight,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    ...appToolbarContainerProps?.sx
                }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center' }, children: [mainLogoProps.LogoIcon ? (_jsxs("div", { style: { display: 'flex' }, children: [showSkipContent && (_jsx(MuiButton, { role: "link", sx: skipContentStyle, style: { order: 1 }, onClick: e => {
                                            handleSkipTo(e);
                                            customSkipTo?.();
                                        }, "aria-label": skipContentLabel, tabIndex: 0, children: skipContentLabel ?? 'Skip to main content' })), _jsx(Box, { className: "logo-container", sx: {
                                            height: mainNavHeight,
                                            width: 120,
                                            position: 'relative',
                                            order: 2
                                        }, children: mainLogoProps.LogoIcon })] })) : null, _jsx(Box, { sx: { flexGrow: 1 }, children: _jsx(Box, { ...primaryMenuProps, sx: { flexGrow: 1, display: 'flex', paddingLeft: theme.spacing(6) }, alignItems: `center`, gap: theme.spacing(3), ml: primaryMenuProps?.ml ?? theme.spacing(40), children: navigationMenuItems.map((item, idx) => {
                                        const positionInSet = idx + 1 - (visibleItems.length - totalVisibleItems);
                                        const ariaLabel = `${item.label}, item ${positionInSet} of ${totalVisibleItems}`;
                                        const additionalProps = item.hidden
                                            ? navigationButtonProps
                                            : {
                                                'aria-posinset': positionInSet,
                                                'aria-setsize': totalVisibleItems,
                                                'aria-label': ariaLabel,
                                                ...navigationButtonProps,
                                                role: !item?.subItems ||
                                                    item?.subItems.length === 0
                                                    ? 'link'
                                                    : 'button'
                                            };
                                        return (_jsx(NavigationMenuButton, { tabIndex: 0, onNavigationClick: mainLogoProps.onNavigationClick, onDropdownClick: mainLogoProps.onDropdownClick ? mainLogoProps.onDropdownClick : undefined, item: item, navigationButtonProps: additionalProps, currentPath: currentPath, anchorOrigin: subMenuAnchorOrigin, menuStyle: subMenuStyle, transformOrigin: subMenuTransformOrigin, subMenuIconStyle: subMenuIconStyle, rootStyle: subMenuRootStyle }, idx));
                                    }) }) })] }), secondaryMenu] }) }) }));
};
export default NavigationMenu;
const skipToContentStyle = theme => ({
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
        position: 'relative'
    },
    [theme.breakpoints.down('md')]: {
        width: '30%',
        margin: `0 auto`
    },
    [theme.breakpoints.down('sm')]: {
        width: '45%',
        margin: `0 auto`
    }
});
