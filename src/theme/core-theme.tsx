import { createTheme, Theme, useTheme } from '@mui/material';
import { ThemeProvider, ThemeProviderProps } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { TypographyStyle } from '@mui/material/styles/createTypography';
import React from 'react';
import { CoreTheme, useCoreTheme } from './core-theme';
export type CoreTypographyVariant = 'buttonS' | 'avatar';

interface LegacyBrandPalette {
  brandRed?: string;
  brandBlue?: string;
  maintenanceBanner?: string;
  errorModalBackground?: string;
  powerball?: string;
  lottoAmerica?: string;
  megaMillions?: string;
}

export interface SemanticPalette {
  surfaceDefault: string;
  surfaceSubtle: string;
  surfaceMuted: string;

  borderDefault: string;
  borderMuted: string;
  borderStrong: string;
  borderSubtle: string;

  textStrong: string;
  textMuted: string;
  textSubtle: string;

  statusActive: string;
  statusInactive: string;
  statusPending: string;

  accentPrimary: string;
  accentSecondary: string;
  accentPrimaryLight: string;
}

export type VdPalette = SemanticPalette & LegacyBrandPalette;

export interface IVdTheme {
  useMaterialButtons: boolean;
  shadows: { none: 'none'; y4?: string; y8: string; y12: string; y16: string };
  typography: Record<CoreTypographyVariant, TypographyStyle>;
  palette: VdPalette;
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

declare module '@mui/material/styles' {
  interface PaletteColor {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface SimplePaletteColorOptions {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
}
