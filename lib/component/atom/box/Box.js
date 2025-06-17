import { jsx as _jsx } from "react/jsx-runtime";
import BaseBox from '@mui/material/Box';
const Box = ({ children, ...props }) => {
    return _jsx(BaseBox, { ...props, children: children });
};
export default Box;
