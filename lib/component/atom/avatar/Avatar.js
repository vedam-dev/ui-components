import { jsx as _jsx } from "react/jsx-runtime";
import { Avatar as BaseAvatar } from '@mui/material';
import { useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';
const Avatar = ({ color, sx, backgroundColor, children, ...props }) => {
    const { palette, pbl } = useCoreTheme();
    let backgroundColorValue = 'inherit';
    if (!!backgroundColor && backgroundColor !== 'inherit') {
        backgroundColorValue = palette[backgroundColor]?.main;
    }
    const colorValue = color ? color : palette.common.white;
    const sxValue = SxOverride({
        ...pbl.typography.avatar,
        background: backgroundColorValue,
        color: colorValue,
        alignContent: 'center'
    }, sx);
    return (_jsx(BaseAvatar, { ...props, sx: sxValue, children: children }));
};
export default Avatar;
