import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import '@fontsource/lato/100-italic.css';
import '@fontsource/lato/300-italic.css';
import '@fontsource/lato/400-italic.css';
import '@fontsource/lato/700-italic.css';
import '@fontsource/lato/900-italic.css';

import '@fontsource/lato/100.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';

import '@fontsource/montserrat/100-italic.css';
import '@fontsource/montserrat/200-italic.css';
import '@fontsource/montserrat/300-italic.css';
import '@fontsource/montserrat/400-italic.css';
import '@fontsource/montserrat/500-italic.css';
import '@fontsource/montserrat/600-italic.css';
import '@fontsource/montserrat/700-italic.css';
import '@fontsource/montserrat/800-italic.css';
import '@fontsource/montserrat/900-italic.css';

import type { Preview } from '@storybook/react';

import { CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { defaultTheme, vedamTheme, ksTheme, ks3Theme } from '../src/theme/customer';
import { CoreThemeProvider } from '../src/theme/core-theme';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS, DEFAULT_VIEWPORT } from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
        DEFAULT_VIEWPORT
      },
      defaultViewport: DEFAULT_VIEWPORT
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#000' }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },

  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline,
      Provider: CoreThemeProvider,
      themes: {
        // Provide your custom themes here
        vedam: vedamTheme,
        ks: ksTheme,
        ks3: ks3Theme,
        default: defaultTheme
      },
      defaultTheme: 'default'
    })
  ]
};

export default preview;
