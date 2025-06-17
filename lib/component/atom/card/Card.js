import { jsx as _jsx } from "react/jsx-runtime";
import BaseCard from '@mui/material/Card';
import { useCoreTheme } from '../../../theme/core-theme';
const Card = ({ children, style, shadow, sx, ...props }) => {
    const { pbl: { shadows }, palette: { common: { white }, grey } } = useCoreTheme();
    const shadowVal = shadow ? shadows[shadow] : shadows.y12;
    return (_jsx(BaseCard, { ...props, style: { boxShadow: shadowVal, ...style }, sx: {
            '&:focus-visible': {
                border: `solid 1px ${white}`,
                outline: `solid 2px ${grey[900]}`
            },
            ...sx
        }, children: children }));
};
export default Card;
