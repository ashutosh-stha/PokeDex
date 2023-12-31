module.exports = {
  preset: 'react-native',
  coverageDirectory: '<rootDir>/coverage',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/config/jest-setup.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
  setupFiles: ['<rootDir>/config/jest-setup.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/.*/routes',
    '<rootDir>/App',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/__tests__/mocks/',
    '<rootDir>/e2e/',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
};
