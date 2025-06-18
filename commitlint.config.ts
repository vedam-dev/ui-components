import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^([a-z]+)\(([A-Z]+-\d+)\):\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  rules: {
    'scope-empty': [2, 'never']
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ignores: [message => message.includes('[jenkins-commit]')]
};

export default config;
