# fe-config

## Installing

Add `"fe-config": "https://us003.fly-access.com/scm/pafe/fe-config.git"` to `devDependencies` in `package.json`

Make sure you have the HTTPS proxy configured as per [this guide](https://us002.fly-access.com/display/WDEV/OpenVPN+Setup).

**Shorthand:**
```sh
git config --global http.https://us003.fly-access.com.proxy http://10.10.28.30:9000
git config --global http.https://us003.fly-access.com.sslVerify false
```

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
  typescript: false,
  graphql: false,
})
```

(update the `typescript` and `graphql` accordingly for your project.)

If using VSCode, for best results you can copy this into `.vscode/settings.json` of project:

```json
{
    "eslint.enable": true,
    "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],
    "editor.tabSize": 4
}
```
