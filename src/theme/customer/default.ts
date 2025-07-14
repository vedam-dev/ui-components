import { CoreTheme, createCoreTheme } from '../core-theme';
import { createTheme } from '@mui/material';

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
      y16: `0 16px 32px -4px rgba(145, 158, 171, 0.24)`
    },
    typography: {
      avatar: {
        fontFamily: `Montserrat`,
        fontWeight: 'bold',
        fontSize: '14pt',
        lineHeight: '24pt'
      },
      buttonS: {
        ...muiTheme.typography.button
      }
    }
  }
});

export default defaultTheme;
