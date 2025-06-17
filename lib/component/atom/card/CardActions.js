import { jsx as _jsx } from "react/jsx-runtime";
import BaseCardActions from '@mui/material/CardActions';
const CardActions = ({ children, ...props }) => {
    return _jsx(BaseCardActions, { ...props, children: children });
};
export default CardActions;
