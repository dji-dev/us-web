const esModules = ['react-native-reanimated', 'react-native'].join('|')

module.exports = {
    preset: 'react-native',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/dist'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
}
