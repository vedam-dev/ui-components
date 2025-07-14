import { createTheme, Theme, useTheme } from '@mui/material';
import { ThemeProvider, ThemeProviderProps } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { TypographyStyle } from '@mui/material/styles/createTypography';

export type CoreTypographyVariant = 'buttonS' | 'avatar';

interface CustomPalette {
  vedamRed?: string;
  vedamBlue?: string;
  maintenanceBanner?: string;
  errorModalBackground?: string;
  powerball?: string;
  lottoAmerica?: string;
  megaMillions?: string;
}

export interface IVdTheme {
  useMaterialButtons: boolean;
  shadows: { none: 'none'; y4?:string; y8: string; y12: string; y16: string };
  typography: Record<CoreTypographyVariant, TypographyStyle>;
  palette?: CustomPalette;
}

export interface CoreTheme extends Theme {
  isStorybook: boolean;
  vd: IVdTheme;
}

export interface CoreThemeOptions extends ThemeOptions {
  isStorybook: boolean;
  vd: IVdTheme;
}

export type CoreThemeProviderProps = ThemeProviderProps;

export const CoreThemeProvider =
  ThemeProvider as unknown as React.ComponentType<ThemeProviderProps>;

export const useCoreTheme = useTheme as () => CoreTheme | Theme;

export const createCoreTheme = (options: CoreThemeOptions): CoreTheme => {
  return createTheme(options) as CoreTheme;
};
