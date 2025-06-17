import { jsx as _jsx } from "react/jsx-runtime";
import { useCoreTheme } from '../../../theme/core-theme';
import { Typography } from '@mui/material';
const TestComponent = () => {
    const { isStorybook, palette } = useCoreTheme();
    return (_jsx(Typography, { variant: isStorybook ? 'h1' : 'body1', component: "h2", color: palette.primary.dark, children: "This component is for storybook, not to use in production." }));
};
export default TestComponent;
