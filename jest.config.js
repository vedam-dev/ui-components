module.exports = {
  testURL: 'http://localhost/',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coverageDirectory: '<rootDir>/build/test-results/',
  testMatch: ['<rootDir>/test/**/+(*.)+(spec.ts?(x))', '<rootDir>/test/**/+(*.)+(test.ts?(x))'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  coverageReporters: ['lcov'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testResultsProcessor: 'jest-sonar-reporter',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  },
  preset: 'ts-jest'
};
