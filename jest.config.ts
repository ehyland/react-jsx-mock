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
  snapshotSerializers: ['jest-snapshot-serializer-ansi'],
};

export default config;
