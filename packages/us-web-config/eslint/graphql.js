module.exports = {
    plugins: ['graphql'],
    rules: {
        'graphql/template-strings': [
            'error',
            {
                env: 'literal',
                projectName: 'app',
            },
        ],
    },
}
