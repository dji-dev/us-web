const deepmerge = require('deepmerge')

const BASE_CONFIG = require('./base')
const TYPESCRIPT_CONFIG = require('./typescript')
const REACT_CONFIG = require('./react')
const GRAPHQL_CONFIG = require('./graphql')
const VUE_CONFIG = require('./vue')

// See below, required for Vue ESLint plugin.
//
// The Vue plugin uses 'vue-eslint-parser' which takes over
// everything, so we need to rewrite all parser statements
// in our config.
function rewriteParserStatements(obj) {
    if (obj.parser) {
        const parser = obj.parser
        delete obj.parser

        obj.parserOptions = obj.parserOptions || {}
        obj.parserOptions.parser = parser
    }

    for (const override of obj.overrides || []) {
        rewriteParserStatements(override)
    }
}

module.exports = (options) => {
    const {
        react = false,
        typescript = true,
        graphql = false,
        vue = false
    } = options || {}

    let config = BASE_CONFIG

    if (react) {
        config = deepmerge(config, REACT_CONFIG)
    }

    if (typescript) {
        config = deepmerge(config, TYPESCRIPT_CONFIG)
    }

    if (graphql) {
        config = deepmerge(config, GRAPHQL_CONFIG)
    }

    // Must be last.
    if (vue) {
        rewriteParserStatements(config)
        config = deepmerge(config, VUE_CONFIG)
    }

    return config
}
