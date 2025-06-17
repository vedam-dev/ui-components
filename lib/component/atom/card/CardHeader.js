import { jsx as _jsx } from "react/jsx-runtime";
import BaseCardHeader from '@mui/material/CardHeader';
const CardHeader = ({ children, ...props }) => {
    return _jsx(BaseCardHeader, { ...props, children: children });
};
export default CardHeader;
