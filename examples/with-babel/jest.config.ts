/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  snapshotSerializers: ['jest-snapshot-serializer-ansi'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {},
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },

  // jest snapshots are not compatible with prettier@3, using this setting to ensure pretty 2 from this package is used
  prettierPath: require.resolve('prettier'),
};

export default config;
