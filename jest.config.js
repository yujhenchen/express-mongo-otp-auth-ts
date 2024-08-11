/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    moduleNameMapper: {
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@models/(.*)$': '<rootDir>/src/models/$1',
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
      '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    },
  }
  
};