import { CoreTheme, createCoreTheme } from '../core-theme';
import { createTheme } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../core-theme';

const muiTheme = createTheme();

const defaultTheme: CoreTheme = createCoreTheme({
  isStorybook: true,
  spacing: 4,
  vd: {
    useMaterialButtons: true,
    shadows: {
      none: 'none',
      y8: `0 8px 16px 0 rgba(145, 158, 171, 0.24)`,
      y12: `0 12px 24px 0 rgba(145, 158, 171, 0.24)`,
      y16: `0 16px 32px -4px rgba(145, 158, 171, 0.24)`,
    },
    typography: {
      avatar: {
        fontFamily: `Montserrat`,
        fontWeight: 'bold',
        fontSize: '14pt',
        lineHeight: '24pt',
      },
      buttonS: {
        ...muiTheme.typography.button,
      },
    },
    palette: {
      surfaceDefault: '#FFFFFF',
      surfaceSubtle: '#F5F5F5',
      surfaceMuted: '#EEEEEE',

      borderDefault: '#E0E0E0',
      borderMuted: '#EEEEEE',
      borderStrong: '#BDBDBD',
      borderSubtle: '#E0E0E0',

      textStrong: '#212121',
      textMuted: '#757575',
      textSubtle: '#9E9E9E',

      statusActive: '#4CAF50',
      statusInactive: '#9E9E9E',
      statusPending: '#FF9800',

      accentPrimary: '#1976D2',
      accentSecondary: '#9C27B0',
      accentPrimaryLight: '#E3F2FD',
    },
  },
});

export default defaultTheme;
