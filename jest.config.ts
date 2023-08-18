/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: '@happy-dom/jest-environment',
  testMatch: ['**/packages/**/?(*.)+(spec|test).[jt]s?(x)'],
  prettierPath: require.resolve('prettier2'),
  snapshotSerializers: ['jest-snapshot-serializer-ansi'],
  // testMatch: ['./packages/**/test.[jt]s?(x)'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // A map from regular expressions to paths to transformers
  // transform: undefined,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],
};

export default config;
