import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['./public'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    // Remove 'storybook-addon-loki' (deprecated) and use direct configuration instead
  ],
  core: {
    disableTelemetry: true
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  features: {
    storyStoreV7: false, // Required for Loki compatibility
    buildStoriesJson: true, // Helps with story discovery
  },
  docs: {
    autoocs: 'tag', // Optional: enables automatic docs generation
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true
    }
  }
};

export default config;