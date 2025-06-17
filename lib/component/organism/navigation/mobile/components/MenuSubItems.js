import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MonotoneChevronDown from '../../../../../component/atom/icon/MonotoneChevronDown';
import MonotoneChevronUp from '../../../../../component/atom/icon/MonotoneChevronUp';
import { Typography, Box, Button } from '@mui/material';
import { useCoreTheme } from '../../../../../theme/core-theme';
const MenuSubItems = ({ onNavigationClick, item: subItem, isMenuOpen, mobileAccountSection, isSelected, sx = {}, index, itemsCount }) => {
    const theme = useCoreTheme();
    const handleToggle = (e) => {
        onNavigationClick(e, subItem);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Button, { onClick: handleToggle, tabIndex: 0, "aria-label": `${subItem.label}, item ${index + 1} of ${mobileAccountSection ? itemsCount + 1 : itemsCount}`, role: "button", sx: {
                    ...sx,
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    '&:focus-visible': {
                        border: `1px solid ${theme.palette.primary.main}`,
                        outline: `1px solid ${theme.palette.primary.main}`
                    }
                }, children: [_jsx(Typography, { "aria-hidden": true, className: isSelected ? 'active' : '', variant: "body1", sx: { color: theme.palette.grey[900], fontWeight: 'bold' }, children: subItem.label }), isMenuOpen ? (_jsx(MonotoneChevronUp, { "aria-hidden": true, sx: iconStyle })) : (_jsx(MonotoneChevronDown, { sx: iconStyle }))] }), isMenuOpen ? (_jsxs(_Fragment, { children: [mobileAccountSection && subItem?.key === 'account' && (_jsx(Box, { sx: {
                            ...sx,
                            display: 'block'
                        }, children: mobileAccountSection }, `accountText-subMenu`)), subItem.subItems.map((item, index) => {
                        return (_jsx(Button, { onClick: (e) => {
                                onNavigationClick(e, { ...item, subItems: [] });
                            }, tabIndex: 0, "aria-label": `${item.label}, item ${index + 1} of ${subItem.subItems?.length}`, role: "link", sx: {
                                ...sx,
                                display: 'block',
                                paddingX: theme.spacing(9),
                                textDecoration: 'none',
                                width: '100%',
                                textAlign: 'left',
                                '&:focus-visible': {
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    outline: `1px solid ${theme.palette.primary.main}`
                                }
                            }, children: _jsx(Typography, { variant: "body1", children: item.label }) }, `${index}-subMenu`));
                    })] })) : null] }));
};
export default MenuSubItems;
const iconStyle = theme => {
    return {
        height: `16px`,
        width: `16px`,
        color: theme.palette.grey[500]
    };
};
