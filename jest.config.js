module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.factory.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/main/config/**',
    '!<rootDir>/src/main/server.ts',
    '!<rootDir>/src/**/*.dto.ts',
    '!<rootDir>/src/infra/adapters/**',
    '!<rootDir>/src/domain/types/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@infra/(.*)": "<rootDir>/src/infra/$1",
    "@main/(.*)": "<rootDir>/src/main/$1",
    "@presentation/(.*)": "<rootDir>/src/presentation/$1"
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  clearMocks: true,
}
