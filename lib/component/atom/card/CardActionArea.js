import { jsx as _jsx } from "react/jsx-runtime";
import BaseCardActionArea from '@mui/material/CardActionArea';
const CardActionArea = ({ children, ...props }) => {
    return _jsx(BaseCardActionArea, { ...props, children: children });
};
export default CardActionArea;
