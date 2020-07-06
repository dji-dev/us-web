module.exports = {
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
