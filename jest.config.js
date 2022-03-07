module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  setupFiles: ['./tests/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts']
};
