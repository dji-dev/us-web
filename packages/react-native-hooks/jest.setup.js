jest.mock('@react-native-community/netinfo', () =>
    jest.requireActual('@react-native-community/netinfo/jest/netinfo-mock.js')
)

jest.mock('react-native-reanimated', () => jest.requireActual('react-native-reanimated/mock'))
