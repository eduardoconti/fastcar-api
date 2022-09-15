module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    // '!<rootDir>/src/main/**',
    // '!<rootDir>/src/domain/contracts/**',
    // '!<rootDir>/src/app/contracts/**',
    // '!<rootDir>/src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  clearMocks: true,
}
