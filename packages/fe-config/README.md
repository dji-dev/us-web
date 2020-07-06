# fe-config

## Installing

`yarn add -D @dji-sdk/fe-config`

Using `yarn` is highly recommended but not required. I tried `npm` v6 but it worked unreliably with the HTTPS proxy. 

## How to use linting features

`yarn add --dev eslint prettier`

If using TypeScript also do:

`yarn add --dev typescript`

If using GraphQL also do:

`yarn add graphql`

Then, add the following to your `package.json`:

```json
{
  "prettier": "fe-config/prettier"
}
```

For ESLint, create an `.eslintrc.js` file that has the following:

```js
module.exports = require('fe-config/eslint')({
  typescript: true,
  graphql: false,
  react: true,
  vue: false
})
```

(update the fields accordingly for your project.)

If using VSCode, for best results you can copy this into `.vscode/settings.json` of project:

```json
{
    "eslint.enable": true,
    "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],
    "editor.tabSize": 4
}
```
