import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('./tsconfig.json');

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.[jt]s?(x)',
    '**/*.(test|spec).{ts,js}',
    '!**/node_modules/**',
    '!**/api/config/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/config/',
    '/dist/',
    '/src/@types/',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  modulePaths: ['<rootDir>/src'],
  coverageReporters: ['lcov', 'text'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/config/',
    '/dist/',
    '/src/@types/',
  ],
  preset: 'ts-jest',
  maxWorkers: '80%',
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
