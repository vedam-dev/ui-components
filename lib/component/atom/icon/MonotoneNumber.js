import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon as BaseSvgIcon } from '@mui/material';
const MonotoneNumber = ({ ...props }) => {
    return (_jsx(BaseSvgIcon, { ...props, children: _jsx("svg", { viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M6 .5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z", fill: 'currentColor', fillRule: "nonzero" }) }) }));
};
export default MonotoneNumber;
