module.exports = {
    extends: ['prettier/react', 'plugin:react/recommended'],
    plugins: ['react-hooks', 'react-native'],
    rules: {
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/self-closing-comp': [
            'warn',
            {
                component: true,
                html: true,
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        'react-native/no-unused-styles': 'warn',
        'react-native/no-inline-styles': 'warn',
    },
    // Tells eslint-plugin-react to automatically detect the version of React to use.
    settings: {
        react: {
            version: 'detect',
        },
    },
}
