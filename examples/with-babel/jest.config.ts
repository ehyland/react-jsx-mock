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
};

export default config;
