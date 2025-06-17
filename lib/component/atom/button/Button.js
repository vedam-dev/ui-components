import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import BaseButton from '@mui/material/Button';
import '../../../theme/core-theme';
import { useCoreTheme } from '../../../theme/core-theme';
const Button = ({ small, children, shapeType, style, sx, isV2 = false, ...buttonProps }) => {
    const theme = useCoreTheme();
    const useMaterialButtons = theme.pbl.useMaterialButtons;
    const variant = buttonProps.variant ?? 'contained';
    const color = (buttonProps.color ?? 'primary');
    const isRound = shapeType === 'round';
    const isSmall = !!small;
    const defaultSizeStyles = isV2 ? theme?.typography.button : {};
    const styles = small ? theme?.pbl.typography.buttonS : defaultSizeStyles;
    const combinedStyles = useMaterialButtons
        ? {}
        : buttonStyles(theme, isRound, isSmall, color, variant, isV2);
    const combinedInnerStyles = useMaterialButtons
        ? {}
        : buttonInnerStyles(theme, isRound, isSmall, variant);
    return (_jsxs(BaseButton, { ...buttonProps, sx: { ...combinedStyles, ...sx }, style: { ...styles, ...style }, variant: variant, color: color, children: [children, useMaterialButtons ? null : (_jsx(Box, { className: `btnFocusState`, component: `span`, sx: combinedInnerStyles }))] }));
};
export default Button;
const buttonInnerStyles = (theme, isRound, small, variant) => {
    const buttonOuterValue = variant === 'outlined' ? -5 : -3;
    const defaultStyles = {
        overflow: 'hidden',
        pointerEvents: 'none',
        position: 'absolute',
        padding: theme.spacing(0),
        borderRadius: theme.spacing(2),
        zIndex: 0,
        top: buttonOuterValue,
        left: buttonOuterValue,
        right: buttonOuterValue,
        bottom: buttonOuterValue,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: `solid 2px ${theme.palette['grey']['900']}`
    };
    if (isRound) {
        defaultStyles.borderRadius = theme.spacing(2);
    }
    if (small) {
        defaultStyles.borderRadius = theme.spacing(2);
    }
    return defaultStyles;
};
const buttonStyles = (theme, isRound, small, color, variant, isV2) => {
    const roundBorderRadius = small ? theme.spacing(4) : theme.spacing(6);
    const borderRadius = isRound ? roundBorderRadius : theme.spacing(1);
    const v2Paddings = { small: theme.spacing(1.5, 3), large: theme.spacing(2.5, 4) };
    const defaultStyles = {
        borderRadius: borderRadius,
        padding: isV2 ? v2Paddings.large : theme.spacing(3),
        borderWidth: 2,
        boxShadow: 'none',
        '&:disabled': {
            borderWidth: 2,
            color: variant === 'contained' ? theme.palette.common.white : theme.palette.grey[300],
            backgroundColor: variant === 'contained' ? theme.palette.grey[300] : 'transparent',
            borderColor: variant !== 'contained' ? theme.palette.grey[300] : 'transparent'
        },
        '> span.btnFocusState': { display: 'none' },
        '&:hover, &:active, &:focus-visible': {
            borderWidth: 2,
            boxShadow: 'none',
            backgroundColor: variant === 'contained' ? theme.palette[color].dark : 'transparent',
            borderColor: variant !== 'contained' ? theme.palette[color].dark : 'transparent'
        },
        '&:focus-visible': {
            borderRadius: borderRadius,
            border: `solid 1px ${theme.palette.common.white}`,
            outline: `solid 2px ${theme.palette.grey[900]}`
        }
    };
    if (variant === 'text') {
        defaultStyles.textDecoration = 'underline';
        defaultStyles['&:hover, &:active, &:focus-visible'] = {
            textDecoration: 'underline',
            backgroundColor: 'transparent'
        };
    }
    if (isRound) {
        defaultStyles.padding = isV2 ? v2Paddings.large : theme.spacing(3, 4);
    }
    if (small) {
        if (isRound) {
            defaultStyles.padding = isV2 ? v2Paddings.small : theme.spacing(1, 3);
        }
        else {
            defaultStyles.padding = isV2 ? v2Paddings.small : theme.spacing(1, 2);
        }
    }
    return defaultStyles;
};
