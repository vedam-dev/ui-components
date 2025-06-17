import { jsx as _jsx } from "react/jsx-runtime";
import BaseCardContent from '@mui/material/CardContent';
const CardContent = ({ children, ...props }) => {
    return _jsx(BaseCardContent, { ...props, children: children });
};
export default CardContent;
