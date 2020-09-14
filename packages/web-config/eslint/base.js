const restrictedGlobals = require('confusing-browser-globals')

// https://github.com/facebook/create-react-app/tree/master/packages/confusing-browser-globals
module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true,
            legacyDecorators: true
        },
    },
    extends: ['prettier', 'eslint:recommended'],
    plugins: ['prettier', 'unicorn', 'import'],
    rules: {
        // Make any prettier formatting automatically an error.
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'es5',
                tabWidth: 4,
                semi: false,
                singleQuote: true,
                printWidth: 100,
                overrides: [
                    {
                        files: '.mock',
                        options: { parser: 'json' },
                    },
                ],
                jsxBracketSameLine: false,
            }
        ],
        // Conflicts with prettier.
        'no-extra-semi': 'off',

        // Hinting for import errors.
        'import/no-dynamic-require': 'error',
        'import/first': 'error',

        // Misc helpers from the unicorn package.
        'unicorn/throw-new-error': 'error',
        'unicorn/no-useless-undefined': 'error',
        'unicorn/error-message': 'warn',
        'unicorn/prefer-add-event-listener': 'warn',
        'unicorn/prefer-includes': 'warn',
        'unicorn/better-regex': 'warn',

        'no-restricted-globals': ['error'].concat(restrictedGlobals),

        'no-var': 'error',
        'no-console': 'warn',
        'no-shadow': 'warn',
        'no-unused-vars': [
            'error',
            {
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
        'no-magic-numbers': [
            'warn',
            {
                ignore: [
                    // Basics, array indices, common multiples.
                    -1,
                    0,
                    1,
                    2,
                    4,
                    // Material Design common spacing.
                    8,
                    16,
                    24,
                    32,
                    40,
                    56,
                    // Common time values.
                    60,
                    1000,
                ],
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: true,
            },
        ],
        'no-debugger': 'off',
    },
    globals: {
        __DEV__: 'readonly',
    },
    parser: '@babel/eslint-parser',
    overrides: [
        // Using in case of Vue plugin.
        {
            files: ['*.{js,jsx}'],
            parser: '@babel/eslint-parser',
        },
        {
            files: ['tests/**/*', 'tests/*', '*_spec.*', '*.spec.*', '*_test.*', '*.test.*'],
            plugins: ['jest'],
            env: {
                jest: true,
            },
            rules: {
                'no-magic-numbers': 'off',
                'no-console': 'off',
                'import/no-dynamic-require': 'off',
            },
        },
    ],
}
