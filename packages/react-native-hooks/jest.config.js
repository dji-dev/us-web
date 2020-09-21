module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/dist'],
    setupFiles: ['<rootDir>/jest.setup.js'],
}
