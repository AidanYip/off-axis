import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest"
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json'
    }
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default config;
