# @dji-dev/us-web-config

## Installing

`yarn add -D @dji-dev/us-web-config`

Using `yarn` is highly recommended but not required.

# Linting Features

`yarn add --dev eslint @babel/core`

If using TypeScript also do:

`yarn add --dev typescript`

If using GraphQL also do:

`yarn add graphql`

For ESLint, create an `.eslintrc.js` file that has the following:

```js
module.exports = require('@dji-dev/us-web-config/eslint')({
    typescript: true,
    graphql: false,
    react: true,
    vue: false,
})
```

(update the fields accordingly for your project.)

# Babel

To use the Babel plugin, add `@dji-dev/us-web-config/babel` as a Babel preset **in addition** to the preset for your project (Expo, create-react-app, etc).

[How to add a Babel preset](https://babeljs.io/docs/en/presets)

# TypeScript

To extend our TypeScript configuration, add `"extends": "@dji-dev/us-web-config/tsconfig.json"` to your project's `tsconfig.json`.

Depending on your use-case, you may also use `@dji-dev/us-web-config/typescript/web.json` or `@dji-dev/us-web-config/typescript/react-native.json`.

# VSCode

If using VSCode, for easy results you can copy this into `.vscode/settings.json` of project:

```json
{
    "eslint.enable": true,
    "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],
    "editor.tabSize": 4
}
```

Make sure the official `ESLint` plugin is installed.