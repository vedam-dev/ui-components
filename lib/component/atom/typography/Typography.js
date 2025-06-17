import { jsx as _jsx } from "react/jsx-runtime";
import { Typography as BaseTypography } from '@mui/material';
import { useCoreTheme } from '../../../theme/core-theme';
const Typography = ({ children, isButtonS, ...props }) => {
    const theme = useCoreTheme();
    let styles = {};
    if (isButtonS && props.variant === 'button') {
        styles = theme.pbl.typography.buttonS;
    }
    return (_jsx(BaseTypography, { ...props, style: styles, children: children }));
};
export default Typography;
