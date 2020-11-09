import 'jest-preset-angular';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['../src/tests/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/**/*.mock.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: '../coverage'
};
