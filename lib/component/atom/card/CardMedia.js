import { jsx as _jsx } from "react/jsx-runtime";
import BaseCardMedia from '@mui/material/CardMedia';
const CardMedia = ({ children, ...props }) => {
    return _jsx(BaseCardMedia, { ...props, children: children });
};
export default CardMedia;
