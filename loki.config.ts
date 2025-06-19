import type { LokiConfiguration } from '@loki/core';

const config: LokiConfiguration = {
  configurations: {
    'chrome.laptop': {
      target: 'chrome.docker',
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false,
    },
  },
  chromeSelector: '#storybook-root > *',
  diffOptions: {
    threshold: 0.01,
  },
};

export default config;