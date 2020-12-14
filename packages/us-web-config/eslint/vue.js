module.exports = {
    extends: ['prettier/vue', 'plugin:vue/strongly-recommended'],
    plugins: ['vue'],
    rules: {
        'vue/html-indent': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/no-unused-vars': 'off',
    },
}
