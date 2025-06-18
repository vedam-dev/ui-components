
const config = {
  configurations: {
     'chrome.macbook': {
      target: 'chrome.docker',
      width: 1440,
      height: 900,  // Common MacBook Pro resolution height
      deviceScaleFactor: 2,  // MacBooks typically have retina displays
      mobile: false,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  },
  chromeSelector: '#storybook-root > *',
  diffOptions: {
    threshold: 0.01,
  },
  fileNameFormatter: ({ kind, story, configurationName }) =>
    `${kind}_${story}_${configurationName.replace('.', '_')}`,
};

export default config;
