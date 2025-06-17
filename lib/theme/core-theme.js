import { createTheme, useTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
export const CoreThemeProvider = ThemeProvider;
export const useCoreTheme = useTheme;
export const createCoreTheme = (options) => {
    return createTheme(options);
};
