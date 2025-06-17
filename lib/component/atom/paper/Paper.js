import { jsx as _jsx } from "react/jsx-runtime";
import BasePaper from '@mui/material/Paper';
import { useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';
const Paper = ({ children, sx, shadow, elevation, ...props }) => {
    const { pbl: { shadows } } = useCoreTheme();
    const shadowVal = shadow ? shadows[shadow] : shadows.y12;
    const sxValue = SxOverride({ boxShadow: shadowVal }, sx);
    return (_jsx(BasePaper, { elevation: elevation ?? 0, ...props, sx: sxValue, children: children }));
};
export default Paper;
